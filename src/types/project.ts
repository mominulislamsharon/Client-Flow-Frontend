export interface Project {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed" | "paused";
  budget?: number;
  progress?: number;
  deadline?: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
}
