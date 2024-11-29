<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editWeeklyTs"
      aria-labelledby="editWeeklyTs"
      tabindex="-1"
    >
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
                            <!-- <select
                              id="selectHour"
                              class="form-control"
                              v-model="startTime.hour"
                              @change="updateStartTime"
                              style="
                                width: 80px;
                                display: inline-block;
                                margin-right: 10px;
                              "
                            >
                              <option v-for="hour in 12" :key="hour" :value="hour">
                                {{ hour }}
                              </option>
                            </select>

                            <select
                              id="selectMinute"
                              class="form-control"
                              v-model="startTime.minute"
                              @change="updateStartTime"
                              style="
                                width: 80px;
                                display: inline-block;
                                margin-right: 10px;
                              "
                            >
                              <option
                                v-for="minute in minutes"
                                :key="minute"
                                :value="minute"
                              >
                                {{ minute }}
                              </option>
                            </select>

                            <select
                              id="selectAmPm"
                              class="form-control"
                              v-model="startTime.period"
                              @change="updateStartTime"
                              style="width: 80px; display: inline-block"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div> -->
                            <!-- <input
                            v-else
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.start_time"
                            disabled
                          /> -->

                            <input
                              v-if="!showValueCustom"
                              type="text"
                              class="form-control custom-disabled"
                              v-model="fetchCustomTimeShetData.start_time"
                              disabled
                            />
                            <select
                              v-else
                              id="selectCustomStartTime"
                              class="form-control"
                              v-model="fetchCustomTimeShetData.start_time"
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
                          <input
                            v-if="!showValueCustom"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            disabled
                          />

                          <select
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
                          </select>
                          <!-- <select
                            id="selectCustomEndTime"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateEndTime"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select> -->
                        </div>
                      </div>
                      <!-- <div class="col-12" v-else>
                          <input
                            v-if="!showValueCustom"
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            disabled
                          />

                          <select
                            v-else
                            id="selectCustomStartTime"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.end_time"
                            @change="validateStartTime"
                            style="width: 240px"
                            disabled
                          >
                            <option
                              v-for="hour in 24"
                              :key="hour"
                              :value="formatTime(hour)"
                            >
                              {{ formatTime(hour) }}
                            </option>
                          </select>
                         
                        </div> -->

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
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.break"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Total Hours</label>
                          <!-- {{ console.log(fetchCustomTimeShetData.total_hours) }} -->
                        </div>
                        <div class="col-12 mt-1">
                          <select
                            v-if="showValueCustom"
                            class="form-control custom-disabled"
                            v-model="fetchCustomTimeShetData.total_hours"
                            @change="validateStartTime"
                            style="width: 240px"
                            disabled
                          >
                            <option v-for="hour in 24" :key="hour" :value="hour">
                              {{ hour }} hour{{ hour > 1 ? "s" : "" }}
                            </option>
                          </select>
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
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Client Pay Amount</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_cost"
                            @input="validateNumber('total_cost')"
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.total_cost"
                            @input="validateNumber('total_cost')"
                            disabled
                          />
                        </div>
                      </div> -->
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
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate Amount</label>
                        </div>
                        <div class="col-12 mt-1" v-if="showSaveButton">
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate_amount"
                            @input="validateNumber('staff_rate_amount')"
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control"
                            v-model="fetchCustomTimeShetData.staff_rate_amount"
                            @input="validateNumber('staff_rate_amount')"
                            disabled
                          />
                        </div>
                      </div> -->
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Comments</label>
                    </div>
                    <div class="col-12 mt-1" v-if="showValueCustom">
                      <textarea
                        class="form-control"
                        v-model="fetchCustomTimeShetData.notes"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <textarea
                        class="form-control custom-disabled"
                        v-model="fetchCustomTimeShetData.start_comment"
                        rows="3"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <!-- <div class="mb-3" v-if="showValueCustom">
                    <div class="col-12">
                      <label class="form-label">Paper TimeSheet</label>
                    </div>
                    <div class="col-12 mt-1" v-if="fullCustomImageUrl">
                      <img
                        :src="fullCustomImageUrl"
                        alt="Current Paper TimeSheet"
                        class="img-fluid"
                        width="20%"
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
                  </div> -->
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
            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
            >
              Save
            </button> -->
            <button
              v-show="!showSaveButton"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="approved_TimesheetRevertMethod()"
            >
              Approve
            </button>
            <button
              v-show="showSaveButton"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="handleApproveAndSave"
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
        total_hours: "",
        shift_name: "",
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
      // startTime: {
      //   hour: "",
      //   minute: "",
      //   period: "",
      // },
      // minutes: Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
      apiResponse: "",
      showValueCustom: "false",
      apiResponse_EndTime: "",
      validationPaperTimeSheet: true,
      showSaveButton: true,
      isPublished: "",
      originalData: null,
      fullCustomImageUrl: null,
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
    // fullCustomImageUrl() {
    //   return this.fetchCustomTimeShetData.paper_timesheet
    //     ? `${VITE_API_URL}${this.fetchCustomTimeShetData.paper_timesheet}`
    //     : "";
    //   // console.log(`${VITE_API_URL}${this.fetchCustomTimeShetData.paper_timesheet}`);
    // },
  },
  methods: {
    getFullImageUrl(relativeUrl) {
      return `${VITE_API_URL}${relativeUrl}`;
    },
    parseStartTime(startTime) {
      if (!startTime) return;

      const [time, period] = startTime.split(" ");
      const [hour, minute] = time.split(":");

      this.startTime.hour = parseInt(hour, 10);
      this.startTime.minute = minute;
      this.startTime.period = period;
    },
    updateStartTime() {
      const { hour, minute, period } = this.startTime;
      if (hour && minute && period) {
        this.fetchCustomTimeShetData.start_time = `${hour}:${minute} ${period}`;
      } else {
        this.fetchCustomTimeShetData.start_time = "";
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          this.fetchCustomTimeShetData.paper_timesheet = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.fullCustomImageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
        }
        this.validatePaperTimeSheet();
      } else {
        this.fetchCustomTimeShetData.paper_timesheet = null;
      }
    },
    validatePaperTimeSheet() {
      this.validationPaperTimeSheet = !this.fetchCustomTimeShetData.paper_timesheet;
    },

    async handleApproveAndSave() {
      try {
        await this.updateCandidateMethod();
        await this.approved_TimesheetRevertMethod();
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

          // const weeklyTimesheets = response.data?.weekly_timesheets || [];
          // console.log("Fetched weekly timesheets:", this.paginatedTimesheets);

          this.showValueCustom = true;
          this.fetchCustomTimeShetData = {
            ...response.data.custom_sheets,
          };
          this.originalData = { ...this.fetchCustomTimeShetData };
          // this.parseStartTime(this.fetchCustomTimeShetData.start_time);
        } catch (error) {
          // console.error("Error fetching custom timesheets:", error);
        }
      } else {
        return this.vacancyId === null;
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
          this.fetchCustomTimeShetData = {
            ...fallbackResponse.data.sign_timesheets,
          };
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
      const token = localStorage.getItem("token");

      try {
        // this.updateStartTime();
        // const formData = new FormData();
        const payload = {
          ...this.fetchCustomTimeShetData,
          // start_time: this.fetchCustomTimeShetData.start_time,
          // end_time: this.fetchCustomTimeShetData.end_time,
          // custom_image_url: this.fetchCustomSheetData.paper_timesheet_url,
        };

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

        // console.log(payload);

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomTimeShetData.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
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
