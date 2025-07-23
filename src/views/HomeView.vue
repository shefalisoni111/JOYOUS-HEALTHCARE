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
        <Navbar />
      </div>
      <div class="container-fluid">
        <div class="row pagetitle mt-4 mx-2" style="margin-top: 31px">
          <div class="d-flex justify-content-between">
            <div class="">
              <h3 class="fs-4 fw-bolder" style="color: #000000">
                Welcome to Recpal
              </h3>
            </div>
            <!-- End Page Title -->
            <div class="d-flex align-items-center">
              <router-link
                type="button"
                class="text-nowrap fs-5 text-capitalize text-decoration-none"
                style="
                  color: #f9944b;
                  font-family: Inter;
                  font-weight: 600;
                  font-size: 14px;
                "
                to="/report"
              >
                <i class="bi bi-download"></i>
                generate report
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="getRecords">
          <section class="section dashboard px-4 mt-5">
            <div class="row">
              <!-- Left side columns -->
              <div class="col-lg-6 mb-3">
                <div class="row d-flex">
                  <!-- Sales Card -->

                  <div class="col-12 mb-3 pb-2">
                    <div
                      class="card h-100 info-card sales-card border-left-blue py-4"
                    >
                      <h5 class="card-title fw-bold d-flex fs-6 m-2 ps-3">
                        Client Overview
                      </h5>

                      <div class="card-body py-1">
                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Sales.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'AllClient' }"
                            >
                              <h6
                                v-text="getRecords.Total_client"
                                class="fs-5 fw-bold mb-0"
                              ></h6>
                            </router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllClient' }"
                            >
                              Total Clients
                            </router-link>
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Revenue.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'ActiveClient' }"
                            >
                              <h6
                                v-text="getRecords.Active_client"
                                class="fs-5 fw-bold mb-0"
                              ></h6>
                            </router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveClient' }"
                            >
                              Active Clients
                            </router-link>
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/clients.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'InActiveClient' }"
                            >
                              <h6
                                v-text="getRecords.Passive_client"
                                class="fs-5 fw-bold mb-0"
                              ></h6>
                            </router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveClient' }"
                            >
                              Inactive Clients
                            </router-link>
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
              <div class="col-lg-6 mb-3">
                <div class="row d-flex">
                  <!-- Sales Card -->

                  <div class="col-12 mb-3 pb-2">
                    <div
                      class="card h-100 info-card sales-card border-left-blue py-4"
                    >
                      <h5 class="card-title fw-bold d-flex fs-6 m-2 ps-3">
                        Staff Overview
                      </h5>

                      <div class="card-body py-1">
                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Sales.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'AllCandidateListsDisplay' }"
                            >
                              <h6
                                v-text="getRecords.candidates"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllCandidateListsDisplay' }"
                              >Total Staff
                            </router-link>
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Revenue.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'ActiveCandidate' }"
                            >
                              <h6
                                v-text="getRecords.current_candidate"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveCandidate' }"
                              >active Staff</router-link
                            >
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/clients.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'InActiveCandidate' }"
                            >
                              <h6
                                v-text="getRecords.deleted_candidate"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveCandidate' }"
                              >inactive Staff</router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- End Sales Card -->

                  <!-- End Sales Card -->
                </div>
              </div>

              <div class="col-lg-6 mb-3">
                <div class="row d-flex">
                  <!-- Sales Card -->

                  <div class="col-12 mb-3 pb-2">
                    <div
                      class="card h-100 info-card sales-card border-left-blue py-4"
                    >
                      <h5 class="card-title fw-bold d-flex fs-6 m-2 ps-3">
                        Site Overview
                      </h5>

                      <div class="card-body py-1">
                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Sales.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'AllSite' }"
                            >
                              <h6
                                v-text="getRecords.Total_business_unit"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'AllSite' }"
                              >Total Sites</router-link
                            >
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Revenue.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'ActiveSite' }"
                            >
                              <h6
                                v-text="getRecords.Active_business_unit"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'ActiveSite' }"
                              >active Sites</router-link
                            >
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/clients.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-black"
                              :to="{ name: 'InActiveSite' }"
                            >
                              <h6
                                v-text="getRecords.Inactive_business_unit"
                                class="fs-5 fw-bold mb-0"
                              ></h6
                            ></router-link>
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{ name: 'InActiveSite' }"
                              >inactive Sites</router-link
                            >
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
              <div class="col-lg-6 mb-3">
                <div class="row d-flex">
                  <!-- Sales Card -->

                  <div class="col-12 mb-3 pb-2">
                    <div
                      class="card h-100 info-card sales-card border-left-blue py-4"
                    >
                      <div class="d-flex justify-content-between">
                        <h5 class="card-title fw-bold d-flex fs-6 m-2 ps-3">
                          Training Insight
                        </h5>
                        <router-link
                          :to="{ name: 'DocumentReport' }"
                          class="text-decoration-none"
                          ><span
                            class="d-flex align-items-center pe-3"
                            style="color: #f9944b"
                            >View All</span
                          ></router-link
                        >
                      </div>

                      <div class="card-body py-1">
                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Sales.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{
                                name: 'DocumentReport',
                                query: {
                                  tabIndex: 4,
                                  redirectTo: 'DueDoc60Days',
                                },
                              }"
                              >Expiring in 60 days({{
                                getRecords.expiring_in_60_days
                              }})
                            </router-link>
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/Revenue.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{
                                name: 'DocumentReport',
                                query: { tabIndex: 2, redirectTo: 'DueDoc' },
                              }"
                            >
                              Expiring in 30 days({{
                                getRecords.expiring_in_30_days
                              }})</router-link
                            >
                          </div>
                        </div>

                        <div class="border-left-right"></div>

                        <div class="card-section">
                          <div class="ps-4 mt-2">
                            <a class="navbar-brand"
                              ><img
                                src="../assets/clients.png"
                                class="img-fluid"
                                alt="client"
                                loading="eager"
                            /></a>
                          </div>
                          <div class="card-icon d-flex gap-3">
                            <router-link
                              class="text-capitalize text-decoration-none text-muted"
                              :to="{
                                name: 'DocumentReport',
                                query: {
                                  tabIndex: 3,
                                  redirectTo: 'ExpiredDoc',
                                },
                              }"
                            >
                              Expired ({{
                                getRecords.compliance_insight
                              }})</router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- End Sales Card -->

                  <!-- End Sales Card -->
                </div>
              </div>
              <!-- End right side columns -->
            </div>
          </section>

          <section class="section dashboard mt-4 mb-4">
            <div class="row gx-2 mx-4 align-items-stretch">
              <!-- Left side columns -->
              <div class="col-sm-12 col-lg-8 h-100">
                <div class="h-100">
                  <TimeSheet />
                </div>
              </div>

              <!-- Left side columns end -->

              <!-- right side columns -->
              <div class="col-sm-12 col-lg-4 px-3 h-100">
                <div class="card h-100 card-border" style="border-radius: 20px">
                  <div class="col-8 p-3">
                    <h5 class="fs-6 p-2 mb-0 fw-bold">Shifts</h5>
                  </div>

                  <div class="bg-white rounded mt-2">
                    <div class="col-sm-12 col-lg-12 px-3">
                      <VueBarChart />
                    </div>
                    <div class="col-sm-12 col-lg-12 px-3">
                      <div class="">
                        <ul class="list-unstyled">
                          <li class="mb-2">
                            <div class="d-flex justify-content-between gap-4">
                              <div class="d-flex align-items-center">
                                <span class="box-icon"></span>
                                <span class="d-flex ms-2 fw-bold"
                                  >Open Shifts</span
                                >
                              </div>

                              <div class="d-flex">
                                <span class="fs-6 ps-2 fw-bold">{{
                                  getShiftCount.activate_vacancy
                                }}</span>
                              </div>
                            </div>
                          </li>
                          <li class="mb-2">
                            <div class="d-flex justify-content-between gap-4">
                              <div class="d-flex align-items-center">
                                <span class="box-icon2"></span>
                                <span class="d-flex ms-2 fw-bold"
                                  >Applied Shifts</span
                                >
                              </div>

                              <div class="d-flex">
                                <span class="fs-6 ps-2 fw-bold">{{
                                  getShiftCount.applied_vacancies
                                }}</span>
                              </div>
                            </div>
                          </li>
                          <li class="mb-2">
                            <div class="d-flex justify-content-between gap-4">
                              <div class="d-flex align-items-center">
                                <span class="box-icon3"></span>
                                <span class="d-flex ms-2 fw-bold"
                                  >Assigned Shifts</span
                                >
                              </div>
                              <div class="d-flex">
                                <span class="fs-6 ps-2 fw-bold">{{
                                  getShiftCount.assigned_vacancies
                                }}</span>
                              </div>
                            </div>
                          </li>
                          <li class="mb-2">
                            <div class="d-flex justify-content-between gap-4">
                              <div class="d-flex align-items-center">
                                <span class="box-icon4"></span>
                                <span class="d-flex ms-2 fw-bold"
                                  >Inactive Shifts</span
                                >
                              </div>
                              <div class="d-flex">
                                <span class="fs-6 ps-2 fw-bold">{{
                                  getShiftCount.inactive_vacancies
                                }}</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- right side columns end -->
            </div>
          </section>
        </div>
      </div>
    </div>
    <InProgress />
    <!-- <DocumentReport :tabIndex="tabIndex" /> -->
  </div>
