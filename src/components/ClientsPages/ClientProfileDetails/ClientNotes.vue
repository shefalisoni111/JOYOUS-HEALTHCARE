<template>
  <!-- <h6>Client Notes Page is Processing....</h6> -->
  <div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between px-3">
          <div>
            <h5 class="mb-2 d-flex align-items-center px-3">Notes</h5>
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

        <div class="mt-3">
          <form @submit.prevent="submitForm" class="d-flex px-3">
            <input
              class="form-control w-75"
              type="text"
              placeholder="Add Note"
              v-model="notes"
            />
            &nbsp;
            <button
              class="btn btn-primary"
              :disabled="!isValidForm"
              @click="submitForm"
            >
              + Add
            </button>
          </form>

          <!-- <span v-if="!isValidForm" class="text-danger">Notes Required</span> -->
        </div>
        <br />
        <div class="d-flex flex-column px-3" v-if="getNotes?.length > 0">
          <div v-for="data in getNotes" :key="data.id">
            <div class="d-flex gap-2">
              <div>
                <i
                  class="bi bi-journal-album mt-n2"
                  style="
                    border-radius: 50%;
                    background: #f9944b14;
                    padding: 10px 13px;
                  "
                ></i>
              </div>

              <div class="">
                <h6
                  class="mb-0 text-capitalize"
                  style="width: 600px; word-wrap: break-word"
                >
                  {{ data.notes }}
                </h6>
                <p>{{ data.created_at }}</p>
              </div>
              <div>
                <i
                  class="bi bi-pencil-fill cursor-pointer text-nowrap"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editClientNotes"
                  data-bs-whatever="@mdo"
                  @click="editRestricted(data.id)"
                  style="color: #f9944b"
                ></i>
                &nbsp;&nbsp;
                <i
                  class="bi bi-trash cursor-pointer danger text-nowrap"
                  style="color: #f9944b"
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
      if (id === 0) {
        return;
      }
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
