"use client"

import { useState, useEffect } from "react"
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
  Mountain,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRoleBadge } from "@/components/user-role-badge"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function MountainSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
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

  const getRoleTitle = () => {
    if (!user) return ""

    const roles = {
      instructor: "Instructor",
      "property-owner": "Property Owner",
      vendor: "Vendor",
    }

    return roles[user.role] || "User"
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0 border-b-0">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=600')" }}
          />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <span className="group-data-[collapsible=icon]:hidden">Retreat</span> <Mountain className="h-6 w-6" />
            </Link>
            <SidebarTrigger className="bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden">
                <p className="font-medium">{user?.name || "User"}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/80">{getRoleTitle()}</p>
                  {user?.role && <UserRoleBadge role={user.role} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2 group-data-[collapsible=icon]:hidden">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-md bg-gray-100 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-3 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-tight">Dashboard</h2>
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
          <h2 className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-tight">Support</h2>
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
    </Sidebar>
  )
}

export function MountainSidebarTrigger() {
  return <SidebarTrigger />
}

export function MountainSidebarWrapper({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <MountainSidebar />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </SidebarProvider>
  )
}
