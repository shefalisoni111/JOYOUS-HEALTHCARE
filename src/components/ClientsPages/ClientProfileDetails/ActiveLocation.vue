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
            data-bs-target="#addVacancies"
            data-bs-whatever="@mdo"
          >
            + Add Site
          </button>
        </div>

        <div class="card mt-2">
          <div class="card-header">
            <!-- <router-link
              :to="{ name: 'SingleSiteprofile' }"
              class="text-decoration-none text-black"
              >Hospital 1</router-link
            > -->
          </div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex">
              <div class="col-2 mt-3">
                <span class="rounded-circle">HP1</span>
              </div>
              <div class="col-10">
                <span>hospital@gmail.com</span><br />
                <span>+91 9867895645</span><br />
                <span>United Kingdom</span><br />
              </div>
            </div>
            <a class="btn btn-primary mt-3">Edit</a>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-header">
            <!-- <router-link
              :to="{ name: 'SingleSiteprofile' }"
              class="text-decoration-none text-black"
              >Hospital 2</router-link
            > -->
          </div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <div class="card-text d-flex">
              <div class="col-2 mt-3">
                <span class="rounded-circle">HP2</span>
              </div>
              <div class="col-10">
                <span>hospital@gmail.com</span><br />
                <span>+91 9867895645</span><br />
                <span>United Kingdom</span><br />
              </div>
            </div>
            <a class="btn btn-primary mt-3">Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      getClientDetail: [],
      selectedClientID: null,
      isActive: true,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 8,
    };
  },

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
    editClient(clientID) {
      this.selectedClientID = clientID;
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
  },
  mounted() {
    this.createdClient();
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
