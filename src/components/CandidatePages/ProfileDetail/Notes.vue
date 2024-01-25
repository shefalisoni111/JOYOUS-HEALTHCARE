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

    <div class="row m-4">
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
          <div class="d-fle align-items-center gap-2">
            <button
              type="button"
              class="btn btn-outline-success text-nowrap"
              v-on:click="notesDeleteMethod(data.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddNotes from "../../modals/CandidatePage/AddNotes.vue";
export default {
  name: "Notes",
  data() {
    return {
      getNotes: [],
    };
  },

  components: { AddNotes },
  methods: {
    async notesDeleteMethod(id) {
      if (!window.confirm("Are you Sure ?")) {
        return;
      }
      await axios.delete(
        `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes/` + id
      );
      window.location.reload();
    },
    async getNotesMethod() {
      try {
        const response = await axios.get(
          `${VITE_API_URL}/candidates/${this.$route.params.id}/candidate_notes_list`
        );

        if (response.status === 200) {
          this.getNotes = response.data;
          this.getNotesMethod();
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

    //  ratecard apis end
  },
  async created() {
    await this.getNotesMethod();
  },
};
</script>
