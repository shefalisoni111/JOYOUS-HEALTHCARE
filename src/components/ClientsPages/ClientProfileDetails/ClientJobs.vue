<template>
  <div class="row">
    <div class="col-12">
      <div class="px-3">
        <div class="col-12 mt-2">
          <div class="d-flex justify-content-between">
            <div class="">Manage Client Jobs here</div>
            <button
              type="button"
              class="btn btn-primary text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#AddClientJobs"
              data-bs-whatever="@mdo"
            >
              + Add Job
            </button>
          </div>
        </div>
        <dic class="">
          <div class="card-body">
            <div class="d-flex gap-3 flex-wrap">
              <div
                class="job-card text-center p-3 rounded-3"
                v-for="(jobId, index) in getJobs"
                :key="jobId"
                :style="getBgStyle(index)"
              >
                <div
                  class="job-icon d-flex align-items-center justify-content-center mx-auto mb-2 rounded-circle"
                  :style="getIconStyle(index)"
                >
                  <img
                    src="../../../assets/jobname.png"
                    alt="icon"
                    class="icon-img"
                  />
                </div>
                <span class="fw-medium">{{ getJobName(jobId) }}</span>
              </div>
            </div>
          </div>
        </dic>
      </div>
    </div>
    <AddClientJob @jobClientAdded="getClientJobData" :options="options" />
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import AddClientJob from "../../modals/Clients/ClientJobsPage/AddClientJob.vue";

export default {
  name: "ClientJobs",
  data() {
    return {
      getJobs: [],
      isLoading: false,
      // options: [],
    };
  },
  components: { SuccessAlert, AddClientJob },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getBgStyle(index) {
      const bgColors = [
        "#F9944B14", // 0 - light orange
        "#34C7591A", // 1 - light green
        "#FF2D551A", // 2 - light red
        "#32ADE61A", // 3 - light teal
        "#007AFF14", // 4 - light blue
        "#5856D614", // 5 - light purple
        "#AF52DE1A", // 6 - light violet
        "#A2845E14", // 7 - light brown
        "#30B0C714", // 8 - light cyan
        "#FF3B3014", // 9 - light coral
        "#FFD60A14", // 10 - light yellow
      ];

      return {
        backgroundColor: bgColors[index % bgColors.length],
      };
    },

    getIconStyle(index) {
      const iconColors = [
        "#F9944B", // 0 - orange
        "#34C759", // 1 - green
        "#FF2D55", // 2 - red
        "#32ADE6", // 3 - teal
        "#007AFF", // 4 - blue
        "#5856D6", // 5 - purple
        "#AF52DE", // 6 - violet
        "#A2845E", // 7 - brown
        "#30B0C7", // 8 - cyan
        "#FF3B30", // 9 - coral
        "#FFD60A", // 10 - yellow
      ];

      return {
        backgroundColor: iconColors[index % iconColors.length],
      };
    },
    async getClientJobData() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}`
        );

        this.getJobs = response.data.job_ids || [];
      } catch (error) {
        // console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    getJobName(jobId) {
      const job = this.options.find((job) => job.id === jobId);
      return job ? job.name : "";
    },
    async getJobData() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data || [];
      } catch (error) {}
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.getClientJobData();
    // this.getJobData();

    next();
  },
  async mounted() {
    await this.getClientJobData();
    // await this.getJobData();
  },
};
</script>
<style scoped>
.job-card {
  width: 120px;
  height: 130px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.job-icon {
  width: 48px;
  height: 48px;
  background-color: #f9944b;
}

.icon-img {
  width: 24px;
  height: 24px;
}
</style>
