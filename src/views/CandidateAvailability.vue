<template>
  <div>
    <div id="main" class="main p-5">
      <div class="row px-4">
        <div class="pagetitle d-flex justify-content-between p-0">
          <div class="">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000"
                  >All Staff</a
                >
                <p>
                  All Staff /
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/availability"
                    >Staff Availability</router-link
                  >
                </p>
              </li>
            </ol>
          </div>
        </div>
        <div class="row p-0 float-end">
          <div class="col-12 d-flex justify-content-end mb-3">
            <form @submit.prevent="search" class="w-md-auto position-relative">
              <input
                class="form-control form-control-lg pe-5"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                v-model="searchQuery"
                @input="debounceSearch"
              />
              <!-- Search icon inside input -->
              <span
                class="position-absolute top-50 end-0 translate-middle-y pe-3"
              >
                <img
                  src="../assets/Search.png"
                  class="img-fluid"
                  alt="Search"
                  width="20"
                  height="20"
                />
              </span>
            </form>
          </div>
        </div>

        <!-- <div class="row p-0">
          <div class="d-flex align-items-center justify-content-end mb-3 p-0">
            <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
              <input
                class="form-control form-control-lg mr-sm-2"
                type="search"
                placeholder="Search by Name"
                aria-label="Search"
                v-model="searchQuery"
                @input="debounceSearch"
              />
              <span
                class="position-absolute"
                style="transform: translate(1349%, -151%)"
              >
                <img
                  src="../assets/Search.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
              /></span>
            </form>
          </div>
        </div> -->
        <div class="row p-3" style="background: #fff; border-radius: 14px">
          <div class="full-page-calendar">
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
                    &nbsp; &nbsp;
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
            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <div class="d-flex justify-content-between">
                  <h4 class="text-capitalize" style="font-weight: bold">
                    {{ getCandidateName() }}
                  </h4>
                  <button
                    type="button"
                    class="custom-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    @click="closeModal"
                  ></button>
                </div>

                <Calendar
                  :initialDate="selectedDate.toISOString()"
                  :candidateId="selectedCandidateId.toString()"
                  @closeModal="closeModal"
                  :availabilityId="availability_id"
                  :startDate="startDate"
                  :availabilityStatus="statusForSelectedDate"
                  @availability-updated="fetchCandidateList"
                />
              </div>
            </div>
          </div>
          <div class="table-wrapper table-responsive" v-if="!searchQuery">
            <table class="table candidateTable">
              <thead>
                <tr style="background: #ffeedb">
                  <th scope="col">
                    Name
                    <img
                      src="../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
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
                        <img
                          src="../assets/ArrowDown.png"
                          class="img-fluid pe-2"
                          alt="RecPal"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="paginateCandidates?.length > 0">
                <tr v-for="data in paginateCandidates" :key="data.id">
                  <td class="text-capitalize fw-bold" style="width: 21%">
                    {{ data.candidate_name + " " }}
                    <span
                      v-if="data.job"
                      style="background: rgb(209, 207, 207); padding: 3px"
                    >
                      {{ data.job }}
                    </span>
                    <!-- <span class="fs-6 text-muted fw-100"><br />{{ data.job }}</span> -->
                  </td>
                  <td>
                    <div class="calendar-grid">
                      <div
                        v-for="day in selectedDateRow"
                        :key="day"
                        @click="openModal(data, day)"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        class="calendar-day"
                        :class="{ 'calendar-day': true, clickable: day !== '' }"
                      >
                        <span
                          v-for="avail in data.availability"
                          :key="avail.id"
                        >
                          <span v-if="avail.date === formattedDate(day)">
                            <span
                              v-if="
                                avail.candidate_status &&
                                avail.candidate_status.length > 0
                              "
                            >
                              <span
                                v-for="status in avail.candidate_status"
                                :key="status"
                                style="
                                  font-size: small;
                                  padding: 0px 5px;
                                  margin-top: 10px;
                                "
                                class="me-2"
                                v-bind:class="{
                                  'btn btn-warning': status === 'Late',
                                  btn: status === 'U/A',
                                  'btn btn-secondary': status === 'Night',
                                  'btn btn-light': status === 'Early',
                                }"
                                :style="
                                  status === 'U/A'
                                    ? {
                                        background: '#ffdddd',
                                        marginTop: '10px',
                                        fontSize: 'small',
                                      }
                                    : {}
                                "
                              >
                                {{ status[0].toUpperCase() }}
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="15" class="text-danger text-center">
                    {{ "Data Not Found!" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrapper table-responsive" v-if="searchQuery">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">
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
              <tbody v-if="searchResults?.length > 0">
                <tr v-for="data in searchResults" :key="data.id">
                  <td class="text-capitalize fw-bold" style="width: 21%">
                    {{ data.candidate_name + " " }}

                    <span class="fs-6 text-muted fw-100"
                      ><br />{{ data.job }}</span
                    >
                  </td>
                  <td>
                    <div class="calendar-grid">
                      <div
                        v-for="day in selectedDateRow"
                        :key="day"
                        @click="openModal(data, day)"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        class="calendar-day"
                        :class="{ 'calendar-day': true, clickable: day !== '' }"
                      >
                        <span
                          v-for="avail in data.availability"
                          :key="avail.id"
                        >
                          <span v-if="avail.date === formattedDate(day)">
                            <span
                              v-for="status in avail.candidate_status"
                              :key="status"
                              style="
                                font-size: small;
                                padding: 0px 5px;
                                margintop: 10px;
                              "
                              class="me-2"
                              v-bind:class="{
                                'btn btn-warning': status === 'Late',
                                btn: status === 'U/A',
                                'btn btn-secondary': status === 'Night',
                                'btn btn-light': status === 'Early',
                              }"
                              :style="
                                status === 'U/A'
                                  ? {
                                      background: '#ffdddd',
                                      marginTop: '10px',
                                      fontSize: 'small',
                                    }
                                  : {}
                              "
                            >
                              {{ status[0].toUpperCase() }}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="2" class="text-danger text-center">
                    {{ errorMessage }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="mt-3 mb-3 d-flex justify-content-between"
          style="text-align: right"
          v-if="candidateList && candidateList.length >= 10"
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
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "../components/modals/CandidatePage/CanderAvailableModal.vue";
import Loader from "../components/Loader/Loader.vue";
import Navbar from "@/components/Navbar.vue";
import dayjs from "dayjs";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentView: "weekly",
      currentDate: new Date(),
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      date: new Date(),
      intervalId: null,
      startDate: "",
      endDate: { value: "", display: "" },
      currentDate: new Date(),
      selectedDate: null,
      availabilityIds: [],
      selectedCandidate: null,
      selectedCandidateId: null,
      selectedCandidateData: null,
      candidateList: null,
      getCandidateStatus: [],
      showModal: false,
      selectedCandidateStatusForDate: [],
      statusForSelectedDate: null,
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      isLoading: false,
    };
  },

  computed: {
    // paginateCandidates() {
    //   if (this.candidateList) {
    //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //     const endIndex = startIndex + this.itemsPerPage;
    //     return this.candidateList.slice(startIndex, endIndex);
    //   } else {
    //     return [];
    //   }
    // },

    paginateCandidates() {
      return this.candidateList;
    },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
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
      return this.selectedCandidate
        ? this.selectedCandidate.candidate_name
        : "";
    },

    formattedDates() {
      return this.selectedDateRow.map((day) => this.formatDate(day));
    },
    getSelectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
    },
    formattedStartDate() {
      const startDate = new Date(this.startDate);
      const mondayIndex = 1;
      const dayOfWeek = startDate.getDay();
      const daysToAdd =
        dayOfWeek < mondayIndex
          ? mondayIndex - dayOfWeek - 7
          : mondayIndex - dayOfWeek;
      startDate.setDate(startDate.getDate() + daysToAdd);
      return `${startDate.getDate()}/${
        startDate.getMonth() + 1
      }/${startDate.getFullYear()}`;
    },
    formattedEndDate() {
      const endDate = new Date(this.startDate);
      const sundayIndex = 0;
      const dayOfWeek = endDate.getDay();
      const daysToAdd =
        dayOfWeek < sundayIndex
          ? sundayIndex - dayOfWeek
          : sundayIndex - dayOfWeek + 7;
      endDate.setDate(endDate.getDate() + daysToAdd);
      return `${endDate.getDate()}/${
        endDate.getMonth() + 1
      }/${endDate.getFullYear()}`;
    },
    computedSelectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
    },
  },
  components: {
    Navbar,
  },
  watch: {
    startDate(newVal) {
      this.currentDate = new Date(newVal);
    },
  },
  methods: {
    formatMonthYear(date) {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(date);
    },
    formatDate(dateString) {
      const parts = dateString.split("/");

      if (parts.length === 3) {
        const [month, day, year] = parts;
        return `${parseInt(day)}/${month}/${year}`;
      }

      return dateString;
    },

    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },

    async search() {
      try {
        this.searchResults = [];
        let activatedStatus = null;

        const response = await axiosInstance.get(
          `${VITE_API_URL}/availability_searching/${this.searchQuery}`
        );

        this.searchResults = response.data.data;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No candidates found for the specified criteria";
        }
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
    formattedDate(date) {
      if (date instanceof Date && !isNaN(date)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } else {
        return "";
      }
    },
    getCandidateName() {
      return this.selectedCandidate
        ? this.selectedCandidate.candidate_name
        : "Default Name";
    },
    getCandidateStatusForDate(candidateId, selectedDate) {
      const candidate = this.candidateList.find(
        (candidate) => candidate.id === candidateId
      );

      if (candidate) {
        const availabilityEntry = candidate.availability.find(
          (availability) => availability.date === selectedDate
        );

        if (availabilityEntry) {
          return [
            { id: availabilityEntry.id, status: availabilityEntry.status },
          ];
        }
      }

      return [];
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
        this.fetchCandidateList(this.startDate);
      }
    },
    updateSelectedDateRow(startDate, endDate) {
      const selectedDateRow = [];
      const startDay = startDate.getDay();

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i - startDay);

        if (currentDate.getMonth() === startDate.getMonth()) {
          selectedDateRow.push(`${currentDate.getDate()}`);
        } else {
          selectedDateRow.push("");
        }
      }

      Vue.set(this, "selectedDateRow", selectedDateRow);
      // console.log(selectedDateRow);
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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
    openModal(candidateId, day) {
      try {
        const actualCandidateId = candidateId.candidate_id;

        const selectedDate = new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate()
        );

        this.selectedDate = selectedDate;

        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.candidate_id === actualCandidateId
        );

        if (selectedCandidate) {
          const formattedDate = this.formattedDate(selectedDate);
          const availability = selectedCandidate.availability.find(
            (avail) => avail.date === formattedDate
          );

          if (availability) {
            this.availability_id = availability.availability_id;
            this.statusForSelectedDate = availability.status;
          } else {
            this.availability_id = null;
            this.statusForSelectedDate = null;
          }

          this.$nextTick(() => {
            this.selectedCandidate = selectedCandidate;

            if (selectedCandidate) {
              this.showModal = true;
            } else {
              // console.error("Selected candidate No found");
            }
          });
        } else {
          this.selectedDate = null;
          this.statusForSelectedDate = null;
          this.availability_id = null;
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
        this.availability_id = null;
      }
    },
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.fetchCandidateList(this.formattedStartDate);
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchCandidateList(this.formattedStartDate);
    },
    async fetchCandidateList(startDate) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`,
          {
            params: {
              date: this.formattedStartDate,
              per_page: this.itemsPerPage,
              page: this.currentPage,
            },
          }
        );
        this.candidateList = response.data.data;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
        this.totalCount = response.data.total_count;

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
      } catch (error) {}
    },
  },
  components: {
    Calendar,
    Loader,
  },

  async mounted() {
    this.loadDateRangeFromLocalStorage();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    this.intervalId = setInterval(() => {
      this.fetchCandidateList(this.formattedStartDate);
    }, 2000);
    // this.fetchCandidateList(this.formattedStartDate);
    // window.addEventListener("beforeunload", this.saveToLocalStorage);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.fetchCandidateList(this.formattedStartDate);
    // window.removeEventListener("beforeunload", this.saveToLocalStorage);
    // this.loadDateRangeFromLocalStorage();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.fetchCandidateList(this.formattedStartDate);
    // window.removeEventListener("beforeunload", this.saveToLocalStorage);
    // this.loadDateRangeFromLocalStorage();
  },
};
</script>

<style scoped>
#main {
  background-color: #f9f9f9;
}
.full-page-calendar {
  padding: 20px;
}

.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input.dateInput {
  width: 1.3%;
  background: transparent;
  color: transparent;
  border: transparent;
  font-size: larger;
}
input[type="radio"]:checked {
  background-color: #ca5507 !important;
}
input.dateInput:focus-visible {
  outline: transparent !important;
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

.calendar-day {
  border: 1px solid #dee2e6;
  width: 170px;
  height: 143px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  padding-bottom: 8px;
}

.calendar-day.clickable {
  cursor: crosshair;
  font-size: 10px;
  color: blue !important;
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
  margin: 16% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 56%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
table thead th {
  background: #ffeedb;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 1300px) {
  input.dateInput {
    width: 1.8%;
  }
}
@media (max-width: 1120px) {
  .candidateTable {
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
@media (max-width: 900px) {
  input.dateInput {
    width: 3%;
  }
}
@media (max-width: 768px) {
  input[type="search"] {
    font-size: 1rem;
  }
}

@media (max-width: 560px) {
  input.dateInput {
    width: 4%;
  }
}
</style>
