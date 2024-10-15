<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home"
        ><img src="../assets/logo.png" class="img-fluid" alt="RecPal" width="119" loading="eager"
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
      <router-link class="nav-link" aria-current="page" to="/LoginType">
        <button class="border-0 bg-transparent fw-bolder fs-3"><i class="bi bi-arrow-clockwise"></i></button>
      </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto mt-0 mb-lg-0 fw-bold">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/home">
              Home
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="/client-list"
              id="vendorDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Client
            </a>

            <div class="dropdown-menu" aria-labelledby="vendorDropdown">
              <router-link class="dropdown-item" to="/client-list">Client</router-link>
              <router-link class="dropdown-item" to="/site">Site</router-link>
              <router-link class="dropdown-item" to="/rates_and_rules"
                >Rates and Rules</router-link
              >
            </div>

            <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/">Client 1</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/">Client 2</router-link>
              </li>
            </ul> -->
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="/staff-list"
              id="candidatesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Staff
            </a>
            <div class="dropdown-menu" aria-labelledby="candidatesDropdown">
              <router-link class="dropdown-item" to="/staff-list">Staff List</router-link>
              <router-link class="dropdown-item" to="/availability"
                >Staff Availability</router-link
              >
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/shift-list">
              Shifts
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
          <!-- <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/timesheet">
              Timesheet
            </router-link>
          </li> -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              to="/timesheet/weekly"
              id="timesheetDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Timesheet
            </a>
            <div class="dropdown-menu" aria-labelledby="timesheetDropdown">
              <router-link class="dropdown-item" to="/timesheet/weekly"
                >Weekly TimeSheet</router-link
              >
              <router-link class="dropdown-item" to="/timesheet/custom"
                >Custom TimeSheet</router-link
              >
              <router-link class="dropdown-item" to="/timesheet/signed"
                >Signed TimeSheet</router-link
              >
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              aria-current="page"
              to="/invoice/client-invoice"
              role="button"
              id="invoiceDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Invoice
            </a>
            <ul class="dropdown-menu" aria-labelledby="invoiceDropdown">
              <li>
                <router-link class="dropdown-item" to="/invoice/client-invoice"
                  >Client Invoice</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/invoice/staff-invoice"
                  >Staff Invoice</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/report">
              Reports
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
              <li class="dropdown-header">
                <form @submit.prevent="search">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    v-model="searchQuery"
                    @input="debounceSearch"
                  />
                </form>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li v-if="searchQuery">
                <template v-if="searchResults?.length > 0">
                  <li
                    class="notification-item p-2 d-flex gap-1 divide_sec"
                    v-for="candidate in searchResults"
                    :key="candidate.id"
                  >
                    <div>
                      <img
                        v-if="candidate.profile_photo"
                        :src="getProfilePhotoUrl(candidate.profile_photo)"
                        class="img-fluid"
                        alt="Profile Photo"
                         loading="eager"
                      />
                      <div
                        class="else_profile"
                        v-else
                        v-html="getProfilePhotoUrl(candidate.profile_photo)"
                      ></div>
                    </div>
                    <div class="ms-1">
                      <h5
                        class="text-capitalize chat-staff mb-0"
                        style="color: #f6851d"
                        @click="openChat(candidate)"
                      >
                        {{ candidate.first_name }} {{ candidate.last_name }}
                      </h5>

                      <span class="text-muted text-capitalize">{{
                        candidate.position
                      }}</span>
                    </div>
                    <hr class="dropdown-divider" />
                  </li>
                </template>
                <template v-else>
                  <li>
                    <h6 class="text-danger text-center">
                      {{ errorMessage }}
                    </h6>
                  </li>
                </template>
              </li>
              <li v-else>
                <li
               
                class="notification-item p-2 d-flex gap-1 divide_sec"
                v-for="candidate in getCandidatesData"
                :key="candidate.id"
              >
                <div>
                  <img
                    v-if="candidate.profile_photo"
                    :src="getProfilePhotoUrl(candidate.profile_photo)"
                    class="img-fluid"
                    alt="Profile Photo"
                     loading="eager"
                  />
                  <div
                    class="else_profile"
                    v-else
                    v-html="getProfilePhotoUrl(candidate.profile_photo)"
                  ></div>
                </div>
                <div class="ms-1">
                  <h5
                    class="text-capitalize chat-staff mb-0"
                    style="color: #f6851d"
                    @click="openChat(candidate)"
                  >
                    {{ candidate.first_name }} {{ candidate.last_name }}
                  </h5>

                  <span class="text-muted text-capitalize">{{ candidate.possition }}</span>
                </div>
                <hr class="dropdown-divider" />
              </li>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown mt-2">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown" @click="toggleDropdown">
              <i class="bi bi-bell"></i>
              <span v-if="!dropdownOpen && showBadge" class="badge bg-primary badge-number" >2</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" @click.self="dropdownOpen = false" style="height:390px;"  @scroll="onScroll"  ref="notificationDropdown">
              <li class="dropdown-header d-flex">
                You have {{ notifications.length }} new notifications
                <a href="#" class="mt-2 ms-2" @click.prevent="toggleShowAll">
                  <span class="badge rounded-pill bg-primary p-2 ms-2">{{ showAll ? 'Show less' : 'View all' }}</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li v-for="(notification, index) in visibleNotifications" :key="index" class="notification-item p-2 d-flex gap-1">
                <i class="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>{{ notification.title }}</h4>
                  <p>{{ notification.message }}</p>
                  <p>{{ notification.time }}</p>
                </div>
              </li>
            </ul>
          </li>
          <!-- End Notification Nav -->
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="profile detail"
            >
              <img
                v-if="profilePhotoUrl !== './profile.png'"
                :src="profilePhotoUrl"
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
            <!-- End Profile Image Icon -->

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
              style="width: 220px" 
            >
              <li>
                <a class="dropdown-item text-capitalize">
                  <h5 class="d-block mb-0 fw-bold">{{ getAdminData.first_name }}</h5>
                  <span class="d-block">Admin</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <router-link
                  class="dropdown-item d-flex align-items-center"
                  aria-current="page"
                  to="/appsetting"
                >
                  <i class="bi bi-gear pe-2"></i><span>App Settings</span>
                </router-link>
              </li>

              <li class="cursor-pointer my-1">
                <a class="dropdown-item d-flex align-items-center">
                  <i class="bi bi-asterisk pe-2"></i><span>Activity Log</span></a
                >
              </li>

              <li class="cursor-pointer my-1">
                <router-link class="dropdown-item d-flex align-items-center" to="/recruitment"
                  ><i class="bi bi-ban-fill pe-2"></i><span>Recruitment</span></router-link
                >
              </li>

              <li class="cursor-pointer my-1">
                <a class="dropdown-item d-flex align-items-center"
                  ><i class="bi bi-journal-arrow-down pe-2"></i
                  ><span>Diary Notes</span></a
                >
              </li>

              <li class="cursor-pointer my-1">
                <router-link
                  class="dropdown-item text-capitalize d-flex align-items-center"
                to="/admin/4"
                  ><i class="bi bi-gear-wide pe-2"></i><span>Personal Settings</span>
                </router-link>
              </li>
         

              <li class="cursor-pointer my-1">
                <a class="dropdown-item d-flex align-items-center" href="https://recpal.co.uk/support/">
                  <i class="bi bi-brightness-low pe-2" ></i><span>Support</span>
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
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
        <div v-if="showChatBox" class="chat-box">
          <div class="chat-container">
            <div class="chat-header">
              <div class="divide_sec d-flex">
                <img
                  v-if="selectedCandidate.profile_photo"
                  :src="getProfilePhotoUrl(selectedCandidate.profile_photo)"
                  class="img-fluid"
                  alt="Profile Photo"
                   loading="eager"
                />
                <div
                  class="else_profile"
                  v-else
                  v-html="getProfilePhotoUrl(selectedCandidate.profile_photo)"
                ></div>
                <h5 class="mb-0 text-capitalize d-flex align-items-center ms-2">
                  {{ selectedCandidate.first_name }}
                  {{ selectedCandidate.last_name }}
                </h5>
              </div>

              <button class="btn btn-danger btn-sm" @click="closeChatBox">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="chat-messages">
              <div
                v-for="(message, index) in selectedCandidateMessages"
                :key="index"
                class="message"
              >
                <div class="message-sender">{{ message.sender }}</div>
                <div class="message-content">{{ message.content }}</div>
              </div>
            </div>
            <div class="chat-input">
              <!-- <input v-model="newMessage" type="text"  placeholder="Type your message" /> -->
              <input
                ref="fileInput"
                v-model="newMessage"
                type="text"
                class="form-control"
                placeholder="Write a message..."
                rows="3"
                style="padding-bottom: 45px"
              />
            </div>
            <div class="px-3 pb-2 d-flex justify-content-between">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="handleClick"
              >
                <i class="bi bi-paperclip"></i>
              </button>
              <button @click="sendMessage" class="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationAlert
    :show-modal="isModalVisible"
    :message="confirmMessage"
    @confirm="confirmCallback"
    @cancel="canceled"
  />
  </nav>
