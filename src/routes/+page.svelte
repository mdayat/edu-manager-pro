<script>
  import { handleInvalidAccessToken, logOut } from "../lib/auth";

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
          handleInvalidAccessToken().then((newAccessToken) => {
            // Get user (again) with the new access token
            fetch("api/users/me", {
              headers: {
                Authorization: "Bearer " + newAccessToken,
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

<h1>Hello From Home and Logout Page</h1>
<h2>What is EduManagerPro?</h2>
<h3>
  Edu Manager Pro is an app that aims to provide tools that enable private
  teachers to optimize lesson management, better manage student progress, and
  improve the quality of teaching without having to face the complexity and high
  cost of similiar management tools in a corporate context.
</h3>

<div class="information_button">
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
</div>

<div class="logout_button">
  <button type="button" on:click={logOut}>Log Out</button>
</div>

<style>
  /* style untuk tombol logout */
  h1 {
    color: #323f6c;
    font-size: 24px;
    font-weight: 700;
    font-family: Arial;
    text-align: center;
  }

  h2 {
    color: #323f6c;
    font-size: 18px;
    font-weight: 700;
    font-family: Arial;
    text-align: center;
  }

  h3 {
    color: #323f6c;
    font-size: 15px;
    font-weight: 700;
    font-family: Arial;
    text-align: justify;
    padding: 2px;
    margin: auto;
    width: 35%;
  }

  .logout_button {
    margin: auto;
    width: 50%;
  }

  .information_button {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
</style>
