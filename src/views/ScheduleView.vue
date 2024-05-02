<template>
  <div>
    <Navbar />
    <div class="container-fluid p-0">
      <div id="main">
        <div class="pagetitle d-flex justify-content-between px-2 pt-3">
          <div class="py-3">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item active text-uppercase fs-6">
                <router-link class="nav-link d-inline" aria-current="page" to="/home"
                  >Dashboard</router-link
                >
                / <span class="color-fonts">Schedule</span>
              </li>
            </ol>
          </div>

          <div class="d-flex align-items-center gap-2">
            <div>
              <form @submit.prevent="search" class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  v-model="searchQuery"
                  @input="debounceSearch"
                />
              </form>
            </div>
            <button
              type="button"
              class="btn btn-primary text-nowrap border-0"
              data-bs-toggle="modal"
              data-bs-target="#schedulePublishStaffList"
              data-bs-whatever="@mdo"
            >
              Publish
            </button>
          </div>
        </div>

        <div class="row">
          <div class="full-page-calendar">
            <SchedulePublishStaffList />

            <SuccessAlert ref="successAlert" />
            <div>
              <EditAssignShceduleVaacncy
                :vacancyId="String(vacancyId)"
                :candidateId="selectedCandidateId"
                :columnDateMatch="columnDateMatch"
                @updated-assign="fetchAssignList"
              />
              <ScheduleDirectAssignList
                :columnDateMatch="columnDateMatch"
                :initialDate="selectedDate"
                :candidateId="selectedCandidateId"
                :candidateJob="candidateJob"
                @closeModal="closeModal"
              />
            </div>
          </div>
          <div class="table-wrapper">
            <div class="sidebar-container scheduleTable">
              <div class="sidebar-button" :class="{ 'slide-left': isOpen }">
                <div class="d-flex justify-content-between">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 pe-2 fs-5"
                    >
                      <i class="bi bi-funnel-fill"></i>
                    </button>
                    <span v-if="isOpen" class="text-danger fs-5 ps-2">Filter </span>
                  </div>
                  <div>
                    <i
                      v-if="isOpen"
                      class="bi bi-x float-end fs-2 d-flex cursor-pointer"
                      @click="toggleSidebar"
                    ></i>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-person-fill-add"
                        style="border-radius: 50%; background: #ef5261; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="job_id"
                        for="SelectAvailability"
                        class="form-select"
                      >
                        <option value="" selected for="SelectAvailability">
                          All Availability
                        </option>
                        <option id="SelectAvailability">Late</option>
                        <option id="SelectAvailability">Night</option>
                        <option id="SelectAvailability">Unavailable</option>
                        <option id="SelectAvailability">Early</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-suitcase-lg-fill"
                        style="border-radius: 50%; background: #28c77d; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select v-model="job_id" for="selectJobTitle" class="form-select">
                        <option value="" selected>Select Jobs</option>
                        <option
                          id="selectJobTitle"
                          v-for="option in options"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-building"
                        style="border-radius: 50%; background: #ffeb3b; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        v-model="site_id"
                        for="selectBusinessUnit"
                        class="form-select"
                      >
                        <option value="" selected>Select Site</option>
                        <option
                          id="selectBusinessUnit"
                          v-for="option in businessUnit"
                          :key="option.id"
                          :value="option.id"
                        >
                          {{ option.site_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-calendar3"
                        style="border-radius: 50%; background: #ff6d3f; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select v-model="job_id" for="selectShifts" class="form-select">
                        <option value="" selected>All Shift</option>
                        <option
                          v-for="option in shiftsTime"
                          :key="option.id"
                          :value="option.id"
                          id="selectShifts"
                        >
                          {{ option.shift_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex mt-2">
                  <div>
                    <button
                      @click="toggleSidebar"
                      class="btn btn-default border-0 ps-0 pe-2 fs-5 mt-2"
                    >
                      <i
                        class="bi bi-bell-fill"
                        style="border-radius: 50%; background: #5388d5; padding: 10px"
                      ></i>
                    </button>
                  </div>
                  <div>
                    <div class="filters" v-show="isOpen">
                      <select
                        @change="filterData($event.target.value)"
                        v-model="job_id"
                        for="selectPublishStatus"
                        class="form-select"
                      >
                        <option value="" id="selectPublishStatus" selected>
                          Publish Status
                        </option>
                        <option value="true" id="selectPublishStatus">Publish</option>
                        <option value="false" id="selectPublishStatus">UnPublish</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-content" :class="{ 'slide-left': isOpen }">
                <table class="table" v-if="!searchQuery">
                  <thead>
                    <tr>
                      <th style="width: 15%">
                        <div class="d-flex justify-content-between">
                          <div class="d-flex align-items-center">Shifts</div>
                          &nbsp; &nbsp; &nbsp;&nbsp;
                          <div class="d-flex align-items-center fs-4">
                            <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                            <i class="bi bi-calendar2-check-fill"></i>
                            <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                          </div>
                        </div>
                      </th>

                      <th>
                        <div class="calendar-grid">
                          <div v-for="day in daysOfWeek" :key="day" class="day-header">
                            {{ day }}
                          </div>
                          <div
                            v-for="date in selectedDateRow"
                            :key="date"
                            class="day-header"
                          >
                            {{ formatDate(date) }}
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border-right: 1px solid rgb(209, 208, 208)"></td>
                      <td>
                        <div
                          v-if="!searchQuery"
                          class="calendar-grid"
                          style="max-height: 90px; overflow-y: auto; overflow-x: hidden"
                        >
                          <div v-for="(data, index) in vacancyList" :key="index">
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="text-center"
                            >
                              <ul
                                v-if="data.date === formattedDate(day)"
                                class="list-unstyled mb-0"
                              >
                                <li
                                  class="position-relative"
                                  v-for="(vacancy, liIndex) in data.vacancies"
                                  :key="vacancy.id"
                                  :draggable="true"
                                  @dragstart="handleDragStart(vacancy)"
                                  @drop="handleRevertDrop(data.candidate_id, $event)"
                                  @dragover.prevent="handleDragOver"
                                  :class="{
                                    'bg-info': liIndex === 0,
                                    'bg-warning': liIndex === 1,
                                    'bg-success': liIndex === 2,
                                    'bg-primary': liIndex >= 3,
                                  }"
                                >
                                  <span class="d-flex flex-column align-items-baseline">
                                    <span class="text-capitalize"
                                      >{{ vacancy.site }},{{ vacancy.job_title }}</span
                                    >

                                    <span class="">{{
                                      extractTimeRange(vacancy.site_shift)
                                    }}</span>
                                  </span>
                                  <span class="staff-count-round text-white">{{
                                    vacancy.staff_required
                                  }}</span>
                                </li>
                                <!-- <li>business_unit</li> -->
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr v-for="data in paginateCandidates" :key="data.id">
                      <div
                        class="text-capitalize fw-bold"
                        style="border-right: 1px solid rgb(209, 208, 208)"
                      >
                        {{ data.candidate_name }}

                        <span class="fs-6 text-muted fw-100"
                          ><br /><span
                            style="background: rgb(209, 207, 207); padding: 3px"
                            >{{ data.job }}</span
                          ></span
                        >
                      </div>

                      <td>
                        <div>
                          <div class="calendar-grid" @dragover.prevent="handleDragOver">
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="pt-2"
                              data-bs-toggle="modal"
                              data-bs-target="#scheduleDirectAssignList"
                              data-bs-whatever="@mdo"
                              @click="openModal(data, formattedDate(day))"
                              :class="{
                                'calendar-day': true,
                                clickable: day !== '',
                              }"
                              @drop="handleDrop(data, formattedDate(day))"
                            >
                              <span v-for="avail in data.availability" :key="avail.id">
                                <span v-if="avail.date === formattedDate(day)">
                                  <span
                                    v-if="avail.status"
                                    style="font-size: small; padding: 0px 5px"
                                    v-bind:class="{
                                      'btn btn-warning ': avail.status === 'Late',
                                      'btn btn-primary ': avail.status === 'Unavailable',
                                      'btn btn-secondary ': avail.status === 'Night',
                                      'btn btn-light ': avail.status === 'Early',
                                    }"
                                  >
                                    {{
                                      avail.status ? avail.status[0].toUpperCase() : ""
                                    }}
                                  </span>
                                </span>
                              </span>
                              &nbsp;&nbsp;

                              <span v-for="assign in assignStaffDisplay" :key="assign.id">
                                <span v-if="data.candidate_id === assign.candidate_id">
                                  <span v-for="data in assign.vacancies" :key="data.id">
                                    <span v-for="date in data.dates" :key="date">
                                      <span
                                        v-if="formatDates(date) === formattedDate(day)"
                                      >
                                        <span
                                          :draggable="true"
                                          @dragstart="
                                            handleDragRevert(data, assign.candidate_id)
                                          "
                                        >
                                          <div
                                            data-bs-toggle="modal"
                                            data-bs-target=" #editAssignScheduleVacancy"
                                            data-bs-whatever="@mdo"
                                            @click="
                                              openModalEdit(data, formattedDate(day))
                                            "
                                            :class="{
                                              'calendar-day': true,
                                              clickable: day !== '',
                                            }"
                                          >
                                            <span
                                              class="assignVacancyDesign mt-1 text-capitalize d-flex justify-content-center"
                                            >
                                              {{ data.site }},
                                              {{ extractTimeRange(data.site_shift)
                                              }}<br />
                                              {{ data.job_title }} &nbsp;

                                              <br />
                                            </span>
                                          </div>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>

                              <div
                                v-if="dropCandidateId === data.id && dropDay === day"
                                class="drop-zone"
                              >
                                {{ droppedContent }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="table" v-if="searchQuery">
                  <thead>
                    <tr>
                      <th style="width: 15%">
                        <div class="d-flex justify-content-between">
                          <div class="d-flex align-items-center">Shifts</div>
                          &nbsp; &nbsp; &nbsp;&nbsp;
                          <div class="d-flex align-items-center fs-4">
                            <i class="bi bi-caret-left-fill" @click="moveToPrevious"></i>
                            <i class="bi bi-calendar2-check-fill"></i>
                            <i class="bi bi-caret-right-fill" @click="moveToNext"></i>
                          </div>
                        </div>
                      </th>

                      <th>
                        <div class="calendar-grid">
                          <div v-for="day in daysOfWeek" :key="day" class="day-header">
                            {{ day }}
                          </div>
                          <div
                            v-for="date in selectedDateRow"
                            :key="date"
                            class="day-header"
                          >
                            {{ formatDate(date) }}
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody v-if="searchResults?.length > 0">
                    <tr v-for="data in searchResults" :key="data.id">
                      <td style="border-right: 1px solid rgb(209, 208, 208)"></td>
                      <td>
                        <div
                          class="calendar-grid"
                          style="max-height: 90px; overflow-y: auto; overflow-x: hidden"
                        >
                          <div v-for="(data, index) in vacancyList" :key="index">
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="text-center"
                            >
                              <ul
                                v-if="data.date === formattedDate(day)"
                                class="list-unstyled mb-0"
                              >
                                <li
                                  class="position-relative"
                                  v-for="(vacancy, liIndex) in data.vacancies"
                                  :key="vacancy.id"
                                  :draggable="true"
                                  @dragstart="handleDragStart(vacancy)"
                                  @drop="handleRevertDrop(data.candidate_id, $event)"
                                  @dragover.prevent="handleDragOver"
                                  :class="{
                                    'bg-info': liIndex === 0,
                                    'bg-warning': liIndex === 1,
                                    'bg-success': liIndex === 2,
                                    'bg-primary': liIndex >= 3,
                                  }"
                                >
                                  <span class="d-flex flex-column align-items-baseline">
                                    <span class="text-capitalize"
                                      >{{ vacancy.site }},{{ vacancy.job_title }}</span
                                    >

                                    <span class="">{{
                                      extractTimeRange(vacancy.site_shift)
                                    }}</span>
                                  </span>
                                  <span class="staff-count-round text-white">{{
                                    vacancy.staff_required
                                  }}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr v-for="data in paginateSearch" :key="data.id">
                      <div
                        class="text-capitalize fw-bold"
                        style="border-right: 1px solid rgb(209, 208, 208)"
                      >
                        {{ data.candidate_name }}

                        <span class="fs-6 text-muted fw-100"
                          ><br /><span
                            style="background: rgb(209, 207, 207); padding: 3px"
                            >{{ data.job }}</span
                          ></span
                        >
                      </div>

                      <td>
                        <div>
                          <div class="calendar-grid" @dragover.prevent="handleDragOver">
                            <div
                              v-for="day in selectedDateRow"
                              :key="day"
                              class="pt-2"
                              data-bs-toggle="modal"
                              data-bs-target="#scheduleDirectAssignList"
                              data-bs-whatever="@mdo"
                              @click="openModal(data, formattedDate(day))"
                              :class="{
                                'calendar-day': true,
                                clickable: day !== '',
                              }"
                              @drop="handleDrop(data, formattedDate(day))"
                            >
                              <span v-for="avail in data.availability" :key="avail.id">
                                <span v-if="avail.date === formattedDate(day)">
                                  <span
                                    v-if="avail.status"
                                    style="font-size: small; padding: 0px 5px"
                                    v-bind:class="{
                                      'btn btn-warning ': avail.status === 'Late',
                                      'btn btn-primary ': avail.status === 'Unavailable',
                                      'btn btn-secondary ': avail.status === 'Night',
                                      'btn btn-light ': avail.status === 'Early',
                                    }"
                                  >
                                    {{
                                      avail.status ? avail.status[0].toUpperCase() : ""
                                    }}
                                  </span>
                                </span>
                              </span>
                              &nbsp;&nbsp;

                              <span v-for="assign in assignStaffDisplay" :key="assign.id">
                                <span v-if="data.candidate_id === assign.candidate_id">
                                  <span v-for="data in assign.vacancies" :key="data.id">
                                    <span v-for="date in data.dates" :key="date">
                                      <span
                                        v-if="formatDates(date) === formattedDate(day)"
                                      >
                                        <span
                                          :draggable="true"
                                          @dragstart="
                                            handleDragRevert(data, assign.candidate_id)
                                          "
                                        >
                                          <div
                                            data-bs-toggle="modal"
                                            data-bs-target=" #editAssignScheduleVacancy"
                                            data-bs-whatever="@mdo"
                                            @click="
                                              openModalEdit(data, formattedDate(day))
                                            "
                                            :class="{
                                              'calendar-day': true,
                                              clickable: day !== '',
                                            }"
                                          >
                                            <span
                                              class="assignVacancyDesign mt-1 text-capitalize d-flex justify-content-center"
                                            >
                                              {{ data.site }},
                                              {{ extractTimeRange(data.site_shift)
                                              }}<br />
                                              {{ data.job_title }} &nbsp;

                                              <br />
                                            </span>
                                          </div>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>

                              <div
                                v-if="dropCandidateId === data.id && dropDay === day"
                                class="drop-zone"
                              >
                                {{ droppedContent }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="2" class="text-danger text-center">
                        {{ errorMessage }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" style="text-align: right" v-if="searchResults.length >= 8">
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= searchResults.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <div class="mx-3" style="text-align: right" v-if="candidateList.length >= 8">
      <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary mr-2"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous</button
      >&nbsp;&nbsp; <span>{{ currentPage }}</span
      >&nbsp;&nbsp;
      <button
        class="btn btn-sm btn-primary ml-2"
        :disabled="currentPage * itemsPerPage >= candidateList.length"
        @click="currentPage++"
      >
        Next
      </button>

      <!-- <ScheduleDirectAssignList
        :columnDateMatch="columnDateMatch"
        :initialDate="selectedDate"
        :candidateId="selectedCandidateId"
        :candidateJob="candidateJob"
        @closeModal="closeModal"
      /> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditAssignShceduleVaacncy from "../components/modals/Schedule/EditAssignShceduleVaacncy.vue";
import ScheduleDirectAssignList from "../components/modals/Schedule/ScheduleDirectAssignList.vue";
import Navbar from "../components/Navbar.vue";
import SchedulePublishStaffList from "../components/modals/Schedule/SchedulePublishStaffList.vue";
import SuccessAlert from "../components/Alerts/SuccessAlert.vue";
const axiosInstance = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
export default {
  data() {
    return {
      isOpen: false,
      currentView: "weekly",
      startDate: new Date(),
      endDate: new Date(),
      currentDate: new Date(),
      selectedDate: new Date(),
      candidateJob: null,
      vacancyId: "",
      candidateList: [],
      shiftsTime: [],
      selectedCandidateId: null,
      assignStaffDisplay: [],
      columnDateMatch: "",
      currentSelectedCandidate: null,
      statusForSelectedDate: null,
      vacancyList: [],
      vacancyBeingDragged: {},
      dropCandidateId: null,
      dropDay: null,
      droppedContent: null,
      currentPage: 1,
      itemsPerPage: 7,
      options: [],
      job_id: "",
      site_id: "",
      assignedCandidateList: [],
      businessUnit: [],
      isModalOpen: false,
      flattenedAssignVacancies: [],
      searchQuery: null,
      debounceTimeout: null,
      searchResults: [],
      errorMessage: "",
    };
  },

  computed: {
    selectBusinessUnit() {
      const site_id = this.businessUnit.find((option) => option.id === this.site_id);
      return site_id ? site_id.site_name : "";
    },
    selectJobTitle() {
      const job_id = this.options.find((option) => option.id === this.job_id);
      return job_id ? job_id.name : "";
    },
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.candidateList.slice(startIndex, endIndex);
    },
    paginateSearch() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    selectShifts() {
      const shifts_id = this.shiftsTime.find((option) => option.id === this.shifts_id);
      return shifts_id ? shifts_id.shift_name : "";
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
    totalRecordsOnPage() {
      return this.paginateSearch.length;
    },
    daysOfWeek() {
      return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    },

    selectedDateRow() {
      const selectedDate = new Date(this.startDate);
      const selectedDateRow = [];
      const dayOfWeek = selectedDate.getDay();
      const startDay = (dayOfWeek - 1 + 7) % 7;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(selectedDate.getDate() + i - startDay);

        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();
        if (currentDate.getDate() > lastDayOfMonth) {
          currentDate.setMonth(currentDate.getMonth() + 1);

          currentDate.setDate(1);

          currentDate.setDate(i + 1 - startDay);
        }

        selectedDateRow.push(currentDate);
      }

      return selectedDateRow;
    },
    candidateName() {
      return this.selectedCandidate ? this.selectedCandidate.first_name : "";
    },

    formattedDates() {
      return this.selectedDateRow.map((day) => this.formatDate(day));
    },

    formattedStartDate() {
      return this.formatDate(this.selectedDateRow[0]);
    },
    formattedEndDate() {
      return this.formatDate(this.selectedDateRow[this.selectedDateRow.length - 1]);
    },
    filteredAssignStaff() {
      return function (candidateId) {
        return this.assignStaffDisplay.filter(
          (assign) => assign.candidate_id === candidateId
        );
      };
    },
  },
  watch: {
    columnDateMatch() {
      this.filteredVacancies();
    },
  },
  methods: {
    filterData(value) {
      let filter_type = "publish";
      let filter_value = value === "true" ? "true" : "false";

      this.makeFilterAPICall(filter_type, filter_value);
    },
    async makeFilterAPICall(filter_type, filter_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/schedule_filter`, {
          params: {
            filter_type: filter_type,
            filter_value: filter_value,
          },
        });

        this.vacancyList = response.data.vacancies;
        //this.searchResults = response.data.vacancies;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const errorMessages = error.response.data.error;
          if (errorMessages === "No records found for the given filter") {
            alert("No records found for the given filter");
          } else {
            alert(errorMessages);
          }
        } else {
        }
      }
    },
    async getTimeShift() {
      await axios
        .get(`${VITE_API_URL}/shifts`)
        .then((response) => (this.shiftsTime = response.data));
    },
    debounceSearch() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.search();
      }, 100);
    },
    //search api start

    async search() {
      try {
        this.searchResults = [];

        const response = await axiosInstance.get(
          `${VITE_API_URL}/availability_searching/${this.searchQuery}`
        );

        this.searchResults = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = "No Staff found for the specified criteria";
        }
      }
    },
    extractTimeRange(shift) {
      if (shift && shift.includes("Holiday")) {
        if (shift && shift.includes("Day Shift")) {
          return shift.replace("Holiday Day Shift", "Holiday Night Shift").split(" ")[3];
        } else if (shift && shift.includes("Night Shift")) {
          return shift.replace("Holiday Night Shift", "Holiday Day Shift").split(" ")[3];
        }
      } else if (shift && shift.includes("Day Shift")) {
        return shift.split(" ")[2];
      } else if (shift && shift.includes("Night Shift")) {
        return shift.split(" ")[2];
      }
    },
    formatDates(dateString) {
      if (!dateString) return "";
      const parts = dateString.split(", ");
      if (parts.length < 2) return "";
      const [dayOfWeek, date] = parts;
      const [day, month, year] = date.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    filteredVacancies() {
      return this.vacancyList.filter((item) => item.date == this.columnDateMatch);
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
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
      this.columnDateMatch = this.formattedStartDate;
      this.fetchVacancyListMethod();
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
      this.columnDateMatch = this.formattedStartDate;
      this.fetchVacancyListMethod();
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

    handleDragStart(vacancy) {
      if (vacancy && vacancy.id) {
        this.vacancyBeingDragged = vacancy;
      }
    },
    handleDragRevert(vacancy, candidateId) {
      this.vacancyBeingDragged = vacancy;
      this.dropCandidateId = candidateId;
    },
    async handleRevertDrop(candidateId, event) {
      event.preventDefault();

      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: this.dropCandidateId,
        };

        const response = await axios.delete(
          `${VITE_API_URL}/unassign_vacancy_with_schedule`,
          { data: payload }
        );

        if (response.status >= 200 && response.status < 300) {
          const message = "Staff UnAssigned Shift Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.fetchCandidateList();
          this.fetchAssignList();
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errorMessage = error.response.data.error;
          alert(errorMessage);
        } else {
          // Handle other errors if needed
        }
      } finally {
        this.vacancyBeingDragged = null;
        this.dropCandidateId = null;
        this.dropDay = null;
        this.droppedContent = null;
      }
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    async handleDrop(candidateId, date) {
      // console.log(date);
      // const dateObject = new Date(selectedDate);

      // const day = dateObject.getDate();
      // const month = dateObject.getMonth() + 1;
      // const year = dateObject.getFullYear();

      // const formattedDate = `${day}/${month}/${year}`;
      try {
        if (!this.vacancyBeingDragged || !this.vacancyBeingDragged.id) {
          return;
        }

        // if (date !== this.formattedDate(this.dropDay)) {
        //   return;
        // }

        const payload = {
          vacancy_id: this.vacancyBeingDragged.id,
          candidate_id: candidateId.candidate_id,
          // date: date,
        };

        const response = await axios.post(
          `${VITE_API_URL}/assign_vacancy_with_schedule`,
          payload
        );

        if (response.status >= 200 && response.status < 300) {
          const message = "Staff Assigned Shift Successfully";
          this.$refs.successAlert.showSuccess(message);
          this.fetchCandidateList();
          this.fetchAssignList();
        }
      } catch (error) {
        let errorMessage;
        if (
          error.response &&
          error.response.status === 422 &&
          typeof error.response.data === "object" &&
          error.response.data.error &&
          error.response.data.error.base &&
          Array.isArray(error.response.data.error.base) &&
          error.response.data.error.base.length > 0
        ) {
          errorMessage = error.response.data.error.base[0];
        } else {
          errorMessage = "An error occurred while assigning shift.";
        }
        alert(errorMessage);

        // if (error.response && error.response.status === 422) {
        //   let errorMessage;

        //   if (error.response.data && typeof error.response.data === "object") {
        //     if (error.response.data.error) {
        //       errorMessage = error.response.data.error;
        //     } else if (
        //       error.response.data.error &&
        //       Array.isArray(error.response.data.error.base)
        //     ) {
        //       errorMessage = error.response.data.error.base[0];
        //     } else {
        //       errorMessage = "Unknown error occurred";
        //     }
        //   } else {
        //     errorMessage = "Invalid error data structure";
        //   }
        // }
      } finally {
        this.vacancyBeingDragged = null;
        this.dropCandidateId = null;
        this.dropDay = null;
        this.droppedContent = null;
      }
    },

    formattedDate(day) {
      if (typeof day === "number") {
        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(day);
        return selectedDate.toISOString().split("T")[0];
      } else if (day instanceof Date && !isNaN(day)) {
        return day.toISOString().split("T")[0];
      } else {
        return "Invalid Date";
      }
    },
    getCandidateName() {
      if (this.selectedCandidate) {
        if (this.selectedCandidate.first_name && this.selectedCandidate.last_name) {
          return `${this.selectedCandidate.first_name} ${this.selectedCandidate.last_name}`;
        } else {
          return (
            this.selectedCandidate.first_name ||
            this.selectedCandidate.last_name ||
            "Default Name"
          );
        }
      } else {
        return "Default Name";
      }
    },

    async openModalEdit(candidateId, day) {
      this.vacancyId = candidateId.id.toString() || "";
      if (!candidateId || !candidateId.candidate_id) {
        return;
      }

      // if (!candidateId || !candidateId.candidate_id) {
      //   return;
      // }

      this.columnDateMatch = day !== null ? day.toString() : "";
      this.selectedCandidateId = candidateId.candidate_id.toString();
      this.candidateJob = candidateId.job;
      // this.vacancyId = candidateId.id;
      // this.vacancyId = candidateId.id.toString() || "";
      if (candidateId && candidateId.id) {
        // this.vacancyId = candidateId.id;
      } else {
        return;
      }

      // this.columnDateMatch = day !== null ? day.toString() : "";

      // this.selectedCandidateId = candidateId.candidate_id.toString();

      // this.candidateJob = candidateId.job;

      // if (candidateId && candidateId.id) {
      //   this.vacancyId = candidateId.id.toString();
      // } else {
      //   return;
      // }

      if (candidateId && candidateId.job !== undefined && candidateId.job !== null) {
        this.candidateJob = candidateId.job.toString();
      } else {
        this.candidateJob = "";
      }

      try {
        const actualCandidateId = candidateId.candidate_id.toString();

        await this.fetchVacancyListMethod();

        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day));
        selectedDate.setDate(selectedDate.getDate() + 1);

        this.selectedDate = selectedDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.candidate_id === actualCandidateId
        );

        const vacancy = this.vacancyList.find(
          (vacancy) => vacancy.date === this.columnDateMatch
        );

        if (selectedCandidate) {
          this.currentSelectedCandidate = selectedCandidate;
        } else {
          this.selectedDate = null;
          this.statusForSelectedDate = null;
        }

        if (vacancy && vacancy.dates.includes(this.formatDates(day))) {
          this.statusForSelectedDate = "Vacancy Available";
        } else {
          this.statusForSelectedDate = "No Vacancy";
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },
    async openModal(candidateId, day) {
      if (!candidateId || !candidateId.candidate_id) {
        return;
      }

      // if (!candidateId || !candidateId.candidate_id) {
      //   return;
      // }

      this.columnDateMatch = day !== null ? day.toString() : "";
      this.selectedCandidateId = candidateId.candidate_id.toString();
      this.candidateJob = candidateId.job;
      // this.vacancyId = candidateId.id;
      // this.vacancyId = candidateId.id.toString() || "";
      if (candidateId && candidateId.id) {
        // this.vacancyId = candidateId.id;
      } else {
        return;
      }

      // this.columnDateMatch = day !== null ? day.toString() : "";

      // this.selectedCandidateId = candidateId.candidate_id.toString();

      // this.candidateJob = candidateId.job;

      // if (candidateId && candidateId.id) {
      //   this.vacancyId = candidateId.id.toString();
      // } else {
      //   return;
      // }

      if (candidateId && candidateId.job !== undefined && candidateId.job !== null) {
        this.candidateJob = candidateId.job.toString();
      } else {
        this.candidateJob = "";
      }

      try {
        const actualCandidateId = candidateId.candidate_id.toString();

        await this.fetchVacancyListMethod();

        const selectedDate = new Date(this.startDate);
        selectedDate.setDate(parseInt(day));
        selectedDate.setDate(selectedDate.getDate() + 1);

        this.selectedDate = selectedDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
        this.selectedCandidateId = actualCandidateId;

        const selectedCandidate = this.candidateList.find(
          (candidate) => candidate.candidate_id === actualCandidateId
        );

        const vacancy = this.vacancyList.find(
          (vacancy) => vacancy.date === this.columnDateMatch
        );

        if (selectedCandidate) {
          this.currentSelectedCandidate = selectedCandidate;
        } else {
          this.selectedDate = null;
          this.statusForSelectedDate = null;
        }

        if (vacancy && vacancy.dates.includes(this.formatDates(day))) {
          this.statusForSelectedDate = "Vacancy Available";
        } else {
          this.statusForSelectedDate = "No Vacancy";
        }
      } catch (error) {
        this.selectedDate = null;
        this.statusForSelectedDate = null;
      }
    },
    closeModal() {
      this.selectedDate = null;

      this.statusForSelectedDate = null;
      this.isModalOpen = false;
    },
    async fetchAssignList() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}find_assign_vacancies_and_candidates`
        );
        this.assignStaffDisplay = response.data.vacancies;

        const vacanciesInsideVacancies = response.data.vacancies.map((item) => {
          return item.vacancies;
        });

        this.flattenedAssignVacancies = vacanciesInsideVacancies.flat();
        // this.fetchAssignList();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return;
        }
      }
    },
    async fetchCandidateList() {
      try {
        const requestData = {
          date: this.formattedStartDate,
        };

        const response = await axios.get(
          `${VITE_API_URL}/candidates_weekly_availability`,
          {
            params: requestData,
          }
        );
        this.candidateList = response.data.data;

        this.searchResults = response.data.data;

        // console.log(this.candidateList);
        // this.candidateList.forEach((candidate) => {
        //   candidate.availabilityByDate = {};
        //   candidate.availability.forEach((avail) => {
        //     candidate.availabilityByDate[avail.date] = avail.status;
        //   });
        // });

        this.availabilityIds = this.candidateList.map((candidate) => {
          return candidate.availability.map(
            (availabilityItem) => availabilityItem.availability_id
          );
        });

        this.availabilityIds = this.searchResults.map((candidate) => {
          return candidate.availability.map(
            (availabilityItem) => availabilityItem.availability_id
          );
        });
        // this.fetchAssignList();
      } catch (error) {}
    },
    async fetchVacancyListMethod() {
      try {
        const requestData = {
          date: this.formattedStartDate,
        };
        const response = await axios.get(
          `${VITE_API_URL}/vacancies_and_candidates_availability`,
          {
            params: requestData,
          }
        );
        this.vacancyList = response.data.data;

        this.searchResults = response.data.data;

        this.fetchCandidateList();
        this.fetchAssignList();
        // this.fetchAssignVacancyStaffList();
      } catch (error) {
        // console.error("Error in fetchVacancyListMethod:", error);
      }
    },
    // async fetchAssignVacancyStaffList() {
    //   try {
    //     const response = await axios.get(
    //       `${VITE_API_URL}/find_assign_vacacy_and_candidate`
    //     );
    //     this.assignedCandidateList = response.data.candidates;
    //   } catch (error) {
    //     if (error.response) {
    //       if (error.response.status == 404) {
    //         // alert(error.response.data.message);
    //       }
    //     }
    //   }
    // },
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
  },
  components: {
    EditAssignShceduleVaacncy,
    Navbar,
    ScheduleDirectAssignList,
    SchedulePublishStaffList,
    SuccessAlert,
  },
  mounted() {
    this.loadDateRangeFromLocalStorage();
    this.fetchCandidateList();
    this.fetchAssignList();
    this.getBusinessUnitMethod();
    // this.fetchAssignVacancyStaffList();
    this.getJobTitleMethod();
    this.getTimeShift();

    // const currentDate = new Date();
    // const startOfWeek = new Date(currentDate);
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    // this.startDate = startOfWeek;

    // const endOfWeek = new Date(currentDate);
    // endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
    // this.endDate = endOfWeek;
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);

    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    this.startDate = startOfWeek;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    this.endDate = endOfWeek;
    this.fetchVacancyListMethod();
  },
};
</script>

