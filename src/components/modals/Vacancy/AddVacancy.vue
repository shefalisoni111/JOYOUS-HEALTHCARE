<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addVacancies"
      aria-labelledby="addVacancies"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addVacancies">Add Vacancy</h5>
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
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Business Unit</label
                    >
                  </div>

                  <div class="col-10">
                    <select
                      v-model="business_unit_id"
                      id="selectBusinessUnit"
                      @change="clearError"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <span
                      v-if="!validationSelectedBusinessUnit"
                      class="text-danger"
                      >BusinessUnit Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="selectClients" class="form-label">Client</label>
                  </div>
                  <div class="col-10">
                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="clearError"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                    <span v-if="!validationSelectedClient" class="text-danger"
                      >Client Required</span
                    >
                  </div>
                </div>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle"
                      >Job Title</label
                    >
                  </div>
                  <div class="col-10">
                    <select
                      v-model="job_id"
                      id="selectJobTitle"
                      @change="clearError"
                    >
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <span
                      v-if="!validationSelectedOptionText"
                      class="text-danger"
                      >Position Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Dated</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="date"
                      class="form-control"
                      v-model="dates"
                      @change="clearError"
                    />
                    <span v-if="!validationDateType" class="text-danger"
                      >Date Required</span
                    >
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectShifts">Shift</label>
                  </div>
                  <div class="col-10">
                    <select
                      v-model="shift_id"
                      id="selectShifts"
                      @change="clearError"
                    >
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
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label">Notes</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="notes"
                      @input="clearError"
                    />
                    <span v-if="!validationNotesText" class="text-danger"
                      >Notes Required</span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addVacancies"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              :disabled="!isValidForm"
              :class="{ disabled: !isValidForm }"
              v-on:click="addVacancyMethod()"
            >
              Add Vacancy
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
  name: "AddVacancy",
  data() {
    return {
      validationSelectedOptionText: true,
      validationSelectedBusinessUnit: true,
      validationSelectedClient: true,
      validationNotesText: true,
      validationShift: true,
      validationDateType: true,
      business_unit_id: "",
      client_id: "",
      clientData: [],
      job_id: "",
      options: [],
      businessUnit: [],
      dates: [],
      shift_id: "",
      shiftsTime: [],
      notes: "",
      isValidForm: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationDateType
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

    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.first_name : "";
    },

    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
  },
  watch: {
    // Watch for changes in input fields and trigger validations
    job_id: "validationSelectedOptionText",
    business_unit_id: "validationSelectedBusinessUnit",
    client_id: "validationSelectedClient",
    shift_id: "validationShift",
    dates: "validationDateType",
    notes: "validationNotesText",
    // Update overall form validity when any watched property changes
    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },
  },
  methods: {
    async addVacancyMethod() {
      this.validationSelectedOptionText = this.validationSelectedFormate(
        this.job_id
      );
      this.validationSelectedBusinessUnit = this.ValidationBusinessUnit(
        this.business_unit_id
      );
      this.validationSelectedClient = this.ValidationClient(this.client_id);
      this.validationNotesText = this.ValidationNotes(this.notes);
      this.validationShift = this.ValidationShift(this.shift_id);
      this.validationDateType = this.ValidationDate(this.dates);
      if (
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationDateType
      ) {
        const data = {
          business_unit_id: this.business_unit_id,
          job_id: this.job_id,
          dates: [this.dates],
          shift_id: this.shift_id,
          notes: this.notes,
          client_id: this.client_id,
        };
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://logezy.onrender.com/vacancies",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
              body: JSON.stringify(data),
            }
          );
          if (data) {
            location.reload();
          }
        } catch (error) {}
      } else {
        // Set the password required flag if the password field is empty
      }
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get("https://logezy.onrender.com/jobs");
        this.options = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/business_units"
        );
        this.businessUnit = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get("https://logezy.onrender.com/clients");
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
    async getTimeShift() {
      await axios
        .get("https://logezy.onrender.com/shifts")
        .then((response) => (this.shiftsTime = response.data));
    },
    validationSelectedFormate(job_id) {
      const positionRegex = /[a-zA-Z0-9]/;
      return positionRegex.test(job_id);
    },
    ValidationBusinessUnit(business_unit_id) {
      const businessUnitRegex = /[a-zA-Z0-9]/;
      return businessUnitRegex.test(business_unit_id);
    },
    ValidationNotes(notes) {
      const notesRegex = /[a-zA-Z0-9]/;
      return notesRegex.test(notes);
    },
    ValidationShift(shift_id) {
      const shiftRegex = /[a-zA-Z0-9]/;
      return shiftRegex.test(shift_id);
    },
    ValidationDate(dates) {
      const dateRegex = /(0[1-9]|[12][0-9]|3[01])/;
      return dateRegex.test(dates);
    },
    ValidationClient(client_id) {
      const clientRegex = /[a-zA-Z0-9]/;
      return clientRegex.test(client_id);
    },
    clearError() {
      this.validationSelectedOptionText = true;
      this.validationSelectedBusinessUnit = true;
      this.validationSelectedClient = true;
      this.validationNotesText = true;
      this.validationShift = true;
      this.validationDateType = true;
    },
  },
  mounted() {
    this.getJobTitleMethod();
    this.getBusinessUnitMethod();
    this.getClientMethod();
    this.getTimeShift();
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

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
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
