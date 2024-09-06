<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addRateRules"
      aria-labelledby="addRateRules"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRateRules">Add Rate</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-3" style="height: 600px; overflow: auto">
            <div class="row g-3 align-items-center">
              <form>
                <div class="mb-3 d-flex justify-content-between gap-2 me-3">
                  <div class="col-4">
                    <label for="selectClients" class="form-label">Client</label>

                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="onClientSelect"
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
                      id="siteSelect"
                      v-model="selectedSiteId"
                      @change="onSiteSelect"
                    >
                      <option
                        v-for="site in businessUnit"
                        :key="site.site_id"
                        :value="site.site_id"
                      >
                        {{ site.site_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectJobTitle">Jobs</label>

                    <select
                      v-model="selectedJobId"
                      id="selectJobTitle"
                      @change="onJobTitleChange"
                    >
                      <option
                        v-for="option in options"
                        :key="option.job_id"
                        :value="option.job_id"
                      >
                        {{ option.job_name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  v-for="(day, index) in days"
                  :key="index"
                  :value="day"
                  class="mt-2"
                  style="
                    background-color: rgb(203 203 203);
                    padding: 10px;
                    border-radius: 3px;
                  "
                >
                  <h5 class="fw-bold text-capitalize">{{ day }}</h5>
                  <template v-if="day !== 'Saturday' && day !== 'Sunday'">
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            class="form-select w-25"
                            v-model="day_shift_id"
                            @change="handleShiftChange('day')"
                            disabled
                          >
                            <option
                              v-for="option in filteredShiftsTime"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftStart"
                            >Start Time</label
                          >

                          <select
                            id="selectShiftStart"
                            class="form-select w-25"
                            v-model="day_start_time"
                            @change="updateStartTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTime"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== day_shift_id"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftEnd">End Time</label>

                          <select
                            id="selectShiftEnd"
                            class="form-select w-25"
                            v-model="day_end_time"
                            @change="updateEndTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTime"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== day_shift_id"
                            >
                              {{ shift.end_time }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>

                          <select
                            class="form-select w-25"
                            v-model="this.selectedRateType[`${day}-day`]"
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
                            v-model="selectedClientRate[`${day}-day`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-day`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-day`]"
                            class="form-select w-25"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-day`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-day`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            class="form-select w-25"
                            v-model="night_shift_id"
                            @change="handleShiftChange('night')"
                            disabled
                          >
                            <option
                              v-for="option in filteredShiftsTimeNight"
                              :key="option.id"
                              :value="option.id"
                              aria-placeholder="Select Job"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftStartNight"
                            >Start Time</label
                          >

                          <select
                            id="selectShiftStartNight"
                            class="form-select w-25"
                            v-model="night_start_time"
                            @change="updateStartTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeNight"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== night_shift_id"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label" for="selectShiftEndNight"
                            >End Time</label
                          >

                          <select
                            id="selectShiftEndNight"
                            class="form-select w-25"
                            v-model="night_end_time"
                            @change="updateEndTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeNight"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== night_shift_id"
                            >
                              {{ shift.end_time }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-if="splitRate">
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>
                          <select
                            v-model="selectedRateType[`${day}-day`]"
                            class="form-select w-25"
                            disabled
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
                            v-model="selectedClientRate[`${day}-day`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-day`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-else>
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>
                          <select
                            v-model="this.selectedRateType[`${day}-night`]"
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
                            v-model="selectedClientRate[`${day}-night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-if="splitRate">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-day`]"
                            class="form-select w-25"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-day`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-day`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-else>
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-night`]"
                            class="form-select w-25"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="dayShiftId"
                            class="form-select w-25"
                            @change="handleShiftChange('holiday_day_shift')"
                            disabled
                          >
                            <option
                              v-for="option in filteredShiftsTimeHoliday"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Start Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_start_time"
                            @change="updateStartTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHoliday"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== dayShiftId"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">End Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_end_time"
                            @change="updateEndTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHoliday"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== dayShiftId"
                            >
                              {{ shift.end_time }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>

                          <select
                            v-model="selectedRateType[`${day}-holiday`]"
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
                            v-model="selectedClientRate[`${day}-holiday`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-holiday`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-holiday`]"
                            class="form-select w-25"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-holiday`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-holiday`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                      <div class="col-3 d-flex gap-2">
                        <div class="col-4">
                          <label class="form-label">Shift</label>

                          <select
                            v-model="nightShiftId"
                            class="form-select w-25"
                            @change="handleShiftChange('holiday_night_shift')"
                            disabled
                          >
                            <option
                              v-for="option in filteredShiftsTimeHolidayNight"
                              :key="option.id"
                              :value="option.id"
                              aria-placeholder="Select Job"
                            >
                              {{ option.shift_name }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Start Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_night_start_time"
                            @change="updateStartTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHolidayNight"
                              :key="shift.id"
                              :value="shift.start_time"
                              :disabled="shift.id !== nightShiftId"
                            >
                              {{ shift.start_time }}
                            </option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">End Time</label>

                          <select
                            class="form-select w-25"
                            v-model="holiday_night_end_time"
                            @change="updateEndTime"
                            disabled
                          >
                            <option
                              v-for="shift in filteredShiftsTimeHolidayNight"
                              :key="shift.id"
                              :value="shift.end_time"
                              :disabled="shift.id !== nightShiftId"
                            >
                              {{ shift.end_time }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-if="holidaySplitRate">
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>
                          <select
                            v-model="selectedRateType[`${day}-holiday`]"
                            class="form-select w-25"
                            disabled
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
                            v-model="selectedClientRate[`${day}-holiday`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-holiday`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-else>
                        <div class="col-4">
                          <label class="form-label">Rate Type</label>
                          <select
                            v-model="selectedRateType[`${day}-holiday_night`]"
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
                            v-model="selectedClientRate[`${day}-holiday_night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Private Limited</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedPrivateLimited[`${day}-holiday_night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-if="holidaySplitRate">
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-holiday`]"
                            class="form-select w-25"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-holiday`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-holiday`]"
                            disabled
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-4 d-flex gap-2" v-else>
                        <div class="col-4">
                          <label class="form-label">Self Employed</label>

                          <select
                            v-model="selectedSelfEmployee[`${day}-holiday_night`]"
                            class="form-select w-25"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">Umbrella</label>

                          <select
                            class="form-select w-25"
                            v-model="selectedUmbrella[`${day}-holiday_night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label class="form-label">PAYE</label>
                          <select
                            class="form-select w-25"
                            v-model="selectedPaye[`${day}-holiday_night`]"
                          >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary rounded-1"
              data-bs-target="#addRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormValid()"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-bind:data-bs-dismiss="isFormValid() ? 'modal' : null"
              v-on:click="addVacancyMethod()"
            >
              Add Rate
            </button>
            <!-- <button
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-bind:data-bs-dismiss="isFormValid ? 'modal' : null"
              v-on:click="addVacancyMethod()"
            >
              Add Rate
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
    <NotSuccessAlertVue ref="dangerAlert" />
  </div>
</template>

<script>
import axios from "axios";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import NotSuccessAlertVue from "../../Alerts/NotSuccessAlert.vue";

export default {
  name: "AddRateRules",
  data() {
    return {
      start_time: null,
      end_time: null,
      day_start_time: null,
      day_end_time: null,
      night_start_time: null,
      night_end_time: null,
      holiday_start_time: null,
      holiday_end_time: null,
      holiday_night_start_time: null,
      holiday_night_end_time: null,
      day_shift_id: null,
      night_shift_id: null,
      client_rate: "",
      rate_type: "",

      self_employed: "",
      private_limited: "",

      day: "",
      umbrella: "",
      paye: "",
      shift_type: "",
      dayShiftId: null,
      nightShiftId: null,
      filteredShiftsTime: [],
      filteredShiftsTimeNight: [],
      validationStartTime: true,
      filteredShiftsTimeHoliday: [],
      filteredShiftsTimeHolidayNight: [],
      validationEndTime: true,

      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectedClientRate: {},
      selectedRateType: {},
      selectedPrivateLimited: {},
      selectedSelfEmployee: {},
      selectedUmbrella: {},
      selectedPaye: {},
      showDayShift: true,
      showNightShift: false,
      site_id: null,
      client_id: null,
      clientData: [],
      job_id: null,
      options: [],
      businessUnit: [],
      selectedSiteId: null,
      selectedJobId: null,
      site_shift_id: "",
      shiftsTime: [],
      selectedJob: null,
      isValidForm: false,
      selectedDate: null,
      splitRate: false,
      holidaySplitRate: false,
    };
  },

  components: { SuccessAlert, NotSuccessAlertVue },
  computed: {
    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return this.client_id;
    },

    selectShiftStart() {
      const shift = this.filteredShiftsTime.find(
        (shift) => shift.id === this.day_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEnd() {
      const shift = this.filteredShiftsTime.find(
        (shift) => shift.id === this.day_shift_id
      );
      return shift ? shift.end_time : "";
    },
    selectShiftStartNight() {
      const shift = this.filteredShiftsTimeNight.find(
        (shift) => shift.id === this.night_shift_id
      );
      return shift ? shift.start_time : "";
    },
    selectShiftEndNight() {
      const shift = this.filteredShiftsTimeNight.find(
        (shift) => shift.id === this.night_shift_id
      );
      return shift ? shift.end_time : "";
    },
  },
  watch: {},
  methods: {
    isFormValid() {
      const site_id_valid = this.selectedSiteId !== null;
      const job_id_valid = this.selectedJobId !== null;
      const night_shift_id_valid = this.night_shift_id !== null;
      const client_id_valid = this.client_id !== null;
      const night_start_time_valid = this.night_start_time !== "";
      const night_end_time_valid = this.night_end_time !== "";
      const selectedClientRate_valid = this.areAllFieldsFilled(this.selectedClientRate);
      const selectedRateType_valid = this.areAllFieldsFilled(this.selectedRateType);
      const selectedPrivateLimited_valid = this.areAllFieldsFilled(
        this.selectedPrivateLimited
      );
      const selectedSelfEmployee_valid = this.areAllFieldsFilled(
        this.selectedSelfEmployee
      );
      const selectedUmbrella_valid = this.areAllFieldsFilled(this.selectedUmbrella);
      const selectedPaye_valid = this.areAllFieldsFilled(this.selectedPaye);
      const holiday_start_time_valid = this.holiday_start_time !== "";
      const holiday_end_time_valid = this.holiday_end_time !== "";
      const holiday_night_start_time_valid = this.holiday_night_start_time !== "";
      const holiday_night_end_time_valid = this.holiday_night_end_time !== "";
      const day_start_time_valid = this.day_start_time !== "";
      const day_end_time_valid = this.day_end_time !== "";
      const dayShiftId_valid = this.dayShiftId !== null;
      const nightShiftId_valid = this.nightShiftId !== null;
      const day_shift_id_valid = this.day_shift_id !== null;

      const allFieldsFilled =
        site_id_valid &&
        job_id_valid &&
        night_shift_id_valid &&
        client_id_valid &&
        night_start_time_valid &&
        night_end_time_valid &&
        selectedClientRate_valid &&
        selectedRateType_valid &&
        selectedPrivateLimited_valid &&
        selectedSelfEmployee_valid &&
        selectedUmbrella_valid &&
        selectedPaye_valid &&
        holiday_start_time_valid &&
        holiday_end_time_valid &&
        holiday_night_start_time_valid &&
        holiday_night_end_time_valid &&
        day_start_time_valid &&
        day_end_time_valid &&
        dayShiftId_valid &&
        nightShiftId_valid &&
        day_shift_id_valid;

      return allFieldsFilled;
    },

    areAllFieldsFilled(object) {
      const keys = Object.keys(object);
      let requiredFieldCount;

      if (this.splitRate === false && this.holidaySplitRate === false) {
        requiredFieldCount = 14;
      } else if (this.splitRate === false && this.holidaySplitRate === true) {
        requiredFieldCount = 12;
      } else if (this.splitRate === true && this.holidaySplitRate === false) {
        requiredFieldCount = 9;
      } else if (this.splitRate === true && this.holidaySplitRate === true) {
        requiredFieldCount = 7;
      }

      const allFieldsFilled =
        keys.length === requiredFieldCount && keys.every((key) => object[key] !== "");

      return allFieldsFilled;
    },
    validateStartTime(newValue) {
      if (!newValue) {
        this.validationStartTime = false;
        return "Please enter a valid start time";
      } else {
        this.validationStartTime = true;
        return "";
      }
    },

    validateEndTime(newValue) {
      if (!newValue) {
        this.validationEndTime = false;
        return "Please enter a valid end time";
      } else {
        this.validationEndTime = true;
        return "";
      }
    },

    formatTime(hour) {
      if (hour < 12) {
        return `${String(hour).padStart(2, "0")}:00 AM`;
      } else if (hour === 12) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else if (hour === 24) {
        return `00:00`;
      } else if (hour > 12 && hour < 24) {
        return `${String(hour).padStart(2, "0")}:00 PM`;
      } else {
        return `${String(hour - 12).padStart(2, "0")}:00 PM`;
      }
    },
    async onClientSelect() {
      await this.getClientFetchSiteMethod();
    },

    async onJobTitleChange() {
      const selectedJob = this.options.find(
        (option) => option.job_id === this.selectedJobId
      );
      if (selectedJob) {
        this.job_id = selectedJob.job_id;
      }
    },

    async onSiteSelect() {
      const selectedSite = this.businessUnit.find(
        (site) => site.site_id === this.selectedSiteId
      );

      if (selectedSite) {
        this.site_id = selectedSite.site_id;
        this.splitRate = selectedSite.split_rate;
        this.holidaySplitRate = selectedSite.holiday_split_rate;

        await this.getTimeShift(this.site_id);

        const dayShift = this.filteredShiftsTime.find(
          (shift) => shift.shift_name.toLowerCase() === "day_shift"
        );
        if (dayShift) {
          this.day_shift_id = dayShift.id;
          this.day_start_time = dayShift.start_time;
          this.day_end_time = dayShift.end_time;
        }

        const nightShift = this.filteredShiftsTimeNight.find(
          (shift) => shift.shift_name.toLowerCase() === "night_shift"
        );
        if (nightShift) {
          this.night_shift_id = nightShift.id;
          this.night_start_time = nightShift.start_time;
          this.night_end_time = nightShift.end_time;
        }

        const holidayDayShift = this.filteredShiftsTimeHoliday.find(
          (shift) => shift.shift_name.toLowerCase() === "holiday_day_shift"
        );
        if (holidayDayShift) {
          this.dayShiftId = holidayDayShift.id;
          this.holiday_start_time = holidayDayShift.start_time;
          this.holiday_end_time = holidayDayShift.end_time;
        }

        const holidayNightShift = this.filteredShiftsTimeHolidayNight.find(
          (shift) => shift.shift_name.toLowerCase() === "holiday_night_shift"
        );
        if (holidayNightShift) {
          this.nightShiftId = holidayNightShift.id;
          this.holiday_night_start_time = holidayNightShift.start_time;
          this.holiday_night_end_time = holidayNightShift.end_time;
        }
      }
    },

    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        // this.clearError();
      }, 10);
    },

    async addVacancyMethod() {
      const rateAndRules = [];

      for (let i = 0; i < this.days.length; i++) {
        const day = this.days[i];
        const dayClientRate = this.selectedClientRate[`${day}-day`] || "";
        const nightClientRate = this.selectedClientRate[`${day}-night`] || "";
        const dayRateType = this.selectedRateType[`${day}-day`] || "";
        const nightRateType = this.selectedRateType[`${day}-night`] || "";
        const dayPrivateLimited = this.selectedPrivateLimited[`${day}-day`] || "";
        const nightPrivateLimited = this.selectedPrivateLimited[`${day}-night`] || "";

        let dayShiftEntry = {};
        let nightShiftEntry = {};

        if (day === "Saturday" || day === "Sunday") {
          dayShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: this.selectedClientRate[`${day}-holiday`] || "",
            self_employed: this.selectedSelfEmployee[`${day}-holiday`] || "",
            private_limited: this.selectedPrivateLimited[`${day}-holiday`] || "",
            umbrella: this.selectedUmbrella[`${day}-holiday`] || "",
            rate_type: this.selectedRateType[`${day}-holiday`] || "",
            paye: this.selectedPaye[`${day}-holiday`] || "",
            site_shift_id: this.dayShiftId,
            client_id: this.client_id,
            start_time: this.holiday_start_time,
            end_time: this.holiday_end_time,
          };

          nightShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: this.holidaySplitRate
              ? this.selectedClientRate[`${day}-holiday`]
              : this.selectedClientRate[`${day}-holiday_night`] || "",
            self_employed: this.holidaySplitRate
              ? this.selectedSelfEmployee[`${day}-holiday`]
              : this.selectedSelfEmployee[`${day}-holiday_night`] || "",
            private_limited: this.holidaySplitRate
              ? this.selectedPrivateLimited[`${day}-holiday`]
              : this.selectedPrivateLimited[`${day}-holiday_night`] || "",
            umbrella: this.holidaySplitRate
              ? this.selectedUmbrella[`${day}-holiday`]
              : this.selectedUmbrella[`${day}-holiday_night`] || "",
            rate_type: this.holidaySplitRate
              ? this.selectedRateType[`${day}-holiday`]
              : this.selectedRateType[`${day}-holiday_night`] || "",
            paye: this.holidaySplitRate
              ? this.selectedPaye[`${day}-holiday`]
              : this.selectedPaye[`${day}-holiday_night`] || "",
            site_shift_id: this.nightShiftId,
            client_id: this.client_id,
            start_time: this.holiday_night_start_time,
            end_time: this.holiday_night_end_time,
          };
        } else {
          dayShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            client_rate: dayClientRate || "",
            self_employed: this.selectedSelfEmployee[`${day}-day`] || "",
            private_limited: dayPrivateLimited || "",
            umbrella: this.selectedUmbrella[`${day}-day`] || "",
            rate_type: dayRateType || "",
            paye: this.selectedPaye[`${day}-day`] || "",
            site_shift_id: this.day_shift_id,
            client_id: this.client_id,
            start_time: this.day_start_time,
            end_time: this.day_end_time,
          };

          nightShiftEntry = {
            site_id: this.site_id,
            job_id: this.job_id,
            day: day,
            // client_rate: nightClientRate || "",
            client_rate: this.splitRate ? dayClientRate : nightClientRate || "",

            self_employed: this.splitRate
              ? this.selectedSelfEmployee[`${day}-day`]
              : this.selectedSelfEmployee[`${day}-night`] || "",
            private_limited: this.splitRate
              ? dayPrivateLimited
              : nightPrivateLimited || "",
            umbrella: this.splitRate
              ? this.selectedUmbrella[`${day}-day`]
              : this.selectedUmbrella[`${day}-night`] || "",
            rate_type: this.splitRate ? dayRateType : nightRateType || "",
            paye: this.splitRate
              ? this.selectedPaye[`${day}-day`]
              : this.selectedPaye[`${day}-night`] || "",
            site_shift_id: this.night_shift_id,
            client_id: this.client_id,
            start_time: this.night_start_time,
            end_time: this.night_end_time,
          };
        }

        rateAndRules.push(dayShiftEntry, nightShiftEntry);
      }

      const data = { rate_and_rules: rateAndRules };

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_API_URL}/create_multiple_rates_and_rules`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + token,
          },
          body: JSON.stringify(data),
        });

        if (response.status === 201) {
          this.clearFields();
          setTimeout(() => {
            // this.clearError();
          }, 100);
          this.$emit("UpdatedRateRules");
          const message = "Rate and Rules Added Successfully";
          this.$refs.successAlert.showSuccess(message);
        } else if (response.status === 422) {
          const errorData = await response.json();
          const errorMessage = errorData.errors.join(", ");

          this.$refs.dangerAlert.showSuccess(errorMessage);
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.message || "An unexpected error occurred";

          this.$refs.dangerAlert.showSuccess(errorMessage);
        }
      } catch (error) {
        // Handle fetch errors
      }
    },

    handleShiftChange(shiftType) {
      if (shiftType === "day") {
        const selectedShift = this.filteredShiftsTime.find(
          (shift) => shift.id === this.day_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "night") {
        const selectedShift = this.filteredShiftsTimeNight.find(
          (shift) => shift.id === this.night_shift_id
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "holiday_day_shift") {
        const selectedShift = this.filteredShiftsTimeHoliday.find(
          (shift) => shift.id === this.dayShiftId
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      } else if (shiftType === "holiday_night_shift") {
        const selectedShift = this.filteredShiftsTimeHolidayNight.find(
          (shift) => shift.id === this.nightShiftId
        );
        if (selectedShift) {
          this.start_time = selectedShift.start_time;
          this.end_time = selectedShift.end_time;
        }
      }
    },

    async getClientMethod() {
      const pagesToFetch = [1, 2, 3];
      let allClientData = [];

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/clients`, {
              params: {
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          allClientData = allClientData.concat(response.data.data);
        });

        this.clientData = allClientData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
        }
      }
    },
    async getClientFetchSiteMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/fetch_site_by_client_id/${this.client_id}`
        );
        this.businessUnit = response.data.sites;

        // this.selectedSiteId = this.businessUnit[0].site_id;
        // this.splitRate = this.businessUnit[0].split_rate;
        // this.holidaySplitRate = this.businessUnit[0].holiday_split_rate;

        this.options = response.data.jobs;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        }
      }
    },

    async getTimeShift(selectedSiteId) {
      if (!selectedSiteId) {
        return;
      }
      try {
        const response = await axios.get(`${VITE_API_URL}site_shift/${selectedSiteId}`);
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: this.convertTimeFormat(shift.start_time),
            end_time: this.convertTimeFormat(shift.end_time),
          })) || [];
        this.filteredShiftsTime = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "day_shift"
        );

        this.filteredShiftsTimeNight = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "night_shift"
        );

        this.filteredShiftsTimeHoliday = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "holiday_day_shift"
        );
        this.filteredShiftsTimeHolidayNight = this.shiftsTime.filter(
          (shift) => shift.shift_name.toLowerCase() === "holiday_night_shift"
        );

        if (this.filteredShiftsTime.length === 0) {
          this.filteredShiftsTime = this.shiftsTime;
        }
      } catch (error) {
        // console.error("Error fetching shifts:", error);
      }
    },
    convertTimeFormat(dateTimeString) {
      const date = new Date(dateTimeString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    },

    clearFields() {
      (this.selectedSiteId = ""),
        (this.selectedJobId = ""),
        (this.night_shift_id = ""),
        (this.client_id = ""),
        (this.night_start_time = ""),
        (this.night_end_time = ""),
        (this.selectedClientRate = {});
      this.selectedRateType = {};
      this.selectedPrivateLimited = {};
      this.selectedSelfEmployee = {};
      this.selectedUmbrella = {};
      this.selectedPaye = {};
      (this.holiday_start_time = ""),
        (this.holiday_end_time = ""),
        (this.holiday_night_start_time = ""),
        (this.holiday_night_end_time = ""),
        (this.day_start_time = ""),
        (this.day_end_time = ""),
        (this.dayShiftId = ""),
        (this.nightShiftId = ""),
        (this.day_shift_id = "");
    },
  },
  // created() {
  //   this.getTimeShift();
  // },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.getTimeShift();
      vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.getTimeShift();
    this.getClientMethod();
    next();
  },
  mounted() {
    // this.getClientMethod();
    this.isValidForm = this.isFormValid;

    // this.getTimeShift();
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
.modal-dialog {
  max-width: 1460px;
}
select {
  width: 100% !important;
  padding: 10px !important;
  border-radius: 4px;
  border: 0px;
}
label.form-label {
  text-transform: capitalize;
}
.modal-footer {
  border-top: 0px;
}
.form-control {
  background-color: #f7f5f4;
  padding: 0.4rem 0.75rem;
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
