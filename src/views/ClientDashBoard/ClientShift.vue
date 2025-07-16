<template>
  <div>
    <div id="main" class="main d-flex sidebar">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <ClientNavbar />
      </div>
      <div class="container-fluid p-4">
        <div id="main">
          <div class="pagetitle d-flex justify-content-between px-2">
            <div class="py-3">
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item active">
                  <a
                    class="nav-link d-inline fs-4 fw-bolder"
                    style="color: #000000"
                    >Client Shift</a
                  >
                  <p>
                    <router-link
                      class="nav-link d-inline fw-bolder"
                      style="color: #000000"
                      aria-current="page"
                      to="/staff-list"
                      >Client Shift</router-link
                    >
                    / {{ activeTabName }} Shifts
                  </p>
                </li>
              </ol>
            </div>
            <div class="align-items-center">
              <div>
                <button
                  v-if="activeTab === 0"
                  class="btn btn-lg text-white"
                  style="background-color: #f9944b"
                  data-bs-toggle="modal"
                  data-bs-target="#addShiftClient"
                  data-bs-whatever="@mdo"
                >
                  + Add Shift
                </button>
                &nbsp;&nbsp;
              </div>
            </div>
          </div>

          <div class="container-fluid mt-3">
            <div class="row">
              <div class="col-12">
                <div class="d-flex gap-2 justify-content-between"></div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="">
                  <div>
                    <ul
                      class="nav nav-pills mb-3 d-flex justify-content-between mt-3 p-0"
                      id="pills-tab"
                      role="tablist"
                    >
                      <div
                        style="
                          background: #fff;
                          border-radius: 60px;
                          padding: 10px 10px;
                        "
                      >
                        <li class="nav-item d-flex gap-2" role="presentation">
                          <button
                            class="nav-link"
                            :class="{ active: activeTab === index }"
                            aria-selected="true"
                            type="button"
                            role="tab"
                            v-for="(tab, index) in tabs"
                            :key="index"
                            @click="selectTab(index)"
                          >
                            {{ tab.name }}
                          </button>
                        </li>
                      </div>
                      <div class="d-flex">
                        <div class="d-flex align-items-center gap-2">
                          <div class="view-toggle">
                            <button
                              :class="[
                                'toggle-btn',
                                currentView === 'weekly' ? 'active' : '',
                              ]"
                              @click="
                                currentView = 'weekly';
                                updateDateRange();
                              "
                            >
                              Weekly
                            </button>
                            <button
                              :class="[
                                'toggle-btn',
                                currentView === 'monthly' ? 'active' : '',
                              ]"
                              @click="
                                currentView = 'monthly';
                                updateDateRange();
                              "
                            >
                              Monthly
                            </button>
                          </div>
                        </div>

                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center">
                          <span
                            v-if="
                              currentView === 'weekly' && startDate && endDate
                            "
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
                            v-else-if="
                              currentView === 'monthly' && startDate && endDate
                            "
                            class="fw-bold"
                          >
                            {{
                              formatDate(startDate) +
                              " to " +
                              formatDate(endDate)
                            }}
                          </span>
                        </div>
                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center fs-4">
                          <i
                            class="bi bi-caret-left-fill"
                            @click="moveToPrevious"
                          ></i>
                          <i class="bi bi-calendar2-check-fill"></i>
                          <i
                            class="bi bi-caret-right-fill"
                            @click="moveToNext"
                          ></i>
                        </div>
                      </div>
                    </ul>
                    <div>
                      <component
                        :is="activeComponent"
                        :startDate="startDate"
                        :currentView="currentView"
                        :options="options"
                        :siteData="siteData"
                      ></component>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-3"
        style="text-align: right"
        v-if="getVacancyDetail?.length > 8"
      >
        <button class="btn btn-outline-dark btn-sm">
          {{ totalRecordsOnPage }} Records Per Page
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm btn-primary mr-2"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous</button
        >&nbsp;&nbsp; <span>{{ currentPage }}</span
        >&nbsp;&nbsp;
        <button
          class="btn btn-sm btn-primary ml-2"
          :disabled="currentPage * itemsPerPage >= searchResults.length"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
    <!-- <AddVacancy @addVacancy="createVacancy" /> -->
    <!-- <AddClietShift @addVacancy="createVacancy" /> -->
  </div>
