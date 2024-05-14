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
            data-bs-target="#addSite"
            data-bs-whatever="@mdo"
          >
            + Add Site
          </button>
        </div>
        <div v-if="getClientDatas?.length > 0">
          <div class="card mt-2" v-for="data in getClientDatas" :key="data.id">
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
            {{ "Data Not Found!" }}
          </div>
        </div>
      </div>
    </div>
    <AddSite :id="$route.params.id" @addSite="getSiteAllDataMethod" />
    <EditClientSite :siteId="selectedsiteId || 0" @UpdateSite="getClientMethod" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>
<script>
import axios from "axios";
import AddSite from "../../modals/Site/AddSite.vue";
import EditClientSite from "../../modals/Clients/EditClientSite.vue";
import Loader from "../../Loader/Loader.vue";

export default {
  data() {
    return {
      getClientDetail: [],
      getClientDatas: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      isLoading: false,
      // clientId: this.$route.params.id,
      currentPage: 1,
      itemsPerPage: 8,
      selectedsiteId: 0,
    };
  },
  components: { AddSite, EditClientSite, Loader },
  computed: {
    paginateCandidates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.getClientDetail.slice(startIndex, endIndex);
    },
    totalRecordsOnPage() {
      return this.paginateCandidates.length;
    },
  },

  methods: {
    editsiteId(siteId) {
      this.selectedsiteId = siteId;
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
    // async clientsDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   await axios.delete(`${VITE_API_URL}/clients/` + id).then((response) => {
    //     this.createdClient();
    //   });
    // },
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

        this.getClientDatas = response.data.client_sites;
      } catch (error) {
        if (error.response) {
          if (error.response.status == 404) {
            // alert(error.response.data.message);
          }
        } else {
          // console.error("Error fetching candidates:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.createdClient();
    this.getClientMethod();
    this.getSiteAllDataMethod();
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
