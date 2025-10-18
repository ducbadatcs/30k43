<script lang="ts" setup>
const firstName = defineModel<string>("firstName", { default: "" });
const lastName = defineModel<string>("lastName", { default: "" });
const image = defineModel<string>("image", { default: "mountain" });
</script>

<template>
  <h1>Welcome {{ firstName }} {{ lastName }}</h1>
  <p>What is your name?</p>
  <label for="input-first-name">First Name: </label>
  <input type="text" id="input-first-name" name="firstName" v-model="firstName" /><br />
  <label for="input-last-name">Last Name: </label>
  <input type="text" id="input-last-name" name="lastName" v-model="lastName" />
  <fieldset>
    <input
      type="radio"
      name="image"
      value="mountain"
      id="input-image-mountain"
      v-model="image"
      checked
    />
    <label for="input-image-mountain">Mountain</label><br />
    <input type="radio" name="image" value="ocean" id="input-image-ocean" v-model="image" />
    <label for="input-image-ocean">Ocean</label><br />
    <img :src="`${image}.jpg`" />
  </fieldset>
</template>

<style scoped>
img {
  height: 150px;
}
</style>
