<!-- UserProfile.svelte -->
<script>
    let dataUser = {
    id: '',
    name: '',
    email: '',
    picture_url:'',
    }

    async function handleSubmit() {
      const accessToken = localStorage.getItem("access_token")
      console.log(dataUser)
      console.log(accessToken)
  
  
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataUser),
      });
  
      // Handle the response as needed
      if (response.ok) {
        console.error('Student data submitted successfully!');
      } else if (response.status === 401) {
        console.log('Unauthorized: Invalid access Token')
      } else if (response.status === 500) {
        console.error('Internal Server Error: ', response.statusText)
      } else {
         console.error('Error submitting student data:', response.statusText);
      }
    }

    


</script>
<div>


</div>
    <div class="name">
    <li>
        Picture Account: <img src={dataUser.picture_url} alt={dataUser.name} />
    </li>
        <form on:submit|preventDefault={handleSubmit}>
            <label for="id">Id:</label>
            <input type="text" id="id" bind:value={dataUser.id} />

            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={dataUser.name} />
            
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={dataUser.email} />
            
            <button id="btn_sub" type="submit">Submit</button>
        </form>
    </div>
    
    

<style>
.name {
    border: 2px solid;
    border-color: #323F6C;
    margin: auto;
    width: 50%;
    padding: 10px;
}
#btn_sub {
    margin: auto;
    width: 100%;
    padding: 5px;
}

</style>