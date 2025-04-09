<template>
  <div class="">
    <!-- Sidebar -->
    <nav id="sidebar" >
      <div class="sidebar-header">
        <a class="navbar-brand ps-3" href="/home"
          ><img
            src="../assets/logo.png"
            class="img-fluid"
            alt="RecPal"
            width="138"
            height="31"
            loading="eager"
        /></a>
        <!-- <button class="btn btn-toggle" @click="toggleSidebar">
          <i class="bi bi-list"></i>
        </button> -->
      </div>

      <ul class="list-unstyled components">
        <li>
          <router-link to="/home" class="ps-2">
            <i class="bi bi-house-door "></i> Dashboard
          </router-link>
        </li>

        <li>
          <a href="#clientMenu" data-bs-toggle="collapse" class=" d-flex justify-content-between">
            <span ><i class="bi bi-people "></i> <span class="ms-2">Client</span></span>
            <img
            src="../assets/ArrowDown.png"
            class="img-fluid pe-2"
            alt="RecPal"
           
            loading="eager"
        />
          </a>
          <ul class="collapse list-unstyled" id="clientMenu">
            <li><router-link to="/client-list">Client List</router-link></li>
            <li><router-link to="/site">Site</router-link></li>
            <li><router-link to="/rates_and_rules">Rates & Rules</router-link></li>
          </ul>
        </li>

        <li>
          <a href="#staffMenu" data-bs-toggle="collapse" class=" d-flex justify-content-between">
            <span >
            <i class="bi bi-person"></i> <span class="ms-2">Staff</span>
</span>
            <img
            src="../assets/ArrowDown.png"
            class="img-fluid pe-2"
            alt="RecPal"
           
            loading="eager"
        />
          </a>
          <ul class="collapse list-unstyled" id="staffMenu">
            <li><router-link to="/staff-list">Staff List</router-link></li>
            <li><router-link to="/availability">Staff Availability</router-link></li>
          </ul>
        </li>

        <li>
          <router-link to="/shift-list">
            <i class="bi bi-calendar"></i> Shifts
          </router-link>
        </li>

        <li>
          <router-link to="/schedule"> <i class="bi bi-clock"></i> Schedule </router-link>
        </li>

        <li >
          <a href="#timesheetMenu" data-bs-toggle="collapse" class=" d-flex justify-content-between">  
            <span >
              <i class="bi bi-file-earmark-text"></i><span class="ms-2">Timesheet</span> 
            </span> 
              
                <img
                src="../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
               
                loading="eager"
            />
          </a>
       
          <ul class="collapse list-unstyled" id="timesheetMenu">
            <li><router-link to="/timesheet/weekly">Weekly Timesheet</router-link></li>
            <li><router-link to="/timesheet/custom">Custom Timesheet</router-link></li>
            <li><router-link to="/timesheet/signed">Signed Timesheet</router-link></li>
          </ul>
        </li>

        <li>
          <a href="#invoiceMenu" data-bs-toggle="collapse" class=" d-flex justify-content-between">
            <span ><i class="bi bi-receipt"></i><span class="ms-2">Invoice</span> </span>
            
            <img
                src="../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
               
                loading="eager"
            />
          </a>
          <ul class="collapse list-unstyled" id="invoiceMenu">
            <li>
              <router-link to="/invoice/client-invoice">Client Invoice</router-link>
            </li>
            <li><router-link to="/invoice/staff-payroll">Staff Payroll</router-link></li>
          </ul>
        </li>

        <li>
          <router-link to="/report">
            <i class="bi bi-bar-chart"></i> Reports
          </router-link>
        </li>

        <li class=" fw-bold text-muted mt-2">
          Support
        </li>

        <ul class="navbar-nav m-0 mb-2 mb-lg-0 inline-nav">
          <li class="nav-item dropdown mt-2">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-chat-left-dots"></i
            >Message</a>
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
                <hr class="" />
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
                    <hr class="" />
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
               
                class="notification-item p-2 d-flex gap-1 divide_sec cursor-pointer"
                v-for="candidate in getCandidatesData"
                :key="candidate.id" 
              >
                <div >
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
                <div class="ms-1" @click="openChat(candidate)">
                  <h5
                    class="text-capitalize chat-staff mb-0"
                    style="color: #f6851d"
                    
                  >
                    {{ candidate.first_name }} {{ candidate.last_name }}
                  </h5>

                  <span class="text-muted text-capitalize">{{ candidate.possition }}</span>
                </div>
                <hr class="" />
              </li>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown mt-2">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown" @click="markAllAsRead">
              <i class="bi bi-bell"></i>
              <span v-if="!dropdownOpen && unread_count > 0" class="badge bg-primary badge-number">
                {{ unread_count }}
              </span>Notification
            </a>
            <NotificationsAdmin/>
            <!-- <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" @click.self="dropdownOpen = false" style="height:310px;    width: 266px;"  @scroll="onScroll"  ref="notificationDropdown">
           
               <li class="notification-item p-2 d-flex gap-1 text-danger">No Notification Found!</li>
            </ul> -->
            <!-- <ul
  class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
  @click.self="dropdownOpen = false"
  style="height: 310px; width: 266px; overflow-x: scroll;"

  ref="notificationDropdown"
