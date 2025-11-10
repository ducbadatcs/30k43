<script setup lang="ts">
import News from "./News.vue";
</script>

<template>
  <h1 class="text-center text-light w-100 mb-0 mr-0">My Project</h1>
  <nav class="row">
    <RouterLink class="col-12 col-md-6 col-lg-3 text-center p-2 text-light" to="/">Home</RouterLink>

    <RouterLink class="col-12 col-md-6 col-lg-3 text-center p-2 text-light" to="/news"
      >News</RouterLink
    >

    <RouterLink class="col-12 col-md-6 col-lg-3 text-center p-2 text-light" to="/about"
      >About</RouterLink
    >

    <RouterLink class="col-12 col-md-6 col-lg-3 text-center p-2 text-light" to="/main-app"
      >App</RouterLink
    >
  </nav>
  <RouterView></RouterView>
</template>

<style scoped>
a,
h1 {
  display: block;
  background-color: #275479;
}
</style>
