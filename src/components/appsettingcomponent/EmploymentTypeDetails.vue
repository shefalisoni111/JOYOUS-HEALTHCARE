<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ul class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            employment types details / <span>employment types</span>
          </li>
        </ul>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
          data-bs-toggle="modal"
          data-bs-target="#addEmployee"
          data-bs-whatever="@mdo"
          type="button"
          @click="showPopups"
        >
          Add employment type
        </button>
      </div>
    </div>
    <div class="mt-4 table-wrapper">
      <div class="showdata">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
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
          </li>
          <li class="nav-item" role="presentation">
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
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-employeementType"
            role="tabpanel"
            aria-labelledby="employymentType"
            tabindex="0"
          >
            <table class="table table table-hover" :v-if="getEmployeeStatus">
              <thead>
                <tr>
                  <th scope="col" class="col-5 text-white">ID</th>
                  <th scope="col" class="col-5 text-white">Employment Type</th>
                  <th scope="col" class="col-5 text-white jusfycenter">Description</th>
                  <th scope="col" class="col-2 text-white jusfycenter">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="getEmployee in getEmployeeStatus" :key="getEmployee.id">
                  <td :v-text="getEmployee.id">{{ getEmployee.id }}</td>
                  <td :v-text="getEmployee.title">{{ getEmployee.title }}</td>
                  <td :v-text="getEmployee.description">
                    {{ getEmployee.description }}
                  </td>
                  <td>
                    <i
                      class="bi bi-trash cursor-pointer"
                      v-on:click="confirmed(getEmployee.id)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="pills-companyDetails"
            role="tabpanel"
            aria-labelledby="companyDetail"
            tabindex="0"
          >
            Work in Progress...
          </div>
        </div>
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
    };
  },
  components: {
    AddEmployee,
    Loader,
    ConfirmationAlert,
  },

  methods: {
    confirmed(id) {
      this.isModalVisible = false;

      this.employeeDelete(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    employeeDelete(id) {
      this.confirmMessage = "Are you sure want to delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/employment_types/` + id).then((response) => {
          if (response.data.error === "record could Not deleted !") {
            alert(
              "CanNot Delete Employee Type: This record associated with candidate employee type records."
            );
          } else {
            this.getEmployeeDAta();
          }
        });
        this.isModalVisible = false;
      };
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
