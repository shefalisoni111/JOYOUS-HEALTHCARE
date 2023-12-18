<template>
  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/appsetting"
          aria-label="appSettingPage"
        >
          <i class="bi bi-gear"></i>
        </router-link>
      </li>

      <!-- <li class="nav-item">
        <router-link
          class="nav-link"
          data-bs-target="#Live-Location-nav"
          data-bs-toggle=""
          to="/appsetting/agencysetting"
          aria-label="agencysettingPage"
        >
          <i class="bi bi-person"></i>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          data-bs-target="#Employees-nav"
          data-bs-toggle=""
          to="/appsetting/invoicesetting"
          aria-label="invoicesettingPage"
        >
          <i class="bi bi-file-earmark-text"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" to="" aria-label="Page">
          <i class="bi bi-card-list"></i>
        </a>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/appsetting/notificationsetting">
          <i class="bi bi-bell" aria-label="Page"></i>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/appsetting/previlegesetting" aria-label="previlegesettingPage">
          <i class="bi bi-person-check"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" to="" aria-label="Page">
          <i class="bi bi-people"></i>
        </a>
      </li> -->
    </ul>
  </aside>
  <!-- End Sidebar-->
</template>

<style scoped>
.sidebar {
  top: 161px;
  left: 23px;
  bottom: 0;
  z-index: 996;
  transition: all 0.3s;

  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  background-color: #fff;
  height: 100dvh;
  border-right: 1px solid #f1e7e7;
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

@media (min-width: 1200px) {
  #main,
  #footer {
    margin-left: 242px;
  }
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar .sidebar-nav a.router-link-active {
  color: #f6f9ff;
  background: #ff5f30;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-item {
  margin-bottom: 5px;
  margin: 12px;
}

.sidebar-nav .nav-heading {
  font-size: 11px;
  text-transform: uppercase;
  color: #899bbd;
  font-weight: 600;
  margin: 10px 0 5px 15px;
}

.sidebar-nav .nav-link {
  text-align: center;
  font-size: 20px;

  padding: 10px 20px;
  transition: 0.3;
  border-radius: 4px;
}

.sidebar-nav .nav-link i {
  font-size: 20px;
}

.sidebar-nav .nav-link.collapsed {
  color: #0d6efd;
  background: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #f1e8e8;
  border-radius: 0px;
}

.sidebar-nav .nav-link.collapsed:nth-last-child() {
  border-bottom: 0px;
}

.sidebar-nav .nav-link:hover {
  color: #fff;
  background: #0d6efd;
}

.sidebar-nav .nav-link .bi-chevron-down {
  margin-right: 0;
  transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
  transform: rotate(180deg);
}

.sidebar-nav .nav-content {
  padding: 5px 0 0 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-content a {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #012970;
  transition: 0.3;
  padding: 10px 0 10px 40px;
  transition: 0.3s;
}

.sidebar-nav .nav-content a i {
  font-size: 6px;
  margin-right: 8px;
  line-height: 0;
  border-radius: 50%;
}

.sidebar-nav .nav-content a:hover,
.sidebar-nav .nav-content a.active {
  color: #4154f1;
}

.sidebar-nav .nav-content a.active i {
  background-color: #4154f1;
}
</style>

<script>
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Sidebar toggle
   */
  if (select(".toggle-sidebar-btn")) {
    on("click", ".toggle-sidebar-btn", function (e) {
      select("body").classList.toggle("toggle-sidebar");
    });
  }
})();
</script>
