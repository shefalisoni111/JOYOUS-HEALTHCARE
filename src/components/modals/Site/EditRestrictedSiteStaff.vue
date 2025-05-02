<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editRestrictedSiteLocation"
      aria-labelledby="editRestrictedSiteLocation"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRestrictedSiteLocation">
              Edit Site Location
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-12">
                    <select
                      v-model="fetchRestrictedStaff.site_id"
                      id="selectBusinessUnit"
                      @change="onClientSelect"
                    >
                      <option
                        v-for="option in fetchRestrictedStaff.businessUnit"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-dark btn-cancel"
                data-bs-target="#editRestrictedSiteLocation"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                :disabled="!isFormValid"
                :class="{ disabled: !isFormValid }"
                class="btn btn-primary rounded-1 text-capitalize fw-medium"
                :data-bs-dismiss="isFormValid ? 'modal' : null"
                @click="updateRestrictedLocationMethod"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "EditStaffRestrictedLocation",
  data() {
    return {
      fetchRestrictedStaff: {
        id: this.restrictedID,
        site_id: "",
        candidate_id: "",
        businessUnit: [],
        client_id: "",
        clientData: [],
      },
      Staff: [],
    };
  },
  components: { SuccessAlert },
  props: {
    restrictedID: {
      type: Number,
      required: true,
    },
  },

  watch: {
    restrictedID: {
      immediate: true,
      handler(newRestrictedID) {
        if (newRestrictedID) {
          this.getRestrictedLocationMethod();
        }
      },
    },
    // selectedStaff() {
    //   const Staff_id = this.Staff.find((option) => option.id === this.Staff_id);
    //   return this.Staff_id;
    // },
  },
  computed: {
    isFormValid() {
      return this.fetchRestrictedStaff.site_id !== "";
    },

    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },
  },
  methods: {
    async getStaffMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates`);
        this.Staff = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.fetchRestrictedStaff.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },

    // async onClientSelect() {
    //   const selectedClientId = this.fetchRestrictedStaff.client_id;

    //   await this.getSiteAccordingClientMethod(selectedClientId);
    // },

    // async getSiteAccordingClientMethod(clientId) {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/site_according_client/${clientId}`
    //     );
    //     this.fetchRestrictedStaff.businessUnit = response.data.site || [];
    //     // if (response.data && response.data.site) {
    //     //   this.fetchRestrictedStaff.businessUnit = response.data.site;
    //     // }
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
    async getRestrictedLocationMethod() {
      if (!this.restrictedID) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/restricted_business_units/${this.restrictedID}`
        );

        // this.getLocationData = response.data;
        if (response.data.data) {
          // this.fetchRestrictedStaff.candidate_id = response.data.data.candidate_id;
          this.fetchRestrictedStaff.site_id = response.data.data.site_id;
          this.fetchRestrictedStaff.client_id = response.data.data.client_id;
          // await this.getSiteAccordingClientMethod(this.fetchRestrictedStaff.client_id);
        }
      } catch (error) {
        // console.error("Error fetching restricted shifts:", error);
      }
    },

    async updateRestrictedLocationMethod() {
      try {
        await axios.put(
          `${VITE_API_URL}/restricted_business_units/${this.restrictedID}`,
          {
            candidate_id: this.fetchRestrictedStaff.candidate_id,
            site_id: [this.fetchRestrictedStaff.site_id],
          }
        );

        // alert("Candidate updated successfully");
        this.$emit("EditRestricted");
        const message = " Rate Card updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.fetchRestrictedStaff.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.getClientMethod();
      vm.this.getBusinessUnitMethod();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.getClientMethod();
    this.getBusinessUnitMethod();
    next();
  },
  async mounted() {
    await this.getClientMethod();
    await this.getBusinessUnitMethod();
    // await this.getRestrictedLocationMethod();
    this.getStaffMethod();
    await this.getRestrictedLocationMethod();
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 9px;
}
</style>
