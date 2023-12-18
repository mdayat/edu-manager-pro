<script>
  import { handleInvalidAccessToken } from "../../lib/auth";
  import CreateForm from "../../lib/components/Classroom/CreateForm.svelte";

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
  <div class="input-class">
    <CreateForm />
  </div>

  <div class="class-list">
    <div class="class-list">
      <div class="class-list__title">
        <h1>List of classrooms</h1>
      </div>

      {#await getClassrooms()}
        <p>LOADING...</p>
      {:then classrooms}
        <div class="class-list__card">
          <ul>
            {#each classrooms as classroom}
              <li class="card">
                <h3>{classroom.name}</h3>
                <p class="class-id">Classroom ID: {classroom.id}</p>
                <p>
                  Number of Enrolled Students: {classroom.numberOfEnrolledStudents}
                </p>

                <a href={`/classrooms/${classroom.id}`}>See the Details</a>

                <div class="button-container">
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {:catch errStatusCode}
        {#if errStatusCode === 500}
          <p>Ooops... Something went wrong!</p>
        {:else if errStatusCode === 404}
          <p>There is no classrooms to show</p>
        {/if}
      {/await}
    </div>
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

  .class-list__title {
    text-align: center;
  }

  .class-list__title h1 {
    color: black;
    font-size: 2rem;
  }

  .class-id {
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
