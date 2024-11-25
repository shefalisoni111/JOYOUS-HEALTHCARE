<!-- <template>
  <div>
    
    <div
      class="modal fade"
      id="signedTimeSheetView"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signedTimeSheetView">Staff Signed View</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row">
              <div class="col-12">
                <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Start</th>
                      <th scope="col">Finish</th>

                      <th scope="col">Break</th>
                      <th scope="col">Total</th>
                      <th scope="col">Authorized Signature</th>
                      <th scope="col">Authorized Name</th>
                      <th scope="col">Staff Signature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="col">{{ getSignedStaffView.id }}</td>
                      <td scope="col">{{ getSignedStaffView.date }}</td>

                      <td scope="col">{{ getSignedStaffView.start_time }}</td>

                      <td scope="col">{{ getSignedStaffView.end_time }}</td>
                      <td scope="col">{{ getSignedStaffView.break }}</td>
                      <td scope="col">{{ getSignedStaffView.total_hours }}</td>

                      <td scope="col">
                        <img
                          :src="
                            getFullImageUrl(
                              getSignedStaffView.administrator_signature_url
                            )
                          "
                          alt="Administrator Signature"
                          height="100px"
                          class="remove-white-background d-block m-auto"
                          loading="eager"
                        />
                      </td>
                      <td scope="col">{{ getSignedStaffView.author_name }}</td>
                      <td scope="col">
                        <img
                          :src="getFullImageUrl(getSignedStaffView.signature_url)"
                          alt="Administrator Signature"
                          height="100px"
                          class="remove-white-background d-block m-auto"
                          loading="eager"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#signedTimeSheetView"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="signedTimeSheetView"
      aria-labelledby="signedTimeSheetView"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="signedTimeSheetView">Signed Timesheet</h5>
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
                      </div>

                      <div class="mb-3">
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
                      </div>
                      <!-- <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Break</label>
                        </div>
                        <div class="col-12 mt-1">
                          <input
                            type="email"
                            class="form-control"
                            v-model="fetchSignedTimeSheet.break"
                          />
                        </div>
                      </div> -->
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label" for="selectShiftsBreak"
                            >Break Time</label
                          >
                        </div>
                        <div class="col-12">
                          <input
                            type="text"
                            class="form-control custom-disabled"
                            v-model="fetchSignedTimeSheet.break"
                            disabled
                          />
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
                            height="100px"
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
                            :src="getFullImageUrl(getSignedStaffView.signature_url)"
                            alt="Administrator Signature"
                            height="100px"
                            class="remove-white-background d-block m-auto"
                            loading="eager"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <div class="col-12">
                          <label class="form-label">Administrator Signature</label>
                        </div>
                        <div class="col-12 mt-1">
                          <img
                            :src="
                              getFullImageUrl(
                                getSignedStaffView.administrator_signature_url
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

                  <div class="mb-3">
                    <div class="col-12">
                      <label class="form-label">Comments</label>
                    </div>
                    <div class="col-12 mt-1" v-if="showSaveButton">
                      <textarea
                        class="form-control custom-disabled"
                        v-model="fetchSignedTimeSheet.start_comment"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="col-12 mt-1" v-else>
                      <textarea
                        class="form-control custom-disabled"
                        v-model="fetchSignedTimeSheet.start_comment"
                        rows="3"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                  <!-- <div class="mb-3 d-flex justify-content-between">
                    <div class="col-8">
                      <div>
                        <label class="form-label">Paper TimeSheet</label>
                      </div>
                      <div
                        class="col-8 mt-1"
                        v-if="
                          fetchSignedTimeSheet.status === 'Approved' && fullCustomImageUrl
                        "
                      >
                        <img
                          :src="fullCustomImageUrl"
                          alt="Current Paper TimeSheet"
                          class="img-fluid"
                          width="20%"
                        />
                      </div>
                      <div class="col-8 mt-1" v-else>
                        <input
                          type="file"
                          class="form-control custom-disabled"
                          accept="image/*"
                          @change="handleFileUpload"
                        />
                      </div>
                    </div>
                    <div class="col-4 mt-3">
                      <div>
                        <img
                          :src="getFullImageUrl(fetchSignedTimeSheet.paper_timesheet)"
                          alt="PaperTimeSheet"
                          height="100px"
                          class="remove-white-background d-block m-auto"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div> -->
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#signedTimeSheetView"
              data-bs-dismiss="modal"
              @click="resetChanges"
            >
              Cancel
            </button>

            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="approved_TimesheetRevertMethod()"
            >
              Approve
            </button> -->
            <button
              v-if="status.trim().toLowerCase() === 'approved'"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              disabled
              @click.prevent="approved_TimesheetRevertMethod()"
            >
              {{ buttonText }}
            </button>
            <button
              v-else
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="approved_TimesheetRevertMethod()"
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
        paper_timesheet: "",
        // status: "",
        notes: "",
        start_comment: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        custom_image: "",
      },
      status: "",
      paper_timesheet: "",
      getSignedStaffView: [],
      apiResponse: "",
      showValueCustom: false,
      fullCustomImageUrl: null,
      apiResponse_EndTime: "",
      showSaveButton: true,
      isPublished: false,
      originalData: null,
      VITE_API_URL: " https://recpalapp.co.uk/api/",
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
    // handleFileUpload(event) {
    //   const file = event.target.files[0];

    //   if (file) {
    //     this.paper_timesheet = file;
    //     this.fullCustomImageUrl = URL.createObjectURL(file);
    //   } else {
    //     this.paper_timesheet = null;
    //     this.fullCustomImageUrl = null;
    //   }
    // },
    isSaveDisabled() {
      return !this.paper_timesheet;
    },
    formatTime(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
      } else {
        const adjustedHour = hour % 12;
        return `${String(adjustedHour).padStart(2, "0")}:00 PM`;
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
      return `${this.VITE_API_URL}${relativeUrl}`;
    },
    ...mapActions(["fetchSignedTimesheetData"]),
    async signedTimeSheetViewMethod(id) {
      if (id) {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.get(`${VITE_API_URL}/sign_timesheets/${id}`, {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          // Assign response data to your component's data properties
          this.getSignedStaffView = response.data.sign_timesheets;
          this.status = response.data.sign_timesheets.status || "";

          this.fetchSignedTimeSheet = {
            ...this.fetchSignedTimeSheet,

            ...this.getSignedStaffView,
          };

          // Store original data for potential resetting
          this.originalData = { ...this.fetchSignedTimeSheet };
          this.showSaveButton = false; // Update button visibility based on your logic
        } catch (error) {
          // console.error("Error fetching signed timesheet data:", error);
          // Optionally, you can set an error message to inform the user
          this.errorMessage = "Failed to fetch timesheet data. Please try again.";
        }
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
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
