export interface Payment {
  id: string;
  _id?: string;
  project: {
    _id: string;
    id: string;
    title: string;
    client?: {
      _id: string;
      id: string;
      name: string;
    } | string;
  } | string;
  amount: number;
  status: "unpaid" | "paid" | "partial" | "overdue";
  paymentDate?: string;
  method?: string;
  createdAt?: string;
  updatedAt?: string;
}
