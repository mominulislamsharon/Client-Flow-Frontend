import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@/types/project";
import { api } from "@/lib/axios";

const useProject = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data?.data || [];
    },
  });

  const createProject = useMutation({
    mutationFn: async (project: Partial<Project>) => {
      const { data } = await api.post("/projects", project);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { ...query, createProject };
};

export default useProject;