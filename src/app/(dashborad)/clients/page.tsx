"use client";
import React, { useState } from "react";
import ClientTable from "@/components/clients/ClientTable";
import CreateCleintModal from "@/components/clients/CreateCleintModal";
import { Input } from "@/components/ui/input";

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Clients</h1>
          <p className="text-sm text-slate-400">Total active clients overview</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search clients..."
            className="w-full sm:w-64 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CreateCleintModal />
        </div>
      </div>
      <ClientTable searchTerm={searchTerm} />
    </div>
  );
};

export default ClientsPage;
