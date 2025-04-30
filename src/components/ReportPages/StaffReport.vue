<template>
  <div>
    <!-- <keep-alive>
      <Navbar />
    </keep-alive> -->
    <div id="main">
      <div class="container-fluid pt-3 px-0">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="d-flex justify-content-end">
                <div class="d-flex gap-2">
                  <div class="custom-select-wrapper">
                    <select
                      id="selectBusinessUnit"
                      @change="filterData"
                      v-model="selectedSiteName"
                    >
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
                  </div>
                  <div class="custom-select-wrapper">
                    <select
                      v-model="selectedCandidate"
                      @change="filterData"
                      id="selectStaff"
                    >
                      <option value="">All Staff</option>
                      <option
                        v-for="option in candidateLists"
                        :key="option.id"
                        :value="`${option.full_name}`"
                        placeholder="Select Staff"
                      >
                        {{ option.full_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div class="py-2">
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
                      <!-- <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        @click="exportAll"
                        :disabled="!paginateCandidates || paginateCandidates.length === 0"
                      >
                        <i class="bi bi-download"></i> Export CSV
                      </button> -->

                      <div
                        v-if="
                          !paginateCandidates || paginateCandidates.length === 0
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

                      <!-- <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button> -->
                      <div>
                        <form
                          @submit.prevent="search"
                          class="form-inline my-2 my-lg-0"
                        >
                          <input
                            class="form-control form-control-lg mr-sm-2 position-relative"
                            type="search"
                            placeholder="Search.."
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                          <span
                            class="position-absolute"
                            style="transform: translate(1329%, -154%)"
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

                <div v-if="currentView === 'weekly'">
                  <div>
                    <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                    <div
                      v-for="(day, index) in getWeekDates"
                      :key="index"
                    ></div>
                  </div>
                </div>

                <div v-else-if="currentView === 'monthly'">
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
                          <!-- <th scope="col">SI No</th> -->
                          <th scope="col">ID</th>

                          <th scope="col" style="width: 153px">
                            Employee Name
                          </th>
                          <th scope="col">Position</th>
                          <th scope="col">Site</th>

                          <th scope="col">Shift Date</th>

                          <th scope="col">Time From</th>
                          <th scope="col">Time To</th>
                          <th scope="col">Hours</th>

                          <th scope="col">Pay Rate</th>
                          <th scope="col">Total Charge</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody
                        v-if="
                          paginateCandidates && paginateCandidates?.length > 0
                        "
                      >
                        <tr v-for="data in paginateCandidates" :key="data.id">
                          <!-- <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td> -->
                          <td scope="col">{{ data.id }}</td>

                          <td scope="col">
                            {{ data.name || data.candidate_name }}
                          </td>
                          <td scope="col">{{ data.job }}</td>
                          <td scope="col">{{ data.site }}</td>

                          <td scope="col">
                            {{ data.date || data.shift_date }}
                          </td>

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
                            {{ "£" + data.staff_rate }}
                          </td>
                          <td scope="col">
                            {{ "£" + data.staff_pay_amount }}
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
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="15" class="text-danger text-center">
                            {{ errorMessageFilter || errorMessageCustom }}
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
                          <th>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
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

                          <th scope="col">Approved</th>
                        </tr>
                      </thead>
                      <tbody v-if="searchResults && searchResults?.length > 0">
                        <tr v-for="data in searchResults" :key="data.id">
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                              />
                            </div>
                          </td>
                          <td scope="col">{{ data.id }}</td>
                          <td scope="col">{{ data.code }}</td>
                          <td scope="col">
                            {{ data.name || data.candidate_name }}
                          </td>
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
                            {{ "£" + data.staff_rate }}
                          </td>
                          <td scope="col">
                            {{ "£" + data.staff_pay_amount }}
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
                                  ? "Unapprove"
                                  : "Approve"
                              }}
                            </button>
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
      class="mx-3 mb-2 d-flex justify-content-between"
      style="text-align: right"
      v-if="getSiteReportData?.length >= 10 && !searchResults.length"
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
      v-if="searchResults.length >= 8"
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
    <!-- <StaffGenrateInvoice @StaffReportData="filterData" /> -->
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";
import Loader from "../Loader/Loader.vue";
import Swal from "sweetalert2";
// import StaffGenrateInvoice from "../modals/InvoicePagesModal/StaffGenrateInvoice.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      currentView: "weekly",
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
      errorMessageFilter: "",
      errorMessageCustom: "",
      searchQuery: "",
      debounceTimeout: null,
      errorMessage: "",
      searchResults: [],
      client_id: "",
      clientData: [],
      isLoading: false,
      site_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
      id: "",
      candidateLists: [],
      getSiteReportData: [],
      selectedSiteName: "",
      selectedCandidate: "",
      queryParams: {},
    };
  },
  components: { Loader },
  computed: {
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
    selectStaff() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },

    paginateCandidates() {
      if (
        !Array.isArray(this.getSiteReportData) ||
        this.getSiteReportData.length === 0
      ) {
        return [];
      }

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return this.getSiteReportData.slice(startIndex, endIndex);
    },
    // paginateSearchResults() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.searchResults.slice(startIndex, endIndex);
    // },
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
      const params = {
        page: 1,
      };

      if (this.selectedSiteName) {
        params["report[site]"] = this.selectedSiteName;
      }
      const today = new Date();

      if (this.currentView === "weekly") {
        const { start, end } = this.getWeekRange(this.startDate);
        // const formattedStartOfWeek = this.formatDate(this.startDate);
        // const startOfWeek = new Date(this.startDate);
        // const dayOfWeek = startOfWeek.getDay();
        // const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        // startOfWeek.setDate(startOfWeek.getDate() + diff);

        // const formattedStartOfWeek = `${(startOfWeek.getMonth() + 1)
        //   .toString()
        //   .padStart(2, "0")}/${startOfWeek
        //   .getDate()
        //   .toString()
        //   .padStart(2, "0")}/${startOfWeek.getFullYear()}`;

        params["report[date]"] = this.formatDates(start);
        params["report[shift_date]"] = this.formatDates(start);
      } else if (this.currentView === "monthly") {
        const startOfMonth = this.startDate;
        startOfMonth.setDate(1);

        const formattedStartOfMonth = `${(startOfMonth.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${startOfMonth
          .getDate()
          .toString()
          .padStart(2, "0")}/${startOfMonth.getFullYear()}`;

        params["report[date]"] = formattedStartOfMonth;
        params["report[shift_date]"] = formattedStartOfMonth;
      }
      if (this.selectedCandidate) {
        params["report[name]"] = this.selectedCandidate;
        params["report[candidate_name]"] = this.selectedCandidate;
      }
      params.range = this.currentView === "weekly" ? "week" : "month";

      try {
        const response = await axios.get(
          `${VITE_API_URL}/report_section_timesheet_filter`,
          {
            params,
          }
        );
        this.getSiteReportData = response.data.data || [];
        this.errorMessageFilter = "";
        if (response.status === 200 && this.getSiteReportData.length === 0) {
          this.errorMessageCustom = `Data Not available for this month`;
        } else {
          this.errorMessageCustom = "";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.getSiteReportData = [];
          this.errorMessageFilter =
            error.response.data.error || "Report Not Found!";
        } else {
          this.errorMessageFilter = "Report Not Found!";
        }
      }
      // this.filterData();
    },
    getCandidateName(id) {
      const candidate = this.candidateLists.find(
        (candidate) => candidate.id === id
      );
      return candidate ? `${candidate.full_name}` : "";
    },
    exportOneFile(exportType) {
      const { start, end } = this.getWeekRange(this.startDate);
      let queryParams = {
        format: "csv",
        "report[date]": this.formatDates(start),
        "report[shift_date]": this.formatDates(start),
      };

      if (this.selectedSiteName) {
        queryParams["report[site]"] = this.selectedSiteName;
      }

      if (this.selectedCandidate) {
        queryParams["report[name]"] = this.selectedCandidate;
      }

      queryParams.range = this.currentView === "weekly" ? "week" : "month";

      return axios
        .get(`${VITE_API_URL}/report_section_timesheet_filter`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "StaffReportData.csv";
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
    async changePage(page) {
      this.currentPage = page;
      await this.filterData();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.filterData();
    },

    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        if (this.searchQuery.trim()) {
          this.search();
        } else {
          this.searchResults = [];
        }
      }, 300);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = encodeURIComponent(this.searchQuery);
        const response = await axiosInstance.get(
          `${VITE_API_URL}/timesheet_searching_report_section`,
          {
            params: { query: modifiedSearchQuery },
          }
        );

        if (
          response.data.timesheets &&
          typeof response.data.timesheets === "string"
        ) {
          this.errorMessage = response.data.timesheets;
          this.searchResults = [];
        } else {
          this.searchResults = response.data.timesheets || [];
          if (this.searchResults.length === 0) {
            this.errorMessage = "No Record found for the specified criteria.";
          } else {
            this.errorMessage = "";
          }
        }
      } catch (error) {}
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
    formatDates(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();

      return `${month}/${day}/${year}`;
    },
    getWeekRange(date) {
      const start = new Date(date);
      const end = new Date(date);
      start.setDate(start.getDate() - start.getDay() + 1);
      end.setDate(end.getDate() + 6);
      return { start, end };
    },
    async getCandidateListMethod() {
      this.candidateLists = [];

      try {
        const response = await axios.get(`${VITE_API_URL}/candidate_list`, {
          params: {
            "candidate[activated]": true,
            "candidate[status]": "approved",
          },
        });

        if (response.data && response.data.data) {
          this.candidateLists = response.data.data;
        } else {
          // console.warn("No approved candidates found.");
        }
      } catch (error) {
        if (error.response) {
          // console.error(
          //   "Error fetching candidate data:",
          //   error.response.data.message || error
          // );
        } else {
          // console.error("Network or Server Error:", error.message);
        }
      }
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
        // this.filterData();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
        // this.updateDateRange();
      }
      this.filterData();
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
        // this.updateDateRange();
      }
      this.filterData();
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(
          this.startDate.getDate() - this.startDate.getDay() + 1
        );
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
        this.queryParams.range = "week";
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
        this.queryParams.range = "month";
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
      // this.filterData();
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
      return `${month}/${day}/${year}`;
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getClientMethod();
      vm.getBusinessUnitMethod();
      // vm.updateDateRange();
      vm.getCandidateListMethod();
      vm.filterData();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getBusinessUnitMethod();

    this.getClientMethod();
    this.getCandidateListMethod();
    // this.updateDateRange();
    this.filterData();
    next();
  },
  async mounted() {
    // this.createVacancy();

    this.loadDateRangeFromLocalStorage();
    this.getBusinessUnitMethod();
    this.getCandidateListMethod();
    this.getClientMethod();

    // this.updateDateRange();
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
