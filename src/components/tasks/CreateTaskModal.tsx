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
import useTasks from "@/hooks/useTasks";
import useProject from "@/hooks/useProject";

const CreateTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { createTask } = useTasks();
  const { data: projectsData } = useProject();
  const projects = projectsData || [];

  const handleSubmit = () => {
    if (!title || !projectId) return;
    
    createTask.mutate({
      title,
      project: projectId as any,
      priority,
      status: "todo",
      dueDate: dueDate || undefined,
      assignedTo: assignedTo || undefined
    });
    
    setOpen(false);
    setTitle("");
    setProjectId("");
    setPriority("medium");
    setDueDate("");
    setAssignedTo("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Add New Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Task Title"
            className="text-slate-800 font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
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
            placeholder="Assigned To (User Name)"
            className="text-slate-800 font-semibold"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
          
          <div className="flex gap-2">
            <Input
              type="date"
              placeholder="Due Date"
              className="text-slate-800 font-semibold"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-slate-800 font-semibold"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <Button onClick={handleSubmit} className="mt-2" disabled={!title || !projectId}>
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
