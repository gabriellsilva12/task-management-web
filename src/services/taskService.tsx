import { request } from "./api";

export function getTasks() {
  return request("/tasks");
}

export function createTask(task: { title: string; description: string }) {
  return request("/tasks", "POST", task);
}

export function editTask(id: number, task?: object) {
  return request(`/tasks/${id}`, "PATCH", task);
}

export function deleteTask(id: number) {
  return request(`/tasks/${id}`, "DELETE");
}