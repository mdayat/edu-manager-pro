<script>
  import { logOut } from "../../lib/auth";
</script>

<nav id="navigation drawer" class="sidebar locked">
  <div class="logo_items">
    <span class="logo_name">EduManagerPro</span>
    <i class="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
    <i class="bx bx-x" id="sidebar-close"></i>
  </div>

  <div class="menu_container">
    <ul class="menu_item">
      <li class="item">
        <a href="/" class="link">Home</a>
      </li>
      <li class="item">
        <a href="/classrooms" class="link">Classrooms</a>
      </li>
      <li class="item">
        <a href="/students" class="link">Students</a>
      </li>
      <li class="item">
        <a href="/profile" class="link">Profile</a>
      </li>
      <li class="item">
        <button type="button" on:click={logOut} class="link">Logout</button>
      </li>
    </ul>
  </div>
</nav>

<!-- /* style kode tampilan dashboard */
  /* Import Google font - Poppins */ -->
<style>
  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 190px;
    background: #323f6c;
    padding: 15px 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .logo_items {
    gap: 8px;
  }
  .logo_name {
    font-size: 22px;
    color: #ffffff;
    font-weight: 500px;
    transition: all 0.3s ease;
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
    color: #ffffff;
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

  .menu_item {
    display: flex;
    flex-direction: column;
    gap: 8px 0;
  }
  .item {
    list-style: none;
  }
  .link {
    display: block;
    text-decoration: none;
    border-radius: 12px;
    color: #ffffff;
    padding: 16px;
    width: 100%;
    background-color: transparent;
    border: none;
    text-align: start;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .link:hover {
    background-color: #10af13;
    transition: background-color 250ms ease-in-out;
  }

  @media screen and (max-width: 800px) {
    .sidebar {
      left: 0;
      z-index: 1000;
    }

    #sidebar-close {
      display: block;
    }
    #lock-icon {
      display: none;
    }
  }
</style>
