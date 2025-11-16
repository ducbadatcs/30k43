<script setup lang="ts">
// import { emit } from "vue";

// import { defineEmits } from "vue";

const username = defineModel<string>("username", { default: "" });
const password = defineModel<string>("password", { default: "" });

const emit = defineEmits(["logged-in"]);

const handleSubmit = () => {
  // validate data

  // check database
  emit("logged-in");
  //   authen;
};
</script>

<template>
  <h1>login</h1>
  <form @submit="handleSubmit" method="post" action="">
    <label for="input-username">Username: </label>
    <input
      type="text"
      name="username"
      id="input-username"
      v-model="username"
      placeholder="username"
    /><br />
    <label for="input-password">Password: </label>
    <input
      type="password"
      name="password"
      id="input-password"
      v-model="password"
      placeholder="password"
    />
    <input type="submit" value="Submit" />
  </form>
</template>
