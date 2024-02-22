<!-- <template>
  <div>
    <Navbar />
    <div id="main">
      <h6>Client Invoice Page in Progress.....</h6>
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;
  
  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
</style> -->

<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">Client Invoice</span> /
              <span class="color-fonts">Generate Invoice</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
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
                        <span
                          v-else-if="currentView === 'monthly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                        </span>
                      </div>
                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center fs-4">
                        <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                        <i class="bi bi-calendar2-check-fill"></i>
                        <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                      <select v-model="business_unit_id" id="selectBusinessUnit">
                        <option value="">All Business Unit</option>
                        <option
                          v-for="option in businessUnit"
                          :key="option.id"
                          :value="option.id"
                          placeholder="Select BusinessUnit"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
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

                <ul class="nav nav-pills mt-3 gap-2" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-Weekly-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Weekly"
                      type="button"
                      role="tab"
                      aria-controls="pills-Weekly"
                      aria-selected="true"
                    >
                      Weekly
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-Daily-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Daily"
                      type="button"
                      role="tab"
                      aria-controls="pills-Daily"
                      aria-selected="false"
                    >
                      Daily
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-Monthly-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-Monthly"
                      type="button"
                      role="tab"
                      aria-controls="pills-Monthly"
                      aria-selected="false"
                    >
                      Monthly
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-ShiftCandidate-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-ShiftCandidate"
                      type="button"
                      role="tab"
                      aria-controls="pills-ShiftCandidate"
                      aria-selected="false"
                    >
                      Shift & Candidate
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-CandidateWeekly-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-CandidateWeekly"
                      type="button"
                      role="tab"
                      aria-controls="pills-CandidateWeekly"
                      aria-selected="false"
                    >
                      Candidate Weekly
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-Weekly"
                    role="tabpanel"
                    aria-labelledby="pills-Weekly-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th scope="col">Business Unit</th>
                          <th scope="col">Week End</th>
                          <th>
                            <div class="calendar-grid">
                              <div
                                v-for="day in daysOfWeek"
                                :key="day"
                                class="day-header"
                              >
                                {{ day }}
                              </div>
                              <div
                                v-for="date in selectedDateRow"
                                :key="date"
                                class="day-header"
                              >
                                {{ date }}
                              </div>
                            </div>
                          </th>
                          <th scope="col">Holiday</th>
                          <!-- <th scope="col">Action</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">BusinessUnit</td>
                          <td scope="col">weekend</td>
                          <td scope="col">11:00Am</td>
                          <!-- <td scope="col">11:00Am</td>
                          <td scope="col">11:00Am</td>
                          <td scope="col">11:00Am</td>
                          <td scope="col">11:00Am</td>
                          <td scope="col">11:00Am</td>
                          <td scope="col">11:00Am</td> -->

                          <td scope="col">23/2/2024</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-Daily"
                    role="tabpanel"
                    aria-labelledby="pills-Daily-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-Montdly"
                    role="tabpanel"
                    aria-labelledby="pills-Monthly-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-ShiftCandidate"
                    role="tabpanel"
                    aria-labelledby="pills-ShiftCandidate-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-CandidateWeekly"
                    role="tabpanel"
                    aria-labelledby="pills-CandidateWeekly-tab"
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
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
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
      business_unit_id: "",
      businessUnit: [],
      selectedDateRow: [],
    };
  },
  components: { Navbar },
  computed: {
    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
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
  },
  methods: {
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/business_units`);
        this.businessUnit = response.data;
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
      const currentDate = new Date();
      this.selectedDateRow = [];
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay());
        this.startDate = weekStart;
        this.endDate = new Date(weekStart);
        this.endDate.setDate(this.endDate.getDate() + 6);
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }
      // Save the values to localStorage
      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      // Load values from localStorage on component mount
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      if (!(date instanceof Date)) {
        date = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), date);
      }
      return date.toLocaleDateString();
    },
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.createVacancy();
    //     });
    //   // alert("Record Deleted ");
    // },
    // async createVacancy() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get(`${VITE_API_URL}/vacancies`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => (this.getVacancyDetail = response.data));
    // },
  },

  mounted() {
    // this.createVacancy();
    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    window.addEventListener("beforeunload", this.saveToLocalStorage);
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
