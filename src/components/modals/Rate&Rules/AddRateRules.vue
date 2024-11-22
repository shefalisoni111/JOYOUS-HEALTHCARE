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
          <div class="modal-body mx-3" style="overflow: auto">
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
                        {{ option.client_name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-4">
                    <label class="form-label" for="selectBusinessUnit">Site</label>

                    <select id="siteSelect" v-model="site_id" @change="onSiteSelect">
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

                <div v-if="this.splitRate" class="mt-4" style="">
                  <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div
                      v-for="(day, index) in days"
                      :key="index"
                      class="accordion-item mt-4"
                    >
                      <div class="accordion-item">
                        <h2 class="accordion-header" :id="`accordion-header-${index}`">
                          <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="`#flush-collapse-${index}`"
                            aria-expanded="false"
                            :aria-controls="`flush-collapse-${index}`"
                          >
                            {{ day }}
                          </button>
                        </h2>
                        <div
                          :id="`flush-collapse-${index}`"
                          class="accordion-collapse collapse p-4"
                          :aria-labelledby="`accordion-header-${index}`"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div class="accordion-body p-4">
                            <template v-if="day">
                              <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                                <div class="col-3 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Shift Name</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[0].shift_name
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[0].start_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[0].end_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="col-4 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Rate Type</label>

                                    <select
                                      v-model="this.selectedRateType[`${day}-early`]"
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
                                      v-model="selectedClientRate[`${day}-early`]"
                                      @input="
                                        handleInput(
                                          `clientRate-${day}-early`,
                                          selectedClientRate[`${day}-early`]
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
                                      v-model="selectedPrivateLimited[`${day}-early`]"
                                      @input="
                                        handleInput(
                                          `privateLimited-${day}-early`,
                                          selectedPrivateLimited[`${day}-early`]
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
                                      v-model="selectedSelfEmployee[`${day}-early`]"
                                      @input="
                                        handleInput(
                                          `selfEmployee-${day}-early`,
                                          selectedSelfEmployee[`${day}-early`]
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
                                      v-model="selectedUmbrella[`${day}-early`]"
                                      @input="
                                        handleInput(
                                          `umbrella-${day}-early`,
                                          selectedUmbrella[`${day}-early`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">PAYE</label>

                                    <input
                                      type="text"
                                      class="form-control w-100"
                                      v-model="selectedPaye[`${day}-early`]"
                                      @input="
                                        handleInput(
                                          `paye-${day}-early`,
                                          selectedPaye[`${day}-early`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                                <div class="col-3 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Shift Name</label>
                                    <input
                                      type="text"
                                      :v-model="
                                        shiftsTime.length > 0 ? shiftsTime[1].id : ''
                                      "
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[1].shift_name
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[1].start_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[1].end_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="col-4 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Rate Type</label>

                                    <select
                                      v-model="selectedRateType[`${day}-late`]"
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
                                      v-model="selectedClientRate[`${day}-late`]"
                                      @input="
                                        handleInput(
                                          `clientRate-${day}-late`,
                                          selectedClientRate[`${day}-late`]
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
                                      v-model="selectedPrivateLimited[`${day}-late`]"
                                      @input="
                                        handleInput(
                                          `privateLimited-${day}-late`,
                                          selectedPrivateLimited[`${day}-late`]
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
                                      v-model="selectedSelfEmployee[`${day}-late`]"
                                      @input="
                                        handleInput(
                                          `selfEmployee-${day}-late`,
                                          selectedSelfEmployee[`${day}-late`]
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
                                      v-model="selectedUmbrella[`${day}-late`]"
                                      @input="
                                        handleInput(
                                          `umbrella-${day}-late`,
                                          selectedUmbrella[`${day}-late`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">PAYE</label>

                                    <input
                                      type="text"
                                      class="form-control w-100"
                                      v-model="selectedPaye[`${day}-late`]"
                                      @input="
                                        handleInput(
                                          `paye-${day}-late`,
                                          selectedPaye[`${day}-late`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                                <div class="col-3 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Shift Name</label>
                                    <input
                                      type="text"
                                      :v-model="
                                        shiftsTime.length > 0 ? shiftsTime[2].id : ''
                                      "
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[2].shift_name
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[2].start_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[2].end_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="col-4 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Rate Type</label>

                                    <select
                                      v-model="selectedRateType[`${day}-night`]"
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
                                      v-model="selectedClientRate[`${day}-night`]"
                                      @input="
                                        handleInput(
                                          `clientRate-${day}-night`,
                                          selectedClientRate[`${day}-night`]
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
                                      v-model="selectedPrivateLimited[`${day}-night`]"
                                      @input="
                                        handleInput(
                                          `privateLimited-${day}-night`,
                                          selectedPrivateLimited[`${day}-night`]
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
                                      v-model="selectedSelfEmployee[`${day}-night`]"
                                      @input="
                                        handleInput(
                                          `selfEmployee-${day}-night`,
                                          selectedSelfEmployee[`${day}-night`]
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
                                      v-model="selectedUmbrella[`${day}-night`]"
                                      @input="
                                        handleInput(
                                          `umbrella-${day}-night`,
                                          selectedUmbrella[`${day}-night`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">PAYE</label>

                                    <input
                                      type="text"
                                      class="form-control w-100"
                                      v-model="selectedPaye[`${day}-night`]"
                                      @input="
                                        handleInput(
                                          `paye-${day}-night`,
                                          selectedPaye[`${day}-night`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                                <div class="col-3 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Shift Name</label>
                                    <input
                                      type="text"
                                      :v-model="
                                        shiftsTime.length > 0 ? shiftsTime[3].id : ''
                                      "
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[3].shift_name
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[3].start_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">Start Time</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      :value="
                                        shiftsTime.length > 0
                                          ? shiftsTime[3].end_time
                                          : ''
                                      "
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="col-4 d-flex gap-2">
                                  <div class="col-4">
                                    <label class="form-label">Rate Type</label>

                                    <select
                                      v-model="selectedRateType[`${day}-long day`]"
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
                                      v-model="selectedClientRate[`${day}-long day`]"
                                      @input="
                                        handleInput(
                                          `clientRate-${day}-long day`,
                                          selectedClientRate[`${day}-long day`]
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
                                      v-model="selectedPrivateLimited[`${day}-long day`]"
                                      @input="
                                        handleInput(
                                          `privateLimited-${day}-long day`,
                                          selectedPrivateLimited[`${day}-long day`]
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
                                      v-model="selectedSelfEmployee[`${day}-long day`]"
                                      @input="
                                        handleInput(
                                          `selfEmployee-${day}-long day`,
                                          selectedSelfEmployee[`${day}-long day`]
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
                                      v-model="selectedUmbrella[`${day}-long day`]"
                                      @input="
                                        handleInput(
                                          `umbrella-${day}-long day`,
                                          selectedUmbrella[`${day}-long day`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>

                                  <div class="col-4">
                                    <label class="form-label">PAYE</label>

                                    <input
                                      type="text"
                                      class="form-control w-100"
                                      v-model="selectedPaye[`${day}-long day`]"
                                      @input="
                                        handleInput(
                                          `paye-${day}-long day`,
                                          selectedPaye[`${day}-long day`]
                                        )
                                      "
                                      maxlength="3"
                                    />
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <h5 class="fw-bold text-capitalize">{{ day }}</h5> -->
                </div>
                <div v-else class="mt-5">
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift Name</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[0].shift_name : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[0].start_time : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[0].end_time : ''"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="this.selectedRateType[`${day ? day + '-' : ''}-early`]"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedClientRate[`${day ? day + '-' : ''}-early`]"
                          @input="
                            handleInput(
                              `clientRate-${day ? day + '-' : ''}-early`,
                              selectedClientRate[`${day ? day + '-' : ''}-early`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="
                            selectedPrivateLimited[`${day ? day + '-' : ''}-early`]
                          "
                          @input="
                            handleInput(
                              `privateLimited-${day ? day + '-' : ''}-early`,
                              selectedPrivateLimited[`${day ? day + '-' : ''}-early`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedSelfEmployee[`${day ? day + '-' : ''}-early`]"
                          @input="
                            handleInput(
                              `selfEmployee-${day ? day + '-' : ''}-early`,
                              selectedSelfEmployee[`${day ? day + '-' : ''}-early`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedUmbrella[`${day ? day + '-' : ''}-early`]"
                          @input="
                            handleInput(
                              `umbrella-${day ? day + '-' : ''}-early`,
                              selectedUmbrella[`${day ? day + '-' : ''}-early`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedPaye[`${day ? day + '-' : ''}-early`]"
                          @input="
                            handleInput(
                              `paye-${day ? day + '-' : ''}-early`,
                              selectedPaye[`${day ? day + '-' : ''}-early`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift Name</label>
                        <input
                          type="text"
                          :v-model="shiftsTime.length > 0 ? shiftsTime[1].id : ''"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[1].shift_name : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[1].start_time : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[1].end_time : ''"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="selectedRateType[`${day ? day + '-' : ''}-late`]"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedClientRate[`${day ? day + '-' : ''}-late`]"
                          @input="
                            handleInput(
                              `clientRate-${day ? day + '-' : ''}-late`,
                              selectedClientRate[`${day ? day + '-' : ''}-late`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedPrivateLimited[`${day ? day + '-' : ''}-late`]"
                          @input="
                            handleInput(
                              `privateLimited-${day ? day + '-' : ''}-late`,
                              selectedPrivateLimited[`${day ? day + '-' : ''}-late`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedSelfEmployee[`${day ? day + '-' : ''}-late`]"
                          @input="
                            handleInput(
                              `selfEmployee-${day ? day + '-' : ''}-late`,
                              selectedSelfEmployee[`${day ? day + '-' : ''}-late`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedUmbrella[`${day ? day + '-' : ''}-late`]"
                          @input="
                            handleInput(
                              `umbrella-${day ? day + '-' : ''}-late`,
                              selectedUmbrella[`${day ? day + '-' : ''}-late`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedPaye[`${day ? day + '-' : ''}-late`]"
                          @input="
                            handleInput(
                              `paye-${day ? day + '-' : ''}-late`,
                              selectedPaye[`${day ? day + '-' : ''}-late`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift Name</label>
                        <input
                          type="text"
                          :v-model="shiftsTime.length > 0 ? shiftsTime[2].id : ''"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[2].shift_name : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[2].start_time : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[2].end_time : ''"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="selectedRateType[`${day ? day + '-' : ''}-night`]"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedClientRate[`${day ? day + '-' : ''}-night`]"
                          @input="
                            handleInput(
                              `clientRate-${day ? day + '-' : ''}-night`,
                              selectedClientRate[`${day ? day + '-' : ''}-night`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="
                            selectedPrivateLimited[`${day ? day + '-' : ''}-night`]
                          "
                          @input="
                            handleInput(
                              `privateLimited-${day ? day + '-' : ''}-night`,
                              selectedPrivateLimited[`${day ? day + '-' : ''}-night`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedSelfEmployee[`${day ? day + '-' : ''}-night`]"
                          @input="
                            handleInput(
                              `selfEmployee-${day ? day + '-' : ''}-night`,
                              selectedSelfEmployee[`${day ? day + '-' : ''}-night`]
                            )
                          "
                          maxlength="3"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedUmbrella[`${day ? day + '-' : ''}-night`]"
                          @input="
                            handleInput(
                              `umbrella-${day ? day + '-' : ''}-night`,
                              selectedUmbrella[`${day ? day + '-' : ''}-night`]
                            )
                          "
                          maxlength="3"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedPaye[`${day ? day + '-' : ''}-night`]"
                          @input="
                            handleInput(
                              `paye-${day ? day + '-' : ''}-night`,
                              selectedPaye[`${day ? day + '-' : ''}-night`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-between gap-1 me-3">
                    <div class="col-3 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Shift Name</label>
                        <input
                          type="text"
                          :v-model="shiftsTime.length > 0 ? shiftsTime[3].id : ''"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[3].shift_name : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[3].start_time : ''"
                          disabled
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Start Time</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="shiftsTime.length > 0 ? shiftsTime[3].end_time : ''"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Rate Type</label>

                        <select
                          v-model="selectedRateType[`${day ? day + '-' : ''}long day`]"
                          class="form-select w-25"
                        >
                          <option value="Hourly">Hourly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>

                      <div class="col-4">
                        <label class="form-label">Client Rate</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedClientRate[`${day ? day + '-' : ''}long day`]"
                          @input="
                            handleInput(
                              `clientRate-${day ? day + '-' : ''}long day`,
                              selectedClientRate[`${day ? day + '-' : ''}long day`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Private Limited</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="
                            selectedPrivateLimited[`${day ? day + '-' : ''}long day`]
                          "
                          @input="
                            handleInput(
                              `privateLimited-${day ? day + '-' : ''}long day`,
                              selectedPrivateLimited[`${day ? day + '-' : ''}long day`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>
                    </div>
                    <div class="col-4 d-flex gap-2">
                      <div class="col-4">
                        <label class="form-label">Self Employed</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="
                            selectedSelfEmployee[`${day ? day + '-' : ''}-long day`]
                          "
                          @input="
                            handleInput(
                              `selfEmployee-${day ? day + '-' : ''}-long day`,
                              selectedSelfEmployee[`${day ? day + '-' : ''}-long day`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">Umbrella</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedUmbrella[`${day ? day + '-' : ''}-long day`]"
                          @input="
                            handleInput(
                              `umbrella-${day ? day + '-' : ''}-long day`,
                              selectedUmbrella[`${day ? day + '-' : ''}-long day`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
                        />
                      </div>

                      <div class="col-4">
                        <label class="form-label">PAYE</label>

                        <input
                          type="number"
                          class="form-control w-100"
                          v-model="selectedPaye[`${day ? day + '-' : ''}-long day`]"
                          @input="
                            handleInput(
                              `paye-${day ? day + '-' : ''}-long day`,
                              selectedPaye[`${day ? day + '-' : ''}-long day`]
                            )
                          "
                          maxlength="3"
                          :max="999"
                          :min="1"
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
              class="btn btn-secondary rounded-1"
              data-bs-target="#addRateRules"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              v-on:click="clearFieldsData"
            >
              Cancel
            </button>
            <button
              v-if="this.splitRate"
              :disabled="!isFormValid()"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-bind:data-bs-dismiss="isFormValid() ? 'modal' : null"
              v-on:click="addVacancyMethod()"
            >
              Add Rate
            </button>

            <button
              v-else
              :disabled="!isFormValidTrue()"
              class="btn btn-primary rounded-1 text-capitalize fw-medium"
              v-bind:data-bs-dismiss="isFormValidTrue() ? 'modal' : null"
              v-on:click="addVacancyMethod()"
            >
              Add Rate
            </button>
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
      shiftName: {},
      startTime: {},
      endTime: {},
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
      site_shift_id: "",
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

    selectShifts() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.shift_name : "";
    },
  },
  watch: {
    selectedSiteId(newSiteId) {
      if (newSiteId) {
        this.onSiteSelect();
      }
    },
  },
  methods: {
    handleInput(field, value) {
      this.hasInteracted = true;

      const filteredValue = value.replace(/[^0-9]/g, "");

      const [type, day, period] = field.split("-");

      const key = day ? `${day}-${period}` : period;

      if (type === "clientRate") {
        this.selectedClientRate[key] = filteredValue;
      } else if (type === "privateLimited") {
        this.selectedPrivateLimited[key] = filteredValue;
      } else if (type === "paye") {
        this.selectedPaye[key] = filteredValue;
      } else if (type === "selfEmployee") {
        this.selectedSelfEmployee[key] = filteredValue;
      } else if (type === "umbrella") {
        this.selectedUmbrella[key] = filteredValue;
      }

      if (filteredValue.length > 0) {
        const numericValue = parseInt(filteredValue, 10);

        if (filteredValue.length > 0 && numericValue >= 1 && numericValue <= 999) {
          this[`validation${field.charAt(0).toUpperCase() + field.slice(1)}`] = true;
        } else {
          this[`validation${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
        }
      } else {
        this[`validation${field.charAt(0).toUpperCase() + field.slice(1)}`] = false;
      }
    },
    isFormValidTrue() {
      return (
        Object.keys(this.selectedRateType).length > 3 &&
        Object.keys(this.selectedClientRate).length > 3 &&
        Object.keys(this.selectedPrivateLimited).length > 3 &&
        Object.keys(this.selectedSelfEmployee).length > 3 &&
        Object.keys(this.selectedUmbrella).length > 3 &&
        Object.keys(this.selectedPaye).length > 3 &&
        this.startTime &&
        this.endTime &&
        this.shiftName
      );
    },
    isFormValid() {
      const site_id_valid = this.site_id !== null;
      const job_id_valid = this.job_id !== null;
      const client_id_valid = this.client_id !== null;

      const shifts = ["early", "late", "night", "long day"];
      const days = this.days;

      const allShiftDataValid = days.every((day) =>
        shifts.every((shift) => {
          const shiftData = this.shiftsTime.find(
            (s) => s.shift_name.toLowerCase() === shift
          );

          return (
            this.selectedRateType[`${day}-${shift}`] &&
            this.selectedClientRate[`${day}-${shift}`] &&
            this.selectedPrivateLimited[`${day}-${shift}`] &&
            this.selectedSelfEmployee[`${day}-${shift}`] &&
            this.selectedUmbrella[`${day}-${shift}`] &&
            this.selectedPaye[`${day}-${shift}`] &&
            shiftData &&
            shiftData.site_shift_id &&
            shiftData.start_time &&
            shiftData.end_time
          );
        })
      );

      return site_id_valid && job_id_valid && client_id_valid && allShiftDataValid;
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

      // Set default site_id based on the first site in the list
      if (this.businessUnit.length > 0) {
        this.selectedSiteId = this.businessUnit[0].site_id;
      } else {
        this.selectedSiteId = null;
      }
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
        await this.getTimeShift(this.site_id);
      } else {
        this.site_id = null;
      }
    },

    clearFieldsData() {
      this.clearFields();
      setTimeout(() => {
        // this.clearError();
        this.clearFields();
      }, 10);
    },

    async addVacancyMethod() {
      const rateAndRules = this.splitRate ? {} : [];
      const commonData = {
        site_id: this.site_id,
        job_id: this.job_id,
        client_id: this.client_id,
      };
      const shiftNames = ["early", "late", "night", "long day"];

      if (this.splitRate) {
        this.days.forEach((day) => {
          rateAndRules[day.toLowerCase()] = [];
          shiftNames.forEach((shiftName) => {
            const shiftData = this.shiftsTime.find(
              (s) => s.shift_name.toLowerCase() === shiftName
            );
            const shiftKey = `${day}-${shiftName}`;

            const shiftEntry = {
              day,
              ...commonData,
              shift: shiftName,
              site_shift_id: shiftData ? shiftData.site_shift_id : null,
              start_time: shiftData ? shiftData.start_time : null,
              end_time: shiftData ? shiftData.end_time : null,
              rate_type: this.selectedRateType[shiftKey] || "",
              client_rate: this.selectedClientRate[shiftKey] || "",
              private_limited: this.selectedPrivateLimited[shiftKey] || "",
              self_employed: this.selectedSelfEmployee[shiftKey] || "",
              umbrella: this.selectedUmbrella[shiftKey] || "",
              paye: this.selectedPaye[shiftKey] || "",
            };

            rateAndRules[day.toLowerCase()].push(shiftEntry);
          });
        });
      } else {
        shiftNames.forEach((shiftName) => {
          const shiftData = this.shiftsTime.find(
            (s) => s.shift_name.toLowerCase() === shiftName
          );

          const shiftKey = shiftName;

          const shiftEntry = {
            ...commonData,
            shift: shiftName,
            site_shift_id: shiftData ? shiftData.site_shift_id : null,
            start_time: shiftData ? shiftData.start_time : null,
            end_time: shiftData ? shiftData.end_time : null,
            rate_type: this.selectedRateType[shiftKey] || "",
            client_rate: this.selectedClientRate[shiftKey] || "",
            private_limited: this.selectedPrivateLimited[shiftKey] || "",
            self_employed: this.selectedSelfEmployee[shiftKey] || "",
            umbrella: this.selectedUmbrella[shiftKey] || "",
            paye: this.selectedPaye[shiftKey] || "",
          };

          rateAndRules.push(shiftEntry);
        });
      }

      const payload = this.splitRate
        ? { rate_and_rules: rateAndRules }
        : { rate_and_rules: { all_day: rateAndRules } };

      try {
        const token = localStorage.getItem("token");
        const endpoint = `${VITE_API_URL}/create_multiple_rates_and_rules`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 201) {
          this.clearFields();
          this.$emit("UpdatedRateRules");
          const message = "Rate and Rules Added Successfully";
          this.$refs.successAlert.showSuccess(message);
        } else if (response.status === 422) {
          const errorData = await response.json();
          const errorMessage = errorData.errors.join(", ");
          this.$refs.dangerAlert.showSuccess(errorMessage);
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.message || "Data not Found!";
          // this.$refs.dangerAlert.showSuccess(errorMessage);
        }
      } catch (error) {
        // console.error("An error occurred:", error);
        // this.$refs.dangerAlert.showSuccess("An unexpected error occurred.");
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
    async getClientFetchSiteMethod() {
      if (!this.client_id) {
        return;
      }
      try {
        const response = await axios.get(
          `${VITE_API_URL}/fetch_site_by_client_id/${this.client_id}`
        );

        this.businessUnit = response.data.sites;

        this.selectedSiteId = this.businessUnit[0].site_id;
        this.splitRate = this.businessUnit[0].split_rate;

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
        const response = await axios.get(`${VITE_API_URL}/site_shift/${selectedSiteId}`);
        this.splitRate = response.data.split_rate || false;
        this.shiftsTime =
          response.data.site_shift_data.map((shift) => ({
            ...shift,
            start_time: shift.start_time,
            end_time: shift.end_time,
            site_shift_id: shift.id,
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
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${amPm}`;
    },

    clearFields() {
      this.selectedSiteId = "";
      this.selectedJobId = "";
      this.site_id = "";
      this.client_id = "";
      this.splitRate = false;
      this.shiftsTime = [];

      const shiftNames = ["early", "late", "night", "long day"];

      if (this.splitRate) {
        this.days.forEach((day) => {
          shiftNames.forEach((shiftName) => {
            const shiftKey = `${day}-${shiftName}`;
            this.selectedRateType[shiftKey] = "";
            this.selectedClientRate[shiftKey] = "";
            this.selectedPrivateLimited[shiftKey] = "";
            this.selectedSelfEmployee[shiftKey] = "";
            this.selectedUmbrella[shiftKey] = "";
            this.selectedPaye[shiftKey] = "";
            this.startTime[shiftKey] = "";
            this.endTime[shiftKey] = "";
            this.shiftName[shiftKey] = "";
          });
        });
      } else {
        this.selectedRateType = {};
        this.selectedClientRate = {};
        this.selectedPrivateLimited = {};
        this.selectedSelfEmployee = {};
        this.selectedUmbrella = {};
        this.selectedPaye = {};
        this.startTime = {};
        this.endTime = {};
        this.shiftName = {};
      }
    },
  },

  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.getTimeShift();
      // vm.getClientMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // this.getTimeShift();
    // this.getClientMethod();
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
}
label.form-label {
  text-transform: capitalize;
}
.form-control {
  background-color: #fff;
  padding: 0.6rem 0.75rem;
}
.form-control:disabled {
  background-color: #e9ecef;
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
