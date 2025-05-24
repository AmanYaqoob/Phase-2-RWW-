"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Oceanfront Villa Retreat",
      location: "Bali, Indonesia",
      price: 299,
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
      tags: ["Beachfront", "Villa"],
      type: "Property",
    },
    {
      id: 2,
      title: "Mountain Yoga Sanctuary",
      location: "Aspen, Colorado",
      price: 189,
      rating: 4.8,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=2070&auto=format&fit=crop",
      tags: ["Mountain", "Yoga"],
      type: "Retreat",
    },
    {
      id: 3,
      title: "Desert Wellness Center",
      location: "Sedona, Arizona",
      price: 249,
      rating: 4.7,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
      tags: ["Wellness", "Desert"],
      type: "Center",
    },
    {
      id: 4,
      title: "Lakeside Creative Workshop",
      location: "Lake Como, Italy",
      price: 279,
      rating: 4.9,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
      tags: ["Lakeside", "Workshop"],
      type: "Workshop",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link href={`/properties/${property.id}`} className="group">
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
                    {property.type}
                  </Badge>
                </div>
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {property.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-red-600 text-red-600 mr-1" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({property.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {property.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="font-semibold">
                  ${property.price} <span className="text-muted-foreground font-normal text-sm">/ night</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
