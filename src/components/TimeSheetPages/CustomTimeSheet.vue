<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">Custom TimeSheet</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
                        <!-- <select
                          class="form-control"
                          v-model="currentView"
                          @change="updateDateRange"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select> -->
                      </div>

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center">
                        <span
                          v-if="currentView === 'weekly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{
                            "Monday " +
                            formatDate(startDate) +
                            " to Sunday " +
                            formatDate(endDate)
                          }}
                        </span>
                        <span
                          v-else-if="currentView === 'monthly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                        </span>
                      </div>
                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center fs-4">
                        <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                        <i class="bi bi-calendar2-check-fill"></i>
                        <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                      <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search.."
                          aria-label="Search"
                          v-model="searchQuery"
                          @input="debounceSearch"
                        />
                      </form>
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        @click="toggleFilters"
                      >
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
                  <div>
                    <div v-for="(day, index) in getMonthDates" :key="index"></div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
                  <div class="d-flex gap-2">
                    <div></div>

                    <select v-model="business_unit_value" id="selectBusinessUnit">
                      <option value="">All Site</option>
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.name"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>

                    <select v-model="selectedCandidate" id="selectCandidateList">
                      <option value="">All Staff</option>
                      <option
                        v-for="option in candidateLists"
                        :key="option.id"
                        :value="`${option.first_name} ${option.last_name}`"
                      >
                        {{ option.first_name }} {{ option.last_name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="tab-content mt-4" id="pills-tabContent" v-if="!searchQuery">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="col-12 wrapper-timeSheet">
                      <table class="table candidateTable">
                        <thead>
                          <tr>
                            <th>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Code</th>
                            <th scope="col" style="width: 200px">Name</th>
                            <th scope="col">Site</th>
                            <th scope="col">Job</th>
                            <th scope="col">Shift Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Total Hours</th>
                            <th scope="col">Client Rate</th>
                            <th scope="col">Total Cost</th>
                            <th scope="col">Paper TimeSheet</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="paginateCandidates?.length > 0">
                          <tr v-for="data in paginateCandidates" :key="data.id">
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </td>
                            <td scope="col">{{ data.id }}</td>
                            <td scope="col">{{ data.code }}</td>
                            <td scope="col">{{ data.name }}</td>
                            <td scope="col">{{ data.site }}</td>
                            <td scope="col">{{ data.job }}</td>
                            <td scope="col">{{ data.shift_date }}</td>
                            <td scope="col">
                              {{ data.start_time ? data.start_time : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.end_time ? data.end_time : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.total_hours ? data.total_hours : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.client_rate ? data.client_rate : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.total_cost ? data.total_cost : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.paper_timesheet ? data.paper_timesheet : "null" }}
                            </td>
                            <td scope="col">
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#editCustomTimeSheet"
                                data-bs-whatever="@mdo"
                                @click="openEditModal(data.id)"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="14" class="text-danger text-center">
                              {{ errorMessageCustom }}
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
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
                <div class="tab-content mt-4" id="pills-tabContent" v-if="searchQuery">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="col-12 wrapper-timeSheet">
                      <table class="table candidateTable">
                        <thead>
                          <tr>
                            <th>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Code</th>
                            <th scope="col" style="width: 200px">Name</th>
                            <th scope="col">Site</th>
                            <th scope="col">Job</th>
                            <th scope="col">Shift Date</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Total Hours</th>
                            <th scope="col">Client Rate</th>
                            <th scope="col">Total Cost</th>
                            <th scope="col">Paper TimeSheet</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="paginateSearchResults?.length > 0">
                          <tr v-for="data in paginateSearchResults" :key="data.id">
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </td>
                            <td scope="col">{{ data.id }}</td>
                            <td scope="col">{{ data.code }}</td>
                            <td scope="col">{{ data.name }}</td>
                            <td scope="col">{{ data.site }}</td>
                            <td scope="col">{{ data.job }}</td>
                            <td scope="col">{{ data.shift_date }}</td>
                            <td scope="col">
                              {{ data.start_time ? data.start_time : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.end_time ? data.end_time : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.total_hours ? data.total_hours : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.client_rate ? data.client_rate : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.total_cost ? data.total_cost : "null" }}
                            </td>
                            <td scope="col">
                              {{ data.paper_timesheet ? data.paper_timesheet : "null" }}
                            </td>
                            <td scope="col">
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#editCustomTimeSheet"
                                data-bs-whatever="@mdo"
                                @click="openEditModal(data.id)"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="14" class="text-danger text-center">
                              {{ errorMessage }}
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
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mx-3 mb-2"
        style="text-align: right"
        v-if="getCustomTimeSheet.length >= 8 && !searchResults.length"
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
          :disabled="currentPage * itemsPerPage >= getCustomTimeSheet.length"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
      <div class="mx-3 mb-2" style="text-align: right" v-if="searchResults.length >= 8">
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
      </div>
    </div>
    <CustomeTimeSheetEdit
      :customDataId="selectedCustomTimesheetId"
      @CustomTimeSheetData-updated="getCustomSheetMethod"
    />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import CustomeTimeSheetEdit from "../modals/TimeSheet/CustomeTimeSheetEdit.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      currentView: "monthly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      getCustomTimeSheet: [],
      currentPage: 1,
      itemsPerPage: 10,
      selectedCustomTimesheetId: null,
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      showFilters: false,
      errorMessageCustom: "",
      site_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      selectedCandidate: "",
      business_unit_value: "",
    };
  },
  components: { Navbar, CustomeTimeSheetEdit },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getCustomTimeSheet.slice(startIndex, endIndex);
    },
    paginateSearchResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    getWeekDates() {
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },

    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },

    selectCandidateList() {
      const candidate = this.candidateLists.find((option) => option.id === this.id);
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
  },
  watch: {
    selectedCandidate(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("candidate", newValue);
      } else {
      }
    },

    business_unit_value(newValue) {
      if (newValue !== "") {
        this.makeFilterAPICall("business_unit", newValue);
      } else {
      }
    },
  },

  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        const response = await axiosInstance.get(
          `${VITE_API_URL}/custom_timesheet_searching/${modifiedSearchQuery}`
        );

        this.searchResults = response.data.custom_sheets;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    async getCandidateListMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);
        this.candidateLists = response.data.data;
        this.candidateStatus = response.data.data.status;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },

    openEditModal(customDataId) {
      this.selectedCustomTimesheetId = customDataId;
    },

    updateDateRange() {
      const currentDate = new Date();
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay());
        this.startDate = weekStart;
        this.endDate = new Date(weekStart);
        this.endDate.setDate(this.endDate.getDate() + 6);
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }
      // Save the values to localStorage
      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.createVacancy();
    //     });
    //   // alert("Record Deleted ");
    // },
    // async getCustomSheetMethod() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get(`${VITE_API_URL}/custom_timesheets`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => (this.getCustomTimeSheet = response.data.custom_sheets));
    // },
    filterData() {
      let filterType = "";
      let filterValue = "";

      if (this.business_unit_value !== "") {
        filterType = "business_unit";
        filterValue = this.business_unit_value;
      } else if (this.selectedCandidate !== "") {
        filterType = "candidate";
        filterValue = this.selectedCandidate;
      }

      this.makeFilterAPICall(filterType, filterValue);
    },
    async makeFilterAPICall(filterType, filterValue) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/filter_custom_timesheet`, {
          params: {
            filter_type: filterType,
            filter_value: filterValue,
          },
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.getCustomTimeSheet = response.data.custom_timesheets;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            alert("No records found for the given filter");
          } else {
            alert(errorMessages);
          }
        } else {
          // Handle other errors
          // console.error("Error filtering custom timesheets:", error);
        }
      }
    },
    async getCustomSheetMethod() {
      const token = localStorage.getItem("token");
      const startOfMonth = new Date(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        this.endDate.getFullYear(),
        this.endDate.getMonth() + 1,
        0
      );
      const requestData = {
        date: startOfMonth.toLocaleDateString(),
        // end_date: endOfMonth.toLocaleDateString(),
      };
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_custom_timesheet_according_mounth`,
          {
            params: requestData,
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        this.getCustomTimeSheet = response.data.custom_timesheets;
        if (this.getCustomTimeSheet.length === 0) {
          this.errorMessageCustom = "No Custom timesheets found for the specified month";
        } else {
          this.errorMessageCustom = "";
        }
      } catch (error) {
        console.error("Error fetching custom timesheets:", error);
      }
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
        this.getCustomSheetMethod();
      }
    },
    moveToNext() {
      if (this.currentView === "weekly") {
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
        this.getCustomSheetMethod();
      }
    },
  },

  mounted() {
    this.currentView = "monthly";
    this.updateDateRange();
    this.getCustomSheetMethod();
    this.getBusinessUnitMethod();

    this.getCandidateListMethod();
    // this.loadDateRangeFromLocalStorage();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  padding-top: 65px;
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
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
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
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}

@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .wrapper-timeSheet {
    overflow-x: scroll;
  }
}
</style>
