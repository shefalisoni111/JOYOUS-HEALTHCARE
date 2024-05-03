<template>
  <div>
    <div class="container-fluid p-0 bg-define">
      <div class="pagetitle d-flex justify-content-between align-items-center p-2">
        <div class="d-flex justify-content-around gap-2"></div>

        <div></div>

        <div class="d-flex align-items-center justify-content-between">
          <!-- <div class="d-flex align-items-center gap-2">
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#rateCards"
              data-bs-whatever="@mdo"
            >
              + Add Or Update Rate Card
            </button>

            <button type="button" class="btn btn-outline-success text-nowrap">
              <i class="bi bi-funnel"></i>
              Show Filters
            </button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="container-fluid pt-3">
      <div class="row">
        <div class="col-12">
          <div class="">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th scope="col">#Booking Code</th>
                  <th scope="col">Staff</th>
                  <th scope="col">Site</th>
                  <th scope="col">Job Title</th>
                  <th scope="col" style="width: 142px">Shift Dates</th>
                  <th scope="col">Booking By</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Start</th>
                  <th scope="col">End</th>
                  <th scope="col">Break</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Notes</th>

                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody v-if="getHistoryData.length > 0">
                <tr v-for="(data, index) in getHistoryData" :key="index">
                  <td scope="col">{{ data.id }}</td>
                  <td scope="col">{{ data.booking_code }}</td>
                  <td scope="col">{{ data.candidate }}</td>
                  <td scope="col">{{ data.site }}</td>
                  <td scope="col">{{ data.job_title }}</td>
                  <td>
                    <span v-for="(date, index) in data.shift_dates" :key="index">
                      {{ date }}

                      <template v-if="index !== data.shift_dates.length - 1">, </template>
                    </span>
                  </td>
                  <td scope="col">{{ data.booked_by }}</td>
                  <td scope="col">{{ data.booking_date }}</td>
                  <td scope="col">{{ data.start_time }}</td>
                  <td scope="col">{{ data.end_time }}</td>
                  <td scope="col">{{ data.break ? data.break : "null" }}</td>
                  <td scope="col">{{ data.duration ? data.duration : "null" }}</td>
                  <td scope="col">{{ data.notes ? data.notes : "null" }}</td>

                  <td scope="col">{{ data.status ? data.status : "null" }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="14" class="text-center text-danger">
                    {{ this.noHistoryData }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RateCard",
  data() {
    return {
      getHistoryData: [],
      noHistoryData: [],
    };
  },
  components: {},
  methods: {
    // editRateCard(rateCardId) {
    //   this.selectedRateCardId = rateCardId;
    // },
    // //  rateCard apis start
    // async rateCardDelete(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   await axios.delete(`${VITE_API_URL}/rate_cards/` + id).then((response) => {
    //     this.showRateCardMethod();
    //   });
    // },
    async staffBookingHistoryMethod() {
      const candidateId = this.$route.params.id;
      await axios
        .get(`${VITE_API_URL}/booking_history_web`, {
          params: {
            candidate_id: candidateId,
          },
        })
        .then((response) => {
          if (response.data.booking_data) {
            this.getHistoryData = response.data.booking_data.map((item) => item.booking);
          } else {
            // this.noHistoryData = "No Booking Found!";
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              // alert(error.response.data.message);
              this.noHistoryData = error.response.data.error;
            }
          }
        });
    },
  },
  async created() {
    await this.staffBookingHistoryMethod();
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
  background: #ff572266;
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
