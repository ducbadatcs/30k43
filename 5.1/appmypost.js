const app = Vue.createApp({});

app.component("app-mypost", {
  data() {
    return {
      statsPost: [],
      strStatus: "",
    };
  },

  template: `<div>
  <label for="input-status">Status: </label>
		<input type="text" id="input-status" name="status" v-model="status">
		<button @click="add(status)">Post</button>
    <div v-for="(stat, index) in statsPost" :key="index">
      <span>{{ stat }}</span>
      <button @click="remove(index)">Del</button>
    </div>
  </div>`,

  methods: {
    add(status) {
      this.statsPost.push(status);
    },

    remove(index) {
      this.statsPost.splice(index, 1);
    },
  },
});

app.mount("#app");
