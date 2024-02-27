<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editClient" aria-labelledby="editClient" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClient">Edit Vendor</h5>
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
                        v-model="fetchClients.first_name"
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
  name: "CandidateAdd",
  data() {
    return {
      fetchClients: {
        id: "",
        first_name: "",

        address: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
        error: [],
      },
    };
  },
  props: {
    clientID: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    cleanPhoneNumber() {
      this.fetchClients.phone_number = this.fetchClients.phone_number.replace(/\D/g, "");
    },
    async fetchClientsMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients/${id}`);

        this.fetchClients = { ...this.fetchClients, ...response.data.data };
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
        alert("Client updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    validatePhoneNumberFormat(phone_number) {
      return /^\d{10}$/.test(phone_number);
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
  mounted() {
    this.fetchClientsMethod(this.$route.params.id);
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