</template>
<script>
import axios from "axios";
import AssignedShift from "../../components/ClientDashBoard/ClientShiftPages/AssignedShift.vue";
import ClosedShift from "../../components/ClientDashBoard/ClientShiftPages/ClosedShift.vue";
import DeletedShift from "../../components/ClientDashBoard/ClientShiftPages/DeletedShift.vue";
import OpenShift from "../../components/ClientDashBoard/ClientShiftPages/OpenShift.vue";
import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";
// import AddVacancy from "../modals/Vacancy/AddVacancy.vue";
// import AddClietShift from "../../components/modals/ClientDashboard/ClientShift_pages/AddClietShift.vue";

export default {
  data() {
    return {
      currentView: "weekly",
      startDate: new Date(),
      getVacancyDetail: [],
      siteData: [],
      options: [],
      endDate: new Date(),
      tabs: [
        { name: "Open", component: "OpenShift", routeName: "OpenShift" },
        {
          name: "Assigned ",
          component: "AssignedShift",
          routeName: "AssignedShift",
        },
        {
          name: "ClosedShift",
          component: "ClosedShift",
          routeName: "ClosedShift",
        },
        {
          name: "DeletedShift",
          component: "DeletedShift",
          routeName: "DeletedShift",
        },
      ],
      activeTab: 0,

      activeTabName: "",
      currentPage: 1,
      itemsPerPage: 10,
    };
  },

  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    paginationVacancySearch() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginationVacancySearch.length;
    },
  },
  components: {
    AssignedShift,
    ClosedShift,
    DeletedShift,
    OpenShift,
    ClientNavbar,
  },

  methods: {
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
    },
    async selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;

      const componentName = this.tabs[index].component;
      if (!this.$options.components[componentName]) {
        this.$options.components[componentName] = (
          await import(`./shift/${componentName}.vue`)
        ).default;
      }

      this.$router.push({ name: this.tabs[index].routeName });
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },
    updateVacancyInList(updatedVacancy) {
      const index = this.getVacancyDetail.findIndex(
        (vacancy) => vacancy.id === updatedVacancy.id
      );

      if (index !== -1) {
        this.$set(this.getVacancyDetail, index, updatedVacancy);
      }
    },
    async createVacancy() {
      if (this.getVacancyDetail.length === 0) {
        const token = localStorage.getItem("token");
        this.isLoading = true;
        await axios
          .get(`${VITE_API_URL}/find_current_week_vacancies`, {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((response) => {
            this.getVacancyDetail = response.data.data;

            localStorage.setItem(
              "vacancies",
              JSON.stringify(this.getVacancyDetail)
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
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
        // this.updateDateRange();
      }
      // this.createVacancy();
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
        // this.updateDateRange();
      }
      // this.createVacancy();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(
          this.startDate.getDate() - this.startDate.getDay() + 1
        );
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        this.endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
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
    async getClientFetchSiteMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_job_list`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.options = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async getSiteNameMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_sites`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.siteData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
  },

  created() {
    this.setActiveTabNameOnLoad();
    // this.createVacancy();
  },
  mounted() {
    // this.createVacancy();
    // this.currentView = "weekly";
    this.loadDateRangeFromLocalStorage();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    this.getClientFetchSiteMethod();
    this.getSiteNameMethod();
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex(
        (tab) => tab.routeName === to.name
      );
      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex(
      (tab) => tab.routeName === to.name
    );
    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }
    next();
  },
};
</script>

<style scoped>
.withShow {
  width: 5%;
}
#main {
  transition: all 0.3s;
  height: 100vh;
  background-color: rgb(249 249 249);
}

.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: rgb(249 249 249);
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.table.candidateTable td.widthDefine {
  white-space: pre-wrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-check-input {
  border: 2px solid grey;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #000000 !important;
  width: 100;
  height: 37;
  color: #fff !important;
  border-radius: 13px;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
  border-bottom: none !important;
}
.nav-link,
.nav-link:hover,
.nav-link:focus {
  color: #667085;
}
.nav-pills {
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
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
.view-toggle {
  display: inline-flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f6f6f6;
  line-height: 37px;
  gap: 5px;
}
.toggle-btn {
  padding: 6px 16px;
  border: none;
  background: #fff;
  color: #5a5560;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.toggle-btn.active {
  background-color: #f9944b;
  color: white;
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
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
