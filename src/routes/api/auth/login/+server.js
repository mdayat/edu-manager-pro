import { OAuth2Client } from "google-auth-library";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../lib/token.js";
import { createUser, getUser, updateUser } from "../../../../lib/db/user.js";

const client = new OAuth2Client();
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const POST = ({ request }) => {
  const promise = new Promise((resolve) => {
    request
      .json()
      .then((body) => {
        const googleIDToken = body.credential;

        client
          .verifyIdToken({ idToken: googleIDToken, audience: CLIENT_ID })
          .then((ticket) => {
            const payload = ticket.getPayload();

            // Create access and refresh token with payload data
            Promise.all([
              createAccessToken(payload.sub),
              createRefreshToken(payload.sub),
            ])
              .then((tokens) => {
                const token = {
                  access: tokens[0],
                  refresh: tokens[1],
                };

                getUser(payload.sub).then((user) => {
                  // Check if the logged-in user is a new user
                  if (user === null) {
                    const userData = {
                      id: payload.sub,
                      name: payload.name,
                      email: payload.email,
                      picture_url: payload.picture,
                      refresh_token: token.refresh,
                    };

                    createUser(userData)
                      .then(() => {
                        const resBody = {
                          accessToken: token.access,
                          refreshToken: token.refresh,
                        };

                        resolve(
                          new Response(JSON.stringify(resBody), {
                            status: 201,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }),
                        );
                      })
                      .catch((err) => {
                        // Reject request when failed to create a new user
                        resolve(
                          new Response(JSON.stringify(err.message), {
                            status: 500,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }),
                        );
                      });
                  } else {
                    updateUser(user.id, { refresh_token: token.refresh })
                      .then(() => {
                        const resBody = {
                          accessToken: token.access,
                          refreshToken: token.refresh,
                        };

                        resolve(
                          new Response(JSON.stringify(resBody), {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }),
                        );
                      })
                      .catch((err) => {
                        // Reject request when failed to update refresh token
                        resolve(
                          new Response(JSON.stringify(err.message), {
                            status: 500,
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }),
                        );
                      });
                  }
                });
              })
              .catch((err) => {
                // Reject request when failed to create access and refresh token
                resolve(
                  new Response(JSON.stringify(err.message), {
                    status: 500,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }),
                );
              });
          })
          .catch((err) => {
            // Reject request when Google ID Token is expired, revoked, malformed, or invalid for other reasons.
            const msg = err.message.split(":")[0];
            resolve(
              new Response(JSON.stringify(msg), {
                status: 401,
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          });
      })
      .catch((err) => {
        // Reject request when Google ID Token is missing in request body.
        resolve(
          new Response(JSON.stringify(err.message), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }),
        );
      });
  });

  return promise;
};

export const fallback = ({ request }) => {
  return new Response(JSON.stringify(request.method + " Method Not Allowed"), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      Allow: "POST",
    },
  });
};
