<template>
  <div>
    <Navbar />
    <div id="main" class="main">
      <div class="pagetitle d-flex justify-content-between">
        <div class="">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
          <h5>Welcome to Recpal</h5>
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
            <div class="col-2 col-lg-3 mb-3">
              <div class="row">
                <!-- Sales Card -->
                <h5>Client</h5>
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Total_client"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >Total Clients</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Active_client"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >active clients</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Passive_client"></h6>
                          <span class="text-muted pt-2 text-capitalize"
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
            <div class="col-lg-3 mb-3">
              <div class="row">
                <!-- Sales Card -->
                <h5>Candidates</h5>
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.candidates"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >Total Candidates</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.current_candidate"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >active Candidates</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.deleted_candidate"></h6>
                          <span class="text-muted pt-2 text-capitalize"
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

            <div class="col-lg-3 mb-3">
              <div class="row">
                <!-- Sales Card -->
                <h5>Business Units</h5>
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Total_business_unit"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >Total Business Units</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Sales Card -->

                <!-- Revenue Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Active_business_unit"></h6>
                          <span class="text-muted pt-2 text-capitalize"
                            >active Business Units</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Revenue Card -->

                <!-- Sales Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6 v-text="getRecords.Inactive_business_unit"></h6>
                          <span class="text-muted pt-2 text-capitalize"
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
            <div class="col-lg-3 mb-3">
              <div class="row">
                <!-- Sales Card -->
                <h5>Compliance Insight</h5>
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6>
                            Expiring in 60 days({{ getRecords.expiring_in_60_days }})
                          </h6>
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

                <!-- Revenue Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6>
                            Expiring in 30 days({{ getRecords.expiring_in_30_days }})
                          </h6>
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

                <!-- Sales Card -->
                <div class="col-12 mb-3">
                  <div class="card h-100 info-card sales-card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="card-icon d-flex align-items-center justify-content-center"
                        >
                          <i class="bi bi-people-fill fs-1"></i>
                        </div>
                        <div class="ps-4">
                          <h6>Expired ({{ getRecords.compliance_insight }})</h6>
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

        <section class="section dashboard mt-4">
          <div class="row">
            <!-- Left side columns -->
            <div class="col-lg-5">
              <div class="card h-100">
                <div
                  class="d-flex justify-content-between bg-white rounded align-items-center"
                >
                  <div class="col-lg-4 p-3">
                    <h5 class="mb-0">Vacancies</h5>
                    <div class="">
                      <ol class="breadcrumb mb-1">
                        <li class="breadcrumb-item active">Current Week</li>
                      </ol>
                    </div>
                    <ul class="list-unstyled mt-3 leftsidecol">
                      <li class="d-flex mb-2">
                        <span class="rounded-circle text-white">50</span>
                        <span class="d-flex align-items-center ms-2">Open Vacancies</span>
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
                          >Assigned Vacancies</span
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-8 p-3 mt-3">
                    <VueBarChart />
                  </div>
                </div>
              </div>
            </div>
            <!-- Left side columns end -->

            <!-- right side columns -->
            <div class="col-lg-7">
              <div class="card h-100">
                <div class="bg-white rounded">
                  <div class="col-lg-8 p-3">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex align-items-center mb-0">
                        <h5>TimeSheet</h5>
                      </div>
                      <div>
                        <div class="input-group">
                          <input
                            class="form-control"
                            type="text"
                            name="datefilter"
                            :value="formatDateRange"
                            placeholder="Select Date from Start to End"
                            readonly
                            style="width: 200px"
                          />
                          <i
                            class="bi bi-calendar2-check position-absolute"
                            @click="showDatePicker = true"
                            style="cursor: pointer"
                          ></i
                          >&nbsp;
                        </div>

                        <!-- Modal for the date picker -->
                        <div
                          v-if="showDatePicker"
                          class="modal"
                          tabindex="-1"
                          role="dialog"
                          style="display: block"
                        >
                          <div class="modal-dialog modal-sm">
                            <!-- Adjust the size with modal-sm, modal-md, modal-lg, etc. -->
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Select Date Range</h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  @click="showDatePicker = false"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <!-- Custom date picker component -->
                                <div class="mb-3">
                                  <label for="startDate" class="form-label"
                                    >Start Date:</label
                                  >
                                  <input
                                    type="date"
                                    class="form-control"
                                    id="startDate"
                                    v-model="startDate"
                                    @change="updateEndDateMin"
                                  />
                                </div>
                                <div class="mb-3">
                                  <label for="endDate" class="form-label"
                                    >End Date:</label
                                  >
                                  <input
                                    type="date"
                                    class="form-control"
                                    id="endDate"
                                    v-model="endDate"
                                    :min="startDate"
                                  />
                                </div>
                                <button class="btn btn-primary" @click="applyDateRange">
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="showDatePicker"
                          class="modal-backdrop"
                          @click="showDatePicker = false"
                        ></div>
                      </div>
                    </div>

                    <!-- <table class="table table-borderless sizefix">
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
                    </table> -->
                  </div>
                  <div class="col-lg-12 p-3">
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
      startDate: "",
      endDate: "",
      showDatePicker: false,
    };
  },
  components: {
    VueBarChart,
    TimeSheet,
    Navbar,
    InProgress,
  },
  computed: {
    formatDateRange() {
      return `${this.startDate} - ${this.endDate}`;
    },
  },
  methods: {
    updateEndDateMin() {
      this.$refs.endDate.min = this.startDate;
    },
    applyDateRange() {
      localStorage.setItem("startDate", this.startDate);
      localStorage.setItem("endDate", this.endDate);
      this.showDatePicker = false;
    },
  },
  async created() {
    const token = localStorage.getItem("token");
    axios
      .get(`${VITE_API_URL}/merchant_dashboard`, {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + token,
        },
      })

      .then((response) => (this.getRecords = response.data.data));
  },

  mounted() {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate && storedEndDate) {
      this.startDate = storedStartDate;
      this.endDate = storedEndDate;
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
.card.sales-card {
  border-top: 5px solid orange;
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

span {
  font-weight: 600;
}

.input-group > .form-control,
.input-group > .form-select,
.input-group > .form-floating {
  width: inherit !important;
}
</style>
