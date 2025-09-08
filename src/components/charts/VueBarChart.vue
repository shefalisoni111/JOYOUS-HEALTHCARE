<template>
  <div class="chart-container">
    <div v-if="allZero">
      <p class="text-danger">No data available</p>
    </div>
    <div v-else>
      <Doughnut
        ref="myChart"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
            backgroundColor: ["#4a3aff", "#e0c6fd", "#c6d2fd", "#f5aaac"],
            borderWidth: 2,
            borderRadius: 15,
            hoverOffset: 10,
            data: [0, 0, 0, 0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%", // Controls the inner radius to make it a donut
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
          datalabels: {
            color: "#ffffff", // White text inside segments
            font: {
              size: 16,
              weight: "bold",
            },
            align: "center",
            anchor: "center",
            formatter: (value) => (value > 0 ? value : ""), // Hide zero values
          },
        },
      },
    };
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    fetchData() {
      axios
        .get(`${VITE_API_URL}/home_vacancy_data`)
        .then((response) => {
          const apiData = response.data.data;
          this.chartData.datasets[0].data = [
            apiData.activate_vacancy || 0,
            apiData.applied_vacancies || 0,
            apiData.assigned_vacancies || 0,
            apiData.inactive_vacancies || 0,
          ];
          if (this.$refs.myChart && this.$refs.myChart.chart) {
            this.$refs.myChart.chart.update();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  computed: {
    allZero() {
      return this.chartData.datasets[0].data.every((val) => val === 0);
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
