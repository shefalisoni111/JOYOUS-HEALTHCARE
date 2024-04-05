<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addDeduct" aria-labelledby="addDeductPage" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addDeduct">Add Candidate Deduction</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">TITLE</label>
                  </div>
                  <div class="col-8">
                    <input type="text" class="form-control" v-model="title" />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label" for="selectAddDeduction">JOB</label>
                  </div>
                  <div class="col-8 mt-1">
                    <select v-model="jobs_id" id="selectAddDeduction">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">AMOUNT</label>
                  </div>
                  <div class="col-8 mt-1">
                    <input type="text" class="form-control" v-model="amount" />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">FREQUENCY</label>
                  </div>
                  <div class="col-8 mt-1">
                    <input type="text" class="form-control" v-model="frequency" />
                    <!-- <i class="bi bi-square-fill"></i> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addDeduct"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addDeductionMethod()"
            >
              Add Deduction
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "AddDeduction",
  data() {
    return {
      title: "",
      jobs_id: "",
      amount: "",
      frequency: "",
      error: [],
      options: [],
    };
  },
  computed: {
    selectedOptionText() {
      const jobs_id = this.options.find((option) => option.id === this.jobs_id);
      return jobs_id ? jobs_id.name : "";
    },
  },
  components: { SuccessAlert },
  methods: {
    async addDeductionMethod() {
      const data = {
        title: this.title,
        jobs_id: this.jobs_id,
        amount: this.amount,
        frequency: this.frequency,
      };
      try {
        const response = await fetch(`${VITE_API_URL}/candidate_deductions`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.$emit("updateList");
          const message = "Add Deduction Successful";
          this.$refs.successAlert.showSuccess(message);
          this.title = "";
          this.jobs_id = "";
          this.amount = "";
          this.frequency = "";
        } else {
          // console.error("Failed to add candidate deduction:", response.statusText);
        }
      } catch (error) {}
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
  async mounted() {
    await this.getPositionMethod();
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
select {
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: 0px solid transparent;
}
</style>
