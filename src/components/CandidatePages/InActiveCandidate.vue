<template>
  <div class="table-wrapper">
    <table class="table candidateTable">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Positions</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <!-- <th scope="col">Status</th>
          <th scope="col">Access</th>
          <th scope="col">Assign</th>
          <th scope="col">Last Login</th> -->
          <!-- <th scope="col">Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="datas in getCandidatesData" :key="datas">
          <td class="text-capitalize" v-text="datas.first_name"></td>
          <td v-text="datas.position"></td>
          <td v-text="datas.email"></td>
          <td v-text="datas.phone_number"></td>

          <!-- <td>
            <a class="btn btn-outline-success text-nowrap">
              <i class="bi bi-eye"></i></a
            >&nbsp;&nbsp;
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
              v-on:click="activeCandidateMethod(pending.id)"
            >
              Active
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
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
          "https://logezy.onrender.com/approve_and_notactivated_candidates"
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
  },
  mounted() {
    this.getCandidate();
  },
};
</script>

<style>
.table-wrapper {
  overflow-x: auto;
}
</style>
