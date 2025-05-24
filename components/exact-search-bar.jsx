"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Search, MapPin, Calendar as CalendarIcon, Users, Plus, Minus, ChevronDown } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock location suggestions
const LOCATION_SUGGESTIONS = [
  "New York, USA",
  "Bali, Indonesia",
  "Paris, France",
  "Tokyo, Japan",
  "London, UK",
  "Sydney, Australia",
  "Barcelona, Spain",
  "Costa Rica",
  "Aspen, Colorado",
  "Tulum, Mexico"
]

export function ExactSearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [locationFocused, setLocationFocused] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState([])
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guestCount, setGuestCount] = useState(1)
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false)
  const locationRef = useRef(null)

  // Filter locations based on input
  useEffect(() => {
    if (location.trim() === "") {
      setFilteredLocations([])
    } else {
      const filtered = LOCATION_SUGGESTIONS.filter(
        loc => loc.toLowerCase().includes(location.toLowerCase())
      ).slice(0, 5)
      setFilteredLocations(filtered)
    }
  }, [location])

  // Close location dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [locationRef])

  const handleSearch = () => {
    // Create query parameters
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (checkIn) params.append('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.append('checkOut', format(checkOut, 'yyyy-MM-dd'))
    if (guestCount) params.append('guests', guestCount.toString())

    // Navigate to search results page with query parameters
    router.push(`/properties?${params.toString()}`)
  }

  const incrementGuests = () => {
    setGuestCount(prev => Math.min(prev + 1, 10))
  }

  const decrementGuests = () => {
    setGuestCount(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex bg-white rounded shadow-md overflow-hidden">
        {/* Location */}
        <div className="flex-1 flex flex-col border-r border-gray-200 p-2 relative" ref={locationRef}>
          <div className="text-sm font-medium text-gray-600">Location</div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setLocationFocused(true)}
              className="w-full border-0 p-0 focus:ring-0 focus:outline-none text-sm"
            />
          </div>

          {/* Location suggestions dropdown */}
          {locationFocused && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md z-10 mt-1 max-h-60 overflow-auto">
              {filteredLocations.map((loc, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    setLocation(loc)
                    setLocationFocused(false)
                  }}
                >
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 text-gray-400 mr-2" />
                    {loc}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check in */}
        <div className="flex-1 flex flex-col border-r border-gray-200 p-2">
          <div className="text-sm font-medium text-gray-600">Check in</div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center w-full text-left focus:outline-none">
                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {checkIn ? format(checkIn, "MMM d, yyyy") : "Add dates"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check out */}
        <div className="flex-1 flex flex-col border-r border-gray-200 p-2">
          <div className="text-sm font-medium text-gray-600">Check out</div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center w-full text-left focus:outline-none">
                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {checkOut ? format(checkOut, "MMM d, yyyy") : "Add dates"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => (date < new Date() || (checkIn && date < checkIn))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex-1 flex flex-col p-2">
          <div className="text-sm font-medium text-gray-600">Guests</div>
          <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-between w-full text-left focus:outline-none">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    {guestCount} {guestCount === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" align="start">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Guests</p>
                  <p className="text-sm text-gray-500">How many people?</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementGuests}
                    disabled={guestCount <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{guestCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementGuests}
                    disabled={guestCount >= 10}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGuestPopoverOpen(false)}
                >
                  Done
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search button - black with white icon */}
        <button
          onClick={handleSearch}
          className="bg-black hover:bg-gray-800 text-white w-14 flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
