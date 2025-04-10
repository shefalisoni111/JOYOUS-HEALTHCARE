<template>
  <div class="col-sm-12 col-lg-12">
    <div class="card h-100 card-border">
      <div class="bg-white rounded">
        <div class="col-lg-12 pt-3 ps-3">
          <div class="d-lg-flex justify-content-lg-between">
            <div class="col-7 d-flex align-items-center">
              <h5 class="fs-6 fw-bold p-2">TimeSheet</h5>
            </div>
            <div class="px-3 d-flex align-items-center">
              <!-- <div class="d-flex justify-content-between">
                <span
                  v-if="currentView === 'week' && startDate && endDate"
                  class="fw-bold d-flex align-items-center"
                >
                  {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                </span>
                &nbsp;&nbsp;
                <div class="d-flex align-items-center fs-4">
                  <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                  <i class="bi bi-calendar3"></i>
                  <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                </div>
              </div> -->
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="pills-week-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-week"
                    type="button"
                    role="tab"
                    aria-controls="pills-week"
                    aria-selected="true"
                    @click="moveToWeek"
                  >
                    7 days
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-month-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-month"
                    type="button"
                    role="tab"
                    aria-controls="pills-month"
                    aria-selected="false"
                    @click="moveToMonth"
                  >
                    30 days
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="pills-year-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-year"
                    type="button"
                    role="tab"
                    aria-controls="pills-year"
                    aria-selected="false"
                    @click="moveToYear"
                  >
                    12 months
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-12 px-3 py-3">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-week"
              role="tabpanel"
              aria-labelledby="pills-week-tab"
            >
              <canvas id="timesheetChartOne" height="80"></canvas>
            </div>
            <div
              class="tab-pane fade"
              id="pills-month"
              role="tabpanel"
              aria-labelledby="pills-month-tab"
            >
              <canvas id="timesheetChartTwo" height=""></canvas>
            </div>
            <div
              class="tab-pane fade"
              id="pills-year"
              role="tabpanel"
              aria-labelledby="pills-year-tab"
            >
              <canvas id="timesheetChartThird" height=""></canvas>
            </div>
          </div>
          <div class="">
            <ul class="list-unstyled d-flex justify-content-center gap-5 mt-2">
              <li class="">
                <div class="d-flex justify-content-between gap-4">
                  <div class="d-flex align-items-center">
                    <span class="box-icon"></span>
                    <span class="d-flex ms-2">Total Hours</span>
                  </div>

                  <!-- <div class="d-flex">
                    <span class="fs-6 ps-2 ">{{
                      getShiftTiming.approved_timesheet_hours
                    }}</span>
                  </div> -->
                </div>
              </li>
              <li class="mb-2">
                <div class="d-flex justify-content-between gap-4">
                  <div class="d-flex align-items-center">
                    <span class="box-icon2"></span>
                    <span class="d-flex ms-2">Approved Hours</span>
                  </div>

                  <!-- <div class="d-flex">
                    <span class="fs-6 ps-2 ">{{
                      getShiftTiming.approved_timesheet_hours
                    }}</span>
                  </div> -->
                </div>
              </li>
              <li class="mb-2">
                <div class="d-flex justify-content-between gap-4">
                  <div class="d-flex align-items-center">
                    <span class="box-icon3"></span>
                    <span class="d-flex ms-2">Invoiced Hours</span>
                  </div>
                  <!-- <div class="d-flex">
                    <span class="fs-6 ps-2 ">{{
                      getShiftTiming.invoice_total_hours
                    }}</span>
                  </div> -->
                </div>
              </li>
              <li class="mb-2">
                <div class="d-flex justify-content-between gap-4">
                  <div class="d-flex align-items-center">
                    <span class="box-icon4"></span>
                    <span class="d-flex ms-2">Pending Hours</span>
                  </div>
                  <!-- <div class="d-flex">
                    <span class="fs-6 ps-2 ">{{
                      getShiftTiming.pending_timesheet_hours
                    }}</span>
                  </div> -->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { nextTick } from "vue";

export default {
  data() {
    return {
      currentView: "week",
      startDate: new Date(),
      endDate: new Date(),
      chart: null,
      totalHours: [],
      approvedHours: [],
      invoicedHours: [],
      pendingHours: [],
      dataObject: {
        datasets: [
          {
            data: [9, 5, 9, 3], // Replace with dynamic data
            backgroundColor: "rgba(22, 170, 138, 0.2)",
            borderColor: "#16aa8a",
            borderWidth: 3,
            tension: 0.4, // Creates the spline effect
            borderDash: [5, 5],
          },
          // {
          //   label: "Approved TimeSheet Hours",
          //   data: [7, 3, 8, 2],
          //   backgroundColor: "rgba(48, 74, 220, 0.2)",
          //   borderColor: "#304adc",
          //   borderWidth: 3,
          //   tension: 0.4,
          // },
          // {
          //   label: "Invoiced TimeSheet Hours",
          //   data: [8, 4, 7, 3],
          //   backgroundColor: "rgba(16, 194, 184, 0.2)",
          //   borderColor: "#10c2b8",
          //   borderWidth: 3,
          //   tension: 0.4,
          // },
          // {
          //   label: "Pending TimeSheet Hours",
          //   data: [2, 3, 5, 4],
          //   backgroundColor: "rgba(233, 30, 30, 0.2)",
          //   borderColor: "#e91e1e",
          //   borderWidth: 3,
          //   tension: 0.4,
          // },
        ],
      },
    };
  },
  computed: {
    chartLabels() {
      switch (this.currentView) {
        case "week":
          return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        case "month":
          return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
        case "year":
          return [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
        default:
          return [];
      }
    },
  },
  methods: {
    async renderChart(viewType) {
      await nextTick();

      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      let ctx;
      if (viewType === "week") {
        ctx = document.getElementById("timesheetChartOne").getContext("2d");
      } else if (viewType === "month") {
        ctx = document.getElementById("timesheetChartTwo").getContext("2d");
      } else if (viewType === "year") {
        ctx = document.getElementById("timesheetChartThird").getContext("2d");
      }

      if (!ctx) return;

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Total Hours",
              data: this.totalHours || [],
              borderColor: "#9b5de5",
              borderDash: [10, 5],
              fill: false,
              tension: 0.4,
            },
            {
              label: "Approved Hours",
              data: this.approvedHours || [],
              borderColor: "#ff6b6b",
              borderDash: [10, 5],
              fill: false,
              tension: 0.4,
            },
            {
              label: "Invoiced Hours",
              data: this.invoicedHours || [],
              borderColor: "#a0c4ff",
              borderDash: [10, 5],
              fill: false,
              tension: 0.4,
            },
            {
              label: "Pending Hours",
              data: this.pendingHours || [],
              borderColor: "#3b3b98",
              borderDash: [10, 5],
              fill: false,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      // this.chart = new Chart(ctx, {
      //   type: "line",
      //   data: this.dataObject,
      //   options: {
      //     responsive: true,
      //     maintainAspectRatio: false,
      //     plugins: {
      //       legend: {
      //         display: false,
      //         position: "bottom",
      //       },
      //     },
      //     scales: {
      //       x: { type: "category", grid: { display: false } },
      //       y: { beginAtZero: true },
      //     },
      //   },
      // });
    },
    async fetchData() {
      // if (
      //   !this.startDate ||
      //   !(this.startDate instanceof Date) ||
      //   isNaN(this.startDate.getTime())
      // ) {
      //   return;
      // }

      try {
        const params = {};

        if (this.currentView === "week") {
          params.range = "week";
        } else {
          params.range = this.currentView;
        }
        const response = await axios.get(
          `${VITE_API_URL}/home_timesheet_date_and_filter`,
          {
            params,
          }
        );

        const apiData = response.data;
        // console.log(apiData);

        this.dataObject.datasets = [
          {
            // label: "Total timeSheet hours",
            data: [
              (this.totalHours = apiData.total_hours || []),
              (this.approvedHours = apiData.approved_timesheet_hours || []),
              (this.invoicedHours = apiData.invoice_total_hours || []),
              (this.pendingHours = apiData.pending_timesheet_hours || []),
            ],
            // borderColor: "#16aa8a",
            // backgroundColor: "transparent",
            // borderWidth: 2,
          },
        ];

        // this.totalHours = apiData.total_hours || [];
        // this.approvedHours = apiData.approved_timesheet_hours || [];
        // this.invoicedHours = apiData.invoice_total_hours || [];
        // this.pendingHours = apiData.pending_timesheet_hours || [];
        // this.dataObject.datasets[0].data = [
        //   apiData.total_hours || 0,
        //   apiData.approved_timesheet_hours || 0,
        //   apiData.invoice_total_hours || 0,
        //   apiData.pending_timesheet_hours || 0,
        // ];
        // await nextTick();
        await this.renderChart(this.currentView);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    moveToWeek() {
      this.currentView = "week";
      this.renderChart("week");
      this.fetchData();
    },

    moveToMonth() {
      this.currentView = "month";
      this.renderChart("month");
      this.fetchData();
    },

    moveToYear() {
      this.currentView = "year";
      this.renderChart("year");
      this.fetchData();
    },
    moveToPrevious() {
      this.startDate = new Date(this.startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      this.endDate = new Date(this.endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      this.fetchData();
    },

    // moveToWeek() {
    //   // this.startDate = new Date(this.startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    //   // this.endDate = new Date(this.endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    //   this.fetchData();
    // },

    // moveToMonth() {
    //   // this.startDate = new Date(this.startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    //   // this.endDate = new Date(this.endDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    //   this.fetchData();
    // },

    formatDate(date) {
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  watch: {},
  // created() {
  //   this.tabIndex = parseInt(this.$route.query.tabIndex, 10) || 0;
  //   if (!localStorage.getItem("calendarData")) {
  //     const today = new Date();
  //     const defaultStartDate = `${today.getFullYear()}-${(today.getMonth() + 1)
  //       .toString()
  //       .padStart(2, "0")}`;
  //     this.selectedMonth = defaultStartDate;
  //     this.updateDateRange();
  //   }
  // },
  async mounted() {
    // await nextTick();
    // this.totalHours = [8, 7, 6, 5, 7, 6, 9];
    // this.approvedHours = [6, 6, 5, 4, 6, 5, 8];
    // this.invoicedHours = [5, 4, 3, 2, 5, 3, 6];
    // this.pendingHours = [2, 1, 2, 1, 1, 2, 2];
    this.renderChart("week");
    await this.fetchData();
  },
};
</script>

<style scoped>
.card-border {
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #000000;
  width: 100;
  height: 37;
  color: #fff;
  border-radius: 13px;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
}
.nav-link,
.nav-link:hover,
.nav-link:focus {
  color: #667085;
}
.nav-pills {
  background: #f8f8ff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
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
</style>
