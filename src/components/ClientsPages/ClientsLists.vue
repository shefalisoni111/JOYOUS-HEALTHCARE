<template>
  <div>
    <div id="main" class="main d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid">
        <div
          class="row px-5 pt-5 pb-5 justify-content-center col-11 col-sm-11 col-md-11 col-lg-11 col-xl-12 col-xxl-12"
        >
          <div class="d-flex justify-content-between px-2">
            <div class="">
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item active">
                  <a class="nav-link d-inline fs-4 fw-bolder" style="color: #000000"
                    >All Clients</a
                  >
                  <p>
                    <router-link
                      class="nav-link d-inline fw-bolder"
                      style="color: #000000"
                      aria-current="page"
                      to="/ClientsLists"
                      >Client</router-link
                    >
                    / Site / Rated and rules
                  </p>
                </li>
              </ol>
            </div>
            <div class="d-flex align-items-center">
              <button
                v-if="activeTab === 0"
                type="button"
                class="btn btn-lg text-nowrap btn-bg-color"
                data-bs-toggle="modal"
                data-bs-target="#addClients"
                data-bs-whatever="@mdo"
                @click="handleAddClient"
              >
                + Add Client
              </button>
            </div>
          </div>
          <div class="p-0 bg-define"></div>

          <div class="">
            <div class="row">
              <div class="col-12">
                <div class="">
                  <div>
                    <div class="mb-2 d-flex justify-content-between">
                      <ul
                        class="nav nav-pills mb-3 d-flex justify-content-between ps-0 py-0"
                        id="pills-tab"
                        role="tablist"
                      >
                        <div class="d-flex">
                          <li
                            class="nav-item d-flex align-items-center gap-2"
                            role="presentation"
                          >
                            <button
                              a
                              class="nav-link"
                              :class="{ active: activeTab === index }"
                              aria-selected="true"
                              type="button"
                              role="tab"
                              data-bs-toggle="pill"
                              v-for="(tab, index) in tabs"
                              :key="index"
                              @click="selectTab(index)"
                            >
                              {{ tab.name }}
                            </button>
                          </li>
                        </div>
                      </ul>
                    </div>

                    <div v-if="!searchQuery">
                      <component
                        :is="tabs[activeTab].component"
                        :errorMessageFilter="errorMessageFilter"
                        :clientData="clientData"
                        :options="options"
                      ></component>
                    </div>

                    <div v-if="searchQuery">
                      <table class="table clientTable">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">#RefCode</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Jobs</th>
                            <th scope="col">Address</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Portal Access</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="paginateSearchResults?.length > 0">
                          <tr v-for="client in paginateSearchResults" :key="client.id">
                            <td v-text="client.id"></td>
                            <td v-text="client.ref_code"></td>
                            <td>
                              <router-link
                                class="text-capitalize"
                                :to="{
                                  name: 'SingleClientProfile',
                                  params: { id: client.id },
                                }"
                              >
                                {{ client.client_name }}
                              </router-link>
                              <!-- {{ client.client_name }} -->
                            </td>
                            <td>
                              <span
                                v-for="(job, index) in client.jobs"
                                :key="job.job_id"
                                :style="{ backgroundColor: getColor(index) }"
                                class="p-1 me-2 pb-1 mt-5 rounded-1"
                              >
                                {{ job.job_name }}

                                <template v-if="index !== client.jobs.length - 1">
                                </template>
                              </span>
                            </td>
                            <td v-text="client.address"></td>

                            <td v-text="client.phone_number"></td>

                            <td v-text="client.email"></td>

                            <td>
                              <label class="switch" v-if="client.activated == true">
                                <input type="checkbox" id="togBtn" checked />
                                <div class="slider round"></div>
                              </label>
                              <label class="switch" v-else>
                                <input type="checkbox" id="togBtn" />
                                <div class="slider round"></div>
                              </label>
                            </td>
                            <td v-text="client.portal_access"></td>
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
                                  class="bi bi-trash border-0 border-0"
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
                          <tr>
                            <td colspan="10" class="text-danger text-center">
                              {{ " No candidates found for the specified criteria" }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="totalCount > 0">
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      &nbsp;&nbsp;
      <span>{{ currentPage }}</span>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <EditClientModal
      :clientID="selectedClientID || 0"
      @client-updated="createdClient"
      :options="options"
    />
  </div>
</template>
<script>
import axios from "axios";
import AllClient from "../ClientsPages/AllClient.vue";
import AddClients from "@/components/modals/Clients/AddClients.vue";
import InActiveClient from "../ClientsPages/InActiveClient.vue";
import ActiveClient from "./ActiveClient.vue";
import EditClientModal from "../modals/Clients/EditClientModal.vue";
import Navbar from "../Navbar.vue";

export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      clientData: [],
      options: [],
      debounceTimeout: null,
      searchResults: [],
      errorMessageFilter: "",

      errorMessage: "",

      tabs: [
        { name: "All Clients", component: "AllClient", routeName: "AllClient" },

        {
          name: "Active ",
          component: "ActiveClient",
          routeName: "ActiveClient",
        },
        {
          name: "InActive ",
          component: "InActiveClient",
          routeName: "InActiveClient",
        },
      ],
      activeTab: 0,
      activeTabName: "",
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      totalCount: 0,
      errorMessageFilter: false,
      selectedClientStatus: "",
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

  computed: {
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },

    selectJobTitle() {
      const job = this.options.find((option) => option.id === this.job_id);
      return job ? job.name : "";
    },
    totalRecordsOnPage() {
      return this.paginateSearchResults.length;
    },
  },
  components: {
    AllClient,
    InActiveClient,
    ActiveClient,
    EditClientModal,
    AddClients,
    Navbar,
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
          } else {
          }
        } else {
        }
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },

    editClient(clientID) {
      this.selectedClientID = clientID;
    },
    getColor(index) {
      return this.colors[index % this.colors.length];
    },
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

    changePage(page) {
      this.currentPage = page;
      this.filterData();
    },

    setActiveTabFromRoute() {
      const currentRouteName = this.$route.name;
      const matchingTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === currentRouteName
      );

      if (matchingTabIndex !== -1) {
        this.selectTab(matchingTabIndex);
      }
    },

    setActiveTabNameOnLoad() {
      this.activeTabName = this.tabs[this.activeTab].name;
    },
    selectTab(index) {
      this.activeTab = index;
      this.activeTabName = this.tabs[index].name;
      this.$router.push({ name: this.tabs[index].routeName });
    },
    async createdClient() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`, {
          params: {
            page: this.currentPage,
          },
        });
        this.getClientDetail = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPages = response.data.total_pages;
        this.totalCount = response.data.clients_count;
      } catch (error) {
        // console.error('Error fetching client data:', error);
      }
    },
  },
  async mounted() {
    this.setActiveTabFromRoute();
    this.setActiveTabNameOnLoad();
    this.createdClient();
    this.getClientMethod();
    this.getPositionMethod();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const matchingTabIndex = vm.tabs.findIndex((tab) => tab.routeName === to.name);

      if (matchingTabIndex !== -1) {
        vm.activeTab = matchingTabIndex;
        vm.activeTabName = vm.tabs[matchingTabIndex].name;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const matchingTabIndex = this.tabs.findIndex((tab) => tab.routeName === to.name);

    if (matchingTabIndex !== -1) {
      this.activeTab = matchingTabIndex;
      this.activeTabName = this.tabs[matchingTabIndex].name;
    }

    next();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #f9f9f9;
}
.btn-primary {
  border: none;
}
ul.nav-pills {
  border-bottom: none !important;
  height: auto !important;
  margin-bottom: 0px !important;
}
ul.nav-pills .nav-item {
  background: #ffffff;
  padding: 5px 10px 5px 10px;
  border-radius: 50px;
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
.btn-bg-color {
  background: rgb(82 115 45);
  color: rgb(255, 255, 255);
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

.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background: #000000 !important;
  width: 100;
  height: 37;
  color: #fff !important;
  border-radius: 13px;
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 11px;
  padding-left: 15px;
  border-bottom: none !important;
}

.nav-link,
.nav-link:hover,
.nav-link:focus {
  color: #667085;
}
.nav-pills {
  background: #f8f8ff;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
}
table th {
  background-color: #ffffff;
  color: #667085;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

input.form-control,
input.form-control:focus {
  width: 100%;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
}

a {
  color: black;
  text-decoration: none;
}

select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
}
</style>
