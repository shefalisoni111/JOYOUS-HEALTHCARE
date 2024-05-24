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
                  </div>
                </div>

                <div
                  v-for="(day, index) in days"
                  :key="index"
                  :value="day"
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">{{ day }}</h5>
                  <template v-if="day !== 'Saturday' && day !== 'Sunday'">
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="day_shift_id"
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
                            v-model="day_start_time"
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
                            v-model="day_end_time"
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
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Client Rate</label>

                          <select class="form-select w-25" v-model="client_rate">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select class="form-select w-25" v-model="private_limited_day">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select v-model="self_employed_day">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>
                          <select class="form-select w-25" v-model="umbrella_day">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select class="form-select w-25" v-model="paye">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="night_shift_id"
                            @change="handleShiftChange('night')"
                          >
                            <option
                              v-for="option in filteredShiftsTimeNight"
                              :key="option.id"
                              :value="option.id"
                              aria-placeholder="Select Job"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftStartNight"
                            >Start Time</label
                          >

                          <select
                            id="selectShiftStartNight"
                            class="form-select w-25"
                            v-model="night_start_time"
                            @change="updateStartTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeNight"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== night_shift_id"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftEndNight"
                            >End Time</label
                          >

                          <select
                            id="selectShiftEndNight"
                            class="form-select w-25"
                            v-model="night_end_time"
                            @change="updateEndTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeNight"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== night_shift_id"
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
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Client Rate</label>

                          <select class="form-select w-25" v-model="client_rate">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="private_limited_night"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select v-model="self_employed_night">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select class="form-select w-25" v-model="umbrella_night">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select class="form-select w-25" v-model="paye">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="dayShiftId"
                            @change="handleShiftChange('holiday_day_shift')"
                          >
                            <option
                              v-for="option in filteredShiftsTimeHoliday"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Start Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_start_time"
                            @change="updateStartTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHoliday"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== dayShiftId"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">End Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_end_time"
                            @change="updateEndTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHoliday"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== dayShiftId"
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
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Client Rate</label>

                          <select class="form-select w-25" v-model="client_rate">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="private_limited_holiday_day"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select v-model="self_employed_holiday_day">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>
                          <select class="form-select w-25" v-model="umbrella_holiday_day">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select class="form-select w-25" v-model="paye">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="nightShiftId"
                            @change="handleShiftChange('holiday_night_shift')"
                          >
                            <option
                              v-for="option in filteredShiftsTimeHolidayNight"
                              :key="option.id"
                              :value="option.id"
                              aria-placeholder="Select Job"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Start Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_night_start_time"
                            @change="updateStartTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHolidayNight"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== nightShiftId"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">End Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_night_end_time"
                            @change="updateEndTime"
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHolidayNight"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== nightShiftId"
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
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Client Rate</label>

                          <select class="form-select w-25" v-model="client_rate">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="private_limited_holiday_night"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select v-model="self_employed_holiday_night">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select
                            class="form-select w-25"
                            v-model="umbrella_holiday_night"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select class="form-select w-25" v-model="paye">
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
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
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
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
  name: "AddRateRules",
  data() {
    return {
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
      shift_type: "",
      dayShiftId: "",
      nightShiftId: "",
      filteredShiftsTime: [],
      filteredShiftsTimeNight: [],
      validationStartTime: true,
      filteredShiftsTimeHoliday: [],
      filteredShiftsTimeHolidayNight: [],
      validationEndTime: true,
      client_rate_day: null,
      client_rate_night: null,
      client_rate_holiday_day: null,
      client_rate_holiday_night: null,

      private_limited_day: null,
      private_limited_night: null,
      private_limited_holiday_day: null,
      private_limited_holiday_night: null,
      self_employed_day: null,
      self_employed_night: null,
      self_employed_holiday_day: null,
      self_employed_holiday_night: null,
      umbrella_day: null,
      umbrella_night: null,
      umbrella_holiday_day: null,
      umbrella_holiday_night: null,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],

      clientRateModels: [{ value: null }, { value: null }],
      showDayShift: true,
      showNightShift: false,
      site_id: null,
      client_id: "",
      clientData: [],
      job_id: "",
      options: [],
      businessUnit: [],

      site_shift_id: "",
      shiftsTime: [],

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
        this.day_shift_id !== null &&
        this.night_shift_id !== null &&
        this.client_rate !== "" &&
        this.self_employed !== "" &&
        this.private_limited !== "" &&
        this.day_start_time !== null &&
        this.day_end_time !== null &&
        this.night_start_time !== null &&
        this.night_end_time !== null &&
        this.umbrella !== null &&
        this.paye !== null
        // this.client_rate !== null &&
        // this.private_limited !== null &&
        // this.self_employed !== null &&
        // this.client_rate_day !== null &&
        // this.client_rate_night !== null &&
        // this.client_rate_holiday_day !== null &&
        // this.client_rate_holiday_night !== null &&
        // this.private_limited_day !== null &&
        // this.private_limited_night !== null &&
        // this.private_limited_holiday_day !== null &&
        // this.private_limited_holiday_night !== null &&
        // this.self_employed_day !== null &&
        // this.self_employed_night !== null &&
        // this.self_employed_holiday_day !== null &&
        // this.self_employed_holiday_night !== null &&
        // this.umbrella_day !== null &&
        // this.umbrella_night !== null &&
        // this.umbrella_holiday_day !== null &&
        // this.umbrella_holiday_night !== null &&
        // this.holiday_start_time !== null &&
        // this.holiday_end_time !== null &&
        // this.holiday_night_start_time !== null &&
        // this.holiday_night_end_time !== null

        // this.validationBreak
      );
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
  watch: {
    client_rate(newVal) {
      // console.log("client_rate changed to:", newVal);
    },
  },
  methods: {
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
    onClientSelect() {
      const selectedClientId = this.client_id;

      this.getJobTitleMethod(selectedClientId);
      this.getSiteAccordingClientMethod(selectedClientId);
    },
    async onSiteSelect() {
      const selectedSiteId = this.site_id;
      await this.getTimeShift(selectedSiteId);
      const dayShift = this.filteredShiftsTime.find(
        (shift) => shift.shift_name.toLowerCase() === "day_shift"
      );
      if (dayShift) {
        this.day_shift_id = dayShift.id;
        this.day_start_time = dayShift.start_time;
        this.day_end_time = dayShift.end_time;
      }

      const nightShift = this.filteredShiftsTimeNight.find(
        (shift) => shift.shift_name.toLowerCase() === "night_shift"
      );
      if (nightShift) {
        this.night_shift_id = nightShift.id;
        this.night_start_time = nightShift.start_time;
        this.night_end_time = nightShift.end_time;
      }

      const holidayDayShift = this.filteredShiftsTimeHoliday.find(
        (shift) => shift.shift_name.toLowerCase() === "holiday_day_shift"
      );
      if (holidayDayShift) {
        this.dayShiftId = holidayDayShift.id;
        this.holiday_start_time = holidayDayShift.start_time;
        this.holiday_end_time = holidayDayShift.end_time;
      }

      const holidayNightShift = this.filteredShiftsTimeHolidayNight.find(
        (shift) => shift.shift_name.toLowerCase() === "holiday_night_shift"
      );
      if (holidayNightShift) {
        this.nightShiftId = holidayNightShift.id;
        this.holiday_night_start_time = holidayNightShift.start_time;
        this.holiday_night_end_time = holidayNightShift.end_time;
      }
    },

    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        // this.clearError();
      }, 10);
    },

    async addVacancyMethod() {
      const rateAndRules = [];

      this.days.forEach((day) => {
        let dayShiftEntry = {};
        let nightShiftEntry = {};

        if (day === "Saturday" || day === "Sunday") {
          this.dayShiftId = day === "Saturday" ? 16 : 16;
          this.nightShiftId = day === "Saturday" ? 13 : 13;

          dayShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: this.client_rate || "",
            self_employed: this.shifts?.self_employed_holiday_day || "",
            private_limited: this.shifts?.private_limited_holiday_day || "",
            umbrella: this.shifts?.umbrella_holiday_day || "",
            site_shift_id: this.dayShiftId,
            client_id: this.client_id,
            start_time: this.holiday_start_time,
            end_time: this.holiday_end_time,
            paye: this.paye,
            holiday_start_time: this.holiday_start_time,
            holiday_end_time: this.holiday_end_time,
            holiday_night_start_time: this.holiday_night_start_time,
            holiday_night_end_time: this.holiday_night_end_time,
          };

          nightShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: this.client_rate || "",
            self_employed: this.shifts?.self_employed_holiday_night || "",
            private_limited: this.shifts?.private_limited_holiday_night || "",
            umbrella: this.shifts?.umbrella_holiday_night || "",
            site_shift_id: this.nightShiftId,
            client_id: this.client_id,
            start_time: this.night_start_time,
            end_time: this.night_end_time,
            paye: this.paye,
            holiday_start_time: this.holiday_start_time,
            holiday_end_time: this.holiday_end_time,
            holiday_night_start_time: this.holiday_night_start_time,
            holiday_night_end_time: this.holiday_night_end_time,
          };
        } else {
          dayShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: this.client_rate || "",
            self_employed: this.shifts?.self_employed_day || "",
            private_limited: this.shifts?.private_limited_day || "",
            umbrella: this.shifts?.umbrella_day || "",
            site_shift_id: this.day_shift_id,
            client_id: this.client_id,
            start_time: this.day_start_time,
            end_time: this.day_end_time,
            paye: this.paye,
            holiday_start_time: this.holiday_start_time,
            holiday_end_time: this.holiday_end_time,
            holiday_night_start_time: this.holiday_night_start_time,
            holiday_night_end_time: this.holiday_night_end_time,
          };

          nightShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate_night: this.client_rate || "",
            self_employed: this.shifts?.self_employed_night || "",
            private_limited: this.shifts?.private_limited_night || "",
            umbrella: this.shifts?.umbrella_night || "",
            site_shift_id: this.night_shift_id,
            client_id: this.client_id,
            start_time: this.night_start_time,
            end_time: this.night_end_time,
            paye: this.paye,
            holiday_start_time: this.holiday_start_time,
            holiday_end_time: this.holiday_end_time,
            holiday_night_start_time: this.holiday_night_start_time,
            holiday_night_end_time: this.holiday_night_end_time,
          };
        }

        rateAndRules.push(dayShiftEntry, nightShiftEntry);
      });
      // console.log("Rate and Rules:", rateAndRules);
      const data = { rate_and_rules: rateAndRules };

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_API_URL}/create_multiple_rates_and_rules`, {
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
            // this.clearError();
          }, 100);
          this.$emit("UpdatedRateRules");
          // alert("Successful Shift added");
          const message = "Rate and Rules Added Successful ";
          this.$refs.successAlert.showSuccess(message);
        } else {
        }
      } catch (error) {}
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
    handleShiftChange(shiftType) {
      if (shiftType === "day") {
        const selectedShift = this.filteredShiftsTime.find(
          (shift) => shift.id === this.day_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "night") {
        const selectedShift = this.filteredShiftsTimeNight.find(
          (shift) => shift.id === this.night_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "holiday_day_shift") {
        const selectedShift = this.filteredShiftsTimeHoliday.find(
          (shift) => shift.id === this.night_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "holiday_night_shift") {
        const selectedShift = this.filteredShiftsTimeHolidayNight.find(
          (shift) => shift.id === this.night_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
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

    async getTimeShift() {
      try {
        const response = await axios.get(`${VITE_API_URL}site_shift/${this.site_id}`);
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
          })) || [];
        this.filteredShiftsTime = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "day_shift"
        );

        this.filteredShiftsTimeNight = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "night_shift"
        );

        this.filteredShiftsTimeHoliday = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "holiday_day_shift"
        );
        this.filteredShiftsTimeHolidayNight = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "holiday_night_shift"
        );

        if (this.filteredShiftsTime.length === 0) {
          this.filteredShiftsTime = this.shiftsTime;
        }
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

    // clearError() {
    //   this.validationSelectedOptionText = true;
    //   this.validationSelectedBusinessUnit = true;
    //   this.validationSelectedClient = true;
    //   this.validationNotesText = true;
    //   this.validationShift = true;
    //   (this.validationStartTime = true),
    //     (this.validationEndTime = true),
    //     (this.validationStaffRequired = true),
    //     (this.validationDateType = true),
    //     (this.validationBreak = true);
    // },
    clearFields() {
      this.site_id = "";
      this.client_id = "";
      this.job_id = "";

      this.site_shift_id = "";
      this.start_time = "";
      this.end_time = "";

      (this.options = []),
        (this.businessUnit = []),
        (this.shiftsTime = []),
        (this.selectedDate = null);
    },
  },
  mounted() {
    // this.getBusinessUnitMethod();
    // this.getJobTitleMethod();
    this.getClientMethod();
    // this.getSiteAccordingClientMethod();
    this.getTimeShift();
    this.isValidForm = this.isFormValid;
    // this.clearError();
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
