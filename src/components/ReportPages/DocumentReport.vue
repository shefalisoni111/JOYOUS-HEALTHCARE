<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div
                class="gap-2 d-xs-grid d-sm-grid d-md-grid d-lg-flex ms-2"
                v-if="activeTab === 0"
              >
                <select v-model="selectedStaffStatus" @change="filterData">
                  <option value="all">All Staff Status</option>
                  <option value="approved">Active</option>
                  <option value="rejected">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                <select v-model="selectedStaff" @change="filterData">
                  <option value="">All Staff</option>
                  <option
                    v-for="option in candidateLists"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.first_name + " " + option.last_name }}
                  </option>
                </select>

                <select v-model="selectedDocumentCategory" @change="handleCategoryChange">
                  <option value="">All Document Category</option>
                  <option
                    v-for="option in getCategoryData"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.category_name }}
                  </option>
                </select>

                <select v-model="selectedDocumentType" @change="filterData">
                  <option value="">All Document Type</option>
                  <option
                    v-for="option in documentNames"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.document_name }}
                  </option>
                </select>
              </div>
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <ul
                        class="nav nav-pills mt-2 gap-2 mb-2"
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
                    </div>

                    <div class="d-flex align-items-center">
                      <!-- <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button> -->
                    </div>
                  </div>
                </div>
                <div>
                  <component :is="activeComponent"></component>
                </div>
                <div v-if="activeTab === 0">
                  <table class="table reportTable">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Staff</th>

                        <th scope="col">Document Category</th>
                        <th scope="col">Document Type</th>
                        <th scope="col">Upload Date</th>
                        <th scope="col">Issue Date</th>
                        <th scope="col">Expiry Date</th>
                        <!-- <th scope="col">Status</th> -->
                      </tr>
                    </thead>
                    <tbody v-if="getDocumentReportData?.length > 0">
                      <tr v-for="data in getDocumentReportData" :key="data.id">
                        <td scope="col">{{ data.id }}</td>
                        <td scope="col">{{ data.candidate_name }}</td>
                        <!-- {{
                          console.log(data.document_category)
                        }} -->
                        <td scope="col">
                          {{
                            data.document_category
                              ? data.document_category.document_category
                              : "null"
                          }}
                        </td>
                        <td scope="col">{{ data.document_name }}</td>
                        <td scope="col">
                          {{ new Date(data.updated_at).toLocaleString() }}
                        </td>
                        <td scope="col">
                          {{ data.issue_date }}
                        </td>
                        <td scope="col">
                          {{ data.expiry_date }}
                        </td>
                        <!-- <td scope="col">
                          {{ data.document_category?.status }}
                        </td> -->
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr v-if="!isLoading">
                        <td colspan="7" class="text-danger text-center">
                          {{ "Data Not available for this month" }}
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="8" class="text-danger text-center">
                          {{ errorMessageCustom }}
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
    <div
      class="mx-3 mb-3"
      style="text-align: right"
      v-if="getDocumentReportData?.length >= 10 && activeTab === 0"
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
        @click="previousPage"
      >
        Previous
      </button>
      &nbsp;&nbsp;

      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;

      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage >= totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import Loader from "../Loader/Loader.vue";
import AllDoc from "./DocumentsPages/AllDoc.vue";
import ActiveDocument from "./DocumentsPages/ActiveDocument.vue";
import DueDoc from "./DocumentsPages/DueDoc.vue";
import ExpiredDoc from "./DocumentsPages/ExpiredDoc.vue";
import DueDoc60Days from "./DocumentsPages/DueDoc60Days.vue";

