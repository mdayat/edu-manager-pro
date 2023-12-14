<!-- CreateClassroomForm.svelte -->
<script>
  let formCreateClass = {
    name: "",
    description: "",
    studentIds: 0,
  };

  async function handleSubmit() {
    const accessToken = localStorage.getItem("access_token");
    console.log(formCreateClass);
    console.log(accessToken);

    const response = await fetch("/api/classrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formCreateClass),
    });

    // Handle the response as needed
    if (response.ok) {
      console.error("Student data submitted successfully!");
    } else if (response.status === 401) {
      console.log("Unauthorized: Invalid access Token");
    } else if (response.status === 500) {
      console.error("Internal Server Error: ", response.statusText);
    } else {
      console.error("Error submitting student data:", response.statusText);
    }
  }
</script>

<div class="formCreateClass">
  <h2>Create a Classroom</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={formCreateClass.name} />

    <label for="description">Description:</label>
    <input
      type="text"
      id="description"
      bind:value={formCreateClass.description}
    />

    <label for="id">Id:</label>
    <input type="text" id="id" bind:value={formCreateClass.studentIds} />

    <button type="submit">Submit</button>
  </form>
</div>

<div class="getCreateClass">
  <li>Class : <text src={formCreateClass.name} /></li>
  <li>Description: <text src={formCreateClass.desricption} /></li>
  <li>Id : <text src={formCreateClass.studentIds} /></li>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  .formCreateClass {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
  }

  .getCreateClass {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
    font-family: sans-serif;
  }

  label {
    font-family: sans-serif;
  }

  h2 {
    font-family: sans-serif;
    text-align: center;
    margin-top: 0%;
    margin-bottom: 0%;
  }
</style>
