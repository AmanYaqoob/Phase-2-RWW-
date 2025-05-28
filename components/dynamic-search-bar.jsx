"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, Users, Plus, Minus, X, Activity, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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

// Activity options
const activityOptions = [
  { id: 1, name: "Yoga", icon: Activity },
  { id: 2, name: "Meditation", icon: Mountain },
  { id: 3, name: "Surfing", icon: Waves },
  { id: 4, name: "Hiking", icon: Mountain },
  { id: 5, name: "Fitness", icon: Dumbbell },
  { id: 6, name: "Wellness", icon: Activity },
  { id: 7, name: "Spiritual", icon: Mountain },
  { id: 8, name: "Adventure", icon: Mountain },
]

// Amenities options
const amenityOptions = [
  { id: 1, name: "WiFi", icon: Wifi },
  { id: 2, name: "Parking", icon: Car },
  { id: 3, name: "Meals Included", icon: Utensils },
  { id: 4, name: "Coffee/Tea", icon: Coffee },
  { id: 5, name: "Gym/Fitness", icon: Dumbbell },
  { id: 6, name: "Pool", icon: Waves },
  { id: 7, name: "Spa Services", icon: Activity },
  { id: 8, name: "Kitchen Access", icon: Utensils },
]

export default function DynamicSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [location, setLocation] = useState("")
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [guests, setGuests] = useState({ adults: 2, children: 0, pets: 0 })
  const [selectedActivities, setSelectedActivities] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [showActivitySelector, setShowActivitySelector] = useState(false)
  const [showAmenitySelector, setShowAmenitySelector] = useState(false)

  const searchBarRef = useRef(null)

  // Handle location search
  useEffect(() => {
    if (location) {
      const filtered = locationSuggestions.filter(loc =>
        loc.name.toLowerCase().includes(location.toLowerCase())
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(locationSuggestions.slice(0, 6))
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
        setShowActivitySelector(false)
        setShowAmenitySelector(false)
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

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.find(a => a.id === activity.id)
        ? prev.filter(a => a.id !== activity.id)
        : [...prev, activity]
    )
  }

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.find(a => a.id === amenity.id)
        ? prev.filter(a => a.id !== amenity.id)
        : [...prev, amenity]
    )
  }

  const getActivityText = () => {
    if (selectedActivities.length === 0) return "Any activity"
    if (selectedActivities.length === 1) return selectedActivities[0].name
    return `${selectedActivities.length} activities`
  }

  const getAmenityText = () => {
    if (selectedAmenities.length === 0) return "Any amenities"
    if (selectedAmenities.length === 1) return selectedAmenities[0].name
    return `${selectedAmenities.length} amenities`
  }

  const handleSearch = () => {
    console.log({ location, dateRange, guests, selectedActivities, selectedAmenities })
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
                <span className="font-semibold text-gray-900 text-lg">
                  {location || "Where to?"}
                </span>
                <span className="text-sm text-gray-500">
                  {getDateRangeText()} • {getGuestText()} • {getActivityText()} • {getAmenityText()}
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

          {/* Search Sections - Vertical Stack */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">

            {/* Location Section */}
            <div className="border border-gray-200 rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === "location" ? null : "location")}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Where</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {location || "Choose destination"}
                </div>
              </div>

              {activeSection === "location" && (
                <div className="p-3 border-t border-gray-200 space-y-2">
                  <Input
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:border-black focus:ring-0 text-sm"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    {filteredLocations.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => handleLocationSelect(loc)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left",
                          location === loc.name
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        <div className="text-xs font-medium">{loc.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Date Section */}
            <div className="border border-gray-200 rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === "dates" ? null : "dates")}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">When</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {getDateRangeText()}
                </div>
              </div>

              {activeSection === "dates" && (
                <div className="p-3 border-t border-gray-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Check-in</div>
                      <div className="text-sm font-medium">
                        {dateRange.from ? format(dateRange.from, "MMM d") : "Add date"}
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg text-center">
                      <div className="text-xs text-gray-500">Check-out</div>
                      <div className="text-sm font-medium">
                        {dateRange.to ? format(dateRange.to, "MMM d") : "Add date"}
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-2">
                    <CalendarComponent
                      mode="range"
                      selected={dateRange}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      className="text-xs gap-4"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Guests Section */}
            <div className="border border-gray-200 rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === "guests" ? null : "guests")}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Who</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {getGuestText()}
                </div>
              </div>

              {activeSection === "guests" && (
                <div className="p-3 border-t border-gray-200 space-y-2">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">Adults</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("adults", "decrement")}
                        disabled={guests.adults <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("adults", "increment")}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">Children</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("children", "decrement")}
                        disabled={guests.children <= 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{guests.children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("children", "increment")}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Pets */}
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">Pets</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("pets", "decrement")}
                        disabled={guests.pets <= 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{guests.pets}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateGuestCount("pets", "increment")}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Activities Section */}
            <div className="border border-gray-200 rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === "activities" ? null : "activities")}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Activities</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {getActivityText()}
                </div>
              </div>

              {activeSection === "activities" && (
                <div className="p-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2">
                    {activityOptions.slice(0, 4).map((activity) => {
                      const IconComponent = activity.icon
                      const isSelected = selectedActivities.find(a => a.id === activity.id)
                      return (
                        <button
                          key={activity.id}
                          onClick={() => toggleActivity(activity)}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left",
                            isSelected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="text-xs font-medium">{activity.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Section */}
            <div className="border border-gray-200 rounded-lg">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setActiveSection(activeSection === "amenities" ? null : "amenities")}
              >
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Amenities</h3>
                </div>
                <div className="text-sm text-gray-500">
                  {getAmenityText()}
                </div>
              </div>

              {activeSection === "amenities" && (
                <div className="p-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.slice(0, 4).map((amenity) => {
                      const IconComponent = amenity.icon
                      const isSelected = selectedAmenities.find(a => a.id === amenity.id)
                      return (
                        <button
                          key={amenity.id}
                          onClick={() => toggleAmenity(amenity)}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left",
                            isSelected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="text-xs font-medium">{amenity.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="mt-4 flex justify-center">
              <Button
                onClick={handleSearch}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
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