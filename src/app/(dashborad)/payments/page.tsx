"use client";

import React from "react";
import CreatePaymentModal from "@/components/payments/CreatePaymentModal";
import usePayments from "@/hooks/usePayments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const PaymentsPage = () => {
  const { data } = usePayments();
  const payments = data || [];

  const totalReceived = payments
    .filter((p) => p.status === "paid" || p.status === "partial")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter((p) => p.status === "unpaid" || p.status === "partial");
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const overduePayments = payments.filter((p) => p.status === "overdue");
  const overdueAmount = overduePayments.reduce((sum, p) => sum + p.amount, 0);

  const currentMonth = new Date().getMonth();
  const thisMonthReceived = payments
    .filter((p) => (p.status === "paid" || p.status === "partial") && p.paymentDate && new Date(p.paymentDate).getMonth() === currentMonth)
    .reduce((sum, p) => sum + p.amount, 0);

  const methods = ["Bank Transfer", "bKash", "Nagad", "Cash"];
  const methodData = methods.map((method) => {
    const list = payments.filter((p) => p.method === method);
    const amount = list.reduce((sum, p) => sum + p.amount, 0);
    return { method, amount };
  });
  
  const maxMethodAmount = Math.max(...methodData.map(m => m.amount), 1); 
  const last4Months = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (3 - i));
    return d.getMonth();
  });
  
  const monthlyTrendData = last4Months.map(mIndex => {
    const monthPayments = payments.filter(p => 
      (p.status === "paid" || p.status === "partial") && 
      p.paymentDate && 
      new Date(p.paymentDate).getMonth() === mIndex
    );
    const amount = monthPayments.reduce((sum, p) => sum + p.amount, 0);
    return { 
      name: new Date(2000, mIndex).toLocaleString('default', { month: 'long' }), 
      amount,
      isCurrent: mIndex === currentMonth 
    };
  });
  
  const maxMonthlyAmount = Math.max(...monthlyTrendData.map(m => m.amount), 1); 

  const handleExportPDF = () => {
    if (payments.length === 0) return;

    const doc = new jsPDF();
    
    const tableData = payments.map(p => {
      const projectInfo = typeof p.project === 'object' && p.project !== null ? p.project : null;
      const clientInfo = projectInfo && typeof projectInfo.client === 'object' && projectInfo.client !== null ? projectInfo.client : null;
      
      const invoice = p._id ? `#INV-${p._id.slice(-4).toUpperCase()}` : `#INV-ERR`;
      const client = clientInfo?.name || "Unknown";
      const amount = `BDT ${p.amount.toLocaleString()}`;
      const date = p.paymentDate ? new Date(p.paymentDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
      const method = p.method || "-";
      const status = p.status.charAt(0).toUpperCase() + p.status.slice(1);

      return [invoice, client, amount, date, method, status];
    });

    doc.setFontSize(18);
    doc.text("Payment History Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US')}`, 14, 21);
    
    autoTable(doc, {
      startY: 28,
      head: [["Invoice", "Client", "Amount", "Date", "Method", "Status"]],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42] } 
    });

    doc.save(`payments_export_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6">
 
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Payments</h1>
          <p className="text-sm text-slate-400">
            {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} overview
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-slate-900 border-slate-700 text-slate-200"
            onClick={handleExportPDF}
            disabled={payments.length === 0}
          >
            Export
          </Button>
          <CreatePaymentModal />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardContent className="p-4 md:p-6 flex flex-col gap-1">
            <span className="text-sm text-slate-400">Total Received</span>
            <span className="text-2xl md:text-3xl font-bold">৳{totalReceived.toLocaleString()}</span>
            <span className="text-xs text-emerald-400 mt-1">↑ This month updated</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardContent className="p-4 md:p-6 flex flex-col gap-1">
            <span className="text-sm text-slate-400">Pending</span>
            <span className="text-2xl md:text-3xl font-bold">৳{pendingAmount.toLocaleString()}</span>
            <span className="text-xs text-orange-400 mt-1">{pendingPayments.length} invoices</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardContent className="p-4 md:p-6 flex flex-col gap-1">
            <span className="text-sm text-slate-400">Overdue</span>
            <span className="text-2xl md:text-3xl font-bold text-rose-400">৳{overdueAmount.toLocaleString()}</span>
            <span className="text-xs text-rose-500 mt-1">{overduePayments.length} invoices</span>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardContent className="p-4 md:p-6 flex flex-col gap-1">
            <span className="text-sm text-slate-400">This Month</span>
            <span className="text-2xl md:text-3xl font-bold">৳{thisMonthReceived.toLocaleString()}</span>
            <span className="text-xs text-blue-400 mt-1">Current period</span>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 flex flex-col">
          <Card className="bg-slate-900 border-slate-800 text-slate-100 flex-1">
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <CardTitle className="text-lg">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="w-full text-sm text-left">
                  <TableHeader className="bg-slate-800/20">
                    <TableRow className="border-b border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 font-medium px-4 md:px-6 py-4">Client</TableHead>
                      <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Invoice</TableHead>
                      <TableHead className="text-slate-400 font-medium px-6 py-4">Amount</TableHead>
                      <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Date</TableHead>
                      <TableHead className="text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Method</TableHead>
                      <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length === 0 ? (
                       <TableRow className="border-b border-slate-800/50">
                         <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                           No payments recorded.
                         </TableCell>
                       </TableRow>
                    ) : (
                      payments.map((p) => {
                        const projectInfo = typeof p.project === 'object' && p.project !== null ? p.project : null;
                        const clientInfo = projectInfo && typeof projectInfo.client === 'object' && projectInfo.client !== null ? projectInfo.client : null;
                        const invoiceCode = p._id ? `#INV-${p._id.slice(-4).toUpperCase()}` : `#INV-ERR`;
                        const dateString = p.paymentDate ? new Date(p.paymentDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-";

                        return (
                          <TableRow key={p._id || p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                            
                            <TableCell className="px-4 md:px-6 py-4 font-medium text-slate-200">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                    {clientInfo?.name?.substring(0, 2).toUpperCase() || "??"}
                                  </div>
                                  <span>{clientInfo?.name || "Unknown"}</span>
                                </div>
                                <div className="flex flex-col gap-1 mt-2 sm:hidden">
                                  <span className="text-xs text-slate-500">{invoiceCode} • {dateString}</span>
                                  <span className="text-xs text-slate-500">Method: {p.method || "-"}</span>
                                  <div className="mt-1">
                                    <Badge 
                                      variant="outline"
                                      className={`text-[10px] px-1.5 py-0
                                        ${p.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                        ${p.status === 'unpaid' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                                        ${p.status === 'partial' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                        ${p.status === 'overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                                      `}
                                    >
                                      {p.status === 'unpaid' ? 'Pending' : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="px-6 py-4 text-slate-400 hidden sm:table-cell">
                              {invoiceCode}
                            </TableCell>

                            <TableCell className="px-6 py-4 font-semibold text-slate-200">
                              ৳{p.amount.toLocaleString()}
                            </TableCell>

                            <TableCell className="px-6 py-4 text-slate-400 hidden sm:table-cell">
                              {dateString}
                            </TableCell>

                            <TableCell className="px-6 py-4 text-slate-400 hidden md:table-cell">
                              {p.method || "-"}
                            </TableCell>

                            <TableCell className="px-6 py-4 hidden sm:table-cell">
                              <Badge 
                                variant="outline"
                                className={`
                                  ${p.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                  ${p.status === 'unpaid' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                                  ${p.status === 'partial' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                  ${p.status === 'overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                                `}
                              >
                                {p.status === 'unpaid' ? 'Pending' : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                              </Badge>
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
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              
              {methodData.map((m, i) => {
                const percentage = m.amount > 0 ? Math.round((m.amount / maxMethodAmount) * 100) : 0;
                const colors = [
                   "[&>div]:bg-blue-500",
                   "[&>div]:bg-emerald-500",
                   "[&>div]:bg-orange-500",
                   "[&>div]:bg-slate-500"
                ];
                return (
                  <div key={m.method} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{m.method}</span>
                      <span className="text-slate-400">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className={`h-1.5 bg-slate-800/50 ${colors[i % colors.length]}`} />
                  </div>
                );
              })}

            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 text-slate-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Monthly trend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              
              {monthlyTrendData.map((m) => {
                const percentage = m.amount > 0 ? Math.round((m.amount / maxMonthlyAmount) * 100) : 0;
                return (
                  <div key={m.name} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">
                        {m.name} {m.isCurrent ? '(so far)' : ''}
                      </span>
                      <span className="text-slate-400">
                         {m.amount > 0 ? `৳${(m.amount/1000).toFixed(1)}K` : '৳0'}
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={`h-1.5 bg-slate-800/50 ${m.isCurrent ? '[&>div]:bg-blue-600' : '[&>div]:bg-blue-400'}`} 
                    />
                  </div>
                );
              })}

            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