>
  <li v-if="notifications.length === 0" class="notification-item p-2 d-flex gap-1 text-danger">
    {{ errorMessageNotification }}
  </li>
  <li v-for="(notification, index) in notifications" :key="index" class="notification-item p-2 d-flex gap-1">
    <i class="bi bi-exclamation-circle text-warning"></i>
    <div>
      <h4>{{ notification.title }}</h4>
      <p>{{ notification.message }}</p>
      <p>{{ notification.time }}</p>
    </div>
  </li>
  <li v-if="notifications.length < totalCount" class="p-2 text-center">
    <button @click.stop="loadMore" class="btn btn-sm btn-primary">Read More</button>
  </li>
</ul> -->
          </li>
          
          <!-- End Notification Nav -->
          
          <li class="cursor-pointer my-1 ">
            <a class="dropdown-item d-flex align-items-center" href="https://recpal.co.uk/support/">
              <i class="bi bi-brightness-low pe-2" ></i><span>Support</span>
            </a>
          </li>
          <li>
            <router-link
              class="dropdown-item d-flex align-items-center"
              aria-current="page"
              to="/appsetting"
            >
              <i class="bi bi-gear pe-2"></i><span> Settings</span>
            </router-link>
          </li>
          <br/><br/>
          <li>
            <hr class="" />
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
              />   <span class="d-block">Admin</span>
            </a>
            <!-- End Profile Image Icon -->

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
              style="width: 220px" 
            >
              <li>
                <a class="dropdown-item text-capitalize">
                  <h5 class="d-block mb-0 fw-bold">{{ getAdminData.first_name }}</h5>
                  <!-- <span class="d-block">Admin</span> -->
                </a>
              </li>
             
             
<!-- 
              <li class="cursor-pointer my-1">
                <a class="dropdown-item d-flex align-items-center">
                  <i class="bi bi-asterisk pe-2"></i><span>Activity Log</span></a
                >
              </li> -->

              <!-- <li class="cursor-pointer my-1">
                <router-link class="dropdown-item d-flex align-items-center" to="/recruitment"
                  ><i class="bi bi-ban-fill pe-2"></i><span>Recruitment</span></router-link
                >
              </li> -->

              <li class="cursor-pointer my-1">
                <router-link class="dropdown-item d-flex align-items-center" to="/dairy_notes"
                  ><i class="bi bi-ban-fill pe-2"></i><span>Diary Notes</span></router-link
                >
              </li>
