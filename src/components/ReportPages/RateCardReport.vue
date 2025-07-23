<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main">
      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex ms-2 justify-content-between">
                    <div class="d-flex flex-wrap gap-2">
                      <div class="custom-select-wrapper">
                        <select
                          v-model="client_id"
                          id="selectClients"
                          @change="handleClientChange"
                        >
                          <option value="">All Client</option>
                          <option
                            v-for="option in clientData"
                            :key="option.id"
                            :value="option.id"
                            aria-placeholder="Select Job"
                          >
                            {{ option.client_name }}
                          </option>
                        </select>
                      </div>
                      <div class="custom-select-wrapper">
                        <select
                          v-model="site_id"
                          id="selectBusinessUnit"
                          @change="filterData"
                          :disabled="!businessUnit.length"
                        >
                          <option value="">All Site</option>
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
                    </div>

                    <div></div>
                    <div class="d-flex gap-2">
                      <div
                        class="d-md-flex d-lg-flex justify-content-md-between justify-content-lg-between align-items-center"
                      >
                        <div
                          class="d-flex gap-3 align-items-center mt-lg-0 mt-3"
                        >
                          <div
                            v-if="
                              !paginateCandidates ||
                              paginateCandidates.length === 0
                            "
                            class="tooltip-wrapper"
                            data-bs-toggle="tooltip"
                            title="No data available to export"
                          >
                            <button
                              type="button"
                              class="btn btn-danger btn-lg text-nowrap mt-3"
                              @click="exportOneFile('all')"
                              :disabled="true"
                            >
                              <i class="bi bi-download"></i> Export CSV
                            </button>
                          </div>
                          <div v-else>
                            <button
                              type="button"
                              class="btn btn-danger btn-lg text-nowrap mt-3"
                              @click="exportOneFile('all')"
                            >
                              <i class="bi bi-download"></i> Export CSV
                            </button>
                          </div>

                          <div class="mt-3">
                            <button
                              @click="resetFilter"
                              class="btn btn-secondary"
                              :disabled="
                                !client_id &&
                                !site_id &&
                                !job_id &&
                                !localSearchQuery
                              "
                            >
                              Reset Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->
                <div
                  class="d-flex gap-2 mb-3 justify-content-center"
                  v-if="showFilters"
                >
                  <div class="d-flex gap-2 mt-3">
                    <div></div>

                    <select
                      v-model="client_id"
                      id="selectClients"
                      @change="filterData"
                    >
                      <option value="" disabled>All Client</option>
                      <option
                        v-for="option in clientData"
                        :key="option.id"
                        :value="option.id"
                        aria-placeholder="Select Job"
                      >
                        {{ option.client_name }}
                      </option>
                    </select>
                    <select
                      v-model="site_id"
                      id="selectBusinessUnit"
                      @change="filterData"
                    >
                      <option value="" disabled>All Site</option>
                      <option
                        v-for="option in businessUnit"
                        :key="option.id"
                        :value="option.id"
                        placeholder="Select BusinessUnit"
                      >
                        {{ option.site_name }}
                      </option>
                    </select>
                    <select
                      v-model="job_id"
                      id="selectOption"
                      @change="filterData"
                    >
                      <option value="" disabled>All Position</option>
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.name }}
                      </option>
                    </select>
                    <div class="searchbox position-relative">
                      <input
                        class="form-control"
                        type="search"
                        placeholder="Search Rate and Rules..."
                        aria-label="Search"
                        v-model="localSearchQuery"
                        @input="filterData"
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      @click="resetFilter"
                      class="btn btn-secondary"
                      :disabled="
                        !client_id && !site_id && !job_id && !localSearchQuery
                      "
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="candidateTable">
                      <table class="table table-responsive" v-if="!searchQuery">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 2%"></th>

                            <th scope="col">Client</th>
                            <th scope="col">Site</th>
                            <th scope="col">Job</th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Day
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Shift Time
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Rate Type
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Client Rate
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Private Limited
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Self Employed
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Umbrella
                              </div>
                            </th>
                            <th scope="col" style="width: 6%">PAYE</th>
                            <th scope="col" style="width: 10%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Created By and Time
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Last Update
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Action
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody
                          v-if="uniquePaginateCandidates?.length > 0"
                          v-for="(data, index) in uniquePaginateCandidates"
                          :key="data.id + '-' + index"
                        >
                          <tr
                            :class="{ 'table-active': activeSiteId === index }"
                          >
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :id="'checkbox-' + data.id"
                                  v-model="checkedClient[data.id]"
                                  @change="handleCheckboxChange(data.id)"
                                />
                              </div>
                            </td>

                            <td>
                              <router-link
                                class="text-capitalize text-decoration-underline text-black fw-bold"
                                :to="{
                                  name: 'SingleClientProfile',
                                  params: { id: data.client_id },
                                }"
                                >{{ data.client }}</router-link
                              >
                            </td>
                            <td
                              class="fw-bold cursor-pointer"
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              {{ data.site }}
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              {{ data.job }}
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                              style="cursor: pointer"
                            >
                              &nbsp;
                            </td>
                            <td v-if="this.splitRate">
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#EditMultipleRateRules"
                                data-bs-whatever="@mdo"
                                @click="
                                  editRateRulesMultiId(
                                    data.id,
                                    data.site_id,
                                    data.job_id,
                                    data.job,
                                    data.client_id
                                  )
                                "
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                            <td v-else></td>
                          </tr>

                          <tr
                            v-if="activeSiteId === index"
                            v-for="(rate, rateIndex) in filteredRateRulesData"
                            :key="rate.id"
                          >
                            <td>
                              <!-- <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div> -->
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  :value="rate.id"
                                  :id="'rate-' + rate.id"
                                  v-model="checkedClient[rate.id]"
                                  @change="handleCheckboxChange(rate.id)"
                                />
                              </div>
                            </td>
                            <td>{{ rate.client }}</td>
                            <td>{{ rate.site }}</td>
                            <td>{{ rate.job }}</td>
                            <td class="text-capitalize">
                              <span
                                style="
                                  background: orange;
                                  padding: 3px;
                                  border-radius: 4px;
                                "
                                >{{
                                  rate.day === "all_day" ? "weekly" : rate.day
                                }}</span
                              >
                            </td>
                            <td>
                              {{ rate.shift_type.replace(/_/g, " ") }}<br />{{
                                formatTime(rate.start_time)
                              }}-{{ formatTime(rate.end_time) }}
                            </td>
                            <td>
                              {{ rate.rate_type }}
                            </td>
                            <td>{{ "£" + rate.client_rate }}</td>
                            <td>
                              {{ "£" + rate.private_limited }}
                            </td>
                            <td>{{ "£" + rate.self_employed }}</td>
                            <td>
                              {{ "£" + rate.umbrella }}
                            </td>
                            <td>
                              {{ "£" + rate.paye }}
                            </td>
                            <td>
                              {{ formatDatesForBEData(rate) }}
                            </td>
                            <td>{{ formatDateFORUpdate(rate.last_update) }}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#editSingleRateRules"
                                data-bs-whatever="@mdo"
                                @click="editRateRulesId(rate.id)"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-if="errorMessageFilter">
                            <td colspan="15" class="text-danger text-center">
                              {{ errorMessageFilter }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="candidateTable">
                      <table
                        class="table candidateTable table-responsive"
                        v-if="searchQuery"
                      >
                        <thead>
                          <tr>
                            <th scope="col" style="width: 2%"></th>

                            <th scope="col">Client</th>
                            <th scope="col">Site</th>
                            <th scope="col">Job</th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Day
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Shift Time
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Rate Type
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Client Rate
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Private Limited
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Self Employed
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Umbrella
                              </div>
                            </th>
                            <th scope="col" style="width: 6%">PAYE</th>
                            <th scope="col" style="width: 10%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Created By and Time
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Last Update
                              </div>
                            </th>
                            <th scope="col" style="width: 7%">
                              <div
                                class="d-flex justify-content-center align-items-center gap-1"
                              >
                                Action
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody
                          v-if="searchResults?.length > 0"
                          v-for="(data, index) in groupedRateRulesData"
                          :key="index"
                        >
                          <tr>
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </td>
                            <td>{{ data.client }}</td>
                            <td
                              class="fw-bold cursor-pointer"
                              @click="
                                toggleDetails(
                                  index,
                                  data.site_id,
                                  data.client,
                                  data.job,
                                  data.job_id
                                )
                              "
                            >
                              {{ data.site }}
                            </td>
                            <td>{{ data.job }}</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td v-if="this.splitRate">
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#EditMultipleRateRules"
                                data-bs-whatever="@mdo"
                                @click="
                                  editRateRulesMultiId(
                                    data.id,
                                    data.site_id,
                                    data.job_id,
                                    data.job,
                                    data.client_id
                                  )
                                "
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                            <td v-else></td>
                          </tr>
                          <tr
                            v-if="activeSiteId === index"
                            v-for="(rate, indx) in searchResults"
                            :key="rate.rate_and_rule_id"
                          >
                            <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                />
                              </div>
                            </td>
                            <td>{{ rate.client }}</td>
                            <td>{{ rate.site }}</td>
                            <td>{{ rate.job }}</td>
                            <td class="text-capitalize">
                              <span
                                style="
                                  background: orange;
                                  padding: 3px;
                                  border-radius: 4px;
                                "
                                >{{ rate.day }}</span
                              >
                            </td>
                            <td>
                              {{ rate.shift_type.replace(/_/g, " ") }}<br />{{
                                formatTime(rate.start_time)
                              }}-{{ formatTime(rate.end_time) }}
                            </td>
                            <td>
                              {{ rate.rate_type ? rate.rate_type : "Null" }}
                            </td>
                            <td>{{ rate.client_rate }}</td>
                            <td>
                              {{ rate.private_limited }}
                            </td>
                            <td>{{ rate.self_employed }}</td>
                            <td>
                              {{ rate.umbrella ? rate.umbrella : "Null" }}
                            </td>
                            <td>
                              {{ rate.paye ? rate.paye : "Null" }}
                            </td>
                            <td>
                              {{ formatDatesForBEData(rate) }}
                            </td>
                            <td>{{ formatDateFORUpdate(rate.last_update) }}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-outline-success text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#editSingleRateRules"
                                data-bs-whatever="@mdo"
                                @click="editRateRulesId(rate.id)"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="14" class="text-danger text-center">
                              No Match Found !!
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="mx-3 mb-2"
      style="text-align: right"
      v-if="getRateRulesData?.length >= 10 && !searchResults.length"
    >
      <div class="dropdown d-inline-block">
        <button
          class="btn btn-sm btn-primary dropdown-toggle"
          type="button"
          id="recordsPerPageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ itemsPerPage }} Records
        </button>
        <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
          <li>
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="setItemsPerPage(100)"
              >100 Records</a
            >
          </li>
        </ul>
      </div>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage > 1 && currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="
          currentPage * itemsPerPage >= getRateRulesData?.length ||
          getRateRulesData?.length === 0
        "
        @click="currentPage++"
      >
        Next
      </button>
    </div> -->

    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../Navbar.vue";

import Loader from "../Loader/Loader.vue";
import { reactive } from "vue";

import SuccessAlert from "../Alerts/SuccessAlert.vue";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      id: "",
      getRateRulesData: [],
      selectedRatesRulesId: null,
      selectedSiteID: null,
      getRateRulesWeekData: [],
      selectedClientID: null,
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalRecords: 0,
      showFilters: false,
      localSearchQuery: this.searchQuery,
      activeSiteId: null,
      detailsShow: false,
      selectedJobID: null,
      rateRulesIds: [],
      filteredRateRulesData: [],
      // checkedClient: reactive({}),
      checkedClient: {},
      rate_ids: [],
      errorMessageFilter: "",
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      client_id: "",
      clientData: [],
      site_id: "",
      businessUnit: [],
      job_id: "",
      options: [],
      splitRate: false,
    };
  },
  components: {
    // Navbar,

    Loader,

    SuccessAlert,
  },
  computed: {
    uniquePaginateCandidates() {
      const uniqueEntries = [];
      const seenKeys = new Set();

      this.getRateRulesData.forEach((item) => {
        const uniqueKey = `${item.client}-${item.job}-${item.job_id}`;
        if (!seenKeys.has(uniqueKey)) {
          seenKeys.add(uniqueKey);
          uniqueEntries.push(item);
        }
      });

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return uniqueEntries.slice(startIndex, endIndex);
    },
    paginateCandidates() {
      if (!this.getRateRulesData || this.getRateRulesData.length === 0)
        return [];
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getRateRulesData.slice(startIndex, endIndex);
    },

    totalRecordsOnPage() {
      if (!this.getRateRulesData || this.getRateRulesData.length === 0)
        return 1;
      return Math.ceil(this.getRateRulesData.length / this.itemsPerPage);
    },
    groupedRateRulesData() {
      const groupedData = {};

      this.searchResults.forEach((data) => {
        const groupKey = `${data.site_id}-${data.client}-${data.job}-${data.client_id}`;

        if (!groupedData[groupKey]) {
          groupedData[groupKey] = {
            site_id: data.site_id,
            site: data.site,
            client: data.client,
            job: data.job,
            client_id: data.client_id,
            job_id: data.job_id,
            data: [],
          };
        }

        groupedData[groupKey].data.push(data);
      });

      return Object.values(groupedData);
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find(
        (option) => option.id === this.site_id
      );
      return site_id ? site_id.site_name : "";
    },
    selectedOptionText() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    selectClients() {
      const client_id = this.clientData.find(
        (option) => option.id === this.client_id
      );
      return client_id ? client_id.first_name : "";
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    async handleClientChange() {
      this.site_id = "";
      this.businessUnit = [];

      if (this.client_id) {
        await this.getSiteAccordingClientMethod();
      }

      this.filterData();
    },

    async getSiteAccordingClientMethod() {
      if (!this.client_id) return;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/site_according_client/${this.client_id}`
        );
        this.businessUnit = response.data.site || [];
      } catch (error) {
        this.businessUnit = [];
        if (error.response && error.response.status == 404) {
          // console.error("No sites found for this client.");
        }
      }
    },
    formatDateFORUpdate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const time = date.toLocaleTimeString();

      return `${day}-${month}-${year} ${time}`;
    },
    formatDatesForBEData(rate) {
      if (!rate || !rate.created_by_and_time) {
        return " ";
      }

      const parts = rate.created_by_and_time.split(" ");

      if (parts.length < 3) return rate.created_by_and_time;

      const merchantName = parts[0];
      const date = parts[1];
      const time = parts[2];

      if (!date.includes("-")) return rate.created_by_and_time;

      const [year, month, day] = date.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      return `${merchantName} ${formattedDate} ${time}`;
    },
    getFilteredData(siteId) {
      return (
        this.filteredRateRulesData.find((rate) => rate.site_id === siteId) || {}
      );
    },
    AddRateRules() {
      this.$refs.add_rate_rules.getTimeShift();
      setTimeout(() => {
        this.$refs.add_rate_rules.getClientMethod();
      }, 100);
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    async filterData() {
      const params = {
        page: 1,
      };

      if (this.client_id) {
        params["rule_rates[client_id]"] = this.client_id;
      }

      if (this.site_id) {
        params["rule_rates[site_id]"] = this.site_id;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/rate_and_rule_filter`,
          {
            params,
          }
        );
        this.getRateRulesData = response.data.data || [];
        if (this.getRateRulesData.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "Report Not Found!";
        }
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      }
    },
    resetFilter() {
      this.client_id = "";
      this.site_id = "";

      this.localSearchQuery = "";

      this.getRateRulesDataMethod();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const isValidFileType = file.type === "text/csv";
      if (!isValidFileType) {
        Swal.fire({
          icon: "warning",
          title: "No File Selected",
          text: "Please select a CSV file.",
          confirmButtonText: "OK",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${VITE_API_URL}/rate_and_rule_filter`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const message = "Import Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.ImportCSV(response.data, file.name);
        })
        .catch((error) => {
          // Handle error
          // console.log(error);
        });
    },

    downloadCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    ImportCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    exportOneFile(exportType) {
      let queryParams = {
        format: "csv",
      };

      if (this.client_id) {
        queryParams["rule_rates[client_id]"] = this.client_id;
      }

      if (this.site_id) {
        queryParams["rule_rates[site_id]"] = this.site_id;
      }

      if (this.job_id) {
        queryParams["rule_rates[job_id]"] = this.job_id;
      }

      if (this.localSearchQuery) {
        queryParams.search = this.localSearchQuery;
      }
      if (exportType === "all") {
        queryParams.rate_ids = [];
      } else {
        if (!this.rate_ids || this.rate_ids.length === 0) {
          // alert("Please select at least one Site.");
          Swal.fire({
            icon: "warning",
            title: "No File Selected",
            text: "Please select at least one Site.",
            confirmButtonText: "OK",
          });
          return;
        }
        if (this.rate_ids.length > 0) {
          queryParams.rate_ids = this.rate_ids;
        } else {
          queryParams.rate_ids = [];
        }
      }
      // const filterName = this.getFilterName(this.selectedFilter);
      // const filename = `${filterName}_Sites.csv`;
      return axios
        .get(`${VITE_API_URL}/rate_and_rule_filter`, {
          params: queryParams,
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
        })
        .then((response) => {
          this.blobToText(response.data)
            .then((csvData) => {
              const filename = "Rate_RulesData.csv";
              this.downloadOneCSV(csvData, filename);
              const message = "Export file downloaded successfully";
              this.$refs.successAlert.showSuccess(message);
              this.rate_ids = [];
              for (let key in this.checkedClient) {
                this.checkedClient[key] = false;
              }
            })
            .catch((error) => {});
        })
        .catch((error) => {})
        .finally(() => {
          this.rate_ids = [];
        });
    },
    blobToText(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
      });
    },

    combineCsvData(csvDataArray) {
      let combinedCsvData = "";
      csvDataArray.forEach((csvData, index) => {
        if (index > 0) {
          const lines = csvData.split("\n");
          lines.shift();
          csvData = lines.join("\n");
        }

        combinedCsvData += csvData;
        if (index < csvDataArray.length - 1) {
          combinedCsvData += "\n";
        }
      });
      return combinedCsvData;
    },
    downloadOneCSV(csvData, filename) {
      const blob = new Blob([csvData], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },

    editRateRulesId(RateRulesId) {
      this.selectedRatesRulesId = RateRulesId;
      this.$refs.singleEdit_rate_rules.getTimeShift();

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getBusinessUnitMethod();
      }, 200);

      setTimeout(() => {
        this.$refs.singleEdit_rate_rules.getJobTitleMethod();
      }, 300);
      // setTimeout(() => {
      //   this.$refs.singleEdit_rate_rules.getSiteAccordingClientMethod();
      // }, 400);
    },
    extractFilteredRateRulesIds() {
      this.rate_ids = this.filteredRateRulesData.map((rate) => rate.id);
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

    handleCheckboxChange(dataId) {
      const selectedData = this.getRateRulesData.find(
        (data) => data.id === dataId
      );

      if (!selectedData) {
        return;
      }

      const { job_id, job, client_id } = selectedData;

      this.getRateRulesData.forEach((data) => {
        if (
          data.job_id === job_id &&
          data.job === job &&
          data.client_id === client_id
        ) {
          this.checkedClient[data.id] = this.checkedClient[dataId];

          if (this.checkedClient[dataId]) {
            if (!this.rate_ids.includes(data.id)) {
              this.rate_ids.push(data.id);
            }
          } else {
            const index = this.rate_ids.indexOf(data.id);
            if (index !== -1) {
              this.rate_ids.splice(index, 1);
            }
          }
        }
      });

      // console.log("Updated checkedClient:", this.checkedClient);
      // console.log("Updated rate_ids:", this.rate_ids);
    },
    editRateRulesMultiId(RateRulesId, siteID, jobID, job, clientID) {
      this.selectedRatesRulesId = RateRulesId;
      this.selectedSiteID = siteID;
      this.selectedJobID = jobID;
      this.selectedClientID = clientID;
      this.$refs.multipleEdit_rate_rules.getSiteAccordingClientMethod();
      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getClientMethod();
      }, 100);

      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getBusinessUnitMethod();
      }, 200);

      setTimeout(() => {
        this.$refs.multipleEdit_rate_rules.getJobTitleMethod();
      }, 300);
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
    async deleteSelectedStaffs(id) {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.delete(
          `${VITE_API_URL}/rate_and_rules/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the success response if needed
        // console.log("Delete successful:", response.data);
      } catch (error) {
        // console.error("Error during deletion:", error);
      } finally {
        // Any final actions can be placed here, e.g., hiding a loading spinner
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
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    // search api start

    async search() {
      try {
        this.searchResults = [];

        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");

        const response = await axiosInstance.get(
          `${VITE_API_URL}/rate_and_rules_search`,
          {
            params: {
              search_rates: modifiedSearchQuery,
            },
            headers: {
              "content-type": "application/json",
            },
          }
        );

        this.searchResults = response.data.rates;
      } catch (error) {
        if (
          (error.response && error.response.status === 400) ||
          error.response.status === 404
        ) {
          // this.errorMessage = "No vacancy found for the specified criteria";
        }
      }
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getRateRulesDataMethod();
    },
    async getRateRulesDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_and_rules`, {
          params: {
            page: this.currentPage,
            per_page: this.itemsPerPage,
          },
        });
        this.getRateRulesData = response.data.rates;

        this.filteredRateRulesData = this.getRateRulesData;
        if (this.getRateRulesData.length === 0) {
          this.errorMessageFilter = "Report Not Found!";
        } else {
          this.errorMessageFilter = "";
        }
      } catch (error) {
        // console.error('Error fetching client data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async getRateRulesWeekDataMethod(siteId) {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/find_rates_according_days?site_id=${siteId}`
        );
        this.getRateRulesWeekData = response.data.data;
      } catch (error) {
        // console.error('Error fetching client data:', error);
      }
    },
    async toggleDetails(index, siteId, client, job) {
      if (this.activeSiteId === index) {
        this.activeSiteId = null;
      } else {
        this.activeSiteId = index;
      }
      // this.activeSiteId = this.activeSiteId === index ? null : index;

      this.filteredRateRulesData = this.getRateRulesData.filter(
        (rate) =>
          rate.site_id === siteId && rate.client === client && rate.job === job
      );
    },
    formatTime(time) {
      return time.slice(0, 5);
    },
  },
  async beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getRateRulesDataMethod();
    });
  },
  async beforeRouteUpdate(to, from, next) {
    this.getRateRulesDataMethod();

    next();
  },
  mounted() {
    this.getRateRulesDataMethod();
    this.getBusinessUnitMethod();
    this.getJobTitleMethod();
    this.getClientMethod();
    this.getClientFetchSiteMethod();
  },
  created() {
    // console.log("Initial Data:", this.paginateCandidates);
    // this.rate_ids = this.paginateCandidates.map((data) => data.id);
    // this.paginateCandidates.forEach((data) => {
    //   this.checkedClient[data.id] = false;
    // });
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
}
.main-content {
  transition: all 0.3s;
}
.bg-define {
  background-color: #fdce5e17;
}
.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.btn-primary {
  border: none;
}
.form-check-input {
  border: 2px solid grey;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
.rounded-circle {
  border: 1px solid #ff5f30;
  padding: 8px 11px;
  cursor: pointer;
}
.border-left {
  border-left: 1px solid #ded9d9;
  height: 100vh;
}
a[data-v-507f63b7] {
  text-decoration: none;
}

.btn-primary {
  border-radius: 4px;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: transparent;
  border: 1px solid green;
  border-radius: 22px;
  color: green;
}

.nav-pills .nav-link {
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 22px;
}
ul.nav-pills {
  height: 53px;
  border-bottom: 1px solid #b8b1b1;
}

button.nav-link > li.nav-item {
  border-bottom: 2px solid red;
  padding-bottom: 5px;
}

.form-select {
  width: auto;
}

input::-webkit-input-placeholder {
  margin-left: 5px;
}
</style>
