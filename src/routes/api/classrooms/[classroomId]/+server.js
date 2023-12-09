import {
  createClassroomStudentRelationship,
  deleteClassroom,
  deleteClassroomStudentRelationship,
  getClassroom,
  updateClassroom,
} from "../../../../lib/server/db/classroom.js";
import { verifyAccessToken } from "../../../../lib/server/token.js";

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
              // Respond when classroom not found
              const message = "Classroom not found";
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
            const hasNameKey = Object.hasOwn(body, "name");
            const hasDescriptionKey = Object.hasOwn(body, "description");

            const hasCreatedStudentIdsKey = Object.hasOwn(
              body,
              "createdStudentIds",
            );
            const hasDeletedStudentIdsKey = Object.hasOwn(
              body,
              "deletedStudentIds",
            );

            const classroomId = params.classroomId;
            const executedPromises = [];

            if (hasNameKey || hasDescriptionKey) {
              const classroom = {
                name: body.name ?? null,
                description: body.description ?? null,
              };

              if (classroom.name === null) {
                delete classroom.name;
              }

              if (classroom.description === null) {
                delete classroom.description;
              }

              executedPromises.push({
                type: "update",
                data: { classroomId, newData: classroom },
                func: updateClassroom,
              });
            }

            if (hasCreatedStudentIdsKey) {
              executedPromises.push({
                type: "create",
                data: {
                  classroomId,
                  studentIds: body.createdStudentIds,
                },
                func: createClassroomStudentRelationship,
              });
            }

            if (hasDeletedStudentIdsKey) {
              executedPromises.push({
                type: "delete",
                data: {
                  studentIds: body.deletedStudentIds,
                },
                func: deleteClassroomStudentRelationship,
              });
            }

            Promise.all(
              executedPromises.map((promise) => {
                if (promise.type === "update") {
                  return promise.func(
                    promise.data.classroomId,
                    promise.data.newData,
                  );
                }

                if (promise.type === "create") {
                  return promise.func(
                    promise.data.classroomId,
                    promise.data.studentIds,
                  );
                }

                return promise.func(promise.data.studentIds);
              }),
            )
              .then(() => {
                const message = "Successfully updated classroom";
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
            const message = "Successfully deleted a classroom";
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
