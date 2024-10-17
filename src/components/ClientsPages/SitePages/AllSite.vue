<template>
  <div>
    <div class="mt-2">
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
      &nbsp;
      <button
        class="nav-item dropdown btn btn-outline-success text-nowrap dropdown-toggle"
        type="button"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Export

        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <!-- Hide the default file input -->
            <label
              for="fileAll"
              class="custom-file-label dropdown-item"
              style="border-radius: 0px; cursor: pointer"
              @click="triggerFileInput"
            >
              Import
            </label>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click="exportOneFile">Export</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click="exportAll">Export All</a>
          </li>
        </div>
      </button>
    </div>

    <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
      <div class="d-flex gap-2 mt-3">
        <div></div>

        <select v-model="selectedFilter" @change="filterData($event.target.value)">
          <option value="">Status</option>
          <option value="active_site">Active</option>
          <option value="inactive_site">In-Active</option>
        </select>
        <select id="selectClients" @change="filterDataFilter">
          <option value="">Client Name</option>
          <option
            v-for="option in clientData"
            :key="option.id"
            :value="option.first_name"
            aria-placeholder="Select Client"
          >
            {{ option.first_name }}
          </option>
        </select>

        <select id="selectSite" @change="filterDataFilter">
          <option value="">Site Name</option>
          <option
            v-for="option in businessUnit"
            :key="option.id"
            :value="option.first_name"
            aria-placeholder="Select Client"
          >
            {{ option.site_name }}
          </option>
        </select>

        <select id="selectSitesAddress" @change="filterDataFilter">
          <option value="">Site Address</option>
          <option
            v-for="option in businessUnit"
            :key="option.id"
            :value="option.address"
            aria-placeholder="Select Address"
          >
            {{ option.address }}
          </option>
        </select>
      </div>
    </div>
    <div class="table-wrapper mt-3">
      <table class="table siteTable">
        <thead>
          <tr>
            <th></th>

            <th scope="col">#RefCode</th>
            <th scope="col">Site</th>
            <th scope="col">ClientName</th>

            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="paginateSiteData?.length > 0">
          <tr v-for="data in paginateSiteData" :key="data.id">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="data.id"
                :id="data.id"
                v-model="checkedSites[data.id]"
                @change="handleCheckboxChange(data.id)"
              />
            </td>
            <td v-text="data.refer_code"></td>
            <td v-text="data.site_name"></td>
            <td>
              <router-link
                class="text-capitalize text-decoration-underline text-black fw-bold"
                :to="{ name: 'SingleClientProfile', params: { id: data.client_id } }"
                >{{ data.client_name }}</router-link
              >
            </td>
            <td>{{ data.address }}</td>
            <td>{{ data.phone_number }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.status ? "Active" : "Inactive" }}</td>
            <td>{{ data.portal_access }}</td>
            <td class="cursor-pointer">
              <button
                type="button"
                class="btn btn-outline-success text-nowrap text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editSite"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              &nbsp;&nbsp;

              <router-link
                :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
              &nbsp;&nbsp;
              <button
                class="btn btn-outline-danger text-nowrap"
                v-on:click="deleteSiteMethod(data.id)"
              >
                <i class="bi bi-trash"></i>
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
          <tr v-else>
            <td v-if="!isLoading" colspan="15" class="text-danger text-center">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddSite @addSite="getSiteAllDataMethod" />
    <EditSite
      :siteId="selectedsiteId || 0"
      @editSite="getSiteAllDataMethod"
      ref="refSite"
    />
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
    <div class="mx-3" style="text-align: right" v-if="getSiteAllData?.length >= 10">
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
        :disabled="currentPage * itemsPerPage >= getSiteAllData?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EditSite from "../../modals/Site/EditSite.vue";
import AddSite from "../../modals/Site/AddSite.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";

