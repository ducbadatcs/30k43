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

	<div>
		<div
			v-for="job in jobsWithOverview"
			:key="job.job_id"
			class="border-bottom text-center p-2"
		>
			<!-- relative -->
			<RouterLink :to="`/job/${job.job_id}`" class="text-decoration-none p-2">{{
				job.job_id
			}}</RouterLink>
		</div>
	</div>
</template>
