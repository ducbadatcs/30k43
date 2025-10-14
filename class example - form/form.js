const app = Vue.createApp({
  data() {
    return {
      errors: {
        name: "",
      },
      name: "duc",
    };
  },

  methods: {
    handleSubmit(event) {
      //   alert();
      this.errors.name = "";
      if (!this.name) {
        this.errors.name = "name is missing";
      } else if (this.name.length < 6) {
        this.errors.name = "name needs to have at least 6 chars";
      }

      if (this.errors.name) {
        event.preventDefault();
      }
    },
  },
});

app.mount("#app");
