"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Users, Bed, Bath, Wifi, Car, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock properties data
const MOCK_PROPERTIES = [
  {
    id: "prop1",
    name: "Oceanfront Villa Retreat",
    location: "Bali, Indonesia",
    price: "$299",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi", "Pool", "Kitchen", "Parking"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    description: "Beautiful oceanfront villa perfect for yoga retreats and wellness programs."
  },
  {
    id: "prop2",
    name: "Mountain Yoga Sanctuary",
    location: "Aspen, Colorado",
    price: "$189",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi", "Heating", "Kitchen", "Parking"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    description: "Serene mountain retreat with stunning views and meditation spaces."
  },
  {
    id: "prop3",
    name: "Desert Wellness Center",
    location: "Sedona, Arizona",
    price: "$249",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    amenities: ["Wifi", "Air Conditioning", "Kitchen", "Parking"],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    description: "Peaceful desert retreat center with healing energy and natural beauty."
  },
  {
    id: "prop4",
    name: "Lakeside Creative Workshop",
    location: "Lake Como, Italy",
    price: "$279",
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi", "Kitchen", "Parking", "Boat Access"],
    bedrooms: 6,
    bathrooms: 4,
    maxGuests: 12,
    description: "Inspiring lakeside venue perfect for creative workshops and team retreats."
  },
  {
    id: "prop5",
    name: "Tropical Paradise Retreat",
    location: "Tulum, Mexico",
    price: "$199",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi", "Pool", "Kitchen", "Beach Access"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    description: "Beachfront retreat in the heart of Tulum's spiritual energy."
  },
  {
    id: "prop6",
    name: "Forest Meditation Lodge",
    location: "Costa Rica",
    price: "$159",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Wifi", "Kitchen", "Hiking Trails", "Wildlife Viewing"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    description: "Immersive forest retreat surrounded by nature and wildlife."
  }
]

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [filteredProperties, setFilteredProperties] = useState(MOCK_PROPERTIES)
  const [searchCriteria, setSearchCriteria] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  })

  useEffect(() => {
    // Get search parameters from URL
    const location = searchParams.get('location') || ""
    const checkIn = searchParams.get('checkIn') || ""
    const checkOut = searchParams.get('checkOut') || ""
    const guests = parseInt(searchParams.get('guests')) || 1

    setSearchCriteria({ location, checkIn, checkOut, guests })

    // Filter properties based on search criteria
    let filtered = MOCK_PROPERTIES

    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.name.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (guests > 1) {
      filtered = filtered.filter(property => property.maxGuests >= guests)
    }

    setFilteredProperties(filtered)
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Results Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {searchCriteria.location ? `Properties in ${searchCriteria.location}` : 'All Properties'}
        </h1>
        
        {(searchCriteria.location || searchCriteria.guests > 1) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchCriteria.location && (
              <Badge variant="secondary" className="px-3 py-1">
                <MapPin className="h-3 w-3 mr-1" />
                {searchCriteria.location}
              </Badge>
            )}
            {searchCriteria.checkIn && (
              <Badge variant="secondary" className="px-3 py-1">
                Check-in: {new Date(searchCriteria.checkIn).toLocaleDateString()}
              </Badge>
            )}
            {searchCriteria.checkOut && (
              <Badge variant="secondary" className="px-3 py-1">
                Check-out: {new Date(searchCriteria.checkOut).toLocaleDateString()}
              </Badge>
            )}
            {searchCriteria.guests > 1 && (
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="h-3 w-3 mr-1" />
                {searchCriteria.guests} guests
              </Badge>
            )}
          </div>
        )}
        
        <p className="text-muted-foreground">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Link href={`/properties/${property.id}`} key={property.id} className="group">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="relative h-64 w-full">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-sm font-semibold">
                  {property.price}/night
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{property.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({property.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{property.location}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {property.maxGuests} guests
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {property.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse all properties.
          </p>
          <Button asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
