<template>
  <div>
    <div class="mt-2 d-flex d-sm-flex justify-content-sm-end responsive-float">
      <div class="dropdown">
        <button
          class="btn btn-danger text-nowrap btn-lg dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-funnel"></i>
          Show Filters
        </button>

        <ul
          class="dropdown-menu p-3 shadow-sm rounded-3 z-1"
          aria-labelledby="dropdownMenuButton1"
          style="min-width: 300px"
        >
          <li>
            <div class="mb-2">
              <select
                class="form-select"
                v-model="selectedClientExport"
                @change="filterData"
              >
                <option value="" disabled>Status</option>
                <option value="true">Active</option>
                <option value="false">In-Active</option>
              </select>
            </div>
          </li>

          <li>
            <div class="mb-2">
              <select
                class="form-select"
                v-model="selectedClient"
                @change="filterData"
              >
                <option value="" disabled>Select Client</option>
                <option
                  v-for="option in clientData"
                  :key="option.id"
                  :value="option.client_name"
                >
                  {{ option.client_name }}
                </option>
              </select>
            </div>
          </li>

          <li>
            <div class="mb-2">
              <select
                class="form-select"
                v-model="selectedJobTitle"
                @change="filterData"
              >
                <option value="" disabled>Select Job</option>
                <option
                  v-for="option in options"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
          </li>

          <li>
            <div class="mb-2">
              <input
                class="form-control"
                type="search"
                placeholder="Search clients..."
                v-model="localSearchQuery"
                @input="filterData"
              />
            </div>
          </li>

          <li>
            <button
              :disabled="
                !selectedClientExport &&
                !selectedClient &&
                !selectedJobTitle &&
                !localSearchQuery
              "
              @click="resetFilters"
              class="btn btn-sm btn-dark w-100"
            >
              Reset
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
          </ul>
        </button>
      </div>
    </div>

    <div class="table-wrapper w-100" style="margin-top: -30px">
      <table class="table clientTable table-responsive">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">#RefCode</th>
            <th scope="col" style="width: 10%">Client Name</th>
            <th scope="col" style="width: 10%">Jobs</th>
            <th scope="col" style="width: 10%">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col" style="width: 10%">Action</th>
          </tr>
        </thead>
        <tbody v-if="getClientDetail?.length > 0">
          <tr
            v-for="(client, index) in getClientDetail"
            :key="index"
            @click="toggleActionMenu(index)"
            @mouseleave="selectedRow = null"
          >
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

                <template v-if="index !== client.job_ids.length - 1">
                </template>
              </span>
            </td>

            <td v-text="client.address"></td>

            <td v-text="client.phone_number"></td>

            <td v-text="client.email"></td>

            <td>
              <button
                type="button"
                :class="['btn', 'text-nowrap']"
                :style="
                  client.activated === true
                    ? { backgroundColor: '#E9FAEF', color: '#24D164' }
                    : {
                        backgroundColor: 'rgb(255 227 234)',
                        color: '#FF3B30',
                      }
                "
                @click="clientStatusChangeMethod(client.id, client.activated)"
              >
                {{ client.activated === true ? "Approved" : "Unapprove" }}
              </button>
              <!-- <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="client.activated"
                  v-on:click="
                    clientStatusChangeMethod(client.id, client.activated)
                  "
                  :checked="client.activated"
                />
                <div class="slider round"></div>
              </label> -->
            </td>
            <!-- <td v-text="client.portal_access"></td> -->
            <td>
              <span
                class="text-white p-2 rounded-3 btn-lg"
                :style="
                  client.activated === true
                    ? { backgroundColor: '#4dd04d', color: '#24D164' }
                    : {
                        backgroundColor: '#FF8F6B',
                        color: '#FF3B30',
                      }
                "
                :class="['btn', 'text-nowrap']"
                >{{ client.activated ? "Active" : "No Account" }}</span
              >
            </td>
            <td class="cursor-pointer" style="width: 20%">
              <button
                type="button"
                class="btn btn-outline-success text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editClient"
                data-bs-whatever="@mdo"
                @click="editClient(client.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>

              &nbsp;
              <button
                class="btn text-nowrap btn-outline-success"
                @click="
                  $router.push({
                    name: 'SingleClientProfile',
                    params: { id: client.id },
                  })
                "
              >
                <i class="bi bi-eye"></i></button
              >&nbsp;

              <button
                class="btn btn-outline-success text-nowrap"
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
    <div
      class="mx-3 d-flex justify-content-between"
      v-if="getClientDetail?.length >= 10"
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
    <EditClientModal
      :clientID="selectedClientID || 0"
      @client-updated="createdClient"
      ref="editClientModalAll"
      :options="options"
    />
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <AddClients @client-updated="createdClient" :options="options" />
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
import Swal from "sweetalert2";
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

      isLoading: false,
      selectedRow: null,
      checkedClient: reactive({}),
      errorMessageFilter: "",
      selectedFilter: "",
      selectedClientExport: "",
      selectedClient: "",
      selectedJobTitle: "",

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
  props: {
    clientData: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    EditClientModal,
    AddClients,
    SuccessAlert,
    Loader,
    ConfirmationAlert,
  },
  computed: {
    paginateCandidates() {
      return this.getClientDetail;
    },

    portalAccessText() {
      return this.client.activated ? "Active" : "No Account";
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client ? client.client_name : "";
    },
    // selectJobTitle() {
    //   const job = this.options.find((option) => option.id === this.job_id);
    //   return job ? job.name : "";
    // },
    selectClientsAddress() {
      const client = this.clientData.find(
        (option) => option.id === this.client_id
      );
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
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
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
      this.confirmMessage =
        "Are you sure you want to completely delete this client? Please ensure all the shifts, bookings and payments are cleared.";
      this.isModalVisible = true;
      this.confirmButtonClass = "btn text-nowrap border-0";
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

    async changePage(page) {
      this.currentPage = page;
      await this.createdClient();
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
    confirmeds(id) {
      this.isModalVisible = false;
    },
    canceleds() {
      this.isModalVisible = false;
    },
    clientStatusChangeMethod(id, activated) {
      const newStatus = !activated;
      const action = newStatus ? "activate" : "inactivate";
      const confirmMessage = `Are you sure you want to ${action} this client?<br>Please ensure all the shifts, bookings, and payments are cleared.`;

      Swal.fire({
        icon: "warning",
        title: `Confirm ${action}`,
        html: confirmMessage,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`${VITE_API_URL}/update_status/${id}?activated=${newStatus}`)
            .then((response) => {
              const message = newStatus
                ? "Client activated successfully!"
                : "Client inactivated successfully!";
              Swal.fire({
                icon: "success",
                title: "Success",
                text: message,
              });

              const updatedClient = this.getClientDetail.find(
                (client) => client.id === id
              );
              if (updatedClient) {
                updatedClient.activated = newStatus;
              }

              this.createdClient();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update client status. Please try again later.",
              });

              const updatedClient = this.getClientDetail.find(
                (client) => client.id === id
              );
              if (updatedClient) {
                updatedClient.activated = activated;
              }
            });
        }
      });
    },
    resetFilters() {
      this.selectedClientExport = "";
      this.selectedClient = "";
      this.selectedJobTitle = "";
      this.localSearchQuery = "";

      this.createdClient();
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
    },
    exportOneFile(exportType) {
      let queryParams = {
        format: "csv",
      };

      if (this.selectedClientExport) {
        queryParams["client[activated]"] = this.selectedClientExport;
      }

      if (this.selectedClient) {
        queryParams["client[client_name]"] = this.selectedClient;
      }

      if (this.selectedJobTitle) {
        queryParams["client[job_ids]"] = this.selectedJobTitle;
      }

      if (this.localSearchQuery) {
        queryParams.search = this.localSearchQuery;
      }

      if (exportType === "all") {
        queryParams.client_ids = [];
      } else {
        if (!this.clientId || this.clientId.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Client Selected",
            text: "Please select at least one Client.",
            confirmButtonText: "OK",
          });
          return;
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
              this.clientId = [];
              for (let key in this.checkedClient) {
                this.checkedClient[key] = false;
              }
            })
            .catch((error) => {});
        })
        .catch((error) => {})
        .finally(() => {
          this.clientId = [];
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
        .post(`${VITE_API_URL}/import_all_csv`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        // .then((response) => {
        //   const message = response.data.message || "CSV file imported successfully.";

        //   Swal.fire({
        //     icon: "success",
        //     title: "Import Successful",
        //     text: message,
        //   });
        // })
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

            this.createdClient();
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
      let apiUrl = `${VITE_API_URL}/client_filter`;
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
      const params = {
        page: this.currentPage,
        per_page: this.itemsPerPage,
      };

      // if (this.selectedClientExport) {
      //   params["client[activated]"] = this.selectedClientExport;
      // }

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
        this.totalPages = Math.ceil(
          response.data.client_filter / this.itemsPerPage
        );
        if (this.getClientDetail?.length === 0) {
          this.errorMessageFilter = "Data Not Found!";
        }

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

    // this.getPositionMethod();
  },
};
</script>
<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
#main {
  transition: all 0.3s;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #f9f9f9;
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
ul.nav-pills,
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
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
input.form-check-input {
  color: #667085 !important;
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
  background-color: #ffffff;
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
input.form-control,
input.form-control:focus {
  width: 100%;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
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
  font-family: "Inter", sans-serif;
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
@media (max-width: 576px) {
  .dropdown-menu {
    position: static !important;
    width: 100% !important;
  }
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
