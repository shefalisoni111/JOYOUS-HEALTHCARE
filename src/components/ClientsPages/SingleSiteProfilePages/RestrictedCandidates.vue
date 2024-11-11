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
                <div class="ps-3">
                  <div class="card-body">
                    <h5 class="card-title text-capitalize">
                      <span> {{ data.candidate_name }} </span>
                    </h5>
                    <span> {{ data.position }} </span>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <i
                    class="bi bi-pencil-square cursor-pointer btn btn-outline-success text-nowrap"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editRestrictedSiteLocation"
                    data-bs-whatever="@mdo"
                    @click="editRestricted(data.id)"
                  ></i>
                  &nbsp;&nbsp;
                  <i
                    class="bi bi-trash cursor-pointer btn btn-outline-danger text-nowrap"
                    @click="deleteRestricted(data.id)"
                  ></i>
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
    <EditRestrictedSiteStaff
      :restrictedID="selectedRestrictedId || 0"
      @EditRestricted="getRestrictedLocationMethod"
    />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import AddSiteRestrictedStaff from "../../modals/Site/AddSiteRestrictedStaff.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import EditRestrictedSiteStaff from "../../modals/Site/EditRestrictedSiteStaff.vue";
import Loader from "../../Loader/Loader.vue";
import Swal from "sweetalert2";

export default {
  name: "RestrictedCandidates",
  data() {
    return {
      shifts: [],
      selectedRestrictedId: "",
      getRestrictedStaffData: [],
      client_id: "",
      isLoading: false,
    };
  },

  components: {
    AddSiteRestrictedStaff,
    SuccessAlert,
    Loader,
    EditRestrictedSiteStaff,
  },
  methods: {
    editRestricted(restrictedID) {
      this.selectedRestrictedId = restrictedID;
    },
    async deleteRestricted(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          await axios.delete(`${VITE_API_URL}/restricted_business_units/${id}`);
          Swal.fire("Deleted!", "The record has been deleted.", "success");
          this.getRestrictedLocationMethod();
        }
      } catch (error) {
        // console.error("Error deleting restricted location:", error);
        Swal.fire("Error!", "There was an issue deleting the record.", "error");
      }
    },
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
