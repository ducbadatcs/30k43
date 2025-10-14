const app = Vue.createApp({});

app.component("mymenu", {
  props: ["menu"],
  template: `<ul>
	<li v-for="item in this.menu">{{item}}</li>
	</ul>`,
});

app.mount("#app");
