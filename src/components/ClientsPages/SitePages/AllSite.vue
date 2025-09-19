<template>
  <div>
    <div class="mt-2 d-flex d-sm-flex justify-content-sm-end responsive-float">
      <div class="dropdown">
        <button
          class="btn btn-danger text-nowrap btn-lg dropdown-toggle"
          type="button"
          id="dropdownMenuButtonFilters"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-funnel"></i>
          Show Filters
        </button>

        <ul
          class="dropdown-menu p-3 shadow-sm rounded-3"
          aria-labelledby="dropdownMenuButtonFilters"
          style="min-width: 300px"
        >
          <li class="mb-2">
            <select
              class="form-select"
              v-model="selectedFilter"
              @change="filterData"
            >
              <option value="" disabled>Status</option>
              <option value="true">Active</option>
              <option value="false">In-Active</option>
            </select>
          </li>

          <li class="mb-2">
            <select
              class="form-select"
              v-model="client_id"
              @change="onClientChange"
            >
              <option value="" disabled>Client Name</option>
              <option
                v-for="option in clientData"
                :key="option.id"
                :value="option.id"
              >
                {{ option.client_name }}
              </option>
            </select>
          </li>

          <li class="mb-2">
            <select class="form-select" v-model="site_id" @change="filterData">
              <option value="" disabled>Site Name</option>
              <option
                v-for="option in businessUnit"
                :key="option.site_id"
                :value="option.site_name"
              >
                {{ option.site_name }}
              </option>
            </select>
          </li>

          <li class="mb-2">
            <input
              class="form-control"
              type="search"
              placeholder="Search Site..."
              v-model="localSearchQuery"
              @input="filterData"
            />
          </li>

          <li>
            <button
              class="btn btn-secondary w-100"
              @click="resetFilter"
              :disabled="
                !selectedFilter && !client_id && !site_id && !localSearchQuery
              "
            >
              Reset Filters
            </button>
          </li>
        </ul>
      </div>
      <div class="dropdown">
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
          class="nav-item dropdown btn btn-lg btn-outline-success text-nowrap dropdown-toggle"
          type="button"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Export

          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
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
              <a
                class="dropdown-item"
                href="#"
                @click="exportOneFile('selected')"
                >Export</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#" @click="exportOneFile('all')"
                >Export All</a
              >
            </li>
          </div>
        </button>
      </div>
    </div>

    <div class="table-wrapper w-100" style="margin-top: -30px">
      <table class="table siteTable table-responsive">
        <thead>
          <tr>
            <th></th>

            <th scope="col">#RefCode</th>
            <th scope="col">Site</th>
            <th scope="col">ClientName</th>

            <th scope="col" style="width: 10%">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col" style="width: 10%">Action</th>
          </tr>
        </thead>
        <tbody v-if="getSiteAllData?.length > 0">
          <tr
            v-for="(data, index) in getSiteAllData"
            :key="index"
            @click="toggleActionMenu(index)"
            @mouseleave="selectedRow = null"
          >
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
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: data.client_id },
                }"
                >{{ data.client_name }}</router-link
              >
            </td>
            <td>{{ data.address }}</td>
            <td>{{ data.phone_number }}</td>
            <td>{{ data.email }}</td>
            <td>
              <!-- {{ data.status ? "Active" : "Inactive" }} -->
              <button
                type="button"
                :class="['btn', 'text-nowrap']"
                :style="
                  data.status === true
                    ? { backgroundColor: '#E9FAEF', color: '#24D164' }
                    : {
                        backgroundColor: 'rgb(255 227 234)',
                        color: '#FF3B30',
                      }
                "
              >
                {{ data.status === true ? "Active" : "Inactive" }}
              </button>
            </td>
            <td>
              <!-- {{ data.portal_access }} -->
              <span
                class="text-white p-2 rounded-3 btn-lg"
                :style="
                  data.portal_access === true
                    ? { backgroundColor: '#4dd04d', color: '#24D164' }
                    : {
                        backgroundColor: '#FF8F6B',
                        color: '#FF3B30',
                      }
                "
                :class="['btn', 'text-nowrap']"
                >{{ data.portal_access ? "Active" : "No Account" }}</span
              >
            </td>
            <td class="cursor-pointer" style="width: 20%">
              <button
                type="button"
                class="btn text-nowrap btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#editSite"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              &nbsp;
              <router-link
                :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                class="btn text-nowrap btn-outline-success"
              >
                <i class="bi bi-eye"></i>
              </router-link>
              &nbsp;
              <button
                class="btn text-nowrap btn-outline-success"
                v-on:click="deleteSiteMethod(data.id)"
              >
                <i class="bi bi-trash border-0 border-0"></i>
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

    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getSiteAllData?.length >= 10"
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
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(100)"
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
          <i
            class="bi bi-chevron-left"
            :class="{ 'fw-bolder': currentPage !== totalPages }"
          ></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 fw-bolder"
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
          <i
            class="bi bi-chevron-right"
            :class="{ 'fw-bolder': currentPage !== totalPages }"
          ></i>
        </button>
      </div>
    </div>
    <AddSite @addSite="filterData" />
    <EditSite
      :siteId="selectedsiteId || 0"
      @editSite="filterData"
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
  </div>
