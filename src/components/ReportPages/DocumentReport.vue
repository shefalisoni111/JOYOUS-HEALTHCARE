<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div class="gap-2 d-xs-grid d-sm-grid d-md-grid d-lg-flex ms-2">
                <select>
                  <option value="">All</option>
                </select>
                <select v-model="selectedStaffStatus" @change="filterData">
                  <option value="">All Staff Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                <select v-model="selectedStaff" @change="filterData">
                  <option value="">All Staff</option>
                  <option
                    v-for="option in getCandidatesData"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.first_name }}
                  </option>
                </select>

                <select v-model="selectedDocumentCategory" @change="filterData">
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
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link active"
                            id="pills-all-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-all"
                            type="button"
                            role="tab"
                            aria-controls="pills-all"
                            aria-selected="true"
                          >
                            All
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-active-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-active"
                            type="button"
                            role="tab"
                            aria-controls="pills-active"
                            aria-selected="false"
                          >
                            Active
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-dueDate-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-dueDate"
                            type="button"
                            role="tab"
                            aria-controls="pills-dueDate"
                            aria-selected="false"
                          >
                            Due(30 days)
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="pills-expired-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-expired"
                            type="button"
                            role="tab"
                            aria-controls="pills-expired"
                            aria-selected="false"
                          >
                            Expired
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div class="d-flex align-items-center">
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-eye"></i> Customize View
                      </button>
                    </div>
                  </div>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active table-wrapper"
                    id="pills-all"
                    role="tabpanel"
                    aria-labelledby="pills-all-tab"
                  >
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
                          <th scope="col">Status</th>
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
                          <td scope="col">{{ "null" }}</td>
                          <td scope="col">
                            {{ data.issue_date ? data.issue_date : "null" }}
                          </td>
                          <td scope="col">
                            {{ data.expiry_date ? data.expiry_date : "null" }}
                          </td>
                          <td scope="col">{{ data.document_category.status }}</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="8" class="text-danger text-center">
                            {{ "Staff document not found! " }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-active"
                    role="tabpanel"
                    aria-labelledby="pills-active-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-dueDate"
                    role="tabpanel"
                    aria-labelledby="pills-dueDate-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-expired"
                    role="tabpanel"
                    aria-labelledby="pills-expired-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="getDocumentReportData?.length >= 8">
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
        :disabled="currentPage * itemsPerPage >= getDocumentReportData?.length"
        @click="currentPage++"
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
      getDocumentReportData: [],
      documentNames: [],
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 11,
      getCategoryData: [],
      selectedStaffStatus: "",
      selectedStaff: "",
      selectedDocumentCategory: "",
      selectedDocumentType: "",
      selectedDocumentStatus: "",
      selectedDocumentFilterType: "",
      selectedDocumentFilter: "",
    };
  },
  components: { Navbar, Loader },
  computed: {
    selectedOptionText() {
      const id = this.options.find((option) => option.id === this.id);
      return id ? id.name : "";
    },
    paginateDocumentReport() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return Array.isArray(this.getDocumentReportData)
        ? this.getDocumentReportData.slice(startIndex, endIndex)
        : [];
    },
    totalRecordsOnPage() {
      return this.paginateDocumentReport.length;
    },
    getWeekDates() {
      const currentDate = new Date();
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },

    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },
  },
  methods: {
    async filterData() {
      let filters = {};

      if (this.selectedStaffStatus) {
        filters.document_filter_type = "staff_status";
        filters.document_filter = this.selectedStaffStatus;
      } else if (this.selectedStaff) {
        filters.document_filter_type = "staff";
        filters.document_filter = this.selectedStaff;
      } else if (this.selectedDocumentCategory) {
        filters.document_filter_type = "document_category";
        filters.document_filter = this.selectedDocumentCategory;
      } else if (this.selectedDocumentType) {
        filters.document_filter_type = "document_type";
        filters.document_filter = this.selectedDocumentType;
      } else if (this.selectedDocumentStatus) {
        filters.document_filter_type = "document_status";
        filters.document_filter = this.selectedDocumentStatus;
      } else if (this.selectedDocumentFilterType) {
        filters.document_filter_type = this.selectedDocumentFilterType;
        filters.document_filter = this.selectedDocumentFilter;
      } else {
        filters.document_filter_type = "";
        filters.document_filter = "";
      }

      await this.makeFilterAPICall(filters.document_filter_type, filters.document_filter);
    },
    async documentCategoryDocumentTypeMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/document_categories`);
        this.getCategoryData = response.data;

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
    async makeFilterAPICall(document_filter_type, document_filter) {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidate_documents`, {
          params: {
            document_filter_type: document_filter_type,
            document_filter: document_filter,
          },
        });

        this.getDocumentReportData = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            alert("No records found for the given filter");
          } else {
            alert(errorMessages);
          }
        } else {
          console.error(error);
        }
      }
    },
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() + diff);
        this.startDate = startOfWeek;

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        this.endDate = endOfWeek;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.createVacancy();
    //     });
    //   // alert("Record Deleted ");
    // },
    async getDocumentReport() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidate_documents`);
        this.getDocumentReportData = response.data;
      } catch (error) {
        // console.error("Error fetching document report data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getCandidateMethods() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

  mounted() {
    // this.getDocumentReport();
    this.updateDateRange();
    this.getCandidateMethods();
    this.documentCategoryDocumentTypeMethod();
    // this.loadDateRangeFromLocalStorage();
    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
    // const currentDate = new Date();
    // const dayOfWeek = currentDate.getDay();
    // const startOfWeek = new Date(currentDate);

    // const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    // startOfWeek.setDate(startOfWeek.getDate() + diff);

    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(endOfWeek.getDate() + 6);
    // this.endDate = endOfWeek;
  },
  created() {
    this.getDocumentReport();
    this.loadDateRangeFromLocalStorage();
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
