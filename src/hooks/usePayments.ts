import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Payment } from "@/types/payment";
import { api } from "@/lib/axios";

const usePayments = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await api.get("/payments");
      return data?.data || [];
    },
  });

  const createPayment = useMutation({
    mutationFn: async (payment: Partial<Payment>) => {
      const { data } = await api.post("/payments", payment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  return { ...query, createPayment };
};

export default usePayments;
