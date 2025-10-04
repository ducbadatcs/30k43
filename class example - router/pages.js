// import { VueRouter } from "../framework/js/vue-router.global.js";

const app = Vue.createApp({});

const HomePage = {
  template: `<h1>Home</h1>`,
};

const AboutPage = {
  template: `<h1>About</h1>`,
};

const HelloPage = {
  template: `<h1>I love {{$route.params.city}}</h1>`,
};

const NamePage = {
  template: `<h1>{{$route.params.name.toUpperCase()}} is the cutest person ever!</h1>`,
};

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/cities/:city", component: HelloPage },
    { path: "/people/:name", component: NamePage },
  ],
});

app.use(router);

app.mount("#app");
