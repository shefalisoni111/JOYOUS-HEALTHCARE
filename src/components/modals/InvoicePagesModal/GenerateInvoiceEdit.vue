<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editGenerateInvoice"
      aria-labelledby="editGenerateInvoice"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editGenerateInvoice">Edit Invoice</h5>
          </div>
          <div class="modal-body mx-3">
            <form>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Shift Date</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="date"
                    class="form-control"
                    v-model="fetchCustomSheetData.shift_date"
                  />
                </div>
              </div>
              <!-- <div class="mb-3">
                <div class="col-12">
                  <label class="form-label" for="selectCustomStartTime"
                    >Start Time
                  </label>
                </div>
                <div class="col-12">
                  <select
                    id="selectCustomStartTime"
                    class="form-select w-25"
                    v-model="fetchCustomSheetData.start_date"
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
                    v-model="fetchCustomSheetData.end_date"
                    @change="validateStartTime"
                  >
                    <option v-for="hour in 24" :key="hour" :value="formatTime(hour)">
                      {{ formatTime(hour) }}
                    </option>
                  </select>
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
                    @input="validateClientRate"
                    @keydown.prevent
                  />
                  <span
                    v-if="
                      !validationClientRate &&
                      fetchCustomSheetData.client_rate <= 0
                    "
                    class="text-danger"
                  >
                    Client Rate must be a positive number
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editGenerateInvoice"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary text-capitalize fw-medium"
              v-on:click="updateCustomTimeSheetMethod()"
              :disabled="isSaveDisabled"
              data-bs-dismiss="modal"
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
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "EditeTemplate",
  data() {
    return {
      fetchCustomSheetData: {
        id: "",
        shift_date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",
        approved_hour: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        custom_image: "",
      },
      options: [],
      validationClientRate: true,
      businessUnit: [],
    };
  },
  props: {
    InvoiceId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },
  computed: {
    isSaveDisabled() {
      return (
        this.fetchCustomSheetData.client_rate === null ||
        this.fetchCustomSheetData.client_rate <= 0
      );
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
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
      if (!id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_timesheets/${id}`
        );
        this.fetchCustomSheetData = {
          id: response.data.custom_sheets.id,
          shift_date: response.data.custom_sheets.shift_date,
          job: response.data.custom_sheets.job,
          start_date: response.data.custom_sheets.start_date,
          end_date: response.data.custom_sheets.end_date,
          client_rate: response.data.custom_sheets.client_rate,
          total_amount: response.data.custom_sheets.total_amount,
          paid_amount: response.data.custom_sheets.paid_amount,
          balance_amount: response.data.custom_sheets.balance_amount,
        };
      } catch (error) {
        // console.error("Error fetching custom timesheet data:", error);
      }
    },

    async updateCustomTimeSheetMethod() {
      try {
        const payload = {
          custom_timesheet: this.fetchCustomSheetData,
        };

        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomSheetData.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.custom_sheets,
        });
        this.$emit("CustomTimeSheetData-updated");

        const message = "Invoice Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating custom timesheet:", error);
        if (error.response && error.response.data) {
          //   console.error("Server response:", error.response.data);
        }
      }
    },
  },
  watch: {
    InvoiceId: {
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
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
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
