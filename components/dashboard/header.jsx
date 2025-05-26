"use client";
import { useState } from "react";
import { Menu, Bell, User, LogOut, Settings, UserCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Sidebar from "./sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "New Booking Request",
    message: "You have a new booking request for Mountain Retreat Cabin",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment of $350 received for Lakeside Villa",
    time: "2 hours ago",
    read: false
  },
  {
    id: 3,
    title: "Message from Guest",
    message: "John Smith sent you a message about their upcoming stay",
    time: "Yesterday",
    read: true
  }
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState(mockNotifications);

  // Function to get the current page title based on pathname
  const getPageTitle = () => {
    const path = pathname.split("/").pop();
    if (path === "dashboard") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    router.push("/login");
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="border-b border-border">
      <div className="flex h-16 items-center px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
          </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="ml-2 md:ml-0 font-semibold text-lg">
          {getPageTitle()}
                  </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background border shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border/50">
                <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs h-8 hover:bg-muted"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-muted/80 cursor-pointer transition-colors border-b border-border/50 last:border-b-0 ${!notification.read ? 'bg-muted/30 border-l-2 border-l-primary' : 'bg-background'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
      </div>
                      <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground bg-background">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 bg-background">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/notifications">View all notifications</Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg">
              <div className="flex items-center p-3 bg-background border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Alex Johnson</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer flex items-center py-2 px-3 hover:bg-muted/80 transition-colors"
                onClick={handleProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer flex items-center py-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
