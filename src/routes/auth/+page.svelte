<script>
  // This global function is used for google auth callback
  window.handleGoogleSignIn = (res) => {
    fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ credential: res.credential }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(({ accessToken, refreshToken }) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        window.location.replace(window.location.origin);
      });
  };
</script>

<!-- Loading google client library and handling authentication -->
<svelte:head>
  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<h1>Hello From Auth Page</h1>

<!-- HTML API for displaying google "Sign In Button" and "One Tap" prompt -->
<div class="g_container">
  <div
    id="g_id_onload"
    data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    data-context="signin"
    data-ux_mode="popup"
    data-callback="handleGoogleSignIn"
    data-itp_support="true"
  ></div>

  <div
    class="g_id_signin"
    data-type="standard"
    data-shape="pill"
    data-theme="outline"
    data-text="continue_with"
    data-size="large"
    data-logo_alignment="left"
  ></div>
</div>

<style>
  /* The default dimension of google "Sign In Button" */
  .g_container {
    box-sizing: border-box;
    width: 220px;
    height: 44px;
  }

  h1 {
    color: salmon;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
</style>
