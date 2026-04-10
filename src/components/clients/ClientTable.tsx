/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Client } from "@/types/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useClients from "@/hooks/useClients";
import { Building, Mail, Phone } from "lucide-react";

interface ClientTableProps {
  searchTerm?: string;
}

const ClientTable = ({ searchTerm = "" }: ClientTableProps) => {
  const { data, isLoading, isError } = useClients() as any;
  const clients: Client[] = data?.data || [];

  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.company?.toLowerCase().includes(term) ||
      client.phone?.toLowerCase().includes(term)
    );
  });

  if (isLoading) return <div className="text-slate-400 p-4">Loading clients...</div>;
  if (isError) return <div className="text-rose-400 p-4">Error loading clients. Please try again.</div>;

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader className="border-b border-slate-800/50 pb-4">
        <CardTitle className="text-lg">All Clients</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full text-sm text-left">
            <TableHeader className="bg-slate-800/20">
              <TableRow className="border-b border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium px-4 md:px-6 py-4">Client List</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden sm:table-cell">Company</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden md:table-cell">Email Address</TableHead>
                <TableHead className="text-slate-400 font-medium px-6 py-4 hidden lg:table-cell">Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients?.length === 0 ? (
                <TableRow className="border-b border-slate-800/50 hover:bg-slate-800/50">
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    No clients found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients?.map((client) => (
                  <TableRow key={client.id} className="border-b border-slate-800/50 hover:bg-slate-800/20">

                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-300">
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-200 text-base">{client.name}</span>
                          <span className="text-xs text-slate-400 sm:hidden mt-1 flex items-center gap-1.5"><Building className="w-3 h-3 text-slate-500" /> {client.company || "No Company"}</span>
                          <span className="text-xs text-slate-400 md:hidden mt-0.5 flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-500" /> {client.email}</span>
                          <span className="text-xs text-slate-400 lg:hidden mt-0.5 flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-500" /> {client.phone || "No Phone"}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-slate-300 hidden sm:table-cell">
                      {client.company || <span className="text-slate-600">N/A</span>}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-slate-300 hidden md:table-cell">
                      {client.email}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-slate-300 hidden lg:table-cell">
                      {client.phone || <span className="text-slate-600">N/A</span>}
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientTable;
