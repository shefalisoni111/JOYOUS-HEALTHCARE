<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              /
              <router-link to="/invoice/client-invoice" class="text-decoration-none"
                ><span class="color-fonts">Client Invoice</span></router-link
              >
              /
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
                <!-- <div class="p-2">
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
                      <select v-model="site_id" id="selectBusinessUnit">
                        <option value="">All Site</option>
                        <option
                          v-for="option in businessUnit"
                          :key="option.id"
                          :value="option.id"
                          placeholder="Select BusinessUnit"
                        >
                          {{ option.site_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div> -->
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <!-- <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
                  <div>
                    <div v-for="(day, index) in getMonthDates" :key="index"></div>
                  </div>
                </div> -->

                <ul class="nav nav-pills mt-3 gap-2" id="pills-tab" role="tablist">
                  <li
                    class="nav-item d-inline-flex align-items-baseline gap-2"
                    role="presentation"
                  >
                    <button
                      class="nav-link text-nowrap"
                      :class="{ active: activeTab === index }"
                      :to="`/${tab.routeName}`"
                      aria-selected="true"
                      type="button"
                      role="tab"
                      data-bs-toggle="pill"
                      v-for="(tab, index) in tabs"
                      :key="index"
                      @click="selectTab(index)"
                    >
                      {{ tab.name }}
                    </button>
                  </li>
                </ul>
                <div>
                  <component :is="activeComponent"></component>
                </div>
                <!-- <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-Weekly"
                    role="tabpanel"
                    aria-labelledby="pills-Weekly-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th scope="col">Site</th>
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
                                {{ formatDate(date) }}
                              </div>
                            </div>
                          </th>
                          <th scope="col">Holiday</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">Site</td>
                          <td scope="col">weekend</td>
                          <td scope="col">11:00Am</td>
                     

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
                    Inprogress...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-Monthly"
                    role="tabpanel"
                    aria-labelledby="pills-Monthly-tab"
                  >
                    Inprogress...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-ShiftCandidate"
                    role="tabpanel"
                    aria-labelledby="pills-ShiftCandidate-tab"
                  >
                    Inprogress...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-CandidateWeekly"
                    role="tabpanel"
                    aria-labelledby="pills-CandidateWeekly-tab"
                  >
                    Inprogress...
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";

import WeeklyGenerateInvoice from "../InvoicePages/GenerateInvoices/WeeklyGenerateInvoice.vue";
import DailyGenerateInvoice from "../InvoicePages/GenerateInvoices/DailyGenerateInvoice.vue";
import MonthlyGenerateInvoice from "../InvoicePages/GenerateInvoices/MonthlyGenerateInvoice.vue";
import Shift_Staff_GenerateInvoice from "../InvoicePages/GenerateInvoices/Shift_Staff_GenerateInvoice.vue";
import Staff_Weekly_GenerateInvoice from "../InvoicePages/GenerateInvoices/Staff_Weekly_GenerateInvoice.vue";
import Loader from "../Loader/Loader.vue";

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
      tabs: [
        {
          name: "Weekly ",
          component: "WeeklyGenerateInvoice",
          routeName: "WeeklyGenerateInvoice",
        },
        {
          name: "Daily ",
          component: "DailyGenerateInvoice",
          routeName: "DailyGenerateInvoice",
        },
        {
          name: "Monthly",
          component: "MonthlyGenerateInvoice",
          routeName: "MonthlyGenerateInvoice",
        },
        {
          name: "Shift & Staff",
          component: "Shift_Staff_GenerateInvoice",
          routeName: "Shift_Staff_GenerateInvoice",
        },
        {
          name: "Staff Weekly",
          component: "Staff_Weekly_GenerateInvoice",
          routeName: "Staff_Weekly_GenerateInvoice",
        },
      ],
      activeTab: 0,
      activeTabName: "",
      isLoading: false,
    };
  },
  components: {
    WeeklyGenerateInvoice,
    DailyGenerateInvoice,
    MonthlyGenerateInvoice,
    Shift_Staff_GenerateInvoice,
    Staff_Weekly_GenerateInvoice,
    Loader,
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
  },
  methods: {
    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },

    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    async selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;

      const componentName = this.tabs[index].component;
      if (!this.$options.components[componentName]) {
        this.$options.components[componentName] = (
          await import(`../InvoicePages/GenerateInvoices/${componentName}.vue`)
        ).default;
      }

      this.$router.push({ name: this.tabs[index].routeName });
    },
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
  },

  mounted() {
    // this.createVacancy();
    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    this.updateDateRange();
    window.addEventListener("beforeunload", this.saveToLocalStorage);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex((tab) => tab.routeName === to.name);
      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex((tab) => tab.routeName === to.name);
    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }
    next();
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
