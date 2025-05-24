"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock notifications
const initialNotifications = [
  {
    id: 1,
    title: "New Booking Request",
    message: "You have a new booking request for Mountain Retreat Cabin",
    time: "10 minutes ago",
    read: false,
    type: "booking"
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment of $350 received for Lakeside Villa",
    time: "2 hours ago",
    read: false,
    type: "payment"
  },
  {
    id: 3,
    title: "Message from Guest",
    message: "John Smith sent you a message about their upcoming stay",
    time: "Yesterday",
    read: true,
    type: "message"
  },
  {
    id: 4,
    title: "Booking Confirmed",
    message: "Booking for Desert Oasis Retreat has been confirmed",
    time: "2 days ago",
    read: true,
    type: "booking"
  },
  {
    id: 5,
    title: "New Review",
    message: "Emma Johnson left a 5-star review for Lakeside Villa",
    time: "3 days ago",
    read: true,
    type: "review"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex overflow-x-auto pb-2 space-x-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={filter === "unread" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Unread
          {unreadCount > 0 && (
            <Badge className="ml-1" variant="secondary">{unreadCount}</Badge>
          )}
        </Button>
        <Button 
          variant={filter === "booking" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("booking")}
        >
          Bookings
        </Button>
        <Button 
          variant={filter === "payment" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("payment")}
        >
          Payments
        </Button>
        <Button 
          variant={filter === "message" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("message")}
        >
          Messages
        </Button>
        <Button 
          variant={filter === "review" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("review")}
        >
          Reviews
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            {filter === "all" 
              ? "All notifications" 
              : filter === "unread" 
                ? "Unread notifications" 
                : `${filter.charAt(0).toUpperCase() + filter.slice(1)} notifications`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length > 0 ? (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors ${!notification.read ? 'bg-muted/50 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium">{notification.title}</h5>
                    {!notification.read && (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-1">No notifications found</p>
              <p className="text-sm">
                {filter === "all" 
                  ? "You don't have any notifications yet" 
                  : `You don't have any ${filter === "unread" ? "unread" : filter} notifications`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}