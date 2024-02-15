<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
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
            data: [50, 10, 15, 3],
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
          legend: { display: false },
          tooltip: { enable: false },
        },
        cutout: 50,
        layout: {
          padding: {
            bottom: 20,
          },
        },
        plugins: {
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
};
</script>
