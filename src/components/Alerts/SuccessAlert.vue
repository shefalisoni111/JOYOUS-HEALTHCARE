<template>
  <div v-if="show" class="alert alert-success" :class="position" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "fixed-top",
    },
  },
};
</script>

<style scoped>
.alert {
  position: relative;
}

.fixed-top {
  top: 0;
}
</style>
