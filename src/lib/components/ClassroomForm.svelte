<!-- ClassroomForm.svelte -->
<script>
  let formClassData = {
    name: "",
    description: "",
    studentIds: 0,
  };

  async function handleSubmit() {
    const accessToken = localStorage.getItem("access_token");
    console.log(formClassData);
    console.log(accessToken);

    const response = await fetch("/api/classrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formClassData),
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

<div class="formAllClass">
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={formClassData.name} />

    <label for="description">Description:</label>
    <input
      type="text"
      id="description"
      bind:value={formClassData.description}
    />

    <label for="id">Id:</label>
    <input type="text" id="id" bind:value={formClassData.studentIds} />

    <button type="submit">Submit</button>
  </form>
</div>

<div class="getAllClass">
  <li>Class : <text src={formClassData.name} /></li>
  <li>Description: <text src={formClassData.desricption} /></li>
  <li>Id : <text src={formClassData.studentIds} /></li>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  .formAllClass {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
  }

  .getAllClass {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
  }
</style>
