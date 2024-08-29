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
            <h5 class="modal-title" id="editCandidate">Edit Staff</h5>
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
                    <label class="form-label">Position</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select v-model="fetchCandidate.job_id" id="selectJobTitle">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
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
              :disabled="isSaveDisabled"
            >
              Save
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
        job_id: 1,
        phone_number: "",
        email: "",
        activated: "",
        employment_type_id: "",
      },
      options: [],
    };
  },
  props: {
    candidateId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchVacancy.job_id
      );
      return job_title ? job_title.name : "";
    },
    isPhoneNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchCandidate.phone_number);
    },

    isEmailValid() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
      return emailRegex.test(this.fetchCandidate.email);
    },
    isPasswordMatch() {
      return this.fetchCandidate.password === this.fetchCandidate.confirm_password;
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid || !this.isEmailValid || !this.isPasswordMatch;
    },
  },
  methods: {
    async getJobTitleMethod() {
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
    async fetchCandidateMethod(id) {
      if (!id) return;
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
        // alert("Candidate updated successfully");
        const message = "Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
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
  async mounted() {
    await this.getJobTitleMethod();
  },
};
</script>
<style scoped>
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}
</style>
