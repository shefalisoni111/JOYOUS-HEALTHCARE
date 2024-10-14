<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            details / <span>staff status</span>
          </li>
        </ul>
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
            <th scope="col" class="col-4 bg-primary text-white">ID</th>
            <th scope="col" class="col-4 bg-primary text-white">Title</th>

            <th scope="col" class="col-5 bg-primary text-white jusfycenter">
              Description
            </th>
            <th scope="col" class="col-4 bg-primary text-white">No. of Staff</th>
            <th scope="col" class="col-2 bg-primary text-white jusfycenter">Action</th>
          </tr>
        </thead>
        <tbody v-if="getCandidateStatus?.length > 0">
          <tr v-for="getCandidate in getCandidateStatus" :key="getCandidate.id">
            <td :v-text="getCandidate.id">{{ getCandidate.id }}</td>
            <td :v-text="getCandidate.title">{{ getCandidate.title }}</td>
            <td :v-text="getCandidate.description">
              {{ getCandidate.description }}
            </td>
            <td></td>
            <td>
              <i
                class="bi bi-trash cursor-pointer"
                v-on:click="confirmed(getCandidate.id)"
              ></i>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="5" class="text-danger text-center">{{ "Data Not Found!" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <AddCandidateStatus @updateList="getCandidateData" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import AddCandidateStatus from "../modals/appsetting/AddCandidateStatus.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";

export default {
  name: "CandidateStatus",
  data() {
    return {
      getCandidateStatus: [],
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: {
    AddCandidateStatus,
    Loader,
    ConfirmationAlert,
  },
  onMounted() {
    const addCandidateStatus = new bootstrap.Modal(
      document.getElementById("addCandidateStatus"),
      options
    );
  },

  methods: {
    confirmed(id) {
      this.isModalVisible = false;

      this.candidateDelete(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    showPopups() {
      addCandidateStatus.show();
    },
    confirmed(id) {
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/candidate_statuses/` + id).then((response) => {
          this.getCandidateData();
        });
        this.isModalVisible = false;
      };
    },

    getCandidateData() {
      this.isLoading = true;
      axios
        .get(`${VITE_API_URL}/candidate_statuses`)
        .then((response) => {
          this.getCandidateStatus = response.data || [];
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getCandidateData();
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
.cursor-pointer {
  cursor: pointer;
}
table thead th {
  background-color: #f9944b !important;
}
.btn-primary {
  border: none;
}
table {
  border-collapse: separate;
}
.table th,
.table td {
  text-align: center;
  width: 14.2857%;
}
</style>
