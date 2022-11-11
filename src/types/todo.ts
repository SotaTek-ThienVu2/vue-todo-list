

export enum TodoPriority {
  low = "Low",
  medium = "Medium",
  high = "High",
}
export const PriorityOptions: {
  key: string;
  value: string;
}[] = Object.entries(TodoPriority).map(([key, value]) => ({ key, value }));


export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: TodoPriority | undefined;
}
