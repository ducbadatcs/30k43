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
	<label for="input-new-task"></label>
	<input type="text" name="newTask" id="input-new-task" v-model="newTask" />
	<button @click="addTask(newTask)">Add Task</button>
	<div>
		<div v-for="(task, index) in tasks.slice().reverse()" :key="index">
			<span
				>{{ task.taskName }} ({{
					task.isLowPriority ? "Low Priority" : "High Priority"
				}})</span
			>
			<button @click="task.isLowPriority = !task.isLowPriority">
				Mark as {{ !task.isLowPriority ? "Low Priority" : "High Priority" }}
			</button>
			<button @click="removeTaskAtIndex(index)">Delete</button>
		</div>
	</div>
</template>
