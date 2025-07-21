<template>
  <div>
    <ClientNavbar />
    <div class="container-fluid">
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
                / <span class="color-fonts"> Timesheet</span>
              </li>
            </ol>
          </div>
        </div>
        <div class="row p-3">
          <div class="full-page-calendar pt-1 pb-0">
            <div class="d-flex justify-content-between mb-3">
              <div class="calendar-header align-items-center">
                <span
                  v-if="currentView === 'weekly' && startDate && endDate"
                  class="fw-bold"
                >
                  {{
                    "Monday " +
                    formatDate(startDate) +
                    " to Sunday " +
                    formatDate(endDate)
                  }} </span
                >&nbsp; &nbsp; &nbsp;&nbsp;
                <div class="d-flex align-items-center fs-4">
                  <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                  <i class="bi bi-calendar2-check-fill"></i>
                  <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                </div>
              </div>
              <div class="d-flex gap-2">
                <div></div>

                <select v-model="site_id" id="selectBusinessUnit">
                  <option value="">All Site</option>
                  <option
                    v-for="option in businessUnit"
                    :key="option.id"
                    :value="option.site_name"
                    placeholder="Select BusinessUnit"
                  >
                    {{ option.site_name }}
                  </option>
                </select>
                <select v-model="job_id" id="selectedOptionText">
                  <option value="">Job Title</option>
                  <option
                    v-for="option in options"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.name }}
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
                <select class="form-select" aria-label="Default select example">
                  <option selected>Status</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div class="d-flex gap-2 mb-3 justify-content-between"></div>
            <div class="row">
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i
                          class="bi bi-check-circle-fill text-success fs-1"
                        ></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">
                            #Approved Timesheets
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i class="bi bi-file-spreadsheet text-success fs-1"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">
                            #Invoiced Timesheets
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i
                          class="bi bi-exclamation-triangle-fill fs-1 text-warning"
                        ></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">
                            #Pending Timesheets
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i
                          class="bi bi-file-earmark-spreadsheet-fill text-success fs-1"
                        ></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#All Timesheets</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <div class="close d-flex justify-content-between my-3">
                  <h3 class="d-flex align-items-center mb-0">
                    Edit Assigned Shift -BOOKING CODE
                  </h3>
                  <span class="close text-white" @click="closeModal"
                    >&times;</span
                  >
                </div>

                <h4 class="text-capitalize">{{ getCandidateName() }}</h4>
                <p>You clicked on {{ selectedDate }}</p>
                <p>CandidateId: {{ selectedCandidateId }}</p>
              </div>
            </div>
          </div>
          <div class="col-12 wrapper-timeSheet">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th rowspan="3">ID</th>
                  <th rowspan="3" style="width: 10%">Name</th>
                  <th rowspan="3">Site</th>
                  <th rowspan="3">Shift</th>
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

                        <div
                          class="additional-column day-header d-flex justify-content-center"
                        >
                          <tr>
                            <th
                              class="additional-header"
                              style="
                                border-right: 1px solid #e1d4d4;
                                padding-right: 5px;
                              "
                            >
                              Start
                            </th>
                            <th
                              class="additional-header"
                              style="
                                border-right: 1px solid #e1d4d4;
                                padding-left: 5px;
                                padding-right: 5px;
                              "
                            >
                              End
                            </th>
                            <th
                              class="additional-header"
                              style="padding-left: 5px"
                            >
                              Total
                            </th>
                          </tr>
                        </div>
                      </div>
                    </div>
                  </th>

                  <th rowspan="3">Total Hours</th>
                  <th rowspan="3">Total Cost</th>
                  <th rowspan="3">Approved By</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";
import SuccessAlert from "../../components/Alerts/SuccessAlert.vue";

import Loader from "../../components/Loader/Loader.vue";

