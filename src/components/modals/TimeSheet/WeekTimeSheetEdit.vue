<template>
  <div>
    <div class="container-fluid">
      <form>
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Assign To</label>
              <input
                type="text"
                class="form-control"
                v-model="fetchCustomTimeShetData.candidate_name"
                aria-describedby="name"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Site</label>
              <input
                type="text"
                class="form-control"
                v-model="fetchCustomTimeShetData.business_unit"
                aria-describedby="site"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label class="form-label">Position</label>
              <input
                type="text"
                class="form-control"
                v-model="fetchCustomTimeShetData.job"
                aria-describedby="time"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Date</label>
              <input
                type="text"
                class="form-control"
                v-model="fetchCustomTimeShetData.date"
                aria-describedby="date"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label class="form-label">Shift</label>
              <input
                type="text"
                class="form-control"
                v-model="fetchCustomTimeShetData.shift"
                aria-describedby="position"
              />
            </div>
          </div>
          <div class="col-12">
            <label class="form-label">Rate Cards</label>
            <div class="d-flex gap-2">
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Start Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">End Time</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Break</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Total Hours</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Client Rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Client Pay Amount</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Staff Rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Staff Rate Amount</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="email"
                    class="form-control"
                    v-model="fetchCustomTimeShetData.email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="col-12">
              <label class="form-label">Notes</label>
            </div>
            <div class="col-12 mt-1">
              <textarea
                class="form-control"
                v-model="fetchCustomTimeShetData.notes"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <div class="d-flex gap-3 align-items-center">
            <div v-if="isPublished" class="d-flex gap-3 align-items-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="pushNotificationCheckbox"
                />
                <label class="form-check-label" for="pushNotificationCheckbox">
                  Push Notification
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="textNotificationCheckbox"
                />
                <label class="form-check-label" for="textNotificationCheckbox">
                  Text Notification
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="emailNotificationCheckbox"
                />
                <label class="form-check-label" for="emailNotificationCheckbox">
                  Email Notification
                </label>
              </div>
            </div>
          </div>
          <div class="d-flex gap-3">
            <div class="d-flex align-items-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="isPublished"
                  id="publishCheckbox"
                />
                <label class="form-check-label" for="publishCheckbox">
                  Tick here to publish
                </label>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-danger">Delete</button>
              <button type="submit" class="btn btn-success" v-if="!isPublished">
                Save
              </button>
              <button class="btn btn-primary" v-if="!isPublished">Approve & Save</button>
              <button class="btn btn-primary" v-if="isPublished">Save & Publish</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "editCustomTimeSheet",
  data() {
    return {
      fetchCustomTimeShetData: {
        id: "",
        shift_date: "",
        candidate_name: "",
      },
      isPublished: false,
    };
  },
  props: {
    candidateId: {
      type: String,
      required: true,
    },
  },
  components: { SuccessAlert },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
  },
  methods: {
    async getJobTitleMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async fetchCustomTimeSheetData() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/weekly_timesheets/${this.candidateId}`
        );
        this.fetchCustomTimeShetData = {
          ...this.fetchCustomTimeShetData,
          ...response.data,
        };
      } catch (error) {}
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/custom_timesheets/${this.fetchCustomTimeShetData.id}`,
          this.fetchCustomTimeShetData
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchCustomTimeShetData.id,
          newData: response.data,
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
    candidateId: {
      immediate: true,
      handler(newcandidateId) {
        this.fetchCustomTimeSheetData(newcandidateId);
      },
    },
  },
  mounted() {
    this.getJobTitleMethod();
  },
};
</script>
<style scoped>
select {
  width: 100%;
  padding: 9px;

  border-radius: 4px;
  border: 1px solid #80808059;
}

.form-check-input {
  border: 2px solid grey;
}
label {
  font-weight: bold;
}
</style>
