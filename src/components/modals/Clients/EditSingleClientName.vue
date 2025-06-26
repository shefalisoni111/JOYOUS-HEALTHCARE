<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientName"
      aria-labelledby="editClientName"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientName">Edit Client Name</h5>
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
                    <label class="form-label">Client Name</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchClients.client_name"
                      @input="validateClientName"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editClientName"
              @click="resetChanges"
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
  name: "EditSingleClientName",
  data() {
    return {
      fetchClients: {
        id: "",

        client_name: "",

        error: [],
      },
      originalData: null,
      isClientNameValid: true,
    };
  },
  props: {
    clientID: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    validateClientName() {
      // Regex allows letters, numbers, spaces, and common name punctuation
      const pattern = /^[a-zA-Z0-9\s&.,'-]*$/;
      this.isClientNameValid = pattern.test(this.fetchClients.client_name);
    },
    isSaveDisabled() {
      return !this.isClientNameValid;
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
      this.fetchClients = { ...this.originalData };
    },
    cleanPhoneNumber() {
      this.fetchClients.client_name = this.fetchClients.client_name.replace(
        /\D/g,
        ""
      );
    },

    async fetchClientsMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${id}`);

        this.fetchClients = { ...this.fetchClients, ...response.data };
        console.log(this.fetchClients);
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
        this.$emit("client-updatedName");
        // alert("Client updated successfully");
        const message = "Client Name Updated Successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
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
  //   async beforeRouteEnter(to, from, next) {
  //     next((vm) => {
  //       vm.fetchClientsMethod(this.$route.params.id);
  //     });
  //   },
  //   async beforeRouteUpdate(to, from, next) {
  //     await this.fetchClientsMethod(this.$route.params.id);
  //     next();
  //   },
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
