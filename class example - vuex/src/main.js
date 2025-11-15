import { createApp } from "vue";
import { store } from "./store";
import { createRouter } from "vue-router";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
// const router =

app.use(store);
app.mount("#app");
