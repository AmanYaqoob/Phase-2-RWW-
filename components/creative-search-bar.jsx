"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function CreativeSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("location")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 })
  const searchBarRef = useRef(null)

  const popularLocations = [
    "Bali, Indonesia",
    "Aspen, Colorado",
    "Tulum, Mexico",
    "Santorini, Greece",
    "Kyoto, Japan",
    "Costa Rica",
  ]

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    console.log({ location, dateRange, guests })
    setIsExpanded(false)
    // In a real app, you would navigate to search results page
  }

  const incrementGuest = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrementGuest = (type) => {
    if (guests[type] > 0) {
      setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }))
    }
  }

  return (
    <div ref={searchBarRef} className="w-full max-w-4xl mx-auto relative z-50">
      {/* Compact Search Bar */}
      {!isExpanded ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center"
        >
          <div
            className="flex-1 p-4 cursor-pointer flex items-center"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("location")
            }}
          >
            <Search className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="font-medium">Where to?</p>
              <p className="text-sm text-muted-foreground">{location ? location : "Search destinations"}</p>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div
            className="flex-1 p-4 cursor-pointer"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("dates")
            }}
          >
            <p className="font-medium">When</p>
            <p className="text-sm text-muted-foreground">
              {dateRange.from && dateRange.to
                ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                : "Add dates"}
            </p>
          </div>

          <div className="h-10 w-px bg-gray-200" />

          <div
            className="flex-1 p-4 cursor-pointer"
            onClick={() => {
              setIsExpanded(true)
              setActiveTab("guests")
            }}
          >
            <p className="font-medium">Who</p>
            <p className="text-sm text-muted-foreground">
              {guests.adults + guests.children > 0
                ? `${guests.adults + guests.children} guest${
                    guests.adults + guests.children > 1 ? "s" : ""
                  }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}` : ""}`
                : "Add guests"}
            </p>
          </div>

          <div className="p-2">
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full h-12 w-12 p-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header with tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "location" ? "text-red-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("location")}
              >
                Where
                {activeTab === "location" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "dates" ? "text-red-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("dates")}
              >
                When
                {activeTab === "dates" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium relative ${
                  activeTab === "guests" ? "text-red-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("guests")}
              >
                Who
                {activeTab === "guests" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button onClick={() => setIsExpanded(false)} className="p-4 text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="p-6">
              {activeTab === "location" && (
                <div className="space-y-6">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search destinations"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Popular destinations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {popularLocations.map((loc) => (
                        <div
                          key={loc}
                          className="p-3 border rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                          onClick={() => setLocation(loc)}
                        >
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-red-500 mr-2" />
                            <span>{loc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "dates" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Select dates</h3>
                      <p className="text-sm text-muted-foreground">Add your travel dates for exact pricing</p>
                    </div>
                    {(dateRange.from || dateRange.to) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDateRange({ from: undefined, to: undefined })}
                      >
                        Clear dates
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <CalendarComponent
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }}
                      numberOfMonths={2}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              )}

              {activeTab === "guests" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Who's coming?</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Adults</p>
                          <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("adults")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.adults <= 1 ? "text-gray-300" : "text-gray-600"
                            }`}
                            disabled={guests.adults <= 1}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.adults}</span>
                          <button
                            onClick={() => incrementGuest("adults")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Children</p>
                          <p className="text-sm text-muted-foreground">Ages 2-12</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("children")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.children <= 0 ? "text-gray-300" : "text-gray-600"
                            }`}
                            disabled={guests.children <= 0}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.children}</span>
                          <button
                            onClick={() => incrementGuest("children")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pets</p>
                          <p className="text-sm text-muted-foreground">Service animals always welcome</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementGuest("pets")}
                            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                              guests.pets <= 0 ? "text-gray-300" : "text-gray-600"
                            }`}
                            disabled={guests.pets <= 0}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{guests.pets}</span>
                          <button
                            onClick={() => incrementGuest("pets")}
                            className="h-8 w-8 rounded-full border flex items-center justify-center text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with search button */}
            <div className="p-4 border-t flex justify-between items-center">
              <button className="text-red-600 font-medium flex items-center" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4 mr-1" /> Cancel
              </button>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                Search
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
