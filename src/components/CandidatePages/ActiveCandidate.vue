<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="widthSet">Name</th>
              <th scope="col">Positions</th>
              <th scope="col" class="widthSet">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
              <!-- <th scope="col">Access</th> -->
              <th scope="col">Assign</th>
              <th scope="col">Last Login</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="candidate in paginateCandidates" :key="candidate.id">
              <td v-text="candidate.id"></td>
              <td>
                <router-link
                  class="text-capitalize fw-bold text-decoration-underline"
                  :to="{
                    name: 'Profile',
                    params: { id: candidate.id },
                  }"
                >
                  {{ candidate.first_name }}
                </router-link>
              </td>

              <td v-text="candidate.position"></td>
              <td>{{ candidate.email }}</td>
              <td>
                {{ candidate.phone_number }}
              </td>
              <td>
                {{ candidate.activated ? "Active" : "Inactive" }}
              </td>

              <!-- <td>
                <label class="switch">
                  <input type="checkbox" id="togBtn" checked />
                  <div class="slider round"></div>
                </label>
              </td> -->

              <td>
                <button
                  class="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#assignDirectVacancy"
                  data-bs-whatever="@mdo"
                  @click="updateSelectedIds(candidate)"
                >
                  <i class="bi bi-person-circle"></i>
                </button>
              </td>
              <td>{{ candidate.last_login }}</td>
              <td class="cursor-pointer">
                <button
                  type="button"
                  class="btn btn-success"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Tooltip on top"
                  v-on:click="deleteCandidate(candidate.id)"
                >
                  In-Active
                </button>

                &nbsp;&nbsp;

                <!-- <router-link
                  :to="{
                    name: 'EditCandidate',
                    params: { id: candidate.id },
                  }"
                  class="btn btn-outline-success text-nowrap"
                >
                  </router-link
                > -->

                <!-- <i
                  class="bi bi-pencil-square btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#editCandidate"
                  data-bs-whatever="@mdo"
                  @click="editCandidate(candidate.id)"
                ></i> -->
                &nbsp;&nbsp;
                <router-link
                  class="btn btn-outline-success text-nowrap"
                  :to="{
                    name: 'Profile',
                    params: { id: candidate.id },
                  }"
                >
                  <i class="bi bi-eye"></i>
                </router-link>
                <!-- <router-link
                  :to="{
                    name: 'ProfileView',
                    params: { id: candidate.id },
                  }"
                  class="btn btn-outline-success text-nowrap"
                >
                  <i class="bi bi-eye"></i
                ></router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditCandidate
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    />
    <AssignDirectVacancy
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    />
    <div class="mx-3" style="text-align: right" v-if="getCandidatesData.length >= 8">
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= getCandidatesData.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import EditCandidate from "../modals/CandidatePage/EditCandidate.vue";
import AssignDirectVacancy from "../modals/CandidatePage/AssignDirectVacancy.vue";

export default {
  name: "ActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      inactiveCandidateData: [],
      selectedCandidateId: null,
      currentPage: 1,
      itemsPerPage: 11,
      isLoading: false,
    };
  },

  components: {
    EditCandidate,
    AssignDirectVacancy,
    Loader,
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getCandidatesData.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },
  methods: {
    selectTab(index) {
      this.activeTab = index;
    },
    updateSelectedIds(candidate) {
      this.$store.commit("setSelectedCandidateId", candidate.id);
      this.$store.commit("setSelectedJobId", candidate.job_id);
    },
    editCandidate(candidateId) {
      this.selectedCandidateId = candidateId;
    },
    openAssigned(id) {
      this.$store.commit("setSelectedAssignedItemId", id);
    },
    deleteCandidate(id) {
      if (!window.confirm("Are you Sure?")) {
        return;
      }
      axios
        .put(`${VITE_API_URL}/inactivate_candidate/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;
          this.getCandidateMethods();
        })
        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
    // async assignedCandidate(id) {
    //   const token = localStorage.getItem("token");

    //   if (this.$store.state.selectedAssignedItemId) {
    //     try {
    //       const response = await axios.get(
    //         `${VITE_API_URL}/assigned_candidate_list/${id}`,
    //         {
    //           headers: {
    //             "content-type": "application/json",
    //             Authorization: "bearer " + token,
    //           },
    //         }
    //       );
    //       this.getAssignedList = response.data.data;
    //       this.$emit("assignVacancy");
    //       alert("Assigned Vacancy Successful");
    //     } catch (error) {
    //       if (error.response) {
    //         if (error.response.status == 404) {
    //           // alert(error.response.data.message);
    //         }
    //       }
    //     }
    //   }
    // },
    async getCandidateMethods() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/approve_and_activated_candidates`
        );

        this.getCandidatesData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },

  async created() {
    await this.getCandidateMethods();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 11%;
}

.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}
a {
  color: black;
  text-decoration: none;
}

.switch input {
  display: none;
}
.table-wrapper {
  overflow-x: auto;
}
.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
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
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
