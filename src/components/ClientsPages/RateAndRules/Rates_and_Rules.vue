<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">RATES AND RULES</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <!-- <div class="d-flex align-items-center">
                        <div class="card p-2">Rate and Rules</div>
                      </div> -->

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center"></div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                      <div class="searchbox position-relative">
                        <form @submit.prevent="search">
                          <input
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                        </form>
                      </div>
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#addRateRules"
                        data-bs-whatever="@mdo"
                        @click="AddRateRules"
                      >
                        + Add Rate
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        @click="toggleFilters"
                      >
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button>
                      <input
                        ref="fileInput"
                        id="fileAll"
                        type="file"
                        accept=".csv"
                        style="display: none"
                        @change="handleFileUpload"
                      />

                      <button
                        class="nav-item dropdown btn btn-outline-success text-nowrap dropdown-toggle"
                        type="button"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        :

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li>
                            <a class="dropdown-item" href="#" @click="triggerFileInput"
                              >Import</a
                            >
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <a class="dropdown-item" href="#" @click="exportOneFile"
                              >Export</a
                            >
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <a class="dropdown-item" href="#" @click="exportAll"
                              >Export All</a
                            >
                          </li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <div class="d-flex gap-2 mb-3 justify-content-center" v-if="showFilters">
                  <div class="d-flex gap-2 mt-3">
                    <div></div>

                    <select v-model="client_id" id="selectClients" @change="filterData">
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
                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="filterData"
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
                    <select v-model="job_id" id="selectOption" @change="filterData">
                      <option value="">All Position</option>
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table candidateTable" v-if="!searchQuery">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <!-- <th scope="col">ID</th> -->
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job</th>
                          <th scope="col">Day</th>
                          <th scope="col">Shift Type<br />Start-End Time</th>
                          <th scope="col">Rate Type</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Private Limited</th>
                          <th scope="col">Self Employed</th>
                          <th scope="col">Umbrella</th>
                          <th scope="col">PAYE</th>
                          <th scope="col" style="width: 10%">Created By and Time</th>
                          <th scope="col">Last Update</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody
                        v-if="groupedRateRulesData?.length > 0"
                        v-for="(data, index) in groupedRateRulesData"
                        :key="index"
                      >
                        <tr>
                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                :value="data.id"
                                :id="data.id"
                                v-model="checkedClient[data.id]"
                                @change="handleCheckboxChange(data.id)"
                              />
                            </div>
                          </td>

                          <td>
                            <router-link
                              class="text-capitalize text-decoration-underline text-black fw-bold"
                              :to="{
                                name: 'SingleClientProfile',
                                params: { id: data.client_id },
                              }"
                              >{{ data.client }}</router-link
                            >
                          </td>
                          <td
                            class="fw-bold cursor-pointer"
                            @click="
                              toggleDetails(
                                index,
                                data.site_id,
                                data.client,
                                data.job,
                                data.job_id
                              )
                            "
                          >
                            {{ data.site }}
                          </td>
                          <td>{{ data.job }}</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#EditMultipleRateRules"
                              data-bs-whatever="@mdo"
                              @click="
                                editRateRulesMultiId(
                                  data.id,
                                  data.site_id,
                                  data.job_id,
                                  data.job,
                                  data.client_id
                                )
                              "
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                            <!-- <button
                              type="button"
                              class="btn btn-outline-danger text-nowrap"
                              @click="deleteSelectedStaffs(data.id)"
                            >
                              Delete Staff
                            </button> -->
                          </td>
                        </tr>

                        <tr
                          v-if="activeSiteId === index"
                          v-for="(rate, rateIndex) in filteredRateRulesData"
                          :key="rate.id"
                        >
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{{ rate.client }}</td>
                          <td>{{ rate.site }}</td>
                          <td>{{ rate.job }}</td>
                          <td class="text-capitalize">
                            <span
                              style="background: orange; padding: 3px; border-radius: 4px"
                              >{{ rate.day }}</span
                            >
                          </td>
                          <td>
                            {{ rate.shift_type.replace(/_/g, " ") }}<br />{{
                              formatTime(rate.start_time)
                            }}-{{ formatTime(rate.end_time) }}
                          </td>
                          <td>
                            {{ rate.rate_type ? rate.rate_type : "Null" }}
                          </td>
                          <td>{{ rate.client_rate }}</td>
                          <td>
                            {{ rate.private_limited }}
                          </td>
                          <td>{{ rate.self_employed }}</td>
                          <td>
                            {{ rate.umbrella ? rate.umbrella : "Null" }}
                          </td>
                          <td>
                            {{ rate.paye ? rate.paye : "Null" }}
                          </td>
                          <td>
                            {{ rate.created_by_and_time }}
                          </td>
                          <td>{{ rate.last_update }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#editSingleRateRules"
                              data-bs-whatever="@mdo"
                              @click="editRateRulesId(rate.id)"
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-if="errorMessageFilter">
                          <td colspan="15" class="text-danger text-center">
                            {{ errorMessageFilter }}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="table candidateTable" v-if="searchQuery">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job</th>
                          <th scope="col">Day</th>
                          <th scope="col">Shift Type<br />Start-End Time</th>
                          <th scope="col">Rate Type</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Private Limited</th>
                          <th scope="col">Self Employed</th>
                          <th scope="col">Umbrella</th>
                          <th scope="col">PAYE</th>
                          <th scope="col" style="width: 10%">Created By and Time</th>
                          <th scope="col">Last Update</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody
                        v-if="searchResults?.length > 0"
                        v-for="(data, index) in groupedRateRulesData"
                        :key="index"
                      >
                        <tr>
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{{ data.client }}</td>
                          <td
                            class="fw-bold cursor-pointer"
                            @click="
                              toggleDetails(
                                index,
                                data.site_id,
                                data.client,
                                data.job,
                                data.job_id
                              )
                            "
                          >
                            {{ data.site }}
                          </td>
                          <td>{{ data.job }}</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#EditMultipleRateRules"
                              data-bs-whatever="@mdo"
                              @click="
                                editRateRulesMultiId(
                                  data.id,
                                  data.site_id,
                                  data.job_id,
                                  data.job,
                                  data.client_id
                                )
                              "
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                          </td>
                        </tr>
                        <tr
                          v-if="activeSiteId === index"
                          v-for="(rate, indx) in searchResults"
                          :key="rate.rate_and_rule_id"
                        >
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{{ rate.client }}</td>
                          <td>{{ rate.site }}</td>
                          <td>{{ rate.job }}</td>
                          <td class="text-capitalize">
                            <span
                              style="background: orange; padding: 3px; border-radius: 4px"
                              >{{ rate.day }}</span
                            >
                          </td>
                          <td>
                            {{ rate.shift_type.replace(/_/g, " ") }}<br />{{
                              formatTime(rate.start_time)
                            }}-{{ formatTime(rate.end_time) }}
                          </td>
                          <td>
                            {{ rate.rate_type ? rate.rate_type : "Null" }}
                          </td>
                          <td>{{ rate.client_rate }}</td>
                          <td>
                            {{ rate.private_limited }}
                          </td>
                          <td>{{ rate.self_employed }}</td>
                          <td>
                            {{ rate.umbrella ? rate.umbrella : "Null" }}
                          </td>
                          <td>
                            {{ rate.paye ? rate.paye : "Null" }}
                          </td>
                          <td>
                            {{ rate.created_by_and_time }}
                          </td>
                          <td>{{ rate.last_update }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#editSingleRateRules"
                              data-bs-whatever="@mdo"
                              @click="editRateRulesId(rate.id)"
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="14" class="text-danger text-center">
                            No Match Found !!
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
    <!-- <div
      class="mx-3 mb-2"
      style="text-align: right"
      v-if="filteredRateRulesData?.length >= 8 && !searchResults.length"
    >
      
      <div class="dropdown d-inline-block">
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
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
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
        :disabled="currentPage * itemsPerPage >= filteredRateRulesData?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div> -->
    <AddRateRules
      @UpdatedRateRules="getRateRulesDataMethod"
      ref="add_rate_rules"
      @rateRules="AddRateRules"
    />
    <EditSingleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      @editUpdatedRateRules="getRateRulesDataMethod"
      :ClientID="selectedClientID || 0"
      ref="singleEdit_rate_rules"
    />
    <EditMultipleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      :SiteID="selectedSiteID || 0"
      :jobID="selectedJobID || 0"
      :ids="ids"
      :ClientID="selectedClientID || 0"
      @editMultipleUpdatedRateRules="getRateRulesDataMethod"
      ref="multipleEdit_rate_rules"
    />
    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../../Navbar.vue";
import AddRateRules from "../../modals/Rate&Rules/AddRateRules.vue";
import Loader from "../../Loader/Loader.vue";
import { reactive } from "vue";
import EditSingleRateRules from "../../modals/Rate&Rules/EditSingleRateRules.vue";
import EditMultipleRateRules from "../../modals/Rate&Rules/EditMultipleRateRules.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      id: "",
      getRateRulesData: [],
      selectedRatesRulesId: null,
      selectedSiteID: null,
      getRateRulesWeekData: [],
      selectedClientID: null,
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      showFilters: false,
      activeSiteId: null,
      detailsShow: false,
      selectedJobID: null,
      rateRulesIds: [],
      filteredRateRulesData: [],
      checkedClient: reactive({}),
      // checkedClient: {},
      ids: [],
      errorMessageFilter: "",
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      client_id: "",
      clientData: [],
      site_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
    };
  },
  components: {
    Navbar,
    AddRateRules,
    Loader,
    EditSingleRateRules,
    EditMultipleRateRules,
    SuccessAlert,
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getRateRulesData.slice(startIndex, endIndex);
    },

    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    groupedRateRulesData() {
      const groupedData = {};

      this.getRateRulesData.forEach((data) => {
        const groupKey = `${data.site_id}-${data.client}-${data.job}-${data.client_id}`;

        if (!groupedData[groupKey]) {
          groupedData[groupKey] = {
            site_id: data.site_id,
            site: data.site,
            client: data.client,
            job: data.job,
            client_id: data.client_id,
            job_id: data.job_id,
            data: [],
          };
        }

        groupedData[groupKey].data.push(data);
      });

      return Object.values(groupedData);
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
  },
  methods: {
    getFilteredData(siteId) {
      // Assuming you have a method to filter data based on site_id
      return this.filteredRateRulesData.find((rate) => rate.site_id === siteId) || {};
    },
    AddRateRules() {
      this.$refs.add_rate_rules.getTimeShift();
      setTimeout(() => {
        this.$refs.add_rate_rules.getClientMethod();
      }, 100);
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async filterData() {
      let filters = {
        RR_type: "",
        RR_value: "",
      };

      if (this.client_id) {
        const selectedClient = this.clientData.find(
          (option) => option.id === this.client_id
        );
        filters.RR_type = "client";
        filters.RR_value = selectedClient ? selectedClient.client_name : "";
      } else if (this.site_id) {
        const selectedSite = this.businessUnit.find(
          (option) => option.id === this.site_id
        );
        filters.RR_type = "site";
        filters.RR_value = selectedSite ? selectedSite.site_name : "";
      } else if (this.job_id) {
        const selectedJob = this.options.find((option) => option.id === this.job_id);
        filters.RR_type = "job";
        filters.RR_value = selectedJob ? selectedJob.name : "";
      }
      this.makeFilterAPICall(filters.RR_type, filters.RR_value);
    },
    async makeFilterAPICall(RR_type, RR_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_and_rule_filter`, {
          params: {
            RR_type: RR_type,
            RR_value: RR_value,
          },
        });

        this.getRateRulesData = response.data.data || [];

        if (this.getRateRulesData.length === 0) {
          this.errorMessageFilter = "Rates Not Found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            // alert("No records found for the given filter");
            errorMessages === "No records found for the given filter";
          } else {
            // alert(errorMessages);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorMessages || errorMessages,
            });
          }
        } else {
          // console.error(error);
        }
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const isValidFileType = file.type === "text/csv";
      if (!isValidFileType) {
        // alert("Please select a CSV file.");
        Swal.fire({
          icon: "warning",
          title: "Invalid File Type",
          text: "Please select a CSV file.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file, "file.csv");

      axios
        .post(`${VITE_API_URL}/import_all_rate_and_rules_csv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.ImportCSV(response.data, "file.csv");
        })
        .catch((error) => {
          // console.error("Error uploading file:", error);
        });
    },

    ImportCSV(csvData, filename) {
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
    exportOneFile() {
      if (!this.ids || this.ids.length === 0) {
        // alert("Please select at least one Client.");
        Swal.fire({
          icon: "warning",
          title: "Selection Required",
          text: "Please select at least one Client.",
        });
        return;
      }

      const idsQueryParam = this.ids.join(",");

      axios
        .get(`${VITE_API_URL}/export_rate_and_rules_csv`, {
          params: {
            rate_rules_ids: idsQueryParam,
          },
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "Rate_Rules.csv";
              this.downloadOneCSV(csvData, filename);
              const message = "Export file downloaded successfully";
              this.$refs.successAlert.showSuccess(message);
            })
            .catch((error) => {
              // console.error("Error reading CSV data:", error);
            });
        })
        .catch((error) => {
          // console.error("Error fetching CSV data:", error);
        })
        .finally(() => {
          this.ids = [];
          this.checkedClient = {};
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
    exportAll() {
      axios
        .get(`${VITE_API_URL}/export_rate_and_rules_csv.csv`)
        .then((response) => {
          this.downloadCSV(response.data, "Rate_RulesData.csv");
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
    editRateRulesId(RateRulesId) {
      this.selectedRatesRulesId = RateRulesId;
      this.$refs.singleEdit_rate_rules.getTimeShift();

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getBusinessUnitMethod();
      }, 200);

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getJobTitleMethod();
      }, 300);
      // setTimeout(() => {
      //   this.$refs.singleEdit_rate_rules.getSiteAccordingClientMethod();
      // }, 400);
    },
    extractFilteredRateRulesIds() {
      this.ids = this.filteredRateRulesData.map((rate) => rate.id);
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
    handleCheckboxChange(dataId) {
      if (this.checkedClient[dataId]) {
        if (!this.ids.includes(dataId)) {
          this.ids.push(dataId);
        }
      } else {
        const index = this.ids.indexOf(dataId);
        if (index !== -1) {
          this.ids.splice(index, 1);
        }
      }
      // console.log("Updated ids array:", this.ids);
    },
    editRateRulesMultiId(RateRulesId, siteID, jobID, job, clientID) {
      this.selectedRatesRulesId = RateRulesId;
      this.selectedSiteID = siteID;
      this.selectedJobID = jobID;
      this.selectedClientID = clientID;
      this.$refs.multipleEdit_rate_rules.getSiteAccordingClientMethod();
      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getBusinessUnitMethod();
      }, 200);

      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getJobTitleMethod();
      }, 300);
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async deleteSelectedStaffs(id) {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.delete(`${VITE_API_URL}/rate_and_rules/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the success response if needed
        // console.log("Delete successful:", response.data);
      } catch (error) {
        // console.error("Error during deletion:", error);
      } finally {
        // Any final actions can be placed here, e.g., hiding a loading spinner
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
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    // search api start

    async search() {
      try {
        this.searchResults = [];

        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");

        const response = await axiosInstance.get(
          `${VITE_API_URL}/rate_and_rules_search`,
          {
            params: {
              search_rates: modifiedSearchQuery,
            },
            headers: {
              "content-type": "application/json",
            },
          }
        );

        this.searchResults = response.data.rates;
      } catch (error) {
        if (
          (error.response && error.response.status === 400) ||
          error.response.status === 404
        ) {
          // this.errorMessage = "No vacancy found for the specified criteria";
        }
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getRateRulesDataMethod();
    },
    async getRateRulesDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_and_rules`, {
          params: {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
        });
        this.getRateRulesData = response.data.rates;

        this.filteredRateRulesData = this.getRateRulesData;
        if (this.getRateRulesData.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        // console.error('Error fetching client data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async getRateRulesWeekDataMethod(siteId) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_rates_according_days?site_id=${siteId}`
        );
        this.getRateRulesWeekData = response.data.data;
      } catch (error) {
        // console.error('Error fetching client data:', error);
      }
    },
    async toggleDetails(index, siteId, client, job) {
      if (this.activeSiteId === index) {
        this.activeSiteId = null; // Collapse if the same row is clicked
      } else {
        this.activeSiteId = index; // Expand the clicked row
      }
      // this.activeSiteId = this.activeSiteId === index ? null : index;

      this.filteredRateRulesData = this.getRateRulesData.filter(
        (rate) => rate.site_id === siteId && rate.client === client && rate.job === job
      );
    },
    formatTime(time) {
      return time.slice(0, 5);
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getRateRulesDataMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getRateRulesDataMethod();

    next();
  },
  mounted() {
    this.getRateRulesDataMethod();
    this.getBusinessUnitMethod();
    this.getJobTitleMethod();
    this.getClientMethod();
  },
  created() {
    this.ids = this.groupedRateRulesData.map((data) => data.id);

    this.groupedRateRulesData.forEach((data) => {
      this.$set(this.checkedClient, data.id, false);
    });
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
.candidateTable tr:nth-child(odd) td {
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
</style>
