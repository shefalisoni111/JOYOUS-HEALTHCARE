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
        <div class="container-fluid p-0 mt-3" v-if="getClientDatas">
          <div id="main" class="bg-orange-light">
            <div class="pagetitle d-flex justify-content-between px-5">
              <div class="">
                <!-- <ol class="breadcrumb mb-1">
                  <li class="breadcrumb-item active text-uppercase fs-6">
                    <router-link
                      class="nav-link d-inline"
                      aria-current="page"
                      to="/home"
                      >Dashboard</router-link
                    >
                    /
                    <router-link
                      class="text-capitalize text-decoration-underline"
                      style="color: #595b5b"
                      :to="{
                        name: 'AllClient',
                      }"
                      >CLIENT</router-link
                    >
                    /
                    <span class="color-fonts">{{
                      getClientDatas.client_name
                    }}</span>
                  </li>
                </ol> -->
                <ol class="breadcrumb mb-1">
                  <li class="breadcrumb-item active">
                    <a
                      class="nav-link d-inline fs-4 fw-bolder"
                      style="color: #000000"
                      >All Clients</a
                    >
                    <p>
                      <router-link
                        class="nav-link d-inline fw-bolder"
                        style="color: #000000"
                        aria-current="page"
                        to="/client-list"
                        >Client</router-link
                      >
                      / Site / Rated and rules
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3 ps-3 ms-4">
          <router-link
            class="nav-link d-inline text-muted"
            style="color: #000000"
            aria-current="page"
            to="/client-list"
            ><i class="bi bi-arrow-left"></i> Back to list</router-link
          >
        </div>
        <div class="">
          <div id="main">
            <!-- <div class="row px-5">
              <div class="col-12 pb-3 pt-1">
                <div class="float-start">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="previousTab"
                    v-show="hasPreviousTab"
                  >
                    <i class="bi bi-caret-left-fill"></i>Previous
                  </button>
                </div>
                <div class="float-end">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    @click="nextTab"
                    v-show="hasNextTab"
                  >
                    Next <i class="bi bi-caret-right-fill"></i>
                  </button>
                </div>
              </div>
            </div> -->
            <div class="row px-5">
              <div class="d-flex gap-4 justify-content-between">
                <div class="col-md-7" style="border-radius: 12px">
                  <div
                    class="card profile position-relative"
                    style="border-radius: 20px"
                  >
                    <h6
                      class="position-absolute p-2 z-1 text-white text-capitalize tag"
                      style="background: #68a325; margin-left: -7px"
                    >
                      {{ getClientDatas?.activated ? "Active" : "In-Active" }}
                    </h6>
                    <img
                      src="./location.jpg"
                      class="card-img-top position-relative"
                      height="219"
                      alt="..."
                      loading="eager"
                    />

                    <!-- <div class="ribbon"><span>Active</span></div> -->
                    <div>
                      <div class="">
                        <div class="col-12 p-3">
                          <h4
                            class="card-title text-nowrap fw-bold text-capitalize"
                          >
                            {{ getClientDatas?.client_name }}
                          </h4>
                          <span>
                            <img
                              src="../../assets/location.png"
                              class="img-fluid pe-2"
                              alt="RecPal"
                              loading="eager"
                            />
                            {{ getClientDatas?.address }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <ul
                      class="nav nav-pills ps-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li
                        class="nav-item d-inline-flex gap-3"
                        role="presentation"
                      >
                        <button
                          class="nav-link px-0"
                          :class="{ active: activeTab === index }"
                          aria-selected="true"
                          type="button"
                          role="tab"
                          data-bs-toggle="pill"
                          v-for="(tab, index) in tabs"
                          :key="index"
                          @click="selectTab(index)"
                        >
                          <img :src="tab.image" class="" />
                          {{ tab.name }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-5 bg-white px-3" style="border-radius: 12px">
                  <div class="card-body">
                    <h6 class="text-muted fw-semibold mb-3 mt-4">Details</h6>

                    <!-- Name -->
                    <div class="detail-row">
                      <div class="icon-box">
                        <i class="bi bi-person-fill"></i>
                      </div>
                      <div class="flex-grow-1">
                        {{ getClientDatas?.client_name }}
                      </div>
                      <button
                        class="edit-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#editClientName"
                        data-bs-whatever="@mdo"
                        @click="editClient(getClientDatas?.id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                    </div>

                    <!-- Email -->
                    <div class="detail-row">
                      <div class="icon-box">
                        <i class="bi bi-envelope-fill"></i>
                      </div>
                      <div class="flex-grow-1">{{ getClientDatas?.email }}</div>
                      <button
                        class="edit-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#editClientEmail"
                        data-bs-whatever="@mdo"
                        @click="editClientEmail(getClientDatas?.id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                    </div>

                    <!-- Phone -->
                    <div class="detail-row">
                      <div class="icon-box">
                        <i class="bi bi-telephone-fill"></i>
                      </div>
                      <div class="flex-grow-1">
                        {{ getClientDatas?.phone_number }}
                      </div>
                      <button
                        class="edit-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#editClientContact"
                        data-bs-whatever="@mdo"
                        @click="editClientContact(getClientDatas?.id)"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                    </div>

                    <!-- Address -->
                    <div class="detail-row">
                      <div class="icon-box">
                        <i class="bi bi-geo-alt-fill"></i>
                      </div>
                      <div class="flex-grow-1">
                        {{ getClientDatas?.address }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 px-5">
              <div
                class="col-12 bg-white pt-4"
                style="height: 100vh; border-radius: 12px"
              >
                <div class="tab-content">
                  <component
                    :is="activeComponent"
                    :options="options"
                  ></component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditSingleClientEmail
      :clientID="selectedClientID || 0"
      ref="emailClientEmail"
      @client-updatedEmail="getClientMethod"
    />
    <EditSingleClientContact
      :clientID="selectedClientID || 0"
      ref="emailClientContact"
      @client-updatedContact="getClientMethod"
    />
    <EditSingleClientName
      :clientID="selectedClientID || 0"
      ref="UpdateClientName"
      @client-updatedName="getClientMethod"
    />
  </div>
</template>

<script>
import axios from "axios";

import ActiveLocation from "../ClientsPages/ClientProfileDetails/ActiveLocation.vue";
import PassiveLocation from "../ClientsPages/ClientProfileDetails/PassiveLocation.vue";
import ClientJobs from "../ClientsPages/ClientProfileDetails/ClientJobs.vue";
import ClientWTR from "../ClientsPages/ClientProfileDetails/ClientWTR.vue";
import ClientNotes from "../ClientsPages/ClientProfileDetails/ClientNotes.vue";
import ClientSetting from "../ClientsPages/ClientProfileDetails/ClientSetting.vue";
import ClientUser from "../ClientsPages/ClientProfileDetails/ClientUser.vue";
import EditSingleClientEmail from "../modals/Clients/EditSingleClientEmail.vue";
import EditSingleClientContact from "../modals/Clients/EditSingleClientContact.vue";
import EditSingleClientName from "../../components/modals/Clients/EditSingleClientName.vue";
import Navbar from "../Navbar.vue";
import activeLocations from "../../assets/activelocation.png";
import jobs from "../../assets/jobs.png";
import notes from "../../assets/notes.png";
import settings from "../../assets/setting.png";

export default {
  name: "SingleClientProfile",
  data() {
    return {
      getClientDatas: [],
      selectedClientID: null,
      tabs: [
        {
          name: "Active Location ",
          component: "ActiveLocation",
          image: activeLocations,
        },
        // { name: "Passive Location ", component: "PassiveLocation" },
        {
          name: "Jobs ",
          component: "ClientJobs",
          image: jobs,
        },
        // { name: "WTR", component: "ClientWTR" },
        {
          name: "Notes",
          component: "ClientNotes",
          image: notes,
        },
        {
          name: "Setting",
          component: "ClientSetting",
          image: settings,
        },
        {
          name: "User",
          component: "ClientUser",
          image: activeLocations,
        },
      ],
      activeTab: 0,
      options: [],
    };
  },
  components: {
    ActiveLocation,
    activeLocations,
    PassiveLocation,
    EditSingleClientName,
    ClientJobs,
    ClientWTR,
    ClientNotes,
    ClientSetting,
    Navbar,
    ClientUser,
    EditSingleClientContact,
    EditSingleClientEmail,
  },

  props: ["id"],
  computed: {
    selectJobTitle() {
      const job = this.options.find((option) => option.id === this.job_id);
      return job ? job.name : "";
    },
    userId() {
      return this.id;
    },
    activeComponent() {
      return this.tabs[this.activeTab].component;
    },
    hasPreviousTab() {
      return this.activeTab > 0;
    },
    hasNextTab() {
      return this.activeTab < this.tabs.length - 1;
    },
  },

  methods: {
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
    editClient(clientID) {
      this.$refs.UpdateClientName.fetchClientsMethod(clientID);
    },
    editClientEmail(clientID) {
      // this.selectedClientID = clientID;
      this.$refs.emailClientEmail.fetchClientsMethod(clientID);
    },
    editClientContact(clientID) {
      // this.selectedClientID = clientID;

      this.$refs.emailClientContact.fetchClientsMethod(clientID);
    },
    getTabLink(tab) {
      return { name: tab.component, params: { id: this.$route.params.id } };
    },
    selectTab(index) {
      this.activeTab = index;
    },
    nextTab() {
      if (this.activeTab < this.tabs.length - 1) {
        this.activeTab++;
      }
    },
    previousTab() {
      if (this.activeTab > 0) {
        this.activeTab--;
      }
    },

    async getClientMethod() {
      if (!this.$route.params.id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}`
        );

        this.getClientDatas = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            this.getClientDatas = null;
          }
        } else {
          this.getClientDatas = null;
        }
      }
    },
  },

  async mounted() {
    await this.getClientMethod();
    this.getPositionMethod();
  },
};
</script>

<style scoped>
h6.tag:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 0px;
  top: 100%;
  border-width: 5px 4px;
  border-style: solid;
  border-color: #666 #666 transparent transparent;
}
.fs-smaller {
  font-size: smaller;
}

.accordion-button {
  width: 25%;
  background-color: transparent;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  border: none;
  background: transparent;
  box-shadow: none;
}
.profile {
  border-top: 1px solid transparent;
}
#main {
  transition: all 0.3s;

  transition: all 0.3s;
}
.detail-row {
  padding: 20px 0;
}
.card ul li {
  display: inline-block;
}

table th {
  font-size: 14px;
}

.border-box {
  border: 1px solid lightgrey;
  padding: 12px;
  border-radius: 4px;
}
.card .round {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 7px;
  margin-right: 8px;
}

.card .hround {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 11px;
  margin-right: 8px;
}
.card .dround {
  background: #ff572266;
  border-radius: 50%;
  padding: 12px 17px;
  margin-right: 8px;
}

.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.switch input {
  display: none;
}
.form-check-input {
  border: 2px solid grey;
}
.btn-primary {
  border: none;
}

.expanded {
  transform: rotate(90deg);
}
</style>
