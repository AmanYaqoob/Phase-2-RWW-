"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, X, Calendar, Users, Tag, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"

export function EnhancedSearchBarV2() {
  const [expanded, setExpanded] = useState(false)
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  })
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    pets: 0,
  })
  const [activities, setActivities] = useState([])
  const searchBarRef = useRef(null)

  const popularActivities = [
    { id: 1, name: "Yoga", icon: "🧘" },
    { id: 2, name: "Meditation", icon: "🧠" },
    { id: 3, name: "Art Workshop", icon: "🎨" },
    { id: 4, name: "Cooking Class", icon: "🍳" },
    { id: 5, name: "Fitness", icon: "💪" },
    { id: 6, name: "Dance", icon: "💃" },
  ]

  const popularLocations = [
    "Bali, Indonesia",
    "Tulum, Mexico",
    "Sedona, Arizona",
    "Costa Rica",
    "Santorini, Greece",
    "Kyoto, Japan",
  ]

  const totalGuests = guests.adults + guests.children

  const handleSearch = () => {
    console.log({
      location,
      dateRange,
      guests,
      activities,
    })
  }

  const toggleActivity = (activity) => {
    if (activities.some((a) => a.id === activity.id)) {
      setActivities(activities.filter((a) => a.id !== activity.id))
    } else {
      setActivities([...activities, activity])
    }
  }

  const updateGuests = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, value),
    }))
  }

  // Close expanded search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={searchBarRef}
      className={cn(
        "w-full max-w-5xl mx-auto transition-all duration-300 ease-in-out",
        expanded
          ? "bg-white rounded-md shadow-xl border border-gray-200 p-4"
          : "bg-white/90 backdrop-blur-md rounded-md shadow-lg border border-gray-200 p-1",
      )}
    >
      {/* Compact search bar */}
      {!expanded ? (
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-4 px-4 py-2 cursor-pointer" onClick={() => setExpanded(true)}>
            <Search className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="font-medium">Where to?</span>
              <span className="text-sm text-muted-foreground">
                {location
                  ? location
                  : dateRange.from
                    ? `${format(dateRange.from, "MMM d")}${dateRange.to ? ` - ${format(dateRange.to, "MMM d")}` : ""}`
                    : "Anywhere · Any week · Add guests"}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-gray-100 mr-1"
            onClick={() => setExpanded(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Search retreats</h3>
            <Button variant="ghost" size="icon" className="rounded-md" onClick={() => setExpanded(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </label>
              <div className="relative">
                <Input
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md"
                />
                {location && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setLocation("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {popularLocations.slice(0, 3).map((loc) => (
                  <Badge
                    key={loc}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 rounded-md"
                    onClick={() => setLocation(loc)}
                  >
                    {loc}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Dates
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-md",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d")
                      )
                    ) : (
                      "Select dates"
                    )}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date()}
                  />
                  <div className="flex items-center justify-between p-3 border-t">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date()
                          setDateRange({
                            from: today,
                            to: addDays(today, 7),
                          })
                        }}
                      >
                        1 week
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date()
                          setDateRange({
                            from: today,
                            to: addDays(today, 14),
                          })
                        }}
                      >
                        2 weeks
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setDateRange({ from: null, to: null })
                      }}
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" /> Guests
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal rounded-md">
                    {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                    {guests.pets > 0 ? `, ${guests.pets} pet${guests.pets !== 1 ? "s" : ""}` : ""}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4 p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-muted-foreground">Ages 13+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("adults", guests.adults - 1)}
                          disabled={guests.adults <= 1}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center">{guests.adults}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("adults", guests.adults + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-muted-foreground">Ages 2-12</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("children", guests.children - 1)}
                          disabled={guests.children <= 0}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center">{guests.children}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("children", guests.children + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pets</p>
                        <p className="text-sm text-muted-foreground">Service animals always welcome</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("pets", guests.pets - 1)}
                          disabled={guests.pets <= 0}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center">{guests.pets}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateGuests("pets", guests.pets + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Activities */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Tag className="h-4 w-4" /> Activities
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-md",
                      activities.length === 0 && "text-muted-foreground",
                    )}
                  >
                    {activities.length > 0 ? `${activities.length} selected` : "Select activities"}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4 p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {popularActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md cursor-pointer border transition-colors",
                            activities.some((a) => a.id === activity.id)
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-muted",
                          )}
                          onClick={() => toggleActivity(activity)}
                        >
                          <span>{activity.icon}</span>
                          <span>{activity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-1 mt-2">
                {activities.slice(0, 3).map((activity) => (
                  <Badge key={activity.id} variant="secondary" className="gap-1 rounded-md">
                    {activity.icon} {activity.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => toggleActivity(activity)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSearch} className="px-6 rounded-md">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
