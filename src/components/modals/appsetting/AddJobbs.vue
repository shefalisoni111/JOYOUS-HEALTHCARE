<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="myModal"
      aria-labelledby="myModal"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModal">Add Jobs</h5>
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
                    <input type="text" class="form-control" v-model="name" />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="exampleFormControlTextarea1" class="form-label"
                      >COLOR</label
                    >
                  </div>
                  <div class="col-10 mt-1">
                    <input type="color" id="head" name="head" v-model="color" />
                    <!-- <i class="bi bi-square-fill"></i> -->
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
              data-bs-target="#myModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addJob()"
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
  name: "AddJobbs",
  data() {
    return {
      name: "",
      color: "",
      description: "",

      error: [],
    };
  },
  methods: {
    async addJob() {
      const data = {
        name: this.name,
        color: this.color,
        description: this.description,
      };
      try {
        const response = await fetch("https://logezy.onrender.com/jobs", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (data) {
          location.reload();
        }
      } catch (error) {}
    },
  },
  mounted() {},
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
