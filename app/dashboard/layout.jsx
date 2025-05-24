"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Preloader } from "@/components/preloader"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    } else {
      setLoading(false)
    }

    // Hide preloader after 2.5 seconds
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  if (showPreloader) {
    return <Preloader />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Header />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
