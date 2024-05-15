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
      <tbody>
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
              {{ pending && pending.first_name }}&nbsp;
              {{ pending && pending.last_name }}</router-link
            >
          </td>
          <td v-text="pending.position"></td>
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
              v-on:click="activeCandidateMethod(pending.id)"
            >
              Approve
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mx-3" style="text-align: right" v-if="getRejectCandidateList.length >= 8">
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
        :disabled="currentPage * itemsPerPage >= getRejectCandidateList.length"
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
  name: "RejectCandidate",
  data() {
    return {
      getRejectCandidateList: [],
      currentPage: 1,
      itemsPerPage: 11,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: { Loader, ConfirmationAlert },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getRejectCandidateList.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },
  methods: {
    async rejectCandidate() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/rejected_candidates_list`);

        this.getRejectCandidateList = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },

    async activeCandidateMethod(id) {
      this.confirmMessage = "Are you sure want to Approve this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const response = await axios
          .put(`${VITE_API_URL}/candidate/approve_candidate/${id}`)
          .then((response) => {
            this.rejectCandidate();
          })

          .catch((error) => {
            // console.error("Error deleting candidate:", error);
          });
        this.isModalVisible = false;
      };
    },
  },
  mounted() {
    this.rejectCandidate();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 11%;
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