</template>

<script>
import axios from "axios";
import VueBarChart from "../components/charts/VueBarChart.vue";
import TimeSheet from "../components/charts/TimeSheet.vue";
import Navbar from "../components/Navbar.vue";
import InProgress from "../components/modals/InProgress.vue";
import DocumentReport from "../components/ReportPages/DocumentReport.vue";

export default {
  name: "Home",

  data() {
    return {
      currentView: "weekly",
      getRecords: [],
      startDate: new Date(),
      endDate: new Date(),
      tabIndex: null,
      getShiftCount: [],
      getShiftTiming: [],
    };
  },
  components: {
    VueBarChart,
    TimeSheet,
    Navbar,
    InProgress,
    DocumentReport,
  },
  watch: {
    "$route.query.tabIndex"(newTabIndex) {
      this.tabIndex = parseInt(newTabIndex, 10) || 0;
    },
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
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    navigateToDueDoc() {
      this.$router.push({ name: "DueDoc" });
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

  async mounted() {
    await this.fetchData();
    await this.FetchShiftsMethod();
  },
};
</script>

<style scoped>
.pagetitle {
  margin-bottom: 10px;

  border-radius: 10px;
  padding: 10px;
}
#main {
  font-family: "Inter";
}

.left-flex-border,
.right-flex-border {
  border: 1px solid #80808042;
}
.card {
  background: #ffffff;
  box-shadow: 0px 5px 20px 0px #0000000d;

  border-radius: 20px;
  border-width: 1px;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.border-left-right {
  width: 2px;
  height: 50px;

  border: 1px solid #f0f1f3;
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

.btn-primary {
  border: none;
}
.card-header {
  background: transparent;
}

table td,
table th {
  padding: 8px;
}
table th.cw {
  transform: translateX(-34px);
}
#main {
  transition: all 0.3s;
  background-color: #f9f9f9;
}
h6 {
  font-size: 14px;
}

.box-icon {
  width: 10.38px;
  height: 10.38px;
  background-color: #4a3aff;

  border-radius: 50%;
}
.box-icon2 {
  width: 10.38px;
  height: 10.38px;
  background-color: #e0c6fd;
  border-radius: 50%;
}
.box-icon3 {
  width: 10.38px;
  height: 10.38px;
  background-color: #c6d2fd;
  border-radius: 50%;
}
.box-icon4 {
  width: 10.38px;
  height: 10.38px;
  background-color: #f5aaac;
  border-radius: 50%;
}
.card-border {
  box-shadow: 0px 5px 20px 0px #0000000d;

  border-width: 1px;
}
</style>
