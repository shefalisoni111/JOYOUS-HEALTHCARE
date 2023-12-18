<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

// centerTextDoughnut plugin block
const textCenter = {
  id: "textCenter",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0] - y;
    ctx.save();
    ctx.font = "bolder 50px sans-serif";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Value", xCoor, yCoor - 2);
    ctx.font = "bolder 50px sans-serif";
    ctx.fillStyle = "red";
    ctx.fillText(data.datasets[0].data[0], xCoor, yCoor);
  },
};

export default {
  name: "DonutChart",

  components: { Doughnut },
  data() {
    return {
      chartData: {
        labels: [
          "Total timeSheet hours",
          "Approved timesheet hours",
          "Invoiced timesheet hours",
          "Total pay rate",
          "Pending timesheet hours",
          "Total charge rate",
        ],
        datasets: [
          {
            backgroundColor: [
              "#16aa8a",
              "#304adc",
              "#10c2b8",
              "#e91e1e",
              "#E91E63",
              "#5b6260",
            ],
            data: [35, 24, 0, 11, 111, 331],
            cutout: "66%",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          plugins: [textCenter],
          // title: {
          //   display: true,
          //   text: "Custom Chart Title",
          //   align: "center",
          //   verticalAlign: "middle",
          //   style: {},
          // },
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

<style>
#my-chart-id::after {
  content: "hi";
}
</style>
