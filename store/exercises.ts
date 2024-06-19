import { defineStore } from "pinia";

export type ExerciseTypes = "Cardio" | "Power" | "Stretching";
export type ExerciseLevels = "Elementary" | "Average" | "Advanced";

export interface IExercise {
  name: string;
  description: string;
  type: ExerciseTypes;
  level: ExerciseLevels;
  duration: string;
  repetitions: number;
  id: number;
}

interface IState {
  exercises: IExercise[];
  typesOfExercises: Record<string, string>;
  levelsOfExercises: Record<string, string>;
}

export const useExercisesStore = defineStore("exercise", {
  state: (): IState => ({
    exercises: [
      {
        name: "1",
        description: "d1",
        type: "Cardio",
        level: "Average",
        duration: "10s",
        repetitions: 20,
        id: 1,
      },
      {
        name: "2",
        description: "d2",
        type: "Power",
        level: "Elementary",
        duration: "10s",
        repetitions: 20,
        id: 2,
      },
      {
        name: "3",
        description: "d3",
        type: "Stretching",
        level: "Advanced",
        duration: "10s",
        repetitions: 20,
        id: 3,
      },
    ],
    typesOfExercises: {
      Cardio: "Кардио",
      Power: "Силовые",
      Stretching: "Растяжка",
    },
    levelsOfExercises: {
      Elementary: "Начальный",
      Average: "Средний",
      Advanced: "Продвинутый",
    },
  }),

  actions: {
    removeExercise(id: number) {
      this.$state.exercises = this.$state.exercises.filter(
        (exercise) => exercise.id !== id
      );
    },
    createExercise(values: Omit<IExercise, "id">) {
      const newExercise = { ...values, id: this.exercises.length + 1 };
      this.exercises.push(newExercise);
    },
    editExercise(values: Omit<IExercise, "id">, id: number) {
      const exerciseIndex = this.exercises.findIndex(
        (exercise) => exercise.id === id
      );
      if (exerciseIndex !== -1) {
        this.exercises[exerciseIndex] = { ...values, id };
      }
    },
  },
});
