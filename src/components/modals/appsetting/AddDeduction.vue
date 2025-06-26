<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addDeduct" aria-labelledby="addDeductPage">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addDeduct">Add Candidate Deduction</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="col-12 d-flex justify-content-center gap-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Title</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="title"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mb-3 ">
                  <div class="col-12">
                    <label class="form-label" for="selectAddDeduction">JOB</label>
                  </div>
                  <div class="col-12 mt-1">
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
                </div> -->
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Amount</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="amount"
                          v-on:input="handleAmountInput($event)"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div class="mb-3 ">
                  <div class="col-12">
                    <label class="form-label">FREQUENCY</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input type="text" class="form-control" v-model="frequency" />
                    
                  </div>
                </div> -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addDeduct"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addDeductionMethod()"
              :disabled="isFormInvalid"
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
      // jobs_id: "",
      amount: "",
      // frequency: "",
      error: [],
      options: [],
    };
  },
  computed: {
    selectedOptionText() {
      const jobs_id = this.options.find((option) => option.id === this.jobs_id);
      return jobs_id ? jobs_id.name : "";
    },
    isFormInvalid() {
      // return !this.title || !this.jobs_id || !this.amount || !this.frequency;
      return !this.title || !this.amount;
    },
  },
  components: { SuccessAlert },
  methods: {
    clearFieldsData() {
      setTimeout(() => {
        this.title = "";
        // this.jobs_id = "";
        this.amount = "";
        // this.frequency = "";
      }, 10);
    },
    async addDeductionMethod() {
      const data = {
        title: this.title,
        // jobs_id: this.jobs_id,
        amount: this.amount,
        // frequency: this.frequency,
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
          // this.jobs_id = "";
          this.amount = "";
          // this.frequency = "";
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
    handleAmountInput(event) {
      this.amount = event.target.value.replace(/\D/g, "");
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
