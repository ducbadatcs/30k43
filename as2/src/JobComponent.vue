<script lang="ts" setup>
import { jobs } from "./jobs";
import JobDetail from "./JobDetail.vue";
import JobOverview from "./JobOverview.vue";
import JobList from "./JobList.vue";
</script>

<template>
	<div class="p-2">
		<JobList></JobList>
		<div v-if="$route.params.job">
			<JobOverview></JobOverview>
		</div>
		<div v-else>
			<JobDetail></JobDetail>
		</div>
	</div>
</template>

<style scoped>
a {
	text-decoration: none;
	color: blue;
}
</style>
