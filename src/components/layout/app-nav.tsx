"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const APP_NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/payments", label: "Payments", icon: CreditCard },
] as const;

type AppNavLinksProps = {
  onNavigate?: () => void;
  className?: string;
};

export function AppNavLinks({ onNavigate, className }: AppNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-1", className)}>
      {APP_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
              isActive && "bg-slate-800 text-white"
            )}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
