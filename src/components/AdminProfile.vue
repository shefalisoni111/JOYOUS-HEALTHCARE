<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="main-body" id="main">
        <h3
          class="text-center fw-bold p-2 m-auto rounded-3 mainheading"
          style="width: 100%"
        >
          Admin Profile
        </h3>
        <div class="row gutters-sm mt-3">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <div class="img-div position-relative">
                    <router-view to="/home">
                      <img
                        v-if="!profileImage"
                        src="./profile.png"
                        width="150"
                        height="150"
                        @click="openFileInput"
                        style=""
                        loading="eager"
                      />
                      <img
                        v-else
                        :src="displayedProfileImage"
                        width="150"
                        height="150"
                        @click="openFileInput"
                        style=""
                        loading="eager"
                      />
                    </router-view>
                    <label for="profilePicInput">
                      <i class="bi bi-camera-fill"></i>
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
                      {{ getAdmin.first_name }}
                    </h4>
                    <p class="text-secondary mb-1">
                      {{ getAdmin.position }}
                    </p>
                    <!-- <p class="text-muted font-size-sm">Developer</p> -->
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btn btn-primary text-nowrap text-nowrap"
                      data-bs-toggle="modal"
                      data-bs-target="#editAdmin"
                      data-bs-whatever="@mdo"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card h-100">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary text-capitalize">
                    {{ getAdmin.first_name }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ getAdmin.email }}
                  </div>
                </div>

                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Mobile</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {{ getAdmin.phone_number }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary text-capitalize">
                    {{ getAdmin.address }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
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
      profileImage: null,
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
          localStorage.setItem("profileImage", imageUrl);
          this.profileImage = imageUrl;
          const message = "successfully Updated Profile.";
          this.$refs.successAlert.showSuccess(message);
        } else {
          // console.error(
          //   "Upload succeeded but no profile photo found in the response:",
          //   response.data
          // );
        }
      } catch (error) {
        // console.error("Error uploading profile picture:", error);
        // this.errorMessage = "Failed to upload profile image. Please try again.";
      }
    },

    // async handleFileChange(event) {
    //   const token = localStorage.getItem("token");
    //   const file = event.target.files[0];
    //   if (!file) {
    //     // console.error("No file selected");
    //     return;
    //   }
    //   try {
    //     const formData = new FormData();
    //     formData.append("profile_photo", file);
    //     const response = await axios.put(
    //       `${VITE_API_URL}/merchant_upload_profile`,
    //       formData,
    //       {
    //         headers: {
    //           Authorization: "bearer " + token,
    //         },
    //       }
    //     );

    //     const imageUrl = `${VITE_API_URL}${response.data.data.profile_photo}`;
    //     localStorage.setItem("profileImage", imageUrl);
    //     this.profileImage = imageUrl;
    //     console.log(this.profileImage);
    //     if (response.data.error) {
    //       this.errorMessage = response.data.error;

    //       this.profileImage = null;
    //     } else {
    //       if (response.data && response.data.data && response.data.data.profile_photo) {
    //         this.profileImage = `${VITE_API_URL}${response.data.data.profile_photo}`;
    //         this.errorMessage = null;
    //       } else {
    //         console.error("Profile photo No found in response:", response.data);
    //       }
    //     }
    //   } catch (error) {
    //     // console.error("Error uploading profile picture:", error);
    //     // Handle error
    //   }
    // },
    handleAdminUpdated() {
      this.fetchAdminData();
    },
    async fetchAdminData() {
      const token = localStorage.getItem("token");
      const merchantId = localStorage.getItem("merchant_id");

      try {
        const response = await axios.get(`${VITE_API_URL}/merchants/${merchantId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });

        this.getAdmin = response.data.data;
      } catch (error) {
        // Handle error if needed
        // console.error("Error fetching admin data:", error);
      }
    },
  },
  async mounted() {
    const storedImageUrl = localStorage.getItem("profileImage");
    if (storedImageUrl) {
      this.profileImage = storedImageUrl;
    }
    await this.fetchAdminData();
  },
};
</script>

<style scoped>
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
  border: 1px solid grey;
  box-shadow: 5px 6px 25px -10px;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
#main {
  margin-top: 85px;
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
  background-color: #f6851d !important;
  border-radius: 4px;
}
ul.profile li a:hover,
ul.profile .dropdown-item:hover,
ul.profile .dropdown-item:focus {
  background-color: #f6851d !important;
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
.shadow-none {
  box-shadow: none !important;
}
@media (max-width: 1700px) {
  #main {
    margin-top: 70px;
  }
}
</style>
