<script lang="ts" setup>
import { Job, jobs } from "./jobs";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const selectedJobId =
	computed<string | undefined>(() => route.params.jobId as string | undefined) ?? undefined;
const selectedJob =
	computed<Job | undefined>(() => jobs.find((job) => job.job_id == selectedJobId.value)) ??
	undefined;
</script>

<template>
	<div v-if="selectedJob">
		<h1>{{ selectedJob?.job_id }}</h1>
		<p><b>Company:</b> {{ selectedJob?.company }}</p>
		<p><b>Location:</b> {{ selectedJob?.location }}</p>
		<p><b>Categories:</b> {{ selectedJob?.category }}</p>
		<p><b>Employment Type:</b> {{ selectedJob?.employment_type }}</p>
		<p><b>Salary Range:</b> {{ selectedJob?.salary_range }}</p>
		<p><b>Job Level:</b> {{ selectedJob?.job_level }}</p>
		<p><b>Required Skills:</b> {{ selectedJob?.required_skills.join(", ") }}</p>
		<p><b>Preferred Qualification:</b> {{ selectedJob?.preferred_qualifications.join(", ") }}</p>
		<p><b>Description:</b> {{ selectedJob?.job_description }}</p>
		<p><b>Application Deadline:</b> {{ selectedJob?.application_deadline }}</p>
		<p><b>Posted Date:</b> {{ selectedJob?.posted_date }}</p>
		<p><b>Positions Available:</b> {{ selectedJob?.positions_available }}</p>
		<p><b>Start Date:</b> {{ selectedJob?.start_date }}</p>
	</div>
</template>
