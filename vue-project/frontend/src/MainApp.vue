<script setup lang="ts">
import { ref } from "vue";

enum MessageSource {
  Human = 0,
  AI,
}

class Message {
  content: string = "";
  source: MessageSource = MessageSource.Human;

  constructor(content: string, source: MessageSource) {
    this.content = content;
    this.source = source;
  }
}

const userMessage = defineModel<string>("userMessage", { default: "" });

const messages = ref<Message[]>([]);

const handleSubmit = async () => {
  // add human message
  const message = new Message(userMessage.value, MessageSource.Human);
  messages.value.push(message);

  // get response of message
  const res = await fetch(`http://localhost:8000/reply/${encodeURIComponent(message.content)}`);
  const reader = res.body?.getReader();
  if (!reader) {
    return;
  }

  // do the work?
  let aiText = "";
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    aiText += chunk;
  }
  const last = messages.value[messages.value.length - 1];
  if (last && last.source === MessageSource.AI) {
    last.content = aiText;
  } else {
    messages.value.push(new Message(aiText, MessageSource.AI));
  }
};
</script>

<template>
  <label for="input-user-message"></label>
  <input type="text" name="userMessage" id="input-user-message" v-model="userMessage" />
  <button @click="handleSubmit">Send!</button>
  <div>
    <div v-for="(message, i) in messages" :key="i">
      <p v-if="message.source == MessageSource.Human" class="text-light">{{ message.content }}</p>
      <p v-if="message.source == MessageSource.AI" class="text-dark">{{ message.content }}</p>
    </div>
  </div>
</template>
