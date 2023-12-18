<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="border-bottom d-flex justify-content-between">
              <h5
                class="card-title text-uppercase fw-bold small d-flex align-items-center"
              >
                RESTRICTED SHIFTS
              </h5>
            </div>
          </div>
          <div class="card-body d-flex justify-content-between">
            <div class="d-flex gap-3">
              <ul v-for="shift in shifts" :key="shift.id" class="list-unstyled">
                <li>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="shift.id"
                    :value="shift.id"
                    v-model="selectedShifts"
                    :checked="isSelected(shift.id)"
                  />
                  &nbsp;{{ shift.shift_name }}
                </li>
              </ul>
            </div>
            <div class="d-flex gap-2 align-items-baseline">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="postRestrictedShift()"
              >
                <i class="bi bi-file-earmark-medical"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div
              class="border-bottom d-flex justify-content-between align-items-center pb-3"
            >
              <h5 class="card-title text-uppercase fw-bold small">
                RESTRICTED LOCATIONS (15)
              </h5>
              <div class="d-flex gap-2">
                <button
                  type="button"
                  class="btn btn-outline-success text-nowrap"
                  data-bs-toggle="modal"
                  data-bs-target="#addRestrictedLocation"
                  data-bs-whatever="@mdo"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <ul
              class="list-unstyled d-inline-flex gap-3"
              v-for="data in getLocationData"
              :key="data.id"
            >
              <li>
                <div class="d-flex justify-content-start border-box m-2 rounded-2">
                  <div>
                    <div class="hround">H{{ data.id }}</div>
                  </div>
                  <div>
                    <h5 class="fw-bold">{{ data.name }}</h5>
                    <span>Hospital {{ data.id }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Restricted",
  data() {
    return {
      shifts: [],
      selectedShifts: [],
      getRestrictedShiftData: [],
      getLocationData: [],
    };
  },

  methods: {
    async getTime() {
      try {
        const response = await axios.get("https://logezy.onrender.com/shifts");
        this.shifts = response.data.map((shift) => ({
          ...shift,
          shift_id: false,
        }));
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    isSelected(shiftId) {
      // Check if shiftId is in the selectedShifts array
      return this.getRestrictedShiftData.includes(shiftId);
    },
    async postRestrictedShift() {
      // Prepare data for the API request
      const data = {
        shift_id: this.selectedShifts, // Use the selectedShifts array
        candidate_id: this.$route.params.id,
      };

      try {
        const response = await axios.post(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}/restricted_shifts`,
          data
        );
        alert("Shift Added ");
        if (data) {
          if (
            window.location.href ===
            `https://logezy.onrender.com/candidates/${this.$route.params.id}/restricted`
          ) {
            window.location.reload();
          }
        }
      } catch (error) {}
    },

    async getRestrictedShifts() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}/candidate_restricted_shift`
        );

        this.getRestrictedShiftData = response.data.shift_id;
        this.selectedShifts = this.getRestrictedShiftData;
      } catch (error) {
        // console.error("Error fetching restricted shifts:", error);
      }
    },

    async getRestrictedLocationMethod() {
      try {
        const response = await axios.get(
          `https://logezy.onrender.com/candidates/${this.$route.params.id}/candidate_restricted_location`
        );
        this.getLocationData = response.data;
      } catch (error) {
        // console.error("Error fetching restricted shifts:", error);
      }
    },
  },

  created() {
    this.getTime();
    this.getRestrictedShifts();
    this.getRestrictedLocationMethod();
  },
};
</script>

<style scoped>
.fs-smaller {
  font-size: smaller;
}
.borderbottom {
  border-bottom: 1px solid #ebe2e2;
}

.accordion-button {
  width: 25%;
  background-color: transparent;
}
.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  border: none;
  background: transparent;
  box-shadow: none;
}
.profile {
  border-radius: 0px;
  border-top: 1px solid transparent;
}
#main {
  transition: all 0.3s;
  padding: 10px;
  transition: all 0.3s;
}
.bg-white {
  border-left: 1px solid #dedede;
}
.bg-orange-light {
  background: #fef8f8;
  background-color: #fdce5e17;
}
.card ul li {
  display: inline-block;
}

table th {
  font-size: 14px;
}
.card {
  border-radius: 0px;
}

.border-box {
  border: 1px solid lightgrey;
  padding: 12px;
  border-radius: 4px;
}
.card .round {
  background: #ff572266;
  border-radius: 50%;
  padding: 10px 7px;
  margin-right: 8px;
}

.card .hround {
  background: #ff9800;
  border-radius: 50%;
  padding: 10px 11px;
  margin-right: 8px;
}
.card .dround {
  background: #ff572266;
  border-radius: 50%;
  padding: 12px 17px;
  margin-right: 8px;
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
.form-check-input {
  border: 2px solid grey;
}
.btn-primary {
  border: none;
}
.switch .slider {
  position: absolute;
  top: -3;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #e7ecf1;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 3px 10px;
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
  font-family: Verdana, sans-serif;
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

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #ff5722;

  border-bottom: 3px solid #ff5722;
  border-radius: 0px;
  background-color: transparent;
}
.nav-pills .nav-link {
  color: grey;
}
ul.nav-pills {
  border-bottom: 1px solid grey;
}
.nav-pills .nav-link {
  border-radius: 0px;
  padding: 5px 13px;
}

.accordion-item {
  margin-bottom: 8px;
}

.accordion-header {
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}

.accordion-icon {
  font-size: 16px;
  transition: transform 0.3s;
}

.expanded {
  transform: rotate(90deg);
}
</style>
