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
            <!-- {{ console.log(fetchRateRulesData) }} -->
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>

                    <select
                      v-model="fetchRateRulesData.client_id"
                      id="selectClients"
                      @change="onClientSelect"
                      :disabled="true"
                      class="text-black"
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
                      :disabled="true"
                      class="text-black"
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

                    <select
                      v-model="fetchRateRulesData.job_id"
                      id="selectJobTitle"
                      :disabled="true"
                      class="text-black"
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
                        <template
                          v-if="
                            fetchRateRulesData.day !== 'Saturday' &&
                            fetchRateRulesData.day !== 'Sunday'
                          "
                        >
                          <select
                            v-model="fetchRateRulesData.site_shift_id"
                            :disabled="true"
                            class="form-select w-25 text-black"
                          >
                            <option
                              v-for="option in shiftsTime"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </template>
                        <template v-else>
                          <select
                            v-model="fetchRateRulesData.site_shift_id"
                            :disabled="true"
                          >
                            <option
                              v-for="option in shiftsTime"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </template>
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData.start_time"
                          :disabled="true"
                          @change="updateStartTime"
                        >
                          <option
                            v-for="hour in 24"
                            :key="hour"
                            :value="formatTime(hour)"
                          >
                            {{ formatTime(hour) }}
                          </option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData.end_time"
                          :disabled="true"
                          @change="updateEndTime"
                        >
                          <option
                            v-for="hour in 24"
                            :key="hour"
                            :value="formatTime(hour)"
                          >
                            {{ formatTime(hour) }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData.rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
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

                        <select
                          v-model="fetchRateRulesData.self_employed"
                          class="form-select w-25"
                        >
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
        // day_start_time: null,
        // day_end_time: null,
        // night_start_time: null,
        // night_end_time: null,
        // holiday_start_time: null,
        // holiday_end_time: null,
        // holiday_night_start_time: null,
        // holiday_night_end_time: null,
        // day_shift_id: null,
        site_shift_id: "",
        night_shift_id: null,
        client_rate: "",
        rate_type: "",
        self_employed: "",
        private_limited: "",
        day: "",
        umbrella: "",
        paye: "",
        dayShiftId: "",
        nightShiftId: "",
        client_id: "",
        validationStartTime: true,

        validationEndTime: true,
      },
      businessUnit: [],

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
    ClientID: {
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
      const clientData = this.clientData.find(
        (option) => option.id === this.fetchRateRulesData.client_id
      );
      return clientData ? clientData.first_name : "";
    },
    // selectClients() {
    //   const client = this.clientData.find(
    //     (option) => option.id === this.fetchRateRulesData.ClientID
    //   );
    //   return client ? client.first_name : "";
    // },
    selectShifts() {
      this.shiftsTime();
      const shift = this.shiftsTime.find(
        (option) => option.id === this.fetchRateRulesData.site_shift_id
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
      this.shiftsTime();
      const shift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEnd() {
      this.shiftsTime();
      const shift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      return shift ? shift.end_time : "";
    },
    selectShiftStartNight() {
      this.shiftsTime();
      const shift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEndNight() {
      this.shiftsTime();
      const shift = this.shiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      return shift ? shift.end_time : "";
    },
  },
  methods: {
    async onSiteSelect() {
      const selectedSiteId = this.site_id;
      await this.getTimeShift(selectedSiteId);
      const dayShift = this.getTimeShift.find(
        (shift) => shift.shift_name.toLowerCase() === "day_shift"
      );
      if (dayShift) {
        this.fetchRateRulesData.site_shift_id = dayShift.id;
        this.fetchRateRulesData.start_time = dayShift.start_time;
        this.fetchRateRulesData.end_time = dayShift.end_time;
      }

      const nightShift = this.getTimeShift.find(
        (shift) => shift.shift_name.toLowerCase() === "night_shift"
      );
      if (nightShift) {
        this.fetchRateRulesData.site_shift_id = nightShift.id;
        this.fetchRateRulesData.start_time = nightShift.start_time;
        this.fetchRateRulesData.end_time = nightShift.end_time;
      }

      const holidayDayShift = this.getTimeShift.find(
        (shift) => shift.shift_name.toLowerCase() === "holiday_day_shift"
      );
      if (holidayDayShift) {
        this.fetchRateRulesData.site_shift_id = holidayDayShift.id;
        this.fetchRateRulesData.start_time = holidayDayShift.start_time;
        this.fetchRateRulesData.end_time = holidayDayShift.end_time;
      }

      const holidayNightShift = this.getTimeShift.find(
        (shift) => shift.shift_name.toLowerCase() === "holiday_night_shift"
      );
      if (holidayNightShift) {
        this.fetchRateRulesData.site_shift_id = holidayNightShift.id;
        this.fetchRateRulesData.start_time = holidayNightShift.start_time;
        this.fetchRateRulesData.end_time = holidayNightShift.end_time;
      }
    },
    onShiftSelect() {
      const selectedShift = this.filteredShiftsTime.find(
        (shift) => shift.id === this.fetchRateRulesData.site_shift_id
      );
      if (selectedShift) {
        this.fetchRateRulesData.shift_type = selectedShift.shift_type;
      }
    },
    formatTime(hour) {
      if (typeof hour !== "number" || hour < 0 || hour >= 24) {
        return "Invalid Time";
      }
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
    },
    formatFrom24HourTo12Hour(timeString) {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
    },
    formatTimes(hour) {
      return this.formatTime(hour);
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
            site_shift_id: rateAndRules.site_shift_id,
            day: rateAndRules.day,
            rate_type: rateAndRules.rate_type,
            client_rate: rateAndRules.client_rate,
            self_employed: rateAndRules.self_employed,
            private_limited: rateAndRules.private_limited,
            start_time: this.formatFrom24HourTo12Hour(rateAndRules.start_time),
            end_time: this.formatFrom24HourTo12Hour(rateAndRules.end_time),
            paye: rateAndRules.paye,
            umbrella: rateAndRules.umbrella,
            site_id: rateAndRules.site_id,
            shift_type: rateAndRules.shift_type,
            // Add other necessary fields here
          };
          this.getTimeShift(rateAndRules.site_id);
        }
      } catch (error) {}
    },
    convertTo24Hour(timeString) {
      const [time, period] = timeString.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      if (period === "PM" && hours !== 12) {
        hours += 12;
      }
      if (period === "AM" && hours === 12) {
        hours = 0;
      }
      return `${String(hours).padStart(2, "0")}:${minutes}:00`;
    },
    async updateSingleRate() {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.put(
          `${VITE_API_URL}/rate_and_rules/${this.fetchRateRulesData.id}`,
          {
            id: this.fetchRateRulesData.id,
            site_id: this.fetchRateRulesData.site_id,
            client_id: this.fetchRateRulesData.client_id,
            day: this.fetchRateRulesData.day,
            job_id: this.fetchRateRulesData.job_id,
            day_shift_id: this.fetchRateRulesData.day_shift_id,
            night_shift_id: this.fetchRateRulesData.night_shift_id,
            site_shift_id: this.fetchRateRulesData.site_shift_id,
            rate_type: this.fetchRateRulesData.rate_type,
            start_time: this.convertTo24Hour(this.fetchRateRulesData.start_time),
            end_time: this.convertTo24Hour(this.fetchRateRulesData.end_time),
            client_rate: this.fetchRateRulesData.client_rate,
            self_employed: this.fetchRateRulesData.self_employed,
            private_limited: this.fetchRateRulesData.private_limited,
            umbrella: this.fetchRateRulesData.umbrella,
            paye: this.fetchRateRulesData.paye,
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
          `${VITE_API_URL}/site_according_client/${this.ClientID}`
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
    // async getClientMethod() {
    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/clients`);
    //     this.clientData = response.data.data;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
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
            site_shift_id: shift.id,
            start_time: shift.start_time,
            end_time: shift.end_time,
          })) || [];
        // console.log(this.shiftsTime);
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },

    convertTimeFormat(timeString) {
      if (!timeString) {
        return "";
      }

      const dateTimeString = `1970-01-01T${timeString}Z`;
      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        // console.error(`Invalid date string: ${timeString}`);
        return "";
      }

      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${String(formattedHours).padStart(2, "0")}:${formattedMinutes} ${amPm}`;
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
  watch: {
    "fetchRateRulesData.site_id": "getTimeShift",
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
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getBusinessUnitMethod();
      // vm.getClientMethod();
      vm.getTimeShift();
      vm.getJobTitleMethod();
      vm.getSiteAccordingClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getBusinessUnitMethod();
    // this.getClientMethod();
    this.getSiteAccordingClientMethod();
    this.getTimeShift();
    this.getJobTitleMethod();
    next();
  },
  // mounted() {
  //   this.getBusinessUnitMethod();
  //   // this.getSiteAccordingClientMethod();
  //   this.getClientMethod();
  //   this.getTimeShift();
  //   this.getJobTitleMethod();
  // },
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
