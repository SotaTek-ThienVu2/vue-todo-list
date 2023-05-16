import { defineStore } from "pinia";

export const useLayout = defineStore("layout", {
  state: () => ({
    windowSize: 1024,
  }),
  getters: {
    getWindowSize(): Number {
      return this.windowSize;
    },
  },
  actions: {
    changeWindowSize(size: number) {
      this.windowSize = size;
    },
  },
});
