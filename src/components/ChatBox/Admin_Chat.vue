<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main" class="d-flex" style="background: #f8f8ff">
        <div>
          <Navbar />
        </div>

        <div class="pt-3 px-5 flex-grow-1 overflow-auto">
          <div class="row">
            <div class="p-0">
              <div class="py-3">
                <ol class="breadcrumb my-2">
                  <li class="breadcrumb-item active fs-6">
                    <a
                      class="nav-link d-inline fs-4 fw-bolder"
                      style="color: #000000; background: none !important"
                      >Message</a
                    >
                  </li>
                </ol>
              </div>
            </div>

            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-chat-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-chat"
                  type="button"
                  role="tab"
                  aria-controls="pills-chat"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              &nbsp;&nbsp;
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link position-relative"
                  id="pills-unread-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-unread"
                  type="button"
                  role="tab"
                  aria-controls="pills-unread"
                  aria-selected="false"
                >
                  Unread
                </button>
              </li>
            </ul>
            <div class="tab-content pt-2 ps-0" id="pills-tabContent ">
              <div
                class="tab-pane fade show active d-flex gap-4"
                id="pills-chat"
                role="tabpanel"
                aria-labelledby="pills-chat-tab"
              >
                <div
                  class="col-3"
                  style="
                    background: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    overflow-y: auto;
                    height: 750px;
                  "
                >
                  <div>
                    <form
                      @submit.prevent="search"
                      class="d-flex align-items-center position-relative"
                    >
                      <input
                        class="form-control form-control-lg mr-sm-2"
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        v-model="searchQuery"
                        @input="debounceSearch"
                      />
                      <span
                        class="position-absolute"
                        style="right: 10px; top: 50%; transform: translateY(-50%)"
                      >
                        <img
                          src="../../assets/Search.png"
                          class="img-fluid pe-2"
                          alt="Search"
                        />
                      </span>
                    </form>
                    <ul class="ps-0 list-ul">
                      <li
                        class="notification-item p-2 d-flex gap-1 divide_sec cursor-pointer ps-3 mt-3"
                        :class="{ 'active-chat': selectedCandidate?.id === candidate.id }"
                        v-for="candidate in getCandidatesData"
                        :key="candidate.id"
                        style=""
                        @click="openChat(candidate)"
                      >
                        <div>
                          <img
                            v-if="candidate.profile_photo"
                            :src="getProfilePhotoUrl(candidate.profile_photo)"
                            class="img-fluid"
                            alt="Profile Photo"
                            loading="eager"
                            style="border-radius: 50%; width: 50px; height: 50px"
                          />
                          <div
                            class="else_profile"
                            v-else
                            v-html="getProfilePhotoUrl(candidate.profile_photo)"
                            style="
                              border: 1px solid orange;
                              border-radius: 50%;
                              padding: 6px 13px;
                              font-size: x-large;
                            "
                          ></div>
                        </div>
                        <div class="ms-1">
                          <h6 class="text-capitalize chat-staff mb-0 mt-1">
                            {{ candidate.first_name }} {{ candidate.last_name }}
                          </h6>

                          <span class="text-capitalize" style="color: #f6851d">{{
                            candidate.possition
                          }}</span>
                        </div>
                        <hr class="" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-9" style="border-radius: 15px">
                  <div v-if="showChatBox" class="chat-box mt-1">
                    <div class="chat-container">
                      <div class="chat-header">
                        <div class="divide_sec d-flex">
                          <img
                            v-if="selectedCandidate && selectedCandidate.profile_photo"
                            :src="getProfilePhotoUrl(selectedCandidate.profile_photo)"
                            class="img-fluid"
                            alt="Profile Photo"
                            loading="eager"
                            style="
                              border-radius: 50%;
                              width: 52px;
                              height: 52px;
                              border: 2px solid orange;
                            "
                          />
                          <div
                            class="else_profile"
                            v-else
                            v-html="
                              getProfilePhotoUrl(
                                selectedCandidate ? selectedCandidate.profile_photo : ''
                              )
                            "
                            style="
                              border: 1px solid orange;
                              border-radius: 50%;
                              padding: 6px 14px;
                              font-size: xx-large;

                              display: flex;
                              align-items: center;
                            "
                          ></div>
                          <h5 class="mb-0 text-capitalize ms-3 mt-1">
                            {{ selectedCandidate?.first_name || "" }}
                            {{ selectedCandidate?.last_name || "" }}
                            <p
                              class="fs-6 text-wrap mt-1"
                              style="color: rgb(246, 133, 29)"
                            >
                              {{ selectedCandidate?.possition }}
                            </p>
                          </h5>
                        </div>

                        <!-- <button class="btn btn-danger btn-sm" @click="closeChatBox">
                          <i class="bi bi-x-lg"></i>
                        </button> -->
                      </div>

                      <div
                        class="chat-messages"
                        ref="chatMessages"
                        @scroll="handleScroll"
                      >
                        <div
                          v-if="selectedCandidateMessages?.length > 0"
                          v-for="message in selectedCandidateMessages"
                          :key="message.id"
                          :class="{
                            'chat-message-left': message.sender?.type === 'Candidate',
                            'chat-message-right': message.sender?.type === 'Merchant',
                          }"
                        >
                          <div v-if="message.sender?.name && message?.is_read === true">
                            <strong>{{
                              message.sender?.name || "Unknown Receiver"
                            }}</strong>
                            <div>
                              {{ message.content || "No content" }}
                            </div>
                          </div>

                          <div v-if="message.sender?.name && message?.is_read === false">
                            <!--gh <strong>{{ message.sender?.name === message.sender?.name ? 'You' : message.sender?.name || 'Unknown Sender' }}</strong> -->
                            <strong>
                              {{
                                message.sender?.type === "Merchant" &&
                                message.sender?.name
                                  ? "You"
                                  : message.sender?.name || "Unknown Sender"
                              }}
                            </strong>
                            <div>
                              {{ message.content || "No content" }}
                            </div>
                          </div>
                        </div>

                        <div
                          v-else-if="
                            selectedCandidateMessages?.length === 0 && !isLoading
                          "
                        >
                          <div class="text-danger text-center">No Chat Found!</div>
                        </div>

                        <div
                          v-else-if="selectedCandidateMessages?.length === 0 && isLoading"
                        >
                          <div class="spinner-border d-block m-auto" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="showChatBox"
                    class="px-5"
                    style="
                      background: #fff;
                      border-bottom-left-radius: 15px;
                      border-bottom-right-radius: 15px;
                    "
                  >
                    <div class="chat-input" style="border-top: 1px solid #ddd">
                      <input
                        ref="fileInput"
                        v-model="newMessage"
                        type="text"
                        class="form-control"
                        placeholder="Write message..."
                        rows="3"
                        style="padding-bottom: 45px; border: none"
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
                      <button
                        @click="sendMessage"
                        :disabled="!newMessage.trim() || sending"
                        class="btn btn-primary flex-end"
                      >
                        Send <i class="bi bi-send-fill ms-1" style="font-size: 11px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-unread"
                role="tabpanel"
                aria-labelledby="pills-unread-tab"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ConfirmationAlert from "./Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
