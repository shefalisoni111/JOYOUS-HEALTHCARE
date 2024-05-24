<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editSingleRateRules"
      aria-labelledby="editSingleRateRules"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSingleRateRules">Edit Rate and Rules</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>

                    <select
                      v-model="fetchRateRulesData.client_id"
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
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit">Site</label>

                    <select
                      v-model="fetchRateRulesData.site_id"
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
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectJobTitle">Jobs</label>

                    <select v-model="fetchRateRulesData.job_id" id="selectJobTitle">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">{{ fetchRateRulesData.day }}</h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>

                        <select
                          v-model="fetchRateRulesData.day_shift_id"
                          @change="handleShiftChange('day')"
                        >
                          <option
                            v-for="option in filteredShiftsTime"
                            :key="option.id"
                            :value="option.id"
                          >
                            {{ option.shift_name }}
                          </option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData.day_start_time"
                          @change="updateStartTime"
                        >
                          <option
                            v-for="shift in filteredShiftsTime"
                            :key="shift.id"
                            :value="shift.start_time"
                            :disabled="shift.id !== day_shift_id"
                          >
                            {{ shift.start_time }}
                          </option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData.day_end_time"
                          @change="updateEndTime"
                        >
                          <option
                            v-for="shift in filteredShiftsTime"
                            :key="shift.id"
                            :value="shift.end_time"
                            :disabled="shift.id !== day_shift_id"
                          >
                            {{ shift.end_time }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select>
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select v-model="fetchRateRulesData.self_employed">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
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
              data-bs-target="#editSingleRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateSingleRate()"
            >
              Update
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

import store from "@/store";
export default {
  name: "VacancyEdit",
  data() {
    return {
      fetchRateRulesData: {
        id: "",
        start_time: null,
        end_time: null,
        day_start_time: null,
        day_end_time: null,
        night_start_time: null,
        night_end_time: null,
        holiday_start_time: null,
        holiday_end_time: null,
        holiday_night_start_time: null,
        holiday_night_end_time: null,
        day_shift_id: null,
        night_shift_id: null,
        client_rate: "",
        self_employed: "",
        private_limited: "",
        day: "",
        umbrella: "",
        paye: "",
        dayShiftId: "",
        nightShiftId: "",

        validationStartTime: true,

        validationEndTime: true,
      },
      businessUnit: [],
      filteredShiftsTimeHolidayNight: [],
      filteredShiftsTimeHoliday: [],
      filteredShiftsTime: [],
      filteredShiftsTimeNight: [],

      filteredShiftsTime: [],
      filteredShiftsTimeNight: [],
      shiftsTime: [],
      clientData: [],
      options: [],
      isDateValid: true,
      selectedDate: "",
      invalidDate: false,
    };
  },
  props: {
    RateRulesId: {
      type: Number,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    selectBusinessUnit() {
      const businessUnit = this.businessUnit.find(
        (option) => option.id === this.fetchRateRulesData.site_id
      );
      return businessUnit ? businessUnit.site_name : "";
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.fetchRateRulesData.client_id
      );
      return client ? client.first_name : "";
    },
    selectShifts() {
      const shift = this.shiftsTime.find(
        (option) => option.id === this.fetchRateRulesData.site_id
      );
      return shift ? shift.shift_name : "";
    },
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchRateRulesData.job_id
      );
      return job_title ? job_title.name : "";
    },
    selectShiftStart() {
      const shift = this.filteredShiftsTime.find(
        (shift) => shift.id === this.day_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEnd() {
      const shift = this.filteredShiftsTime.find(
        (shift) => shift.id === this.day_shift_id
      );
      return shift ? shift.end_time : "";
    },
    selectShiftStartNight() {
      const shift = this.filteredShiftsTimeNight.find(
        (shift) => shift.id === this.night_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEndNight() {
      const shift = this.filteredShiftsTimeNight.find(
        (shift) => shift.id === this.night_shift_id
      );
      return shift ? shift.end_time : "";
    },
  },
  methods: {
    onShiftSelect() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      if (selectedShift) {
        this.fetchRateRulesData.start_time = selectedShift.start_time;
        this.fetchRateRulesData.end_time = selectedShift.end_time;
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
    formatTimes(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
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
    onSiteSelect() {
      this.getTimeShift();
    },

    async fetchRateRulesDataMethod(id) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_and_rules/${id}`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        // console.log(response.data.rate_and_rules);
        const rateAndRules = response.data.rate_and_rules;

        if (rateAndRules && rateAndRules.id !== undefined) {
          this.fetchRateRulesData = {
            id: rateAndRules.id,
            client_id: rateAndRules.client_id,
            site: rateAndRules.site,
            job_id: rateAndRules.job_id,
            day: rateAndRules.day,
            client_rate: rateAndRules.client_rate,
            self_employed: rateAndRules.self_employed,
            private_limited: rateAndRules.private_limited,
            start_time: rateAndRules.start_time,
            end_time: rateAndRules.end_time,
            paye: rateAndRules.paye,
            umbrella: rateAndRules.umbrella,
            site_id: rateAndRules.site_id,
            shift_type: rateAndRules.shift_type,
            // Add other necessary fields here
          };
        }
      } catch (error) {}
    },

    async updateSingleRate() {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.put(
          `${VITE_API_URL}/update_multiple_rates/${this.fetchRateRulesData.id}`,
          {
            id: this.fetchRateRulesData.id,
            site_id: this.fetchRateRulesData.site_id,
            client_id: this.fetchRateRulesData.client_id,
            day: this.fetchRateRulesData.day,
            job_id: this.fetchRateRulesData.job_id,
            day_shift_id: this.fetchRateRulesData.day_shift_id,
            night_shift_id: this.fetchRateRulesData.night_shift_id,
            site_shift_id: this.fetchRateRulesData.site_shift_id,
            day_start_time: this.fetchRateRulesData.day_start_time,
            day_end_time: this.fetchRateRulesData.day_end_time,
            night_start_time: this.fetchRateRulesData.night_start_time,
            night_end_time: this.fetchRateRulesData.night_end_time,
            start_time: this.fetchRateRulesData.start_time,
            end_time: this.fetchRateRulesData.end_time,
            // break: this.fetchRateRulesData.break,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.$emit("editUpdatedRateRules");

        // alert("Vacancy updated successfully");
        const message = "Rate and Rules Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
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
    // async getTimeShifts() {
    //   await axios
    //     .get(`${VITE_API_URL}/shifts`)
    //     .then((response) => (this.shiftsTime = response.data));
    // },
    async getTimeShift(siteId) {
      if (!siteId) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/site_shift/${siteId}`);

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
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
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
  },

  mounted() {
    this.getBusinessUnitMethod();
    // this.getSiteAccordingClientMethod();
    this.getClientMethod();
    this.getTimeShift();
    this.getJobTitleMethod();
  },
  watch: {
    "fetchRateRulesData.site_id": {
      immediate: true,
      handler(newSiteId) {
        this.getTimeShift(newSiteId);
      },
      fetchRateRulesData: {
        deep: true,
        handler() {
          this.validateDates();
        },
      },
    },
    RateRulesId: {
      immediate: true,
      handler(newVacancyID) {
        if (newVacancyID !== 0) {
          this.fetchRateRulesDataMethod(newVacancyID);
        } else {
        }
      },
    },
  },
};
</script>

<style scoped>
.modal {
  --bs-modal-width: 1311px;
}
select {
  width: 100% !important;
  padding: 10px !important;
  border-radius: 4px;
  border: 0px;
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
</style>
