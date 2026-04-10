"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase, CheckCircle2, DollarSign } from "lucide-react";
import Link from "next/link";

import useClients from "@/hooks/useClients";
import useProject from "@/hooks/useProject";
import useTasks from "@/hooks/useTasks";
import usePayments from "@/hooks/usePayments";

const DashboardPage = () => {
  const { data: clientsData } = useClients();
  const { data: projectsData } = useProject();
  const { data: tasksData } = useTasks();
  const { data: paymentsData } = usePayments();

  const clients = clientsData || [];
  const projects = projectsData || [];
  const tasks = tasksData || [];
  const payments = paymentsData || [];

  const totalClients = clients.length;
  const activeProjects = projects.filter((p: any) => p.status === "ongoing").length;
  
  const openTasks = tasks.filter((t: any) => t.status !== "done");
  const overdueTasksCount = openTasks.filter((t: any) => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate).getTime() < new Date().getTime();
  }).length;

  const totalRevenue = payments
    .filter((p: any) => p.status === "paid" || p.status === "partial")
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const recentProjects = [...projects].slice().reverse().slice(0, 5);
  const recentPayments = [...payments].slice().reverse().slice(0, 5);
  const activeProjectsList = projects.filter((p: any) => p.status === "ongoing").slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-slate-500 mt-1">across all projects</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-slate-500 mt-1">out of {projects.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Open Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTasks.length}</div>
            <p className={`text-xs mt-1 ${overdueTasksCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
               {overdueTasksCount} overdue
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{totalRevenue > 100000 ? `${(totalRevenue / 100000).toFixed(2)}L` : totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">all-time earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Clients/Projects Table */}
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800 text-slate-100 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 pb-4">
            <CardTitle className="text-lg">Recent Projects</CardTitle>
            <Link href="/projects" className="text-sm text-blue-500 hover:underline">View all →</Link>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/20 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">Client</th>
                    <th className="px-6 py-4 font-medium">Project</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length === 0 ? (
                     <tr>
                       <td colSpan={4} className="text-center py-8 text-slate-500">No projects found.</td>
                     </tr>
                  ) : (
                    recentProjects.map((proj: any) => {
                      const clientName = proj.client?.name || "Unknown Client";
                      
                      return (
                        <tr key={proj._id || proj.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 last:border-0">
                          <td className="px-6 py-4 font-medium flex items-center gap-3 text-slate-200">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                              {clientName.substring(0, 2).toUpperCase()}
                            </div>
                            {clientName}
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-medium">
                            {proj.title}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant="outline"
                              className={`
                                ${proj.status === "ongoing" && "bg-blue-500/10 text-blue-400 border-blue-500/20"}
                                ${proj.status === "paused" && "bg-orange-500/10 text-orange-400 border-orange-500/20"}
                                ${proj.status === "completed" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}
                              `}
                            >
                              {proj.status.charAt(0).toUpperCase() + proj.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-medium">
                             ৳{proj.budget ? proj.budget.toLocaleString() : 0}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base">Recent Payments</CardTitle>
              <Link href="/payments" className="text-sm text-blue-500 hover:underline">View all →</Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                {recentPayments.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No recent payments.</p>
                ) : (
                  recentPayments.map((payment: any) => {
                    const projectInfo = payment.project || {};
                    const clientName = projectInfo.client?.name || "Unknown Client";
                    const isPaid = payment.status === 'paid' || payment.status === 'partial';
                    const isPending = payment.status === 'unpaid';
                    
                    const dateStr = payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "No date";

                    return (
                      <div key={payment.id || payment._id} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPaid ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : isPending ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></div>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{clientName}</p>
                            <p className="text-xs text-slate-400">{dateStr}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-[15px] font-bold text-slate-200">৳{payment.amount.toLocaleString()}</p>
                          <p className={`text-[10px] font-medium uppercase tracking-wider ${isPaid ? 'text-emerald-500' : isPending ? 'text-orange-500' : 'text-rose-500'}`}>
                             {payment.status}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Active Projects Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {activeProjectsList.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-2">No active projects.</p>
                ) : (
                  activeProjectsList.map((project: any) => {
                    const prog = project.progress || 0;
                    return (
                      <div key={project._id || project.id} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">{project.title}</p>
                          <p className="text-xs font-bold text-slate-300">{prog}%</p>
                        </div>
                        <Progress value={prog} className="h-1.5 bg-slate-800/50 [&>div]:bg-blue-500 group-hover:[&>div]:bg-blue-400 transition-all" />
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
