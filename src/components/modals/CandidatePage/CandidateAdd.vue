<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addCandidate"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCandidate">Add Candidate</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">name</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="first_name"
                      @input="clearError"
                      @change="detectAutofill"
                    />
                    <span v-if="!validateCandidateName" class="text-danger"
                      >Candidate Name Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label" for="selectOption">position</label>
                  </div>
                  <div class="col-8">
                    <select v-model="job_id" id="selectOption" @change="clearError">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        @change="detectAutofill"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedOptionText" class="text-danger"
                      >Position Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">email</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      @input="clearError"
                      @change="detectAutofill"
                    />
                    <span v-if="!validateEmail" class="text-danger">Required Email </span>
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">password</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                      @input="validatePasswordMatch"
                      @change="detectAutofill"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">confirm password</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="password"
                      class="form-control"
                      v-model="confirm_password"
                      @input="validatePasswordMatch"
                      @change="detectAutofill"
                    />
                    <span v-if="!passwordsMatch" class="text-danger"
                      >Passwords do not Match</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">phone number</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="phone_number"
                      @input="cleanPhoneNumber"
                      @change="detectAutofill"
                      pattern="[0-9]*"
                    />
                    <span v-if="!validatePhoneNumber" class="text-danger"
                      >Required Phone Number</span
                    >
                    <span
                      v-if="phone_number && !validatePhoneNumberFormat(phone_number)"
                      class="text-danger"
                      >Invalid Phone Number</span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addCandidate"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              :disabled="!isValidForm"
              :class="{ disabled: !isValidForm }"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              :data-bs-dismiss="isValidForm ? 'modal' : null"
              v-on:click="addCandidate()"
            >
              Add
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
      validateEmail: true,
      isPasswordRequired: true,
      validateCandidateName: true,
      validatePhoneNumber: true,
      passwordsMatch: true,
      selectedOption: null,
      validationSelectedOptionText: true,
      first_name: "",
      last_name: "",
      password: "",
      job_id: "",
      options: [],
      confirm_password: "",
      address: "",

      phone_number: "",
      email: "",
      activated: "",
      employment_type_id: "",
      isValidForm: false,
      error: [],
      autofilled: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateCandidateName &&
        this.validationSelectedOptionText
      );
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
  },
  watch: {
    // Watch for changes in input fields and trigger validations

    email: "validateEmailFormat",
    first_name: "validateNameFormat",
    password: "validatePasswordMatch",
    confirm_password: "validatePasswordMatch",
    phone_number: "validatePhoneNumberFormat",

    // Update overall form validity when any watched property changes
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },
  },
  methods: {
    cleanPhoneNumber() {
      this.phone_number = this.phone_number.replace(/\D/g, "");
    },
    detectAutofill() {
      this.autofilled = true;
    },
    async addCandidate() {
      this.validateSelectedOption();
      // this.validationSelectedOptionText = this.validationSelectedFormat(this.job_id);
      this.validateCandidateName = this.validateNameFormat(this.first_name);
      // Validate email
      this.validateEmail = this.validateEmailFormat(this.email);

      // Validate password matching
      this.passwordsMatch = this.password === this.confirm_password;

      // Validate phone number
      this.validatePhoneNumber = this.validatePhoneNumberFormat(this.phone_number);

      // Check if all validations pass
      if (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateCandidateName &&
        this.validationSelectedOptionText
      ) {
        if (this.isPasswordRequired && !this.password) {
          return;
        }
        // If validations pass, proceed with the API call
        const data = {
          first_name: this.first_name,
          job_id: 1,
          password: this.password,
          confirm_password: this.confirm_password,
          phone_number: this.phone_number,
          email: this.email,
          activated: this.activated,
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

          if (response.ok) {
            this.$emit("addCandidate");

            this.first_name = "";
            this.job_id = "";
            this.password = "";
            this.confirm_password = "";
            this.phone_number = "";
            this.email = "";
            this.activated = "";
          } else {
          }
        } catch (error) {}
      } else {
        this.isPasswordRequired = !this.password;
      }
    },
    validatePasswordMatch() {
      if (this.password && this.confirm_password) {
        this.passwordsMatch = this.password === this.confirm_password;
      } else {
        this.passwordsMatch = false;
      }
    },
    validateEmailFormat(email) {
      const emailRegex = /^[^\s@]+@gmail\.com$/;
      return emailRegex.test(email);
    },
    validateNameFormat(first_name) {
      const nameRegex = /[A-Za-z]/;
      return nameRegex.test(first_name);
    },
    validateSelectedOption() {
      this.validationSelectedOptionText = !!this.job_id;
    },
    validatePhoneNumberFormat(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    clearError() {
      if (this.autofilled) {
        this.autofilled = false;
      } else {
        this.validateEmail = true;
        this.validatePhoneNumber = true;
        this.passwordsMatch = true;
        this.validateCandidateName = true;
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
  },

  mounted() {
    this.getPositionMethod();
    this.isValidForm = this.isFormValid;
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
.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
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
  font-family: Verdana, sans-serif;
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
