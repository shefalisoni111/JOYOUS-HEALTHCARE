<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addDeduct"
      aria-labelledby="addDeductPage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addDeduct">Add Candidate Deduction</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
                    <label class="form-label">JOB</label>
                  </div>
                  <div class="col-8 mt-1">
                    <input type="text" class="form-control" v-model="jobs_id" />
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
                    <input
                      type="text"
                      class="form-control"
                      v-model="frequency"
                    />
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
              Add Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddDeduction",
  data() {
    return {
      title: "",
      jobs_id: 1,
      amount: "",
      frequency: "",
      error: [],
    };
  },
  methods: {
    async addDeductionMethod() {
      const data = {
        title: this.title,
        jobs_id: 1,
        amount: this.amount,
        frequency: this.frequency,
      };
      try {
        const response = await fetch(
          "https://logezy.onrender.com/candidate_deductions",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (data) {
          location.reload();
        }
      } catch (error) {}
    },
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
</style>
