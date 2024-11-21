<template>
  <div>
    <!-- <ClientNavbar /> -->
    <div id="main" class="main">
      <div class="pagetitle mainTop">
        <div class="row">
          <ol class="breadcrumb mb-1 ps-3">
            <li class="breadcrumb-item active fs-6 text-white">Dashboard</li>
          </ol>
          <h5 class="fs-4 ps-3">Welcome to Client Dashboard - Client Name</h5>
        </div>
      </div>
      <div>
        <div class="row mt-3">
          <div class="col-md-12 d-flex gap-5">
            <div class="" style="width: 25%">
              <div class="card mb-3">
                <div class="row">
                  <div class="col-md-6 d-flex align-items-center justify-content-evenly">
                    <div
                      style="
                        background: #86b7fe;
                        border-radius: 50%;
                        text-align: center;
                        width: 80px;
                        height: 80px;
                        line-height: 84px;
                      "
                    >
                      <i class="bi bi-people fs-3"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">CURRENT WEEK</h5>
                      <p class="card-text mb-0">SHIFTS</p>
                      <small class="text-muted">{{ getRecords.vacancies }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="" style="width: 25%">
              <div class="card mb-3">
                <div class="row">
                  <div class="col-md-6 d-flex align-items-center justify-content-evenly">
                    <div
                      style="
                        background: #86b7fe;
                        border-radius: 50%;
                        text-align: center;
                        width: 80px;
                        height: 80px;
                        line-height: 84px;
                      "
                    >
                      <i class="bi bi-file-earmark-spreadsheet fs-3"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">CURRENT WEEK</h5>
                      <p class="card-text mb-0">BOOKINGS</p>
                      <small class="text-muted">{{ getRecords.bookigs }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="" style="width: 25%">
              <div class="card mb-3">
                <div class="row">
                  <div class="col-md-6 d-flex align-items-center justify-content-evenly">
                    <div
                      style="
                        background: #86b7fe;
                        border-radius: 50%;
                        text-align: center;
                        width: 80px;
                        height: 80px;
                        line-height: 84px;
                      "
                    >
                      <i class="bi bi-building fs-3"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">TOTAL BUSINESS UNITS</h5>
                      <!-- <p class="card-text mb-0">SHIFTS</p> -->
                      <small class="text-muted">{{ getRecords.sites }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="" style="width: 25%">
              <div class="card mb-3">
                <div class="row">
                  <div class="col-md-6 d-flex align-items-center justify-content-evenly">
                    <div
                      style="
                        background: #86b7fe;
                        border-radius: 50%;
                        text-align: center;
                        width: 80px;
                        height: 80px;
                        line-height: 84px;
                      "
                    >
                      <i class="bi bi-calendar-week fs-3"></i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">CURRENT WEEK</h5>
                      <p class="card-text mb-0">INVOICES</p>
                      <small class="text-muted">{{ getRecords.invoices }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-1">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Ref. Code</th>
              <th>Site</th>
              <th>Position</th>
              <th>Date</th>
              <th>Shift</th>
              <th>Space</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody class="text-capitalize" v-if="CurrentWekShift?.length > 0">
            <tr v-for="shift in CurrentWekShift" :key="shift.id">
              <td>{{ shift.ref_code }}</td>
              <td>{{ shift.site }}</td>
              <td>{{ shift.job_title }}</td>
              <td class="widthDefine">
                <span v-for="(date, index) in shift.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== shift.dates.length - 1">, </template>
                </span>
              </td>
              <td>{{ shift.site_shift }}</td>
              <td>{{ shift.staff_required }}</td>
              <td>{{ shift.assigned }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-danger text-center">
                {{ "Not Shift Found in this Week." }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

// import ClientNavbar from "../../components/ClientDashBoard/ClientNavbar.vue";

export default {
  name: "ClientDash",

  data() {
    return {
      getRecords: [],
      CurrentWekShift: [],
    };
  },
  components: {
    // ClientNavbar,
  },
  methods: {
    async fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/client_dashboard_home_api`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.getRecords = response.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
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
#main {
  padding: 0px 20px;
  transition: all 0.3s;
  background: #fef8f8;
  padding-top: 105px;
  background-color: #fdce5e17;
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
</style>
