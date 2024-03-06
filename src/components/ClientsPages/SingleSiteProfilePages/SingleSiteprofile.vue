<template>
  <div>
    <div class="container-fluid p-0 mt-3">
      <div id="main" class="bg-orange-light">
        <div class="pagetitle d-flex justify-content-between">
          <div class="">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                /
                <a
                  class="text-capitalize text-decoration-underline"
                  style="color: #595b5b"
                  >CLIENT</a
                >
                /
                <span class="color-fonts">Client Name</span>/ <span>Hospital 1</span>
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
          <div class="col-md-3">
            <div class="card profile position-relative">
              <h6
                class="position-absolute p-2 z-1 text-white text-capitalize"
                style="background: #68a325"
              >
                Active
              </h6>
              <img
                src="./location.jpg"
                class="card-img-top position-relative"
                height="317"
                alt="..."
              />

              <!-- <div class="ribbon"><span>Active</span></div> -->

              <div class="card-body">
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-nowrap fw-bold text-capitalize">
                      {{ getClientDatas.first_name }}
                    </h6>
                    <span class="text-lowercase"> {{ getClientDatas.email }}</span>
                  </div>

                  <div>
                    <button type="button" class="btn btn-primary">Edit</button>
                  </div>
                </div>
                <hr />
                <div class="mt-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="card-title text-uppercase fs-smaller text-nowrap">
                        contact information
                      </h6>
                    </div>

                    <!-- <div class="d-flex justify-content-between">
                        <h6 class="fs-smaller text-nowrap">Profile View</h6>
                        <label class="switch">
                          <input type="checkbox" id="togBtn" title="check" checked />
                          <div class="slider round"></div>
                        </label>
                      </div> -->
                  </div>

                  <div class="d-flex justify-content-between mt-3">
                    <div class="d-flex align-items-center">
                      <span
                        ><i class="bi bi-telephone"></i>
                        {{ getClientDatas.phone_number }}</span
                      >
                    </div>
                    <button type="button" class="btn btn-primary">Edit</button>
                  </div>
                </div>
                <hr />
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-nowrap fw-bold text-capitalize">
                      Visit Us at:
                    </h6>
                    Address:
                    <span class="text-lowercase">{{ getClientDatas.address }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 bg-white">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item d-inline-flex gap-2" role="presentation">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import RateInvoiceSettings from "../SingleSiteProfilePages/RateInvoiceSettings.vue";
import CustomHolidays from "../SingleSiteProfilePages/CustomHolidays.vue";
import ClientJobs from "../SingleSiteProfilePages/ClientJobs.vue";
import ClientWTR from "../SingleSiteProfilePages/ClientWTR.vue";
import ClientNotes from "../SingleSiteProfilePages/ClientNotes.vue";
import ClientSetting from "../SingleSiteProfilePages/ClientSetting.vue";
import ClientUser from "../SingleSiteProfilePages/ClientUser.vue";

export default {
  name: "SingleClientProfile",
  data() {
    return {
      getClientDatas: [],

      tabs: [
        { name: "Rate & Invoice Settings ", component: "ActiveLocation" },
        { name: "Custom Holidays", component: "PassiveLocation" },
        { name: "Shift Settings ", component: "ClientJobs" },
        { name: "Restricted Candidates", component: "ClientWTR" },
        { name: "Notes", component: "ClientNotes" },
      ],
      activeTab: 0,
    };
  },
  components: {
    ActiveLocation,
    PassiveLocation,
    ClientJobs,
    ClientWTR,
    ClientNotes,
    ClientSetting,
    ClientUser,
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
      try {
        const response = await axios.get(
          `${VITE_API_URL}/clients/${this.$route.params.id}`
        );

        this.getClientDatas = response.data.data;
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

  mounted() {
    this.getClientMethod();
  },
};
</script>

<style scoped>
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
  padding: 10px;
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
