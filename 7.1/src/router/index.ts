import Home from "@/Home.vue";
import Tasks from "@/Tasks.vue";
import Units from "@/Units.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/units", component: Units },
    { path: "/tasks", component: Tasks },
  ],
});

export default router;
