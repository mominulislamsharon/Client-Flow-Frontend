"use client";
import { useState } from "react";
import useProject from "@/hooks/useProject";
import useClients from "@/hooks/useClients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateProjectModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<"ongoing" | "completed" | "paused">("ongoing");
  const [budget, setBudget] = useState("");
  const [progress, setProgress] = useState("");
  const [clientId, setClientId] = useState("");

  const { createProject } = useProject();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: clientsData } = useClients() as any;
  const clients = clientsData || [];

  const handleSubmit = () => {
    if (!title || !clientId) return;

    createProject.mutate({
      title,
      description,
      client: clientId as any,
      deadline,
      status,
      budget: budget ? Number(budget) : undefined,
      progress: progress ? Number(progress) : 0,
    });

    setOpen(false);
    setTitle("");
    setDescription("");
    setDeadline("");
    setStatus("ongoing");
    setBudget("");
    setProgress("");
    setClientId("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Add New Project</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Project Title"
            className="text-slate-800 font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="" disabled>Select Client</option>
            {clients.map((client: any) => (
              <option key={client.id || client._id} value={client.id || client._id}>
                {client.name} {client.company ? `(${client.company})` : ""}
              </option>
            ))}
          </select>

          <Input
            placeholder="Description (Optional)"
            className="text-slate-800 font-semibold"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <Input
              type="date"
              placeholder="Deadline"
              className="text-slate-800 font-semibold"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
              value={status}
              onChange={(e) => {
                const newStatus = e.target.value as "ongoing" | "completed" | "paused";
                setStatus(newStatus);
                if (newStatus === "completed") {
                  setProgress("100");
                } else if (newStatus === "ongoing") {
                  setProgress("25");
                } else if (newStatus === "paused") {
                  setProgress("50");
                }
              }}
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Budget ($)"
              className="text-slate-800 font-semibold"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Progress (%)"
              min="0" max="100"
              className="text-slate-800 font-semibold"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="mt-2" disabled={!title || !clientId}>
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