<!-- 
              <li class="cursor-pointer my-1">
                <router-link
                  class="dropdown-item text-capitalize d-flex align-items-center"
            :to="adminLink"
                  ><i class="bi bi-gear-wide pe-2"></i><span>Personal Settings</span>
                </router-link>
              </li> -->

              <li class="cursor-pointer my-1">
                <router-link
                  class="dropdown-item text-capitalize d-flex align-items-center"
            :to="adminLink"
                  ><i class="bi bi-gear-wide pe-2"></i><span>Personal Settings</span>
                </router-link>
              </li> 
         

              
              <li>
                <hr class="" />
              </li>

              <li class="cursor-pointer">
                <a class="dropdown-item d-flex align-items-center" v-on:click="confirmed">
                  <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
                  <span>Sign Out</span>
                </a>
              </li>
              <!-- <li class="cursor-pointer">
                <a class="dropdown-item d-flex align-items-center" >
                  <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
                  <span>Sign Out</span>
                </a>
              </li> -->
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
                  v-if="selectedCandidate && selectedCandidate.profile_photo"
                  :src="getProfilePhotoUrl(selectedCandidate.profile_photo)"
                  class="img-fluid"
                  alt="Profile Photo"
                  loading="eager"
                />
                <div
                  class="else_profile"
                  v-else
                  v-html="getProfilePhotoUrl(selectedCandidate ? selectedCandidate.profile_photo : '')"
                ></div>
                <h5 class="mb-0 text-capitalize d-flex align-items-center ms-2">
                  {{ selectedCandidate?.first_name || '' }}
                  {{ selectedCandidate?.last_name || '' }}
                </h5>
              </div>
              <button class="btn btn-danger btn-sm" @click="closeChatBox">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
           
            <div class="chat-messages" ref="chatMessages" @scroll="handleScroll">
            
              <div v-if="selectedCandidateMessages?.length >0"
                v-for="message in selectedCandidateMessages" 
                :key="message.id"
                :class="{
                  'chat-message-left': message.sender?.type === 'Candidate', 
                  'chat-message-right': message.sender?.type === 'Merchant'
                }"
              >
              
                <div v-if="message.sender?.name && message?.is_read === true">
                  <strong>{{ message.sender?.name || 'Unknown Receiver' }}</strong>
                  <div>
                    {{ message.content || 'No content' }}
                  </div>
                </div>
            
              
                <div v-if="message.sender?.name && message?.is_read === false">
                  <!--gh <strong>{{ message.sender?.name === message.sender?.name ? 'You' : message.sender?.name || 'Unknown Sender' }}</strong> -->
                  <strong>
                   
                    {{ message.sender?.type === 'Merchant' && message.sender?.name  ? 'You' : message.sender?.name || 'Unknown Sender' }}
                  </strong>
                  <div>
                  {{ message.content || 'No content' }}
                </div>
                </div>
              </div>
              
             
              <div v-else-if="selectedCandidateMessages?.length === 0 && !isLoading">
                <div class="text-danger text-center">
                  No Chat Found!
                </div>
              </div>
            
              
              <div v-else-if="selectedCandidateMessages?.length === 0 && isLoading">
                <div class="spinner-border  d-block m-auto" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="chat-input">
              <input
                ref="fileInput"
                v-model="newMessage"
                type="text"
                class="form-control"
                placeholder="Write a message..."
                rows="3"
                style="padding-bottom: 45px"
                @keydown.enter="sendMessage"
              />
            </div>
            <div class="px-3 pb-2 d-flex justify-content-end">
              <!-- <button
                class="btn btn-outline-secondary"
                type="button"
                @click="handleClick"
              >
                <i class="bi bi-paperclip"></i>
              </button> -->
              <button @click="sendMessage"  :disabled="!newMessage.trim() || sending" class="btn btn-primary flex-end">Send</button>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
// import ConfirmationAlert from "./Alerts/ConfirmationAlert.vue";
import NotificationsAdmin from "../components/Notifiations/NotificationsAdmin.vue"
import Swal from "sweetalert2";
import logo from "../assets/logo.png";


