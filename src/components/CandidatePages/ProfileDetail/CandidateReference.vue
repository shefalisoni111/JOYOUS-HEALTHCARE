<template>
  <div>
    <div class="container-fluid p-0 bg-define">
      <div
        class="pagetitle d-flex justify-content-between align-items-center p-2"
      >
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
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Created at</th>
                  <th scope="col">Updated at</th>
                  <!-- <th scope="col">Last Update</th> -->
                  <!-- <th scope="col">Action</th> -->
                </tr>
              </thead>

              <tbody
                v-if="Array.isArray(getReferData) && getReferData.length > 0"
              >
                <tr v-for="(getrate, index) in getReferData" :key="index">
                  <td scope="row" v-text="getrate.id"></td>
                  <td v-text="getrate.name"></td>
                  <td v-text="getrate.job_position"></td>
                  <td v-text="getrate.email"></td>
                  <td v-text="getrate.phone_number"></td>
                  <td v-text="getrate.created_at"></td>
                  <td v-text="getrate.updated_at"></td>
                </tr>
              </tbody>

              <tbody v-else-if="!isLoading && getReferData.length === 0">
                <tr>
                  <td colspan="9" class="text-center text-danger">
                    {{ "Data Not Found!" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../../Loader/Loader.vue";

export default {
  name: "RateCard",
  data() {
    return {
      getReferData: [],
      noReferData: [],
      isLoading: false,
    };
  },
  components: { Loader },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
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
    async staffReferDataMethod() {
      this.isLoading = true;
      const candidateId = this.$route.params.id;
      try {
        const response = await axios.get(`${VITE_API_URL}/refer_friends`, {
          params: { candidate_id: candidateId },
        });

        const data = response.data.refer_friend;

        if (Array.isArray(data) && data.length > 0) {
          this.getReferData = data;
        } else if (data && typeof data === "object") {
          this.getReferData = [data];
        } else {
          this.getReferData = [];
          this.noReferData = "No referral data found.";
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.noReferData =
            error.response.data.message || "No data available.";
          this.getReferData = [];
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.this.staffReferDataMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.staffReferDataMethod();
    next();
  },
  mounted() {
    this.staffReferDataMethod();
  },
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
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
