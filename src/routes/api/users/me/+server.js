import { getUser } from "../../../../lib/db/user.js";
import { verifyAccessToken } from "../../../../lib/server/token.js";

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
    const accessToken = request.headers
      .get("Authorization")
      .split("Bearer ")[1];

    verifyAccessToken(accessToken)
      .then((token) => {
        getUser(token.sub)
          .then((user) => {
            const resBody = {
              id: user.id,
              name: user.name,
              email: user.email,
              pictureUrl: user.picture_url,
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
            // Reject request when there is no user with the specified "id"
            resolve(
              new Response(JSON.stringify(err.message), {
                status: 404,
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          });
      })
      .catch((err) => {
        // Reject request when access token is invalid
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
