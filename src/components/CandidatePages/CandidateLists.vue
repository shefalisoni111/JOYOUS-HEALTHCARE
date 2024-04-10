<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle bg-define d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                /

                <span class="color-fonts">{{ activeTabName }} Staff</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid p-0" style="background-color: #fdce5e17">
      <div class="row">
        <div class="">
          <div class="d-flex gap-2 justify-content-between bg-define">
            <ul class="nav nav-pills my-3 p-2" role="tablist">
              <li class="nav-item d-inline-flex gap-2" role="presentation">
                <button
                  class="nav-link text-nowrap"
                  :class="{ active: activeTab === index }"
                  :to="`/${tab.routeName}`"
                  aria-selected="true"
                  type="button"
                  role="tab"
                  data-bs-toggle="pill"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="selectTab(index)"
                >
                  {{ tab.name }}
                </button>
              </li>
            </ul>
            <div class="d-flex align-items-center p-2">
              <div class="d-flex align-items-center gap-2">
                <div class="form-inline my-2 my-lg-0">
                  <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search..."
                      aria-label="Search"
                      v-model="searchQuery"
                      @input="debounceSearch"
                    />
                  </form>
                </div>

                <div>
                  <button
                    v-if="activeTab === 0"
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#addCandidate"
                    data-bs-whatever="@mdo"
                  >
                    <i class="bi bi-person-plus-fill"></i>
                    Add Staff
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!searchQuery">
            <component :is="activeComponent"></component>
          </div>

          <div v-if="searchQuery">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Positions</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Status</th>
                  <th scope="col" v-if="activeTab === 0 || activeTab === 1">Assign</th>

                  <th scope="col">Last Login</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody v-if="searchResults?.length > 0">
                <tr v-for="data in searchResults" :key="data.id">
                  <td>{{ data.id }}</td>
                  <td>
                    <router-link
                      class="text-capitalize fw-bold"
                      :to="{
                        name: 'Profile',
                        params: { id: data.id },
                      }"
                    >
                      {{ data.first_name }}&nbsp; {{ data.last_name }}
                    </router-link>
                  </td>
                  <td>{{ data.position }}</td>
                  <td>{{ data.email }}</td>
                  <td>{{ data.phone_number }}</td>
                  <td>
                    {{ data.status }}
                  </td>
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
                        },
                        {
                          'disabled-button':
                            data.status === 'pending' ||
                            data.status === 'rejected' ||
                            !data.activated,
                        },
                      ]"
                      data-bs-toggle="modal"
                      data-bs-target="#assignDirectVacancy"
                      data-bs-whatever="@mdo"
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
                      type="button"
                      class="btn btn-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Tooltip on top"
                      v-on:click="activeCandidateMethod(data.id)"
                    >
                      Re-Activate
                    </button>
                    &nbsp;&nbsp;
                    <button
                      v-if="activeTab === 1"
                      type="button"
                      class="btn btn-danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Tooltip on top"
                      v-on:click="deleteCandidate(data.id)"
                    >
                      In-Activate
                    </button>
                    &nbsp;&nbsp;
                    <button
                      v-if="activeTab === 3"
                      type="button"
                      class="btn btn-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Tooltip on top"
                      v-on:click="approvedCandidate(data.id)"
                    >
                      Approve</button
                    >&nbsp;&nbsp;
                    <router-link
                      class="btn btn-outline-success text-nowrap"
                      :to="{
                        name: 'Profile',
                        params: { id: data.id },
                      }"
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
    </div>

    <CandidateAdd @addCandidate="getActiveCAndidateMethod" />
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
          name: "All ",
          component: "AllCandidateListsDisplay",
          routeName: "AllCandidateListsDisplay",
        },
        { name: "Active ", component: "ActiveCandidate", routeName: "ActiveCandidate" },
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
    // RejectCandidate,
    AllCandidateListsDisplay,
    AssignDirectVacancy,
  },

  methods: {
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
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/candidate/approve_candidate/${id}`
        );
        alert("Staff reactivated successfully!");
        this.pendingCandidateMethod();
      } catch (error) {
        // console.error("Error approving candidate:", error);
      }
    },

    async getCandidate() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/approve_and_notactivated_candidates`
        );

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
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      const response = await axios
        .put(`${VITE_API_URL}/re_activate_candidate/${id}`)
        .then((response) => {
          alert("Staff reactivated successfully!");
          this.getCandidate();
        })

        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
    openAssigned(id) {
      this.$store.commit("setSelectedAssignedItemId", id);
    },
    updateSelectedIds(candidate) {
      this.$store.commit("setSelectedCandidateId", candidate.id);
      this.$store.commit("setSelectedJobId", candidate.job_id);
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
        this.searchByStatus();
      }, 100);
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },
    deleteCandidate(id) {
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      axios
        .put(`${VITE_API_URL}/inactivate_candidate/${id}`)
        .then((response) => {
          alert("Staff In-activated successfully!");
          // this.inactiveCandidateData = response.data;
          this.getCandidateMethods();
        })
        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        let activatedStatus = null;

        if (this.activeTab === 1) {
          activatedStatus = true;
        } else if (this.activeTab === 2) {
          activatedStatus = false;
        } else if (this.activeTab === 3 || this.activeTab === 4) {
          await this.searchByStatus();
          return;
        } else if (this.activeTab === 0) {
          const response = await axiosInstance.get(
            `${VITE_API_URL}/search_candidate/${this.searchQuery}`
          );

          this.searchResults = response.data.candidate;
        } else {
          activatedStatus = this.activeTab === 1 ? true : false;
        }

        const response = await axiosInstance.get(
          `${VITE_API_URL}/candidate_searching_active_and_inactive`,
          {
            params: {
              candidate_query: this.searchQuery,
              activated: activatedStatus,
              tab: this.activeTabName.toLowerCase(),
            },
          }
        );

        this.searchResults = response.data;
        consols.log(this.searchResults);
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No candidates found for the specified criteria";
        }
      }
    },

    async searchByStatus() {
      try {
        this.searchResults = [];
        let activatedStatus = null;

        if (this.activeTab === 3) {
          activatedStatus = "pending";
        } else if (this.activeTab === 4) {
          activatedStatus = "rejected";
        }

        const response = await axiosInstance.get(
          `${VITE_API_URL}/candidate_searching_according_to_status`,
          {
            params: {
              candidate_query: this.searchQuery,
              status: activatedStatus,
              tab: this.activeTabName.toLowerCase(),
            },
          }
        );

        this.searchResults = response.data;

        this.errorMessage = response.message;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No candidates found for the specified criteria";
        }
      }
    },
    async getActiveCAndidateMethod() {
      await axios
        .get(`${VITE_API_URL}/approve_and_activated_candidates`)
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

  mounted() {
    this.getActiveCAndidateMethod();
    // this.getCandidateMethods();
    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
    this.getCandidateMethods();
    this.getCandidate();
    this.pendingCandidateMethod();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex((tab) => tab.routeName === to.name);

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex((tab) => tab.routeName === to.name);

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
  transition: all 0.3s;
  padding-top: 63px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}

.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.nav-pills .nav-link {
  border: 2px solid #444444;
  color: #6e7681;
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
  background-color: transparent;
  border: 2px solid green !important;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}

.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}

.btn-primary {
  border-radius: 4px;
}
table th {
  background-color: #ff5f30;
}
.badge {
  background: #ff572247;

  padding: 6px 10px;
}
a:link {
  color: black;
  text-decoration: none;
}
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #ff5722 !important;
  border-radius: 22px;
  color: #ff5722;
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
  font-family: Verdana, sans-serif;
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
