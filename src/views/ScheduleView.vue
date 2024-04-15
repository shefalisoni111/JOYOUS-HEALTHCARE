<template>
  <div>
    <Navbar />
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2 pt-3">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Schedule</span>
              </li>
            </ol>
          </div>
          <div class="d-flex align-items-center">
            <button
              type="button"
              class="btn btn-primary text-nowrap border-0"
              data-bs-toggle="modal"
              data-bs-target="#schedulePublishStaffList"
              data-bs-whatever="@mdo"
            >
              Publish
            </button>
          </div>
        </div>
        <div class="row">
          <div class="full-page-calendar">
            <!-- <div class="calendar-header">
               <span
                v-if="currentView === 'weekly' && startDate && endDate"
                class="fw-bold"
              >
                {{
                  "Monday " + formatDate(startDate) + " to Sunday " + formatDate(endDate)
                }} </span
              >&nbsp; &nbsp; &nbsp;&nbsp; -->

            <!-- <input
                type="date"
                v-model="startDate"
                @change="updateDateRange"
                class="dateInput"
              /> 
            </div> -->

            <!-- <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <div class="close d-flex justify-content-between my-3">
                  <h3 class="d-flex align-items-center mb-0">Edit Assigned Shift -</h3>
                  <span class="close text-white" @click="closeModal">&times;</span>
                </div>

                <h4 class="text-capitalize">{{ getCandidateName() }}</h4>
               <p>You clicked on {{ selectedDate }}</p>
                <p>Status: {{ statusForSelectedDate }}</p>

                <ScheduleDirectAssignList
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId"
                  @closeModal="closeModal"
                />
              </div>
            </div> -->
            <div>
              <EditAssignShceduleVaacncy
                :vacancyId="parseInt(vacancyId)"
                :candidateId="selectedCandidateId"
              />
              <!-- <template v-if="isModalOpen">
                <EditAssignShceduleVaacncy />
              </template> -->
              <!-- <template>
                <ScheduleDirectAssignList
                  :columnDateMatch="columnDateMatch"
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId"
                  :candidateJob="candidateJob"
                  @closeModal="closeModal"
                />
              </template> -->
            </div>
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
                    <span v-if="isOpen" class="text-danger fs-5 ps-2">Filter </span>
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
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-person-fill"
                        style="border-radius: 50%; background: #ffeb3b; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select v-model="job_id" id="selectJobTitle" class="form-select">
                        <option value="" selected>Select Jobs</option>
                        <option
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
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-briefcase-fill"
                        style="border-radius: 50%; background: #ff6d3f; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="business_unit_id"
                        id="selectBusinessUnit"
                        class="form-select"
                      >
                        <option value="" selected>Select BusinessUnit</option>
                        <option
                          v-for="option in businessUnit"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-content" :class="{ 'slide-left': isOpen }">
                <table class="table">
                  <thead>
                    <tr>
                      <th style="width: 15%">
                        <div class="d-flex justify-content-between">
                          <div class="d-flex align-items-center">Shifts</div>
                          &nbsp; &nbsp; &nbsp;&nbsp;
                          <div class="d-flex align-items-center fs-4">
                            <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                            <i class="bi bi-calendar2-check-fill"></i>
                            <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                          </div>
                        </div>
                      </th>

                      <th>
                        <div class="calendar-grid">
                          <div v-for="day in daysOfWeek" :key="day" class="day-header">
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
                  <tbody>
                    <tr>
                      <td style="border-right: 1px solid rgb(209, 208, 208)">
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
                      </td>
                      <td>
                        <div
                          class="calendar-grid"
                          style="max-height: 90px; overflow-y: auto; overflow-x: hidden"
                        >
                          <div v-for="(data, index) in vacancyList" :key="index">
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="text-center"
                            >
                              <ul
                                v-if="data.date === formattedDate(day)"
                                class="list-unstyled mb-0"
                              >
                                <li
                                  class="position-relative"
                                  v-for="(vacancy, liIndex) in data.vacancies"
                                  :key="vacancy.id"
                                  :draggable="true"
                                  @dragstart="handleDragStart(vacancy)"
                                  @drop="handleRevertDrop(data.candidate_id, $event)"
                                  @dragover.prevent="handleDragOver"
                                  :class="{
                                    'bg-info': liIndex === 0,
                                    'bg-warning': liIndex === 1,
                                    'bg-success': liIndex === 2,
                                    'bg-primary': liIndex >= 3,
                                  }"
                                >
                                  <span class="d-flex flex-column align-items-baseline">
                                    <span class="text-capitalize"
                                      >{{ vacancy.business_unit }},{{
                                        vacancy.job_title
                                      }}</span
                                    >

                                    <span class="">{{
                                      extractTimeRange(vacancy.shift)
                                    }}</span>
                                  </span>
                                  <span class="staff-count-round text-white">{{
                                    vacancy.staff_required
                                  }}</span>
                                </li>
                                <!-- <li>business_unit</li> -->
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr v-for="data in paginateCandidates" :key="data.id">
                      <div
                        class="text-capitalize fw-bold"
                        style="border-right: 1px solid rgb(209, 208, 208)"
                      >
                        {{ data.candidate_name }}

                        <span class="fs-6 text-muted fw-100"
                          ><br /><span
                            style="background: rgb(209, 207, 207); padding: 3px"
                            >{{ data.job }}</span
                          ></span
                        >
                      </div>

                      <td>
                        <div>
                          <div
                            class="calendar-grid"
                            @dragover.prevent="handleDragOver"
                            @drop="handleDrop(data.candidate_id)"
                          >
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="pt-2"
                              data-bs-toggle="modal"
                              data-bs-target="#scheduleDirectAssignList"
                              data-bs-whatever="@mdo"
                              @click="openModal(data, formattedDate(day))"
                              :class="{
                                'calendar-day': true,
                                clickable: day !== '',
                              }"
                            >
                              <span v-for="avail in data.availability" :key="avail.id">
                                <span v-if="avail.date === formattedDate(day)">
                                  <span
                                    v-if="avail.status"
                                    style="font-size: small; padding: 0px 5px"
                                    v-bind:class="{
                                      'btn btn-warning ': avail.status === 'Late',
                                      'btn btn-primary ': avail.status === 'Unavailable',
                                      'btn btn-secondary ': avail.status === 'Night',
                                      'btn btn-light ': avail.status === 'Early',
                                    }"
                                  >
                                    {{
                                      avail.status ? avail.status[0].toUpperCase() : ""
                                    }}
                                  </span>
                                </span>
                              </span>
                              &nbsp;&nbsp;
                              <span v-for="assign in assignStaffDisplay" :key="assign.id">
                                <span v-if="data.candidate_id === assign.candidate_id">
                                  <span v-for="data in assign.vacancies" :key="data.id">
                                    <span v-for="date in data.dates" :key="date">
                                      <span
                                        v-if="formatDates(date) === formattedDate(day)"
                                      >
                                        <span
                                          :draggable="true"
                                          @dragstart="
                                            handleDragRevert(data, assign.candidate_id)
                                          "
                                        >
                                          <div
                                            data-bs-toggle="modal"
                                            data-bs-target=" #editAssignScheduleVacancy"
                                            data-bs-whatever="@mdo"
                                            @click="openModal(data, formattedDate(day))"
                                            :class="{
                                              'calendar-day': true,
                                              clickable: day !== '',
                                            }"
                                          >
                                            <span
                                              class="assignVacancyDesign mt-1 text-capitalize"
                                            >
                                              {{ data.business_unit }}, &nbsp;
                                              {{ data.job_title }}<br />
                                            </span>
                                          </div>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>

                              <div
                                v-if="dropCandidateId === data.id && dropDay === day"
                                class="drop-zone"
                              >
                                {{ droppedContent }}
                              </div>
                            </div>
                          </div>
                        </div>
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
      <SchedulePublishStaffList />
      <!-- <EditAssignedShift /> -->
      <SuccessAlert ref="successAlert" />

      <ScheduleDirectAssignList
        :columnDateMatch="columnDateMatch"
        :initialDate="selectedDate"
        :candidateId="selectedCandidateId"
        :candidateJob="candidateJob"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditAssignShceduleVaacncy from "../components/modals/Schedule/EditAssignShceduleVaacncy.vue";
