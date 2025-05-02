<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCustomHoliday"
      aria-labelledby="editCustomHoliday"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCustomHoliday">
              Edit Custom Holiday
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Title</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.title"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Date</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="date"
                      class="form-control"
                      v-model="fetchSite.date"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="col-12">
                    <label class="form-label">Holiday Type</label>
                  </div>
                  <div class="col-12 mt-1">
                    <input
                      type="text"
                      class="form-control"
                      v-model="fetchSite.holiday_type"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#editCustomHoliday"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod(fetchSite.id)"
              :disabled="isSaveDisabled"
            >
              Save
            </button>
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
  name: "editCustomHoliday",
  data() {
    return {
      fetchSite: {
        id: null,
        title: "",
        date: "",
        holiday_type: "",
      },
    };
  },
  props: {
    SiteID: {
      type: Number,
      default: null,
    },
  },
  computed: {
    isPhoneNumberValid() {
      return /^[0-9]{10}$/.test(this.fetchSite.phone_number);
    },

    isSaveDisabled() {
      return !(
        this.fetchSite.title.trim() &&
        this.fetchSite.date &&
        this.fetchSite.holiday_type.trim()
      );
    },
  },
  components: { SuccessAlert },
  methods: {
    cleanPhoneNumber() {
      this.fetchSite.phone_number = this.fetchSite.phone_number.replace(
        /\D/g,
        ""
      );
    },

    validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    },
    async fetchSiteMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_holidays/${this.$route.params.id}`
        );
        const data = response.data.data;
        if (Array.isArray(data) && data.length > 0) {
          this.fetchSite = { ...this.fetchSite, ...data[0] };
        } else {
          this.fetchSite = { ...this.fetchSite, ...data };
        }
      } catch (error) {}
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/custom_holidays/${this.fetchSite.id}`,
          this.fetchSite
        );
        this.$emit("EditCustomHoliday");
        // alert("Candidate updated successfully");
        const message = "Custom Site Holiday updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  // watch: {
  //   SiteID: {
  //     immediate: true,
  //     handler(newSiteID) {
  //       this.fetchSiteMethod(newSiteID);
  //     },
  //   },
  // },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchSiteMethod(this.$route.params.id);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchSiteMethod(this.$route.params.id);
    next();
  },
  // mounted() {
  //   this.fetchSiteMethod(this.$route.params.id);
  // },
  created() {
    this.fetchSite.id = this.SiteID;
    // this.fetchSiteMethod(this.$route.params.id);
  },
};
</script>
