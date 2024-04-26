<template>
  <div>
    <div class="container-fluid p-0">
      <div id="main">
        <div class="d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                /
                <span class="color-fonts">{{ activeTabName }} Site </span>
              </li>
            </ol>
          </div>
        </div>
        <div class="container-fluid p-0 bg-define"></div>

        <div class="container-fluid pt-3">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
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
                    <div class="d-flex justify-content-end align-items-center">
                      <div
                        class="d-flex align-items-center gap-2 justify-content-between"
                      >
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
                          v-if="activeTab === 0"
                          type="button"
                          class="btn btn-outline-success text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#addSite"
                          data-bs-whatever="@mdo"
                        >
                          + Add Site
                        </button>
                        <!-- <button type="button" class="btn btn-outline-success text-nowrap">
                          <i class="bi bi-funnel"></i>
                          Show Filters
                        </button> -->
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
                              :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="searchResults.length >= 9">
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
        :disabled="currentPage * itemsPerPage >= searchResults.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <AddSiteNotes />
    <!-- <EditSite :siteId="selectedsiteId || 0" @editSite="getSiteAllDataMethod" /> -->
  </div>
</template>
<script>
import axios from "axios";
import AllSite from "../SitePages/AllSite.vue";
import InActiveSite from "../SitePages/InActiveSite.vue";
import ActiveSite from "../SitePages/ActiveSite.vue";
// import AddSite from "../../modals/Site/AddSite.vue";
// import EditSite from "../../modals/Site/EditSite.vue";
import AddSiteNotes from "../../modals/Site/AddSiteNotes.vue";

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

      searchResults: [],
      errorMessage: "",
      tabs: [
        { name: "All ", component: "AllSite", routeName: "AllSite" },

        { name: "Active ", component: "ActiveSite", routeName: "ActiveSite" },
        { name: "InActive ", component: "InActiveSite", routeName: "InActiveSite" },
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

  components: { AllSite, InActiveSite, ActiveSite, AddSiteNotes },

  methods: {
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
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
    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        let apiUrl = "";

        if (this.activeTab === 0) {
          apiUrl = `${VITE_API_URL}/search_api_site`;
        } else if (this.activeTab === 1) {
          apiUrl = `${VITE_API_URL}/active_search_api_site`;
        } else if (this.activeTab === 2) {
          apiUrl = `${VITE_API_URL}/inactive_search_api_site`;
        } else {
          return;
        }

        const response = await axiosInstance.get(apiUrl, {
          params: {
            query: modifiedSearchQuery,
          },
        });

        this.searchResults = response.data.data;
        // if (this.searchResults.length > 0) {
        //   this.errorMessage = "No candidates found for the specified criteria";
        // }
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          this.errorMessage = "No candidates found for the specified criteria";
        }
      }
    },
    async getSiteAllDataMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
    exportAll() {
      axios
        .get(`${VITE_API_URL}/export_all_csv_site.csv`)
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
    // triggerFileInput() {
    //   this.$refs.fileInput.click();
    // },
    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.importAll(file);
    //   }
    // },
    // importAll(fileData) {
    //   const formData = new FormData();
    //   formData.append("file", fileData);
    //   axios
    //     .post(`${VITE_API_URL}/import_all_csv_site.csv`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((response) => {
    //       this.ImportCSV(response.data, "filename.csv");
    //     })
    //     .catch((error) => {
    //       // console.error("Error:", error);
    //     });
    // },
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
          console.log(error);
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
        // Checkbox is checked, add the site ID to the array
        this.siteIds.push(dataId);
      } else {
        // Checkbox is unchecked, remove the site ID from the array
        const index = this.siteIds.indexOf(dataId);
        if (index !== -1) {
          this.siteIds.splice(index, 1);
        }
      }
      console.log("Updated siteIds array:", this.siteIds);
    },
    exportOneFile() {
      const queryParams = new URLSearchParams({
        site_ids: JSON.stringify(this.siteIds),
      }).toString();
      axios
        .get(`${VITE_API_URL}/selected_export_site?${queryParams}`)
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
    // ImportCSV(csvData, filename) {
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
  },
  mounted() {
    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex((tab) => tab.routeName === to.name);

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex((tab) => tab.routeName === to.name);

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
  height: 100vh;
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
.siteTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
table {
  background-color: transparent !important;
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
</style>
