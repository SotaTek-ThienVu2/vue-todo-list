import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TodoItem } from "@/types/todo";
import { saveTodo } from "@/utils/localStorage";

export const useTodoStore = defineStore("todo-list", {
  state: () => ({
    todoList: [] as TodoItem[],
  }),
  getters: {
    getListItem(): TodoItem[] {
      return this.todoList;
    },
  },
  actions: {
    saveListItem(list: TodoItem[]) {
      this.todoList = list;
      saveTodo(list);
    },
    addTodo(item: TodoItem) {
      this.todoList.push(item);
      saveTodo(this.todoList);
    },
    deleteItem(ids?: string[]) {
      if (ids) {
        this.todoList = this.todoList.filter((x) => !ids.includes(x.id));
        saveTodo(this.todoList);
      }
    },
    updateItem(item: TodoItem) {
      const objIndex = this.todoList.findIndex((obj) => obj.id === item.id);
      this.todoList[objIndex] = item;
      saveTodo(this.todoList);
    },
  },
});
