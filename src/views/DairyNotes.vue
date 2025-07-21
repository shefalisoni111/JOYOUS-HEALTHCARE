<template>
  <div>
    <div id="main" class="d-flex">
      <div
        style="
          background: #fff;

          border-radius: 20px;
        "
      >
        <Navbar />
      </div>
      <div
        class="container-fluid px-5 pt-4"
        style="background: rgb(82 74 74 / 6%); height: 100vh"
      >
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
        <div class="card mb-4 mt-5" style="border-radius: 15px">
          <div class="card-header text-black text-center">Add Dairy Note</div>
          <div class="card-body d-flex my-3">
            <div class="col-2"></div>
            <div class="col-8">
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
                <button
                  type="submit"
                  class="btn"
                  style="background: #f9944b; color: #fff"
                >
                  Add Note
                </button>
              </form>
            </div>
            <div class="col-2"></div>
          </div>
        </div>

        <!-- Notes List Section -->
        <div class="card" style="border-radius: 15px">
          <div class="card-header text-black text-center">Notes List</div>
          <div class="card-body my-3">
            <div v-if="notes.length === 0" class="text-center text-muted">
              No notes added yet.
            </div>
            <div class="list-group">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      Title
                      <img
                        src="../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Description
                      <img
                        src="../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                    <th scope="col">
                      Actions
                      <img
                        src="../assets/ArrowDown.png"
                        class="img-fluid pe-2"
                        alt="RecPal"
                        loading="eager"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Loop through notes to display them in rows -->
                  <tr
                    v-for="(note, index) in notes"
                    :key="index"
                    @click="toggleActionMenu(index)"
                    @mouseleave="selectedRow = null"
                  >
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
                      <div class="d-flex align-items-center position-relative">
                        <!-- Show Save/Cancel buttons during editing -->
                        <div v-if="note.isEditing" class="d-flex">
                          <button
                            class="btn btn-primary me-2"
                            @click="updateNote(note)"
                          >
                            Save
                          </button>
                          <button
                            class="btn btn-sm btn-secondary"
                            @click="cancelEdit(note)"
                          >
                            Cancel
                          </button>
                        </div>

                        <!-- Show action menu if not editing -->
                        <div
                          v-else
                          class="action-wrapper position-relative"
                          @mouseenter="selectedRow = note.id"
                          @mouseleave="selectedRow = null"
                        >
                          <i
                            class="bi bi-three-dots dot-icon"
                            style="cursor: pointer"
                          ></i>

                          <div
                            v-if="selectedRow === note.id"
                            class="action-menu position-absolute bg-white shadow rounded p-2"
                            style="right: 0; z-index: 100; width: 100px"
                          >
                            <button
                              type="button"
                              class="btn text-nowrap border-0 w-100 text-start"
                              @click="editNote(note)"
                            >
                              <i
                                class="bi bi-pencil-square"
                                style="color: #f9944b"
                              ></i>
                              Edit
                            </button>

                            <button
                              class="btn text-nowrap border-0 w-100 text-start"
                              @click="deleteNote(note.id)"
                            >
                              <i class="bi bi-trash" style="color: #f9944b"></i>
                              Delete
                            </button>
                          </div>
                        </div>
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
      selectedRow: null,
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
  font-weight: 500;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #8080801f;
  padding: 18px 0px;
  margin: 0px 33px;
}
.list-group-item h5 {
  font-size: 1.1rem;
}
</style>
