<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addClients"
      aria-labelledby="addClients"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addClients">Add Client</h5>
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
                    <label class="form-label">client name</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="first_name"
                      @input="clearError"
                    />
                    <span v-if="!validateClientName" class="text-danger"
                      >Client Name Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label" for="selectOption">address</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="address"
                      @input="clearError"
                    />
                    <span v-if="!validateAddress" class="text-danger"
                      >Address Required</span
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="col-4">
                      <label class="form-label">email</label>
                    </div>
                    <div class="col-8">
                      <input
                        type="email"
                        class="form-control"
                        v-model="email"
                        @input="clearError"
                      />
                      <span v-if="!validateEmail" class="text-danger"
                        >Invalid Email format</span
                      >
                    </div>
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
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">Confirm-Password</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="password"
                      class="form-control"
                      v-model="confirm_password"
                      @input="clearError"
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
                      type="number"
                      class="form-control"
                      v-model="phone_number"
                      @input="clearError"
                    />
                    <span v-if="!validatePhoneNumber" class="text-danger"
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
              data-bs-target="#addClients"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              :disabled="!isValidForm"
              :class="{ disabled: !isValidForm }"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-on:click="addClients()"
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
      validateAddress: true,
      validateClientName: true,
      validateEmail: true,
      validatePhoneNumber: true,
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
    };
  },
  computed: {
    isFormValid() {
      return (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateClientName &&
        this.validateAddress
      );
    },
  },
  watch: {
    // Watch for changes in input fields and trigger validations
    address: "validateAddressFormat",
    first_name: "validateNameFormat",
    email: "validateEmailFormat",
    password: "validatePasswordMatch",
    confirm_password: "validatePasswordMatch",
    phone_number: "validatePhoneNumberFormat",

    // Update overall form validity when any watched property changes
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },
  },
  methods: {
    async addClients() {
      this.validateAddress = this.validateAddressFormat(this.address);
      this.validateClientName = this.validateNameFormat(this.first_name);
      // Validate email
      this.validateEmail = this.validateEmailFormat(this.email);

      // Validate password matching
      this.passwordsMatch = this.password === this.confirm_password;

      // Validate phone number
      this.validatePhoneNumber = this.validatePhoneNumberFormat(
        this.phone_number
      );

      // Check if all validations pass
      if (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateClientName
      ) {
        const data = {
          first_name: this.first_name,
          ref_code: this.ref_code,
          address: this.address,
          phone_number: this.phone_number,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        };
        try {
          const response = await fetch("https://logezy.onrender.com/clients", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (data) {
            location.reload();
          }
        } catch (error) {}
      }
    },
    validateEmailFormat(email) {
      // Implement your email validation logic here
      // For example, you can use a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateNameFormat(first_name) {
      const nameRegex = /[a-zA-Z]+\\.?/;
      return nameRegex.test(first_name);
    },
    validateAddressFormat(address) {
      const addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
      return addressRegex.test(address);
    },
    validatePhoneNumberFormat(phoneNumber) {
      // Implement your phone number validation logic here
      // For example, you can check the length or use a regular expression
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    clearError() {
      // Clear the error message when the user starts typing
      this.validateEmail = true;
      this.validatePhoneNumber = true;
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
