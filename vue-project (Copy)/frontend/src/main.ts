import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../node_modules/vue-awesome-paginate/dist/style.css";

const app = createApp(App);

app.use(router);

// app.use(VueAwesomePaginate);

app.mount("#app");
