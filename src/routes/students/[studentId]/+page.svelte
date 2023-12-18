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
  <div class="student-details">
    <h1>Details of student: {studentId}</h1>

    {#await getStudent()}
      <p class="loading">LOADING...</p>
    {:then student}
      <a href="/students" class="back-link">Back</a>

      <div class="student-info">
        <p class="info-item">
          <span class="info-label">Student Name:</span>
          {student.name}
        </p>
        <p class="info-item">
          <span class="info-label">Student Email:</span>
          {student.email}
        </p>
        <p class="info-item">
          <span class="info-label">Student Age:</span>
          {student.age}
        </p>
        <p class="info-item">
          <span class="info-label">Student Gender:</span>
          {student.gender}
        </p>
        <p class="info-item">
          <span class="info-label">Student Address:</span>
          {student.address}
        </p>
        <p class="info-item">
          <span class="info-label">Student Payment Status:</span>
          {student.payment_status}
        </p>
        <p class="info-item">
          <span class="info-label">Number of Enrolled Classrooms:</span>
          {student.enrolledClassrooms.length}
        </p>
      </div>

      <div class="enrolled-classrooms-container">
        <h2 class="classroom-header">Enrolled Classrooms:</h2>
        {#if student.enrolledClassrooms.length !== 0}
          <ul class="card-classroom">
            {#each student.enrolledClassrooms as classroom}
              <li class="classroom-card">
                <p class="classroom-name">{classroom.name}</p>
                <p class="classroom-id">Classroom ID: {classroom.id}</p>
                <a href={`/classrooms/${classroom.id}`} class="details-link"
                  >See Details</a
                >
              </li>
            {/each}
          </ul>
        {:else}
          <p class="no-enrollment">Not enrolled in any classrooms</p>
        {/if}
      </div>
    {:catch errStatusCode}
      {#if errStatusCode === 500}
        <p class="error-message">Ooops... Something went wrong!</p>
      {:else if errStatusCode === 404}
        <p class="error-message">Student not found</p>
      {/if}
    {/await}
  </div>
</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
  }

  .student-details {
    background-color: #f9f9f9;
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

  .student-info {
    margin-top: 20px;
  }

  .info-item {
    margin-bottom: 10px;
  }

  .info-label {
    font-weight: bold;
    margin-right: 8px;
    color: #555;
  }

  .enrolled-classrooms-container {
    margin-top: 24px;
  }

  .classroom-header {
    color: #555;
    font-size: 18px;
    font-weight: bold;
  }

  .card-classroom {
    list-style: none;
    padding: 0;
  }

  .classroom-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .classroom-name {
    color: #3498db;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .classroom-id {
    color: #888;
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
  .no-enrollment,
  .error-message {
    color: #555;
    font-size: 16px;
    margin-top: 20px;
  }
</style>
