<template>
  <div class="">
    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-outline-success text-nowrap float-end"
          data-bs-toggle="modal"
          data-bs-target="#addSiteNote"
          data-bs-whatever="@mdo"
        >
          Add Notes
        </button>
      </div>
    </div>

    <div class="row m-4" v-if="getNotes?.length > 0">
      <div class="mb-3" v-for="data in getNotes" :key="data.id">
        <div class="d-flex justify-content-between border-1 border-success">
          <div class="">
            <div class="card">
              <div class="card-body">
                <p class="card-text text-capitalize">
                  {{ data.notes }}
                </p>
              </div>
            </div>
          </div>
          <div class="d-fle align-items-center gap-2">
            <i
              class="bi bi-pencil-square cursor-pointer btn btn-outline-success text-nowrap"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editClientNotes"
              data-bs-whatever="@mdo"
              @click="editSiteNote(data.id)"
            ></i>
            &nbsp;&nbsp;
            <i
              class="bi bi-trash border-0 border-0 cursor-pointer btn btn-outline-danger text-nowrap"
              @click="deleteSiteNote(data.id)"
            ></i>
            <!-- <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              v-on:click="notesDeleteMethod(data.id)"
            >
              Delete
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="text-danger text-center" v-if="!isLoading">
        {{ "Data Not Found!" }}
      </div>
    </div>

    <AddSiteNotes @addSiteNote="getNotesMethod" />
    <EditSiteNotes
      :SiteNotesID="selectedSiteNotesID || 0"
      @EditClientNote="getNotesMethod"
    />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";
import AddSiteNotes from "../../modals/Site/AddSiteNotes.vue";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";
import Loader from "../../Loader/Loader.vue";
import Swal from "sweetalert2";
import EditSiteNotes from "../../modals/Site/EditSiteNotes.vue";

export default {
  name: "Notes",
  data() {
    return {
      getNotes: [],
      isLoading: false,
      selectedSiteNotesID: "",
    };
  },

  components: { AddSiteNotes, Loader, ConfirmationAlert, EditSiteNotes },
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    // showConfirmationModal(id) {
    //   this.confirmMessage = "Are you sure you want to delete this note?";
    //   this.isModalVisible = true;
    //   this.confirmCallback = () => this.notesDeleteMethod(id);
    // },
    // async notesDeleteMethod(id) {
    //   try {
    //     await axios.delete(
    //       `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes/` + id
    //     );
    //     this.isModalVisible = false;
    //     this.getNotesMethod();
    //   } catch (error) {
    //     // console.error("Error deleting note:", error);
    //   }
    // },
    // canceled() {
    //   this.isModalVisible = false;
    // },
    editSiteNote(SiteNotesID) {
      this.selectedSiteNotesID = SiteNotesID;
    },
    async deleteSiteNote(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
          await axios.delete(`${VITE_API_URL}/site_notes/${id}`);
          Swal.fire("Deleted!", "The record has been deleted.", "success");
          this.getNotesMethod();
        }
      } catch (error) {
        // console.error("Error deleting restricted location:", error);
        Swal.fire("Error!", "There was an issue deleting the record.", "error");
      }
    },

    async getNotesMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${VITE_API_URL}/site_notes`);

        if (response.status === 200) {
          this.getNotes = response.data.data;
          // this.getNotesMethod();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // Handle 404 error if needed
            // alert(error.response.data.message);
          }
        }
      } finally {
        this.isLoading = false;
      }
    },

    //  ratecard apis end
  },
  async mounted() {
    await this.getNotesMethod();
  },
};
</script>
