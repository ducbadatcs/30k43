<script lang="ts" setup>
import unitsJson from "./assets/units.json";

type Unit = {
  code: string;
  desc: string;
  cp: number;
  type: string;
};

const units = unitsJson as Unit[];
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Description</th>
        <th>cp</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="unit in units" :key="unit.code">
        <td>{{ unit.code }}</td>
        <td>{{ unit.desc }}</td>
        <td>{{ unit.cp.toFixed(2) }}</td>
        <td>{{ unit.type }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  border: 1px solid black;
  padding: 1px;
}
</style>
