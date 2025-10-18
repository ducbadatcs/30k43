<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <h1>You did it!</h1> -->
  <div>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/units">Units</RouterLink></li>
      <li><RouterLink to="/tasks">Tasks</RouterLink></li>
    </ul>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
