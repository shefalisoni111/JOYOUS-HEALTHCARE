<template>
  <div>
    <div id="main" class="main">
      <div class="row">
        <div class="col-md-8 p-0">
          <div class="settingsdetails">
            <div class="pagetitle d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <ol class="breadcrumb mb-1">
                  <li class="breadcrumb-item active text-uppercase fw-bold">
                    RECRUITMENT / <span class="clr">Settings</span>
                  </li>
                </ol>
              </div>
              <!-- End Page Title -->
            </div>
          </div>
          <div class="col-12 bg-white"></div>
          <div class="row">
            <div class="col-12">
              <div class="bg-white">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="Default-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Default"
                      type="button"
                      role="tab"
                      aria-controls="Default"
                      aria-selected="true"
                    >
                      Default Jobs
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="Built-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Built"
                      type="button"
                      role="tab"
                      aria-controls="Built"
                      aria-selected="false"
                    >
                      Built Forms
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="Widget-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Widget"
                      type="button"
                      role="tab"
                      aria-controls="Widget"
                      aria-selected="false"
                    >
                      Widget
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="Email-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Email"
                      type="button"
                      role="tab"
                      aria-controls="Email"
                      aria-selected="false"
                    >
                      Email
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="General-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#General"
                      type="button"
                      role="tab"
                      aria-controls="General"
                      aria-selected="false"
                    >
                      General
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="Default"
                    role="tabpanel"
                    aria-labelledby="Default-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="Built"
                    role="tabpanel"
                    aria-labelledby="Built-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="Widget"
                    role="tabpanel"
                    aria-labelledby="Widget-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="Email"
                    role="tabpanel"
                    aria-labelledby="Email-tab"
                  >
                    ...
                  </div>
                  <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import Loader from "../Loader/Loader.vue";

export default {
  name: "AgencySetting",
  data() {
    return {
      getAgencyData: [],

      isLoading: false,
    };
  },
  components: {
    Loader,
  },
  computed: {},
  methods: {
    async getAgencyDataMethod() {
      this.isLoading = true;
      await axios
        .get(`${VITE_API_URL}/agency_settings`)
        .then((response) => {
          this.getAgencyData = response.data;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
            }
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.getAgencyDataMethod();
  },
};
</script>

<style scoped>
table th,
table tr td {
  text-transform: capitalize;
}
.pagetitle {
  padding: 10px;
}

.clr {
  color: #ff5722;
}

.settingsdetails p span {
  width: 100%;
  height: 0;
  left: 0;
  bottom: 5px;
  border-bottom: 3px solid #0d6efd;
}
</style>