export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      startDate: new Date(),
      endDate: new Date(),
      getCandidatesData: [],
      candidateLists: [],
      getDocumentReportData: [],
      documentNames: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 10,
      getCategoryData: [],
      isLoading: false,
      tabs: [
        { name: "All ", component: "AllDoc", routeName: "AllDoc" },

        {
          name: "Active ",
          component: "ActiveDocument",
          routeName: "ActiveDocument",
        },
        { name: "Due30days Expired ", component: "DueDoc", routeName: "DueDoc" },
        { name: "Expired ", component: "ExpiredDoc", routeName: "ExpiredDoc" },
        {
          name: "Due60Days Expired  ",
          component: "DueDoc60Days",
          routeName: "DueDoc60Days",
        },
      ],
      activeTab: 0,
      activeTabName: "",
      selectedStaffStatus: "all",
      errorMessageCustom: "",
      errorMessageFilter: "",
      // selectedStaffStatus: "",
      selectedAllStatus: "",
      selectedStaff: "",
      selectedDocumentCategory: "",
      selectedDocumentType: "",
      selectedDocumentStatus: "",
      selectedDocumentFilterType: "",
      selectedDocumentFilter: "",
      localTabIndex: null,
    };
  },
  props: {
    tabIndex: {
      type: Number,
      default: null,
    },
  },
  components: {
    Loader,
    Navbar,
    AllDoc,
    ActiveDocument,
    DueDoc,
    ExpiredDoc,
    DueDoc60Days,
  },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    selectedOptionText() {
      const id = this.options.find((option) => option.id === this.id);
      return id ? id.name : "";
    },
  },
  watch: {
    "$route.query.tabIndex": {
      immediate: true,
      handler(newTabIndex) {
        if (newTabIndex) {
          this.localTabIndex = parseInt(newTabIndex, 10);
          this.handleTabChange(this.localTabIndex);
        }
      },
    },
    tabs: {
      immediate: true,
      handler(newTabs) {
        if (newTabs.length > 0) {
          this.setActiveTabNameOnLoad();
        }
      },
    },
    activeTab: {
      immediate: true,
      handler() {
        this.setActiveTabNameOnLoad();
      },
    },
    tabIndex(newTabIndex) {
      this.localTabIndex = newTabIndex;
    },
  },

  methods: {
    handleTabChange(newTabIndex) {
      this.activeTab = newTabIndex;
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
      if (this.localTabIndex !== null) {
        this.activeTab = this.localTabIndex;
        this.activeTabName = this.tabs[this.activeTab]?.name || "";
      }
    },
    async selectTab(index) {
      this.activeTab = index;
      this.$router.push({ name: "DocumentReport", query: { tabIndex: index } });
    },
    async filterData() {
      this.isLoading = true;
      const candidateApiUrl = `${VITE_API_URL}/candidates`;
      const apiUrl = `${VITE_API_URL}/candidate_documents`;

      let candidateParams = { page: this.currentPage, per_page: this.itemsPerPage };

      if (this.selectedStaffStatus === "all") {
        candidateParams = { page: this.currentPage, per_page: this.itemsPerPage };
      } else if (this.selectedStaffStatus === "approved") {
        candidateParams.activated_value = true;
        candidateParams.status_value = "approved";
      } else if (this.selectedStaffStatus === "rejected") {
        candidateParams.activated_value = false;
      } else if (this.selectedStaffStatus === "pending") {
        candidateParams.status_value = "pending";
        candidateParams.activated_value = true;
      }

      if (this.selectedStaff) {
        candidateParams["can_document[candidate_id]"] = this.selectedStaff;
      }

      try {
        const candidateResponse = await axios.get(candidateApiUrl, {
          params: candidateParams,
        });
        this.candidateLists = candidateResponse.data.data || [];
      } catch (error) {
        this.candidateLists = [];
      }

      let params = {
        "can_document[category_id]": this.selectedDocumentCategory || null,
        "can_document[candidate_id]": this.selectedStaff || null,
        //  "can_document[status]": this.selectedStaffStatus || null,
        "can_document[document_id]": this.selectedDocumentType || null,
        page: this.currentPage,
        per_page: this.itemsPerPage,
      };

      // Object.keys(params).forEach((key) => {
      //   if (!params[key]) {
      //     delete params[key];
      //   }
      // });
      if (this.selectedDocumentType) {
        delete params["can_document[category_id]"];
      }

      // if (this.selectedStaff) {
      //   delete params["can_document[status]"];
      // }

      try {
        const response = await axios.get(apiUrl, {
          params: {
            ...params,
            document_status: "all",
            // "can_document[category_id]": this.selectedDocumentCategory || null,
            // "can_document[candidate_id]": this.selectedStaff || null,
            // "can_document[status]": this.selectedStaffStatus || null,
            // "can_document[document_id]": this.selectedDocumentType || null,
            //  page: this.currentPage,
            //   per_page: this.itemsPerPage,
            // page: this.currentPage,
            // per_page: this.itemsPerPage,
          },
        });
        this.getDocumentReportData = response.data.data || [];
        this.totalRecords = response.data.can_document_filter || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
        this.getDocumentReportData = [];
      } finally {
        this.isLoading = false;
      }
    },

    async handleCategoryChange() {
      await this.getDocByFetchCategoriMethod();
      await this.filterData();
    },
    getStaffFullName(staffId) {
      const staff = this.candidateLists.find((candidate) => candidate.id === staffId);
      return staff ? `${staff.first_name} ${staff.last_name}` : "";
    },
    getCategoryIdByName(categoryName) {
      const category = this.getCategoryData.find(
        (item) => item.category_name === categoryName
      );
      return category ? category.id : null;
    },

    getDocumentIdByName(documentName) {
      const document = this.documentNames.find(
        (item) => item.document_name === documentName
      );
      return document ? document.id : null;
    },
    async documentCategoryDocumentTypeMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/document_categories`);
        this.getCategoryDatas = response.data;
        this.getDocumentReportDatas = response.data.data;
        // console.log(this.getDocumentReportData);

        if (this.getDocumentReportDatas.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "Report Not Found!";
        }

        this.documentNames = response.data.reduce((acc, category) => {
          if (category.documents && category.documents.length > 0) {
            acc.push(
              ...category.documents.map((doc) => {
                return { id: doc.id, document_name: doc.document_name };
              })
            );
          }
          return acc;
        }, []);
      } catch (error) {
        // console.error("Error fetching documents:", error);
      }
    },
    async getDocByFetchCategoriMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/document_categories`);
        this.getCategoryData = response.data;
        this.documentNames = response.data.document || [];
        if (this.selectedDocumentCategory) {
          try {
            const documentTypesResponse = await axios.get(
              `${VITE_API_URL}/document_categories/${this.selectedDocumentCategory}`
            );
            this.documentNames = documentTypesResponse.data.document || [];
          } catch (error) {
            this.documentNames = [];
          }
        }
      } catch (error) {
        // console.error("Error fetching documents:", error);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.filterData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.filterData();
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.filterData();
    },
    async getDocumentReport() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidate_documents`, {
          document_status: "all",
          page: this.currentPage,
          per_page: this.itemsPerPage,
        });
        this.getDocumentReportData = response.data.data;
        if (this.getDocumentReportData.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "";
        }
        if (this.getDocumentReportData.length === 0) {
          this.errorMessageCustom = "Data No available for this month";
        } else {
          this.errorMessageCustom = "";
        }
      } catch (error) {
        // console.error("Error fetching document report data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getCandidateMethods() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allStaffData = allStaffData.concat(response.data.data);
        });

        this.candidateLists = allStaffData;
        this.candidateStatus = response.data.data.status;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
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
  mounted() {
    // this.getDocumentReport();
    this.filterData();
    this.getCandidateMethods();
    this.documentCategoryDocumentTypeMethod();
    this.getDocByFetchCategoriMethod();

    // const redirectTo = this.$route.query.redirectTo;
    // if (redirectTo === "DueDoc") {
    //   this.$router.replace({ name: "DueDoc" });
    // } else if (redirectTo === "ExpiredDoc") {
    //   this.$router.replace({ name: "ExpiredDoc" });
    // }
  },
  created() {
    if (this.$route.query.tabIndex) {
      this.localTabIndex = parseInt(this.$route.query.tabIndex, 10);
    }
    this.filterData();

    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: #fdce5e17;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a {
  text-decoration: none;
}
.reportTable tr:nth-child(odd) td {
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
  border: 1px solid #ff5f30;
  border-radius: 22px;
  color: #ff5f30;
}

table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}

@media (max-width: 1120px) {
  .reportTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