</template>
<script>
import axios from "axios";
import EditSite from "../../modals/Site/EditSite.vue";
import AddSite from "../../modals/Site/AddSite.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
import { reactive } from "vue";
export default {
  data() {
    return {
      getSiteAllData: [],
      selectedsiteId: 0,

      getSiteDetail: [],
      selectedRow: null,
      currentPage: 1,
      totalRecords: 0,
      itemsPerPage: 10,
      site_id: null,
      site_ids: [],
      client_id: null,
      localSearchQuery: this.searchQuery,
      errorMessageFilter: "",
      clientData: [],
      businessUnit: [],
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      checkedSites: reactive({}),
      totalPages: 1,

      totalCount: 0,
      selectedClientName: "",
      selectedSiteName: "",
      selectedSiteAddress: "",
      selectedFilter: "",
    };
  },
  created() {
    this.site_ids = this.getSiteAllData.map((data) => data.id);

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
      const site = this.businessUnit.find((site) => site.id === this.site_id);
      if (!site) return "";
      const client = this.clientData.find(
        (client) => client.id === site.client_id
      );
      return client ? client.client_name : "";
    },

    selectSite() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },
    selectSitesAddress() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.address : "";
    },
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async onClientChange() {
      await this.getSiteAllDataMethod();
      this.filterData();
    },
    changePage(page) {
      this.currentPage = page;
      this.filterData();
    },
    resetFilter() {
      this.selectedFilter = "";
      this.client_id = null;
      this.site_id = null;
      this.selectedSiteAddress = "";
      this.localSearchQuery = "";

      this.filterData();
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.jobsInActive(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    deleteSiteMethod(id) {
      this.confirmMessage =
        "Are you sure you want to completely delete this site?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/sites/` + id).then((response) => {
          this.filterData();
          // this.getInactiveJobData();
        });
        const message = "Record deleted successfully";
        this.$refs.successAlert.showSuccess(message);

        this.isModalVisible = false;
      };
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
    async getBusinessUnitMethod() {
      try {
        const params = {
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };

        const response = await axios.get(`${VITE_API_URL}/sites`, { params });

        this.businessUnit = response.data.data;
        // console.log(this.businessUnit);
      } catch (error) {
        if (error.response?.status === 404) {
          // Handle 404
        }
      }
    },

    async filterData() {
      const params = {
        page: this.currentPage,
        per_page: this.itemsPerPage,
      };

      if (this.selectedFilter) {
        params["site[status]"] = this.selectedFilter;
      }

      if (this.client_id) {
        params["site[client_id]"] = this.client_id;
      }

      if (this.site_id) {
        params["site[site_name]"] = this.site_id;
      }
      if (this.selectedSiteAddress) {
        params["site[address]"] = this.getAddressById(this.selectedSiteAddress);
      }

      if (this.localSearchQuery) {
        params.search = this.localSearchQuery;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params,
        });
        this.getSiteAllData = response.data.data || [];
        this.totalPages = Math.ceil(
          response.data.site_filter / this.itemsPerPage
        );
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },
    getSiteNameById(id) {
      const site = this.businessUnit.find((site) => site.id === id);
      return site ? site.site_name : "";
    },
    getAddressById(id) {
      const site = this.businessUnit.find((site) => site.id === id);
      return site ? site.address : "";
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

      const isValidFileType =
        file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isValidFileType) {
        Swal.fire({
          icon: "info",
          title: "Invalid File Type",
          text: "Please select a CSV file.",
          confirmButtonText: "OK",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      Swal.fire({
        title: "Uploading...",
        text: "Please wait while the file is being imported.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .post(`${VITE_API_URL}/import_all_csv_site`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 204 || !response.data) {
            Swal.fire({
              icon: "error",
              title: "Import Failed",
              text: "No valid data found in the CSV file.",
            });
            return;
          }

          if (response.data.errors) {
            Swal.fire({
              icon: "error",
              title: "Import Failed",
              text:
                response.data.errors || "No valid rows found in the CSV file.",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Import Successful",
              text: response.data.message || "CSV file imported successfully.",
            });

            this.filterData();
          }
        })
        .catch((error) => {
          console.error("File upload failed:", error);

          Swal.fire({
            icon: "error",
            title: "Import Failed",
            text:
              error.response?.data?.errors ||
              "There was an issue importing the file. Please try again.",
          });
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
      this.filterData();
    },

    async getSiteAllDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/fetch_site_by_client_id/${this.client_id}`
        );

        this.businessUnit = response.data.sites;
        // this.getSiteAllData = response.data.data;
        // this.totalRecords = response.data.total;
        // this.businessUnit = response.data.data;
        // console.log(this.businessUnit, this.client_id);
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleCheckboxChange(dataId) {
      if (this.checkedSites[dataId]) {
        this.site_ids.push(dataId);
      } else {
        const index = this.site_ids.indexOf(dataId);
        if (index !== -1) {
          this.site_ids.splice(index, 1);
        }
      }
      // console.log("Updated site_ids array:", this.site_ids);
    },
    exportOneFile(exportType) {
      let queryParams = {
        format: "csv",
      };

      if (this.selectedFilter) {
        queryParams["site[status]"] = this.selectedFilter;
      }

      if (this.selectedClientName) {
        queryParams["site[client_id]"] = this.selectedClientName;
      }

      if (this.selectedSiteName) {
        queryParams["site[site_name]"] = this.selectedSiteName;
      }

      if (this.selectedSiteAddress) {
        queryParams["site[address]"] = this.selectedSiteAddress;
      }

      if (this.localSearchQuery) {
        queryParams.search = this.localSearchQuery;
      }
      if (exportType === "all") {
        queryParams.site_ids = [];
      } else {
        if (!this.site_ids || this.site_ids.length === 0) {
          // alert("Please select at least one Site.");
          Swal.fire({
            icon: "warning",
            title: "No File Selected",
            text: "Please select at least one Site.",
            confirmButtonText: "OK",
          });
          return;
        }
        if (this.site_ids.length > 0) {
          queryParams.site_ids = this.site_ids;
        } else {
          queryParams.site_ids = [];
        }
      }
      // const filterName = this.getFilterName(this.selectedFilter);
      // const filename = `${filterName}_Sites.csv`;
      return axios
        .get(`${VITE_API_URL}/site_filter`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "SiteData.csv";
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
  },
  mounted() {
    this.getClientMethod();
    // this.getSiteAllDataMethod();
    // this.getBusinessUnitMethod();

    this.filterData();
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}

input.form-control,
input.form-control:focus,
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
  background: #fff4f5;
}

@media (max-width: 1120px) {
  .siteTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
