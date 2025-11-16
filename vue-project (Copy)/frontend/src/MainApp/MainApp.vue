<script setup lang="ts">
import Chat from "./Chat.vue";
// import FileUpload from "./FileUpload.vue";
import FileUpload from "./FileUpload.vue";
</script>

<template>
  <div class="d-flex flex-row">
    <div class="p-2 border border-end" style="width: 30%">
      <FileUpload></FileUpload>
    </div>
    <div class="p-2 border-start" style="width: 70%">
      <Chat></Chat>
    </div>
  </div>
</template>
