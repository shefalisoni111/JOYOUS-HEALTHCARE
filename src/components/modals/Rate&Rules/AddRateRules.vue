<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addRateRules"
      aria-labelledby="addRateRules"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRateRules">Add Rate</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>

                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="onClientSelect"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        :id="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedClient" class="text-danger"
                      >Client Required</span
                    >
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit">Site</label>

                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="onSiteSelect"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedBusinessUnit" class="text-danger"
                      >Site Required</span
                    >
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectJobTitle">Jobs</label>

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
                    <span v-if="!validationSelectedOptionText" class="text-danger"
                      >Position Required</span
                    >
                  </div>
                </div>
                <div style="background-color: #bdbdbd; padding: 10px; border-radius: 3px">
                  <h5 class="fw-bold">Monday</h5>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label" for="selectShifts">Shift</label>

                        <select v-model="site_shift_id" id="selectShifts">
                          <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.shift_name }}
                          </option>
                        </select>

                        <span v-if="!validationShift" class="text-danger"
                          >Shift Required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="start_time"
                          @change="updateStartTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.start_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.start_time }}
                          </option>
                        </select>
                        <span
                          v-if="!validationStartTime && !start_time"
                          class="text-danger"
                          >Start Time is required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="end_time"
                          @change="updateEndTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.end_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.end_time }}
                          </option>
                        </select>
                        <span v-if="!validationEndTime && !end_time" class="text-danger">
                          End Time is required
                        </span>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label" for="selectShifts">Rate Type</label>

                        <select v-model="site_shift_id" id="selectShifts">
                          <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.shift_name }}
                          </option>
                          <option>Custom Time</option>
                        </select>

                        <span v-if="!validationShift" class="text-danger"
                          >Shift Required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Client Rate</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="start_time"
                          @change="updateStartTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.start_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.start_time }}
                          </option>
                        </select>
                        <span
                          v-if="!validationStartTime && !start_time"
                          class="text-danger"
                          >Start Time is required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd"
                          >Private Limited</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="end_time"
                          @change="updateEndTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.end_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.end_time }}
                          </option>
                        </select>
                        <span v-if="!validationEndTime && !end_time" class="text-danger">
                          End Time is required
                        </span>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label" for="selectShifts">Self Employed</label>

                        <select v-model="site_shift_id" id="selectShifts">
                          <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.shift_name }}
                          </option>
                          <option>Custom Time</option>
                        </select>

                        <span v-if="!validationShift" class="text-danger"
                          >Shift Required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart">Umbrella</label>

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="start_time"
                          @change="updateStartTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.start_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.start_time }}
                          </option>
                        </select>
                        <span
                          v-if="!validationStartTime && !start_time"
                          class="text-danger"
                          >Start Time is required</span
                        >
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">PAYE</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="end_time"
                          @change="updateEndTime"
                        >
                          <option
                            v-for="shift in shiftsTime"
                            :key="shift.id"
                            :value="shift.end_time"
                            :disabled="shift.id !== site_shift_id"
                          >
                            {{ shift.end_time }}
                          </option>
                        </select>
                        <span v-if="!validationEndTime && !end_time" class="text-danger">
                          End Time is required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormValid"
              :class="{ disabled: !isFormValid }"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              :data-bs-dismiss="isFormValid ? 'modal' : null"
              v-on:click="addVacancyMethod()"
            >
              Add Rate
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
  name: "AddVacancy",
  data() {
    return {
      validationSelectedOptionText: true,
      validationSelectedBusinessUnit: true,
      validationSelectedClient: true,
      validationNotesText: true,
      validationShift: true,
      validationStaffRequired: true,
      validationDateType: true,
      start_time: null,
      end_time: null,
      break: null,

      site_id: "",
      client_id: "",
      clientData: [],
      job_id: "",
      options: [],
      businessUnit: [],
      dates: [],
      site_shift_id: "",
      shiftsTime: [],
      notes: "",
      staff_required: "",
      isValidForm: false,
      selectedDate: null,
    };
  },
  components: { SuccessAlert },
  computed: {
    isFormValid() {
      return (
        this.site_id !== "" &&
        this.client_id !== "" &&
        this.job_id !== "" &&
        this.site_shift_id !== "" &&
        this.notes !== "" &&
        this.staff_required !== "" &&
        this.selectedDate !== null &&
        // this.start_time !== null &&
        // this.end_time !== null &&
        this.break !== null &&
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationDateType &&
        this.validationStaffRequired
        // this.validationStartTime &&
        // this.validationEndTime &&
        // this.validationBreak
      );
    },
    updateStartTime() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.site_shift_id
      );

      this.start_time = selectedShift ? selectedShift.start_time : null;
    },
    selectedOptionText() {
      const jobs_id = this.options.find((option) => option.id === this.jobs_id);
      return jobs_id ? jobs_id.name : "";
    },

    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },

    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return this.client_id;
    },

    selectShifts() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.shift_name : "";
    },
    selectShiftStart() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.start_time : "";
    },
    selectShiftEnd() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.end_time : "";
    },
  },
  watch: {
    job_id: "validationSelectedOptionText",
    site_id: "validationSelectedBusinessUnit",
    client_id: "validationSelectedClient",
    site_shift_id: "validationShift",
    staff_required: "validationStaffRequired",
    dates: "validationDateType",
    notes: "validationNotesText",
    // start_time: "validateStartTime",
    // end_time: "validateEndTime",
    // break: "validateBreakFormate",

    job_id: function (newValue) {
      this.validationSelectedOptionText = this.validationSelectedFormate(newValue);
    },
    site_id: function (newValue) {
      this.validationSelectedBusinessUnit = this.ValidationBusinessUnit(newValue);
    },
    client_id: function (newValue) {
      this.validationSelectedClient = this.ValidationClient(newValue);
    },
    site_shift_id: function (newValue) {
      this.validationShift = this.ValidationShift(newValue);
    },
    staff_required: function (newValue) {
      this.validationStaffRequired = this.ValidationStaffRequired(newValue);
    },
    dates: function (newValue) {
      this.validationDateType = this.ValidationDate(newValue);
    },
    notes: function (newValue) {
      this.validationNotesText = this.ValidationNotes(newValue);
    },
    // start_time: function (newValue) {
    //   this.validationNotesText = this.validateStartTime(newValue);
    // },
    // end_time: function (newValue) {
    //   this.validationNotesText = this.validateEndTime(newValue);
    // },
    // break: function (newValue) {
    //   this.validationBreak = this.validateBreakFormate(newValue);
    // },
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },
  },
  methods: {
    handleShiftChange() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.site_shift_id
      );
      if (selectedShift) {
        this.start_time = selectedShift.start_time;
        this.end_time = selectedShift.end_time;
      } else {
        this.start_time = "";
        this.end_time = "";
      }
    },

    updateEndTime() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.site_shift_id
      );

      this.end_time = selectedShift ? selectedShift.end_time : null;
    },
    validateStartTime(newValue) {
      if (!newValue) {
        this.validationStartTime = false;
        return "Please enter a valid start time";
      } else {
        this.validationStartTime = true;
        return "";
      }
    },

    validateEndTime(newValue) {
      if (!newValue) {
        this.validationEndTime = false;
        return "Please enter a valid end time";
      } else {
        this.validationEndTime = true;
        return "";
      }
    },

    validateBreak(newValue) {
      if (!newValue) {
        this.validationBreak = false;
        return "Please enter a valid break time";
      } else {
        this.validationBreak = true;
        return "";
      }
    },
    formatTime(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
      } else if (hour > 12 && hour < 24) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
      }
    },
    formatBreakTime(minute) {
      const hours = Math.floor(minute / 60);
      const mins = minute % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours} hour `;
      }
      if (mins > 0) {
        formattedTime += `${mins} minute`;
      }

      return formattedTime;
    },
    // formatTimeMinute(hour, minute) {
    //   const hourStr = String(hour).padStart(2, "0");
    //   const minuteStr = String(minute).padStart(2, "0");
    //   return `${hourStr}:${minuteStr}`;
    // },
    onClientSelect() {
      const selectedClientId = this.client_id;

      this.getJobTitleMethod(selectedClientId);
      this.getSiteAccordingClientMethod(selectedClientId);
    },
    onSiteSelect() {
      const selectedSiteId = this.site_id;
      this.getTimeShift(selectedSiteId);
    },
    validateStaffRequired() {
      if (this.staff_required <= 0) {
        this.staff_required = null;
        this.validationStaffRequired = false;
      } else {
        this.validationStaffRequired = true;
      }
    },
    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        this.clearError();
      }, 10);
    },

    addDate() {
      if (this.selectedDate) {
        const currentDate = new Date();
        const selectedDate = new Date(this.selectedDate);

        if (selectedDate > currentDate || this.isToday(selectedDate, currentDate)) {
          const formattedDate = selectedDate.toLocaleDateString("en-GB");
          if (!this.dates.includes(formattedDate)) {
            this.dates.push(formattedDate);
          }
          this.selectedDate = "";
          this.clearError();
          this.validationDateType = true;
        } else {
          this.validationDateType = false;
        }
      }
    },
    isToday(selectedDate, currentDate) {
      return (
        selectedDate.getDate() === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      );
    },
    removeDate(index) {
      this.dates.splice(index, 1);
      this.clearError();
    },
    async addVacancyMethod() {
      this.validationSelectedOptionText = this.validationSelectedFormate(this.job_id);
      this.validationSelectedBusinessUnit = this.ValidationBusinessUnit(this.site_id);
      this.validationSelectedClient = this.ValidationClient(this.client_id);
      this.validationNotesText = this.ValidationNotes(this.notes);
      this.validationShift = this.ValidationShift(this.site_shift_id);
      this.validationStaffRequired = this.ValidationStaffRequired(this.staff_required);
      this.validationDateType = this.ValidationDate(this.dates);
      // this.validationStartTime = this.validateStartTime(this.start_time);
      // this.validationEndTime = this.validateEndTime(this.end_time);
      // this.validationBreak = this.validateBreakFormate(this.break);
      if (
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationStaffRequired &&
        this.validationDateType
        // this.validationStartTime &&
        // this.validationEndTime &&
        // this.validationBreak
      ) {
        const data = {
          site_id: this.site_id,
          job_id: this.job_id,
          dates: this.dates,
          site_shift_id: this.site_shift_id,
          staff_required: this.staff_required,
          notes: this.notes,
          client_id: this.client_id,
          start_time: this.start_time,
          end_time: this.end_time,
          break: this.break,
        };

        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${VITE_API_URL}/vacancies`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
            body: JSON.stringify(data),
          });

          if (response.status === 201) {
            this.clearFields();
            setTimeout(() => {
              this.clearError();
            }, 100);
            this.$emit("addVacancy");
            // alert("Successful Shift added");
            const message = "Successful Shift added";
            this.$refs.successAlert.showSuccess(message);
          } else {
            alert("Error adding Shift");
            this.clearFields();
            setTimeout(() => {
              this.clearError();
            }, 100);
          }
        } catch (error) {
          alert("Error adding Shift");
          this.clearFields();
          setTimeout(() => {
            this.clearError();
          }, 100);
        }
      } else {
        this.clearFields();
        setTimeout(() => {
          this.clearError();
        }, 100);
      }
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/job_title_for_client/${this.client_id}`
        );
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getSiteAccordingClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site;
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
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    // async getTimeShift() {
    //   await axios
    //     .get(`${VITE_API_URL}/shifts`)
    //     .then((response) => (this.shiftsTime = response.data));
    // },
    async getTimeShift() {
      try {
        const response = await axios.get(`${VITE_API_URL}site_shift/${this.site_id}`);
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
          })) || [];
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    convertTimeFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    },
    validationSelectedFormate(newValue) {
      const positionRegex = /[a-zA-Z0-9]/;
      return positionRegex.test(newValue);
    },
    ValidationBusinessUnit(newValue) {
      const businessUnitRegex = /[a-zA-Z0-9]/;
      return businessUnitRegex.test(newValue);
    },
    ValidationNotes(newValue) {
      const notesRegex = /[a-zA-Z0-9]/;
      return notesRegex.test(newValue);
    },
    ValidationShift(newValue) {
      const shiftRegex = /[a-zA-Z0-9]/;
      return shiftRegex.test(newValue);
    },
    ValidationStaffRequired(newValue) {
      const staffRequired = /^(0?[1-9]|[12][0-9]|3[01])$/;
      return staffRequired.test(newValue);
    },
    ValidationDate(newValue) {
      const dateRegex = /(0[1-9]|[12][0-9]|3[01])/;
      return dateRegex.test(newValue);
    },
    validateBreakFormate(newValue) {
      const breakRegex = /^[1-9][0-9]*\s(hour|min)s?$/;
      return breakRegex.test(newValue);
    },
    ValidationClient(newValue) {
      const clientRegex = /[a-zA-Z0-9]/;
      return clientRegex.test(newValue);
    },
    clearError() {
      this.validationSelectedOptionText = true;
      this.validationSelectedBusinessUnit = true;
      this.validationSelectedClient = true;
      this.validationNotesText = true;
      this.validationShift = true;
      (this.validationStartTime = true),
        (this.validationEndTime = true),
        (this.validationStaffRequired = true),
        (this.validationDateType = true),
        (this.validationBreak = true);
    },
    clearFields() {
      this.site_id = "";
      this.client_id = "";
      this.job_id = "";
      this.dates = [];
      this.site_shift_id = "";
      this.start_time = "";
      this.end_time = "";
      this.break = "";
      (this.options = []),
        (this.businessUnit = []),
        (this.shiftsTime = []),
        (this.staff_required = ""),
        (this.notes = "");
      this.selectedDate = null;
    },
  },
  mounted() {
    // this.getBusinessUnitMethod();
    // this.getJobTitleMethod();
    this.getClientMethod();
    // this.getSiteAccordingClientMethod();
    this.getTimeShift();
    this.isValidForm = this.isFormValid;
    this.clearError();
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
.modal-dialog {
  max-width: 1460px;
}
select {
  width: 100% !important;
  padding: 10px !important;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
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
