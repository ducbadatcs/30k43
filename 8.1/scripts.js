const app = Vue.createApp({});

app.component("app-container", {
  data() {
    return { posts: [] };
  },

  template: ` 
  		<div v-for="(post, index) in posts">
			<p>{{index}} - {{post.body}}</p>
		</div>
  `,

  mounted() {
    const content = $.getJSON("https://jsonplaceholder.typicode.com/posts");
    content.then((response) => {
      console.log(response);
      this.posts = response;
    });
  },
});

app.mount("#app");
