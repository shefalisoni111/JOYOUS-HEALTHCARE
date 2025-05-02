<template>
  <div>
    <div
      class="modal fade"
      id="AddGenrateInvoiceFile"
      aria-labelledby="invoicePage"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddGenrateInvoiceFile">
              Create Invoice
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form @submit.prevent="addCandidate">
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">Invoice Creation Period</label>
                  </div>
                  <div class="col-8">
                    <select
                      v-model="invoice_creation_period"
                      @change="handlePeriodChange"
                      required
                    >
                      <option value="">Select Period</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Daily">Daily</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">Agency Setting</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="text"
                      class="form-control"
                      v-model="agency_setting_id"
                      readonly
                    />
                    <!-- <select v-model="agency_setting_id" required>
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.agency_name }}
                      </option>
                    </select> -->
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">Start Date</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="date"
                      class="form-control"
                      v-model="start_date"
                      @change="handleDateChange"
                      required
                    />
                  </div>
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-4">
                    <label class="form-label">End Date</label>
                  </div>
                  <div class="col-8">
                    <input
                      type="date"
                      class="form-control"
                      v-model="end_date"
                      readonly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-dismiss="modal"
              @click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              :disabled="!isValidForm || isFieldEmpty"
              @click="addCandidate"
              :data-bs-dismiss="!isFieldEmpty && isValidForm ? 'modal' : null"
            >
              Add
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
import NotSuccessAlertVue from "../../Alerts/NotSuccessAlert.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "GenerateInvoiceAdd",
  data() {
    const mUnique = localStorage.getItem("m_unique");
    return {
      id: null,
      invoice_creation_period: "",
      agency_setting_id: mUnique || null,
      start_date: "",
      end_date: "",
      options: [],
    };
  },
  components: {
    NotSuccessAlertVue,
    SuccessAlert,
  },
  props: {
    selectedId: {
      type: Number,
    },
  },
  computed: {
    isFieldEmpty() {
      return (
        !this.invoice_creation_period ||
        !this.agency_setting_id ||
        !this.start_date
      );
    },
    isValidForm() {
      return (
        this.invoice_creation_period &&
        this.agency_setting_id &&
        this.start_date
      );
    },
  },
  methods: {
    clearFieldsData() {
      (this.id = ""), (this.invoice_creation_period = "");
      this.agency_setting_id = null;
      this.start_date = "";
      this.end_date = "";
    },
    async createClientInvoice() {
      const token = localStorage.getItem("token");
      const mUnique = localStorage.getItem("m_unique");
      const data = {
        invoice_creation_period: this.invoice_creation_period,
        agency_setting_id: mUnique,
        start_date: this.start_date,
        end_date: this.end_date,
        id: this.selectedId,
      };
      try {
        const response = await axios.post(
          `${VITE_API_URL}/create_client_invoice`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.error) {
          this.$refs.dangerAlert.showSuccess(response.data.error);
        } else {
          this.$emit("addSite");
          const message = "Invoice successfully created";

          this.$refs.successAlert.showSuccess(message);
        }
      } catch (error) {
        // const errorMessage = "Error creating invoice. Please try again.";
        // if (this.$refs.notSuccessAlert) {
        //   this.$refs.notSuccessAlert.dangerAlert(errorMessage);
        // }
      }
    },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/agency_settings`);
        this.options = response.data;
      } catch (error) {
        // console.error("Error fetching agency settings:", error);
      }
    },
    handleDateChange() {
      if (this.start_date) {
        this.updateEndDate();
      }
    },
    handlePeriodChange() {
      if (this.start_date) {
        this.updateEndDate();
      }
    },
    updateEndDate() {
      const startDate = new Date(this.start_date);
      let endDate;

      switch (this.invoice_creation_period) {
        case "Weekly":
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          break;
        case "Daily":
          endDate = new Date(startDate);
          break;
        case "Monthly":
          endDate = new Date(startDate);
          endDate.setMonth(startDate.getMonth() + 1);
          endDate.setDate(endDate.getDate() - 1);
          break;
        default:
          endDate = "";
      }

      this.end_date = endDate ? endDate.toISOString().slice(0, 10) : "";
    },
    async addCandidate() {
      if (!this.isFieldEmpty) {
        await this.createClientInvoice();
        this.clearFieldsData();
      }
    },
  },
  created() {
    this.getPositionMethod();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
}
label.form-label {
  text-transform: capitalize;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
