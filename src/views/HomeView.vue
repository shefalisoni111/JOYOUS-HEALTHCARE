<template>
  <div>
    <Navbar />
    <div id="main" class="main">
      <div class="pagetitle mx-4 mt-4" style="margin-top: 30px">
        <div class="d-flex justify-content-between">
          <div class="">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active fs-6">Dashboard</li>
            </ol>
            <h5 class="fs-4" style="color: #ff5f30">Welcome to Recpal</h5>
          </div>
          <!-- End Page Title -->
          <div class="d-flex align-items-center">
            <button
              type="button"
              class="btn btn-primary text-nowrap fs-5 text-capitalize"
              data-bs-toggle="modal"
              data-bs-target="#inprogress"
              data-bs-whatever="@mdo"
            >
              <i class="bi bi-file-earmark"></i>
              generate report
            </button>
          </div>
        </div>
      </div>
      <div v-if="getRecords">
        <section class="section dashboard mt-5">
          <div class="row">
            <!-- Left side columns -->
            <div class="col-lg-3 mb-3">
              <div class="row d-flex justify-content-center">
                <!-- Sales Card -->
                <h5
                  class="text-uppercase fw-bold d-flex justify-content-start fs-6 pb-2 ps-5"
                >
                  Client
                </h5>

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-blue">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-info"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllClient' }"
                              >Total Clients</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'AllClient' }"
                          >
                            <h6
                              v-text="getRecords.Total_client"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-green">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-success"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveClient' }"
                              >Active Clients</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'ActiveClient' }"
                          >
                            <h6
                              v-text="getRecords.Active_client"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-red">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-danger"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveClient' }"
                              >inactive Clients</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'InActiveClient' }"
                          >
                            <h6
                              v-text="getRecords.Passive_client"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- End Sales Card -->
              </div>
            </div>
            <!-- End Left side columns -->
            <!-- right side columns -->
            <div class="col-lg-3 mb-3">
              <div class="row d-flex justify-content-center">
                <!-- Sales Card -->
                <h5
                  class="text-uppercase fw-bold d-flex justify-content-start fs-6 pb-2 ps-5"
                >
                  Staff
                </h5>

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-blue">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-info"></i>
                          <span class="text-muted text-capitalize fs-6">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllCandidateListsDisplay' }"
                              >Total Staff
                            </router-link></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'AllCandidateListsDisplay' }"
                          >
                            <h6
                              v-text="getRecords.candidates"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- End Sales Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-green">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-success"></i>
                          <span class="text-muted text-capitalize fs-6">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveCandidate' }"
                              >active Staff</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'ActiveCandidate' }"
                          >
                            <h6
                              v-text="getRecords.current_candidate"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-red">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-danger"></i>
                          <span class="text-muted text-capitalize fs-6">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveCandidate' }"
                              >inactive Staff</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'InActiveCandidate' }"
                          >
                            <h6
                              v-text="getRecords.deleted_candidate"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->
              </div>
            </div>

            <div class="col-lg-3 mb-3">
              <div class="row d-flex justify-content-center">
                <!-- Sales Card -->
                <h5
                  class="text-uppercase fw-bold d-flex justify-content-start fs-6 pb-2 ps-5"
                >
                  Site
                </h5>
                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-blue">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-info"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllSite' }"
                              >Total Sites</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'AllSite' }"
                          >
                            <h6
                              v-text="getRecords.Total_business_unit"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-green">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-success"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveSite' }"
                              >active Sites</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'ActiveSite' }"
                          >
                            <h6
                              v-text="getRecords.Active_business_unit"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-red">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-danger"></i>
                          <span class="text-muted text-capitalize fs-6"
                            ><router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveSite' }"
                              >inactive Sites</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <router-link
                            class="text-capitalize text-decoration-none text-black"
                            :to="{ name: 'InActiveSite' }"
                          >
                            <h6
                              v-text="getRecords.Inactive_business_unit"
                              class="fs-3 fw-bold mb-0"
                            ></h6
                          ></router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->
              </div>
            </div>
            <!-- End Left side columns -->
            <!-- right side columns -->
            <div class="col-lg-3 mb-3">
              <div class="row d-flex justify-content-center">
                <!-- Sales Card -->
                <h5
                  class="text-uppercase fw-bold d-flex justify-content-start fs-6 pb-2 ps-5"
                >
                  Training Insight
                </h5>

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-blue">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-info"></i>
                          <span class="text-muted text-capitalize fs-6"
                            >Expiring in 60 days({{
                              getRecords.expiring_in_60_days
                            }})</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <span
                            class="text-muted pt-2 text-capitalize cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#inprogress"
                            data-bs-whatever="@mdo"
                            >See More</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 success-card sales-card border-left-green">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-success"></i>
                          <span class="text-muted text-capitalize fs-6">
                            Expiring in 30 days({{
                              getRecords.expiring_in_30_days
                            }})</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <span
                            class="text-muted pt-2 text-capitalize cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#inprogress"
                            data-bs-whatever="@mdo"
                            >See More</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-red">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-danger"></i>
                          <span class="text-muted text-capitalize fs-6">
                            Expired ({{ getRecords.compliance_insight }})</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <span
                            class="text-muted pt-2 text-capitalize cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#inprogress"
                            data-bs-whatever="@mdo"
                            >See More</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->
              </div>
            </div>
            <!-- End right side columns -->
          </div>
        </section>

        <section class="section dashboard mt-4 mb-4">
          <div class="row gx-5 mx-3">
            <!-- Left side columns -->

            <div class="col-sm-12 col-lg-4">
              <div class="card h-100 card-border">
                <div class="col-8 p-3">
                  <h5
                    class="fs-5 p-2 text-white mb-0 rounded-2"
                    style="background: #f9944b"
                  >
                    Shifts
                  </h5>
                  <div class="">
                    <ol class="breadcrumb mb-1">
                      <li class="breadcrumb-item active">Current Week</li>
                    </ol>
                  </div>
                </div>

                <div class="d-lg-flex justify-content-lg-between bg-white rounded mt-2">
                  <div class="col-sm-12 col-lg-5 px-3 d-flex align-items-center">
                    <div class="">
                      <ul class="list-unstyled">
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">{{
                                getShiftCount.activate_vacancy
                              }}</span>
                              <span class="d-flex ms-2">Open Shifts</span>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon2 mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">{{
                                getShiftCount.applied_vacancies
                              }}</span>
                              <span class="d-flex ms-2">Applied Shifts</span>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon3 mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">{{
                                getShiftCount.assigned_vacancies
                              }}</span>
                              <span class="d-flex ms-2">Assigned Shifts</span>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon4 mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">{{
                                getShiftCount.inactive_vacancies
                              }}</span>
                              <span class="d-flex ms-2">Inactive Shifts</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-sm-12 col-lg-7 px-3">
                    <VueBarChart />
                  </div>
                </div>
              </div>
            </div>
            <!-- Left side columns end -->

            <!-- right side columns -->
            <div class="col-sm-12 col-lg-8">
              <div class="card h-100 card-border">
                <div class="bg-white rounded">
                  <div class="col-lg-12 pt-3 ps-3">
                    <div class="d-lg-flex justify-content-lg-between">
                      <div class="col-7">
                        <h5
                          class="fs-5 p-2 text-white rounded-1"
                          style="background: #f9944b"
                        >
                          TimeSheet
                        </h5>
                      </div>
                      <div class="px-3 d-flex align-items-center">
                        <div class="d-flex justify-content-between">
                          <span
                            v-if="currentView === 'weekly' && startDate && endDate"
                            class="fw-bold d-flex align-items-center"
                          >
                            {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                          </span>
                          &nbsp;&nbsp;
                          <div class="d-flex align-items-center fs-4">
                            <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                            <i class="bi bi-calendar3"></i>
                            <!-- <i class="bi bi-calendar2-check-fill"></i> -->
                            <!-- <input type="month" id="dateInput" class="form-control" /> -->
                            <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 px-3">
                    <TimeSheet />
                  </div>
                </div>
              </div>
            </div>
            <!-- right side columns end -->
          </div>
        </section>
      </div>
    </div>
    <InProgress />
  </div>
</template>

<script>
import axios from "axios";
import VueBarChart from "../components/charts/VueBarChart.vue";
import TimeSheet from "../components/charts/TimeSheet.vue";
import Navbar from "../components/Navbar.vue";
import InProgress from "../components/modals/InProgress.vue";

export default {
  name: "Home",

  data() {
    return {
      currentView: "weekly",
      getRecords: [],
      startDate: new Date(),
      endDate: new Date(),
      getShiftCount: [],
    };
  },
  components: {
    VueBarChart,
    TimeSheet,
    Navbar,
    InProgress,
  },
  computed: {
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
    formatDate(date) {
      return date.toLocaleDateString();
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
    async fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/merchant_dashboard`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.getRecords = response.data.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    async FetchShiftsMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/home_vacancy_data`);
        this.getShiftCount = response.data.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
  },
  created() {
    if (!localStorage.getItem("calendarData")) {
      const today = new Date();
      const defaultStartDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      this.selectedMonth = defaultStartDate;
      this.updateDateRange();
    }

    this.loadDateRangeFromLocalStorage();
    this.fetchData();
    this.FetchShiftsMethod();
  },

  mounted() {
    this.loadDateRangeFromLocalStorage();
    // const timestamp = 1710480557621;
    // const date = new Date(timestamp);
    // console.log(date);
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
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
#main {
}
.left-flex-border,
.right-flex-border {
  border: 1px solid #80808042;
}
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #012970;
}
table.sizefix {
  font-size: 15px;
}
.rounddesign {
  background: #ffc107;
  padding: 9px 20px;
}

.bi-calendar2-check {
  top: 4px;
  right: 10px;
  font-size: 20px;
}
.card.totalbusinessunits-card {
  background-color: #ace1ec;
}

.card.totalbusinessunitsactive-card {
  background: #f4b58f;
}
.bgs-color {
  background-color: #ffa500;
  padding: 25px 30px;
}
.cursor-pointer {
  cursor: pointer;
}
.card.totalbusinessunitsinactive-card {
  background: #c8c3ec;
}

.card.totaldoc-card {
  background: #8ec02b;
}
.card.expiredoc-card {
  background: #ffe822;
}
.card.expireindays-card {
  background: #e14349;
}
ul.leftsidecol li {
  margin-top: 15px;
  font-size: 15px;
}

ul.leftsidecol li span.rounded-circle {
  font-size: 13px;
  width: 33px;
  height: 30px;
  text-align: center;
  padding-top: 5px;
}
ul.leftsidecol > li:nth-child(1) span.rounded-circle {
  background: #57e3b4;
}

ul.leftsidecol > li:nth-child(2) span.rounded-circle {
  background: #e66e65;
}
.btn-primary {
  border: none;
}
.card-header {
  background: transparent;
}
ul.leftsidecol > li:nth-child(3) span.rounded-circle {
  background: #22cbe0;
}
table td,
table th {
  padding: 8px;
}
table th.cw {
  transform: translateX(-34px);
}
#main {
  padding: 0px 20px;
  transition: all 0.3s;
  background: #fef8f8;
  padding-top: 65px;
  background-color: #fdce5e17;
}
h6 {
  font-size: 14px;
}

.card.sales-card {
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
.card.border-left-blue {
  border-left: 4px solid #2196f3;
}
.card.border-left-red {
  border-left: 4px solid red;
}
.card.border-left-green {
  border-left: 4px solid rgb(53, 119, 27);
}
.box-icon {
  width: 18px;
  height: 17px;
  background-color: #57e3b4;
  border-radius: 5px;
}
.box-icon2 {
  width: 18px;
  height: 17px;
  background-color: #e66e65;
  border-radius: 5px;
}
.box-icon3 {
  width: 18px;
  height: 17px;
  background-color: #22cbe0;
  border-radius: 5px;
}
.box-icon4 {
  width: 18px;
  height: 17px;
  background-color: #fc1414cf;
  border-radius: 5px;
}
.card-border {
  border: 0.8px solid #ff5722;
}
</style>
