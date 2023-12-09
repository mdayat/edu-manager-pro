import { v4 as uuidv4 } from "uuid";
import { verifyAccessToken } from "../../../lib/server/token.js";
import {
  createClassroom,
  getClassrooms,
} from "../../../lib/server/db/classroom.js";

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
    const accessToken = request.headers
      .get("Authorization")
      .split("Bearer ")[1];

    verifyAccessToken(accessToken)
      .then((token) => {
        request
          .json()
          .then((body) => {
            const studentIds = body.studentIds;
            const classroom = {
              id: uuidv4(),
              teacher_id: token.sub,
              name: body.name,
              description: body.description,
            };

            createClassroom(classroom, studentIds)
              .then(() => {
                const message = "New classroom successfully created";
                resolve(
                  new Response(JSON.stringify(message), {
                    status: 201,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }),
                );
              })
              .catch((err) => {
                // Reject request when failed to create new classroom
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
        getClassrooms(token.sub)
          .then((classrooms) => {
            resolve(
              new Response(JSON.stringify(classrooms), {
                headers: {
                  "Content-Type": "application/json",
                },
              }),
            );
          })
          .catch((err) => {
            // Reject request when failed to get all classrooms
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
