<template>
  <div>
    <div id="main" class="main">
      <div class="row p-5">
        <div class="pagetitle d-flex justify-content-between">
          <div class="">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a class="nav-link d-inline fs-4 fw-bolder" style="color: #000000"
                  >All Staff</a
                >
                <p>
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/staff-list"
                    >All Staff</router-link
                  >
                  / Staff Availability
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div class="row mb-3 ps-3">
          <router-link
            class="nav-link d-inline text-muted"
            style="color: #000000"
            aria-current="page"
            to="/staff-list"
            ><i class="bi bi-arrow-left"></i> Back to list</router-link
          >
        </div>

        <div class="row mb-3">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item d-lg-inline-flex gap-4 d-in" role="presentation">
              <button
                class="nav-link px-0 btn-css"
                :to="`/${tab.routeName}`"
                aria-selected="true"
                type="button"
                role="tab"
                data-bs-toggle="pill"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectTab(index)"
              >
                <router-link
                  class="nav-link p-0"
                  :class="{ active: activeTab === index }"
                  :to="getTabLink(tab)"
                >
                  <img :src="tab.image" class="" />
                  {{ tab.name }}
                </router-link>
              </button>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card profile position-relative">
              <h6
                class="position-absolute p-2 z-1 text-white text-capitalize tag"
                :style="{
                  background:
                    getCandidates.status === 'approved'
                      ? '#68a325'
                      : getCandidates.status === 'rejected'
                      ? '#dc3545'
                      : getCandidates.status === 'pending'
                      ? '#ffc107'
                      : '#6c757d',
                  marginLeft: '-7px',
                }"
              >
                {{
                  getCandidates.status === "approved" ? "Active" : getCandidates.status
                }}
              </h6>
              <img
                v-if="getCandidates && getCandidates.profile_photo"
                :src="completeImageUrl"
                class="card-img-top position-relative"
                height="400px"
                alt="profile"
                loading="eager"
                :style="{ visibility: isImageLoaded ? 'visible' : 'hidden' }"
                @load="onImageLoad"
              />
              <img
                v-else
                src="./userprofile.png"
                class="card-img-top position-relative"
                style="border: 1px solid #8080801a"
                height="400px"
                alt="Default profile"
                loading="eager"
                :style="{ visibility: isImageLoaded ? 'visible' : 'hidden' }"
                @load="onImageLoad"
              />

              <!-- <div class="ribbon"><span>Active</span></div> -->

              <div class="card-body">
                <div class="mt-3 d-flex justify-content-between align-items-center">
                  <div class="col-12 mt-4">
                    <div class="d-flex justify-content-between">
                      <h6
                        class="card-title text-nowrap fw-bold text-capitalize mb-0 my-2"
                      >
                        {{ getCandidates.first_name }}&nbsp;{{ getCandidates.last_name }}
                      </h6>
                      <div class="">
                        <button
                          type="button"
                          class="btn text-nowrap"
                          data-bs-toggle="modal"
                          data-bs-target="#editContactProfile"
                          data-bs-whatever="@mdo"
                          @click="editCandidate(getCandidates.id)"
                        >
                          <i class="bi bi-pencil-fill"></i>
                        </button>
                      </div>
                    </div>

                    <span class="text-lowercase">
                      <i class="bi bi-envelope-fill" style="color: rgb(249 148 75)"></i>
                      &nbsp; {{ getCandidates.email }}</span
                    >
                    &nbsp; |&nbsp;

                    <span
                      ><i class="bi bi-telephone-fill" style="color: rgb(249 148 75)"></i>
                      &nbsp; {{ getCandidates.phone_number }}</span
                    >
                  </div>
                  <!-- <div></div> -->
                  <div>
                    <!-- <button type="button" class="btn btn-outline-primary">
                          Edit
                        </button> -->
                  </div>
                </div>

                <div class="mt-3">
                  <div class="d-flex justify-content-between">
                    <!-- <div>
                      <h6
                        class="card-title text-uppercase fs-smaller text-nowrap"
                      >
                        contact information
                      </h6>
                    </div> -->

                    <div class="d-flex justify-content-between mt-2">
                      <h6 class="fs-smaller text-nowrap fw-bold">Profile View</h6>
                      <!-- <label class="switch">
                          <input type="checkbox" id="togBtn" title="check" checked />
                          <div class="slider round"></div>
                        </label> -->
                      <label class="switch mt-1">
                        <input
                          type="checkbox"
                          id="togBtn"
                          v-model="contactDetailChecked"
                          @change="updateProfileView"
                        />
                        <div class="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 bg-white">
            <div class="tab-content">
              <component :is="activeComponent"></component>
            </div>
          </div>
        </div>

        <EditProfileContact
          :candidateId="selectedCandidateId || 0"
          @contactAdded="getCandidate"
        />

        <!-- <ProfileTabs @getContactDetail="getCandidate" /> -->
      </div>
    </div>
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
import CandidateReference from "./ProfileDetail/CandidateReference.vue";
import AddNotes from "../modals/CandidatePage/AddNotes.vue";
// import activeLocations from "../../assets/activelocation.png";
// import settings from "../../assets/setting.png";
// import jobs from "../../assets/jobs.png";
import EditProfileContact from "../modals/CandidatePage/EditProfileContact.vue";

