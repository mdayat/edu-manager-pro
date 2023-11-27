<script>
  import { logOut } from "../lib/auth";

  let isGetUserClicked = false;

  const handleGetUser = () => {
    isGetUserClicked = true;
  };

  const getUser = () => {
    const promise = new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem("access_token");
      fetch("api/users/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((user) => {
            resolve(user);
          });
        }

        // Handle response when user is not found
        if (res.status === 404) {
          reject("User not found");
        }

        // Handle response when access token is invalid
        if (res.status === 401) {
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

              // Invalidate access and refresh token if failed to validate refresh token
              logOut();
            })
            .then(({ accessToken, refreshToken }) => {
              // Update old access and refresh token with the new one
              localStorage.setItem("access_token", accessToken);
              localStorage.setItem("refresh_token", refreshToken);

              // Get user (again) with the new access token
              fetch("api/users/me", {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((user) => {
                  resolve(user);
                });
            });
        }
      });
    });

    return promise;
  };
</script>

<h1>Hello From Home Page</h1>
<button type="button" on:click={logOut}>Log Out</button>
<button type="button" on:click={handleGetUser}>
  Click to show account information
</button>

{#if isGetUserClicked}
  {#await getUser()}
    <p>LOADING...</p>
  {:then user}
    <ul>
      <li>Account Id: {user.id}</li>
      <li>Account Email: {user.email}</li>
      <li>Account Name: {user.name}</li>
      <li>Account Picture: {user.pictureUrl}</li>
      <li>
        Your Picture Looks Like: <img src={user.pictureUrl} alt={user.name} />
      </li>
    </ul>
  {:catch msg}
    <p>
      {msg}
    </p>
  {/await}
{/if}

<style>
  h1 {
    color: salmon;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
</style>
