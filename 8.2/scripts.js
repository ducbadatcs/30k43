const app = Vue.createApp({});

app.component("unit-table", {
  data() {
    return {
      units: [],
    };
  },

  template: `
  <table class="table table-bordered ">
			<thead>
				<tr>
					<th>Code</th>
					<th>Description</th>
					<th>cp</th>
					<th>Type</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="unit in units">
					<td>{{unit.code}}</td>
					<td>{{unit.desc}}</td>
					<td>{{unit.cp}}</td>
					<td>{{unit.type}}</td>
				</tr>
			</tbody>
		</table>
  `,

  async mounted() {
    const response = fetch("units.json");

    response
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.units = data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});

app.mount("#app");
