<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="AddPrivileges" aria-labelledby="AddPrivilegess">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddPrivileges">Add Privileges</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
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
                  <div class="col-6">
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
                <div class="row">
                  <div class="col-6">
                    <div class="col-12">
                      <label class="form-label">Roles</label>
                    </div>
                    <div class="col-12">
                      <select v-model="user_role_id" @change="clearError">
                        <option
                          v-for="option in roles"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.name.split("_").join(" ") }}
                        </option>
                      </select>
                      <span
                        v-if="!validationForSelectedRoles && !autofilled"
                        class="text-danger"
                        >Role Required</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
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
                        autocomplete="off"
                        name="email"
                      />
                      <span
                        v-if="
                          email && !validateEmailFormat(email) && !autofilled
                        "
                        class="text-danger"
                        >Invalid Email</span
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
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
                        @input="validateAddress"
                        @change="detectAutofill"
                      />
                      <span v-if="!isAddressValid" class="text-danger"
                        >Address Required</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="col-12">
                      <label class="form-label">password</label>
                    </div>
                    <div class="col-12">
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        @input="validatePassword(password)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="col-12">
                      <label class="form-label">confirm password</label>
                    </div>
                    <div class="col-12">
                      <input
                        type="password"
                        class="form-control"
                        v-model="confirm_password"
                        @input="validatePasswordMatch"
                      />
                      <span v-if="!passwordsMatch" class="text-danger"
                        >Passwords do No Match</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
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
                      <!-- <span v-if="showPhoneNumberValidation" class="text-danger"
                        >Required Phone Number</span
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

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">post code</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      v-model="postcode"
                      @input="validatePostcode"
                      @change="detectAutofill"
                    />
                    <span v-if="!postcodeValid" class="text-danger"
                      >Postcode is required</span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#AddPrivileges"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isValidForm || isFieldEmpty()"
              :class="{
                'btn btn-primary rounded-4 text-capitalize fw-medium': true,
                disabled: !isValidForm || isFieldEmpty(),
              }"
              v-on:click="AddPrivileges"
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
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Swal from "sweetalert2";
export default {
  name: "CandidateAdd",
  data() {
    return {
      validateEmail: true,
      isPasswordRequired: true,
      validateCandidateName: true,
      validateCandidateLName: true,
      validatePhoneNumber: true,
      postcodeValid: true,
      passwordsMatch: true,
      selectedOption: null,
      isAddressValid: true,
      address: "",
      validationForSelectedRoles: true,
      showPhoneNumberValidation: false,
      first_name: "",
      last_name: "",
      password: "",
      user_role_id: [],
      roles: [],
      confirm_password: "",
      address: "",
      phone_number: "",
      email: "",
      activated: "",
      employment_type_id: "",
      isValidForm: false,
      postcode: "",
      error: [],
      autofilled: false,
    };
  },
  components: { SuccessAlert },
  computed: {
    isFormValid() {
      return (
        this.validateEmail &&
        this.passwordsMatch &&
        this.validatePhoneNumber &&
        this.validateCandidateName &&
        this.validateCandidateLName &&
        this.validationForSelectedRoles &&
        this.validateAddress
      );
    },
    selectedOptionText() {
      const user_role_id = this.roles.find(
        (option) => option.id === this.user_role_id
      );
      return user_role_id ? user_role_id.name : "";
    },
  },
  watch: {
    email: "validateEmailFormat",
    first_name: "validateNameFormat",
    last_name: "validateLNameFormat",
    password: "validatePassword",
    confirm_password: "validatePasswordMatch",
    phone_number: "validatePhoneNumberFormat",
    address(newValue) {
      this.validateAddress(newValue);
    },
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
    },
    isFieldEmpty() {
      return (
        !this.first_name.trim() ||
        !this.last_name.trim() ||
        !this.email.trim() ||
        !this.phone_number.trim() ||
        !this.password.trim() ||
        !this.confirm_password.trim() ||
        !this.user_role_id ||
        !this.postcode ||
        !this.address
      );
    },
    cleanPhoneNumber() {
      this.phone_number = this.phone_number.replace(/\D/g, "");
    },
    validatePostcode() {
      this.postcodeValid = !!this.postcode.trim();
    },
    validateAddress() {
      this.isAddressValid = !!this.address.trim();
    },
    detectAutofill() {
      const isPhoneNumberFilled = this.phone_number.trim() !== "";
      const isPositionSelected = !!this.user_role_id;
      const isPhoneNumberFocused =
        document.activeElement === this.$refs.phone_number;

      if (!isPositionSelected) {
        this.showPhoneNumberValidation =
          !isPhoneNumberFocused && !isPhoneNumberFilled;
      } else {
        this.showPhoneNumberValidation = false;
      }
    },
    async AddPrivileges() {
      this.validateSelectedOption();
      this.validateCandidateName = this.validateNameFormat(this.first_name);
      this.validateCandidateLName = this.validateLNameFormat(this.last_name);
      this.validateEmail = this.validateEmailFormat(this.email);
      this.validatePhoneNumber = this.validatePhoneNumberFormat(
        this.phone_number
      );

      this.validatePasswordMatch();
      if (this.isFormValid) {
        if (this.isPasswordRequired && !this.password) {
          return;
        }

        if (!this.passwordsMatch) {
          return;
        }

        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          user_role_id: this.user_role_id,
          password: this.password,
          confirm_password: this.confirm_password,
          phone_number: this.phone_number,
          email: this.email,
          address: this.address,
          activated: this.activated,
          postcode: this.postcode,
        };

        try {
          const response = await fetch(`${VITE_API_URL}/merchants`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            this.$emit("AddPrivileges");
            this.resetForm();
            // alert("Successful Staff added");
            const message = "Successful added";
            this.$refs.successAlert.showSuccess(message);
          } else {
            // alert("Error adding Staff");
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error adding Staff",
              confirmButtonText: "OK",
            });
            this.resetForm();
          }
        } catch (error) {
          // alert("Error adding Staff");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error adding Staff",
            confirmButtonText: "OK",
          });
          this.resetForm();
        }
      } else {
        this.isPasswordRequired = !this.password;
      }
    },
    validatePassword(password) {
      const nameRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return nameRegex.test(password);
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
      this.validationForSelectedRoles = !!this.user_role_id;
    },
    validatePhoneNumberFormat(phoneNumber) {
      const phoneRegex = /^\d{11}$/;
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
        this.validateCandidateLName = true;
        this.validationForSelectedRoles = true;
        this.isPasswordRequired = true;
        this.validateEmail = true;
        this.postcodeValid = true;
      }
    },
    async getRolesMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/user_roles`);
        this.roles = response.data.data;
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
      this.user_role_id = "";
      this.password = "";
      this.confirm_password = "";
      this.phone_number = "";
      this.email = "";
      this.address = "";
      this.activated = "";
      this.isValidForm = true;
      this.postcode = "";
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getRolesMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getRolesMethod();
    next();
  },
  mounted() {
    // this.getRolesMethod();
    this.isValidForm = this.isFormValid;
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

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
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
