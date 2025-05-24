"use client"

import { useState } from "react"
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal, Plus, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("month")

  const events = [
    {
      id: 1,
      title: "Yoga Retreat",
      start: addDays(new Date(), 1),
      end: addDays(new Date(), 8),
      property: "Oceanfront Villa Retreat",
      guests: 15,
      type: "booking",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Maintenance: Fix AC",
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 3),
      property: "Oceanfront Villa Retreat",
      type: "maintenance",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Corporate Workshop",
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 7),
      property: "Mountain Yoga Sanctuary",
      guests: 20,
      type: "booking",
      status: "confirmed",
    },
    {
      id: 4,
      title: "Property Inspection",
      start: addDays(new Date(), 10),
      end: addDays(new Date(), 10),
      property: "Desert Wellness Center",
      type: "inspection",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Art Retreat",
      start: addDays(new Date(), 15),
      end: addDays(new Date(), 20),
      property: "Lakeside Creative Workshop",
      guests: 12,
      type: "booking",
      status: "pending",
    },
  ]

  const getEventsByDate = (date) => {
    return events.filter(
      (event) => isSameDay(date, event.start) || isSameDay(date, event.end) || (date > event.start && date < event.end),
    )
  }

  const getEventColor = (type) => {
    switch (type) {
      case "booking":
        return "bg-primary text-primary-foreground"
      case "maintenance":
        return "bg-orange-500 text-white"
      case "inspection":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "scheduled":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center py-2 font-medium text-sm">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          const dayEvents = getEventsByDate(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={i}
              className={`min-h-[120px] p-1 border rounded-md ${
                isCurrentMonth ? "bg-white" : "bg-muted/30"
              } ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}`}
            >
              <div className="text-right p-1">
                <span
                  className={`text-sm font-medium ${
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                  } ${isToday ? "bg-primary text-primary-foreground rounded-full px-1.5 py-0.5" : ""}`}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="space-y-1 mt-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate ${getEventColor(event.type)}`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const weekEnd = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, i) => {
          const dayEvents = getEventsByDate(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div key={i} className="space-y-2">
              <div
                className={`text-center p-2 font-medium ${
                  isToday ? "bg-primary text-primary-foreground rounded-md" : ""
                }`}
              >
                <div>{format(day, "EEE")}</div>
                <div className="text-2xl">{format(day, "d")}</div>
              </div>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded-md ${getEventColor(event.type)} hover:opacity-80 cursor-pointer transition-opacity`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs mt-1 flex items-center">
                      <div className={`h-2 w-2 rounded-full ${getStatusDot(event.status)} mr-1`}></div>
                      {event.property}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderAgendaView = () => {
    const today = new Date()
    const nextThirtyDays = addDays(today, 30)
    const filteredEvents = events.filter((event) => event.start <= nextThirtyDays)

    // Group events by date
    const eventsByDate = {}
    filteredEvents.forEach((event) => {
      const dateKey = format(event.start, "yyyy-MM-dd")
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = []
      }
      eventsByDate[dateKey].push(event)
    })

    return (
      <div className="space-y-6">
        {Object.keys(eventsByDate)
          .sort()
          .map((dateKey) => {
            const date = new Date(dateKey)
            const events = eventsByDate[dateKey]
            const isToday = isSameDay(date, today)

            return (
              <div key={dateKey} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1 rounded-md font-medium ${
                      isToday ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {format(date, "EEE, MMM d")}
                  </div>
                  {isToday && <Badge>Today</Badge>}
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-muted">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={`h-10 w-1 rounded-full ${getEventColor(event.type)}`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.property}</div>
                      </div>
                      <div className="text-sm">
                        {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                      </div>
                      <div className={`h-3 w-3 rounded-full ${getStatusDot(event.status)}`} title={event.status}></div>
                      <Button variant="ghost" size="icon" className="hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your bookings, maintenance, and events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hover:bg-muted">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(view === "month" ? subMonths(currentDate, 1) : addDays(currentDate, -7))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(view === "month" ? addMonths(currentDate, 1) : addDays(currentDate, 7))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {view === "month"
                  ? format(currentDate, "MMMM yyyy")
                  : `${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={setView} className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="oceanfront">Oceanfront Villa Retreat</SelectItem>
                  <SelectItem value="mountain">Mountain Yoga Sanctuary</SelectItem>
                  <SelectItem value="desert">Desert Wellness Center</SelectItem>
                  <SelectItem value="lakeside">Lakeside Creative Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            {view === "month" && renderMonthView()}
            {view === "week" && renderWeekView()}
            {view === "agenda" && renderAgendaView()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
