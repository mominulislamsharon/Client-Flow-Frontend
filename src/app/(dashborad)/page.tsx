import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase, CheckCircle2, DollarSign } from "lucide-react";

// dumy data api just 

const recentClients = [
  { id: 1, name: "Rahim & Co.", project: "E-commerce", status: "Active", value: "$45,000" },
  { id: 2, name: "ShopKorbo", project: "Mobile App", status: "Pending", value: "$80,000" },
  { id: 3, name: "DhakaLog", project: "Dashboard", status: "Active", value: "$32,000" },
  { id: 4, name: "NovaBit Ltd.", project: "API Work", status: "Done", value: "$60,000" },
  { id: 5, name: "TechStar BD", project: "CRM System", status: "Review", value: "$95,000" },
];

const recentPayments = [
  { id: 1, name: "Rahim & Co.", date: "Apr 9, 2026", amount: "৳20,000", status: "Paid" },
  { id: 2, name: "ShopKorbo", date: "Apr 7, 2026", amount: "৳40,000", status: "Pending" },
  { id: 3, name: "TechStar BD", date: "Overdue", amount: "৳45,000", status: "Overdue" },
];

const projectProgress = [
  { name: "E-commerce site", progress: 72 },
  { name: "Mobile App", progress: 45 },
  { name: "CRM System", progress: 20 },
  { name: "API Integration", progress: 100 },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-emerald-400 mt-1">↑ 4 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-emerald-400 mt-1">↑ 2 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Open Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-rose-400 mt-1">8 overdue</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Revenue (BDT)</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳2.4L</div>
            <p className="text-xs text-emerald-400 mt-1">↑ 12% vs last mo.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card className="lg:col-span-2 bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Clients</CardTitle>
            <a href="#" className="text-sm text-blue-500 hover:underline">View all →</a>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClients.map((client) => (
                    <tr key={client.id} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                      <td className="px-4 py-3 font-medium flex items-center gap-3 text-slate-200">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        {client.name}
                      </td>
                      <td className="px-4 py-3 text-slate-300">{client.project}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={client.status === "Active" || client.status === "Done" ? "default" : "secondary"}
                          className={`
                            ${client.status === "Active" && "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}
                            ${client.status === "Pending" && "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"}
                            ${client.status === "Done" && "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"}
                            ${client.status === "Review" && "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"}
                          `}
                        >
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{client.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Payments</CardTitle>
              <a href="#" className="text-sm text-blue-500 hover:underline">View all →</a>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex flex-col gap-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${payment.status === 'Paid' ? 'bg-emerald-500' : payment.status === 'Pending' ? 'bg-orange-500' : 'bg-rose-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{payment.name}</p>
                        <p className="text-xs text-slate-400">{payment.date}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-200">{payment.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Progress */}
          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="flex flex-col gap-5">
                {projectProgress.map((project, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-slate-300">{project.name}</p>
                      <p className="text-xs font-bold text-slate-300">{project.progress}%</p>
                    </div>
                    <Progress value={project.progress} className="h-1.5 bg-slate-800" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
