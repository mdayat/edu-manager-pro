// This global function is used for google auth callback
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
    .then((token) => {
      localStorage.setItem("access_token", token.access);
      localStorage.setItem("refresh_token", token.refresh);
      window.location.replace(window.location.origin);
    });
}
