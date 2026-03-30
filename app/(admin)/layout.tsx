"use client";

import { AuthProvider } from "@/components/layouts/auth-provider";
import { RealtimeProvider } from "@/components/layouts/realtime-provider";
import { AdminNav } from "@/components/layouts/admin-nav";
import { AdminHeader } from "@/components/layouts/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RealtimeProvider>
        <div className="flex min-h-screen">
          <AdminNav />
          <div className="flex flex-1 flex-col">
            <AdminHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </RealtimeProvider>
    </AuthProvider>
  );
}
