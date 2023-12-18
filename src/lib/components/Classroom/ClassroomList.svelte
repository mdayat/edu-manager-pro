<script>
//   import { handleInvalidAccessToken } from "../../lib/auth";
    import { handleInvalidAccessToken } from "../../auth";

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
  <div class="class-list">
    <div class="class-list">
      <div class="class-list__title">
        <h1>Welcome to EduManagerPro</h1>
        <p>"EduManagerPro is an intuitive tool designed for teachers offering private classes, providing seamless class and student management to enhance organization and efficiency in their educational endeavors."</p>
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
              <!-- <p>Description : {classroom.description}</p> -->
              <p>
                Number of Enrolled Students: {classroom.numberOfEnrolledStudents}
              </p>
    
              <a href={`/classrooms/${classroom.id}`}>See the Details</a>
              
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
    max-width: 850px;
    margin: 32px auto;
    display: flex;
  }

  h1 {
    color: #323f6c;
    font-size: 2rem;
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

  .class-id {
    font-size: 0.8em;
    color: #777;
  }

  ul {
    list-style: none;
    padding: 0;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
  }

  a {
    color: #3498db;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>