<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid px-5 pt-3">
        <div class="row pagetitle d-flex justify-content-between pt-3 px-1">
          <div class="">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active fs-6">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >Schedule</a
                >
              </li>
            </ol>
          </div>

          <div class="d-flex align-items-center gap-2">
            <div>
              <!-- <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              v-model="searchQuery"
              @input="debounceSearch"
            />
          </form> -->
            </div>
            <!-- <button
          type="button"
          class="btn btn-primary text-nowrap border-0"
          data-bs-toggle="modal"
          data-bs-target="#schedulePublishStaffList"
          data-bs-whatever="@mdo"
          @click="handleShiftPublishStaffList"
        >
          Publish
        </button> -->
          </div>
        </div>

        <div>
          <div class="sidebar-button" :class="{ 'slide-left': isOpen }">
            <div class="d-flex justify-content-end">
              <div class="mb-2">
                <button
                  @click="toggleSidebar"
                  class="btn btn-danger text-nowrap btn-lg"
                >
                  <i class="bi bi-funnel-fill"></i> Show Filters
                </button>
                <!-- <span v-if="isOpen" class="text-danger fs-5 ps-2">Filter </span> -->
              </div>
              <!-- <div>
            <i
              v-if="isOpen"
              class="bi bi-x float-end fs-2 d-flex cursor-pointer"
              @click="toggleSidebar"
            ></i>
          </div> -->
            </div>
            <div
              v-show="isOpen"
              class="pe-3 pb-3 mt-2 filters"
              style="
                background: #fff;

                display: flex;
                margin-bottom: 20px;
                justify-content: end;
                gap: 20px;
                border-radius: 14px;
              "
            >
              <div class="d-flex mt-2">
                <div>
                  <div class="filters" v-show="isOpen">
                    <select
                      v-model="availability_id"
                      for="SelectAvailability"
                      class="form-select"
                      @change="filterData($event.target.value, 'availablity')"
                    >
                      <option
                        value=""
                        selected
                        for="SelectAvailability"
                        disabled
                      >
                        All Availability
                      </option>
                      <option id="SelectAvailability" value="Late">Late</option>
                      <option id="SelectAvailability" value="Night">
                        Night
                      </option>
                      <option id="SelectAvailability" value="Unavailable">
                        Unavailable
                      </option>
                      <option id="SelectAvailability" value="Early">
                        Early
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex mt-2">
                <div>
                  <div class="filters" v-show="isOpen">
                    <select
                      v-model="job_id"
                      for="selectJobTitle"
                      class="form-select"
                      @change="filterData($event.target.value, 'job')"
                    >
                      <option value="" selected disabled>Select Jobs</option>
                      <option
                        id="selectJobTitle"
                        v-for="option in options"
                        :key="option.name"
                        :value="option.name"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex mt-2">
                <div>
                  <div class="filters" v-show="isOpen">
                    <select
                      v-model="site_shift_id"
                      for="selectBusinessUnit"
                      class="form-select"
                      @change="filterData($event.target.value, 'site')"
                    >
                      <option value="" selected disabled>Select Site</option>
                      <option
                        id="selectBusinessUnit"
                        v-for="option in businessUnit"
                        :key="option.site_name"
                        :value="option.site_name"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="d-flex mt-2">
                <div>
                  <div class="filters" v-show="isOpen">
                    <select
                      v-model="site_id"
                      for="selectShifts"
                      class="form-select"
                      @change="filterData($event.target.value, 'shift')"
                    >
                      <option value="" selected disabled>All Shift</option>
                      <option
                        v-for="option in shiftsTime"
                        :key="option.shift_name"
                        :value="option.shift_name"
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

              <div>
                <div class="filters" v-show="isOpen">
                  <button
                    :disabled="!isFilterSelected"
                    @click="resetFilters"
                    class="btn btn-secondary text-nowrap btn-lg"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="full-page-calendar">
            <!-- <SchedulePublishStaffList
          @updated-assignPublish="fetchAssignList"
          ref="shiftPublishStaff"
        /> -->

            <SuccessAlert ref="successAlert" />
            <div>
              <EditAssignShceduleVaacncy
                ref="editAssignScheduleShift"
                :vacancyId="String(vacancyId)"
                :candidateId="selectedCandidateId"
                :columnDateMatch="columnDateMatch"
                @updated-assign="fetchAssignList"
                :status="bookingStatus"
              />
              <ScheduleDirectAssignList
                ref="directAssignShiftList"
                @Candidate-updated="fetchAssignList"
                :vacancyId="String(vacancyId)"
                :columnDateMatch="columnDateMatch"
                :initialDate="selectedDate"
                :candidateId="selectedCandidateId"
                :candidateJob="candidateJob"
                @closeModal="closeModal"
              />
            </div>
          </div>
          <div
            class="table-wrapper"
            style="background: #fff; padding: 20px; border-radius: 14px"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="calendar-header w-100 d-flex justify-content-center">
                <div class="d-flex">
                  &nbsp;&nbsp;

                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <i
                      class="bi bi-caret-left-fill"
                      @click="moveToPrevious"
                      style="cursor: pointer"
                    ></i>
                    &nbsp;
                    <img
                      src="../assets/calender.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                    &nbsp;
                    <span class="fw-bold fs-5">
                      {{ formatMonthYear(currentDate) }}
                    </span>
                    &nbsp;
                    <i
                      class="bi bi-caret-right-fill"
                      @click="moveToNext"
                      style="cursor: pointer"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebar-container scheduleTable">
              <div class="sidebar-content" :class="{ 'slide-left': isOpen }">
                <div class="table-container table-responsive">
                  <table class="table" v-if="!searchQuery">
                    <thead>
                      <tr>
                        <th style="width: 15%">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">Shifts</div>
                            <!-- &nbsp; &nbsp; &nbsp;&nbsp;
                        <div class="d-flex align-items-center fs-4">
                          <i
                            class="bi bi-caret-left-fill"
                            @click="moveToPrevious"
                          ></i>
                          <i class="bi bi-calendar2-check-fill"></i>
                          <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                        </div> -->
                          </div>
                        </th>

                        <th>
                          <div class="calendar-grid" v-if="!searchQuery">
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

                    <tbody v-if="candidateList?.length > 0" class="mt-2">
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

                      <tr v-for="data in candidateList" :key="data.id">
                        <div
                          class="text-capitalize fw-bold"
                          style="
                            border: 1px solid rgb(209, 208, 208);
                            height: 143px;
                            width: 225px;
                            border-radius: 10px;
                          "
                        >
                          {{ data.candidate_name }}

                          <span class="fs-6 text-muted fw-100"
                            ><br /><span
                              style="
                                background: rgb(209, 207, 207);
                                padding: 3px;
                              "
                              >{{ data.job }}</span
                            ></span
                          >
                        </div>

                        <td>
                          <div>
                            <div
                              class="calendar-grid"
                              @dragover.prevent="handleDragOver"
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
                                @drop="handleDrop(data, formattedDate(day))"
                              >
                                <span
                                  v-for="avail in data.availability"
                                  :key="avail.id"
                                >
                                  <span
                                    v-if="avail.date === formattedDate(day)"
                                  >
                                    <span>
                                      <span
                                        v-if="avail.status"
                                        style="
                                          font-size: small;
                                          padding: 0px 5px;
                                        "
                                        v-bind:class="{
                                          'btn btn-warning ':
                                            avail.status === 'Late',
                                          'btn btn-primary ':
                                            avail.status === 'Unavailable',
                                          'btn btn-secondary ':
                                            avail.status === 'Night',
                                          'btn btn-light ':
                                            avail.status === 'Early',
                                        }"
                                      >
                                        {{
                                          avail.status
                                            ? avail.status[0].toUpperCase()
                                            : ""
                                        }}
                                      </span>
                                    </span>
                                  </span>
                                </span>
                                &nbsp;&nbsp;

                                <span
                                  v-for="assign in assignStaffDisplay"
                                  :key="assign.id"
                                >
                                  <span
                                    v-if="
                                      data.candidate_id === assign.candidate_id
                                    "
                                  >
                                    <span
                                      v-for="data in assign.vacancies"
                                      :key="data.id"
                                    >
                                      <span
                                        v-for="date in data.dates"
                                        :key="date"
                                      >
                                        <span
                                          v-if="
                                            formatDates(date) ===
                                            formattedDate(day)
                                          "
                                        >
                                          <span
                                            :draggable="
                                              getBookingStatus(
                                                data,
                                                formattedDate(day)
                                              ) !== 'Booked'
                                            "
                                            @dragstart="
                                              getBookingStatus(
                                                data,
                                                formattedDate(day)
                                              ) !== 'Booked' &&
                                                handleDragRevert(
                                                  data,
                                                  assign.candidate_id
                                                )
                                            "
                                          >
                                            <div
                                              data-bs-toggle="modal"
                                              data-bs-target=" #editAssignScheduleVacancy"
                                              data-bs-whatever="@mdo"
                                              @click="
                                                () => {
                                                  const status =
                                                    getBookingStatus(
                                                      data,
                                                      formattedDate(day)
                                                    );
                                                  openModalEdit(
                                                    data,
                                                    formattedDate(day),
                                                    status
                                                  );
                                                }
                                              "
                                              class="position-relative"
                                              :class="{
                                                'calendar-day': true,
                                                clickable: day !== '',
                                              }"
                                            >
                                              <span
                                                class="assignVacancyDesign mt-1 text-capitalize d-flex justify-content-center"
                                              >
                                                {{ data.site }},
                                                <!-- {{ extractTimeRange(data.site_shift)
                                              }} -->
                                                <br />
                                                {{
                                                  data.site_shift?.replace(
                                                    /_/g,
                                                    " "
                                                  )
                                                }}, {{ data.job_title }} &nbsp;

                                                <br />
                                              </span>

                                              <span
                                                class="bg-success text-white position-absolute top-0 clickable"
                                                style="
                                                  padding: 3px 6px;
                                                  border-radius: 10px;
                                                  color: #fff;

                                                  right: 0;
                                                  font-size: larger;
                                                "
                                                v-if="
                                                  getBookingStatus(
                                                    data,
                                                    formattedDate(day)
                                                  )
                                                "
                                              >
                                                {{
                                                  getBookingStatus(
                                                    data,
                                                    formattedDate(day)
                                                  )
                                                }}
                                              </span>
                                            </div>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>

                                <div
                                  v-if="
                                    dropCandidateId === data.id &&
                                    dropDay === day
                                  "
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
                    <tbody v-else>
                      <tr v-if="!isLoading">
                        <td colspan="7" class="text-danger text-center">
                          {{ "Data Not found!" }}
                        </td>
                      </tr>
                      <!-- <tr v-else>
                  <td colspan="8" class="text-danger text-center">
                    {{ errorMessageCustom }}
                  </td>
                </tr> -->
                    </tbody>
                  </table>
                  <loader :isLoading="isLoading"></loader>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mx-3 mb-3 d-flex justify-content-between mt-3 mb-4"
          style="text-align: right"
          v-if="candidateList?.length"
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditAssignShceduleVaacncy from "../components/modals/Schedule/EditAssignShceduleVaacncy.vue";
import ScheduleDirectAssignList from "../components/modals/Schedule/ScheduleDirectAssignList.vue";
import Navbar from "../components/Navbar.vue";
// import SchedulePublishStaffList from "../components/modals/Schedule/SchedulePublishStaffList.vue";
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
import Loader from "../components/Loader/Loader.vue";
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";

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
      isFetching: false,
      currentView: "weekly",
      startDate: new Date(),
      currentDate: new Date(),
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
      hasMore: true,
      isFetching: false,
      assignedCandidateList: [],
      businessUnit: [],
      isModalOpen: false,
      flattenedAssignVacancies: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      bookingStatus: "",
      ColumnDateMatchDates: [],
      isLoading: false,
      matchingBookingData: {},
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalCandidateCount / this.itemsPerPage);
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

    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
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
    // filteredAssignStaff() {
    //   return function (candidateId) {
    //     return this.assignStaffDisplay.filter(
    //       (assign) => assign.candidate_id === candidateId
    //     );
    //   };
    // },
    isFilterSelected() {
      return (
        this.filters.availablity !== "" ||
        this.filters.job !== "" ||
        this.filters.site !== "" ||
        this.filters.shift !== "" ||
        this.filters.status !== ""
      );
    },
  },
  watch: {
    startDate(newVal) {
      this.currentDate = new Date(newVal);
    },
    columnDateMatch() {
      // this.filteredVacancies();
    },
    // totalCandidateCount(newCount) {
    //   this.totalPages = Math.ceil(newCount / this.itemsPerPage);
    // },
    matchingBookingData(newVal) {
      if (newVal) {
        this.updateBookingData(newVal);
      }
    },
  },
  methods: {
    resetFilters() {
      this.filters.availablity = "";
      this.availability_id = "";
      this.site_id = "";
      this.site_shift_id = "";
      this.job_id = "";
      this.filters.job = "";
      this.filters.site = "";
      this.filters.shift = "";
      this.filters.status = "";

      // this.currentPage = 1;
      this.makeFilterAPICall();
      // this.fetchAssignList();
    },
    getBookingStatus(data, date) {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];

      if (new Date(date) < new Date(formattedToday)) {
        return "";
      }

      if (data.booking_status && typeof data.booking_status === "object") {
        if (data.booking_status.status === "accepted") {
          return "Booked";
        } else if (data.booking_status.status === "assigned") {
          return "";
        }
      }

      return null;
    },

    isTodayOrGreaterThanToday(day) {
      const today = new Date();
      const formattedToday = this.formattedDate(today);
      const formattedDay = this.formattedDate(day);
      return formattedDay >= formattedToday;
    },

    isVacancyForToday(dataDay, selectedDay) {
      return this.formattedDate(dataDay) === this.formattedDate(selectedDay);
    },
    handleShiftPublishStaffList() {
      this.$refs.shiftPublishStaff.getPublishStaffListMethod();
    },
    filterData(value, filterType) {
      this.filters[filterType] = value;

      this.makeFilterAPICall();
    },

    async makeFilterAPICall() {
      const requestData = {
        availablity: this.filters.availablity,
        job: this.filters.job,
        site: this.filters.site,
        shift: this.filters.shift,
        status: this.filters.status,
        date: this.formattedStartDate,
        page: this.currentPage,
        per_page: this.itemsPerPage,
      };

      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates_availability_vacancies`,
          {
            params: {
              // currentPage: this.currentPage,
              ...requestData,
            },
          }
        );

        this.candidateList = response.data.data;
        this.totalCandidateCount = response.data.total_count;
        // this.totalPages = Math.ceil(this.totalCandidateCount / this.itemsPerPage);
        // this.currentPage = response.data.current_page;
        this.searchResults = response.data.data;
        this.vacancyList = response.data.vacancies;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            errorMessages === "No records found for the given filter";
          } else {
            errorMessages === "No records found for the given filter";
          }
        } else {
          // console.error("An error occurred:", error);
        }
      }
    },
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
      // this.fetchAssignList();
      this.getBusinessUnitMethod();
      this.getJobTitleMethod();
      this.getTimeShift();
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
      this.fetchCandidateList();
      this.fetchVacancyListMethod();
    },
    formatMonthYear(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(date);
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
          this.fetchAssignList();
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
    async handleDrop(candidateId, date) {
      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: candidateId.candidate_id,
          // date: date,
        };

        const response = await axios.post(
          `${VITE_API_URL}/assign_vacancy_with_schedule`,
          payload
        );

        if (response.status >= 200 && response.status < 300) {
          const message = "Staff Assigned Shift Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.fetchCandidateList();
          this.fetchVacancyListMethod();
          // this.fetchAssignList(candidateId.candidate_id);
        }
      } catch (error) {
        let errorMessage;
        if (
          error.response &&
          error.response.status === 422 &&
          typeof error.response.data === "object" &&
          error.response.data.error &&
          error.response.data.error.base &&
          Array.isArray(error.response.data.error.base) &&
          error.response.data.error.base.length > 0
        ) {
          errorMessage = error.response.data.error.base[0];
        } else {
          errorMessage = error.response.data.error;
        }
        // alert(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
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

    async openModalEdit(candidateId, day, status) {
      this.bookingStatus = status;
      if (this.$refs.editAssignScheduleShift) {
        await this.$refs.editAssignScheduleShift.fetchVacancyIdMethod();
        await this.$refs.editAssignScheduleShift.getJobTitleMethod();
        // await this.$refs.editAssignScheduleShift.fetchVacancyListMethod();
        await this.$refs.editAssignScheduleShift.fetchAssignList();
      }

      this.vacancyId = candidateId.id.toString() || "";
      if (!candidateId || !candidateId.candidate_id) {
        return;
      }

      this.columnDateMatch = day !== null ? day.toString() : "";
      this.selectedCandidateId = candidateId.candidate_id.toString();
      this.candidateJob = candidateId.job;

      if (candidateId && candidateId.id) {
        // this.vacancyId = candidateId.id;
      } else {
        return;
      }

      if (
        candidateId &&
        candidateId.job !== undefined &&
        candidateId.job !== null
      ) {
        this.candidateJob = candidateId.job.toString();
      } else {
        this.candidateJob = "";
      }

      try {
        const actualCandidateId = candidateId.candidate_id.toString();

        // await this.fetchVacancyListMethod();
        // await this.fetchCandidateList();
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
          (vacancy) => vacancy.day === this.columnDateMatch
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
    async openModal(candidateId, day) {
      // const today = new Date();
      // const selectedDate = new Date(day);

      // // Ensure the selected date is not in the past
      // if (selectedDate < today) {
      //   Swal.fire({
      //     title: "Invalid Date",
      //     text: "You cannot select a past date.",
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
      //   return;
      // }

      // this.$refs.directAssignShiftList.fetchVacancyListMethod();

      if (!candidateId || !candidateId.candidate_id) {
        return;
      }

      this.columnDateMatch = day !== null ? day.toString() : "";
      this.selectedCandidateId = candidateId.candidate_id.toString();
      this.candidateJob = candidateId.job;

      if (candidateId && candidateId.id) {
        // this.vacancyId = candidateId.id;
      } else {
        return;
      }

      if (
        candidateId &&
        candidateId.job !== undefined &&
        candidateId.job !== null
      ) {
        this.candidateJob = candidateId.job.toString();
      } else {
        this.candidateJob = "";
      }

      const actualCandidateId = candidateId.candidate_id.toString();

      // await this.fetchVacancyListMethod();

      // await this.fetchCandidateList();
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
        (vacancy) => vacancy.day === this.columnDateMatch
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

      // catch (error) {
      //   this.selectedDate = null;
      //   this.statusForSelectedDate = null;
      // }
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
      this.isModalOpen = false;
    },
    async fetchAssignList(candidateId) {
      // console.log(candidateId);
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_assign_vacancies_and_candidates`,
          {
            params: {
              candidate_id: candidateId,
            },
          }
        );
        if (response.data.error) {
          // console.error(response.data.error);

          // this.assignStaffDisplay = [];
          this.flattenedAssignVacancies = [];
          return;
        }
        // this.assignStaffDisplay = response.data.vacancies;

        // const vacanciesInsideVacancies = response.data.vacancies.map((item) => {
        //   return item.vacancies;
        // });

        // this.flattenedAssignVacancies = vacanciesInsideVacancies.flat();

        // console.log(this.assignStaffDisplay);

        // this.fetchAssignList();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return;
        }
      }
    },
    async changePage(page) {
      this.currentPage = page;
      await this.fetchCandidateList();
      await this.fetchVacancyListMethod();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchCandidateList();
      this.fetchVacancyListMethod();
    },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //     this.fetchCandidateList();
    //   }
    // },
    // previousPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //     this.fetchCandidateList();
    //   }
    // },
    async fetchCandidateList() {
      if (!this.hasMore || this.isFetching) return;

      this.isFetching = true;
      this.isLoading = true;
      try {
        const requestData = {
          date: this.formattedStartDate,
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };

        const response = await axios.get(
          `${VITE_API_URL}/candidates_availability_vacancies`,
          {
            params: requestData,
          }
        );

        this.candidateList = response.data.data;
        this.totalCandidateCount = response.data.total_count;
        // this.totalPages = Math.ceil(this.totalCandidateCount / this.itemsPerPage);

        this.searchResults = response.data.data;
        // this.assignStaffDisplay = response.data.vacancies;
        this.vacancyList = response.data.vacancies;
        this.totalCandidateCount = response.data.total_count;
        this.ColumnDateMatchDates = this.candidateList.map((candidate) =>
          candidate.availability.map((avail) => avail.date)
        );
        this.candidateIds = this.candidateList
          .filter((candidate) =>
            candidate.availability.some((avail) => avail.date === selectedDate)
          )
          .map((candidate) => candidate.candidate_id);
        // console.log(this.candidateIds);
        this.availabilityIds = this.candidateList.map((candidate) => {
          return candidate.availability.map(
            (availabilityItem) => availabilityItem.availability_id
          );
        });

        this.availabilityIds = this.searchResults.map((candidate) => {
          return candidate.availability.map(
            (availabilityItem) => availabilityItem.availability_id
          );
        });
        if (newCandidates.length < this.itemsPerPage) {
          this.hasMore = false;
        } else {
          this.currentPage += 1;
        }
        this.fetchAssignList(this.candidateIds);
        // this.currentPage += 1;
      } catch (error) {
      } finally {
        this.isLoading = false;
        this.isFetching = false;
      }
    },
    async fetchVacancyListMethod() {
      // if (this.isFetching) return;
      this.isFetching = true;
      try {
        const requestData = {
          date: this.formattedStartDate,
          // single_date: true,
        };
        const response = await axios.get(
          `${VITE_API_URL}/vacancies_and_candidates_availability`,
          {
            params: requestData,
          }
        );
        // console.log(response.data);
        this.assignStaffDisplay = response.data;
        // this.fetchCandidateList();
        // await this.fetchAssignList();
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
    handleScroll() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrolled >= scrollableHeight - 100) {
        // Load more records when nearing the bottom of the page
        this.fetchCandidateList();
      }
    },
  },
  components: {
    EditAssignShceduleVaacncy,
    Navbar,
    ScheduleDirectAssignList,
    // SchedulePublishStaffList,
    SuccessAlert,
    Loader,
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchAssignList();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.fetchAssignList();
    // this.getBusinessUnitMethod();
    // this.getJobTitleMethod();
    // this.getTimeShift();
    next();
  },
  mounted() {
    this.loadDateRangeFromLocalStorage();

    // this.fetchAssignList();
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

    this.fetchCandidateList();

    //  this.fetchVacancyListMethod();
    // window.addEventListener("scroll", this.handleScroll);
    // document.documentElement.style.overflowY = "hidden";
  },
  // beforeUnmount() {
  //   document.documentElement.style.overflowY = "";
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
};
</script>

<style scoped>
#main {
  background-color: #f9f9f9;
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
  border: 1px solid #dee2e6;
  width: 170px;
  height: 143px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  padding-bottom: 8px;
}
table thead th {
  background: #ffeedb;
}
.calendar-day.clickable {
  cursor: crosshair;
  font-size: 10px;
  color: blue !important;
  font-weight: bold;
}
.table > :not(caption) > * > * {
  border: none;
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
  background: #ffeedb;

  z-index: 100;
}

th {
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
td {
  padding-top: 0px;
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
</style>
