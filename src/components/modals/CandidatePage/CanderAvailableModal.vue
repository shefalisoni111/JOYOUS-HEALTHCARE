<template>
  <div class="nested-calendar" id="nested-calendar">
    <div class="nested-calendar-content">
      <div class="calendar-header d-flex justify-content-between my-3">
        <div class="d-flex"></div>
        <!-- <div>
          <ul class="list-inline">
            <li class="list-inline-item">E- Early</li>
            &nbsp;
            <li class="list-inline-item">L- Late</li>
            &nbsp;
            <li class="list-inline-item">N- Night</li>
            &nbsp;
            <li class="list-inline-item">U- Unavailable</li>
          </ul>
        </div> -->
      </div>
      <div class="calendar-grid table-wrapper">
        <!-- <div v-for="day in daysOfWeek" :key="day" class="day-header">
          {{ day }}
        </div> -->
        <div
          v-for="(date, index) in selectedDateRow"
          :key="index"
          class="candidateTable"
        >
          <div class="day-header">
            {{ getDayName(date) }}
          </div>
          <div class="date mt-1" style="color: rgb(253 119 30)">
            {{ formatDate(date) }}
          </div>

          <div
            class="shift-checkboxes d-flex flex-column align-items-baseline px-4 mb-3 fw-lighter"
          >
            <div>
              <input
                type="checkbox"
                :id="'early-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Early'"
                @click="updateDate(date, 'Early')"
                :checked="getCheckedStatus(date, 'Early')"
                :disabled="isShiftDisabled(date)"
                class="custom-checkbox"
              />
              <label :for="'early-' + date" class="ps-1">Early</label>
            </div>
            <div>
              <input
                type="checkbox"
                :id="'late-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Late'"
                @click="updateDate(date, 'Late')"
                :checked="getCheckedStatus(date, 'Late')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'late-' + date" class="ps-1">Late</label>
            </div>
            <div>
              <input
                type="checkbox"
                :id="'night-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'Night'"
                @click="updateDate(date, 'Night')"
                :checked="getCheckedStatus(date, 'Night')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'night-' + date" class="ps-1">Night</label>
            </div>

            <div>
              <input
                type="checkbox"
                :id="'unavailable-' + date"
                :name="'shiftsGroup-' + date"
                v-model="selectedShifts[date]"
                :value="'U/A'"
                @click="updateDate(date, 'U/A')"
                :checked="getCheckedStatus(date, 'U/A')"
                :disabled="isShiftDisabled(date)"
              />
              <label :for="'unavailable-' + date" class="ps-1"
                >Unavailable</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 float-end">
      <button class="btn btn-dark btn-cancel" @click="closeNestedCalendar">
        Cancel</button
      >&nbsp;
      <button class="btn btn-primary" @click="handleButtonClick">
        Add Availability
      </button>
    </div>

    <NotSuccessAlertVue ref="dangerAlert" />
  </div>
</template>

<script>
import axios from "axios";

import NotSuccessAlertVue from "../../Alerts/NotSuccessAlert.vue";

