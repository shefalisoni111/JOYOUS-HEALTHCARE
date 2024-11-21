<template>
  <div>
    <div class="row">
      <div class="col-12 wrapper-vacancy">
        <table class="table vacancyTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">#RefCode</th>

              <th scope="col">Site</th>
              <th scope="col">Position</th>
              <th scope="col">Date</th>
              <th scope="col">Shift</th>

              <th scope="col">Assigned</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="getShiftAssignData?.length > 0">
            <tr v-for="data in getShiftAssignData" :key="data.id">
              <td scope="col">{{ data.id }}</td>
              <td scope="col">{{ data.ref_code }}</td>
              <td scope="col">{{ data.site }}</td>
              <td scope="col">{{ data.job_title }}</td>
              <td class="widthDefine">
                <span v-for="(date, index) in data.dates" :key="index">
                  {{ date }}

                  <template v-if="index !== data.dates.length - 1">, </template>
                </span>
              </td>
              <td scope="col">{{ data.site_shift }}</td>
              <td scope="col">{{ data.assigned_vacancy }}</td>
              <td scope="col"></td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="16" class="text-center text-danger">
                {{ "Data Not Found!" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <EditVacancy
            :vacancyId="selectedVacancyId || 0"
            @updateVacancy="createVacancy"
            ref="editShift"
          /> -->

    <!-- <AddVacancy @addVacancy="createVacancy" /> -->
    <!-- <div class="mt-3" style="text-align: right" v-if="getVacancyDetail?.length >= 10">
       
        <button
          class="btn btn-sm btn-primary dropdown-toggle"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(20)">20 Records</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(50)">50 Records</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="setItemsPerPage(100)">100 Records</a>
          </li>
        </ul>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm btn-primary mr-2"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </button>
        &nbsp;&nbsp;
  
        <span>{{ currentPage }}</span>
        &nbsp;&nbsp;
  
        <button
          class="btn btn-sm btn-primary ml-2"
          :disabled="currentPage >= totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div> -->
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import Loader from "../../Loader/Loader.vue";
export default {
  name: "ClientDash",

  data() {
    return {
      getShiftAssignData: [],
      CurrentWekShift: [],
      isLoading: false,
    };
  },
  components: { Loader },
  props: {
    startDate: Date,
    currentView: String,
  },
  watch: {
    startDate: "fetchData",
    currentView: "fetchData",
  },
  methods: {
    async fetchData() {
      const token = localStorage.getItem("token");

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      let startOfRange, endOfRange;

      if (this.currentView === "weekly") {
        const startOfWeek = new Date(this.startDate);
        const dayOfWeek = this.startDate.getDay();

        const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        startOfWeek.setDate(this.startDate.getDate() + diff);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        startOfRange = startOfWeek;
        endOfRange = endOfWeek;
      } else {
        const startOfMonth = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );

        startOfRange = startOfMonth;
        endOfRange = endOfMonth;
      }

      const requestData = {
        date: formatDate(startOfRange),
        filter_type: this.currentView === "weekly" ? "week" : "month",
        status: "applied",
      };
      try {
        const response = await axios.get(`${VITE_API_URL}/assign_and_applied_vacancies`, {
          params: requestData,
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.getShiftAssignData = response.data.vacancies_data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
    // this.currentWeekClientShift();
  },
};
</script>
