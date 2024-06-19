<template>
  <DialogContent class="sm:max-w-[475px]">
    <form @submit="formSubmit">
      <DialogHeader>
        <DialogTitle>
          {{ editMode ? "Изменить " : "Создать " }}упражнение
        </DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <Input v-model="name" placeholder="Название" />
        <Textarea v-model="description" placeholder="Название" />
        <Select v-model="type">
          <SelectTrigger>
            <SelectValue placeholder="Тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Тип</SelectLabel>
              <SelectItem
                :value="key"
                v-for="key in Object.keys(typesOfExercises)"
              >
                {{ typesOfExercises[key] }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="level">
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
        <Input v-model="duration" placeholder="Длительность" />
        <NumberField
          class="flex items-center gap-4"
          :min="0"
          v-model="repetitions"
        >
          <Label class="pl-1">Повторения</Label>
          <NumberFieldContent class="w-full">
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
      <p class="text-rose-600 font-medium">
        {{ Object.keys(errors).length > 0 ? "Не все поля заполнены." : "" }}
      </p>
      <DialogFooter>
        <DialogClose as-child>
          <Button class="mt-2" type="submit">
            {{ editMode ? "Изменить" : "Добавить" }}
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

<script setup lang="ts">
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import { useExercisesStore, type IExercise } from "~/store/exercises";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";

const { exercise } = defineProps<{ exercise: IExercise | null }>();
const editMode = ref(exercise);
const exercisesStore = useExercisesStore();
const { typesOfExercises, levelsOfExercises } = storeToRefs(exercisesStore);

const initialValues: Omit<IExercise, "id"> | null = exercise;

const form = useForm<Omit<IExercise, "id">>({
  validationSchema: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    level: yup.string().required(),
    duration: yup.string().required(),
    repetitions: yup.string().required(),
  }),
  initialValues,
});

const { handleSubmit, defineField, errors, resetForm } = form;

const [name] = defineField("name");
const [description] = defineField("description");
const [type] = defineField("type");
const [level] = defineField("level");
const [duration] = defineField("duration");
const [repetitions] = defineField("repetitions");

const formSubmit = handleSubmit(async (values) => {
  if (editMode.value && exercise?.id) {
    exercisesStore.editExercise(values, exercise.id);
  } else {
    exercisesStore.createExercise(values);
    resetForm();
  }
});
</script>
