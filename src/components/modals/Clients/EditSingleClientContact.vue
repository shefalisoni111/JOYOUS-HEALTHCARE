<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientContact"
      aria-labelledby="editClientContact"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientContact">
              Edit Client Contact
            </h5>
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
                      v-model="fetchClients.phone_number"
                      @input="cleanPhoneNumber"
                      inputmode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editClientContact"
              @click="resetChanges"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary text-capitalize fw-medium"
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
  name: "EditSingleClientContact",
  data() {
    return {
      fetchClients: {
        id: "",

        phone_number: "",

        error: [],
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
    isPhoneNumberValid() {
      return /^[0-9]{11}$/.test(this.fetchClients?.phone_number);
    },
    isSaveDisabled() {
      return !this.isPhoneNumberValid;
    },
  },
  components: { SuccessAlert },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    resetChanges() {
      this.fetchClients = { ...this.originalData };
    },
    cleanPhoneNumber() {
      this.fetchClients.phone_number = this.fetchClients.phone_number.replace(
        /\D/g,
        ""
      );
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
        this.$emit("client-updatedContact");
        // alert("Client updated successfully");
        const message = "Client Contact Updated Successfully";
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
  // async beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.fetchClientsMethod(this.$route.params.id);
  //   });
  // },
  // async beforeRouteUpdate(to, from, next) {
  //   await this.fetchClientsMethod(this.$route.params.id);
  //   next();
  // },
  // async mounted() {
  //   await this.fetchClientsMethod(this.$route.params.id);
  // },
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}
</style>
