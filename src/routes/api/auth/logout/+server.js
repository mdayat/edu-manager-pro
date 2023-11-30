import { supabase } from "../../../../lib/server/db/supabaseClient.js";

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

    supabase
      .from("user")
      .update({ refresh_token: null })
      .eq("refresh_token", refreshToken)
      .then((res) => {
        if (res.status === 204) {
          resolve(
            new Response(null, {
              status: 204,
              headers: {
                "Content-Length": 0,
              },
            }),
          );
        } else {
          // Reject request when failed to update refresh token
          resolve(
            new Response(JSON.stringify(res.error.message), {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            }),
          );
        }
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
