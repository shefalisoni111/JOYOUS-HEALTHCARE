<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main" class="d-flex" style="background: #f8f8ff">
        <div
          style="
            background: #fff;

            border-radius: 20px;
          "
        >
          <Navbar />
        </div>
        <div class="container-fluid pt-3 px-5">
          <div class="row">
            <div
              class="d-flex justify-content-between col-11 col-md-11 col-xl-12 col-xxl-12"
            >
              <div class="py-3">
                <ol class="breadcrumb my-2">
                  <li class="breadcrumb-item active fs-6">
                    <a
                      class="nav-link d-inline fs-4 fw-bolder"
                      style="color: #000000; background: none"
                      >Shift</a
                    >

                    <!-- <span class="color-fonts">{{ activeTabName }} Shifts</span> -->
                  </li>
                </ol>
              </div>
              <div class="d-flex align-items-center">
                <button
                  v-if="activeTab === 0"
                  type="button"
                  class="btn btn-lg text-white"
                  style="background-color: #f9944b"
                  data-bs-toggle="modal"
                  data-bs-target="#addVacancies"
                  data-bs-whatever="@mdo"
                >
                  + Add Shift
                </button>
              </div>
            </div>
          </div>

          <div class="col-11 col-md-11 col-xl-12 col-xxl-12 pe-0">
            <ul
              class="nav nav-pills mb-3 d-flex justify-content-between mb-3 px-0"
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
              </div>
            </ul>
            <div v-if="!searchQuery">
              <component :is="activeComponent"></component>
            </div>

            <div v-if="searchQuery">
              <table class="table candidateTable">
                <thead>
                  <tr>
                    <th scope="col" style="width: 4%">ID</th>
                    <th scope="col" style="width: 6%">#RefCode</th>
                    <th scope="col" style="width: 4%">Vendor</th>
                    <th scope="col" style="width: 4%">Site</th>
                    <th scope="col" style="width: 4%">Job Title</th>
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
                <tbody v-if="paginationVacancySearch?.length > 0">
                  <tr v-for="data in paginationVacancySearch" :key="data.id">
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
                    <td v-text="data.site"></td>
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
                      {{
                        data.staff_required === null ? 0 : data.staff_required
                      }}
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
                        <span class="rounded-circle">{{
                          data.all_candidate
                        }}</span>
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
                    <td colspan="16" class="text-danger text-center">
                      No Match Found !!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="searchQuery && searchResults?.length > 8"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <EditVacancy
      :vacancyId="selectedVacancyId || 0"
      @updateVacancy="searchVacancyUpdated"
    />
    <PublishedVacancy @publishVacancySearch="searchVacancyUpdated" />
    <AppliedVacancyList @appliedVacancySearch="searchVacancyUpdated" />
    <AssignedVacancyList @updateAssignSearch="searchVacancyUpdated" />
    <RejectedVacancyList @rejectVacancySearch="searchVacancyUpdated" />
    <AllVacancyCandidateList @allVacancySearch="searchVacancyUpdated" />
    <!-- <AddVacancy @addVacancy="createVacancy" /> -->
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
import AddVacancy from "../modals/Vacancy/AddVacancy.vue";
import Swal from "sweetalert2";
import Navbar from "../Navbar.vue";
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
        { name: "All Shift", component: "AllVacancyDisplay" },
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
    paginationVacancySearch() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return (this.searchResults || []).slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginationVacancySearch.length;
    },
  },
  components: {
    AllVacancyList,
    InActiveVacancyList,
    AllVacancyDisplay,
    EditVacancy,
    Navbar,
    AddVacancy,
    PublishedVacancy,
    AppliedVacancyList,
    AssignedVacancyList,
    RejectedVacancyList,
    AllVacancyCandidateList,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    // handleShiftAdd() {
    //   this.$refs.addShiftRef.getClientMethod();
    // },
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    async changePage(page) {
      this.currentPage = page;
      await this.search();
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
    async createVacancy() {
      if (this.getVacancyDetail.length === 0) {
        const token = localStorage.getItem("token");
        this.isLoading = true;
        await axios
          .get(`${VITE_API_URL}/vacancies`, {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((response) => {
            this.getVacancyDetail = response.data.data;

            localStorage.setItem(
              "vacancies",
              JSON.stringify(this.getVacancyDetail)
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
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
      // if (!window.confirm("Are you Sure ?")) {
      //   return;
      // }
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to deactivate this vacancy?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate!",
        cancelButtonText: "No, cancel",
      });

      if (!confirmation.isConfirmed) {
        return;
      }
      const token = localStorage.getItem("token");

      const isInactive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === false
      );

      if (isInactive) {
        // alert("Vacancy already Inactive");
        Swal.fire({
          icon: "warning",
          title: "Vacancy Status",
          text: "Vacancy already Inactive",
          confirmButtonText: "OK",
        });
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
      // alert("InActive Vacancy");
      Swal.fire({
        icon: "success",
        title: "Vacancy Status",
        text: "Vacancy set to Inactive",
        confirmButtonText: "OK",
      });
    },
    async vacancyActiveMethod(id) {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to activate this vacancy?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, activate!",
        cancelButtonText: "No, cancel",
      });
      if (!confirmation.isConfirmed) {
        return;
      }
      const token = localStorage.getItem("token");
      const isActive = this.getVacancyDetail.find(
        (vacancy) => vacancy.id === id && vacancy.activated === true
      );

      if (isActive) {
        // alert("Vacancy already active");
        Swal.fire({
          icon: "warning",
          title: "Vacancy Status",
          text: "Vacancy already active",
          confirmButtonText: "OK",
        });
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
      // alert("Active Vacancy");
      Swal.fire({
        icon: "success",
        title: "Vacancy Status",
        text: "Vacancy set to Active",
        confirmButtonText: "OK",
      });
    },
    // setActiveTabFromRoute() {
    //   if (this.$route.params.tab) {
    //     const index = this.tabs.findIndex(
    //       (tab) => tab.name.toLowerCase() === this.$route.params.tab.toLowerCase()
    //     );
    //     if (index !== -1) {
    //       this.activeTab = index;
    //     }
    //   } else {
    //     this.activeTab = 0;
    //   }
    // },
    reActivatedMethod(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to re-activate this vacancy?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, re-activate!",
        cancelButtonText: "No, cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.put(
              `${VITE_API_URL}/active_vacancy/${id}`
            );

            this.inactiveCandidateData = response.data;
            this.getInactiveVacancyMethod();

            Swal.fire({
              icon: "success",
              title: "Vacancy Status",
              text: "Vacancy set to Active",
              confirmButtonText: "OK",
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:
                error.response?.data?.message ||
                "Failed to re-activate the vacancy.",
              confirmButtonText: "OK",
            });
          }
        }
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

        searchResults.forEach((vacancy) => {
          appliedCount += vacancy.applied;
          assignedCount += vacancy.assigned;
          rejectedCount += vacancy.rejected;
          allCandidatesCount += vacancy.all_candidate;
        });

        this.appliedCount = appliedCount;
        this.assignedCount = assignedCount;
        this.rejectedCount = rejectedCount;
        this.allCandidatesCount = allCandidatesCount;
      } catch (error) {
        // console.error("Error fetching vacancy count:", error);
      }
    },
  },

  created() {
    this.setActiveTabNameOnLoad();
    this.createVacancy();
  },
  // mounted() {
  //   this.createVacancy();
  // },

  beforeRouteUpdate(to, from, next) {
    // this.setActiveTabFromRoute();
    this.createVacancy();

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
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
ul.nav-pills .nav-item {
  background: #ffffff;
  padding: 5px 10px 5px 10px;
  border-radius: 50px;
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

.btn-primary {
  border-radius: 4px;
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
  background: #f8f8ff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
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
