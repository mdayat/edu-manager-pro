<script>
  import { page } from "$app/stores";
  import { handleInvalidAccessToken } from "../../../lib/auth";
  const studentId = $page.params.studentId;

  const getStudent = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = `/api/students/${studentId}`;
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
                .then((student) => {
                  resolve(student);
                });
            });
            return;
          }

          return res.json();
        })
        .then((student) => {
          resolve(student);
        });
    });

    return promise;
  };
</script>

<main>
  <h1>Details of student: {studentId}</h1>

  {#await getStudent()}
    <p>LOADING...</p>
  {:then student}
    <a href="/students">Back</a>

    <p>
      Student Name: {student.name}
    </p>
    <p>
      Student Email: {student.email}
    </p>
    <p>
      Student Age: {student.age}
    </p>
    <p>
      Student Gender: {student.gender}
    </p>
    <p>
      Student Address: {student.address}
    </p>
    <p>
      Student Payment Status: {student.payment_status}
    </p>
    <p>
      Number of Enrolled Classrooms: {student.enrolledClassrooms.length}
    </p>

    <div class="enrolled-classrooms-container">
      <h2>Enrolled Classrooms:</h2>
      {#if student.enrolledClassrooms.length !== 0}
        <ul class="card-classroom">
          {#each student.enrolledClassrooms as classroom}
            <li>
              <p>Classroom ID: {classroom.id}</p>
              <p>Classroom Name: {classroom.name}</p>
              <a href={`/classrooms/${classroom.id}`}>See the Details</a>
            </li>
          {/each}
        </ul>
      {:else}
        <p>Belum terdaftar di kelas manapun</p>
      {/if}
    </div>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {:else if errStatusCode === 404}
      <p>Student not found</p>
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

  .enrolled-classrooms-container {
    margin-top: 24px;
  }
  .card-classroom {
    margin-top: 16px;
    background-color: #ddd;
    width: fit-content;
    padding: 16px;
    border-radius: 12px;
  }
</style>
