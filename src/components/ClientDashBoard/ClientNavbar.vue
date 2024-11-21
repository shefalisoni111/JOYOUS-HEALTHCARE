<template>
  <div></div>
  <!-- <nav class="navbar navbar-expand-lg navbar-light fixed-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/client/clientDashboard"
        ><img
          src="../../assets/logo.png"
          class="img-fluid"
          alt="RecPal"
          width="119"
          loading="eager"
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
        <ul class="navbar-nav m-auto mt-0 mb-lg-0 fw-bold">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard"
            >
              Dashboard
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/shift"
            >
              Shifts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/booking"
            >
              Bookings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/schedule"
            >
              Schedule
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/timesheet"
            >
              Timesheet
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/signedTimesheet"
            >
              Signed Timesheet
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/invoice"
            >
              Invoices
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav m-0 mb-2 mb-lg-0 inline-nav">
          <li class="nav-item dropdown mt-2">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-chat-left-dots"></i
            ></a>
            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
              style="height: 454px; overflow-y: auto; width: 386px; overflow-x: hidden"
            >
              <li class="dropdown-header"></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown mt-2">
            <a
              class="nav-link nav-icon"
              href="#"
              data-bs-toggle="dropdown"
              @click="toggleDropdown"
            >
              <i class="bi bi-bell"></i>
              <span
                v-if="!dropdownOpen && showBadge"
                class="badge bg-primary badge-number"
                >2</span
              >
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
              @click.self="dropdownOpen = false"
              style="height: 390px"
              @scroll="onScroll"
              ref="notificationDropdown"
            >
              <li class="dropdown-header d-flex">
                You have {{ notifications.length }} new notifications
                <a href="#" class="mt-2 ms-2" @click.prevent="toggleShowAll">
                  <span class="badge rounded-pill bg-primary p-2 ms-2">{{
                    showAll ? "Show less" : "View all"
                  }}</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li
                v-for="(notification, index) in visibleNotifications"
                :key="index"
                class="notification-item p-2 d-flex gap-1"
              >
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>{{ notification.title }}</h4>
                  <p>{{ notification.message }}</p>
                  <p>{{ notification.time }}</p>
                </div>
              </li>
            </ul>
          </li>
 
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="profile detail"
            >
              <img
                v-if="computedProfileImage !== './profile.png'"
                :src="computedProfileImage"
                alt="USer"
                class="rounded-circle profileAdminImg"
                width="40"
                height="40"
                loading="eager"
              />
              <img
                v-else
                src="./profile.png"
                alt="USer"
                class="rounded-circle profileAdminImg"
                width="40"
                loading="eager"
              />
            </a>
          

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
              style="width: 220px"
            >
              <li>
                <a class="dropdown-item text-capitalize">
                  <h5 class="d-block mb-0 fw-bold"></h5>
                  <span class="d-block">Client</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li class="cursor-pointer my-1">
                <a class="dropdown-item d-flex align-items-center">
                  <i class="bi bi-asterisk pe-2"></i><span>Activity Log</span></a
                >
              </li>

              <li class="cursor-pointer my-1">
                <router-link
                  class="dropdown-item d-flex align-items-center"
                  to="/recruitment"
                  ><i class="bi bi-ban-fill pe-2"></i
                  ><span>Recruitment</span></router-link
                >
              </li>

              <li class="cursor-pointer my-1">
                <router-link
                  class="dropdown-item text-capitalize d-flex align-items-center"
                  :to="clientLink"
                  ><i class="bi bi-gear-wide pe-2"></i><span>Personal Settings</span>
                </router-link>
              </li>

              <li class="cursor-pointer my-1">
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="https://recpal.co.uk/support/"
                >
                  <i class="bi bi-brightness-low pe-2"></i><span>Support</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li class="cursor-pointer">
                <a class="dropdown-item d-flex align-items-center" v-on:click="confirmed">
                  <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          
          </li>
        </ul>
      </div>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
  </div> -->
</template>

<!-- <script>
import axios from "axios";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";

