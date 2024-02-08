<template>
  <div>
    <div class="row">
      <div class="col-12">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">#RefCode</th>
              <th scope="col">Client</th>
              <th scope="col">Business Unit</th>
              <th scope="col">Job Title</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Notes</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in displayedVacancies" :key="data.id">
              <td v-text="data.id"></td>
              <td v-text="data.ref_code"></td>
              <td>
                <router-link
                  class="text-capitalize text-black text-decoration-underline fw-bold"
                  :to="{
                    name: 'SingleClientProfile',
                    params: { id: data.client_id },
                  }"
                >
                  {{ data.client }}
                </router-link>
              </td>
              <td v-text="data.business_unit"></td>
              <td v-text="data.job_title"></td>

              <td v-for="(date, index) in data.dates" :key="index" v-text="date"></td>

              <td v-text="data.shift"></td>

              <td v-text="data.notes"></td>
              <td>
                <button
                  class="btn btn-outline-success text-nowrap"
                  v-on:click="reActivatedMethod(data.id)"
                >
                  Re-Activate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-3" style="text-align: right" v-if="getInactiveData.length >= 10">
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
        :disabled="currentPage * itemsPerPage >= getInactiveData.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActiveCandidate",
  data() {
    return {
      getInactiveData: [],
      inactiveCandidateData: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    displayedVacancies() {
      return this.getInactiveData.length >= 8
        ? this.paginatedVacancies
        : this.getInactiveData;
    },
    paginatedVacancies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getInactiveData.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.getInactiveData.length;
    },
  },
  components: {},
  methods: {
    reActivatedMethod(id) {
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      axios.put(`${VITE_API_URL}/active_vacancy/${id}`).then((response) => {
        this.inactiveCandidateData = response.data;
        this.getInactiveVacancyMethod();
      });
      alert("Successful Reactivate").catch((error) => {
        // console.error("Error deleting candidate:", error);
      });
    },

    async getInactiveVacancyMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/inactive_vacancy_list`);

        this.getInactiveData = response.data.vacancies;
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
    this.getInactiveVacancyMethod();
  },
};
</script>
