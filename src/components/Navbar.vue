<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"
        ><img
          src="../assets/logo.png"
          loading="lazy"
          class="img-fluid"
          alt="RecPal"
          width="119"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto mt-0 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/home">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/client">
              Clients
              <!-- <i class="bi bi-caret-down-fill"></i> -->
            </router-link>

            <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/">Client 1</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/">Client 2</router-link>
              </li>
            </ul> -->
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/candidates">
              Candidates
              <i class="bi bi-caret-down-fill"></i>
            </router-link>

            <ul
              class="dropdown"
              aria-labelledby="navbarDropdown"
              
            >
              <li>
                <router-link class="dropdown-item">Client 1</router-link>
              </li>
              <li>
                <router-link class="dropdown-item">Client 2</router-link>
              </li>
            </ul>
          </li> -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="/candidates"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Candidates
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/candidates"
                >Candidate List</router-link
              >
              <router-link class="dropdown-item" to="/availability"
                >Candidate Availability</router-link
              >
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/vacancie">
              Vacancies
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/schedule">
              Schedule
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/booking">
              Booking
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/timesheet">
              Timesheet
            </router-link>
            <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Client 1</a></li>
              <li><a class="dropdown-item" href="#">Client 2</a></li>
            </ul> -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/invoice">
              Invoice
            </router-link>
            <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" href="#"
                  >Client 1</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item">Client 2</router-link>
              </li>
            </ul> -->
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/report">
              Reports
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav m-0 mb-2 mb-lg-0">
          <!-- <li class="nav-item dropdown mt-3">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-bell"></i>
              <span class="badge bg-primary badge-number">4</span>
            </a>

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
            >
              <li class="dropdown-header">
                You have 4 new notifications
                <a href="#"
                  ><span class="badge rounded-pill bg-primary p-2 ms-2"
                    >View all</span
                  ></a
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li class="notification-item p-2">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="notification-item p-2">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>
            </ul>
          </li> -->
          <!-- End Notification Nav -->
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="profile detail"
            >
              <img
                src="./profile.png"
                alt="USer"
                class="rounded-circle profileAdminImg"
                width="50"
              />
            </a>
            <!-- End Profile Image Icon -->

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
              v-if="getAdminData"
            >
              <li>
                <router-link class="dropdown-item text-capitalize" to="/admin">
                  <h5 class="d-block mb-0">{{ getAdminData.first_name }}</h5>
                  <span class="d-block">Admin</span>
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <router-link
                  class="dropdown-item d-flex align-items-center"
                  aria-current="page"
                  to="/appsetting/addjobdetail"
                >
                  <i class="bi bi-gear pe-2"></i><span>App Settings</span>
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <router-link
                  class="dropdown-item d-flex align-items-center"
                  to="/login"
                  v-on:click="signout"
                >
                  <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
                  <span>Sign Out</span>
                </router-link>
              </li>
            </ul>
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",

  data() {
    return {
      getAdminData: [],
    };
  },

  methods: {
    signout() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        this.$router.push({ name: "Login" });
      }
    },
    async getAdminMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/merchant_dashboard`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.getAdminData = response.data.merchant_data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

  mounted() {
    this.getAdminMethod();
  },
};
</script>

<style scoped>
.bi-person::before {
  font-size: 60px;
}
.bi-person-circle::before {
  content: "\F4D7";
  font-size: 36px;
}
ul.navbar-nav li a span.badge {
  translate: -9px -12px;
}
.logo {
  line-height: 1;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #f6851d !important;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #fdce5e17;
  color: #000;
}
.profileAdminImg {
  border: 1px solid grey;
}
@media (min-width: 1200px) {
  .logo {
    width: 280px;
  }
}

.logo img {
  max-height: 26px;
  margin-right: 6px;
}

.bi-arrow-repeat {
  font-weight: bold;
  font-size: xx-large;
  color: #235ec1;
}

ul.profile li a:hover,
ul.profile .dropdown-item:hover,
ul.profile .dropdown-item:focus {
  background-color: #f6851d !important;
  color: #fff;
}
.logo span {
  font-size: 26px;
  font-weight: 700;
  color: #012970;
  font-family: "Nunito", sans-serif;
}

.active {
  color: blue;
}

main {
  margin-left: 48px;
  padding: 20px 30px;
  transition: all 0.3s;
}
a.router-link-active {
  color: #fff;
  background-color: #f6851d;
  border-radius: 4px;
}
</style>
