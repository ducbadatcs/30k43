const app = Vue.createApp({
  data() {
    return {
      isStarted: true,
      isGivenUp: false,

      guessNumber: -1,
      low: 1,
      high: 100,
      number: Math.random() * high + low,
    };
  },

  methods: {},
});

app.mount("#app");
