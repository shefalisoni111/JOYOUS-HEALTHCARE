<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editBankDetailsOverview"
      aria-labelledby="editBanktDetails"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="editBankDetailsOverview">
              Edit Details
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Bank Name</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.bank_name"
                      @input="cleanAndValidateBankName"
                    />
                    <span v-if="!isBankNameValid" class="text-danger">
                      Bank Name must No exceed 50 characters.
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Account Number</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.bank_number"
                      @input="cleanAndValidateBankNumber"
                    />
                    <span v-if="!isBankNumberValid" class="text-danger">
                      Bank Account number must be between 8 and 15 digits.
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">IFSC Code</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchCandidate.ifsc_code"
                      @input="cleanAndValidateIfscCode"
                    />
                    <span v-if="!isIfscCodeValid" class="text-danger">
                      IFSC Code must be up to 15 alphanumeric characters.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editBankDetailsOverview"
              @click="resetChanges"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              :disabled="!isBankNumberValid || !isBankNameValid || !isIfscCodeValid"
              @click.prevent="updateCandidateMethod()"
            >
              Save
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
  name: "EditBankDetails",
  data() {
    return {
      fetchCandidate: {
        bank_name: "",
        bank_number: "",
        ifsc_code: "",
      },
      originalData: null,
    };
  },
  components: { SuccessAlert },
  computed: {
    isBankNumberValid() {
      const bankNumberLength = this.fetchCandidate.bank_number.length;
      return bankNumberLength >= 8 && bankNumberLength <= 15;
    },
    isBankNameValid() {
      const bankName = this.fetchCandidate.bank_name;
      const isAlphabetic = /^[A-Za-z\s]*$/.test(bankName);
      const isLengthValid = bankName.length <= 50;
      return isAlphabetic && isLengthValid;
    },
    isIfscCodeValid() {
      const ifscCode = this.fetchCandidate.ifsc_code;
      const isLengthValid = ifscCode.length <= 15;
      const isAlphanumeric = /^[A-Za-z0-9]*$/.test(ifscCode);
      return isLengthValid && isAlphanumeric;
    },
  },
  methods: {
    resetChanges() {
      this.fetchCandidate = { ...this.originalData };
    },
    cleanAndValidateBankNumber() {
      this.fetchCandidate.bank_number = this.fetchCandidate.bank_number.replace(
        /\D/g,
        ""
      );
    },
    cleanAndValidateBankName() {
      this.fetchCandidate.bank_name = this.fetchCandidate.bank_name.replace(
        /[^A-Za-z\s]/g,
        ""
      );
    },
    cleanAndValidateIfscCode() {
      this.fetchCandidate.ifsc_code = this.fetchCandidate.ifsc_code.replace(
        /[^A-Za-z0-9]/g,
        ""
      );
    },
    async fetchCandidateOverviewMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.fetchCandidate = response.data.candidate;
        this.originalData = { ...this.fetchCandidate };
      } catch (error) {
        // console.error("Error fetching todo:", error);
      }
    },

    async updateCandidateMethod() {
      if (!this.isBankNumberValid || !this.isBankNameValid || !this.isIfscCodeValid)
        return;
      try {
        await axios.put(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`,
          this.fetchCandidate
        );
        this.$emit("bankDetailAdded");
        // alert("Candidate updated successfully");
        const message = "Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchCandidateOverviewMethod();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchCandidateOverviewMethod();

    next();
  },
  // async mounted() {
  //   await this.fetchCandidateOverviewMethod();
  // },
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
 font-family: 'Inter', sans-serif;
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
