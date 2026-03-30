export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const sidebarNav: NavGroup[] = [
  {
    title: "MARKETING",
    items: [
      { label: "Dashboard", href: "/", icon: "dashboard" },
      { label: "Marketplace", href: "/marketplace", icon: "marketplace" },
      { label: "Orders", href: "/orders", icon: "orders" },
      { label: "Tracking", href: "/tracking", icon: "tracking" },
      { label: "Customers", href: "/customers", icon: "customers" },
      { label: "Discounts", href: "/discounts", icon: "discounts" },
    ],
  },
  {
    title: "PAYMENTS",
    items: [
      { label: "Ledger", href: "/ledger", icon: "ledger" },
      { label: "Taxes", href: "/taxes", icon: "taxes" },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ label: "Settings", href: "/settings", icon: "settings" }],
  },
];
