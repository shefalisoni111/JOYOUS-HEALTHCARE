<template>
  <div>
    <!-- <span>work in progress..</span> -->
    <button
      type="button"
      class="btn btn-outline-success text-nowrap"
      data-bs-toggle="modal"
      data-bs-target="#addClientUser"
      data-bs-whatever="@mdo"
    >
      + Add Client User
    </button>
    <div class="table-wrapper mt-3">
      <table class="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="getClientUser?.length > 0">
          <tr v-for="data in getClientUser" :key="data.id">
            <td>{{ data.email }}</td>
            <td>{{ data.password }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editClientUser"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3" class="text-danger text-center mt-2" v-if="!isLoading">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div v-if="getClientUser?.length > 0">
      <div class="card mt-2" v-for="data in getClientUser" :key="data.id">
        <div class="card-header">
           <router-link
          :to="{ name: 'SingleSiteprofile' }"
          class="text-decoration-none text-black"
          >Hospital 1</router-link
        > 
        </div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <div class="card-text d-flex gap-3">
           <div class="mt-3">
              <router-link :to="{ name: 'SingleSiteprofile', params: { id: data.id } }">
                <span class="rounded-circle p-3 text-decoration-none text-black">{{
                  getFirstCharAndNumber(data.site_name)
                }}</span></router-link
              >
            </div> 
            <div class="">
              <span>{{ data.email }}</span
              ><br />
              <span>{{ data.password }}</span
              ><br />
             <span>{{ data.address }}</span
              > 
              <br />
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary mt-3 text-nowrap text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#editClientSite"
            data-bs-whatever="@mdo"
            @click="editsiteId(data.id)"
          >
            Edit
          </button>
        </div>
      </div>
    </div> -->

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
    <EditClientUserVue
      :ClientUserId="selectedClientUserID || 0"
      @updatedUser="createdClientUser"
    />
    <AddClientUser @addUser="createdClientUser" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";

import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";
import EditClientUserVue from "../../modals/Clients/EditClientUser.vue";
import AddClientUser from "../../modals/Clients/AddClientUser.vue";

export default {
  data() {
    return {
      getClientUser: [],
      selectedClientUserID: null,
      isActive: true,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: false,
    };
  },

  components: { SuccessAlert, Loader, EditClientUserVue, AddClientUser },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientUser.slice(startIndex, endIndex);
    },
  },
  methods: {
    editsiteId(ClientUSerID) {
      this.selectedClientUserID = ClientUSerID;
    },
    async createdClientUser() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${VITE_API_URL}client_users?client_id=${this.$route.params.id}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // this.getClientUser = response.data.data || [];
        if (response.data.data) {
          this.getClientUser = response.data.data;
        } else {
          this.getClientUser = [];
        }
        // await this.$refs.addClientUserRef.getClientFetchSiteMethod();
      } catch (error) {
        this.getClientUser = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.createdClientUser();
    // this.getClientFetchSiteMethod();
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
