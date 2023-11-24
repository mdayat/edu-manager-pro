<script>
  const hasLoggedIn = () => {
    const hasAccessToken =
      localStorage.getItem("access_token") !== null ? true : false;
    const hasRefreshToken =
      localStorage.getItem("refresh_token") !== null ? true : false;
    return hasAccessToken && hasRefreshToken;
  };

  const isLoggedIn = hasLoggedIn();
  if (isLoggedIn === false) {
    window.location.replace(window.location.origin + "/auth");
  }
</script>

<h1>Hello From Home Page</h1>

<style>
  h1 {
    color: salmon;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
</style>
