"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import usePayments from "@/hooks/usePayments";
import useProject from "@/hooks/useProject";

const CreatePaymentModal = () => {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"unpaid" | "paid" | "partial" | "overdue">("paid");
  const [method, setMethod] = useState("Bank Transfer");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  const { createPayment } = usePayments();
  const { data: projectsData } = useProject();
  const projects = projectsData || [];

  const handleSubmit = () => {
    if (!projectId || !amount) return;
    
    createPayment.mutate({
      project: projectId as any,
      amount: Number(amount),
      status,
      method,
      paymentDate: paymentDate || undefined,
    });
    
    setOpen(false);
    setProjectId("");
    setAmount("");
    setStatus("paid");
    setMethod("Bank Transfer");
    setPaymentDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Record Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Record New Payment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="" disabled>Select Project</option>
            {projects.map((proj: any) => (
              <option key={proj.id || proj._id} value={proj.id || proj._id}>
                {proj.title}
              </option>
            ))}
          </select>

          <Input
            type="number"
            placeholder="Amount (৳)"
            className="text-slate-800 font-semibold"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex gap-2">
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Cash">Cash</option>
            </select>

            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="unpaid">Unpaid / Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <Input
            type="date"
            placeholder="Payment Date"
            className="text-slate-800 font-semibold"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />

          <Button onClick={handleSubmit} className="mt-2" disabled={!projectId || !amount}>
            Save Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePaymentModal;
