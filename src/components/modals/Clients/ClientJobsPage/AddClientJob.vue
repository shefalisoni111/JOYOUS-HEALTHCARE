<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="AddClientJobs"
      aria-labelledby="AddClientJobs"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddClientJobs">Add Jobs</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <!-- <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Client ID</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="client_id"
                      readonly
                    />
                    <div v-if="getError('client_id')" class="text-danger">
                      {{ getError("client_id") }}
                    </div>
                  </div>
                </div> -->
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Jobs</label>
                  </div>
                  <div class="col-10 mt-1">
                    <select v-model="job_id" class="form-control">
                      <option
                        v-for="option in filteredJobs"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <div v-if="jobAlreadyAdded" class="text-danger">
                      This job is already added to the client.
                    </div>
                  </div>
                  <!-- <div class="col-10 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="name"
                      @input="clearError('name')"
                    />
                    <div v-if="getError('name')" class="text-danger">
                      {{ getError("name") }}
                    </div>
                  </div> -->
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#AddClientJobs"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click="addJob"
              :disabled="!job_id || jobAlreadyAdded"
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
  name: "AddClientJobs",
  data() {
    return {
      job_id: "",
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
      return this.existingJobs.includes(this.job_id);
    },
  },
  methods: {
    async addJob() {
      if (!this.job_id || this.jobAlreadyAdded) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/clients/${this.$route.params.id}`,
          { job_id: this.job_id }
        );
        if (response.status === 200) {
          this.existingJobs.push(this.job_id);

          this.$emit("jobClientAdded");
          const message = "Add Client Jobs successfully";
          this.$refs.successAlert.showSuccess(message);

          this.job_id = "";
        }
      } catch (error) {
        // console.error("Error adding job:", error);
      }
    },
    async getExistingJobs() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}/jobs`
        );
        this.existingJobs = response.data.jobs.map((job) => job.id) || [];
        if (this.existingJobs) {
          this.existingJobs;
        }
      } catch (error) {}
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data || [];
      } catch (error) {
        // console.error(error);
      }
    },
  },
  mounted() {
    this.getExistingJobs();
    this.getPositionMethod();
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
