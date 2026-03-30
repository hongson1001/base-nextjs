"use client";

import {
  Avatar,
  AvatarFallback,
  Dropdown,
  DropdownTrigger,
  DropdownPopover,
  DropdownMenu,
  DropdownItem,
  Badge,
  BadgeAnchor,
  BadgeLabel,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import { useAppSelector } from "@/stores/hooks";
import { useLogoutMutation } from "@/stores/api/auth-api";

export function AdminHeader() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();

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

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-divider bg-background/70 px-6 backdrop-blur-md">
      <ThemeSwitch />

      <Badge color="danger" size="sm">
        <BadgeAnchor>
          <button
            aria-label="Notifications"
            className="text-default-500 hover:text-foreground transition-colors"
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
          </button>
        </BadgeAnchor>
        <BadgeLabel>3</BadgeLabel>
      </Badge>

      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly className="rounded-full" variant="ghost">
            <Avatar size="sm">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownTrigger>
        <DropdownPopover>
          <DropdownMenu>
            <DropdownItem id="profile-info" textValue="Profile info">
              <div className="py-1">
                <p className="font-semibold">{user?.fullName ?? "User"}</p>
                <p className="text-sm text-default-500">{user?.email}</p>
              </div>
            </DropdownItem>
            <DropdownItem
              id="settings"
              onAction={() => router.push("/settings")}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              className="text-danger"
              id="logout"
              onAction={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </DropdownPopover>
      </Dropdown>
    </header>
  );
}
