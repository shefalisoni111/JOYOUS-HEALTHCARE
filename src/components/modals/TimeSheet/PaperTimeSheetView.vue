<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="viewPaperTimeSheet"
      aria-labelledby="addNextToKin"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewPaperTimeSheet">PaperTimeSheet</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="row g-3 align-items-center">
              <div class="container">
                <div class="main-body mt-5">
                  <div>
                    <div v-if="customTimeSheetPaperSheetView">
                      <!-- <div>{{ customTimeSheetPaperSheetView.id }}</div> -->
                      <!-- Other content -->
                    </div>
                    <div
                      class="col-12 mt-1 m-auto text-center"
                      v-if="customTimeSheetPaperSheetView.paper_timesheet"
                    >
                      <img
                        :src="fullCustomImageUrl"
                        alt="Current Paper TimeSheet"
                        class="img-fluid"
                      />
                    </div>
                    <!-- <img
                      v-if="group.paper_timesheet"
                      :src="completeImageUrl(group.paper_timesheet?.url)"
                      alt="Document Image"
                      style="height: 310px; width: 30%; margin: auto; display: block"
                      loading="eager"
                    /> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#viewPaperTimeSheet"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
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
  name: "ViewDocuments",
  data() {
    return {
      customTimeSheetPaperSheetView: [],
    };
  },
  props: {
    customDataId: {
      type: Number,
      default: 0,
    },
  },
  components: { SuccessAlert },
  watch: {
    customDataId: {
      immediate: true,
      handler(newcustomDataId) {
        this.fetchCustomTimeSheetData(newcustomDataId);
      },
    },
  },
  computed: {
    fullCustomImageUrl() {
      return `${VITE_API_URL}${this.customTimeSheetPaperSheetView.paper_timesheet}`;
    },
  },
  methods: {
    blurActiveElement() {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    },
    completeImageUrl(url) {
      if (url) {
        const completeUrl = `${VITE_API_URL}${url}`;

        return completeUrl;
      }
      return null;
    },
    async fetchCustomTimeSheetData() {
      if (!this.customDataId) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_timesheets/${this.customDataId}`
        );

        this.customTimeSheetPaperSheetView = response.data.custom_sheets;
      } catch (error) {
        // console.error("Error fetching document categories:", error);
      }
    },
  },
  async mounted() {
    await this.fetchCustomTimeSheetData();
  },
};
</script>

<style scoped>
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}

.modal-footer {
  border-top: 0px;
}

#head {
  width: 40px;
  height: 40px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 0px;
}
.btn-primary {
  background-color: #ff5f30 !important;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  outline: none;
}
label.form-label {
  text-transform: capitalize;
}
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  min-height: 11px;
}

.switch .slider:before {
  position: absolute;
  background-color: #aaa;
  height: 15px;
  width: 15px;
  content: "";
  left: 0px;
  bottom: -2px;
  border-radius: 50%;
  transition: ease-in-out 0.5s;
}

.switch .slider:after {
  content: "";
  color: white;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 70%;
  transition: all 0.5s;
  font-size: 10px;
  font-family: "Inter", sans-serif;
}

.switch input:checked + .slider:after {
  transition: all 0.5s;
  left: 30%;
  content: "";
}

.switch input:checked + .slider {
  background-color: #d3d6d9;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #ff9800;
}
</style>
