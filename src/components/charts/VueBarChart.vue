<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "DonutChart",
  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: ["Open Vancies", "Apllied Vancies", "Assign Vancies"],
        datasets: [
          {
            backgroundColor: ["#57e3b4", "#e66e65", "#22cbe0"],
            data: [50, 10, 15],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Custom Chart Title",
          },
          legend: { display: false },
          tooltip: { enable: false },
        },
      },
      doughnutlabel: {
        labels: [
          {
            text: "550",
            font: {
              size: 20,
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
};
</script>
