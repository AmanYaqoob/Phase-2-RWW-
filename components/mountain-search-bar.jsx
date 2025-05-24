"use client"

import { useState } from "react"
import { Calendar, DollarSign, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function MountainSearchBar() {
  const [date, setDate] = useState(undefined)
  const [budget, setBudget] = useState("")
  const [guests, setGuests] = useState({ adults: 1, children: 0, pets: 0 })

  const handleSearch = () => {
    console.log({ date, budget, guests })
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

  const budgetOptions = ["$0-$500", "$500-$1000", "$1000-$2000", "$2000+"]

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">
        {/* Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start gap-2 rounded-full border-none bg-transparent hover:bg-white/50"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-normal">{date ? format(date, "MMM d, yyyy") : "Date"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Budget */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start gap-2 rounded-full border-none bg-transparent hover:bg-white/50"
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-normal">{budget || "Budget"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <div className="space-y-2">
              {budgetOptions.map((option) => (
                <div
                  key={option}
                  className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                    budget === option ? "bg-red-50 text-red-600" : ""
                  }`}
                  onClick={() => setBudget(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start gap-2 rounded-full border-none bg-transparent hover:bg-white/50"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm font-normal">
                {guests.adults + guests.children > 0
                  ? `${guests.adults + guests.children} guest${
                      guests.adults + guests.children > 1 ? "s" : ""
                    }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}` : ""}`
                  : "Guests"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4 p-2">
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
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full md:w-auto rounded-full bg-black hover:bg-gray-800 text-white">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
