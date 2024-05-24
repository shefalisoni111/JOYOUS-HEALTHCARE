<template>
  <div>
    <Navbar />
    <div id="main">
      <div class="pagetitle d-flex justify-content-between px-2">
        <div class="py-3">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item active text-uppercase fs-6">
              <router-link class="nav-link d-inline" aria-current="page" to="/home"
                >Dashboard</router-link
              >
              / <span class="color-fonts">RATES AND RULES</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="container-fluid pt-3">
        <div class="row">
          <div class="col-12">
            <div class="">
              <div>
                <div class="p-2">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <div class="d-flex align-items-center">
                        <div class="card p-2">Rate and Rules</div>
                      </div>

                      &nbsp;&nbsp;
                      <div class="d-flex align-items-center"></div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                      <div class="searchbox position-relative">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                        />
                      </div>
                      <button
                        type="button"
                        class="btn btn-outline-success text-nowrap"
                        data-bs-toggle="modal"
                        data-bs-target="#addRateRules"
                        data-bs-whatever="@mdo"
                      >
                        + Add Rate
                      </button>
                      <button type="button" class="btn btn-outline-success text-nowrap">
                        <i class="bi bi-funnel"></i>
                        Show Filters
                      </button>
                      <button
                        class="nav-item dropdown btn btn-outline-success text-nowrap dropdown-toggle"
                        type="button"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        :

                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><a class="dropdown-item" href="#">Import</a></li>
                          <li><hr class="dropdown-divider" /></li>
                          <li><a class="dropdown-item" href="#">Export</a></li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <a class="dropdown-item" href="#">Export All</a>
                          </li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   
                  </ul> -->

                <div class="d-flex gap-2">
                  <div></div>
                </div>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <table class="table candidateTable">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th scope="col">Client</th>
                          <th scope="col">Site</th>
                          <th scope="col">Job</th>
                          <th scope="col">Day</th>
                          <th scope="col">Shift Type<br />Start-End Time</th>
                          <th scope="col">Client Rate</th>
                          <th scope="col">Private Limited</th>
                          <th scope="col">Self Employed</th>
                          <th scope="col">Umbrella</th>
                          <th scope="col">PAYE</th>
                          <th scope="col" style="width: 10%">Created By and Time</th>
                          <th scope="col">Last Update</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody v-for="(data, index) in groupedRateRulesData" :key="index">
                        <tr>
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>{{ data.client }}</td>
                          <td
                            @click="
                              toggleDetails(index, data.site_id, data.client, data.job)
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
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-success text-nowrap"
                              data-bs-toggle="modal"
                              data-bs-target="#EditMultipleRateRules"
                              data-bs-whatever="@mdo"
                              @click="editRateRulesMultiId(data.id, data.site_id)"
                            >
                              <i class="bi bi-pencil"></i>
                            </button>
                          </td>
                        </tr>
                        <tr
                          v-for="rate in filteredRateRulesData"
                          :key="rate.rate_and_rule_id"
                        >
                          <td v-if="activeSiteId === index">
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td v-if="activeSiteId === index">{{ rate.client }}</td>
                          <td v-if="activeSiteId === index">{{ rate.site }}</td>
                          <td v-if="activeSiteId === index">{{ rate.job }}</td>
                          <td v-if="activeSiteId === index" class="text-capitalize">
                            <span
                              style="background: orange; padding: 3px; border-radius: 4px"
                              >{{ rate.day }}</span
                            >
                          </td>
                          <td v-if="activeSiteId === index">
                            {{ rate.shift_type }}<br />{{
                              formatTime(rate.start_time)
                            }}-{{ formatTime(rate.end_time) }}
                          </td>
                          <td v-if="activeSiteId === index">{{ rate.client_rate }}</td>
                          <td v-if="activeSiteId === index">
                            {{ rate.private_limited }}
                          </td>
                          <td v-if="activeSiteId === index">{{ rate.self_employed }}</td>
                          <td v-if="activeSiteId === index">
                            {{ rate.umbrella ? rate.umbrella : "Null" }}
                          </td>
                          <td v-if="activeSiteId === index">
                            {{ rate.paye ? rate.paye : "Null" }}
                          </td>
                          <td v-if="activeSiteId === index">
                            {{ rate.created_by_and_time }}
                          </td>
                          <td v-if="activeSiteId === index">{{ rate.last_update }}</td>
                          <td v-if="activeSiteId === index">
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
    <AddRateRules @UpdatedRateRules="getRateRulesDataMethod" />
    <EditSingleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      @editUpdatedRateRules="getRateRulesDataMethod"
    />
    <EditMultipleRateRules
      :RateRulesId="selectedRatesRulesId || 0"
      :SiteID="selectedSiteID || 0"
      @editMultipleUpdatedRateRules="getRateRulesDataMethod"
    />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "../../Navbar.vue";
import AddRateRules from "../../modals/Rate&Rules/AddRateRules.vue";
import Loader from "../../Loader/Loader.vue";
import EditSingleRateRules from "../../modals/Rate&Rules/EditSingleRateRules.vue";
import EditMultipleRateRules from "../../modals/Rate&Rules/EditMultipleRateRules.vue";

export default {
  data() {
    return {
      getRateRulesData: [],
      selectedRatesRulesId: null,
      selectedSiteID: null,
      getRateRulesWeekData: [],
      isLoading: false,
      activeSiteId: null,
      detailsShow: false,
      rateRulesIds: [],
      filteredRateRulesData: [],
    };
  },
  components: {
    Navbar,
    AddRateRules,
    Loader,
    EditSingleRateRules,
    EditMultipleRateRules,
  },
  computed: {
    groupedRateRulesData() {
      const groupedData = {};
      this.getRateRulesData.forEach((data) => {
        const groupKey = `${data.site_id}-${data.client}-${data.job}`;
        if (!groupedData[groupKey]) {
          groupedData[groupKey] = {
            site_id: data.site_id,
            site: data.site,
            client: data.client,
            job: data.job,
            data: [],
          };
        }
        groupedData[groupKey].data.push(data);
      });
      return Object.values(groupedData);
    },
  },
  methods: {
    editRateRulesId(RateRulesId) {
      this.selectedRatesRulesId = RateRulesId;
    },
    editRateRulesMultiId(RateRulesId, siteID) {
      this.selectedRatesRulesId = RateRulesId;
      this.selectedSiteID = siteID;
    },
    async getRateRulesDataMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/rate_and_rules`);
        this.getRateRulesData = response.data.rate_and_rules;
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
      this.activeSiteId = this.activeSiteId === index ? null : index;
      // this.getRateRulesWeekDataMethod(siteId);
      this.filteredRateRulesData = this.getRateRulesData.filter(
        (rate) => rate.site_id === siteId && rate.client === client && rate.job === job
      );
    },
    formatTime(time) {
      return time.slice(0, 5);
    },
  },

  mounted() {
    this.getRateRulesDataMethod();
  },
};
</script>

<style scoped>
#main {
  transition: all 0.3s;

  background-color: #fdce5e17;
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
.candidateTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
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
</style>
