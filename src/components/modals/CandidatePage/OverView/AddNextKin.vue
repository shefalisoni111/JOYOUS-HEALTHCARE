<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addNextToKin" aria-labelledby="addNextKin">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="addNextToKin">
              Add Next to Kin
            </h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Name</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          @focus="touched.name = true"
                          @blur="touched.name = true"
                          required
                        />
                        <span v-if="touched.name && !name" class="text-danger"
                          >Name is required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Phone Number</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="phone_number"
                          @input="cleanAndValidatePhoneNumber"
                          @focus="touched.phone_number = true"
                          @blur="touched.phone_number = true"
                          pattern="[0-11]*"
                        />
                        <!-- <span
                          v-if="
                            touched.phone_number &&
                            !cleanAndValidatePhoneNumber()
                          "
                          class="text-danger"
                          >Required Phone Number</span
                        > -->
                        <span
                          v-if="
                            touched.phone_number &&
                            cleanAndValidatePhoneNumber() === false
                          "
                          class="text-danger"
                          >Invalid Phone Number</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Relation</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="relation"
                          required
                          @focus="touched.relation = true"
                          @blur="touched.relation = true"
                        />
                        <span
                          v-if="touched.relation && !relation"
                          class="text-danger"
                          >Relation is required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Address Line 1</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="address_line_1"
                          required
                          @focus="touched.address_line_1 = true"
                          @blur="touched.address_line_1 = true"
                        />
                        <span
                          v-if="touched.address_line_1 && !address_line_1"
                          class="text-danger"
                          >Address Line 1 is required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Address Line 2</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="address_line_2"
                          required
                          @focus="touched.address_line_2 = true"
                          @blur="touched.address_line_2 = true"
                        />
                        <span
                          v-if="touched.address_line_2 && !address_line_2"
                          class="text-danger"
                          >Address Line 2 is required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">City</label>
                      </div>
                      <div class="col-12 mt-1">
                        <input
                          type="text"
                          class="form-control"
                          v-model="city"
                          @focus="touched.city = true"
                          @blur="touched.city = true"
                          required
                        />
                        <span v-if="touched.city && !city" class="text-danger"
                          >City is required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">PostCode</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="postcode"
                      @input="cleanAndValidatePostcode"
                      @focus="touched.postcode = true"
                      @blur="touched.postcode = true"
                      required
                    />
                    <span v-if="touched.postcode">
                      <span
                        v-if="
                          !validatePostcode(postcode) && !isNumeric(postcode)
                        "
                        class="text-danger"
                      >
                        Invalid Postcode and must be a number
                      </span>
                      <span
                        v-else-if="!validatePostcode(postcode)"
                        class="text-danger"
                      >
                        Invalid Postcode
                      </span>
                      <span
                        v-else-if="!isNumeric(postcode)"
                        class="text-danger"
                      >
                        Postcode must be a number
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#addNextToKin"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
              :disabled="isSubmitDisabled"
              data-bs-toggle="modal"
              @click.prevent="fetchNextToKinMethod()"
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
import SuccessAlert from "../../../Alerts/SuccessAlert.vue";

export default {
  name: "NextToKinEdit",
  data() {
    return {
      name: "",
      phone_number: "",
      relation: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      postcode: "",
      touched: {
        name: false,
        phone_number: false,
        relation: false,
        address_line_1: false,
        address_line_2: false,
        city: false,
        postcode: false,
      },
    };
  },
  components: { SuccessAlert },
  computed: {
    isSubmitDisabled() {
      return (
        !this.name.trim() ||
        !this.phone_number.trim() ||
        !this.relation.trim() ||
        !this.address_line_1.trim() ||
        !this.address_line_2.trim() ||
        !this.city.trim() ||
        !this.validatePhoneNumber(this.phone_number) ||
        !this.validatePostcode(this.postcode)
      );
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    clearFieldsData() {
      setTimeout(() => {
        this.name = "";
        this.phone_number = "";
        this.relation = "";
        this.address_line_1 = "";
        this.address_line_2 = "";
        this.city = "";
        this.validateForm();
      }, 10);
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    isNumeric(value) {
      return /^\d+$/.test(value);
    },
    validateForm() {
      this.nameError = "";
      this.phoneNumberError = "";
      this.relationError = "";
      this.addressLine1Error = "";
      this.addressLine2Error = "";
      this.cityError = "";
      this.postcodeError = "";

      if (!this.name.trim()) this.nameError = "Name is required";
      if (!this.validatePhoneNumber(this.phone_number))
        this.phoneNumberError = "Invalid Phone Number";
      if (!this.relation.trim()) this.relationError = "Relation is required";
      if (!this.address_line_1.trim())
        this.addressLine1Error = "Address Line 1 is required";
      if (!this.address_line_2.trim())
        this.addressLine2Error = "Address Line 2 is required";
      if (!this.city.trim()) this.cityError = "City is required";
      if (!this.validatePostcode(this.postcode))
        this.postcodeError = "Invalid Postcode";

      return (
        this.nameError ||
        this.phoneNumberError ||
        this.relationError ||
        this.addressLine1Error ||
        this.addressLine2Error ||
        this.cityError ||
        this.postcodeError
      );
    },

    submitForm() {
      if (this.validateForm()) {
        // console.log("Form validation failed");
        return;
      }

      this.fetchNextToKinMethod();
    },
    validatePostcode(postcode) {
      const numericRegex = /^[0-9]+$/;
      return (
        numericRegex.test(postcode) &&
        postcode.length >= 5 &&
        postcode.length <= 10
      );
    },
    cleanAndValidatePhoneNumber() {
      const cleanedPhoneNumber = this.phone_number.replace(/\D/g, "");

      this.phone_number = cleanedPhoneNumber;

      return this.validatePhoneNumber(cleanedPhoneNumber);
    },
    cleanAndValidatePostcode() {
      const cleanedPostcode = this.postcode.replace(/\D/g, "");

      this.postcode = cleanedPostcode;

      if (!this.validatePostcode(cleanedPostcode)) {
      }
    },
    validatePhoneNumber(phoneNumber) {
      const phoneNumberRegex = /^\d{10}$/;
      return phoneNumberRegex.test(phoneNumber);
    },
    async fetchNextToKinMethod() {
      const payload = {
        name: this.name,
        phone_number: this.phone_number,
        relation: this.relation,
        address_line_1: this.address_line_1,
        address_line_2: this.address_line_2,
        city: this.city,
        postcode: this.postcode,
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/next_of_kins`,
          payload
        );
        if (response.status === 200 || response.status === 201) {
          this.$emit("AddNextKin");

          this.name = "";
          this.phone_number = "";
          this.relation = "";
          this.address_line_1 = "";
          this.address_line_2 = "";
          this.city = "";
          this.postcode = "";
          const message = "Add Next to Kin successfully";
          this.$refs.successAlert.showSuccess(message);
        } else {
        }
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },
  },

  mounted() {},
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

.modal-footer {
  border-top: 0px;
}

select {
  width: 100%;
  border: none;
  padding: 9px;
  border-radius: 4px;
}

#head {
  width: 40px;
  height: 40px;
}
.main-box {
  background: #00000008;

  padding: 100px 20px;
  height: 100vh;
  overflow: hidden;
}

.model-box {
  background: #f3f3f3;
  margin: 20px 443px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 3px 1px 12px 14px #c3bdbd;
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
