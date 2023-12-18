<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addCategories" aria-labelledby="addCategories">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategories">Add New Document</h5>
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
                <div class="mb-3">
                  <div class="">
                    <label class="form-label">Category Name</label>
                  </div>
                  <div class="mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="category_name"
                    />
                  </div>
                </div>
                <!-- <div class="mb-3 text-uppercase">
                  <div class="d-flex justify-content-between">
                    <label for="exampleInputEmail1" class="form-label"
                      >Preferred Position</label
                    >
                    <div>
                      <input
                        class="form-check-input me-3"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        SELECT ALL
                      </label>
                    </div>
                  </div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="1">ID PROOF</option>
                    <option value="2">NURSE ID</option>
                    <option value="3">TRAINING</option>
                  </select>
                </div>
                <div class="mb-3">
                  <table class="table">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>MANDATORY</td>
                        <td><i class="bi bi-toggle-off"></i></td>
                      </tr>
                      <tr>
                        <td>PROFILE VIEW</td>
                        <td><i class="bi bi-toggle-off"></i></td>
                      </tr>
                      <tr>
                        <td>ISSUE DATE</td>
                        <td><i class="bi bi-toggle-off"></i></td>
                      </tr>
                      <tr>
                        <td>EXPIRY DATE</td>
                        <td><i class="bi bi-toggle-off"></i></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mb-3">
                  <div class="">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >DESC</label
                    >
                  </div>
                  <div class="">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div> -->
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addCategories"
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
  name: "AddCategory",
  data() {
    return {
      category_name: "",
      job_id: [1],
      error: [],
    };
  },
  methods: {
    async addCandidateStatus() {
      const data = {
        category_name: this.category_name,
        job_id: [1],
      };
      try {
        const response = await fetch(
          "https://logezy.onrender.com/document_categories",
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
.table > :not(caption) > * > * {
  background: none;
}
table td > i {
  font-size: 18px;
}
</style>
