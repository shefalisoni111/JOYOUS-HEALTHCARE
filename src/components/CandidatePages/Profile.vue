<template>
  <div>
    <div class="container-fluid p-0 mt-3">
      <div id="main" class="bg-orange-light">
        <div class="pagetitle d-flex justify-content-between">
          <div class="">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                Dashboard / CANDIDATES /
                <span class="color-fonts">{{ getCandidates.first_name }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div id="main">
        <div class="row">
          <div class="col-12 borderbottom pb-3 pt-1">
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
            <div class="card profile">
              <img
                v-if="getCandidates"
                :src="completeImageUrl"
                class="card-img-top position-relative"
                alt="..."
              />

              <!-- <div class="ribbon"><span>Active</span></div> -->

              <div class="card-body">
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="card-title text-nowrap fw-bold text-capitalize">
                      {{ getCandidates.first_name }}
                    </h6>
                    <span class="text-lowercase"> {{ getCandidates.email }}</span>
                  </div>

                  <div>
                    <!-- <button type="button" class="btn btn-outline-primary">
                      Edit
                    </button> -->
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

                    <div class="d-flex justify-content-between">
                      <h6 class="fs-smaller text-nowrap">Profile View</h6>
                      <label class="switch">
                        <input type="checkbox" id="togBtn" title="check" checked />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mt-3">
                    <div class="d-flex align-items-center">
                      <span
                        ><i class="bi bi-telephone"></i>
                        {{ getCandidates.phone_number }}</span
                      >
                    </div>
                    <button type="button" class="btn btn-outline-primary">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 bg-white">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item d-inline-flex gap-2" role="presentation">
                <button
                  class="btn-css"
                  aria-selected="true"
                  type="button"
                  role="tab"
                  data-bs-toggle="pill"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="selectTab(index)"
                >
                  <router-link
                    class="nav-link"
                    :class="{ active: activeTab === index }"
                    :to="getTabLink(tab)"
                    v-on:click.prevent
                  >
                    <span class="badge bg-success">{{
                      index === 5 ? getCount : ""
                    }}</span>
                    {{ tab.name }}</router-link
                  >
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
    <OverviewEdit />
    <AddRestrictedLocation />
    <AddNotes />
    <!-- <EditRateCard /> -->
    <AddRateCard />
  </div>
</template>

<script>
import axios from "axios";

import Overview from "../CandidatePages/ProfileDetail/Overview.vue";
import Document from "../CandidatePages/ProfileDetail/Document.vue";
import ProfileTabs from "../CandidatePages/ProfileDetail/ProfileTabs.vue";
import Restricted from "../CandidatePages/ProfileDetail/Restricted.vue";
import RateCard from "../CandidatePages/ProfileDetail/RateCard.vue";
import Notes from "../CandidatePages/ProfileDetail/Notes.vue";
import StaffId from "../CandidatePages/ProfileDetail/StaffId.vue";
import CandidateHistory from "../CandidatePages/ProfileDetail/CandidateHistory.vue";
import CandidatePreference from "../CandidatePages/ProfileDetail/CandidatePreference.vue";
import OverviewEdit from "../modals/CandidatePage/OverviewEdit.vue";
import AddRestrictedLocation from "../modals/CandidatePage/AddRestrictedLocation.vue";

import AddRateCard from "../modals/CandidatePage/AddRateCard.vue";
// import EditRateCard from "../modals/CandidatePage/EditRateCard.vue";
import AddNotes from "../modals/CandidatePage/AddNotes.vue";

export default {
  name: "Profile",

  data() {
    return {
      getCandidates: [],
      restrictedShift: [],
      getCount: [],
      getCandidateData: [],

      tabs: [
        { name: "Overview ", component: "Overview" },
        { name: "Documents ", component: "Document" },
        { name: "Profile ", component: "ProfileTabs" },
        { name: "Restricted", component: "Restricted" },
        { name: "Rate Card", component: "RateCard" },
        { name: "Notes", component: "Notes" },
        { name: "Staff ID", component: "StaffId" },
        { name: "Candidate History", component: "CandidateHistory" },
        { name: "Candidate Reference", component: "CandidatePreference" },
      ],
      activeTab: 0,
    };
  },

  components: {
    Overview,
    OverviewEdit,
    Document,
    ProfileTabs,
    Restricted,
    RateCard,
    Notes,
    StaffId,
    CandidateHistory,
    CandidatePreference,
    AddRestrictedLocation,
    AddRateCard,
    // EditRateCard,
    AddNotes,
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
    completeImageUrl() {
      if (this.getCandidates && this.getCandidates.profile_photo) {
        // Concatenate the base URL with the partial API URL
        return `https://logezy.onrender.com${this.getCandidates.profile_photo}`;
      }
      return null;
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

    async getCandidate() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}`
        );

        this.getCandidates = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },

    async GetNotesCount() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidate_notes_count_lists/${this.$route.params.id}`
        );

        this.getCount = response.data.Candidate_notes;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },
  },

  created() {
    this.getCandidate();
    this.GetNotesCount();
  },
};
</script>

<style scoped>
.fs-smaller {
  font-size: smaller;
}
.borderbottom {
  border-bottom: 1px solid #ebe2e2;
}

button.btn-css {
  border: none;
  background: transparent;
}
.profile img::before {
  content: "Active";
}
.accordion-button {
  width: 25%;
  background-color: transparent;
}
ul li a {
  color: #000;
  text-decoration: none;
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
.bg-white {
  border-left: 1px solid #dedede;
}
.bg-orange-light {
  background: #fef8f8;
  background-color: #fdce5e17;
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
