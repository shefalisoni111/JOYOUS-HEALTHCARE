<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-capitalize fw-bold">
            employment types details /
            <span style="color: #000000">employment types</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-4 text-capitalize fw-medium btn-bg-color"
          data-bs-toggle="modal"
          data-bs-target="#addEmployee"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopups"
        >
          + Add employment type
        </button>
      </div>
    </div>
    <div class="mt-4 table-wrapper">
      <div class="showdata">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <!-- <li class="nav-item" role="presentation">
            <button
              class="nav-link active text-capitalize ps-0"
              id="employymentType"
              data-bs-toggle="pill"
              data-bs-target="#pills-employeementType"
              type="button"
              role="tab"
              aria-controls="pills-employeementType"
              aria-selected="true"
            >
              Employment Types
            </button>
          </li> -->
          <!-- <li class="nav-item" role="presentation">
            <button
              class="nav-link text-capitalize"
              id="companyDetail"
              data-bs-toggle="pill"
              data-bs-target="#pills-companyDetails"
              type="button"
              role="tab"
              aria-controls="pills-companyDetails"
              aria-selected="false"
            >
              Company Details
            </button>
          </li> -->
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-employeementType"
            role="tabpanel"
            aria-labelledby="employymentType"
            tabindex="0"
          >
            <table class="table table" :v-if="getEmployeeStatus">
              <thead>
                <tr>
                  <th scope="col" class="col-5 text-white">ID</th>
                  <th scope="col" class="col-5 text-white">Employment Type</th>
                  <th scope="col" class="col-5 text-white jusfycenter">Description</th>
                  <th scope="col" class="col-2 text-white jusfycenter">Action</th>
                </tr>
              </thead>
              <tbody v-if="getEmployeeStatus?.length > 0">
                <tr v-for="getEmployee in getEmployeeStatus" :key="getEmployee.id">
                  <td :v-text="getEmployee.id">{{ getEmployee.id }}</td>
                  <td :v-text="getEmployee.title">{{ getEmployee.title }}</td>
                  <td :v-text="getEmployee.description">
                    {{ getEmployee.description }}
                  </td>
                  <td>
                    <i
                      class="bi bi-trash border-0 border-0 cursor-pointer text-danger"
                      v-on:click="confirmed(getEmployee.id)"
                    ></i>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center text-danger" v-if="!isLoading">
                    {{ "Data Not Found!" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div
            class="tab-pane fade"
            id="pills-companyDetails"
            role="tabpanel"
            aria-labelledby="companyDetail"
            tabindex="0"
          >
            Work in Progress...
          </div> -->
        </div>
      </div>
    </div>
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getEmployeeStatus?.length >= 10"
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
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
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
    <AddEmployee @updateList="getEmployeeDAta" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import AddEmployee from "../modals/appsetting/AddEmployee.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
import icon from "../../assets/delete.png";

export default {
  name: "EmploymentTypeDetails",
  data() {
    return {
      getEmployeeStatus: [],
      addEmployeeModal: null,
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
    AddEmployee,
    Loader,
    ConfirmationAlert,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.employeeDelete(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    employeeDelete(id) {
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
          axios.delete(`${VITE_API_URL}/employment_types/` + id).then((response) => {
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
              this.getEmployeeDAta();
              Swal.fire("Deleted!", "Employee Type has been deleted.", "success");
            }
          });
        }
      });
    },
    changePage(page) {
      this.currentPage = page;
      this.getEmployeeDAta();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getEmployeeDAta();
    },
    getEmployeeDAta() {
      this.isLoading = true;
      axios
        .get(`${VITE_API_URL}/employment_types`)
        .then((response) => (this.getEmployeeStatus = response.data || []))
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getEmployeeDAta();
  },
};
</script>

<style scoped>
.showdata .nav-link {
  color: #000;
}
.cursor-pointer {
  cursor: pointer;
}
.showdata .nav-link.active {
  background: #e8e3e3;
  margin-left: 4px;
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
