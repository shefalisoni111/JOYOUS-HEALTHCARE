<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addClientSite" aria-labelledby="addClientSites">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClientSite">Add Client Site</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="selectClients" class="form-label"
                      >Client Name</label
                    >
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      :value="clientFirstName || 'Click to get client name'"
                      style="padding-right: 1px"
                      @input="clearError"
                      disabled
                    />
                    <!-- <select v-model="client_id" id="selectClients">
                      <option value="">All Client</option>
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedClient" class="text-danger"
                      >Client Required</span
                    > -->
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle"
                      >Contact Person Name</label
                    >
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="contact_person_name"
                      @input="clearError"
                      @change="detectAutofill"
                      style="padding-right: 1px"
                    />
                    <!-- <span v-if="!validateSiteNameFormate" class="text-danger"
                      >Contact Person Name Required</span
                    > -->
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Contact Person Email</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="email"
                      class="form-control"
                      v-model="contact_person_email"
                      @input="validateEmailFormat"
                      @change="detectAutofill"
                      ref="email"
                      autocomplete="new-email"
                    />
                    <span
                      v-if="
                        contact_person_email &&
                        !validateEmailFormat(contact_person_email) &&
                        !autofilled
                      "
                      class="text-danger"
                      >Invalid Email</span
                    >
                    <!-- <span
                      v-if="contact_person_email && !isEmailUnique && !autofilled"
                      class="text-danger"
                      >Email already in use</span
                    > -->
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Contact Person phone</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="contact_person_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                    />
                    <!-- <span
                      v-if="
                        contact_person_number &&
                        !validatePhoneNumberFormat(contact_person_number)
                      "
                      class="text-danger"
                      >Invalid Phone Number</span
                    > -->
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Site Name</label
                    >
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
                    <label class="form-label" for="selectJobTitle"
                      >Address</label
                    >
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
                      v-if="
                        phone_number && !validatePhoneNumberFormat(phone_number)
                      "
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
                    <select
                      id="selectOptionPortalAccess"
                      v-model="portal_access"
                    >
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
              class="btn btn-dark btn-cancel"
              data-bs-target="#addClientSite"
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
              v-on:click="addClientSiteMethod()"
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
import Swal from "sweetalert2";
export default {
  name: "AddClientSite",
  data() {
    return {
      validationSelectedClient: true,
      validationNotesText: true,
      validateAddress: true,
      validateCandidateLName: true,
      contact_person_name: "",
      contact_person_email: "",
      contact_person_number: "",
      clientFirstName: "",
      client_id: this.$route.params.id,
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
        this.contact_person_email !== "" &&
        this.contact_person_number !== "" &&
        this.contact_person_name !== "" &&
        this.validateStatus() &&
        this.validateSplitRate() &&
        this.validatePortalAccess()
      );
    },

    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.client_name : "";
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
    id(newVal) {
      this.client_id = newVal;
      this.getClientMethod();
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
      const selectedClientId = this.id;
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
      const isPhoneNumberFocused =
        document.activeElement === this.$refs.phone_number;

      if (!isPositionSelected) {
        this.showPhoneNumberValidation =
          !isPhoneNumberFocused && !isPhoneNumberFilled;
      } else {
        this.showPhoneNumberValidation = false;
      }
    },

    removeDate(index) {
      this.dates.splice(index, 1);
      this.clearError();
    },
    async addClientSiteMethod() {
      this.validateEmail = this.validateEmailFormat(this.email);
      this.validationSelectedClient = this.ValidationClient(this.client_id);
      this.validatePhoneNumber = this.validatePhoneNumberFormat(
        this.phone_number
      );
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
          contact_person_name: this.contact_person_name,
          contact_person_email: this.contact_person_email,
          contact_person_number: this.contact_person_number,
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
            // this.$emit("getSiteAllDataMethod");
            this.clearFields();
            setTimeout(() => {
              this.clearError();
            }, 100);

            // alert("Successful Shift added");
            const message = "Client Site added Successfully";
            this.$refs.successAlert.showSuccess(message);
          } else {
            // alert("Error adding Shift");
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error adding Shift",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          // alert("Error adding Shift");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error adding Shift",
            confirmButtonText: "OK",
          });
        }
      } else {
      }
    },

    validateEmailFormat(email) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailRegex.test(email);
    },
    ValidationClient(newValue) {
      const clientRegex = /[a-zA-Z0-9]/;
      return clientRegex.test(newValue);
    },
    validatePhoneNumberFormat(phoneNumber) {
      const phoneRegex = /^\d{11}$/;
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
      this.contact_person_name = "";
      this.contact_person_email = "";
      this.contact_person_number = "";
    },
    async getClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}`
        );
        this.clientFirstName = response.data.client_name;
        if (response.data && response.data.data) {
          const client = response.data.data;
          this.clientData = [{ id: client.id, first_name: client.client_name }];
          this.client_id = client.id;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.client_id = to.params.id;
      vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.client_id = to.params.id;
    this.getClientMethod();

    next();
  },
  mounted() {
    // if (this.id) {
    //   this.client_id = this.id;
    // }

    this.client_id = this.$route.params.id;
    this.getClientMethod();
    // this.isValidForm = this.isFormValid;
    // this.clearError();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
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
