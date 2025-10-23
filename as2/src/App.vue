<script setup lang="ts">
import "bootstrap/scss/bootstrap.scss";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<nav class="d-flex flex-row">
		<div class="col-6">
			<h1>Insight Hire</h1>
		</div>
		<div class="d-flex flex-row justify-content-evenly col-6">
			<div><RouterLink to="/">Job Explorer</RouterLink></div>
			<div><RouterLink to="/apply">Application Form</RouterLink></div>
			<div><RouterLink to="/todo">Todo List</RouterLink></div>
		</div>
	</nav>
	<RouterView></RouterView>
</template>

<style scoped>
nav {
	background-color: black;
	h1 {
		color: white;
	}
}

a {
	text-decoration: none;
	color: white;

	align-items: center;
	margin: auto;
}
</style>
