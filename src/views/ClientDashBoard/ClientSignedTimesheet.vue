<template>
  <div>
    <ClientNavbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link
                class="nav-link d-inline"
                aria-current="page"
                to="/client/clientDashboard"
                >Dashboard</router-link
              >
              / <span class="color-fonts">Signed TimeSheet</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex justify-content-between">
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
                        <select
                          class="form-control"
                          v-model="currentView"
                          @change="updateDateRange"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
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

                    <div class="d-flex gap-3 align-items-center"></div>
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
                <div class="d-flex gap-2 mb-3 justify-content-between">
                  <div class="d-flex gap-2">
                    <div></div>

                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="fetchCandidateList"
                    >
                      <option value="">All Site</option>
                      <option
                        v-for="option in siteData"
                        :key="option.id"
                        :value="option.site_name"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>

                    <select
                      v-model="id"
                      @change="fetchCandidateList"
                      id="selectCandidateList"
                    >
                      <option value="">All Staff</option>
                      <option
                        v-for="option in StaffData"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select Staff"
                      >
                        {{ option.first_name + " " + option.last_name }}
                      </option>
                    </select>
                    &nbsp;&nbsp;

                    <button
                      :disabled="!isFilterSelected"
                      @click="resetFilters"
                      class="btn btn-secondary"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              <div class="tab-content mt-2" id="pills-tabContent">
                <div
                  class="tab-pane fade show active table-wrapper AllBooking"
                  id="pills-AllBooking"
                  role="tabpanel"
                  aria-labelledby="pills-AllBooking-tab"
                >
                  <table class="table bookingTable">
                    <thead>
                      <tr>
                        <th scope="col">Staff</th>
                        <th scope="col">Site</th>
                        <th scope="col">Job Title</th>
                        <th scope="col" style="width: 142px">Date</th>

                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Break</th>
                        <th scope="col">Total Hour</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Type</th>
                      </tr>
                    </thead>
                    <tbody v-if="candidateLists?.length > 0">
                      <tr v-for="data in candidateLists" :key="data.id">
                        <td scope="col">{{ data.candidate_name }}</td>
                        <td scope="col">{{ data.site_name }}</td>
                        <td scope="col">{{ data.job }}</td>
                        <td scope="col">
                          <div v-for="data in data.data" :key="data.id">
                            {{ data.date }}
                          </div>
                        </td>
                        <td scope="col">
                          <div v-for="data in data.data" :key="data.id">
                            {{ data.start_time }}
                          </div>
                        </td>
                        <td scope="col">
                          <div v-for="data in data.data" :key="data.id">
                            {{ data.end_time }}
                          </div>
                        </td>
                        <td scope="col"></td>
                        <td scope="col">
                          <div v-for="data in data.data" :key="data.id">
                            {{ data.total_hours }}
                          </div>
                        </td>
                        <td scope="col">
                          {{ data.total_week_cost }}
                        </td>
                        <td scope="col">
                          <div v-for="data in data.data" :key="data.id">
                            {{ data.sheet_type }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td
                          colspan="10"
                          class="text-danger text-center"
                          v-if="!isLoading"
                        >
                          {{ errorMessageCustom || "Data Not found!" }}
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
    <loader :isLoading="isLoading"></loader>

    <!-- <ShowDetailsMessage v-if="showModal" :message="alertMessage" @close="closeModal" /> -->
  </div>
</template>
<script>
import axios from "axios";
import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";
import Loader from "../../components/Loader/Loader.vue";
// import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
// import ConfirmationAlert from "../components/Alerts/ConfirmationAlert.vue";
// import ShowDetailsMessage from "../components/Alerts/ShowDetailsMessage.vue";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      getBookingData: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      deleteBookingDataPage: 1,
      currentPageSearch: 1,

      site_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      selectedCandidate: "",
      business_unit_value: "",

      debounceTimeout: null,

      errorMessageFilter: "",
      errorMessageCustom: "",
      job_id_value: "",
      job_id: "",
      siteData: [],
      StaffData: [],
      errorMessageBooking: [],
      isLoading: false,
      errorDelete: [],
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      showModal: false,
    };
  },
  components: {
    ClientNavbar,
    Loader,

    // ShowDetailsMessage,
  },
  computed: {
    isFilterSelected() {
      return this.id || this.site_id;
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
  },
  watch: {},
  methods: {
    async getSiteNameMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_sites`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.siteData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async getCandidateListMethod() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allStaffData = allStaffData.concat(response.data.data);
        });

        this.StaffData = allStaffData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
        } else {
        }
      }
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.fetchCandidateList();
      //   this.getDeleteBookingData();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.fetchCandidateList();
    },
    resetFilters() {
      this.site_id = "";
      this.id = "";

      this.fetchCandidateList();
    },
    async fetchCandidateList() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      const params = {
        page: 1,
      };

      if (this.site_id) {
        params["timesheet[site]"] = this.site_id;
      }
      if (this.id) {
        params["timesheet[id]"] = this.id;
      }

      const today = new Date();

      params["timesheet[date]"] = this.formatDates(this.startDate);

      params.range = this.currentView === "weekly" ? "week" : "month";

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_timesheets`,
          {
            params,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.candidateLists = response.data.weekly_timesheets || [];
        this.errorMessageFilter = "";
        if (response.status === 200 && this.candidateLists.length === 0) {
          this.errorMessageCustom = `Data Not available for this month`;
        } else {
          this.errorMessageCustom = "Data Not Found";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.candidateLists = [];
          this.errorMessageFilter = error.response.data.error || "Report Not Found!";
          Swal("Error", errorMessageFilter, "error");
        } else {
          this.errorMessageFilter = "Report Not Found!";
          Swal("Error", errorMessageFilter, "error");
        }
      } finally {
        this.isLoading = false;
      }
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
        // this.queryParams.range = "week";
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        // this.queryParams.range = "month";
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
      this.fetchCandidateList();
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
    formatDates(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.fetchCandidateList();
      // vm.getDeleteBookingData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.fetchCandidateList();
    // this.getDeleteBookingData();
    next();
  },
  async mounted() {
    this.currentView === "weekly";
    this.loadDateRangeFromLocalStorage();

    // await this.getPositionMethod();

    // await this.getBusinessUnitMethod();

    // await this.getCandidateListMethod();
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    await this.fetchCandidateList();
    await this.getCandidateListMethod();
    await this.getSiteNameMethod();
    // await this.getDeleteBookingData();
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
.hidden {
  display: none;
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
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green !important;
  border-radius: 22px;
  color: green;
}
.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #ff5722 !important;
  border-radius: 22px;
  color: #ff5722;
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
.bookingTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
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
  .bookingTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
