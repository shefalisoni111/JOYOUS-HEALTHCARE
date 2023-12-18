<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addCandidateStatus"
      aria-labelledby="addCandidateStatus"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCandidateStatus">
              Add Candidate Status
            </h5>
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
                  <div class="col-2">
                    <label class="form-label">NAME</label>
                  </div>
                  <div class="col-10 mt-1">
                    <input type="text" class="form-control" v-model="title" />
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >DESC</label
                    >
                  </div>
                  <div class="col-10 mt-1">
                    <textarea
                      type="text"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      v-model="description"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addCandidateStatus"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addCandidateStatus()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCandidateStatus",
  data() {
    return {
      title: "",
      description: "",
      error: [],
    };
  },
  methods: {
    async addCandidateStatus() {
      const data = {
        title: this.title,
        description: this.description,
      };
      try {
        const response = await fetch(
          "https://logezy.onrender.com/candidate_statuses",
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
.bi-square-fill::before {
  color: #673ab7;
  font-size: 40px;
}

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
