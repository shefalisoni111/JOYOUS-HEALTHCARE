<!-- <template>
  <div>
    
    <div
      class="modal fade"
      id="generateInvoice"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="generateInvoice">Create Invoice</h5>
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
                    <select v-model="agency_setting_id" required>
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.agency_name }}
                      </option>
                    </select>
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
                    <input type="date" class="form-control" v-model="end_date" readonly />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
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
    return {
      invoice_creation_period: "",
      agency_setting_id: null,
      start_date: "",
      end_date: "",
      options: [],
    };
  },
  components: {
    NotSuccessAlertVue,
    SuccessAlert,
  },
  computed: {
    isFieldEmpty() {
      return !this.invoice_creation_period || !this.agency_setting_id || !this.start_date;
    },
    isValidForm() {
      return this.invoice_creation_period && this.agency_setting_id && this.start_date;
    },
  },
  methods: {
    clearFieldsData() {
      this.invoice_creation_period = "";
      this.agency_setting_id = null;
      this.start_date = "";
      this.end_date = "";
    },
    async createClientInvoice() {
      const token = localStorage.getItem("token");
      const data = {
        invoice_creation_period: this.invoice_creation_period,
        agency_setting_id: this.agency_setting_id,
        start_date: this.start_date,
        end_date: this.end_date,
      };
      try {
        const response = await axios.post(`${VITE_API_URL}/create_client_invoice`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
.modal-header {
  border-bottom: 0px;
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
  font-family: Verdana, sans-serif;
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
</style> -->

<template>
  <div>
    <div
      class="modal fade"
      id="generateInvoice"
      tabindex="-1"
      aria-labelledby="generateInvoiceLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="generateInvoiceLabel">Generate Invoice</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Client Selection -->
            <div class="mb-3">
              <label class="form-label">Clients</label>
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="client in clientData" :key="client.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'client-' + client.id"
                    :value="client.client_name"
                    v-model="selectedClients"
                    @change="onSingleClientSelect(client.id)"
                  />
                  <label
                    :for="'client-' + client.id"
                    class="form-check-label text-capitalize"
                  >
                    &nbsp;{{ client.client_name }} &nbsp;
                  </label>
                </div>
              </div>
            </div>

            <!-- Site Selection -->
            <div class="mb-3">
              <label class="form-label">Sites</label>
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="site in siteData" :key="site.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'site-' + site.id"
                    :value="site.site_name"
                    v-model="selectedSites"
                    @change="onSiteSelect(site.id)"
                  />
                  <label
                    :for="'site-' + site.id"
                    class="form-check-label text-capitalize"
                  >
                    &nbsp;{{ site.site_name }}&nbsp;
                  </label>
                </div>
              </div>
            </div>

            <!-- Job Position Selection -->
            <div class="mb-3">
              <label class="form-label">Job Positions</label>
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="job in jobData" :key="job.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'job-' + job.id"
                    :value="job.id"
                    v-model="selectedJobs"
                  />
                  <label :for="'job-' + job.id" class="form-check-label text-capitalize">
                    &nbsp;{{ job.name }}&nbsp;
                  </label>
                </div>
              </div>
            </div>

            <!-- Shift Selection -->
            <!-- <div class="mb-3">
              <label class="form-label">Shifts</label>
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="shift in shiftsTime" :key="shift.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="'shift-' + shift.id"
                    :value="shift.id"
                    v-model="selectedShifts"
                  />
                  <label
                    :for="'shift-' + shift.id"
                    class="form-check-label text-capitalize"
                  >
                    {{ shift.shift_name }}&nbsp;
                  </label>
                </div>
              </div>
            </div> -->

            <!-- Date Selection -->
            <div class="mb-3">
              <label for="dateSelect" class="form-label">Date</label>
              <select
                class="form-select"
                id="dateSelect"
                v-model="selectedDateOption"
                @change="handleDateSelection"
              >
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <!-- Custom Date Picker -->
            <div v-if="selectedDateOption === 'custom'" class="mb-3">
              <label for="customDateRange" class="form-label">Custom Date Range</label>
              <input
                type="date"
                class="form-control mb-2"
                v-model="customStartDate"
                placeholder="Start Date"
              />
              <input
                type="date"
                class="form-control"
                v-model="customEndDate"
                placeholder="End Date"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="applyFilters">
              Apply Filters and Download CSV
            </button>
          </div>
          <!-- <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clientData: [],
      siteData: [],
      jobData: [],
      shiftsTime: [],
      selectedStaff: [],
      selectedClients: [],
      selectedSites: [],
      selectedJobs: [],
      selectedShifts: [],

      selectedDateOption: "today",
      customStartDate: "",
      customEndDate: "",
    };
  },
  methods: {
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data || [];
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    },
    async onSingleClientSelect(clientId) {
      await this.getSiteAccordingClientMethod(clientId);
      await this.getJobTitleMethod(clientId);
    },
    async getSiteAccordingClientMethod(clientId) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${clientId}`
        );
        this.siteData = response.data.site || [];
      } catch (error) {
        console.error("Error fetching sites:", error);
        return [];
      }
    },
    async getJobTitleMethod(clientId) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/job_title_for_client/${clientId}`
        );
        this.jobData = response.data.data || [];
      } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
      }
    },
    async onSiteSelect(siteId) {
      await this.getTimeShift(siteId);
    },
    async getTimeShift(siteId) {
      try {
        const response = await axios.get(`${VITE_API_URL}/site_shift/${siteId}`);
        this.shiftsTime = response.data.site_shift_data;
      } catch (error) {
        console.error("Error fetching shifts:", error);
        return [];
      }
    },
    handleDateSelection() {
      if (this.selectedDateOption === "today") {
        const today = new Date().toISOString().split("T")[0];
        this.customStartDate = today;
        this.customEndDate = today;
      } else if (this.selectedDateOption === "weekly") {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() + 6));
        this.customStartDate = startOfWeek.toISOString().split("T")[0];
        this.customEndDate = endOfWeek.toISOString().split("T")[0];
      } else if (this.selectedDateOption === "monthly") {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        this.customStartDate = startOfMonth.toISOString().split("T")[0];
        this.customEndDate = endOfMonth.toISOString().split("T")[0];
      } else {
        this.customStartDate = "";
        this.customEndDate = "";
      }
    },
    // applyFilters() {
    //   console.log("Selected Filters:", {
    //     staff: this.selectedStaff,
    //     clients: this.selectedClients,
    //     sites: this.selectedSites,
    //     jobs: this.selectedJobs,
    //     shifts: this.selectedShifts,
    //     dateRange: {
    //       start: this.customStartDate,
    //       end: this.customEndDate,
    //     },
    //   });
    // },
    formatDate(date) {
      if (!date) {
        console.error("Invalid date provided:", date);
        return null;
      }

      const d = new Date(date);

      if (isNaN(d)) {
        console.error("Unable to parse date:", date);
        return null;
      }

      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();

      return `${month}/${day}/${year}`;
    },
    applyFilters() {
      const token = localStorage.getItem("token");

      const params = {
        range: this.selectedDateOption,
        "report[candidate_id][]": this.selectedStaff,
        "report[client][]": this.selectedClients,
        "report[site][]": this.selectedSites,
        "report[shift_date]": this.customStartDate,
        format: "csv",
      };

      if (this.selectedDateOption === "custom") {
        params.start_date = this.formatDate(this.customStartDate);
        params.end_date = this.formatDate(this.customEndDate);
      } else {
        params["report[date]"] = this.customStartDate;
      }

      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => queryParams.append(key, item));
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const url = `${VITE_API_URL}/generate_report?${queryParams.toString()}`;

      axios
        .get(url, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        })
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", "report.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error generating the report:", error);
        });
    },
  },
  mounted() {
    this.getClientMethod();
  },
};
</script>

<style>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
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
.modal-body {
  background: transparent;
}
label.form-label {
  text-transform: capitalize;
}
</style>
