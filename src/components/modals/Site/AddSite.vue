<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addSite" aria-labelledby="addSite">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSite">Add Site</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row">
              <form>
                <div class="col-12 d-flex gap-3 justify-content-center">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label for="selectClients" class="form-label"
                          >Client Name</label
                        >
                      </div>
                      <div class="col-12">
                        <select
                          v-model="client_id"
                          id="selectClients"
                          @change="onClientSelect"
                        >
                          <option
                            v-for="option in clientData"
                            :key="option.id"
                            :value="option.id"
                            :id="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.client_name }}
                          </option>
                        </select>
                        <span
                          v-if="!validationSelectedClient"
                          class="text-danger"
                          >Client Required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectJobTitle"
                          >Contact Person Name</label
                        >
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="contact_person_name"
                          @input="clearError"
                          @change="detectAutofill"
                          style="padding-right: 1px"
                        />
                        <span
                          v-if="!validateSiteNameFormate"
                          class="text-danger"
                          >Contact Person Name Required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 d-flex gap-3 justify-content-center">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Contact Person Email</label>
                      </div>
                      <div class="col-12">
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
                        <span
                          v-if="
                            contact_person_email &&
                            !isEmailUnique &&
                            !autofilled
                          "
                          class="text-danger"
                          >Email already in use</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Contact Person phone</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="contact_person_number"
                          @input="cleanPhoneNumber"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="
                            contact_person_number &&
                            !validatePhoneNumberFormat(contact_person_number)
                          "
                          class="text-danger"
                          >Invalid Phone Number</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex gap-3 justify-content-center">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectBusinessUnit"
                          >Site Name</label
                        >
                      </div>

                      <div class="col-12">
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
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectJobTitle"
                          >Address</label
                        >
                      </div>
                      <div class="col-12">
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
                  </div>
                </div>
                <div class="col-12 d-flex gap-3 justify-content-center">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">email</label>
                      </div>
                      <div class="col-12">
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
                          v-if="
                            email && !validateEmailFormat(email) && !autofilled
                          "
                          class="text-danger"
                          >Invalid Email</span
                        >
                        <span
                          v-if="email && !isEmailUnique && !autofilled"
                          class="text-danger"
                          >Email already in use</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">phone number</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="phone_number"
                          @input="cleanPhoneNumber"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="
                            phone_number &&
                            !validatePhoneNumberFormat(phone_number)
                          "
                          class="text-danger"
                          >Invalid Phone Number</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex gap-3 justify-content-center">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Split Rate</label>
                      </div>
                      <div class="col-12">
                        <select id="selectOptionSplitRate" v-model="split_rate">
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Status</label>
                      </div>
                      <div class="col-12">
                        <select id="selectOptionStatus" v-model="status">
                          <option value="true">Active</option>
                          <option value="false">In-active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Portal Access</label>
                    </div>
                    <div class="col-12">
                      <select
                        id="selectOptionPortalAccess"
                        v-model="portal_access"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
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
              class="btn btn-primary text-capitalize fw-medium"
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
  name: "AddSite",
  data() {
    return {
      validationSelectedClient: true,
      validationNotesText: true,
      validateAddress: true,
      validateCandidateLName: true,
      client_id: "",
      clientData: [],
      clientSites: [],
      site_name: "",
      address: "",
      phone_number: "",
      selectedClientId: this.id,
      email: "",
      status: null,
      contact_person_name: "",
      contact_person_email: "",
      contact_person_number: "",

      split_rate: null,
      portal_access: null,
      isValidForm: false,
      selectedDate: null,
      autofilled: false,
      validateEmail: true,
      validatePhoneNumber: true,
      validateSiteName: true,
      isEmailUnique: true,
    };
  },
  props: ["id"],
  components: { SuccessAlert },
  computed: {
    isFormValid() {
      return (
        this.selectedClientId !== "" &&
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
        this.validateEmailFormat(this.email) &&
        this.validatePhoneNumberFormat(this.phone_number) &&
        this.isEmailUnique &&
        this.validateAddressFormat(this.address) &&
        this.validateEmailFormat(this.contact_person_email) !== "" &&
        this.validatePhoneNumberFormat(this.contact_person_number) !== "" &&
        this.validateSiteNameFormate(this.contact_person_name)
      );
    },

    // selectClients() {
    //   const client_id = this.clientData.find((option) => option.id === this.client_id);
    //   return this.first_name;
    // },
  },
  watch: {
    client_id: "validationSelectedClient",
    email: "validateEmailFormat",
    contact_person_email: "validateEmailFormat",
    site_name: "validateSiteNameFormate",
    contact_person_name: "validateSiteNameFormate",
    phone_number: "validatePhoneNumberFormat",
    contact_person_number: "validatePhoneNumberFormat",
    address: "validateAddressFormat",
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },

    client_id: function (newValue) {
      this.validationSelectedClient = this.ValidationClient(newValue);
    },

    email: function (newEmail) {
      this.isEmailUnique = this.checkEmailUnique(newEmail);
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    validateStatus() {
      return this.status !== null;
    },
    ValidationClient(newValue) {
      return !!newValue;
    },

    validateSplitRate() {
      return this.split_rate !== null;
    },

    validatePortalAccess() {
      return this.portal_access !== null;
    },
    async onClientSelect() {
      const selectedClientId = this.client_id;
      if (selectedClientId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/sites?client_id=${selectedClientId}`
          );
          this.clientSites = response.data.data || [];
        } catch (error) {
          // console.error("Error fetching sites data:", error);
        }
      }
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
    detectAutofill(event) {
      const inputField = event.target;
      this.autofilled = !!inputField.matches(":-webkit-autofill");
    },

    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async addSiteMethod() {
      if (this.isFormValid) {
        const payload = {
          client_id: this.client_id,
          site_name: this.site_name,
          address: this.address,
          email: this.email,
          phone_number: this.phone_number,
          status: this.status,
          split_rate: this.split_rate,
          portal_access: this.portal_access,
          contact_person_name: this.contact_person_name,
          contact_person_email: this.contact_person_email,
          contact_person_number: this.contact_person_number,
        };

        try {
          const response = await axios.post(`${VITE_API_URL}/sites`, payload);
          if (response.status === 200) {
            this.$refs.successAlert.showSuccess("Site added successfully!");
            this.$emit("addSite");
            this.clearFields();
          } else {
            // alert("Error adding Shift");
            this.clearFields();
            setTimeout(() => {
              this.clearError();
            }, 100);
          }
        } catch (error) {
          // console.error("Error adding site:", error);
        }
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
    validatePhoneNumberFormat(phone_number) {
      const phoneRegexWithZero = /^0\d{10}$/;
      const phoneRegexWithCountryCode = /^91\d{10}$/;
      const phoneRegexWithoutPrefix = /^\d{11}$/;

      return (
        phoneRegexWithZero.test(phone_number) ||
        phoneRegexWithCountryCode.test(phone_number) ||
        phoneRegexWithoutPrefix.test(phone_number)
      );
    },
    validateAddressFormat(address) {
      const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
      return addressRegex.test(address);
    },
    validateSiteNameFormate(site_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(site_name);
    },
    checkEmailUnique(email) {
      if (this.clientSites.length > 0) {
        return !this.clientSites.some((site) => site.email === email);
      }
      return true;
    },
    clearError() {
      this.validationSelectedClient = true;

      this.validateAddress = true;
      this.validateCandidateLName = true;
      this.autofilled = false;
      this.isEmailUnique = true;
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
      this.contact_person_name = "";
      this.contact_person_email = "";
      this.contact_person_number = "";
    },
  },
  // async beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.getClientMethod();
  //   });
  // },
  // async beforeRouteUpdate(to, from, next) {
  //   this.getClientMethod();

  //   next();
  // },
  async mounted() {
    if (this.id) {
      this.client_id = this.id;
    }
    await this.getClientMethod();
    // this.getClientData();
    this.isValidForm = this.isFormValid;
    this.clearError();
  },
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
.modal-body {
  border-radius: 5px;
}

select {
  width: 100%;
  padding: 7px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
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
