<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="main-body" id="main">
        <h3
          class="text-center fw-bold p-2 m-auto rounded-3 mainheading"
          style="width
          50%"
        >
          Admin Profile
        </h3>
        <div class="row gutters-sm mt-3">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <router-view to="/home"
                    ><img src="./profile.png" alt="USer" width="150"
                  /></router-view>
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
                      class="btn btn-outline-success text-nowrap text-nowrap"
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
    </div>
    <EditAdmin @admin-updated="handleAdminUpdated" />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import EditAdmin from "../components/modals/Admin/EditAdmin.vue";

export default {
  name: "AdminProfile",
  data() {
    return {
      getAdmin: [],
    };
  },
  components: { Navbar, EditAdmin },

  methods: {
    handleAdminUpdated() {
      this.fetchAdminData();
    },
    async fetchAdminData() {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${VITE_API_URL}/merchant_dashboard`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });

        this.getAdmin = response.data.merchant_data;
      } catch (error) {
        // Handle error if needed
        // console.error("Error fetching admin data:", error);
      }
    },
  },
  async created() {
    await this.fetchAdminData();
  },
};
</script>

<style scoped>
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
