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
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#addVacancies"
              data-bs-whatever="@mdo"
            >
              View More
            </button>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <div v-for="data in getNotes" :key="data.id">
            <div class="d-flex gap-2">
              <div>
                <i class="bi bi-journal-album fs-1"></i>
              </div>

              <div class="mt-2">
                <h6 class="mb-0 text-capitalize">{{ data.notes }}</h6>
                <p>{{ data.created_at }}</p>
              </div>
            </div>
          </div>

          <div><span>read more</span></div>
        </div>
        <div class="d-flex w-25 mt-3">
          <form @submit.prevent="submitForm">
            <input
              class="form-control"
              type="text"
              placeholder="Add Note"
              v-model="notes"
            />
          </form>
          <span v-if="!isValidForm" class="text-danger">Notes Required</span>
          <button class="btn btn-primary" :disabled="!isValidForm" @click="submitForm">
            Add
          </button>
        </div>
      </div>
    </div>
    <AddClientNotesVue @addClientNote="getNotesMethod" />
  </div>
</template>

<script>
import axios from "axios";

import AddClientNotesVue from "../../modals/Clients/AddClientNotes.vue";
export default {
  name: "Notes",
  data() {
    return {
      getNotes: [],
      notes: "",
    };
  },
  computed: {
    isValidForm() {
      return this.notes.trim() !== "";
    },
  },
  components: { AddClientNotesVue },
  methods: {
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

        if (response.ok) {
          this.$emit("addClientNote");
          this.notes = "";
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
  async created() {
    await this.getNotesMethod();
  },
};
</script>
