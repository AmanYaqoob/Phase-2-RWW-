"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, Users, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"

// Mock location suggestions
const locationSuggestions = [
  { id: 1, name: "Bali, Indonesia", type: "Popular destination" },
  { id: 2, name: "Tulum, Mexico", type: "Beach retreat" },
  { id: 3, name: "Rishikesh, India", type: "Spiritual center" },
  { id: 4, name: "Costa Rica", type: "Nature retreat" },
  { id: 5, name: "Sedona, Arizona", type: "Desert sanctuary" },
  { id: 6, name: "Byron Bay, Australia", type: "Coastal wellness" },
  { id: 7, name: "Ubud, Bali", type: "Yoga capital" },
  { id: 8, name: "Big Sur, California", type: "Mountain retreat" },
]

export default function DynamicSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [location, setLocation] = useState("")
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [guests, setGuests] = useState({ adults: 2, children: 0, pets: 0 })
  const [showCalendar, setShowCalendar] = useState(false)
  const [showGuestSelector, setShowGuestSelector] = useState(false)

  const searchBarRef = useRef(null)

  // Handle location search
  useEffect(() => {
    if (location) {
      const filtered = locationSuggestions.filter(loc =>
        loc.name.toLowerCase().includes(location.toLowerCase())
      )
      setFilteredLocations(filtered)
      setShowLocationSuggestions(true)
    } else {
      setFilteredLocations(locationSuggestions.slice(0, 4))
      setShowLocationSuggestions(false)
    }
  }, [location])

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsExpanded(false)
        setActiveSection(null)
        setShowLocationSuggestions(false)
        setShowCalendar(false)
        setShowGuestSelector(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.name)
    setShowLocationSuggestions(false)
    setActiveSection("dates")
  }

  const handleDateSelect = (range) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      setShowCalendar(false)
      setActiveSection("guests")
    }
  }

  const updateGuestCount = (type, operation) => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === "increment"
        ? prev[type] + 1
        : Math.max(0, prev[type] - 1)
    }))
  }

  const getTotalGuests = () => {
    return guests.adults + guests.children
  }

  const getDateRangeText = () => {
    if (!dateRange.from) return "Add dates"
    if (!dateRange.to) return format(dateRange.from, "MMM d")
    return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
  }

  const getGuestText = () => {
    const total = getTotalGuests()
    if (total === 0) return "Add guests"
    let text = `${total} guest${total > 1 ? 's' : ''}`
    if (guests.pets > 0) text += `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`
    return text
  }

  const handleSearch = () => {
    console.log({ location, dateRange, guests })
    // Handle search logic here
  }

  return (
    <div ref={searchBarRef} className="w-full max-w-4xl mx-auto relative z-50">
      {!isExpanded ? (
        <div
          className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-3 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-gray-300"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="bg-gray-100 rounded-lg p-2 mr-4">
                <Search className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-lg">Where to?</span>
                <span className="text-sm text-gray-500">
                  {location || getDateRangeText()} • {getGuestText()}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-black hover:bg-gray-800 h-12 px-6 rounded-lg shadow-md"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 overflow-hidden max-w-4xl mx-auto">
          {/* Header */}
          <div className="p-4 border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Search Retreats</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Sections */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* Location Section */}
              <div className="relative">
                <div
                  className={cn(
                    "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 min-h-[80px] flex flex-col justify-center bg-white shadow-sm hover:shadow-md",
                    activeSection === "location"
                      ? "border-black bg-gray-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => {
                    setActiveSection("location")
                    setShowLocationSuggestions(true)
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-100 rounded-lg p-2 mr-3">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-900 text-base">Where</span>
                  </div>
                  <Input
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 p-0 text-sm placeholder:text-gray-400 focus-visible:ring-0 font-medium"
                    onFocus={() => {
                      setActiveSection("location")
                      setShowLocationSuggestions(true)
                    }}
                  />
                </div>

                    {showLocationSuggestions && activeSection === "location" && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-50 max-h-64 overflow-y-auto">
                        {filteredLocations.map((loc) => (
                          <div
                            key={loc.id}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                            onClick={() => handleLocationSelect(loc)}
                          >
                            <div className="flex items-center">
                              <div className="bg-gray-100 rounded-lg p-2 mr-3">
                                <MapPin className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{loc.name}</div>
                                <div className="text-sm text-gray-500">{loc.type}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

              {/* Date Section */}
              <div className="relative">
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <div
                      className={cn(
                        "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 min-h-[80px] flex flex-col justify-center bg-white shadow-sm hover:shadow-md",
                        activeSection === "dates"
                          ? "border-black bg-gray-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => {
                        setActiveSection("dates")
                        setShowCalendar(true)
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-100 rounded-lg p-2 mr-3">
                          <Calendar className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-semibold text-gray-900 text-base">When</span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {getDateRangeText()}
                      </div>
                    </div>
                  </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="range"
                          selected={dateRange}
                          onSelect={handleDateSelect}
                          numberOfMonths={2}
                          className="rounded-lg border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

              {/* Guests Section */}
              <div className="relative">
                <Popover open={showGuestSelector} onOpenChange={setShowGuestSelector}>
                  <PopoverTrigger asChild>
                    <div
                      className={cn(
                        "border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 min-h-[80px] flex flex-col justify-center bg-white shadow-sm hover:shadow-md",
                        activeSection === "guests"
                          ? "border-black bg-gray-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => {
                        setActiveSection("guests")
                        setShowGuestSelector(true)
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-100 rounded-lg p-2 mr-3">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-semibold text-gray-900 text-base">Who</span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {getGuestText()}
                      </div>
                    </div>
                  </PopoverTrigger>
                      <PopoverContent className="w-80 p-6" align="start">
                        <div className="space-y-6">
                          {/* Adults */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">Adults</div>
                              <div className="text-sm text-gray-500">Ages 13 or above</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("adults", "decrement")}
                                disabled={guests.adults <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-lg">{guests.adults}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("adults", "increment")}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">Children</div>
                              <div className="text-sm text-gray-500">Ages 2-12</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("children", "decrement")}
                                disabled={guests.children <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-lg">{guests.children}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("children", "increment")}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Pets */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">Pets</div>
                              <div className="text-sm text-gray-500">Bringing a service animal?</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("pets", "decrement")}
                                disabled={guests.pets <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-lg">{guests.pets}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-10 w-10 p-0 border-2"
                                onClick={() => updateGuestCount("pets", "increment")}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

            </div>

            {/* Search Button */}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleSearch}
                className="bg-black hover:bg-gray-800 text-white px-8 py-2 rounded-lg text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Retreats
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}