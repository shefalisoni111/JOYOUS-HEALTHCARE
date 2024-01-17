<template>
  <div>
    <canvas ref="chartCanvas" height="335px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      chart: null,
      dataObject: {
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
            data: [35, 24, 0, 11, 111, 331],
            backgroundColor: [
              "#16aa8a",
              "#304adc",
              "#10c2b8",
              "#e91e1e",
              "#E91E63",
              "#5b6260",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "#16aa8a",
              "#304adc",
              "#10c2b8",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: this.dataObject,
        options: {
          indexAxis: "y",
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
};
</script>
