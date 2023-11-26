import { prisma } from "../../../../lib/db/prismaClient.js";

export const GET = ({ request }) => {
  const refreshToken = request.headers.get("Authorization");
  if (refreshToken === null) {
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
          new Response(JSON.stringify("Logout Success"), {
            headers: {
              "Content-Type": "application/json",
            },
          }),
        );
      })
      .catch((err) => {
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
      Allow: "POST",
    },
  });
};
