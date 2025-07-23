<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-content-center my-3">
          <h6 class="fw-bold d-flex align-items-center mb-0">
            You can add custom holidays here
          </h6>

          <button
            type="button"
            class="btn btn-primary text-nowrap text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#siteCustomHoliday"
            data-bs-whatever="@mdo"
          >
            <i class="bi bi-plus"></i> Add Custom Holiday
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="table-wrapper mt-3">
          <table class="table clientTable">
            <thead>
              <tr>
                <th scope="col">
                  Id
                  <img
                    src="../../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col">
                  Title
                  <img
                    src="../../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col">
                  Date
                  <img
                    src="../../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col">
                  Type
                  <img
                    src="../../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>
                <th scope="col">
                  Actions
                  <img
                    src="../../../assets/ArrowDown.png"
                    class="img-fluid pe-2"
                    alt="RecPal"
                    loading="eager"
                  />
                </th>

                <!-- <th scope="col">Portal Access</th> -->
              </tr>
            </thead>
            <tbody v-if="getCustomHolidayData?.length > 0">
              <tr v-for="data in getCustomHolidayData" :key="data.id">
                <td>{{ data.id }}</td>
                <td class="text-capitalize">{{ data.title }}</td>
                <td>{{ data.date }}</td>
                <td>{{ data.holiday_type }}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-outline-success text-nowrap text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#editCustomHoliday"
                    data-bs-whatever="@mdo"
                    @click="editSite(data.id)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  &nbsp;&nbsp;
                  <button class="btn btn-outline-success text-nowrap">
                    <i
                      class="bi bi-trash border-0 border-0"
                      v-on:click="customHolidayDeleteMethod(data.id)"
                    ></i></button
                  >&nbsp;&nbsp;
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-danger text-center">
                  {{ "Not Found Custom Holiday." }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AddSiteCustomHoliday @addCustomHoliday="getCustomHolidayMethod" />
    <EditSiteCustomHoliday
      :SiteID="selectedSiteID || 0"
      ref="editCustomHoliday"
      @EditCustomHoliday="getCustomHolidayMethod"
    />
  </div>
</template>
<script>
import axios from "axios";
import AddSiteCustomHoliday from "../../modals/Site/AddSiteCustomHoliday.vue";
import EditSiteCustomHoliday from "../../modals/Site/EditSiteCustomHoliday.vue";

export default {
  data() {
    return {
      getCustomHolidayData: [],
      selectedSiteID: 0,
    };
  },
  components: {
    AddSiteCustomHoliday,
    EditSiteCustomHoliday,
  },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    editSite(SiteID) {
      this.selectedSiteID = SiteID;
      this.$refs.editCustomHoliday.fetchSiteMethod(this.$route.params.id);
    },
    async getCustomHolidayMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/custom_holidays/${this.$route.params.id}`
        );

        this.getCustomHolidayData = response.data.data;
      } catch (error) {}
    },
    customHolidayDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      axios.delete(`${VITE_API_URL}/custom_holidays/` + id).then((response) => {
        this.getCustomHolidayMethod();
      });
    },
  },
  async created() {
    await this.getCustomHolidayMethod();
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
