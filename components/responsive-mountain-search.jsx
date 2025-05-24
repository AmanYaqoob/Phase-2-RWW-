"use client"

import { useState, useRef, useEffect } from "react"
import { CalendarIcon, DollarSign, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import CreativeCalendar from "./creative-calendar"
import { motion, AnimatePresence } from "framer-motion"

export default function ResponsiveMountainSearch() {
  const [date, setDate] = useState(undefined)
  const [budget, setBudget] = useState("")
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 })
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const searchRef = useRef(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Close expanded search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false)
        setActiveTab(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    console.log({ date, budget, guests })
    setIsExpanded(false)
    setActiveTab(null)
    // In a real app, you would navigate to search results page
  }

  const incrementGuest = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const decrementGuest = (type) => {
    if (guests[type] > 0 && !(type === "adults" && guests[type] <= 1)) {
      setGuests((prev) => ({ ...prev, [type]: prev[type] - 1 }))
    }
  }

  const budgetOptions = ["$0-$500", "$500-$1000", "$1000-$2000", "$2000+"]

  const totalGuests = guests.adults + guests.children + guests.pets

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null)
    } else {
      setActiveTab(tab)
      setIsExpanded(true)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10" ref={searchRef}>
      {/* Compact Search Bar */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg"
        >
          <div className="flex-1 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={() => {
                setIsExpanded(true)
                setActiveTab("location")
              }}
              className="w-full justify-start text-left h-12 px-4 hover:bg-gray-100/50"
            >
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-normal">Where are you going?</span>
            </Button>
          </div>

          <div className="hidden sm:flex h-8 w-px bg-gray-200 mx-1"></div>

          <div className="flex-1 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={() => {
                setIsExpanded(true)
                setActiveTab("date")
              }}
              className="w-full justify-start text-left h-12 px-4 hover:bg-gray-100/50"
            >
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-normal truncate">{date ? format(date, "MMM d, yyyy") : "When"}</span>
            </Button>
          </div>

          <div className="hidden sm:flex h-8 w-px bg-gray-200 mx-1"></div>

          <div className="flex-1 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={() => {
                setIsExpanded(true)
                setActiveTab("guests")
              }}
              className="w-full justify-start text-left h-12 px-4 hover:bg-gray-100/50"
            >
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-normal">
                {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}` : "Guests"}
              </span>
            </Button>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full sm:w-auto h-12 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            <Search className="h-4 w-4 mr-2 sm:mr-0 md:mr-2" />
            <span className="sm:hidden md:inline">Search</span>
          </Button>
        </motion.div>
      )}

      {/* Expanded Search Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row border-b">
              <button
                onClick={() => handleTabClick("location")}
                className={cn(
                  "flex-1 py-4 px-6 text-left transition-colors relative",
                  activeTab === "location" ? "text-red-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                <div className="font-medium text-sm">Where</div>
                <div className="text-sm truncate mt-1">Search destinations</div>
                {activeTab === "location" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>

              <button
                onClick={() => handleTabClick("date")}
                className={cn(
                  "flex-1 py-4 px-6 text-left transition-colors relative",
                  activeTab === "date" ? "text-red-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                <div className="font-medium text-sm">When</div>
                <div className="text-sm truncate mt-1">{date ? format(date, "MMM d, yyyy") : "Add dates"}</div>
                {activeTab === "date" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>

              <button
                onClick={() => handleTabClick("guests")}
                className={cn(
                  "flex-1 py-4 px-6 text-left transition-colors relative",
                  activeTab === "guests" ? "text-red-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                <div className="font-medium text-sm">Who</div>
                <div className="text-sm truncate mt-1">
                  {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}` : "Add guests"}
                </div>
                {activeTab === "guests" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>

              <button
                onClick={() => handleTabClick("budget")}
                className={cn(
                  "flex-1 py-4 px-6 text-left transition-colors relative",
                  activeTab === "budget" ? "text-red-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                <div className="font-medium text-sm">Budget</div>
                <div className="text-sm truncate mt-1">{budget || "Add budget"}</div>
                {activeTab === "budget" && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "location" && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search destinations"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Popular destinations</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          "Bali, Indonesia",
                          "Santorini, Greece",
                          "Tulum, Mexico",
                          "Costa Rica",
                          "Maldives",
                          "Kyoto, Japan",
                        ].map((place) => (
                          <div
                            key={place}
                            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <div className="text-sm">{place}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "date" && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center"
                  >
                    <CreativeCalendar selectedDate={date} onDateSelect={setDate} className="max-w-full" />
                  </motion.div>
                )}

                {activeTab === "guests" && (
                  <motion.div
                    key="guests"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Adults</h3>
                        <p className="text-sm text-gray-500">Ages 13 or above</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrementGuest("adults")}
                          className={cn(
                            "h-8 w-8 rounded-full border flex items-center justify-center transition-colors",
                            guests.adults <= 1
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-700 hover:border-gray-900",
                          )}
                          disabled={guests.adults <= 1}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{guests.adults}</span>
                        <button
                          onClick={() => incrementGuest("adults")}
                          className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Children</h3>
                        <p className="text-sm text-gray-500">Ages 2-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrementGuest("children")}
                          className={cn(
                            "h-8 w-8 rounded-full border flex items-center justify-center transition-colors",
                            guests.children <= 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-700 hover:border-gray-900",
                          )}
                          disabled={guests.children <= 0}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{guests.children}</span>
                        <button
                          onClick={() => incrementGuest("children")}
                          className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pets</h3>
                        <p className="text-sm text-gray-500">Service animals always welcome</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrementGuest("pets")}
                          className={cn(
                            "h-8 w-8 rounded-full border flex items-center justify-center transition-colors",
                            guests.pets <= 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-700 hover:border-gray-900",
                          )}
                          disabled={guests.pets <= 0}
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{guests.pets}</span>
                        <button
                          onClick={() => incrementGuest("pets")}
                          className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "budget" && (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-sm font-medium mb-3">Select your budget range</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map((option) => (
                        <div
                          key={option}
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer transition-all",
                            budget === option ? "border-red-500 bg-red-50 shadow-sm" : "hover:border-gray-400",
                          )}
                          onClick={() => setBudget(option)}
                        >
                          <div className="flex items-center">
                            <DollarSign
                              className={cn("h-5 w-5 mr-2", budget === option ? "text-red-500" : "text-gray-400")}
                            />
                            <span className={budget === option ? "font-medium" : ""}>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-3">Or enter a custom range</h3>
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Min"
                            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            placeholder="Max"
                            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t">
              <button
                onClick={() => {
                  setIsExpanded(false)
                  setActiveTab(null)
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>

              <Button onClick={handleSearch} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