import ScheduleDirectAssignList from "../components/modals/Schedule/ScheduleDirectAssignList.vue";
import Navbar from "../components/Navbar.vue";
import SchedulePublishStaffList from "../components/modals/Schedule/SchedulePublishStaffList.vue";
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";

export default {
  data() {
    return {
      isOpen: false,
      currentView: "weekly",
      startDate: new Date(),
      endDate: new Date(),
      currentDate: new Date(),
      selectedDate: new Date(),
      candidateJob: null,
      vacancyId: null,
      candidateList: [],
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
      itemsPerPage: 7,
      options: [],
      job_id: "",
      business_unit_id: "",
      assignedCandidateList: [],
      businessUnit: [],
      isModalOpen: false,
      flattenedAssignVacancies: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
    };
  },

  computed: {
    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },
    selectJobTitle() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
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
    // selectedCandidate() {
    //   return this.candidateList.find(
    //     (candidate) => candidate.id === this.selectedCandidateId
    //   );
    // },
    // selectedVacancy() {
    //   // return this.flattenedAssignVacancies.find(
    //   //   (vacancies) => vacancies.id === this.vacancyId
    //   // );
    //   console.log(this.flattenedAssignVacancies);
    // },

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
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
    },
    filteredAssignStaff() {
      return function (candidateId) {
        return this.assignStaffDisplay.filter(
          (assign) => assign.candidate_id === candidateId
        );
      };
    },
    // filteredVacancyIdAssignStaff(vacancyId) {
    //   return this.assignStaffDisplay.filter((assign) =>
    //     assign.vacancies.some((vacancy) => vacancy.id === this.vacancyId)
    //   );
    // },
  },
  watch: {
    columnDateMatch() {
      this.filteredVacancies();
    },
  },
  methods: {
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
        // let activatedStatus = null;

        // if (this.activeTab === 1) {
        //   activatedStatus = true;
        // } else if (this.activeTab === 2) {
        //   activatedStatus = false;
        // } else if (this.activeTab === 3 || this.activeTab === 4) {
        //   await this.searchByStatus();
        //   return;
        // } else if (this.activeTab === 0) {
        //   const response = await axiosInstance.get(
        //     `${VITE_API_URL}/search_candidate/${this.searchQuery}`
        //   );

        //   this.searchResults = response.data.candidate;
        // } else {
        //   activatedStatus = this.activeTab === 1 ? true : false;
        // }

        const response = await axiosInstance.get(
          `${VITE_API_URL}/candidate_searching_active_and_inactive`,
          {
            params: {
              candidate_query: this.searchQuery,
              activated: true,
            },
          }
        );

        this.searchResults = response.data;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    extractTimeRange(shift) {
      if (shift.includes("Holiday")) {
        if (shift.includes("Day Shift")) {
          return shift.replace("Holiday Day Shift", "Holiday Night Shift").split(" ")[3];
        } else if (shift.includes("Night Shift")) {
          return shift.replace("Holiday Night Shift", "Holiday Day Shift").split(" ")[3];
        }
      } else if (shift.includes("Day Shift")) {
        return shift.split(" ")[2];
      } else if (shift.includes("Night Shift")) {
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
    filteredVacancies() {
      return this.vacancyList.filter((item) => item.date == this.columnDateMatch);
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
          this.fetchAssignList();
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorMessage = error.response.data.error;
          alert(errorMessage);
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
          `${VITE_API_URL}/assign_vacancy_with_schedule`,
          payload
        );

        if (response.status >= 200 && response.status < 300) {
          const message = "Staff Assigned Shift Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.fetchCandidateList();
          this.fetchAssignList();
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorMessage = error.response.data.error;

          alert(errorMessage);
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
        if (this.selectedCandidate.first_name && this.selectedCandidate.last_name) {
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

    async openModal(candidateId, day) {
      // this.vacancyId = candidateId.id.toString();
      // this.columnDateMatch = day !== null ? day.toString() : "";
      // this.selectedCandidateId = candidateId.candidate_id.toString();
      // this.candidateJob = candidateId.job;
      // if (candidateId && candidateId.id) {
      //   this.vacancyId = candidateId.id;
      // } else {
      //   return;
      // }
      if (!candidateId || !candidateId.candidate_id) {
        return;
      }

      this.columnDateMatch = day !== null ? day.toString() : "";
      this.selectedCandidateId = candidateId.candidate_id.toString();
      this.candidateJob = candidateId.job;
      this.vacancyId = candidateId.id;
      if (candidateId && candidateId.id) {
        // this.vacancyId = candidateId.id;
      } else {
        return;
      }

      if (candidateId && candidateId.job !== undefined && candidateId.job !== null) {
        this.candidateJob = candidateId.job.toString();
      } else {
        this.candidateJob = "";
      }

      try {
        const actualCandidateId = candidateId.candidate_id.toString();

        await this.fetchVacancyListMethod();

        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day));
        selectedDate.setDate(selectedDate.getDate() + 1);

        this.selectedDate = selectedDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.candidate_id === actualCandidateId
        );

        const vacancy = this.vacancyList.find(
          (vacancy) => vacancy.date === this.columnDateMatch
        );

        if (selectedCandidate) {
          this.currentSelectedCandidate = selectedCandidate;
        } else {
          this.selectedDate = null;
          this.statusForSelectedDate = null;
        }

        if (vacancy && vacancy.dates.includes(this.formatDates(day))) {
          this.statusForSelectedDate = "Vacancy Available";
        } else {
          this.statusForSelectedDate = "No Vacancy";
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
      this.isModalOpen = false;
    },
    async fetchAssignList() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_assign_vacancies_and_candidates`
        );
        this.assignStaffDisplay = response.data.vacancies;

        const vacanciesInsideVacancies = response.data.vacancies.map((item) => {
          return item.vacancies;
        });

        this.flattenedAssignVacancies = vacanciesInsideVacancies.flat();
        // this.fetchAssignList();
      } catch (error) {}
    },
    async fetchCandidateList() {
      try {
        const requestData = {
          date: this.formattedStartDate,
        };

        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`,
          {
            params: requestData,
          }
        );
        this.candidateList = response.data.data;
        // console.log(this.candidateList);
        // this.candidateList.forEach((candidate) => {
        //   candidate.availabilityByDate = {};
        //   candidate.availability.forEach((avail) => {
        //     candidate.availabilityByDate[avail.date] = avail.status;
        //   });
        // });

        this.availabilityIds = this.candidateList.map((candidate) => {
          return candidate.availability.map(
            (availabilityItem) => availabilityItem.availability_id
          );
        });
        // this.fetchAssignList();
      } catch (error) {}
    },
    async fetchVacancyListMethod() {
      try {
        const requestData = {
          date: this.formattedStartDate,
        };
        const response = await axios.get(
          `${VITE_API_URL}/vacancies_and_candidates_availability`,
          {
            params: requestData,
          }
        );
        this.vacancyList = response.data.data;
        this.fetchCandidateList();
        this.fetchAssignList();
        // this.fetchAssignVacancyStaffList();
      } catch (error) {
        // console.error("Error in fetchVacancyListMethod:", error);
      }
    },
    // async fetchAssignVacancyStaffList() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/find_assign_vacacy_and_candidate`
    //     );
    //     this.assignedCandidateList = response.data.candidates;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
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
  },
  components: {
    EditAssignShceduleVaacncy,
    Navbar,
    ScheduleDirectAssignList,
    SchedulePublishStaffList,
    SuccessAlert,
  },
  mounted() {
    this.loadDateRangeFromLocalStorage();
    this.fetchCandidateList();
    this.fetchAssignList();
    this.getBusinessUnitMethod();
    // this.fetchAssignVacancyStaffList();
    this.getJobTitleMethod();

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    this.startDate = startOfWeek;

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    this.endDate = endOfWeek;
    this.fetchVacancyListMethod();
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
  font-size: larger;
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
