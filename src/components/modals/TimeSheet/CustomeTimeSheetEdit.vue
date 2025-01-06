<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCustomTimeSheet"
      aria-labelledby="editCustomTimeSheet"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="editCustomTimeSheet">
              Edit Custom Shift {{ customDataId }}
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Assign To</label>
                      <!-- <input
                        type="text"
                        class="form-control text-capitalize"
                        v-model="
                          fetchCustomTimeShetData.name
                            ? fetchCustomTimeShetData.candidate_name
                            : ''
                        "
                        aria-describedby="name"
                        readonly
                      /> -->

                      <input
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomSheetData.name"
                        type="text"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomSheetData.site"
                        aria-describedby="site"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Position</label>
                      <input
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomSheetData.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>

                      <input
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomSheetData.shift_date"
                        type="text"
                        readonly
                      />
                      <!-- <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomSheetData.shift_date"
                        aria-describedby="date"
                        readonly
                      /> -->
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Shift</label>
                      <input
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomSheetData.shift_name"
                        aria-describedby="position"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Rate Cards</label>
                    <div class="d-flex gap-2 justify-content-between">
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Start Time</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomSheetData.start_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomStartTime"
                            >Start Time</label
                          >
                        </div>
                        <div class="col-12" v-if="showSaveButton">
                          <input
                            v-if="apiResponse"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.start_time"
                            disabled
                          />
                          <div
                            v-else
                            style="display: flex; gap: 8px; align-items: center"
                          >
                            <!-- Hour Dropdown -->
                            <select
                              id="selectCustomHourStart"
                              class="form-control"
                              v-model="startTime.hour"
                              @change="updateStartTime"
                              style="width: 80px"
                            >
                              <option v-for="hour in 24" :key="hour" :value="hour">
                                {{ formatTime(hour) }}
                                <!-- Only the time portion -->
                              </option>
                            </select>
                            <!-- Minute Dropdown -->
                            <select
                              id="selectCustomMinuteStart"
                              class="form-control"
                              v-model="startTime.minute"
                              @change="updateStartTime"
                              style="width: 80px"
                            >
                              <option
                                v-for="minute in 60"
                                :key="minute"
                                :value="minute - 1"
                              >
                                {{ minute - 1 < 10 ? "0" + (minute - 1) : minute - 1 }}
                              </option>
                            </select>
                            <!-- AM/PM Dropdown -->
                            <select
                              id="selectCustomPeriodStart"
                              class="form-control"
                              v-model="startTime.period"
                              @change="updateStartTime"
                              style="width: 80px"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-12" v-else>
                          <input
                            v-if="apiResponse"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.start_time"
                            disabled
                          />
                          <div
                            v-else
                            style="display: flex; gap: 8px; align-items: center"
                          >
                            <select
                              id="selectCustomHourStart"
                              class="form-control custom-disabled"
                              disabled
                            >
                              <option v-for="hour in 24" :key="hour" :value="hour">
                                {{ formatTime(hour) }}
                                <!-- Only the time portion -->
                              </option>
                            </select>
                            <select
                              id="selectCustomMinuteStart"
                              class="form-control custom-disabled"
                              disabled
                            >
                              <option
                                v-for="minute in 60"
                                :key="minute"
                                :value="minute - 1"
                              >
                                {{ minute - 1 < 10 ? "0" + (minute - 1) : minute - 1 }}
                              </option>
                            </select>
                            <select
                              id="selectCustomPeriodStart"
                              class="form-control custom-disabled"
                              disabled
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">End Time</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomSheetData.end_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="mb-3">
                          <div class="col-12">
                            <label class="form-label" for="selectCustomEndTime"
                              >End Time</label
                            >
                          </div>
                          <div class="col-12" v-if="showSaveButton">
                            <input
                              v-if="apiResponse_EndTime"
                              type="text"
                              class="form-control"
                              v-model="fetchCustomSheetData.end_time"
                              disabled
                            />
                            <div
                              v-else
                              style="display: flex; gap: 8px; align-items: center"
                            >
                              <!-- Hour Dropdown -->
                              <select
                                id="selectCustomHour"
                                class="form-control"
                                v-model="endTime.hour"
                                @change="updateEndTime"
                                style="width: 80px"
                              >
                                <option v-for="hour in 24" :key="hour" :value="hour">
                                  {{ formatTime(hour) }}
                                  <!-- Only the time portion -->
                                </option>
                              </select>
                              <!-- Minute Dropdown -->
                              <select
                                id="selectCustomMinute"
                                class="form-control"
                                v-model="endTime.minute"
                                @change="updateEndTime"
                                style="width: 80px"
                              >
                                <option
                                  v-for="minute in 60"
                                  :key="minute"
                                  :value="minute - 1"
                                >
                                  {{ minute - 1 < 10 ? "0" + (minute - 1) : minute - 1 }}
                                </option>
                              </select>
                              <!-- AM/PM Dropdown -->
                              <select
                                id="selectCustomPeriod"
                                class="form-control"
                                v-model="endTime.period"
                                @change="updateEndTime"
                                style="width: 80px"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-12" v-else>
                            <input
                              v-if="apiResponse_EndTime"
                              type="text"
                              class="form-control custom-disabled"
                              v-model="fetchCustomSheetData.end_time"
                              disabled
                            />
                            <div
                              v-else
                              style="display: flex; gap: 8px; align-items: center"
                            >
                              <select
                                id="selectCustomHour"
                                class="form-control custom-disabled"
                                disabled
                              >
                                <option v-for="hour in 24" :key="hour" :value="hour">
                                  {{ formatTime(hour) }}
                                  <!-- Only the time portion -->
                                </option>
                              </select>
                              <select
                                id="selectCustomMinute"
                                class="form-control custom-disabled"
                                disabled
                              >
                                <option
                                  v-for="minute in 60"
                                  :key="minute"
                                  :value="minute - 1"
                                >
                                  {{ minute - 1 < 10 ? "0" + (minute - 1) : minute - 1 }}
                                </option>
                              </select>
                              <select
                                id="selectCustomPeriod"
                                class="form-control custom-disabled"
                                disabled
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Break</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomSheetData.break"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectShiftsBreak"
                            >Break Time</label
                          >
                        </div>
                        <div class="col-12" v-if="showSaveButton">
                          <!-- <input
                            type="email"
                            class="form-control p-2 custom-disabled"
                            v-model="fetchCustomSheetData.break"
                          /> -->
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchCustomSheetData.break"
                            @change="validateBreak"
                            style="width: 240px"
                          >
                            <option
                              v-for="minute in [15, 30, 45, 60, 75, 90]"
                              :key="minute"
                              :value="minute + ' minutes'"
                            >
                              {{ formatBreakTime(minute) }}
                            </option>
                          </select>
                        </div>
                        <!-- <div class="col-12" v-else>
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchCustomSheetData.break"
                            @change="validateBreak"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="minute in [15, 30, 45, 60, 75, 90]"
                              :key="minute"
                              :value="minute"
                            >
                              {{ formatBreakTime(minute) }}
                            </option>
                          </select>
                        </div> -->
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Total Hours</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomSheetData.total_hours"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex gap-5 ms-2">
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Rate</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomSheetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Comments</label>
                    </div>
                    <div class="col-12 mt-1" v-if="showSaveButton">
                      <textarea
                        class="form-control"
                        v-model="fetchCustomSheetData.notes"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <textarea
                        class="form-control"
                        v-model="fetchCustomSheetData.notes"
                        rows="3"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Paper TimeSheet</label>
                    </div>
                    <div class="col-12 mt-1" v-if="fullCustomImageUrl">
                      <img
                        :src="fullCustomImageUrl"
                        alt="Current Paper TimeSheet"
                        class="img-fluid"
                        width="10%"
                      />
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <input
                        type="file"
                        class="form-control"
                        accept="image/*"
                        @change="handleFileUpload"
                      />
                      <!-- <span v-if="!validationPaperTimeSheet" class="text-danger">
                        Paper TimeSheet is required
                      </span> -->
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editCustomTimeSheet"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>

            <button
              v-if="(status || '').trim().toLowerCase() === 'approved'"
              :key="status"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="handleApproveAndSave"
            >
              {{ buttonText }}
            </button>
            <button
              v-else
              :key="status"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCustomTimeSheetMethod()"
            >
              {{ buttonText }}
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
  name: "editCustomTimeSheet",
  data() {
    return {
      fetchCustomSheetData: {
        id: "",
        shift_date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",
        staff_rate: "",
        shift_name: "",
        paper_timesheet: "",
        // status: "",
        notes: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        custom_image: "",
      },
      startTime: {
        hour: "",
        minute: "",
        period: "",
      },
      endTime: {
        hour: "",
        minute: "",
        period: "",
      },
      previewImageUrl: "",
      options: [],
      status: "",
      apiResponse: "",
      apiResponse_EndTime: "",
      showSaveButton: true,
      validationClientRate: true,
      validationPaperTimeSheet: true,
      businessUnit: [],
      originalData: null,
      uploadedFile: null,
    };
  },
  props: {
    customDataId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },

  computed: {
    buttonText() {
      return this.status && this.status.trim().toLowerCase() === "approved"
        ? "Approved"
        : "Approve";
    },
    // isSaveDisabled() {
    //   return (
    //     this.fetchCustomSheetData.client_rate === null ||
    //     this.fetchCustomSheetData.client_rate <= 0 ||
    //     !this.fetchCustomSheetData.paper_timesheet
    //   );
    // },
    isSaveDisabled() {
      const {
        notes,
        start_time,
        end_time,

        paper_timesheet,
      } = this.fetchCustomSheetData;
      return !notes || !paper_timesheet || !start_time || !end_time;
    },
    fullCustomImageUrl() {
      return this.fetchCustomSheetData.paper_timesheet
        ? `${VITE_API_URL}${this.fetchCustomSheetData.paper_timesheet}`
        : "";
    },
    // formattedEndTime() {
    //   const { hour, minute, period } = this.endTime;
    //   return `${hour}:${minute < 10 ? "0" + minute : minute}: ${period}`;
    // },
  },
  methods: {
    updateStartTime() {
      const { hour, minute, period } = this.startTime;
      const hour24 = period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchCustomSheetData.start_time = `${hour24}:${formattedMinute} ${period}`;
    },
    updateEndTime() {
      const { hour, minute, period } = this.endTime;
      const hour24 = period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchCustomSheetData.end_time = `${hour24}:${formattedMinute} ${period}`;
    },
    async fetchCustomSheetDataById() {
      if (!this.customDataId) {
        return;
      }
      const response = await axios.get(
        `${VITE_API_URL}custom_timesheets/${this.customDataId}`
      );
      this.status = response.data.status || "";
    },
    resetChanges() {
      this.fetchCustomSheetData = { ...this.originalData };
    },
    async handleApproveAndSave() {
      await this.updateCustomTimeSheetMethod();
      this.status = "Approved";
      await this.approved_hourMethod();
    },
    formatBreakTime(minute) {
      if (minute === 60) {
        return "1 hour";
      } else {
        const hours = Math.floor(minute / 60);
        const mins = minute % 60;

        let formattedTime = "";
        if (hours > 0) {
          formattedTime += `${hours} hour `;
        }
        if (mins > 0) {
          formattedTime += `${mins} minute`;
        }
        return formattedTime.trim();
      }
    },
    handleInput(field, value) {
      const filteredValue = value.replace(/[^0-9]/g, "");
      this.validationClientRate =
        filteredValue.length > 0 && /^[0-9]+$/.test(filteredValue);

      this.validationStaffRate =
        filteredValue.length > 0 && /^[0-9]+$/.test(filteredValue);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          this.fetchCustomSheetData.paper_timesheet = file;

          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.$refs.successAlert.showError("Please upload a valid image file.");
        }
        this.validatePaperTimeSheet();
      } else {
        this.fetchCustomSheetData.paper_timesheet = null;
        this.previewImageUrl = "";
      }
    },
    validatePaperTimeSheet() {
      this.validationPaperTimeSheet = !this.fetchCustomSheetData.paper_timesheet;
    },
    formatTime(hour) {
      // if (hour === 0 || hour === 24) {
      //   return "12";
      // } else if (hour < 12) {
      //   return String(hour).padStart(2, "0");
      // } else if (hour === 12) {
      //   return "12";
      // } else {
      //   return String(hour - 12).padStart(2, "0");
      // }
      if (hour === 0 || hour === 24) {
        return `12`;
      } else if (hour < 12) {
        return String(hour).padStart(2, "0");
      } else if (hour === 12) {
        return String(hour).padStart(2, "0");
      } else {
        return String(hour - 12).padStart(2, "0");
      }
    },
    validateClientRate() {
      if (this.fetchCustomSheetData.client_rate <= 0) {
        this.fetchCustomSheetData.client_rate = "";
        this.validationClientRate = false;
      } else {
        this.validationClientRate = true;
      }
    },
    validateNumber(field) {
      const value = this.fetchCustomSheetData[field];

      if (!/^\d*\.?\d*$/.test(value)) {
        this.fetchCustomSheetData[field] = value.replace(/[^0-9.]/g, "");
      }
    },
    async fetchCustomTimeSheetData() {
      if (!this.customDataId) {
        return;
      }
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_timesheets/${this.customDataId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        if (response.data.custom_sheets) {
          const customSheet = response.data.custom_sheets;
          this.status = response.data.custom_sheets.status;

          const startTime = customSheet.start_time || "";
          if (startTime) {
            const [startHour24, startMinute] = startTime.split(":");
            const startHour = parseInt(startHour24, 10);
            const startPeriod = startHour >= 12 ? "PM" : "AM";

            this.startTime = {
              hour: startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour,
              minute: parseInt(startMinute, 10),
              period: startPeriod,
            };
          }

          const endTime = customSheet.end_time || "";
          if (endTime) {
            const [endHour24, endMinute] = endTime.split(":");
            const endHour = parseInt(endHour24, 10);
            const endPeriod = endHour >= 12 ? "PM" : "AM";

            this.endTime = {
              hour: endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour,
              minute: parseInt(endMinute, 10),
              period: endPeriod,
            };
          }
          this.fetchCustomSheetData = {
            start_time: startTime,
            end_time: endTime,
            name: customSheet.name || "",
            site: customSheet.site || "",
            job: customSheet.job || "",
            shift_date: customSheet.shift_date || "",
            shift_name: customSheet.shift_name || "",
            break: customSheet.break || "",
            total_hours: customSheet.total_hours || "",
            client_rate: customSheet.client_rate || "",
            staff_rate: customSheet.staff_rate || "",
            notes: customSheet.notes || "",
            paper_timesheet: customSheet.paper_timesheet || "",
          };

          this.originalData = { ...this.fetchCustomSheetData };

          this.showSaveButton = true;
          this.showValueCustom = true;
          // this.fetchCustomSheetData.paper_timesheet = "";
        } else {
          this.apiResponse = "";
        }
      } catch (error) {
        // console.error("Error fetching custom timesheets:", error);
      }
    },

    async updateCustomTimeSheetMethod() {
      try {
        this.updateStartTime();
        this.updateEndTime();

        const payload = {
          ...this.fetchCustomSheetData,
        };

        delete payload.total_hours;
        delete payload.total_cost;

        let formData = null;
        if (this.fetchCustomSheetData.paper_timesheet) {
          formData = new FormData();

          Object.keys(payload).forEach((key) => {
            if (payload[key] !== null && payload[key] !== "") {
              formData.append(`custom_timesheet[${key}]`, payload[key]);
            }
          });

          const paperTimesheet = this.fetchCustomSheetData.paper_timesheet;

          if (paperTimesheet instanceof File || paperTimesheet instanceof Blob) {
            formData.append("custom_timesheet[paper_timesheet]", paperTimesheet);
          } else if (typeof paperTimesheet === "string") {
            formData.append("custom_timesheet[paper_timesheet]", paperTimesheet);
          }
        }

        const requestData = formData || payload;
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        if (formData) {
          headers["Content-Type"] = "multipart/form-data";
        } else {
          headers["Content-Type"] = "application/json";
        }

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.customDataId}`,
          requestData,
          {
            headers,
          }
        );
        this.status = response.data.status || this.status;
        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.custom_sheets,
        });

        this.$emit("CustomTimeSheetData-updated");
        await this.approved_hourMethod();
        const message = "Custom TimeSheet Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
        this.uploadedFile = "";
      } catch (error) {
        // console.error("Error updating custom timesheet:", error);
      }
    },
    async approved_hourMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${this.customDataId}`,
          {},
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "bearer " + token,
            },
          }
        );
        this.$emit("CustomTimeSheetData-updated");
        const message = "Custom TimeSheet Approved successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    fullCustomImageUrl(newVal) {
      if (newVal) {
        // console.log("Image URL loaded:", newVal);
      } else {
        // console.log("No image URL found.");
      }
    },
    customDataId: {
      immediate: true,
      handler(newcustomDataId) {
        this.fetchCustomTimeSheetData(newcustomDataId);
      },
    },
    status(newStatus) {
      if (newStatus === "approved") {
      }
    },
  },
  mounted() {
    // this.fetchCustomSheetDataById();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
}
.modal-header {
  border-bottom: 0px;
}
.custom-disabled {
  cursor: not-allowed;
}
.form-control:disabled {
  background-color: #fff;
}
.custom-disabled:hover {
  cursor: not-allowed;
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
  border: 1px solid #ced4da;
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
