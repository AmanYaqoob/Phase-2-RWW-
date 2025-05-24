"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { cn } from "@/lib/utils"

export default function CreativeCalendar({ selectedDate, onDateSelect, className }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [animationDirection, setAnimationDirection] = useState(0)
  const [hoveredDate, setHoveredDate] = useState(null)

  // Generate days for the current month view
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Get day names for the header
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Handle month navigation
  const nextMonth = () => {
    setAnimationDirection(1)
    setTimeout(() => {
      setCurrentMonth(addMonths(currentMonth, 1))
    }, 50)
  }

  const prevMonth = () => {
    setAnimationDirection(-1)
    setTimeout(() => {
      setCurrentMonth(subMonths(currentMonth, 1))
    }, 50)
  }

  // Reset animation direction after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDirection(0)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentMonth])

  // Get the start day offset (0-6) for the first day of the month
  const startDayOffset = startOfMonth(currentMonth).getDay()

  // Create empty cells for days before the start of the month
  const emptyCells = Array.from({ length: startDayOffset }, (_, i) => (
    <div key={`empty-${i}`} className="h-9 w-9"></div>
  ))

  return (
    <div className={cn("p-3 bg-white rounded-lg shadow-lg", className)}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.h2
            key={currentMonth.toString()}
            className="text-lg font-medium"
            initial={{ opacity: 0, y: animationDirection * 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animationDirection * -20 }}
            transition={{ duration: 0.2 }}
          >
            {format(currentMonth, "MMMM yyyy")}
          </motion.h2>
        </AnimatePresence>

        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="h-9 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toString()}
          className="grid grid-cols-7 gap-1"
          initial={{ opacity: 0, x: animationDirection * 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: animationDirection * -20 }}
          transition={{ duration: 0.2 }}
        >
          {emptyCells}
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isTodayDate = isToday(day)
            const isHovered = hoveredDate && isSameDay(day, hoveredDate)

            return (
              <div
                key={day.toString()}
                className="relative"
                onMouseEnter={() => setHoveredDate(day)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <button
                  type="button"
                  onClick={() => onDateSelect(day)}
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center text-sm relative z-10 transition-all duration-200",
                    isSelected
                      ? "bg-red-600 text-white font-medium"
                      : isTodayDate
                        ? "bg-red-100 text-red-600 font-medium"
                        : isHovered
                          ? "bg-gray-100"
                          : "hover:bg-gray-50",
                    !isCurrentMonth && "text-gray-300",
                  )}
                  disabled={!isCurrentMonth}
                >
                  {format(day, "d")}
                </button>

                {/* Animated hover effect */}
                {isHovered && !isSelected && (
                  <motion.div
                    layoutId="hoverEffect"
                    className="absolute inset-0 rounded-full bg-gray-100 z-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selectedIndicator"
                    className="absolute inset-0 rounded-full bg-red-600 z-0"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Quick selection buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onDateSelect(new Date())}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => onDateSelect(addMonths(new Date(), 1))}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Next Month
        </button>
        <button
          onClick={() => onDateSelect(addMonths(new Date(), 3))}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          +3 Months
        </button>
      </div>
    </div>
  )
}
