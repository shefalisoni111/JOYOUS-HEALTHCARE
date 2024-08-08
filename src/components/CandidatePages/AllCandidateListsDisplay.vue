<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="widthSet">Name</th>
              <th scope="col">Positions</th>
              <th scope="col" class="widthSet">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
              <th scope="col">Assign</th>
              <th scope="col">Last Login</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="candidate in getCandidatesData" :key="candidate.id">
              <td v-text="candidate.id"></td>
              <td>
                <router-link
                  class="text-capitalize fw-bold"
                  :to="{ name: 'Profile', params: { id: candidate.id } }"
                >
                  {{ candidate.first_name }}&nbsp; {{ candidate.last_name }}
                </router-link>
              </td>
              <td class="text-capitalize" v-text="candidate.possition"></td>
              <td>{{ candidate.email }}</td>
              <td>{{ candidate.phone_number }}</td>
              <td class="text-capitalize">{{ candidate.status }}</td>
              <td>
                <button
                  class="btn"
                  :class="[
                    'btn-outline-success',
                    {
                      'btn-outline-danger':
                        candidate.status === 'pending' ||
                        candidate.status === 'rejected' ||
                        !candidate.activated,
                    },
                    {
                      'disabled-button':
                        candidate.status === 'pending' ||
                        candidate.status === 'rejected' ||
                        !candidate.activated,
                    },
                  ]"
                  data-bs-toggle="modal"
                  data-bs-target="#assignDirectVacancy"
                  data-bs-whatever="@mdo"
                  @click="updateSelectedIds(candidate)"
                  :disabled="
                    candidate.status === 'pending' ||
                    candidate.status === 'rejected' ||
                    !candidate.activated
                  "
                >
                  <i class="bi bi-person-circle"></i>
                </button>
              </td>
              <td>{{ candidate.last_login }}</td>
              <td class="cursor-pointer">
                <router-link
                  class="btn btn-outline-success text-nowrap"
                  :to="{ name: 'Profile', params: { id: candidate.id } }"
                >
                  <i class="bi bi-eye"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CandidateAdd @addCandidate="getCandidateMethods" />
    <AssignDirectVacancy
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    />

    <div class="mx-3" style="text-align: right" v-if="totalCount > 0">
      <button class="btn btn-outline-dark btn-sm">
        {{ getCandidatesData.length }} Records Per Page
      </button>
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
        :disabled="currentPage === totalPages"
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
import Loader from "../Loader/Loader.vue";
import AssignDirectVacancy from "../modals/CandidatePage/AssignDirectVacancy.vue";

import CandidateAdd from "../modals/CandidatePage/CandidateAdd.vue";

export default {
  name: "ActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      selectedCandidateId: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      totalPages: 1,
      isLoading: false,
    };
  },
  components: {
    AssignDirectVacancy,
    Loader,
    CandidateAdd,
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getCandidatesData.slice(startIndex, startIndex + this.itemsPerPage);
    },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
  },
  methods: {
    async getCandidateMethods() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params: { page: this.currentPage, per_page: this.itemsPerPage },
        });
        this.getCandidatesData = response.data.data;
        this.totalCount = response.data.total_count;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    updateSelectedIds(candidate) {
      this.$store.commit("setSelectedCandidateId", candidate.id);
      this.$store.commit("setSelectedJobId", candidate.job_id);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getCandidateMethods();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getCandidateMethods();
      }
    },
  },
  created() {
    this.getCandidateMethods();
  },
};
</script>

<style scoped>
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
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
table th.widthSet {
  width: 16%;
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
