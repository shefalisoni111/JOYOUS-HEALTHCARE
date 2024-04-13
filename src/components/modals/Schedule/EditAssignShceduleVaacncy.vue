<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editAssignScheduleVacancy"
      aria-labelledby="editAssignScheduleVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #f9944b">
            <h5 class="modal-title" id="editAssignScheduleVacancy">
              Edit Assign Shift {{ vacancyId }}
            </h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row align-items-center">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Assign To</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.candidate_name"
                        aria-describedby="name"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Site</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.business_unit"
                        aria-describedby="site"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <label class="form-label">Position</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.job"
                        aria-describedby="time"
                        readonly
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Date</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.date"
                        aria-describedby="date"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label class="form-label">Shift</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fetchAssignVacancy.shift"
                        aria-describedby="position"
                        readonly
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
                            v-model="fetchAssignVacancy.start_time"
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
                            v-model="fetchAssignVacancy.end_time"
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
                            v-model="fetchAssignVacancy.break"
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
                            v-model="fetchAssignVacancy.total_hours"
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
                            v-model="fetchAssignVacancy.email"
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
                            v-model="fetchAssignVacancy.email"
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
                            v-model="fetchAssignVacancy.email"
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
                            v-model="fetchAssignVacancy.email"
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
                        v-model="fetchAssignVacancy.notes"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editAssignScheduleVacancy"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateCandidateMethod()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <SuccessAlert ref="successAlert" /> -->
  </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "editAssignScheduleVacancy",
  data() {
    return {
      fetchAssignVacancy: {
        id: "",
        candidate_name: "",
        start_time: "",
        shift_date: "",
        end_time: "",
        business_unit: "",
        client_rate: "",
        dates: [],

        job_id: 1,
        phone_number: "",
        email: "",
        activated: "",
        employment_type_id: "",
      },
      options: [],
    };
  },
  props: {
    candidateId: {
      type: [Number, String],
      default: null,
    },
    vacancyId: {
      type: Number,
      default: null,
    },
  },
  components: { SuccessAlert },
  computed: {
    getCandidatesData() {
      return this.$store.state.candidates;
    },
    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchVacancy.job_id
      );
      return job_title ? job_title.name : "";
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
    async fetchAssignVacancyMethod(id) {
      if (!id) return;
      try {
        const response = await axios.get(`${VITE_API_URL}/candidates/${id}`);
        this.fetchAssignVacancy = { ...this.fetchAssignVacancy, ...response.data.data };
      } catch (error) {}
    },
    async updateCandidateMethod() {
      try {
        const response = await axios.put(
          `${VITE_API_URL}/update_assigned_vacancy/${this.fetchAssignVacancy.id}`,
          this.fetchAssignVacancy
        );

        this.$store.commit("updateCandidate", {
          id: this.fetchAssignVacancy.id,
          newData: response.data,
        });
        this.$emit("Candidate-updated");
        // alert("Candidate updated successfully");
        const message = "Staff updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating candidate:", error);
      }
    },
  },
  watch: {
    candidateId: {
      immediate: true,
      handler(newCandidateId) {
        this.fetchAssignVacancyMethod(newCandidateId);
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
</style>
