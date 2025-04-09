<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editClientNotes"
      aria-labelledby="editClientNotes"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editClientNotes">Edit Site Note</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label for="selectClients" class="form-label">Notes</label>
                  </div>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSiteData.notes"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary rounded-1"
                data-bs-target="#editClientNotes"
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
                @click="updatedSiteMethod"
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
      fetchSiteData: {
        id: this.SiteNotesID,
        notes: "",

        site_id: "",
        clientData: [],
      },
    };
  },
  components: { SuccessAlert },
  props: {
    SiteNotesID: {
      type: Number,
      required: true,
    },
  },

  watch: {
    SiteNotesID: {
      immediate: true,
      handler(newRestrictedID) {
        if (newRestrictedID) {
          this.getSiteNotesMethod();
        }
      },
    },
  },
  computed: {
    isFormValid() {
      return this.fetchSiteData.notes !== "";
    },

    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return this.client_id;
    },
  },
  methods: {
    async getSiteNotesMethod() {
      if (!this.SiteNotesID || this.SiteNotesID === 0) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_notes/${this.SiteNotesID}`
        );

        // this.getLocationData = response.data;
        if (response.data.data) {
          this.fetchSiteData.notes = response.data.data.notes;
        }
      } catch (error) {
        // console.error("Error fetching restricted shifts:", error);
      }
    },

    async updatedSiteMethod() {
      if (!this.SiteNotesID || this.SiteNotesID === 0) {
        return;
      }
      try {
        await axios.put(`${VITE_API_URL}/site_notes/${this.SiteNotesID}`, {
          notes: this.fetchSiteData.notes || "",
        });

        // alert("Candidate updated successfully");
        this.$emit("EditClientNote");
        const message = " Site Note updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //   vm.this.getClientMethod();
      // vm.this.getBusinessUnitMethod();
    });
  },
  beforeRouteUpdate(to, from, next) {
    // this.getClientMethod();
    // this.getBusinessUnitMethod();
    next();
  },
  async mounted() {
    // await this.getClientMethod();
    // await this.getBusinessUnitMethod();
    // await this.getSiteNotesMethod();
    await this.getSiteNotesMethod();
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 9px;
}
</style>
