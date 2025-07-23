<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex ms-2 justify-content-between">
                <div class="d-flex flex-wrap gap-2">
                  <div class="custom-select-wrapper">
                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="handleClientChange"
                    >
                      <option value="">All Client</option>
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.client_name }}
                      </option>
                    </select>
                  </div>
                  <div class="custom-select-wrapper">
                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="filterData"
                      :disabled="!businessUnit.length"
                    >
                      <option value="">All Site</option>
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div class="p-2">
                  <div
                    class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between"
                  >
                    <div class="d-flex">
                      <div class="d-flex align-items-center gap-2">
                        <div class="view-toggle">
                          <button
                            :class="[
                              'toggle-btn',
                              currentView === 'weekly' ? 'active' : '',
                            ]"
                            @click="
                              currentView = 'weekly';
                              updateDateRange();
                            "
                          >
                            Weekly
                          </button>
                          <button
                            :class="[
                              'toggle-btn',
                              currentView === 'monthly' ? 'active' : '',
                            ]"
                            @click="
                              currentView = 'monthly';
                              updateDateRange();
                            "
                          >
                            Monthly
                          </button>
                        </div>
                      </div>

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center">
                        <span
                          v-if="
                            currentView === 'weekly' && startDate && endDate
                          "
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
                          v-else-if="
                            currentView === 'monthly' && startDate && endDate
                          "
                          class="fw-bold"
                        >
                          {{
                            formatDate(startDate) + " to " + formatDate(endDate)
                          }}
                        </span>
                      </div>
                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center fs-4">
                        <i
                          class="bi bi-caret-left-fill"
                          @click="moveToPrevious"
                        ></i>
                        <i class="bi bi-calendar2-check-fill"></i>
                        <i
                          class="bi bi-caret-right-fill"
                          @click="moveToNext"
                        ></i>
                      </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center mt-lg-0 mt-3">
                      <div
                        v-if="
                          !paginateClientReport ||
                          paginateClientReport.length === 0
                        "
                        class="tooltip-wrapper"
                        data-bs-toggle="tooltip"
                        title="No data available to export"
                      >
                        <button
                          type="button"
                          class="btn btn-danger btn-lg text-nowrap"
                          @click="exportOneFile('all')"
                          :disabled="true"
                        >
                          <i class="bi bi-download"></i> Export CSV
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          class="btn btn-danger btn-lg text-nowrap"
                          @click="exportOneFile('all')"
                        >
                          <i class="bi bi-download"></i> Export CSV
                        </button>
                      </div>
                      <div>
                        <form
                          @submit.prevent="search"
                          class="w-md-auto position-relative"
                        >
                          <input
                            class="form-control form-control-lg mr-sm-2 bg-white"
                            type="search"
                            placeholder="Search.."
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                          <span
                            class="position-absolute top-50 end-0 translate-middle-y pe-3"
                          >
                            <img
                              src="../../assets/Search.png"
                              class="img-fluid pe-2"
                              alt="RecPal"
                              loading="eager"
                          /></span>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="currentView === 'monthly'">
                  <div>
                    <div
                      v-for="(day, index) in getMonthDates"
                      :key="index"
                    ></div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div
                  class="tab-content mt-4"
                  id="pills-tabContent"
                  v-if="!searchQuery"
                >
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>

                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Hours</th>
                          <!-- <th scope="col">Charge Rate</th> -->
                          <th scope="col">Total Charge</th>

                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateClientReport?.length > 0">
                        <tr
                          v-for="(data, index) in paginateClientReport"
                          :key="index"
                        >
                          <td scope="col">{{ index + 1 }}</td>
                          <td scope="col">{{ data.client }}</td>
                          <td scope="col">{{ data.site }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">
                            {{ data.unit }}
                          </td>
                          <td scope="col">
                            {{
                              data.total_amount ? "£" + data.total_amount : ""
                            }}
                          </td>
                          <!-- <td scope="col">{{ data.status }}</td> -->
                          <td scope="col">
                            {{ data.invoice_creation_period }}
                          </td>
                          <td scope="col">
                            <!-- {{ data.status ? "Approved" : "No Approved" }} -->
                            <button
                              type="button"
                              :class="['btn', 'text-nowrap']"
                              :style="
                                data.status === 'Approved'
                                  ? {
                                      backgroundColor: '#E9FAEF',
                                      color: '#24D164',
                                    }
                                  : {
                                      backgroundColor: 'rgb(255 227 234)',
                                      color: '#FF3B30',
                                    }
                              "
                            >
                              {{
                                data.status === "Approved"
                                  ? "Approved "
                                  : "Unapprove"
                              }}
                            </button>
                          </td>
                          <!-- <td><button class="btn btn-success">Approved</button></td> -->
                        </tr>
                      </tbody>
                      <tbody v-if="isLoading">
                        <tr>
                          <td colspan="9" class="text-center"></td>
                        </tr>
                      </tbody>

                      <tbody v-else-if="errorMessageFilter">
                        <tr>
                          <td colspan="9" class="text-danger text-center">
                            {{ errorMessageFilter }}
                          </td>
                        </tr>
                      </tbody>

                      <tbody v-else-if="errorMessageCustom">
                        <tr>
                          <td colspan="8" class="text-danger text-center">
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
                <div
                  class="tab-content mt-4"
                  id="pills-tabContent"
                  v-if="searchQuery"
                >
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th scope="col">Sl No</th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>

                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Hours</th>
                          <th scope="col">Charge Rate</th>
                          <th scope="col">Total Charge</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateSearchResults?.length > 0">
                        <tr
                          v-for="(data, index) in paginateSearchResults"
                          :key="index"
                        >
                          <td scope="col">{{ index + 1 }}</td>
                          <td scope="col">{{ data.client }}</td>
                          <td scope="col">{{ data.site }}</td>

                          <td scope="col">{{ data.start_date }}</td>
                          <td scope="col">{{ data.end_date }}</td>
                          <td scope="col">
                            {{ data.unit }}
                          </td>
                          <td scope="col">
                            {{
                              data.total_amount ? "£" + data.total_amount : ""
                            }}
                          </td>
                          <!-- <td scope="col">{{ data.status }}</td> -->
                          <td scope="col">
                            {{ data.invoice_creation_period }}
                          </td>
                          <td scope="col">
                            <!-- {{ data.status ? "Approved" : "No Approved" }} -->
                            <button
                              type="button"
                              :class="['btn', 'text-nowrap']"
                              :style="
                                data.status === 'Approved'
                                  ? {
                                      backgroundColor: '#E9FAEF',
                                      color: '#24D164',
                                    }
                                  : {
                                      backgroundColor: 'rgb(255 227 234)',
                                      color: '#FF3B30',
                                    }
                              "
                            >
                              {{
                                data.status === "Approved"
                                  ? "Approved "
                                  : "Unapprove"
                              }}
                            </button>
                          </td>
                          <!-- <td><button class="btn btn-success">Approved</button></td> -->
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="!isLoading">
                          <td colspan="9" class="text-danger text-center">
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
      class="mx-3 mb-2 d-flex justify-content-between"
      style="text-align: right"
      v-if="getClientInvoiceDetail?.length >= 10 && !searchResults.length"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

    <div
      class="mx-3 mb-2 d-flex justify-content-between"
      style="text-align: right"
      v-if="searchResults.length >= 10"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
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
      weekOffset: 0,
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
  components: {
    // Navbar,
    Loader,
  },
  computed: {
    paginateClientReport() {
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
      return this.paginateSearchResults.length;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.client_name : "";
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
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async handleClientChange() {
      this.site_id = "";
      this.businessUnit = [];

      if (this.client_id) {
        await this.getSiteAccordingClientMethod();
      }

      this.filterData();
    },

    async getSiteAccordingClientMethod() {
      if (!this.client_id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site || [];
      } catch (error) {
        this.businessUnit = [];
        if (error.response && error.response.status == 404) {
          // console.error("No sites found for this client.");
        }
      }
    },
    getMonthStartDate(date) {
      const selectedDate = new Date(date);
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    },
    async changePage(page) {
      this.currentPage = page;
      await this.filterData();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.filterData();
    },
    formatDates(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    },

    getWeekRange(date) {
      const start = new Date(date);
      const end = new Date(date);
      start.setDate(start.getDate() - start.getDay() + 1);
      end.setDate(end.getDate() + 6);
      return { start, end };
    },
    async filterData() {
      const params = {
        per_page: this.itemsPerPage,
      };

      // Handle client and site filters
      if (this.client_id) {
        params["client_invoice[client_id]"] = this.client_id;
      }
      if (this.site_id) {
        params["client_invoice[site_id]"] = this.site_id;
      }

      if (this.currentView === "weekly") {
        const { start, end } = this.getWeekRange(this.startDate);
        params["date"] = this.formatDates(start);
        // params["client_invoice[shift_date]"] = this.formatDates(start);
      } else if (this.currentView === "monthly") {
        const startOfMonth = new Date(this.startDate);
        startOfMonth.setDate(1);

        const formattedStartOfMonth = this.formatDates(startOfMonth);
        params["date"] = formattedStartOfMonth;
        // params["client_invoice[shift_date]"] = formattedStartOfMonth;
      }
      params.range = this.currentView === "weekly" ? "weekly" : "Monthly";
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/client_invoices`, {
          params,
        });

        this.getClientInvoiceDetail = response.data.data || [];
        this.errorMessageFilter = "";

        if (
          response.status === 200 &&
          this.getClientInvoiceDetail.length === 0
        ) {
          this.errorMessageCustom = `Data Not available for this ${this.currentView}`;
        } else {
          this.errorMessageCustom = "";
        }
      } catch (error) {
        this.getClientInvoiceDetail = [];
        if (error.response && error.response.status === 404) {
          this.errorMessageFilter =
            error.response.data.error || "Report Not Found!";
        } else {
          this.errorMessageFilter = "Report Not Found!";
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },

    exportOneFile(exportType) {
      const startOfMonth = new Date(this.startDate);
      startOfMonth.setDate(1);
      const formattedStartOfMonth = this.formatDates(startOfMonth);

      let queryParams = {
        format: "csv",
        date: formattedStartOfMonth,
        // "report[shift_date]": this.formatDates(start),
      };

      if (this.client_id) {
        queryParams["client_invoice[client_id]"] = this.client_id;
      }
      if (this.site_id) {
        queryParams["client_invoice[site_id]"] = this.site_id;
      }

      // queryParams.range = this.currentView === "weekly" ? "week" : "Monthly";
      queryParams.range = this.currentView === "weekly" ? "Weekly" : "Monthly";
      return axios
        .get(`${VITE_API_URL}/client_invoices`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "Invoice_ReportData.csv";
              this.downloadOneCSV(csvData, filename);
              const message = "Export file downloaded successfully";
              this.$refs.successAlert.showSuccess(message);
              this.site_ids = [];
              for (let key in this.checkedSites) {
                this.checkedSites[key] = false;
              }
            })
            .catch((error) => {});
        })
        .catch((error) => {})
        .finally(() => {
          this.site_ids = [];
        });
    },
    blobToText(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
      });
    },

    combineCsvData(csvDataArray) {
      let combinedCsvData = "";
      csvDataArray.forEach((csvData, index) => {
        if (index > 0) {
          const lines = csvData.split("\n");
          lines.shift();
          csvData = lines.join("\n");
        }

        combinedCsvData += csvData;
        if (index < csvDataArray.length - 1) {
          combinedCsvData += "\n";
        }
      });
      return combinedCsvData;
    },
    downloadOneCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv" });

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

    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.weekOffset -= 1;
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.filterData();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.weekOffset += 1;
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.filterData();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const today = new Date();
        const baseDate = new Date(today);
        baseDate.setDate(today.getDate() + this.weekOffset * 7);

        const weekStart = new Date(baseDate);
        weekStart.setDate(baseDate.getDate() - baseDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        this.endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
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
  },

  async mounted() {
    // this.createVacancy();
    // this.getClientInvoiceReport();
    this.loadDateRangeFromLocalStorage();
    // this.getBusinessUnitMethod();
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
    await this.filterData();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  background-color: #f9f9f9;
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
