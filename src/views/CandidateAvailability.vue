<template>
  <div>
    <div class="container-fluid">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2 mt-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Availability</span>
              </li>
            </ol>
          </div>
        </div>
        <div class="row p-3">
          <div class="full-page-calendar">
            <div class="d-flex justify-content-between align-items-center">
              <div class="calendar-header w-100">
                <span v-if="formattedStartDate && formattedEndDate" class="fw-bold">
                  {{
                    "Monday " + formattedStartDate + " to Sunday " + formattedEndDate
                  }} </span
                >&nbsp; &nbsp;
                <input
                  type="date"
                  v-model="startDate"
                  @change="updateDateRange"
                  class="dateInput"
                  value=""
                />
              </div>
              <div>
                <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search by Name"
                    aria-label="Search"
                    v-model="searchQuery"
                    @input="debounceSearch"
                  />
                </form>
              </div>
            </div>
            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <h4 class="text-capitalize" style="color: #ff5722; font-weight: bold">
                  {{ getCandidateName() }}
                </h4>

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
          <div class="table-wrapper" v-if="!searchQuery">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">
                    <div class="calendar-grid">
                      <div v-for="day in daysOfWeek" :key="day" class="day-header">
                        {{ day }}
                      </div>
                      <div v-for="date in selectedDateRow" :key="date" class="day-header">
                        {{ formatDate(date) }}
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
                              {{ avail.status ? avail.status[0].toUpperCase() : "" }}
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
          <div class="table-wrapper" v-if="searchQuery">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">
                    <div class="calendar-grid">
                      <div v-for="day in daysOfWeek" :key="day" class="day-header">
                        {{ day }}
                      </div>
                      <div v-for="date in selectedDateRow" :key="date" class="day-header">
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

                    <span class="fs-6 text-muted fw-100"><br />{{ data.job }}</span>
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
                              {{ avail.status ? avail.status[0].toUpperCase() : "" }}
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
      </div>
    </div>
    <div
      class="mx-3 mb-3"
      style="text-align: right"
      v-if="candidateList && candidateList.length >= 10"
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
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Calendar from "../components/modals/CandidatePage/CanderAvailableModal.vue";
import Loader from "../components/Loader/Loader.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
      date: new Date(),
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
      itemsPerPage: 10,
      isLoading: false,
    };
  },
  computed: {
    paginateCandidates() {
      if (this.candidateList) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.candidateList.slice(startIndex, endIndex);
      } else {
        return [];
      }
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
      return this.selectedCandidate ? this.selectedCandidate.candidate_name : "";
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
        dayOfWeek < mondayIndex ? mondayIndex - dayOfWeek - 7 : mondayIndex - dayOfWeek;
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
        dayOfWeek < sundayIndex ? sundayIndex - dayOfWeek : sundayIndex - dayOfWeek + 7;
      endDate.setDate(endDate.getDate() + daysToAdd);
      return `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    },
    computedSelectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
    },
  },

  methods: {
    formatDate(dateString) {
      const parts = dateString.split("/");

      if (parts.length === 3) {
        const [month, day, year] = parts;
        return `${parseInt(day)}/${month}/${year}`;
      }

      return dateString;
    },
    async fetchAvailabilityStatusMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/weekly_availability_for_candidate?candidate_id=${
            this.candidateId
          }&date=${this.formattedDate(this.startDate)}`
        );
        this.updatedStatusData = response.data.data;

        this.availabilityByDate = this.updatedStatusData.reduce(
          (formattedData, candidate) => {
            if (candidate.availability) {
              const formattedDate = this.formatDate(candidate.availability.date);
              formattedData.push({
                date: formattedDate,
                status: candidate.availability.status,
              });
            }
            return formattedData;
          },
          []
        );
      } catch (error) {
        // console.error("Error fetching availability:", error);
      } finally {
        this.isLoading = false;
      }
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
      this.fetchCandidateList(this.startDate);
      this.saveToLocalStorage();
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
          return [{ id: availabilityEntry.id, status: availabilityEntry.status }];
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

    openModal(candidateId, day) {
      try {
        const actualCandidateId = candidateId.candidate_id;

        const selectedDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());

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

    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchCandidateList();
    },
    async fetchCandidateList(startDate) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`,
          {
            params: { date: startDate },
            per_page: this.itemsPerPage,
          }
        );
        this.candidateList = response.data.data;

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
    try {
      const currentDate = new Date();
      const mondayIndex = 1;
      const dayOfWeek = currentDate.getDay();
      const daysToAdd =
        dayOfWeek < mondayIndex ? mondayIndex - dayOfWeek - 7 : mondayIndex - dayOfWeek;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      this.startDate = currentDate.toISOString().split("T")[0];
      await this.fetchCandidateList(this.formattedStartDate);
      await this.fetchAvailabilityStatusMethod();
    } catch (error) {
      // Handle error
    }
    setInterval(() => {
      this.fetchCandidateList(this.formattedStartDate);
    }, 5000);
    window.addEventListener("beforeunload", this.saveToLocalStorage);
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
  padding-top: 62px;
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
  background-color: #eaeaea;
  transition: background-color 0.3s ease;
  padding: 17px 20px;
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
  width: 90%;
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

@media (max-width: 1300px) {
  input.dateInput {
    width: 1.8%;
  }
}
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
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
@media (max-width: 560px) {
  input.dateInput {
    width: 4%;
  }
}
</style>
