<template>
  <div class="table-wrapper">
    <table class="table candidateTable">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Positions</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Status</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pending in getRejectCandidateList" :key="pending.id">
          <td v-text="pending.id"></td>

          <td class="text-capitalize">
            <router-link
              class="text-capitalize"
              :to="{
                name: 'Profile',
                params: { id: pending && pending.id },
              }"
            >
              {{ pending && pending.first_name }}</router-link
            >
          </td>
          <td v-text="pending.position"></td>
          <td v-text="pending.email"></td>
          <td v-text="pending.phone_number"></td>
          <td v-text="pending.status"></td>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RejectCandidate",
  data() {
    return {
      getRejectCandidateList: [],
    };
  },
  methods: {
    async rejectCandidate() {
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
      }
    },

    async activeCandidateMethod(id) {
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      const response = await axios
        .put(`${VITE_API_URL}/candidate/approve_candidate/${id}`)
        .then((response) => {
          this.rejectCandidate();
        })

        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
  },
  mounted() {
    this.rejectCandidate();
  },
};
</script>

<style scoped>
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
a {
  color: black;
  text-decoration: none;
}
.table-wrapper {
  overflow-x: auto;
}
</style>
