<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addShiftClient"
      aria-labelledby="addShiftClientData"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addShiftClient">Add Shift</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <!-- <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="selectClients" class="form-label">Client</label>
                  </div>
                  <div class="col-10">
                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="onClientSelect"
                      disabled
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
                </div> -->
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit">Site</label>
                  </div>

                  <div class="col-10">
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
                    <!-- <span v-if="!validationSelectedBusinessUnit" class="text-danger"
                      >Site Required</span
                    > -->
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectJobTitle">Job Title</label>
                  </div>
                  <div class="col-10">
                    <select v-model="job_id" id="selectJobTitle" @change="onJobSelect">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <!-- <span v-if="!validationSelectedOptionText" class="text-danger"
                      >Position Required</span
                    > -->
                  </div>
                </div>

                <div class="mb-3 d-flex">
                  <div class="col-2">
                    <label class="form-label">Dated</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="date"
                      class="form-control w-100"
                      v-model="selectedDate"
                      @change="addDate"
                      style="padding-right: 1px"
                    />
                    <span v-if="!validationDateType" class="text-danger"
                      >Please choose a date from today onwards!</span
                    >
                    <div v-if="dates.length > 0" class="mt-2">
                      <span
                        v-for="(date, index) in dates"
                        :key="index"
                        class="badge bg-secondary me-1"
                      >
                        {{ date }}
                        <button
                          class="btn-close btn-sm"
                          @click="removeDate(index)"
                        ></button>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-2">
                      <label class="form-label" for="selectShifts">Shift</label>
                    </div>
                    <div class="col-10">
                      <select
                        v-model="site_shift_id"
                        id="selectShifts"
                        @change="handleShiftChange"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                          aria-placeholder="Select Job"
                        >
                          {{ option.shift_name.replace(/_/g, " ") }}
                        </option>
                      </select>
                      <!-- <span v-if="!validationShift" class="text-danger"
                        >Shift Required</span
                      > -->
                    </div>
                  </div>
                </div>

                <div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-2">
                      <label class="form-label" for="selectShiftStart">Start Time</label>
                    </div>
                    <div class="col-10">
                      <select
                        id="selectShiftStart"
                        class="form-select w-25"
                        v-model="start_time"
                      >
                        <option
                          v-for="shift in shiftsTime"
                          :key="shift.id"
                          :value="shift.start_time"
                          :disabled="shift.id !== site_shift_id"
                          style="display: none"
                        >
                          {{ shift.start_time }}
                        </option>
                        <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                          {{ formatTime(hour) }}
                        </option>
                      </select>
                      <!-- <span v-if="!validationStartTime && !start_time" class="text-danger"
                        >Start Time is required</span
                      > -->
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between">
                    <div class="col-2">
                      <label class="form-label" for="selectShiftEnd">End Time</label>
                    </div>
                    <div class="col-10">
                      <select
                        id="selectShiftEnd"
                        class="form-select w-25"
                        v-model="end_time"
                      >
                        <option
                          v-for="shift in shiftsTime"
                          :key="shift.id"
                          :value="shift.end_time"
                          :disabled="shift.id !== site_shift_id"
                          style="display: none"
                          @change="updateEndDate"
                        >
                          {{ shift.end_time }}
                        </option>
                        <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                          {{ formatTime(hour) }}
                        </option>
                      </select>
                      <!-- <span v-if="!validationEndTime && !end_time" class="text-danger"
                        >End Time is required</span
                      > -->
                    </div>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectShiftsBreak">Break Time</label>
                  </div>
                  <div class="col-10">
                    <select
                      id="selectShiftsBreak"
                      class="form-select w-25"
                      v-model="break"
                      @change="validateBreak"
                    >
                      <option
                        v-for="minute in [15, 30, 45, 60, 75, 90]"
                        :key="minute"
                        :value="minute"
                      >
                        {{ formatBreakTime(minute) }}
                      </option>
                    </select>
                    <!-- <span v-if="!validationBreak && !break" class="text-danger">
                      Break Time is required
                    </span> -->
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectShifts">Staff Required</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control w-25"
                      v-model="staff_required"
                      @input="validateStaffRequired"
                      maxlength="2"
                    />
                    <span
                      v-if="!validationStaffRequired && staff_required < 0"
                      class="text-danger"
                    >
                      Staff Required positive number only
                    </span>
                    <span
                      v-else-if="!validationStaffRequired && staff_required === 0"
                      class="text-danger"
                    >
                      Staff Required invalid
                    </span>
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
                    <!-- <span v-if="!validationNotesText" class="text-danger"
                      >Notes Required</span
                    > -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addShiftClient"
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
              Add Shift
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
    <NotSuccessAlertVue ref="dangerAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../../Alerts/SuccessAlert.vue";
