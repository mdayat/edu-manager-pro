function handleGoogleSignIn(res) {
  fetch("api/auth/login", {
    method: "POST",
    body: JSON.stringify(res.credential),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((tokens) => {
      localStorage.setItem("access_token", tokens.accessToken);
      localStorage.setItem("refresh_token", tokens.refreshToken);
      window.location.replace(window.location.origin);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("g_id_onload")
    .addEventListener("click", handleGoogleSignIn);
});
