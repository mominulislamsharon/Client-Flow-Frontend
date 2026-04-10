import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/types/tasks";
import { api } from "@/lib/axios";

const useTasks = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.get("/tasks");
      return data?.data || [];
    },
  });

  const createTask = useMutation({
    mutationFn: async (task: Partial<Task>) => {
      const { data } = await api.post("/tasks", task);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Task["status"] }) => {
      const { data } = await api.patch(`/tasks/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { ...query, createTask, updateTaskStatus };
};

export default useTasks;
