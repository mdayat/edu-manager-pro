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

  const createStudent = () => {
    const promise = new Promise((resolve, reject) => {
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
              body: encodedStudent,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    createStudent();
  };
</script>

<form action="" method="post" on:submit={handleSubmit}>
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

  <label for="payment_status">Payment Status</label>
  <input
    type="checkbox"
    id="payment_status"
    name="payment_status"
    bind:checked={student.payment_status}
  />

  <button type="submit">Submit</button>
</form>

<style>
  form {
    margin-bottom: 15px;
  }
</style>
