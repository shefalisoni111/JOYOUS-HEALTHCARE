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

        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
            <a class="dropdown-item" href="#" @click="exportOneFile('selected')"
              >Export</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click="exportOneFile('all')">Export All</a>
          </li>
        </ul>
      </button>
    </div>

    <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
      <div class="d-flex gap-2 mt-3">
        <div></div>

        <select v-model="selectedClientExport" @change="filterData">
          <option value="" disabled>Status</option>
          <option value="true">Active</option>
          <option value="false">In-Active</option>
        </select>

        <select v-model="selectedClient" @change="filterData">
          <option value="" disabled>Select Client</option>
          <option
            v-for="option in clientData"
            :key="option.id"
            :value="option.client_name"
          >
            {{ option.client_name }}
          </option>
        </select>

        <select v-model="selectedJobTitle" @change="filterData">
          <option value="" disabled>Select Job</option>
          <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
        <div class="searchbox position-relative">
          <input
            class="form-control"
            type="search"
            placeholder="Search clients..."
            aria-label="Search"
            v-model="localSearchQuery"
            @input="filterData"
          />
        </div>
        <!-- <select id="selectClientsAddress" @change="filterData">
          <option value="">Address</option>
          <option
            v-for="option in clientData"
            :key="option.id"
            :value="option.address"
            aria-placeholder="Select Address"
          >
            {{ option.address }}
          </option>
        </select> -->
      </div>
    </div>
    <div class="table-wrapper mt-3">
      <table class="table clientTable">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">#RefCode</th>
            <th scope="col">ClientName</th>
            <th scope="col" style="width: 10%">Jobs</th>
            <th scope="col" style="width: 10%">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="paginateCandidates?.length > 0">
          <tr v-for="client in paginateCandidates" :key="client.id">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="client.id"
                :id="client.id"
                v-model="checkedClient[client.id]"
                @change="handleCheckboxChange(client.id)"
              />
            </td>
            <!-- <td v-text="client.id"></td> -->

            <td v-text="client.ref_code"></td>
            <td>
              <router-link
                class="text-capitalize fw-bold"
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
              >
                {{ client.client_name }}
              </router-link>
              <!-- {{ client.client_name }} -->
            </td>
            <td>
              <span
                v-for="(job, index) in client.job_ids"
                :key="job"
                :style="{ backgroundColor: getColor(index) }"
                class="p-1 me-2 pb-1 mt-5 rounded-1"
              >
                {{ getJobName(job) }}

                <template v-if="index !== client.job_ids.length - 1"> </template>
              </span>
            </td>

            <td v-text="client.address"></td>

            <td v-text="client.phone_number"></td>

            <td v-text="client.email"></td>

            <td>
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="client.activated"
                  @change="clientStatusChangeMethod(client.id, client.activated)"
                  :checked="client.activated"
                />
                <div class="slider round"></div>
              </label>
            </td>
            <!-- <td v-text="client.portal_access"></td> -->
            <td>
              <span
                class="text-white p-1 rounded-1"
                style="font-size: 13px"
                :class="{
                  'bg-success': client.activated,
                  'bg-danger': !client.activated,
                }"
                >{{ client.activated ? "Active" : "No Account" }}</span
              >
            </td>
            <td class="cursor-pointer">
              <button
                type="button"
                class="btn btn-outline-success text-nowrap text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editClient"
                data-bs-whatever="@mdo"
                @click="editClient(client.id)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              &nbsp;&nbsp;

              <router-link
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
              &nbsp;&nbsp;
              <button
                class="btn btn-outline-danger text-nowrap"
                v-on:click="deleteClientDataMethod(client.id)"
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
    <div class="mx-3" style="text-align: right" v-if="getClientDetail?.length >= 10">
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
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }} of {{ totalPages }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
    <EditClientModal
      :clientID="selectedClientID || 0"
      @client-updated="createdClient"
      ref="editClientModalAll"
    />
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <AddClients @client-updated="createdClient" />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import EditClientModal from "../modals/Clients/EditClientModal.vue";
import Loader from "../Loader/Loader.vue";
import AddClients from "@/components/modals/Clients/AddClients.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import { reactive } from "vue";
export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,

      isActive: true,
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      activated: false,
      showFilters: false,
      isLoading: false,
      checkedClient: reactive({}),
      errorMessageFilter: "",
      selectedFilter: "",
      selectedClientExport: "",
      selectedClient: "",
      selectedJobTitle: "",
      clientData: [],
      options: [],
      clientId: [],
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      client: {
        job_name: ["Job1", "Job2", "Job3", "Job4", "Job5", "Job6"],
      },
      localSearchQuery: this.searchQuery,
      colors: [
        "lightblue",
        "lightgreen",
        "lightyellow",
        "lightcoral",
        "lightskyblue",
        "lightpink",
      ],
    };
  },

  // props: {
  //   showFiltersValue: {
  //     type: String,
  //     required: false,
  //   },
  // },
  components: { EditClientModal, AddClients, SuccessAlert, Loader, ConfirmationAlert },
  computed: {
    paginateCandidates() {
      return this.getClientDetail;
    },

    portalAccessText() {
      return this.client.activated ? "Active" : "No Account";
    },
    selectClients() {
      const client = this.clientData.find((option) => option.id === this.client_id);
      return client ? client.client_name : "";
    },
    selectJobTitle() {
      const job = this.options.find((option) => option.id === this.job_id);
      return job ? job.name : "";
    },
    selectClientsAddress() {
      const client = this.clientData.find((option) => option.id === this.client_id);
      return client ? client.address : "";
    },
  },
  created() {
    this.clientId = this.getClientDetail.map((data) => data.id);

    this.getClientDetail.forEach((data) => {
      this.$set(this.checkedClient, data.id, false);
    });
  },
  methods: {
    getJobName(jobId) {
      const job = this.options.find((job) => job.id === jobId);
      return job ? job.name : "";
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.jobsInActive(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    deleteClientDataMethod(id) {
      this.confirmMessage = "Are you sure you want to completely delete this client?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/clients/` + id).then((response) => {
          this.createdClient();
          // this.getInactiveJobData();
        });
        const message = "Record deleted successfully";
        this.$refs.successAlert.showSuccess(message);

        this.isModalVisible = false;
      };
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.createdClient();
    },

    async getPositionMethod() {
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
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.createdClient();
    },
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.createdClient();
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
          } else {
            // console.error("Error fetching client data:", error.response.data.message);
          }
        } else {
          // console.error("Error fetching client data:", error);
        }
      }
    },
    async filterData() {
      const params = {
        page: 1,
      };

      if (this.selectedClientExport) {
        params["client[activated]"] = this.selectedClientExport;
      }

      if (this.selectedClient) {
        params["client[client_name]"] = this.selectedClient;
      }

      if (this.selectedJobTitle) {
        params["client[job_ids]"] = this.selectedJobTitle;
      }

      if (this.localSearchQuery) {
        params.search = this.localSearchQuery;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/client_filter`, {
          params,
        });
        this.getClientDetail = response.data.data;
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },

    getColor(index) {
      return this.colors[index % this.colors.length];
    },
    clientStatusChangeMethod(id, activated) {
      axios
        .put(`${VITE_API_URL}/update_status/${id}?activated=${activated}`)
        .then((response) => {
          if (activated) {
            // alert("Staff activated successfully!");
            const message = "Client activated successfully!";
            this.$refs.successAlert.showSuccess(message);
          } else {
            // alert("Staff inactivated successfully!");
            const message = "Client inactivated successfully!";
            this.$refs.successAlert.showSuccess(message);
          }
          const updatedClient = this.getClientDetail.find((client) => client.id === id);
          if (updatedClient) {
            updatedClient.activated = activated;
          }
          this.createdClient();
        })
        .catch((error) => {
          // console.error("Error updating staff status:", error);
        });
    },
    editClient(clientID) {
      this.selectedClientID = clientID;
      // this.$refs.editClientModalAll.getJobTitleMethod();
    },
    handleCheckboxChange(dataId) {
      if (this.checkedClient[dataId]) {
        this.clientId.push(dataId);
      } else {
        const index = this.clientId.indexOf(dataId);
        if (index !== -1) {
          this.clientId.splice(index, 1);
        }
      }
      // console.log("Updated clientId array:", this.clientId);
    },
    exportOneFile(exportType) {
      let queryParams = {
        format: "csv",
      };

      if (exportType === "all") {
        if (this.selectedClientExport) {
          queryParams["client[activated]"] = this.selectedClientExport;
        }

        queryParams.client_ids = [];
      } else {
        if (!this.clientId || this.clientId.length === 0) {
          alert("Please select at least one Client.");
          return;
        }
        if (this.selectedClientExport) {
          queryParams["client[activated]"] = this.selectedClientExport;
        }
        if (this.clientId.length > 0) {
          queryParams.client_ids = this.clientId;
        } else {
          queryParams.client_ids = [];
        }
      }

      return axios
        .get(`${VITE_API_URL}/client_filter`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "ClientData.csv";
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
          this.clientId = [];
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
        .post(`${VITE_API_URL}/import_all_csv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.ImportCSV(response.data, file.name);
        })
        .catch((error) => {
          // Handle error
          // console.log(error);
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

    exportAll() {
      let apiUrl = `${VITE_API_URL}/export_all_csv.csv`;
      let params = {};
      let filename = "All_Clients.csv";

      if (this.selectedFilter === "active_client") {
        params.filter_type = "active_client";
        filename = "Active_Clients.csv";
      } else if (this.selectedFilter === "inactive_client") {
        params.filter_type = "inactive_client";
        filename = "Inactive_Clients.csv";
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
    async createdClient() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/client_filter`, {
          params: {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
        });
        this.getClientDetail = response.data.data;
        // this.currentPage = response.data.current_page;
        // this.totalPages = response.data.total_pages;
        // this.totalCount = response.data.clients_count;
      } catch (error) {
        // console.error('Error fetching client data:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    // Initialize filter data on component creation
    // this.filterData();
  },
  async mounted() {
    await this.createdClient();
    this.getClientMethod();
    this.getPositionMethod();
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.btn-primary {
  border: none;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
.table-wrapper {
  overflow-x: auto;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.job-background-even {
  background-color: lightblue;
}
.job-background-odd {
  background-color: lightgreen;
}
.badge {
  background: #ffc107;
  border-radius: 50%;
  padding: 7px 10px;
}
.bg-detail {
  background-color: #f5841d;
  border-radius: 4px;
  padding: 10px;
  color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
}
a:link {
  color: black;
  text-decoration: none;
}
.clientTable tr:nth-child(odd) td {
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
  border: 1px solid #9e9e9e;
  border-radius: 22px;
  color: #607d8b;
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

.searchbox {
  width: 100%;
}

.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}
a {
  color: black;
  text-decoration: none;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
@media (max-width: 1120px) {
  .clientTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
