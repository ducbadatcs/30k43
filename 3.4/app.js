import { models } from "./resource.js";

const app = Vue.createApp({
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      os: "",
      model: "",
      models: models,
    };
  },

  methods: {
    getPhoneNamesWithOS(os) {
      // if (os == "") {
      //   return this.models.map((phone) => {
      //     phone.model;
      //   });
      // }
      let list = this.models
        .filter((phone) => {
          return phone.os.toLowerCase().includes(os.toLowerCase());
        })
        .map((phone) => phone.model);
      console.log(list);
      return list;
    },
  },
});

app.mount("#app");
