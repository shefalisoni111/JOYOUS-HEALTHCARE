<template>
  <div>
    <div class="wrapper-vacancy">
      <table class="table vacancyTable">
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
            <th scope="col">
              #RefCode
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Client
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Site
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Job Title
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Date
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Shift
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col" class="withShow">
              Staff required
              <img
                src="../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <!-- <th scope="col">Client Rate</th> -->
            <th scope="col" class="widthDefineNotes">
              Notes
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
        <tbody v-if="getInactiveData?.length > 0">
          <tr
            v-for="(data, index) in getInactiveData"
            :key="index"
            @mouseenter="hoverRow = index"
            @mouseleave="hoverRow = null"
          >
            <td v-text="data.id"></td>
            <td v-text="data.ref_code"></td>
            <td>
              <router-link
                class="text-capitalize text-black text-decoration-underline fw-bold"
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: data.client_id },
                }"
              >
                {{ data.client_name }}
              </router-link>
            </td>
            <td v-text="data.site_name"></td>
            <td v-text="data.job_name"></td>
            <td class="">
              <div v-for="(date, index) in data.dates" :key="index">
                {{ date }}

                <template v-if="index !== data.dates.length - 1">, </template>
              </div>
            </td>
            <!-- <td v-for="(date, index) in data.dates" :key="index" v-text="date"></td> -->

            <td v-text="data.shift ? data.shift.replace(/_/g, ' ') : ' '"></td>
            <td class="withShow text-center">
              {{ data.staff_required === null ? 0 : data.staff_required }}
            </td>
            <!-- <td class="text-center">
                {{ data.client_rate }}
              </td> -->
            <td class="widthDefineNotes" v-text="data.notes"></td>
            <td v-text="data.status"></td>
            <td>
              <div class="action-wrapper">
                <i class="bi bi-three-dots dot-icon"></i>

                <div v-if="hoverRow === index" class="action-menu">
                  <template v-if="isEditAllowed(data.dates)">
                    <button
                      type="button"
                      class="btn text-nowrap shadow-soft"
                      data-bs-toggle="modal"
                      data-bs-target="#editVacancy"
                      data-bs-whatever="@mdo"
                      @click="editAndReactivate(data.id)"
                    >
                      <i class="bi bi-pencil-square" style="color: #f9944b"></i>
                      Edit
                    </button>
                  </template>

                  <template v-else>
                    <button
                      type="button"
                      class="btn btn-success text-nowrap shadow-soft"
                      @click="editAndReactivates(data.id)"
                    >
                      Re-activate
                    </button>
                  </template>

                  <button
                    type="button"
                    class="btn text-nowrap shadow-soft border-0"
                    @click="confirmed(data.id)"
                  >
                    <i class="bi bi-trash border-0 border-0" style="color: #f9944b"></i>
                    Delete
                  </button>
                </div>
              </div>

              <!-- <button
                v-if="isEditAllowed(data.dates)"
                class="btn btn-outline-success text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editVacancy"
                data-bs-whatever="@mdo"
                @click="editAndReactivate(data.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                v-else
                class="btn btn-success text-nowrap"
                @click="editAndReactivates(data.id)"
              >
                Re-activate
              </button> -->
              <!-- <i
                  class="bi bi-pencil-square btn btn-outline-success text-nowrap text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#editVacancy"
                  data-bs-whatever="@mdo"
                  @click="editVacancyId(data.id)"
                ></i> -->
              <!-- &nbsp;&nbsp;
              <button
                class="btn btn-outline-danger text-nowrap"
                v-on:click="confirmed(data.id)"
              >
                <i class="bi bi-trash border-0 border-0"></i>
              </button> -->
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="16" class="text-center text-danger" v-if="!isLoading">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="mt-3 mb-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="totalCount > 10"
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
    <EditVacancy
      :vacancyId="selectedVacancyId || 0"
      @updateVacancyInactive="getInactiveVacancyMethod"
      ref="editShift"
    />
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
import EditVacancy from "../modals/Vacancy/EditVacancy.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";

