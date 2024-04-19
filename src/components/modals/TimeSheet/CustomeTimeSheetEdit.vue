<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCustomTimeSheet"
      aria-labelledby="editCustomTimeSheet"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCustomTimeSheet">Edit Custom TimeSheet</h5>
          </div>
          <div class="modal-body mx-3">
            <form>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Shift Date</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="date"
                    class="form-control"
                    v-model="fetchCustomSheetData.shift_date"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Start Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.start_time"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">End Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.end_time"
                  />
                </div>
              </div>

              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Client Rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="number"
                    class="form-control w-25"
                    v-model="fetchCustomSheetData.client_rate"
                    @input="validateClientRate"
                    @keydown.prevent
                  />
                  <span
                    v-if="!validationClientRate && fetchCustomSheetData.client_rate <= 0"
                    class="text-danger"
                  >
                    Client Rate must be a positive number
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editCustomTimeSheet"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-on:click="updateCustomTimeSheetMethod()"
              :disabled="isSaveDisabled"
              data-bs-dismiss="modal"
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
  name: "editCustomTimeSheet",
  data() {
    return {
      fetchCustomSheetData: {
        id: "",
        shift_date: "",
        code: "",
        name: "",
        business_unit: "",
        job: "",

        start_time: "",
        end_time: "",
        client_rate: "",
        total_cost: "",
        paper_timesheet: "",
      },
      options: [],
      validationClientRate: true,
      businessUnit: [],
    };
  },
  props: {
    customDataId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },
  computed: {
    isSaveDisabled() {
      return (
        this.fetchCustomSheetData.client_rate === null ||
        this.fetchCustomSheetData.client_rate <= 0
      );
    },
  },
  methods: {
    validateClientRate() {
      if (this.fetchCustomSheetData.client_rate <= 0) {
        this.fetchCustomSheetData.client_rate = "";
        this.validationClientRate = false;
      } else {
        this.validationClientRate = true;
      }
    },

    async fetchCustomTimeSheetData(id) {
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/custom_timesheets/${id}`);
        this.fetchCustomSheetData = {
          ...this.fetchCustomSheetData,
          ...response.data.custom_sheets,
        };
      } catch (error) {}
    },
    async updateCustomTimeSheetMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomSheetData.id}`,
          this.fetchCustomSheetData
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomSheetData.id,
          newData: response.data.custom_sheets,
        });
        this.$emit("CustomTimeSheetData-updated");
        // alert("Candidate updated successfully");
        const message = "Custom TimeSheet Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    customDataId: {
      immediate: true,
      handler(newcustomDataId) {
        this.fetchCustomTimeSheetData(newcustomDataId);
      },
    },
  },
  mounted() {},
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
.modal-header {
  border-bottom: 0px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.btn-primary {
  border: none;
}
#head {
  width: 40px;
  height: 40px;
}

.modal {
  --bs-modal-width: 881px;
}
</style>
