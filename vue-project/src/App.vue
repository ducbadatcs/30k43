<script setup lang="ts">
import { ref } from "vue";

class Post {
  userId = 0;
  id = 0;
  title = "";
  body = "";
}

const data = ref<Post[]>([]);

const response = await fetch("https://jsonplaceholder.typicode.com/posts");
data.value = await response.json();
</script>

<template>
  <div v-if="data.length">
    <p v-for="post of data" :key="post.id">{{ post.id }} - {{ post.title }} - {{ post.body }}</p>
  </div>
</template>

<style scoped></style>
