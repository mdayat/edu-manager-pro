<script>
  import { onMount } from "svelte";

  let students = []; // array to store fetched student data

  onMount(async () => {
    // Fetch student data when the component is mounted
    await getStudentData();
  });

  async function getStudentData() {
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);

    const response = await fetch("/api/students", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      students = await response.json();
      console.log("Fetched student data:", students);
    } else if (response.status === 401) {
      console.log("Unauthorized: Invalid access Token");
    } else if (response.status === 500) {
      console.error("Internal Server Error: ", response.statusText);
    } else {
      console.error("Error fetching student data:", response.statusText);
    }
  }
</script>

<div class="formStudent">
  <h2>Student List</h2>

  {#if students.length > 0}
    <ul>
      {#each students as student (student.id)}
        <li>{student.name}</li>
        <li>{student.email}</li>
        <li>{student.age} years old</li>
        <li>{student.gender}</li>
        <li>{student.address}</li>
        <li>Paymen Status : {student.payment_status}</li>
      {/each}
    </ul>
  {:else}
    <p>No students found.</p>
  {/if}
</div>

<style>
  .formStudent {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
  }

  h2 {
    font-family: sans-serif;
    text-align: center;
    margin-top: 0%;
    margin-bottom: 0%;
  }
</style>
