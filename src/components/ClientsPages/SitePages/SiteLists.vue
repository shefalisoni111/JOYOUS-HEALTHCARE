<template>
  <div>
    <div id="main" class="main d-flex">
      <div class=""><Navbar /></div>
      <div class="container-fluid ps-5 pt-5 pb-5">
        <div class="row">
          <div class="d-flex justify-content-between px-2">
            <div class="py-2">
              <!-- <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item active text-uppercase fs-6">
                  <router-link class="nav-link d-inline" aria-current="page" to="/home"
                    >Dashboard</router-link
                  >
                  /
                  <span class="color-fonts">{{ activeTabName }} Site </span>
                </li>
              </ol> -->
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item active">
                  <a
                    class="nav-link d-inline fs-4 fw-bolder"
                    style="color: #000000"
                    >All Clients</a
                  >
                  <p>
                    Client /
                    <router-link
                      class="nav-link d-inline fw-bolder"
                      style="color: #000000"
                      aria-current="page"
                      to="/SiteLists"
                      >Site</router-link
                    >
                    / Rated and rules
                  </p>
                </li>
              </ol>
            </div>
            <div>
              <button
                v-if="activeTab === 0"
                type="button"
                class="btn btn-lg text-nowrap"
                style="background: #f9944b; color: #fff"
                data-bs-toggle="modal"
                data-bs-target="#addSite"
                data-bs-whatever="@mdo"
                @click="handleSiteAdded"
              >
                + Add Site
              </button>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <ul
              class="nav nav-pills mb-3 d-flex justify-content-between"
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
            <div class="d-flex gap-2">
              <div class="mt-2">
                <button
                  type="button"
                  class="btn btn-lg btn-danger text-nowrap"
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
                  </div>
                </button>
              </div>

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
                  "
                >
                  <div></div>

                  <select v-model="selectedFilter" @change="filterData">
                    <option value="" disabled>Status</option>
                    <option value="true">Active</option>
                    <option value="false">In-Active</option>
                  </select>

                  <select
                    id="selectClients"
                    v-model="selectedClientName"
                    @change="filterData"
                  >
                    <option value="" disabled>Client Name</option>
                    <option
                      v-for="option in clientData"
                      :key="option.id"
                      :value="option.id"
                      aria-placeholder="Select Client"
                    >
                      {{ option.client_name }}
                    </option>
                  </select>

                  <select
                    id="selectSite"
                    v-model="selectedSiteName"
                    @change="filterData"
                  >
                    <option value="" disabled>Site Name</option>
                    <option
                      v-for="option in businessUnit"
                      :key="option.id"
                      :value="option.site_name"
                      aria-placeholder="Select Site"
                    >
                      {{ option.site_name }}
                    </option>
                  </select>

                  <select
                    id="selectSitesAddress"
                    v-model="selectedSiteAddress"
                    @change="filterData"
                  >
                    <option value="" disabled>Site Address</option>
                    <option
                      v-for="option in businessUnit"
                      :key="option.id"
                      :value="option.address"
                      aria-placeholder="Select Address"
                    >
                      {{ option.address }}
                    </option>
                  </select>
                  <div class="searchbox position-relative">
                    <input
                      class="form-control"
                      type="search"
                      placeholder="Search Site..."
                      aria-label="Search"
                      v-model="localSearchQuery"
                      @input="filterData"
                    />
                  </div>
                  <div>
                    <button
                      @click="resetFilter"
                      class="btn btn-secondary"
                      :disabled="
                        !selectedFilter &&
                        !selectedClientName &&
                        !selectedSiteName &&
                        !selectedSiteAddress &&
                        !localSearchQuery
                      "
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
                <!-- <div>
                        <button
                          @click="resetFilter"
                          class="btn btn-secondary"
                          :disabled="
                            !selectedFilter &&
                            !selectedClientName &&
                            !selectedSiteName &&
                            !selectedSiteAddress &&
                            !localSearchQuery
                          "
                        >
                          Reset Filters
                        </button>
                      </div> -->
              </div>
              <div
                class="d-flex align-items-center gap-2 justify-content-between"
              >
                <div class="searchbox position-relative"></div>
              </div>
            </div>
          </div>

          <div v-if="!searchQuery">
            <component :is="activeComponent"></component>
          </div>
          <div v-if="searchQuery">
            <table class="table siteTable">
              <thead>
                <tr>
                  <!-- <th></th> -->
                  <th scope="col">ID</th>
                  <th scope="col">#RefCode</th>
                  <th scope="col">Site</th>
                  <th scope="col">ClientName</th>
                  <!-- <th scope="col">Jobs</th> -->
                  <th scope="col">Address</th>
                  <th scope="col">PhoneNumber</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Portal Access</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody v-if="paginateSearchResults?.length > 0">
                <tr v-for="data in paginateSearchResults" :key="data.id">
                  <!-- <td>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="data.id"
                            :id="data.id"
                            v-model="checkedSites[data.id]"
                            @change="handleCheckboxChange(data.id)"
                          />
                        </td> -->
                  <td>{{ data.id }}</td>
                  <td v-text="data.refer_code"></td>
                  <td v-text="data.site_name"></td>
                  <td>
                    <router-link
                      class="text-capitalize text-decoration-underline text-black"
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
                  <td>{{ data.status }}</td>
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
                      :to="{
                        name: 'SingleSiteprofile',
                        params: { id: data.id },
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
                    {{ " No Site found for the specified criteria" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="mx-3"
        style="text-align: right"
        v-if="searchResults.length >= 9"
      >
        <button class="btn btn-outline-dark btn-sm">
          {{ totalRecordsOnPage }} Records Per Page
        </button>
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
      <AddSiteNotes />
      <!-- <AddSite @site="handleSiteAdded" ref="addSite" /> -->
      <EditSite
        :siteId="selectedsiteId || 0"
        @editSite="getSiteAllDataMethod"
        ref="refSite"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AllSite from "../SitePages/AllSite.vue";
import InActiveSite from "../SitePages/InActiveSite.vue";
import ActiveSite from "../SitePages/ActiveSite.vue";
import AddSite from "../../modals/Site/AddSite.vue";
import EditSite from "../../modals/Site/EditSite.vue";
import AddSiteNotes from "../../modals/Site/AddSiteNotes.vue";
import Navbar from "../../Navbar.vue";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      getClientDetail: [],
      selectedsiteId: 0,
      isActive: true,
      searchQuery: null,
      debounceTimeout: null,
      localSearchQuery: this.searchQuery,
      showFilters: false,
      searchResults: [],
      selectedFilter: "",
      selectedFilter: "",
      selectedClientName: "",
      selectedSiteName: "",
      selectedSiteAddress: "",
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      errorMessage: "",
      tabs: [
        { name: "All Site", component: "AllSite", routeName: "AllSite" },

        { name: "Active ", component: "ActiveSite", routeName: "ActiveSite" },
        {
          name: "InActive ",
          component: "InActiveSite",
          routeName: "InActiveSite",
        },
      ],
      activeTab: 0,
      activeTabName: "",
      currentPage: 1,
      itemsPerPage: 9,
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
    },
    totalRecordsOnPage() {
      return this.paginateSearchResults.length;
    },
  },

  components: {
    AllSite,
    InActiveSite,
    ActiveSite,
    AddSiteNotes,
    AddSite,
    EditSite,
    Navbar,
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
      this.filterData();
    },
    handleSiteAdded() {
      // this.$refs.addSite.();
      // console.log(this.$refs, addSite);
    },
    editsiteId(siteId) {
      this.selectedsiteId = siteId;

      this.$refs.refSite.getClientMethod();
    },
    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },

    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },

    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start
    // async search() {
    //   try {
    //     this.searchResults = [];
    //     const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
    //     let apiUrl = "";

    //     if (this.activeTab === 0) {
    //       apiUrl = `${VITE_API_URL}/search_api_site`;
    //     } else if (this.activeTab === 1) {
    //       apiUrl = `${VITE_API_URL}/active_search_api_site`;
    //     } else if (this.activeTab === 2) {
    //       apiUrl = `${VITE_API_URL}/inactive_search_api_site`;
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
    async getSiteAllDataMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async filterData() {
      const params = {
        page: 1,
      };

      if (this.selectedFilter) {
        params["site[status]"] = this.selectedFilter;
      }

      if (this.selectedClientName) {
        params["site[client_id]"] = this.selectedClientName;
      }

      if (this.selectedSiteName) {
        params["site[site_name]"] = this.selectedSiteName;
      }

      if (this.selectedSiteAddress) {
        params["site[address]"] = this.selectedSiteAddress;
      }

      if (this.localSearchQuery) {
        params.search = this.localSearchQuery;
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params,
        });
        this.getSiteAllData = response.data.data || [];
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
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
        Swal.fire({
          icon: "warning",
          title: "No File Selected",
          text: "Please select a CSV file.",
          confirmButtonText: "OK",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${VITE_API_URL}/import_all_csv_site`, formData, {
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
  },
  async mounted() {
    await this.setActiveTabFromRoute();
    await this.setActiveTabNameOnLoad();
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
  background-color: #fdce5e17;
}
.btn-primary {
  border: none;
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
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
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

table {
  background-color: transparent !important;
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
  background: #fff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
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
