<template>
  <div class="">
    <button
      class="btn btn-outline-primary d-lg-none position-fixed top-0 start-0 m-3 z-1030 ms-4"
      style="background: orange; color: #fff; border: 1px solid #fff"
      @click="toggleSidebar"
    >
      <i class="bi bi-list"></i>
    </button>
    <!-- Sidebar -->
    <nav id="sidebar">
      <aside :class="['sidebar', { show: isSidebarVisible }]" class="sidebar">
        <div class="sidebar-header">
          <a
            class="navbar-brand ps-3"
            href="/client/clientDashboard"
            style="outline: none; box-shadow: none"
            ><img
              src="../../assets/logo.png"
              class="img-fluid"
              alt="RecPal"
              width="138"
              height="31"
              loading="eager"
          /></a>
          <button
            class="btn btn-outline-primary d-lg-none"
            @click="toggleSidebar"
            style="background: orange; color: #fff; border: 1px solid #fff"
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
        <ul class="list-unstyled components">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard"
            >
              <img
                src="../../assets/Vector.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
              Dashboard
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/shift"
            >
              <i class="bi bi-calendar"></i> Shifts
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/booking"
            >
              Bookings
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/schedule"
            >
              <i class="bi bi-clock"></i> Schedule
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/timesheet"
            >
              Timesheet
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/signedTimesheet"
            >
              <i class="bi bi-file-earmark-text"></i> Timesheet
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/invoice"
            >
              <i class="bi bi-receipt"></i> Invoices
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav m-0 mb-2 mb-lg-0 inline-nav ps-4">
          <li class="nav-item dropdown mt-2">
            <router-link
              class="nav-link"
              aria-current="page"
              to="/client/clientDashboard/ClientNotification"
            
             
              @click="markAllAsRead"
            >
              <i class="bi bi-bell pe-1"></i>
              Notification
              <span
                v-if="!dropdownOpen && unread_count > 0"
                class="badge bg-primary badge-number"
              >
                {{ unread_count }}
              </span>
          </router-link>
            <li class="me-4">
              <hr class="" />
            </li>
            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
              @click.self="dropdownOpen = false"
              style="height: 310px; width: 266px; overflow-x: scroll"
              @scroll="onScroll"
              ref="notificationDropdown"
            >
              <li
                v-if="notifications.length === 0"
                class="notification-item p-2 d-flex gap-1 text-danger"
              >
              <a class="dropdown-item">
       {{ errorMessageNotification }}
              </a>
         
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
              <li
                v-if="notifications.length < totalCount"
                class="p-2 text-center"
              >
                <button @click.stop="loadMore" class="btn btn-sm btn-primary">
                  Read More
                </button>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link nav-icon nav-profile d-flex align-items-center pe-0 text-capitalize"
              href="#"
              data-bs-toggle="dropdown"
              aria-label="profile detail"
            >
              <img
                v-if="computedProfileImage !== '../profile.png'"
                :src="computedProfileImage"
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
             &nbsp; {{ getAdminData.client_name }}
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
                <router-link
                  class="dropdown-item text-capitalize d-flex align-items-center"
                  :to="clientLink"
                  ><i class="bi bi-gear-wide pe-2"></i
                  ><span>Personal Settings</span>
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
                <a
                  class="dropdown-item d-flex align-items-center"
                  v-on:click="confirmed"
                >
                  <i class="bi bi-box-arrow-right"></i>&nbsp;&nbsp;
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </nav>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
  </div>
</template>

