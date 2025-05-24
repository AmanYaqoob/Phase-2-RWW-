"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain } from "lucide-react"

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    // Show loading message after a delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(messageTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Mountain className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Retreat</span> World Wide
          </h1>
        </motion.div>

        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <AnimatePresence>
          {showMessage && (
            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Preparing your adventure...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
