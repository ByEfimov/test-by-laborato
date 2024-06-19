<template>
  <DialogContent class="sm:max-w-[475px]">
    <DialogHeader>
      <DialogTitle>{{ exercise.name }} </DialogTitle>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <p>{{ exercise.description }}</p>
      <p>Тип упражнения: {{ typesOfExercises[exercise.type] }}</p>
      <p>Уровень сложности: {{ levelsOfExercises[exercise.level] }}</p>
      <p>Продолжительность выполнения: {{ exercise.duration }}</p>
      <p>Количество повторений и подходов: {{ exercise.repetitions }}</p>
    </div>
  </DialogContent>
</template>

<script setup lang="ts">
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { storeToRefs } from "pinia";
import { useExercisesStore, type IExercise } from "@/store/exercises";

const exercisesStore = useExercisesStore();
const { typesOfExercises, levelsOfExercises } = storeToRefs(exercisesStore);
const { exercise } = defineProps<{ exercise: IExercise }>();
</script>
