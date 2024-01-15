<template>
  <div>
    <div class="container-fluid">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / <span class="color-fonts">Availability</span>
              </li>
            </ol>
          </div>
        </div>
        <div class="row p-3">
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
              />
            </div>
            <!-- Modal -->

            <div v-if="selectedDate !== null" class="modal">
              <div class="modal-content">
                <span class="close d-flex justify-content-end" @click="closeModal"
                  >&times;</span
                >
                <h4 class="text-capitalize">Availability - {{ getCandidateName() }}</h4>
                <!-- <p>You clicked on {{ selectedDate }}</p>
                <p>Status: {{ statusForSelectedDate }}</p> -->
                <!-- Pass initialDate to the Calendar component -->
                <Calendar
                  :initialDate="selectedDate"
                  :candidateId="selectedCandidateId.toString()"
                  @closeModal="closeModal"
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
              <tr v-for="data in candidateList" :key="data.id">
                <td class="text-capitalize fw-bold">{{ data.candidate_name }}</td>
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
                            v-bind:class="{
                              'btn btn-warning fs-6': avail.status === 'Late',
                              'btn btn-primary fs-6': avail.status === 'Unavailable',
                              'btn btn-secondary fs-6': avail.status === 'Night',
                              'btn btn-light fs-6': avail.status === 'Early',
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

      selectedCandidate: null,
      selectedCandidateId: null,
      selectedCandidateData: null,
      candidateList: null,
      getCandidateStatus: [],
      showModal: false,
      selectedCandidateStatusForDate: [],
      statusForSelectedDate: null,
    };
  },
  computed: {
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
      // Calculate a row of 7 days starting from the selected date (Monday to Sunday)
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];

      // Find the first day of the week (Sunday is 0, Monday is 1, and so on)
      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7; // Adjust for Monday being the start of the week

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);
        selectedDateRow.push(`${currentDate.getDate()}`);
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
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
    },
    computedSelectedCandidate() {
      return this.candidateList.find(
        (candidate) => candidate.id === this.selectedCandidateId
      );
    },
  },

  methods: {
    formattedDate(day) {
      const selectedDate = new Date(this.startDate);
      selectedDate.setDate(day);
      return selectedDate.toISOString().split("T")[0];
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
      }
    },
    updateSelectedDateRow(startDate, endDate) {
      // Calculate a row of 7 days starting from the start date (Monday to Sunday)
      const selectedDateRow = [];

      // Find the first day of the week (Sunday is 0, Monday is 1, and so on)
      const dayOfWeek = startDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7; // Adjust for Monday being the start of the week

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
        const actualCandidateId = candidateId.candidate_id;
        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day));
        const formattedDate = selectedDate.toISOString().split("T")[0];

        this.selectedDate = formattedDate;
        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.candidate_id === actualCandidateId
        );

        if (selectedCandidate) {
          const availability = selectedCandidate.availability.filter(
            (avail) => avail.date === formattedDate
          );

          this.statusForSelectedDate =
            availability.length > 0 ? availability[0].status : null;

          // Use the nextTick method from the app instance
          this.$nextTick(() => {
            this.selectedCandidate = selectedCandidate;

            if (selectedCandidate) {
              this.showModal = true;
            } else {
              // console.error("Selected candidate not found");
            }
          });
        } else {
          // console.error("Selected candidate not found");
          this.selectedDate = null;
          this.statusForSelectedDate = null;
        }
      } catch (error) {
        // console.error("Error in openModal:", error);
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },

    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
    },
    async fetchCandidateList() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`
        );
        this.candidateList = response.data.data;
      } catch (error) {}
    },
  },
  components: {
    Calendar,
  },
  mounted() {
    this.fetchCandidateList();
    this.loadStoredData();
    window.addEventListener("beforeunload", this.saveToLocalStorage);
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
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
  padding: 20px 20px;
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
</style>
