<template>
  <div v-if="show" class="success-alert">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 3000);
  },
};
</script>

<style scoped>
.success-alert {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
