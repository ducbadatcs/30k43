<script lang="ts" setup>
import { Job, jobs } from "./jobs";
import { RouterLink } from "vue-router";

// adds an overview to job list
const overviewJob: Job = new Job();
overviewJob.job_id = "Overview";

// this syntax annoys me
const jobsWithOverview: Job[] = [overviewJob].concat(jobs);
</script>

<template>
	<!-- so this can be block -->
	<div class="w-25">
		<div v-for="job in jobsWithOverview" :key="job.job_id">
			<!-- relative -->
			<RouterLink :to="`/job/${job.job_id}`">{{ job.job_id }}</RouterLink>
		</div>
	</div>
</template>

<style scoped>
a {
	text-decoration: none;
	border-top: 1px solid silver;
	border-bottom: 1px solid silver;
	margin: 5px;
}
</style>
