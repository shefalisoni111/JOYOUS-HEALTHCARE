<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Weekly Timesheet</span>
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
              <button
                type="button"
                class="btn btn-outline-success text-nowrap"
                @click="toggleFilters"
              >
                <i class="bi bi-funnel"></i>
                Show Filters
              </button>
            </div>
            <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
              <div class="d-flex gap-2">
                <div></div>

                <select
                  v-model="selectedSiteName"
                  id="selectBusinessUnit"
                  @change="filterData"
                >
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

                <select
                  v-model="selectedCandidate"
                  id="selectCandidateList"
                  @change="filterData"
                >
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
              <div>
                <button
                  @click="resetFilter"
                  class="btn btn-secondary"
                  :disabled="!selectedSiteName && !selectedCandidate && !localSearchQuery"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="card border-0 bg-transparent">
                  <div class="row g-0">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <i class="bi bi-check-circle-fill text-success fs-1"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#Approved Timesheets</h5>
                          <!-- <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 24.00
                            <span class="text-info">Amount</span> £324.00
                          </p> -->
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
                          <h5 class="card-title fw-bold">#Invoiced Timesheets</h5>
                          <!-- <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 0.00
                            <span class="text-info">Amount</span> £0.00
                          </p> -->
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
                        <i class="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
                      </div>
                      <div class="">
                        <div class="card-body">
                          <h5 class="card-title fw-bold">#Pending Timesheets</h5>
                          <!-- <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 11.50
                            <span class="text-info">Amount</span> £126.50
                          </p> -->
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
                          <!-- <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 35.50
                            <span class="text-info">Amount</span> £450.50
                          </p> -->
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
                  <span class="close text-white" @click="closeModal">&times;</span>
                </div>

                <h4 class="text-capitalize">{{ getCandidateName() }}</h4>
                <p>You clicked on {{ selectedDate }}</p>
                <p>CandidateId: {{ selectedCandidateId }}</p>
                <!-- Pass initialDate to the Calendar component -->
                <!-- <WeekTimeSheetEdit
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId"
                  @closeModal="closeModal"
                  :vacancyId="vacancyId"
                  :paginatedTimesheets="paginatedTimesheets"
                /> -->
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
                      <div v-for="day in daysOfWeek" :key="day" class="day-header">
                        {{ day }}
                      </div>
                      <div v-for="date in selectedDateRow" :key="date" class="day-header">
                        {{ formatDate(date) }}
                        <!-- <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Total</th>
                      </tr> -->
                        <!-- <div class="column">
                        <div class="column-header">Start</div>
                      </div>
                      <div class="column">
                        <div class="column-header">End</div>
                      </div>
                      <div class="column">
                        <div class="column-header">Total</div>
                      </div> -->
                        <div
                          class="additional-column day-header d-flex justify-content-center"
                        >
                          <tr>
                            <th
                              class="additional-header"
                              style="border-right: 1px solid #e1d4d4; padding-right: 5px"
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
                            <th class="additional-header" style="padding-left: 5px">
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

              <tbody v-if="mergedTimesheetsArray && mergedTimesheetsArray?.length > 0">
                <!-- <tr v-if="errorMessageFilter">
                  <td colspan="9" class="text-danger text-center">
                    {{ errorMessageFilter || "Data not Found!" }}
                  </td>
                </tr> -->

                <tr v-for="data in mergedTimesheetsArray" :key="data.id">
                  <td>{{ data.id }}</td>
                  <td class="text-capitalize fw-bold">
                    {{
                      data.candidate_name ? data.candidate_name + " " : data.name + " "
                    }}
                    <span class="fs-6 text-muted fw-100">
                      <br />
                      <span style="background: rgb(209, 207, 207); padding: 3px">
                        {{ data.job ? data.job : "Null" }}
                      </span>
                    </span>
                  </td>
                  <td>
                    {{ data.site_name ? data.site_name : "Null" }}
                  </td>
                  <td>{{ data.shift }}</td>
                  <td>
                    <div class="calendar-grid">
                      <div
                        v-for="day in selectedDateRow"
                        :key="day"
                        :data-bs-toggle="
                          mergedTimesheetsArray &&
                          (data.date
                            ? formatDate(day) === formatDateFormate(data.date)
                            : formatDate(day) === formatDateFormate(data.shift_date)) &&
                          data.status !== 'Approved'
                            ? 'modal'
                            : ''
                        "
                        :data-bs-target="
                          mergedTimesheetsArray &&
                          (data.date
                            ? formatDate(day) === formatDateFormate(data.date)
                            : formatDate(day) === formatDateFormate(data.shift_date)) &&
                          data.status !== 'Approved'
                            ? '#editWeeklyTs'
                            : ''
                        "
                        :data-bs-whatever="mergedTimesheetsArray ? '@mdo' : ''"
                        @click="
                          mergedTimesheetsArray &&
                          (data.date
                            ? formatDate(day) === formatDateFormate(data.date)
                            : formatDate(day) === formatDateFormate(data.shift_date)) &&
                          data.status !== 'Approved'
                            ? openModal(data, formatDate(day))
                            : null
                        "
                        :class="{
                          'calendar-day': true,
                          clickable: day !== '' && mergedTimesheetsArray !== null,
                          'disabled-edit': mergedTimesheetsArray === null,
                        }"
                        class="d-flex justify-content-between gap-2"
                      >
                        <div
                          v-if="
                            data.date
                              ? formatDate(day) === formatDateFormate(data.date)
                              : formatDate(day) === formatDateFormate(data.shift_date) &&
                                data.status !== 'Approved'
                          "
                          class="d-flex gap-2"
                        >
                          <div
                            v-if="data.status !== 'Approved'"
                            :style="
                              data.status !== 'Approved' ? 'border: 1px dashed red' : ''
                            "
                          >
                            <td>
                              <div class="column pe-2">
                                <div class="column-cell">
                                  {{
                                    typeof data.start_time === "number"
                                      ? data.start_time.toFixed(2)
                                      : data.start_time === null
                                      ? "0.00"
                                      : data.start_time
                                  }}
                                </div>
                              </div>
                            </td>

                            <td>
                              <div class="column px-2">
                                <div class="column-cell">
                                  {{
                                    typeof data.end_time === "number"
                                      ? data.end_time.toFixed(2)
                                      : data.end_time === null
                                      ? "0.00"
                                      : data.end_time
                                  }}
                                </div>
                              </div>
                            </td>

                            <td>
                              <div class="column">
                                <div class="column-cell">
                                  {{
                                    typeof data.total_minutes === "number"
                                      ? data.total_minutes.toFixed(2)
                                      : data.total_minutes === null
                                      ? "0.00"
                                      : data.total_minutes
                                  }}
                                </div>
                              </div>
                            </td>
                          </div>

                          <div
                            v-else
                            :style="{
                              border: data.status !== 'Approved' ? '1px dashed red' : '',
                            }"
                          >
                            <span
                              v-if="
                                data.date
                                  ? formatDate(day) === formatDateFormate(data.date)
                                  : formatDate(day) === formatDateFormate(data.shift_date)
                              "
                              class="text-center btn-success bg-success text-white p-2 position-relative"
                              style="left: 34px"
                            >
                              {{ data.status }}

                              <span
                                class="btn btn-danger btn-sm position-absolute p-0"
                                style="left: 17px; top: 28px"
                                @click.prevent="ApproveMethod(data, $event)"
                              >
                                Revert
                              </span>
                            </span>
                            <!-- <span
                              
                              class="text-center"
                              :class="
                                data.status === 'Approved' ? 'btn-danger' : 'btn-danger'
                              "
                              @click.prevent="ApproveMethod(data, $event)"
                            >
                              Revert
                            </span> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <!-- <td>{{ data.total_hours ? data.total_hours : "Null" }}</td> -->
                  <!-- <td>
                    {{
                      data.candidate_id === null
                        ? this.candidateHoursMap[data.candidate_id].toFixed(2)
                        : "0.00"
                    }}
                  </td> -->
                  <td>
                    {{ data.total_week_hours ? data.total_week_hours : "0.00" }}
                  </td>
                  <td>{{ data.total_week_cost ? data.total_week_cost : "0.00" }}</td>
                  <td>{{ data.approved_by ? data.approved_by : "Null" }}</td>
                </tr>
              </tbody>
              <!-- <tbody v-else>
                <tr>
                  <td colspan="9" class="text-danger text-center">
                    {{ errorMessage }}
                  </td>
                </tr>
              </tbody> -->
              <tbody v-else>
                <tr v-if="errorMessageFilter">
                  <td colspan="9" class="text-danger text-center">
                    {{ errorMessageFilter }}
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="9" v-if="!isLoading" class="text-danger text-center">
                    {{ errorMessage }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="candidateList.length >= 10">
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
          <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
        </li>
      </ul>
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
        :disabled="currentPage * itemsPerPage >= candidateList.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <!-- <AppointmentAdd /> -->
    <WeekTimeSheetEdit
      ref="editWeekly"
      @CustomTimeSheetData-updated="fetWeekTimeSheetData"
      :initialDate="selectedDate"
      :vacancyId="vacancyId"
      @closeModal="closeModal"
      :paginatedTimesheets="mergedTimesheetsArray"
    />
    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
// import AppointmentAdd from "../modals/Schedule/EditAssignedShift.vue";
import Navbar from "../Navbar.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import WeekTimeSheetEdit from "../modals/TimeSheet/WeekTimeSheetEdit.vue";
import Loader from "../Loader/Loader.vue";

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
      total_week_hours: "",
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
      showFilters: false,
      errorMessage: "",
      dataCustomTimeSheet: [],
      selectedCandidate: "",
      errorMessageFilter: "",
      selectedSiteName: "",
    };
  },

  computed: {
    // isSaveDisabled() {
    //   const currentData = this.mergedTimesheetsArray[0];

    //   if (!currentData) {
    //     return true;
    //   }

    //   const { start_time, end_time } = currentData;

    //   return (
    //     !start_time || !end_time || this.total_hours === null || this.total_hours <= 0
    //   );
    // },
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
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
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
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },

    // selectCandidateList() {
    //   const id = this.candidateLists.find((option) => option.id === this.id);
    //   return id ? id.first_name : "";
    // },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.name : "";
    },

    selectCandidateList() {
      const candidate = this.candidateLists.find(
        (option) => option.first_name === this.selectedCandidate
      );
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
  },
  watch: {
    // selectedCandidate(newValue) {
    //   if (newValue !== "") {
    //     this.makeFilterAPICall("candidate", newValue);
    //   } else {
    //   }
    // },
    // site_id(newValue) {
    //   if (newValue !== "") {
    //     this.makeFilterAPICall("site", newValue);
    //   } else {
    //   }
    // },
  },

  methods: {
    async ApproveMethod(data, event) {
      const token = localStorage.getItem("token");
      event.preventDefault();
      event.stopPropagation();
      const isPending = data.status === "Pending";
      data.status = isPending ? "Unapproved" : "Pending";
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${data.id}`,
          null,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.message) {
          const message = response.data.message;
          this.$refs.successAlert.showSuccess(message);
        } else {
          data.status = isPending ? "Pending" : "Unapproved";
        }
      } catch (error) {
        // Handle the error if needed
        // console.error("Error approving timesheet:", error);
        data.status = isPending ? "Pending" : "Unapproved";
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
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

        this.candidateLists = allStaffData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
        } else {
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
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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

        const response = await axios.post(`${VITE_API_URL}/assign_vacancy`, payload);
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
      return this.selectedCandidate ? this.selectedCandidate.first_name : "Default Name";
    },

    openModal(candidateId, day) {
      this.vacancyId = candidateId.id.toString() || "";

      // this.$refs.editWeekly.fetchCustomTimeSheetData(this.vacancyId);
      try {
        if (this.dataCustomTimeSheet && this.dataCustomTimeSheet.length > 0) {
          const actualCandidateId = candidateId.id;
          const selectedDate = new Date(this.startDate);
          selectedDate.setDate(parseInt(day));

          this.selectedDate = selectedDate.toISOString().split("T")[0];
          this.selectedCandidateId = actualCandidateId;

          const selectedCandidate = this.candidateList.find(
            (candidate) => candidate.id === actualCandidateId
          );

          if (
            selectedCandidate &&
            selectedCandidate.shift_date === formattedSelectedDate
          ) {
            this.$nextTick(() => {
              this.selectedCandidate = selectedCandidate;
            });
          } else {
            this.selectedDate = null;
            this.statusForSelectedDate = null;
          }
        } else {
          // Do something else or do nothing if dataCustomTimeSheet is empty
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
    },
    async filterData() {
      const params = {
        page: 1,
      };

      if (this.selectedSiteName) {
        params["weekly_timesheet[site]"] = this.selectedSiteName;
      }
      if (this.selectedCandidate) {
        params["weekly_timesheet[candidate_name]"] = this.selectedCandidate;
        params["weekly_timesheet[name]"] = this.selectedCandidate;
      }

      if (this.selectedCandidate) {
        if (this.candidateList && this.candidateList.length > 0) {
          const isCustomTimesheets = this.candidateList.some((item) =>
            item.hasOwnProperty("custom_timesheets")
          );

          if (isCustomTimesheets) {
            params["weekly_timesheet[date]"] = this.selectedCandidate;
          } else {
          }
        }
      } else {
        if (this.selectedCandidate) {
          params["weekly_timesheet[name]"] = this.selectedCandidate;
        }
        params["weekly_timesheet[shift_date]"] = this.selectedCandidate;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/filter_timesheets`, {
          params,
        });

        const mergedTimeSheets = [
          ...response.data.custom_timesheets,
          ...response.data.sign_timesheets,
        ];

        this.candidateList = mergedTimeSheets;
        this.mergedTimesheetsArray = this.candidateList || [];

        if (mergedTimeSheets?.length === 0) {
          this.errorMessageFilter = "Data Not Found.";
        }
      } catch (error) {
        // console.error("Error fetching timesheets:", error);
        this.errorMessageFilter = "Data Not Found.";
      }
    },
    resetFilter() {
      this.selectedSiteName = null;
      this.selectedCandidate = null;
      this.localSearchQuery = "";

      this.filterData();
    },
    getSiteName(site_id) {
      const site = this.businessUnit.find((option) => option.id === site_id);
      return site ? site.site_name : "";
    },
    // async makeFilterAPICall(filterType, filterValue) {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/filter_timesheets`, {
    //       params: {
    //         filter_type: filterType,
    //         filter_value: filterValue,
    //       },
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });
    //     const mergedTimeSheets = [
    //       ...response.data.custom_timesheets,
    //       ...response.data.sign_timesheets,
    //     ];
    //     this.candidateList = mergedTimeSheets;
    //     this.mergedTimesheetsArray = this.candidateList || [];
    //     this.errorMessageFilter = "";
    //   } catch (error) {
    //     if (error.response) {
    //       this.errorMessageFilter = "Data Not Found!" || "Data Not Found!";
    //     } else {
    //       this.errorMessageFilter = "Data Not Found!";
    //     }
    //     this.mergedTimesheetsArray = [];
    //   }
    // },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetWeekTimeSheetData();
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
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      try {
        const { start, end } = this.getWeekRange(this.startDate);
        const requestData = {
          date: this.formatDate(start),
          //  end_date: this.formatDate(end),
        };

        const response = await axios.get(
          `${VITE_API_URL}/find_timesheets_according_week`,
          {
            params: requestData,
            per_page: this.itemsPerPage,
          }
        );

        this.dataCustomTimeSheet = response.data;

        this.weeklyTimesheets = this.dataCustomTimeSheet.weekly_timesheets;

        const mergedTimesheetsArray = [];
        const candidateHoursMap = {};

        this.weeklyTimesheets.forEach((candidateTimesheet) => {
          const {
            candidate_name,
            candidate_id,
            site_name,
            shift,
            job,
            total_week_hours,
            total_week_cost,
            data,
          } = candidateTimesheet;

          const customTimesheets = Array.isArray(data) ? data : [];

          customTimesheets.forEach((timesheet) => {
            mergedTimesheetsArray.push({
              candidate_name,
              candidate_id,
              site_name,
              shift,
              job,
              total_week_hours,
              total_week_cost,
              ...timesheet,
            });
          });

          if (total_week_hours !== undefined && total_week_hours !== null) {
            candidateHoursMap[candidate_id] = total_week_hours;
          }
        });

        this.mergedTimesheetsArray = mergedTimesheetsArray;

        if (this.mergedTimesheetsArray.length === 0) {
          this.errorMessage = "No Weekly timesheets found for the specified week.";
        } else {
          this.errorMessage = "";
        }

        // console.log(this.mergedTimesheetsArray);
        // console.log(this.total_hourMain, this.candidateHoursMap);
      } catch (error) {
        // console.error("Error fetching week timesheets:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  components: {
    WeekTimeSheetEdit,
    Navbar,
    Loader,
    SuccessAlert,
  },

  async mounted() {
    await this.loadDateRangeFromLocalStorage();
    await this.getBusinessUnitMethod();

    await this.getCandidateListMethod();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    await this.fetWeekTimeSheetData();
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
    width: 1890px;
  }
  .wrapper-timeSheet {
    overflow-x: scroll;
  }
}
</style>
