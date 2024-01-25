<template>
  <div class="nested-calendar" id="nested-calendar">
    <div class="nested-calendar-content">
      <div class="calendar-header d-flex justify-content-between my-3">
        <div class="d-flex">
          <button class="btn btn-primary" @click="goToPreviousMonth">
            <i class="bi bi-caret-left-fill"></i>
          </button>
          <div class="current-month d-flex align-items-center">
            {{
              currentDate.toLocaleString("default", { month: "long", year: "numeric" })
            }}
          </div>
          <button class="btn btn-primary" @click="goToNextMonth">
            <i class="bi bi-caret-right-fill"></i>
          </button>
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
      <div class="calendar-grid">
        <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</div>
        <div v-for="blankDay in leadingBlankDays" :key="blankDay" class="empty-day"></div>
        <div v-for="dayData in calendarData" :key="dayData.date" class="calendar-day">
          <div class="day-number">{{ dayData.day }}</div>
          <div class="shift-checkboxes d-flex flex-column">
            <div>
              <input
                type="radio"
                id="early"
                name="shiftsGroup"
                v-model="dayData.selectedShift"
                :value="'Early'"
                @click="updateDate(dayData.date, 'Early')"
              />
              <label for="early" class="ps-1">E</label>
              &nbsp;
              <input
                type="radio"
                id="late"
                name="shiftsGroup"
                v-model="dayData.selectedShift"
                :value="'Late'"
                @click="updateDate(dayData.date, 'Late')"
              />
              <label for="late" class="ps-1">L</label>
            </div>
            <div>
              <input
                type="radio"
                id="night"
                name="shiftsGroup"
                v-model="dayData.selectedShift"
                :value="'Night'"
                @click="updateDate(dayData.date, 'Night')"
              />
              <label for="night" class="ps-1">N</label>
              &nbsp;
              <input
                type="radio"
                id="unavailable"
                name="shiftsGroup"
                v-model="dayData.selectedShift"
                :value="'Unavailable'"
                @click="updateDate(dayData.date, 'Unavailable')"
              />
              <label for="unavailable" class="ps-1">U</label>
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
  },
  data() {
    return {
      currentDate: new Date(),
      calendarData: [],
      candidate_id: this.candidateId,
      date: "",
      status: "",
    };
  },
  created() {
    this.candidate_id = this.candidateId;
  },
  watch: {
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
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
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
    handleButtonClick() {
      this.addCandidateStatus();
      this.closeNestedCalendar();
    },
    updateCurrentMonth(date) {
      if (date instanceof Date && !isNaN(date)) {
        this.currentMonth = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      }
    },
    goToPreviousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
      this.updateCurrentMonth(this.currentDate);
    },
    goToNextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
      this.updateCurrentMonth(this.currentDate);
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
            formattedDate: "",
          },
        };
      });
    },
    updateDate(selectedDate, shift) {
      this.date = selectedDate;

      const dayData = this.calendarData.find((data) => data.date === selectedDate);
      if (dayData) {
        dayData.shifts[shift] = !dayData.shifts[shift];
      }

      const selectedShifts = Object.keys(dayData.shifts)
        .filter((key) => dayData.shifts[key])
        .join(", ");

      this.status = selectedShifts ? selectedShifts : "";
    },
    // addCandidateStatus: async function () {
    //   try {
    //     const parsedDate = new Date(this.date);

    //     if (isNaN(parsedDate)) {
    //       return;
    //     }

    //     const formattedDate = parsedDate.toLocaleDateString("en-CA", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //     });
    //     const data = {
    //       candidate_id: this.candidate_id,
    //       date: formattedDate,
    //       status: this.status,
    //     };

    //     const response = await axios.post(`${VITE_API_URL}/availabilitys`, data, {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     // if (data) {
    //     //   alert("Availability added successfully");
    //     //   window.location.reload();
    //     // } else {

    //     // }
    //   } catch (error) {}
    // },
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

        const isUpdate = this.status;

        const isSameDate = formattedDate === this.existingDate;
        const isStatusAlreadyAdded = this.isStatusAlreadyAdded();

        if (isUpdate && !isSameDate && isStatusAlreadyAdded) {
          if (!window.confirm("Are you Sure ?")) {
            return;
          }
          const putResponse = await axios.put(
            `${VITE_API_URL}/availabilitys/${this.candidate_id}`,
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
            this.fetchCandidateList();
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
            this.fetchCandidateList();
            // this.$emit("Candidate-availability");
          } else {
            // console.error("Failed to add availability");
          }
        }
      } catch (error) {
        // console.error("Error updating/adding availability:", error);
      }
    },
    isStatusAlreadyAdded: async function () {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/availabilitys/${this.candidate_id}`,
          {
            params: {
              date: this.date,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        return response.data && response.data.status !== undefined;
      } catch (error) {
        // console.error("Error checking status:", error);
        return false;
      }
    },
    async fetchCandidateList() {
      try {
        const response = await axios.get(`${VITE_API_URL}/availabilitys`);
        this.candidateList = response.data;
      } catch (error) {}
    },
    async fetchStatus() {
      try {
        const response = await axios.get(`${VITE_API_URL}/availabilitys`);
        this.candidateList = response.data.data;
      } catch (error) {}
    },
  },

  async created() {
    await this.fetchCandidateList();
    this.initializeCalendar();
    this.updateCurrentMonth(this.initialDate);
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

/* Adjust the styles as needed */
</style>
