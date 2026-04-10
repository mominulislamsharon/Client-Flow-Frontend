"use client";

import { Task } from "@/types/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import useTasks from "@/hooks/useTasks";
import { Check } from "lucide-react";

interface TaskListProps {
  title: string;
  tasks: Task[];
  countColor?: string;
}

const TaskList = ({ title, tasks, countColor = "text-slate-400 bg-slate-800" }: TaskListProps) => {
  const { updateTaskStatus } = useTasks();

  const handleToggle = (task: Task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    updateTaskStatus.mutate({ id: task.id || task._id as string, status: newStatus });
  };

  if (tasks.length === 0) return null;

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 mb-6 shadow-sm overflow-hidden">
      <CardHeader className="border-b border-slate-800/50 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${countColor}`}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="divide-y divide-slate-800/50">
          {tasks.map((task) => {
            const isDone = task.status === "done";

            const projectName = typeof task.project === 'object' && task.project !== null
              ? task.project.title
              : "Unknown Project";

            return (
              <li
                key={task.id || task._id}
                className={`flex items-start justify-between p-4 hover:bg-slate-800/20 transition-colors ${isDone ? 'opacity-60' : ''}`}
              >
                <div className="flex gap-4 items-start">

                  <div className="pt-1">
                    <div
                      onClick={() => handleToggle(task)}
                      className={`w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer transition-all ${isDone
                          ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'border-slate-500 hover:border-slate-400'
                        }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className={`font-medium text-[15px] ${isDone ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {projectName} {task.dueDate && `— Due ${new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>

                </div>

                <div className="pl-4">
                  <Badge
                    variant="outline"
                    className={`
                      ${task.priority === 'high' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : ''}
                      ${task.priority === 'medium' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' : ''}
                      ${task.priority === 'low' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : ''}
                    `}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </div>

              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;
