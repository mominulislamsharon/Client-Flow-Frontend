export interface Task {
  _id: string;
  title: string;
  assignedTo?: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high";
  project: {
    _id: string;
    title: string;
    client: {
      name: string;
    };
  };
}
