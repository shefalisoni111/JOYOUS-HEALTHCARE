<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="publishVacancy"
      aria-labelledby="publishVacancy"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header d-inline-flex gap-3">
            <h5 class="modal-title" id="publishVacancy">Publish Shift</h5>
            <!-- <ul
              class="list-unstyled d-flex gap-3 mb-0 publish-ul"
              v-for="data in vacancyData"
              :key="data.id"
            >
              <li>Code:{{ data.ref_code }}</li>
              <li>B-unit:{{ data.business_unit }}</li>
              <li>Job: {{ data.job_title }}</li>
              <li v-for="(date, index) in data.dates" :key="index" v-text="date"></li>
              <li>Time: {{ data.shift }}</li>
              <li>Space left: 1</li>
            </ul> -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <ul class="list-unstyled d-flex justify-content-end gap-3">
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  &nbsp;WORKED (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;CONSECUTIVE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;AVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;UNAVAILABLE (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;OTHER (1)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;O ASSIGNED (0)
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;© PUBLISHED
                </li>
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />&nbsp;@ REJECTED BY STAFF
                </li>
              </ul>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div
                  class="pagetitle d-flex justify-content-between align-items-center p-2"
                >
                  <div class="d-flex justify-content-around gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    Select All
                  </div>

                  <div></div>

                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-2">
                      <div class="searchbox position-relative">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search "
                          aria-label="Search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h6>Shifts List ...</h6>
                <table v-if="selectedPublishItemId"></table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-between">
                <div class="d-flex gap-3">
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Push Notification
                    </div>
                  </div>
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      Text Notification
                    </div>
                  </div>
                  <div class="d-flex justify-content-around gap-2">
                    <div class="btn btn-success text-nowrap">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="enableMailNotification"
                      />
                      Mail Notification
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-3">
                  <button
                    class="btn btn-danger rounded-1"
                    data-bs-target="#publishVacancy"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success rounded-1 text-capitalize fw-medium"
                    data-bs-dismiss="modal"
                    v-on:click="publicCandidateMail()"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessAlert :show="showMessage" message="Mail sent successfully!" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "PublishedVacancy",
  data() {
    return {
      getPublicVacancyMAil: [],
      notification_type: null,
      vacancyData: [],
      enableMailNotification: false,
      showMessage: false,
      publicationStatus: null,
    };
  },
  components: {
    SuccessAlert,
  },
  computed: {
    selectedPublishItemId() {
      this.publicCandidateMail(this.$store.state.selectedPublishItemId);
      return this.$store.state.selectedPublishItemId;
    },
  },
  methods: {
    async publicCandidateMail(id) {
      const token = localStorage.getItem("token");
      this.getPublicVacancyMAil = [];

      if (this.$store.state.selectedPublishItemId) {
        try {
          const notificationType = this.enableMailNotification
            ? "email_notification"
            : null;

          const response = await axios.put(
            `${VITE_API_URL}/send_notification/${id}`,
            { notification_type: notificationType },
            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
            }
          );

          this.getPublicVacancyMAil = response.data.data;

          if (response.status === 200) {
            this.publicationStatus = "published";
            this.showMessage = true;
            this.$emit("publishVacancy");
          } else {
          }
        } catch (error) {}
      } else {
      }
    },
    closePopup() {
      this.$store.commit("setSelectedPublishedItemId", null);
    },
    async getVacancyDataMethod() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${VITE_API_URL}/vacancies`, {
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
        });
        this.vacancyData = response.data.data;
      } catch (error) {
        //console.error("Error fetching vacancies:", error);
      }
    },
  },

  mounted() {
    this.getVacancyDataMethod();
  },
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
.publish-ul li {
  background: #ff57223d;
  padding: 5px;
}
.modal-xl {
  --bs-modal-width: 1823px !important;
}
.modal-footer {
  display: block;
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
