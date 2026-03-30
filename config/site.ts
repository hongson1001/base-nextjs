export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Admin Panel",
  description: "Administration dashboard",
  navItems: [
    {
      label: "Dashboard",
      href: "/",
      icon: "dashboard",
    },
    {
      label: "Users",
      href: "/users",
      icon: "users",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Users",
      href: "/users",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
