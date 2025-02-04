<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="editWeeklyTs" aria-labelledby="editWeeklyTss">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="editWeeklyTs">
              Edit Assign Shift {{ vacancyId }}
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
                      <!--         <input
                    
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.candidate_name"
                        type="text"
                        readonly
                      /> -->
                      <input
                        v-if="showValueCustom"
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.name"
                        type="text"
                        readonly
                      />
                      <input
                        v-else
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.candidate_name"
                        type="text"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        v-if="showValueCustom"
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.site"
                        aria-describedby="site"
                        readonly
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.site"
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
                        v-model="fetchCustomTimeShetData.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <input
                        v-if="fetchCustomTimeShetData.shift_date"
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.shift_date"
                        type="text"
                        readonly
                      />
                      <input
                        v-else
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchCustomTimeShetData.date"
                        type="text"
                        readonly
                      />
                      <!-- <input
                        type="text"
                        class="form-control"
                        v-model="fetchCustomTimeShetData.shift_date"
                        aria-describedby="date"
                        readonly
                      /> -->
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Shift</label>
                      <input
                        v-if="showValueCustom"
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.shift_name"
                        aria-describedby="position"
                        readonly
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.shift"
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
                            v-model="fetchCustomTimeShetData.start_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomStartTime"
                            >Start Time
                          </label>
                        </div>
                        <div class="col-12">
                          <div>
                            <div
                              v-if="!showValueCustom"
                              style="display: flex; gap: 8px; align-items: center"
                            >
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

                            <!-- <input
                              v-if="!showValueCustom"
                              type="text"
                              class="form-control custom-disabled"
                              v-model="fetchCustomTimeShetData.start_time"
                              disabled
                            /> -->

                            <div
                              v-else
                              style="display: flex; gap: 8px; align-items: center"
                            >
                              <!-- Hour Dropdown -->
                              <select
                                id="selectCustomHourStart"
                                class="form-control"
                                v-model="startTime.hour"
                                @change="calculateTotalHours"
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
                                @change="calculateTotalHours"
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
                                @change="calculateTotalHours"
                                style="width: 80px"
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
                          <label class="form-label">End Time</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomEndTime"
                            >End Time</label
                          >
                        </div>
                        <div class="col-12">
                          <!-- <input
                            v-if="!showValueCustom"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            disabled
                          /> -->

                          <!-- <select
                            v-else
                            id="selectCustomStartTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateStartTime"
                            style="width: 240px"
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select> -->
                          <div>
                            <!-- <input
                              v-if="apiResponse_EndTime"
                              type="text"
                              class="form-control"
                              v-model="fetchCustomTimeShetData.end_time"
                              disabled
                            /> -->
                            <div
                              v-if="!showValueCustom"
                              style="display: flex; gap: 8px; align-items: center"
                            >
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
                            <div
                              v-else
                              style="display: flex; gap: 8px; align-items: center"
                            >
                              <!-- Hour Dropdown -->
                              <select
                                id="selectCustomHour"
                                class="form-control"
                                v-model="endTime.hour"
                                @change="calculateTotalHours"
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
                                @change="calculateTotalHours"
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
                                @change="calculateTotalHours"
                                style="width: 80px"
                              >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectShiftsBreak"
                            >Break Time</label
                          >
                        </div>
                        <div class="col-12" v-if="showValueCustom">
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.break"
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
                        <div class="col-12" v-else>
                          <!-- <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.break"
                          /> -->
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.break"
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
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Total Hours</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            v-if="showValueCustom"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.total_hours"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.total_hours"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex gap-5">
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Rate</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showValueCustom">
                          <input
                            type="text"
                            class="form-control disabled"
                            v-model="fetchCustomTimeShetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="mb-3 ps-2">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showValueCustom">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="mb-3" v-if="!showValueCustom">
                        <div class="col-12">
                          <label class="form-label">Authorized Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(
                                fetchCustomTimeShetData.administrator_signature_url
                              )
                            "
                            alt="Administrator Signature"
                            height="100px"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div class="mb-3" v-if="!showValueCustom">
                        <div class="col-12">
                          <label class="form-label">Staff Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="getFullImageUrl(fetchCustomTimeShetData.signature_url)"
                            alt="Administrator Signature"
                            height="100px"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div class="mb-3" v-if="!showValueCustom">
                        <div class="col-12">
                          <label class="form-label">Administrator Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(
                                fetchCustomTimeShetData.administrator_signature_url
                              )
                            "
                            alt="Administrator Signature"
                            height="100px"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3" v-if="showValueCustom">
                    <div class="col-12">
                      <label class="form-label">Comments</label>
                    </div>
                    <div class="col-12 mt-1">
                      <textarea
                        class="form-control"
                        v-model="fetchCustomTimeShetData.notes"
                        rows="3"
                      ></textarea>
                    </div>
                    <!-- <div class="col-12 mt-1" v-else>
                      <textarea
                        class="form-control"
                        v-model="fetchCustomTimeShetData.start_comment"
                        rows="3"
                      ></textarea>
                    </div> -->
                  </div>
                  <div class="mb-3 row" v-if="!showValueCustom">
                    <div class="col-6">
                      <div class="col-12">
                        <label class="form-label">Start Comments</label>
                      </div>

                      <div class="col-12 mt-1">
                        <textarea
                          class="form-control"
                          v-model="fetchCustomTimeShetData.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="col-12">
                        <label class="form-label">End Comments</label>
                      </div>

                      <div class="col-12 mt-1">
                        <textarea
                          class="form-control"
                          v-model="fetchCustomTimeShetData.end_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <!-- <div class="col-4">
                      <div class="col-12">
                        <label class="form-label">Comments</label>
                      </div>

                      <div class="col-12 mt-1">
                        <textarea
                          class="form-control"
                          v-model="fetchCustomTimeShetData.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div> -->
                  </div>
                  <div class="mb-3" v-if="showValueCustom">
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
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editWeeklyTs"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>

            <button
              v-if="fetchCustomTimeShetData.status === 'Approved'"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="approved_TimesheetRevertMethod()"
              disabled
            >
              Approved
            </button>

            <button
              v-if="isModified"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="handleApproveAndSave()"
            >
              Approve & Save
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
      fetchCustomTimeShetData: {
        id: "",
        name: "",
        site: "",
        shift: "",
        date: "",
        shift_date: "",
        candidate_name: "",
        end_comment: "",
        total_hours: "",
        shift_name: "",
        booking_id: "",
        start_time: "",
        end_time: "",
        break: "",
        client_rate: "",
        paper_timesheet: "",
        total_cost: "",
        notes: "",
        status: "",
        start_comment: "",
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
      apiResponse: "",
      showValueCustom: "false",
      apiResponse_EndTime: "",
      validationPaperTimeSheet: true,
      showSaveButton: true,
      isPublished: "",
      originalData: null,
    };
  },
  props: {
    vacancyId: {
      type: String,
      required: true,
    },
    paginatedTimesheets: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  components: { SuccessAlert },

  computed: {
    isModified() {
      return (
        JSON.stringify(this.fetchCustomTimeShetData) !== JSON.stringify(this.originalData)
      );
    },
    getCandidatesData() {
      return this.$store.state.candidates;
    },
    isSaveDisabled() {
      const {
        notes,
        start_time,
        end_time,

        paper_timesheet,
      } = this.fetchCustomTimeShetData;
      return !notes || !start_time || !paper_timesheet || !end_time;
    },

    fullCustomImageUrl() {
      return this.fetchCustomTimeShetData.paper_timesheet
        ? `${VITE_API_URL}${this.fetchCustomTimeShetData.paper_timesheet}`
        : "";
    },
  },
  methods: {
    getFullImageUrl(relativeUrl) {
      return `${VITE_API_URL}${relativeUrl}`;
    },
    updateStartTime() {
      const { hour, minute, period } = this.startTime;
      const hour24 = period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchCustomTimeShetData.start_time = `${hour24}:${formattedMinute} ${period}`;
    },
    updateEndTime() {
      const { hour, minute, period } = this.endTime;
      const hour24 = period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchCustomTimeShetData.end_time = `${hour24}:${formattedMinute} ${period}`;
    },
    async calculateTotalHours() {
      const startTime = `${this.formatTime(this.startTime.hour)}:${
        this.startTime.minute
      } ${this.startTime.period}`;
      const endTime = `${this.formatTime(this.endTime.hour)}:${this.endTime.minute} ${
        this.endTime.period
      }`;
      if (!startTime || !endTime || !this.vacancyId) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/calculate_total_hour`, {
          params: { start_time: startTime, end_time: endTime, id: this.vacancyId },
        });

        this.fetchCustomTimeShetData.total_hours = response.data.total_hours;
      } catch (error) {
        // console.error("Error calculating total hours:", error);
      }
    },
    parseStartTime(startTime) {
      if (!startTime) return;

      const [time, period] = startTime.split(" ");
      const [hour, minute] = time.split(":");

      this.startTime.hour = parseInt(hour, 10);
      this.startTime.minute = minute;
      this.startTime.period = period;
    },
    async updateSignTimeSheetMethod() {
      try {
        this.updateStartTime();
        this.updateEndTime();
        const payload = {
          ...this.fetchCustomTimeShetData,
          status: "Approved",
          id: this.fetchCustomTimeShetData.booking_id,
        };

        delete payload.total_hours;
        delete payload.total_cost;

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };

        const response = await axios.put(
          `${VITE_API_URL}/update_sign_timesheet/${this.fetchCustomTimeShetData.id}`,
          payload,
          {
            headers,
          }
        );
        this.status = response.data.status || this.status;
        this.$store.commit("updateCandidate", {
          id: this.fetchCustomTimeShetData.id,
          newData: response.data.sign_timesheets,
        });

        this.$emit("SignTimeSheetData-updated");
        // await this.approved_TimesheetRevertMethod();
        const message = "Sign TimeSheet updated successfully";
        this.$refs.successAlert.showSuccess(message);
        this.uploadedFile = "";
      } catch (error) {
        // console.error("Error updating custom timesheet:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          this.fetchCustomTimeShetData.paper_timesheet = file;

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
      this.validationPaperTimeSheet = !this.fetchCustomTimeShetData.paper_timesheet;
    },

    async handleApproveAndSave() {
      try {
        if (this.showValueCustom) {
          // console.log("Handling CustomTimeSheet...");
          await this.updateCandidateMethod();
        } else if (!this.showValueCustom) {
          // console.log("Handling SignTimeSheet...");
          await this.updateSignTimeSheetMethod();
        }
        // await this.approved_TimesheetRevertMethod();
      } catch (error) {
        // console.error("Error during approval process:", error);
      }
    },
    async approved_TimesheetRevertMethod() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${this.fetchCustomTimeShetData.id}`,
          null,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
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
    resetChanges() {
      this.fetchCustomTimeShetData = { ...this.originalData };
    },
    parseTime(timeString) {
      if (!timeString) return { hour: "", minute: "", period: "" };

      const [time, period] = timeString.split(" ");
      let [hour, minute] = time.split(":").map(Number);

      return {
        hour: hour,
        minute: minute,
        period: period,
      };
    },
    async fetchCustomTimeSheetData() {
      if (!this.vacancyId) {
        return;
      }

      const token = localStorage.getItem("token");

      if (this.paginatedTimesheets.some((ts) => ts.sheet_type === "CustomTimeSheet")) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/custom_timesheets/${this.vacancyId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const startTime = response.data.custom_sheets.start_time || "";
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

          const endTime = response.data.custom_sheets.end_time || "";
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
          if (response.data.custom_sheets.start_time) {
            this.startTime = this.parseTime(response.data.custom_sheets.start_time);
          }

          if (response.data.custom_sheets.end_time) {
            this.endTime = this.parseTime(response.data.custom_sheets.end_time);
          }
          this.showValueCustom = true;
          this.fetchCustomTimeShetData = {
            ...response.data.custom_sheets,
          };

          delete payload.total_hours;
          delete payload.total_cost;
          ["total_hours", "total_cost", "staff_pay_amount"].forEach((field) => {
            if (payload[field] === null) {
              delete payload[field];
            }
          });
          if (payload.start_time !== null || payload.start_time !== "") {
            payload.start_time;
          }

          if (payload.end_time !== null || payload.end_time !== "") {
            payload.end_time;
          }

          let formData = null;
          const paperTimesheet = this.fetchCustomSheetData.paper_timesheet;
          if (paperTimesheet) {
            formData = new FormData();

            Object.keys(payload).forEach((key) => {
              if (payload[key] !== null && payload[key] !== "") {
                formData.append(`custom_timesheet[${key}]`, payload[key]);
              }
            });

            if (paperTimesheet instanceof File || paperTimesheet instanceof Blob) {
              formData.append("custom_timesheet[custom_image]", paperTimesheet);
            } else if (typeof paperTimesheet === "string") {
              formData.append("custom_timesheet[custom_image]", paperTimesheet);
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

          this.originalData = { ...this.fetchCustomTimeShetData };
          // this.parseStartTime(this.fetchCustomTimeShetData.start_time);
        } catch (error) {
          // console.error("Error fetching custom timesheets:", error);
        }
      }
      if (this.paginatedTimesheets.some((ts) => ts.sheet_type === "SignTimeSheet")) {
        try {
          const fallbackResponse = await axios.get(
            `${VITE_API_URL}/sign_timesheets/${this.vacancyId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          this.showValueCustom = false;
          const signTimesheets = fallbackResponse.data.sign_timesheets;
          // this.status = signTimesheets.status || "";

          const startTime = signTimesheets.start_time || "";
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

          const endTime = signTimesheets.end_time || "";
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
          this.fetchCustomTimeShetData = {
            start_time: startTime,
            end_time: endTime,
            ...fallbackResponse.data.sign_timesheets,
          };
          if (signTimesheets.start_time) {
            this.startTime = this.parseTime(signTimesheets.start_time);
          }

          if (signTimesheets.end_time) {
            this.endTime = this.parseTime(signTimesheets.end_time);
          }
          this.originalData = { ...this.fetchCustomTimeShetData };

          // this.parseStartTime(this.fetchCustomTimeShetData.start_time);
        } catch (fallbackError) {
          // console.error("Error fetching signed timesheets:", fallbackError);
        }
      } else {
        return this.vacancyId === null;
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
    formatTime(hour) {
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

    validateNumber(field) {
      const value = this.fetchCustomTimeShetData[field];

      if (!/^\d*\.?\d*$/.test(value)) {
        this.fetchCustomTimeShetData[field] = value.replace(/[^0-9.]/g, "");
      }
    },
    async updateCandidateMethod() {
      this.updateStartTime();
      this.updateEndTime();
      const token = localStorage.getItem("token");

      try {
        // this.updateStartTime();
        // const formData = new FormData();
        const payload = {
          ...this.fetchCustomTimeShetData,
          status: "Approved",
        };

        delete payload.total_hours;
        delete payload.total_cost;
        // if (payload.total_hours) {
        //   delete payload.total_hours;
        // }
        // if (payload.total_cost) {
        //   delete payload.total_cost;
        // }
        if (payload.start_time !== null || payload.start_time !== "") {
          payload.start_time;
        }

        if (payload.end_time !== null || payload.end_time !== "") {
          payload.end_time;
        }
        // for (const [key, value] of Object.entries(payload)) {
        //   if (value !== null && value !== "") {
        //     formData.append(`custom_timesheet[${key}]`, value);
        //   }
        // }

        delete payload.total_hours;
        delete payload.total_cost;
        ["total_hours", "total_cost", "staff_pay_amount"].forEach((field) => {
          if (payload[field] === null) {
            delete payload[field];
          }
        });
        if (payload.start_time !== null || payload.start_time !== "") {
          payload.start_time;
        }

        if (payload.end_time !== null || payload.end_time !== "") {
          payload.end_time;
        }

        let formData = null;
        const paperTimesheet = this.fetchCustomTimeShetData.paper_timesheet;
        if (paperTimesheet) {
          formData = new FormData();

          Object.keys(payload).forEach((key) => {
            if (payload[key] !== null && payload[key] !== "") {
              formData.append(`custom_timesheet[${key}]`, payload[key]);
            }
          });

          if (paperTimesheet instanceof File || paperTimesheet instanceof Blob) {
            formData.append("custom_timesheet[custom_image]", paperTimesheet);
          } else if (typeof paperTimesheet === "string") {
            formData.append("custom_timesheet[custom_image]", paperTimesheet);
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

        // console.log(payload);

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomTimeShetData.id}`,
          requestData,
          {
            headers,
          }
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomTimeShetData.id,
          newData: response.data.custom_sheets,
        });
        this.$emit("CustomTimeSheetData-updated");

        const message = "TimeSheet updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {}
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
    vacancyId: {
      immediate: true,
      handler(newvacancyId) {
        this.fetchCustomTimeSheetData(newvacancyId);
      },
    },
    paginatedTimesheets(newVal) {
      if (newVal && newVal.length > 0) {
        this.fetchCustomTimeSheetData();
      }
    },
  },

  mounted() {},
};
</script>
<style scoped>
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}
.form-control {
  background-color: #fff;
}
.custom-disabled {
  cursor: not-allowed;
}
.modal-body {
  background: transparent;
}
.custom-disabled:hover {
  cursor: not-allowed;
}
</style>
