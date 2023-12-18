<template>
  <div class="table-wrapper">
    <table class="table candidateTable">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Positions</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Status</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pending in getPendingCandidatesData" :key="pending.id">
          <td class="text-capitalize" v-text="pending.first_name"></td>
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
              Approved</button
            >&nbsp;&nbsp;
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
              v-on:click="rejectCandidateMethod(pending.id)"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
      <!-- <tbody v-else>
        <tr>
          <td colspan="6"></td>
        </tr>
      </tbody> -->
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CAndidatesList",
  data() {
    return {
      getPendingCandidatesData: [],
    };
  },
  methods: {
    async pendingCandidateMethod() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/pending_candidates"
        );

        this.getPendingCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
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
        .put(`https://logezy.onrender.com/candidate/approve_candidate/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;
          this.pendingCandidateMethod();
        })

        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },

    async rejectCandidateMethod(id) {
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      const response = await axios
        .put(`https://logezy.onrender.com/candidate/reject_candidate/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;
          this.pendingCandidateMethod();
        })

        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
  },
  mounted() {
    this.pendingCandidateMethod();
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
