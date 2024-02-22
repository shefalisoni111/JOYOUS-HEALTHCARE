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
        <div class="row p-3" style="overflow: auto">
          <div class="full-page-calendar">
            <div class="calendar-header">
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
            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <span class="close d-flex justify-content-end" @click="closeModal"
                  >&times;</span
                >
                <h4 class="text-capitalize">Availability - {{ getCandidateName() }}</h4>
                <!-- <p>You clicked on {{ selectedDate }}</p> -->
                <!-- <p>Status: {{ statusForSelectedDate }}</p> -->
                <!-- Pass initialDate to the Calendar component -->

                <Calendar
                  :initialDate="selectedDate.toISOString()"
                  :candidateId="selectedCandidateId.toString()"
                  @closeModal="closeModal"
                  :availabilityId="availability_id"
                  @Candidate-availability="handleAvailabilityChange"
                  :startDate="startDate"
                />
              </div>
            </div>
          </div>
          <table class="table">
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
            <tbody>
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
          </table>
        </div>
      </div>
    </div>
    <div
      class="mx-3"
      style="text-align: right"
      v-if="candidateList && candidateList.length >= 8"
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
import Calendar from "../components/modals/CandidatePage/CanderAvailableModal.vue";

export default {
  data() {
    return {
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
      itemsPerPage: 8,
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
    handleAvailabilityChange(availabilityId) {
      this.availability_id = availabilityId;
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
      console.log(selectedDateRow);
    },
    formatDate(day) {
      return day.toLocaleDateString();
    },

    openModal(candidateId, day) {
      try {
        const actualCandidateId = candidateId.candidate_id;
        // const selectedDate = new Date(this.startDate);
        // const dayOfMonth = day.getDate(); // Extract day of the month
        // selectedDate.setDate(dayOfMonth);
        // const formattedDate = selectedDate.toISOString().split("T")[0];
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
              // console.error("Selected candidate not found");
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
    async fetchCandidateList(startDate) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`,
          {
            params: { date: startDate },
          }
        );
        this.candidateList = response.data.data;

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
  },
  async created() {
    const startDate = new Date();
    await this.fetchCandidateList(startDate);
    await this.loadStoredData();
    await window.addEventListener("beforeunload", this.saveToLocalStorage);
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
