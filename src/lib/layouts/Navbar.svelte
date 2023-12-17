<script>
  import { logOut } from "../../lib/auth";
</script>

<nav id="navigation drawer" class="sidebar">
  <div class="logo_items">
    <span class="logo_name">EduManagerPro</span>
  </div>

  <ul class="menu">
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
</nav>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 220px;
    background: #323f6c;
    padding: 16px;
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

  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px 0;
    margin-top: 48px;
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
    border: none;
    font-size: 16px;
    font-weight: 600;
  }
  .item > button {
    background-color: transparent;
    cursor: pointer;
    text-align: start;
    width: 100%;
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
  }
</style>
