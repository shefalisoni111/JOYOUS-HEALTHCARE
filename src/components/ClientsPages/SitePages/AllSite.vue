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
            <!-- Trigger file input when label is clicked -->

            <!-- <button class="import-button" >
            Import
          </button> -->
            <!-- <label
            for="fileAll"
            class="dropdown-item"
            style="border-radius: 0px"
            >Import</label
          > -->
            <!-- <a class="" href="#" @click="triggerFileInput"
            >Import</a
          > -->
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

        <select @change="filterData($event.target.value)">
          <option selected>Site Status</option>
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
      <table class="table siteTable">
        <thead>
          <tr>
            <th></th>

            <th scope="col">#RefCode</th>
            <th scope="col">Site</th>
            <th scope="col">ClientName</th>

            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="getSiteAllData?.length > 0">
          <tr v-for="data in getSiteAllData" :key="data.id">
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
                class="text-capitalize text-decoration-underline text-black"
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
              <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
              <router-link
                :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddSite @addSite="getSiteAllDataMethod" />
    <EditSite :siteId="selectedsiteId || 0" @editSite="getSiteAllDataMethod" />
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

import { reactive } from "vue";
export default {
  data() {
    return {
      getSiteAllData: [],
      selectedsiteId: 0,
      showFilters: false,
      getSiteDetail: [],
      siteIds: [],
      isLoading: false,
      checkedSites: reactive({}),
    };
  },
  created() {
    this.siteIds = this.getSiteAllData.map((data) => data.id);

    this.getSiteAllData.forEach((data) => {
      this.$set(this.checkedSites, data.id, false);
    });
  },

  components: { EditSite, AddSite, SuccessAlert, Loader },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filterData(value) {
      let site_type = "status";
      let site_value = value === "true" ? "true" : "false";

      this.makeFilterAPICall(site_type, site_value);
    },
    async makeFilterAPICall(site_type, site_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params: {
            site_type: site_type,
            site_value: site_value,
          },
        });

        this.getSiteAllData = response.data.data;
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
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
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
    async getSiteAllDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`);
        this.getSiteAllData = response.data.data;
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
              const filename = "combined_data.csv";
              this.downloadOneCSV(combinedCsvData, filename);
              const message = "Export file download Successfully";
              this.$refs.successAlert.showSuccess(message);
            })
            .catch((error) => {
              console.error("Error reading CSV data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching CSV data:", error);
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
  mounted() {
    this.getSiteAllDataMethod();
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;

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
