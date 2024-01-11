<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="rateCards" aria-labelledby="ratePAge" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rateCards">Add RateCard</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form @submit.prevent="addRateCardMethod">
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Business Unit</label
                    >
                  </div>
                  <div class="col-10">
                    <select v-model="business_unit_id" id="selectBusinessUnit">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <span v-if="!validationBusinessUnit" class="text-danger"
                      >Business Unit Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Position</label>
                  </div>
                  <div class="col-10">
                    <select v-model="job_id" id="selectJobTitle">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <span v-if="!validationPosition" class="text-danger"
                      >Position Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Day</label>
                  </div>
                  <div class="col-10">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="weekname"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                    <span v-if="!validationDay" class="text-danger">Day Required</span>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="employeeData">Employment Type</label>
                  </div>
                  <div class="col-10">
                    <select v-model="employment_type_id" id="selectEmployee">
                      <option
                        v-for="option in employeeData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.title }}
                      </option>
                    </select>
                    <span v-if="!validationEmployeeType" class="text-danger"
                      >Employee Type Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectShifts">Shift Time</label>
                  </div>
                  <div class="col-10">
                    <select v-model="shift_id" id="selectShifts">
                      <option
                        v-for="option in shiftsTime"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.shift_name }}
                      </option>
                    </select>
                    <span v-if="!validationShiftTime" class="text-danger"
                      >Shift Time Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Staff Rate</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="staff_rate"
                      @input="clearError"
                    />
                    <span v-if="!validationStaffRate" class="text-danger"
                      >Staff Rate Required</span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#rateCards"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click="submitForm"
              :disabled="!isValidForm"
            >
              Add RateCard
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
  name: "RateCard",
  data() {
    return {
      weekname: "",
      shift_id: "",
      business_unit_id: "",
      job_id: "",
      employment_type_id: "",
      staff_rate: "",
      candidate_id: "",
      employeeData: [],
      options: [],
      shiftsTime: [],
      businessUnit: [],
      validationBusinessUnit: true,
      validationEmployeeType: true,
      validationShiftTime: true,
      validationDay: true,
      validationStaffRate: true,
      validationPosition: true,
    };
  },
  watch: {
    business_unit_id: function (newValue) {
      this.validateBusinessUnit(newValue);
    },
    shift_id: function (newValue) {
      this.validateStaffRate(newValue);
    },
    job_id: function (newValue) {
      this.validateJobID(newValue);
    },
    employment_type_id: function (newValue) {
      this.validateEmployeeType(newValue);
    },
    shift_id: function (newValue) {
      this.validateShiftId(newValue);
    },
    weekname: function (newValue) {
      this.validateDay(newValue);
    },
  },
  computed: {
    isValidForm() {
      return (
        this.validationBusinessUnit &&
        this.validationStaffRate &&
        this.validationPosition &&
        this.validationShiftTime &&
        this.validationEmployeeType &&
        this.validationDay
      );
    },
    selectedOptionText() {
      const jobs_id = this.options.find((option) => option.id === this.jobs_id);
      return jobs_id ? jobs_id.name : "";
    },

    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },

    selectShifts() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.shift_name : "";
    },

    selectEmployee() {
      const employment_type_id = this.employeeData.find(
        (option) => option.id === this.employment_type_id
      );
      return employment_type_id ? employment_type_id.title : "";
    },
  },
  methods: {
    async submitForm() {
      this.validateBusinessUnit(this.business_unit_id);
      this.validateStaffRate(this.shift_id);
      this.validateJobID(this.job_id);
      this.validateShiftId(this.shift_id);
      this.validateEmployeeType(this.employment_type_id);
      this.validateDay(this.weekname);

      if (this.isValidForm) {
        await this.addRateCardMethod();
      } else {
      }
    },
    async addRateCardMethod() {
      const data = {
        weekname: this.weekname,
        staff_rate: this.staff_rate,
        business_unit_id: this.business_unit_id,
        job_id: this.job_id,
        candidate_id: this.$route.params.id,
        employment_type_id: this.employment_type_id,
        shift_id: this.shift_id,
      };
      try {
        const response = await fetch(`${VITE_API_URL}/rate_cards`, {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          this.$emit("rateCard");

          this.weekname = "";
          this.staff_rate = "";
          this.business_unit_id = "";
          this.job_id = "";
          this.$route.params.id = "";
          this.employment_type_id = "";
          this.shift_id = "";
        } else {
        }
      } catch (error) {}
    },
    async getJobTitleMethod() {
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
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/business_units`);
        this.businessUnit = response.data;
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

    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
    },
    validateBusinessUnit(newValue) {
      // Example validation function for Business Unit
      this.validationBusinessUnit = newValue !== "";
    },
    validateStaffRate(newValue) {
      // Example validation function for Staff Rate
      this.validationStaffRate = newValue !== "";
    },
    validateJobID(newValue) {
      // Example validation function for Job ID
      this.validationPosition = newValue !== "";
    },
    validateShiftId(newValue) {
      // Example validation function for Shift ID
      this.validationShiftTime = newValue !== "";
    },
    validateEmployeeType(newValue) {
      // Example validation function for Employee Type
      this.validationEmployeeType = newValue !== "";
    },
    validateDay(newValue) {
      // Example validation function for Day
      this.validationDay = newValue !== "";
    },

    clearError() {
      this.validationBusinessUnit = true;
      this.validationStaffRate = true;
      this.validationEmployeeType = true;
      this.validationShiftTime = true;
      this.validationDay = true;
      this.validationPosition = true;
    },
  },
  mounted() {
    // this.addRateCardMethod();
    this.getJobTitleMethod();
    this.getBusinessUnitMethod();
    this.getTimeShift();
    this.getEmployeeTypeData();
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
select {
  width: 100%;
  padding: 9px;
  border-radius: 3px;
  border: none;
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
