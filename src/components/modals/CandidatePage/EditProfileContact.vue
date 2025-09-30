<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editContactProfile"
      aria-labelledby="editContactProfile"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editContactProfile">Edit Contact</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
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
                    <!-- <span
                      v-if="!isPhoneNumberValid && fetchCandidate.phone_number.length > 0"
                      class="text-danger"
                      >Invalid Phone Number</span
                    > -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editContactProfile"
              @click="resetChanges"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary text-capitalize fw-medium"
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
      originalData: null,
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
    isPhoneNumberValid() {
      return this.validatePhoneNumber(this.fetchCandidate.phone_number);
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid;
    },
  },
  components: { SuccessAlert },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },

    resetChanges() {
      this.fetchCandidate = { ...this.originalData };
      this.blurActiveElement();
    },
    cleanPhoneNumber() {
      this.fetchCandidate.phone_number =
        this.fetchCandidate.phone_number.replace(/\D/g, "");
    },
    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[789]\d{9}$/;
      return phoneRegex.test(phoneNumber);
    },
    async fetchCandidateMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);
        this.fetchCandidate = {
          ...this.fetchCandidate,
          ...response.data.candidate,
        };
        this.originalData = { ...this.fetchCandidate };
      } catch (error) {}
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/candidates/${this.fetchCandidate.id}`,
          this.fetchCandidate
        );
        this.$emit("contactAdded");
        const message = "Staff Contact updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // Handle error
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchCandidateMethod(this.$route.params.id);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchCandidateMethod(this.$route.params.id);
    next();
  },
};
</script>
