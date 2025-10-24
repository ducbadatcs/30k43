<script lang="ts" setup>
import { defineModel, ref } from "vue";
class Task {
	taskName: string = "";
	isLowPriority: boolean = true;
}

const tasks = ref<Task[]>([]); // make it reactive!

const newTask = defineModel<string>("newTaskName", { default: "" });

const addTask = (task: string) => {
	const newTask = new Task();
	newTask.taskName = task;

	tasks.value.push(newTask);
};

const removeTaskAtIndex = (index: number) => {
	tasks.value.splice(index, 1);
};
</script>

<template>
	<h1>Todo App</h1>
	<div class="d-block">
		<label for="input-new-task">Enter your task: </label>
		<input type="text" name="newTask" id="input-new-task" v-model="newTask" required />
		<button @click="addTask(newTask)">Add Task</button>
	</div>
	<div class="d-flex flex-column align-items-center">
		<div
			v-for="(task, index) in tasks.slice().reverse()"
			:key="index"
			class="border border-primary w-75 m-1 d-flex flex-row"
		>
			<div class="w-75">
				<span class="p-4 flex-grow-1"
					>{{ task.taskName }} ({{
						task.isLowPriority ? "Low Priority" : "High Priority"
					}})</span
				>
			</div>
			<div class="ms-auto d-flex">
				<button @click="task.isLowPriority = !task.isLowPriority" class="h-100 bg-warning">
					Mark as {{ !task.isLowPriority ? "Low Priority" : "High Priority" }}
				</button>
				<button @click="removeTaskAtIndex(index)" class="bg-danger h-100">Delete</button>
			</div>
		</div>
	</div>
</template>
