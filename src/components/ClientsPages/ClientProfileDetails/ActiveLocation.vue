<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <h5 class="mb-2 d-flex align-items-center">Site</h5>
          <button
            type="button"
            class="btn btn-outline-success text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#addClientSite"
            data-bs-whatever="@mdo"
            @click="handleActiveClientSite"
          >
            + Add Site
          </button>
        </div>
        <div v-if="paginateCandidates?.length > 0">
          <div class="card mt-2" v-for="data in paginateCandidates" :key="data.id">
            <div class="card-header">
              <!-- <router-link
              :to="{ name: 'SingleSiteprofile' }"
              class="text-decoration-none text-black"
              >Hospital 1</router-link
            > -->
            </div>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="card-text d-flex gap-3">
                <div class="mt-3">
                  <router-link
                    :to="{ name: 'SingleSiteprofile', params: { id: data.id } }"
                  >
                    <span class="rounded-circle p-3 text-decoration-none text-black">{{
                      getFirstCharAndNumber(data.site_name)
                    }}</span></router-link
                  >
                </div>
                <div class="">
                  <span>{{ data.email }}</span
                  ><br />
                  <span>{{ data.phone_number }}</span
                  ><br />
                  <span>{{ data.address }}</span
                  ><br />
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary mt-3 text-nowrap text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#editClientSite"
                data-bs-whatever="@mdo"
                @click="editsiteId(data.id)"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-danger text-center mt-2" v-if="!isLoading">
            {{ "Data No Found!" }}
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3 mt-3" style="text-align: right" v-if="getClientDatas?.length >= 3">
      <button class="btn btn-outline-dark btn-sm">
        {{ itemsPerPage }} Records Per Page
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
        :disabled="currentPage * itemsPerPage >= getClientDatas?.length"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
    <AddClientSite
      :id="$route.params.id"
      @addSite="getClientMethod"
      ref="addClientSiteRef"
      @addClientSiteRefs="handleActiveClientSite"
    />
    <EditClientSite
      :siteId="selectedsiteId || 0"
      @UpdateSite="getClientMethod"
      ref="editClientSites"
    />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";

import EditClientSite from "../../modals/Clients/EditClientSite.vue";
import Loader from "../../Loader/Loader.vue";
import AddClientSite from "../../modals/Clients/AddClientSite.vue";

export default {
  data() {
    return {
      getClientDetail: [],
      getClientDatas: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      isLoading: false,

      currentPage: 1,
      itemsPerPage: 3,
      selectedsiteId: 0,
    };
  },
  components: { AddClientSite, EditClientSite, Loader },
  computed: {
    paginateCandidates() {
      if (!Array.isArray(this.getClientDatas)) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientDatas.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },

  methods: {
    handleActiveClientSite() {
      if (
        this.$refs.addClientSiteRef &&
        typeof this.$refs.addClientSiteRef.getClientMethod === "function"
      ) {
        this.$refs.addClientSiteRef.getClientMethod();
      } else {
        // console.error('getClientMethod is No defined on addClientSiteRef');
      }
    },
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
      // this.$refs.editClientSites.getClientMethod();
    },
    getFirstCharAndNumber(siteName) {
      const firstChar = siteName.charAt(0);

      const firstNumber = siteName.match(/\d/);

      const formattedNumber = firstNumber ? firstNumber[0] : "";

      return `${firstChar}${formattedNumber}`;
    },
    editClient(clientID) {
      this.selectedClientID = clientID;
    },
    async getSiteAllDataMethod() {
      try {
        const response = await axios.get(`${VITE_API_URL}/sites`);
        this.getSiteAllData = response.data.data;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    },

    async createdClient() {
      await axios
        .get(`${VITE_API_URL}/clients`)

        .then((response) => (this.getClientDetail = response.data.data));
    },
    async getClientMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}client_all_site/${this.$route.params.id}`
        );

        this.getClientDatas = response.data.client_sites || [];
      } catch (error) {
        this.getClientDatas = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    await this.createdClient();
    await this.getClientMethod();
    await this.getSiteAllDataMethod();
  },
};
</script>
<style scoped>
.card .rounded-circle {
  border: 1px solid #000;
  padding: 19px 12px;
}
.btn-primary {
  border: none;
}
</style>
