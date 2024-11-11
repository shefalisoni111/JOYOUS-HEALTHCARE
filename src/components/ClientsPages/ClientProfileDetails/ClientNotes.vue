<template>
  <!-- <h6>Client Notes Page is Processing....</h6> -->
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="mb-2 d-flex align-items-center">Notes</h5>
          </div>
          <div>
            <!-- <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#addVacancies"
              data-bs-whatever="@mdo"
            >
              View More
            </button> -->
          </div>
        </div>
        <hr />
        <div class="d-flex w-25 mt-3">
          <form @submit.prevent="submitForm">
            <input
              class="form-control"
              type="text"
              placeholder="Add Note"
              v-model="notes"
            />
          </form>
          &nbsp;
          <!-- <span v-if="!isValidForm" class="text-danger">Notes Required</span> -->
          <button class="btn btn-primary" :disabled="!isValidForm" @click="submitForm">
            Add
          </button>
        </div>
        <br />
        <div class="d-flex flex-column" v-if="getNotes?.length > 0">
          <div v-for="data in getNotes" :key="data.id">
            <div class="d-flex gap-2">
              <div>
                <i class="bi bi-journal-album fs-1"></i>
              </div>

              <div class="mt-2">
                <h6
                  class="mb-0 text-capitalize"
                  style="width: 900px; word-wrap: break-word"
                >
                  {{ data.notes }}
                </h6>
                <p>{{ data.created_at }}</p>
              </div>
              <div>
                <i
                  class="bi bi-pencil-square cursor-pointer btn btn-outline-success text-nowrap"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editClientNotes"
                  data-bs-whatever="@mdo"
                  @click="editRestricted(data.id)"
                ></i>
                &nbsp;&nbsp;
                <i
                  class="bi bi-trash cursor-pointer btn btn-outline-danger text-nowrap"
                  @click="deleteClientNote(data.id)"
                ></i>
              </div>
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
    <EditClientNotes
      :ClientNotesID="selectedClientNotesID || 0"
      @EditClientNote="getNotesMethod"
    />
    <SuccessAlert ref="successAlert" />
    <loader :isLoading="isLoading"></loader>
  </div>
</template>

<script>
import axios from "axios";

import SuccessAlert from "../../Alerts/SuccessAlert.vue";
import Loader from "../../Loader/Loader.vue";
import EditClientNotes from "../../modals/Clients/EditClientNotes.vue";
import Swal from "sweetalert2";

export default {
  name: "Notes",
  data() {
    return {
      getNotes: [],
      notes: "",
      isLoading: false,
      selectedClientNotesID: "",
    };
  },
  computed: {
    isValidForm() {
      return this.notes.trim() !== "";
    },
  },
  components: { SuccessAlert, Loader, EditClientNotes },
  methods: {
    editRestricted(ClientNotesID) {
      this.selectedClientNotesID = ClientNotesID;
    },
    async deleteClientNote(id) {
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
          await axios.delete(`${VITE_API_URL}/client_notes/${id}`);
          Swal.fire("Deleted!", "The record has been deleted.", "success");
          this.getNotesMethod();
        }
      } catch (error) {
        // console.error("Error deleting restricted location:", error);
        Swal.fire("Error!", "There was an issue deleting the record.", "error");
      }
    },
    // async notesDeleteMethod(id) {
    //   if (!window.confirm("Are you Sure ?")) {
    //     return;
    //   }
    //   await axios.delete(
    //     `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes/` + id
    //   );
    //   window.location.reload();
    // },
    async getNotesMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/show_client_notes/${this.$route.params.id}`
        );

        if (response.status === 200) {
          this.getNotes = response.data.notes;
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

    submitForm() {
      if (this.isValidForm) {
        this.addClientNotes();
      }
    },
    async addClientNotes() {
      const data = {
        notes: this.notes,
      };

      try {
        const formData = new FormData();
        formData.append("client_id", this.$route.params.id);
        formData.append("notes", this.notes);

        const response = await fetch(`${VITE_API_URL}/create_client_notes`, {
          method: "POST",
          body: formData,
        });
        this.getNotesMethod();
        if (response.ok) {
          this.$emit("addClientNote");
          this.notes = "";
          this.clearError();
          const message = "Successful Note added";
          this.$refs.successAlert.showSuccess(message);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle fetch error
      }
    },

    clearError() {
      this.notes = "";
    },
  },
  async mounted() {
    await this.getNotesMethod();
  },
};
</script>
