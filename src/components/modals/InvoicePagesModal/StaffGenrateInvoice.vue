<template>
  <div>
    <div
      class="modal fade"
      id="staffGenerateCsv"
      aria-labelledby="staffGenerateCsvLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staffGenerateCsvLabel">
              Generate Invoice
            </h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Client Selection -->
            <div class="mb-3">
              <label class="form-label">Staff</label>

              <select
                v-model="selectedCandidate"
                class="form-select w-50"
                @change="fetchJobs()"
                id="selectStaff"
              >
                <option value="">All Staff</option>

                <option
                  v-for="option in candidateLists"
                  :key="option.id"
                  :value="option.id"
                  placeholder="Select Staff"
                >
                  {{ option.first_name + " " + option.last_name }}
                </option>
              </select>
            </div>

            <!-- Date Selection -->
            <div class="mb-3"></div>

            <!-- Custom Date Picker -->
            <div v-if="selectedDateOption === 'custom'" class="mb-3">
              <label for="customDateRange" class="form-label"
                >Custom Date</label
              >
              <div class="d-flex justify-content-center gap-3">
                <input
                  type="date"
                  class="form-control"
                  v-model="customStartDate"
                  placeholder="Start Date"
                  @change="fetchJobs()"
                />
                <input
                  type="date"
                  class="form-control"
                  v-model="customEndDate"
                  placeholder="End Date"
                  @change="fetchJobs()"
                />
              </div>
            </div>
            <!-- Job Position Selection -->
            <div class="mb-3" v-if="jobData.length > 0">
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
                  <label
                    :for="'job-' + job.id"
                    class="form-check-label text-capitalize"
                  >
                    &nbsp;{{ job.name }}&nbsp;
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-dark btn-cancel"
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
      candidateLists: [],
      startDate: new Date(),
      endDate: new Date(),
      jobData: [],
      client_id: "",
      selectedDateOption: "custom",
      customStartDate: "",
      customEndDate: "",
      selectedCandidate: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.selectedCandidate && this.customStartDate && this.customEndDate
      );
    },
    selectStaff() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },
  },
  methods: {
    ...mapActions(["setInvoiceStaffData"]),
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
    getCandidateName(id) {
      const candidate = this.candidateLists.find(
        (candidate) => candidate.id === id
      );
      return candidate ? `${candidate.first_name} ${candidate.last_name}` : "";
    },
    async fetchJobs() {
      if (!this.selectedCandidate) {
        this.jobData = [];
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_candidates_jobs`,
          {
            params: {
              candidate_id: this.selectedCandidate,
              start_date: this.customStartDate,
              end_date: this.customEndDate,
            },
          }
        );
        this.jobData = response.data;
      } catch (error) {
        // console.error("Error fetching job positions:", error);
      }
    },

    async getCandidateListMethod() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];
      const payload = {
        status_value: "approved",
        activated_value: true,
        per_page: 10,
      };

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                ...payload,
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          if (response.data && response.data.data) {
            allStaffData = allStaffData.concat(response.data.data);
          }
        });
        this.candidateLists = allStaffData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
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
    // async getJobTitleMethod(clientId) {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/job_title_for_client/${clientId}`
    //     );
    //     this.jobData = response.data.data || [];
    //   } catch (error) {
    //     console.error("Error fetching jobs:", error);
    //     return [];
    //   }
    // },
    async onSiteSelect(siteId) {
      await this.getTimeShift(siteId);
    },
    async getTimeShift(siteId) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${siteId}`
        );
        this.shiftsTime = response.data.site_shift_data;
      } catch (error) {
        // console.error("Error fetching shifts:", error);
        return [];
      }
    },
    handleDateSelection() {
      if (this.selectedDateOption === "custom") {
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

      return `${day}/${month}/${year}`;
    },
    resetFields() {
      this.selectedStaff = [];
      this.selectedSites = [];
      this.selectedCandidate = "";
      // this.selectedDateOption = "";
      this.customStartDate = null;
      this.customEndDate = null;
    },
    applyFilters() {
      this.fetchJobs();
      const token = localStorage.getItem("token");

      const params = {
        // "candidate_id[]": this.selectedStaff,
        "candidate_id[]": this.selectedCandidate,
        "site_id[]": this.selectedSites,

        invoice_type: "staff_invoice",
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
            this.resetFields();
            this.$emit("StaffReportData");
            if (response.status === 200) {
              if (response.data.data && response.data.data.length === 0) {
                // this.candidateList = response.data.data;

                this.errorMessage = "Data Not Found for the specified Date";
                Swal.fire({
                  icon: "success",
                  title: "No Data Found",
                  text: this.errorMessage,
                });
              } else {
                this.$store.dispatch("setInvoiceStaffData", response.data.data);
                this.$router.push({ name: "GenerateStaffView" });
              }
              this.resetFields();
            }
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
        });
    },
  },
  mounted() {
    this.getCandidateListMethod();
  },
};
</script>

<style>
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
