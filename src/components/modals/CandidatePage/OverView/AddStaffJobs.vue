<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addStaffJobs"
      aria-labelledby="addStaffJobs"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStaffJobs">Add Jobs</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Jobs</label>
                  </div>
                  <div class="col-10 mt-1">
                    <div v-for="option in options" :key="option.id">
                      <input
                        type="checkbox"
                        :id="option.id"
                        :value="option.id"
                        v-model="option.checked"
                        @change="toggleJobsSelection"
                      />
                      <label :for="option.id" class="text-capitalize"
                        >&nbsp;{{ option.name }}</label
                      >
                    </div>
                    <div v-if="jobAlreadyAdded" class="text-danger">
                      This job is already added to the client.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addStaffJobs"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click="addJob"
              :disabled="jobAlreadyAdded"
            >
              Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import SuccessAlert from "../../../Alerts/SuccessAlert.vue";
import axios from "axios";

export default {
  name: "addStaffJobs",
  data() {
    return {
      fetchStaff: {
        job_ids: [],
      },
      job_ids: [],
      options: [],
      existingJobs: [],
    };
  },
  components: { SuccessAlert },
  computed: {
    filteredJobs() {
      return this.options.filter((job) => !this.existingJobs.includes(job.id));
    },
    jobAlreadyAdded() {
      return this.existingJobs.some((existingJobId) =>
        this.job_ids.includes(existingJobId)
      );
    },
  },
  methods: {
    toggleJobsSelection() {
      this.job_ids = this.options
        .filter((option) => option.checked)
        .map((option) => option.id);
    },
    async fetchStaffMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);

        const jobIds = response.data.job_ids || [];
        this.fetchStaff = { ...this.fetchStaff, ...response.data.data };

        this.options.forEach((option) => {
          option.checked = jobIds.includes(option.id);
        });

        this.job_ids = jobIds;
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async addJob() {
      if (!this.job_ids.length || this.jobAlreadyAdded) {
        return;
      }

      try {
        const updatedJobIds = [...new Set([...this.existingJobs, ...this.job_ids])];

        const response = await axios.put(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`,
          { job_ids: updatedJobIds }
        );

        if (response.status === 200) {
          this.existingJobs = updatedJobIds;
          this.$emit("jobStaffAdded");
          const message = "Jobs added to the Staff successfully";
          this.$refs.successAlert.showSuccess(message);

          this.job_ids = [];
          this.options.forEach((option) => (option.checked = false));
        }
      } catch (error) {
        // console.error("Error adding job:", error);
      }
    },
    async getExistingJobs() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/jobs`
        );
        this.existingJobs = response.data.jobs.map((job) => job.id) || [];
        this.options.forEach((option) => {
          option.checked = this.existingJobs.includes(option.id);
        });
      } catch (error) {}
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data || [];
        this.options.forEach((option) => {
          option.checked = this.existingJobs.includes(option.id);
        });
      } catch (error) {
        // console.error(error);
      }
    },
  },
  mounted() {
    // this.getExistingJobs();
    this.getPositionMethod();
    this.fetchStaffMethod(this.$route.params.id);
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}
.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}
</style>
