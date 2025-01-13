<template>
  <div>
    <div
      class="modal fade"
      id="generateInvoice"
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
            </div>

            <!-- Site Selection -->
            <div class="mb-3">
              <label class="form-label">Sites</label>
              <div class="form-check" v-if="siteData?.length > 0">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="select-all-sites"
                  @change="toggleAllSites"
                />
                <label for="select-all-sites" class="form-check-label">
                  &nbsp;Select All Sites&nbsp; </label
                ><br />
              </div>
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="site in siteData" :key="site.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="site.id"
                    :value="site.id"
                    v-model="selectedSites"
                    @change="onSiteSelect(site.id)"
                  />
                  <label :for="site.id" class="form-check-label text-capitalize">
                    &nbsp;{{ site.site_name }}&nbsp;
                  </label>
                </div>
              </div>
            </div>

            <!-- Job Position Selection -->
            <div class="mb-3">
              <label class="form-label">Job Positions</label>

              <div class="form-check" v-if="jobData?.length > 0">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="select-all-jobs"
                  :checked="selectedJobs.length === jobData.length"
                  @change="toggleAllJobs"
                />
                <label for="select-all-jobs" class="form-check-label">
                  &nbsp;Select All Jobs&nbsp;
                </label>
              </div>

              <div class="d-flex gap-3 flex-wrap">
                <div v-for="job in jobData" :key="job.id" class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="job.id"
                    :value="job.id"
                    v-model="selectedJobs"
                  />
                  <label :for="job.id" class="form-check-label text-capitalize">
                    &nbsp;{{ job.name }}&nbsp; </label
                  ><br />
                </div>
              </div>
            </div>

            <!-- Date Selection -->
            <div class="mb-3"></div>

            <!-- Custom Date Picker -->
            <div v-if="selectedDateOption === 'custom'" class="mb-3">
              <label for="customDateRange" class="form-label">Custom Date</label>
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
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="resetFields"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="applyFilters"
              :disabled="!isFormValid"
            >
              Generate View
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapActions } from "vuex";

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
      selectedDateOption: "custom",
      customStartDate: "",
      customEndDate: "",
      selectedSites: [],
      selectedJobs: [],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.client_id &&
        this.selectedSites.length > 0 &&
        this.selectedJobs.length > 0 &&
        this.customStartDate &&
        this.customEndDate
      );
    },
  },
  methods: {
    ...mapActions(["setInvoiceData"]),
    toggleAllSites() {
      if (this.selectedSites.length === this.siteData.length) {
        this.selectedSites = [];
      } else {
        this.selectedSites = this.siteData.map((site) => site.id);
      }
    },
    toggleAllJobs() {
      if (this.selectedJobs.length === this.jobData.length) {
        this.selectedJobs = [];
      } else {
        this.selectedJobs = this.jobData.map((job) => job.id);
      }
    },
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
      if (this.selectedDateOption === "custom") {
        this.customStartDate = "";
        this.customEndDate = "";
      }
    },

    formatDate(date) {
      if (!date) {
        // console.error("Invalid date provided:", date);
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

      return `${day}/${month}/${year}`;
    },
    applyFilters() {
      const token = localStorage.getItem("token");

      const params = {
        "job_id[]": this.selectedJobs,
        "candidate_id[]": this.selectedStaff,
        client_id: this.client_id,
        "site_id[]": this.selectedSites,
        shift_date: this.formatDate(this.customStartDate),
        invoice_type: "client_invoice",
      };

      if (this.selectedDateOption === "custom") {
        params.start_date = this.formatDate(this.customStartDate);
        params.end_date = this.formatDate(this.customEndDate);
        params.invoice_type = "client_invoice";
      }

      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => queryParams.append(key, item));
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const url = `${VITE_API_URL}/generate_client_invoices?${queryParams.toString()}`;

      axios
        .get(url, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.data && response.data.data.length === 0) {
              // this.candidateList = response.data.data;
              // console.log(response.data.data);

              this.errorMessage = "Data Not Found for the specified Date";
              Swal.fire({
                icon: "success",
                title: "No Data Found",
                text: this.errorMessage,
              });
            } else {
              this.$store.dispatch("setInvoiceData", response.data.data);
              this.$router.push({ name: "GenerateView" });
            }
            this.resetFields();
          }
        })
        .catch((error) => {
          // console.error("Error generating the report:", error);
          this.errorMessage = "Data Not Found.";
          Swal.fire({
            icon: "error",
            title: "Error",
            text: this.errorMessage,
          });
          this.resetFields();
        });
    },
    resetFields() {
      this.selectedJobs = [];
      this.selectedStaff = [];
      this.selectedSites = [];
      this.selectedShifts = [];
      this.client_id = null;

      this.customStartDate = "";
      this.customEndDate = "";
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
