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
              @click="handleRateCardAdded"
            >
              + Add Or Update Rate Card
            </button>

            <!-- <button type="button" class="btn btn-outline-success text-nowrap">
              <i class="bi bi-funnel"></i>
              Show Filters
            </button> -->
          </div>
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
                  <th scope="col">
                    S.No
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Site
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Position
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Day
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Employment Type
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col" style="width: 180px">
                    Shift Type
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Staff Rate
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Last Update
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                  <th scope="col">
                    Action
                    <img
                      src="../../../assets/ArrowDown.png"
                      class="img-fluid pe-2"
                      alt="RecPal"
                      loading="eager"
                    />
                  </th>
                </tr>
              </thead>
              <tbody v-if="getRateCard?.length > 0">
                <tr
                  v-for="(getrate, index) in getRateCard"
                  :key="index"
                  @click="toggleActionMenu(index)"
                  @mouseleave="selectedRow = null"
                >
                  <td scope="row">
                    <div class="form-check">
                      {{ index + 1 }}
                      <!-- <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      /> -->
                    </div>
                  </td>

                  <td>{{ getrate.site?.name || "Null" }}</td>
                  <td>{{ getrate.position?.name }}</td>
                  <td class="text-capitalize">
                    {{ getrate.weekname || "Null" }}
                  </td>
                  <td>{{ getrate.employment_type?.title || "Null" }}</td>
                  <td>{{ getrate.site_shift?.shift || "Null" }}</td>
                  <td>{{ getrate.staff_rate || "Null" }}</td>
                  <td>{{ getrate.last_updated || "Null" }}</td>
                  <td class="cursor-pointer d-flex">
                    <div class="action-wrapper">
                      <i class="bi bi-three-dots dot-icon"></i>

                      <div v-if="selectedRow === index" class="action-menu">
                        <div class="d-flex">
                          <i
                            class="bi bi-trash border-0 border-03 cursor-pointer text-nowrap"
                            v-on:click="rateCardDelete(getrate.id)"
                            style="color: #f9944b"
                          ></i>
                          &nbsp; <span>Delete</span>
                        </div>

                        <div class="d-flex">
                          <i
                            class="bi bi-pencil cursor-pointer text-nowrap"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#editRateCard"
                            data-bs-whatever="@mdo"
                            style="color: #f9944b"
                            @click="editRateCard(getrate.id)"
                          ></i>
                          &nbsp; Edit
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    colspan="9"
                    class="text-center text-danger"
                    v-if="!isLoading"
                  >
                    {{ "Data Not Found!" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <AddRateCard
      @rateCard="handleRateCardAdded"
      ref="addRateCard"
      @rateCardAdded="showRateCardMethod"
    />
    <EditRateCard
      @EditRateCard="showRateCardMethod"
      :rateCardId="selectedRateCardId || 0"
      ref="editRateCard"
    />
    <loader :isLoading="isLoading"></loader>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <SuccessAlert ref="successAlert" />
  </div>
</template>

<script>
import axios from "axios";
import AddRateCard from "../../../components/modals/CandidatePage/AddRateCard.vue";
import EditRateCard from "../../modals/CandidatePage/EditRateCard.vue";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";
import Loader from "../../Loader/Loader.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";

export default {
  name: "RateCard",
  data() {
    return {
      getRateCard: [],
      selectedRateCardId: 0,
      isLoading: false,
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      selectedRow: null,
      getCandidates: [],
    };
  },
  components: {
    AddRateCard,
    EditRateCard,
    Loader,
    ConfirmationAlert,
    SuccessAlert,
  },
  watch: {
    selectedRateCardId(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.showRateCardMethod();
      }
    },
  },
  methods: {
    async getCandidate() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}`
        );

        this.getCandidates = response.data.candidate;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      }
    },

    handleRateCardAdded() {
      this.$refs.addRateCard.getEmployeeTypeData();
      // setTimeout(() => {
      //   this.$refs.addRateCard.getJobTitleMethod();
      // }, 100);

      setTimeout(() => {
        this.$refs.addRateCard.getClientMethod();
      }, 200);

      // setTimeout(() => {
      //   this.$refs.addRateCard.getTimeShift();
      // }, 300);
    },
    editRateCard(rateCardId) {
      this.selectedRateCardId = rateCardId;
      this.$refs.editRateCard.getEmployeeTypeData();
      setTimeout(() => {
        this.$refs.editRateCard.getPositionMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.editRateCard.getBusinessUnitMethod();
      }, 200);

      // setTimeout(() => {
      //   this.$refs.editRateCard.getTimeShift();
      // }, 300);
    },
    confirmed(id) {
      this.isModalVisible = false;

      // this.rateCardDelete(id);
    },
    canceled() {
      this.isModalVisible = false;
    },
    async rateCardDelete(id) {
      this.confirmMessage = "Are you sure you want delete?";
      this.isModalVisible = true;
      this.confirmCallback = async () => {
        axios.delete(`${VITE_API_URL}/rate_cards/` + id).then((response) => {
          this.showRateCardMethod();
        });
        const message = "Record deleted successfully";
        this.$refs.successAlert.showSuccess(message);

        this.isModalVisible = false;
      };
    },

    async showRateCardMethod() {
      this.isLoading = true;
      await axios
        .get(
          `${VITE_API_URL}/candidate_rate_card_list/${this.$route.params.id}`
        )
        .then((response) => (this.getRateCard = response.data))
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

    //  ratecard apis end
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.showRateCardMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.showRateCardMethod();
    next();
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