import Swal from "sweetalert2";

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
    // availabilityId: {
    //   type: [String, Number],
    //   default: null,
    // },
    startDate: {
      type: Date,
      required: false,
    },
    availabilityStatus: String,
  },
  data() {
    return {
      selectedStartDate: "",
      currentDate: new Date(),
      calendarData: [],
      candidate_id: this.candidateId,
      date: "",
      status: "",
      availability_id: null,
      selectedDate: [],
      selectedShifts: {},
      availabilityIds: [],
      selectedMonth: "",
      updatedStatusData: [],
      availabilityByDate: [],
      successAlert: null,
    };
  },
  components: {
    NotSuccessAlertVue,
  },
  created() {
    this.candidate_id = this.candidateId;
  },

  watch: {
    availability_id(newAvailabilityId) {
      this.$emit("availabilityChange", newAvailabilityId);
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
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(
        this.selectedDateRow[this.selectedDateRow.length - 1]
      );
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
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    getDayName(date) {
      const dayIndex = new Date(date).getDay();
      return this.daysOfWeek[(dayIndex + 6) % 7];
    },
    getCheckedStatus(date, shift) {
      const formattedDate = this.formatDate(date);

      const availability = this.availabilityIds.find(
        (item) => item.date === formattedDate
      );

      return availability && availability.candidate_status.includes(shift);
    },
    updateCurrentMonth(date) {
      if (date instanceof Date && !isNaN(date)) {
        this.selectedMonth = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      }
    },
    formatDate(date) {
      // return new Date(date).toLocaleDateString();
      //const options = {
      //   day: "2-digit",
      //   month: "2-digit",
      //   year: "numeric",
      // };
      const parsedDate = new Date(date);

      if (isNaN(parsedDate)) return ""; // Handle invalid date

      const day = String(parsedDate.getDate()).padStart(2, "0");
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const year = parsedDate.getFullYear();

      return `${day}/${month}/${year}`;

      // return new Date(date).toLocaleDateString("en-GB", parsedDate);
    },

    isShiftDisabled(selectedDate) {
      const dayData = this.calendarData.find(
        (data) => data.date === selectedDate
      );
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

      const firstDay = new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        1
      );
      const lastDay = new Date(
        initialDate.getFullYear(),
        initialDate.getMonth() + 1,
        0
      );

      this.calendarData = Array.from({ length: lastDay.getDate() }, (_, i) => {
        const date = new Date(
          initialDate.getFullYear(),
          initialDate.getMonth(),
          i + 1
        );
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

    updateDate(selectedDate, shift) {
      this.date = selectedDate;
      this.status = shift;
      const availability = this.availabilityIds.find(
        (item) => item.date === this.formatDate(selectedDate)
      );

      if (availability) {
        this.availability_id = availability.id;
      } else {
        this.availability_id = null;
      }
      this.selectedShifts[selectedDate] =
        this.selectedShifts[selectedDate] || [];

      if (shift === "U/A") {
        if (!this.selectedShifts[selectedDate].includes("U/A")) {
          this.selectedShifts[selectedDate] = ["U/A"];
        } else {
          this.selectedShifts[selectedDate] = [];
        }
      } else {
        const unavailableIndex =
          this.selectedShifts[selectedDate].indexOf("U/A");
        if (unavailableIndex !== -1) {
          this.selectedShifts[selectedDate].splice(unavailableIndex, 1);
        }

        const shiftIndex = this.selectedShifts[selectedDate].indexOf(shift);
        if (shiftIndex === -1) {
          this.selectedShifts[selectedDate].push(shift);
        } else {
          this.selectedShifts[selectedDate].splice(shiftIndex, 1);
        }

        if (this.selectedShifts[selectedDate].length === 0) {
          this.selectedShifts[selectedDate].push("U/A");
        }
      }
    },
    isPastDate(dateStr) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const inputDate = new Date(dateStr);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate < today;
    },
    async addCandidateStatus() {
      try {
        const parsedDate = new Date(this.date);
        if (isNaN(parsedDate)) {
          return;
        }

        let availabilities = [];

        function formatDateToDDMMYYYY(dateString) {
          const parsedDate = new Date(dateString);
          const day = String(parsedDate.getDate()).padStart(2, "0");
          const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
          const year = parsedDate.getFullYear();

          return `${day}/${month}/${year}`;
        }
        // console.log(this.availabilityIds);

        if (this.availability_id !== null) {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to proceed?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(255 112 8)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "Cancel",
          });
          if (!result.isConfirmed) {
            return;
          }
          for (const [date, candidate_status] of Object.entries(
            this.selectedShifts
          )) {
            const formattedDate = this.formatDate(date);
            const availability = this.availabilityIds.find(
              (item) => item.date === formattedDate
            );

            if (this.isPastDate(formattedDate)) {
              Swal.fire({
                icon: "error",
                title: "Invalid Date",
                text: "Cannot add availability for past dates.",
                confirmButtonColor: "rgb(255 112 8)",
              });
              return;
            }
            if (availability && availability.id !== null) {
              availabilities.push({
                id: availability.id,
                date: formattedDate,
                candidate_status,
              });
            }
          }
          if (availabilities.length > 0) {
            const putResponse = await axios.put(
              `${VITE_API_URL}/update_availabilitys`,
              {
                availabilities,
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );

            if (putResponse.status === 200) {
              this.errorMessage = "";
              // await this.fetchCandidateList(this.startDate);
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Availability updated successfully.",
                timer: 3000,
                showConfirmButton: false,
              });
              return;
            } else {
              return;
            }
          }
        } else {
          if (Object.keys(this.selectedShifts).length === 0) {
            availabilities = [];
          } else {
            for (const [date, candidate_status] of Object.entries(
              this.selectedShifts
            )) {
              const formattedDate = this.formatDate(date);
              const availability = this.availabilityIds.find(
                (item) => item.date === formattedDate
              );

              if (this.isPastDate(formattedDate)) {
                Swal.fire({
                  icon: "error",
                  title: "Invalid Date",
                  text: "Cannot add availability for past dates.",
                  confirmButtonColor: "rgb(255 112 8)",
                });
                return;
              }
              if (
                availability &&
                availability.id === null &&
                candidate_status &&
                candidate_status.length > 0
              ) {
                // availabilities = [];
                availabilities.push({
                  candidate_id: this.candidate_id,
                  date: formattedDate,
                  candidate_status,
                });
              }
            }
          }

          if (availabilities.length > 0) {
            const postResponse = await axios.post(
              `${VITE_API_URL}/availabilitys`,
              { availabilities },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );

            if (postResponse.status === 201) {
              availabilities.forEach((availability) => {
                const candidate = this.updatedStatusData.find(
                  (candidate) =>
                    candidate.candidate_id === availability.candidate_id
                );
                if (candidate) {
                  candidate.availability = {
                    date: availability.date,
                    // status: availability.status,

                    candidate_status: availability.candidate_status,
                  };
                }
              });

              this.errorMessage = "";
              // await this.fetchCandidateList(this.startDate);
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Availability added successfully.",
                timer: 3000,
                showConfirmButton: false,
              });
              return;
            } else {
              return;
            }
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data;

          if (
            errorData &&
            errorData.error &&
            errorData.error.includes("Date must be greater than or equal to")
          ) {
            const errorMessage = errorData.error.replace(
              "Failed to create availability: ",
              ""
            );
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorMessage,
              confirmButtonColor: "rgb(255 112 8)",
              confirmButtonText: "OK",
            });
          } else if (errorData && errorData.date) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorData.date[0],
              confirmButtonColor: "rgb(255 112 8)",
              confirmButtonText: "OK",
            });
          } else {
            // alert("An error occurred while updating/adding availability.");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "An unexpected error occurred",
            confirmButtonText: "OK",
          });
        }
      }
    },

    async fetchAvailabilityStatusMethod() {
      if (!this.candidateId || !this.startDate) {
        // console.error("Candidate ID or start date is undefined.");
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/weekly_availability_for_candidate?candidate_id=${this.candidateId}&date=${this.startDate}`
        );
        this.updatedStatusData = response.data.data;
        // console.log(this.updatedStatusData);
        this.availabilityIds = this.updatedStatusData.reduce(
          (formattedData, candidate) => {
            if (candidate.availability) {
              const formattedDate = this.formatDate(
                candidate.availability.date
              );
              formattedData.push({
                date: formattedDate,
                candidate_status: candidate.availability.candidate_status || [],
                id: candidate.availability.availability_id,
              });
              this.selectedShifts[formattedDate] =
                candidate.availability.candidate_status || [];
            }
            return formattedData;
          },
          []
        );
      } catch (error) {
        // console.error("Error fetching availability:", error);
      }
    },
  },

  async mounted() {
    await Promise.all([
      this.initializeCalendar(),
      this.updateCurrentMonth(new Date(this.initialDate)),
      this.fetchAvailabilityStatusMethod(),
    ]);
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
.modal {
  overflow: hidden;
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
  grid-template-columns: repeat(3, 1fr);

  gap: 5px;
}
.day-header {
  background: #f9944b14;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
.bg-orange {
  background-color: orange !important;
}
.candidateTable,
.empty-day,
.calendar-day {
  text-align: center;
  cursor: pointer;
}
.candidateTable {
  border: 1px solid #f0efef;
  border-radius: 8px;
  margin: 10px;
}
.day-header {
  font-weight: bold;
}
.candidateTable {
  font-weight: normal;
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
input.custom-checkbox:checked + .checkbox-label {
  background-color: #ca5507 !important;
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
