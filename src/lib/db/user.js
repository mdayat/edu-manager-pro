import { prisma } from "./prismaClient";

const getUser = (userId) => {
  const promise = new Promise((resolve, reject) => {
    prisma.user
      .findFirst({ where: { id: userId } })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

const createUser = (data) => {
  const promise = new Promise((resolve, reject) => {
    prisma.user
      .create({ data })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

const updateUser = (userId, newValue) => {
  const promise = new Promise((resolve, reject) => {
    prisma.user
      .update({ where: { id: userId }, data: newValue })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

const deleteUser = (userId) => {
  const promise = new Promise((resolve, reject) => {
    prisma.user
      .delete({ where: { id: userId } })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return promise;
};

export { getUser, createUser, updateUser, deleteUser };
