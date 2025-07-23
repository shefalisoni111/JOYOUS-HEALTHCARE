<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addCandidate" aria-labelledby="candidatePage">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCandidate">Add Staff</h5>
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
                <div class="col-12 d-flex justify-content-center gap-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">First Name</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="first_name"
                          @input="clearError"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="!validateCandidateName && !autofilled"
                          class="text-danger"
                          >Staff First Name Required</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Last Name</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text"
                          class="form-control"
                          v-model="last_name"
                          @input="clearError"
                          @change="detectAutofill"
                        />
                        <span
                          v-if="!validateCandidateLName && !autofilled"
                          class="text-danger"
                          >Staff Last Name Required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-center gap-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">position</label>
                      </div>
                      <div class="col-12">
                        <select v-model="job_id" @change="clearError">
                          <option
                            v-for="option in options"
                            :key="option.id"
                            :value="option.id"
                          >
                            {{ option.name }}
                          </option>
                        </select>
                        <span
                          v-if="!validationSelectedOptionText && !autofilled"
                          class="text-danger"
                          >Position Required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectOptionEmployee"
                          >Job Type</label
                        >
                      </div>

                      <div class="col-12">
                        <select
                          v-model="employ_type"
                          id="selectOptionEmployee"
                          @change="clearError"
                        >
                          <option value="Self_employed">Self Employed</option>
                          <option value="Private_limited">
                            Private limited
                          </option>
                          <option value="umbrella">Umbrella</option>
                          <option value="paye">Paye</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-center gap-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectEmployeeType"
                          >Employment Type</label
                        >
                      </div>
                      <div class="col-12 mt-1">
                        <select
                          v-model="employment_type_id"
                          id="selectEmployeeType"
                          @change="clearError"
                        >
                          <option
                            v-for="option in employeeData"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.title }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
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
                          @input="validateEmailFormat(email)"
                          ref="email"
                          @change="checkEmailUniqueness"
                          autocomplete="new-email"
                        />
                        <span
                          v-if="
                            email && !validateEmailFormat(email) && !autofilled
                          "
                          class="text-danger"
                          >Invalid Email</span
                        >
                        <span v-if="emailInUse" class="text-danger">
                          Email is already in use.
                        </span>
                        <span
                          v-if="emailError && !emailInUse"
                          class="text-danger"
                        >
                          {{ emailError }}
                        </span>
                        <!-- <span v-if="emailInUse" class="text-danger">
                      {{  "This email is already in use." }}
                    </span> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-center gap-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">password</label>
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
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">confirm password</label>
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
                </div>
                <div class="col-12">
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
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addCandidate"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isValidForm || isFieldEmpty() || emailInUse"
              :class="{
                'btn btn-primary text-capitalize fw-medium': true,
                disabled: !isValidForm || isFieldEmpty(),
              }"
              v-on:click="addCandidate"
              v-bind:data-bs-dismiss="
                !isFieldEmpty() && isValidForm ? 'modal' : null
              "
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
    <NotSuccessAlertVue ref="dangerAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

import NotSuccessAlertVue from "../../Alerts/NotSuccessAlert.vue";
import Swal from "sweetalert2";