import { nextTick } from "vue";
import LoaderVue from "./Loader/Loader.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  name: "Navbar",

  data() {
    return {
      adminLink: "/admin/",
      getAdminData: [],
      isUserScrolling: false,
      showChatBox: false,
      getAdminProfile: [],
      getCandidatesData: [],
      newMessage: "",
      selectedCandidate: null,
      selectedCandidateMessages: [],
      messages: [],
      searchQuery: "",
      debounceTimeout: null,
      searchResults: [],
      sending: false,
      errorMessage: "",
      errorMessageNotification: "",
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showBadge: true,
      dropdownOpen: false,
      showAll: false,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      unread_count: 0,
      // channelSid: "",
      isLoading: true,
      // unreadNotifications: 0,
      isFetchingMessages: false,
      messageFetchInterval: null,

      senderId: null,
      socket: null,
      storedImageUrl: "",
      localProfileImage: this.profileImage,
      notifications: [],
    };
  },

  components: {
    NotificationsAdmin
  },
  computed: {
    visibleNotifications() {
      return this.showAll ? this.notifications : this.notifications.slice(0, 2);
    },
    isScrollable() {
      return this.notifications.length > this.visibleNotifications.length;
    },

    computedProfileImage() {
      return this.localProfileImage;
    },
    channelSid() {
      // Access `channelSid` from the store (adjust according to your store setup)
      return this.$store.state.channelSid;
    },
  },

  props: {
    profileImage: {
      type: String,
      default: "./profile.png",
    },
    disableApiCall: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    "$route.name"(newRoute) {
      if (newRoute === "Navbar") {
        this.getCandidateMethods();
      }
    },
    notifications: {
      handler(newNotifications) {
        this.unread_count = newNotifications.filter((n) => !n.read).length;
      },
      deep: true,
      immediate: true,
    },
    selectedCandidateMessages() {
      this.scrollToBottom();
    },
    // showChatBox(newVal) {
    //   if (newVal) this.scrollToBottom();
    // },
    selectedCandidate(newCandidate) {
      if (newCandidate) {
        this.fetchMessagesForCandidate(newCandidate);
      }
    },
    newMessage(newValue) {
      if (newValue && this.channelSid) {
        this.fetchMessages(this.channelSid)
          .then(() => {
            this.scrollToBottom();
          })
          .catch((error) => {
            // console.error('Error fetching messages:', error);
          });
        // this.fetchMessages(this.channelSid);
      }
    },
    //   newMessage(newValue) {
    //   if (newValue && this.channelSid) {
    //     const lastMessage = this.selectedCandidateMessages.at(-1);
    //     const isCandidateMessage = lastMessage?.sender?.type === "Candidate";

    //     if (isCandidateMessage) {

    //       this.fetchMessages(this.channelSid);
    //     } else {

    //     }
    //   }
    // },

    // channelSid(newChannelSid) {
    //     if (newChannelSid) {
    //       // console.log('Channel SID changed:', newChannelSid);
    //       this.fetchMessages(newChannelSid);
    //     }
    //   }
  },
  methods: {
    async loadMore() {
      this.currentPage++;
      await this.fetchNotifications();
    },
    onScroll() {
      const chatMessages = this.$refs.chatMessages;

      if (
        chatMessages.scrollHeight - chatMessages.scrollTop <=
        chatMessages.clientHeight + 10
      ) {
        this.isUserScrolling = false;
      } else {
        this.isUserScrolling = true;
      }
    },

    scrollToBottom() {
      if (this.isUserScrolling) return;
      nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
    async fetchProfileImage() {
      const token = localStorage.getItem("token");
      const merchantId = localStorage.getItem("merchant_id");
      try {
        const response = await axios.get(`${VITE_API_URL}/merchants/${merchantId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const imagePath = response.data.data.profile_photo;
        this.localProfileImage = `${VITE_API_URL}${imagePath}`;
        // console.log(this.localProfileImage)
      } catch (error) {
        // console.error("Error fetching profile image:", error);
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    showAllNotifications(event) {
      event.preventDefault();
      this.showAll = true;
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
      }, 300);
    },
    //search api start

    async search() {
      try {
        this.errorMessage = "";
        this.searchResults = [];

        const response = await axiosInstance.get(`${VITE_API_URL}/search_candidate`, {
          params: {
            candidate_query: this.searchQuery.trim(),
          },
        });

        // this.searchResults = response.data.candidate|| [];
        if (response.data.candidate && response.data.candidate.length > 0) {
          this.searchResults = response.data.candidate || [];
        } else if (response.data.message) {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "Not Staff found for the specified criteria";
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again later.";
        }
        // if (
        //   (error.response && error.response.status === 404) ||
        //   error.response.status === 400
        // ) {
        //   this.errorMessage = "Not Staff found for the specified criteria";
        // }
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
      // this.showChatBox = true;
      //  this.fetchChatChannel(candidate.id);
      this.showChatBox = false;

      this.fetchChatChannel(candidate.id)
        .then((channelSid) => {
          if (channelSid) {
            this.showChatBox = true;
          } else {
            // console.warn("Chat channel not available for this candidate.");
          }
        })
        .catch((error) => {
          // console.error("Error fetching chat channel:", error);
          this.showChatBox = false;
        });
    },
    closeChatBox() {
      this.showChatBox = false;
      this.selectedCandidate = null;

      this.$store.dispatch("updateChannelSid", null);
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
    async fetchChatChannel(id) {
      const merchantId = localStorage.getItem("merchant_id");
      try {
        const response = await fetch(`${VITE_API_URL}/chats/create_channel`, {
          method: "POST",
          body: JSON.stringify({
            sender_id: id,
            sender_type: "Candidate",
            receiver_id: merchantId,
            receiver_type: "Merchant",
          }),
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && data.channel_sid) {
          this.$store.dispatch("updateChannelSid", data.channel_sid);
          await this.fetchMessages(data.channel_sid);
          return data.channel_sid;
        } else {
          // Swal.fire({
          //   title: "Error!",
          //   text: data.message || "Failed to create chat channel. Please try again.",
          //   icon: "error",
          //   confirmButtonText: "OK",
          // });
          return null;
        }
      } catch (error) {
        // Swal.fire({
        //   title: "Error!",
        //   text: "An unexpected error occurred while creating the chat channel. Please try again later.",
        //   icon: "error",
        //   confirmButtonText: "OK",
        // });
      }
    },

    async sendMessage() {
      if (!this.channelSid) {
        // console.error("Channel SID is not available. Fetch the channel first.");
        return;
      }
      if (this.newMessage.trim() === "") {
        return;
      }
      this.sending = true;
      const tempMessage = this.newMessage;

      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${VITE_API_URL}/chats/send_message_to_channel`, {
          method: "POST",
          body: JSON.stringify({
            channel_sid: this.channelSid,
            message: tempMessage,
          }),
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          this.selectedCandidateMessages.push({
            sender: "You",
            content: tempMessage,
          });
          this.newMessage = "";
          await this.fetchMessages(this.channelSid);
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Failed to send the message. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (data.success) {
          this.newMessage = "";
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            "An unexpected error occurred while sending the message. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        this.sending = false;
      }
    },

    async fetchMessages(channelSid) {
      this.isLoading = true;
      this.isFetchingMessages = true;

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/chats/fetch_messages`, {
          params: {
            channel_sid: channelSid,
          },
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.selectedCandidateMessages = response.data.messages || [];
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            "Failed to fetch messages. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        this.isFetchingMessages = false;
        this.isLoading = false;
      }
    },

    handleClick() {
      this.$refs.fileInput.click();
    },
    confirmed() {
      if (localStorage.getItem("token")) {
        Swal.fire({
          html: '<p style="font-size: 25px;">Are you sure want to sign out?</p>',
          imageUrl: logo,
          imageWidth: 200,
          imageAlt: "RecPal",
          showCancelButton: true,
          confirmButtonColor: "#ff5f30",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, sign me out!",
          cancelButtonText: "Cancel",
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");
            popup.style.border = "4px solid #fc7d4f";
          },
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");

            this.$router.replace({ name: "Login" });
          }
        });
      }
    },
    handleScroll() {
      const chatMessages = this.$refs.chatMessages;

      if (!chatMessages) return;

      // User scroll detection
      const isAtTop = chatMessages.scrollTop === 0;
      const isAtBottom =
        chatMessages.scrollTop + chatMessages.clientHeight >= chatMessages.scrollHeight;

      if (isAtTop) {
        // this.fetchMessages(this.channelSid);
      } else if (!isAtBottom) {
        this.isUserScrolling = true;
        clearTimeout(this.scrollTimeout);

        this.scrollTimeout = setTimeout(() => {
          this.isUserScrolling = false;
        }, 2000);
      }
    },
    async getCandidateMethods() {
      try {
        let allCandidates = [];
        let currentPage = 1;
        const itemsPerPage = 10;
        let totalPages = 1;

        do {
          const response = await axios.get(`${VITE_API_URL}/candidates`, {
            params: {
              page: currentPage,
              per_page: itemsPerPage,
              status_value: "approved",
              activated_value: true,
            },
          });

          allCandidates = [...allCandidates, ...response.data.data];

          totalPages = response.data.total_pages;

          currentPage++;
        } while (currentPage <= totalPages);

        this.getCandidatesData = allCandidates;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    async markAllAsRead() {
      if (this.unread_count > 0) {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.put(
            `${VITE_API_URL}/merchant_notification_read_all`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            this.unread_count = 0;

            this.notifications.forEach((notification) => {
              notification.read = true;
            });
          }
        } catch (error) {
          // console.error("Error marking notifications as read:", error);
        }
      }
    },
    async fetchNotifications() {
      const token = localStorage.getItem("token");
      this.isLoading = true;

      try {
        const response = await axios.get(`${VITE_API_URL}/agency_notifications`, {
          params: {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // this.notifications = response.data.notifications || [];

          if (this.currentPage === 1) {
            this.notifications = response.data.notifications || [];
          } else {
            this.notifications = [
              ...this.notifications,
              ...(response.data.notifications || []),
            ];
          }
          this.currentPage = response.data.current_page;
          this.totalCount = response.data.total_count;
          this.unread_count = response.data.unread_count || 0;
          // this.total_count = response.data.total_count;
          this.errorMessageNotification =
            this.notifications.length === 0 ? response.data.message : "";
        }
      } catch (error) {
        this.errorMessage = "Failed to load notifications";
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    if (this.disableApiCall) {
      const token = localStorage.getItem("token");
      const merchantId = localStorage.getItem("merchant_id");
      if (merchantId && token) {
        this.adminLink = `/admin/${merchantId}`;
      }
      this.fetchProfileImage();
      await this.getCandidateMethods();
      // this.fetchNotifications();
      return;
    }
    const token = localStorage.getItem("token");
    const merchantId = localStorage.getItem("merchant_id");
    if (merchantId && token) {
      this.adminLink = `/admin/${merchantId}`;
    }
    this.fetchProfileImage();
    // this.fetchNotifications();

    // this.scrollToBottom();
    await this.getCandidateMethods();
    // this.messageFetchInterval = setInterval(() => {
    //   if ( this.channelSid) {
    //     this.fetchMessages(this.channelSid);
    //   } else {
    //     this.$store.dispatch('updateChannelSid', null);
    //   }
    // }, 2000);
  },
  beforeUnmount() {
    if (this.messageFetchInterval) {
      clearInterval(this.messageFetchInterval);
    }
    // this.$store.dispatch('updateChannelSid', null);
  },
};
</script>

<style scoped>
/* Sidebar styles */
#sidebar {
  width: 246px;
  height: 100vh;
  border: 1px solid #eff0f6;
  box-shadow: 0px 5px 20px 0px #0000000d;
  border-radius: 20px;
  border-width: 1px;
  background: #ffffff;
  color: #000000;
  padding-top: 12px;
  transition: 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
}

#sidebar.active {
  width: 70px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.sidebar-header h3 {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.btn-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

ul.components {
  padding: 0;
  list-style: none;
}

ul.components li {
  padding: 7px;
}

ul.components li a {
  color: #000000;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 193px;
  height: 38px;

  padding-left: 5px;
}

ul.components li a:hover {
  background: #1b59f81a;
  color: #1b59f8;
  width: 193px;
  height: 38px;

  padding-left: 5px;
  border-radius: 10px;
}

/* Dropdown menu styles */
ul.list-unstyled {
  padding-left: 15px;
}

#content {
  margin-left: 250px;
  transition: 0.3s;
  padding: 20px;
}

#content.active {
  margin-left: 70px;
}

/* Responsive */
@media (max-width: 768px) {
  #sidebar {
    width: 70px;
  }

  #content {
    margin-left: 70px;
  }
}
</style>
