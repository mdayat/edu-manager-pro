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
    <p>Account Id: {user.id}</p>
    <p>Account Email: {user.email}</p>
    <p>Account Name: {user.name}</p>
    <p>Account Picture: {user.pictureUrl}</p>
    <p>
      Your Picture Looks Like: <img src={user.pictureUrl} alt={user.name} />
    </p>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {/if}
  {/await}
</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }
</style>
