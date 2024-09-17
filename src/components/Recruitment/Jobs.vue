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
              <div class="bg-white"></div>
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
