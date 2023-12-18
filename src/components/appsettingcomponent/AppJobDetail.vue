<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            genral settings / <span class="clr">jobs</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopup"
        >
          + Add jobs
        </button>
      </div>
    </div>
    <div class="mt-4 table-wrapper">
      <table class="table table table-hover addjobtable">
        <thead>
          <tr>
            <th scope="col" class="col-1 bg-primary text-white">Colour</th>
            <th scope="col" class="col-2 bg-primary text-white">Name</th>
            <th scope="col" class="col-2 bg-primary text-white">Job Code</th>
            <th scope="col" class="col-3 bg-primary text-white text-center">
              No. of Clients
            </th>
            <th scope="col" class="col-3 bg-primary text-white text-center">
              No. of Candidate
            </th>
            <th scope="col" class="col-1 bg-primary text-white">Action</th>
          </tr>
        </thead>
        <tbody v-if="getJobs.length > 0">
          <tr v-for="jobs in getJobs" :key="jobs.id">
            <td scope="row">
              <i class="bi bi-square-fill" :style="{ color: jobs.color }"></i>
            </td>
            <td v-text="jobs.name"></td>
            <td v-text="jobs.job_code"></td>
            <td v-text="jobs.no_of_client" align="center"></td>
            <td v-text="jobs.no_of_candidates" align="center"></td>
            <td>
              <i class="bi bi-trash" v-on:click="jobsDelete(jobs.id)"></i>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddJobbs />
  </div>
</template>

<script>
import axios from "axios";
import AddJobbs from "../modals/appsetting/AddJobbs.vue";

export default {
  name: "AppJobDetail",
  data() {
    return {
      getJobs: [],
    };
  },
  components: {
    AddJobbs,
  },
  onMounted() {
    const myModal = new bootstrap.Modal(
      document.getElementById("myModal"),
      options
    );
  },

  methods: {
    showPopup() {
      myModal.show();
    },
    jobsDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete(`https://logezy.onrender.com/jobs/` + id)
        .then((response) => {
          this.getJobData();
        });
      alert("Record Deleted ");
    },
    async getJobData() {
      await axios
        .get("https://logezy.onrender.com/jobs")
        .then((response) => (this.getJobs = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },
  },

  mounted() {
    this.getJobData();
  },
};
</script>

<style scoped>
td i.bi-trash {
  border: 1px solid #9e9e9e;
  padding: 3px 15px;
  border-radius: 4px;
}

.pagesetting p span::after {
  content: "";
}
.btn-primary {
  border: none;
}

table thead th {
  background-color: #f9944b !important;
}
</style>
