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
  <div class="form_name">
    <label for="name">Name :</label>
    <input
      type="text"
      id="name"
      name="name"
      autocomplete="off"
      required
      bind:value={classroom.name}
    />
  </div>
  <div class="form_description">
    <label for="description">Description :</label>
    <textarea
      id="description"
      name="description"
      autocomplete="off"
      cols="30"
      rows="10"
      required
      bind:value={classroom.description}
    ></textarea>
  </div>

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
  .card {
    background-color: #ddd;
    width: fit-content;
    padding: 16px;
    border-radius: 12px;
    margin: 16px 0;
  }

  .form_description {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  ul {
    display: inline;
  }
</style>
