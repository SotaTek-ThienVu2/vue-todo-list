import { defineStore } from "pinia";

export const useForm = defineStore("form", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    getIsOpen(): Boolean {
      return this.isOpen;
    },
  },
  actions: {
    changeOpen(open: boolean) {
      this.isOpen = open;
    },
  },
});
