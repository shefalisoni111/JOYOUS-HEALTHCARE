<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="signedTimeSheetView"
      aria-labelledby="signedTimeSheetView"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signedTimeSheetView">
              Signed Timesheet
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
                        v-model="fetchSignedTimeSheet.author_name"
                        type="text"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control custom-disabled"
                        v-model="fetchSignedTimeSheet.site"
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
                        v-model="fetchSignedTimeSheet.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>

                      <input
                        class="form-control text-capitalize custom-disabled"
                        v-model="fetchSignedTimeSheet.date"
                        type="text"
                        readonly
                      />
                      <!-- <input
                        type="text"
                        class="form-control"
                        v-model="fetchSignedTimeSheet.date"
                        aria-describedby="date"
                        readonly
                      /> -->
                    </div>
                  </div>
                  <div class="d-flex gap-5">
                    <div class="mb-3">
                      <div class="col-12">
                        <label class="form-label">Shift</label>
                      </div>
                      <div class="col-12">
                        <input
                          type="text "
                          class="form-control custom-disabled w-100"
                          v-model="fetchSignedTimeSheet.shift"
                          aria-describedby="position"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="mb-3 ms-3">
                      <label class="form-label">Authorize Name</label>
                      <input
                        type="text"
                        class="form-control custom-disabled w-100"
                        v-model="fetchSignedTimeSheet.author_name"
                        aria-describedby="position"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Rate Cards</label>
                    <div class="d-flex gap-2 justify-content-between">
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
                            v-model="fetchSignedTimeSheet.start_time"
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
                              <option
                                v-for="hour in 24"
                                :key="hour"
                                :value="hour"
                              >
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
                                {{
                                  minute - 1 < 10
                                    ? "0" + (minute - 1)
                                    : minute - 1
                                }}
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
                            v-model="fetchSignedTimeSheet.start_time"
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
                              <option
                                v-for="hour in 24"
                                :key="hour"
                                :value="hour"
                              >
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
                                {{
                                  minute - 1 < 10
                                    ? "0" + (minute - 1)
                                    : minute - 1
                                }}
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
                          <label class="form-label" for="selectCustomStartTime"
                            >Start Time
                          </label>
                        </div>
                        <div class="col-12">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.start_time"
                            disabled
                          />
                        </div>
                      </div> -->

                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectCustomEndTime"
                            >End Time</label
                          >
                        </div>
                        <div class="col-12">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.end_time"
                            disabled
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
                              v-model="fetchSignedTimeSheet.end_time"
                              disabled
                            />
                            <div
                              v-else
                              style="
                                display: flex;
                                gap: 8px;
                                align-items: center;
                              "
                            >
                              <!-- Hour Dropdown -->
                              <select
                                id="selectCustomHour"
                                class="form-control"
                                v-model="endTime.hour"
                                @change="updateEndTime"
                                style="width: 80px"
                              >
                                <option
                                  v-for="hour in 24"
                                  :key="hour"
                                  :value="hour"
                                >
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
                                  {{
                                    minute - 1 < 10
                                      ? "0" + (minute - 1)
                                      : minute - 1
                                  }}
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
                              v-model="fetchSignedTimeSheet.end_time"
                              disabled
                            />
                            <div
                              v-else
                              style="
                                display: flex;
                                gap: 8px;
                                align-items: center;
                              "
                            >
                              <select
                                id="selectCustomHour"
                                class="form-control custom-disabled"
                                disabled
                              >
                                <option
                                  v-for="hour in 24"
                                  :key="hour"
                                  :value="hour"
                                >
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
                                  {{
                                    minute - 1 < 10
                                      ? "0" + (minute - 1)
                                      : minute - 1
                                  }}
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
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectShiftsBreak"
                            >Break Time</label
                          >
                        </div>
                        <div class="col-12">
                          <!-- <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.break"
                            disabled
                          /> -->
                          <select
                            id="selectShiftsBreak"
                            class="form-control"
                            v-model="fetchSignedTimeSheet.break"
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
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.total_hours"
                            disabled
                          />
                          <!-- <input
                            type="email"
                            class="form-control"
                            v-model="fetchSignedTimeSheet.total_shift_hours"
                          /> -->
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
                            v-model="fetchSignedTimeSheet.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                        <div class="col-12 mt-1" v-else>
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.client_rate"
                            @input="validateNumber('client_rate')"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Rate</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.staff_rate"
                            @input="validateNumber('staff_rate')"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Authorized Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(
                                getSignedStaffView.administrator_signature_url
                              )
                            "
                            alt="Administrator Signature"
                            height="100"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Staff Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(getSignedStaffView.signature_url)
                            "
                            alt="Administrator Signature"
                            height="100"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label"
                            >Administrator Signature</label
                          >
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(
                                getSignedStaffView.administrator_signature_url
                              )
                            "
                            alt="Administrator Signature"
                            height="100"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 row">
                    <div class="col-6">
                      <div class="col-12">
                        <label class="form-label">Start Comments</label>
                      </div>
                      <div class="col-12 mt-1" v-if="showSaveButton">
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="col-12 mt-1" v-else>
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="col-12">
                        <label class="form-label">End Comments</label>
                      </div>
                      <div class="col-12 mt-1" v-if="showSaveButton">
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.end_comment"
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="col-12 mt-1" v-else>
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.end_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <!-- <div class="col-4">
                      <div class="col-12">
                        <label class="form-label">Comments</label>
                      </div>
                      <div class="col-12 mt-1" v-if="showSaveButton">
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="col-12 mt-1" v-else>
                        <textarea
                          class="form-control"
                          v-model="fetchSignedTimeSheet.start_comment"
                          rows="3"
                        ></textarea>
                      </div>
                    </div> -->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#signedTimeSheetView"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>

            <button
              class="btn btn-primary text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCustomTimeSheetMethod()"
            >
              Save
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
import { mapActions } from "vuex";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "CandidateAdd",
  data() {
    return {
      fetchSignedTimeSheet: {
        id: "",
        date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",
        staff_rate: "",
        shift: "",
        end_comment: "",
        booking_id: "",
        start_comment: "",
        paper_timesheet: "",
        // status: "",
        notes: "",
        start_comment: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        total_hours: "",
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
      status: "",
      paper_timesheet: "",
      getSignedStaffView: [],
      apiResponse: "",
      showValueCustom: false,
      apiResponse_EndTime: "",
      fullCustomImageUrl: null,
      apiResponse_EndTime: "",
      showSaveButton: true,
      isPublished: false,
      originalData: null,
    };
  },
  components: { SuccessAlert },
  computed: {
    buttonText() {
      return this.status && this.status.trim().toLowerCase() === "approved"
        ? "Approved"
        : "Approve";
    },
  },
  props: ["id"],
  watch: {
    id(newValue, oldValue) {
      this.signedTimeSheetViewMethod(newValue);
      this.fetchSignedTimesheetData(newValue);
    },
    status(newStatus) {
      if (newStatus === "approved") {
      }
    },
  },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
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
    updateStartTime() {
      const { hour, minute, period } = this.startTime;
      const hour24 =
        period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchSignedTimeSheet.start_time = `${hour24}:${formattedMinute} ${period}`;
    },
    updateEndTime() {
      const { hour, minute, period } = this.endTime;
      const hour24 =
        period === "PM" ? (hour < 12 ? hour + 12 : hour) : hour % 12;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;

      this.fetchSignedTimeSheet.end_time = `${hour24}:${formattedMinute} ${period}`;
    },
    isSaveDisabled() {
      return !this.paper_timesheet;
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
    async handleApproveAndSave() {
      await this.updateCustomTimeSheetMethod();
      this.status = "Approved";
      await this.approved_TimesheetRevertMethod();
    },
    async approved_TimesheetRevertMethod() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${this.fetchSignedTimeSheet.id}`,
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
    getFullImageUrl(relativeUrl) {
      // console.log("Image URL:", relativeUrl);
      // return `${VITE_API_URL}${relativeUrl}`;
      if (!relativeUrl) return "";
      const fullUrl = `${VITE_API_URL}${
        relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl
      }`;
      // console.log("Full Image URL:", fullUrl);
      return fullUrl;
    },

    ...mapActions(["fetchSignedTimesheetData"]),
    async signedTimeSheetViewMethod(id) {
      if (id) {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.get(
            `${VITE_API_URL}/sign_timesheets/${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          this.getSignedStaffView = response.data.sign_timesheets;
          const signTimesheets = response.data.sign_timesheets;
          this.status = response.data.sign_timesheets.status || "";

          const startTime = signTimesheets.start_time || "";
          if (startTime) {
            const [startHour24, startMinute] = startTime.split(":");
            const startHour = parseInt(startHour24, 10);
            const startPeriod = startHour >= 12 ? "PM" : "AM";

            this.startTime = {
              hour:
                startHour > 12
                  ? startHour - 12
                  : startHour === 0
                  ? 12
                  : startHour,
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

          this.fetchSignedTimeSheet = {
            start_time: startTime,
            end_time: endTime,
            author_name: signTimesheets.author_name || "",
            site: signTimesheets.site || "",
            job: signTimesheets.job || "",
            date: signTimesheets.date || "",
            shift: signTimesheets.shift || "",
            shift_name: signTimesheets.shift_name || "",
            break: signTimesheets.break || "",
            end_comment: signTimesheets.end_comment || "",
            total_hours: signTimesheets.total_hours || "",
            client_rate: signTimesheets.client_rate || "",
            staff_rate: signTimesheets.staff_rate || "",
            start_comment: signTimesheets.start_comment || "",
            booking_id: signTimesheets.booking_id || "",
            id: signTimesheets.id || "",
          };

          this.originalData = { ...this.fetchSignedTimeSheet };
          this.showSaveButton = true;
        } catch (error) {
          this.errorMessage =
            "Failed to fetch timesheet data. Please try again.";
        }
      }
    },
    async updateCustomTimeSheetMethod() {
      try {
        this.updateStartTime();
        this.updateEndTime();
        const payload = {
          ...this.fetchSignedTimeSheet,
          status: "Approved",
          id: this.fetchSignedTimeSheet.booking_id,
        };
        // console.log(this.fetchSignedTimeSheet.booking_id);

        delete payload.total_hours;
        delete payload.total_cost;

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };

        const response = await axios.put(
          `${VITE_API_URL}/update_sign_timesheet/${this.fetchSignedTimeSheet.id}`,
          payload,
          {
            headers,
          }
        );
        this.status = response.data.status || this.status;
        this.$store.commit("updateCandidate", {
          id: this.fetchSignedTimeSheet.id,
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
  },
  mounted() {},
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.remove-white-background {
  mix-blend-mode: multiply;
  background-color: transparent !important;
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
</style>
