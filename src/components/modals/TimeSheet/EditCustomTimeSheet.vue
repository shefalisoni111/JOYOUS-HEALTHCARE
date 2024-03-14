<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editCustomSheet"
      aria-labelledby="editCustomSheet"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editCustomSheet">Edit Custom TimeSheet</h5>
           
          </div>
          <div class="modal-body mx-3">
            <form>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Name</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.name"
                  />
                </div>
              </div>
              <div class="mb-3">
                <div class="">
                  <div class="col-12">
                    <label class="form-label">Business Unit</label>
                  </div>
                  <div class="col-12 mt-1">
                    <select
                      v-model="fetchCustomSheetData.business_unit_id"
                      id="selectBusinessUnit"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Job Title</label>
                </div>
                <div class="col-12 mt-1">
                  <select v-model="fetchCustomSheetData.job_id" id="selectJobTitle">
                    <option
                      v-for="option in options"
                      :key="option.id"
                      :value="option.id"
                      aria-placeholder="Select Job"
                    >
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">Shift</label>
                </div>
                <div class="col-12 mt-1">
                  <select v-model="fetchCustomSheetData.shift_id" id="selectShifts">
                    <option
                      v-for="option in shiftsTime"
                      :key="option.id"
                      :value="option.id"
                      aria-placeholder="Select Job"
                    >
                      {{ option.shift_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <div class="col-12">
                  <label class="form-label">client_rate</label>
                </div>
                <div class="col-12 mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="fetchCustomSheetData.client_rate"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#editCustomSheet"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-on:click="updateCustomTimeSheetMethod()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditCustomTimeSheet",

  data() {
    return {
      fetchCustomSheetData: {
        name: "",
        business_unit_id: "",
        job_id: "",
        shift_id: "",
        client_rate: "",
      },
      businessUnit: [],
      shiftsTime: [],
      options: [],
    };
  },

  computed: {
    selectBusinessUnit() {
      const businessUnit = this.businessUnit.find(
        (option) => option.id === this.fetchCustomSheetData.business_unit_id
      );
      return businessUnit ? businessUnit.name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find(
        (option) => option.id === this.fetchCustomSheetData.job_id
      );
      return job_id ? job_id.name : "";
    },
    selectShifts() {
      const shift = this.shiftsTime.find(
        (option) => option.id === this.fetchCustomSheetData.shift_id
      );
      return shift ? shift.shift_name : "";
    },
  },
  methods: {
    async fetchCustomTimeSheetMethod(id) {
      try {
        const response = await axios.get(`${VITE_API_URL}/custom_timesheets/${id}`);

        this.fetchCustomSheetData.business_unit_id = response.data.business_unit_id;
        this.fetchCustomSheetData.name = response.data.name;
        this.fetchCustomSheetData.job_id = response.data.job_id;
        this.fetchCustomSheetData.shift_id = response.data.shift_id;
        this.fetchCustomSheetData.client_rate = response.data.client_rate;
      } catch (error) {
        // console.error("Error fetching vacancy:", error);
      }
    },
    async updateCustomTimeSheetMethod() {
      try {
        const response = await axios.put(`${VITE_API_URL}/custom_timesheets/${id}`, {
          business_unit_id: this.fetchCustomSheetData.business_unit_id,
          job_id: this.fetchCustomSheetData.job_id,
          name: this.fetchCustomSheetData.name,
          shift_id: this.fetchCustomSheetData.shift_id,
          client_rate: this.fetchCustomSheetData.client_rate,
        });

        alert("Custom timeSheet updated successfully");

        const updatedItem = response.data;

        const index = this.getCustomDetail.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (index !== -1) {
          this.$set(this.getCustomDetail, index, updatedItem);
        } else {
          // console.log("Item not found in the local list");
        }
      } catch (error) {
        // console.error("Error updating custom timeSheet:", error);
      }
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/custom_timesheets`);
        this.businessUnit = response.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },

    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
    },
    async getJobTitleMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/active_job_list`);
        this.options = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
  },

  mounted() {
    this.getBusinessUnitMethod();

    this.getTimeShift();
    this.getJobTitleMethod();
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
