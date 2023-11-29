import { v4 as uuidv4 } from "uuid";
import { validateObjectKeys } from "../../../lib/student.js";
import { verifyAccessToken } from "../../../lib/token.js";
import { createStudent, getStudents } from "../../../lib/db/student.js";

export const POST = ({ request }) => {
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
    request
      .json()
      .then((body) => {
        const requiredKeyNames = [
          "name",
          "email",
          "age",
          "gender",
          "address",
          "payment_status",
        ];

        const result = validateObjectKeys(requiredKeyNames, Object.keys(body));
        if (result.isValid === false) {
          // Reject request when body payload is insufficient or invalid
          resolve(
            new Response(JSON.stringify(result.message), {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            }),
          );
        }

        const accessToken = request.headers
          .get("Authorization")
          .split("Bearer ")[1];

        verifyAccessToken(accessToken)
          .then(() => {
            const student = {
              id: uuidv4(),
              ...body,
            };

            createStudent(student)
              .then(() => {
                new Response(JSON.stringify("New student created"), {
                  status: 201,
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              })
              .catch((err) => {
                // Reject request when failed to create new student
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
      })
      .catch((err) => {
        // Reject request when body payload is missing in request body.
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
      .then(() => {
        getStudents()
          .then((students) => {
            resolve(
              new Response(JSON.stringify(students), {
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          })
          .catch((err) => {
            // Reject request when failed to get all student
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
      Allow: "GET, POST",
    },
  });
};