import NotSuccessAlertVue from "../../../Alerts/NotSuccessAlert.vue";
import Swal from "sweetalert2";

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
      validationStaffRate: true,
      private_limited: null,
      validationClientRate: true,
      validationStaffRate: true,
      validationUmbrella: true,
      validationPaye: true,
      validationPrivateLimited: true,
      start_time: null,
      end_time: null,
      break: null,
      hasInteracted: false,
      client_rate: null,
      end_date: "",
      staff_rate: null,
      umbrella: null,
      paye: null,
      private_limited: null,
      site_id: "",
      client_id: localStorage.getItem("c_unique") || "",
      clientData: [],
      job_id: "",
      options: [],
      businessUnit: [],
      dates: [],
      fetchRatesData: [],
      site_shift_id: "",
      shiftsTime: [],
      notes: "",
      staff_required: "",
      selectedClientId: null,
      isValidForm: false,
      selectedDate: null,
      selectedSiteId: null,
      // minDate: this.getTodayDate(),
      // maxDate: this.getLastDayOfMonth(),
    };
  },
  components: { SuccessAlert, NotSuccessAlertVue },
  computed: {
    formattedClientRates() {
      return this.clientRates;
    },
    isFormValid() {
      return (
        this.site_id !== "" &&
        this.client_id !== "" &&
        this.job_id !== "" &&
        this.site_shift_id !== "" &&
        this.notes !== "" &&
        this.staff_required !== "" &&
        this.selectedDate !== null &&
        this.break !== null &&
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationDateType &&
        this.validationStaffRequired
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
  },
  watch: {
    job_id: "validationSelectedOptionText",
    site_id: "validationSelectedBusinessUnit",
    client_id: "validationSelectedClient",
    site_shift_id: "validationShift",
    staff_required: "validationStaffRequired",
    dates: "validationDateType",
    notes: "validationNotesText",

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

    isFormValid: function (newVal) {
      this.isValidForm = newVal;
    },
    end_time(newVal) {
      if (newVal) {
        this.updateEndDate();
      }
    },
  },
  methods: {
    // getTodayDate() {
    //   const today = new Date();
    //   const year = today.getFullYear();
    //   const month = String(today.getMonth() + 1).padStart(2, "0");
    //   const day = String(today.getDate()).padStart(2, "0");
    //   return `${year}-${month}-${day}`;
    // },
    formatRate(rate) {
      return rate.replace(/_/g, " ");
    },
    validateAllRates() {
      this.validateRate("client_rate", this.client_rate);
      this.validateRate("staff_rate", this.staff_rate);
      this.validateRate("umbrella", this.umbrella);
      this.validateRate("paye", this.paye);
      this.validateRate("private_limited", this.private_limited);
    },
    handleInput(field, value) {
      this.hasInteracted = true;

      const filteredValue = value.replace(/[^0-9]/g, "");
      this[field] = filteredValue;

      const isValidNumber = filteredValue.length > 0 && /^[0-9]+$/.test(filteredValue);

      if (this.site_id) {
        this.validateRate(field, filteredValue);

        if (field === "client_rate") {
          this.validationClientRate = isValidNumber;
        } else if (field === "paye") {
          this.validationPaye = isValidNumber;
        } else if (field === "private_limited") {
          this.validationPrivateLimited = isValidNumber;
        } else if (field === "staff_rate") {
          this.validationStaffRate = isValidNumber;
        }
      } else {
        this.validationClientRate = true;
        this.validationPaye = true;
        this.validationPrivateLimited = true;
        this.validationStaffRate = true;
      }
    },

    validateRate(field, value) {
      if (value === null || value === undefined) {
        this[`validation${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
        return;
      }

      const stringValue = value.toString();

      if (stringValue.length > 3) {
        this[field] = stringValue.slice(0, 3);
      }

      this[`validation${field.charAt(0).toUpperCase() + field.slice(1)}`] =
        stringValue > 0 && stringValue.length <= 3;
    },
    handleShiftChange() {
      const selectedShift = this.shiftsTime.find(
        (shift) => shift.id === this.site_shift_id
      );
      if (selectedShift) {
        this.start_time = selectedShift.start_time || "";
        this.end_time = selectedShift.end_time || "";
        this.break = selectedShift.break_duration || "";

        // this.getClientAccordingRatePayFetchMethod(
        //   this.client_id,
        //   this.site_shift_id,
        //   this.job_id,
        //   this.site_id,
        //   this.selectedDate
        // );
      } else {
        this.start_time = "";
        this.end_time = "";
        this.break = "";
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
      if (hour === 0) {
        return "12:00 AM";
      } else if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return "12:00 AM";
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
    formatBreakTimeDisplay(minute) {
      const hours = Math.floor(minute / 60);
      const mins = minute % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours}  `;
      }
      if (mins > 0) {
        formattedTime += `${mins} `;
      }

      return formattedTime.trim();
    },

    async onClientSelect() {
      this.selectedClientId = this.client_id;
      await this.getSiteAccordingClientMethod();
      await this.getJobTitleMethod();
      // this.getSiteAccordingClientMethod(selectedClientId);
      // this.getClientAccordingRatePayFetchMethod(
      //   this.client_id,
      //   this.site_id,
      //   this.job_id
      // );
    },
    async onSiteSelect() {
      this.selectedSiteId = this.site_id;
      await this.getTimeShift(this.selectedSiteId);
      // const siteShiftId = await this.getTimeShift(selectedSiteId);
      // this.getTimeShift(this.selectedSiteId);
      // this.getClientAccordingRatePayFetchMethod(
      //   this.client_id,
      //   selectedSiteId,
      //   this.job_id
      // );
    },
    async onJobSelect() {
      // this.getClientAccordingRatePayFetchMethod(
      //   this.client_id,
      //   this.site_id,
      //   this.job_id
      // );
      // if (this.site_id && this.site_shift_id && this.client_id && this.job_id) {
      //   await this.getClientAccordingRatePayFetchMethod(
      //     this.client_id,
      //     this.site_shift_id,
      //     this.job_id,
      //     this.site_id
      //   );
      // }
    },
    validateStaffRequired() {
      this.staff_required = this.staff_required.replace(/[^0-9]/g, "");
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

    // addDate() {
    //   if (this.selectedDate) {
    //     const currentDate = new Date();
    //     const selectedDate = new Date(this.selectedDate);

    //     if (selectedDate > currentDate || this.isToday(selectedDate, currentDate)) {
    //       const formattedDate = selectedDate.toLocaleDateString("en-GB");
    //       if (!this.dates.includes(formattedDate)) {
    //         this.dates.push(formattedDate);
    //       }
    //       this.selectedDate = "";
    //       this.clearError();
    //       this.validationDateType = true;
    //     } else {
    //       this.validationDateType = false;
    //     }
    //   }
    // },
    addDate() {
      if (this.selectedDate) {
        const currentDate = new Date();
        const selectedDate = new Date(this.selectedDate);

        if (selectedDate > currentDate || this.isToday(selectedDate, currentDate)) {
          const formattedDate = selectedDate.toLocaleDateString("en-GB");

          this.dates = [formattedDate];
          // if (!this.dates.includes(formattedDate)) {
          //   this.dates.push(formattedDate);
          // }
          // this.selectedDate = formattedDate;
          this.handleShiftChange();

          // this.getClientAccordingRatePayFetchMethod(
          //   this.client_id,
          //   this.site_shift_id,
          //   this.job_id,
          //   this.site_id,
          //   this.selectedDate
          // );

          this.clearError();
          this.validationDateType = true;
        } else {
          this.validationDateType = false;
        }
      } else {
        // this.selectedDate = "";
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
    updateEndDate() {
      const endHour = this.parseTimeToHour(this.end_time);

      if (!this.dates || this.dates.length === 0) {
        return;
      }

      if (endHour >= 12) {
        const currentDate = new Date(this.dates[0].split("/").reverse().join("-"));
        currentDate.setDate(currentDate.getDate() + 1);
        this.end_date = this.formatDate(currentDate);
      } else {
        this.end_date = this.dates[0];
      }
    },

    parseTimeToHour(time) {
      const [hour, period] = time.split(" ");
      let hourNumber = parseInt(hour.split(":")[0]);

      if (period === "PM" && hourNumber !== 12) {
        hourNumber += 12;
      } else if (period === "AM" && hourNumber === 12) {
        hourNumber = 0;
      }

      return hourNumber;
    },

    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    async addVacancyMethod() {
      this.validationSelectedOptionText = this.validationSelectedFormate(this.job_id);
      this.validationSelectedBusinessUnit = this.ValidationBusinessUnit(this.site_id);
      this.validationSelectedClient = this.ValidationClient(this.client_id);
      this.validationNotesText = this.ValidationNotes(this.notes);
      this.validationShift = this.ValidationShift(this.site_shift_id);
      this.validationStaffRequired = this.ValidationStaffRequired(this.staff_required);
      this.validationDateType = this.ValidationDate(this.dates);

      if (
        this.validationSelectedOptionText &&
        this.validationSelectedBusinessUnit &&
        this.validationSelectedClient &&
        this.validationNotesText &&
        this.validationShift &&
        this.validationStaffRequired &&
        this.validationDateType
      ) {
        const data = {
          site_id: this.site_id,
          job_id: this.job_id,
          dates: this.dates,
          end_date: this.end_date,
          site_shift_id: this.site_shift_id,
          staff_required: this.staff_required,
          notes: this.notes,
          client_id: this.client_id,
          start_time: this.start_time,
          end_time: this.end_time,
          break: this.break,
        };
        if (this.end_time) data.end_time = this.end_time;
        if (this.start_time) data.start_time = this.start_time;

        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${VITE_API_URL}/create_vacncy`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          if (response.status === 201) {
            this.$emit("addVacancy");
            this.clearFields();
            this.clearError();
            this.removeDate();
            Swal.fire("Success", "Shift added successfully!", "success");
          } else {
            // If status is not 201, handle error scenarios
            let errorData;
            try {
              errorData = await response.json();
            } catch (parseError) {
              errorData = { message: "Unknown error occurred." }; // Default error message
            }

            if (response.status === 200) {
              // Handle 200 OK case with custom error message
              if (errorData.error) {
                // Show the specific error message from the response
                Swal.fire(
                  "Error",
                  errorData.error || "Rate cards are missing. Please contact the agency.",
                  "error"
                );
              } else {
                // Show a generic error message if no specific error message is provided
                Swal.fire(
                  "Error",
                  "An unexpected error occurred. Please try again.",
                  "error"
                );
              }
            } else {
              Swal.fire(
                "Error",
                errorData.message || "Failed to add shift. Please try again.",
                "error"
              );
            }
          }
        } catch (error) {
          Swal.fire("Error", "Please try again.", "error");
        } finally {
          this.clearFieldsData();
        }
      } else {
        Swal.fire(
          "Error",
          "Please create a rate for this client, job, and site shift.",
          "error"
        );
        this.clearFields();
        setTimeout(() => {
          this.clearError();
        }, 100);
      }
    },
    async getJobTitleMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/client_job_list`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
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
      if (!this.client_id) {
        return;
      }
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
    // async getClientAccordingRatePayFetchMethod(
    //   client_id,
    //   site_shift_id,
    //   job_id,
    //   site_id,
    //   selectedDate
    // ) {
    //   const params = {
    //     job_id: job_id,
    //     client_id: client_id,
    //     site_shift_id: site_shift_id,
    //     site_id: site_id,
    //     date: selectedDate,
    //   };

    //   try {
    //     const response = await axios.get(`${VITE_API_URL}/find_rates`, { params });
    //     this.fetchRatesData = response.data.rates;
    //     // console.log(this.fetchRatesData);

    //     if (this.fetchRatesData.length > 0) {
    //       const rates = this.fetchRatesData[0];
    //       this.client_rate = rates.client_rate;
    //       this.staff_rate = rates.staff_rate;
    //       this.umbrella = rates.umbrella_rate;
    //       this.paye = rates.paye_rate;
    //       this.private_limited = rates.private_limited_rate;
    //     } else {
    //       this.client_rate = "";
    //       this.staff_rate = "";
    //       this.umbrella = "";
    //       this.paye = "";
    //       this.private_limited = "";
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status === 404) {
    //         // Handle the 404 error here (e.g., display an alert)
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
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

    async getTimeShift() {
      if (!this.selectedSiteId) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}site_shift/${this.selectedSiteId}`
        );
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,

            start_time: shift.start_time,
            end_time: shift.end_time,
          })) || [];
        if (this.shiftsTime.length > 0) {
          this.site_shift_id = this.shiftsTime[0].id;
          // this.handleShiftChange();
        }
        // return this.shiftsTime.length > 0 ? this.shiftsTime[0].id : null;
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
      this.hasInteracted = false;
      this.validationPaye = true;
      this.validationUmbrella = true;
      // this.selectedDate = null;
    },
    clearFields() {
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

      this.hasInteracted = false;
      this.clearError();
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getClientMethod();

    next();
  },
  async mounted() {
    await this.getSiteAccordingClientMethod();

    // await this.getTimeShift();
    this.getJobTitleMethod();
    this.isValidForm = this.isFormValid;
    await this.clearError();
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
.form-control {
  background-color: #fff;
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
