<!-- StudentForm.svelte -->
<script>
  let formData = {
    name: "",
    email: "",
    age: 0,
    gender: "male",
    address: "",
    payment_status: false,
  };

  async function handleSubmit() {
    const accessToken = localStorage.getItem("access_token");
    // console.log(formData);
    // console.log(accessToken);

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    // Handle the response as needed
    if (response.ok) {
      console.error("Student data submitted successfully!");
      // Reset the form data
      formData = {
        name: "",
        email: "",
        age: 0,
        gender: "male",
        address: "",
        payment_status: false,
      };
    } else if (response.status === 401) {
      console.log("Unauthorized: Invalid access Token");
    } else if (response.status === 500) {
      console.error("Internal Server Error: ", response.statusText);
    } else {
      console.error("Error submitting student data:", response.statusText);
    }
  }
</script>

<div class="formStudent">
  <h2>Submit a Student</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={formData.name} />

    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={formData.email} />

    <label for="age">Age:</label>
    <input type="number" id="age" bind:value={formData.age} />

    <label for="gender">Gender:</label>
    <select id="gender" bind:value={formData.gender}>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>

    <label for="address">Address:</label>
    <textarea id="address" bind:value={formData.address}></textarea>

    <label for="payment_status">Payment Status:</label>
    <input
      type="checkbox"
      id="payment_status"
      bind:checked={formData.payment_status}
    />

    <button type="submit">Submit</button>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 250px;
  }

  .formStudent {
    border: 2px solid;
    border-color: #323f6c;
    margin: auto;
    width: 50%;
    padding: 10px;
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
