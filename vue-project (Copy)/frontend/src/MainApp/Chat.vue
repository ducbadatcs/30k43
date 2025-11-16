<script setup lang="ts">
import { ref } from "vue";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

// const dummy = DOMPurify.sanitize(md.render("xxxxxxx# test"));

enum MessageSource {
  Human = 0,
  AI,
}

enum Reaction {
  Neutral = 0,
  Dislike,
  Like,
}

class Message {
  raw: string = "";
  content: string = "";
  source: MessageSource = MessageSource.Human;
  reaction: Reaction = Reaction.Neutral;

  constructor(content: string, source: MessageSource, reaction: Reaction = Reaction.Neutral) {
    this.raw = "";
    this.content = content;
    this.source = source;
    this.reaction = reaction;
  }
}

const userMessage = defineModel<string>("userMessage", { default: "" });

const messages = ref<Message[]>([]);

const handleSubmit = async () => {
  if (!userMessage.value.trim()) return;

  const message = new Message(userMessage.value, MessageSource.Human);
  messages.value.push(message);

  const aiMessage = new Message("", MessageSource.AI);
  messages.value.push(aiMessage);
  const messageIndex = messages.value.length - 1;

  userMessage.value = "";

  try {
    const res = await fetch(`http://localhost:8000/reply/${encodeURIComponent(message.content)}`);
    const reader = res.body?.getReader();
    if (!reader) {
      // do this so eslint will shut up:
      if (messages.value[messageIndex]) {
        messages.value[messageIndex].content = "Error: can not get response";
      }
      return;
    }

    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // Update by index to trigger reactivity
      if (messages.value[messageIndex]) {
        // messages.value[messageIndex].content += chunk;
        messages.value[messageIndex].raw += chunk;
        messages.value[messageIndex].content = DOMPurify.sanitize(
          md.render(messages.value[messageIndex].raw),
        );
      }
    }
  } catch (error) {
    if (messages.value[messageIndex]) {
      messages.value[messageIndex].content = `Error: ${error}`;
    }
    console.log(error);
  }
};

const handleReaction = (index: number, reaction: Reaction) => {
  if (messages.value[index]) {
    messages.value[index].reaction = reaction;
  }
  window.alert(`You ${reaction == Reaction.Like ? "liked" : "disliked"} the response.`);
};
</script>

<template>
  <!-- <div v-html="dummy"></div> -->
  <div class="d-flex flex-column gap-2">
    <div
      v-for="(message, i) in messages"
      :key="i"
      :class="[
        'd-flex',
        'flex-column',
        message.source === MessageSource.Human ? 'justify-content-end' : 'justify-content-start',
      ]"
    >
      <div
        :class="[
          'p-3 rounded-3 text-white',
          message.source === MessageSource.Human ? 'bg-primary' : 'bg-success',
          'msg-bubble',
        ]"
        style="width: 70%"
      >
        <span
          v-if="message.source === MessageSource.AI && message.content.length === 0"
          class="fst-italic"
        >
          Loading...
        </span>
        <p v-else v-html="message.content"></p>
      </div>
      <div class="d-flex flex-row" v-if="message.source === MessageSource.AI">
        <p>What do you think about the response?</p>
        <button
          class="bg-primary text-white"
          v-if="messages[i]"
          @click="handleReaction(i, Reaction.Like)"
        >
          Like
        </button>
        <button
          class="bg-danger text-white"
          v-if="messages[i]"
          @click="handleReaction(i, Reaction.Dislike)"
        >
          Dislike
        </button>
      </div>
    </div>
  </div>

  <div class="d-flex mx-auto m-3 p-3">
    <!-- <label for="input-user-message"></label> -->
    <input
      type="text"
      name="userMessage"
      id="input-user-message"
      v-model="userMessage"
      class="h-auto text-wrap form-control"
      placeholder="Enter your message..."
    />
    <button @click="handleSubmit">Send!</button>
  </div>
</template>

<style scoped>
.msg {
  width: 70%;
}
</style>
