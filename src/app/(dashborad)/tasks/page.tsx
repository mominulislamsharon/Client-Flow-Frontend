"use client";

import React from "react";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import TaskList from "@/components/tasks/TaskList";
import useTasks from "@/hooks/useTasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TasksPage = () => {
  const { data } = useTasks();
  const tasks = data || [];

  const openTasks = tasks.filter(t => t.status !== "done");
  const completedTasks = tasks.filter(t => t.status === "done");
  const highPriority = openTasks.filter(t => t.priority === "high");
  const mediumLowPriority = openTasks.filter(t => t.priority === "medium" || t.priority === "low");
  const overdueTasks = openTasks.filter(t => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate).getTime() < new Date().getTime();
  });

  const total = tasks.length || 1; 
  const pCompleted = Math.round((completedTasks.length / total) * 100);
  const pInProgress = Math.round((openTasks.length / total) * 100);
  const pOverdue = Math.round((overdueTasks.length / total) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Tasks</h1>
          <p className="text-sm text-slate-400">
            {openTasks.length} open · {overdueTasks.length} overdue · {completedTasks.length} completed
          </p>
        </div>
        <div>
          <CreateTaskModal />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-8 flex flex-col">
          <TaskList
            title="High Priority"
            tasks={highPriority}
            countColor="text-rose-400 bg-rose-500/10"
          />
          <TaskList
            title="Medium Priority"
            tasks={mediumLowPriority}
            countColor="text-orange-400 bg-orange-500/10"
          />
          <TaskList
            title="Completed"
            tasks={completedTasks}
            countColor="text-emerald-400 bg-emerald-500/10"
          />
          {openTasks.length === 0 && completedTasks.length === 0 && (
            <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-lg">
              <p className="text-slate-400">No tasks created yet.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">

          <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">

                <div className="relative flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)] z-10 shrink-0"></div>
                  <div className="flex flex-col gap-0.5 z-10 bg-slate-900/50 pr-2">
                    <span className="text-sm font-medium text-slate-200">System Ready</span>
                    <span className="text-xs text-slate-400">Environment initialized — auto · just now</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10 shrink-0"></div>
                  <div className="flex flex-col gap-0.5 z-10 bg-slate-900/50 pr-2">
                    <span className="text-sm font-medium text-slate-200">Tasks Live</span>
                    <span className="text-xs text-slate-400">Real-time DB synced — auto · 1m ago</span>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-sm font-semibold">Task summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Completed</span>
                  <span className="text-slate-400">{pCompleted}%</span>
                </div>
                <Progress value={pCompleted} className="h-1.5 bg-slate-800/50 [&>div]:bg-emerald-500" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">In progress</span>
                  <span className="text-slate-400">{pInProgress}%</span>
                </div>
                <Progress value={pInProgress} className="h-1.5 bg-slate-800/50 [&>div]:bg-blue-500" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Overdue</span>
                  <span className="text-slate-400">{pOverdue}%</span>
                </div>
                <Progress value={pOverdue} className="h-1.5 bg-slate-800/50 [&>div]:bg-rose-500" />
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default TasksPage;
