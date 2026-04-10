"use client";

import { AppNavLinks } from "./app-nav";

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-5">
      <h1 className="text-xl font-bold mb-8 text-slate-100">ClientFlow</h1>
      <AppNavLinks />
    </aside>
  );
};

export default Sidebar;
