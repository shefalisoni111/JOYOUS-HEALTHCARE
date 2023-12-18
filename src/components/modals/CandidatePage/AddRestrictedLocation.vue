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
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between">
                  <div class="col-2">
                    <label class="form-label" for="selectBusinessUnit"
                      >Business Unit</label
                    >
                  </div>

                  <div class="col-10">
                    <select v-model="business_unit_id" id="selectBusinessUnit">
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.name }}
                      </option>
                    </select>
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
                v-on:click="addRestrictedLocationMethod()"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddRestrictedLocation",
  data() {
    return {
      business_unit_id: "",
      candidate_id: "",
      businessUnit: [],
    };
  },
  computed: {
    selectBusinessUnit() {
      const business_unit_id = this.businessUnit.find(
        (option) => option.id === this.business_unit_id
      );
      return business_unit_id ? business_unit_id.name : "";
    },
  },
  methods: {
    async addRestrictedLocationMethod() {
      const data = {
        business_unit_id: [this.business_unit_id],
        candidate_id: this.candidate_id,
      };
      try {
        const response = await fetch(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}/restricted_business_units`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } catch (error) {}
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(
          "https://logezy.onrender.com/business_units"
        );
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
