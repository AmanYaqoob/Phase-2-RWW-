"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeaturedRetreats from "@/components/featured-retreats"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Retreats Section */}
        <FeaturedRetreats />

        {/* How It Works Section */}
        <section className="py-20 px-4 md:px-6 bg-muted">
          <div className="container mx-auto">
            <div>
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find and book the perfect retreat space in just a few simple steps
                </p>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Find Your Space",
                    description:
                      "Search our curated collection of retreat spaces based on your specific needs and preferences.",
                    icon: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop",
                    step: "01",
                  },
                  {
                    title: "Book Your Dates",
                    description:
                      "Select your preferred dates and complete the booking process securely through our platform.",
                    icon: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop",
                    step: "02",
                  },
                  {
                    title: "Enjoy Your Retreat",
                    description:
                      "Arrive at your retreat space and focus on what matters most - creating an amazing experience.",
                    icon: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
                    step: "03",
                  },
                ].map((step, index) => (
                  <div key={index}>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-card rounded-lg p-6 h-full flex flex-col">
                        <div className="mb-4 relative h-48 overflow-hidden rounded-md">
                          <Image
                            src={step.icon || "/placeholder.svg"}
                            alt={step.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-black text-white">
          <div className="container mx-auto">
            <div>
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Host Your Retreat?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  List your property on Retreat World Wide and connect with retreat leaders and participants from around
                  the globe.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="transition-transform hover:scale-105 bg-white text-black hover:bg-white/90"
                >
                  List Your Property
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105 border-white text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
