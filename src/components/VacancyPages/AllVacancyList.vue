<template>
  <div>
    <div class="row">
      <di class="col-12">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th scope="col">#RefCode</th>
              <th scope="col">Client</th>
              <th scope="col">Business Unit</th>
              <th scope="col">Job Title</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>
              <th scope="col">Notes</th>
              <th scope="col">Publish</th>
              <th scope="col">All</th>
              <th scope="col">Applied</th>
              <th scope="col">Assigned</th>
              <th scope="col">Rejected</th>
              <th scope="col">Create by</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="getdata in getVacancyDetail" :key="getdata.id">
              <td v-text="getdata.ref_code"></td>
              <td>
                <router-link
                  class="text-capitalize text-black text-decoration-underline"
                  :to="{
                    name: 'SingleClientProfile',
                    params: { id: getdata.client_id },
                  }"
                  >{{ getdata.client }}</router-link
                >
              </td>
              <td v-text="getdata.business_unit"></td>
              <td v-text="getdata.job_title"></td>

              <td v-text="getdata.dates[0]"></td>

              <!-- <td v-text="getdata.dates[0]"></td> -->
              <td v-text="getdata.shift"></td>

              <td v-text="getdata.notes"></td>
              <td>
                <a
                  class="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#publishVacancy"
                  data-bs-whatever="@mdo"
                >
                  <td v-if="getdata.publish == false">
                    <i class="bi bi-bell-fill"></i>
                  </td>

                  <td v-else>
                    <i class="bi bi-check-circle-fill"></i>
                  </td>
                </a>
              </td>

              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#allCandidateVacancyList"
                  data-bs-whatever="@mdo"
                >
                  <span class="rounded-circle">{{ getdata.applied }}</span>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#appliedVacancy"
                  data-bs-whatever="@mdo"
                >
                  <span class="rounded-circle">{{ getdata.applied }}</span>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#assignedVacancyList"
                  data-bs-whatever="@mdo"
                >
                  <span class="rounded-circle">{{ getdata.assigned }}</span>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#rejectedVacancyList"
                  data-bs-whatever="@mdo"
                >
                  <span class="rounded-circle">{{ getdata.rejected }}</span>
                </button>
              </td>
              <td v-text="getdata.create_by_and_time"></td>
              <td class="cursor-pointer">
                <router-link
                  :to="{
                    name: 'VacancyEdit',
                    params: { id: getdata.id },
                  }"
                  class="btn btn-outline-success text-nowrap"
                >
                  <i class="bi bi-pencil-square"></i>
                </router-link>
                &nbsp;&nbsp;
                <button class="btn btn-outline-success text-nowrap">
                  <i
                    class="bi bi-trash"
                    v-on:click="vacancyDeleteMethod(getdata.id)"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </di>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// import DatePicker from "../components/DatePicker.vue";

export default {
  data() {
    return {
      getVacancyDetail: [],
    };
  },
  components: {},

  methods: {
    async vacancyDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      await axios
        .delete(`https://logezy.onrender.com/vacancies/` + id, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((response) => {
          this.createVacancy();
        });
      // alert("Record Deleted ");
    },
    async createVacancy() {
      const token = localStorage.getItem("token");
      axios
        .get("https://logezy.onrender.com/vacancies", {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        })

        .then((response) => (this.getVacancyDetail = response.data.data));
    },
  },

  mounted() {
    this.createVacancy();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;
}
.main-content {
  transition: all 0.3s;
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
.candidateTable tr:nth-child(odd) td {
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
  border-bottom: 2px solid red; /* Replace with your desired border color */
  padding-bottom: 5px; /* Optional: Add padding for spacing */
}

button.nav-link.active > li.nav-item {
  /* Additional styles for the active state if needed */
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
</style>
