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
              / <span class="color-fonts">Signed TimeSheet</span>
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
                    <div class="d-flex gap-3 align-items-center">
                      <!-- <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button> -->
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <!-- <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div> -->

                <div class="d-flex gap-2 mb-3 justify-content-between">
                  <div class="d-flex gap-2">
                    <div></div>
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
                        <!-- <select
                        class="form-control"
                        v-model="currentView"
                        @change="updateDateRange"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select> -->
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
                    <div>
                      <div>
                        <div v-for="(day, index) in getMonthDates" :key="index"></div>
                      </div>
                    </div>
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
                      <option value="">All Staff</option>
                      <option
                        v-for="option in candidateLists"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.first_name }}
                      </option>
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
                <div class="tab-content mt-3" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-pendingSigned"
                    role="tabpanel"
                    aria-labelledby="pills-pendingSigned-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">ID</th>
                          <th scope="col">Type</th>
                          <th scope="col">Staff</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>

                          <th scope="col">Date</th>

                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Break</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Approve</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="data in getPendingSignedData" :key="data.id">
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td scope="col">{{ data.id }}</td>
                          <td scope="col">{{ data.status }}</td>
                          <td scope="col">{{ data.author_name }}</td>
                          <td scope="col">{{ data.client }}</td>
                          <td scope="col">{{ data.business_unit }}</td>

                          <td scope="col">{{ data.date }}</td>
                          <td scope="col">{{ data.start_time }}</td>

                          <td scope="col">{{ data.end_time }}</td>
                          <td scope="col">{{ data.break }}</td>
                          <td scope="col">{{ data.total_hours }}</td>

                          <td scope="col"></td>
                          <td scope="col">
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#signedTimeSheetView"
                              data-bs-whatever="@mdo"
                              @click="openSignedView(data.id)"
                            >
                              <i class="bi bi-eye"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SignedTimesheetViewVue :id="selectedSignedTimesheetId" />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";

import SignedTimesheetViewVue from "../modals/TimeSheet/SignedTimesheetView.vue";

export default {
  data() {
    return {
      currentView: "monthly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      client_id: "",
      clientData: [],
      business_unit_id: "",
      businessUnit: [],
      candidateLists: [],
      id: "",
      selectedSignedTimesheetId: "",
      getPendingSignedData: [],
    };
  },
  components: { Navbar, SignedTimesheetViewVue },
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

    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },

    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return client_id ? client_id.first_name : "";
    },

    selectCandidateList() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },
  },
  methods: {
    openSignedView(id) {
      this.selectedSignedTimesheetId = id;
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
    async signedTimeSheetMethod() {
      const token = localStorage.getItem("token");
      axios
        .get(`${VITE_API_URL}/find_sign_time_sheet_according_status/Pending`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => (this.getPendingSignedData = response.data.sign_timesheets));
    },
  },

  mounted() {
    this.currentView = "monthly";
    this.updateDateRange();
    this.getBusinessUnitMethod();

    this.getClientMethod();

    this.getCandidateListMethod();
    this.signedTimeSheetMethod();
    // this.loadDateRangeFromLocalStorage();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
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
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.nav-pills .nav-link {
  border: 1px solid #ff5f30 !important;
  color: #ff5f30;
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
</style>
