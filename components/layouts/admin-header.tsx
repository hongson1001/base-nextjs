"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { useAppSelector } from "@/stores/hooks";
import { useLogoutMutation } from "@/stores/api/auth-api";

export function AdminHeader() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch {
      // Error handled by auth slice
    }
  };

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-divider bg-background/70 px-6 backdrop-blur-md">
      <ThemeSwitch />

      <div ref={menuRef} className="relative">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {initials}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-10 z-50 w-48 rounded-lg border border-default-200 bg-content1 py-1 shadow-lg">
            <div className="border-b border-default-200 px-3 py-2">
              <p className="text-sm font-semibold">
                {user?.fullName ?? "User"}
              </p>
              <p className="text-xs text-default-500">{user?.email}</p>
            </div>
            <button
              className="w-full px-3 py-2 text-left text-sm hover:bg-default-100"
              onClick={() => {
                setMenuOpen(false);
                router.push("/settings");
              }}
            >
              Settings
            </button>
            <button
              className="w-full px-3 py-2 text-left text-sm text-danger hover:bg-default-100"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
