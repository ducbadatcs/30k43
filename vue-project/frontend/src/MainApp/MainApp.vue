<script setup lang="ts">
import Chat from "./Chat.vue";
// import FileUpload from "./FileUpload.vue";
import FileUpload from "./FileUpload.vue";
</script>

<template>
  <div class="d-flex flex-row">
    <div class="w-25 p-2 border border-end">
      <FileUpload></FileUpload>
    </div>
    <div class="w-75 p-2 border-start">
      <Chat></Chat>
    </div>
  </div>
</template>
