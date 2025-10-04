// const { Button } = require("bootstrap");

const app = Vue.createApp({
  //   data() {},
});

// components

app.component("app_component", {
  data() {
    return { number: 1 };
  },
  method() {},
  template: `<button @click="number += 1"s>{{number}}</button>`,
});

const ColorBox = {
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
    };
  },
  template: `
    <input type="number" v-model="red" min="0" max="255"><br>
    <input type="number" v-model="green" min="0" max="255"><br>
    <input type="number" v-model="blue" min="0" max="255"><br>
    <div :style="{
      width: '100px',
      height: '100px',
      backgroundColor: 'rgb(' + red + ',' + green + ',' + blue + ')'
    }"></div>
  `,
};

app.component("colorbox", ColorBox);

app.mount("#app");
