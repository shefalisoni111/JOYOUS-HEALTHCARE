<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCustomTimeSheet"
      aria-labelledby="editCustomTimeSheet"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCustomTimeSheet">Edit Custom TimeSheet</h5>
          </div>
          <div class="modal-body mx-3">
            <form>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Shift Date</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.shift_date"
                  />
                </div>
              </div>
              <!-- <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Start Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.start_time"
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
                  <select
                    id="selectCustomStartTime"
                    class="form-select w-25"
                    v-model="fetchCustomSheetData.start_time"
                    @change="validateStartTime"
                  >
                    <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                      {{ formatTime(hour) }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label" for="selectedEndTime">End Time </label>
                </div>
                <div class="col-12">
                  <select
                    id="selectedEndTime"
                    class="form-select w-25"
                    v-model="fetchCustomSheetData.end_time"
                    @change="validateStartTime"
                  >
                    <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                      {{ formatTime(hour) }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">End Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.end_time"
                  />
                </div>
              </div> -->

              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Client Rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="number"
                    class="form-control w-25"
                    v-model="fetchCustomSheetData.client_rate"
                    @input="handleInput('client_rate', client_rate)"
                  />
                  <span
                    v-if="!validationClientRate && fetchCustomSheetData.client_rate <= 0"
                    class="text-danger"
                  >
                    Client Rate must be a positive number
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Staff Rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="number"
                    class="form-control w-25"
                    v-model="fetchCustomSheetData.staff_rate"
                    @input="handleInput('staff_rate', staff_rate)"
                  />
                  <span
                    v-if="!validationClientRate && fetchCustomSheetData.staff_rate <= 0"
                    class="text-danger"
                  >
                    Client Rate must be a positive number
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Paper TimeSheet</label>
                </div>
                <div class="col-12 mt-1" v-if="fetchCustomSheetData.custom_image">
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
                  <span v-if="!validationPaperTimeSheet" class="text-danger">
                    Paper TimeSheet is required
                  </span>
                </div>
                <!-- <div class="col-12 mt-1">
                  <img
                    :src="fullCustomImageUrl"
                    alt="Current Paper TimeSheet"
                    class="img-fluid"
                    width="20%"
                  />
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="handleFileUpload"
                  />
                  <span v-if="!validationPaperTimeSheet" class="text-danger">
                    Paper TimeSheet is required
                  </span>
                </div> -->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editCustomTimeSheet"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-on:click="updateCustomTimeSheetMethod()"
              data-bs-dismiss="modal"
            >
              Save
            </button> -->
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-on:click="saveAndApprove()"
              :disabled="isSaveDisabled"
              data-bs-dismiss="modal"
            >
              Approve
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
        paper_timesheet: "",
        approved_hour: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        custom_image: "",
      },
      options: [],
      validationClientRate: true,
      validationPaperTimeSheet: true,
      businessUnit: [],
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
    isSaveDisabled() {
      return (
        this.fetchCustomSheetData.client_rate === null ||
        this.fetchCustomSheetData.client_rate <= 0 ||
        !this.fetchCustomSheetData.paper_timesheet
      );
    },
    fullCustomImageUrl() {
      return `${VITE_API_URL}${this.fetchCustomSheetData.custom_image}`;
    },
  },
  methods: {
    async saveAndApprove() {
      // Call the update method and wait for it to complete
      await this.updateCustomTimeSheetMethod();

      // After updating, call the approve method
      await this.approved_hourMethod();
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
        this.fetchCustomSheetData.paper_timesheet = file;
        this.validatePaperTimeSheet();
      }
    },
    validatePaperTimeSheet() {
      this.validationPaperTimeSheet = !!this.fetchCustomSheetData.paper_timesheet;
    },
    formatTime(hour) {
      if (hour === 0 || hour === 24) {
        return `12:00 AM`;
      } else if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
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

    async fetchCustomTimeSheetData(id) {
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/custom_timesheets/${id}`);
        const customSheets = response.data.custom_sheets;

        // Update fields individually
        this.fetchCustomSheetData = {
          ...this.fetchCustomSheetData,
          id: customSheets.id,
          code: customSheets.code,
          name: customSheets.name,
          site: customSheets.site,
          job: customSheets.job,
          client: customSheets.client,
          shift_date: customSheets.shift_date,
          start_time: customSheets.start_time, // Set a default time
          end_time: customSheets.end_time, // Set a default time
          break: customSheets.break,
          total_hours: customSheets.total_hours,
          client_rate: customSheets.client_rate,
          total_cost: customSheets.total_cost,
          candidate_id: customSheets.candidate_id,
          status: customSheets.status,
          booking_id: customSheets.booking_id,
          shift_name: customSheets.shift_name,
          client_pay_amount: customSheets.client_pay_amount,
          staff_rate: customSheets.staff_rate,
          staff_pay_amount: customSheets.staff_pay_amount,
          notes: customSheets.notes,
          approved_hour: customSheets.approved_hour,
          custom_image: customSheets.paper_timesheet,
        };
      } catch (error) {}
    },

    async updateCustomTimeSheetMethod() {
      try {
        const formData = new FormData();

        formData.append(
          "custom_timesheet[shift_date]",
          this.fetchCustomSheetData.shift_date
        );
        formData.append(
          "custom_timesheet[start_time]",
          this.fetchCustomSheetData.start_time
        );
        formData.append("custom_timesheet[end_time]", this.fetchCustomSheetData.end_time);
        formData.append(
          "custom_timesheet[client_rate]",
          this.fetchCustomSheetData.client_rate
        );
        formData.append(
          "custom_timesheet[client_rate]",
          this.fetchCustomSheetData.staff_rate
        );
        formData.append(
          "custom_timesheet[approved_hour]",
          this.fetchCustomSheetData.approved_hour
        );

        if (this.fetchCustomSheetData.paper_timesheet instanceof File) {
          formData.append(
            "custom_timesheet[custom_image]",
            this.fetchCustomSheetData.paper_timesheet
          );
        }

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomSheetData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.custom_sheets,
        });

        this.$emit("CustomTimeSheetData-updated");
        const message = "Custom TimeSheet Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating custom timesheet:", error);
      }
    },
    async approved_hourMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/approved_and_unapproved_timesheet_to_web/${this.fetchCustomSheetData.id}`
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
    customDataId: {
      immediate: true,
      handler(newcustomDataId) {
        this.fetchCustomTimeSheetData(newcustomDataId);
      },
    },
  },
  mounted() {},
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
