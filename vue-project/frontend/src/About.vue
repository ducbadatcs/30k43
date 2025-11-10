<script setup lang="ts">
const firstName = defineModel<string>("firstName", { default: "" });
const lastName = defineModel<string>("lastName", { default: "" });

const image = defineModel<string>("image", { default: "" });
</script>

<template>
  <div class="card-body mx-auto border border-radius-2 p-2 text-center">
    <p>The application is similar to Google's NotebookLM (look that up)!</p>

    <div class="row">
      <div class="col-lg-6">
        <h1>Welcome {{ firstName }} {{ lastName }}!</h1>
        <p>What is your name?</p>
      </div>
      <div class="col-lg-6 row">
        <div class="p-1 col-md-6">
          <label for="input-first-name">First Name: </label>
          <input type="text" name="firstName" id="input-first-name" v-model="firstName" />
        </div>
        <div class="p-1 col-md-6">
          <label for="input-last-name">Last Name: </label>
          <input type="text" name="lastName" id="input-last-name" v-model="lastName" />
        </div>
      </div>
    </div>

    <fieldset>
      <legend>Select Image</legend>
      <div>
        <input type="radio" name="image" id="input-radio-ocean" v-model="image" value="ocean.jpg" />
        <label for="input-radio-ocean">Ocean</label>
      </div>
      <div>
        <input
          type="radio"
          name="image"
          id="input-radio-mountain"
          v-model="image"
          value="mountain.jpg"
        />
        <label for="input-radio-mountain">Mountain</label>
      </div>
    </fieldset>
    <img v-if="image" :src="`${image}`" :alt="`${image}`" class="w-100" />
  </div>
</template>
