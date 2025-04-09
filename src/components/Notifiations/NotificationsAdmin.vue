<template>
  <div>
    <ul
      class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
      @click.self="dropdownOpen = false"
      style="height: 310px; width: 266px; overflow-x: scroll"
      ref="notificationDropdown"
    >
      <li
        v-if="notifications.length === 0"
        class="notification-item p-2 d-flex gap-1 text-danger"
      >
        {{ errorMessageNotification }}
      </li>
      <li
        v-for="(notification, index) in notifications"
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
      <li v-if="notifications.length < totalCount" class="p-2 text-center">
        <button @click.stop="loadMore" class="btn btn-sm btn-primary">Read More</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// import ConfirmationAlert from "./Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
// import logo from "../assets/logo.png";

// import { nextTick } from "vue";
// import LoaderVue from "./Loader/Loader.vue";

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

  components: {},
  computed: {},

  props: {},
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
  },
  methods: {
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
    // if (this.disableApiCall) {
    //   const token = localStorage.getItem("token");
    //   const merchantId = localStorage.getItem("merchant_id");
    //   if (merchantId && token) {
    //     this.adminLink = `/admin/${merchantId}`;
    //   }
    //   this.fetchProfileImage();
    //   await this.getCandidateMethods();
    //   this.fetchNotifications();
    //   return;
    // }
    const token = localStorage.getItem("token");
    const merchantId = localStorage.getItem("merchant_id");
    if (merchantId && token) {
      this.adminLink = `/admin/${merchantId}`;
    }
    // this.fetchProfileImage();
    this.fetchNotifications();
  },
};
</script>
