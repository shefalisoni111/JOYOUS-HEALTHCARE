<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;

    display: flex;
    align-items: center;
  }
}
</style>
