<template>
  <div class="nested-calendar" id="nested-calendar">
    <div class="nested-calendar-content">
      <div class="calendar-header d-flex justify-content-between my-3">
        <div class="d-flex">
          <!-- <button class="btn btn-primary" @click="goToPreviousMonth">
            <i class="bi bi-caret-left-fill"></i>
          </button> -->
          <div class="current-month d-flex align-items-center">
            {{ selectedMonth }}
          </div>
          <!-- <button class="btn btn-primary" @click="goToNextMonth">
            <i class="bi bi-caret-right-fill"></i>
          </button> -->
        </div>
        <div>
          <ul class="list-inline">
            <li class="list-inline-item">E- Early</li>
            &nbsp;
            <li class="list-inline-item">L- Late</li>
            &nbsp;
            <li class="list-inline-item">N- Night</li>
            &nbsp;
            <li class="list-inline-item">U- Unavailable</li>
          </ul>
        </div>
      </div>
      <div class="calendar-grid table-wrapper">
        <div v-for="day in daysOfWeek" :key="day" class="day-header">
          {{ day }}
        </div>
        <div
          v-for="date in selectedDateRow"
          :key="date"
          class="day-header candidateTable"
        >
          {{ formatDate(date) }}

          <div class="shift-checkboxes d-flex flex-column">
            <div>
              <input
                type="radio"
                :id="'early-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Early'"
                @click="updateDate(date, 'Early')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'early-' + date" class="ps-1">E</label>
              &nbsp;
              <input
                type="radio"
                :id="'late-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Late'"
                @click="updateDate(date, 'Late')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'late-' + date" class="ps-1">L</label>
            </div>
            <div>
              <input
                type="radio"
                :id="'night-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Night'"
                @click="updateDate(date, 'Night')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'night-' + date" class="ps-1">N</label>
              &nbsp;
              <input
                type="radio"
                :id="'unavailable-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Unavailable'"
                @click="updateDate(date, 'Unavailable')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'unavailable-' + date" class="ps-1">U</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 float-end">
      <button class="btn btn-primary" @click="closeNestedCalendar">Cancel</button>&nbsp;
      <button class="btn btn-primary" @click="handleButtonClick">Add Availability</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    initialDate: {
      type: String,
      required: true,
    },
    candidateId: {
      type: String,
      default: null,
    },
    availabilityId: {
      type: [String, Number],
      default: null,
    },
    startDate: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selectedStartDate: "",
      currentDate: new Date(),
      calendarData: [],
      candidate_id: this.candidateId,
      date: "",
      status: "",
      availability_id: this.availabilityId,
      selectedDate: [],
      selectedShifts: {},
      selectedMonth: "",
    };
  },
  created() {
    this.candidate_id = this.candidateId;
  },

  watch: {
    availability_id(newAvailabilityId) {
      this.$emit("availabilityChange", newAvailabilityId);

      this.fetchAvailability(this.candidate_id, this.initialDate);
    },

    candidateId(newCandidateId) {
      this.candidate_id = newCandidateId;
    },

    currentDate: {
      handler: function () {
        this.updateCurrentMonth(this.currentDate);
        this.initializeCalendar();
      },
      deep: true,
    },
    initialDate: {
      handler: function (newInitialDate) {
        const parsedDate = new Date(newInitialDate);
        this.updateCurrentMonth(parsedDate);
        this.initializeCalendar();
      },
      immediate: true,
    },
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
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];

      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);
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
    leadingBlankDays() {
      const firstDayOfWeek = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      ).getDay();
      return Array.from({ length: firstDayOfWeek }, (_, i) => i);
    },
  },
  methods: {
    updateCurrentMonth(date) {
      if (date instanceof Date && !isNaN(date)) {
        this.selectedMonth = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    isShiftDisabled(selectedDate) {
      const dayData = this.calendarData.find((data) => data.date === selectedDate);
      return (
        dayData &&
        selectedDate !== this.selectedDate &&
        (dayData.shifts.early ||
          dayData.shifts.late ||
          dayData.shifts.night ||
          dayData.shifts.unavailable)
      );
    },
    async handleButtonClick() {
      this.addCandidateStatus();
      this.closeNestedCalendar();
    },

    // goToPreviousMonth() {
    //   this.currentDate = new Date(
    //     this.currentDate.getFullYear(),
    //     this.currentDate.getMonth() - 1,
    //     1
    //   );
    //   this.updateCurrentMonth(this.currentDate);
    // },
    // goToNextMonth() {
    //   this.currentDate = new Date(
    //     this.currentDate.getFullYear(),
    //     this.currentDate.getMonth() + 1,
    //     1
    //   );
    //   this.updateCurrentMonth(this.currentDate);
    // },
    closeNestedCalendar() {
      this.$emit("closeModal");
    },
    updateSelectedDate(selectedDate) {
      this.selectedDate = selectedDate;
    },
    initializeCalendar() {
      const initialDate = this.initialDate
        ? new Date(this.initialDate)
        : this.currentDate;

      const firstDay = new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
      const lastDay = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0);

      this.calendarData = Array.from({ length: lastDay.getDate() }, (_, i) => {
        const date = new Date(initialDate.getFullYear(), initialDate.getMonth(), i + 1);
        return {
          date,
          day: i + 1,
          shifts: {
            early: false,
            late: false,
            night: false,
            unavailable: false,
          },
          availability_id: null,
        };
      });
    },
    // updateDate(selectedDate, shift) {
    //   this.date = selectedDate;

    //   const dayData = this.calendarData.find((data) => data.date === selectedDate);
    //   if (dayData) {
    //     // If all shifts are already selected, disable them
    //     if (
    //       dayData.shifts.early &&
    //       dayData.shifts.late &&
    //       dayData.shifts.night &&
    //       dayData.shifts.unavailable
    //     ) {
    //       // Do nothing or show a message indicating that all shifts are already selected
    //       return;
    //     }

    //     dayData.shifts[shift] = !dayData.shifts[shift];

    //     // Check if all shifts are now selected, disable them if needed
    //     if (
    //       dayData.shifts.early &&
    //       dayData.shifts.late &&
    //       dayData.shifts.night &&
    //       dayData.shifts.unavailable
    //     ) {
    //       // Disable all shifts
    //       dayData.shifts.early = false;
    //       dayData.shifts.late = false;
    //       dayData.shifts.night = false;
    //       dayData.shifts.unavailable = false;

    //       // Optionally, you can show a message indicating that all shifts are disabled
    //       alert("All shifts are disabled for this date.");
    //     }
    //   }

    //   const selectedShifts = Object.keys(dayData.shifts)
    //     .filter((key) => dayData.shifts[key])
    //     .join(", ");

    //   this.status = selectedShifts ? selectedShifts : "";
    // },
    updateDate(selectedDate, shift) {
      this.date = selectedDate;
      // console.log(shift);
      this.status = shift;
      const dayData = this.calendarData.find((data) => data.date === selectedDate);
      if (dayData) {
        dayData.shifts = dayData.shifts || {};
        dayData.shifts[shift] = !dayData.shifts[shift];

        if (
          dayData.shifts.early &&
          dayData.shifts.late &&
          dayData.shifts.night &&
          dayData.shifts.unavailable
        ) {
          return;
        }

        // Update the status
        const selectedShifts = Object.keys(dayData.shifts)
          .filter((key) => dayData.shifts[key])
          .join(", ");
        this.status = selectedShifts || "";
      }
    },
    addCandidateStatus: async function () {
      try {
        const parsedDate = new Date(this.date);

        if (isNaN(parsedDate)) {
          return;
        }

        const formattedDate = parsedDate.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const data = {
          candidate_id: this.candidate_id,
          date: formattedDate,
          status: this.status,
        };

        if (this.availability_id !== null) {
          if (!window.confirm("Are you Sure ?")) {
            // console.log("Confirmation canceled");
            return;
          }

          const putResponse = await axios.put(
            `${VITE_API_URL}/availabilitys/${this.availability_id}`,
            data,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (putResponse.status === 200) {
            alert("Availability updated successfully");
            window.location.reload();
            // this.fetchCandidateList();
            // this.$emit("Candidate-availability");
          } else {
            // console.error("Failed to update availability");
          }
        } else {
          const postResponse = await axios.post(`${VITE_API_URL}/availabilitys`, data, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (postResponse.status === 201) {
            alert("Availability added successfully");
            window.location.reload();
            // this.fetchCandidateList();
            // this.$emit("Candidate-availability");
          } else {
            // console.error("Failed to add availability");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data;

          if (errorData && errorData.date) {
            alert(`Error: ${errorData.date[0]}`);
          } else {
            // alert("An error occurred while updating/adding availability.");
          }
        } else {
          // alert("An unexpected error occurred.");
        }
      }
    },
  },

  async created() {
    this.initializeCalendar();

    this.updateCurrentMonth(new Date(this.initialDate));
  },
};
</script>

<style scoped>
.full-page-calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.current-month {
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
}
.calendar-day .day-number {
  border-radius: 50% !important;
  background: #b5cfe3 !important;
  padding: 9px 15px !important;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.day-header {
  background: #9e9e9e2b;
}
.day-header,
.empty-day,
.calendar-day {
  padding: 10px;
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
}

.calendar-day:hover {
  background-color: #dcdcdc;
}

.calendar-day {
  display: flex;

  align-items: center;
  justify-content: space-evenly;
}

.day-number {
  font-size: 16px;
}

.shift-checkboxes {
  margin-top: 5px;
}
@media (max-width: 1400px) {
  label {
    font-size: 14px;
  }
}
@media (max-width: 1120px) {
  .candidateTable {
    width: 200px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