import Navbar from "../Navbar.vue";
// import logo from "../assets/logo.png";

// import { nextTick } from "vue";
// import LoaderVue from "./Loader/Loader.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  name: "NotificationsAdmin",

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

  components: { Navbar },
  computed: {
    unreadNotifications() {
      return this.notifications.filter((notification) => !notification.read);
    },
    channelSid() {
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
    getCandidatesData: {
      handler(newVal) {
        if (newVal && newVal.length > 0 && !this.selectedCandidate) {
          this.openChat(newVal[0]);
        }
      },
      immediate: true,
    },
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
    // closeChatBox() {
    //   this.showChatBox = false;
    //   this.selectedCandidate = null;

    //   this.$store.dispatch("updateChannelSid", null);
    // },
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

    if (this.getCandidatesData.length > 0 && !this.selectedCandidate) {
      this.openChat(this.getCandidatesData[0]);
    }
  },
};
</script>

<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #f9944b;
}
.nav-pills .nav-link {
  background: #f9944b14;
  color: #000;
}

.active-chat {
  background-color: #fff6ef;
  border-radius: 10px;
}

.cursor-pointer {
  cursor: pointer;
}
.chat-box {
  bottom: 20px;
  right: 20px;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 10px 0px 10px;
  height: 595px;
  overflow-y: auto;
}
.chat-container {
  border-radius: 5px;
}

.chat-header {
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
.form-control:focus {
  border: none;
}
</style>
