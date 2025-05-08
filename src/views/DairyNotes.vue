<template>
  <div>
    <div id="main" class="d-flex" style="background: #f8f8ff">
      <div
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div class="container-fluid px-5 my-4">
        <div class="p-0">
          <div class="">
            <ol class="breadcrumb my-2">
              <li class="breadcrumb-item active fs-6">
                <a
                  class="nav-link d-inline fs-4 fw-bolder"
                  style="color: #000000; background: none !important"
                  >Diary Notes</a
                >
              </li>
            </ol>
          </div>
        </div>
        <!-- <h1 class="text-center mb-4">Diary Notes</h1> -->

        <!-- Add Note Section -->
        <div class="card mb-4 mt-5">
          <div
            class="card-header text-white"
            style="background-color: rgb(255 127 89)"
          >
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
          <div
            class="card-header text-white"
            style="background-color: rgb(255 127 89); color: #fff"
          >
            Notes List
          </div>
          <div class="card-body">
            <div v-if="notes.length === 0" class="text-center text-muted">
              No notes added yet.
            </div>
            <div class="list-group">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Loop through notes to display them in rows -->
                  <tr v-for="note in notes" :key="note.id">
                    <td>
                      <div v-if="note.isEditing">
                        <!-- Edit input for the title -->
                        <input
                          v-model="note.title"
                          type="text"
                          class="form-control mb-2"
                          placeholder="Edit Title"
                        />
                      </div>
                      <div v-else>
                        {{ note.title }}
                      </div>
                    </td>
                    <td>
                      <div v-if="note.isEditing">
                        <!-- Edit textarea for the description -->
                        <textarea
                          v-model="note.description"
                          class="form-control mb-2"
                          placeholder="Edit Description"
                        ></textarea>
                      </div>
                      <div v-else>
                        {{ note.description }}
                      </div>
                    </td>
                    <td>
                      <div class="d-flex">
                        <!-- Conditionally render buttons for Edit/Save/Cancel -->
                        <button
                          v-if="note.isEditing"
                          class="btn btn-primary me-2"
                          @click="updateNote(note)"
                        >
                          Save
                        </button>
                        <button
                          v-if="note.isEditing"
                          class="btn btn-sm btn-secondary"
                          @click="cancelEdit(note)"
                        >
                          Cancel
                        </button>
                        <button
                          v-if="!note.isEditing"
                          class="btn btn-primary me-2"
                          @click="editNote(note)"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-danger"
                          @click="deleteNote(note.id)"
                          v-if="!note.isEditing"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
