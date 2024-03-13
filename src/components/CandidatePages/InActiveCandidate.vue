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
        <tr v-for="datas in paginateCandidates" :key="datas">
          <td v-text="datas.id"></td>
          <td class="text-capitalize">
            <router-link
              class="text-capitalize fw-bold"
              :to="{
                name: 'Profile',
                params: { id: datas && datas.id },
              }"
            >
              {{ datas.first_name }}&nbsp;&nbsp;{{ datas.last_name }}</router-link
            >
          </td>
          <td v-text="datas.position"></td>
          <td v-text="datas.email"></td>
          <td v-text="datas.phone_number"></td>
          <td v-text="datas.status"></td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
              v-on:click="activeCandidateMethod(datas.id)"
            >
              Re-Activate
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mx-3" style="text-align: right" v-if="getCandidatesData.length >= 8">
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
        :disabled="currentPage * itemsPerPage >= getCandidatesData.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<style scoped>
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
a {
  color: black;
  text-decoration: none;
}
</style>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
export default {
  name: "InActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      currentPage: 1,
      itemsPerPage: 11,
      isLoading: false,
    };
  },
  components: { Loader },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getCandidatesData.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },
  methods: {
    async getCandidate() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/approve_and_notactivated_candidates`
        );

        this.getCandidatesData = response.data.data;
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
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      const response = await axios
        .put(`${VITE_API_URL}/re_activate_candidate/${id}`)
        .then((response) => {
          this.getCandidate();
        })

        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
  },
  mounted() {
    this.getCandidate();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 11%;
}

.table-wrapper {
  overflow-x: auto;
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
