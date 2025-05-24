"use client"

import { useState } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function SimpleSearchBar() {
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [guests, setGuests] = useState("1 guest")
  const { theme, setTheme } = useTheme()

  const handleSearch = () => {
    console.log({ destination, dates, guests })
    // In a real app, you would navigate to search results page
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow">
          <div className="flex flex-1 md:flex-row flex-col">
            <input
              type="text"
              placeholder="Search destinations"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 p-3 border-0 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white"
            />

            <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>

            <input
              type="text"
              placeholder="Add dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="flex-1 p-3 border-0 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white"
            />

            <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700"></div>

            <input
              type="text"
              placeholder="1 guest"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="flex-1 p-3 border-0 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <Button
            onClick={handleSearch}
            className="rounded-none bg-red-600 hover:bg-red-700 text-white h-full w-12 flex items-center justify-center"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="text-xs bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-3.5 w-3.5 mr-1.5" /> Light Mode
            </>
          ) : (
            <>
              <Moon className="h-3.5 w-3.5 mr-1.5" /> Dark Mode
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
