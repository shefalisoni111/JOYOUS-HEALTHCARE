<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addRestrictedLocation"
      aria-labelledby="addRestrictedLocation"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRestrictedLocation">Add Location</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form @submit.prevent="addRestrictedLocationMethod">
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Business Unit</label
                    >
                  </div>

                  <div class="col-10">
                    <select v-model="site_id" id="selectBusinessUnit">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                    <span v-if="!validationBusinessUnit" class="text-danger"
                      >Business Unit Required</span
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary rounded-1"
                data-bs-target="#addRestrictedLocation"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                class="btn btn-primary rounded-1 text-capitalize fw-medium"
                data-bs-dismiss="modal"
                @click="submitForm"
                :disabled="!isValidForm"
              >
                Add Location
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
  name: "AddRestrictedLocation",
  data() {
    return {
      site_id: "",
      candidate_id: "",
      businessUnit: [],
      validationBusinessUnit: false,
    };
  },
  components: { SuccessAlert },
  watch: {
    site_id: function (newValue) {
      this.validateBusinessUnit(newValue);
    },
  },
  computed: {
    isValidForm() {
      return this.validationBusinessUnit;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
  },
  methods: {
    async submitForm() {
      this.validateBusinessUnit(this.site_id);

      if (this.isValidForm) {
        this.addRestrictedLocationMethod();
      } else {
      }
    },
    validateBusinessUnit(value) {
      this.validationBusinessUnit = !!value;
    },
    async addRestrictedLocationMethod() {
      const data = {
        site_id: [this.site_id],
        candidate_id: this.candidate_id,
      };
      try {
        const response = await fetch(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/restricted_business_units`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          this.$emit("getLocationAdded");
          this.site_id = "";
          const message = "Successful add Restrict Location";
          this.$refs.successAlert.showSuccess(message);
        } else {
        }
      } catch (error) {}
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            alert(error.response.data.message);
          }
        }
      }
    },
  },
  mounted() {
    this.getBusinessUnitMethod();
    this.candidate_id = this.$route.params.id;
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 9px;
}
</style>
