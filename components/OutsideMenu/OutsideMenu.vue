<template>
  <Card class="p-4 outside-menu flex flex-col gap-4">
    <Input
      type="text"
      placeholder="Поиск"
      @input="filterStore.changeSearchFilter($event.target.value)"
    />

    <Select v-model="typeFilter">
      <SelectTrigger>
        <SelectValue placeholder="Тип" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Тип</SelectLabel>
          <SelectItem :value="key" v-for="key in Object.keys(typesOfExercises)">
            {{ typesOfExercises[key] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select v-model="levelFilter">
      <SelectTrigger>
        <SelectValue placeholder="Уровень" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Уровень</SelectLabel>
          <SelectItem
            :value="key"
            v-for="key in Object.keys(levelsOfExercises)"
          >
            {{ levelsOfExercises[key] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Dialog>
      <DialogTrigger as-child>
        <Button class="mt-5">Добавить</Button>
        <EditExercisesDialog :exercise="null" />
      </DialogTrigger>
    </Dialog>
  </Card>
</template>

<script setup lang="ts">
import { useFiltersStore } from "~/store/filters";
import Button from "@/components/ui/button/Button.vue";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExercisesStore } from "~/store/exercises";
import { storeToRefs } from "pinia";

const filterStore = useFiltersStore();
const exercisesStore = useExercisesStore();

const { typesOfExercises, levelsOfExercises } = storeToRefs(exercisesStore);
const { typeFilter, levelFilter } = storeToRefs(filterStore);
</script>

<style scoped lang="scss">
@import "./outsideMenu.scss";
</style>
