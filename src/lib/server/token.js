import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_ISSUER,
  DAYS_IN_SECONDS,
  MINUTES_IN_SECONDS,
  REFRESH_TOKEN_ISSUER,
  SITE_ORIGIN,
} from "../constants";

const ACCESS_TOKEN_SECRET = import.meta.env.VITE_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = import.meta.env.VITE_REFRESH_TOKEN_SECRET;

const createAccessToken = (userId) => {
  const promise = new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        issuer: ACCESS_TOKEN_ISSUER,
        subject: userId,
        audience: SITE_ORIGIN,
        expiresIn: MINUTES_IN_SECONDS,
      },
      (err, token) => {
        if (err === null) {
          resolve(token);
        } else {
          reject(err);
        }
      },
    );
  });

  return promise;
};

const createRefreshToken = (userId) => {
  const promise = new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        issuer: REFRESH_TOKEN_ISSUER,
        subject: userId,
        audience: SITE_ORIGIN,
        expiresIn: DAYS_IN_SECONDS,
      },
      (err, token) => {
        if (err === null) {
          resolve(token);
        } else {
          reject(err);
        }
      },
    );
  });

  return promise;
};

const verifyAccessToken = (token) => {
  const promise = new Promise((resolve, reject) => {
    jwt.verify(
      token,
      import.meta.env.VITE_ACCESS_TOKEN_SECRET,
      {
        algorithms: "HS256",
        issuer: ACCESS_TOKEN_ISSUER,
        audience: SITE_ORIGIN,
        maxAge: MINUTES_IN_SECONDS,
      },
      (err, token) => {
        if (err === null) {
          resolve(token);
        } else {
          reject(err);
        }
      },
    );
  });

  return promise;
};

const verifyRefreshToken = (token) => {
  const promise = new Promise((resolve, reject) => {
    jwt.verify(
      token,
      import.meta.env.VITE_REFRESH_TOKEN_SECRET,
      {
        algorithms: "HS256",
        issuer: REFRESH_TOKEN_ISSUER,
        audience: SITE_ORIGIN,
        maxAge: DAYS_IN_SECONDS,
      },
      (err, token) => {
        if (err === null) {
          resolve(token);
        } else {
          reject(err);
        }
      },
    );
  });

  return promise;
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
