<template>
  <div>
    <div class="col-md-12 bg-white">
      <div class="row">
        <div class="col-6">
          <div class="card rounded-0">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  Starter Check List
                </h5>
                <!-- <router-link
                  :to="{
                    name: 'OverviewEdit',
                    params: { id: getCandidatesDataInOverview.id },
                  }"
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap mb-3"
                >
                  Edit
                </router-link> -->
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap text-nowrap mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editOverview"
                  data-bs-whatever="@mdo"
                >
                  Edit
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>Candidate ID</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.candidate_code }}</td>
                  </tr>
                  <tr>
                    <td>Employment Type</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.employment_type }}</td>
                  </tr>

                  <tr>
                    <td>DBS/PVG No</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.DBS_PVG_no }}</td>
                  </tr>
                  <tr>
                    <td>DBS/PVG Issue Date</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.DBS_PVG_issue_date }}
                    </td>
                  </tr>
                  <tr>
                    <td>DBS/PVG Expiry Date</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.DBS_PVG_expiry_date }}
                    </td>
                  </tr>
                  <tr>
                    <td>Next Check Date</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.next_check_date }}</td>
                  </tr>
                  <tr>
                    <td>NMC/NISCC/SSSC Pin</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.NMC_NISCC_SSSC_pin }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nationality</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.nationality }}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.date_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Place of Birth</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.place_of_birth }}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.gender }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card mt-3">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="fs-smaller text-nowrap">Profile View</div>
                  <label class="switch">
                    <input type="checkbox" id="togBtn" checked />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div>
                  <button type="button" class="btn btn-outline-primary">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>Bank Details</td>
                    <td>:</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  Jobs
                </h5>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-primary btn-sm">
                  Assitance number
                </button>
                <button type="button" class="btn btn-primary btn-sm">
                  HCA
                </button>
                <button type="button" class="btn btn-primary btn-sm">
                  + Add
                </button>
              </div>
            </div>
          </div>
          <div class="card rounded-0 mt-3">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  payroll
                </h5>
                <button type="button" class="btn btn-outline-primary mb-3">
                  Edit
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>NI Number</td>
                    <td>:</td>
                    <td>LOG1CA1</td>
                  </tr>
                  <tr>
                    <td>Tax Code</td>
                    <td>:</td>
                    <td>PAYE</td>
                  </tr>
                  <tr>
                    <td>PAyroll ID</td>
                    <td>:</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td>This is my only job</td>
                  </tr>
                  <tr>
                    <td>Payroll Frequency</td>
                    <td>:</td>
                    <td>Monthly</td>
                  </tr>
                  <tr>
                    <td>Payroll Reference</td>
                    <td>:</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card text-center mt-3">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="d-flex fs-smaller text-nowrap">Profile View</div>
                  <label class="switch">
                    <input type="checkbox" id="togBtn" checked />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div>
                  <button type="button" class="btn btn-outline-primary">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody class="text-capitalize">
                  <tr>
                    <td>social care wealth</td>
                    <td>:</td>
                    <td>2345678978</td>
                    <td>
                      <div class="d-flex justify-content-between">
                        <div class="fs-smaller text-nowrap">Profile View</div>

                        <input type="checkbox" id="togBtn" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  NEXT TO KIN
                </h5>
                <button type="button" class="btn btn-primary mb-3">Edit</button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Relation</th>
                    <th scope="col">Address Line 1</th>
                    <th scope="col">Address Line 2</th>
                    <th scope="col">City</th>
                    <th scope="col">Post Code</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ...
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  Work experience
                </h5>
                <button type="button" class="btn btn-primary mb-3">
                  + Add
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="table-light"></thead>
                <tbody>
                  ...
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  Education
                </h5>
                <button type="button" class="btn btn-primary mb-3">
                  + Add
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="table-light"></thead>
                <tbody>
                  ...
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Overview",
  data() {
    return {
      getCandidatesDataInOverview: [],
      fetchCandidate: {
        id: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        address: "",
        jobs_id: 1,
        phone_number: "",
        email: "",
        activated: "",
        employment_type_id: "",
      },
    };
  },
  components: {},
  methods: {
    async getCandidateMethod() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}`
        );

        this.getCandidatesDataInOverview = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

  mounted() {
    this.getCandidateMethod();
  },
};
</script>

<style scoped>
.fs-smaller {
  font-size: smaller;
}
.borderbottom {
  border-bottom: 1px solid #ebe2e2;
}

.accordion-button {
  width: 25%;
  background-color: transparent;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  border: none;
  background: transparent;
  box-shadow: none;
}
.profile {
  border-radius: 0px;
  border-top: 1px solid transparent;
}
#main {
  transition: all 0.3s;
  padding: 10px;
  transition: all 0.3s;
}
.bg-white {
  border-left: 1px solid #dedede;
}
.bg-orange-light {
  background: #fef8f8;
  background-color: #fdce5e17;
}
.card ul li {
  display: inline-block;
}

table th {
  font-size: 14px;
}
.card {
  border-radius: 0px;
}

.border-box {
  border: 1px solid lightgrey;
  padding: 12px;
  border-radius: 4px;
}
.card .round {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 7px;
  margin-right: 8px;
}

.card .hround {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 11px;
  margin-right: 8px;
}
.card .dround {
  background: #ff572266;
  border-radius: 50%;
  padding: 12px 17px;
  margin-right: 8px;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}
.form-check-input {
  border: 2px solid grey;
}
.btn-primary {
  border: none;
}
.switch .slider {
  position: absolute;
  top: -3;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 3px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;

  border-bottom: 3px solid #ff5722;
  border-radius: 0px;
  background-color: transparent;
}
.nav-pills .nav-link {
  color: grey;
}
ul.nav-pills {
  border-bottom: 1px solid grey;
}
.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}

.accordion-item {
  margin-bottom: 8px;
}

.accordion-header {
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}

.accordion-icon {
  font-size: 16px;
  transition: transform 0.3s;
}

.expanded {
  transform: rotate(90deg);
}
</style>