export default {
  name: "Profile",

  data() {
    return {
      getCandidates: [],
      restrictedShift: [],
      getCount: [],

      getCandidateData: [],
      selectedCandidateId: null,
      contactDetailChecked: false,
      tabs: [
        {
          name: "Overview ",
          component: "Overview",
          routeName: "Overview",
        },
        {
          name: "Documents ",
          component: "Document",
          routeName: "Document",
          // image: jobs,
        },
        {
          name: "Profile ",
          component: "ProfileTabs",
          routeName: "ProfileTabs",
        },
        {
          name: "Restricted",
          component: "Restricted",
          routeName: "Restricted",
          // image: settings,
        },
        {
          name: "Rate Card",
          component: "RateCard",
          routeName: "RateCard",
        },
        {
          name: "Notes",
          component: "Notes",
          routeName: "Notes",
        },
        {
          name: "Staff ID",
          component: "StaffId",
          routeName: "StaffId",
        },
        {
          name: "Staff History",
          component: "CandidateHistory",
          routeName: "CandidateHistory",
        },
        {
          name: "Referrals",
          component: "CandidateReference",
          routeName: "CandidateReference",
        },
      ],
      activeTab: 0,
      isImageLoaded: false,
    };
  },

  components: {
    Overview,
    AddNotes,
    Document,
    ProfileTabs,
    Restricted,
    RateCard,
    Notes,
    StaffId,
    CandidateHistory,
    CandidateReference,

    EditProfileContact,
  },

  props: ["id"],
  props: {
    candidateId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    onImageLoad() {
      this.isImageLoaded = true;
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
    completeImageUrl() {
      if (this.getCandidates && this.getCandidates.profile_photo) {
        return `${VITE_API_URL}${this.getCandidates.profile_photo}`;
      }
      return null;
    },
  },
  watch: {
    candidateId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchCandidateData(newVal);
      }
    },
  },

  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async updateProfileView() {
      try {
        const formData = new FormData();

        formData.append(
          "contact_information",
          this.contactDetailChecked ? "true" : "false"
        );
        formData.append("candidate_id", this.$route.params.id);
        const response = await axios.put(
          `${VITE_API_URL}/update_bank_details_contact_information`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        await this.getCandidate();
      } catch (error) {
        // console.error("Error updating profile view:", error);
      }
    },
    updateActiveTab() {
      const activeTabIndex = this.tabs.findIndex(
        (tab) => tab.routeName === this.$route.name
      );

      if (activeTabIndex !== -1) {
        this.activeTab = activeTabIndex;
      }
    },
    editCandidate(candidateId) {
      this.selectedCandidateId = candidateId;
    },
    getTabLink(tab) {
      return { name: tab.component, params: { id: this.$route.params.id } };
    },
    selectTab(index) {
      this.activeTab = index;
    },
    handleNextTabClick() {
      if (!this.doubleClick) {
        this.doubleClick = true;
        setTimeout(() => {
          this.doubleClick = false;
        }, 300);

        this.nextTab();
      }
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
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.getCandidates = response.data.candidate;
        this.contactDetailChecked = this.getCandidates.contact_information;
        // this.GetNotesCount();
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

    // async GetNotesCount() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/candidate_notes_count_lists/${this.$route.params.id}`
    //     );

    //     this.getCount = response.data.Candidate_notes;
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
  },

  async mounted() {
    // await this.updateActiveTab();
    await this.getCandidate(this.candidateId);
    // await this.GetNotesCount();
  },
};
</script>

<style>
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

.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;
  border: none;
  border-radius: 0px;
  background-color: transparent;
}
.nav-pills .nav-link {
  color: #000;
}

.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}

.accordion-item {
  margin-bottom: 8px;
}
.form-check-input {
  border: 2px solid grey;
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
