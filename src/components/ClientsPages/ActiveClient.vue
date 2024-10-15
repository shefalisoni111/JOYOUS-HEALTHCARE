<template>
  <div>
    <div class="table-wrapper mt-3">
      <table class="table clientTable">
        <thead>
          <tr>
            <!-- <th scope="col">ID</th> -->
            <th scope="col">#RefCode</th>
            <th scope="col">ClientName</th>
            <th scope="col" style="width: 10%">Jobs</th>
            <th scope="col" style="width: 10%">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="paginateCandidates?.length > 0">
          <tr v-for="client in paginateCandidates" :key="client.id">
            <!-- <td v-text="client.id"></td> -->
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
              <!-- {{ client.first_name }} -->
            </td>
            <td>
              <span
                v-for="(job, index) in client.job_ids"
                :key="job"
                :style="{ backgroundColor: getColor(index) }"
                class="p-1 me-2 pb-1 mt-5 rounded-1"
              >
                {{ getJobName(job) }}

                <template v-if="index !== client.job_ids.length - 1"> </template>
              </span>
            </td>
            <td v-text="client.address"></td>

            <td v-text="client.phone_number"></td>

            <td v-text="client.email"></td>

            <td>
              <!-- <label class="switch" v-if="client.activated == true">
                <input type="checkbox" id="togBtn" checked />
                <div class="slider round"></div>
              </label>
              <label class="switch" v-else>
                <input type="checkbox" id="togBtn" />
                <div class="slider round"></div>
              </label> -->
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
            <!-- <td v-text="client.portal_access"></td> -->
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
              <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
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
        <tbody v-else>
          <tr v-if="!isLoading">
            <td colspan="9" class="text-center text-danger" v-if="!isLoading">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-3" style="text-align: right" v-if="getClientDetail?.length >= 10">
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ getClientDetail.length }} Records Per Page
      </button> -->
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
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }} of {{ totalPages }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
    <EditClientModal
      :clientID="selectedClientID || 0"
      @client-updated="createdClient"
      ref="editClientModalActive"
    />
    <AddClients @client-updated="createdClient" />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import EditClientModal from "../modals/Clients/EditClientModal.vue";
import AddClients from "@/components/modals/Clients/AddClients.vue";
import SuccessAlert from "../Alerts/SuccessAlert.vue";
import Loader from "../Loader/Loader.vue";

export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      options: [],
      isLoading: false,
      client: {
        job_name: ["Job1", "Job2", "Job3", "Job4", "Job5", "Job6"],
      },
      colors: [
        "lightblue",
        "lightgreen",
        "lightyellow",
        "lightcoral",
        "lightskyblue",
        "lightpink",
      ],
    };
  },

  components: { EditClientModal, AddClients, SuccessAlert, Loader },
  computed: {
    paginateCandidates() {
      // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      // const endIndex = startIndex + this.itemsPerPage;
      // return this.getClientDetail.slice(startIndex, endIndex);
      return this.getClientDetail;
    },
    // totalRecordsOnPage() {
    //   return this.paginateCandidates.length;
    // },
    portalAccessText() {
      return this.client.activated ? "Active" : "No Account";
    },
  },
  methods: {
    getJobName(jobId) {
      const job = this.options.find((job) => job.id === jobId);
      return job ? job.name : "";
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.createdClient();
    },
    async changePage(newPage) {
      if (newPage < 1 || newPage > this.totalPages) return;
      this.currentPage = newPage;
      await this.createdClient();
    },
    getColor(index) {
      return this.colors[index % this.colors.length];
    },
    editClient(clientID) {
      this.selectedClientID = clientID;
      // this.$refs.editClientModalActive.getJobTitleMethod();
    },
    clientStatusChangeMethod(id, activated) {
      axios
        .put(`${VITE_API_URL}/update_status/${id}?activated=${activated}`)
        .then((response) => {
          // alert("Staff In-activated successfully!");
          const message = "Client In-activated successfully!";
          this.$refs.successAlert.showSuccess(message);
          // this.inactiveCandidateData = response.data;
          const updatedClient = this.getClientDetail.find((client) => client.id === id);
          if (updatedClient) {
            updatedClient.activated = activated;
          }
          this.createdClient();
        })
        .catch((error) => {
          // console.error("Error deleting candidate:", error);
        });
    },
    // async clientsDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   await axios.delete(`${VITE_API_URL}/clients/` + id).then((response) => {
    //     this.createdClient();
    //   });
    // },
    async getPositionMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async createdClient() {
      this.isLoading = true;
      try {
        const params = {
          filter_value: "all",
          page: this.currentPage,
          per_page: this.itemsPerPage,
        };
        const response = await axios.get(`${VITE_API_URL}/clients`, { params });
        this.getClientDetail = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPages = response.data.total_pages;
        this.totalCount = response.data.clients_count;
      } catch (error) {
        // console.error("Error fetching client data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    await this.createdClient();
    this.getPositionMethod();
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
  .clientTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
