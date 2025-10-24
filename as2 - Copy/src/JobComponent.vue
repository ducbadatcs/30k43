<script lang="ts" setup>
// import { Job, jobs } from "./jobs";
import JobDetail from "./JobDetail.vue";
import JobOverview from "./JobOverview.vue";
import JobList from "./JobList.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();
const selectedjobId =
	computed<string | undefined>(() => {
		return route.params.jobId as string | undefined;
	}) ?? undefined;

const jobListSizePortion = ref<number>(15);
</script>

<template>
	<div class="m-2 p-2 d-flex flex-row">
		<JobList
			:style="{ width: jobListSizePortion.toString() + `%` }"
			id="joblist"
			class="border-end border-black p-2"
		></JobList>
		<div :style="{ width: (100 - jobListSizePortion).toString() + `%` }" id="jobview">
			<div v-if="selectedjobId == `Overview`" class="p-2">
				<JobOverview></JobOverview>
			</div>
			<div v-else-if="selectedjobId != `Overview`" class="p-2">
				<JobDetail></JobDetail>
			</div>
			<div v-else class="p-2">
				<h1>Insight Hire is hiring!</h1>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat fugiat, omnis
					voluptatibus, excepturi laboriosam earum recusandae minus harum beatae at
					obcaecati architecto aperiam incidunt! Nam explicabo itaque sint voluptatum
					ducimus.
				</p>
			</div>
		</div>
		<!-- <RouterView></RouterView> -->
	</div>
</template>

<style scoped>
a {
	text-decoration: none;
	color: blue;
}

#joblist {
	width: 10%;
}

#jobview {
	width: 85%;
}
</style>
