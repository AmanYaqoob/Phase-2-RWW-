"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, DollarSign, Search, Filter } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: "BK001",
    guestName: "Sarah Johnson",
    property: "Mountain View Retreat",
    checkIn: "2024-01-15",
    checkOut: "2024-01-20",
    guests: 4,
    total: 1250,
    status: "confirmed",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "BK002",
    guestName: "Michael Chen",
    property: "Lakeside Wellness Center",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    guests: 2,
    total: 890,
    status: "pending",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "BK003",
    guestName: "Emily Rodriguez",
    property: "Forest Meditation Lodge",
    checkIn: "2024-01-12",
    checkOut: "2024-01-14",
    guests: 1,
    total: 320,
    status: "completed",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 345-6789"
  },
  {
    id: "BK004",
    guestName: "David Thompson",
    property: "Coastal Yoga Sanctuary",
    checkIn: "2024-01-25",
    checkOut: "2024-01-30",
    guests: 6,
    total: 1850,
    status: "confirmed",
    email: "david.thompson@email.com",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "BK005",
    guestName: "Lisa Park",
    property: "Desert Mindfulness Retreat",
    checkIn: "2024-01-10",
    checkOut: "2024-01-12",
    guests: 3,
    total: 675,
    status: "cancelled",
    email: "lisa.park@email.com",
    phone: "+1 (555) 567-8901"
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

export default function BookingsListView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("checkIn")

  const filteredBookings = mockBookings
    .filter(booking => {
      const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "checkIn") return new Date(a.checkIn) - new Date(b.checkIn)
      if (sortBy === "total") return b.total - a.total
      if (sortBy === "guestName") return a.guestName.localeCompare(b.guestName)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-2 focus:border-black transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2">
            <SelectItem value="all" className="bg-white hover:bg-gray-50">All Statuses</SelectItem>
            <SelectItem value="confirmed" className="bg-white hover:bg-gray-50">Active</SelectItem>
            <SelectItem value="pending" className="bg-white hover:bg-gray-50">Pending</SelectItem>
            <SelectItem value="completed" className="bg-white hover:bg-gray-50">Closed</SelectItem>
            <SelectItem value="cancelled" className="bg-white hover:bg-gray-50">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-2 focus:border-black transition-colors">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2">
            <SelectItem value="checkIn" className="bg-white hover:bg-gray-50">Check-in Date</SelectItem>
            <SelectItem value="total" className="bg-white hover:bg-gray-50">Total Amount</SelectItem>
            <SelectItem value="guestName" className="bg-white hover:bg-gray-50">Guest Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{booking.guestName}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Booking ID: {booking.id}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {getStatusLabel(booking.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{booking.property}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{booking.guests} guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">${booking.total}</p>
                    <p className="text-xs text-gray-500">
                      ${Math.round(booking.total / Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)))}/night
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">Email:</span> {booking.email}</p>
                    <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Booking ID:</span> {booking.id}</p>
                    <p><span className="font-medium">Status:</span> <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}