export default {
  name: "ActiveCandidate",
  data() {
    return {
      getInactiveData: [],
      inactiveCandidateData: [],
      selectedVacancyId: 0,
      createVacancy: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      totalPages: 1,
      isLoading: false,
      hoverRow: null,
      today: new Date(),
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: { Loader, EditVacancy, ConfirmationAlert },
  computed: {
    displayedVacancies() {
      return this.getInactiveData.slice(0, 20);
    },
    paginatedVacancies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getInactiveData.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginatedVacancies.length;
    },
  },

  methods: {
    async changePage(page) {
      this.currentPage = page;
      await this.getInactiveVacancyMethod();
    },

    setItemsPerPage(number) {
      this.itemsPerPage = number;
      this.currentPage = 1;
      this.getInactiveVacancyMethod();
    },
    isEditAllowed(dates) {
      if (!dates) {
        return false;
      }

      const today = new Date();
      return dates.some((date) => {
        const [weekday, dateString] = date.split(", ");

        const [day, month, year] = dateString.split("-").map(Number);

        const monthIndex = month - 1;

        const parsedDate = new Date(year, monthIndex, day);

        return parsedDate < today;
      });
    },
    editAndReactivate(vacancyId) {
      // this.reActivatedMethod(vacancyId);
      this.editVacancyId(vacancyId);
    },
    editAndReactivates(vacancyId) {
      this.reActivatedMethod(vacancyId);
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.vacancyDeleteMethod(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    async vacancyDeleteMethod(id) {
      this.confirmMessage = "Are you Sure want to delete Shift?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const token = localStorage.getItem("token");
        await axios
          .delete(`${VITE_API_URL}/vacancies/` + id, {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((response) => {
            this.getInactiveVacancyMethod();
          });
        this.isModalVisible = false;
      };
    },
    reActivatedMethod(id) {
      axios
        .put(`${VITE_API_URL}/active_vacancy/${id}`)
        .then((response) => {
          this.inactiveCandidateData = response.data;

          this.getInactiveVacancyMethod();
          // alert("Successful Reactivate");
          Swal.fire({
            title: "Reactivated Successfully",
            text: "The vacancy has been successfully reactivated.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          // console.error("Error reactivating vacancy:", error);
          Swal.fire({
            title: "Error",
            text: "There was an error reactivating the vacancy. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    editVacancyId(vacancyId) {
      this.selectedVacancyId = vacancyId;
      this.$refs.editShift.getBusinessUnitMethod();

      setTimeout(() => {
        this.$refs.editShift.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.editShift.getTimeShift();
      }, 200);

      setTimeout(() => {
        this.$refs.editShift.getJobTitleMethod();
      }, 300);

      setTimeout(() => {
        this.$refs.editShift.fetchVacancyMethod(vacancyId);
      }, 400);

      // setTimeout(() => {
      //   this.$refs.editShift.reActivatedMethod(vacancyId);
      // }, 500);
    },
    async getInactiveVacancyMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/inactive_vacancy_list`,
          {
            params: {
              page: this.currentPage,
              per_page: this.itemsPerPage,
            },
          }
        );

        this.getInactiveData = response.data.vacancies;
        this.totalCount = response.data.total_vacancy;
        this.totalPages = response.data.total_pages;
        this.currentPage = response.data.current_page;
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

  async mounted() {
    await this.getInactiveVacancyMethod();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}
.withShow {
  width: 7%;
}
.widthDefineNotes {
  width: 8%;
}
.main-content {
  transition: all 0.3s;
}
.btn:focus-visible {
  border: none;
  outline: none;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
.widthDefine {
  width: 6%;
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}

.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}
.searchbox {
  width: 19%;
}
.searchbox::before {
  content: "\F52A";
  font-family: "bootstrap-icons";
  position: absolute;
  top: 8px;
  left: 10px;
  color: #ff5f30;
  font-weight: bolder;
}
input::-webkit-input-placeholder {
  margin-left: 5px;
}
@media (max-width: 1120px) {
  .vacancyTable {
    width: 1090px;
  }
  .wrapper-vacancy {
    overflow-x: scroll;
  }
}
</style>
