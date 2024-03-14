<template>
  <Doughnut ref="myChart" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "DonutChart",
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: [
          "Open Vacancies",
          "Applied Vacancies",
          "Assign Vacancies",
          "Deleted Shifts",
        ],
        datasets: [
          {
            backgroundColor: ["#57e3b4", "#e66e65", "#22cbe0", "#fc1414cf"],
            data: [0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
            position: "bottom",
            align: "center",
            padding: {
              top: 30,
            },
            labels: {
              font: {
                size: 15,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
          afterDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            const { datasets, data, scale, width, height } = chart;
            const total = datasets[0].data.reduce((acc, value) => acc + value, 0);

            ctx.save();
            ctx.font = "15px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const centerX = width / 2;
            const centerY = height / 2;

            chart.data.labels.forEach((label, index) => {
              const percent = data[index] / total;
              const angle = Math.PI * 2 * percent;
              const x = centerX + Math.cos(angle) * scale.xLength * 0.5;
              const y = centerY + Math.sin(angle) * scale.yLength * 0.5;

              ctx.fillText(label, x, y);
            });

            ctx.restore();
          },
        },
      },

      doughnutlabel: {
        labels: [
          {
            text: "550",
            font: {
              size: 10,
              weight: "bold",
            },
          },
          {
            text: "total",
          },
        ],
      },
    };
  },
  methods: {
    fetchData() {
      axios
        .get(`${VITE_API_URL}/home_vacancy_data`)
        .then((response) => {
          const apiData = response.data.data;

          this.chartData.datasets[0].data[0] = apiData.activate_vacancy || 0;
          this.chartData.datasets[0].data[1] = apiData.applied_vacancies || 0;
          this.chartData.datasets[0].data[2] = apiData.assigned_vacancies || 0;
          this.chartData.datasets[0].data[3] = apiData.inactive_vacancies || 0;

          const data = this.chartData.datasets[0].data;

          if (this.$refs.myChart && this.$refs.myChart.chart) {
            this.$refs.myChart.chart.update();
            // console.log("Chart updated successfully");
          } else {
            // console.error("Chart instance or reference not found:", this.$refs.myChart);
          }
        })
        .catch((error) => {
          // console.error("Error fetching data:", error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
