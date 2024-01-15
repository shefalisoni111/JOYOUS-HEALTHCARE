<template>
  <div v-if="show" class="alert alert-success" role="alert">
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
  },
};
</script>

<style scoped></style>
