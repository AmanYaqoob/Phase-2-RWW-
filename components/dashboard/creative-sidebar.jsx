"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserRoleBadge } from "@/components/user-role-badge"

export function CreativeSidebar() {
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

  const getRoleColor = () => {
    if (!user) return "bg-gradient-to-r from-gray-700 to-gray-900"

    const roleColors = {
      instructor: "bg-gradient-to-r from-blue-600 to-blue-800",
      "property-owner": "bg-gradient-to-r from-red-600 to-red-800",
      vendor: "bg-gradient-to-r from-purple-600 to-purple-800",
    }

    return roleColors[user.role] || "bg-gradient-to-r from-gray-700 to-gray-900"
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: {
        duration: 0.3,
      },
    },
    collapsed: {
      width: "80px",
      transition: {
        duration: 0.3,
      },
    },
  }

  const mobileSidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const itemVariants = {
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={toggleMobileSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileSidebar}
              />
              <motion.div
                className="fixed top-0 left-0 bottom-0 w-[280px] z-50 bg-background border-r"
                variants={mobileSidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col h-full">
                  <div className={`${getRoleColor()} p-6 text-white`}>
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-6">
                      <span>Retreat</span> World Wide
                    </Link>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name || "User"}</p>
                        <p className="text-sm text-white/80">{getRoleTitle()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 mb-6">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full h-10 pl-10 pr-4 rounded-md bg-muted text-sm"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 absolute left-3 top-3 text-muted-foreground"
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

                    <div className="px-4 mb-2">
                      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Dashboard
                      </h2>
                    </div>

                    <nav className="space-y-1 px-2">
                      {getMenuItems().map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive(item.path)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>

                    <div className="px-4 mt-6 mb-2">
                      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Support</h2>
                    </div>

                    <nav className="space-y-1 px-2">
                      <Link
                        href="/dashboard/help"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-foreground hover:bg-muted"
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        <HelpCircle className="h-5 w-5" />
                        <span>Help & Support</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.div
          className="h-screen sticky top-0 border-r bg-background flex flex-col"
          variants={sidebarVariants}
          initial={isCollapsed ? "collapsed" : "expanded"}
          animate={isCollapsed ? "collapsed" : "expanded"}
        >
          <div className={`${getRoleColor()} p-6 text-white relative`}>
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                {!isCollapsed && <span>Retreat</span>} World Wide
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-4 top-6 bg-background border rounded-full shadow-md text-foreground hover:bg-muted"
                onClick={toggleSidebar}
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`}
                />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <motion.div variants={itemVariants} initial="collapsed" animate="expanded">
                  <p className="font-medium">{user?.name || "User"}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white/80">{getRoleTitle()}</p>
                    {user?.role && <UserRoleBadge role={user.role} />}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {!isCollapsed && (
              <motion.div className="px-4 mb-6" variants={itemVariants} initial="collapsed" animate="expanded">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-10 pl-10 pr-4 rounded-md bg-muted text-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute left-3 top-3 text-muted-foreground"
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
              </motion.div>
            )}

            <div className="px-4 mb-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {!isCollapsed ? "Dashboard" : ""}
              </h2>
            </div>

            <nav className="space-y-1 px-2">
              {getMenuItems().map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive(item.path) ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>

            <div className="px-4 mt-6 mb-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {!isCollapsed ? "Support" : ""}
              </h2>
            </div>

            <nav className="space-y-1 px-2">
              <Link
                href="/dashboard/help"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-foreground hover:bg-muted ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                {!isCollapsed && <span>Help & Support</span>}
              </Link>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left text-red-600 hover:bg-red-50 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  )
}

export function CreativeSidebarWrapper({ children }) {
  return (
    <div className="flex min-h-screen">
      <CreativeSidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
