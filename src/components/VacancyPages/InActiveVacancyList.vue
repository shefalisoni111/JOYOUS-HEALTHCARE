<template>
  <div>
    <div class="row">
      <div class="col-12 wrapper-vacancy">
        <table class="table vacancyTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">#RefCode</th>
              <th scope="col">Client</th>
              <th scope="col">Site</th>
              <th scope="col">Job Title</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Notes</th>
              <th scope="col">Status</th>
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
              <td class="widthDefine">
                <span v-for="(date, index) in data.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== data.dates.length - 1">, </template>
                </span>
              </td>
              <!-- <td v-for="(date, index) in data.dates" :key="index" v-text="date"></td> -->

              <td v-text="data.shift"></td>

              <td v-text="data.notes"></td>
              <td></td>
              <td>
                <button
                  class="btn btn-outline-success text-nowrap"
                  v-on:click="reActivatedMethod(data.id, data.editDate)"
                >
                  Re-Activate</button
                >&nbsp;&nbsp;
                <button class="btn btn-outline-danger text-nowrap">
                  <i class="bi bi-trash" v-on:click="vacancyDeleteMethod(data.id)"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-3" style="text-align: right" v-if="getInactiveData.length >= 9">
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
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
export default {
  name: "ActiveCandidate",
  data() {
    return {
      getInactiveData: [],
      inactiveCandidateData: [],
      selectedVacancyId: 0,
      createVacancy: null,
      currentPage: 1,
      itemsPerPage: 9,
      isLoading: false,
    };
  },
  components: { Loader },
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

  methods: {
    async vacancyDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      await axios
        .delete(`${VITE_API_URL}/vacancies/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.getInactiveVacancyMethod();
        });
    },
    reActivatedMethod(id, date) {
      const today = new Date();
      const editDate = new Date(date);

      if (editDate <= today) {
        if (!window.confirm("Are you sure you want to re-activate?")) {
          return;
        }
        axios
          .put(`${VITE_API_URL}/active_vacancy/${id}`)
          .then((response) => {
            this.inactiveCandidateData = response.data;
            this.getInactiveVacancyMethod();
            alert("Successful Reactivate");
          })
          .catch((error) => {
            // console.error("Error reactivating vacancy:", error);
          });
      } else {
        alert("Cannot re-activate. Edit date is today or later.");
      }
    },

    async getInactiveVacancyMethod() {
      this.isLoading = true;
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
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.getInactiveVacancyMethod();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}

.main-content {
  transition: all 0.3s;
}
.btn:focus-visible {
  border: none;
  outline: none;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
.widthDefine {
  width: 6%;
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}
.vacancyTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
