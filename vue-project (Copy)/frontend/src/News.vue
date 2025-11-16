<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
// import Paginate from "vuejs-paginate-next";

const category = defineModel<string>("category", { default: "" });

const currentPage = defineModel<number>("currentPage", { default: 1 });
const perPage = defineModel<number>("perPage", { default: 5 });

watch(category, () => {
  currentPage.value = 1;
});

class NewsEntry {
  date: string = "";
  title: string = "";
  content: string = "";
  category: string[] = [];
}

const news = ref<NewsEntry[]>([]);

onMounted(async () => {
  const response = await fetch("/demo_news.json");
  console.log(response);

  const data = await response.json();
  console.log(data);
  news.value = data;
});

const getItemsWithCategory = computed(() => {
  return news.value.filter((entry) => {
    return entry.category.join(", ").toLowerCase().includes(category.value.toLowerCase());
  });
});

const getItemsWithCategoryPaginated = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return getItemsWithCategory.value.slice(start, end);
});

const onClickHandler = (page: number) => {
  console.log(page);
};
</script>

<template>
  <div class="mx-auto w-25">
    <label for="input-category">Search for category: </label>
    <input type="text" id="input-category" name="category" v-model="category" />
  </div>
  <!-- <h1>there has to be something here</h1> -->
  <div
    v-for="(entry, i) in getItemsWithCategoryPaginated"
    :key="i"
    class="border border-2 rounded rounded-2 m-3 p-2 mx-auto w-75"
  >
    <h1 class="">{{ entry.title }}</h1>
    <em>{{ entry.date }}</em>
    <p>{{ entry.content }}</p>
    <p>Category: {{ entry.category.join(", ") }}</p>
  </div>
  <VueAwesomePaginate
    :total-items="getItemsWithCategory.length"
    :items-per-page="perPage"
    v-model="currentPage"
    @click="onClickHandler"
    class="d-flex flex-row list-unstyled"
  />
</template>

<style scoped>
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