<script>
import axios from "axios";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
export default {
  name: "ClientNavbar",

  data() {
    return {
      newMessage: "",
      clientLink: "/client/clientDashboard/",
      isSidebarVisible: true,
      isModalVisible: false,
      getAdminData: [],
      confirmMessage: "",
      confirmCallback: null,
      showBadge: true,
      dropdownOpen: false,
      showAll: false,
      localProfileImage: this.profileImage,
      errorMessageNotification: "",
      notifications: [],
      showNotificationIcon: false,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      unread_count: 0,
    };
  },
  components: { ConfirmationAlert },
  computed: {
    isTimesheetMenuActive() {
      return [
        "/timesheet/weekly",
        "/timesheet/custom",
        "/timesheet/signed",
      ].includes(this.$route.path);
    },
    isInvoiceMenuActive() {
      return ["/invoice/client-invoice", "/invoice/staff-payroll"].includes(
        this.$route.path
      );
    },
    userRole() {
      return this.$store.getters.userRole;
    },
    visibleNotifications() {
      return this.showAll ? this.notifications : this.notifications.slice(0, 2);
      //  return this.notifications.slice(0, 5);
    },
    isScrollable() {
      return this.notifications.length > this.visibleNotifications.length;
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
    computedProfileImage() {
      return this.localProfileImage;
    },
  },
  watch: {
    profileImage(newValue) {
      this.localProfileImage = newValue;
    },
    userRole: {
      handler(newRole) {
        this.showNotificationIcon = newRole !== "client_user";
      },
      immediate: true,
    },
    notifications: {
      handler(newNotifications) {
        this.unread_count = newNotifications.filter((n) => !n.read).length;
      },
      deep: true,
      immediate: true,
    },
  },

  props: {
    profileImage: {
      type: String,
      default: "../profile.png",
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("show");
      }
    },
    hideNotificationIcon() {
      this.showNotificationIcon = true;
    },
    async loadMore() {
      this.currentPage++;
      await this.fetchNotifications();
    },
    async markAllAsRead() {
      if (this.unread_count > 0) {
        const token = localStorage.getItem("token");
        const clientId = localStorage.getItem("c_unique");

        if (!clientId) {
          console.error(
            "Client ID is missing. Cannot mark notifications as read."
          );
          return;
        }

        try {
          const response = await axios.put(
            `${VITE_API_URL}/client_notification_read_all?id=${clientId}`,
            {}, // Empty body
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
          // console.error(
          //   "Error marking notifications as read:",
          //   error.response?.data || error
          // );
        }
      }
    },
    async fetchNotifications() {
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("c_unique");
      this.isLoading = true;

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_notifications/${clientId}`,
          {
            params: {
              page: this.currentPage,
              per_page: this.currentPage,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
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

          this.errorMessageNotification =
            this.notifications.length === 0 ? response.data.message : "";
        }
      } catch (error) {
        // console.error("Error fetching notifications:", error);
        this.errorMessage = "Failed to load notifications";
      } finally {
        this.isLoading = false;
      }
    },
    confirmed() {
      this.isModalVisible = false;

      this.confirmed();
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    canceled() {
      this.isModalVisible = false;
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
    async fetchProfileImage() {
      const token = localStorage.getItem("token");
      const clientId = localStorage.getItem("c_unique");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${clientId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const imagePath = response.data.profile_photo;
        this.getAdminData = response.data;
        this.localProfileImage = `${VITE_API_URL}${imagePath}`;
      } catch (error) {
        // console.error("Error fetching profile image:", error);
      }
    },
  },
  mounted() {
    // this.fetchNotifications();
    // this.$store.dispatch("fetchUser");
    this.fetchProfileImage();
    const clientId = localStorage.getItem("c_unique");
    // const token = localStorage.getItem("token");
    if (clientId) {
      this.clientLink = `/client/clientDashboard/${clientId}`;
    }
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
}
.sidebar {
  top: 0;
  left: 0;

  overflow-y: auto;
  background: #ffffff;

  color: #000000;
  padding-top: 12px;
  transition: all 0.3s ease;
  z-index: 1000;
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
ul.components li a:hover,
ul.components li a img:hover ul.components li.active > a,
ul.components li.router-link-active,
ul.components li a.router-link-active,
ul.components li a.active,
ul.dropdown li a:hover,
.nav-link:hover,
.nav-link:focus {
  background: #1b59f81a;
  color: #1b59f8;
  width: auto;

  border-radius: 10px;
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
.sidebar {
  width: 250px;
  transition: all 0.3s ease;
}
.sidebar.collapsed {
  width: 70px;
  overflow-x: hidden;
}

.sidebar.collapsed .menu-text {
  display: none;
}

.sidebar.collapsed .submenu {
  display: none;
}
@media (max-width: 1100px) {
  .sidebar {
    display: none;
    position: absolute;
    z-index: 999;
    background-color: white;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .sidebar.show {
    display: block;
  }

  .main.d-flex {
    flex-direction: column;
  }
}

@media (max-width: 1100px) {
  #sidebar {
    width: 70px;
  }

  #content {
    margin-left: 70px;
  }
}
</style>
