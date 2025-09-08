<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addClients" aria-labelledby="addClients">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClients">Add Client</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3 mt-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="col-12 d-flex gap-2">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Client Name</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="client_name"
                          @input="clearError"
                          @change="detectAutofill"
                        />
                        <span v-if="!validateClientName" class="text-danger"
                          >Client Name Required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <div class="mb-3">
                        <div class="">
                          <div class="col-12">
                            <label class="form-label">email</label>
                          </div>
                          <div class="col-12">
                            <input
                              type="email"
                              class="form-control"
                              v-model="email"
                              @input="validateEmailFormat(email)"
                              @change="checkEmailUniqueness"
                              ref="email"
                              autocomplete="new-email"
                              width="100"
                            />
                            <span
                              v-if="email && !validateEmailFormat(email)"
                              class="text-danger"
                              >Invalid Email format</span
                            >
                            <span v-if="emailInUse" class="text-danger">
                              This email is already in use.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label" for="selectOption">Jobs</label>
                    </div>

                    <!-- Stack checkboxes vertically -->
                    <div class="row">
                      <div
                        class="col-md-4"
                        v-for="option in options"
                        :key="option.id"
                      >
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="option.id"
                            v-model="job_ids"
                            @change="toggleJobsSelection"
                            :id="`job-${option.id}`"
                          />
                          <label
                            class="form-check-label text-capitalize"
                            :for="`job-${option.id}`"
                          >
                            {{ option.name }}
                          </label>
                        </div>
                      </div>
                    </div>

                    <!-- Error message below the checkboxes -->
                    <div v-if="getError('job_id')" class="text-danger mt-2">
                      {{ getError("job_id") }}
                    </div>
                  </div>
                </div>

                <div class="col-12 d-flex gap-2">
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
                        <!-- <span v-if="!validatePhoneNumber" class="text-danger"
                        >Invalid Phone Number</span
                      > -->
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
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Password</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="password"
                          class="form-control"
                          v-model="password"
                          @input="validatePasswordCriteria"
                          @change="detectAutofill"
                          ref="password"
                          autocomplete="new-password"
                        />
                        <span
                          v-if="password && !isPasswordValid"
                          class="text-danger"
                        >
                          Password must be at least 8 characters long and
                          include uppercase, lowercase, numeric, and special
                          characters.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex gap-2">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Confirm Password</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="password"
                          class="form-control"
                          v-model="confirm_password"
                          @input="validatePasswordMatch"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="confirm_password && !passwordsMatch"
                          class="text-danger"
                        >
                          Passwords do No match.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectOption"
                          >address</label
                        >
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="address"
                          @input="clearError"
                          @change="detectAutofill"
                        />
                        <span v-if="!validateAddress" class="text-danger"
                          >Address Required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addClients"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormFilledAndValid || !isJobsSelected || emailInUse"
              :class="{ disabled: !isFormFilledAndValid || !isJobsSelected }"
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addClients()"
            >
              Add Client
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
  name: "AddClients",
  data() {
    return {
      validateAddress: true,
      validateClientName: true,
      isPasswordValid: true,
      validateEmail: true,
      validatePhoneNumber: true,
      // validatePassword: null,
      showPasswordRequiredMessage: false,
      passwordsMatch: true,
      isJobsSelected: false,
      client_name: "",
      ref_code: "",
      address: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      isValidForm: false,
      error: [],
      job_ids: [],
      // jobOptions: [],
      errors: {},
      autofilled: false,
      emailInUse: false,
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isFormValid() {
      return (
        this.validateEmail &&
        this.passwordsMatch &&
        // this.validatePassword &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      );
    },
    isFormFilledAndValid() {
      return (
        this.client_name &&
        this.address &&
        this.email &&
        this.job_ids &&
        this.password &&
        this.confirm_password &&
        this.phone_number &&
        this.validateEmail &&
        this.passwordsMatch &&
        // this.validatePassword &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      );
    },
  },
  watch: {
    address: "validateAddressFormat",
    client_name: "validateNameFormat",
    email: "validateEmailFormat",
    password: "validatePasswordMatch",
    confirm_password: "validatePasswordMatch",
    phone_number: "validatePhoneNumberFormat",

    isFormValid: function (newVal) {
      this.isValidForm = newVal;
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
    async checkEmailUniqueness() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`, {
          params: {
            email: this.email,
          },
        });

        this.emailInUse = response.data.data.some(
          (client) => client.email === this.email
        );
      } catch (error) {
        // console.error("Error checking email uniqueness:", error);
      }
    },
    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    clearError(fieldName) {
      this.errors[fieldName] = null;
    },
    getError(fieldName) {
      return this.errors[fieldName];
    },
    clearFields() {
      this.client_name = "";
      this.address = "";
      this.job_ids = [];
      this.phone_number = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
    },
    validatePasswordCriteria() {
      const sanitizedPassword = this.password.replace(/\s+/g, "");

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      this.isPasswordValid = passwordRegex.test(sanitizedPassword);

      this.password = sanitizedPassword;
      this.validatePasswordMatch();
    },
    validatePasswordMatch() {
      this.passwordsMatch = this.password === this.confirm_password;
    },
    cleanPhoneNumber() {
      this.phone_number = this.phone_number.replace(/\D/g, "");
    },
    detectAutofill() {
      let emailAutofilled = false;
      let passwordAutofilled = false;

      if (this.email && this.email === this.$refs.email.value) {
        emailAutofilled = true;
      }

      if (this.password && this.password === this.$refs.password.value) {
        passwordAutofilled = true;
      }

      this.autofilled = emailAutofilled && passwordAutofilled;
    },
    cleanPhoneNumber() {
      this.phone_number = this.phone_number.replace(/\D/g, "");
      this.clearError();
    },
    toggleJobsSelection() {
      this.isJobsSelected = this.job_ids.length > 0;
      this.clearError();
    },
    async addClients() {
      this.validateAddress = this.validateAddressFormat(this.address);
      this.validateClientName = this.validateNameFormat(this.client_name);

      this.validateEmail = this.validateEmailFormat(this.email);

      this.validatePassword = !!this.password.trim();
      this.passwordsMatch = this.password === this.confirm_password;
      this.validatePhoneNumber = this.validatePhoneNumberFormat(
        this.phone_number
      );

      if (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      ) {
        const data = {
          client_name: this.client_name,
          job_ids: this.job_ids,
          address: this.address,
          phone_number: this.phone_number,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        };
        try {
          const response = await fetch(`${VITE_API_URL}/clients`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            // location.reload();
            this.$emit("client-updated");
            this.client_name = "";
            this.job_ids = [];
            this.address = "";
            this.phone_number = "";
            this.email = "";
            this.password = "";
            this.confirm_password = "";
            // alert("Successful Client added");
            const message = "Successful Client added";
            this.$refs.successAlert.showSuccess(message);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error adding Client. Please try again.",
              confirmButtonText: "OK",
            });
            this.resetForm();
            this.clearError();
          }
        } catch (error) {
          this.resetForm();
          this.clearError();
        }
      }
    },
    validateEmailFormat(email) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailRegex.test(email);
    },
    validateNameFormat(client_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(client_name);
    },
    validateAddressFormat(address) {
      const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
      return addressRegex.test(address);
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
    clearError() {
      this.validateEmail = true;
      this.validatePhoneNumber = true;
      this.validatePassword = true;
      this.passwordsMatch = true;
      this.validateClientName = true;
      this.validateAddress = true;
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.jobOptions = response.data.data.map((job) => {
          return { id: job.id, name: job.name };
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPositionMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.$jobOptions.methods.getPositionMethod.call(this);
    next();
  },
  mounted() {
    // this.validatePassword = this.validatePassword.bind(this);
    this.isValidForm = this.isFormValid;
    // this.getPositionMethod();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}
label.form-label {
  text-transform: capitalize;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.btn-primary {
  background-color: #f9944b !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
}

.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.custom-close {
  background-color: #f9944b !important;
  border-radius: 50% !important;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0px;
}
.custom-close::before {
  content: "×";
  color: white;
  font-size: 27px;
  line-height: -2px;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
