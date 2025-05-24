"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"

export function AirbnbStyleSearchBar() {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("location")
  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  })
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    pets: 0,
  })
  const searchBarRef = useRef(null)

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
    })
    setExpanded(false)
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
        "w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out",
        expanded ? "bg-white shadow-xl border border-gray-200" : "bg-white shadow-lg border border-gray-200",
      )}
    >
      {/* Compact search bar */}
      {!expanded ? (
        <div className="flex items-center h-16">
          <div
            className="flex flex-1 items-center h-full cursor-pointer"
            onClick={() => {
              setExpanded(true)
              setActiveTab("location")
            }}
          >
            <div className="px-6 py-2 h-full flex flex-col justify-center border-r">
              <span className="text-sm font-medium">Where</span>
              <span className="text-sm text-muted-foreground">{location || "Search destinations"}</span>
            </div>

            <div
              className="px-6 py-2 h-full flex flex-col justify-center border-r"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
                setActiveTab("dates")
              }}
            >
              <span className="text-sm font-medium">When</span>
              <span className="text-sm text-muted-foreground">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`
                  : "Add dates"}
              </span>
            </div>

            <div
              className="px-6 py-2 h-full flex flex-col justify-center"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
                setActiveTab("guests")
              }}
            >
              <span className="text-sm font-medium">Who</span>
              <span className="text-sm text-muted-foreground">
                {totalGuests > 0 ? `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}` : "Add guests"}
              </span>
            </div>
          </div>

          <div className="px-4">
            <Button onClick={handleSearch} size="icon" className="rounded-full h-10 w-10 bg-red-600 hover:bg-red-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex border-b">
            <button
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium text-center relative",
                activeTab === "location" ? "text-black" : "text-muted-foreground",
              )}
              onClick={() => setActiveTab("location")}
            >
              Where
              {activeTab === "location" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
            <button
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium text-center relative",
                activeTab === "dates" ? "text-black" : "text-muted-foreground",
              )}
              onClick={() => setActiveTab("dates")}
            >
              When
              {activeTab === "dates" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
            <button
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium text-center relative",
                activeTab === "guests" ? "text-black" : "text-muted-foreground",
              )}
              onClick={() => setActiveTab("guests")}
            >
              Who
              {activeTab === "guests" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
          </div>

          {activeTab === "location" && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none outline-none text-lg"
                  autoFocus
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Popular destinations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {popularLocations.map((loc) => (
                    <div
                      key={loc}
                      className="flex items-center p-3 hover:bg-muted rounded cursor-pointer"
                      onClick={() => setLocation(loc)}
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{loc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "dates" && (
            <div className="p-6">
              <div className="flex justify-center">
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange?.from || undefined,
                    to: dateRange?.to || undefined,
                  }}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date()
                      setDateRange({
                        from: today,
                        to: addDays(today, 30),
                      })
                    }}
                  >
                    Month
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setDateRange({ from: null, to: null })
                  }}
                >
                  Clear dates
                </Button>
              </div>
            </div>
          )}

          {activeTab === "guests" && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Adults</h3>
                    <p className="text-sm text-muted-foreground">Ages 13+</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("adults", guests.adults - 1)}
                      disabled={guests.adults <= 1}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center">{guests.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("adults", guests.adults + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Children</h3>
                    <p className="text-sm text-muted-foreground">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("children", guests.children - 1)}
                      disabled={guests.children <= 0}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center">{guests.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("children", guests.children + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pets</h3>
                    <p className="text-sm text-muted-foreground">Service animals always welcome</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("pets", guests.pets - 1)}
                      disabled={guests.pets <= 0}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center">{guests.pets}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuests("pets", guests.pets + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center p-4 border-t">
            <Button variant="ghost" onClick={() => setExpanded(false)}>
              Cancel
            </Button>
            <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
