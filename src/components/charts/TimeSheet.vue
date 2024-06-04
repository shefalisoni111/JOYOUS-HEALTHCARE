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
          "Approved timeSheet hours",
          "Invoiced timeSheet hours",
          "Total pay rate",
          "Pending timeSheet hours",
          "Total charge rate",
        ],
        datasets: [
          {
            data: [35, 24, 6, 11, 111, 331],
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
  async mounted() {
    await this.renderChart();
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
          scales: {
            y: {
              ticks: {
                font: {
                  size: 15,
                },
              },
            },
          },
        },
        plugins: [
          {
            afterDatasetsDraw: (chart) => {
              const { ctx } = chart;
              const datasets = chart.data.datasets;

              datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);

                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index];

                  if (data !== 0) {
                    const y = bar.y - 2;
                    const leftSpace = 10;
                    ctx.fillStyle = "black";
                    ctx.textAlign = "center";
                    const x = bar.x + leftSpace;
                    ctx.fillText(data, x, y);
                  }
                });
              });
            },
          },
        ],
      });
    },
  },
};
</script>
