<template>
  <div>
    <div class="main-body d-flex" id="main">
      <div
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar :profileImage="profileImage" />
      </div>
      <div
        class="container-fluid px-5 pt-4"
        style="background: rgb(82 74 74 / 6%); height: 100vh"
      >
        <div class="p-0">
          <div class="">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active fs-6">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000; background: none !important"
                >
                  Admin Profile</a
                >
              </li>
            </ol>
          </div>
        </div>

        <div class="row gutters-sm mt-3">
          <div class="col-12">
            <div class="card h-100" style="border-radius: 25px">
              <div class="card-body p-0" style="height: 450px">
                <div class="position-relative">
                  <div class="themeBgColor w-100" style="height: 200px"></div>
                  <!-- <img
                    src="../assets/profile_bg.png"
                    class="img-fluid w-100"
                    :alt="getCompanyName"
                    loading="eager"
                    style="width: 200px; height: 200px"
                  /> -->
                </div>
                <div
                  class="d-flex flex-column align-items-center text-center float-start position-absolute ps-5"
                  style="top: 30%"
                >
                  <div class="img-div position-relative bg-white">
                    <div class="profile-border">
                      <router-view to="/home">
                        <img
                          v-if="!profileImage"
                          src="./profile.png"
                          width="150"
                          height="150"
                          @click="openFileInput"
                          class="profile-img"
                          style=""
                          loading="eager"
                        />
                        <img
                          v-else
                          :src="displayedProfileImage"
                          width="150"
                          height="150"
                          @click="openFileInput"
                          class="profile-img"
                          style=""
                          loading="eager"
                        />
                      </router-view>
                    </div>
                    <label for="profilePicInput" class="camera-icon">
                      <i class="bi bi-camera"></i>
                    </label>
                  </div>

                  <input
                    type="file"
                    id="profilePicInput"
                    ref="profilePicInput"
                    style="display: none"
                    @change="handleFileChange"
                    accept="image/*"
                  />
                  <div class="mt-3">
                    <h4 class="text-capitalize">
                      {{ getAdmin.company_name }}
                    </h4>
                    <p class="text-secondary mb-1">
                      {{ getAdmin.position }}
                    </p>
                    <!-- <p class="text-muted font-size-sm">Developer</p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card h-100 mt-3" style="border-radius: 25px">
              <div class="card-body">
                <ul class="list-unstyled">
                  <li
                    class="d-flex justify-content-between align-items-center mb-4 mt-3"
                  >
                    <div class="d-flex">
                      <i
                        class="bi bi-person-fill fs-4 me-3 chatTextThemeColor notificationIconBgThemeColor"
                        style="
                          border-radius: 50%;

                          padding: 5px 11px;
                        "
                      ></i>

                      <div class="d-flex gap-4 align-items-center">
                        <div class="fw-semibold">Agency Name</div>
                        <div class="text-secondary text-capitalize text-black">
                          {{ getAdmin.company_name }}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        class="text-nowrap text-nowrap border-0 bg-transparent"
                        data-bs-toggle="modal"
                        data-bs-target="#editAdmin"
                        data-bs-whatever="@mdo"
                      >
                        <i
                          class="bi bi-pencil-fill"
                          style="color: #f9944b !important"
                        ></i>
                      </button>
                    </div>
                  </li>
                  <li
                    class="d-flex justify-content-between align-items-center mb-4 mt-3"
                  >
                    <div class="d-flex">
                      <i
                        class="bi bi-person-fill fs-4 me-3 chatTextThemeColor notificationIconBgThemeColor"
                        style="
                          border-radius: 50%;

                          padding: 5px 11px;
                        "
                      ></i>

                      <div class="d-flex gap-4 align-items-center">
                        <div class="fw-semibold">Full Name</div>
                        <div class="text-secondary text-capitalize text-black">
                          {{ getAdmin.first_name + " " + getAdmin.last_name }}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="d-flex align-items-center mb-4">
                    <i
                      class="bi bi-envelope-fill fs-4 me-3 chatTextThemeColor notificationIconBgThemeColor"
                      style="
                        border-radius: 50%;

                        padding: 5px 11px;
                      "
                    ></i>
                    <div class="d-flex gap-4">
                      <div class="fw-semibold">Email</div>
                      <div class="text-secondary text-black">
                        {{ getAdmin.email }}
                      </div>
                    </div>
                  </li>
                  <li class="d-flex align-items-center mb-4">
                    <i
                      class="bi bi-telephone-fill fs-4 me-3 chatTextThemeColor notificationIconBgThemeColor"
                      style="
                        border-radius: 50%;

                        padding: 5px 11px;
                      "
                    ></i>
                    <div class="d-flex gap-4">
                      <div class="fw-semibold">Mobile</div>
                      <div class="text-secondary text-black">
                        {{ getAdmin.phone_number }}
                      </div>
                    </div>
                  </li>
                  <li class="d-flex align-items-center">
                    <i
                      class="bi bi-geo-alt-fill fs-4 me-3 chatTextThemeColor notificationIconBgThemeColor"
                      style="
                        border-radius: 50%;

                        padding: 5px 11px;
                      "
                    ></i>
                    <div class="d-flex gap-4">
                      <div class="fw-semibold">Address</div>
                      <div class="text-secondary text-capitalize text-black">
                        {{ getAdmin.address }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <EditAdmin @admin-updated="handleAdminUpdated" />
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import EditAdmin from "../components/modals/Admin/EditAdmin.vue";
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";

export default {
  name: "AdminProfile",
  data() {
    return {
      getAdmin: [],
      errorMessage: null,
      profileImage: "",
    };
  },
  components: { Navbar, EditAdmin, SuccessAlert },
  computed: {
    displayedProfileImage() {
      return this.profileImage ? this.profileImage : "./profile.png";
    },
  },
  methods: {
    openFileInput() {
      this.$refs.profilePicInput.click();
    },
    async handleFileChange(event) {
      const token = localStorage.getItem("token");
      const file = event.target.files[0];

      if (!file) {
        // console.error("No file selected");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("profile_photo", file);

        const response = await axios.put(
          `${VITE_API_URL}/merchant_upload_profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.image) {
          const imageUrl = `${VITE_API_URL}${response.data.image}`;

          this.profileImage = imageUrl;

          const message = "successfully Updated Profile.";
          this.$refs.successAlert.showSuccess(message);
        } else {
        }
      } catch (error) {
        // console.error("Error uploading profile picture:", error);
      }
    },

    handleAdminUpdated() {
      this.fetchAdminData();
    },
    async fetchAdminData() {
      const token = localStorage.getItem("token");
      const merchantId = localStorage.getItem("merchant_id");

      try {
        const response = await axios.get(
          `${VITE_API_URL}/merchants/${merchantId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.getAdmin = response.data.data;
        if (this.getAdmin.profile_photo) {
          this.profileImage = `${VITE_API_URL}${this.getAdmin.profile_photo}`;
        } else {
          this.profileImage = "./profile.png";
        }
        this.profileImage = `${VITE_API_URL}${this.getAdmin.profile_photo}`;
      } catch (error) {
        // Handle error if needed
        // console.error("Error fetching admin data:", error);
      }
    },
  },
  async mounted() {
    await this.fetchAdminData();
  },
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.img-div label {
  position: absolute;
  bottom: 0;
  background: #42403f;
  border-radius: 50%;
  padding: 3px 8px;
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  right: 10%;
}
.img-div img,
.img-div {
  border-radius: 50%;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;

  border-radius: 0.25rem;
}

.mainheading {
  background-color: #ff5f3014;

  margin: auto;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}
a.router-link-active,
.dropdown-item:hover,
.dropdown-item:focus {
  color: #fff;
  background-color: #bbd10d78 !important;
  border-radius: 4px;
}
ul.profile li a:hover,
ul.profile .dropdown-item:hover,
ul.profile .dropdown-item:focus {
  background-color: #bbd10d78 !important;
}
.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.profile-border {
  width: 190px; /* Image size + border */
  height: 190px;
  border: 20px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: white;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.camera-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: black;
  color: white;
  border-radius: 50%;
  padding: 5px;
}
.shadow-none {
  box-shadow: none !important;
}
@media (max-width: 1700px) {
  #main {
    margin-top: 70px;
  }
}
</style>
