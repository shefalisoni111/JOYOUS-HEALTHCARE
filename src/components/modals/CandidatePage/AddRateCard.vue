<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="rateCards" aria-labelledby="ratePAge">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rateCards">Add RateCard</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3 bg-transparent">
            <div class="row g-3 align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label for="selectClients" class="form-label">Client</label>
                      </div>
                      <div class="col-12">
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
                            {{ option.client_name }}
                          </option>
                        </select>
                        <span v-if="!validationSelectedClient" class="text-danger"
                          >Client Required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectBusinessUnit">Site</label>
                      </div>
                      <div class="col-12">
                        <select
                          v-model="site_id"
                          id="selectBusinessUnit"
                          @change="onSiteSelect"
                        >
                          <option
                            v-for="option in businessUnit"
                            :key="option.site_id"
                            :value="option.site_id"
                            :id="option.site_id"
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
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Position</label>
                      </div>
                      <div class="col-12">
                        <select v-model="job_id" @change="onJobTitleChange">
                          <option
                            v-for="option in options"
                            :key="option.job_id"
                            :value="option.job_id"
                            :id="option.job_id"
                          >
                            {{ option.job_name }}
                          </option>
                        </select>
                        <span v-if="!validationPosition" class="text-danger"
                          >Position Required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Day</label>
                      </div>
                      <div class="col-12">
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
                          <option value="saturday">Saturday</option>
                          <option value="sunday">Sunday</option>
                        </select>
                        <span v-if="!validationDay" class="text-danger"
                          >Day Required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="employeeData"
                          >Employment Type</label
                        >
                      </div>
                      <div class="col-12">
                        <select v-model="employment_type_id" id="selectEmployee" disabled>
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
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label" for="selectShifts">Shift Time</label>
                      </div>

                      <div class="col-12">
                        <select
                          v-model="site_shift_id"
                          id="selectShifts"
                          @change="selectShiftsMethod"
                        >
                          <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                            :id="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.shift_name.replace(/_/g, " ") }}
                          </option>
                        </select>
                        <span v-if="!validationShiftTime" class="text-danger"
                          >Shift Time Required</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Staff Rate</label>
                  </div>
                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control w-100"
                      v-model="staff_rate"
                      @input="validateStaffRate"
                      :max="999"
                      @keypress="onlyNumber"
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
              class="btn btn-dark btn-cancel"
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
      site_shift: "",
      client_id: "",
      site_id: "",
      job_id: "",
      job_ids: [],
      employment_type_id: "",
      staff_rate: "",
      candidate_id: "",
      site_shift_id: "",
      employeeData: [],
      options: [],
      shiftsTime: [],
      businessUnit: [],
      clientData: [],
      getRateCard: [],
      validationSelectedClient: true,
      validationBusinessUnit: true,
      validationEmployeeType: true,
      validationShiftTime: true,
      validationDay: true,
      validationStaffRate: true,
      validationPosition: true,
    };
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
        this.validationDay &&
        this.validationSelectedClient
      );
    },
    selectShifts() {
      const site_shift_id = this.shiftsTime.find(
        (option) => option.id === this.site_shift_id
      );
      return site_shift_id ? site_shift_id.shift_name : "";
    },
    // selectedJobNames() {
    //   const jobIdsArray = [].concat(this.job_ids || []);
    //   return jobIdsArray
    //     .map((jobId) => {
    //       const job = this.options.find((option) => option.id === jobId);
    //       return job ? { id: jobId, name: job.name } : null;
    //     })
    //     .filter((job) => job !== null);
    // },

    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return this.site_id;
    },

    selectShifts() {
      const site_shift_id = this.shiftsTime.find(
        (option) => option.id === this.site_shift_id
      );
      return site_shift_id ? site_shift_id.shift_name : "";
    },

    selectEmployee() {
      const employment_type_id = this.employeeData.find(
        (option) => option.id === this.employment_type_id
      );
      return employment_type_id ? employment_type_id.title : "";
    },
  },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    selectShiftsMethod() {
      const selectedShift = this.shiftsTime.find(
        (option) => option.id === this.site_shift_id
      );
      if (selectedShift) {
        this.site_shift = selectedShift.shift_name;
      }
    },
    async onJobTitleChange() {
      // await this.getClientFetchSiteMethod();
      const selectedJob = this.options.find(
        (option) => option.job_id === this.selectedJobId
      );

      if (selectedJob) {
        this.job_id = selectedJob.job_id;
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async onClientSelect() {
      const selectedClientId = this.client_id;

      await this.getSiteAccordingClientMethod(selectedClientId);
    },
    async getSiteAccordingClientMethod() {
      if (!this.client_id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/fetch_site_by_client_id/${this.client_id}`
        );
        this.businessUnit = response.data.sites;
        this.options = response.data.jobs;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getCandidate() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.getCandidates = response.data.candidate;
        this.employment_type_id = this.getCandidates.employment_type_id;
        if (this.getCandidates.job_ids && this.getCandidates.job_ids.length) {
          this.job_ids = this.getCandidates.job_ids;
          await this.fetchClientsByJobIds();
        }
        // // this.employment_type_id = this.getCandidates.employment_type_id;
        // await this.getJobOptions();
        // this.employment_type_id = this.getCandidates.employment_type_id;
        // await this.fetchEmploymentTypes();
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    async onSiteSelect() {
      const selectedSiteId = this.site_id;

      await this.getTimeShift(selectedSiteId);
    },

    validateStaffRate() {
      this.validationStaffRate = this.staff_rate !== "" && !isNaN(this.staff_rate);
    },
    onlyNumber(event) {
      const char = String.fromCharCode(event.which);
      if (!/[0-9]/.test(char) || this.staff_rate.length >= 3) {
        event.preventDefault();
      }
    },
    clearFieldsData() {
      setTimeout(() => {
        this.resetForm();
        this.clearError();
      }, 3);
      this.blurActiveElement();
    },

    isFieldEmpty() {
      return (
        !this.weekname.trim() ||
        !this.staff_rate.trim() ||
        !this.site_id.trim() ||
        !this.$route.params.id.trim() ||
        !this.employment_type_id ||
        !this.site_shift.trim() ||
        !this.job_id ||
        !this.client_id ||
        !this.site_shift_id
      );
    },
    async addRateCardMethod() {
      this.employment_type_id = this.getCandidates.employment_type_id;
      this.validationCLient(this.client_id);
      this.validateBusinessUnit(this.site_id);
      this.validateStaffRate(this.staff_rate);
      this.validateJobID(this.job_ids);
      this.validateShiftId(this.site_shift);
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
        client_id: this.client_id,
        candidate_id: this.$route.params.id,
        employment_type_id: this.employment_type_id,
        site_shift_id: this.site_shift_id,
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
    // async getJobTitleMethod() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/active_job_list`);
    //     this.options = response.data.data;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },

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

    async getTimeShift(site_id) {
      if (!site_id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/site_shift/${site_id}`);
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
          })) || [];
        // console.log("Fetched Shifts:", this.shiftsTime);
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
    validateBusinessUnit(newValue) {
      this.validationBusinessUnit = newValue !== "";
    },
    validationCLient(newValue) {
      this.validationSelectedClient = newValue !== "";
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
      this.site_id = "";
      this.job_ids = [];
      this.staff_rate = "";
      this.client_id = "";
      // this.employment_type_id = "";
      this.site_shift_id = "";
      this.clearError();
    },
    clearError() {
      this.validationBusinessUnit = true;
      this.validationStaffRate = true;
      this.validationEmployeeType = true;
      this.validationShiftTime = true;
      this.validationDay = true;
      this.validationPosition = true;
      this.validationSelectedClient = true;
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.addRateCardMethod();
      // vm.this.getJobTitleMethod();
      vm.this.getClientMethod();
      // vm.this.getTimeShift();
      vm.this.getEmployeeTypeData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.addRateCardMethod();
    // this.getJobTitleMethod();
    this.getClientMethod();
    // this.getTimeShift();
    this.getEmployeeTypeData();
    next();
  },
  mounted() {
    // this.addRateCardMethod();
    // this.getJobTitleMethod();
    // this.getBusinessUnitMethod();
    // this.getTimeShift();
    // this.getEmployeeTypeData();
    this.getCandidate();
    // this.getClientMethod();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}

.modal-footer {
  border-top: 0px;
}
select {
  width: 100%;
  padding: 9px;
  border-radius: 3px;
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
