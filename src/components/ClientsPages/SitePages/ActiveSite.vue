<template>
  <div>
    <div class="table-wrapper mt-3">
      <table class="table siteTable">
        <thead>
          <tr>
            <!-- <th scope="col">ID</th> -->
            <th scope="col">
              #RefCode
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
              ClientName
              <img
                src="../../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>

            <th scope="col">
              Address
              <img
                src="../../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              PhoneNumber
              <img
                src="../../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col" style="width: 10%">
              Email
              <img
                src="../../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Status
              <img
                src="../../../assets/ArrowDown.png"
                class="img-fluid pe-2"
                alt="RecPal"
                loading="eager"
              />
            </th>
            <th scope="col">
              Portal Access
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
        <tbody v-if="getSiteActiveData?.length > 0">
          <tr
            v-for="(data, index) in getSiteActiveData"
            :key="index"
            @mouseenter="hoverRow = index"
            @mouseleave="hoverRow = null"
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
              <div class="action-wrapper">
                <i class="bi bi-three-dots dot-icon"></i>

                <div v-if="hoverRow === index" class="action-menu">
                  <button
                    type="button"
                    class="btn text-nowrap border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#editSite"
                    data-bs-whatever="@mdo"
                    @click="editsiteId(data.id)"
                  >
                    <i class="bi bi-pencil-square" style="color: #f9944b"></i
                    >Edit
                  </button>

                  <!-- <button class="btn btn-outline-success text-nowrap">
                <i
                  class="bi bi-trash border-0 border-0"
                  v-on:click="clientsDeleteMethod(client.id)"
                ></i></button
              >&nbsp;&nbsp; -->
                  <router-link
                    :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                    class="btn text-nowrap border-0"
                  >
                    <i class="bi bi-eye" style="color: #f9944b"></i>View
                  </router-link>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-if="errorMessageFilter">
            <td colspan="15" class="text-danger text-center">
              {{ errorMessageFilter }}
            </td>
          </tr>
          <tr v-else>
            <td colspan="15" class="text-danger text-center">
              {{ "Data Not Found!" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EditSite :siteId="selectedsiteId || 0" ref="refSite" />
    <loader :isLoading="isLoading"></loader>
    <div
      class="mx-3 d-flex justify-content-between"
      style="text-align: right"
      v-if="getSiteActiveData?.length >= 10"
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
      getSiteActiveData: [],
      selectedsiteId: 0,
      isLoading: false,
      hoverRow: null,
      errorMessageFilter: "",
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      itemsPerPage: 10,
    };
  },

  components: { EditSite, Loader },
  computed: {
    paginateSiteData() {
      return this.getSiteActiveData;
    },
    // totalRecordsOnPage() {
    //   return this.paginateSiteData.length;
    // },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.getSiteActiveMethod();
    },
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
      this.$refs.refSite.getClientMethod();
    },
    setItemsPerPage(value) {
      console.log("Selected per page:", value);
      this.itemsPerPage = value;
      this.currentPage = 1;
      this.getSiteActiveMethod();
    },
    async getSiteActiveMethod() {
      this.isLoading = true;
      const params = {
        page: this.currentPage,
        per_page: this.itemsPerPage,
        "site[status]": true,
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
        this.getSiteActiveData = response.data.data || [];
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
    await this.getSiteActiveMethod();
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
