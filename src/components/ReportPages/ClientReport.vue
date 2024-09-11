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
                        v-if="!paginateCandidates || paginateCandidates.length === 0"
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
                      <tbody>
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
                          <td scope="col">{{ data.status ? data.status : "Null" }}</td>
                          <td scope="col">{{ data.invoice_creation_period }}</td>

                          <td><button class="btn btn-success">Approved</button></td>
                        </tr>
                      </tbody>
                    </table> -->
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">ID</th>
                          <th scope="col">Code</th>
                          <th scope="col" style="width: 153px">Name</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Total Cost</th>
                          <th scope="col">Paper TimeSheet</th>
                          <th scope="col">Approved</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateCandidates?.length > 0">
                        <tr v-for="data in paginateCandidates" :key="data.id">
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td scope="col">{{ data.id }}</td>
                          <td scope="col">{{ data.code }}</td>
                          <td scope="col">{{ data.name }}</td>
                          <td scope="col">{{ data.site }}</td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.shift_date }}</td>
                          <td scope="col">
                            {{ data.start_time }}
                          </td>
                          <td scope="col">
                            {{ data.end_time }}
                          </td>
                          <td scope="col">
                            {{ data.total_hours }}
                          </td>
                          <td scope="col">
                            {{ data.client_rate }}
                          </td>
                          <td scope="col">
                            {{ data.total_cost }}
                          </td>
                          <td scope="col">
                            <div v-if="data.paper_timesheet">
                              <img
                                :src="fullPaperTimeSheetUrl(data.paper_timesheet)"
                                alt="Current Paper TimeSheet"
                                class="img-fluid"
                                style="width: 60px"
                              />
                              &nbsp;
                              <button
                                type="button"
                                class="btn border-primary-subtle"
                                data-bs-toggle="modal"
                                data-bs-target="#viewPaperTimeSheet"
                                @click="viewPaperSheet(data.id)"
                              >
                                <i class="bi bi-eye"></i>
                              </button>
                            </div>
                            <div v-else>Null</div>
                          </td>
                          <td scope="col">
                            {{ data.approved_hour ? "Approved" : "Not Approved" }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="errorMessageFilter">
                          <td colspan="15" class="text-danger text-center">
                            {{ errorMessageFilter }}
                          </td>
                        </tr>
                        <tr v-else>
                          <td colspan="15" class="text-danger text-center">
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
                      <tbody>
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
                          <td scope="col">{{ data.status ? data.status : "Null" }}</td>
                          <td scope="col">{{ data.invoice_creation_period }}</td>

                          <td><button class="btn btn-success">Approved</button></td>
                        </tr>
                      </tbody>
                    </table> -->
                    <table class="table reportTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">ID</th>
                          <th scope="col">Code</th>
                          <th scope="col" style="width: 153px">Name</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job</th>
                          <th scope="col">Shift Date</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Total Hours</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Total Cost</th>
                          <th scope="col">Paper TimeSheet</th>
                          <th scope="col">Approved</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginateSearchResults?.length > 0">
                        <tr v-for="data in paginateSearchResults" :key="data.id">
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td scope="col">{{ data.id }}</td>
                          <td scope="col">{{ data.code }}</td>
                          <td scope="col">{{ data.name }}</td>
                          <td scope="col">{{ data.site }}</td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.shift_date }}</td>
                          <td scope="col">
                            {{ data.start_time }}
                          </td>
                          <td scope="col">
                            {{ data.end_time }}
                          </td>
                          <td scope="col">
                            {{ data.total_hours }}
                          </td>
                          <td scope="col">
                            {{ data.client_rate }}
                          </td>
                          <td scope="col">
                            {{ data.total_cost }}
                          </td>
                          <td scope="col">
                            <div v-if="data.paper_timesheet">
                              <img
                                :src="fullPaperTimeSheetUrl(data.paper_timesheet)"
                                alt="Current Paper TimeSheet"
                                class="img-fluid"
                                style="width: 60px"
                              />
                              &nbsp;
                              <button
                                type="button"
                                class="btn border-primary-subtle"
                                data-bs-toggle="modal"
                                data-bs-target="#viewPaperTimeSheet"
                                @click="viewPaperSheet(data.id)"
                              >
                                <i class="bi bi-eye"></i>
                              </button>
                            </div>
                            <div v-else>Null</div>
                          </td>
                          <td scope="col">
                            {{ data.approved_hour ? "Approved" : "Not Approved" }}
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="15" class="text-danger text-center">
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
      class="mx-3 mb-2"
      style="text-align: right"
      v-if="getSiteReportData?.length >= 8 && !searchResults.length"
    >
      <button
        class="btn btn-sm btn-primary dropdown-toggle"
        type="button"
        id="recordsPerPageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ itemsPerPage }} Records
      </button>
      <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
        </li>
      </ul>
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
        :disabled="currentPage * itemsPerPage >= getSiteReportData?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <div class="mx-3 mb-2" style="text-align: right" v-if="searchResults.length >= 8">
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button> -->
      <button
        class="btn btn-sm btn-primary dropdown-toggle"
        type="button"
        id="recordsPerPageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ itemsPerPage }} Records
      </button>
      <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
        </li>
      </ul>
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
      currentPage: 1,
      itemsPerPage: 10,
      errorMessageCustom: "",
      errorMessage: "",
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      client_id: "",
      clientData: [],
      isLoading: false,
      site_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
      id: "",
      errorMessageFilter: "",
      getSiteReportData: [],
      candidateLists: [],
    };
  },
  components: { Navbar, Loader },
  computed: {
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectStaff() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },
    paginateCandidates() {
      if (!this.getSiteReportData) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getSiteReportData.slice(startIndex, endIndex);
    },

    paginateSearchResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
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
        filter_value: this.client_id || this.site_id || this.id || "",
      };

      this.makeFilterAPICall(filters.filter_type, filters.filter_value);
    },
    async makeFilterAPICall(filter_type, filter_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/client_report`, {
          params: {
            filter_type: filter_type,
            filter_value: filter_value,
          },
        });

        this.getSiteReportData = response.data.data || [];

        if (this.getSiteReportData.length === 0) {
          this.errorMessageFilter = "Report not Found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            alert("No records found for the given filter");
          } else {
            alert(errorMessages);
          }
        } else {
          // console.error(error);
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
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        const response = await axiosInstance.get(
          `${VITE_API_URL}/custom_timesheet_searching/${modifiedSearchQuery}`
        );

        this.searchResults = response.data.custom_sheets;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No Record found for the specified criteria";
        }
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getSiteReportMethod();
    },
    async getSiteReportMethod() {
      this.isLoading = true;
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
        // end_date: endOfMonth.toLocaleDateString(),
      };
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_custom_timesheet_according_mounth`,
          {
            params: requestData,
            per_page: this.itemsPerPage,
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        this.getSiteReportData = response.data.custom_timesheets;
        if (this.getSiteReportData.length === 0) {
          this.errorMessageCustom = "No Client Report found for the specified month";
        } else {
          this.errorMessageCustom = "";
        }
      } catch (error) {
        console.error("Error fetching custom timesheets:", error);
      } finally {
        this.isLoading = false;
      }
    },
    exportAll() {
      const formattedDate = this.formatDate(this.startDate);

      const params = {
        date: formattedDate,
      };

      axios
        .get(`${VITE_API_URL}/export_timesheet.csv`, { params })
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
    async getCandidateListMethod() {
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
      this.getSiteReportMethod();
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
      this.getSiteReportMethod();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diff);
        this.startDate = startOfWeek;

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        this.endDate = endOfWeek;
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
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.createVacancy();
    //     });
    //   // alert("Record Deleted ");
    // },
    // async createVacancy() {
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get(`${VITE_API_URL}/vacancies`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => (this.getVacancyDetail = response.data));
    // },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getClientMethod();
      vm.getBusinessUnitMethod();
      vm.updateDateRange();
      vm.getCandidateListMethod();
      vm.getSiteReportMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getBusinessUnitMethod();

    this.getClientMethod();
    this.getCandidateListMethod();
    this.updateDateRange();
    this.getSiteReportMethod();
    next();
  },
  mounted() {
    // this.createVacancy();
    this.currentView = "monthly";
    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    this.getCandidateListMethod();
    this.getClientMethod();
    this.getSiteReportMethod();
    this.updateDateRange();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
    // const currentDate = new Date();
    // const dayOfWeek = currentDate.getDay();
    // const startOfWeek = new Date(currentDate);

    // const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    // startOfWeek.setDate(startOfWeek.getDate() + diff);

    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(endOfWeek.getDate() + 6);
    // this.endDate = endOfWeek;
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
