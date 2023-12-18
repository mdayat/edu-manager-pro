<script>
  import { handleInvalidAccessToken } from "../../auth";

  const classroom = {
    name: "",
    description: "",
    studentIds: [],
  };

  const createClassroom = () => {
    const promise = new Promise((resolve, reject) => {
      const apiEndpoint = "/api/classrooms";
      const accessToken = localStorage.getItem("access_token");
      const encodedClassroom = JSON.stringify(classroom);

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: encodedClassroom,
      }).then((res) => {
        if (res.status === 500) {
          reject(res.status);
          return;
        }

        if (res.status === 401) {
          handleInvalidAccessToken().then((newAccessToken) => {
            fetch(apiEndpoint, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
              body: encodedClassroom,
            }).then((res) => {
              resolve(res.status);
            });
          });
          return;
        }

        resolve(res.status);
      });
    });

    return promise;
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    createClassroom();
  };
</script>

<form action="" method="post" on:submit={handleSubmit}>
  <h2>Input Class</h2>
  <label for="name">Name</label>
  <input
    type="text"
    id="name"
    name="name"
    autocomplete="off"
    required
    bind:value={classroom.name}
  />

  <label for="description">Description</label>
  <textarea
    id="description"
    name="description"
    autocomplete="off"
    cols="30"
    rows="10"
    required
    bind:value={classroom.description}
  ></textarea>

  <fieldset>
    <legend>
      Pilih students yang akan didaftarkan ketika pembuatan classroom, minimal
      pilih satu:
    </legend>

    {#await getStudents()}
      <p>LOADING...</p>
    {:then students}
      <ul>
        {#each students as student (student.id)}
          <li class="card">
            <label for={student.id}>{student.name}</label>
            <input
              type="checkbox"
              id={student.id}
              name="studentEnrollment"
              value={student.id}
              bind:group={classroom.studentIds}
            />
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
  </fieldset>

  <button type="submit">Submit</button>
</form>

<style>
  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 13px;
  }
  form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    margin-bottom: 15px; /* Add margin between the fieldset and the next element */
    display: flex; /* Use flexbox to arrange items horizontally */
    align-items: center; /* Center items vertically within the fieldset */
  }

  legend {
    font-weight: bold;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .card {
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }

  .card label {
    margin-right: 10px;
  }

  .card input[type="checkbox"] {
    margin-right: 5px;
  }

  button {
    padding: 10px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }

</style>
