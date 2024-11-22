<template>
  <div>
    <Navbar />

    <div id="main" class="main">
      <div class="row">
        <div class="col-md-1"><Sidebar /></div>
        <div class="col-md-3 p-3 bg-white borderight">
          <div class="leftside">
            <div class="heading mb-3 position-relative">
              <p class="bforeline"></p>
              <p class="mb-0 text-uppercase fw-bold genSetting">previleges Settings</p>
              <p class="afterline"></p>
            </div>
            <div>
              <ul class="list-unstyled text-capitalize generalsetting px-3">
                <li class="list-items d-flex">
                  <i class="bi bi-file-earmark-text rounded-circle"></i>
                  <router-link
                    to="/appsetting/previlegesetting"
                    class="text-decoration-none"
                  >
                    <div class="job ms-2">
                      <h6 class="mb-0 text-capitalize">user & privileges</h6>
                      <p class="text-capitalize mb-0">Add & Modify</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="col-12 bg-white">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb pt-4 mb-0">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    privileges setting / <span class="clr">user privileges</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center"></div>
            </div>
          </div>
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between align-items-center mb-0">
              <div class="d-flex">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item active text-capitalize fw-bold">
                    user roles
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-primary rounded-1 text-uppercase fw-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#AddPrivileges"
                  data-bs-whatever="@mdo"
                  type="button"
                  @click="handlePrivilegesAdd"
                >
                  <i class="bi bi-person-plus-fill"></i> Create user
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="bg-white p-2">
                <div class="showdata">
                  <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active text-capitalize ps-0 text-nowrap"
                        id="active"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                        @click="setActiveTab('active')"
                      >
                        Active Users
                        <span class="badge bg-success">{{ totalActiveUserCount }}</span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-capitalize text-nowrap"
                        id="inactive"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                        @click="setActiveTab('inactive')"
                      >
                        Inactive Users
                        <span class="badge bg-danger">{{ totalInActiveUserCount }}</span>
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="active"
                      tabindex="0"
                    >
                      <div class="mt-4 table-wrapper">
                        <table class="table table table-hover addjobtable">
                          <thead>
                            <tr>
                              <th scope="col" class="bg-primary text-white">Id</th>
                              <th scope="col" class="bg-primary text-white">User</th>
                              <th scope="col" class="bg-primary text-white">Email</th>
                              <th scope="col" class="bg-primary text-white">
                                Mobile No:
                              </th>
                              <th scope="col" class="bg-primary text-white">Role</th>

                              <th scope="col" class="bg-primary text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody v-if="rolesActive?.length > 0">
                            <tr v-for="data in rolesActive" :key="data.id">
                              <td>{{ data.id }}</td>
                              <td scope="row">
                                {{ data.first_name + " " + data.last_name }}
                              </td>
                              <td>{{ data.email }}</td>
                              <td>{{ data.phone_number }}</td>
                              <td>{{ data.user_role }}</td>
                              <!-- <td><i class="bi bi-trash text-danger"></i></td> -->

                              <td>
                                <i
                                  class="bi bi-trash text-danger text-nowrap cursor-pointer"
                                  v-on:click="confirmed(data.id, false)"
                                >
                                </i>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="6" class="text-danger">
                                {{ "Inactive users Not found!" }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="inactive"
                      tabindex="0"
                    >
                      <div class="mt-4 table-wrapper">
                        <table class="table table table-hover addjobtable">
                          <thead>
                            <tr>
                              <th scope="col" class="bg-primary text-white">Id</th>
                              <th scope="col" class="bg-primary text-white">User</th>
                              <th scope="col" class="bg-primary text-white">Email</th>
                              <th scope="col" class="bg-primary text-white">
                                Mobile No:
                              </th>
                              <th scope="col" class="bg-primary text-white">Role</th>

                              <th scope="col" class="bg-primary text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody v-if="rolesInActive?.length > 0">
                            <tr v-for="data in rolesInActive" :key="data.id">
                              <td>{{ data.id }}</td>
                              <td scope="row">
                                {{ data.first_name + " " + data.last_name }}
                              </td>
                              <td>{{ data.email }}</td>
                              <td>{{ data.phone_number }}</td>
                              <td>{{ data.user_role }}</td>
                              <td>
                                <i
                                  class="bi bi-trash text-danger cursor-pointer"
                                  v-on:click="rolesDeleteMethod(data.id)"
                                ></i
                                >&nbsp;
                                <button
                                  class="btn btn-primary btn-sm text-nowrap"
                                  v-on:click="confirmed(data.id, true)"
                                >
                                  Re-Activate
                                </button>
                              </td>

                              <!-- <td>
                                <button
                                class="bi bi-pencil btn-sm btn btn-primary rounded-1 text-uppercase fw-medium"
                                data-bs-toggle="modal"
                                data-bs-target="#editJob"
                                data-bs-whatever="@mdo"
                                type="button"
                                v-on:click="jobsEdit(jobs.id)"
                              ></button>

                                <span>&nbsp;</span>
                                <button
                                  class="btn btn-primary btn-sm text-nowrap"
                                  v-on:click="jobActive(data.id)"
                                >
                                  Re-Activate
                                </button>
                              </td> -->
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="6" class="text-danger">
                                {{ "Inactive users Not found!" || errorMessage }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Loader :isLoading="isLoading"></Loader>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddPrivileges @AddPrivileges="getRolesActiveMethod" ref="addPrivileges" />
    <SuccessAlert ref="successAlert" />
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
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
import AddPrivileges from "../modals/privilege Setting/AddPrivileges.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Loader from "../Loader/Loader.vue";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      activeTab: "active",
      rolesActive: [],
      totalActiveUserCount: 0,
      rolesInActive: [],
      totalInActiveUserCount: 0,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      errorMessage: "",
      confirmCallback: null,
    };
  },
  components: {
    Navbar,
    Sidebar,
    AddPrivileges,
    SuccessAlert,
    Loader,
    ConfirmationAlert,
  },
  methods: {
    handlePrivilegesAdd() {
      this.$refs.addPrivileges.getRolesMethod();
    },
    confirmed(id, isActive) {
      this.isModalVisible = false;

      this.updateUserActivation(id, isActive);
    },
    canceled() {
      this.isModalVisible = false;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    jobsEdit(jobID) {
      this.selectedjobID = jobID;
    },

    async getRolesActiveMethod() {
      // if (this.rolesActive?.length === 0) {
      //   return;
      // }
      this.isLoading = true;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/find_active_inactive_users`, {
          headers: {
            Authorization: "bearer " + token,
          },
          params: {
            activated_filter_value: true,
          },
        });
        this.totalActiveUserCount = response.data.total_user;
        this.rolesActive = response.data.users;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getRolesInActiveMethod() {
      if (this.rolesInActive?.length === 0) {
        return;
      }
      this.isLoading = true;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/find_active_inactive_users`, {
          headers: {
            Authorization: "bearer " + token,
          },
          params: {
            activated_filter_value: false,
          },
        });
        this.totalInActiveUserCount = response.data.total_user || [];
        this.rolesInActive = response.data.users || [];
      } catch (error) {
        // console.log(error.response.status);
        if (error.response && error.response.status === 404) {
          this.totalInActiveUserCount = 0;
          this.rolesInActive = [];
          this.errorMessage = "No inactive users found.";
        } else {
          this.errorMessage = "An error occurred while fetching data.";
        }
      } finally {
        this.isLoading = false;
      }
    },
    async updateUserActivation(id, isActive) {
      if (isActive) {
        isActive;
      }
      this.confirmMessage = isActive
        ? "Are you sure you want to activate this user?"
        : "Are you sure you want to deactivate this user?";
      this.isModalVisible = true;

      this.confirmCallback = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.put(
            `${VITE_API_URL}/update_activated_status/${id}`,
            { activated_value: isActive },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.getRolesActiveMethod();
          this.getRolesInActiveMethod();
          // if (isActive) {
          //   this.getRolesActiveMethod();
          // } else {
          //   this.getRolesInActiveMethod();
          // }

          // Show success message
          const message = isActive
            ? "Privilege User Activated successfully"
            : "Privilege User Deactivated successfully";
          this.$refs.successAlert.showSuccess(message);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              alert("User not found.");
            } else if (error.response.status === 422) {
              Swal.fire({
                icon: "warning",
                title: "Validation Error",
                text: error.response.data.message,
              });
            }
          }
        }
        this.isModalVisible = false;
      };
    },

    async rolesDeleteMethod(id) {
      this.confirmMessage = "Are you sure you want to delete this role?";
      this.isModalVisible = true;

      this.confirmCallback = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.delete(`${VITE_API_URL}/merchants/${id}`, {
            headers: {
              Authorization: "bearer " + token,
            },
          });

          if (response.status === 200) {
            const message =
              response.data.message || "Privilege User Deleted successfully";
            this.$refs.successAlert.showSuccess(message);
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              Swal.fire({
                icon: "error",
                title: "Not Found",
                text: "Please try Again.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response.data.message || "Please try Again.",
                confirmButtonText: "OK",
              });
            }
          }
        } finally {
          this.isModalVisible = false;
        }
      };
    },
  },
  mounted() {
    this.getRolesActiveMethod();
    this.getRolesInActiveMethod();
  },
};
</script>
<style scoped>
#main {
  padding-top: 65px;
}
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
}
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #ff5722;
}
.clr {
  color: #ff5722;
}
ul.generalsetting li i.rounded-circle {
  background: #fff4de;
  width: 48px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ff5722;
}
.nav-pills .nav-link {
  color: #464444;
}
.cursor-pointer {
  cursor: pointer;
}
ul.generalsetting li a .job p {
  font-size: 12px;
}
ul.generalsetting li a .job p,
ul.generalsetting li a .job h6 {
  color: #000;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
ul.generalsetting li a {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px;
}
a.router-link-active {
  background-color: #fff4de;
}
ul.generalsetting li i.rounded-circle a.router-link-active:active {
  border-top-left-radius: 22px !important;
  border-bottom-left-radius: 22px !important;
}
a.router-link-active {
  color: #ff5722;
}
.genSetting {
  color: #ff5722;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid grey;
}

a.router-link-active::after {
  content: "\F285";
  font-family: "bootstrap-icons";
  display: flex;
  align-items: center;
  color: #ff5722;
}
ul.generalsetting h6 {
  font-size: 14px;
}

.heading p.gs {
  transform: translateX(18px);
}

.pagesetting {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #ff5722;
}
.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #ff5722;
}
table thead th {
  background-color: #f9944b !important;
}
table {
  border-collapse: separate;
}
.pagesetting[data-v-6f1f6d9a] {
  border-bottom: 1px solid rgb(196, 196, 196);
  width: 100%;
}
.table th,
.table td {
  text-align: center;
  width: 11.2857%;
}
.table td:last-child {
  width: 16% !important;
}
.table th:last-child {
  width: 16% !important;
}
</style>
