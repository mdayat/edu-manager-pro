<script>
  import { page } from "$app/stores";
  import { handleInvalidAccessToken } from "../../../lib/auth";
  const classroomId = $page.params.classroomId;

  const getClassroom = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = `/api/classrooms/${classroomId}`;
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
                .then((classroom) => {
                  resolve(classroom);
                });
            });
            return;
          }

          return res.json();
        })
        .then((classroom) => {
          resolve(classroom);
        });
    });

    return promise;
  };
</script>

<main>
  <h1>Details of classroom: {classroomId}</h1>
  <div class="clasroom-list-detail" > 
  {#await getClassroom()}
    <p>LOADING...</p>
  {:then classroom}
    <a href="/classrooms">Back</a>

    <p>Classroom Name: {classroom.name}</p>
    <p>Classroom Description: {classroom.description}</p>
    <p>
      Number of Enrolled Students: {classroom.enrolledStudents.length}
    </p>

    <div class="enrolled-students-container">
      <h2>Enrolled Students:</h2>
      <ul class="card-student">
        {#each classroom.enrolledStudents as student}
          <li>
            <p>Student ID: {student.id}</p>
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
              Student Payment Status: {student.payment_status}
            </p>
            <a href={`/students/${student.id}`}>See the Details</a>
          </li>
        {/each}
      </ul>
    </div>
  {:catch errStatusCode}
    {#if errStatusCode === 500}
      <p>Ooops... Something went wrong!</p>
    {:else if errStatusCode === 404}
      <p>Classroom not found</p>
    {/if}
  {/await}
</div>

</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .enrolled-students-container {
    margin-top: 24px;
  }
  .card-student {
    margin-top: 16px;
    background-color: #ddd;
    width: fit-content;
    padding: 16px;
    border-radius: 12px;
  }

  .clasroom-list-detail{
    background-color: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 30px;
    width: 50%;
    margin: auto;
  }

  p{
    margin: 10px;
  }
</style>
