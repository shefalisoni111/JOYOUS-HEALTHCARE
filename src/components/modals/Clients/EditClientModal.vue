<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editClient" aria-labelledby="editClient" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClient">Edit Client</h5>
          </div>
          <div class="modal-body mx-3" style="background: #dbdbdb">
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
                        v-model="fetchClients.first_name"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectJobTitle">Jobs</label>
                  </div>
                  <div class="col-12">
                    <div v-for="option in options" :key="option.id">
                      <input
                        type="checkbox"
                        :id="option.id"
                        :value="option.id"
                        v-model="option.checked"
                        @change="toggleJobsSelection"
                      />
                      <label :for="option.id" class="text-capitalize"
                        >&nbsp;{{ option.name }}</label
                      >
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
                      v-model="fetchClients.email"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Phone Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchClients.phone_number"
                      @input="cleanPhoneNumber"
                      inputmode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Password</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchClients.password"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Confirm Password</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchClients.confirm_password"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Address</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchClients.address"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editClient"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateClientMethod"
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
  name: "EditClientModal",
  data() {
    return {
      fetchClients: {
        id: "",
        first_name: "",
        job_id: [],
        address: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
        error: [],
      },
      options: [],
      // selectedJobNames: [],
    };
  },
  props: {
    clientID: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchClients.job_id
      );
      return job_title ? job_title.name : "";
    },
    isPhoneNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchClients.phone_number);
    },

    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.fetchClients.email);
    },
    isPasswordMatch() {
      return this.fetchClients.password === this.fetchClients.confirm_password;
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid || !this.isEmailValid || !this.isPasswordMatch;
    },
  },
  components: { SuccessAlert },
  methods: {
    cleanPhoneNumber() {
      this.fetchClients.phone_number = this.fetchClients.phone_number.replace(/\D/g, "");
    },
    async fetchClientsMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${id}`);

        this.fetchClients = { ...this.fetchClients, ...response.data };
        this.options.forEach((option) => {
          option.checked = this.fetchClients.job_id.includes(option.id);
        });
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
    async updateClientMethod() {
      try {
        await axios.put(
          `${VITE_API_URL}/clients/${this.fetchClients.id}`,
          this.fetchClients
        );
        this.$emit("client-updated");
        // alert("Client updated successfully");
        const message = "Client Updated Successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    validatePhoneNumberFormat(phone_number) {
      return /^\d{10}$/.test(phone_number);
    },
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
  },
  watch: {
    clientID: {
      immediate: true,
      handler(newClientID) {
        this.fetchClientsMethod(newClientID);
      },
    },
  },
  // async beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getJobTitleMethod();
  //   });
  // },
  // async beforeRouteUpdate(to, from, next) {
  //   this.getJobTitleMethod();
  //   next();
  // },
  mounted() {
    this.fetchClientsMethod(this.$route.params.id);
    this.getJobTitleMethod();
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
