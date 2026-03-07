import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Client } from "@/types/client";
import { api } from "@/lib/axios";

const useClients = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data } = await api.get("/clients");
      return data;
    },
  });

  // create client

  const createClient = useMutation({
    mutationFn: async (client: Omit<Client, "id">) => {
      const { data } = await api.post("/clients", client);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return { ...query, createClient };
};

export default useClients;
