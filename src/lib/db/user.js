import { prisma } from "./prismaClient";

const createUser = (data) => {
  const promise = new Promise((resolve, reject) => {
    prisma.user.create({ data, select: { id: true } }).catch((err) => {
      reject(err);
    });
  });

  return promise;
};

export { createUser };
