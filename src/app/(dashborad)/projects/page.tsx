"use client";

import React, { useState } from "react";
import ProjectTable from "@/components/projects/ProjectTable";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useProject from "@/hooks/useProject";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useProject();
  const projects = data || [];

  const activeProjects = projects.filter((p) => p.status === "ongoing").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const pausedProjects = projects.filter((p) => p.status === "paused").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Projects</h1>
          <p className="text-sm text-slate-400">
            {activeProjects} active · {completedProjects} completed · {pausedProjects} paused
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search projects..."
            className="w-full sm:w-64 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CreateProjectModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-blue-400 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-emerald-400 mt-1">Successfully finished</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Paused</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pausedProjects}</div>
            <p className="text-xs text-orange-400 mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <ProjectTable searchTerm={searchTerm} />
    </div>
  );
};

export default ProjectsPage;