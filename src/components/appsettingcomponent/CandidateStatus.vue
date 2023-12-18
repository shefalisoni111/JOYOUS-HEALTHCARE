<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ol class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            details / <span>candidates status</span>
          </li>
        </ol>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#addCandidateStatus"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopup"
        >
          Add new status
        </button>
      </div>
    </div>
    <div class="mt-4 table-wrapper">
      <table class="table table table-hover" :v-if="getCandidateStatus">
        <thead>
          <tr>
            <th scope="col" class="col-4 bg-primary text-white">Title</th>
            <th scope="col" class="col-5 bg-primary text-white jusfycenter">
              Description
            </th>
            <th scope="col" class="col-2 bg-primary text-white jusfycenter">
              Action
            </th>
          </tr>
        </thead>
        <tbody v-if="getCandidateStatus.length > 0">
          <tr v-for="getCandidate in getCandidateStatus" :key="getCandidate.id">
            <td :v-text="getCandidate.title">{{ getCandidate.title }}</td>
            <td :v-text="getCandidate.description">
              {{ getCandidate.description }}
            </td>
            <td>
              <i
                class="bi bi-trash"
                v-on:click="candidateDelete(getCandidate.id)"
              ></i>
            </td>
          </tr>
          <!-- <tr>
            <td>Pending</td>
            <td>LG002</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Inactive</td>
            <td>LG003</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Maternity</td>
            <td>LG001</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Holiday</td>
            <td>LG002</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Active</td>
            <td>LG003</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Inactive</td>
            <td>LG001</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Holiday</td>
            <td>LG002</td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Inactive</td>
            <td>LG003</td>
            <td><i class="bi bi-trash"></i></td>
          </tr> -->
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddCandidateStatus />
  </div>
</template>

<script>
import axios from "axios";

import AddCandidateStatus from "../modals/appsetting/AddCandidateStatus.vue";

export default {
  name: "CandidateStatus",
  data() {
    return {
      getCandidateStatus: [],
    };
  },
  components: {
    AddCandidateStatus,
  },
  onMounted() {
    const addCandidateStatus = new bootstrap.Modal(
      document.getElementById("addCandidateStatus"),
      options
    );
  },

  methods: {
    showPopups() {
      addCandidateStatus.show();
    },
    candidateDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete(`https://logezy.onrender.com/candidate_statuses/` + id)
        .then((response) => {
          this.getCandidateDAta();
        });

      alert("Record Deleted ");
    },

    getCandidateDAta() {
      axios
        .get("https://logezy.onrender.com/candidate_statuses")
        .then((response) => (this.getCandidateStatus = response.data))
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
    this.getCandidateDAta();
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

table thead th {
  background-color: #f9944b !important;
}
.btn-primary {

  border: none;
}
</style>
