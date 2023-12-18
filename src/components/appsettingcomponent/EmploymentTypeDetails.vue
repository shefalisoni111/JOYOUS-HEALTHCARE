<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ol class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            employment types details / <span>employment types</span>
          </li>
        </ol>
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
      <table class="table table table-hover" :v-if="getEmployeeStatus">
        <thead>
          <tr>
            <th scope="col" class="col-5 text-white">Employment Type</th>
            <th scope="col" class="col-5 text-white jusfycenter">
              Description
            </th>
            <th scope="col" class="col-2 text-white jusfycenter">Action</th>
          </tr>
        </thead>
        <tbody v-if="getEmployeeStatus.length > 0">
          <tr v-for="getEmployee in getEmployeeStatus" :key="getEmployee.id">
            <td :v-text="getEmployee.title">{{ getEmployee.title }}</td>
            <td :v-text="getEmployee.description">
              {{ getEmployee.description }}
            </td>
            <td>
              <i
                class="bi bi-trash"
                v-on:click="employeeDelete(getEmployee.id)"
              ></i>
            </td>
          </tr>
          <!-- <tr>
            <td :v-text="getEmployee.title"></td>
            <td :v-text="getEmployee.description"></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Umbrella</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Paye</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Holiday</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Active</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Inactive</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Holiday</td>
            <td></td>
            <td><i class="bi bi-trash"></i></td>
          </tr>
          <tr>
            <td>Inactive</td>
            <td></td>
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
    <AddEmployee />
  </div>
</template>

<script>
import axios from "axios";

import AddEmployee from "../modals/appsetting/AddEmployee.vue";

export default {
  name: "EmploymentTypeDetails",
  data() {
    return {
      getEmployeeStatus: [],
    };
  },
  components: {
    AddEmployee,
  },
  onMounted() {
    const addEmployee = new bootstrap.Modal(
      document.getElementById("addEmployee"),
      options
    );
  },
  methods: {
    showPopups() {
      addEmployee.show();
    },
    employeeDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete(`https://logezy.onrender.com/employment_types/` + id)
        .then((response) => {
          this.getEmployeeDAta();
        });
      alert("Record Deleted ");
    },

    getEmployeeDAta() {
      axios
        .get("https://logezy.onrender.com/employment_types")
        .then((response) => (this.getEmployeeStatus = response.data));
    },
  },

  mounted() {
    this.getEmployeeDAta();
  },
};
</script>

<style>
table thead th {
  background-color: #f9944b !important;
}

.btn-primary {
  border: none;
}
</style>
