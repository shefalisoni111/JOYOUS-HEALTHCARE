<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-items-center mb-0">Staffs</h6>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#AddSitRestrictedStaff"
              data-bs-whatever="@mdo"
              @click="handleAddRestrictedStaff"
            >
              + Add
            </button>
          </div>
        </div>
        <div class="d-flex gap-3" v-if="getRestrictedStaffData?.length > 0">
          <div
            class="card mb-3 w-25"
            v-for="data in getRestrictedStaffData"
            :key="data.id"
          >
            <div class="row g-0">
              <div class="d-flex justify-content-evenly">
                <div class="position-relative d-flex align-items-center">
                  <span class="position-absolute text-uppercase roundDesign">{{
                    data.candidate_name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                  }}</span>
                </div>
                <div class="">
                  <div class="card-body">
                    <h5 class="card-title text-capitalize">
                      <span> {{ data.candidate_name }} </span>
                    </h5>
                    <span> {{ data.position }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <div class="text-danger text-center" v-if="!isLoading">
            {{ "Data Not Found!" }}
          </div>
        </div>
      </div>
    </div>
    <AddSiteRestrictedStaff
      @getRestrictedStaffAdded="getRestrictedLocationMethod"
      @siteAdded="handleAddRestrictedStaff"
      ref="addSite"
    />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import AddSiteRestrictedStaff from "../../modals/Site/AddSiteRestrictedStaff.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";

export default {
  name: "RestrictedCandidates",
  data() {
    return {
      shifts: [],

      getRestrictedStaffData: [],
      client_id: "",
      isLoading: false,
    };
  },

  components: {
    AddSiteRestrictedStaff,
    SuccessAlert,
    Loader,
  },
  methods: {
    handleAddRestrictedStaff() {
      this.$refs.addSite.getBusinessUnitMethod();
      setTimeout(() => {
        this.$refs.addSite.getClientMethod();
      }, 100);
      setTimeout(() => {
        this.$refs.addSite.getStaffMethod();
      }, 200);
    },
    async getTime() {
      try {
        const response = await axios.get(`${VITE_API_URL}/shifts`);
        this.shifts = response.data.map((shift) => ({
          ...shift,
          shift_id: false,
        }));
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },

    // async getRestrictedLocationMethod() {
    //   this.isLoading = true;
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_restricted_location`
    //     );
    //     this.getRestrictedStaffData = response.data;
    //   } catch (error) {
    //     // console.error("Error fetching restricted shifts:", error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async getRestrictedLocationMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_site_candidate_locations`,
          {
            params: { site_id: `${this.$route.params.id}` },
          }
        );
        this.getRestrictedStaffData = response.data.candidates;
        const restricted_data = response.data.restricted_data;
      } catch (error) {
        // console.error("Error fetching restricted shifts:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  async created() {
    await this.getRestrictedLocationMethod();
  },
};
</script>

<style scoped>
.roundDesign {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  text-align: center;
  display: block;
  line-height: 40px;
  background: #ff5f30;
  color: #fff;
}
</style>
