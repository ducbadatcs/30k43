import About from "@/About.vue";
import Home from "@/Home.vue";
import MainApp from "@/MainApp/MainApp.vue";
import News from "@/News.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/news", component: News },
    { path: "/about", component: About },
    { path: "/main-app", component: MainApp },
    // { path: "/", component: App },
  ],
});

export default router;