</template>

<script>
import axios from "axios";
import ConfirmationAlert from "./Alerts/ConfirmationAlert.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  name: "Navbar",

  data() {
    return {
      getAdminData: [],
      showChatBox: false,
      getAdminProfile: [],
      getCandidatesData: [],
      newMessage: "",
      selectedCandidate: null,
      messages: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showBadge: true,
      dropdownOpen: false,
      showAll: false,
      notifications: [
        { title: "Lorem Ipsum", message: "Quae dolorem earum veritatis oditseno", time: "30 min. ago" },
        { title: "Lorem Ipsum", message: "Quae dolorem earum veritatis oditseno", time: "30 min. ago" },
        { title: "Lorem Ipsum", message: "Quae dolorem earum veritatis oditseno", time: "30 min. ago" },
        { title: "Lorem Ipsum", message: "Quae dolorem earum veritatis oditseno", time: "30 min. ago" },
       
      ],
    };
  },
  components:{
    ConfirmationAlert
  },
  computed: {
    visibleNotifications() {
     
     return this.showAll ? this.notifications : this.notifications.slice(0, 2);
    //  return this.notifications.slice(0, 5);
    },
    isScrollable() {
      return this.notifications.length > this.visibleNotifications.length;
    },
    profilePhotoUrl() {
      const storedImageUrl = localStorage.getItem("profileImage");

      return storedImageUrl ? storedImageUrl : "./profile.png";
    },
    selectedCandidateMessages() {
      if (this.selectedCandidate) {
        return this.messages.filter(
          (message) => message.sender === this.selectedCandidate.id
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
     
    },
    showAllNotifications(event) {
      event.preventDefault();
      this.showAll = true; 
    },
    confirmed() {
      this.isModalVisible = false;

      this.confirmed();
    },
    canceled() {
      this.isModalVisible = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpen = false; 
        this.showBadge = true; 
      }
    },
    handleClick() {
      this.$nextTick(() => {
        if (this.$refs.fileInput) {
          this.$refs.fileInput.click();
        }
      });
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];

        const response = await axiosInstance.get(`${VITE_API_URL}/search_candidate`, {
      params: {
        candidate_query: this.searchQuery
      }
    });

        this.searchResults = response.data.candidate;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "Not Staff found for the specified criteria";
        }
      }
    },

    getProfilePhotoUrl(profilePhoto) {
      if (profilePhoto !== null) {
        return `${VITE_API_URL}${profilePhoto}`;
      } else {
        return '<i class="bi bi-person-fill"></i>';
      }
    },
    openChat(candidate) {
      this.selectedCandidate = candidate;
      this.showChatBox = true;
    },
    closeChatBox() {
      this.showChatBox = false;
      this.selectedCandidate = null;
    },
    fetchMessagesForCandidate(candidate) {
      this.selectedCandidateMessages = this.messages.filter(
        (message) => message.sender === candidate.id
      );
    },
    toggleChatBox(candidate) {
      this.selectedCandidate = candidate;
      this.showChatBox = !this.showChatBox;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ sender: "You", content: this.newMessage });
        this.newMessage = "";
      }
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
      }
        }
      }
    },
    // async getAdminMethod() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/merchants/4`);

    //     this.getAdminData = response.data ;
    //     // console.log(this.getAdminData)
    //   } catch (error) {
    //     // console.error("Error fetching admin data:", error);
    //   }
    // },
    async getCandidateMethods() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

 async mounted() {
  // await   this.getAdminMethod();
  await  this.getCandidateMethods();
  document.addEventListener('click', this.handleClickOutside);
  
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.chat-staff {
  cursor: pointer;
}
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
</style>
