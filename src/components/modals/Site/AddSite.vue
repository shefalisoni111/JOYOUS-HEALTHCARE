<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addSite" aria-labelledby="addSite" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSite">Add Site</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between" v-if="selectedClientId">
                  <div class="col-2">
                    <label for="selectClients" class="form-label">Client Name</label>
                  </div>
                  <div class="col-10">
                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="onClientSelect"
                      :disabled="clientData.length === 0"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        :id="option.id"
                        aria-placeholder="Select Job"
                        :disabled="option.id !== selectedClientId"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedClient" class="text-danger"
                      >Client Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit">Site Name</label>
                  </div>

                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="site_name"
                      style="padding-right: 1px"
                      @input="clearError"
                      @change="detectAutofill"
                    />
                    <span
                      v-if="!validateCandidateLName && !autofilled"
                      class="text-danger"
                      >Site Name Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Address</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="address"
                      @input="clearError"
                      @change="detectAutofill"
                      style="padding-right: 1px"
                    />
                    <span v-if="!validateAddress" class="text-danger"
                      >Address Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">email</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      @input="validateEmailFormat"
                      @change="detectAutofill"
                      ref="email"
                      autocomplete="new-email"
                    />
                    <span
                      v-if="email && !validateEmailFormat(email) && !autofilled"
                      class="text-danger"
                      >Invalid Email</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">phone number</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="phone_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                    />
                    <span
                      v-if="phone_number && !validatePhoneNumberFormat(phone_number)"
                      class="text-danger"
                      >Invalid Phone Number</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Split Rate</label>
                  </div>
                  <div class="col-10">
                    <select id="selectOptionSplitRate" v-model="split_rate">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Status</label>
                  </div>
                  <div class="col-10">
                    <select id="selectOptionStatus" v-model="status">
                      <option value="true">Active</option>
                      <option value="false">In-active</option>
                    </select>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Portal Access</label>
                  </div>
                  <div class="col-10">
                    <select id="selectOptionPortalAccess" v-model="portal_access">
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addSite"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormValid"
              :class="{ disabled: !isFormValid }"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              :data-bs-dismiss="isFormValid ? 'modal' : null"
              v-on:click="addSiteMethod()"
            >
              Add Site
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
  name: "AddVacancy",
  data() {
    return {
      validationSelectedClient: true,
      validationNotesText: true,
      validateAddress: true,
      validateCandidateLName: true,
      client_id: "",
      clientData: [],
      site_name: "",
      address: "",
      phone_number: "",
      selectedClientId: this.id,
      email: "",
      status: null,
      split_rate: null,
      portal_access: null,
      isValidForm: false,
      selectedDate: null,
      autofilled: false,
    };
  },
  props: ["id"],
  components: { SuccessAlert },
  computed: {
    isFormValid() {
      return (
        this.client_id !== "" &&
        this.site_name !== "" &&
        this.email !== "" &&
        this.phone_number !== "" &&
        this.address !== "" &&
        this.status !== null &&
        this.split_rate !== null &&
        this.portal_access !== null &&
        this.validateStatus() &&
        this.validateSplitRate() &&
        this.validatePortalAccess()
      );
    },

    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return this.client_id;
    },
  },
  watch: {
    client_id: "validationSelectedClient",
    email: "validateEmailFormat",
    site_name: "validateSiteNameFormate",
    notes: "validationNotesText",
    phone_number: "validatePhoneNumberFormat",
    address: "validateAddressFormat",
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },

    client_id: function (newValue) {
      this.validationSelectedClient = this.ValidationClient(newValue);
    },

    notes: function (newValue) {
      this.validationNotesText = this.ValidationNotes(newValue);
    },
  },
  methods: {
    validateStatus() {
      return this.status !== null;
    },

    validateSplitRate() {
      return this.split_rate !== null;
    },

    validatePortalAccess() {
      return this.portal_access !== null;
    },
    onClientSelect() {
      const selectedClientId = this.client_id;

      this.getJobTitleMethod(selectedClientId);
    },

    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    cleanPhoneNumber() {
      this.phone_number = this.phone_number.replace(/\D/g, "");
    },
    detectAutofill() {
      const isPhoneNumberFilled = this.phone_number.trim() !== "";
      const isPositionSelected = !!this.job_id;
      const isPhoneNumberFocused = document.activeElement === this.$refs.phone_number;

      if (!isPositionSelected) {
        this.showPhoneNumberValidation = !isPhoneNumberFocused && !isPhoneNumberFilled;
      } else {
        this.showPhoneNumberValidation = false;
      }
    },

    removeDate(index) {
      this.dates.splice(index, 1);
      this.clearError();
    },
    async addSiteMethod() {
      this.validateEmail = this.validateEmailFormat(this.email);
      this.validationSelectedClient = this.ValidationClient(this.client_id);
      this.validatePhoneNumber = this.validatePhoneNumberFormat(this.phone_number);
      this.validateAddress = this.validateAddressFormat(this.address);
      this.validateSiteName = this.validateSiteNameFormate(this.first_name);

      if (
        this.validateEmail &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validatePhoneNumber &&
        this.validateAddress &&
        this.validateSiteName
      ) {
        const data = {
          site_name: this.site_name,
          address: this.address,
          phone_number: this.phone_number,
          email: this.email,
          split_rate: this.split_rate,
          status: this.status,
          portal_access: this.portal_access,
          client_id: this.client_id,
        };
        try {
          const response = await fetch(`${VITE_API_URL}/sites`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            this.$emit("addSite");
            this.clearFields();
            setTimeout(() => {
              this.clearError();
            }, 100);

            // alert("Successful Shift added");
            const message = "Site added Successfully";
            this.$refs.successAlert.showSuccess(message);
          } else {
            alert("Error adding Shift");
          }
        } catch (error) {
          alert("Error adding Shift");
        }
      } else {
      }
    },

    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },

    validateEmailFormat(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    ValidationClient(newValue) {
      const clientRegex = /[a-zA-Z0-9]/;
      return clientRegex.test(newValue);
    },
    validatePhoneNumberFormat(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    validateAddressFormat(address) {
      const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
      return addressRegex.test(address);
    },
    validateSiteNameFormate(site_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(site_name);
    },
    clearError() {
      if (this.autofilled) {
        this.autofilled = false;
      } else {
        this.validateEmail = true;
        this.validatePhoneNumber = true;
        this.validationSelectedClient = true;
        this.validateAddress = true;
        this.validateSiteName = true;
      }
    },
    clearFields() {
      this.site_name = "";
      this.address = "";
      this.phone_number = "";
      this.email = "";
      this.split_rate = "";
      this.status = "";
      this.portal_access = "";
      this.client_id = "";
    },
  },
  mounted() {
    if (this.id) {
      this.client_id = this.id;
    }
    this.getClientMethod();

    this.isValidForm = this.isFormValid;
    this.clearError();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
