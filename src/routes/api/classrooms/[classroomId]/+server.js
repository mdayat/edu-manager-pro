import {
  deleteClassroom,
  getClassroom,
  updateClassroom,
} from "../../../../lib/server/db/classroom.js";
import { verifyAccessToken } from "../../../../lib/server/token.js";
import { validateObjectKeys } from "../../../../lib/server/utils.js";

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
        const classroomId = params.classroomId;

        getClassroom(classroomId)
          .then((classroom) => {
            if (classroom !== null) {
              resolve(
                new Response(JSON.stringify(classroom), {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }),
              );
            } else {
              // Respond when classroom with the specified "id" not found
              const message = `Classroom with the id of "${classroomId}" not found`;
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
            // Reject request when failed to get classroom
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
        request
          .json()
          .then((body) => {
            const bodyKeys = Object.keys(body);
            const validObjectKeys = ["name", "description"];

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

            const classroomId = params.classroomId;
            updateClassroom(classroomId, body)
              .then(() => {
                const message = `Classroom with the "id" of ${classroomId}, successfully updated`;
                resolve(
                  new Response(JSON.stringify(message), {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }),
                );
              })
              .catch((err) => {
                // Reject request when failed to update classroom
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
        const classroomId = params.classroomId;
        deleteClassroom(classroomId)
          .then(() => {
            const message = `Success deleting classroom with the "id" of ${classroomId}`;
            resolve(
              new Response(JSON.stringify(message), {
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          })
          .catch((err) => {
            // Reject request when failed to delete classroom
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
