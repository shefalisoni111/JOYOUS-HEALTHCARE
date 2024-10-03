<template>
  <div class="row">
    <div class="col-12">
      <div class="">
        <div class="card mt-2">
          <div class="card-header">Manage Client Jobs here</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex gap-2 mb-3">
              <div class="gap-2 d-flex" v-for="jobId in getJobs" :key="jobId">
                <span class="btn btn-primary">{{ getJobName(jobId) }}</span>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#AddClientJobs"
              data-bs-whatever="@mdo"
            >
              + Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddClientJob @jobClientAdded="getClientJobData" />
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
      options: [],
    };
  },
  components: { SuccessAlert, AddClientJob },

  methods: {
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
    this.getJobData();

    next();
  },
  async mounted() {
    await this.getClientJobData();
    await this.getJobData();
  },
};
</script>
