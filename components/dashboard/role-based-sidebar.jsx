"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Building,
  Calendar,
  Users,
  Settings,
  LogOut,
  BarChart3,
  MessageSquare,
  CreditCard,
  HelpCircle,
  PenToolIcon as Tool,
  ClipboardList,
  Store,
  BookOpen,
  FileText,
  ShoppingCart,
  Truck,
  Package,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { UserRoleBadge } from "@/components/user-role-badge"

export function RoleBasedSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  // Define menu items based on role
  const getMenuItems = () => {
    if (!user) return []

    const commonItems = [
      {
        name: "Overview",
        icon: Home,
        path: "/dashboard",
      },
      {
        name: "Messages",
        icon: MessageSquare,
        path: "/dashboard/messages",
      },
      {
        name: "Calendar",
        icon: Calendar,
        path: "/dashboard/calendar",
      },
      {
        name: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ]

    const roleSpecificItems = {
      instructor: [
        {
          name: "Workshops",
          icon: BookOpen,
          path: "/dashboard/workshops",
        },
        {
          name: "Bookings",
          icon: Calendar,
          path: "/dashboard/bookings",
        },
        {
          name: "Students",
          icon: Users,
          path: "/dashboard/students",
        },
        {
          name: "Analytics",
          icon: BarChart3,
          path: "/dashboard/analytics",
        },
      ],
      "property-owner": [
        {
          name: "Properties",
          icon: Building,
          path: "/dashboard/properties",
        },
        {
          name: "Active Bookings",
          icon: Calendar,
          path: "/dashboard/active-bookings",
        },
        {
          name: "Pending Bookings",
          icon: ClipboardList,
          path: "/dashboard/pending-bookings",
        },
        {
          name: "Closed Bookings",
          icon: FileText,
          path: "/dashboard/closed-bookings",
        },
        {
          name: "Maintenance",
          icon: Tool,
          path: "/dashboard/maintenance",
        },
        {
          name: "Payments",
          icon: CreditCard,
          path: "/dashboard/payments",
        },
        {
          name: "Analytics",
          icon: BarChart3,
          path: "/dashboard/analytics",
        },
      ],
      vendor: [
        {
          name: "Products",
          icon: Package,
          path: "/dashboard/products",
        },
        {
          name: "Orders",
          icon: ShoppingCart,
          path: "/dashboard/orders",
        },
        {
          name: "Inventory",
          icon: Store,
          path: "/dashboard/inventory",
        },
        {
          name: "Shipping",
          icon: Truck,
          path: "/dashboard/shipping",
        },
        {
          name: "Invoices",
          icon: FileText,
          path: "/dashboard/invoices",
        },
        {
          name: "Analytics",
          icon: BarChart3,
          path: "/dashboard/analytics",
        },
      ],
    }

    return [...commonItems, ...(roleSpecificItems[user.role] || [])]
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Retreat</span>{" "}
          <span className="group-data-[collapsible=icon]:hidden">World Wide</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Dashboard</h2>
          <SidebarMenu>
            {getMenuItems().map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.name}>
                  <Link href={item.path}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Support</h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/help")} tooltip="Help">
                <Link href="/dashboard/help">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                tooltip="Logout"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              {user?.role && <UserRoleBadge role={user.role} />}
            </div>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export function DashboardSidebarTrigger() {
  return <SidebarTrigger />
}

export function DashboardSidebarWrapper({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <RoleBasedSidebar />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </SidebarProvider>
  )
}
