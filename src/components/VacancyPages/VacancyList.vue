<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <!-- <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Vacancies</span>
              </li>
            </ol>
          </div>
        </div> -->
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                /

                <span class="color-fonts">{{ activeTabName }} Shifts</span>
              </li>
            </ol>
          </div>
        </div>
        <!-- <div class="container-fluid p-0 bg-define">
          <div
            class="pagetitle d-flex justify-content-between align-items-center p-2"
          >
            <div class="d-flex justify-content-around gap-2">
              <select class="form-select" aria-label="Default select example ">
                <option selected>Custom</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div></div>

            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-2"></div>
            </div>
          </div>
        </div> -->

        <div class="container-fluid mt-3">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <ul
                    class="nav nav-pills mb-3 d-flex justify-content-between mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <div>
                      <li class="nav-item d-flex gap-2" role="presentation">
                        <button
                          class="nav-link"
                          :class="{ active: activeTab === index }"
                          aria-selected="true"
                          type="button"
                          role="tab"
                          v-for="(tab, index) in tabs"
                          :key="index"
                          @click="selectTab(index)"
                        >
                          {{ tab.name }}
                        </button>
                      </li>
                    </div>

                    <div class="d-flex gap-2">
                      <div>
                        <form @submit.prevent="search">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search by Name"
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form>
                      </div>
                      <div>
                        <button
                          v-if="activeTab === 0 || activeTab === 1"
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#addVacancies"
                          data-bs-whatever="@mdo"
                        >
                          + Add Shift
                        </button>
                      </div>
                    </div>
                  </ul>
                  <div v-if="!searchQuery">
                    <component :is="activeComponent"></component>
                  </div>

                  <div v-if="searchQuery">
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">#RefCode</th>
                          <th scope="col">Vendor</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Shift</th>
                          <th scope="col" class="withShow">Staff Required</th>
                          <th scope="col">Notes</th>
                          <th scope="col">Publish</th>
                          <th scope="col" class="text-center">All</th>
                          <th scope="col">Applied</th>
                          <th scope="col">Assigned</th>
                          <th scope="col">Rejected</th>
                          <th scope="col">Created by</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginatedVacancies?.length > 0">
                        <tr v-for="data in paginatedVacancies" :key="data.id">
                          <td v-text="data.id"></td>
                          <td v-text="data.ref_code"></td>
                          <td>
                            <router-link
                              class="text-capitalize text-black text-decoration-underline fw-bold"
                              :to="{
                                name: 'SingleClientProfile',
                                params: { id: data.client_id },
                              }"
                            >
                              {{ data.client }}
                            </router-link>
                          </td>
                          <td v-text="data.business_unit"></td>
                          <td v-text="data.job_title"></td>

                          <td class="widthDefine">
                            <span v-for="(date, index) in data.dates" :key="index">
                              {{ date }}

                              <template v-if="index !== data.dates.length - 1"
                                >,
                              </template>
                            </span>
                          </td>

                          <td v-text="data.shift"></td>
                          <td class="withShow text-center">
                            {{ data.staff_required === null ? 0 : data.staff_required }}
                          </td>
                          <td v-text="data.notes"></td>

                          <td>
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#publishVacancy"
                              data-bs-whatever="@mdo"
                              v-if="data.publish === 'true'"
                              class="btn btn-success bi bi-check-circle-fill"
                              :class="{
                                'btn-success': data.publish === 'true',
                                'bi-check-circle-fill': data.publish === 'true',
                                'bi-bell': data.publish !== 'true',
                              }"
                              @click="openPublished(data.id)"
                            ></i>
                            <i
                              data-bs-toggle="modal"
                              data-bs-target="#publishVacancy"
                              data-bs-whatever="@mdo"
                              @click="openPublished(data.id)"
                              v-else
                              class="btn btn-success bi bi-bell"
                            ></i>
                          </td>

                          <td class="text-center">
                            <button
                              type="button"
                              class="btn text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#allCandidateVacancyList"
                              data-bs-whatever="@mdo"
                              @click="openAllApplied(data.id)"
                            >
                              <span class="rounded-circle">{{ data.all_candidate }}</span>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#appliedVacancy"
                              data-bs-whatever="@mdo"
                              @click="openPopup(data.id)"
                            >
                              <span class="rounded-circle">{{ data.applied }}</span>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#assignedVacancyList"
                              data-bs-whatever="@mdo"
                              @click="openAssigned(data.id)"
                            >
                              <span class="rounded-circle">{{ data.assigned }}</span>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#rejectedVacancyList"
                              data-bs-whatever="@mdo"
                              @click="openRejected(data.id)"
                            >
                              <span class="rounded-circle">{{ data.rejected }}</span>
                            </button>
                          </td>
                          <td v-text="data.create_by_and_time.split(' ')[0]"></td>

                          <td class="cursor-pointer">
                            <i
                              class="bi bi-pencil-square btn btn-outline-success text-nowrap text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#editVacancy"
                              data-bs-whatever="@mdo"
                              @click="editVacancyId(data.id)"
                            ></i>
                            &nbsp;&nbsp;
                            <button
                              class="btn btn-outline-danger text-nowrap"
                              v-on:click="vacancyDeleteMethod(data.id)"
                            >
                              In-Active
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="15" class="text-danger text-center">
                            Not Match Found !!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="mt-3"
      style="text-align: right"
      v-if="searchResults && searchResults?.length > 8"
    >
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= searchResults.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div> -->
    <EditVacancy
      :vacancyId="selectedVacancyId || 0"
      @updateVacancy="searchVacancyUpdated"
    />
    <PublishedVacancy @publishVacancySearch="searchVacancyUpdated" />
    <AppliedVacancyList @appliedVacancySearch="searchVacancyUpdated" />
    <AssignedVacancyList @updateAssignSearch="searchVacancyUpdated" />
    <RejectedVacancyList @rejectVacancySearch="searchVacancyUpdated" />
    <AllVacancyCandidateList @allVacancySearch="searchVacancyUpdated" />
  </div>
