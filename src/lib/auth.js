import { writable } from "svelte/store";

const loading = writable(true);

const hasLoggedIn = () => {
  const hasAccessToken =
    localStorage.getItem("access_token") !== null ? true : false;
  const hasRefreshToken =
    localStorage.getItem("refresh_token") !== null ? true : false;
  return hasAccessToken && hasRefreshToken;
};

const logOut = () => {
  const refreshToken = localStorage.getItem("refresh_token");

  fetch("api/auth/logout", {
    headers: {
      Authorization: "Bearer " + refreshToken,
    },
  }).then(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.replace(window.location.origin + "/auth");
  });
};

const handleInvalidAccessToken = () => {
  const promise = new Promise((resolve) => {
    const refreshToken = localStorage.getItem("refresh_token");
    fetch("/api/auth/refresh", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        // Remove access and refresh token if refresh token is inlvaid
        logOut();
      })
      .then(({ accessToken, refreshToken }) => {
        // Update old access and refresh token with the new one
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        resolve(accessToken);
      });
  });

  return promise;
};

export { loading, hasLoggedIn, logOut, handleInvalidAccessToken };