export default {
  name: "ClientNavbar",

  data() {
    return {
      newMessage: "",
      clientLink: "/client/clientDashboard/",
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showBadge: true,
      dropdownOpen: false,
      showAll: false,
      localProfileImage: this.profileImage,
      notifications: [
        {
          title: "Lorem Ipsum",
          message: "Quae dolorem earum veritatis oditseno",
          time: "30 min. ago",
        },
        {
          title: "Lorem Ipsum",
          message: "Quae dolorem earum veritatis oditseno",
          time: "30 min. ago",
        },
        {
          title: "Lorem Ipsum",
          message: "Quae dolorem earum veritatis oditseno",
          time: "30 min. ago",
        },
        {
          title: "Lorem Ipsum",
          message: "Quae dolorem earum veritatis oditseno",
          time: "30 min. ago",
        },
      ],
    };
  },
  components: { ConfirmationAlert },
  computed: {
    visibleNotifications() {
      return this.showAll ? this.notifications : this.notifications.slice(0, 2);
      //  return this.notifications.slice(0, 5);
    },
    isScrollable() {
      return this.notifications.length > this.visibleNotifications.length;
    },
    // profilePhotoUrl() {
    //   const storedImageUrl = localStorage.getItem("profileImage");

    //   return storedImageUrl ? storedImageUrl : "./profile.png";
    // },
    selectedCandidateMessages() {
      if (this.selectedCandidate) {
        return this.messages.filter(
          (message) => message.sender === this.selectedCandidate.id
        );
      } else {
        return [];
      }
    },
    computedProfileImage() {
      return this.localProfileImage;
    },
  },
  props: {
    profileImage: {
      type: String,
      default: "./profile.png",
    },
  },
  methods: {
    confirmed() {
      this.isModalVisible = false;

      this.confirmed();
    },
    canceled() {
      this.isModalVisible = false;
    },
    confirmed() {
      this.confirmMessage = "Are you sure want to sign out?";
      if (localStorage.getItem("token")) {
        if (this.confirmMessage) {
          this.isModalVisible = true;
          this.confirmCallback = async () => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            this.$router.replace({ name: "Login" });
          };
        }
      }
    },
    async fetchProfileImage() {
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("c_unique");
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${clientId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const imagePath = response.data.profile_photo;
        this.localProfileImage = `${VITE_API_URL}${imagePath}`;
      } catch (error) {
        // console.error("Error fetching profile image:", error);
      }
    },
  },
  mounted() {
    this.fetchProfileImage();
    const clientId = localStorage.getItem("c_unique");
    const token = localStorage.getItem("token");
    if (clientId && token) {
      this.clientLink = `/client/clientDashboard/${clientId}`;
    }
  },
};
</script>

<style scoped>
.divide_sec {
  border-bottom: 1px solid #f0eeed;
  width: 335px;
  margin: auto;
}
.divide_sec img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #fc7d4f;
}
.divide_sec .else_profile {
  font-size: 29px;
  padding-left: 3px;
  border-radius: 50%;
  border: 3px solid #fc7d4f;
  color: #979493;
  width: 40px;
  height: 40px;
}

.cursor-pointer {
  cursor: pointer;
}
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.chat-container {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-header {
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #f6851d !important;
  color: #fff !important;
}
.chat-messages {
  height: 190px;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.message-sender {
  font-weight: bold;
}

.chat-input {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fixed-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #80808021;
  z-index: 1000;
}
.bi-person::before {
  font-size: 60px;
}
.bi-person-circle::before {
  content: "\F4D7";
  font-size: 36px;
}
.bi-bell::before {
  content: "\f18a";
  font-size: 21px;
}
.bi-chat-left-dots::before {
  font-size: 21px;
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
@media (max-width: 991px) {
  .nav-item {
    font-size: 15px;
    padding: 5px;
    margin-top: -5px;
  }
  ul.inline-nav {
    display: -webkit-box;
  }
}
@media (min-width: 1200px) {
  .logo {
    width: 280px;
  }
}
@media (max-width: 1400px) {
  .bi-chat-left-dots::before {
    font-size: 18px;
    margin-top: 4px;
  }
}
</style> -->
