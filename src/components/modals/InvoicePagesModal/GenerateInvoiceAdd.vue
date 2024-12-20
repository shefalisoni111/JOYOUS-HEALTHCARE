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

              <select
                v-model="client_id"
                id="selectClients"
                @change="onSingleClientSelect(client_id)"
                class="form-select"
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
              <!-- <div class="d-flex gap-3 flex-wrap">
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
              </div> -->
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
                <!-- <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option> -->
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
              Generate CSV
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
      client_id: "",
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
