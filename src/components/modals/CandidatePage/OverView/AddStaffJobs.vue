<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addStaffJobs" aria-labelledby="addStaffJobs">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStaffJobs">Add Jobs</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
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
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addStaffJobs"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click="addJob"
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
  name: "AddStaffJobs",
  data() {
    return {
      fetchStaffJobs: {
        job_ids: [],
      },
      job_ids: [],
      options: [],
      existingJobs: [],
    };
  },
  components: { SuccessAlert },
  computed: {},
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    resetChanges() {
      this.options.forEach((option) => {
        option.checked = this.fetchStaffJobs.job_ids.includes(option.id);
      });
      this.job_ids = [...this.fetchStaffJobs.job_ids];
    },
    toggleJobsSelection() {
      this.job_ids = this.options
        .filter((option) => option.checked)
        .map((option) => option.id);
    },
    async fetchStaffJobsMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);

        const jobIds = response.data.candidate.job_ids || [];

        this.fetchStaffJobs = {
          ...this.fetchStaffJobs,
          ...response.data.candidate,
        };

        this.options.forEach((option) => {
          option.checked = jobIds.includes(option.id);
        });

        this.job_ids = [...jobIds];
      } catch (error) {
        // Handle error
      }
    },
    async getExistingJobs() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/jobs`
        );
        this.existingJobs =
          response.data.candidate.jobs.map((job) => job.id) || [];
        this.resetChanges();
      } catch (error) {
        // Handle error
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        // this.options = response.data.data || [];
        this.options = response.data.data.map((job) => ({
          ...job,
          checked: false,
        }));
        this.resetChanges();
      } catch (error) {
        // Handle error
      }
    },
    async addJob() {
      try {
        const updatedJobIds = this.job_ids;

        const response = await axios.put(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`,
          { job_ids: updatedJobIds }
        );

        if (response.status === 200) {
          this.existingJobs = [...updatedJobIds];
          this.$emit("jobStaffAdded");
          const message = "Jobs added to the staff successfully";
          this.$refs.successAlert.showSuccess(message);

          this.fetchStaffJobsMethod(this.$route.params.id);
        }
      } catch (error) {
        // Handle error
      }
    },
  },
  async mounted() {
    await this.getPositionMethod();
    await this.fetchStaffJobsMethod(this.$route.params.id);
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}
</style>
