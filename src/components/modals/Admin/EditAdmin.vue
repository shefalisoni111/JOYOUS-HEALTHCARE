<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editAdmin" aria-labelledby="editAdmin" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editAdmin">Edit Admin Profile</h5>
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
                        v-model="fetchAdmin.first_name"
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
                      v-model="fetchAdmin.email"
                      @input="validateEmailFormat(fetchAdmin.email)"
                      ref="email"
                    />
                    <span
                      v-if="fetchAdmin.email && !validateEmailFormat(fetchAdmin.email)"
                      class="text-danger"
                      >Invalid Email</span
                    >
                    <span v-if="emailInUse" class="text-danger">
                      Email is already in use.
                    </span>
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
                      v-model="fetchAdmin.phone_number"
                    />
                    <span
                      v-if="
                        fetchAdmin.phone_number &&
                        !validatePhoneNumberFormat(fetchAdmin.phone_number)
                      "
                      class="text-danger"
                      >Invalid Phone Number</span
                    >
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
                      v-model="fetchAdmin.address"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editAdmin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateAdminMethod()"
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
  name: "editAdmin",
  data() {
    return {
      fetchAdmin: {
        id: 4,
        first_name: "",
        last_name: "",

        address: "",

        phone_number: "",
        email: "",
      },
      emailInUse: false,
    };
  },
  components: { SuccessAlert },
  mounted() {
    this.fetchAdminMethod();
  },
  methods: {
    validateEmailFormat(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk)$/;
      return emailRegex.test(email);
    },
    validatePhoneNumberFormat(phone_number) {
      const phoneRegexWithZero = /^0\d{10}$/;
      const phoneRegexWithCountryCode = /^91\d{10}$/;
      const phoneRegexWithoutPrefix = /^\d{10}$/;

      return (
        phoneRegexWithZero.test(phone_number) ||
        phoneRegexWithCountryCode.test(phone_number) ||
        phoneRegexWithoutPrefix.test(phone_number)
      );
    },
    async fetchAdminMethod() {
      const merchantId = localStorage.getItem("m_unique");
      if (!merchantId) {
        return;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/merchants/${merchantId}`);

        this.fetchAdmin = { ...this.fetchAdmin, ...response.data.data };
      } catch (error) {
        // console.error("Error fetching admin data:", error);
      }
    },
    async updateAdminMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/merchants/${this.fetchAdmin.id}`,
          this.fetchAdmin
        );
        this.$emit("admin-updated");
        const message = "Admin updated successfully";
        this.$refs.successAlert.showSuccess(message);
        // alert("Admin updated successfully");
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
};
</script>
