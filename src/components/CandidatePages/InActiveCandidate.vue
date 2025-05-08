<template>
  <div class="table-wrapper">
    <table class="table candidateTable">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col" class="widthSet">Name</th>
          <th scope="col">Positions</th>
          <th scope="col" class="widthSet">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-if="paginateCandidates?.length > 0">
        <tr
          v-for="(datas, index) in paginateCandidates"
          :key="index"
          @mouseenter="hoverRow = index"
          @mouseleave="hoverRow = null"
        >
          <td v-text="datas.id"></td>
          <td class="text-capitalize">
            <router-link
              class="text-capitalize fw-bold"
              :to="{
                name: 'Profile',
                params: { id: datas && datas.id },
              }"
            >
              {{ datas.first_name }}&nbsp;&nbsp;{{
                datas.last_name
              }}</router-link
            >
          </td>
          <td class="text-capitalize" v-text="datas.possition"></td>
          <td v-text="datas.email"></td>
          <td v-text="datas.phone_number"></td>
          <td class="text-capitalize">
            <button
              type="button"
              :class="['btn', 'text-nowrap']"
              :style="
                {
                  approved: { backgroundColor: '#E9FAEF', color: '#24D164' },
                  pending: {
                    backgroundColor: 'rgb(255 227 234)',
                    color: '#FF3B30',
                  },
                  rejected: { backgroundColor: '#FFEFE7', color: '#FF9F0A' },
                }[datas.status]
              "
            >
              {{ datas.status.charAt(0).toUpperCase() + datas.status.slice(1) }}
            </button>
          </td>
          <td>
            <div class="action-wrapper">
              <i class="bi bi-three-dots dot-icon"></i>

              <div v-if="hoverRow === index" class="action-menu">
                <button
                  type="button"
                  class="btn text-nowrap border-0"
                  v-on:click="confirmed(datas.id)"
                >
                  Re-Activate
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-if="!isLoading">
          <td colspan="7" class="text-danger text-center">
            {{ "Data Not Found!" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getCandidatesData?.length >= 10"
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

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>

<script>
import axios from "axios";
import Loader from "../Loader/Loader.vue";
import ConfirmationAlert from "../Alerts/ConfirmationAlert.vue";
import Swal from "sweetalert2";
export default {
  name: "InActiveCandidate",
  data() {
    return {
      getCandidatesData: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      totalCount: 0,
      isLoading: false,
      isModalVisible: false,
      hoverRow: null,
      confirmMessage: "",
      confirmCallback: null,
    };
  },
  components: { Loader, ConfirmationAlert },
  computed: {
    // paginateCandidates() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   return this.getCandidatesData.slice(
    //     startIndex,
    //     startIndex + this.itemsPerPage
    //   );
    // },
    paginateCandidates() {
      return this.getCandidatesData;
    },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
  },
  methods: {
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.getCandidate();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getCandidate();
    },
    async getCandidate() {
      this.isLoading = true;
      try {
        const params = {
          // status_value: "approved",
          activated_value: "false",
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
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    confirmed(id) {
      this.isModalVisible = false;

      this.activeCandidateMethod(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    async activeCandidateMethod(id) {
      this.confirmMessage = "Are you sure want to Re-activate this Staff?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        const response = await axios
          .put(`${VITE_API_URL}/re_activate_candidate/${id}`)
          .then((response) => {
            if (response.data.status === "Success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message,
              });
              // this.inactiveCandidateData = response.data;
              this.getCandidate();
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
  },

  created() {
    this.getCandidate();
  },
};
</script>

<style scoped>
table th.widthSet {
  width: 16%;
}

.table-wrapper {
  overflow-x: auto;
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
