<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editSingleRateRules"
      aria-labelledby="editSingleRateRules"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSingleRateRules">
              Edit Rate and Rules
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
                        {{ option.client_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit"
                      >Site</label
                    >

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

                <div class="mt-2" style="padding: 10px; border-radius: 3px">
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData.day }}
                  </h5>

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
                              {{ option.shift_name.replace(/_/g, " ") }}
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
                              {{ option.shift_name.replace(/_/g, " ") }}
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

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
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchRateRulesData.client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              fetchRateRulesData.client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchRateRulesData.private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              fetchRateRulesData.private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="fetchRateRulesData.self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchRateRulesData.self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              fetchRateRulesData.self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchRateRulesData.umbrella"
                          @input="
                            handleInput(`umbrella`, fetchRateRulesData.umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData.paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="fetchRateRulesData.paye"
                          @input="handleInput(`paye`, fetchRateRulesData.paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editSingleRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
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
      currentPage: 1,
      totalPages: 0,
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
    // selectClients() {
    //   const client_id = this.clientData.find((option) => option.id === this.client_id);
    //  return clientData ? clientData.first_name : "";
    // },
    selectClients() {
      const clientData = this.clientData.find(
        (option) => option.id === this.fetchRateRulesData.ClientID
      );
      return clientData ? clientData.client_name : "";
    },
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
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    handleInput(field, value) {
      const filteredValue = value.replace(/[^0-9]/g, "");

      if (field === "clientRate") {
        this.fetchRateRulesData.client_rate = filteredValue;
      } else if (field === "privateLimited") {
        this.fetchRateRulesData.private_limited = filteredValue;
      } else if (field === "selfEmployee") {
        this.fetchRateRulesData.self_employed = filteredValue;
      } else if (field === "umbrella") {
        this.fetchRateRulesData.umbrella = filteredValue;
      } else if (field === "paye") {
        this.fetchRateRulesData.paye = filteredValue;
      }
    },
    async onSiteSelect() {
      const selectedSiteId = this.site_id;
      await this.getTimeShift(selectedSiteId);
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
        const response = await axios.get(
          `${VITE_API_URL}/rate_and_rules/${id}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
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
            start_time: rateAndRules.start_time,
            end_time: rateAndRules.end_time,
            paye: rateAndRules.paye,
            umbrella: rateAndRules.umbrella,
            site_id: rateAndRules.site_id,
            shift_type: rateAndRules.shift_type.replace(/_/g, " "),
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
            start_time: this.fetchRateRulesData.start_time,
            end_time: this.fetchRateRulesData.end_time,
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
        this.clientData = response.data.site;
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
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${siteId}`
        );

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
      return `${String(formattedHours).padStart(
        2,
        "0"
      )}:${formattedMinutes} ${amPm}`;
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
      vm.getClientMethod();
      vm.getTimeShift();
      vm.getJobTitleMethod();
      // vm.getSiteAccordingClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getBusinessUnitMethod();
    this.getClientMethod();
    // this.getSiteAccordingClientMethod();
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
  async mounted() {
    await this.getClientMethod();
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
}
.form-control {
  background: #fffaf6;
  padding: 0.6rem 0.75rem;
}
.modal-body {
  border-radius: 5px;
}
</style>
