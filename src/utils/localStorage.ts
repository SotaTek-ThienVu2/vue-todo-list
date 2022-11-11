import type { TodoItem } from "@/types/todo";

export function saveTodo(todosData: TodoItem[]) {
  localStorage.setItem("todo_key", JSON.stringify(todosData));
}

export function readTodo(): TodoItem[] {
  return JSON.parse(localStorage.getItem("todo_key") || "[]");
}
