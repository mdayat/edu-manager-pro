<script>
  import { handleInvalidAccessToken } from "../../lib/auth";

  const getUser = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = "/api/users/me";
      const accessToken = localStorage.getItem("access_token");

      fetch(apiEndpoint, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => {
          if (res.status === 500) {
            reject(res.status);
            return;
          }

          if (res.status === 401) {
            handleInvalidAccessToken().then((newAccessToken) => {
              fetch(apiEndpoint, {
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
            return;
          }

          return res.json();
        })
        .then((user) => {
          resolve(user);
        });
    });

    return promise;
  };
</script>

<main>
  {#await getUser()}
    <p>LOADING...</p>
  {:then user}
    <div class="container">
      <div class="profile-box">
        <img src={user.pictureUrl} alt={user.name} class="profile" />
        <p class="user-name">{user.name}</p>
        <p class="user-email">{user.email}</p>
      </div>
    </div>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {/if}
  {/await}
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400&display=swap");

  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }

  .container {
    width: 100%;
    height: 90vh;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-box {
    background-color: #f9f9f9;
    text-align: center;
    padding: 90px 90px 50px 90px;
    position: relative;
    border-radius: 20px;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .user-name {
    color: #323f6c;
    font-size: 32px;
    font-weight: 700;
  }

  .profile-box p {
    font-family: "Poppins", sans-serif;
    margin-bottom: 10px;
    padding: 5px;
  }

  .profile-box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .profile {
    border: 6px solid white;
  }
</style>
