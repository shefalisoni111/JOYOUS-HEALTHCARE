<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="rateCards" aria-labelledby="ratePAge" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rateCards">Add RateCard</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit">Site</label>
                  </div>
                  <div class="col-10">
                    <select v-model="site_id" id="selectBusinessUnit">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                    <span v-if="!validationBusinessUnit" class="text-danger"
                      >Site Required</span
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
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
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
                      @input="validateStaffRate"
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
              @click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :class="{
                'btn btn-primary rounded-1 text-capitalize fw-medium': true,
              }"
              data-bs-dismiss="modal"
              v-on:click="sendRateCardData()"
            >
              Add RateCard
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
  name: "RateCard",
  data() {
    return {
      weekname: "",
      shift_id: "",
      site_id: "",
      job_id: "",
      employment_type_id: "",
      staff_rate: "",
      candidate_id: "",
      site_id: "",
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
    site_id: function (newValue) {
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
  components: { SuccessAlert },
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
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.name : "";
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
    validateStaffRate() {
      this.staff_rate = this.staff_rate.replace(/[^0-9-]/g, "");

      if (this.staff_rate === "" || isNaN(this.staff_rate)) {
        this.validationStaffRate = false;
      } else {
        this.validationStaffRate = true;
      }
    },
    clearFieldsData() {
      this.resetForm();
      setTimeout(() => {
        this.clearError();
      }, 3);
    },

    isFieldEmpty() {
      return (
        !this.weekname.trim() ||
        !this.staff_rate.trim() ||
        !this.site_id.trim() ||
        !this.$route.params.id.trim() ||
        !this.employment_type_id.trim() ||
        !this.shift_id.trim() ||
        !this.job_id
      );
    },
    async addRateCardMethod() {
      this.validateBusinessUnit(this.site_id);
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
        site_id: this.site_id,
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
          this.$emit("rateCardAdded");

          const message = "Successful Rate Card added";
          this.$refs.successAlert.showSuccess(message);
          this.resetForm();
          this.clearError();
        } else {
        }
      } catch (error) {}
    },
    async sendRateCardData() {
      await this.addRateCardMethod();
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
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
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
      this.validationBusinessUnit = newValue !== "";
    },
    validateStaffRate(newValue) {
      this.validationStaffRate = newValue !== "";
    },
    validateJobID(newValue) {
      this.validationPosition = newValue !== "";
    },
    validateShiftId(newValue) {
      this.validationShiftTime = newValue !== "";
    },
    validateEmployeeType(newValue) {
      this.validationEmployeeType = newValue !== "";
    },
    validateDay(newValue) {
      this.validationDay = newValue !== "";
    },
    resetForm() {
      this.weekname = "";
      this.staff_rate = "";
      this.site_id = "";
      this.job_id = "";
      this.$route.params.id = "";
      this.employment_type_id = "";
      this.shift_id = "";
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.addRateCardMethod();
      vm.this.getJobTitleMethod();
      vm.this.getBusinessUnitMethod();
      vm.this.getTimeShift();
      vm.this.getEmployeeTypeData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.addRateCardMethod();
    this.getJobTitleMethod();
    this.getBusinessUnitMethod();
    this.getTimeShift();
    this.getEmployeeTypeData();
    next();
  },
  mounted() {
    // this.addRateCardMethod();
    // this.getJobTitleMethod();
    // this.getBusinessUnitMethod();
    // this.getTimeShift();
    // this.getEmployeeTypeData();
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
