<!-- AlertModal.vue -->
<template>
  <div class="modal" v-show="isOpen">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirm">OK</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      message: "",
    };
  },
  created() {
    // Listen for alert event
    this.$root.$on("showAlert", ({ message }) => {
      this.isOpen = true;
      this.message = message;
    });
  },
  methods: {
    confirm() {
      this.isOpen = false;
      this.$emit("confirmed");
    },
    cancel() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
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
