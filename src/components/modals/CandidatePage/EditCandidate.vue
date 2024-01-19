<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCandidate"
      aria-labelledby="editCandidate"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCandidate">Edit Candidate</h5>
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
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchCandidate.first_name"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Email</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="email"
                      class="form-control"
                      v-model="fetchCandidate.email"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="number"
                      class="form-control"
                      v-model="fetchCandidate.phone_number"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Status</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.activated"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editCandidate"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
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
  name: "EditCandidate",
  data() {
    return {
      fetchCandidate: {
        id: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        address: "",
        jobs_id: 1,
        phone_number: "",
        email: "",
        activated: "",
        employment_type_id: "",
      },
    };
  },
  props: {
    candidateId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
  },
  methods: {
    async fetchCandidateMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);
        this.fetchCandidate = { ...this.fetchCandidate, ...response.data.data };
      } catch (error) {}
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/candidates/${this.fetchCandidate.id}`,
          this.fetchCandidate
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCandidate.id,
          newData: response.data,
        });
        this.$emit("Candidate-updated");
        alert("Candidate updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    candidateId: {
      immediate: true,
      handler(newCandidateId) {
        this.fetchCandidateMethod(newCandidateId);
      },
    },
  },
};
</script>
