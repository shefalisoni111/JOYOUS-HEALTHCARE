<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main" class="main d-flex">
      <div class=""><Navbar /></div>
      <div class="col-10 ps-5 pt-5">
        <div class="pagetitle d-flex justify-content-between px-2">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active">
                <a class="nav-link d-inline fs-4 fw-bolder" style="color: #000000"
                  >Invoice</a
                >
                <p>
                  <router-link
                    class="nav-link d-inline fw-bolder"
                    style="color: #000000"
                    aria-current="page"
                    to="/invoice/client-invoice"
                    >Client Invoice</router-link
                  >
                  / Staff Payroll
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div class="">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <div class="p-2">
                    <div class="d-lg-flex justify-content-lg-between">
                      <div class="d-flex">
                        <div class="d-flex align-items-center gap-2">
                          <div class="view-toggle">
                            <button
                              :class="[
                                'toggle-btn',
                                currentView === 'weekly' ? 'active' : '',
                              ]"
                              @click="
                                currentView = 'weekly';
                                updateDateRange();
                              "
                            >
                              Weekly
                            </button>
                            <button
                              :class="[
                                'toggle-btn',
                                currentView === 'monthly' ? 'active' : '',
                              ]"
                              @click="
                                currentView = 'monthly';
                                updateDateRange();
                              "
                            >
                              Monthly
                            </button>
                          </div>
                        </div>

                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center">
                          <span
                            v-if="currentView === 'weekly' && startDate && endDate"
                            class="fw-bold"
                          >
                            {{
                              "Monday " +
                              formatDate(startDate) +
                              " to Sunday " +
                              formatDate(endDate)
                            }}
                          </span>
                          <span
                            v-else-if="currentView === 'monthly' && startDate && endDate"
                            class="fw-bold"
                          >
                            {{ formatDate(startDate) + " to " + formatDate(endDate) }}
                          </span>
                        </div>
                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center fs-4">
                          <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                          <i class="bi bi-calendar2-check-fill"></i>
                          <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                        </div>
                      </div>

                      <div class="d-flex gap-3 align-items-center">
                        <!-- <form
                        v-if="getClientInvoiceDetail?.length != 0"
                        @submit.prevent="search"
                        class="form-inline my-2 my-lg-0 d-flex align-items-center justify-content-between gap-2"
                      >
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                          v-model="searchQuery"
                          @input="debounceSearch"
                        />
                      </form> -->
                        <!-- <router-link
                        type="button"
                        class="btn btn-primary text-nowrap fs-6 text-capitalize"
                        to="/invoice/Generate-invoice"
                      >
                        <i class="bi bi-file-earmark"></i>
                        generate invoice
                      </router-link> -->
                        <div>
                          <button
                            type="button"
                            class="btn btn-lg text-nowrap text-nowrap text-capitalize"
                            data-bs-toggle="modal"
                            data-bs-target="#generateInvoice"
                            data-bs-whatever="@mdo"
                            style="background: #fdb912; border-radius: 10px; color: #fff"
                          >
                            + generate CSV
                          </button>
                        </div>
                        <button
                          v-if="getClientInvoiceDetail?.length != 0"
                          type="button"
                          class="btn btn-danger btn btn-lg text-nowrap"
                          @click="toggleFilters"
                        >
                          <i class="bi bi-funnel"></i>
                          Show Filters
                        </button>
                        <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
                          <input
                            class="form-control form-control-lg mr-sm-2 position-relative"
                            type="search"
                            placeholder="Search.."
                            aria-label="Search"
                            v-model="searchQuery"
                            @input="debounceSearch"
                          />
                          <span
                            class="position-absolute"
                            style="transform: translate(1329%, -154%)"
                          >
                            <img
                              src="../../assets/Search.png"
                              class="img-fluid pe-2"
                              alt="RecPal"
                              loading="eager"
                          /></span>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    class="d-flex gap-2 mb-3 justify-content-between align-items-center"
                    v-if="showFilters"
                  >
                    <div class="d-flex gap-2">
                      <select
                        @change="filterData('site_id', $event.target.value)"
                        v-model="site_id"
                        id="selectBusinessUnit"
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
                      <select
                        @change="filterData('client_id', $event.target.value)"
                        v-model="client_id"
                        id="selectClients"
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

                      <!-- <select
                      @change="filterData('staff', $event.target.value)"
                      v-model="id"
                      id="selectCandidateList"
                    >
                      <option value="">All Staff</option>
                      <option
                        v-for="option in candidateLists"
                        :key="option.id"
                        :value="option.id"
                      >
                        {{ option.first_name }}
                      </option>
                    </select> -->

                      <button
                        :disabled="!isFilterSelected"
                        @click="resetFilters"
                        class="btn btn-secondary text-nowrap"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                  <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                 
                </ul> -->
                  <div v-if="currentView === 'weekly'">
                    <div>
                      <div v-for="(day, index) in daysOfWeek" :key="index"></div>
                      <div v-for="(day, index) in getWeekDates" :key="index"></div>
                    </div>
                  </div>

                  <div v-else-if="currentView === 'monthly'">
                    <div>
                      <div v-for="(day, index) in getMonthDates" :key="index"></div>
                    </div>
                  </div>

                  <div class="tab-content mt-4" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active table-wrapper"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <table class="table candidateTable" v-if="!searchQuery">
                        <thead>
                          <tr>
                            <th scope="col">#Number</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Site</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Created On</th>
                            <!-- <th scope="col">Due Date</th> -->
                            <th scope="col" class="text-center">Total Amount</th>
                            <!-- <th scope="col" class="text-center">Paid Amount</th>
                          <th scope="col" class="text-center">Balance Amount</th>
                          <th scope="col">Status</th> -->
                            <th scope="col" style="width: 7%">Invoice Creation Period</th>
                            <th scope="col" style="width: 6%">Invoice Lock</th>
                            <th scope="col" style="width: 6%">Generated By</th>
                            <th scope="col">Email Status</th>
                            <th scope="col" style="width: 7%">View</th>
                          </tr>
                        </thead>
                        <tbody v-if="getClientInvoiceDetail?.length > 0">
                          <tr
                            v-for="(data, index) in getClientInvoiceDetail"
                            :key="index"
                            @mouseenter="hoverRow = index"
                            @mouseleave="hoverRow = null"
                          >
                            <td scope="col">{{ data.invoice_number }}</td>
                            <td scope="col">{{ data.client }}</td>
                            <td scope="col">{{ data.site }}</td>
                            <td scope="col">{{ data.start_date }}</td>
                            <td scope="col">{{ data.end_date }}</td>
                            <td scope="col">{{ data.created_on }}</td>
                            <!-- <td scope="col">
                            {{ data.due_date }}
                          </td> -->
                            <td scope="col" class="text-center">
                              {{ "£" + data.total_amount }}
                            </td>
                            <!-- <td scope="col" class="text-center">
                            {{ "£" + data.paid_amount }}
                          </td>
                          <td scope="col" class="text-center">
                            {{ "£" + data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status }}</td> -->
                            <td scope="col">
                              {{ data.invoice_creation_period }}
                            </td>
                            <td scope="col">
                              <!-- <i
                              :class="getIconClass(data.invoice_lock)"
                              style="font-size: x-large; cursor: pointer"
                              @click="toggleInvoiceLock(data)"
                            ></i> -->
                              <!-- {{ data.invoice_lock }} -->
                              <label class="switch">
                                <input
                                  type="checkbox"
                                  :id="data.id"
                                  :checked="data.invoice_lock"
                                  @change="toggleInvoiceLock(data)"
                                  :class="{
                                    locked: data.invoice_lock,
                                    unlocked: !data.invoice_lock,
                                  }"
                                />
                                <div class="slider round"></div>
                              </label>
                            </td>
                            <td scope="col">Auto Generated</td>
                            <td scope="col">
                              {{ data.email_status }}
                            </td>
                            <td>
                              <div class="action-wrapper">
                                <i class="bi bi-three-dots dot-icon"></i>

                                <div v-if="hoverRow === index" class="action-menu">
                                  <router-link
                                    class="btn text-nowrap text-nowrap shadow-soft"
                                    :to="{
                                      name: 'ClientInvoiceView',
                                      params: { id: data.id },
                                    }"
                                  >
                                    <i class="bi bi-eye" style="color: #f9944b"></i>
                                    View
                                  </router-link>
                                </div>
                              </div>
                              <!-- <router-link
                                :to="{
                                  name: 'ClientInvoiceView',
                                  params: { id: data.id },
                                }"
                                class="text-success"
                                ><i class="bi bi-eye"></i
                              ></router-link> -->
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-if="errorMessageFilter">
                            <td
                              colspan="16"
                              class="text-danger text-center"
                              v-if="!isLoading"
                            >
                              {{ errorMessageFilter }}
                            </td>
                          </tr>
                          <tr v-else>
                            <td
                              colspan="16"
                              class="text-danger text-center"
                              v-if="!isLoading"
                            >
                              {{ "Data Not Found !" }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table candidateTable" v-else>
                        <thead>
                          <tr>
                            <th scope="col">#Number</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Site</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Created On</th>
                            <!-- <th scope="col">Due Date</th> -->
                            <th scope="col" class="text-center">Total Amount</th>
                            <!-- <th scope="col" class="text-center">Paid Amount</th>
                          <th scope="col" class="text-center">Balance Amount</th>
                          <th scope="col">Status</th> -->
                            <th scope="col">Invoice Creation Period</th>
                            <th scope="col">Invoice Lock</th>
                            <th scope="col">Generated By</th>
                            <th scope="col">Email Status</th>
                            <th scope="col" style="width: 7%">View</th>
                          </tr>
                        </thead>
                        <tbody v-if="searchResults?.length > 0">
                          <tr
                            v-for="(data, index) in searchResults"
                            :key="index"
                            @mouseenter="hoverRow = index"
                            @mouseleave="hoverRow = null"
                          >
                            <td scope="col">{{ data.invoice_number }}</td>
                            <td scope="col">{{ data.client }}</td>
                            <td scope="col">{{ data.site }}</td>
                            <td scope="col">{{ data.start_date }}</td>
                            <td scope="col">{{ data.end_date }}</td>
                            <td scope="col">{{ data.created_on }}</td>
                            <!-- <td scope="col">
                            {{ data.due_date }}
                          </td> -->
                            <td scope="col" class="text-center">
                              {{ data.total_amount }}
                            </td>
                            <!-- <td scope="col" class="text-center">{{ data.paid_amount }}</td>
                          <td scope="col" class="text-center">
                            {{ data.balance_amount }}
                          </td>
                          <td scope="col">{{ data.status }}</td> -->
                            <td scope="col">{{ data.invoice_creation_period }}</td>
                            <td scope="col">{{ data.invoice_lock }}</td>
                            <td scope="col">Auto Generated</td>
                            <td scope="col">
                              {{ data.email_status }}
                            </td>
                            <td>
                              <div class="action-wrapper">
                                <i class="bi bi-three-dots dot-icon"></i>

                                <div v-if="hoverRow === index" class="action-menu">
                                  <router-link
                                    class="btn text-nowrap text-nowrap shadow-soft"
                                    :to="{
                                      name: 'ClientInvoiceView',
                                      params: { id: data.id },
                                    }"
                                  >
                                    <i class="bi bi-eye" style="color: #f9944b"></i>
                                    View
                                  </router-link>
                                </div>
                              </div>
                              <!-- <router-link
                                :to="{
                                  name: 'ClientInvoiceView',
                                  params: { id: data.id },
                                }"
                                class="text-success"
                                ><i class="bi bi-eye"></i
                              ></router-link> -->
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr v-if="errorMessageFilter">
                            <td
                              colspan="16"
                              class="text-danger text-center"
                              v-if="!isLoading"
                            >
                              {{ errorMessageFilter }}
                            </td>
                          </tr>
                          <tr v-else>
                            <td
                              colspan="16"
                              class="text-danger text-center"
                              v-if="!isLoading"
                            >
                              {{ "Data Not Found !" }}
                            </td>
                          </tr>
                        </tbody>
                        <!-- <tbody v-else>
                        <tr>
                          <td colspan="16" class="text-danger text-center">
                            {{ "No Match Found !" }}
                          </td>
                        </tr>
                      </tbody> -->
                      </table>
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

        <div
          class="mx-3 d-flex justify-content-between"
          style="text-align: right"
          v-if="getClientInvoiceDetail?.length >= 10"
        >
          <div class="d-flex">
            <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
            <button
              class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
              style="color: #00000080"
              type="button"
              id="recordsPerPageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ itemsPerPage }} Records
            </button>
            <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
                  >20 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
                  >50 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
                  >100 Records</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
              style="background: #ffffff; color: #f9944b"
            >
              {{ currentPage }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div
          class="mx-3 mb-2 d-flex justify-content-between"
          style="text-align: right"
          v-if="searchResults.length >= 10"
        >
          <div class="d-flex">
            <h6 class="d-flex align-items-center">Show: &nbsp;</h6>
            <button
              class="btn btn-sm dropdown-toggle rounded-[12px] border border-[1px] p-3 border"
              style="color: #00000080"
              type="button"
              id="recordsPerPageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ itemsPerPage }} Records
            </button>
            <ul class="dropdown-menu" aria-labelledby="recordsPerPageDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(20)"
                  >20 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(50)"
                  >50 Records</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="setItemsPerPage(100)"
                  >100 Records</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center">
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 cursor-none fw-bolder"
              style="background: #ffffff; color: #f9944b"
            >
              {{ currentPage }}
            </button>
            &nbsp;&nbsp;
            <button
              class="btn btn-sm ml-2 rounded-[12px] border border-[1px] p-3 border px-4"
              style="background: #ffffff"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
    <GenerateInvoiceAdd />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../Navbar.vue";

import SuccessAlert from "../Alerts/SuccessAlert.vue";
import GenerateInvoiceAdd from "../modals/InvoicePagesModal/GenerateInvoiceAdd.vue";
import Loader from "../Loader/Loader.vue";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default {
  data() {
    return {
      currentView: "weekly",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      startDate: new Date(),
      endDate: new Date(),
      getClientInvoiceDetail: [],
      searchQuery: null,
      errorMessageFilter: "",
      debounceTimeout: null,
      searchResults: [],
      showFilters: false,
      totalPages: 1,
      hoverRow: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalCount: 0,
      clientData: [],
      candidateLists: [],
      businessUnit: [],
      client_id: "",
      site_id: "",
      id: "",
      isLoading: false,
      filters: {
        site_id: null,
        client_id: null,
      },
    };
  },
  components: { SuccessAlert, Loader, GenerateInvoiceAdd, Navbar },
  computed: {
    isFilterSelected() {
      return this.site_id || this.client_id;
    },
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    selectClients() {
      const client_id = this.clientData.find((option) => option.id === this.client_id);
      return client_id ? client_id.client_name : "";
    },
    selectCandidateList() {
      const id = this.candidateLists.find((option) => option.id === this.id);
      return id ? id.first_name : "";
    },
    getWeekDates() {
      const currentDate = new Date(this.startDate);
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        weekDates.push(date.getDate());
      }
      return weekDates;
    },

    getMonthDates() {
      const currentDate = new Date();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const monthDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return monthDates;
    },
  },
  methods: {
    resetFilters() {
      this.site_id = "";

      this.client_id = "";
      this.getClientInvoice();
    },
    getIconClass(invoiceLock) {
      return invoiceLock === false
        ? "bi bi-exclamation-circle-fill text-success"
        : "bi bi-exclamation-circle-fill text-danger";
    },
    async toggleInvoiceLock(data) {
      const newLockValue = !data.invoice_lock;

      const payload = {
        lock_value: newLockValue.toString(),
      };

      try {
        const response = await axios.put(
          `${VITE_API_URL}/enable_and_disable_invoice_lock/${data.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          data.invoice_lock = newLockValue;

          const message = newLockValue
            ? "Client Invoice locked successfully!"
            : "Client Invoice unlocked successfully!";
          this.$refs.successAlert.showSuccess(message);
          // const updatedClient = this.getClientInvoiceDetail.find(
          //   (client) => client.id === data.id
          // );
          // if (updatedClient) {
          //   updatedClient.invoice_lock = newLockValue;
          // }
          this.getClientInvoice();
        } else {
          // console.error("Failed to update invoice lock:", response.data);
          // Handle failure
        }
      } catch (error) {
        // console.error("API call error:", error.response?.data || error.message);
        // Handle error
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
    async getCandidateListMethod() {
      const pagesToFetch = [1, 2, 3];
      let allStaffData = [];
      const payload = {
        status_value: "approved",
        activated_value: true,
        per_page: 10,
      };

      try {
        const responses = await Promise.all(
          pagesToFetch.map((page) =>
            axios.get(`${VITE_API_URL}/candidates`, {
              params: {
                ...payload,
                page: page,
              },
            })
          )
        );

        responses.forEach((response) => {
          if (response.data && response.data.data) {
            allStaffData = allStaffData.concat(response.data.data);
          }
        });

        this.candidateLists = allStaffData;
        this.candidateStatus = response.data.data.status;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          // console.error('Error fetching client data:', error.response.data.message);
        } else {
          // console.error('Error fetching client data:', error);
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
    moveToPrevious() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() - 7);
        this.endDate.setDate(this.endDate.getDate() - 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() - 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.getClientInvoice();
    },
    moveToNext() {
      if (this.currentView === "weekly") {
        this.startDate.setDate(this.startDate.getDate() + 7);
        this.endDate.setDate(this.endDate.getDate() + 7);
        this.updateDateRange();
      } else if (this.currentView === "monthly") {
        this.startDate.setMonth(this.startDate.getMonth() + 1);
        this.endDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          0
        );
      }
      this.getClientInvoice();
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filterData(filter_type, value) {
      this.filters[filter_type] = value;
      this.makeFilterAPICall();
    },

    async makeFilterAPICall(filterType, filterValue) {
      try {
        const response = await axios.get(`${VITE_API_URL}/client_invoices`, {
          params: {
            per_page: this.totalPages,
            "client_invoice[site_id]": this.filters.site_id,
            "client_invoice[client_id]": this.filters.client_id,
          },
        });

        this.getClientInvoiceDetail = response.data.data || [];

        this.errorMessageFilter =
          this.getClientInvoiceDetail.length === 0 ? "Report Not Found!" : "";
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            const errorMessages = error.response.data.error;
            if (errorMessages === "No records found for the given filter") {
              errorMessages === "No records found for the given filter";
              // alert("No records found for the given filter");
            } else {
              // alert(errorMessages);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessages,
                confirmButtonText: "OK",
              });
            }
          }
        } else {
          // console.error("API call error:", error);
        }
      }
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];
        const modifiedSearchQuery = this.searchQuery.replace(/ /g, "_");
        const response = await axiosInstance.get(
          `${VITE_API_URL}/client_invoice_serching`,
          {
            params: {
              invoice_query: modifiedSearchQuery,
            },
          }
        );

        this.searchResults = response.data.candidate;
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          // this.errorMessage = "No candidates found for the specified criteria";
        }
      }
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    updateDateRange() {
      if (this.currentView === "weekly") {
        const weekStart = new Date(this.startDate);
        weekStart.setDate(this.startDate.getDate() - this.startDate.getDay() + 1);
        this.startDate = weekStart;

        const weekEnd = new Date(this.startDate);
        weekEnd.setDate(weekEnd.getDate() + 6);
        this.endDate = weekEnd;
      } else if (this.currentView === "monthly") {
        const currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      localStorage.setItem("startDate", this.startDate.toISOString());
      localStorage.setItem("endDate", this.endDate.toISOString());
      this.getClientInvoice();
    },
    loadDateRangeFromLocalStorage() {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate && storedEndDate) {
        this.startDate = new Date(storedStartDate);
        this.endDate = new Date(storedEndDate);
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    // async vacancyDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   const token = localStorage.getItem("token");
    //   await axios
    //     .delete(`${VITE_API_URL}/vacancies/` + id, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: "bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       this.getClientInvoice();
    //     });
    //   // alert("Record Deleted ");
    // },
    async changePage(page) {
      this.currentPage = page;
      await this.getClientInvoice();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getClientInvoice();
    },
    async getClientInvoice() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      let requestData = {};

      if (this.currentView === "weekly") {
        requestData = {
          date: this.formatDate(this.startDate),
          per_page: this.itemsPerPage,
          range: "Weekly",
        };
      } else if (this.currentView === "monthly") {
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);
        requestData = {
          // start_date: formattedStartDate,
          // end_date: formattedEndDate,
          date: this.formatDate(this.startDate),
          per_page: this.itemsPerPage,
          range: "Monthly ",
        };
      }

      try {
        const response = await axios.get(`${VITE_API_URL}/client_invoices`, {
          params: requestData,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        this.getClientInvoiceDetail = response.data.data;

        if (this.getClientInvoiceDetail.length === 0) {
          this.errorMessage = "No client invoices found for the specified criteria.";
        } else {
          this.errorMessage = "";
        }
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery.trim() === "") {
        this.searchResults = [];
      }
    },
  },
  mounted() {
    this.getClientInvoice();
    this.getBusinessUnitMethod();

    this.getClientMethod();

    this.getCandidateListMethod();

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;
  background-color: #f9f9f9;
}
.main-content {
  transition: all 0.3s;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
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
.switch {
  width: 50px;
  height: 17px;
  position: relative;
  display: inline-block;
}

.switch input {
  display: none;
}

.switch .slider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  cursor: pointer;
  background-color: #f52b24;
  border-radius: 30px !important;
  border: 0;
  padding: 0;
  display: block;
  margin: 12px 10px;
  width: 45px;
  height: 25px;
}

.switch .slider:before {
  position: absolute;
  background-color: #fff;
  height: 23px;
  width: 23px;
  content: "";
  left: 4px;
  bottom: 1px;
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
  background-color: #34c759;
  padding: 0px;
  width: 45px;
  height: 25px;
}

.switch input:checked + .slider:before {
  transform: translateX(15px);
  background-color: #fff;
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
table th {
  background-color: #ff5f30;
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
@media (max-width: 1120px) {
  .candidateTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
