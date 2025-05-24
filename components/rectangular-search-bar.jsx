"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function RectangularSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 })
  const [activities, setActivities] = useState([])

  const availableActivities = [
    { id: 1, name: "Yoga" },
    { id: 2, name: "Meditation" },
    { id: 3, name: "Hiking" },
    { id: 4, name: "Cooking" },
    { id: 5, name: "Art & Craft" },
    { id: 6, name: "Wellness" },
  ]

  const toggleActivity = (id) => {
    if (activities.includes(id)) {
      setActivities(activities.filter((activityId) => activityId !== id))
    } else {
      setActivities([...activities, id])
    }
  }

  const handleSearch = () => {
    console.log({
      location,
      checkIn,
      checkOut,
      guests,
      activities: activities.map((id) => availableActivities.find((a) => a.id === id).name),
    })
    // Implement search functionality
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Backdrop blur when expanded */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsExpanded(false)} />
      )}

      <div
        className={cn(
          "bg-white border border-gray-200 shadow-lg transition-all duration-300 z-50 relative",
          "rounded-md", // Slightly rounded corners instead of fully rounded
          isExpanded ? "p-6" : "p-2",
        )}
      >
        {/* Collapsed Search Bar */}
        {!isExpanded && (
          <div className="flex items-center cursor-pointer" onClick={() => setIsExpanded(true)}>
            <Search className="h-5 w-5 text-gray-500 ml-2" />
            <div className="ml-4 text-gray-500">Where are you going?</div>
            <div className="ml-auto flex items-center space-x-4 mr-2">
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-gray-500">Any week</div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-gray-500">Add guests</div>
              <Button size="sm" variant="default" className="rounded-md bg-red-600 hover:bg-red-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Expanded Search Bar */}
        {isExpanded && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Search for retreats</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Location
                </label>
                <Input
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-md"
                />
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  Dates
                </label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal rounded-md flex-1",
                          !checkIn && "text-muted-foreground",
                        )}
                      >
                        {checkIn ? format(checkIn, "PPP") : "Check-in"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal rounded-md flex-1",
                          !checkOut && "text-muted-foreground",
                        )}
                      >
                        {checkOut ? format(checkOut, "PPP") : "Check-out"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  Guests
                </label>
                <div className="space-y-2 border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <span>Adults</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
                      >
                        -
                      </Button>
                      <span>{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Children</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })}
                      >
                        -
                      </Button>
                      <span>{guests.children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Pets</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, pets: Math.max(0, guests.pets - 1) })}
                      >
                        -
                      </Button>
                      <span>{guests.pets}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-md"
                        onClick={() => setGuests({ ...guests, pets: guests.pets + 1 })}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  Activities
                </label>
                <div className="flex flex-wrap gap-2 border rounded-md p-3">
                  {availableActivities.map((activity) => (
                    <Button
                      key={activity.id}
                      variant={activities.includes(activity.id) ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-md",
                        activities.includes(activity.id) ? "bg-red-600 hover:bg-red-700" : "",
                      )}
                      onClick={() => toggleActivity(activity.id)}
                    >
                      {activity.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 rounded-md" onClick={handleSearch}>
              Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
