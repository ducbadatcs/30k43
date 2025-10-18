<script lang="ts" setup>
import { ref } from "vue";
const status = ref<string>("");
const statsPost = ref<string[]>([]);

const add = (status: string) => {
  statsPost.value.push(status);
};

const remove = (index: number) => {
  statsPost.value.splice(index, 1);
};
</script>

<template>
  <label for="input-status">Status: </label>
  <input type="text" name="status" id="input-status" v-model="status" />
  <button @click="add(status)">Post</button>
  <div v-for="(stat, index) in statsPost" :key="index">
    <span>{{ stat }}</span>
    <button @click="remove(index)">Del</button>
  </div>
</template>
