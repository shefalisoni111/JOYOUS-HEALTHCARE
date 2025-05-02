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
          <tbody v-if="paginateCandidates?.length > 0">
            <tr
              v-for="(candidate, index) in paginateCandidates"
              :key="index"
              @mouseenter="hoverRow = index"
              @mouseleave="hoverRow = null"
            >
              <td v-text="candidate.id"></td>
              <td>
                <router-link
                  class="text-capitalize fw-bold"
                  :to="{
                    name: 'Profile',
                    params: { id: candidate.id },
                  }"
                >
                  {{ candidate.first_name }}&nbsp; {{ candidate.last_name }}
                </router-link>
              </td>

              <td class="text-capitalize" v-text="candidate.possition"></td>
              <td>{{ candidate.email }}</td>
              <td>
                {{ candidate.phone_number }}
              </td>
              <td class="text-capitalize">
                <button
                  type="button"
                  :class="['btn', 'text-nowrap']"
                  :style="
                    {
                      approved: {
                        backgroundColor: '#E9FAEF',
                        color: '#24D164',
                      },
                      pending: {
                        backgroundColor: 'rgb(255 227 234)',
                        color: '#FF3B30',
                      },
                      rejected: {
                        backgroundColor: '#FFEFE7',
                        color: '#FF9F0A',
                      },
                    }[candidate.status]
                  "
                >
                  {{
                    candidate.status.charAt(0).toUpperCase() +
                    candidate.status.slice(1)
                  }}
                </button>
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
              <td>{{ formatDateFORUpdate(candidate.last_login) }}</td>
              <td class="cursor-pointer">
                <div class="action-wrapper">
                  <i class="bi bi-three-dots dot-icon"></i>

                  <div v-if="hoverRow === index" class="action-menu">
                    <button
                      type="button"
                      class="btn text-nowrap border-0"
                      v-on:click="confirmed(candidate.id)"
                    >
                      InActivate
                    </button>

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

                    <router-link
                      class="btn text-nowrap border-0"
                      :to="{
                        name: 'Profile',
                        params: { id: candidate.id },
                      }"
                    >
                      <i class="bi bi-eye" style="color: #f9944b"></i>
                      View
                    </router-link>
                  </div>
                </div>
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
          <tbody v-else>
            <tr v-if="!isLoading">
              <td colspan="9" class="text-danger text-center">
                {{ "Data Not Found!" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <EditCandidate
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    /> -->
    <AssignDirectVacancy
      :candidateId="selectedCandidateId || 0"
      @Candidate-updated="getCandidateMethods"
    />
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getCandidatesData?.length"
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
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
              >50 Records</a
            >
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
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
// import EditCandidate from "../modals/CandidatePage/EditCandidate.vue";
import AssignDirectVacancy from "../modals/CandidatePage/AssignDirectVacancy.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
export default {
  name: "ActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      inactiveCandidateData: [],
      selectedCandidateId: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      totalCount: 0,
      isLoading: false,
      hoverRow: null,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },

  components: {
    // EditCandidate,
    AssignDirectVacancy,
    Loader,
    ConfirmationAlert,
  },
  computed: {
    // paginateCandidates() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   return this.getCandidatesData.slice(startIndex, startIndex + this.itemsPerPage);
    // },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
    paginateCandidates() {
      return this.getCandidatesData;
    },
  },
  methods: {
    formatDateFORUpdate(dateString) {
      if (!dateString) return "";

      const date = new Date(dateString);
      if (isNaN(date)) return "";
      // const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const time = date.toLocaleTimeString();

      return `${day}-${month}-${year} ${time}`;
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getCandidateMethods();
    },
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
    confirmed(id) {
      this.isModalVisible = false;

      this.deleteCandidate(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    deleteCandidate(id) {
      this.confirmMessage = `Are you sure you want to inactivate this staff? Please ensure all the dues are cleared.`;
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios
          .put(`${VITE_API_URL}/inactivate_candidate/${id}`)
          .then((response) => {
            if (response.data.status === "Success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message,
              });
              this.inactiveCandidateData = response.data;
              this.getCandidateMethods();
            } else if (response.data.status === "Failed") {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: response.data.message,
              });
            }
          })
          .catch((error) => {
            // console.error("Error deleting candidate:", error);
          });
        this.isModalVisible = false;
      };
    },

    async getCandidateMethods() {
      this.isLoading = true;
      try {
        const params = {
          status_value: "approved",
          activated_value: "true",
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params,
        });
        this.getCandidatesData = response.data.data;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
        this.totalCount = response.data.total_count;
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.getCandidateMethods();
    },
    // previousPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //     this.getCandidateMethods();
    //   }
    // },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //     this.getCandidateMethods();
    //   }
    // },
  },

  created() {
    this.getCandidateMethods();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 16%;
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
  font-family: "Inter", sans-serif;
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
