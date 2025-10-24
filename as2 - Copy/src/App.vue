<script setup lang="ts">
import "bootstrap/scss/bootstrap.scss";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<div class="h-100 bg-info d-flex flex-grow-1 flex-column">
		<nav class="d-flex flex-row">
			<div class="col-6">
				<h1>Insight Hire</h1>
			</div>
			<div class="d-flex flex-row justify-content-evenly col-6 p-4">
				<div><RouterLink to="/">Job Explorer</RouterLink></div>
				<div><RouterLink to="/apply">Application Form</RouterLink></div>
				<div><RouterLink to="/todo">Todo List</RouterLink></div>
			</div>
		</nav>

		<div class="d-flex flex-column w-75 mx-auto m-3 bg-white border border-2 border-primary">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style scoped>
nav {
	background-color: black;
}

h1 {
	color: white;
	align-items: center;
	margin: auto;
}

a {
	text-decoration: none;
	color: white;

	align-items: center;
	margin: auto;
}
</style>
