<script>
  import { handleInvalidAccessToken } from "../../auth";

  const student = {
    name: "",
    email: "",
    age: 0,
    gender: "",
    address: "",
    payment_status: false,
  };

  const createStudent = (event) => {
    event.preventDefault();
    const apiEndpoint = "/api/students";
    const accessToken = localStorage.getItem("access_token");
    const encodedStudent = JSON.stringify(student);

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: encodedStudent,
    }).then((res) => {
      if (res.status === 500) {
        alert(`Failed to create new student. Error code ${res.status}`);
        return;
      }
      if (res.status === 401) {
        handleInvalidAccessToken().then((newAccessToken) => {
          fetch(apiEndpoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
            body: encodedStudent,
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

<form action="" method="post" on:submit={createStudent}>
  <h2>Input Your Student</h2>
  <label for="name">Name</label>
  <input
    type="text"
    id="name"
    name="name"
    autocomplete="off"
    required
    bind:value={student.name}
  />

  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    autocomplete="off"
    required
    bind:value={student.email}
  />

  <label for="age">Age</label>
  <input
    type="number"
    id="age"
    name="age"
    autocomplete="off"
    required
    bind:value={student.age}
  />

  <fieldset>
    <legend>Gender</legend>
    <label for="male">Male</label>
    <input
      type="radio"
      name="gender"
      id="male"
      value="male"
      required
      bind:group={student.gender}
    />

    <label for="female">Female</label>
    <input
      type="radio"
      name="gender"
      id="female"
      value="female"
      required
      bind:group={student.gender}
    />
  </fieldset>

  <label for="address">Address</label>
  <textarea
    id="address"
    name="address"
    autocomplete="off"
    cols="30"
    rows="10"
    required
    bind:value={student.address}
  ></textarea>

  <fieldset class="payment-status">
    <label for="payment_status">Payment Status</label>
    <input
      type="checkbox"
      id="payment_status"
      name="payment_status"
      bind:checked={student.payment_status}
    />
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-family: "Poppins", sans-serif;
  }

  .payment-status {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  input[type="checkbox"] {
    margin-left: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }

  legend {
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input[type="radio"] {
    margin-right: 5px;
  }

  button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
