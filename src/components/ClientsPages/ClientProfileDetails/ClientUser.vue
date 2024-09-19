<template>
  <div>
    <span>work in progress..</span>
    <div class="table-wrapper mt-3">
      <!-- <table class="table clientTable">
        <thead>
          <tr>
            
            <th scope="col">#RefCode</th>
            <th scope="col">ClientName</th>
            <th scope="col" style="width: 10%">Jobs</th>
            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="getClientDetail?.length > 0">
          <tr v-for="client in getClientDetail" :key="client.id">
           
            <td v-text="client.ref_code"></td>
            <td>
              <router-link
                class="text-capitalize"
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
              >
                {{ client.first_name }}
              </router-link>
              
            </td>
            <td>
              <span
                v-for="(job, index) in client.job_name"
                :key="index"
                :style="{ backgroundColor: getColor(index) }"
                class="p-1 me-2 pb-1 mt-5 rounded-1"
              >
                {{ job }}

                <template v-if="index !== client.job_name.length - 1"> </template>
              </span>
            </td>

            <td v-text="client.address"></td>

            <td v-text="client.phone_number"></td>

            <td v-text="client.email"></td>

            <td>
             
              <label class="switch">
                <input
                  type="checkbox"
                  id="togBtn"
                  v-model="client.activated"
                  @change="clientStatusChangeMethod(client.id, client.activated)"
                  :checked="client.activated"
                />
                <div class="slider round"></div>
              </label>
            </td>
           
            <td>
              <span
                class="text-white p-1 rounded-1"
                style="font-size: 13px"
                :class="{
                  'bg-success': client.activated,
                  'bg-danger': !client.activated,
                }"
                >{{ client.activated ? "Active" : "No Account" }}</span
              >
            </td>
            <td class="cursor-pointer">
              <button
                type="button"
                class="btn btn-outline-success text-nowrap text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editClient"
                data-bs-whatever="@mdo"
                @click="editClient(client.id)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              &nbsp;&nbsp;
            
              <router-link
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: client.id },
                }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
        
      </table> -->
    </div>
    <!-- <div class="mx-3" style="text-align: right" v-if="getClientDetail.length >= 11">
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
        :disabled="currentPage * itemsPerPage >= getClientDetail.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div> -->

    <SuccessAlert ref="successAlert" />
    <!-- <loader :isLoading="isLoading"></loader> -->
  </div>
</template>
<script>
import axios from "axios";

import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";

export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: false,
    };
  },

  components: { SuccessAlert, Loader },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientDetail.slice(startIndex, endIndex);
    },
  },
  methods: {
    // async createdClient() {
    //   await axios
    //     .get(`${VITE_API_URL}/clients`)
    //     .then((response) => (this.getClientDetail = response.data.data));
    // },
  },
  mounted() {
    // this.createdClient();
  },
};
</script>
<style scoped>
#main {
  transition: all 0.3s;
  height: 100dvh;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.btn-primary {
  border: none;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
.form-check-input {
  border: 2px solid grey;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
.table-wrapper {
  overflow-x: auto;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.job-background-even {
  background-color: lightblue;
}
.job-background-odd {
  background-color: lightgreen;
}
.badge {
  background: #ffc107;
  border-radius: 50%;
  padding: 7px 10px;
}
.bg-detail {
  background-color: #f5841d;
  border-radius: 4px;
  padding: 10px;
  color: #fff;
  letter-spacing: 1px;
  font-weight: bold;
}
a:link {
  color: black;
  text-decoration: none;
}
.clientTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
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
  border: 1px solid #9e9e9e;
  border-radius: 22px;
  color: #607d8b;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}
table th {
  background-color: #ff5f30;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.searchbox {
  width: 100%;
}

@media (max-width: 1120px) {
  .clientTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
