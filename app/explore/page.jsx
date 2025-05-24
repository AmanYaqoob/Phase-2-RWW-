import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Filter, List, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function ExplorePage() {
  const properties = [
    {
      id: 1,
      title: "Oceanfront Villa Retreat",
      location: "Bali, Indonesia",
      price: 299,
      rating: 4.9,
      reviews: 128,
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
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
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Lakeside", "Workshop"],
      type: "Workshop",
    },
    {
      id: 5,
      title: "Forest Meditation Retreat",
      location: "Kyoto, Japan",
      price: 199,
      rating: 4.8,
      reviews: 87,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Forest", "Meditation"],
      type: "Retreat",
    },
    {
      id: 6,
      title: "Urban Art Studio",
      location: "Barcelona, Spain",
      price: 159,
      rating: 4.6,
      reviews: 64,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Urban", "Art"],
      type: "Studio",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-red-600">Retreat</span> World Wide
          </Link>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link href="/properties" className="text-sm font-medium hover:text-primary">
              Properties
            </Link>
            <Link href="/explore" className="text-sm font-medium text-red-600">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="ml-auto md:ml-4 flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Explore Retreats</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 w-[200px] md:w-[300px]" placeholder="Search locations..." />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All properties</SelectItem>
                    <SelectItem value="retreat">Retreats</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="villa">Villas</SelectItem>
                    <SelectItem value="center">Centers</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden md:block">
                  <Select defaultValue="price">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Any price</SelectItem>
                      <SelectItem value="0-100">$0 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200-300">$200 - $300</SelectItem>
                      <SelectItem value="300+">$300+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="hidden lg:block">
                  <Select defaultValue="guests">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guests">Any number</SelectItem>
                      <SelectItem value="1-5">1-5 guests</SelectItem>
                      <SelectItem value="6-10">6-10 guests</SelectItem>
                      <SelectItem value="11-20">11-20 guests</SelectItem>
                      <SelectItem value="20+">20+ guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <TabsList>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Link href={`/properties/${property.id}`} key={property.id} className="group">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                      <div className="relative aspect-[4/3] overflow-hidden">
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
                          <div className="text-right">
                            <div className="font-semibold">
                              ${property.price}{" "}
                              <span className="text-muted-foreground font-normal text-sm">/ night</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-red-500">★</span>
                              <span className="ml-1 font-medium">{property.rating}</span>
                              <span className="text-muted-foreground ml-1">({property.reviews})</span>
                            </div>
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
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load more</Button>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-muted">
                <div className="h-full w-full bg-[url('/placeholder.svg?height=720&width=1280')] bg-cover bg-center">
                  <div className="absolute top-4 left-4 z-10">
                    <Card className="w-[300px]">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Filter properties</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Price range</label>
                            <Slider defaultValue={[0, 500]} max={1000} step={10} />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>$0</span>
                              <span>$1000+</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Property type</label>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="cursor-pointer">
                                All
                              </Badge>
                              <Badge variant="outline" className="cursor-pointer">
                                Retreats
                              </Badge>
                              <Badge variant="outline" className="cursor-pointer">
                                Workshops
                              </Badge>
                              <Badge variant="outline" className="cursor-pointer">
                                Villas
                              </Badge>
                            </div>
                          </div>
                          <Button className="w-full">Apply filters</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-muted mt-12">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Retreat World Wide. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
