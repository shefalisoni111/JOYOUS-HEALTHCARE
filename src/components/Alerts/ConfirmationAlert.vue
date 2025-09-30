<template>
  <div class="modal" v-show="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body pb-0">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button @click="cancel" class="btn btn-secondary">Cancel</button>
          <button
            @click="confirm"
            class="btn btn-md"
            style="background-color: #f9944b; color: #fff"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["message", "showModal"],
  methods: {
    toggleActionMenu(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.content-area {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}
@media (max-width: 1120px) {
  .content-area {
    margin-left: 0;
  }
}
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
