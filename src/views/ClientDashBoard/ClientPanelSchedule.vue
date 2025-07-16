<template>
  <div>
    <ClientNavbar />
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2 pt-3">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link
                  class="nav-link d-inline"
                  aria-current="page"
                  to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Schedule</span>
              </li>
            </ol>
          </div>

          <div class="d-flex align-items-center gap-2">
            <div></div>
          </div>
        </div>

        <div class="row">
          <div class="full-page-calendar">
            <SuccessAlert ref="successAlert" />
            <div></div>
          </div>
          <div class="table-wrapper">
            <div class="sidebar-container scheduleTable">
              <div class="sidebar-button" :class="{ 'slide-left': isOpen }">
                <div class="d-flex justify-content-between">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 pe-2 fs-5"
                    >
                      <i class="bi bi-funnel-fill"></i>
                    </button>
                    <span v-if="isOpen" class="text-danger fs-5 ps-2"
                      >Filter
                    </span>
                  </div>
                  <div>
                    <i
                      v-if="isOpen"
                      class="bi bi-x float-end fs-2 d-flex cursor-pointer"
                      @click="toggleSidebar"
                    ></i>
                  </div>
                </div>

                <div class="d-flex mt-2">
                  <!-- <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-suitcase-lg-fill"
                        style="border-radius: 50%; background: #28c77d; padding: 10px"
                      ></i>
                    </button>
                  </div> -->
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="job_id"
                        for="selectJobTitle"
                        class="form-select"
                        @change="filterData(job_id, 'job')"
                      >
                        <option value="" selected disabled>Select Jobs</option>

                        <option
                          id="selectJobTitle"
                          v-for="option in options"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <!-- <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-building"
                        style="border-radius: 50%; background: #ffeb3b; padding: 10px"
                      ></i>
                    </button>
                  </div> -->
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="site_id"
                        for="selectBusinessUnit"
                        class="form-select"
                        @change="onSiteChange"
                      >
                        <option value="" selected disabled>Select Site</option>

                        <option
                          id="selectBusinessUnit"
                          v-for="option in businessUnit"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.site_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <!-- <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-calendar3"
                        style="border-radius: 50%; background: #ff6d3f; padding: 10px"
                      ></i>
                    </button>
                  </div> -->
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="site_shift_id"
                        for="selectShifts"
                        class="form-select"
                        @change="filterData(site_shift_id, 'shift')"
                      >
                        <option value="" selected disabled>All Shift</option>

                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                          id="selectShifts"
                        >
                          {{
                            option.shift_name
                              ? option.shift_name.replace(/_/g, " ")
                              : ""
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <!-- <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-bell-fill"
                        style="border-radius: 50%; background: #5388d5; padding: 10px"
                      ></i>
                    </button>
                  </div> -->
                  <div>
                    <div class="filters" v-show="isOpen">
                      <button
                        :disabled="!isFilterSelected"
                        @click="resetFilters"
                        class="btn btn-secondary"
                      >
                        Reset <i class="bi bi-funnel-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-content" :class="{ 'slide-left': isOpen }">
                <div class="table-container">
                  <table class="table">
                    <thead>
                      <tr>
                        <th style="width: 15%">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">Shifts</div>
                            &nbsp; &nbsp; &nbsp;&nbsp;
                            <div class="d-flex align-items-center fs-4">
                              <i
                                class="bi bi-caret-left-fill"
                                @click="moveToPrevious"
                              ></i>
                              <i class="bi bi-calendar2-check-fill"></i>
                              <i
                                class="bi bi-caret-right-fill"
                                @click="moveToNext"
                              ></i>
                            </div>
                          </div>
                        </th>

                        <th>
                          <div class="calendar-grid">
                            <div
                              v-for="day in daysOfWeek"
                              :key="day"
                              class="day-header"
                            >
                              {{ day }}
                            </div>
                            <div
                              v-for="date in selectedDateRow"
                              :key="date"
                              class="day-header"
                            >
                              {{ formatDate(date) }}
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody v-if="candidateList?.length > 0">
                      <tr class="sticky-header">
                        <td
                          style="border-right: 1px solid rgb(209, 208, 208)"
                        ></td>
                        <td>
                          <div
                            class="calendar-grid"
                            style="
                              max-height: 240px;
                              overflow-y: auto;
                              overflow-x: hidden;
                            "
                          >
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="text-center"
                            >
                              <ul
                                class="list-unstyled mb-0"
                                v-if="
                                  vacancyList.some(
                                    (data) => data.day === formattedDate(day)
                                  )
                                "
                              >
                                <li
                                  class="position-relative"
                                  v-for="(vacancy, liIndex) in vacancyList.find(
                                    (data) => data.day === formattedDate(day)
                                  )?.vacancies || []"
                                  :key="vacancy.id"
                                  :draggable="true"
                                  @dragstart="handleDragStart(vacancy)"
                                  @drop="handleRevertDrop(vacancy.id, $event)"
                                  @dragover.prevent="handleDragOver"
                                  :class="{
                                    'bg-info': liIndex === 0,
                                    'bg-warning': liIndex === 1,
                                    'bg-success': liIndex === 2,
                                    'bg-primary': liIndex >= 3,
                                  }"
                                >
                                  <span
                                    class="d-flex flex-column align-items-baseline"
                                  >
                                    <span class="text-capitalize"
                                      >{{ vacancy.site }},
                                      {{ vacancy.job_title }}</span
                                    >
                                    <span>{{
                                      vacancy.site_shift.replace(/_/g, " ")
                                    }}</span>
                                  </span>
                                  <span class="staff-count-round text-white">{{
                                    vacancy.staff_required
                                  }}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>

                      <tr v-for="staff in candidateList" :key="staff.id">
                        <div
                          v-for="staff in staff"
                          :key="staff.id"
                          class="text-capitalize fw-bold"
                          style="border-right: 1px solid rgb(209, 208, 208)"
                        >
                          {{ staff.candidate_name }}

                          <span class="fs-6 text-muted fw-100"
                            ><br /><span
                              style="
                                background: rgb(209, 207, 207);
                                padding: 3px;
                              "
                              >{{ staff.job }}</span
                            ></span
                          >
                        </div>

                        <td>
                          <div v-for="staffData in staff" :key="staffData.id">
                            <div class="calendar-grid">
                              <div
                                v-for="day in selectedDateRow"
                                :key="day"
                                class="pt-2 calendar-day"
                              >
                                <span
                                  v-for="assign in assignStaffDisplay"
                                  :key="assign.id"
                                >
                                  <span
                                    v-for="assignStaff in assign.assign_vacancy"
                                    :key="assignStaff.id"
                                  >
                                    <span
                                      class="position-relative"
                                      v-if="
                                        staffData.candidate_id ===
                                          assignStaff.candidate_id &&
                                        assign.date === formattedDate(day)
                                      "
                                    >
                                      <span
                                        class="assignVacancyDesign mt-1 text-capitalize d-flex justify-content-center"
                                      >
                                        {{ assignStaff.site_name }},

                                        <br />
                                        {{
                                          assignStaff.site_shift_name?.replace(
                                            /_/g,
                                            " "
                                          )
                                        }}, {{ assignStaff.job_name }} &nbsp;

                                        <br />
                                      </span>
                                      <span
                                        class="bg-success text-white position-absolute top-0 clickable"
                                        style="
                                          padding: 3px 6px;
                                          border-radius: 10px;
                                          color: #fff;

                                          right: 0;
                                          font-size: small;
                                        "
                                        v-if="
                                          getBookingStatus(
                                            assignStaff,
                                            formattedDate(day)
                                          )
                                        "
                                      >
                                        {{
                                          getBookingStatus(
                                            assignStaff,
                                            formattedDate(day)
                                          )
                                        }}
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td
                          colspan="7"
                          class="text-danger text-center"
                          v-if="!isLoading"
                        >
                          {{ errorMessage || "Data Not found!" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <loader :isLoading="isLoading"></loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="mx-3"
      style="text-align: right"
      v-if="!candidateList && searchResults?.length >= 8"
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
    <div
      class="mx-3 mb-3 mt-3"
      style="text-align: right"
      v-if="candidateList?.length >= 10"
    >
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button> -->
      <button
        class="btn btn-sm btn-primary dropdown-toggle"
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
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage >= totalCandidateCount"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import EditAssignShceduleVaacncy from "../components/modals/Schedule/EditAssignShceduleVaacncy.vue";
// import ScheduleDirectAssignList from "../components/modals/Schedule/ScheduleDirectAssignList.vue";
import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";

// import SchedulePublishStaffList from "../components/modals/Schedule/SchedulePublishStaffList.vue";
import SuccessAlert from "../../components/Alerts/SuccessAlert.vue";
import Loader from "../../components/Loader/Loader.vue";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      filters: {
        availablity: "",
        job: "",
        site: "",
        shift: "",
        status: "",
      },
      isOpen: false,
      currentView: "weekly",
      startDate: new Date(),
      endDate: new Date(),
      currentDate: new Date(),
      selectedDate: new Date(),
      candidateJob: null,
      availability_id: "",
      publish: "",
      site_shift_id: "",
      vacancyId: "",
      candidateList: [],
      allDates: [],
      shiftsTime: [],
      selectedCandidateId: null,
      assignStaffDisplay: [],
      columnDateMatch: "",
      currentSelectedCandidate: null,
      statusForSelectedDate: null,
      vacancyList: [],
      vacancyBeingDragged: {},
      dropCandidateId: null,
      dropDay: null,
      droppedContent: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalCandidateCount: 0,
      options: [],
      job_id: "",
      site_id: "",
      assignedCandidateList: [],
      businessUnit: [],
      isModalOpen: false,
      flattenedAssignVacancies: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",

      ColumnDateMatchDates: [],
      isLoading: false,
    };
  },

  computed: {
    isFilterSelected() {
      return this.site_id || this.site_shift_id || this.job_id;
    },
    totalPages() {
      return Math.ceil(this.candidateList.length / this.itemsPerPage);
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },
    selectJobTitle() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    paginateCandidates() {
      return this.candidateList;
    },
    paginateSearch() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    totalRecordsOnPage() {
      return this.paginateSearch.length;
    },
    daysOfWeek() {
      return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    },

    selectedDateRow() {
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];
      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);

        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();
        if (currentDate.getDate() > lastDayOfMonth) {
          currentDate.setMonth(currentDate.getMonth() + 1);

          currentDate.setDate(1);

          currentDate.setDate(i + 1 - startDay);
        }

        selectedDateRow.push(currentDate);
      }

      return selectedDateRow;
    },
    candidateName() {
      return this.selectedCandidate ? this.selectedCandidate.first_name : "";
    },

    formattedDates() {
      return this.selectedDateRow.map((day) => this.formatDate(day));
    },

    formattedStartDate() {
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(
        this.selectedDateRow[this.selectedDateRow.length - 1]
      );
    },
    filteredAssignStaff() {
      return function (candidateId) {
        return this.assignStaffDisplay.filter(
          (assign) => assign_vacancy.candidate_id === candidateId
        );
      };
    },
  },
  watch: {
    columnDateMatch() {
      // this.filteredVacancies();
    },
  },
  methods: {
    getBookingStatus(data, date) {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];

      if (new Date(date) < new Date(formattedToday)) {
        return "";
      }

      if (data.booking) {
        if (data.booking === "accepted") {
          return "Booked";
        } else if (data.booking === "assigned") {
          return "";
        }
      }

      return null;
    },
    resetFilters() {
      this.site_id = "";
      this.site_shift_id = "";
      this.job_id = "";
      this.fetchCandidateList();
    },
    async filterData(value, filterType) {
      if (!value) {
        return;
      }
      this.filters[filterType] = value;
      await this.makeFilterAPICall();
    },
    async makeFilterAPICall() {
      this.isLoading = true;

      const requestData = {
        "vac_schedule[job_id]": this.filters.job || null,
        "vac_schedule[site_id]": this.filters.site || null,
        "vac_schedule[site_shift_id]": this.filters.shift || null,
      };

      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/assigned_candidate_list`,
          {
            params: requestData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data?.data || [];

        if (
          responseData.length === 0 ||
          (responseData.length === 1 && responseData[0].length === 0)
        ) {
          this.errorMessages = "Data Not Found.";
          this.candidateList = [];
        } else {
          this.errorMessages = "";
          this.candidateList = responseData;
          this.vacancyList = response.data.vacancies || [];
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.error) {
            Swal.fire("Error", error.response.data.error, "error");
          } else {
            Swal.fire("Error", "Server returned a 500 error", "error");
          }
        } else {
          Swal.fire("Error", "An unexpected error occurred", "error");
        }
      } finally {
        this.isLoading = false;
      }
    },
    // filterData(value, filterType) {
    //   this.filters[filterType] = value;

    //   this.makeFilterAPICall();
    // },

    // async makeFilterAPICall() {
    //   const requestData = {
    //     availablity: this.filters.availablity,
    //     job: this.filters.job,
    //     site: this.filters.site,
    //     shift: this.filters.shift,
    //     status: this.filters.status,
    //     date: this.formattedStartDate,
    //   };

    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/candidates_availability_vacancies`,
    //       {
    //         params: {
    //           currentPage: this.currentPage,
    //           ...requestData,
    //         },
    //       }
    //     );

    //     this.candidateList = response.data.data;
    //     this.searchResults = response.data.data;
    //     this.vacancyList = response.data.vacancies;
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       const errorMessages = error.response.data.error;
    //       if (errorMessages === "No records found for the given filter") {
    //         errorMessages === "No records found for the given filter";
    //       } else {
    //         errorMessages === "No records found for the given filter";
    //       }
    //     } else {
    //       // console.error("An error occurred:", error);
    //     }
    //   }
    // },
    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
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

        const response = await axiosInstance.get(
          `${VITE_API_URL}/availability_searching/${this.searchQuery}`
        );

        this.searchResults = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    extractTimeRange(shift) {
      if (shift && shift.includes("Holiday")) {
        if (shift && shift.includes("Day Shift")) {
          return shift
            .replace("Holiday Day Shift", "Holiday Night Shift")
            .split(" ")[3];
        } else if (shift && shift.includes("Night Shift")) {
          return shift
            .replace("Holiday Night Shift", "Holiday Day Shift")
            .split(" ")[3];
        }
      } else if (shift && shift.includes("Day Shift")) {
        return shift.split(" ")[2];
      } else if (shift && shift.includes("Night Shift")) {
        return shift.split(" ")[2];
      }
    },
    formatDates(dateString) {
      if (!dateString) return "";
      const parts = dateString.split(", ");
      if (parts.length < 2) return "";
      const [dayOfWeek, date] = parts;
      const [day, month, year] = date.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },

    toggleSidebar() {
      this.isOpen = !this.isOpen;
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
      this.columnDateMatch = this.formattedStartDate;
      this.fetchVacancyListMethod();
      this.fetchCandidateList();
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
      this.columnDateMatch = this.formattedStartDate;
      this.fetchVacancyListMethod();
      this.fetchCandidateList();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(
          this.startDate.getDate() - this.startDate.getDay() + 1
        );
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        this.endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      }

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

    handleDragStart(vacancy) {
      if (vacancy && vacancy.id) {
        this.vacancyBeingDragged = vacancy;
      }
    },
    handleDragRevert(vacancy, candidateId) {
      this.vacancyBeingDragged = vacancy;
      this.dropCandidateId = candidateId;
    },
    async handleRevertDrop(candidateId, event) {
      event.preventDefault();

      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: this.dropCandidateId,
        };

        const response = await axios.delete(
          `${VITE_API_URL}/unassign_vacancy_with_schedule`,
          { data: payload }
        );

        if (response.status >= 200 && response.status < 300) {
          const message = "Staff UnAssigned Shift Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.fetchCandidateList();
          // this.fetchAssignList();
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorMessage = error.response.data.error;
          // alert(errorMessage);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        } else {
          // Handle other errors if needed
        }
      } finally {
        this.vacancyBeingDragged = null;
        this.dropCandidateId = null;
        this.dropDay = null;
        this.droppedContent = null;
      }
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    // async handleDrop(candidateId, date) {
    //   try {
    //     if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
    //       return;
    //     }

    //     const payload = {
    //       vacancy_id: this.vacancyBeingDragged.id,
    //       candidate_id: candidateId.candidate_id,
    //       // date: date,
    //     };

    //     const response = await axios.post(
    //       `${VITE_API_URL}/assign_vacancy_with_schedule`,
    //       payload
    //     );

    //     if (response.status >= 200 && response.status < 300) {
    //       const message = "Staff Assigned Shift Successfully";
    //       this.$refs.successAlert.showSuccess(message);
    //       this.fetchCandidateList();
    //       // this.fetchAssignList();
    //     }
    //   } catch (error) {
    //     let errorMessage;
    //     if (
    //       error.response &&
    //       error.response.status === 422 &&
    //       typeof error.response.data === "object" &&
    //       error.response.data.error &&
    //       error.response.data.error.base &&
    //       Array.isArray(error.response.data.error.base) &&
    //       error.response.data.error.base.length > 0
    //     ) {
    //       errorMessage = error.response.data.error.base[0];
    //     } else {
    //       errorMessage = error.response.data.error;
    //     }
    //     // alert(errorMessage);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Error",
    //       text: errorMessage,
    //     });
    //   } finally {
    //     this.vacancyBeingDragged = null;
    //     this.dropCandidateId = null;
    //     this.dropDay = null;
    //     this.droppedContent = null;
    //   }
    // },

    formattedDate(day) {
      if (typeof day === "number") {
        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(day);
        return selectedDate.toISOString().split("T")[0];
      } else if (day instanceof Date && !isNaN(day)) {
        return day.toISOString().split("T")[0];
      } else {
        return "Invalid Date";
      }
    },

    getCandidateName() {
      if (this.selectedCandidate) {
        if (
          this.selectedCandidate.first_name &&
          this.selectedCandidate.last_name
        ) {
          return `${this.selectedCandidate.first_name} ${this.selectedCandidate.last_name}`;
        } else {
          return (
            this.selectedCandidate.first_name ||
            this.selectedCandidate.last_name ||
            "Default Name"
          );
        }
      } else {
        return "Default Name";
      }
    },

    async onSiteChange() {
      await this.filterData(this.site_id, "site");
      const selectSite = this.site_id;
      await this.getTimeShift(selectSite);
    },
    async getTimeShift(selectionSite) {
      if (!selectionSite) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${selectionSite}`
        );

        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: shift.start_time,
            end_time: shift.end_time,
            site_shift_id: shift.id,
          })) || [];
        // console.log(this.shiftsTime);
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchCandidateList();
    },
    nextPage() {
      this.currentPage++;
      this.fetchCandidateList();
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCandidateList();
      }
    },
    async fetchCandidateList() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      try {
        const requestData = {
          date: this.formattedStartDate,
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };

        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/assigned_candidate_list`,
          {
            params: requestData,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // this.candidateList = response.data.data;
        const responseData = response.data?.data || [];

        if (
          responseData.length === 0 ||
          (responseData.length === 1 && responseData[0].length === 0)
        ) {
          this.errorMessages = "Data Not Found.";
          this.candidateList = [];
        } else {
          this.errorMessages = "";
          this.candidateList = responseData;
          this.vacancyList = response.data.vacancies || [];
        }

        this.searchResults = response.data.data;
        this.assignStaffDisplay = response.data.vacancies;
        // console.log(this.assignStaffDisplay);
        const vacanciesInsideVacancies = response.data.vacancies.map((item) => {
          return item.assign_vacancy;
        });

        this.flattenedAssignVacancies = vacanciesInsideVacancies.flat();
        // console.log(this.flattenedAssignVacancies);
        this.totalCandidateCount = response.data.total_count;
        this.ColumnDateMatchDates = this.candidateList.map((candidate) =>
          candidate.availability.map((avail) => avail.date)
        );
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    async fetchVacancyListMethod() {
      try {
        const requestData = {
          date: this.formattedStartDate,
          single_date: true,
        };
        const response = await axios.get(
          `${VITE_API_URL}/vacancies_and_candidates_availability`,
          {
            params: requestData,
          }
        );

        this.fetchCandidateList();
        // this.fetchAssignList();
        // this.fetchAssignVacancyStaffList();
      } catch (error) {
        // console.error("Error in fetchVacancyListMethod:", error);
      }
    },

    async getJobTitleMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
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
  },
  components: {
    // EditAssignShceduleVaacncy,
    ClientNavbar,
    // ScheduleDirectAssignList,
    // SchedulePublishStaffList,
    SuccessAlert,
    Loader,
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.fetchAssignList();
      vm.getBusinessUnitMethod();
      vm.getJobTitleMethod();
      vm.getTimeShift();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.fetchAssignList();
    this.getBusinessUnitMethod();
    this.getJobTitleMethod();
    this.getTimeShift();
    next();
  },
  async mounted() {
    await this.loadDateRangeFromLocalStorage();

    // await this.fetchAssignList();
    // await this.getBusinessUnitMethod();
    // this.fetchAssignVacancyStaffList();
    // await this.getJobTitleMethod();
    // await this.getTimeShift();

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
    // await this.fetchVacancyListMethod();
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
  padding-top: 65px;
}

.sidebar-container {
  display: flex;
}
.staff-count-round {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  top: 0;
  right: -4px;

  line-height: 20px;
}

.sidebar-button {
  padding: 10px;
  background: #faf8f4;
}

.sidebar-content {
  flex: 1;
}

.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
}

