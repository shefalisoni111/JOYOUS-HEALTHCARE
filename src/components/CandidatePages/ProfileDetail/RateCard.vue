<template>
  <div>
    <div class="container-fluid p-0 bg-define">
      <div
        class="pagetitle d-flex justify-content-between align-items-center p-2"
      >
        <div class="d-flex justify-content-around gap-2"></div>

        <div></div>

        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#rateCards"
              data-bs-whatever="@mdo"
            >
              + Add Or Update Notes
            </button>

            <button type="button" class="btn btn-outline-success text-nowrap">
              <i class="bi bi-funnel"></i>
              Show Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-12">
          <div class="">
            <table class="table candidateTable">
              <thead>
                <tr>
                  <th scope="col">
                    Sl.No
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </th>
                  <th scope="col">Business Unit</th>
                  <th scope="col">Position</th>
                  <th scope="col">Day</th>
                  <th scope="col">Employment Type</th>
                  <th scope="col">Shift Type Start End Time</th>
                  <th scope="col">Staff Rate</th>
                  <th scope="col">Last Update</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody v-if="getRateCard.length > 0">
                <tr v-for="(getrate, index) in getRateCard" :key="index">
                  <td scope="row">
                    <div class="form-check">
                      {{ index + 1 }}
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </div>
                  </td>
                  <td v-text="getrate.business_unit_id"></td>
                  <td v-text="getrate.job_id"></td>
                  <td v-text="getrate.weekname" class="text-capitalize"></td>
                  <td v-text="getrate.employment_type_id"></td>
                  <td v-text="getrate.shift_id"></td>
                  <td v-text="getrate.staff_rate"></td>
                  <td v-text="getrate.last_updated"></td>
                  <td class="cursor-pointer d-flex">
                    <i
                      class="bi bi-trash3 cursor-pointer btn btn-outline-success text-nowrap"
                      v-on:click="rateCardDelete(getrate.id)"
                    ></i
                    >&nbsp;&nbsp;

                    <!-- <i
                      class="bi bi-pencil-square cursor-pointer btn btn-outline-success text-nowrap"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editRateCard"
                      data-bs-whatever="@mdo"
                      v-on:click="updateRateCardMethod(getrate.id)"
                    ></i> -->
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="9"></td>
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
      getRateCard: [],
    };
  },
  components: {},
  methods: {
    //  ratecard apis start
    async rateCardDelete(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      await axios
        .delete(`https://logezy.onrender.com/rate_cards/` + id)
        .then((response) => {
          this.showRateCardMethod();
        });
      alert("Record Deleted ");
    },
    async showRateCardMethod() {
      await axios
        .get("https://logezy.onrender.com/rate_cards")
        .then((response) => (this.getRateCard = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.message);
            }
          }
        });
    },

    //  ratecard apis end
  },
  mounted() {
    this.showRateCardMethod();
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
