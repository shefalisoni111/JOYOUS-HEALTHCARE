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
        <div class="calendar">
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
          <div class="days">
            <div v-for="day in days" :key="day" class="day">
              <span :style="getDayPadding(day)">{{ day }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddHolidayCalender />
  </div>
</template>

<script>
import AddHolidayCalender from "../modals/appsetting/AddHolidayCalender.vue";

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
    };
  },
  components: {
    AddHolidayCalender,
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
    nextMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.currentDate = newDate;
      this.generateDays();
    },
    generateDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    getDayPadding(day) {
      return day < 10 ? "padding: 10px 14px;" : "padding: 11px 11px;";
    },
  },
  mounted() {
    this.generateDays();
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
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.day {
  text-align: center;
  padding: 40px;
  border: 1px solid #ccc;
}
.day span {
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

@media (max-width: 1200) {
  .day {
    padding: 16px;
  }
}
</style>
