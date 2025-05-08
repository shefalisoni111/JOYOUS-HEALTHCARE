<template>
  <div>
    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid">
        <div class="row px-5 pt-5 pb-5">
          <div class="d-flex justify-content-between px-2">
            <div class="">
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item active">
                  <a
                    class="nav-link d-inline fs-4 fw-bolder"
                    style="color: #000000"
                    >All Clients</a
                  >
                  <p>
                    <router-link
                      class="nav-link d-inline fw-bolder"
                      style="color: #000000"
                      aria-current="page"
                      to="/ClientsLists"
                      >Client</router-link
                    >
                    / Site / Rated and rules
                  </p>
                </li>
              </ol>
            </div>
            <div class="d-flex align-items-center">
              <button
                v-if="activeTab === 0"
                type="button"
                class="btn btn-lg text-nowrap"
                style="background: #f9944b; color: #fff"
                data-bs-toggle="modal"
                data-bs-target="#addClients"
                data-bs-whatever="@mdo"
                @click="handleAddClient"
              >
                + Add Client
              </button>
            </div>
          </div>
          <div class="p-0 bg-define"></div>

          <div class="">
            <div class="row">
              <div class="col-12">
                <div class="">
                  <div>
                    <div class="mb-2 d-flex justify-content-between">
                      <ul
                        class="nav nav-pills mb-3 d-flex justify-content-between ps-0 py-0"
                        id="pills-tab"
                        role="tablist"
                      >
                        <div class="d-flex">
                          <li
                            class="nav-item d-flex align-items-center gap-2"
                            role="presentation"
                          >
                            <button
                              a
                              class="nav-link"
                              :class="{ active: activeTab === index }"
                              aria-selected="true"
                              type="button"
                              role="tab"
                              data-bs-toggle="pill"
                              v-for="(tab, index) in tabs"
                              :key="index"
                              @click="selectTab(index)"
                            >
                              {{ tab.name }}
                            </button>
                          </li>
                        </div>
                      </ul>
                      <div
                        class="d-flex gap-2 mb-3 justify-content-between"
                        v-if="showFilters"
                      >
                        <div
                          class="d-flex gap-2 flex-column position-absolute"
                          style="
                            transform: translate(150%, 21%);
                            background: rgb(255, 255, 255);
                            padding: 8px 13px 9px 13px;
                            border-radius: 10px;
                            box-shadow: 0px 4px 40px 0px #0000000d;
                            z-index: 1;
                          "
                        >
                          <div></div>

                          <select
                            v-model="selectedClientExport"
                            @change="filterData"
                          >
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

                          <select
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
                          <div>
                            <button
                              :disabled="
                                !selectedClientExport &&
                                !selectedClient &&
                                !selectedJobTitle &&
                                !localSearchQuery
                              "
                              @click="resetFilters"
                              class="btn-sm bg-dark text-white px-4 py-1"
                              style="border-radius: 4px"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-end align-items-center"
                      >
                        <div
                          class="d-flex align-items-center gap-2 justify-content-between"
                        >
                          <div class="searchbox position-relative">
                            <div class="mt-2 d-flex justify-content-between">
                              <button
                                type="button"
                                class="btn btn-danger text-nowrap btn-lg"
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

                                <ul
                                  class="dropdown-menu"
                                  aria-labelledby="navbarDropdown"
                                >
                                  <li>
                                    <label
                                      for="fileAll"
                                      class="custom-file-label dropdown-item"
                                      style="
                                        border-radius: 0px;
                                        cursor: pointer;
                                      "
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
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      @click="exportOneFile('all')"
                                      >Export All</a
                                    >
                                  </li>
                                </ul>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-if="!searchQuery">
                      <component
                        :is="activeComponent"
                        :errorMessageFilter="errorMessageFilter"
                        :clientData="clientData"
                        :options="options"
                      ></component>
                    </div>

                    <div v-if="searchQuery">
                      <table class="table clientTable">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">#RefCode</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Jobs</th>
                            <th scope="col">Address</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Portal Access</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="paginateSearchResults?.length > 0">
                          <tr
                            v-for="client in paginateSearchResults"
                            :key="client.id"
                          >
                            <td v-text="client.id"></td>
                            <td v-text="client.ref_code"></td>
                            <td>
                              <router-link
                                class="text-capitalize"
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
                                v-for="(job, index) in client.jobs"
                                :key="job.job_id"
                                :style="{ backgroundColor: getColor(index) }"
                                class="p-1 me-2 pb-1 mt-5 rounded-1"
                              >
                                {{ job.job_name }}

                                <template
                                  v-if="index !== client.jobs.length - 1"
                                >
                                </template>
                              </span>
                            </td>
                            <td v-text="client.address"></td>

                            <td v-text="client.phone_number"></td>

                            <td v-text="client.email"></td>

                            <td>
                              <label
                                class="switch"
                                v-if="client.activated == true"
                              >
                                <input type="checkbox" id="togBtn" checked />
                                <div class="slider round"></div>
                              </label>
                              <label class="switch" v-else>
                                <input type="checkbox" id="togBtn" />
                                <div class="slider round"></div>
                              </label>
                            </td>
                            <td v-text="client.portal_access"></td>
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
                        <tbody v-else>
                          <tr>
                            <td colspan="10" class="text-danger text-center">
                              {{
                                " No candidates found for the specified criteria"
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="totalCount > 0">
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ getClientDetail.length }} Records Per Page
      </button>
      <div class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
        <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
        <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
        <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
      </div> -->
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
    <!-- <AddClients ref="addClient" @client-updated="createdClient" /> -->
    <EditClientModal
      :clientID="selectedClientID || 0"
      @client-updated="createdClient"
      :options="options"
    />
  </div>
