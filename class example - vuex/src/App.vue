<script setup>
import { useCounterStore } from "./store";
</script>

<template>
  <h1>
    Hi {{ this.$store.state.user.lastName }}
    {{ this.$store.state.user.firstName }}
  </h1>
  <h2>{{ this.$store.getters.fullName }}</h2>
  <button @click="handleClick"></button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
