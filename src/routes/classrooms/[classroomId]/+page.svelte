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
  <div class="classroom-details">
    <h1>Details of classroom: {classroomId}</h1>

    {#await getClassroom()}
      <p class="loading">LOADING...</p>
    {:then classroom}
      <a href="/classrooms" class="back-link">Back</a>

      <div class="classroom-info">
        <p class="info-item">
          <span class="info-label">Classroom Name:</span>
          {classroom.name}
        </p>
        <p class="info-item">
          <span class="info-label">Classroom Description:</span>
          {classroom.description}
        </p>
        <p class="info-item">
          <span class="info-label">Number of Enrolled Students:</span>
          {classroom.enrolledStudents.length}
        </p>
      </div>

      <div class="enrolled-students-container">
        <h2 class="students-header">Enrolled Students:</h2>
        <ul class="card-student">
          {#each classroom.enrolledStudents as student}
            <li class="student-card">
              <p class="student-name">{student.name}</p>
              <p class="student-id">Student ID: {student.id}</p>
              <p class="student-email">Student Email: {student.email}</p>
              <p class="student-age">Student Age: {student.age}</p>
              <p class="payment-status">
                Student Payment Status: {student.payment_status}
              </p>
              <a href={`/students/${student.id}`} class="details-link"
                >See Details</a
              >
            </li>
          {/each}
        </ul>
      </div>
    {:catch errStatusCode}
      {#if errStatusCode === 500}
        <p class="error-message">Ooops... Something went wrong!</p>
      {:else if errStatusCode === 404}
        <p class="error-message">Classroom not found</p>
      {/if}
    {/await}
  </div>
</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }

  .classroom-details {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  h1 {
    color: #3498db;
    font-size: 24px;
    font-weight: bold;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 20px;
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }

  .back-link:hover {
    color: #2980b9;
  }

  .classroom-info {
    margin-top: 20px;
  }

  .info-item {
    margin-bottom: 10px;
  }

  .info-label {
    font-weight: bold;
    margin-right: 8px;
    color: #333;
  }

  .enrolled-students-container {
    margin-top: 24px;
  }

  .students-header {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }

  .card-student {
    list-style: none;
    padding: 0;
  }

  .student-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .student-name {
    color: #2980b9;
    font-weight: 700;
    font-size: 18px;
  }

  .student-id {
    color: gray;
    font-size: 12px;
    margin-bottom: 8px;
  }
  .student-email,
  .student-age,
  .payment-status {
    color: #333;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .details-link {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
    display: inline-block;
    font-size: 14px;
  }

  .details-link:hover {
    color: #2980b9;
  }

  .loading,
  .error-message {
    color: #333;
    font-size: 16px;
    margin-top: 20px;
  }
</style>
