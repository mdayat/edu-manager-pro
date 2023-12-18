<script>
  import { handleInvalidAccessToken } from "../../lib/auth";

  const getClassrooms = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = "/api/classrooms";
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

          if (res.status === 404) {
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
                .then((classrooms) => {
                  resolve(classrooms);
                });
            });
            return;
          }

          return res.json();
        })
        .then((classrooms) => {
          resolve(classrooms);
        });
    });

    return promise;
  };
</script>

<main>
  <h1>List of classrooms</h1>

  {#await getClassrooms()}
    <p>LOADING...</p>
  {:then classrooms}
    <ul>
      {#each classrooms as classroom}
        <li class="card">
          <p>Classroom ID: {classroom.id}</p>
          <p>Classroom Name: {classroom.name}</p>
          <p>
            Number of Enrolled Students: {classroom.numberOfEnrolledStudents}
          </p>

          <a href={`/classrooms/${classroom.id}`}>See the Details</a>
        </li>
      {/each}
    </ul>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {:else if errStatusCode === 404}
      <p>There is no classrooms to show</p>
    {/if}
  {/await}
</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }

  h1 {
    color: salmon;
    font-size: 24px;
    font-weight: bold;
  }

  .card {
    background-color: #ddd;
    width: fit-content;
    padding: 16px;
    border-radius: 12px;
  }
</style>