<style scoped>
#main {
  background-color: #fdce5e17;
  padding-top: 65px;
}

.sidebar-container {
  display: flex;
}
.staff-count-round {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  top: 0;
  right: -4px;

  line-height: 20px;
}

.sidebar-button {
  padding: 10px;
  background: #faf8f4;
}

.sidebar-content {
  flex: 1;
}

.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f0f0f0;
}

.sidebar.open {
  width: 400px;
}

.slide-left-content {
  transition: margin-left 0.3s;
}

.filters {
  margin-top: 10px;
}
.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input.dateInput {
  width: 1.3%;
}
.current-month {
  margin: 0 20px;
  font-size: 18px;
  font-weight: bold;
}

.color-fonts {
  color: #ff5f30;
  font-weight: bold;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.cursor-pointer {
  cursor: pointer;
}
.day-header,
.empty-day,
.calendar-day {
  text-align: center;
  cursor: pointer;
}

.day-header {
  font-weight: bold;
}

.empty-day {
  background-color: #f3f3f3;
}

.modal-content h3 {
  color: #fff;
}
.modal-content .close {
  padding: 0px 5px;
  border-radius: 4px;
  background: #ff551f;
}

.calendar-day {
  background-color: #eaeaea;
  transition: background-color 0.3s ease;
  padding-bottom: 8px;
}

.calendar-day.clickable {
  cursor: crosshair;
  font-size: 10px;
  color: blue !important;
  font-weight: bold;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.assignVacancyDesign {
  background: #e94141;
  padding: 2px;
  color: #fff;
  font-weight: 600;
  font-size: larger;
  padding: 4px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
@media (max-width: 1120px) {
  .scheduleTable {
    width: 1090px;
  }
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>
