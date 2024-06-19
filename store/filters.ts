import { defineStore } from "pinia";
import type { ExerciseLevels, ExerciseTypes } from "./exercises";

interface IState {
  searchFilter: string;
  typeFilter: ExerciseTypes | null;
  levelFilter: ExerciseLevels | null;
}

export const useFiltersStore = defineStore("filters", {
  state: (): IState => ({
    searchFilter: "",
    typeFilter: null,
    levelFilter: null,
  }),

  actions: {
    changeSearchFilter(newValue: string) {
      this.searchFilter = newValue;
    },
    changeTypeFilter(newValue: ExerciseTypes | null) {
      this.typeFilter = this.typeFilter !== newValue ? newValue : null;
    },
    changeLevelFilter(newValue: ExerciseLevels) {
      this.levelFilter = this.levelFilter !== newValue ? newValue : null;
    },
  },
});
