<template>
  <div>
    <div class="mt-2">
      <button
        type="button"
        class="btn btn-outline-success text-nowrap"
        @click="toggleFilters"
      >
        <i class="bi bi-funnel"></i>
        Show Filters
      </button>
    </div>

    <div class="d-flex gap-2 mb-3 justify-content-between" v-if="showFilters">
      <div class="d-flex gap-2 mt-3">
        <div></div>

        <select @change="filterData($event.target.value)">
          <option selected>Site Status</option>
          <option value="true">Active</option>
          <option class="false">In-Active</option>
        </select>

        <!-- <select v-model="selectedCandidate" id="selectCandidateList">
                        <option value="">All Staff</option>
                        <option
                          v-for="option in candidateLists"
                          :key="option.id"
                          :value="`${option.first_name} ${option.last_name}`"
                        >
                          {{ option.first_name }} {{ option.last_name }}
                        </option>
                      </select> -->
      </div>
    </div>
    <div class="table-wrapper mt-3">
      <table class="table siteTable">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">#RefCode</th>
            <th scope="col">Site</th>
            <th scope="col">ClientName</th>

            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in getSiteAllData" :key="data.id">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="data.id"
                :id="data.id"
                v-model="checkedCandidates[data.id]"
              />
            </td>
            <td v-text="data.refer_code"></td>
            <td v-text="data.site_name"></td>
            <td>
              <router-link
                class="text-capitalize text-decoration-underline text-black"
                :to="{ name: 'SingleClientProfile', params: { id: data.client_id } }"
                >{{ data.client_name }}</router-link
              >
            </td>
            <td>{{ data.address }}</td>
            <td>{{ data.phone_number }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.status ? "Active" : "Inactive" }}</td>
            <td>{{ data.portal_access }}</td>
            <td class="cursor-pointer">
              <button
                type="button"
                class="btn btn-outline-success text-nowrap text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editSite"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              &nbsp;&nbsp;
              <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
              <router-link
                :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                class="btn btn-outline-success text-nowrap"
              >
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddSite @addSite="getSiteAllDataMethod" />
    <EditSite :siteId="selectedsiteId || 0" @editSite="getSiteAllDataMethod" />
  </div>
</template>
<script>
import axios from "axios";
import EditSite from "../../modals/Site/EditSite.vue";
import AddSite from "../../modals/Site/AddSite.vue";
import { reactive } from "vue";
export default {
  data() {
    return {
      getSiteAllData: [],
      selectedsiteId: 0,
      showFilters: false,
      getSiteDetail: [],
      checkedCandidates: reactive({}),
    };
  },
  created() {
    this.getSiteAllData.forEach((data) => {
      this.$set(this.checkedCandidates, data.id, false);
    });
  },

  components: { EditSite, AddSite },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    filterData(value) {
      let site_type = "status";
      let site_value = value === "true" ? "true" : "false";

      this.makeFilterAPICall(site_type, site_value);
    },
    async makeFilterAPICall(site_type, site_value) {
      try {
        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params: {
            site_type: site_type,
            site_value: site_value,
          },
        });

        this.getSiteAllData = response.data.data;
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
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
    },

    async getSiteAllDataMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`);
        this.getSiteAllData = response.data.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.getSiteAllDataMethod();
  },
};
</script>
<style scoped>
#main {
  padding: 20px 20px;
  transition: all 0.3s;
  height: 100dvh;

  background-color: #fdce5e17;
}
ul.generalsetting h6 {
  font-size: 14px;
  font-weight: bold;
}
.siteTable tr:nth-child(odd) td {
  background: #fdce5e17 !important;
}
select {
  padding: 10px;
  border-radius: 4px;
  border: 0px;
  border: 1px solid rgb(202, 198, 198);
}
</style>
