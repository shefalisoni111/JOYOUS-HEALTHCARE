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
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
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
              :disabled="isButtonDisabled"
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

export default {
  name: "AddClientJobs",
  data() {
    return {
      name: "",
      client_id: this.$route.params.id,
      color: "#050505",
      errors: {},
      job_id: "",
      options: [],
    };
  },
  components: { SuccessAlert },
  computed: {
    isButtonDisabled() {
      return (
        Object.values(this.errors).some((error) => error !== null) || !this.name.trim()
      );
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
  },
  methods: {
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },

    getError(fieldName) {
      return this.errors[fieldName];
    },
    isEmptyField() {
      return !this.name || !this.isValidColor(this.color) || !this.client_id;
    },

    validateAndAddJob() {
      this.errors = {};

      if (!this.name.trim()) {
        this.$set(this.errors, "name", "Name is required.");
      }

      if (
        Object.values(this.errors).every((error) => error === null) &&
        !this.isEmptyField()
      ) {
        this.addJob();
      }
    },
    async addJob() {
      try {
        await axios.put(`${VITE_API_URL}/clients/${this.$route.params.id}`);
        if (response.ok) {
          this.$emit("jobClientAdded");
          // alert("Add Jobs successfully");
          const message = "Add Client Jobs successfully";
          this.$refs.successAlert.showSuccess(message);
          this.name = "";
        } else {
        }
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
      // const data = {
      //   name: this.name,
      //   color: this.color,
      //   client_id: this.$route.params.id,
      // };
      // try {
      //   const response = await fetch(`${VITE_API_URL}/jobs`, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   if (response.ok) {
      //     this.$emit("jobClientAdded");
      //     // alert("Add Jobs successfully");
      //     const message = "Add Client Jobs successfully";
      //     this.$refs.successAlert.showSuccess(message);
      //     this.name = "";
      //   } else {
      //   }
      // } catch (error) {}
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
  },
  mounted() {
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
