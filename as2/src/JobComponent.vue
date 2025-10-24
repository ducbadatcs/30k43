<script lang="ts" setup>
// import { Job, jobs } from "./jobs";
import JobDetail from "./JobDetail.vue";
import JobOverview from "./JobOverview.vue";
import JobList from "./JobList.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const selectedjobId =
	computed<string | undefined>(() => {
		return route.params.jobId as string | undefined;
	}) ?? undefined;
// const selectedJob =
// 	computed<Job | undefined>(() => jobs.find((job) => job.job_id == selectedjobId.value)) ??
// 	undefined;
</script>

<template>
	<div class="m-2 p-2 d-flex flex-row">
		<JobList class="w-25"></JobList>
		<div v-if="selectedjobId == `Overview`" class="w-75">
			<JobOverview></JobOverview>
		</div>
		<div v-else-if="selectedjobId != `Overview`" class="w-75">
			<JobDetail></JobDetail>
		</div>
		<div v-else class="w-75">
			<h2>Insight Hire is hiring!</h2>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat fugiat, omnis
				voluptatibus, excepturi laboriosam earum recusandae minus harum beatae at obcaecati
				architecto aperiam incidunt! Nam explicabo itaque sint voluptatum ducimus.
			</p>
		</div>
		<!-- <RouterView></RouterView> -->
	</div>
</template>

<style scoped>
a {
	text-decoration: none;
	color: blue;
}
</style>
