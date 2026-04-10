"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppNavLinks } from "./app-nav";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="h-16 shrink-0 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-200 shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold text-slate-100 truncate">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-sm text-slate-400 hidden sm:inline">
            Welcome back
          </span>
        </div>
      </header>

      {menuOpen ? (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[min(85vw,16rem)] flex-col border-r border-slate-800 bg-slate-900 p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between gap-2">
              <span className="text-xl font-bold text-slate-100">ClientFlow</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-300 shrink-0"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AppNavLinks onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