</template>
<script>
import axios from "axios";
import AllVacancyList from "../VacancyPages/AllVacancyList.vue";
import InActiveVacancyList from "../VacancyPages/InActiveVacancyList.vue";
import AllVacancyDisplay from "../VacancyPages/AllVacancyDisplay.vue";
import EditVacancy from "../modals/Vacancy/EditVacancy.vue";
import PublishedVacancy from "../modals/Vacancy/PublishedVacancy.vue";
import AppliedVacancyList from "../modals/Vacancy/AppliedVacancyList.vue";
import AssignedVacancyList from "../modals/Vacancy/AssignedVacancyList.vue";
import RejectedVacancyList from "../modals/Vacancy/RejectedVacancyList.vue";
import AllVacancyCandidateList from "../modals/Vacancy/AllVacancyCandidateList.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      vacancyCount: 0,
      selectedVacancyId: 0,
      searchQuery: null,
      debounceTimeout: null,
      getVacancyDetail: [],
      searchResults: [],
      allVacancyCount: [],
      errorMessage: "",
      tabs: [
        { name: "All", component: "AllVacancyDisplay" },
        { name: "Active ", component: "AllVacancyList" },
        { name: "In-Active ", component: "InActiveVacancyList" },
      ],
      activeTab: 0,
      activeTabName: "",
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    paginatedVacancies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginatedVacancies.length;
    },
  },
  components: {
    AllVacancyList,
    InActiveVacancyList,
    AllVacancyDisplay,
    EditVacancy,
    PublishedVacancy,
    AppliedVacancyList,
    AssignedVacancyList,
    RejectedVacancyList,
    AllVacancyCandidateList,
  },

  methods: {
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      // this.$router.push({ name: this.tabs[index].routeName });
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    // search api start

    async search() {
      try {
        const token = localStorage.getItem("token");
        this.searchResults = [];
        let activatedStatus = null;
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");

        if (this.activeTab === 1) {
          activatedStatus = true;
        } else if (this.activeTab === 2) {
          activatedStatus = false;
        } else if (this.activeTab === 0) {
          const response = await axiosInstance.get(
            `${VITE_API_URL}/serching_vacancies/${modifiedSearchQuery}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          this.searchResults = response.data.vacancy;
          return;
        } else {
          activatedStatus = this.activeTab === 1 ? true : false;
        }
        const response = await axiosInstance.get(
          `${VITE_API_URL}/searching_active_inactive_vacancies`,
          {
            params: {
              vacancy_query: modifiedSearchQuery,
              active_status: activatedStatus,
              tab: this.activeTabName.toLowerCase(),
            },
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.searchResults = response.data.vacancy;
      } catch (error) {
        if (
          (error.response && error.response.status === 400) ||
          error.response.status === 404
        ) {
          this.errorMessage = "No vacancy found for the specified criteria";
        }
      }
    },
    updateVacancyInList(updatedVacancy) {
      const index = this.getVacancyDetail.findIndex(
        (vacancy) => vacancy.id === updatedVacancy.id
      );

      if (index !== -1) {
        this.$set(this.getVacancyDetail, index, updatedVacancy);
      }
    },
    openPopup(id) {
      this.$store.commit("setSelectedAppliedItemId", id);
    },
    openAssigned(id) {
      this.$store.commit("setSelectedAssignedItemId", id);
    },
    openRejected(id) {
      this.$store.commit("setSelectedRejectItemId", id);
    },
    async openAllApplied(id) {
      this.$store.commit("setSelectedAllItemId", id);
      const vacancyId = this.$store.state.vacancy_id;
    },
    openPublished(id) {
      this.$store.commit("setSelectedPublishedItemId", id);
    },
    async vacancyInactiveMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");

      const isInactive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === false
      );

      if (isInactive) {
        alert("Vacancy already Inactive");
        return;
      }
      await axios
        .put(`${VITE_API_URL}/inactive_vacancy/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.searchVacancyUpdated();
        });
      alert("InActive Vacancy");
    },
    async vacancyActiveMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      const isActive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === true
      );

      if (isActive) {
        alert("Vacancy already active");
        return;
      }

      await axios
        .put(`${VITE_API_URL}/active_vacancy/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.searchVacancyUpdated();
        });
      alert("Active Vacancy");
    },
    reActivatedMethod(id) {
      if (!window.confirm("Are you sure you want to re-activate?")) {
        return;
      }
      axios
        .put(`${VITE_API_URL}/active_vacancy/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;
          this.getInactiveVacancyMethod();
          alert("Successful Reactivate");
        })
        .catch((error) => {
          // console.error("Error reactivating vacancy:", error);
        });
    },
    async searchVacancyUpdated() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.vacancyCount = response.data.data;
        this.searchResults = response.data.data;
        let appliedCount = 0;
        let assignedCount = 0;
        let rejectedCount = 0;
        let allCandidatesCount = 0;

        // Calculate counts
        searchResults.forEach((vacancy) => {
          appliedCount += vacancy.applied;
          assignedCount += vacancy.assigned;
          rejectedCount += vacancy.rejected;
          allCandidatesCount += vacancy.all_candidate;
        });

        // Update counts
        this.appliedCount = appliedCount;
        this.assignedCount = assignedCount;
        this.rejectedCount = rejectedCount;
        this.allCandidatesCount = allCandidatesCount;
      } catch (error) {
        // console.error("Error fetching vacancy count:", error);
      }
    },
  },

  mounted() {
    this.setActiveTabNameOnLoad();
  },
  async created() {
    await this.searchVacancyUpdated();
  },
  beforeRouteUpdate(to, from, next) {
    this.setActiveTabFromRoute();

    this.setActiveTabNameOnLoad();
    next();
  },
};
</script>

<style scoped>
.withShow {
  width: 5%;
}
#main {
  transition: all 0.3s;
  padding-top: 63px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.table.candidateTable td.widthDefine {
  white-space: pre-wrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-check-input {
  border: 2px solid grey;
}

.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}

table th {
  background-color: #ff5f30;
}
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #ff5722;
  border-radius: 22px;
  color: #ff5722;
}
button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
