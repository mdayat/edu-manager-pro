import { writable } from "svelte/store";

const loading = writable(true);

const hasLoggedIn = () => {
  const hasAccessToken =
    localStorage.getItem("access_token") !== null ? true : false;
  const hasRefreshToken =
    localStorage.getItem("refresh_token") !== null ? true : false;
  return hasAccessToken && hasRefreshToken;
};

const handleLogOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.replace(window.location.origin + "/auth");
};

export { loading, hasLoggedIn, handleLogOut };
