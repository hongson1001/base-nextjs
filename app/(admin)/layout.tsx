import { AdminLayout } from "@/components/layouts/admin";

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
