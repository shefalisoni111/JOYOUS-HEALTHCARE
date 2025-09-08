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
          class="btn btn-primary rounded-4 text-uppercase fw-medium btn-bg-color"
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
      <table class="table table" :v-if="getCandidateStatus">
        <thead>
          <tr>
            <th scope="col" class="col-4 bg-primary text-white">ID</th>
            <th scope="col" class="col-4 bg-primary text-white">Title</th>

            <th scope="col" class="col-5 bg-primary text-white jusfycenter">
              Description
            </th>
            <th scope="col" class="col-4 bg-primary text-white">
              No. of Staff
            </th>
            <th scope="col" class="col-2 bg-primary text-white jusfycenter">
              Action
            </th>
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
                class="bi bi-trash border-0 border-0 cursor-pointer"
                v-on:click="confirmed(getCandidate.id)"
              ></i>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-danger text-center">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getCandidateStatus?.length >= 10"
    >
      <div class="d-flex">
        <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
        <button
          class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
          style="color: #00000080"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
          style="background: #ffffff; color: #f9944b"
        >
          {{ currentPage }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
          style="background: #ffffff"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
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
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
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
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
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
        axios
          .delete(`${VITE_API_URL}/candidate_statuses/` + id)
          .then((response) => {
            this.getCandidateData();
          });
        this.isModalVisible = false;
      };
    },
    changePage(page) {
      this.currentPage = page;
      this.getCandidateData();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getCandidateData();
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
