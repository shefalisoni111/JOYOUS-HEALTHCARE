<!-- <template>
  <div>
    <Navbar />
    <div id="main">
      <h6>PAyroll Page in Progress.....</h6>
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
</style> -->

<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex ms-2 justify-content-between">
                <div class="d-flex gap-2">
                  <select v-model="client_id" id="selectClients">
                    <option value="">All Client</option>
                    <option
                      v-for="option in clientData"
                      :key="option.id"
                      :value="option.id"
                      aria-placeholder="Select Job"
                    >
                      {{ option.first_name }}
                    </option>
                  </select>
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

                  <select v-model="client_id">
                    <option value="">All Candidate</option>
                  </select>
                </div>

                <div>
                  <form
                    class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                  >
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search by Name"
                      aria-label="Search"
                    />
                  </form>
                </div>
              </div>
              <div>
                <div class="p-2">
                  <div
                    class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between"
                  >
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
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

                    <div class="d-flex gap-3 align-items-center mt-lg-0 mt-3">
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-download"></i> Export CSV
                      </button>

                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button>
                    </div>
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
                <div class="tab-content mt-4" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sender</th>

                          <th scope="col">Recipient</th>
                          <th scope="col">Status</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Recipient Domain</th>
                          <th scope="col">Date Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">Aniket</td>

                          <td scope="col">Prabhu</td>
                          <td scope="col">Active</td>
                          <td scope="col">BusinessUnit Report</td>
                          <td scope="col">Recipient Domain</td>
                          <td scope="col">23/2/2024</td>
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
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      startDate: new Date(),
      endDate: new Date(),
      client_id: "",
      clientData: [],
      business_unit_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
      employeeData: [],
      employment_type_id: "",
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
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return client_id ? client_id.first_name : "";
    },
    selectEmployeeType() {
      const employment_type_id = this.employeeData.find(
        (option) => option.id === this.employment_type_id
      );
      return employment_type_id ? employment_type_id.title : "";
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
  },
  methods: {
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getEmployeeTypeMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/employment_types`);
        this.employeeData = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
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
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
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
    this.getPositionMethod();
    this.getClientMethod();
    this.getEmployeeTypeMethod();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;

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
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
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
.reportTable tr:nth-child(odd) td {
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
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}

@media (max-width: 1120px) {
  .reportTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
