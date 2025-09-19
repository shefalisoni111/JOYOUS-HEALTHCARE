<template>
  <div>
    <div class="table-wrapper mt-3">
      <table class="table siteTable">
        <thead>
          <tr>
            <!-- <th scope="col">ID</th> -->
            <th scope="col">#RefCode</th>
            <th scope="col">Site</th>
            <th scope="col">ClientName</th>

            <th scope="col" style="width: 10%">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col" style="width: 10%">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Portal Access</th>
            <th scope="col" style="width: 10%">Action</th>
          </tr>
        </thead>
        <tbody v-if="getSiteInactiveData?.length > 0">
          <tr
            v-for="(data, index) in getSiteInactiveData"
            :key="index"
            @click="toggleActionMenu(index)"
            @mouseleave="selectedRow = null"
          >
            <!-- <td>{{ data.id }}</td> -->
            <td v-text="data.refer_code"></td>
            <td v-text="data.site_name"></td>
            <td>
              <router-link
                class="text-capitalize text-decoration-underline text-black fw-bold"
                :to="{
                  name: 'SingleClientProfile',
                  params: { id: data.client_id },
                }"
                >{{ data.client_name }}</router-link
              >
            </td>
            <td>{{ data.address }}</td>
            <td>{{ data.phone_number }}</td>
            <td>{{ data.email }}</td>
            <td>
              <button
                type="button"
                :class="['btn', 'text-nowrap']"
                :style="
                  data.status === true
                    ? { backgroundColor: '#E9FAEF', color: '#24D164' }
                    : {
                        backgroundColor: 'rgb(255 227 234)',
                        color: '#FF3B30',
                      }
                "
              >
                {{ data.status === true ? "Active" : "Inactive" }}
              </button>
            </td>
            <td>
              <span
                class="text-white p-2 rounded-3 btn-lg"
                :style="
                  data.portal_access === true
                    ? { backgroundColor: '#4dd04d', color: '#24D164' }
                    : {
                        backgroundColor: '#FF8F6B',
                        color: '#FF3B30',
                      }
                "
                :class="['btn', 'text-nowrap']"
                >{{ data.portal_access ? "Active" : "No Account" }}</span
              >
            </td>
            <td class="cursor-pointer" style="width: 10%">
              <button
                type="button"
                class="btn text-nowrap btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#editSite"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              &nbsp;
              <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash border-0 border-0"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
              <router-link
                :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                class="btn text-nowrap btn-outline-success"
              >
                <i class="bi bi-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-if="!isLoading">
            <td colspan="9" class="text-danger text-center">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditSite :siteId="selectedsiteId || 0" ref="refSite" />
    <loader :isLoading="isLoading"></loader>
    <div
      class="mx-3"
      style="text-align: right"
      v-if="getSiteInactiveData?.length >= 10"
    >
      <!-- <button class="btn btn-outline-dark btn-sm">
        {{ totalRecordsOnPage }} Records Per Page
      </button> -->
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
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(20)"
              >20 Records</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(50)"
              >50 Records</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="setItemsPerPage(100)"
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
          <i
            class="bi bi-chevron-left"
            :class="{ 'fw-bolder': currentPage !== totalPages }"
          ></i>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm mr-2 rounded-[12px] border border-[1px] p-3 border px-4 fw-bolder"
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
          <i
            class="bi bi-chevron-right"
            :class="{ 'fw-bolder': currentPage !== totalPages }"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EditSite from "../../modals/Site/EditSite.vue";
import Loader from "../../Loader/Loader.vue";

export default {
  data() {
    return {
      getSiteInactiveData: [],
      selectedsiteId: 0,
      isLoading: false,
      selectedRow: null,
      currentPage: 1,
      totalRecords: 0,
      itemsPerPage: 10,
    };
  },

  components: { EditSite, Loader },
  computed: {
    paginateSiteData() {
      if (this.getSiteInactiveData && Array.isArray(this.getSiteInactiveData)) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.getSiteInactiveData.slice(startIndex, endIndex);
      }
      return [];
    },
    totalRecordsOnPage() {
      return this.paginateSiteData.length;
    },
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
      this.$refs.refSite.getClientMethod();
    },
    changePage(page) {
      this.currentPage = page;
      this.getSiteInactiveMethod();
    },
    setItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getSiteInactiveMethod();
    },
    async getSiteInactiveMethod() {
      this.isLoading = true;
      const params = {
        page: this.currentPage,
        per_page: this.itemsPerPage,
        "site[status]": false,
      };

      // if (this.selectedFilter) {
      //   params["site[status]"] = this.selectedFilter;
      // }

      // if (this.selectedClientName) {
      //   params["site[client_id]"] = this.selectedClientName;
      // }

      // if (this.selectedSiteName) {
      //   params["site[site_name]"] = this.selectedSiteName;
      // }

      // if (this.selectedSiteAddress) {
      //   params["site[address]"] = this.selectedSiteAddress;
      // }

      // if (this.localSearchQuery) {
      //   params.search = this.localSearchQuery;
      // }

      try {
        const response = await axios.get(`${VITE_API_URL}/site_filter`, {
          params,
        });
        this.getSiteInactiveData = response.data.data || [];
        this.totalPages = Math.ceil(
          response.data.site_filter / this.itemsPerPage
        );
      } catch (error) {
        // console.error("Error fetching filtered data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    await this.getSiteInactiveMethod();
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
</style>
