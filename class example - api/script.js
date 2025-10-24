const app = Vue.createApp({});

app.component("app-readjson", {
  data() {
    return {
      message: "loading",
      posts: [
        { title: "post1", body: "content 1" },
        { title: "post2", body: "content 2" },
      ],
    };
  },
  template: `
  <div>
    <strong>{{message}}</strong>
		<div v-for="post of posts">
			<h1>{{post.title}}</h1>
			<p>{{post.body}}</p>
		</div>
	</div>
  `,

  mounted() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log(response);
        return response.json();
        // alert(response.status);
      })
      .then((data) => {
        this.posts = data;
        this.message = "";
      })
      .catch((error) => {
        console.log(error);
        this.message = "fail";
      });
  },
});

app.component("app-create", {
  data() {
    return {
      message: "",
      title: "",
      body: "",
    };
  },

  template: `
  {{message}}
  <form @submit="handleSubmit" action="">
		<div>
			<label for="input-title">Title: </label>
			<input type="text" name="title" id="input-title" v-model="title">
		</div>
		<div>
			<label for="input-body">Body</label>
			<textarea name="body" id="input-body" v-model="body"></textarea>
		</div>
    <button>Submit</button>
	</form>
  `,

  methods: {
    handleSubmit(event) {
      event.preventDefault(); // no redirect to url
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // default: GET
        data: JSON.stringify({
          title: this.title,
          body: this.body,
          userId: Math.random(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.message = "creates post";
        })
        .catch((error) => {
          this.message = "fail";
        });
      // alert(this.title + " " + this.body);
    },
  },
});

app.mount("#app");
