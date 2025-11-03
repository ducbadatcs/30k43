const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },

  data() {
    return {
      posts: [],
      message: "Loading...",
      currentPage: 1,
      perPage: 5,
      search: "",
    };
  },

  async mounted() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      this.posts = data;
      // this.perPage = this.posts.length /
      this.message = "";
    } catch (error) {
      this.message = error;
    }
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((item) => {
        return item.title.match(this.search);
      });
    },
    pageCount() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },
    getItems() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredPosts.slice(start, end);
    },
    nonsense() {
      alert("you clicked a button");
    },
  },
});

app.mount("#app");
