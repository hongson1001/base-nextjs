"use client";

import { SearchIcon } from "@/components/icons";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title = "Dashboard" }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-default-200 bg-background px-6">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-400" />
          <input
            className="h-9 w-64 rounded-lg border border-default-200 bg-default-100 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-default-400 focus:border-primary"
            placeholder="Search..."
            type="text"
          />
        </div>

        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="relative text-default-500 hover:text-foreground transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
