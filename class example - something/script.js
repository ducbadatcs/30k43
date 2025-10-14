const app = Vue.createApp({});

// components
app.component("app-counter", {
  // data

  props: ["initial"],

  data() {
    return { count: this.initial ?? 1 };
  },

  // methods
  // computed

  template: `<button @click="count++">{{count}}</button>`,
});

// component

const HomePage = {
  // data, methods, computed, created
  template: `<h1>HomePage</h1>`,
};

const AboutPage = {
  // data, methods, computed, created
  template: `<h1>AbuoutPage</h1>`,
};

// router

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
  ],
});

app.use(router);

app.mount("#app");
