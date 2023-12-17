<script>
  import { handleInvalidAccessToken } from "../../lib/auth";

  const getStudents = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = "/api/students";
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
                .then((students) => {
                  resolve(students);
                });
            });
            return;
          }

          return res.json();
        })
        .then((students) => {
          resolve(students);
        });
    });

    return promise;
  };
</script>

<main>
  <h1>List of students</h1>

  {#await getStudents()}
    <p>LOADING...</p>
  {:then students}
    <ul>
      {#each students as student}
        <li class="card">
          <p>Student ID: {student.id}</p>
          <p>Student Name: {student.name}</p>
          <p>Student Email: {student.email}</p>
          <p>Student Age: {student.age}</p>
          <p>Student Payment Status: {student.payment_status}</p>
          <p>
            Number of Enrolled Classrooms: {student.numberOfEnrolledClassrooms}
          </p>

          <a href={`/students/${student.id}`}>See the Details</a>
        </li>
      {/each}
    </ul>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {:else if errStatusCode === 404}
      <p>There is no students to show</p>
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
    margin: 16px 0;
  }
</style>
