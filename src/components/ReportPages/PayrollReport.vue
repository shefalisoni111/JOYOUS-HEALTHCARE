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
              <div class="gap-2 d-xs-grid d-sm-grid d-md-grid d-lg-flex ms-2">
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
                  <option value="">All Site</option>
                  <option
                    v-for="option in businessUnit"
                    :key="option.id"
                    :value="option.id"
                    placeholder="Select BusinessUnit"
                  >
                    {{ option.name }}
                  </option>
                </select>
                <select v-model="id" id="selectCandidateList">
                  <option value="">All Staff Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>

                <select v-model="id" id="selectCandidateList">
                  <option value="">All Staff</option>
                  <option
                    v-for="option in candidateLists"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.first_name }}
                  </option>
                </select>
                <select v-model="employment_type_id" id="selectEmployeeType">
                  <option value="">All Employee Type</option>
                  <option
                    v-for="option in employeeData"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.title }}
                  </option>
                </select>
                <select v-model="job_id" id="selectOption">
                  <option value="">All Position</option>
                  <option v-for="option in options" :key="option.id" :value="option.id">
                    {{ option.name }}
                  </option>
                </select>
                <select v-model="client_id">
                  <option value="">All Payroll Frequency</option>
                </select>
                <select v-model="client_id">
                  <option value="">Status</option>
                </select>
              </div>
              <div>
                <div class="p-2 mt-2">
                  <div
                    class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between"
                  >
                    <div
                      class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between"
                    >
                      <div class="d-flex align-items-center gap-2">
                        <select>
                          <option>By Shift Date :</option>
                        </select>
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
                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center fs-4">
                          <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                          <i class="bi bi-calendar2-check-fill"></i>
                          <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center mt-lg-0 mt-3">
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-download"></i> Export CSV
                      </button>
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-download"></i> Export CSV(All)
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
                          <!-- <th scope="col">#Type</th> -->
                          <th scope="col">Employee Code</th>

                          <th scope="col">Employee First Name</th>
                          <th scope="col">Employee Last Name</th>
                          <th scope="col">Position</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Approved Date</th>
                          <th scope="col">Payment Ref</th>

                          <th scope="col">Payroll Id</th>
                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Total Hours(Pay)</th>
                          <th scope="col">Pay Rate</th>
                          <th scope="col">Total Hours(exc NIer)</th>
                          <th scope="col">Total Hours(Change)</th>
                          <th scope="col">Change Rate</th>
                          <th scope="col">Total Change</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">57820534</td>

                          <td scope="col">Aniket</td>
                          <td scope="col">Yadav</td>
                          <td scope="col">Manager</td>
                          <td scope="col">clientDemo</td>
                          <td scope="col">Site</td>
                          <td scope="col">23/2/2024</td>
                          <td scope="col">2/2/2024</td>
                          <td scope="col">online</td>

                          <td scope="col">565664</td>
                          <td scope="col">12:00</td>
                          <td scope="col">7:00</td>
                          <td scope="col">8</td>
                          <td scope="col">£45</td>
                          <td scope="col">8</td>
                          <td scope="col">7</td>
                          <td scope="col">£23</td>
                          <td scope="col">1</td>
                          <td scope="col">active</td>
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
      candidateLists: [],
      id: "",
      candidateStatus: [],
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
    selectCandidateList() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
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
    async getCandidateListMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);
        this.candidateLists = response.data.data;
        this.candidateStatus = response.data.data.status;
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
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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
    this.getCandidateListMethod();
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    this.startDate = startOfWeek;

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    this.endDate = endOfWeek;
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
