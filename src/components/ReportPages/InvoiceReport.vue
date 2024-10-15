<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex ms-2 justify-content-between">
                <div class="d-flex gap-2">
                  <select v-model="client_id" id="selectClients" @change="filterData">
                    <option value="">All Client</option>
                    <option
                      v-for="option in clientData"
                      :key="option.id"
                      :value="option.first_name"
                      aria-placeholder="Select Job"
                    >
                      {{ option.first_name }}
                    </option>
                  </select>
                  <select v-model="site_id" id="selectBusinessUnit" @change="filterData">
                    <option value="">All Site</option>
                    <option
                      v-for="option in businessUnit"
                      :key="option.id"
                      :value="option.site_name"
                      placeholder="Select BusinessUnit"
                    >
                      {{ option.site_name }}
                    </option>
                  </select>

                  <select v-model="id" @change="filterData">
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

                <div>
                  <form
                    @submit.prevent="search"
                    class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                  >
                    <input
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Search.."
                      aria-label="Search"
                      v-model="searchQuery"
                      @input="debounceSearch"
                    />
                  </form>
                </div>
              </div>
              <div>
                <div class="p-2">
                  <div
                    class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between"
                  >
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
                        <select
                          class="form-control"
                          v-model="currentView"
                          @change="updateDateRange"
                        >
                          <!-- <option value="weekly">Weekly</option> -->
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center">
                        <span
                          v-if="currentView === 'weekly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{
                            "Monday " +
                            formatDate(startDate) +
                            " to Sunday " +
                            formatDate(endDate)
                          }}
                        </span>
                        <span
                          v-else-if="currentView === 'monthly' && startDate && endDate"
                          class="fw-bold"
                        >
                          {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                        </span>
                      </div>
                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center fs-4">
                        <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                        <i class="bi bi-calendar2-check-fill"></i>
                        <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center mt-lg-0 mt-3">
                      <div
                        v-if="!paginateClientReport || paginateClientReport.length === 0"
                        class="tooltip-wrapper"
                        data-bs-toggle="tooltip"
                        title="No data available to export"
                      >
                        <button
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          @click="exportAll"
                          :disabled="true"
                        >
                          <i class="bi bi-download"></i> Export CSV
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          @click="exportAll"
                        >
                          <i class="bi bi-download"></i> Export CSV
                        </button>
                      </div>

                      <!-- <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button> -->
                    </div>
                  </div>
                </div>

                <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div v-for="(day, index) in getWeekDates" :key="index"></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
                  <div>
                    <div v-for="(day, index) in getMonthDates" :key="index"></div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="tab-content mt-4" id="pills-tabContent" v-if="!searchQuery">
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <!-- <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sender</th>

                          <th scope="col">Recipient</th>
                          <th scope="col">Status</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Recipient Domain</th>
                          <th scope="col">Date Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">Aniket</td>

                          <td scope="col">Prabhu</td>
                          <td scope="col">Active</td>
                          <td scope="col">Site Report</td>
                          <td scope="col">Recipient Domain</td>
                          <td scope="col">23/2/2024</td>
                        </tr>
                      </tbody>
                    </table> -->
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Client</th>

                          <th scope="col">Employee Name</th>
                          <th scope="col">Job</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Payment Ref</th>
                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Hours</th>
                          <th scope="col">Charge Rate</th>
                          <th scope="col">Total Charge</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateClientReport?.length > 0">
                        <tr v-for="(data, index) in paginateClientReport" :key="index">
                          <td scope="col">{{ index + 1 }}</td>
                          <td scope="col">{{ data.client }}</td>
                          <td scope="col">{{ data.candidate }}</td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col" class="text-center">{{ data.paid_amount }}</td>
                          <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status }}</td>
                          <td scope="col">{{ data.invoice_creation_period }}</td>

                          <td><button class="btn btn-success">Approved</button></td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="errorMessageFilter">
                          <td colspan="12" class="text-danger text-center">
                            {{ errorMessageFilter }}
                          </td>
                        </tr>
                        <tr v-else>
                          <td colspan="12" class="text-danger text-center">
                            {{ errorMessageCustom }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
                <div class="tab-content mt-4" id="pills-tabContent" v-if="searchQuery">
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <!-- <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sender</th>

                          <th scope="col">Recipient</th>
                          <th scope="col">Status</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Recipient Domain</th>
                          <th scope="col">Date Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="col">Aniket</td>

                          <td scope="col">Prabhu</td>
                          <td scope="col">Active</td>
                          <td scope="col">Site Report</td>
                          <td scope="col">Recipient Domain</td>
                          <td scope="col">23/2/2024</td>
                        </tr>
                      </tbody>
                    </table> -->
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Client</th>

                          <th scope="col">Employee Name</th>
                          <th scope="col">Job</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Payment Ref</th>
                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Hours</th>
                          <th scope="col">Charge Rate</th>
                          <th scope="col">Total Charge</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateSearchResults?.length > 0">
                        <tr v-for="(data, index) in paginateSearchResults" :key="index">
                          <td scope="col">{{ index + 1 }}</td>
                          <td scope="col">{{ data.client }}</td>
                          <td scope="col">{{ data.candidate }}</td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col" class="text-center">{{ data.paid_amount }}</td>
                          <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status }}</td>
                          <td scope="col">{{ data.invoice_creation_period }}</td>

                          <td><button class="btn btn-success">Approved</button></td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="12" class="text-danger text-center">
                            {{ errorMessage }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-3"
      style="text-align: right"
      v-if="getClientInvoiceDetail?.length >= 8 && !searchResults.length"
    >
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getClientInvoiceDetail?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <div class="mx-3 mb-2" style="text-align: right" v-if="searchResults.length >= 10">
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= searchResults.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import Loader from "../Loader/Loader.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentView: "monthly",
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      startDate: new Date(),
      endDate: new Date(),
      client_id: "",
      clientData: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: null,
      debounceTimeout: null,
      errorMessage: "",
      searchResults: [],
      isLoading: false,
      site_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
      errorMessageFilter: "",
      errorMessageCustom: "",
      getClientInvoiceDetail: [],
      employeeData: [],
      employment_type_id: "",
      id: "",
      candidateLists: [],
    };
  },
  components: { Navbar, Loader },
  computed: {
    paginateClientReport() {
      if (!Array.isArray(this.getClientInvoiceDetail)) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientInvoiceDetail.slice(startIndex, endIndex);
    },
    paginateSearchResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateClientReport.length;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return client_id ? client_id.first_name : "";
    },
    selectEmployeeType() {
      const employment_type_id = this.employeeData.find(
        (option) => option.id === this.employment_type_id
      );
      return employment_type_id ? employment_type_id.title : "";
    },
    getWeekDates() {
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },

    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },
  },
  methods: {
    async filterData() {
      const filters = {
        filter_type: this.client_id
          ? "client"
          : this.site_id
          ? "site"
          : this.id
          ? "staff"
          : "",
        filter_value:
          this.client_id || this.site_id || this.getCandidateName(this.id) || "",
      };

      await this.makeFilterAPICall(filters.filter_type, filters.filter_value);
    },
    getCandidateName(id) {
      const candidate = this.candidateLists.find((candidate) => candidate.id === id);
      return candidate ? candidate.first_name : "";
    },
    async makeFilterAPICall(filter_type, filter_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/invoice_report_filter`, {
          params: {
            filter_type: filter_type,
            filter_value: filter_value,
          },
        });

        this.getClientInvoiceDetail = response.data.data || [];
        if (this.getClientInvoiceDetail.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error specifically
          // alert("No records found for the given filter.");
        } else {
          // Handle other errors
          // alert("An unexpected error occurred. Please try again later.");
        }
      }
    },
    async getClientMethod() {
      const pagesToFetch = [1, 2, 3];
      let allClientData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/clients`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allClientData = allClientData.concat(response.data.data);
        });

        this.clientData = allClientData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    exportAll() {
      const formattedDate = this.formatDate(this.startDate);

      const params = {
        date: formattedDate,
      };

      axios
        .get(`${VITE_API_URL}/export_invoices.csv`, { params })
        .then((response) => {
          this.downloadCSV(response.data, "Client_ReportData.csv");
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    },
    downloadCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const response = await axiosInstance.get(
          `${VITE_API_URL}/client_invoice_serching`,
          {
            params: {
              invoice_query: this.searchQuery,
            },
          }
        );

        this.searchResults = response.data.candidate;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Record found for the specified criteria";
        }
      }
    },
    async getCandidateMethods() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allStaffData = allStaffData.concat(response.data.data);
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
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.getClientInvoiceReport();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.getClientInvoiceReport();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    async getClientInvoiceReport() {
      const token = localStorage.getItem("token");

      const startOfMonth = new Date(
        this.startDate.getFullYear(),
        this.startDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        this.endDate.getFullYear(),
        this.endDate.getMonth() + 1,
        0
      );

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const requestData = {
        date: formatDate(startOfMonth),
      };

      try {
        const response = await axios.get(`${VITE_API_URL}/client_invoices`, {
          params: requestData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        // Set the invoice details
        this.getClientInvoiceDetail = response.data.data || [];

        // Check if the result is empty and set the error message
        if (this.getClientInvoiceDetail.length === 0) {
          this.errorMessageFilter = "Report record Not found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        // console.error("Error fetching client invoice report:", error);
        this.errorMessageFilter = "An error occurred while fetching the report.";
      }
    },
  },

  mounted() {
    // this.createVacancy();
    this.getClientInvoiceReport();
    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    this.getCandidateMethods();
    this.getClientMethod();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.reportTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}

@media (max-width: 1120px) {
  .reportTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
