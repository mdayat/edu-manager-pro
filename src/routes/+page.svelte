<script>
  import { handleInvalidAccessToken, logOut } from "../lib/auth";

  let isGetUserClicked = false;

  const handleGetUser = () => {
    isGetUserClicked = true;
  };

  const getUser = () => {
    const promise = new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem("access_token");
      fetch("api/users/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((user) => {
            resolve(user);
          });
        }

        // Handle response when user is not found
        if (res.status === 404) {
          reject("User not found");
        }

        // Handle response when access token is invalid
        if (res.status === 401) {
          handleInvalidAccessToken().then((newAccessToken) => {
            // Get user (again) with the new access token
            fetch("api/users/me", {
              headers: {
                Authorization: "Bearer " + newAccessToken,
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((user) => {
                resolve(user);
              });
          });
        }
      });
    });

    return promise;
  };

</script>

<h1>Hello From Home Page</h1>

<div class="logout_button">
<button type="button" on:click={logOut}>Log Out</button>
<button type="button" on:click={handleGetUser}>
  Click to show account information
</button>
</div>

{#if isGetUserClicked}
  {#await getUser()}
    <p>LOADING...</p>
  {:then user}
    <ul>
      <li>Account Id: {user.id}</li>
      <li>Account Email: {user.email}</li>
      <li>Account Name: {user.name}</li>
      <li>Account Picture: {user.pictureUrl}</li>
      <li>
        Your Picture Looks Like: <img src={user.pictureUrl} alt={user.name} />
      </li>
    </ul>
  {:catch msg}
    <p>
      {msg}
    </p>
  {/await}
{/if}

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar Menu </title>
    <link rel="stylesheet" href="style.css" />
        <!-- Boxicons CSS -->
        <link flex href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
  </head>

  <body>
    <nav id="navigation drawer" class="sidebar locked">

        <div class="logo_items flex">
        <span class="logo_name">EduManagerPro</span>
        <i class="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
        <i class="bx bx-x" id="sidebar-close"></i>
      </div>

      <div class="menu_container">
        <div class="menu_items">
          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Menu</span>
              <span class="line"></span>
            </div>
            <li class="item">
              <a href="/Dashboard" class="link flex">
                <i class="bx bx-home-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li class="item">
              <a href="/Schedule" class="link flex">
                <i class="bx bx-calendar"></i>
                <span>Schedule</span>
              </a>
            </li>
          </ul>

          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Admin</span>
              <span class="line"></span>
            </div>
            <li class="item">
              <a href="/Lesson" class="link flex">
                <i class="bx bx-pencil"></i>
                <span>Lesson</span>
              </a>
            </li>
            <li class="item">
              <a href="/Groups" class="link flex">
                <i class="bx bx-group"></i>
                <span>Groups</span>
              </a>
            </li>
            <li class="item">
              <a href="/Student" class="link flex">
                <i class="bx bx-user"></i>
                <span>Student</span>
              </a>
            </li>
            <li class="item">
              <a href="/Profile" class="link flex">
                <i class="bx bxs-user-account"></i>
                <span>Profile</span>
              </a>
            </li>
          </ul>
      </div>
    </nav>
  </body>

</html>

<style>
  h1 {
    color: salmon;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  .logout_button {
    text-align: center;
  }

/* style kode tampilan dashboard */
/* Import Google font - Poppins */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  min-height: 100vh;
  background: #eef5fe;
}
/* Pre css */
.flex {
  display: flex;
  align-items: center;
}
.nav_image {
  display: flex;
  min-width: 55px;
  justify-content: center;
  
}
.nav_image img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 190px;
  background: #fff;
  padding: 15px 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}
.sidebar.close {
  width: calc(55px + 20px);
}
.logo_items {
  gap: 8px;
}
.logo_name {
  font-size: 22px;
  color: #333;
  font-weight: 500px;
  transition: all 0.3s ease;
}
.sidebar.close .logo_name,
.sidebar.close #lock-icon,
.sidebar.close #sidebar-close {
  opacity: 0;
  pointer-events: none;
}
#lock-icon,
#sidebar-close {
  padding: 10px;
  color: #4070f4;
  font-size: 25px;
  cursor: pointer;
  margin-left: -4px;
  transition: all 0.3s ease;
}
#sidebar-close {
  display: none;
  color: #333;
}
.menu_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  overflow-y: auto;
  height: calc(100% - 82px);
}
.menu_container::-webkit-scrollbar {
  display: none;
}
.menu_title {
  position: relative;
  height: 50px;
  width: 55px;
}
.menu_title .title {
  margin-left: 15px;
  transition: all 0.3s ease;
}
.sidebar.close .title {
  opacity: 0;
}
.menu_title .line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 20px;
  border-radius: 25px;
  background: #aaa;
  transition: all 0.3s ease;
}
.menu_title .line {
  opacity: 0;
}
.sidebar.close .line {
  opacity: 1;
}
.item {
  list-style: none;
}
.link {
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #707070;
}
.link:hover {
  color: #fff;
  background-color: #4070f4;
}
.link span {
  white-space: nowrap;
}
.link i {
  height: 50px;
  min-width: 55px;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}


/* Navbar */
.navbar {
  max-width: 500px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 60%;
  transform: translateX(-50%);
  background: #fff;
  padding: 10px 20px;
  border-radius: 0 0 8px 8px;
  justify-content: space-between;
}
#sidebar-open {
  font-size: 30px;
  color: #333;
  cursor: pointer;
  margin-right: 20px;
  display: none;
}

.navbar img {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}

/* Responsive */
@media screen and (max-width: 1100px) {
  .navbar {
    left: 65%;
  }
}
@media screen and (max-width: 800px) {
  .sidebar {
    left: 0;
    z-index: 1000;
  }
  .sidebar.close {
    left: -100%;
  }
  #sidebar-close {
    display: block;
  }
  #lock-icon {
    display: none;
  }
  .navbar {
    left: 0;
    max-width: 100%;
    transform: translateX(0%);
  }
  #sidebar-open {
    display: block;
  }
}


</style>
