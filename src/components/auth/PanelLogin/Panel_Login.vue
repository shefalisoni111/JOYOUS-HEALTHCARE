<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-navbar">
    <div class="container-fluid px-5">
      <div>
        <h2>Welcome!</h2>
        <span>Please choose your account.</span>
      </div>
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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 inline-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="profile detail"
            >
              <img
                v-if="profilePhotoUrl !== '../profile.png'"
                :src="profilePhotoUrl"
                alt="USer"
                class="rounded-circle profileAdminImg"
                width="40"
                height="40"
                loading="eager"
              />
              <img
                v-else
                src="../profile.png"
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
                <a class="dropdown-item d-flex align-items-center"
                  ><i class="bi bi-ban-fill pe-2"></i><span>Recruitment</span></a
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
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
      </div>
    </div>
  </nav>
  <div class="row">
    <div class="container-fluid px-5">
      <div class="main">
        <div class="card" style="width: 27rem">
          <a class="navbar-brand p-4" href="/home"
            ><img
              src="../logo.png"
              class="img-fluid"
              alt="RecPal"
              width="119"
              loading="eager"
          /></a>
          <div class="card-header">
            <h5 class="card-title">Recpal Demo1</h5>
            <p class="card-text">Recpal to Recpal Demol.</p>
          </div>

          <div class="card-body">
            <a href="#" class="btn btn-primary mb-2">As SuperAdmin ></a>
            <a href="#" class="btn btn-primary mb-2 ms-2">As Candidate ></a>
            <a href="#" class="btn btn-primary mb-2">As Client (Staycase Hospital) ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  components: {},
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
            candidate_query: this.searchQuery,
          },
        });

        this.searchResults = response.data.candidate;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
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
          };
        }
      }
    },
    // async getAdminMethod() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/merchants/4`);

    //     this.getAdminData = response.data;
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
    // await this.getAdminMethod();
    await this.getCandidateMethods();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
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

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #f6851d !important;
  color: #fff !important;
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

.main {
  padding-top: 120px;
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