</template>
<script>
import axios from "axios";
import AllClient from "../ClientsPages/AllClient.vue";
import AddClients from "@/components/modals/Clients/AddClients.vue";
import InActiveClient from "../ClientsPages/InActiveClient.vue";
import ActiveClient from "./ActiveClient.vue";
import EditClientModal from "../modals/Clients/EditClientModal.vue";
import Navbar from "../Navbar.vue";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      clientData: [],
      options: [],
      debounceTimeout: null,
      searchResults: [],
      errorMessageFilter: "",
      selectedFilter: "",
      selectedClientExport: "",
      selectedClient: "",
      selectedJobTitle: "",
      showFilters: false,
      selectedFilter: "true",
      errorMessage: "",
      localSearchQuery: this.searchQuery,
      tabs: [
        { name: "All Clients", component: "AllClient", routeName: "AllClient" },

        {
          name: "Active ",
          component: "ActiveClient",
          routeName: "ActiveClient",
        },
        {
          name: "InActive ",
          component: "InActiveClient",
          routeName: "InActiveClient",
        },
      ],
      activeTab: 0,
      activeTabName: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      errorMessageFilter: false,
      selectedClientStatus: "",
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

  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    paginateSearchResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
      // return this.getClientDetail;
    },
    selectJobTitle() {
      const job = this.options.find((option) => option.id === this.job_id);
      return job ? job.name : "";
    },
    totalRecordsOnPage() {
      return this.paginateSearchResults.length;
    },
  },
  components: {
    AllClient,
    InActiveClient,
    ActiveClient,
    EditClientModal,
    AddClients,
    Navbar,
  },

  methods: {
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
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    // filterData(value) {
    //   let client_type = "activated";
    //   let client_value;

    //   if (value === "all") {
    //     client_value = null;
    //   } else {
    //     client_value = value === "true" ? "true" : "false";
    //   }

    //   this.makeFilterAPICall(client_type, client_value);
    // },
    // async makeFilterAPICall(client_type, client_value) {
    //   try {
    //     const params = { client_type };
    //     if (client_value !== null) {
    //       params.client_value = client_value;
    //     }

    //     const response = await axios.get(`${VITE_API_URL}/client_filter`, { params });

    //     this.getClientDetail = response.data.data;
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       const errorMessages = error.response.data.error;
    //       if (errorMessages === "No records found for the given filter") {
    //         // alert("No records found for the given filter");
    //         errorMessages === "No records found for the given filter";
    //       } else {
    //         alert(errorMessages);
    //       }
    //     } else {
    //       // Handle other errors
    //     }
    //   }
    // },
    handleAddClient() {
      // this.$refs.addClient.getPositionMethod();
      // this.$refs.addClient.createdClient();
    },
    editClient(clientID) {
      this.selectedClientID = clientID;
      // this.$refs.editClientModalList.getJobTitleMethod();
    },
    getColor(index) {
      return this.colors[index % this.colors.length];
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
    // exportAll() {
    //   const params = {};
    //   if (this.selectedFilter !== "all") {
    //     params.filter_type = this.selectedFilter;
    //   }

    //   axios
    //     .get(`${VITE_API_URL}/export_all_csv.csv`, { params })
    //     .then((response) => {
    //       this.downloadCSV(response.data, "filename.csv");
    //     })
    //     .catch((error) => {
    //       // console.error("Error:", error);
    //     });
    // },
    // downloadCSV(csvData, filename) {
    //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = filename;
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 300);
    },
    //search api start
    async search() {
      await this.filterData();
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
        if (this.getClientDetail?.length === 0) {
          this.errorMessageFilter = "Data Not Found!";
        }
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.filterData();
    },
    // async search() {
    //   try {
    //     this.searchResults = [];
    //     const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
    //     let apiUrl = "";

    //     if (this.activeTab === 0) {
    //       apiUrl = `${VITE_API_URL}/search_api`;
    //     } else if (this.activeTab === 1) {
    //       apiUrl = `${VITE_API_URL}/active_search_api`;
    //     } else if (this.activeTab === 2) {
    //       apiUrl = `${VITE_API_URL}/inactive_search_api`;
    //     } else {
    //       return;
    //     }

    //     const response = await axiosInstance.get(apiUrl, {
    //       params: {
    //         query: modifiedSearchQuery,
    //       },
    //     });

    //     this.searchResults = response.data.data;
    //     // if (this.searchResults.length > 0) {
    //     //   this.errorMessage = "No candidates found for the specified criteria";
    //     // }
    //   } catch (error) {
    //     if (
    //       (error.response && error.response.status === 404) ||
    //       error.response.status === 400
    //     ) {
    //       this.errorMessage = "No candidates found for the specified criteria";
    //     }
    //   }
    // },

    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },
    resetFilters() {
      this.selectedClientExport = null;
      this.selectedClient = null;
      this.selectedJobTitle = null;
      this.localSearchQuery = "";

      this.filterData();
    },
    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },
    async createdClient() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`, {
          params: {
            page: this.currentPage,
          },
        });
        this.getClientDetail = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPages = response.data.total_pages;
        this.totalCount = response.data.clients_count;
      } catch (error) {
        // console.error('Error fetching client data:', error);
      }
    },
  },
  async mounted() {
    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
    this.createdClient();
    this.getClientMethod();
    this.getPositionMethod();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex(
        (tab) => tab.routeName === to.name
      );

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex(
      (tab) => tab.routeName === to.name
    );

    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }

    next();
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
  background-color: #f9f9f9;
}
.btn-primary {
  border: none;
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
ul.nav-pills .nav-item {
  background: #ffffff;
  padding: 5px 10px 5px 10px;
  border-radius: 50px;
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

.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #000000;
  width: 100;
  height: 37;
  color: #fff;
  border-radius: 13px;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
}

.nav-link,
.nav-link:hover,
.nav-link:focus {
  color: #667085;
}
.nav-pills {
  background: #f8f8ff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
}
table th {
  background-color: #ffffff;
  color: #667085;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

input.form-control,
input.form-control:focus {
  width: 100%;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
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
</style>
