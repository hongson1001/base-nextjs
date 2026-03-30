"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { sidebarNav } from "./sidebar-config";
import { sidebarIcons } from "./sidebar-icons";

import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "flex h-screen shrink-0 flex-col border-r border-default-200 bg-background transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* Header: Logo + Toggle */}
      <div
        className={clsx(
          "flex h-16 items-center border-b border-default-200 px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link className="flex items-center gap-2" href="/">
          <Logo size={28} />
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">App</span>
          )}
        </Link>
        <button
          aria-label="Toggle sidebar"
          className="text-default-400 hover:text-foreground transition-colors"
          onClick={onToggle}
        >
          <svg
            className={clsx(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {sidebarNav.map((group) => (
          <div key={group.title} className="mb-4">
            {/* Group title - hidden when collapsed */}
            {!collapsed && (
              <p className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-wider text-default-400">
                {group.title}
              </p>
            )}
            {/* Collapsed: show first letter as group separator */}
            {collapsed && (
              <p className="mb-1 text-center text-[10px] font-semibold text-default-300">
                {group.title[0]}
              </p>
            )}

            <ul className="flex flex-col gap-0.5 px-2">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                const icon = sidebarIcons[item.icon] ?? (
                  <div className="h-5 w-5" />
                );

                return (
                  <li key={item.href}>
                    <Link
                      className={clsx(
                        "group flex items-center rounded-lg transition-colors",
                        collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-default-600 hover:bg-default-100 hover:text-foreground",
                      )}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                    >
                      <span
                        className={clsx("shrink-0", isActive && "text-primary")}
                      >
                        {icon}
                      </span>
                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: Dark mode + User */}
      <div className="border-t border-default-200 p-3">
        {/* Dark mode toggle */}
        <div
          className={clsx(
            "mb-3 flex items-center",
            collapsed ? "justify-center" : "gap-2 px-1",
          )}
        >
          <ThemeSwitch />
          {!collapsed && (
            <span className="text-sm text-default-500">Dark mode</span>
          )}
        </div>

        {/* User info */}
        <div
          className={clsx(
            "flex items-center rounded-lg",
            collapsed ? "justify-center" : "gap-3 px-1",
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            U
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">User</p>
              <p className="truncate text-xs text-default-400">user@app.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
