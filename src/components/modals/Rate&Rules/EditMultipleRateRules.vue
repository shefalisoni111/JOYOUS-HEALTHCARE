<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="EditMultipleRateRules"
      aria-labelledby="EditMultipleRateRules"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EditMultipleRateRules">
              Edit Multiple Rate and Rules
              <!-- {{ jobID }} {{ SiteID }} {{ ClientID }} -->
            </h5>
          </div>
          <div class="modal-body mx-3" style="height: 600px; overflow: auto">
            <div class="row g-3 align-items-center">
              <form v-if="ratesArray && ratesArray.length > 0">
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>

                    <select
                      v-model="ratesArray[0].client_id"
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
                        {{ option.client_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit"
                      >Site</label
                    >

                    <select
                      v-model="ratesArray[0].site_id"
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
                      v-model="ratesArray[0].job_id"
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
                    {{ ratesArray[0].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[0].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[0].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[0].end_time"
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
                          v-model="ratesArray[0].rate_type"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[0].client_rate"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[0].client_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `clientRate`,
                              0,
                              ratesArray[0].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[0].private_limited"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[0].private_limited"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `privateLimited`,
                              0,
                              ratesArray[0].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[0].self_employed"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[0].self_employed"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              0,
                              ratesArray[0].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[0].umbrella"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[0].umbrella"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(`umbrella`, 0, ratesArray[0].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[0].paye"
                          @change="handleClientRateChange($event, 0)"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[0].paye"
                          @change="handleClientRateChange($event, 0)"
                          @input="handleInput(`paye`, 0, ratesArray[0].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[1].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[1].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[1].end_time"
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
                          v-model="ratesArray[1].rate_type"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[1].client_rate"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[1].client_rate"
                          :disabled="ratesArray[1].split_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `clientRate`,
                              1,
                              ratesArray[1].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[1].private_limited"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[1].private_limited"
                          :disabled="ratesArray[1].split_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `privateLimited`,
                              1,
                              ratesArray[1].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[1].self_employed"
                          class="form-select w-25"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[1].self_employed"
                          :disabled="ratesArray[1].split_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              1,
                              ratesArray[1].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[1].umbrella"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[1].umbrella"
                          :disabled="ratesArray[1].split_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="
                            handleInput(`umbrella`, 1, ratesArray[1].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[1].paye"
                          @change="handleClientRateChange($event, 1)"
                          :disabled="ratesArray[1].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[1].paye"
                          :disabled="ratesArray[1].split_rate"
                          @change="handleClientRateChange($event, 0)"
                          @input="handleInput(`paye`, 1, ratesArray[1].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[2].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[2].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[2].end_time"
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
                          v-model="ratesArray[2].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[2].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[2].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              2,
                              ratesArray[2].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[2].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[2].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              2,
                              ratesArray[2].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[2].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[2].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              2,
                              ratesArray[2].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[2].umbrella">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[2].umbrella"
                          @input="
                            handleInput(`umbrella`, 2, ratesArray[2].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[2].paye">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[2].paye"
                          @input="handleInput(`paye`, 2, ratesArray[2].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[3].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[3].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[3].end_time"
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
                          v-model="ratesArray[3].rate_type"
                          class="form-select w-25"
                          :disabled="ratesArray[3].split_rate"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[3].client_rate"
                          :disabled="ratesArray[3].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[3].client_rate"
                          :disabled="ratesArray[3].split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              3,
                              ratesArray[3].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[3].private_limited"
                          :disabled="ratesArray[3].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[3].private_limited"
                          :disabled="ratesArray[3].split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              3,
                              ratesArray[3].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[3].self_employed"
                          :disabled="ratesArray[3].split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[3].self_employed"
                          :disabled="ratesArray[3].split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              3,
                              ratesArray[3].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[3].umbrella"
                          :disabled="ratesArray[3].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[3].umbrella"
                          :disabled="ratesArray[3].split_rate"
                          @input="
                            handleInput(`umbrella`, 3, ratesArray[3].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[3].paye"
                          :disabled="ratesArray[3].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[3].paye"
                          :disabled="ratesArray[3].split_rate"
                          @input="handleInput(`paye`, 3, ratesArray[3].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[4].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[4].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[4].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[4].end_time"
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
                          v-model="ratesArray[4].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[4].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[4].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              4,
                              ratesArray[4].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[4].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[4].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              4,
                              ratesArray[4].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[4].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[4].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              4,
                              ratesArray[4].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[4].umbrella">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[4].umbrella"
                          @input="
                            handleInput(`umbrella`, 4, ratesArray[4].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[4].paye">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[4].paye"
                          @input="handleInput(`paye`, 4, ratesArray[4].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[5].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[5].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[5].end_time"
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
                          v-model="ratesArray[5].rate_type"
                          :disabled="ratesArray[5].split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[5].client_rate"
                          :disabled="ratesArray[5].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[5].client_rate"
                          :disabled="ratesArray[5].split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              5,
                              ratesArray[5].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[5].private_limited"
                          :disabled="ratesArray[5].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[5].private_limited"
                          :disabled="ratesArray[5].split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              5,
                              ratesArray[5].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[5].self_employed"
                          :disabled="ratesArray[5].split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[5].self_employed"
                          :disabled="ratesArray[5].split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              5,
                              ratesArray[5].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[5].umbrella"
                          :disabled="ratesArray[5].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[5].umbrella"
                          :disabled="ratesArray[5].split_rate"
                          @input="
                            handleInput(`umbrella`, 5, ratesArray[5].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[5].paye"
                          :disabled="ratesArray[5].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[5].paye"
                          :disabled="ratesArray[5].split_rate"
                          @input="handleInput(`paye`, 5, ratesArray[5].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[6].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[6].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[6].end_time"
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
                          v-model="ratesArray[6].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[6].client_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[6].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              6,
                              ratesArray[6].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[6].private_limited"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[6].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              6,
                              ratesArray[6].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[6].self_employed"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[6].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              6,
                              ratesArray[6].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[6].umbrella">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[6].umbrella"
                          @input="
                            handleInput(`umbrella`, 6, ratesArray[6].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select class="form-select w-25" v-model="ratesArray[6].paye">
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[6].paye"
                          @input="handleInput(`paye`, 6, ratesArray[6].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[7].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[7].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[7].end_time"
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
                          v-model="ratesArray[7].rate_type"
                          :disabled="ratesArray[7].split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[7].client_rate"
                          :disabled="ratesArray[7].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[7].client_rate"
                          :disabled="ratesArray[7].split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              7,
                              ratesArray[7].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[7].private_limited"
                          :disabled="ratesArray[7].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[7].private_limited"
                          :disabled="ratesArray[7].split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              7,
                              ratesArray[7].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[7].self_employed"
                          :disabled="ratesArray[7].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[7].self_employed"
                          :disabled="ratesArray[7].split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              7,
                              ratesArray[7].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[7].umbrella"
                          :disabled="ratesArray[7].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[7].umbrella"
                          :disabled="ratesArray[7].split_rate"
                          @input="
                            handleInput(`umbrella`, 7, ratesArray[7].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[7].paye"
                          :disabled="ratesArray[7].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[7].paye"
                          :disabled="ratesArray[7].split_rate"
                          @input="handleInput(`paye`, 7, ratesArray[7].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[8].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[8].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[8].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[8].end_time"
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
                          v-model="ratesArray[8].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[8].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              8,
                              ratesArray[8].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[8].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              8,
                              ratesArray[8].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[8].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              8,
                              ratesArray[8].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[8].umbrella"
                          @input="
                            handleInput(`umbrella`, 8, ratesArray[8].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[8].paye"
                          @input="handleInput(`paye`, 8, ratesArray[8].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[9].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[9].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[9].end_time"
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
                          class="form-select w-25"
                          v-model="ratesArray[9].rate_type"
                          :disabled="ratesArray[9].split_rate"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[9].client_rate"
                          :disabled="ratesArray[9].split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              9,
                              ratesArray[9].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[9].private_limited"
                          :disabled="ratesArray[9].split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              9,
                              ratesArray[9].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[9].self_employed"
                          :disabled="ratesArray[9].split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[9].self_employed"
                          :disabled="ratesArray[9].split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              9,
                              ratesArray[9].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[9].umbrella"
                          :disabled="ratesArray[9].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[9].umbrella"
                          :disabled="ratesArray[9].split_rate"
                          @input="
                            handleInput(`umbrella`, 9, ratesArray[9].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[9].paye"
                          :disabled="ratesArray[9].split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[9].paye"
                          :disabled="ratesArray[9].split_rate"
                          @input="handleInput(`paye`, 9, ratesArray[9].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[10].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[10].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[10].end_time"
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
                          v-model="ratesArray[10].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[10].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              10,
                              ratesArray[10].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[10].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              10,
                              ratesArray[10].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[10].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              10,
                              ratesArray[10].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[10].umbrella"
                          @input="
                            handleInput(`umbrella`, 10, ratesArray[10].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[10].paye"
                          @input="handleInput(`paye`, 10, ratesArray[10].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[11].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[11].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[11].end_time"
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
                          v-model="ratesArray[11].rate_type"
                          :disabled="ratesArray[11].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[11].client_rate"
                          :disabled="ratesArray[11].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[11].client_rate"
                          :disabled="ratesArray[11].holiday_split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              11,
                              ratesArray[11].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[11].private_limited"
                          :disabled="ratesArray[11].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[11].private_limited"
                          :disabled="ratesArray[11].holiday_split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              11,
                              ratesArray[11].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>
                        <!-- 
                        <select
                          v-model="ratesArray[11].self_employed"
                          :disabled="ratesArray[11].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[11].self_employed"
                          :disabled="ratesArray[11].holiday_split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              11,
                              ratesArray[11].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[11].umbrella"
                          :disabled="ratesArray[11].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[11].umbrella"
                          :disabled="ratesArray[11].holiday_split_rate"
                          @input="
                            handleInput(`umbrella`, 11, ratesArray[11].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[11].paye"
                          :disabled="ratesArray[11].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[11].paye"
                          :disabled="ratesArray[11].holiday_split_rate"
                          @input="handleInput(`paye`, 11, ratesArray[11].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[12].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[12].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[12].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[12].end_time"
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
                          v-model="ratesArray[12].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[12].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              12,
                              ratesArray[12].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[12].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[12].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[12].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              12,
                              ratesArray[12].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[12].umbrella"
                          @input="
                            handleInput(`umbrella`, 12, ratesArray[12].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[12].paye"
                          @input="handleInput(`paye`, 12, ratesArray[12].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[13].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[13].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[13].end_time"
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
                          v-model="ratesArray[13].rate_type"
                          :disabled="ratesArray[13].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[13].client_rate"
                          :disabled="ratesArray[13].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[13].client_rate"
                          :disabled="ratesArray[13].holiday_split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              13,
                              ratesArray[13].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[13].private_limited"
                          :disabled="ratesArray[13].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[13].private_limited"
                          :disabled="ratesArray[13].holiday_split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              13,
                              ratesArray[13].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[13].self_employed"
                          :disabled="ratesArray[13].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[13].self_employed"
                          :disabled="ratesArray[13].holiday_split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              13,
                              ratesArray[13].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[13].umbrella"
                          :disabled="ratesArray[13].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[13].umbrella"
                          :disabled="ratesArray[13].holiday_split_rate"
                          @input="
                            handleInput(`umbrella`, 13, ratesArray[13].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[13].paye"
                          :disabled="ratesArray[13].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[13].paye"
                          :disabled="ratesArray[13].holiday_split_rate"
                          @input="handleInput(`paye`, 13, ratesArray[13].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[14].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[14].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[14].end_time"
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
                          v-model="ratesArray[14].rate_type"
                          :disabled="ratesArray[14].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[14].client_rate"
                          :disabled="ratesArray[14].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[14].client_rate"
                          :disabled="ratesArray[14].holiday_split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              14,
                              ratesArray[14].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[14].private_limited"
                          :disabled="ratesArray[14].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[14].private_limited"
                          :disabled="ratesArray[14].holiday_split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              14,
                              ratesArray[14].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[14].self_employed"
                          :disabled="ratesArray[14].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[14].self_employed"
                          :disabled="ratesArray[14].holiday_split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              14,
                              ratesArray[14].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[14].umbrella"
                          :disabled="ratesArray[14].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[14].umbrella"
                          :disabled="ratesArray[14].holiday_split_rate"
                          @input="
                            handleInput(`umbrella`, 14, ratesArray[14].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[14].paye"
                          :disabled="ratesArray[14].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[14].paye"
                          :disabled="ratesArray[14].holiday_split_rate"
                          @input="handleInput(`paye`, 14, ratesArray[14].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[15].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[15].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[15].end_time"
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
                          v-model="ratesArray[15].rate_type"
                          :disabled="ratesArray[15].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[15].client_rate"
                          :disabled="ratesArray[15].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[15].client_rate"
                          :disabled="ratesArray[15].holiday_split_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              15,
                              ratesArray[15].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[15].private_limited"
                          :disabled="ratesArray[15].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[15].private_limited"
                          :disabled="ratesArray[15].holiday_split_rate"
                          @input="
                            handleInput(
                              `privateLimited`,
                              15,
                              ratesArray[15].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <!-- <select
                          v-model="ratesArray[15].self_employed"
                          :disabled="ratesArray[15].holiday_split_rate"
                          class="form-select w-25"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[15].self_employed"
                          :disabled="ratesArray[15].holiday_split_rate"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              15,
                              ratesArray[15].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[15].umbrella"
                          :disabled="ratesArray[15].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[15].umbrella"
                          :disabled="ratesArray[15].holiday_split_rate"
                          @input="
                            handleInput(`umbrella`, 15, ratesArray[15].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <!-- <select
                          class="form-select w-25"
                          v-model="ratesArray[15].paye"
                          :disabled="ratesArray[15].holiday_split_rate"
                        >
                          <option>1</option>
                          <option>5</option>
                          <option>10</option>
                          <option>15</option>
                          <option>20</option>
                        </select> -->
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[15].paye"
                          :disabled="ratesArray[15].holiday_split_rate"
                          @input="handleInput(`paye`, 15, ratesArray[15].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[16].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[16].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[16].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[16].end_time"
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
                          v-model="ratesArray[16].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[16].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              12,
                              ratesArray[16].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[16].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[16].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[16].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              16,
                              ratesArray[16].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[16].umbrella"
                          @input="
                            handleInput(`umbrella`, 16, ratesArray[16].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[16].paye"
                          @input="handleInput(`paye`, 16, ratesArray[16].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[17].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[17].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[17].end_time"
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
                          v-model="ratesArray[17].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[17].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              17,
                              ratesArray[17].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[17].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[17].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[17].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              17,
                              ratesArray[17].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[17].umbrella"
                          @input="
                            handleInput(`umbrella`, 17, ratesArray[17].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[17].paye"
                          @input="handleInput(`paye`, 17, ratesArray[17].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[18].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[18].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[18].end_time"
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
                          v-model="ratesArray[18].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[18].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              18,
                              ratesArray[18].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[18].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[18].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[18].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              18,
                              ratesArray[18].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[18].umbrella"
                          @input="
                            handleInput(`umbrella`, 18, ratesArray[18].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[18].paye"
                          @input="handleInput(`paye`, 18, ratesArray[18].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[19].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[19].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[19].end_time"
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
                          v-model="ratesArray[19].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[19].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              19,
                              ratesArray[19].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[19].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[19].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[19].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              19,
                              ratesArray[19].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[19].umbrella"
                          @input="
                            handleInput(`umbrella`, 19, ratesArray[19].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[19].paye"
                          @input="handleInput(`paye`, 19, ratesArray[19].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[20].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[20].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[20].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[20].end_time"
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
                          v-model="ratesArray[20].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[20].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              20,
                              ratesArray[20].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[20].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[20].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[20].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              20,
                              ratesArray[20].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[20].umbrella"
                          @input="
                            handleInput(`umbrella`, 20, ratesArray[20].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[20].paye"
                          @input="handleInput(`paye`, 20, ratesArray[20].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[21].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[21].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[21].end_time"
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
                          v-model="ratesArray[21].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[21].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              21,
                              ratesArray[21].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[21].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[21].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[21].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              21,
                              ratesArray[21].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[21].umbrella"
                          @input="
                            handleInput(`umbrella`, 21, ratesArray[21].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[21].paye"
                          @input="handleInput(`paye`, 21, ratesArray[21].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[22].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[22].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[22].end_time"
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
                          v-model="ratesArray[22].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[22].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              22,
                              ratesArray[22].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[22].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[22].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[22].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              22,
                              ratesArray[22].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[22].umbrella"
                          @input="
                            handleInput(`umbrella`, 22, ratesArray[22].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[22].paye"
                          @input="handleInput(`paye`, 22, ratesArray[22].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[23].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[23].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[23].end_time"
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
                          v-model="ratesArray[23].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[23].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              23,
                              ratesArray[23].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[23].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[23].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[23].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              23,
                              ratesArray[23].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[23].umbrella"
                          @input="
                            handleInput(`umbrella`, 23, ratesArray[23].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[23].paye"
                          @input="handleInput(`paye`, 23, ratesArray[23].paye)"
                          maxlength="3"
                        />
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
                    {{ ratesArray[24].day }}
                  </h5>

                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[24].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[24].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[24].end_time"
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
                          v-model="ratesArray[24].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[24].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              24,
                              ratesArray[24].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[24].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[24].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[24].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              24,
                              ratesArray[24].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[24].umbrella"
                          @input="
                            handleInput(`umbrella`, 24, ratesArray[24].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[24].paye"
                          @input="handleInput(`paye`, 24, ratesArray[24].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[25].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-25"
                          v-model="ratesArray[25].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-25"
                          v-model="ratesArray[25].end_time"
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
                          v-model="ratesArray[25].rate_type"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[25].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              25,
                              ratesArray[25].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[25].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[25].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[25].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              25,
                              ratesArray[25].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[25].umbrella"
                          @input="
                            handleInput(`umbrella`, 25, ratesArray[25].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[25].paye"
                          @input="handleInput(`paye`, 25, ratesArray[25].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[26].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-26"
                          v-model="ratesArray[26].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-26"
                          v-model="ratesArray[26].end_time"
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
                          v-model="ratesArray[26].rate_type"
                          class="form-select w-26"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[26].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              26,
                              ratesArray[26].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[26].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[26].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[26].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              26,
                              ratesArray[26].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[26].umbrella"
                          @input="
                            handleInput(`umbrella`, 26, ratesArray[26].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[26].paye"
                          @input="handleInput(`paye`, 26, ratesArray[26].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift</label>
                        <input
                          type="text"
                          v-model="ratesArray[27].shift_type"
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
                      </div>

                      <div class="col-4">
                        <label class="form-label" for="selectShiftStart"
                          >Start Time</label
                        >

                        <select
                          id="selectShiftStart"
                          class="form-select w-27"
                          v-model="ratesArray[27].start_time"
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
                        <label class="form-label" for="selectShiftEnd"
                          >End Time</label
                        >

                        <select
                          id="selectShiftEnd"
                          class="form-select w-27"
                          v-model="ratesArray[27].end_time"
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
                          v-model="ratesArray[27].rate_type"
                          class="form-select w-27"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[27].client_rate"
                          @input="
                            handleInput(
                              `clientRate`,
                              27,
                              ratesArray[27].client_rate
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[27].private_limited"
                          @input="
                            handleInput(
                              `privateLimited`,
                              12,
                              ratesArray[27].private_limited
                            )
                          "
                          maxlength="3"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[27].self_employed"
                          @input="
                            handleInput(
                              `selfEmployee`,
                              27,
                              ratesArray[27].self_employed
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[27].umbrella"
                          @input="
                            handleInput(`umbrella`, 27, ratesArray[27].umbrella)
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="ratesArray[27].paye"
                          @input="handleInput(`paye`, 27, ratesArray[27].paye)"
                          maxlength="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark btn-cancel"
              data-bs-target="#EditMultipleRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary rounded-4 text-capitalize fw-medium"
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
        split_rate: false,
        holiday_split_rate: false,
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
    rate_ids: {
      type: Array,
      required: true,
    },
    ClientID: {
      type: Number,
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
      const clientData = this.clientData.find(
        (option) => option.id === this.fetchRateRulesData.client_id
      );
      return clientData ? clientData.client_name : "";
    },

    selectJobTitle() {
      const job_title = this.options.find(
        (option) => option.id === this.fetchRateRulesData.job_id
      );
      return job_title ? job_title.name : "";
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    handleInput(field, index, value) {
      const filteredValue = value.replace(/[^0-9]/g, "");

      if (field === "clientRate") {
        this.ratesArray[index].client_rate = filteredValue;
      } else if (field === "privateLimited") {
        this.ratesArray[index].private_limited = filteredValue;
      } else if (field === "selfEmployee") {
        this.ratesArray[index].self_employed = filteredValue;
      } else if (field === "umbrella") {
        this.ratesArray[index].umbrella = filteredValue;
      } else if (field === "paye") {
        this.ratesArray[index].paye = filteredValue;
      }
    },
    formatTime(hour) {
      if (typeof hour !== "number" || hour < 0 || hour >= 24) {
        return "Invalid Time";
      }
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${String(formattedHour).padStart(2, "0")}:00 ${period}`;
    },
    formatFrom24HourTo12Hour(timeString) {
      if (!timeString) return "";
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
      if (!SiteID || !jobID) {
        // console.error("Invalid SiteID or jobID:", SiteID, jobID);
        return;
      }
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

          this.ratesArray = this.ratesArray.map((item) => {
            return {
              rate_and_rule_id: item.rate_and_rule_id,
              client_id: item.client_id,
              site_id: item.site_id,

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
              shift_type: item.shift_type.replace(/_/g, " "),
              split_rate: item.split_rate,
              holiday_split_rate: item.holiday_split_rate,
            };
          });
          // console.log(this.ratesArray);
        } catch (error) {}
      } else {
        // console.error("Invalid jobID:", jobID);
      }
    },

    async updateSingleRate() {
      const token = localStorage.getItem("token");

      const rateAndRules = this.ratesArray.map((rule) => ({
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
        shift_type: rule.shift_type.replace(/_/g, " "),
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

      this.id = this.ratesArray[index].rate_and_rule_id;
      // console.log(this.id);
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
          `${VITE_API_URL}/site_according_client/${this.ClientID}`
        );
        this.clientData = response.data.site;
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
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);
        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },

    async getTimeShift(SiteID) {
      if (!SiteID) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_shift/${SiteID}`
        );

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
    this.fetchRateRulesDataMethod();
    this.getClientMethod();
    this.getTimeShift();
  },
  created() {
    this.fetchRateRulesDataMethod();
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

    rate_ids: {
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
.form-control {
  padding: 0.6rem 0.75rem;
}
.modal-body {
  border-radius: 5px;
  background: #dbdbdb;
}
</style>
