<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="appliedVacancy"
      aria-labelledby="appliedVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="appliedVacancy">Applied Vacancy</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-flex gap-3 mb-0 publish-ul">
                <li>Code:gbf</li>
                <li>B-unit:Demo</li>
                <li>Job: driver</li>
                <li>Date: 18-07-2023</li>
                <li>Time: 20:00 - 08:00</li>
                <li>Space left: 1</li>
              </ul>
            </div>
            <div class="row m-3">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
                >
                  <div class="d-flex justify-content-around gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    Select All
                  </div>

                  <div></div>

                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div class="searchbox position-relative">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search "
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <table class="table candidateTable">
                <thead>
                  <tr>
                    <th scope="col">candidate code</th>
                    <th scope="col">first name</th>
                    <th scope="col">last name</th>
                    <th scope="col">phone number</th>
                    <!-- <th scope="col">email</th>
                    <th scope="col">address</th> -->
                    <th scope="col">activated</th>
                    <th scope="col">status</th>
                    <th scope="col">position</th>
                    <th scope="col">employment type</th>
                    <!-- <th scope="col">last login</th>

                    <th scope="col">Action</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in getVacancyDetail" :key="data.id">
                    <td v-text="data.candidate_code"></td>
                    <td v-text="data.first_name"></td>
                    <td v-text="data.last_name"></td>
                    <td v-text="data.phone_number"></td>

                    <td v-text="data.activated"></td>
                    <td v-text="data.status"></td>
                    <td v-text="data.position"></td>
                    <td v-text="data.employment_type"></td>
                    <!-- <td v-text="data.last_login"></td>
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
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div class="row g-3 align-items-center mt-3">
              <div class="d-flex gap-1">
                <div class="d-flex align-items-center">
                  <label>Choose Action:</label>
                </div>
                <div class="col-3">
                  <select
                    class="form-select"
                    aria-label="Disabled select example"
                  >
                    <option selected>Select an Action</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary rounded-1"
              data-bs-target="#appliedVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Submit
            </button>
            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              v-on:click="addVacancyMethod()"
            >
              Add Vacancy
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppliedVacancyList",
  data() {
    return { getVacancyDetail: [], vacancyData: [] };
  },

  methods: {
    async getAppliedVacancyMethod() {
      const token = localStorage.getItem("token");

      // Manually set the index or use your own logic to determine it
      const customIndex = 0; // Change this to your logic or set it manually

      // Check if vacancyData is not empty and has the item at the determined index
      if (this.vacancyData.length > customIndex) {
        const vacancyId = this.vacancyData[customIndex].id;

        try {
          const response = await axios.get(
            `https://logezy.onrender.com/applied_candidate_list?vacancy_id=${vacancyId}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );
          this.getVacancyDetail = response.data.data;
        } catch (error) {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        }
      } else {
       
      }
    },

    async getVacancyDataMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/vacancies",
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );
        this.vacancyData = response.data.data;
        this.getAppliedVacancyMethod();
      } catch (error) {
        //console.error("Error fetching vacancies:", error);
      }
    },
  },

  mounted() {
    this.getVacancyDataMethod();
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

.modal-dialog {
  margin-right: inherit;
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
.modal-dialog {
  margin-right: inherit;
}
.btn-primary {
  border: none;
}
.modal-xl {
  width: 1400px !important;
}
#head {
  width: 40px;
  height: 40px;
}
.modal-content {
  height: 930px;
}
table th {
  text-transform: capitalize;
}
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
</style>
