<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="assignedVacancyList"
      aria-labelledby="assignedVacancyList"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="assignedVacancyList">Assign Shift</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-lg-flex gap-3 mb-0 publish-ul d-sm-grid">
                <li>Code:{{ vacancyDetails.ref_code }}</li>
                <li>Department:{{ vacancyDetails.business_unit }}</li>
                <li>Job: {{ vacancyDetails.job_title }}</li>
                <li v-for="(date, index) in vacancyDetails.dates" :key="index">
                  Date: {{ date }}
                </li>
                <li>Time: {{ vacancyDetails.shift }}</li>
                <li>Space left: 1</li>
              </ul>
            </div>
            <div class="row g-3 align-items-center">
              <div class="wrapper-vacancy">
                <table class="table vacancyTable" v-if="selectedAssignedItemId">
                  <thead>
                    <tr>
                      <th scope="col">staff code</th>
                      <th scope="col">first name</th>

                      <th scope="col">phone number</th>
                      <th scope="col">email</th>
                      <th scope="col">address</th>
                      <th scope="col">activated</th>
                      <th scope="col">status</th>
                      <th scope="col">position</th>
                      <!-- <th scope="col">employment type</th> -->
                      <th scope="col">last login</th>

                      <!-- <th scope="col">Action</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in assignedVacancyData" :key="data.id">
                      <td v-text="data.candidate_code"></td>
                      <td v-text="data.first_name"></td>

                      <td v-text="data.phone_number"></td>

                      <td v-text="data.email"></td>

                      <td v-text="data.address"></td>

                      <td v-text="data.activated"></td>
                      <td v-text="data.status"></td>
                      <td v-text="data.position"></td>
                      <!-- <td v-text="data.employment_type"></td> -->
                      <td v-text="data.last_login"></td>
                      <!-- <td class="cursor-pointer">
                     
                      &nbsp;&nbsp;
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-trash"
                          v-on:click="vacancyDeleteMethod(data.id)"
                        ></i>
                      </button>
                    </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#assignedVacancyList"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="closePopup"
            >
              Cancel
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
  name: "AssignedVacancyList",
  data() {
    return { assignedVacancyData: [], vacancyDetails: [] };
  },
  computed: {
    selectedAssignedItemId() {
      this.getAssignedVacancyList(this.$store.state.selectedAssignedItemId);
      return this.$store.state.selectedAssignedItemId;
    },
  },

  methods: {
    async getAssignedVacancyList(id) {
      const token = localStorage.getItem("token");
      this.assignedVacancyData = [];
      this.vacancyDetails = [];
      if (this.$store.state.selectedAssignedItemId) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/assigned_candidate_list?vacancy_id=${id}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.assignedVacancyData = response.data.data;
          this.vacancyDetails = response.data.vacancy_date;
          this.$emit("assignVacancy");
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        }
      }
    },
    closePopup() {
      this.$store.commit("setSelectedAssignedItemId", null);
    },
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
.modal-dialog {
  margin-right: inherit;
}
.modal-xl {
  width: 1400px;
}
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
@media (max-width: 1050px) {
  .modal-dialog {
    margin-right: auto;
  }
  .modal-xl {
    width: auto;
  }
}
</style>
