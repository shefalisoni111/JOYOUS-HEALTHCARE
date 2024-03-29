<template>
  <div>
    <!-- Button to trigger the confirmation dialog -->
    <button @click="showConfirmationDialog = true">Delete Item</button>

    <!-- Confirmation dialog modal -->
    <div v-if="showConfirmationDialog" class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this item?</p>
        <button @click="cancelDelete">Cancel</button>
        <button @click="confirmDelete">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirmationDialog: false,
    };
  },
  methods: {
    cancelDelete() {
      this.showConfirmationDialog = false;
    },
    confirmDelete() {
      this.showConfirmationDialog = false;
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
