<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editJob" aria-labelledby="editJob" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editJob">Edit Inactive Jobs</h5>
           
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="">
                    <div class="col-12">
                      <label class="form-label">Name</label>
                    </div>
                    <div class="col-12 mt-1">
                      <input type="text" class="form-control" v-model="fetchJobs.name" />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="">
                    <div class="col-12">
                      <label class="form-label">Color</label>
                    </div>
                    <div class="col-12 mt-1">
                      <input
                        type="color"
                        id="head"
                        name="head"
                        v-model="fetchJobs.color"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editJob"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateJobsMethod()"
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
import axios from "axios";

export default {
  name: "EditJob",
  data() {
    return {
      fetchJobs: {
        name: "",
        color: "",
      },
    };
  },
  props: {
    jobID: {
      type: [String, Number, null],
      required: true,
    },
  },

  methods: {
    async fetchJobsMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/jobs/${id}`);
        this.fetchJobs.name = response.data.data.name;
        this.fetchJobs.color = response.data.data.color;
      } catch (error) {}
    },
    async updateJobsMethod() {
      try {
        const response = await axios.put(`${VITE_API_URL}/jobs/${this.jobID}`, {
          name: this.fetchJobs.name,
          color: this.fetchJobs.color,
        });

        this.$emit("jobUpdate");
        alert("Job updated successfully");
      } catch (error) {
        // console.error("Error updating Category:", error);
      }
    },
  },
  watch: {
    jobID: {
      immediate: true,
      handler(newJobID) {
        this.fetchJobsMethod(newJobID);
      },
    },
  },
  beforeDestroy() {
    this.$options.watch.jobID = null;
  },
};
</script>

<style scoped>
#head {
  width: 40px;
  height: 40px;
}
</style>
