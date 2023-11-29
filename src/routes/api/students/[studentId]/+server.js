import { verifyAccessToken } from "../../../../lib/token.js";
import { getStudent } from "../../../../lib/db/student.js";

export const GET = ({ params, request }) => {
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
      .then(() => {
        const studentId = params.studentId;

        getStudent(studentId)
          .then((student) => {
            if (student !== null) {
              resolve(
                new Response(JSON.stringify(student), {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }),
              );
            } else {
              // Respond when student with the specified "id" not found
              const message = `Student with the id of "${studentId}" not found`;
              resolve(
                new Response(JSON.stringify(message), {
                  status: 404,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }),
              );
            }
          })
          .catch((err) => {
            // Reject request when failed to get student
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
      Allow: "GET, PUT, DELETE",
    },
  });
};
