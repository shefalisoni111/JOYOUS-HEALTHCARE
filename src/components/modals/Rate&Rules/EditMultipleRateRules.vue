<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="EditMultipleRateRules"
      aria-labelledby="EditMultipleRateRules"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditMultipleRateRules">
              Edit Multiple Rate and Rules
            </h5>
          </div>
          <div class="modal-body mx-3" style="height: 600px; overflow: auto">
            <div class="row g-3 align-items-center">
              <form v-if="fetchRateRulesData && fetchRateRulesData.length > 0">
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>
                    <!-- {{ console.log(fetchRateRulesData) }} -->
                    <select
                      v-model="fetchRateRulesData[0].client_id"
                      id="selectClients"
                      @change="onClientSelect"
                      :disabled="true"
                      class="text-black"
                    >
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        :id="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.first_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit">Site</label>

                    <select
                      v-model="fetchRateRulesData[0].site_id"
                      id="selectBusinessUnit"
                      @change="onSiteSelect"
                      :disabled="true"
                      class="text-black"
                    >
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectJobTitle">Jobs</label>

                    <select
                      v-model="fetchRateRulesData[0].job_id"
                      id="selectJobTitle"
                      :disabled="true"
                      class="text-black"
                    >
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

                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[0].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[0].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                          v-model="fetchRateRulesData[0].site_shift_id"
                          :disabled="true"
                        >
                           <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                          >
                            {{ option.shift_name }}
                          </option> 
                        </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[0].rate_type"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].client_rate"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].private_limited"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[0].self_employed"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].umbrella"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[0].paye"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[1].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                          v-model="fetchRateRulesData[1].site_shift_id"
                          :disabled="true"
                        >
                          <option
                            v-for="option in shiftsTime"
                            :key="option.id"
                            :value="option.id"
                          >
                            {{ option.shift_name }}
                          </option>
                        </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[1].rate_type"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].client_rate"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].private_limited"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[1].self_employed"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].umbrella"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[1].paye"
                          @change="handleClientRateChange($event, 1)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[2].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[1].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[2].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[2].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[2].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[2].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[1].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[3].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[3].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[3].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[3].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[4].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[4].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[4].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[4].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[4].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[4].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[4].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[4].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[5].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[5].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[5].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[6].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[6].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[6].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[6].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[6].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[6].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[7].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[4].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[7].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select v-model="fetchRateRulesData[7].self_employed">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[7].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[8].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[8].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[8].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[8].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[8].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[8].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[9].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[9].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select v-model="fetchRateRulesData[9].rate_type">
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[9].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[9].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[10].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[10].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[10].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[10].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[10].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[10].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[11].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[11].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[11].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[11].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[11].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">
                    {{ fetchRateRulesData[12].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[12].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[12].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].start_time"
                          @change="updateStartTime"
                          :disabled="true"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].end_time"
                          @change="updateEndTime"
                          :disabled="true"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[12].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[12].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[12].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="fetchRateRulesData[13].shift_type"
                          :disabled="true"
                          style="
                            width: 100%;
                            padding: 10px;
                            border-radius: 5px;
                            outline: none;
                            border: none;
                            background: #e9ecef;
                            color: black;
                          "
                        />
                        <!-- <select
                        v-model="fetchRateRulesData[13].site_shift_id"
                        :disabled="true"
                      >
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select> -->
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].start_time"
                          :disabled="true"
                          @change="updateStartTime"
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

                      <div class="col-4">
                        <label class="form-label" for="selectShiftEnd">End Time</label>

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].end_time"
                          :disabled="true"
                          @change="updateEndTime"
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
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="fetchRateRulesData[13].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <select
                          v-model="fetchRateRulesData[13].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].umbrella"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <select
                          class="form-select w-25"
                          v-model="fetchRateRulesData[13].paye"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#EditMultipleRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              data-bs-dismiss="modal"
              @click.prevent="updateSingleRate()"
            >
              Update
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
  name: "EditMultipleRateRules",
  data() {
    return {
      fetchRateRulesData: {
        id: "",
        rate_and_rule_id: "",
        client_id: "",
        site_id: "",
        site_shift_id: "",
        job_id: "",
        day: "",
        week_name: "",
        shift_type: "",
        rate_type: "",
        shift_type: "",
        start_time: "",
        end_time: "",
        client_rate: "",
        private_limited: "",
        self_employed: "",
        umbrella: "",
        paye: "",
        dayShiftId: null,
        nightShiftId: null,
      },

      businessUnit: [],
      clientData: [],

      options: [],
      ratesArray: [],
      filteredShiftsTime: [],
      shiftsTime: [],
    };
  },
  props: {
    RateRulesId: {
      type: Number,
      required: true,
    },
    SiteID: {
      type: Number,
      required: true,
    },
    jobID: {
      type: Number,
      required: true,
    },
    ids: {
      type: Array,
      required: true,
    },
  },

  components: { SuccessAlert },
  computed: {
    selectBusinessUnit() {
      const businessUnit = this.businessUnit.find(
        (option) => option.id === this.fetchRateRulesData.site_id
      );
      return businessUnit ? businessUnit.site_name : "";
    },
    selectClients() {
      const client = this.clientData.find(
        (option) => option.id === this.fetchRateRulesData.client_id
      );
      return client ? client.first_name : "";
    },

    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchRateRulesData.job_id
      );
      return job_title ? job_title.name : "";
    },
  },
  methods: {
    formatTime(hour) {
      if (typeof hour !== "number" || hour < 0 || hour >= 24) {
        return "Invalid Time";
      }
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
    },
    formatFrom24HourTo12Hour(timeString) {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
    },
    formatTimes(hour) {
      return this.formatTime(hour);
    },
    formatBreakTime(minute) {
      const hours = Math.floor(minute / 60);
      const mins = minute % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours} hour `;
      }
      if (mins > 0) {
        formattedTime += `${mins} minute`;
      }

      return formattedTime;
    },
    convertTo24Hour(timeString) {
      const [time, period] = timeString.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      if (period === "PM" && hours !== 12) {
        hours += 12;
      }
      if (period === "AM" && hours === 12) {
        hours = 0;
      }
      return `${String(hours).padStart(2, "0")}:${minutes}:00`;
    },
    async fetchRateRulesDataMethod(SiteID, jobID) {
      const token = localStorage.getItem("token");
      if (!isNaN(jobID)) {
        try {
          const response = await axios.get(
            `${VITE_API_URL}/find_rates_according_days`,

            {
              headers: {
                "content-type": "application/json",
                Authorization: "bearer " + token,
              },
              params: { site_id: SiteID, job_id: jobID },
            }
          );

          const rateAndRules = response.data;

          this.ratesArray = rateAndRules.flatMap((item) => item.rates);

          if (Array.isArray(this.ratesArray) && this.ratesArray.length > 0) {
            this.fetchRateRulesData = this.ratesArray.map((item) => ({
              rate_and_rule_id: item.rate_and_rule_id,
              client_id: item.client_id,
              site: item.site,
              site_shift_id: item.site_shift_id,
              job_id: item.job_id,
              day: item.day,
              client_rate: item.client_rate,
              rate_type: item.rate_type,
              self_employed: item.self_employed,
              private_limited: item.private_limited,
              start_time: this.formatFrom24HourTo12Hour(item.start_time),
              end_time: this.formatFrom24HourTo12Hour(item.end_time),
              paye: item.paye,
              umbrella: item.umbrella,
              site_id: item.site_id,
              shift_type: item.shift_type,
            }));

            // await this.getTimeShift(this.fetchRateRulesData.site_id);
          }
        } catch (error) {}
      } else {
        // console.error("Invalid jobID:", jobID);
      }
    },

    async updateSingleRate() {
      const token = localStorage.getItem("token");

      const rateAndRules = this.fetchRateRulesData.map((rule) => ({
        id: rule.rate_and_rule_id,
        site_id: rule.site_id,
        client_id: rule.client_id,
        site_shift_id: rule.site_shift_id,
        rate_type: rule.rate_type,
        day: rule.day,
        job_id: rule.job_id,
        paye: rule.paye,
        umbrella: rule.umbrella,
        client_rate: rule.client_rate,
        self_employed: rule.self_employed,
        private_limited: rule.private_limited,
        start_time: this.convertTo24Hour(rule.start_time),
        end_time: this.convertTo24Hour(rule.end_time),
      }));

      try {
        const response = await axios.put(
          `${VITE_API_URL}/update_multiple_rates`,
          {
            rate_and_rules: rateAndRules,
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        );

        this.$emit("editMultipleUpdatedRateRules");

        // alert("Vacancy updated successfully");
        const message = "Rate and Rules Updated successfully";
        this.$refs.successAlert.showSuccess(message);
      } catch (error) {
        // console.error("Error updating vacancy:", error);
      }
    },
    handleClientRateChange(event, index) {
      const selectedClientRate = event.target.value;

      this.id = this.fetchRateRulesData[index].rate_and_rule_id;
      console.log(this.id);
    },
    async getBusinessUnitMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/activated_site`);
        this.businessUnit = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getSiteAccordingClientMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/clients`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },
    // async getTimeShifts() {
    //   await axios
    //     .get(`${VITE_API_URL}/shifts`)
    //     .then((response) => (this.shiftsTime = response.data));
    // },
    async getTimeShift(SiteID) {
      if (!SiteID) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}/site_shift/${SiteID}`);

        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            site_shift_id: shift.id,
            start_time: shift.start_time,
            end_time: shift.end_time,
          })) || [];
        // console.log(this.shiftsTime);
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },

    convertTimeFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
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
    // this.getSiteAccordingClientMethod();
    // this.fetchRateRulesDataMethod(this.SiteID, this.jobID);
    this.getClientMethod();
    this.getTimeShift(this.SiteID);
    this.getJobTitleMethod();
  },
  watch: {
    SiteID(newSiteID, oldSiteID) {
      if (newSiteID !== oldSiteID) {
        this.fetchRateRulesDataMethod(newSiteID, this.jobID);
      }
    },
    jobID(newJobID, oldJobID) {
      if (newJobID !== oldJobID) {
        this.fetchRateRulesDataMethod(this.SiteID, newJobID);
      }
    },
    RateRulesId: {
      immediate: true,
      handler(newRateRulesID) {
        if (newRateRulesID !== 0) {
          this.fetchRateRulesDataMethod(newRateRulesID);
        }
      },
    },

    ids: {
      immediate: true,
      handler(newIds) {
        if (newIds.length > 0) {
          this.fetchRateRulesDataMethod(newIds);
        }
      },
    },
  },
};
</script>

<style scoped>
.modal {
  --bs-modal-width: 1311px;
}
select {
  width: 100% !important;
  padding: 10px !important;
  border-radius: 4px;
  border: 0px;
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
</style>
