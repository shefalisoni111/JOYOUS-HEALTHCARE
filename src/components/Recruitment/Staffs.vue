<template>
  <div>
    <div id="main" class="main">
      <div class="row">
        <div class="col-md-12 p-0">
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb mb-1">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    RECRUITMENT / <span class="clr">ACTIVE STAFFS</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
            </div>
          </div>
          <div class="col-12 bg-white"></div>
          <div class="row">
            <div class="col-12">
              <div class="p-2">
                <div class="d-flex justify-content-end gap-2">
                  <div class="form-inline my-2 my-lg-0">
                    <form
                      @submit.prevent="search"
                      class="form-inline my-2 my-lg-0"
                    >
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

                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-success text-nowrap text-nowrap"
                      data-bs-toggle="modal"
                      data-bs-target="#addCandidate"
                      data-bs-whatever="@mdo"
                      @click="handleCandidateAdded"
                    >
                      <i class="bi bi-person-plus-fill"></i>
                      New Staff
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-danger text-nowrap"
                      @click="deleteSelectedStaffs"
                      :disabled="selectedStaffIds.length === 0"
                    >
                      Delete Staff
                    </button>
                  </div>
                  <div v-if="!searchQuery">
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
                      Export

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
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
                            @click="exportOneFile"
                            >Export</a
                          >
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <a class="dropdown-item" href="#" @click="exportAll"
                            >Export All</a
                          >
                        </li>
                      </ul>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-12 table-wrapper" v-if="!searchQuery">
                <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col" class="widthSet">Name</th>
                      <th scope="col">Positions</th>
                      <th scope="col" class="widthSet">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Access</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="candidate in paginateCandidates"
                      :key="candidate.id"
                    >
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="candidate.id"
                          :id="candidate.id"
                          v-model="selectedStaffIds"
                        />
                      </td>
                      <td>
                        <router-link
                          class="text-capitalize fw-bold text-decoration-none text-black"
                          :to="{
                            name: 'Profile',
                            params: { id: candidate.id },
                          }"
                        >
                          {{ candidate.first_name }}&nbsp;
                          {{ candidate.last_name }}
                        </router-link>
                      </td>

                      <td
                        class="text-capitalize"
                        v-text="candidate.possition"
                      ></td>
                      <td>{{ candidate.email }}</td>
                      <td>
                        {{ candidate.phone_number }}
                      </td>
                      <td class="text-capitalize">Access</td>
                      <td class="text-capitalize">Created By</td>

                      <td>Created On</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12 table-wrapper" v-if="searchQuery">
                <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col" class="widthSet">Name</th>
                      <th scope="col">Positions</th>
                      <th scope="col" class="widthSet">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Access</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Created On</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResults?.length > 0">
                    <tr v-for="candidate in searchResults" :key="candidate.id">
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="candidate.id"
                          :id="candidate.id"
                          v-model="selectedStaffIds"
                          @change="handleSelectionChange(candidate.id)"
                        />
                      </td>
                      <td>
                        <router-link
                          class="text-capitalize fw-bold text-decoration-none text-black-50"
                          :to="{
                            name: 'Profile',
                            params: { id: candidate.id },
                          }"
                        >
                          {{ candidate.first_name }}&nbsp;
                          {{ candidate.last_name }}
                        </router-link>
                      </td>

                      <td
                        class="text-capitalize"
                        v-text="candidate.possition"
                      ></td>
                      <td>{{ candidate.email }}</td>
                      <td>
                        {{ candidate.phone_number }}
                      </td>
                      <td class="text-capitalize">Access</td>
                      <td class="text-capitalize">Created By</td>

                      <td>Created On</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="8" class="text-danger text-center">
                        {{ errorMessage }}
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
    <div
      class="mx-3"
      style="text-align: right"
      v-if="totalCount > 0 && searchResults && !errorMessage"
    >
      <!-- <button class="btn btn-outline-dark btn-sm">
          {{ getCandidatesData.length }} Records Per Page
        </button> -->
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
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../Alerts/SuccessAlert.vue";

import Loader from "../Loader/Loader.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  name: "Staffs",
  data() {
    return {
      getCandidatesData: [],
      selectedStaffIds: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      totalCount: 0,
      isLoading: false,
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
    };
  },
  components: {
    Loader,
    SuccessAlert,
  },
  computed: {
    paginateCandidates() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.getCandidatesData.slice(start, end);
    },
  },
  methods: {
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

        const response = await axiosInstance.get(
          `${VITE_API_URL}/search_candidate`,
          {
            params: {
              candidate_query: this.searchQuery,
            },
          }
        );

        if (
          response.status === 200 &&
          response.data.candidate.length === 0 &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorMessage = "No Staff found for the specified criteria";
        } else {
          this.searchResults = response.data.candidate;
          this.errorMessage = "";
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    handleSelectionChange(id) {
      const index = this.selectedStaffIds.indexOf(id);
      if (index === -1) {
        this.selectedStaffIds.push(id);
      } else {
        this.selectedStaffIds.splice(index, 1);
      }
      // console.log("Selected IDs:", JSON.stringify(this.selectedStaffIds));
    },
    async deleteSelectedStaffs() {
      if (this.selectedStaffIds.length === 0) return;
      this.isLoading = true;
      try {
        const deleteRequests = this.selectedStaffIds.map((id) =>
          axiosInstance.delete(`${VITE_API_URL}/candidates/${id}`)
        );
        await Promise.all(deleteRequests);
        this.getActiveStaffMethod();
        const message = "Successful Staff Deleted!";
        this.$refs.successAlert.showSuccess(message);
        this.selectedStaffIds = [];
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getActiveStaffMethod();
    },
    async getActiveStaffMethod() {
      this.isLoading = true;
      try {
        const params = {
          status_value: "approved",
          activated_value: "true",
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params,
        });
        this.getCandidatesData = response.data.data;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
        this.totalCount = response.data.total_count;
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getActiveStaffMethod();
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
table th,
table tr td {
  text-transform: capitalize;
}
.pagetitle {
  padding: 10px;
}

.clr {
  color: #ff5722;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}
</style>
