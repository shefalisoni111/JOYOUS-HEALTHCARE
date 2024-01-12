<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editContactProfile"
      aria-labelledby="editContactProfile"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editContactProfile">Edit Contact</h5>
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
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.phone_number"
                      @input="cleanPhoneNumber"
                    />
                    <span
                      v-if="!validatePhoneNumber(fetchCandidate.phone_number)"
                      class="text-danger"
                      >Invalid Phone Number</span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editContactProfile"
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
  name: "editContactProfile",
  data() {
    return {
      fetchCandidate: {
        id: "",

        phone_number: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        address: "",
        jobs_id: 1,

        email: "",
        activated: "",
        employment_type_id: "",
      },
    };
  },
  props: {
    candidateId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
  },
  methods: {
    cleanPhoneNumber() {
      this.fetchCandidate.phone_number = this.fetchCandidate.phone_number.replace(
        /\D/g,
        ""
      );
    },

    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    async fetchCandidateMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);
        this.fetchCandidate = { ...this.fetchCandidate, ...response.data.data };
      } catch (error) {
        // Handle error if needed
      }
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/candidates/${this.fetchCandidate.id}`,
          this.fetchCandidate
        );
        if (response.data) {
          location.reload();
        } else {
        }
        alert("Candidate updated successfully");
      } catch (error) {
        // Handle error if needed
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
