<template>
  <div class="table-wrapper">
    <table class="table candidateTable">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col" class="widthSet">Name</th>
          <th scope="col">Positions</th>
          <th scope="col" class="widthSet">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Status</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-if="paginateCandidates?.length > 0">
        <tr v-for="pending in paginateCandidates" :key="pending.id">
          <td v-text="pending.id"></td>
          <td class="text-capitalize">
            <router-link
              class="text-capitalize fw-bold"
              :to="{
                name: 'Profile',
                params: { id: pending && pending.id },
              }"
            >
              {{ pending.first_name }}&nbsp;&nbsp;{{ pending.last_name }}</router-link
            >
          </td>
          <td class="text-capitalize" v-text="pending.possition"></td>
          <td v-text="pending.email"></td>
          <td v-text="pending.phone_number"></td>
          <td class="text-capitalize" v-text="pending.status"></td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
              v-on:click="confirmed(pending.id)"
            >
              Approve</button
            >&nbsp;&nbsp;
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
              v-on:click="confirmedReject(pending.id)"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7" v-if="!isLoading" class="text-center text-danger">
            {{ "Data Not Found!" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mx-3" style="text-align: right" v-if="totalCount > 0">
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
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
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getPendingCandidatesData?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";

export default {
  name: "Rejected",
  data() {
    return {
      getPendingCandidatesData: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      totalCount: 0,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: { Loader, ConfirmationAlert },
  computed: {
    paginateCandidates() {
      return this.getPendingCandidatesData;
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },
  methods: {
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchPendingCandidates();
    },
    async fetchPendingCandidates(page = 1) {
      this.isLoading = true;
      try {
        const params = {
          status_value: "pending",
          activated_value: "true",
          page: page,
          per_page: this.itemsPerPage,
        };
        const response = await axios.get(`${VITE_API_URL}/candidates`, { params });

        this.getPendingCandidatesData = response.data.data;
        this.totalPages = response.data.total_pages;
        this.totalCount = response.data.total_count;
        this.currentPage = response.data.current_page;
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchPendingCandidates(this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchPendingCandidates(this.currentPage);
      }
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.activeCandidatesMethod(id);
    },
    confirmedReject(id) {
      this.isModalVisible = false;

      this.rejectCandidateMethod(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    async activeCandidatesMethod(id) {
      this.confirmMessage = "Are you sure want to Approve this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        try {
          const response = await axios.put(
            `${VITE_API_URL}/candidate/approve_candidate/${id}`
          );

          this.fetchPendingCandidates();
        } catch (error) {
          // console.error("Error approving candidate:", error);
        }
        this.isModalVisible = false;
      };
    },

    async rejectCandidateMethod(id) {
      this.confirmMessage = "Are you sure want to Reject this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        try {
          const response = await axios.put(
            `${VITE_API_URL}/candidate/reject_candidate/${id}`
          );
          // console.log("Response after approval:", response);

          this.fetchPendingCandidates();
          alert("reject staff successful");
        } catch (error) {
          // console.error("Error approving candidate:", error);
        }
        this.isModalVisible = false;
      };
    },
  },
  created() {
    this.fetchPendingCandidates();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 16%;
}

.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
a {
  color: black;
  text-decoration: none;
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
