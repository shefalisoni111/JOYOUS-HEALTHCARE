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
                <span v-if="formattedStartDate && formattedEndDate" class="fw-bold">
                  {{
                    "Monday " + formattedStartDate + " to Sunday " + formattedEndDate
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

                <select v-model="business_unit_id" id="selectBusinessUnit">
                  <option value="">All Site</option>
                  <option
                    v-for="option in businessUnit"
                    :key="option.id"
                    :value="option.id"
                    placeholder="Select BusinessUnit"
                  >
                    {{ option.name }}
                  </option>
                </select>

                <select v-model="id" id="selectCandidateList">
                  <option value="">All Staff</option>
                  <option
                    v-for="option in candidateLists"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.first_name }}
                  </option>
                </select>
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
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 24.00
                            <span class="text-info">Amount</span> £324.00
                          </p>
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
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 0.00
                            <span class="text-info">Amount</span> £0.00
                          </p>
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
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 11.50
                            <span class="text-info">Amount</span> £126.50
                          </p>
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
                          <p class="card-text fw-bold">
                            <span class="text-success">Hours</span> 35.50
                            <span class="text-info">Amount</span> £450.50
                          </p>
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
                <WeekTimeSheetEdit
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId"
                  @closeModal="closeModal"
                />
              </div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th rowspan="3">ID</th>
                <th rowspan="3" style="width: 11%">Name</th>
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
                <th rowspan="3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" checked />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="paginateCandidates?.length > 0">
              <tr v-for="data in paginateCandidates" :key="data.id">
                <td>{{ data.id }}</td>
                <td class="text-capitalize fw-bold">
                  {{ data.author_name + " " }}

                  <span class="fs-6 text-muted fw-100"
                    ><br /><span style="background: rgb(209, 207, 207); padding: 3px">{{
                      data.job
                    }}</span></span
                  >
                </td>

                <td>
                  {{ data.business_unit }}
                </td>
                <td>{{ data.shift }}</td>

                <td>
                  <div class="calendar-grid">
                    <div
                      v-for="day in selectedDateRow"
                      :key="day"
                      @click="openModal(data, day)"
                      :class="{
                        'calendar-day': true,
                        clickable: day !== '',
                      }"
                      class="d-flex justify-content-between gap-2"
                    >
                      <div v-if="formatDate(day)">
                        <td>
                          <div class="column">
                            <div class="column-cell">
                              {{ data.start_time }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="column">
                            <div class="column-cell">
                              {{ data.end_time }}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="column">
                            <div class="column-cell">
                              {{ data.total_hours }}
                            </div>
                          </div>
                        </td>
                      </div>
                    </div>
                  </div>
                </td>

                <td>{{ data.total_hours }}</td>
                <td>{{ data.total_cost }}</td>
                <td>{{ data.approved_by }}</td>
                <th>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" />
                  </div>
                </th>
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
    <div class="mx-3" style="text-align: right" v-if="candidateList.length >= 8">
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
        :disabled="currentPage * itemsPerPage >= candidateList.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import AppointmentAdd from "../modals/Schedule/EditAssignedShift.vue";
import Navbar from "../Navbar.vue";
import WeekTimeSheetEdit from "../modals/TimeSheet/WeekTimeSheetEdit.vue";

export default {
  data() {
    return {
      startDate: new Date(),
      endDate: { value: "", display: "" },
      currentDate: new Date(),
      selectedDate: null,
      candidateList: [],
      selectedCandidateId: null,
      selectedCandidate: null,
      business_unit_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      statusForSelectedDate: null,
      vacancyList: [],
      currentPage: 1,
      itemsPerPage: 5,
      showFilters: false,
      errorMessage: "",
    };
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.candidateList.slice(startIndex, endIndex);
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
    selectedDateRow() {
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];

      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);
        selectedDateRow.push(`${currentDate.getDate()}`);
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
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
    },
    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },

    selectCandidateList() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },
  },

  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
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
        const response = await axios.get(`${VITE_API_URL}/business_units`);
        this.businessUnit = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    moveToPrevious() {
      if (!this.formattedStartDate || !this.formattedEndDate) {
        return;
      }

      const startDateParts = this.formattedStartDate.split("/");
      const endDateParts = this.formattedEndDate.split("/");
      const formattedStartDate =
        startDateParts[2] + "-" + startDateParts[1] + "-" + startDateParts[0];
      const formattedEndDate =
        endDateParts[2] + "-" + endDateParts[1] + "-" + endDateParts[0];

      const startDate = new Date(formattedStartDate);
      const endDate = new Date(formattedEndDate);

      startDate.setDate(startDate.getDate() - 7);
      endDate.setDate(endDate.getDate() - 7);

      this.startDate = startDate;
      this.endDate = endDate;
      this.fetWeekTimeSheetData();
    },
    moveToNext() {
      if (!this.formattedStartDate || !this.formattedEndDate) {
        return;
      }

      const startDateParts = this.formattedStartDate.split("/");
      const endDateParts = this.formattedEndDate.split("/");
      const formattedStartDate =
        startDateParts[2] + "-" + startDateParts[1] + "-" + startDateParts[0];
      const formattedEndDate =
        endDateParts[2] + "-" + endDateParts[1] + "-" + endDateParts[0];

      const startDate = new Date(formattedStartDate);
      const endDate = new Date(formattedEndDate);

      startDate.setDate(startDate.getDate() + 7);
      endDate.setDate(endDate.getDate() + 7);

      this.startDate = startDate;
      this.endDate = endDate;
      this.fetWeekTimeSheetData();
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

    saveToLocalStorage() {
      localStorage.setItem(
        "calendarData",
        JSON.stringify({
          startDate: this.startDate,
          endDate: this.endDate.value,
        })
      );
    },
    loadStoredData() {
      const storedData = localStorage.getItem("calendarData");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.startDate = parsedData.startDate;
        this.endDate.value = parsedData.endDate;
      }
    },
    updateSelectedDateRow(startDate, endDate) {
      const selectedDateRow = [];

      const dayOfWeek = startDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i - startDay);
        selectedDateRow.push(`${currentDate.getDate()}`);
      }

      Vue.set(this, "selectedDateRow", selectedDateRow);
    },
    formatDate(day) {
      const selectedDate = new Date(this.startDate);
      selectedDate.setDate(day);
      return selectedDate.toLocaleDateString();
    },

    openModal(candidateId, day) {
      try {
        const actualCandidateId = candidateId.id;
        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day));

        this.selectedDate = selectedDate.toISOString().split("T")[0];
        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.id === actualCandidateId
        );

        if (selectedCandidate) {
          this.$nextTick(() => {
            this.selectedCandidate = selectedCandidate;
          });
        } else {
          this.selectedDate = null;
          this.statusForSelectedDate = null;
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
    // filterData() {
    //   let filterType = "";
    //   let filterValue = "";

    //   if (this.business_unit_value !== "") {
    //     filterType = "business_unit";
    //     filterValue = this.business_unit_value;
    //   } else if (this.selectedCandidate !== "") {
    //     filterType = "candidate";
    //     filterValue = this.selectedCandidate;
    //   }

    //   this.makeFilterAPICall(filterType, filterValue);
    // },
    // async makeFilterAPICall(filterType, filterValue) {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/filter_sign_timesheets`, {
    //       params: {
    //         filter_type: filterType,
    //         filter_value: filterValue,
    //       },
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     });
    //     this.getSignedTimeSheetData = response.data.sign_timesheets;
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       const errorMessages = error.response.data.error;
    //       if (errorMessages === "No records found for the given filter") {
    //         alert("No records found for the given filter");
    //       } else {
    //         alert(errorMessages);
    //       }
    //     } else {
    //       // Handle other errors
    //       // console.error("Error filtering custom timesheets:", error);
    //     }
    //   }
    // },
    async fetWeekTimeSheetData() {
      try {
        const requestData = {
          date: this.formattedStartDate,
        };

        const response = await axios.get(
          `${VITE_API_URL}/find_timesheets_according_week`,
          {
            params: requestData,
          }
        );
        this.candidateList = response.data.sign_timesheets;
        if (this.candidateList.length === 0) {
          this.errorMessage = "No Weekly timesheets found for the specified Week";
        } else {
          this.errorMessage = "";
        }
      } catch (error) {}
    },
  },
  components: {
    WeekTimeSheetEdit,
    Navbar,
  },
  mounted() {
    this.loadStoredData();
    this.getBusinessUnitMethod();

    this.getCandidateListMethod();
    window.addEventListener("beforeunload", this.saveToLocalStorage);

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    this.startDate = startOfWeek;
    this.fetWeekTimeSheetData();
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
  padding-top: 65px;
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
  padding: 20px 20px;
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
</style>
