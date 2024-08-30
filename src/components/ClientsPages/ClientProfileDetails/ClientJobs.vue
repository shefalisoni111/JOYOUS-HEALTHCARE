<template>
  <div class="row">
    <div class="col-12">
      <div class="">
        <div class="card mt-2">
          <div class="card-header">Manage Client Jobs here</div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex gap-2 mb-3">
              <div class="gap-2 d-flex" v-for="data in getJobs" :key="data.id">
                <span class="btn btn-primary">{{ data.name }}</span>
                <!-- <span class="btn btn-primary">Nurse</span>
                <span class="btn btn-primary">HCA</span>
                <span class="btn btn-primary">Senior Doctor</span> -->
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
    <AddClientJob @jobClientAdded="getJobData(this.$route.params.id)" />
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
      name: "",
      client_id: this.$route.params.id,
      getJobs: [],
      errors: {},
    };
  },
  components: { SuccessAlert, AddClientJob },

  methods: {
    async getJobData(clientId) {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        if (clientId) {
          this.getJobs = response.data.data.filter((job) => job.client_id === clientId);
        } else {
          this.getJobs = response.data.data;
        }
      } catch (error) {
        // console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const clientId = this.$route.params.id;
    this.getJobData(clientId);

    next();
  },
  mounted() {
    this.getJobData(this.$route.params.id);
  },
};
</script>
