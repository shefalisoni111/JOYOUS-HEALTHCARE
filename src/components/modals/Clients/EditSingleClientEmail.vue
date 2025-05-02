<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientEmail"
      aria-labelledby="editClientEmail"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientEmail">Edit Client Email</h5>
          </div>
          <div class="modal-body mx-3" style="background: #dbdbdb">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Email</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="email"
                      class="form-control"
                      v-model="fetchClients.email"
                      @input="validateEmailFormat"
                      @change="detectAutofill"
                    />
                    <span
                      v-if="fetchClients.email && !isEmailValid"
                      class="text-danger"
                    >
                      Please enter a valid email address.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editClientEmail"
              @click="resetChanges"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateClientMethod()"
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
  name: "EditSingleClientEmail",
  data() {
    return {
      fetchClients: {
        id: "",

        email: "",
      },
      originalData: null,
      emailValid: true,
    };
  },
  props: {
    clientID: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isEmailValid() {
      return this.emailValid;
    },
    isSaveDisabled() {
      return !this.emailValid;
    },
  },
  components: { SuccessAlert },
  methods: {
    detectAutofill() {
      setTimeout(() => {
        const isAutofilled = this.fetchClients.email !== "";
        this.emailValid = isAutofilled
          ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/.test(
              this.fetchClients.email
            )
          : false;
      }, 100);
    },
    resetChanges() {
      this.fetchClients = { ...this.originalData };
    },
    validateEmailFormat() {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      this.emailValid = emailRegex.test(this.fetchClients.email);
    },
    async fetchClientsMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${id}`);

        this.fetchClients = { ...this.fetchClients, ...response.data };
        this.originalData = { ...this.fetchClients };
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
        this.$emit("client-updatedEmail");
        // alert("Client updated successfully");
        const message = "Client Email Successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    validatePhoneNumberFormat(phone_number) {
      return /^\d{11}$/.test(phone_number);
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchClientsMethod(vm.$route.params.id);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchClientsMethod(this.$route.params.id);
    next();
  },
  // async mounted() {
  //   await this.fetchClientsMethod(this.$route.params.id);
  // },
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
