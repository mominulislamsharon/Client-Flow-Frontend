"use client";

import {
  CheckSquare,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-5">
      <h1 className="text-xl font-bold mb-8">ClientFlow</h1>
      <nav className="space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/clients"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <Users size={18} />
          Clients
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <FolderKanban size={18} />
          Projects
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <CheckSquare size={18} />
          Tasks
        </Link>

        <Link
          href="/payments"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <CreditCard size={18} />
          Payments
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
