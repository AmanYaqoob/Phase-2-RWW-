"use client";

import { useState } from "react";
import { Calendar, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsListView from "@/components/dashboard/bookings/list-view";
import LodgifyCalendarView from "@/components/dashboard/bookings/calendar-view";

export default function BookingsPage() {
  const [view, setView] = useState("list");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
                      <div className="flex items-center gap-2">
          <Button 
            variant={view === "list" ? "default" : "outline"} 
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
                          </Button>
          <Button 
            variant={view === "calendar" ? "default" : "outline"} 
            size="icon"
            onClick={() => setView("calendar")}
          >
            <Calendar className="h-4 w-4" />
            </Button>
          </div>
      </div>

      <Tabs defaultValue={view} value={view} onValueChange={setView} className="w-full">
        <TabsContent value="list" className="mt-0">
          <BookingsListView />
        </TabsContent>
        <TabsContent value="calendar" className="mt-0">
          <LodgifyCalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
