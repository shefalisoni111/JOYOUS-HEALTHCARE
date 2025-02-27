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
      <!-- <router-link class="nav-link" aria-current="page" to="/LoginType">
        <button class="border-0 bg-transparent fw-bolder fs-3"><i class="bi bi-arrow-clockwise"></i></button>
      </router-link> -->

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
          <!-- <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/booking">
              Booking
            </router-link>
          </li> -->
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
                <router-link class="dropdown-item" to="/invoice/staff-payroll"
                  >Staff Payroll</router-link
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
               
                class="notification-item p-2 d-flex gap-1 divide_sec cursor-pointer"
                v-for="candidate in getCandidatesData"
                :key="candidate.id" @click="openChat(candidate)"
              >
                <div @click="openChat(candidate)">
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
                <hr class="dropdown-divider" />
              </li>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown mt-2">
            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown" >
              <i class="bi bi-bell"></i>
              <!-- <span v-if="!dropdownOpen && showBadge" class="badge bg-primary badge-number" >0</span> -->
              <span v-if="!dropdownOpen && notifications.length > 0" class="badge bg-primary badge-number">
                {{ notifications.length }}
              </span>
            </a>
            <!-- <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" @click.self="dropdownOpen = false" style="height:310px;    width: 266px;"  @scroll="onScroll"  ref="notificationDropdown">
           
               <li class="notification-item p-2 d-flex gap-1 text-danger">No Notification Found!</li>
            </ul> -->
            <ul
  class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
  @click.self="dropdownOpen = false"
  style="height: 310px; width: 266px"
  @scroll="onScroll"
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
              <button @click="sendMessage"  :disabled="!newMessage.trim()" class="btn btn-primary flex-end">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </nav>
</template>

<script>
import axios from "axios";
// import ConfirmationAlert from "./Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
import logo from '../assets/logo.png';


import { nextTick } from "vue";
import LoaderVue from './Loader/Loader.vue';

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  name: "Navbar",

  data() {
    return {
      adminLink: '/admin/',
      getAdminData: [],
      isUserScrolling: false,
      showChatBox: false,
      getAdminProfile: [],
      getCandidatesData: [],
      newMessage: "",
      selectedCandidate: null,
      selectedCandidateMessages: [] ,
      messages: [],
      searchQuery: "",
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      errorMessageNotification:'',
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showBadge: true,
      dropdownOpen: false,
      showAll: false,
      // channelSid: "",
      isLoading: true,
      isFetchingMessages: false,
      messageFetchInterval: null,
   
    senderId:null,
    socket: null,
      storedImageUrl: "",
      localProfileImage: this.profileImage,
      notifications: [
        
       
      ],
    };
  },
  components:{
    
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
  },
  watch: {
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
      this.fetchMessages(this.channelSid).then(() => {
      this.scrollToBottom();
    }).catch((error) => {
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

  channelSid(newChannelSid) {
      if (newChannelSid) {
        // console.log('Channel SID changed:', newChannelSid);
        this.fetchMessages(newChannelSid);
      }
    }
},
  methods: {
    onScroll() {
      const chatMessages = this.$refs.chatMessages;
    
      if (chatMessages.scrollHeight - chatMessages.scrollTop <= chatMessages.clientHeight + 10) {
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
        candidate_query: this.searchQuery.trim()
      }
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
      this.showChatBox = true;
       this.fetchChatChannel(candidate.id);
    
      
    },
    closeChatBox() {
      this.showChatBox = false;
      this.selectedCandidate = null;
      
      this.$store.dispatch('updateChannelSid', null);
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
            sender_id:id,
            sender_type:"Candidate",
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
          this.$store.dispatch('updateChannelSid', data.channel_sid);
          await   this.fetchMessages(data.channel_sid)
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Failed to create chat channel. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
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

      const tempMessage = this.newMessage; 

      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${VITE_API_URL}/chats/send_message_to_channel`, {
          method: "POST",
          body: JSON.stringify({
            channel_sid: this.channelSid,
            message: tempMessage
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
      await  this.fetchMessages(this.channelSid) 
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
          text: "An unexpected error occurred while sending the message. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
    async fetchMessages(channelSid)  {
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
      text: error.response?.data?.message || "Failed to fetch messages. Please try again.",
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
      imageAlt: 'RecPal',
      showCancelButton: true,
      confirmButtonColor: '#ff5f30',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign me out!',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        
        const popup = document.querySelector('.swal2-popup');
        popup.style.border = '4px solid #fc7d4f'; 
      }
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
        // Fetch older messages if scrolled to top
        // this.fetchMessages(this.channelSid);
      } else if (!isAtBottom) {
        // User is actively scrolling
        this.isUserScrolling = true;
        clearTimeout(this.scrollTimeout);

        // Reset scrolling state after 2 seconds of inactivity
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
        params: { page: currentPage, per_page: itemsPerPage,status_value: "approved", 
        activated_value: true, },
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
    async fetchNotifications() {
  const token = localStorage.getItem("token");
  this.isLoading = true;
  
  try {
    const response = await axios.get(`${VITE_API_URL}/agency_notifications`, {
      params: {
        page: this.currentPage, 
        per_page: 3
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      this.notifications = response.data.notifications || [];
      
      this.errorMessageNotification = this.notifications.length === 0 ? response.data.message : "";
    }
  } catch (error) {
    // console.error("Error fetching notifications:", error);
    this.errorMessage = "Failed to load notifications";
  } finally {
    this.isLoading = false;
  }
    },
  },

 async mounted() {
  this.fetchNotifications();
  const token = localStorage.getItem("token");
  const merchantId = localStorage.getItem('merchant_id');
    if (merchantId && token) {
      this.adminLink = `/admin/${merchantId}`;
    }
  this.fetchProfileImage()
  // this.scrollToBottom();
  await  this.getCandidateMethods();
  this.messageFetchInterval = setInterval(() => {
    if ( this.channelSid) {
      this.fetchMessages(this.channelSid);
    } else {
      this.$store.dispatch('updateChannelSid', null);
    }
  }, 2000);
  

    
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

.message {
  margin-bottom: 10px;
}

.message-sender {
  font-weight: bold;
}

.chat-messages {

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 222px;
  overflow-y: auto;
  overflow-x: hidden;
}

.chat-message-left {
  align-self: flex-start;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}

.chat-message-right {
  align-self: flex-end;
  background: #d1f7c4;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}
.chat-input {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-loader {
  color: #f6851d;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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
.custom-popup {
  border: 10px solid #3085d6; 
  border-radius: 10px; 
}

.custom-title {
  font-size: 30px; 
  font-weight: bold; 
}

.custom-content {
  font-size:30px; 
  color: #333; 
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
.spinner-border{color: #f6851d;}
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