<template>
  <div class="exercises">
    <ScrollArea class="rounded-md border p-4 exercises__area">
      <ExerciseCard
        v-for="exercise in exercisesWithFilters"
        :key="exercise.id"
        :exercise="exercise"
      />
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExercisesStore } from "@/store/exercises";
import { useFiltersStore } from "@/store/filters";

const exerciseStore = useExercisesStore();
const filtersStore = useFiltersStore();
const { exercises } = storeToRefs(exerciseStore);
const { searchFilter, typeFilter, levelFilter } = storeToRefs(filtersStore);

const exercisesWithFilters = computed(() =>
  exercises.value.filter((exercise) => {
    return (
      (!searchFilter.value || exercise.name.includes(searchFilter.value)) &&
      (!typeFilter.value || exercise.type === typeFilter.value) &&
      (!levelFilter.value || exercise.level === levelFilter.value)
    );
  })
);
</script>

<style scoped lang="scss">
@import "@/assets/styles/pages/index.scss";
</style>
