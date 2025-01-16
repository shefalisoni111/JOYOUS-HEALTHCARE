<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            General settings / <span class="clr">HOLIDAY CALENDAR</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#addHolidayCalender"
          data-bs-whatever="@mdo"
          type="button"
        >
          + Add Holiday
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="mt-5">
        <div class="calendar candidateTable">
          <div class="header gap-3 mb-3">
            <button
              @click="prevMonth"
              class="btn btn-outline-success rounded-circle fw-bold"
            >
              <i class="bi bi-arrow-left"></i>
            </button>
            <span class="fw-bold">{{ currentMonth }}</span>
            <button
              @click="nextMonth"
              class="btn btn-outline-success rounded-circle fw-bold"
            >
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
          <div class="weekdays">
            <div class="weekday" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
          </div>

          <div class="days overflow-x-auto">
            <div
              v-for="(day, index) in days"
              :key="index"
              class="day"
              :class="{ empty: !day }"
            >
              <span v-if="day" class="date_round" :style="getDayPadding(day)">{{
                day
              }}</span>

              <div v-for="date in getHolidayData" :key="date.id" class="mt-3">
                <span v-if="date.holiday_date === formatDate(day)" class="event-data">
                  <span class="fw-bold text-white text-capitalize mt-2">{{
                    date.title
                  }}</span>
                  <span class="icon-actions">
                    <i
                      class="bi bi-pencil-square text-white mx-2 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#editHolidayCalender"
                      data-bs-whatever="@mdo"
                      type="button"
                      @click="editHoliday(date.id)"
                      title="Edit Holiday"
                    ></i>
                    <i
                      class="bi bi-trash text-white mx-2 cursor-pointer"
                      @click="deleteHoliday(date.id)"
                      title="Delete Holiday"
                    ></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddHolidayCalender @updateListHoliday="getHolidayDateMethod" />
    <EditHolidayCalender
      @updateHoliday="getHolidayDateMethod"
      :holidayCalenderID="selectedVacancyId || 0"
    />
  </div>
</template>

<script>
import axios from "axios";
import AddHolidayCalender from "../modals/appsetting/AddHolidayCalender.vue";
import EditHolidayCalender from "../modals/appsetting/EditHolidayCalender.vue";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      currentDate: new Date(),
      days: [],
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      getHolidayData: [],
      getHolidayDataShow: [],
      selectedVacancyId: 0,
    };
  },
  components: {
    AddHolidayCalender,
    EditHolidayCalender,
  },

  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    },
  },
  methods: {
    prevMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.currentDate = newDate;
      this.generateDays();
    },
    formatDate(day) {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth() + 1;
      const formattedDay = day < 10 ? "0" + day : day;
      return `${year}-${month < 10 ? "0" + month : month}-${formattedDay}`;
    },
    nextMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.currentDate = newDate;
      this.generateDays();
    },
    generateDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      // Get the total number of days in the current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Get the day of the week for the 1st day of the month (0 = Sunday, 6 = Saturday)
      const firstDayOfWeek = new Date(year, month, 1).getDay();

      // Create an array with empty slots for the days before the 1st of the month
      const emptyDays = Array((firstDayOfWeek === 0 ? 7 : firstDayOfWeek) - 1).fill(null);

      // Create an array for the actual days of the month
      const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      // Combine the empty slots and the actual days
      this.days = [...emptyDays, ...monthDays];
    },

    getDayPadding(day) {
      return day < 10 ? "padding: 10px 14px;" : "padding: 11px 11px;";
    },
    async getHolidayDateMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/holiday_calenders`);

        this.getHolidayData = response.data;
      } catch (error) {}
    },
    async editHoliday(id) {
      this.selectedVacancyId = id;
    },
    async deleteHoliday(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          await axios.delete(`${VITE_API_URL}/holiday_calenders/${id}`);

          await this.getHolidayDateMethod();

          Swal.fire("Deleted!", "The holiday has been deleted.", "success");
        }
      } catch (error) {}
    },
  },
  mounted() {
    this.generateDays();
    this.getHolidayDateMethod();
  },
};
</script>

<style scoped>
.header {
  display: flex;

  align-items: center;
  margin-bottom: 10px;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  background-color: #f9944b;
  font-weight: bold;
}
.weekday {
  text-align: center;
  padding: 5px;
}
.event-data {
  background: #198754;

  padding: 2px;
  margin-top: 8px;
}
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.day {
  text-align: center;
  padding: 40px;
  border: 1px solid #ccc;
}
.day span.date_round {
  padding: 10px 14px;
  border-radius: 50%;
  background: #ff9800a3;
}

td i.bi-trash {
  border: 1px solid #9e9e9e;
  padding: 3px 15px;
  border-radius: 4px;
}
.showdata .nav-link {
  color: #000;
}
.showdata .nav-link.active {
  background: #e8e3e3;
  margin-left: 4px;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
}
.pagesetting p span::after {
  content: "";
}

.btn-primary {
  border: none;
}
.day.empty {
  background-color: transparent;
  border: none;
  pointer-events: none;
}
table thead th {
  background-color: #f9944b !important;
}
table {
  border-collapse: separate;
}
.table th,
.table td {
  text-align: center;
  width: 11.2857%;
}
.table td:last-child {
  width: 16% !important;
}
.table th:last-child {
  width: 16% !important;
}

@media (max-width: 1308) {
  .candidateTable {
    width: 800px;
  }
  .day {
    padding: 16px;
  }
}
</style>
