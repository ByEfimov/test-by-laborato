<template>
  <Dialog>
    <DialogTrigger as-child>
      <Card class="p-3 mb-3 flex gap-6 exercise items-center exercise-card">
        <h2>{{ exercise.name }}</h2>
        <Badge
          :class="[
            'exercise__badge',
            { 'exercise__badge--active': typeFilter === exercise.type },
          ]"
          @click="
            (e) => {
              e.stopPropagation();
              filtersStore.changeTypeFilter(exercise.type);
            }
          "
        >
          {{ typesOfExercises[exercise.type] }}
        </Badge>
        <Badge
          :class="[
            'exercise__badge',
            { 'exercise__badge--active': levelFilter === exercise.level },
          ]"
          @click="
            (e) => {
              e.stopPropagation();
              filtersStore.changeLevelFilter(exercise.level);
            }
          "
        >
          {{ levelsOfExercises[exercise.level] }}
        </Badge>

        <div class="w-full flex justify-end exercise__actions gap-3">
          <Button
            class="h-7 exercise-card__button"
            @click="
              (e) => {
                e.stopPropagation();
                exercisesStore.removeExercise(exercise.id);
              }
            "
            ><Trash2 class="w-4 h-4"
          /></Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                class="h-7 exercise-card__button"
                @click="$event.stopPropagation()"
                ><Pencil class="w-4 h-4"
              /></Button>
              <EditExercisesDialog :exercise="exercise" />
            </DialogTrigger>
          </Dialog>
        </div>
      </Card>
      <DetailedInfoDialog :exercise="exercise" />
    </DialogTrigger>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExercisesStore, type IExercise } from "@/store/exercises";
import { useFiltersStore } from "@/store/filters";
import Button from "@/components/ui/button/Button.vue";
import { Trash2 } from "lucide-vue-next";
import { Pencil } from "lucide-vue-next";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const filtersStore = useFiltersStore();
const exercisesStore = useExercisesStore();
const { typeFilter, levelFilter } = storeToRefs(filtersStore);
const { typesOfExercises, levelsOfExercises } = storeToRefs(exercisesStore);

const { exercise } = defineProps<{ exercise: IExercise }>();
</script>

<style scoped lang="scss">
@import "./exerciseCard.scss";
</style>
