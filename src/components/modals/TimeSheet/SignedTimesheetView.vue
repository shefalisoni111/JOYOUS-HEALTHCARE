<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="signedTimeSheetView"
      aria-labelledby="candidatePage"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signedTimeSheetView">Staff Signed View</h5>
          </div>
          <div class="modal-body mx-3">
            <div class="row">
              <div class="col-12">
                <table class="table candidateTable">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Start</th>
                      <th scope="col">Finish</th>

                      <th scope="col">Break</th>
                      <th scope="col">Total</th>
                      <th scope="col">Authorized Signature</th>
                      <th scope="col">Authorized Name</th>
                      <th scope="col">Staff Signature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="col">{{ getSignedStaffView.id }}</td>
                      <td scope="col">{{ getSignedStaffView.date }}</td>

                      <td scope="col">{{ getSignedStaffView.start_time }}</td>

                      <td scope="col">{{ getSignedStaffView.end_time }}</td>
                      <td scope="col">{{ getSignedStaffView.break }}</td>
                      <td scope="col">{{ getSignedStaffView.total_hours }}</td>

                      <td scope="col">
                        <img
                          :src="
                            getFullImageUrl(
                              getSignedStaffView.administrator_signature_url
                            )
                          "
                          alt="Administrator Signature"
                          height="100px"
                          class="remove-white-background d-block m-auto"
                        />
                      </td>
                      <td scope="col">{{ getSignedStaffView.author_name }}</td>
                      <td scope="col">
                        <img
                          :src="getFullImageUrl(getSignedStaffView.signature_url)"
                          alt="Administrator Signature"
                          height="100px"
                          class="remove-white-background d-block m-auto"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#signedTimeSheetView"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "CandidateAdd",
  data() {
    return {
      getSignedStaffView: [],
      VITE_API_URL: " https://recpalapp.co.uk/api/",
    };
  },
  components: { SuccessAlert },
  computed: {},
  props: ["id"],
  watch: {
    id(newValue, oldValue) {
      this.signedTimeSheetViewMethod(newValue);
      this.fetchSignedTimesheetData(newValue);
    },
  },
  methods: {
    getFullImageUrl(relativeUrl) {
      return `${this.VITE_API_URL}${relativeUrl}`;
    },
    ...mapActions(["fetchSignedTimesheetData"]),
    async signedTimeSheetViewMethod(id) {
      if (id) {
        const token = localStorage.getItem("token");
        axios
          .get(`${VITE_API_URL}/sign_timesheets/${id}`, {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((response) => {
            this.getSignedStaffView = response.data.sign_timesheets;
            // console.log(this.getSignedStaffView);
          })
          .catch((error) => {
            // console.error("Error fetching signed timesheet data:", error);
          });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.remove-white-background {
  mix-blend-mode: multiply;
  background-color: transparent !important;
}
</style>
