<script>
  import { handleInvalidAccessToken } from "../../lib/auth";
  import CreateForm from "../../lib/components/Student/CreateForm.svelte";

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

  const deleteStudent = (event) => {
    const studentId = event.currentTarget.id;
    const apiEndpoint = `/api/students/${studentId}`;
    const accessToken = localStorage.getItem("access_token");

    fetch(apiEndpoint, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then((res) => {
      if (res.status === 500) {
        alert(`Failed to delete a student with the id of ${studentId}`);
        return;
      }

      if (res.status === 401) {
        handleInvalidAccessToken().then((newAccessToken) => {
          fetch(apiEndpoint, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + newAccessToken,
            },
          }).then(() => {
            window.location.reload();
          });
        });
        return;
      }

      window.location.reload();
    });
  };
</script>

<main>
  <div class="input-student">
    <CreateForm />
  </div>

  <div class="student-list">
    <div class="student-list__title">
      <h1>List of students</h1>
    </div>

    {#await getStudents()}
      <p>LOADING...</p>
    {:then students}
      <div class="student-list__card">
        <ul>
          {#each students as student}
            <li class="card">
              <h3>{student.name}</h3>
              <p class="student-id">Student ID: {student.id}</p>
              <p>Email: {student.email}</p>
              <p>Age: {student.age}</p>
              <p>Payment Status: {student.payment_status}</p>
              <p>
                Number of Enrolled Classrooms: {student.numberOfEnrolledClassrooms}
              </p>

              <a href={`/students/${student.id}`}>See the Details</a>

              <div class="button-container">
                <button type="button" class="edit-button">Edit</button>
                <button
                  type="button"
                  id={student.id}
                  class="delete-button"
                  on:click={deleteStudent}>Delete</button
                >
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {:catch errStatusCode}
      {#if errStatusCode === 500}
        <p>Ooops... Something went wrong!</p>
      {:else if errStatusCode === 404}
        <p>There is no students to show</p>
      {/if}
    {/await}
  </div>
</main>

<style>
  main {
    margin-left: calc(210px + 48px);
    margin-top: 32px;
    display: flex;
  }

  h1 {
    color: black;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .card p {
    line-height: 24px;
    font-size: 0.8rem;
  }

  .card {
    background-color: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-bottom: 20px;
    transition: background-color 0.3s;
    position: relative;
  }

  .card:hover {
    background-color: #e0e0e0;
  }

  .card h3 {
    font-size: 1.5em;
    color: #3498db;
    margin-bottom: 10px;
  }

  .student-list__title {
    text-align: center;
  }

  .student-list__title h1 {
    color: black;
    font-size: 2rem;
  }

  /* Make student ID smaller */
  .student-id {
    font-size: 0.8em;
    color: #777;
  }

  .button-container {
    display: flex;
    justify-content: left;
    margin-top: 10px;
  }

  .edit-button,
  .delete-button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }

  .delete-button {
    background-color: #e74c3c;
  }

  ul {
    list-style: none;
    padding: 0;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    ); /* Two columns, each with a minimum width of 300px */
    grid-gap: 20px; /* Adjust the gap between cards */
  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
