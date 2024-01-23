<template>
  <div>
    <Navbar />
    <div id="main" class="main">
      <div class="pagetitle mx-4 mt-4">
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
                            >Total Clients</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Total_client"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                            >Active Clients</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Active_client"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                            >inactive clients</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Passive_client"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                  Candidates
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
                              >Total Candidates
                            </router-link></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.candidates"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                              >active Candidates</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.current_candidate"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                              >inactive Candidates</router-link
                            ></span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.deleted_candidate"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                  Business Units
                </h5>
                <div class="col-10 mb-3">
                  <div class="card h-100 info-card sales-card border-left-blue">
                    <div class="card-body px-4 py-1">
                      <div class="d-flex justify-content-between">
                        <div class="card-icon d-flex flex-column">
                          <i class="bi bi-people fs-1 text-info"></i>
                          <span class="text-muted text-capitalize fs-6"
                            >Total Business Units</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Total_business_unit"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                            >active Business Units</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Active_business_unit"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                            >inactive Business Units</span
                          >
                        </div>
                        <div class="ps-4 mt-2">
                          <h6
                            v-text="getRecords.Inactive_business_unit"
                            class="fs-3 fw-bold mb-0"
                          ></h6>
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
                  Compliance Insight
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

            <div class="col-lg-4">
              <div class="card h-100 card-border">
                <div class="col-8 p-3">
                  <h5
                    class="fs-5 p-2 text-white mb-0 rounded-2"
                    style="background: #f9944b"
                  >
                    Vacancies
                  </h5>
                  <div class="">
                    <ol class="breadcrumb mb-1">
                      <li class="breadcrumb-item active">Current Week</li>
                    </ol>
                  </div>
                </div>

                <div class="d-flex justify-content-between bg-white rounded mt-2">
                  <div class="col-lg-5 px-3 d-flex align-items-center">
                    <div class="">
                      <ul class="list-unstyled">
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">50</span>
                              <span class="d-flex ms-2">Open Vacancies</span>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon2 mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">10</span>
                              <span class="d-flex ms-2">Applied Vacancies</span>
                            </div>
                          </div>
                        </li>
                        <li class="d-flex mb-2">
                          <div class="d-flex">
                            <span class="box-icon3 mt-2"></span>
                            <div class="d-flex flex-column">
                              <span class="fs-4 ps-2 fw-bold">30</span>
                              <span class="d-flex ms-2">Assigned Vacancies</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-7 px-3">
                    <VueBarChart />
                  </div>
                </div>
              </div>
            </div>
            <!-- Left side columns end -->

            <!-- right side columns -->
            <div class="col-lg-8">
              <div class="card h-100 card-border">
                <div class="bg-white rounded">
                  <div class="col-lg-12 pt-3 ps-3">
                    <div class="d-flex justify-content-between">
                      <div class="col-7">
                        <h5
                          class="fs-5 p-2 text-white rounded-1"
                          style="background: #f9944b"
                        >
                          TimeSheet
                        </h5>
                      </div>
                      <div class="px-3 d-flex align-items-center">
                        <div>
                          <span
                            v-if="formattedStartDate && formattedEndDate"
                            class="fw-bold"
                          >
                            {{ formattedStartDate + " - " + formattedEndDate }}
                          </span>
                          &nbsp; &nbsp;
                          <input
                            type="month"
                            v-model="selectedMonth"
                            @change="updateDateRange"
                            class="dateInput"
                          />
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
      getRecords: [],
      selectedMonth: "",
      endDate: "",
    };
  },
  components: {
    VueBarChart,
    TimeSheet,
    Navbar,
    InProgress,
  },
  computed: {
    formattedStartDate() {
      return this.formatDate(this.selectedMonth);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
  },
  methods: {
    updateDateRange() {
      localStorage.setItem("selectedMonth", this.selectedMonth);
      const [selectedYear, selectedMonth] = this.selectedMonth.split("-");

      const endYear =
        selectedMonth === "12" ? `${parseInt(selectedYear) + 1}` : selectedYear;
      const endMonth = selectedMonth === "12" ? "01" : `${parseInt(selectedMonth) + 1}`;

      this.endDate = `${endYear}-${endMonth}`;

      this.saveToLocalStorage();
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "calendarData",
        JSON.stringify({
          startDate: this.selectedMonth,
          endDate: this.endDate,
        })
      );
    },
    loadStoredData() {
      const storedData = localStorage.getItem("calendarData");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.selectedMonth = parsedData.startDate;
        this.endDate = parsedData.endDate;
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
        console.error("Error fetching data:", error);
      }
    },
  },
  created() {
    if (!localStorage.getItem("calendarData")) {
      const today = new Date();
      const defaultStartDate = today.toISOString().split("T")[0].slice(0, 7);
      this.selectedMonth = defaultStartDate;
      this.updateDateRange();
    }

    this.loadStoredData();
    this.fetchData();
  },

  mounted() {
    window.addEventListener("beforeunload", this.saveToLocalStorage);

    const inputElement = document.querySelector(".dateInput");
    if (inputElement) {
      inputElement.value = this.selectedMonth;
    }
  },
};
</script>

<style scoped>
/*--------------------------------------------------------------
# Page Title
--------------------------------------------------------------*/
.pagetitle {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
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
  padding: 20px 20px;
  transition: all 0.3s;
  background: #fef8f8;

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
.card-border {
  border: 0.8px solid #ff5722;
}
</style>
