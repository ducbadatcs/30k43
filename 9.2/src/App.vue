<script setup>
import { ref, onMounted, defineModel, computed } from "vue";
import Paginate from "vuejs-paginate-next";

const units = ref([]);

onMounted(async () => {
  const response = await fetch("units.json");
  units.value = await response.json();
});

console.log(units.value);

const currentPage = ref(1);
const perPage = ref(5);

const getUnits = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return units.value.slice(start, end);
});
</script>

<template>
  <div>
    <table class="table table-bordered table-striped align-center text-center">
      <caption>
        units
      </caption>
      <thead>
        <tr>
          <th scope="col" id="th-unit-code">Unit Code</th>
          <th scope="col" id="th-unit-desc">Description</th>
          <th scope="col" id="th-unit-cp">Credit Points</th>
          <th scope="col" id="th-unit-type">Unit Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="unit in getUnits" :key="unit.code">
          <td headers="th-unit-code">{{ unit.code }}</td>
          <td headers="th-unit-desc">{{ unit.desc }}</td>
          <td headers="th-unit-cp">{{ unit.cp }}</td>
          <td headers="th-unit-type">{{ unit.type }}</td>
        </tr>
      </tbody>
    </table>
    <Paginate
      v-model="currentPage"
      :page-count="Math.ceil(units.length / perPage)"
    />
  </div>
</template>

<style scoped></style>
