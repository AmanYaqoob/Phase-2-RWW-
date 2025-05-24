"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, Users, DollarSign } from "lucide-react"

// Mock booking data for calendar
const mockCalendarBookings = [
  {
    id: "BK001",
    guestName: "Sarah Johnson",
    property: "Mountain View Retreat",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    guests: 4,
    total: 1250,
    status: "confirmed"
  },
  {
    id: "BK002",
    guestName: "Michael Chen",
    property: "Lakeside Wellness Center",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    guests: 2,
    total: 890,
    status: "pending"
  },
  {
    id: "BK004",
    guestName: "David Thompson",
    property: "Coastal Yoga Sanctuary",
    checkIn: "2024-01-25",
    checkOut: "2024-01-30",
    guests: 6,
    total: 1850,
    status: "confirmed"
  }
]

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case "confirmed":
      return "Active"
    case "pending":
      return "Pending"
    case "completed":
      return "Closed"
    case "cancelled":
      return "Cancelled"
    default:
      return status.charAt(0).toUpperCase() + status.slice(1)
  }
}

export default function LodgifyCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)) // January 2024

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getBookingsForDate = (date) => {
    return mockCalendarBookings.filter(booking => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return date >= checkIn && date < checkOut
    })
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-24"></div>
              }

              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const bookings = getBookingsForDate(date)
              const isToday = new Date().toDateString() === date.toDateString()

              return (
                <div
                  key={day}
                  className={`h-24 border rounded-lg p-2 ${
                    isToday ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? "text-blue-600" : "text-gray-900"
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {bookings.slice(0, 2).map(booking => (
                      <div
                        key={booking.id}
                        className={`text-xs px-2 py-1 rounded text-center ${getStatusColor(booking.status)}`}
                        title={`${booking.guestName} - ${booking.property}`}
                      >
                        {booking.guestName.split(' ')[0]}
                      </div>
                    ))}
                    {bookings.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{bookings.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Bookings This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCalendarBookings
              .filter(booking => {
                const checkIn = new Date(booking.checkIn)
                return checkIn.getMonth() === currentDate.getMonth() &&
                       checkIn.getFullYear() === currentDate.getFullYear()
              })
              .map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusLabel(booking.status)}
                    </Badge>
                    <div>
                      <p className="font-medium">{booking.guestName}</p>
                      <p className="text-sm text-gray-600">{booking.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {booking.guests}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${booking.total}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}