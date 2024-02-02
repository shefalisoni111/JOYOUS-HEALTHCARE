<template>
  <div>
    <div id="main">
      <div class="d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              Dashboard / <span class="color-fonts">Custom TimeSheet</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <ul
                  class="nav nav-pills mb-3 d-flex justify-content-between"
                  id="pills-tab"
                  role="tablist"
                >
                  <div class="d-flex">
                    <div class="d-flex align-items-center">
                      <select
                        class="form-control"
                        v-model="currentView"
                        @change="updateDateRange"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    &nbsp;&nbsp;
                    <div class="d-flex align-items-center">
                      <span
                        v-if="currentView === 'weekly' && startDate && endDate"
                        class="fw-bold"
                      >
                        {{
                          "Monday " +
                          formatDate(startDate) +
                          " to Sunday " +
                          formatDate(endDate)
                        }}
                      </span>
                      <span v-else-if="currentView === 'monthly'" class="fw-bold">
                        {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                      </span>
                    </div>
                  </div>

                  <div v-if="currentView === 'weekly'">
                    <div>
                      <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                      <div v-for="(day, index) in getWeekDates" :key="index"></div>
                    </div>
                  </div>

                  <div v-else-if="currentView === 'monthly'">
                    <div>
                      <div v-for="(day, index) in getMonthDates" :key="index"></div>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    <div></div>
                  </div>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">Code</th>
                          <th scope="col">Name</th>
                          <th scope="col">Business Unit</th>
                          <th scope="col">Job</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Total Cost</th>
                          <th scope="col">Paper TimeSheet</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in getCustomDetail" :key="data.id">
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td v-text="data.code"></td>
                          <td v-text="data.name"></td>
                          <td v-text="data.business_unit"></td>
                          <td v-text="data.job"></td>
                          <td v-text="data.shift_date"></td>
                          <td v-text="data.start_time"></td>
                          <td v-text="data.end_time"></td>
                          <td v-text="data.total_hours"></td>
                          <td v-text="data.client_rate"></td>
                          <td v-text="data.total_cost"></td>
                          <td v-text="data.paper_timesheet"></td>
                          <td>
                            <i
                              type="button"
                              class="btn btn-outline-success text-nowrap bi bi-pencil-square"
                              data-bs-toggle="modal"
                              data-bs-target="#editCustomSheet"
                              data-bs-whatever="@mdo"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditCustomTimeSheet />
  </div>
</template>
<script>
import axios from "axios";
import EditCustomTimeSheet from "@/components/modals/TimeSheet/EditCustomTimeSheet.vue";

export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: null,
      endDate: null,
      getCustomDetail: [],
    };
  },
  components: { EditCustomTimeSheet },
  computed: {
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
  },
  methods: {
    updateDateRange() {
      const currentDate = new Date();

      if (this.currentView === "weekly") {
        this.startDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
        );
        this.endDate = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
        );
      } else if (this.currentView === "monthly") {
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      localStorage.setItem("currentView", this.currentView);
      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      const storedCurrentView = localStorage.getItem("currentView");
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");
      if (storedCurrentView) {
        this.currentView = storedCurrentView;
      }
      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },

    async createCustomSheetMethod() {
      axios
        .get(`${VITE_API_URL}/custom_timesheets`)
        .then((response) => (this.getCustomDetail = response.data));
    },
  },

  mounted() {
    this.createCustomSheetMethod();
    this.loadDateRangeFromLocalStorage();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;

  margin-top: 82px;
  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
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
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