export default {
  data() {
    return {
      currentView: "weekly",
      startDate: new Date(),
      endDate: new Date(),
      selectedDate: null,
      candidateList: [],
      selectedCandidateId: null,
      start_time: "",
      job_id: "",
      options: [],
      end_time: "",
      vacancyId: "",
      site_id: "",
      businessUnit: [],
      business_unit_value: "",
      candidateLists: [],
      id: "",
      isLoading: false,
      statusForSelectedDate: null,
      paginatedTimesheets: [],
      mergedTimesheetsArray: [],
      total_hourMain: [],
      candidateHoursMap: {},
      vacancyList: [],
      currentPage: 1,
      itemsPerPage: 10,

      errorMessage: "",
      dataCustomTimeSheet: [],
      selectedCandidate: "",
      errorMessageFilter: "",
    };
  },

  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.mergedTimesheetsArray.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
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
    computedSelectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
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
  },
  watch: {},

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
        this.fetWeekTimeSheetData();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      // this.fetWeekTimeSheetData();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
        this.fetWeekTimeSheetData();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
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
    formatDateFormate(dateStr) {
      if (!dateStr || typeof dateStr !== "string") {
        return "";
      }

      let year, month, day;

      if (dateStr.includes("/")) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
          [day, month, year] = parts.map(Number);
        } else {
          // console.error("Invalid date format:", dateStr);
          return "";
        }
      } else {
        const parts = dateStr.split("-");
        if (parts.length === 3) {
          [year, month, day] = parts.map(Number);
        } else {
          // console.error("Invalid date format:", dateStr);
          return "";
        }
      }

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        // console.error("Parsed date components are No numbers:", [year, month, day]);
        return "";
      }

      return `${day}/${month}/${year}`;
    },

    async handleDrop(candidateId) {
      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: candidateId,
        };

        const response = await axios.post(
          `${VITE_API_URL}/assign_vacancy`,
          payload
        );
      } catch (error) {
      } finally {
        this.vacancyBeingDragged = null;
        this.dropCandidateId = null;
        this.dropDay = null;
        this.droppedContent = null;
      }
    },

    formattedDate(day) {
      const selectedDate = new Date(this.startDate);
      selectedDate.setDate(day);
      return selectedDate.toISOString().split("T")[0];
    },
    getCandidateName() {
      return this.selectedCandidate
        ? this.selectedCandidate.first_name
        : "Default Name";
    },

    getWeekRange(date) {
      const start = new Date(date);
      const end = new Date(date);
      start.setDate(start.getDate() - start.getDay() + 1);
      end.setDate(end.getDate() + 6);
      return { start, end };
    },
    isDateInRange(dateStr, startDate, endDate) {
      const date = new Date(dateStr);
      return date >= startDate && date <= endDate;
    },
  },
  components: {
    ClientNavbar,
    Loader,
    SuccessAlert,
  },

  async mounted() {
    await this.loadDateRangeFromLocalStorage();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
  padding-top: 65px;
}
.disabled-edit {
  pointer-events: none;
  opacity: 0.5;
  cursor: pointer;
}
.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input.dateInput {
  width: 1.3%;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.current-month {
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
}
table {
  border: 1px solid 1px solid rgb(241 229 229);
}
table,
th,
td {
  border: 1px solid 1px solid rgb(241 229 229);
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

.day-header,
.empty-day,
.calendar-day {
  text-align: center;
  cursor: pointer;
}
.status-btn:disabled {
  opacity: 0.1;
  cursor: not-allowed;
}
.status-btn {
  z-index: 1;
  left: 39px;
  transform: translateY(19px);
  font-size: 12px;
  padding: 0px 7px;
}
@media (max-width: 1859px) {
  .status-btn {
    left: 35px;
    transform: translateY(23px);
  }
}

@media (max-width: 992px) {
  .status-btn {
    left: 30px;
    transform: translateY(17px);
    font-size: 11px;
  }
}

@media (max-width: 768px) {
  .status-btn {
    left: 25px;
    transform: translateY(15px);
    font-size: 10px;
    padding: 0px 5px;
  }
}

@media (max-width: 576px) {
  .status-btn {
    left: 20px;
    transform: translateY(13px);
    font-size: 9px;
    padding: 0px 3px;
  }
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
.disabled-edit {
  cursor: not-allowd;
  opacity: 0.6;
}
.calendar-day {
  background-color: #eaeaea;
  transition: background-color 0.3s ease;
  padding: 14px 4px;
}

.calendar-day.clickable {
  cursor: crosshair;
  font-size: 12px;

  font-weight: bold;
}

/* Modal styles */
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

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}

@media (max-width: 1520px) {
  .candidateTable {
    width: 1990px;
  }
  .wrapper-timeSheet {
    overflow-x: scroll;
  }
}
</style>
