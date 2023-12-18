<template>
  <div>
    <button @submit.prevent="signout"></button>
  </div>
</template>

<script lang="ts">
export default {
  name: "SignOut",
  methods: {
    signout() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>
