<template>
  <div>
    <div id="main" class="main bg-light">
      <!-- Sidebar / Navbar -->
      <!-- <Navbar /> -->

      <!-- Main content wrapper -->
      <div class="row p-5">
        <!-- Page Title & Add Staff Button -->
        <div class="row align-items-center mb-4">
          <div class="col-md-6">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >All Staff</a
                >
                <p>
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/staff-list"
                    >All Staff</router-link
                  >
                  / Staff Availability
                </p>
              </li>
            </ol>
          </div>
          <div class="col-md-6 text-end">
            <button
              v-if="activeTab === 0"
              type="button"
              class="btn btn-lg text-white btn-bg-color"
              data-bs-toggle="modal"
              data-bs-target="#addCandidate"
              @click="handleCandidateAdded"
            >
              <i class="bi bi-person-plus-fill"></i> Add Staff
            </button>
          </div>
        </div>

        <!-- Tabs and Search -->
        <div
          class="d-flex flex-wrap justify-content-between align-items-center bg-define py-2 mb-4 rounded"
        >
          <ul class="nav nav-pills" role="tablist">
            <li
              class="nav-item"
              role="presentation"
              v-for="(tab, index) in tabs"
              :key="index"
            >
              <button
                class="nav-link text-nowrap me-2"
                :class="{ active: activeTab === index }"
                type="button"
                role="tab"
                data-bs-toggle="pill"
                @click="selectTab(index)"
              >
                {{ tab.name }}
              </button>
            </li>
          </ul>

          <form
            @submit.prevent="search"
            class="d-flex align-items-center position-relative"
          >
            <input
              class="form-control form-control-lg"
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
        </div>

        <!-- Dynamic Component or Search Results -->
        <div v-if="!searchQuery">
          <component :is="activeComponent" />
        </div>

        <div v-else>
          <table class="table candidateTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Positions</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th v-if="activeTab === 0 || activeTab === 1">Assign</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="searchResults?.length > 0">
              <tr v-for="data in searchResults" :key="data.id">
                <td>{{ data.id }}</td>
                <td>
                  <router-link
                    class="text-capitalize fw-bold"
                    :to="{ name: 'Profile', params: { id: data.id } }"
                  >
                    {{ data.first_name }} {{ data.last_name }}
                  </router-link>
                </td>
                <td>{{ data.position }}</td>
                <td>{{ data.email }}</td>
                <td>{{ data.phone_number }}</td>
                <td>{{ data.status }}</td>
                <td v-if="activeTab === 0 || activeTab === 1">
                  <button
                    class="btn"
                    :class="[
                      'btn-outline-success',
                      {
                        'btn-outline-danger':
                          data.status === 'pending' ||
                          data.status === 'rejected' ||
                          !data.activated,
                        'disabled-button':
                          data.status === 'pending' ||
                          data.status === 'rejected' ||
                          !data.activated,
                      },
                    ]"
                    data-bs-toggle="modal"
                    data-bs-target="#assignDirectVacancy"
                    @click="updateSelectedIds(data)"
                    :disabled="
                      data.status === 'pending' ||
                      data.status === 'rejected' ||
                      !data.activated
                    "
                  >
                    <i class="bi bi-person-circle"></i>
                  </button>
                </td>
                <td>{{ data.last_login }}</td>
                <td>
                  <button
                    v-if="activeTab === 2"
                    class="btn btn-success"
                    @click="activeCandidateMethod(data.id)"
                  >
                    Re-Activate
                  </button>
                  <button
                    v-if="activeTab === 1"
                    class="btn btn-danger"
                    @click="deleteCandidate(data.id)"
                  >
                    In-Activate
                  </button>
                  <button
                    v-if="activeTab === 3"
                    class="btn btn-success"
                    @click="approvedCandidate(data.id)"
                  >
                    Approve</button
                  >&nbsp;
                  <router-link
                    class="btn btn-outline-success"
                    :to="{ name: 'Profile', params: { id: data.id } }"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="9" class="text-danger text-center">
                  {{ errorMessage }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <!-- <CandidateAdd
      @addCandidate="getCandidateMethods"
      @addStaff="handleCandidateAdded"
      ref="addStaff"
    /> -->
    <AssignDirectVacancy
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    />
  </div>
</template>

<script>
import axios from "axios";
import CandidateAdd from "../modals/CandidatePage/CandidateAdd.vue";
import AllCandidateListsDisplay from "../CandidatePages/AllCandidateListsDisplay.vue";
import ActiveCandidate from "../CandidatePages/ActiveCandidate.vue";
import InActiveCandidate from "../CandidatePages/InActiveCandidate.vue";
import Rejected from "../CandidatePages/Rejected.vue";
import AssignDirectVacancy from "../modals/CandidatePage/AssignDirectVacancy.vue";
// import RejectCandidate from "../CandidatePages/RejectCandidate.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Navbar from "../Navbar.vue";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  name: "CandidatesList",
  data() {
    return {
      inactiveCandidateData: [],
      selectedCandidateId: null,
      activeCandidate: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      tabs: [
        {
          name: "All Staff",
          component: "AllCandidateListsDisplay",
          routeName: "AllCandidateListsDisplay",
        },
        {
          name: "Active ",
          component: "ActiveCandidate",
          routeName: "ActiveCandidate",
        },
        {
          name: "In-Active ",
          component: "InActiveCandidate",
          routeName: "InActiveCandidate",
        },
        { name: "Pending", component: "Rejected", routeName: "Rejected" },
        // { name: "Reject", component: "RejectCandidate", routeName: "RejectCandidate" },
      ],
      activeTab: 0,
      activeTabName: "",
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
  },
  components: {
    CandidateAdd,
    ActiveCandidate,
    InActiveCandidate,
    Rejected,
    Navbar,
    ConfirmationAlert,
    // RejectCandidate,
    AllCandidateListsDisplay,
    AssignDirectVacancy,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    // handleCandidateAdded() {
    //   this.$refs.addStaff.getPositionMethod();
    // },
    async pendingCandidateMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/pending_candidates`);

        // this.getPendingCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },

    async approvedCandidate(id) {
      this.confirmMessage = "Are you sure want to Approve this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        try {
          const response = await axios.put(
            `${VITE_API_URL}/candidate/approve_candidate/${id}`
          );
          // alert("Staff reactivated successfully!");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Staff reactivated successfully!",
          });
          this.pendingCandidateMethod();
        } catch (error) {
          // console.error("Error approving candidate:", error);
        }
        this.isModalVisible = false;
      };
    },

    async getCandidate() {
      this.isLoading = true;
      try {
        const params = {
          status_value: "approved",
          activated_value: "false",
        };
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params,
        });

        // this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async activeCandidateMethod(id) {
      this.confirmMessage = "Are you sure want to Re-activate this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const response = await axios
          .put(`${VITE_API_URL}/re_activate_candidate/${id}`)
          .then((response) => {
            // alert("Staff reactivated successfully!");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Staff reactivated successfully!",
            });
            this.getCandidate();
          })

          .catch((error) => {
            // console.error("Error deleting candidate:", error);
          });
        this.isModalVisible = false;
      };
    },
    openAssigned(id) {
      this.$store.commit("setSelectedAssignedItemId", id);
    },
    updateSelectedIds(candidate) {
      this.$store.commit("setSelectedCandidateId", candidate.id);
      this.$store.commit("setSelectedJobId", candidate.job_id);
    },
    canceled() {
      this.isModalVisible = false;
    },

    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
        //  this.searchByStatus();
      }, 100);
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    async selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;

      const componentName = this.tabs[index].component;
      if (!this.$options.components[componentName]) {
        this.$options.components[componentName] = (
          await import(`../CandidatePages/${componentName}.vue`)
        ).default;
      }

      this.$router.push({ name: this.tabs[index].routeName });
    },
    deleteCandidate(id) {
      this.confirmMessage = "Are you sure want to In-activate this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios
          .put(`${VITE_API_URL}/inactivate_candidate/${id}`)
          .then((response) => {
            // alert("Staff In-activated successfully!");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Staff reactivated successfully!",
            });

            this.getCandidateMethods();
          })
          .catch((error) => {
            // console.error("Error deleting candidate:", error);
          });
        this.isModalVisible = false;
      };
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];

        const response = await axiosInstance.get(
          `${VITE_API_URL}/search_candidate`,
          {
            params: {
              candidate_query: this.searchQuery,
            },
          }
        );

        if (
          response.status === 200 &&
          response.data.candidate.length === 0 &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        } else {
          this.searchResults = response.data.candidate;
          this.errorMessage = "";
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },

    // async searchByStatus() {
    //   try {
    //     this.searchResults = [];
    //     let activatedStatus = null;

    //     if (this.activeTab === 3) {
    //       activatedStatus = "pending";
    //     } else if (this.activeTab === 4) {
    //       activatedStatus = "rejected";
    //     }

    //     const response = await axiosInstance.get(
    //       `${VITE_API_URL}/candidate_searching_according_to_status`,
    //       {
    //         params: {
    //           candidate_query: this.searchQuery,
    //           status: activatedStatus,
    //           tab: this.activeTabName.toLowerCase(),
    //         },
    //       }
    //     );

    //     if (
    //       response.status === 200 &&
    //       response.data.length === 0 &&
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       this.errorMessage = "No Staff found for the specified criteria";
    //     } else {
    //       this.searchResults = response.data;
    //       this.errorMessage = "";
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.data && error.response.data.message) {
    //       this.errorMessage = error.response.data.message;
    //     } else {
    //       this.errorMessage = "No Staff found for the specified criteria";
    //     }
    //   }
    // },
    async getActiveCAndidateMethod() {
      const params = {
        status_value: "approved",
        activated_value: "true",
      };
      await axios
        .get(`${VITE_API_URL}/candidates`, { params })
        .then((response) => (this.activeCandidate = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        });
    },
    async getCandidateMethods() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },

  created() {
    // this.getActiveCAndidateMethod();
    // this.getCandidateMethods();
    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
    // this.getCandidateMethods();
    // this.getCandidate();
    // this.pendingCandidateMethod();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex(
        (tab) => tab.routeName === to.name
      );
      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex(
      (tab) => tab.routeName === to.name
    );
    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }
    next();
  },
};
</script>

<style scoped>
#main {
  background-color: #fff;
}
.main-content {
  transition: all 0.3s;
}
.btn-bg-color {
  background: rgb(82 115 45);
  color: rgb(255, 255, 255);
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}

.btn-primary {
  border: none;
  font-size: 13px;
  font-weight: 700;
}
a {
  color: black;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #000000 !important;
  width: 100;
  height: 37;
  color: #fff !important;
  border-radius: 13px;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
  border-bottom: none !important;
}
.nav-link,
.nav-link:hover,
.nav-link:focus {
  color: #667085;
}
.nav-pills {
  background: #fff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}

.btn-primary {
  border-radius: 4px;
}

.badge {
  background: #ff572247;

  padding: 6px 10px;
}
a:link {
  color: black;
  text-decoration: none;
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
.nav-pills {
  background: #fff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
}

.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
