import { OAuth2Client } from "google-auth-library";
import {
  createAccessToken,
  createRefreshToken,
} from "$lib/server/createToken.js";
import { prisma } from "../../../../lib/db/prismaClient.js";
import { createUser } from "../../../../lib/db/user.js";

const client = new OAuth2Client();
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const POST = async ({ request }) => {
  const promise = new Promise((resolve) => {
    request
      .json()
      .then((googleIDToken) => {
        client
          .verifyIdToken({ idToken: googleIDToken, audience: CLIENT_ID })
          .then((ticket) => {
            const payload = ticket.getPayload();

            prisma.user
              .findFirst({ where: { id: payload.sub } })
              .then((user) => {
                // Check if the logged in user is a new user
                if (user === null) {
                  // Create a new user
                  const userData = {
                    id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    picture_url: payload.picture,
                  };

                  createUser(userData).catch((err) => {
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
                }

                // Create access and refresh token with payload data
                Promise.all([
                  createAccessToken(payload.sub),
                  createRefreshToken(payload.sub),
                ])
                  .then((tokenValues) => {
                    const tokens = {
                      accessToken: tokenValues[0],
                      refreshToken: tokenValues[1],
                    };
                    resolve(
                      new Response(JSON.stringify(tokens), {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }),
                    );
                  })
                  .catch((err) => {
                    // Reject request when failed to create access and refresh tokens
                    resolve(
                      new Response(JSON.stringify(err.message), {
                        status: 500,
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }),
                    );
                  });
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
