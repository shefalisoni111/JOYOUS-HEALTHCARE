<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-capitalize fw-bold">
            General settings /
            <span class="clr" style="color: #000000">Staff deductions</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-capitalize fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#addDeduct"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopup"
        >
          + Add deductions
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="bg-white">
          <div class="showdata">
            <div class="">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active text-capitalize px-0"
                    id="active_candidate_deduction"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Active
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-capitalize"
                    id="inactive_candidate_deduction"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Inactive
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="active_candidate_deduction"
                  tabindex="0"
                >
                  <div class="mt-4 table-wrapper">
                    <table class="table table addjobtable">
                      <thead>
                        <tr>
                          <th scope="col" class="col-2 bg-primary text-white">
                            ID
                          </th>
                          <th scope="col" class="col-2 bg-primary text-white">
                            Title
                          </th>
                          <!-- <th scope="col" class="col-2 bg-primary text-white">Job</th> -->
                          <th scope="col" class="col-2 bg-primary text-white">
                            Amount
                          </th>

                          <!--  <th scope="col" class="col-1 bg-primary text-white">
                            Frequency
                          </th> -->
                          <th scope="col" class="col-1 bg-primary text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="getCandidateDeduction?.length > 0">
                        <tr
                          v-for="getDeduction in getCandidateDeduction"
                          :key="getDeduction.id"
                        >
                          <td>
                            {{ getDeduction.id }}
                          </td>
                          <td>
                            {{ getDeduction.title }}
                          </td>
                          <!-- <td>
                            {{ getDeduction.jobs_id }}
                          </td> -->
                          <td>
                            {{ "£" + getDeduction.amount }}
                          </td>
                          <!-- <td>
                            {{ getDeduction.frequency }}fgfd
                          </td> -->

                          <td>
                            <i
                              class="bi bi-trash text-danger border-0 border-0 cursor-pointer"
                              v-on:click="confirmed(getDeduction.id)"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="6" class="text-center text-danger">
                            {{ "Data Not Found!" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="inactive_candidate_deduction"
                  tabindex="0"
                >
                  <p>Work in Progress...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-3 mt-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getCandidateDeduction?.length >= 10"
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
    <AddDeductionComponent @updateList="fetchCandidateDeductions" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import AddDeductionComponent from "../modals/appsetting/AddDeduction.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import icon from "../../assets/delete.png";
import Swal from "sweetalert2";

export default {
  name: "CandidateDeduction",
  data() {
    return {
      getCandidateDeduction: [],
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
    AddDeductionComponent,
    Loader,
    ConfirmationAlert,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.confirmed(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    confirmed(id) {
      Swal.fire({
        width: "300px",
        text: "Are you sure want to delete this?",

        html: `
    <div style="
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    ">
      <div style="
        height: 50px;
        width: 50px;
        background: #ffe3e8;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img src="${icon}" alt="Delete Warning" style="height: 30px; width: 30px;" />
      </div>
    </div>
    <div>Are you sure want to delete this?</div>
  `,
        showCancelButton: true,
        confirmButtonColor: "#f9944b",
        cancelButtonColor: "#000",

        cancelButtonText: "Cancel",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${VITE_API_URL}/candidate_deductions/` + id)
            .then((response) => {
              if (
                response.data.error &&
                response.data.error.toLowerCase().includes("could not deleted")
              ) {
                Swal.fire({
                  icon: "warning",
                  title: "Warning",
                  text:
                    response.data.error ||
                    "Cannot delete Employee Type: This record is associated with candidate employee type records.",
                });
              } else {
                this.fetchCandidateDeductions();
                Swal.fire(
                  "Deleted!",
                  "Employee Type has been deleted.",
                  "success"
                );
              }
            });
        }
      });
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchCandidateDeductions();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetchCandidateDeductions();
    },
    async fetchCandidateDeductions() {
      this.isLoading = true;
      await axios
        .get(`${VITE_API_URL}/candidate_deductions`)
        .then((response) => (this.getCandidateDeduction = response.data || []))
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.fetchCandidateDeductions();
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
table th {
  font-weight: 100;
}
.showdata .nav-link {
  color: #000;
}
.cursor-pointer {
  cursor: pointer;
}
.showdata .nav-link.active {
  background: none;
  margin-left: 4px;
}
.nav-pills .nav-link.active {
  color: #ff5722;
  border-bottom: 2px solid #ff5722;
  border-radius: 0;
  background-color: transparent;
  font-weight: bold;
}
.nav-pills {
  border-bottom: 1px solid #ddd6d6;
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
