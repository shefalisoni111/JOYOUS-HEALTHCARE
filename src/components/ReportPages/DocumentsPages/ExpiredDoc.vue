<template>
  <div>
    <div id="main">
      <div class="container-fluid">
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
          <tbody v-if="paginateDocumentReport?.length > 0">
            <tr v-for="data in paginateDocumentReport" :key="data.id">
              <td scope="col">{{ data.id }}</td>
              <td scope="col">{{ data.candidate_name }}</td>

              <td scope="col">
                {{ data.document_category.document_category }}
              </td>
              <td scope="col">{{ data.document_name }}</td>
              <td scope="col">{{ new Date(data.updated_at).toLocaleString() }}</td>
              <td scope="col">
                {{ data.issue_date ? data.issue_date : "null" }}
              </td>
              <td scope="col">
                {{ data.expiry_date ? data.expiry_date : "null" }}
              </td>
              <!-- <td scope="col">{{ data.document_category.status }}</td> -->
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-if="errorMessageFilter">
              <td colspan="7" class="text-danger text-center">
                {{ errorMessageFilter }}
              </td>
            </tr>
            <tr v-else>
              <td colspan="7" class="text-danger text-center">
                {{ errorMessageCustom }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mx-3" style="text-align: right" v-if="getCategoryData.length >= 10">
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
            :disabled="currentPage * itemsPerPage >= getCategoryData?.length"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";

import Loader from "../../Loader/Loader.vue";

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
      isLoading: false,
      startDate: new Date(),
      endDate: new Date(),
      getCandidatesData: [],
      candidateLists: [],
      getDocumentReportData: [],
      documentNames: [],
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      getCategoryData: [],

      errorMessageCustom: "",
      errorMessageFilter: "",
      selectedStaffStatus: "",
      selectedAllStatus: "",
      selectedStaff: "",
      selectedDocumentCategory: "",
      selectedDocumentType: "",
      selectedDocumentStatus: "",
      selectedDocumentFilterType: "",
      selectedDocumentFilter: "",
    };
  },
  components: { Loader },
  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    selectedOptionText() {
      const id = this.options.find((option) => option.id === this.id);
      return id ? id.name : "";
    },
    paginateDocumentReport() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return Array.isArray(this.getCategoryData)
        ? this.getCategoryData.slice(startIndex, endIndex)
        : [];
    },
    totalRecordsOnPage() {
      return this.paginateDocumentReport.length;
    },
  },
  methods: {
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
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.documentCategoryDocumentTypeMethod();
    },
    async documentCategoryDocumentTypeMethod() {
      this.isLoading = true;
      try {
        const params = { document_status: "Expired", per_page: this.itemsPerPage };
        const response = await axios.get(`${VITE_API_URL}/candidate_documents`, {
          params,
        });

        this.getCategoryData = response.data;
        if (this.getCategoryData.length === 0) {
          this.errorMessageFilter = "Report not Found!";
        } else {
          this.errorMessageFilter = "";
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
      } finally {
        this.isLoading = false;
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
    // this.getCandidateMethods();
    this.documentCategoryDocumentTypeMethod();
  },
  created() {
    // this.getDocumentReport();
    // this.getCandidateMethods();
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
a[data-v-507f63b7] {
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
  border: 1px solid #0d6efd;
  border-radius: 22px;
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
