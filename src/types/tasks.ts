export interface Task {
  id: string;
  _id?: string;
  title: string;
  project: {
    _id: string;
    id: string;
    title: string;
  } | string;
  assignedTo?: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
