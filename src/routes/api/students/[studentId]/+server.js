import { verifyAccessToken } from "../../../../lib/server/token.js";
import { validateObjectKeys } from "../../../../lib/server/utils.js";
import {
  deleteStudent,
  getStudent,
  updateStudent,
} from "../../../../lib/server/db/student.js";

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

export const PATCH = ({ params, request }) => {
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
        request
          .json()
          .then((body) => {
            const bodyKeys = Object.keys(body);
            const validObjectKeys = [
              "name",
              "email",
              "age",
              "gender",
              "address",
              "payment_status",
            ];

            const hasInvalidLength = bodyKeys.length > validObjectKeys.length;
            const hasValidObjectKeys = validateObjectKeys(
              validObjectKeys,
              bodyKeys,
            );

            if (hasInvalidLength || !hasValidObjectKeys) {
              // Reject request when body payload is invalid
              const message =
                "Invalid body payload: Please refer to the api docs about the allowed body payload";
              resolve(
                new Response(JSON.stringify(message), {
                  status: 400,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }),
              );
            }

            updateStudent(studentId, body)
              .then(() => {
                const message = `Student with the "id" of ${studentId}, successfully updated`;
                resolve(
                  new Response(JSON.stringify(message), {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }),
                );
              })
              .catch((err) => {
                // Reject request when failed to update student
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

export const DELETE = ({ params, request }) => {
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

        deleteStudent(studentId)
          .then(() => {
            const message = `Success deleting user with the "id" of ${studentId}`;
            resolve(
              new Response(JSON.stringify(message), {
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          })
          .catch((err) => {
            // Reject request when failed to delete student
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
