<template>
  <div>
    <Navbar />
    <div id="main" class="main">
      <div class="pagetitle d-flex justify-content-between">
        <div class="">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
          <h5>Welcome To Recruitment Pal</h5>
        </div>
        <!-- End Page Title -->
        <div class="d-flex align-items-center">
          <button
            type="button"
            class="btn btn-primary text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#inprogress"
            data-bs-whatever="@mdo"
          >
            <i class="bi bi-file-earmark"></i>
            GENERATE REPORT
          </button>
        </div>
      </div>
      <div v-if="getRecords">
        <section class="section dashboard mt-3">
          <div class="row">
            <!-- Left side columns -->
            <div class="col-lg-6">
              <div class="row">
                <!-- Sales Card -->
                <h5>Client</h5>
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Total_client"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >Total Client</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card revenue-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Active_client"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >active client</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Passive_client"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >inactive clients</span
                          >
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
            <div class="col-lg-6">
              <div class="row">
                <!-- Sales Card -->
                <h5>Candidates</h5>
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.candidates"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >Total Candidates</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card revenue-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.current_candidate"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >active Candidates</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.deleted_candidate"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >inactive Candidates</span
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

        <section class="section dashboard mt-4">
          <div class="row">
            <!-- Left side columns -->
            <div class="col-lg-6">
              <div class="row">
                <!-- Sales Card -->
                <h5>Business Units</h5>
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card totalbusinessunits-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Total_business_unit"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >Total Business Units</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-xxl-4 col-md-4">
                  <div
                    class="card h-100 info-card totalbusinessunitsactive-card"
                  >
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Active_business_unit"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >active Business Units</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-xxl-4 col-md-4">
                  <div
                    class="card h-100 info-card totalbusinessunitsinactive-card"
                  >
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6 v-text="getRecords.Inactive_business_unit"></h6>
                          <span class="text-muted small pt-2 text-uppercase"
                            >inactive Business Units</span
                          >
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
            <div class="col-lg-6">
              <div class="row">
                <!-- Sales Card -->
                <h5>Compliance Insight</h5>
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card totaldoc-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6>
                            Expiring in 60 days({{
                              getRecords.expiring_in_60_days
                            }})
                          </h6>
                          <span
                            class="text-muted small pt-2 text-uppercase cursor-pointer"
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

                <!-- Revenue Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card expiredoc-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6>
                            Expiring in 30 days({{
                              getRecords.expiring_in_30_days
                            }})
                          </h6>
                          <span
                            class="text-muted small pt-2 text-uppercase cursor-pointer"
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

                <!-- Sales Card -->
                <div class="col-xxl-4 col-md-4">
                  <div class="card h-100 info-card expireindays-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon rounded-circle d-flex align-items-center justify-content-center"
                        ></div>
                        <div class="ps-2">
                          <h6>Expired ({{ getRecords.compliance_insight }})</h6>
                          <span
                            class="text-muted small pt-2 text-uppercase cursor-pointer"
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

        <section class="section dashboard mt-4">
          <div class="row">
            <!-- Left side columns -->
            <div class="col-lg-5">
              <div class="card h-100">
                <div class="d-flex justify-content-between bg-white rounded">
                  <div class="col-lg-5 p-3">
                    <h5 class="mb-0">Vacancies</h5>
                    <div class="">
                      <ol class="breadcrumb mb-1">
                        <li class="breadcrumb-item active">Current Week</li>
                      </ol>
                    </div>
                    <ul class="list-unstyled mt-3 leftsidecol">
                      <li class="d-flex mb-2">
                        <span class="rounded-circle text-white">50</span>
                        <span class="d-flex align-items-center ms-2"
                          >Open Vacancies</span
                        >
                      </li>
                      <li class="d-flex mb-2">
                        <span class="rounded-circle text-white">10</span>
                        <span class="d-flex align-items-center ms-2"
                          >Applied Vacancies</span
                        >
                      </li>
                      <li class="d-flex mb-2">
                        <span class="rounded-circle text-white">30</span>
                        <span class="d-flex align-items-center ms-2"
                          >Assign Vacancies</span
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-7 p-3">
                    <VueBarChart />
                  </div>
                </div>
              </div>
            </div>
            <!-- Left side columns end -->

            <!-- right side columns -->
            <div class="col-lg-7">
              <div class="card h-100">
                <div class="d-flex justify-content-between bg-white rounded">
                  <div class="col-lg-7 p-3">
                    <div class="position-relative">
                      <input
                        class="form-control"
                        type="text"
                        name="datefilter"
                        value=""
                        placeholder="Select Date from Start to End"
                      /><i class="bi bi-calendar2-check position-absolute"></i
                      >&nbsp;
                    </div>

                    <table class="table table-borderless sizefix">
                      <thead>
                        <tr class="">
                          <th scope="col" class="h-100">TimeSheet</th>
                          <th scope="col" class="cw h-100"></th>
                        </tr>
                      </thead>
                      <tbody class="text-capitalize">
                        <tr>
                          <td>total timesheet hours</td>
                          <td>35.00</td>
                        </tr>
                        <tr>
                          <td>approved timesheet hours</td>
                          <td>24.00</td>
                        </tr>
                        <tr>
                          <td>invoiced timesheet hours</td>
                          <td>0.00</td>
                        </tr>
                        <tr>
                          <td>total pay rate</td>
                          <td>11.00</td>
                        </tr>
                        <tr>
                          <td>pending timesheet hours</td>
                          <td>111.00</td>
                        </tr>
                        <tr>
                          <td>total charge rate</td>
                          <td>331.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-lg-5 p-3">
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
    };
  },
  components: {
    VueBarChart,
    TimeSheet,
    Navbar,
    InProgress,
  },
  methods: {},
  async created() {
    const token = localStorage.getItem("token");
    axios
      .get("https://logezy.onrender.com/merchant_dashboard", {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + token,
        },
      })

      .then((response) => (this.getRecords = response.data.data));
  },

  mounted() {},
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
.pagetitle h1 {
  font-size: 24px;
  margin-bottom: 0;
  font-weight: 600;
  color: #012970;
}
table.sizefix {
  font-size: 15px;
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
small,
.small {
  font-size: 0.7rem;
}
span {
  font-weight: 600;
}
</style>
