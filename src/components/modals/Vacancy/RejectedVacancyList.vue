<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="rejectedVacancyList"
      aria-labelledby="rejectedVacancyList"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rejectedVacancyList">
              Rejected Vacancy
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <table class="table candidateTable">
                <thead>
                  <tr>
                    <th scope="col">candidate code</th>
                    <th scope="col">first name</th>
                    <th scope="col">last name</th>
                    <th scope="col">phone number</th>
                    <th scope="col">email</th>
                    <th scope="col">address</th>
                    <th scope="col">activated</th>
                    <th scope="col">status</th>
                    <th scope="col">position</th>
                    <th scope="col">employment type</th>
                    <th scope="col">last login</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in RejectedVacancyList" :key="data.id">
                    <td v-text="data.candidate_code"></td>
                    <td v-text="data.first_name"></td>
                    <td v-text="data.last_name"></td>
                    <td v-text="data.phone_number"></td>

                    <td v-text="data.email"></td>

                    <td v-text="data.address"></td>

                    <td v-text="data.activated"></td>
                    <td v-text="data.status"></td>
                    <td v-text="data.position"></td>
                    <td v-text="data.employment_type"></td>
                    <td v-text="data.last_login"></td>
                    <td class="cursor-pointer">
                      <a class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-pencil-square"></i>
                      </a>
                      &nbsp;&nbsp;
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-trash"
                          v-on:click="vacancyDeleteMethod(data.id)"
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td colspan="12">List in Process....</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#rejectedVacancyList"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addVacancyMethod()"
            >
              Add Vacancy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RejectedVacancyList",
  data() {
    return { rejectedListData: [] };
  },

  methods: {
    async getRejectedListMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/rejected_candidate_list",
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.rejectedListData = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
  },
  mounted() {
    this.getRejectedListMethod();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-xl {
  --bs-modal-width: 1823px !important;
}
.modal-footer {
  border-top: 0px;
}
.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
