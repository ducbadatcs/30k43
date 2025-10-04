const ColorBox = {
  props: ["red", "green", "blue"],
  data() {
    return {
      red: this.red,
      green: this.green,
      blue: this.blue,
    };
  },

  template: `
  <input type="number" v-model="red" name="" id="" min="0" max="255"><br>
  <input type="number" v-model="green" name="" id="" min="0" max="255"><br>
  <input type="number" v-model="blue" name="" id="" min="0" max="255"><br>
  <div :style="'width: 100px; height: 100px; background-color' + rgb(red, green, blue)" >
  </div>
  `,
};
