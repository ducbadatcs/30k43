const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      studMarks: [],
      marksPerPage: 3,
      currentPage: 1,
    };
  },
  mounted() {
    for (let i = 0; i < 26; i++) {
      this.studMarks.push({
        name: String.fromCharCode("A".charCodeAt(0) + i),
        mark: Math.floor(Math.random() * 100),
      });
    }
  },
  computed: {
    getPageCount() {
      return Math.ceil(this.studMarks.length / this.marksPerPage);
    },
    getMarksInRange() {
      const start = (this.currentPage - 1) * this.marksPerPage;
      const end = start + this.marksPerPage;
      return this.studMarks.slice(start, end);
    },
  },
  template: `
  <div class="m-2">
  <table class="table table-striped table-bordered">
			<thead><tr>
				<th scope="col">Name</th>
				<th scope="col">Mark</th>
			</tr></thead>
			<tbody><tr v-for="mark in this.getMarksInRange" :key="mark.name">
				<td>{{mark.name}}</td>
				<td>{{mark.mark}}</td>
			</tr></tbody>
		</table>
    <paginate :page-count="this.getPageCount" v-model="this.currentPage"></paginate>
  </div>
  `,
});

app.mount("#app");
