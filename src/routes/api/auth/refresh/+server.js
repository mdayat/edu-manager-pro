import { updateUser } from "../../../../lib/db/user.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../../../../lib/server/token.js";

export const GET = ({ request }) => {
  // Reject request when authorization header is empty
  if (request.headers.get("Authorization") === null) {
    return new Response(JSON.stringify("Unauthorized"), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const promise = new Promise((resolve) => {
    const refreshToken = request.headers
      .get("Authorization")
      .split("Bearer ")[1];

    verifyRefreshToken(refreshToken)
      .then((oldToken) => {
        Promise.all([
          createAccessToken(oldToken.sub),
          createRefreshToken(oldToken.sub),
        ])
          .then((tokens) => {
            const newToken = {
              access: tokens[0],
              refresh: tokens[1],
            };

            updateUser(oldToken.sub, { refresh_token: newToken.refresh })
              .then(() => {
                const resBody = {
                  accessToken: newToken.access,
                  refreshToken: newToken.refresh,
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
        // Reject request when refresh token is invalid
        resolve(
          new Response(JSON.stringify(err.message), {
            status: 401,
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
      Allow: "GET",
    },
  });
};
