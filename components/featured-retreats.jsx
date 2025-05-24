"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"

export default function FeaturedRetreats() {
  const retreats = [
    {
      id: 1,
      title: "Tropical oasis. Walk to beach. Perfect for family.",
      location: "Playa Junquillal, Guanacaste Province, Costa Rica",
      price: 499,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Peak Paradise | Luxe Aspen Mtntop Estate for 22",
      location: "Paradise Peak, Highland Place Way, Pigeon Forge, TN, United States",
      price: 500,
      image: "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Rustic Retreat w Hot Tub, Game Room & Fire Pit",
      location: "Naples, New York, United States",
      price: 500,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Featured Retreats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {retreats.map((retreat) => (
          <Link href={`/retreats/${retreat.id}`} key={retreat.id} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                {/* Price tag */}
                <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-sm font-semibold z-10">
                  ${retreat.price}/night
                </div>

                {/* Image */}
                <div className="relative h-72 w-full">
                  <Image
                    src={retreat.image}
                    alt={retreat.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-lg">{retreat.title}</h3>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{retreat.location}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
