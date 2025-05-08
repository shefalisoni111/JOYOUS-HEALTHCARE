<template>
  <div>
    <!-- <Navbar /> -->
    <div id="main" class="d-flex">
      <div
        class=""
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid ps-5 pt-5 pb-5">
        <div class="row pagetitle d-flex justify-content-between px-2">
          <div class="col-12">
            <div class="d-flex justify-content-between px-2">
              <div class="py-3">
                <ol class="breadcrumb mb-1">
                  <li class="breadcrumb-item active">
                    <a
                      class="nav-link d-inline fs-4 fw-bolder"
                      style="color: #000000"
                      >All Clients</a
                    >
                    <p>
                      Client / Site /
                      <router-link
                        class="nav-link d-inline fw-bolder"
                        style="color: #000000"
                        aria-current="page"
                        to="/rates_and_rules"
                        >Rated and rules
                      </router-link>
                    </p>
                  </li>
                </ol>
              </div>
              <div class="d-flex align-items-center pe-3">
                <button
                  type="button"
                  class="btn text-nowrap"
                  style="background: #f9944b; color: #fff"
                  data-bs-toggle="modal"
                  data-bs-target="#addRateRules"
                  data-bs-whatever="@mdo"
                  @click="AddRateRules"
                >
                  + Add Rate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="">
                <div>
                  <div class="p-2">
                    <div class="d-flex justify-content-between pb-3">
                      <div class="d-flex">
                        &nbsp;&nbsp;
                        <div class="d-flex align-items-center"></div>
                      </div>

                      <div class="d-flex gap-3 align-items-center">
                        <button
                          type="button"
                          class="btn btn-lg btn-danger text-nowrap"
                          @click="toggleFilters"
                        >
                          <i class="bi bi-funnel"></i>
                          Show Filters
                        </button>
                        <input
                          ref="fileInput"
                          id="fileAll"
                          type="file"
                          accept=".csv"
                          style="display: none"
                          @change="handleFileUpload"
                        />

                        <button
                          class="nav-item dropdown btn btn-lg text-nowrap dropdown-toggle"
                          type="button"
                          style="background: #f9944b; color: #fff"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Export

                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="exportOneFile('selected')"
                                >Export</a
                              >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="exportOneFile('all')"
                                >Export All</a
                              >
                            </li>
                          </ul>
                        </button>
                        <div class="searchbox position-relative pe-2">
                          <form @submit.prevent="search">
                            <input
                              class="form-control form-control-lg mr-sm-2 position-relative"
                              type="search"
                              placeholder="Search..."
                              aria-label="Search"
                              v-model="searchQuery"
                              @input="debounceSearch"
                            />
                            <span
                              class="position-absolute"
                              style="transform: translate(1329%, -154%)"
                            >
                              <img
                                src="../../../assets/Search.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                            /></span>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="d-flex gap-2 mb-3 justify-content-between"
                    v-if="showFilters"
                  >
                    <div
                      class="d-flex gap-2 flex-column position-absolute"
                      style="
                        transform: translate(317%, -2%);
                        background: rgb(255, 255, 255);
                        padding: 8px 13px 9px 13px;
                        border-radius: 10px;
                        box-shadow: 0px 4px 40px 0px #0000000d;
                      "
                    >
                      <div class="d-flex gap-2 mt-3 flex-column">
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
                  <div class="d-flex gap-2"></div>
                  <div class="tab-content pe-3" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <table class="table candidateTable" v-if="!searchQuery">
                        <thead>
                          <tr>
                            <th></th>

                            <th scope="col">
                              Client
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
                              Job
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col" style="width: 6%">
                              Day

                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Shift Type<br />Start-End Time
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Rate Type
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Client Rate
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Private Limited
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Self Employed
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col" style="width: 7%">
                              Umbrella
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col" style="width: 6%">
                              PAYE
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col" style="width: 10%">
                              Created By and Time
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
                            <th scope="col" style="width: 7%">
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
                              {{ rate.created_by_and_time }}
                            </td>
                            <td>{{ rate.last_update }}</td>
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

                      <table class="table candidateTable" v-if="searchQuery">
                        <thead>
                          <tr>
                            <th></th>
                            <th scope="col">
                              Client
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
                              Job
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
                              Shift Type<br />Start-End Time
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Rate Type
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Client Rate
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Private Limited
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Self Employed
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              Umbrella
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col">
                              PAYE
                              <img
                                src="../../../assets/ArrowDown.png"
                                class="img-fluid pe-2"
                                alt="RecPal"
                                loading="eager"
                              />
                            </th>
                            <th scope="col" style="width: 10%">
                              Created By and Time
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
                              {{ rate.created_by_and_time }}
                            </td>
                            <td>{{ rate.last_update }}</td>
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
    <AddRateRules
      @UpdatedRateRules="getRateRulesDataMethod"
      ref="add_rate_rules"
      @rateRules="AddRateRules"
    />
    <EditSingleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      @editUpdatedRateRules="getRateRulesDataMethod"
      :ClientID="selectedClientID || 0"
      ref="singleEdit_rate_rules"
    />
    <EditMultipleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      :SiteID="selectedSiteID || 0"
      :jobID="selectedJobID || 0"
      :rate_ids="rate_ids"
      :ClientID="selectedClientID || 0"
      @editMultipleUpdatedRateRules="getRateRulesDataMethod"
      ref="multipleEdit_rate_rules"
    />
    <loader :isLoading="isLoading"></loader>
    <SuccessAlert ref="successAlert" />
  </div>
</template>
<script>
import axios from "axios";

import AddRateRules from "../../modals/Rate&Rules/AddRateRules.vue";
import Loader from "../../Loader/Loader.vue";
import { reactive } from "vue";
import EditSingleRateRules from "../../modals/Rate&Rules/EditSingleRateRules.vue";
import EditMultipleRateRules from "../../modals/Rate&Rules/EditMultipleRateRules.vue";
import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Swal from "sweetalert2";
import Navbar from "../../Navbar.vue";

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
    AddRateRules,
    Loader,
    EditSingleRateRules,
    EditMultipleRateRules,
    SuccessAlert,
    Navbar,
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

      if (this.job_id) {
        params["rule_rates[job_id]"] = this.job_id;
      }

      if (this.localSearchQuery) {
        params.search = this.localSearchQuery;
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
          this.errorMessageFilter = "";
        }
      } catch (error) {}
    },
    resetFilter() {
      this.client_id = "";
      this.site_id = "";
      this.job_id = "";
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
        .catch((error) => {});
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
      } catch (error) {
      } finally {
      }
    },
    async getClientMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/get_client_id_name`);

        this.clientData = response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
        } else {
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
};
</script>

<style scoped>
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202 198 198 / 0%);
  background: #fff4f5;
}
</style>
