<template>
  <div>
    <div class="row">
      <div class="d-flex gap-3">
        <div class="d-flex gap-3">
          <div class="custom-select-wrapper">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="site_id"
              @change="onSiteChange"
            >
              <option value="" disabled>All Site</option>
              <option
                v-for="option in siteData"
                :key="option.id"
                :value="option.id"
                :id="option.id"
                aria-placeholder="Select Job"
              >
                {{ option.site_name }}
              </option>
            </select>
          </div>
          <div class="custom-select-wrapper">
            <select
              class="form-select"
              v-model="site_shift_id"
              id="selectShifts"
              @change="filterData"
            >
              <option value="" disabled>All Shift</option>
              <option
                v-for="option in shiftsTime"
                :key="option.id"
                :value="option.id"
                aria-placeholder="Select Job"
              >
                {{ option.shift_name.replace(/_/g, " ") }}
              </option>
            </select>
          </div>

          <div class="custom-select-wrapper">
            <select
              class="form-select"
              v-model="job_id"
              id="selectJobTitle"
              @change="filterData"
            >
              <option value="" disabled>All Jobs</option>
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

        <div>
          <button
            type="button"
            class="btn btn-danger btn-lg text-nowrap"
            @click="exportOneFile('all')"
          >
            <i class="bi bi-download"></i> Export CSV
          </button>
          &nbsp;&nbsp;

          <button
            :disabled="!isFilterSelected"
            @click="resetFilters"
            class="btn btn-secondary"
          >
            Reset Filters
          </button>
        </div>
      </div>

      &nbsp;&nbsp;

      <div class="col-12 wrapper-vacancy">
        <table class="table vacancyTable candidateTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">#RefCode</th>

              <th scope="col">Site</th>
              <th scope="col">Position</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>

              <th scope="col">Assigned</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="paginatedShift?.length > 0">
            <tr
              v-for="(data, index) in paginatedShift"
              :key="index"
              @click="toggleActionMenu(index)"
              @mouseleave="selectedRow = null"
            >
              <td scope="col">{{ data.id }}</td>
              <td scope="col">{{ data.ref_code }}</td>
              <td scope="col">{{ data.site_name }}</td>
              <td scope="col">{{ data.job_name }}</td>
              <td class="widthDefine">
                <span v-for="(date, index) in data.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== data.dates.length - 1">, </template>
                </span>
              </td>
              <td scope="col">{{ data.shift }}</td>
              <td scope="col">{{ data.assigned }}</td>
              <td scope="col">
                <!-- <i
                  class="bi bi-trash border-0 border-0 cursor-pointer btn btn-outline-danger text-nowrap"
                  v-on:click="confirmed(data.id)"
                ></i> -->
                <div class="action-wrapper position-relative position-relative">
                  <i class="bi bi-three-dots dot-icon"></i>

                  <div
                    v-if="selectedRow === index"
                    class="action-menu position-absolute position-absolute"
                    style="top: 17px; left: 13px"
                  >
                    <button
                      class="btn text-nowrap border-0"
                      v-on:click="confirmed(data.id)"
                    >
                      <i
                        class="bi bi-trash border-0 border-0"
                        style="color: #f9944b"
                      ></i>
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-if="!isLoading">
              <td colspan="16" class="text-center text-danger">
                {{ "Data Not Found!" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <loader :isLoading="isLoading"></loader>
    </div>
    <!-- <EditVacancy
            :vacancyId="selectedVacancyId || 0"
            @updateVacancy="createVacancy"
            ref="editShift"
          /> -->

    <!-- <AddVacancy @addVacancy="createVacancy" /> -->
    <div
      class="mt-3"
      style="text-align: right"
      v-if="getShiftAssignData?.length >= 10"
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
        :disabled="currentPage * itemsPerPage >= getShiftAssignData?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>

    <AddClietShift @addVacancy="fetchData" />
  </div>
</template>
<script>
import axios from "axios";
import Loader from "../../Loader/Loader.vue";
import Swal from "sweetalert2";
import AddClietShift from "../../modals/ClientDashboard/ClientShift_pages/AddClietShift.vue";

export default {
  name: "ClientDash",

  data() {
    return {
      getShiftAssignData: [],
      CurrentWekShift: [],
      isLoading: false,
      // siteData: [],
      site_id: "",
      client_id: null,
      clientData: [],
      job_id: "",
      // options: [],
      selectedRow: null,
      shiftsTime: [],
      businessUnit: [],
      selectedSiteId: null,
      selectedJobId: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      selectedJobId: "",
      site_shift_id: "",
    };
  },
  components: { Loader, AddClietShift },
  props: {
    startDate: Date,
    currentView: String,
    options: Array,

    siteData: Array,
  },
  watch: {
    startDate: "fetchData",
    currentView: "fetchData",
  },
  computed: {
    isFilterSelected() {
      return this.site_id || this.site_shift_id || this.job_id;
    },
    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return this.client_id;
    },

    selectShifts() {
      const shifts_id = this.shiftsTime.find(
        (option) => option.id === this.shifts_id
      );
      return shifts_id ? shifts_id.shift_name : "";
    },
    paginatedShift() {
      if (!this.getShiftAssignData) return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getShiftAssignData.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.totalRecords / this.itemsPerPage);
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    resetFilters() {
      this.site_id = "";
      this.site_shift_id = "";
      this.job_id = "";
      this.filterData();
    },
    async confirmed(vacancyId) {
      if (!vacancyId) {
        Swal.fire({
          icon: "error",
          title: "Invalid Action",
          text: "No vacancy ID provided.",
        });
        return;
      }

      try {
        const confirmation = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this vacancy?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });

        if (!confirmation.isConfirmed) {
          return;
        }

        const response = await axios.put(
          `${VITE_API_URL}/delete_vacancy/${vacancyId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Vacancy deleted successfully.",
          });

          this.fetchData();
        } else {
          console.error("Unexpected response:", response);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unexpected error occurred.",
          });
        }
      } catch (error) {
        // Handle errors
        // console.error("Error deleting vacancy:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not delete the vacancy. Please try again later.",
        });
      }
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchData();
    },

    async fetchData() {
      const token = localStorage.getItem("token");

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      let startOfRange, endOfRange;

      if (this.currentView === "weekly") {
        const startOfWeek = new Date(this.startDate);
        const dayOfWeek = this.startDate.getDay();

        const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        startOfWeek.setDate(this.startDate.getDate() + diff);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        startOfRange = startOfWeek;
        endOfRange = endOfWeek;
      } else {
        const startOfMonth = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );

        startOfRange = startOfMonth;
        endOfRange = endOfMonth;
      }

      const requestData = {
        date: formatDate(startOfRange),
        filter_type: this.currentView === "weekly" ? "week" : "month",
        status: "opened",
      };
      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/shift_filter`,
          {
            params: requestData,
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getShiftAssignData = response.data.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    formatDates(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    },
    async onSiteChange() {
      this.filterData();
      const selectSite = this.site_id;
      await this.getTimeShift(selectSite);
    },
    async filterData() {
      const token = localStorage.getItem("token");

      const params = {
        date: this.formatDates(this.startDate),
        // "shift[site_id]": this.site_id,
        filter_type: this.currentView === "weekly" ? "week" : "month",
        status: "opened",
        "shift[client_id]": localStorage.getItem("c_unique"),
        // "shift[job_id]": this.job_id,
        page: 1,
      };

      if (this.job_id) {
        params["shift[job_id]"] = this.job_id;
      }

      if (this.site_id) {
        params["shift[site_id]"] = this.site_id;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/client_dashboard/shift_filter`,
          {
            params,
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.getShiftAssignData = response.data.data;
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },
    async getTimeShift(selectionSite) {
      if (!selectionSite) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${selectionSite}`
        );

        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: shift.start_time,
            end_time: shift.end_time,
            site_shift_id: shift.id,
          })) || [];
        // console.log(this.shiftsTime);
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    exportOneFile(exportType) {
      const token = localStorage.getItem("token");
      const queryParams = {
        date: this.formatDates(this.startDate),
        "shift[site_id]": this.site_id,
        filter_type: this.currentView === "weekly" ? "week" : "month",
        status: "opened",
        "shift[client_id]": localStorage.getItem("c_unique"),
        "shift[job_id]": this.job_id,
        format: "csv",
      };

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
        .get(`${VITE_API_URL}/client_dashboard/shift_filter`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
            Authorization: "bearer " + token,
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "ClientShift.csv";
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
  },
  mounted() {
    this.fetchData();
    // this.currentWeekClientShift();
    // this.getClientFetchSiteMethod();
    // this.getSiteNameMethod();
  },
};
</script>

<style>
select.form-select {
  background: #f9944b14;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  height: 50px;
  padding: 6px 12px;
}

.custom-select-wrapper {
  position: relative;
}

.custom-select-wrapper .form-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 30px;
}

.custom-select-wrapper::after {
  content: "▼";
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: rgb(153, 153, 153);
}
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