export default {
  name: "CandidateAdd",
  data() {
    return {
      validateEmail: true,
      isPasswordValid: true,
      validateCandidateName: true,
      validateCandidateLName: true,
      validatePhoneNumber: true,
      validateEmployee: true,
      validateEmployeeType: true,
      showPasswordRequiredMessage: false,
      passwordsMatch: true,
      selectedOption: null,
      validationSelectedOptionText: true,
      showPhoneNumberValidation: false,
      first_name: "",
      last_name: "",
      password: "",
      employ_type: "",
      job_id: [],
      options: [],
      employeeData: [],
      confirm_password: "",
      employment_type_id: "",
      address: "",
      phone_number: "",
      email: "",
      activated: "",
      employment_type_id: "",
      isValidForm: false,
      error: [],
      autofilled: false,
      emailInUse: false,
      emailError: "",
    };
  },
  components: { SuccessAlert, NotSuccessAlertVue },
  computed: {
    isFormValid() {
      return (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateCandidateName &&
        this.validateCandidateLName &&
        this.validationSelectedOptionText &&
        this.validateEmployeeType &&
        this.validateEmployee
      );
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectEmployeeType() {
      const employment_type = this.employeeData.find(
        (option) => option.id === this.employment_type
      );
      return employment_type ? employment_type.title : "";
    },
  },
  watch: {
    email: "validateEmailFormat",
    first_name: "validateNameFormat",
    last_name: "validateLNameFormat",
    password: "validatePasswordMatch",
    confirm_password: "validatePasswordMatch",
    phone_number: "validatePhoneNumberFormat",
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
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
    clearFieldsData() {
      setTimeout(() => {
        this.resetForm();
      }, 10);
      this.blurActiveElement();
    },
    isFieldEmpty() {
      return (
        !this.first_name.trim() ||
        !this.last_name.trim() ||
        !this.email.trim() ||
        !this.phone_number.trim() ||
        !this.password.trim() ||
        !this.confirm_password.trim() ||
        !this.job_id ||
        !this.employ_type ||
        !this.employment_type_id
      );
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
    // async checkEmailUniqueness() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/candidates`, {
    //       params: {
    //         email: this.email,
    //       },
    //     });

    //     this.emailInUse = response.data.data.some((staff) => staff.email === this.email);
    //   } catch (error) {
    //     console.error("Error checking email uniqueness:", error);
    //   }
    // },
    async checkEmailUniqueness() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params: {
            email: this.email,
          },
        });

        if (response.data.error && response.data.error.email) {
          this.emailError = response.data.error.email[0];
        } else {
          this.emailInUse = response.data.data.some(
            (staff) => staff.email === this.email
          );

          if (!this.emailInUse) {
            this.emailError = "";
          }
        }
      } catch (error) {
        // console.error("Error checking email uniqueness:", error);

        this.emailError = "An error occurred while checking email uniqueness.";
      }
    },
    async addCandidate() {
      this.validateSelectedOption();
      this.validateCandidateName = this.validateNameFormat(this.first_name);
      this.validateCandidateLName = this.validateLNameFormat(this.last_name);
      this.validateEmail = this.validateEmailFormat(this.email);
      this.validatePhoneNumber = this.validatePhoneNumberFormat(
        this.phone_number
      );
      this.validatePassword = !!this.password.trim();
      this.passwordsMatch = this.password === this.confirm_password;

      this.validatePasswordMatch();
      if (this.isFormValid) {
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          job_id: this.job_id,
          password: this.password,
          confirm_password: this.confirm_password,
          phone_number: this.phone_number,
          email: this.email,
          activated: this.activated,
          employ_type: this.employ_type,
          employment_type_id: this.employment_type_id,
        };

        try {
          const response = await fetch(`${VITE_API_URL}/candidates`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();

          if (response.status === 200) {
            if (responseData.error && responseData.error.email) {
              this.emailError = responseData.error.email[0];
              // const message = "Unsuccessful Staff added";
              this.$refs.dangerAlert(this.emailError);
              this.emailInUse = true;
              Swal("Error", this.emailError, "error");
            } else {
              this.emailError = "";
              this.emailInUse = false;
              this.$emit("addCandidate");
              this.resetForm();
              const message = "Successful Staff added";
              this.$refs.successAlert.showSuccess(message);
            }
          } else {
            // this.emailError = "Error adding Staff";
            // this.emailInUse = false;
            if (responseData.error && responseData.error.candidate_devices) {
              Swal("Error", responseData.error.candidate_devices[0], "error");
            } else {
              Swal("Error", "Failed to add staff. Please try again.", "error");
            }
          }
        } catch (error) {
          // alert("Error adding Staff");
          this.resetForm();
        }
      } else {
        this.isPasswordRequired = !this.password;
      }
    },
    validatePasswordMatch() {
      this.passwordsMatch = this.password === this.confirm_password;
    },
    validateEmailFormat(email) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|co\.uk|org|edu|care|net|jp)$/;
      return emailRegex.test(email);
    },

    validateNameFormat(first_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(first_name);
    },
    validateLNameFormat(last_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(last_name);
    },
    validateSelectedOption() {
      this.validationSelectedOptionText = !!this.job_id;
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
      if (this.autofilled) {
        this.autofilled = false;
      } else {
        this.validateEmail = true;
        this.validatePhoneNumber = true;
        this.passwordsMatch = true;
        this.validateCandidateName = true;
        this.validateCandidateLName = true;
        this.validationSelectedOptionText = true;
        this.isPasswordRequired = true;
      }
    },
    async getPositionMethod() {
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
    async getEmployeeTypeData() {
      try {
        const response = await axios.get(`${VITE_API_URL}/employment_types`);
        this.employeeData = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    resetForm() {
      this.first_name = "";
      this.last_name = "";
      this.job_id = "";
      this.password = "";
      this.confirm_password = "";
      this.phone_number = "";
      this.email = "";
      this.activated = "";
      this.employ_type = "";
      this.employment_type_id = "";
      this.isValidForm = true;
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPositionMethod();
      vm.getEmployeeTypeData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getPositionMethod();
    this.getEmployeeTypeData();
    next();
  },
  async mounted() {
    await this.getPositionMethod();
    await this.getEmployeeTypeData();
    this.isValidForm = this.isFormValid;
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}
.modal {
  --bs-modal-width: 881px;
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

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
