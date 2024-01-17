<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
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
            axis: "y",
            label: "My First Dataset",
            data: [35, 24, 0, 11, 111, 331],

            fill: false,
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
      chartConfig: {
        type: "bar",
        data: this.dataObject,
        options: {
          indexAxis: "y",
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      const simpleDataObject = {
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
            axis: "y",
            label: "TimeSheet",
            data: [35, 24, 0, 11, 111, 331],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
        ],
      };

      this.chart = new Chart(ctx, { type: "bar", data: simpleDataObject });
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.renderChart();
    },
  },
  watch: {
    "dataObject.labels": "updateChart",
    "dataObject.datasets[0].data": "updateChart",
  },
};
</script>
