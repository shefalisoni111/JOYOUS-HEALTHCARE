<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table reportTable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Code</th>
              <th scope="col" style="width: 153px">Name</th>
              <th scope="col">Site</th>
              <th scope="col">Job</th>
              <th scope="col">Shift Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Client Rate</th>
              <th scope="col">Total Cost</th>
            </tr>
          </thead>
          <tbody v-if="candidateList?.length > 0">
            <tr v-for="(data, index) in candidateList" :key="data.id || index">
              <td scope="col">{{ data.id }}</td>
              <td scope="col">{{ data.code }}</td>
              <td scope="col">{{ data.name }}</td>
              <td scope="col">{{ data.site }}</td>
              <td scope="col">{{ data.job }}</td>
              <td scope="col">{{ data.shift_date }}</td>
              <td scope="col">
                {{ data.start_time }}
              </td>
              <td scope="col">
                {{ data.end_time }}
              </td>
              <td scope="col">
                {{ data.total_hours }}
              </td>
              <td scope="col">
                {{ data.client_rate }}
              </td>
              <td scope="col">
                {{ data.total_cost }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="15" class="text-danger text-center">
                {{ errorMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mx-3 mb-2" style="text-align: right" v-if="candidateList?.length >= 10">
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
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= candidateList?.length"
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
import Loader from "../../Loader/Loader.vue";

export default {
  data() {
    return {
      candidateList: [],
      errorMessage: "",
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: false,
    };
  },
  components: { Loader },
  computed: {},
  methods: {
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.fetWeekTimeSheetData();
    },
    async fetWeekTimeSheetData() {
      this.isLoading = true;
      const currentDate = new Date();

      const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      this.formattedStartDate = formatDate(currentDate);
      try {
        const requestData = {
          date: this.formattedStartDate,
          filter_type: "week",
        };

        const response = await axios.get(
          `${VITE_API_URL}/report_section_timesheet_data`,
          {
            params: requestData,
            per_page: this.itemsPerPage,
          }
        );
        if (response.data.message) {
          this.errorMessage = response.data.message;
          this.candidateList = [];
        } else {
          this.candidateList = response.data.timesheets;

          this.errorMessage =
            this.candidateList.length === 0 ? "Data Not Found for the specified Week" : "";
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.fetWeekTimeSheetData();
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
  height: 100vh;
  padding-top: 65px;
  background-color: #fdce5e17;
}
.reportTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
