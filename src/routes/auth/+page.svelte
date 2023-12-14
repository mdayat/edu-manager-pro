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

<!-- HTML API for displaying google "Sign In Button" and "One Tap" prompt -->
<div class="container">
  <div class="container-div">
    <h2>Welcome To</h2>
    <img src="/img/Edu_Manager.png" alt="" />
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
  </div>
</div>

<style>
  /* The default dimension of google "Sign In Button" */
  .g_container {
    box-sizing: border-box;
    width: 220px;
    height: 44px;
    margin-bottom: 2rem;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    background-color: #f9fafb;
  }
  .container-div {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    border-radius: 1rem;
    max-width: 48rem;
    background-color: #f3f4f6;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .container h2 {
    color: rgb(53, 63, 105);
    margin-top: 2rem;
  }
  .container-div img {
    margin-bottom: 1rem;
    width: 100%;
  }
</style>
