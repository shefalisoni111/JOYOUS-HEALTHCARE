<template>
  <div>
    <Navbar />
    <div class="container my-5 pt-5">
      <h1 class="text-center mb-4">Dairy Notes</h1>

      <!-- Add Note Section -->
      <div class="card mb-4">
        <div class="card-header text-white" style="background-color: #ff5f30">
          Add Dairy Note
        </div>
        <div class="card-body">
          <form @submit.prevent="addNote">
            <div class="mb-3">
              <label for="noteTitle" class="form-label">Title</label>
              <input
                type="text"
                id="noteTitle"
                class="form-control"
                v-model="newNote.title"
                placeholder="Enter title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="noteContent" class="form-label">Content</label>
              <textarea
                id="noteContent"
                class="form-control"
                v-model="newNote.description"
                rows="3"
                placeholder="Enter note description"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-success">Add Note</button>
          </form>
        </div>
      </div>

      <!-- Notes List Section -->
      <div class="card">
        <div class="card-header bg-secondary text-white">Notes List</div>
        <div class="card-body">
          <div v-if="notes.length === 0" class="text-center text-muted">
            No notes added yet.
          </div>
          <ul class="list-group">
            <li
              v-for="note in notes"
              :key="note.id"
              class="d-flex justify-content-between align-items-center"
            >
              <div v-if="!note.isEditing" class="d-flex w-100">
                <div class="flex-grow-1">
                  <h5 class="mb-1">{{ note.title }}</h5>
                  <p class="mb-1">{{ note.description }}</p>
                </div>
                <div>
                  <button class="btn btn-primary me-2" @click="editNote(note)">
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="deleteNote(note.id)">
                    Delete
                  </button>
                </div>
              </div>

              <div v-if="note.isEditing">
                <input
                  v-model="newNote.title"
                  type="text"
                  class="form-control mb-2"
                  placeholder="Edit Title"
                />
                <textarea
                  v-model="newNote.description"
                  class="form-control mb-2"
                  placeholder="Edit Description"
                ></textarea>
                <button class="btn btn-primary me-2" @click="updateNote(note)">
                  Save
                </button>
                <button class="btn btn-sm btn-secondary" @click="cancelEdit(note)">
                  Cancel
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.vue";
export default {
  data() {
    return {
      notes: [],
      newNote: {
        id: "",
        title: "",
        description: "",
      },
      editingNote: null,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    addNote() {
      if (!this.newNote.title || !this.newNote.description) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Title and Content are required.",
        });
        return;
      }

      const requestBody = {
        id: this.newNote.id,
        title: this.newNote.title,
        description: this.newNote.description,
      };

      axios
        .post(`${VITE_API_URL}/diary_notes`, requestBody)
        .then((response) => {
          this.notes.push({
            id: response.data.id,
            title: response.data.title,
            content: response.data.description,
          });

          this.newNote.title = "";
          this.newNote.description = "";
          this.notes = response.data;

          Swal.fire({
            icon: "success",
            title: "Note added successfully!",
            text: "Your note has been added.",
          });
          this.showNotesList();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to add note",
            text: "Please try again.",
          });
        });
    },

    showNotesList() {
      axios
        .get(`${VITE_API_URL}/diary_notes`)
        .then((response) => {
          this.notes = response.data;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error fetching notes",
            text: "Please try again later.",
          });
        });
    },

    editNote(note) {
      this.newNote.id = note.id;
      this.newNote = { ...note };
      note.isEditing = true;
    },

    updateNote(note) {
      if (!note.id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No note ID found for update.",
        });
        return;
      }

      const updatedNote = {
        title: note.title,
        description: note.description,
      };

      axios
        .put(`${VITE_API_URL}/diary_notes/${note.id}`, updatedNote)
        .then((response) => {
          note.title = response.data.title;
          note.description = response.data.description;
          note.isEditing = false;

          Swal.fire({
            icon: "success",
            title: "Note updated successfully!",
            text: "Your note has been updated.",
          });
          this.showNotesList();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to update note",
            text: "Please try again.",
          });
        });
    },

    cancelEdit(note) {
      note.isEditing = false;
    },

    deleteNote(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this note?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${VITE_API_URL}/diary_notes/${id}`)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Note deleted successfully!",
                text: "Your note has been deleted.",
              });

              this.notes = this.notes.filter((note) => note.id !== id);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Failed to delete note",
                text: "Please try again.",
              });
            });
        }
      });
    },
  },
  mounted() {
    this.showNotesList();
  },
};
</script>
<style scoped>
.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}
.list-group-item h5 {
  font-size: 1.1rem;
}
</style>
