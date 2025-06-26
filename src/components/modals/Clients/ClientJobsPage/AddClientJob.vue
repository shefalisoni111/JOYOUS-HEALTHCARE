<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="AddClientJobs" aria-labelledby="AddClientJobs">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddClientJobs">Add Client Jobs</h5>
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
                <div class="mb-3">
                  <div class="col-12">
                    <label
                      class="form-label fs-5"
                      for="selectJobTitle"
                      style="color: #f9944b"
                      >Staff Rate</label
                    >
                  </div>
                  <div class="col-12 mt-1">
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
              data-bs-target="#AddClientJobs"
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
  name: "AddClientJobs",
  data() {
    return {
      fetchClients: {
        job_ids: [],
      },
      job_ids: [],
      // options: [],
      existingJobs: [],
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
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
        option.checked = this.fetchClients.job_ids.includes(option.id);
      });
      this.job_ids = [...this.fetchClients.job_ids];
    },
    toggleJobsSelection() {
      this.job_ids = this.options
        .filter((option) => option.checked)
        .map((option) => option.id);
    },
    async fetchClientsMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${id}`);

        const jobIds = response.data.job_ids || [];

        this.fetchClients = { ...this.fetchClients, ...response.data };

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
          `${VITE_API_URL}/clients/${this.$route.params.id}/jobs`
        );
        this.existingJobs = response.data.jobs.map((job) => job.id) || [];
        this.resetChanges();
      } catch (error) {
        // Handle error
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data || [];
        this.resetChanges();
      } catch (error) {
        // Handle error
      }
    },
    async addJob() {
      try {
        const updatedJobIds = this.job_ids;

        const response = await axios.put(
          `${VITE_API_URL}/clients/${this.$route.params.id}`,
          { job_ids: updatedJobIds }
        );

        if (response.status === 200) {
          this.existingJobs = [...updatedJobIds];
          this.$emit("jobClientAdded");
          const message = "Jobs added to the client successfully";
          this.$refs.successAlert.showSuccess(message);

          this.fetchClientsMethod(this.$route.params.id);
        }
      } catch (error) {
        // Handle error
      }
    },
  },
  mounted() {
    // this.getPositionMethod();
    this.fetchClientsMethod(this.$route.params.id);
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
