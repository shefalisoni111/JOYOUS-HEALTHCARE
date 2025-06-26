<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addShift" aria-labelledby="addShift">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addShift">Edit Shift</h5>
            <button
              type="button"
              class="custom-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="blurActiveElement"
            ></button>
          </div>
          <div class="modal-body mx-3">
            <div class="mt-3">
              <form>
                <div
                  class="row mb-3 border-bottom pb-4 mx-1"
                  v-for="shift in shifts"
                  :key="shift.id"
                >
                  <div class="col-2 p-0">
                    <label for="" class="form-label fw-medium">{{
                      shift.shift_name
                    }}</label>
                  </div>
                  <!-- <div class="col-10">
                    <div class="d-flex justify-content-around">
                      <div class="col-5">
                        <label for="start-time" class="form-label"
                          >Start Time<span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          :id="'start-time-' + shift.id"
                          :name="'start-time-' + shift.id"
                          class="form-control"
                          v-model="shift.start_time"
                          @input="updateTime(shift, 'start_time', $event.target.value)"
                        />
                      </div>

                      <div class="col-5">
                        <label for="end-time" class="form-label"
                          >End Time<span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          :id="'end-time-' + shift.id"
                          :name="'end-time-' + shift.id"
                          class="form-control"
                          v-model="shift.end_time"
                          @input="updateTime(shift, 'end_time', $event.target.value)"
                        />
                      </div>
                    </div>
                  </div> -->
                  <div class="col-10">
                    <div class="d-flex justify-content-around">
                      <div class="col-5">
                        <label for="start-time" class="form-label"
                          >Start Time<span class="text-danger">*</span></label
                        >
                        <select
                          :id="'start-time-' + shift.id"
                          :name="'start-time-' + shift.id"
                          class="form-select"
                          v-model="shift.start_time"
                          @change="
                            updateTime(shift, 'start_time', $event.target.value)
                          "
                        >
                          <option
                            v-for="hour in 24"
                            :key="hour"
                            :value="formatTime(hour)"
                          >
                            {{ formatTime(hour) }}
                          </option>
                        </select>
                      </div>
                      <div class="col-5">
                        <label for="end-time" class="form-label"
                          >End Time<span class="text-danger">*</span></label
                        >
                        <select
                          :id="'end-time-' + shift.id"
                          :name="'end-time-' + shift.id"
                          class="form-select"
                          v-model="shift.end_time"
                          @change="
                            updateTime(shift, 'end_time', $event.target.value)
                          "
                        >
                          <option
                            v-for="hour in 24"
                            :key="hour"
                            :value="formatTime(hour)"
                          >
                            {{ formatTime(hour) }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-dark btn-cancel" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click="updateShift"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlertRef" />
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import axios from "axios";
function formatTime(time) {
  if (!time) {
    return "";
  }

  if (time.endsWith("Z")) {
    const date = new Date(time);

    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formattedTime;
  }

  return time;
}
export default {
  setup() {
    const { emit } = getCurrentInstance();

    const shifts = ref([]);

    const successAlertRef = ref(null);

    const updateShift = async () => {
      let updatedShifts = [];

      try {
        updatedShifts = await Promise.all(
          shifts.value.map(async (shift) => {
            const response = await axios.put(
              `${VITE_API_URL}/shifts/${shift.id}`,
              {
                start_time: shift.start_time,
                end_time: shift.end_time,
              }
            );
            return {
              ...response.data,
              start_time: response.data.start_time,
              end_time: response.data.end_time,
            };
          })
        );

        emit("shift-updated", updatedShifts);
        // alert("Shift Add Successful");
        const message = "Shift Add Successful";
        if (successAlertRef.value) {
          successAlertRef.value.showSuccess(message);
        }
      } catch (error) {
        // console.error("Error updating shifts:", error);
      }
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/shifts`);
        shifts.value = response.data || [];
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    };

    const updateTime = (shift, property, value) => {
      shift[property] = value;
    };

    fetchShifts();

    return {
      shifts,
      updateShift,
      fetchShifts,
      updateTime,
      successAlertRef,
    };
  },
  components: {
    SuccessAlert,
  },
  methods: {
    formatTime(hour) {
      if (hour === 0) {
        return "12:00 AM";
      } else if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return "12:00 AM";
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchShifts();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.fetchShifts();
    next();
  },
  mounted() {
    // this.fetchShifts();
  },
};
</script>
