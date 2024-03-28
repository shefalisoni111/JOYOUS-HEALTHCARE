<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addClients" aria-labelledby="addClients" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClients">Add Client</h5>
          </div>
          <div class="modal-body mx-3" style="background: #dbdbdb">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Client Name</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="first_name"
                      @input="clearError"
                      @change="detectAutofill"
                    />
                    <span v-if="!validateClientName" class="text-danger"
                      >Client Name Required</span
                    >
                  </div>
                </div>

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
                        @change="detectAutofill"
                        ref="email"
                        autocomplete="new-email"
                      />
                      <span
                        v-if="email && !validateEmailFormat(email)"
                        class="text-danger"
                        >Invalid Email format</span
                      >
                    </div>
                  </div>
                </div>
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
                    <span v-if="!validatePhoneNumber" class="text-danger"
                      >Invalid Phone Number</span
                    >
                    <span
                      v-if="phone_number && !validatePhoneNumberFormat(phone_number)"
                      class="text-danger"
                      >Invalid Phone Number</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">password</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                      @input="validatePassword"
                      @change="detectAutofill"
                      @blur="validatePassword"
                      ref="password"
                      autocomplete="new-password"
                    />
                    <span v-if="showPasswordRequiredMessage" class="text-danger">
                      Password is required
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Confirm-Password</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="password"
                      class="form-control"
                      v-model="confirm_password"
                      @input="validateConfirmPassword"
                    />
                    <span v-if="!passwordsMatch" class="text-danger"
                      >Passwords do not Match</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label" for="selectOption">address</label>
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
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addClients"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormFilledAndValid"
              :class="{ disabled: !isFormFilledAndValid }"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
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

export default {
  name: "CandidateAdd",
  data() {
    return {
      validateAddress: true,
      validateClientName: true,
      isPasswordValid: true,
      validateEmail: true,
      validatePhoneNumber: true,
      validatePassword: null,
      showPasswordRequiredMessage: false,
      passwordsMatch: true,
      first_name: "",
      ref_code: "",
      address: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
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
        this.validatePassword &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      );
    },
    isFormFilledAndValid() {
      return (
        this.first_name &&
        this.address &&
        this.email &&
        this.password &&
        this.confirm_password &&
        this.phone_number &&
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePassword &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      );
    },
  },
  watch: {
    address: "validateAddressFormat",
    first_name: "validateNameFormat",
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
    // validatePassword() {
    //   this.showPasswordRequiredMessage = this.password === "";
    // },
    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },
    clearFields() {
      this.first_name = "";
      this.address = "";
      this.phone_number = "";
      this.email = "";
      this.password = "";
      this.confirm_password = "";
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

    async addClients() {
      this.validateAddress = this.validateAddressFormat(this.address);
      this.validateClientName = this.validateNameFormat(this.first_name);

      this.validateEmail = this.validateEmailFormat(this.email);

      this.validatePassword = !!this.password.trim();
      this.passwordsMatch = this.password === this.confirm_password;
      this.validatePhoneNumber = this.validatePhoneNumberFormat(this.phone_number);

      if (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      ) {
        const data = {
          first_name: this.first_name,

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
            this.first_name = "";

            this.address = "";
            this.phone_number = "";
            this.email = "";
            this.password = "";
            this.confirm_password = "";
            // alert("Successful Client added");
            const message = "Successful Client added";
            this.$refs.successAlert.showSuccess(message);
          } else {
            alert("Error adding Client");
          }
        } catch (error) {}
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
    validateAddressFormat(address) {
      const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
      return addressRegex.test(address);
    },
    validatePhoneNumberFormat(phoneNumber) {
      if (phoneNumber.trim() === "") {
        return false;
      }
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    clearError() {
      this.validateEmail = true;
      this.validatePhoneNumber = true;
      this.validatePassword = true;
      this.passwordsMatch = true;
      this.validateClientName = true;
      this.validateAddress = true;
    },
  },

  mounted() {
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
  background-color: #ff5f30 !important;
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
