<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th rowspan="3">ID</th>

              <th rowspan="3">Site</th>
              <th rowspan="3">Shift</th>
              <th>
                <div class="calendar-grid text-center">
                  <div v-for="day in daysOfWeek" :key="day" class="day-header">
                    {{ day }}
                  </div>
                  <div v-for="date in selectedDateRow" :key="date" class="day-header">
                    {{ formatDate(date) }}

                    <div
                      class="additional-column day-header d-flex justify-content-center"
                    >
                      <tr>
                        <th
                          class="additional-header"
                          style="border-right: 1px solid #e1d4d4; padding-right: 5px"
                        >
                          Start
                        </th>
                        <th
                          class="additional-header"
                          style="
                            border-right: 1px solid #e1d4d4;
                            padding-left: 5px;
                            padding-right: 5px;
                          "
                        >
                          End
                        </th>
                        <th class="additional-header" style="padding-left: 5px">Total</th>
                      </tr>
                    </div>
                  </div>
                </div>
              </th>
              <th rowspan="3">Holiday</th>
              <th rowspan="3">Approved By</th>
              <!-- <th rowspan="3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" checked />
                  </div>
                </th> -->
            </tr>
          </thead>
          <tbody v-if="candidateList?.length > 0">
            <tr v-for="data in candidateList" :key="data.id">
              <td>{{ data.id }}</td>

              <td>
                {{ data.site ? data.site : "Null" }}
              </td>
              <td>{{ data.shift_date }}</td>

              <td>
                <div class="calendar-grid">
                  <div
                    v-for="day in selectedDateRow"
                    :key="day"
                    data-bs-toggle="modal"
                    data-bs-target="#editWeeklyTs"
                    data-bs-whatever="@mdo"
                    @click="openModal(data, day)"
                    :class="{
                      'calendar-day': true,
                      clickable: day !== '',
                    }"
                    class="d-flex justify-content-between gap-2"
                  >
                    <div v-if="formatDate(day)" class="d-flex gap-2">
                      <td>
                        <div class="column">
                          <div class="column-cell">
                            {{
                              typeof data.start_time === "number"
                                ? data.start_time.toFixed(2)
                                : data.start_time === null
                                ? "null"
                                : data.start_time
                            }}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="column">
                          <div class="column-cell">
                            {{
                              typeof data.end_time === "number"
                                ? data.end_time.toFixed(2)
                                : data.end_time === null
                                ? "null"
                                : data.end_time
                            }}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="column">
                          <div class="column-cell">
                            {{
                              typeof data.total_hours === "number"
                                ? data.total_hours.toFixed(2) + " hours"
                                : data.total_hours === null
                                ? "null"
                                : data.total_hours + " hours"
                            }}
                          </div>
                        </div>
                      </td>
                    </div>
                  </div>
                </div>
              </td>
              <td>Holiday</td>
              <td>{{ data.approved_by ? data.approved_by : "Null" }}</td>
              <!-- <th>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" />
                  </div>
                </th> -->
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-danger text-center">
                {{ errorMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      startDate: new Date(),
      endDate: new Date(),
      site_id: "",
      businessUnit: [],
      candidateList: [],
      errorMessage: "",
    };
  },
  components: {},
  computed: {
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    getWeekDates() {
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },
    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },

    formattedDates() {
      return this.selectedDateRow.map((day) => this.formatDate(day));
    },

    formattedStartDate() {
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
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
  },
  methods: {
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
    },

    updateDateRange() {
      if (this.currentView === "weekly") {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diff);
        this.startDate = startOfWeek;

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        this.endDate = endOfWeek;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      try {
        const requestData = {
          date: this.formattedStartDate,
        };

        const response = await axios.get(
          `${VITE_API_URL}/find_timesheets_according_week`,
          {
            params: requestData,
          }
        );
        this.dataCustomTimeSheet = response.data.custom_timesheets;
        const mergedTimeSheets = [
          ...response.data.custom_timesheets,
          ...response.data.sign_timesheets,
        ];
        this.candidateList = mergedTimeSheets;
        if (this.candidateList.length === 0) {
          this.errorMessage = "No Weekly timesheets found for the specified Week";
        } else {
          this.errorMessage = "";
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    // this.createVacancy();
    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    this.updateDateRange();
    window.addEventListener("beforeunload", this.saveToLocalStorage);
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
    // const currentDate = new Date();
    // const dayOfWeek = currentDate.getDay();
    // const startOfWeek = new Date(currentDate);

    // const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    // startOfWeek.setDate(startOfWeek.getDate() + diff);

    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(endOfWeek.getDate() + 6);
    // this.endDate = endOfWeek;
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;
  padding-top: 65px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
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

.nav-pills .nav-link {
  color: #ff5f30;
  border: 1px solid #ff5f30 !important;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}

.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green !important;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;

  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
