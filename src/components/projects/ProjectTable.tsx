"use client";

import { Project } from "@/types/project";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import useProject from "@/hooks/useProject";
import { User, CalendarDays } from "lucide-react";

interface ProjectTableProps {
  searchTerm?: string;
}

const ProjectTable = ({ searchTerm = "" }: ProjectTableProps) => {
  const { data, isLoading, isError } = useProject();
  const projects: Project[] = data || [];

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      project.client?.name?.toLowerCase().includes(term)
    );
  });

  if (isLoading) return <div className="text-slate-400 p-4">Loading projects...</div>;
  if (isError) return <div className="text-rose-400 p-4">Error loading projects.</div>;

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader className="border-b border-slate-800/50 pb-4">
        <CardTitle className="text-lg">All Projects</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full text-sm text-left">
            <TableHeader className="bg-slate-800/20">
              <TableRow className="border-b border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium px-4 md:px-6 py-4">Project</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Client</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Status</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden lg:table-cell">Deadline</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Progress</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow className="border-b border-slate-800/50 hover:bg-slate-800/50">
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => {

                  let displayProgress = project.progress || 0;
                  if (displayProgress === 0) {
                    if (project.status === "completed") displayProgress = 100;
                    else if (project.status === "paused") displayProgress = 50;
                    else displayProgress = 25;
                  } else if (project.status === "completed") {
                    displayProgress = 100;
                  }
                  const progressColor =
                    project.status === "completed" ? "[&>div]:bg-emerald-500" :
                      project.status === "paused" ? "[&>div]:bg-orange-500" :
                        "[&>div]:bg-blue-500";

                  return (
                    <TableRow key={project.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">

                      <TableCell className="px-4 md:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-200 text-base">{project.title}</span>
                          <div className="flex flex-col gap-1.5 mt-2 sm:hidden">
                            <span className="text-xs text-slate-400 flex items-center gap-1.5">
                              <User className="w-3 h-3 text-slate-500" /> {project.client?.name || "Unknown"}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1.5">
                              <CalendarDays className="w-3 h-3 text-slate-500" /> {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                            </span>
                            <div className="mt-1 flex items-center gap-2">
                              <Progress value={displayProgress} className={`h-1.5 bg-slate-800/50 w-24 ${progressColor}`} />
                              <span className="text-[10px] text-slate-400">{displayProgress}%</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                            {project.client?.name?.substring(0, 2).toUpperCase() || "??"}
                          </div>
                          <span className="text-slate-300">{project.client?.name || "Unknown"}</span>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4 hidden md:table-cell">
                        <Badge
                          variant={project.status === "ongoing" ? "default" : project.status === "completed" ? "secondary" : "outline"}
                          className={`
                          ${project.status === "ongoing" && "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}
                          ${project.status === "paused" && "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"}
                          ${project.status === "completed" && "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"}
                        `}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-slate-300 hidden lg:table-cell">
                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                      </TableCell>


                      <TableCell className="px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-3">
                          <Progress value={displayProgress} className={`h-1.5 bg-slate-800/50 w-full min-w-[80px] ${progressColor}`} />
                          <span className="text-xs text-slate-300 font-medium w-8">{displayProgress}%</span>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-slate-300 hidden md:table-cell">
                        {project.budget ? `৳${project.budget.toLocaleString()}` : "-"}
                      </TableCell>

                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTable;
