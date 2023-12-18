<template>
  <div class="col-12">
    <div class="pagetitle d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <ol class="breadcrumb mb-1">
          <li class="breadcrumb-item active text-uppercase fw-bold">
            genral settings / <span class="clr">candidate deductions</span>
          </li>
        </ol>
      </div>
      <!-- End Page Title -->
      <div class="d-flex align-items-center">
        <button
          class="btn btn-primary rounded-1 text-uppercase fw-medium"
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
                    class="nav-link active text-capitalize ps-0"
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
                    <table class="table table table-hover addjobtable">
                      <thead>
                        <tr>
                          <th scope="col" class="col-2 bg-primary text-white">
                            Title
                          </th>
                          <th scope="col" class="col-2 bg-primary text-white">
                            Job
                          </th>
                          <th scope="col" class="col-2 bg-primary text-white">
                            Amount
                          </th>
                          <th scope="col" class="col-1 bg-primary text-white">
                            Frequency
                          </th>
                          <th scope="col" class="col-1 bg-primary text-white">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="getCandidateDeduction.length > 0">
                        <tr
                          v-for="getDeduction in getCandidateDeduction"
                          :key="getDeduction.id"
                        >
                          <td :v-text="getDeduction.title">
                            {{ getDeduction.title }}
                          </td>
                          <td :v-text="getDeduction.job">
                            {{ getDeduction.jobs_id }}
                          </td>
                          <td :v-text="getDeduction.amount">
                            {{ getDeduction.amount }}
                          </td>
                          <td :v-text="getDeduction.frequency">
                            {{ getDeduction.frequency }}
                          </td>

                          <td>
                            <i
                              class="bi bi-trash"
                              v-on:click="
                                candidateDeductionDelete(getDeduction.id)
                              "
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="5">Loading...</td>
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
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi veniam cum, optio similique esse soluta! Fuga dicta,
                    eius aut ipsum ipsam ducimus vero deleniti odit debitis
                    corporis, nemo vel possimus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddDeductionComponent />
  </div>
</template>

<script>
import axios from "axios";
import { onMounted } from "vue";
import AddDeductionComponent from "../modals/appsetting/AddDeduction.vue";
export default {
  name: "CandidateDeduction",
  data() {
    return {
      getCandidateDeduction: [],
    };
  },
  components: {
    AddDeductionComponent,
  },
  onMounted() {
    // const addDeduction = new bootstrap.Modal(
    //   document.getElementById("addDeduction"),
    //   options
    // );
  },

  methods: {
    showPopups() {
      addDeduct.show();
    },
    candidateDeductionDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios
        .delete(`https://logezy.onrender.com/candidate_deductions/` + id)
        .then((response) => {
          this.candidateDeduction();
        });
      alert("Record Deleted ");
    },
    async candidateDeduction() {
      await axios
        .get("https://logezy.onrender.com/candidate_deductions")
        .then((response) => (this.getCandidateDeduction = response.data));
    },
  },

  mounted() {
    this.candidateDeduction();
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
table thead th {
  background-color: #f9944b !important;
}
.btn-primary {
  border: none;
}
</style>
