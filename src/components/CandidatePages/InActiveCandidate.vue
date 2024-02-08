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
        <tr v-for="datas in getCandidatesData" :key="datas">
          <td v-text="datas.id"></td>
          <td class="text-capitalize">
            <router-link
              class="text-capitalize fw-bold text-decoration-underline"
              :to="{
                name: 'Profile',
                params: { id: datas && datas.id },
              }"
            >
              {{ datas.first_name }}</router-link
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
export default {
  name: "InActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
    };
  },
  methods: {
    async getCandidate() {
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
.table-wrapper {
  overflow-x: auto;
}
</style>
