<template>
  <div>
    <div id="main" class="main d-flex">
      <div class=""><Navbar /></div>
      <div class="col-12 p-4">
        <div class="container-fluid p-0 mt-3">
          <div id="main" class="bg-orange-light">
            <div class="pagetitle d-flex justify-content-between">
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
                        name: 'AllSite',
                      }"
                      >SITE</router-link
                    >
                    /
                    <span class="color-fonts">{{
                      getSiteDatas.client_name
                    }}</span
                    >/ <span>{{ getSiteDatas.site_name }}</span>
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
                      Client /
                      <router-link
                        class="nav-link d-inline fw-bolder"
                        style="color: #000000"
                        aria-current="page"
                        to="/SiteLists"
                        >Site</router-link
                      >
                      / Rated and rules
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <div id="main">
            <div class="row">
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
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="card profile position-relative">
                  <h6
                    class="position-absolute p-2 z-1 text-white text-capitalize tag"
                    style="background: #68a325; margin-left: -7px"
                  >
                    {{ getSiteDatas.status ? "Active" : "In-Active" }}
                  </h6>
                  <img
                    src="../location.jpg"
                    class="card-img-top position-relative"
                    height="317"
                    alt="..."
                    loading="eager"
                  />

                  <!-- <div class="ribbon"><span>Active</span></div> -->
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li
                      class="nav-item d-inline-flex gap-2"
                      role="presentation"
                    >
                      <button
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
                  </ul>
                  <div class="tab-content">
                    <component :is="activeComponent"></component>
                  </div>
                </div>
              </div>
              <div class="col-md-3 bg-white">
                <div class="card-body">
                  <div
                    class="mt-3 d-flex justify-content-between align-items-top"
                  >
                    <div>
                      <h6>Reference Code : {{ getSiteDatas.refer_code }}</h6>
                      <h4>{{ getSiteDatas.site_name }}</h4>
                      <h6>Email : {{ getSiteDatas.email }}</h6>
                      <h6>Address : {{ getSiteDatas.address }}</h6>
                      <h6>Mobile : {{ getSiteDatas.phone_number }}</h6>
                      <h6 class="text-capitalize">
                        Contact person's name:
                        {{
                          getSiteDatas.contact_person_name
                            ? getSiteDatas.contact_person_name
                            : "Null"
                        }}
                      </h6>
                      <h6>
                        Contact person's email:
                        {{
                          getSiteDatas.contact_person_email
                            ? getSiteDatas.contact_person_email
                            : "Null"
                        }}
                      </h6>
                      <h6>
                        Contact person's number:
                        {{
                          getSiteDatas.contact_person_number
                            ? getSiteDatas.contact_person_number
                            : "Null"
                        }}
                      </h6>
                      <h6>
                        Bookings email:
                        {{
                          getSiteDatas.booking_email
                            ? getSiteDatas.booking_email
                            : "Null"
                        }}
                      </h6>
                    </div>
                    <div>
                      <!-- <h6 class="card-title text-nowrap fw-bold text-capitalize">
                    {{ getSiteDatas.site_name }}
                  </h6> -->
                      <span class="text-lowercase"> </span>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="btn btn btn-primary text-nowrap text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#editSiteProfileDetails"
                        data-bs-whatever="@mdo"
                        @click="editSite(getSiteDatas.id)"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <hr />

                  <div
                    class="mt-3 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6
                        class="card-title text-nowrap fw-bold text-capitalize"
                      >
                        Visit Us at:
                      </h6>
                      Address:
                      <span class="text-lowercase">{{
                        getSiteDatas.address
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditSiteProfileEmailContactNumberDetails
      :siteID="selectedSiteID || 0"
      @site-updatedProfileDetails="getSiteMethod"
      ref="editSiteProfileEmailContact"
    />
  </div>
</template>

<script>
import axios from "axios";

import RateInvoiceSettings from "../SingleSiteProfilePages/RateInvoiceSettings.vue";
import CustomHolidays from "../SingleSiteProfilePages/CustomHolidays.vue";
import RestrictedCandidates from "../SingleSiteProfilePages/RestrictedCandidates.vue";
import ShiftSettings from "../SingleSiteProfilePages/ShiftSettings.vue";
import SiteNotes from "../SingleSiteProfilePages/SiteNotes.vue";
import EditSiteProfileEmailContactNumberDetails from "../../modals/Site/EditSiteProfileEmailContactNumberDetails.vue";
import Navbar from "../../Navbar.vue";

export default {
  name: "SingleClientProfile",
  data() {
    return {
      getClientDatas: [],
      getSiteDatas: [],
      selectedSiteID: null,
      tabs: [
        { name: "Rate & Invoice Settings ", component: "RateInvoiceSettings" },
        { name: "Custom Holidays", component: "CustomHolidays" },
        { name: "Shift Settings ", component: "ShiftSettings" },
        { name: "Restricted Staff", component: "RestrictedCandidates" },
        { name: "Notes", component: "SiteNotes" },
      ],
      activeTab: 0,
    };
  },
  components: {
    RateInvoiceSettings,
    CustomHolidays,
    RestrictedCandidates,
    ShiftSettings,
    SiteNotes,
    EditSiteProfileEmailContactNumberDetails,
    Navbar,
  },

  props: ["id"],
  computed: {
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
    editSite(siteID) {
      this.selectedSiteID = siteID;
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

    // async getClientMethod() {
    //   if (!this.$route.params.id) {
    //     return;
    //   }
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL.replace(/\/$/, "")}/clients/${this.$route.params.id}`
    //     );

    //     this.getClientDatas = response.data.data;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     } else {
    //       // console.error("Error fetching candidates:", error);
    //     }
    //   }
    // },
    async getSiteMethod() {
      if (!this.$route.params.id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL.replace(/\/$/, "")}/sites/${this.$route.params.id}`
        );

        this.getSiteDatas = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // await vm.getClientMethod();
      await vm.getSiteMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.getClientMethod();
    this.getSiteMethod();
    next();
  },
  mounted() {
    // this.getClientMethod();
    this.getSiteMethod();
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
  border-radius: 0px;
  border-top: 1px solid transparent;
}
#main {
  transition: all 0.3s;

  transition: all 0.3s;
}

.card ul li {
  display: inline-block;
}

table th {
  font-size: 14px;
}
.card {
  border-radius: 0px;
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
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
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
.switch .slider {
  position: absolute;
  top: -3;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 3px 10px;
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

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;

  border-bottom: 3px solid #ff5722;
  border-radius: 0px;
  background-color: transparent;
}
.nav-pills .nav-link {
  color: grey;
}
ul.nav-pills {
  border-bottom: 1px solid grey;
}
.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}

.accordion-item {
  margin-bottom: 8px;
}

.accordion-header {
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}

.accordion-icon {
  font-size: 16px;
  transition: transform 0.3s;
}

.expanded {
  transform: rotate(90deg);
}
</style>
