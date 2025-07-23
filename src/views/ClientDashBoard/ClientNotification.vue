<template>
  <div>
    <div class="">
      <div id="main" class="d-flex" style="background: #f8f8ff">
        <div
          class=""
          style="
            background: #fff;

            border-radius: 20px;
          "
        >
          <ClientNavbar />
        </div>

        <div class="container-fluid pt-3 px-5 flex-grow-1 overflow-auto">
          <div class="row">
            <div class="p-0">
              <div class="py-3">
                <ol class="breadcrumb my-2">
                  <li class="breadcrumb-item active fs-6">
                    <a
                      class="nav-link d-inline fs-4 fw-bolder"
                      style="color: #000000; background: none !important"
                      >Notification</a
                    >
                  </li>
                </ol>
              </div>
            </div>

            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-notification-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-notification"
                  type="button"
                  role="tab"
                  aria-controls="pills-notification"
                  aria-selected="true"
                >
                  All Notification
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
                  <span
                    v-if="unread_count >= 0"
                    class="badge rounded-circle bg-danger text-white unread-badge"
                  >
                    {{ unread_count }}
                  </span>
                </button>
              </li>
            </ul>
            <div class="tab-content pt-4 ps-4" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-notification"
                role="tabpanel"
                aria-labelledby="pills-notification-tab"
              >
                <div>
                  <ul class="notification-list">
                    <li
                      v-for="(notification, index) in notifications"
                      :key="index"
                      class="notification-item"
                    >
                      <span
                        style="
                          width: 44px;
                          height: 44px;
                          margin-top: 5px;
                          background: #f9944b14;
                          border-radius: 50%;

                          line-height: 37px;
                          text-align: center;
                        "
                      >
                        <img
                          src="../../assets/bell.png"
                          alt="icon"
                          class="marker-icon"
                        />
                      </span>

                      <div class="notification-content">
                        <h5>{{ notification.title }}</h5>
                        <p>{{ notification.message }}</p>
                        <p class="text-sm text-gray-500">
                          {{ notification.time }}
                        </p>
                      </div>
                    </li>
                  </ul>
                  <p v-if="notifications.length === 0" class="text-danger">
                    No Notifications Found.
                  </p>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-unread"
                role="tabpanel"
                aria-labelledby="pills-unread-tab"
              >
                <ul class="notification-list">
                  <li
                    v-for="notification in unreadNotifications"
                    :key="notification.id"
                    class="notification-item"
                  >
                    <img
                      src="../../assets/bell.png"
                      alt="icon"
                      class="marker-icon"
                    />
                    <div class="notification-content">
                      <h4>{{ notification.title }}</h4>
                      <p>{{ notification.message }}</p>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(notification.created_at) }}
                      </p>
                    </div>
                  </li>
                </ul>
                <p v-if="unreadNotifications.length === 0" class="text-danger">
                  No unread notifications.
                </p>
              </div>
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

import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";
// import logo from "../assets/logo.png";

// import { nextTick } from "vue";
// import LoaderVue from "./Loader/Loader.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  name: "ClientNotification",

  data() {
    return {
      clientLink: "/client/clientDashboard/",
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

  components: { ClientNavbar },
  computed: {
    unreadNotifications() {
      return this.notifications.filter((notification) => !notification.read);
    },
  },

  props: {},
  watch: {
    "$route.name"(newRoute) {
      if (newRoute === "ClientNavbar") {
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
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async loadMore() {
      this.currentPage++;
      await this.fetchNotifications();
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    showAllNotifications(event) {
      event.preventDefault();
      this.showAll = true;
    },

    async markAllAsRead() {
      if (this.unread_count > 0) {
        // const token = localStorage.getItem("token");

        try {
          const response = await axios.put(
            `${VITE_API_URL}/client_notification_read_all?id=${clientId}`,
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
      // if (!this.clientId || !this.token) return;
      // const token = localStorage.getItem("token");
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("c_unique"); // ✅ Add this

      if (!clientId || !token) {
        return;
      }
      this.isLoading = true;

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_notifications/${clientId}`,
          {
            params: {
              page: this.currentPage,
              per_page: this.itemsPerPage,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    const clientId = localStorage.getItem("c_unique");
    const token = localStorage.getItem("token");
    // if (clientId && token) {
    //   this.clientLink = `/client/clientDashboard/${clientId}`;
    //   await this.fetchNotifications();
    // }
    await this.fetchNotifications();
  },
};
</script>

<style scoped>
#main {
  height: 100vh;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #f9944b;
  color: #fff;
  padding: 6px 15px;
  border-radius: 5px;
}
.nav-link {
  color: #000;
  background: #f9944b14;
}
.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

.marker-icon {
  margin-top: 4px;
}

.notification-content {
  flex: 1;
}

.tab-content {
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px #0000000d;
  border-radius: 20px;
  border-width: 1px;
}
.unread-badge {
  position: absolute;
  top: 0px;
  right: -10px;
  font-size: 12px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
}
</style>
