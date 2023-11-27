import { prisma } from "../../../../lib/db/prismaClient.js";

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

    prisma.user
      .update({
        where: { refresh_token: refreshToken },
        data: { refresh_token: null },
      })
      .then(() => {
        resolve(
          new Response(null, {
            headers: {
              "Content-Length": 0,
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
