"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="text-primary">Retreat</span> World Wide
        </Link>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link href="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm" className="transition-all hover:scale-105">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="transition-all hover:scale-105">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
