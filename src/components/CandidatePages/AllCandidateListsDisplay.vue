<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table candidateTable">
          <thead>
            <tr>
              <th scope="col">
                ID
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col" class="widthSet">
                Name
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Positions
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col" class="widthSet">
                Email
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Phone
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Status
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Assign
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Last Login
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
              <th scope="col">
                Action
                <img
                  src="../../assets/ArrowDown.png"
                  class="img-fluid pe-2"
                  alt="RecPal"
                  loading="eager"
                />
              </th>
            </tr>
          </thead>
          <tbody v-if="getCandidatesData?.length > 0">
            <tr
              v-for="(candidate, index) in getCandidatesData"
              :key="index"
              @mouseenter="hoverRow = index"
              @mouseleave="hoverRow = null"
            >
              <td v-text="candidate.id"></td>
              <td>
                <router-link
                  class="text-capitalize fw-bold"
                  :to="{ name: 'Profile', params: { id: candidate.id } }"
                >
                  {{ candidate.first_name }}&nbsp; {{ candidate.last_name }}
                </router-link>
              </td>
              <td class="text-capitalize" v-text="candidate.possition"></td>
              <td>{{ candidate.email }}</td>
              <td>{{ candidate.phone_number }}</td>
              <td class="text-capitalize">
                <!-- {{ candidate.status }} -->
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
              <td>
                <button
                  class="btn"
                  :class="[
                    'btn-outline-success',
                    {
                      'btn-outline-danger':
                        candidate.status === 'pending' ||
                        candidate.status === 'rejected' ||
                        !candidate.activated,
                    },
                    {
                      'disabled-button':
                        candidate.status === 'pending' ||
                        candidate.status === 'rejected' ||
                        !candidate.activated,
                    },
                  ]"
                  data-bs-toggle="modal"
                  data-bs-target="#assignDirectVacancy"
                  data-bs-whatever="@mdo"
                  @click="updateSelectedIds(candidate)"
                  :disabled="
                    candidate.status === 'pending' ||
                    candidate.status === 'rejected' ||
                    !candidate.activated
                  "
                >
                  <i class="bi bi-person-circle"></i>
                </button>
              </td>
              <td>
                {{
                  formatDate(candidate.last_login ? candidate.last_login : " ")
                }}
              </td>
              <td class="cursor-pointer">
                <div class="action-wrapper">
                  <i class="bi bi-three-dots dot-icon"></i>

                  <div v-if="hoverRow === index" class="action-menu">
                    <router-link
                      class="btn text-nowrap border-0"
                      :to="{ name: 'Profile', params: { id: candidate.id } }"
                    >
                      <i class="bi bi-eye" style="color: #f9944b"></i>
                      View
                    </router-link>

                    <button
                      class="btn text-nowrap border-0"
                      v-on:click="deleteStaffMethod(candidate.id)"
                    >
                      <i
                        class="bi bi-trash border-0 border-0"
                        style="color: #f9944b"
                      ></i>
                      Delete
                    </button>
                  </div>
                </div>
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
    <CandidateAdd @addCandidate="getCandidateMethods" />
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

    <loader :isLoading="isLoading"></loader>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import AssignDirectVacancy from "../modals/CandidatePage/AssignDirectVacancy.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import CandidateAdd from "../modals/CandidatePage/CandidateAdd.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
export default {
  name: "ActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      selectedCandidateId: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      totalPages: 1,
      isLoading: false,
      hoverRow: null,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: {
    AssignDirectVacancy,
    Loader,
    CandidateAdd,
    ConfirmationAlert,
    SuccessAlert,
  },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.getCandidatesData.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
  },
  methods: {
    confirmed(id) {
      this.isModalVisible = false;

      this.jobsInActive(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    deleteStaffMethod(id) {
      this.confirmMessage =
        "Are you sure you want to completely delete this staff?  Please ensure all the dues are cleared.";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/candidates/` + id).then((response) => {
          this.getCandidateMethods();
          // this.getInactiveJobData();
        });
        const message = "Record deleted successfully";
        this.$refs.successAlert.showSuccess(message);

        this.isModalVisible = false;
      };
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getCandidateMethods();
    },
    formatDate(dateString) {
      if (dateString === " ") return " ";

      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    },

    async getCandidateMethods() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`, {
          params: { page: this.currentPage, per_page: this.itemsPerPage },
        });
        this.getCandidatesData = response.data.data;
        this.totalCount = response.data.total_count;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
    updateSelectedIds(candidate) {
      this.$store.commit("setSelectedCandidateId", candidate.id);
      this.$store.commit("setSelectedJobId", candidate.job_id);
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
table th.widthSet {
  width: 16%;
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
