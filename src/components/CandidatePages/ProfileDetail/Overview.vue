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
                  class="btn fw-medium mb-3 border-0 bg-transparent"
                  data-bs-toggle="modal"
                  data-bs-target="#editOverview"
                  data-bs-whatever="@mdo"
                  @click="handleOverViewEdit()"
                >
                  <i class="bi bi-pencil-fill"></i>
                </button>
              </div>
            </div>

            <div class="card-body">
              <table class="table table-borderless">
                <thead>
                  <tr class=""></tr>
                </thead>
                <tbody
                  class="text-capitalize"
                  v-if="getCandidatesDataInOverview"
                >
                  <tr>
                    <td>Staff ID</td>
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
                    <td>Enhanced DBS Issues</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.enhanced_dbs_issues }}
                    </td>
                  </tr>
                  <tr>
                    <td>Enhanced DBS Number</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.enhanced_dbs_number }}
                    </td>
                  </tr>
                  <tr>
                    <td>Deby</td>
                    <td>:</td>
                    <td>
                      {{ getCandidatesDataInOverview.deby }}
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
                  <h6 class="mb-0">Bank Details</h6>
                </div>

                <div>
                  <button
                    class="fw-medium mb-0 border-0 bg-transparent"
                    data-bs-toggle="modal"
                    data-bs-target="#editBankDetailsOverview"
                    data-bs-whatever="@mdo"
                    type="button"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                </div>
                <div class="d-flex align-items-center">
                  <div class="fs-smaller text-nowrap">Profile View</div>
                  <!-- <label class="switch">
                    <input type="checkbox" id="togBtn" checked />
                    <div class="slider round"></div>
                  </label> -->
                  <label class="switch mt-2">
                    <input
                      type="checkbox"
                      id="togBtn"
                      v-model="bankDetailChecked"
                      @change="updateProfileView"
                    />
                    <div class="slider round"></div>
                  </label>
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
                    <td>Bank Name</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.bank_name }}</td>
                  </tr>
                  <tr>
                    <td>Account No</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.bank_number }}</td>
                  </tr>
                  <tr>
                    <td>IFSC Code</td>
                    <td>:</td>
                    <td>{{ getCandidatesDataInOverview.ifsc_code }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <div class="border-bottom d-flex justify-content-between pb-3">
                <h5
                  class="card-title text-uppercase fw-bold small d-flex align-items-center"
                >
                  Jobs
                </h5>
                <div>
                  <button
                    type="button"
                    class="btn text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#addStaffJobs"
                    data-bs-whatever="@mdo"
                    style="background: #f9944b; color: #fff"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <div class="d-flex gap-2 flex-wrap w-100">
                <!-- <button type="button" class="btn btn-primary btn-sm">
                  Assistance Number
                </button>
                <button type="button" class="btn btn-primary btn-sm">HCA</button> -->
                <div
                  class="gap-2 d-flex flex-column rounded-2 w-25"
                  v-for="(jobId, index) in getJobs"
                  :key="jobId"
                  :style="getBgStyle(index)"
                  style="flex: 0 0 14%"
                >
                  <i class="bi bi-person-circle text-center text-wrap"></i>
                  <span class="btn py-0 border-0">{{ getJobName(jobId) }}</span>
                  <!-- <span class="btn btn-primary">{{ jobId }}</span> -->
                </div>
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
                <!-- <button type="button" class="btn btn-primary mb-3">Edit</button> -->
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
                  <label class="switch mt-2">
                    <input type="checkbox" id="togBtn" checked />
                    <div class="slider round"></div>
                  </label>
                </div>

                <div>
                  <!-- <button type="button" class="btn btn-primary">Edit</button> -->
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

                <button
                  type="button"
                  class="btn text-nowrap text-nowrap mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addNextToKin"
                  data-bs-whatever="@mdo"
                  style="background: #f9944b; color: #fff"
                >
                  + Add
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="">
                  <tr>
                    <th scope="col">
                      Name
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Phone
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Relation
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Address Line 1
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Address Line 2
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      City
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Post Code
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Action
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody v-if="getNextToKin?.length > 0">
                  <tr v-for="(data, index) in getNextToKin" :key="index">
                    <td v-if="data">{{ data.name }}</td>
                    <td v-if="data">{{ data.phone_number }}</td>
                    <td v-if="data">{{ data.relation }}</td>
                    <td v-if="data">{{ data.address_line_1 }}</td>
                    <td v-if="data">{{ data.address_line_2 }}</td>
                    <td v-if="data">{{ data.city }}</td>
                    <td v-if="data">{{ data.postcode }}</td>
                    <td v-if="data">
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-trash"
                          v-on:click="vacancyDeleteMethod(data.id)"
                        ></i></button
                      >&nbsp;&nbsp;
                      <button class="btn btn-outline-success text-nowrap">
                        <i
                          class="bi bi-pencil-square"
                          data-bs-toggle="modal"
                          data-bs-target="#editNextToKin"
                          data-bs-whatever="@mdo"
                          v-on:click="nextKinEdit(data.id)"
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="8" class="text-center text-danger">
                      {{ noDataMessage }}
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
                  Work experience
                </h5>
                <button
                  class="btn rounded-1 text-capitalize fw-medium mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addWorkExperience"
                  data-bs-whatever="@mdo"
                  type="button"
                  style="background: #f9944b; color: #fff"
                >
                  + Add
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="">
                  <tr>
                    <th>
                      ID
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Title
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Company Name
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Experience
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Position
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Description
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody v-if="getWorkExpData?.length > 0">
                  <tr v-for="(data, index) in getWorkExpData" :key="index">
                    <td v-if="data">{{ data.id }}</td>
                    <td v-if="data">{{ data.title }}</td>

                    <td v-if="data">{{ data.company_name }}</td>
                    <td v-if="data">{{ data.experience }}</td>
                    <td v-if="data">{{ data.position }}</td>
                    <td v-if="data">{{ data.description }}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="6" class="text-center text-danger">
                      {{ noWorkDataMessage }}
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
                  Education
                </h5>
                <button
                  class="btn rounded-1 text-capitalize fw-medium mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addEducation"
                  data-bs-whatever="@mdo"
                  type="button"
                  style="background: #f9944b; color: #fff"
                >
                  + Add
                </button>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="">
                  <tr>
                    <th scope="col">
                      Title
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Description
                      <img
                        src="../../../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody v-if="getEducationExpData?.length > 0">
                  <tr v-for="data in getEducationExpData" :key="data.id">
                    <td v-text="data.title"></td>
                    <td v-text="data.description"></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="2" class="text-center text-danger">
                      {{ noEducationDataMessage }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WorkExperience @AddExperienceData="getCandidateWorkExperienceMethod" />
    <EducationAdd @AddEducation="getCandidateEducationMethod" />
    <AddNextKin @AddNextKin="getCandidateNextToKineMethod" />
    <EditBankDetails
      @bankDetailAdded="getCandidateMethod"
      ref="editBankDetail"
    />
    <NextToKinEdit
      @nextToKinAdded="getCandidateNextToKineMethod"
      :nextKinID="selectedNextKinId"
    />
    <AddStaffJobs @jobStaffAdded="getCandidateMethod" />
    <!-- <EditBankDetails @bankDetailAdded="getCandidateMethod" /> -->
    <OverviewEdit @overviewAdded="getCandidateMethod" ref="overviewEdit" />
    <!-- <ProfileTabs @getBankDetail="getCandidateMethod" /> -->
  </div>
</template>

<script>
import axios from "axios";
import ProfileTabs from "../../CandidatePages/ProfileDetail/ProfileTabs.vue";
import WorkExperience from "../../modals/CandidatePage/OverView/WorkExperience.vue";
import EducationAdd from "../../modals/CandidatePage/OverView/EducationAdd.vue";
import AddNextKin from "../../modals/CandidatePage/OverView/AddNextKin.vue";
import OverviewEdit from "../../modals/CandidatePage/OverviewEdit.vue";
import NextToKinEdit from "../../modals/CandidatePage/OverView/NextToKinEdit.vue";
import EditBankDetails from "../../modals/CandidatePage/OverView/EditBankDetails.vue";
import AddStaffJobs from "../../modals/CandidatePage/OverView/AddStaffJobs.vue";

export default {
  name: "Overview",
  data() {
    return {
      getCandidatesDataInOverview: [],
      getEducationExpData: [],
      getWorkExpData: [],
      getNextToKin: [],

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
      getJobs: [],
      noDataMessage: [],
      noEducationDataMessage: [],
      noWorkDataMessage: [],
      bankDetailChecked: false,
      selectedNextKinId: null,
      options: [],
    };
  },
  components: {
    WorkExperience,
    EducationAdd,
    AddNextKin,
    OverviewEdit,
    NextToKinEdit,
    EditBankDetails,
    ProfileTabs,
    AddStaffJobs,
  },
  methods: {
    getBgStyle(index) {
      const colors = [
        " #F9944B14", // index 0
        "#34C7591A", // index 1
        "#FF2D551A", // index 2 background: #FF2D551A;

        "#32ADE61A", // index 3 background: #32ADE61A;

        "#32ADE613", // index 4 background: #32ADE614;

        "#007AFF14", // index 5 background: #007AFF14;
        "#5856D614", // index 5 background: #5856D614;

        "#AF52DE1A", // index 5 background: #background: #AF52DE1A;

        "#A2845E14", // index 5 background: #A2845E14;
        "#30B0C714", // index 5 background: #30B0C714;
        "#FF3B3014", // index 5 background: #FF3B3014;

        // add more colors as needed
      ];
      const bgColor = colors[index % colors.length]; // loop colors if more items
      return { backgroundColor: bgColor };
    },
    getJobName(jobId) {
      const job = this.options.find((job) => job.id === jobId);
      return job ? job.name : "";
    },
    async getJobData() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data || [];
      } catch (error) {}
    },
    handleOverViewEdit() {
      this.$refs.overviewEdit.getEmployeeTypeData();
    },
    // handleBankDetailEdit(){
    //   this.$refs.editBankDetail.getEmployeeTypeData();
    // },
    nextKinEdit(nextKinID) {
      this.selectedNextKinId = nextKinID;
    },
    async updateProfileView() {
      try {
        const formData = new FormData();

        formData.append(
          "bank_detail",
          this.bankDetailChecked ? "true" : "false"
        );
        formData.append("candidate_id", this.$route.params.id);
        const response = await axios.put(
          `${VITE_API_URL}/update_bank_details_contact_information`,
          formData
        );

        // await this.getCandidateMethod();
      } catch (error) {
        // console.error("Error updating profile view:", error);
      }
    },

    async getCandidateMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.getCandidatesDataInOverview = response.data.candidate;
        this.getJobs = response.data.candidate.job_ids || [];
        this.bankDetailChecked = this.getCandidatesDataInOverview.bank_detail;
        if (
          this.getCandidatesDataInOverview &&
          this.getCandidatesDataInOverview.id
        ) {
          const candidateId = this.getCandidatesDataInOverview?.id;
        } else {
        }
      } catch (error) {
        // Handle API request error
        // console.error("Error fetching candidate data:", error)
        // throw error;
      }
    },
    async getCandidateWorkExperienceMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidate_work_experiences/${this.$route.params.id}`
        );

        if (response.data && response.data.length > 0) {
          this.getWorkExpData = response.data;
          this.noWorkDataMessage = "";
        } else {
          this.getNextToKin = [];
          this.noWorkDataMessage = "Data not found.";
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    async getCandidateEducationMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/candidates_all_educations`
        );

        if (response.data && response.data.length > 0) {
          this.getEducationExpData = response.data;
          this.noEducationDataMessage = "";
        } else {
          this.getEducationExpData = [];
          this.noEducationDataMessage = "Data not found.";
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
    async getCandidateNextToKineMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/next_of_kins`
        );

        // if (response.data) {
        //   this.getNextToKin = response.data;
        // } else {
        // }
        if (response.data && response.data.length > 0) {
          this.getNextToKin = response.data;
          this.noDataMessage = "";
        } else {
          this.getNextToKin = [];
          this.noDataMessage = "Data not found.";
        }
      } catch (error) {
        // console.error("Error fetching next of kin data:", error);
      }
    },
    async vacancyDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      const token = localStorage.getItem("token");
      await axios
        .delete(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/next_of_kins/` +
            id,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        )
        .then((response) => {
          this.getCandidateNextToKineMethod();
        });
    },
  },

  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.getCandidateMethod();
      vm.this.getCandidateWorkExperienceMethod();
      vm.this.getCandidateEducationMethod();
      vm.this.getCandidateNextToKineMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getCandidateMethod();
    this.getCandidateWorkExperienceMethod();
    this.getCandidateEducationMethod();
    this.getCandidateNextToKineMethod();
    next();
  },
  mounted() {
    this.getCandidateMethod();
    this.getCandidateWorkExperienceMethod();
    this.getCandidateEducationMethod();
    this.getCandidateNextToKineMethod();
    this.getJobData();
  },
  // async mounted() {
  //   // try {
  //   //   await this.getCandidateMethod();
  //   //   await this.getCandidateWorkExperienceMethod();
  //   //   await this.getCandidateEducationMethod();
  //   //   await this.getCandidateNextToKineMethod();
  //   // } catch (error) {
  //   //   // console.error("Error during component initialization:", error);
  //   // }
  // },
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

.form-check-input {
  border: 2px solid grey;
}
.btn-primary {
  border: none;
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