.sidebar.open {
  width: 400px;
}

.slide-left-content {
  transition: margin-left 0.3s;
}

.filters {
  margin-top: 10px;
}
.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input.dateInput {
  width: 1.3%;
}
.current-month {
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
}

.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.sticky-header {
  position: sticky;
  top: 62px;
  background-color: #f8f9fa;
  z-index: 10;
}
.cursor-pointer {
  cursor: pointer;
}
.day-header,
.empty-day,
.calendar-day {
  text-align: center;
  cursor: pointer;
}

.day-header {
  font-weight: bold;
}

.empty-day {
  background-color: #f3f3f3;
}

.modal-content h3 {
  color: #fff;
}
.modal-content .close {
  padding: 0px 5px;
  border-radius: 4px;
  background: #ff551f;
}

.calendar-day {
  background-color: #eaeaea;
  transition: background-color 0.3s ease;
  padding-bottom: 8px;
}

.calendar-day.clickable {
  cursor: crosshair;
  font-size: 10px;
  color: blue !important;
  font-weight: bold;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.table-container {
  max-height: 730px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.assignVacancyDesign {
  background: #e94141;
  padding: 2px;
  color: #fff;
  font-weight: 600;
  font-size: small;
  padding: 4px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
@media (max-width: 1120px) {
  .scheduleTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
