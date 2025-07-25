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

      <div class="col-10 ms-4">
        <div class="container-fluid">
          <div class="row" style="margin-top: 35px">
            <h5 class="fs-4 ps-3 text-capitalize">
              Welcome to Client Dashboard - {{ getRecords.client_name }}
            </h5>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 d-flex gap-5">
              <div class="col-12 mb-3 pb-2">
                <div
                  class="card h-100 info-card sales-card border-left-blue py-4"
                >
                  <h5 class="card-title fw-bold d-flex fs-6 m-2 ps-3">
                    Client Current Week Overview
                  </h5>

                  <div class="card-body py-1 d-flex justify-content-around">
                    <div class="card-section">
                      <div class="ps-4 mt-2">
                        <a class="navbar-brand">
                          <img
                            src="@/assets/Sales.png"
                            class="img-fluid"
                            alt="client"
                            loading="eager"
                        /></a>
                      </div>
                      <div class="card-icon d-flex gap-3">
                        <h5 class="text-muted">
                          {{ getRecords.vacancies || 0 }}
                        </h5>
                        <p class="card-text mb-0">Shifts</p>
                      </div>
                    </div>

                    <div class="border-left-right"></div>

                    <div class="card-section">
                      <div class="ps-4 mt-2">
                        <a class="navbar-brand">
                          <img
                            src="@/assets/Sales.png"
                            class="img-fluid"
                            alt="client"
                            loading="eager"
                        /></a>
                      </div>
                      <div class="card-icon d-flex gap-3">
                        <h5 class="text-muted">
                          {{ getRecords.bookigs || 0 }}
                        </h5>
                        <p class="card-text mb-0">Bookings</p>
                      </div>
                    </div>

                    <div class="border-left-right"></div>

                    <div class="card-section">
                      <div class="ps-4 mt-2">
                        <a class="navbar-brand">
                          <img
                            src="@/assets/Sales.png"
                            class="img-fluid"
                            alt="client"
                            loading="eager"
                        /></a>
                      </div>
                      <div class="card-icon d-flex gap-3">
                        <h5 class="text-muted">{{ getRecords.sites || 0 }}</h5>
                        <p class="card-title text-capitalize">Total Sites</p>
                      </div>
                    </div>
                    <div class="border-left-right"></div>

                    <div class="card-section">
                      <div class="ps-4 mt-2">
                        <a class="navbar-brand">
                          <img
                            src="@/assets/Sales.png"
                            class="img-fluid"
                            alt="client"
                            loading="eager"
                        /></a>
                      </div>
                      <div class="card-icon d-flex gap-3">
                        <h5 class="text-muted">
                          {{ getRecords.invoices || 0 }}
                        </h5>
                        <p class="card-text mb-0">Invoices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mx-1">
            <div class="col-12 wrapper-timeSheet">
              <table class="table table-bordered candidateTable">
                <thead>
                  <tr>
                    <th>Ref. Code</th>
                    <th>Site</th>
                    <th>Position</th>
                    <th>Date</th>
                    <th>Shift</th>
                    <th>Staff Required</th>
                    <th>Assigned</th>
                    <th>Booking</th>
                  </tr>
                </thead>
                <tbody
                  class="text-capitalize"
                  v-if="CurrentWekShift?.length > 0"
                >
                  <tr v-for="shift in CurrentWekShift" :key="shift.id">
                    <td>{{ shift.ref_code }}</td>
                    <td>{{ shift.site }}</td>
                    <td>{{ shift.job_title }}</td>
                    <td class="widthDefine">
                      <span v-for="(date, index) in shift.dates" :key="index">
                        {{ date }}

                        <template v-if="index !== shift.dates.length - 1"
                          >,
                        </template>
                      </span>
                    </td>
                    <td>{{ shift.site_shift }}</td>
                    <td>{{ shift.staff_required }}</td>
                    <td>{{ shift.assigned }}</td>
                    <td>{{ shift.accepted }}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="8" class="text-danger text-center">
                      {{ "Not Shift Found in this Week." }}
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
</template>
<script>
import axios from "axios";

import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";

export default {
  name: "ClientDash",

  data() {
    return {
      getRecords: [],
      CurrentWekShift: [],
    };
  },
  components: {
    ClientNavbar,
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard_home_api`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // this.getRecords = response.data;
        if (response.data && response.data.client_name) {
          this.getRecords = response.data;
          this.errorMessage = "";
        } else {
          this.getRecords = null;
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          const errorData = error.response.data;

          if (errorData && errorData.message && errorData.client_name) {
            this.getRecords = {
              client_name: errorData.client_name,
            };
            this.errorMessage = errorData.message;
          } else {
            this.getRecords = null;
            this.errorMessage = "Data Not Found.";
          }
        } else {
          this.getRecords = null;
          this.errorMessage = "Data Not Found.";
        }
      }
    },
    async currentWeekClientShift() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_current_week_client_vacancies`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.CurrentWekShift = response.data.vacancies_data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
    this.currentWeekClientShift();
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
.border-left-right {
  width: 2px;
  height: 50px;

  border: 1px solid #f0f1f3;
}
#main {
  transition: all 0.3s;

  height: 100vh;
  background-color: rgb(249 249 249);
}
.mainTop {
  color: #fff;
  transition: all 0.3s;
  background-color: #f9944b;
  border-radius: 13px;
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
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .wrapper-timeSheet {
    overflow-x: scroll;
  }
}
</style>
