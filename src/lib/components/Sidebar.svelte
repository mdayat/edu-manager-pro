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
            <a href="/dashboard" class="link flex">
              <i class="bx bx-home-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="item">
            <a href="/schedule" class="link flex">
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
            <a href="/groups" class="link flex">
              <i class="bx bx-group"></i>
              <span>Groups</span>
            </a>
          </li>
          <li class="item">
            <a href="/student" class="link flex">
              <i class="bx bx-user"></i>
              <span>Student</span>
            </a>
          </li>
          <li class="item">
            <a href="/profile" class="link flex">
              <i class="bx bxs-user-account"></i>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>


  <!-- /* style kode tampilan dashboard */
  /* Import Google font - Poppins */ -->
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  /* Pre css */
  .flex {
    display: flex;
    align-items: center;
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 190px;
    background: #323F6C;
    padding: 15px 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .logo_items {
    gap: 8px;
  }
  .logo_name {
    font-size: 22px;
    color: #FFFFFF;
;
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
    color:#FFFFFF;
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
    color: #FFFFFF;
  }
  .menu_title .title {
    margin-left: 15px;
    transition: all 0.3s ease;
  }

  .menu_title .line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 20px;
    border-radius: 25px;
    background: #FFFFFF;
;
    transition: all 0.3s ease;
  }
  .menu_title .line {
    opacity: 0;
  }

  .item {
    list-style: none;
  }
  .link {
    text-decoration: none;
    border-radius: 8px;
    margin-bottom: 8px;
    color: #FFFFFF;
;
  }
  .link:hover {
    background-color: #10AF13;
;
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