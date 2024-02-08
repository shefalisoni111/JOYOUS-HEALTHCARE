<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editJob" aria-labelledby="editJob" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editJob">Edit Inactive Jobs</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
      } catch (error) {}
    },
    async updateJobsMethod() {
      try {
        const response = await axios.put(`${VITE_API_URL}/jobs/${this.jobID}`, {
          name: this.fetchJobs.name,
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