import { reactive } from "vue";
export default {
  data() {
    return {
      getSiteAllData: [],
      selectedsiteId: 0,
      showFilters: false,
      getSiteDetail: [],
      currentPage: 1,
      totalRecords: 0,
      itemsPerPage: 10,
      siteIds: [],
      client_id: null,
      errorMessageFilter: "",
      clientData: [],
      businessUnit: [],
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      checkedSites: reactive({}),
      selectedFilter: "",
    };
  },
  created() {
    this.siteIds = this.getSiteAllData.map((data) => data.id);

    this.getSiteAllData.forEach((data) => {
      this.$set(this.checkedSites, data.id, false);
    });
  },

  components: { EditSite, AddSite, SuccessAlert, Loader, ConfirmationAlert },
  computed: {
    paginateSiteData() {
      if (this.getSiteAllData && Array.isArray(this.getSiteAllData)) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.getSiteAllData.slice(startIndex, endIndex);
      }
      return [];
    },
    totalRecordsOnPage() {
      return this.paginateSiteData.length;
    },
    selectClients() {
      const client = this.clientData.find((option) => option.id === this.client_id);
      return client ? client.first_name : "";
    },
    selectSite() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    selectSitesAddress() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.address : "";
    },
  },
  methods: {
    confirmed(id) {
      this.isModalVisible = false;

      this.jobsInActive(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    deleteSiteMethod(id) {
      this.confirmMessage = "Are you sure you want to completely delete this site?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/sites/` + id).then((response) => {
          this.getSiteAllDataMethod();
          // this.getInactiveJobData();
        });
        const message = "Record deleted successfully";
        this.$refs.successAlert.showSuccess(message);

        this.isModalVisible = false;
      };
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
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async filterDataFilter(event) {
      const selectElement = event.target;
      const selectedValue = selectElement.value;
      const selectId = selectElement.id;

      let fieldType = "";
      if (selectId === "selectClients") {
        fieldType = "client";
      } else if (selectId === "selectSite") {
        fieldType = "site_name";
      } else if (selectId === "selectSitesAddress") {
        fieldType = "address";
      }

      const filters = {
        field_type: fieldType,
        value: selectedValue,
      };

      await this.makeFilterAPICalls(filters.field_type, filters.value);
    },
    async makeFilterAPICalls(field_type, value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites_filters`, {
          params: {
            field_type: field_type,
            value: value,
          },
        });

        this.getSiteAllData = response.data.data || [];

        if (this.getSiteAllData.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
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
          }
        } else {
          // console.error("An error occurred:", error.message);
        }
      }
    },
    filterData(value) {
      this.selectedFilter = value;

      let site_type = "status";
      let site_value;

      if (value === "active_site") {
        site_value = "true";
      } else if (value === "inactive_site") {
        site_value = "false";
      } else if (value === "all") {
        site_value = "true";
      } else {
        site_value = "false";
      }

      this.makeFilterAPICall(site_type, site_value);
    },
    async makeFilterAPICall(site_type, site_value) {
      try {
        let params = {};

        if (site_value) {
          params = {
            site_type: site_type,
            site_value: site_value,
          };
        }

        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params: params,
        });

        this.getSiteAllData = response.data.data;
        this.currentPage = 1;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            errorMessages === "No records found for the given filter";
            // alert("No records found for the given filter");
          } else {
            // alert(errorMessages);
          }
        } else {
          // console.error("Error fetching filtered data:", error);
        }
      }
    },
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
      this.$refs.refSite.getClientMethod();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const isValidFileType = file.type === "text/csv";
      if (!isValidFileType) {
        alert("Please select a CSV file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${VITE_API_URL}/import_all_csv_site.csv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const message = "Import Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.ImportCSV(response.data, file.name);
        })
        .catch((error) => {
          // Handle error
          // console.log(error);
        });
    },
    exportAll() {
      let apiUrl = `${VITE_API_URL}/export_all_csv_site.csv`;
      let params = {};
      let filename = "All_SiteData.csv";

      if (this.selectedFilter === "active_site") {
        params.filter_type = "active_site";
        filename = "Active_Sites.csv";
      } else if (this.selectedFilter === "inactive_site") {
        params.filter_type = "inactive_site";
        filename = "Inactive_Sites.csv";
      }

      axios
        .get(apiUrl, {
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          this.downloadCSV(response.data, filename);
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
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getSiteAllDataMethod();
    },

    async getSiteAllDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`, {
          params: {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
        });
        this.getSiteAllData = response.data.data;
        this.totalRecords = response.data.total;
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleCheckboxChange(dataId) {
      if (this.checkedSites[dataId]) {
        this.siteIds.push(dataId);
      } else {
        const index = this.siteIds.indexOf(dataId);
        if (index !== -1) {
          this.siteIds.splice(index, 1);
        }
      }
      // console.log("Updated siteIds array:", this.siteIds);
    },
    exportOneFile() {
      if (!this.siteIds || this.siteIds.length === 0) {
        alert("Please select at least one Site.");
        return;
      }
      // const filterName = this.getFilterName(this.selectedFilter);
      // const filename = `${filterName}_Sites.csv`;
      const promises = this.siteIds.map((siteId) => {
        const queryParams = `site_ids=${siteId}`;
        return axios.get(`${VITE_API_URL}selected_export_site?${queryParams}`, {
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        });
      });

      Promise.all(promises)
        .then((responses) => {
          const csvDataArray = responses.map((response) =>
            this.blobToText(response.data)
          );
          Promise.all(csvDataArray)
            .then((dataArray) => {
              const combinedCsvData = this.combineCsvData(dataArray);
              const filename = "SiteData.csv";
              this.downloadOneCSV(combinedCsvData, filename);
              const message = "Export file download Successfully";
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
          this.siteIds = [];
          this.checkedSites = {};
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
  },
  async mounted() {
    await this.getSiteAllDataMethod();
    this.getBusinessUnitMethod();
    this.getClientMethod();
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;

  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
.siteTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
</style>
