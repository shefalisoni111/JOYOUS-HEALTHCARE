<template>
  <div class="">
    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-outline-success text-nowrap float-end"
          data-bs-toggle="modal"
          data-bs-target="#addNotes"
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
                <p class="card-text">
                  {{ data.notes }}
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              v-on:click="showConfirmationModal(data.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-4" v-else>
      <div class="text-center text-danger" v-if="!isLoading">{{ "Data Not Found!" }}</div>
    </div>
    <ConfirmationAlert
      :show-modal="isModalVisible"
      :message="confirmMessage"
      @confirm="confirmCallback"
      @cancel="canceled"
    />
    <Loader :isLoading="isLoading" />
    <AddNotes @getNotesAdded="getNotesMethod" />
  </div>
</template>

<script>
import axios from "axios";
import AddNotes from "../../modals/CandidatePage/AddNotes.vue";
import ConfirmationAlert from "../../Alerts/ConfirmationAlert.vue";
import Loader from "../../Loader/Loader.vue";

export default {
  name: "Notes",
  data() {
    return {
      getNotes: [],
      isModalVisible: false,
      confirmMessage: "",
      confirmCallback: null,
      isLoading: false,
    };
  },

  components: { AddNotes, ConfirmationAlert, Loader },

  methods: {
    showConfirmationModal(id) {
      this.confirmMessage = "Are you sure you want to delete this note?";
      this.isModalVisible = true;
      this.confirmCallback = () => this.notesDeleteMethod(id);
    },
    async notesDeleteMethod(id) {
      try {
        await axios.delete(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes/` + id
        );
        this.isModalVisible = false;
        this.getNotesMethod();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    },
    canceled() {
      this.isModalVisible = false;
    },
    async getNotesMethod() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes_list`
        );
        if (response.status === 200) {
          this.getNotes = response.data;
        }
        this.getCandidate();
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("Error 404: Notes not found");
          }
        } else {
          console.error("Error fetching notes:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getCandidate() {
      try {
        await axios.get(`${VITE_API_URL}/candidates/${this.$route.params.id}`);
      } catch (error) {
        if (error.response && error.response.status == 404) {
          console.error("Error 404: Candidate not found");
        } else {
          console.error("Error fetching candidate:", error);
        }
      }
    },
  },
  async created() {
    await this.getNotesMethod();
  },
};
</script>
