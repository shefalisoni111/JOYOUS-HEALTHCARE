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
        :

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
          <li><a class="dropdown-item" href="#" @click="exportOneFile">Export</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click="exportAll">Export All</a>
          </li>
        </ul>
      </button>
    </div>

    <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
      <div class="d-flex gap-2 mt-3">
        <div></div>

        <select @change="filterData($event.target.value)">
          <option selected>Client Status</option>
          <option value="true">Active</option>
          <option class="false">In-Active</option>
        </select>

        <!-- <select v-model="selectedCandidate" id="selectCandidateList">
                        <option value="">All Staff</option>
                        <option
                          v-for="option in candidateLists"
                          :key="option.id"
                          :value="`${option.first_name} ${option.last_name}`"
                        >
                          {{ option.first_name }} {{ option.last_name }}
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
            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
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
                class="text-capitalize"
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
              >
                {{ client.first_name }}
              </router-link>
              <!-- {{ client.first_name }} -->
            </td>
            <td>
              <span
                v-for="(job, index) in client.job_name"
                :key="index"
                :style="{ backgroundColor: getColor(index) }"
                class="p-1 me-2 pb-1 mt-5 rounded-1"
              >
                {{ job }}

                <template v-if="index !== client.job_name.length - 1"> </template>
              </span>
            </td>

            <td v-text="client.address"></td>

            <td v-text="client.phone_number"></td>

            <td v-text="client.email"></td>

            <td>
              <!-- <label class="switch" v-if="client.activated == true">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label> -->
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
              <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
              <router-link
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-3" style="text-align: right" v-if="getClientDetail.length >= 11">
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
        :disabled="currentPage * itemsPerPage >= getClientDetail.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>

    <EditClientModal :clientID="selectedClientID || 0" @client-updated="createdClient" />
    <AddClients @client-updated="createdClient" />
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
import EditClientModal from "../modals/Clients/EditClientModal.vue";
import AddClients from "@/components/modals/Clients/AddClients.vue";
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
      itemsPerPage: 11,
      activated: false,
      showFilters: false,
      checkedClient: reactive({}),
      client: {
        job_name: ["Job1", "Job2", "Job3", "Job4", "Job5", "Job6"],
      },
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

  components: { EditClientModal, AddClients, SuccessAlert },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientDetail.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    portalAccessText() {
      return this.client.activated ? "Active" : "No Account";
    },
  },
  created() {
    this.clientId = this.getClientDetail.map((data) => data.id);

    this.getClientDetail.forEach((data) => {
      this.$set(this.checkedClient, data.id, false);
    });
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filterData(value) {
      let client_type = "activated";
      let client_value = value === "true" ? "true" : "false";

      this.makeFilterAPICall(client_type, client_value);
    },
    async makeFilterAPICall(client_type, client_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/client_filter`, {
          params: {
            client_type: client_type,
            client_value: client_value,
          },
        });

        this.getClientDetail = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            alert("No records found for the given filter");
          } else {
            alert(errorMessages);
          }
        } else {
        }
      }
    },
    getColor(index) {
      return this.colors[index % this.colors.length];
    },
    clientStatusChangeMethod(id, activated) {
      if (!window.confirm("Are you sure?")) {
        return;
      }
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
    exportOneFile() {
      const queryParams = `client_ids=${JSON.stringify(this.clientId)
        .replace(/%20/g, " ")
        .split(",")
        .join(",")}`;
      axios
        .get(`${VITE_API_URL}/selected_export?${queryParams}`, {
          queryParams,
        })
        .then((response) => {
          this.downloadOneCSV(response.data, "filename.csv");
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    },
    downloadOneCSV(csvData, filename) {
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
    // async clientsDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   await axios.delete(`${VITE_API_URL}/clients/` + id).then((response) => {
    //     this.createdClient();
    //   });
    // },
    exportAll() {
      axios
        .get(`${VITE_API_URL}/export_all_csv.csv`)
        .then((response) => {
          this.downloadCSV(response.data, "filename.csv");
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
      await axios
        .get(`${VITE_API_URL}/clients`)

        .then((response) => (this.getClientDetail = response.data.data));
    },
  },
  mounted() {
    this.createdClient();
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;
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
