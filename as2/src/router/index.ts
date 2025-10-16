import App from "@/App.vue";
import ApplicationForm from "@/ApplicationForm.vue";
import JobComponent from "@/JobComponent.vue";
import ToDoList from "@/ToDoList.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		// { path: "/", component: App },
		{ path: "/", component: JobComponent },
		{ path: "/apply", component: ApplicationForm },
		{ path: "/todo", component: ToDoList },
	],
});

export default router;
