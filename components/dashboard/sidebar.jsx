"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Home, 
  MessageSquare, 
  BarChart3, 
  Tool,
  User
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Properties",
      icon: Home,
      href: "/dashboard/properties",
      active: pathname === "/dashboard/properties" || pathname.startsWith("/dashboard/properties/"),
    },
    {
      label: "Bookings",
      icon: Calendar,
      href: "/dashboard/bookings",
      active: pathname === "/dashboard/bookings",
    },
    {
      label: "Guests",
      icon: Users,
      href: "/dashboard/guests",
      active: pathname === "/dashboard/guests",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      active: pathname === "/dashboard/messages",
    },
    {
      label: "Maintenance",
      icon: Tool,
      href: "/dashboard/maintenance",
      active: pathname === "/dashboard/maintenance",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    }
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto border-r border-border bg-card">
      <div className="p-6">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">Property Owner</h1>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-x-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground py-4 px-6 ${
              route.active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {route.icon && <route.icon className="h-5 w-5" />}
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
