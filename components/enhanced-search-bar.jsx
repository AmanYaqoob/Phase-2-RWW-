"use client"

import { useState } from "react"
import { Search, MapPin, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { addDays } from "date-fns"

export function EnhancedSearchBar() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("location")
  const [location, setLocation] = useState("")
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    pets: 0,
  })
  const [radius, setRadius] = useState([10])
  const [selectedActivities, setSelectedActivities] = useState([])

  const activities = [
    { id: 1, name: "Yoga", icon: "🧘" },
    { id: 2, name: "Meditation", icon: "🧠" },
    { id: 3, name: "Art Workshop", icon: "🎨" },
    { id: 4, name: "Cooking Class", icon: "🍳" },
    { id: 5, name: "Fitness", icon: "💪" },
    { id: 6, name: "Dance", icon: "💃" },
    { id: 7, name: "Writing", icon: "✍️" },
    { id: 8, name: "Photography", icon: "📸" },
    { id: 9, name: "Music", icon: "🎵" },
    { id: 10, name: "Wellness", icon: "🌿" },
    { id: 11, name: "Business", icon: "💼" },
    { id: 12, name: "Team Building", icon: "🤝" },
  ]

  const toggleActivity = (activity) => {
    if (selectedActivities.some((a) => a.id === activity.id)) {
      setSelectedActivities(selectedActivities.filter((a) => a.id !== activity.id))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const totalGuests = guests.adults + guests.children

  const handleSearch = () => {
    console.log({
      location,
      checkIn,
      checkOut,
      guests,
      radius: radius[0],
      activities: selectedActivities.map((a) => a.name),
    })
    setOpen(false)
  }

  const updateGuests = (type, increment) => {
    setGuests((prev) => {
      const newValue = Math.max(0, prev[type] + increment)

      // Ensure at least 1 adult
      if (type === "adults" && newValue === 0) {
        return prev
      }

      return {
        ...prev,
        [type]: newValue,
      }
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Compact search bar */}
      <div
        className="bg-white rounded-full shadow-lg border border-gray-200 flex items-center p-1 cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-1 items-center px-4 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Where</span>
            <span className="text-sm text-muted-foreground">{location || "Search destinations"}</span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-200 mx-1"></div>

        <div className="hidden md:flex flex-1 items-center px-4 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Check in - Check out</span>
            <span className="text-sm text-muted-foreground">
              {checkIn && checkOut ? `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}` : "Add dates"}
            </span>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-200 mx-1"></div>

        <div className="hidden md:flex flex-1 items-center px-4 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Who</span>
            <span className="text-sm text-muted-foreground">
              {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
              {guests.pets > 0 ? `, ${guests.pets} pet${guests.pets !== 1 ? "s" : ""}` : ""}
            </span>
          </div>
        </div>

        <Button className="rounded-full" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Expanded search dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px] p-0 gap-0">
          <div className="p-4 border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="location">Where</TabsTrigger>
                <TabsTrigger value="dates">When</TabsTrigger>
                <TabsTrigger value="guests">Who</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <TabsContent value="location" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Where are you going?</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search destinations"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search radius</label>
                  <div className="px-3 py-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Distance</span>
                      <span className="text-sm font-medium">{radius[0]} miles</span>
                    </div>
                    <Slider
                      value={radius}
                      onValueChange={setRadius}
                      max={100}
                      step={5}
                      className="[&>span]:bg-primary"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Popular destinations</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Bali, Indonesia", "Aspen, Colorado", "Sedona, Arizona", "Lake Como, Italy"].map((place) => (
                      <Badge
                        key={place}
                        variant="outline"
                        className="py-2 justify-start cursor-pointer hover:bg-muted"
                        onClick={() => setLocation(place)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {place}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dates" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Check-in</label>
                    <label className="text-sm font-medium">Check-out</label>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <div className="flex-1">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                    <div className="flex-1">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        className="rounded-md border"
                        disabled={(date) => date < (checkIn || new Date())}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const today = new Date()
                      setCheckIn(today)
                      setCheckOut(addDays(today, 7))
                    }}
                  >
                    1 week
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const today = new Date()
                      setCheckIn(today)
                      setCheckOut(addDays(today, 14))
                    }}
                  >
                    2 weeks
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const today = new Date()
                      setCheckIn(today)
                      setCheckOut(addDays(today, 30))
                    }}
                  >
                    1 month
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guests" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Adults</h3>
                      <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("adults", -1)}
                        disabled={guests.adults <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-4 text-center">{guests.adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("adults", 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Children</h3>
                      <p className="text-sm text-muted-foreground">Ages 2-12</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("children", -1)}
                        disabled={guests.children <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-4 text-center">{guests.children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("children", 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Pets</h3>
                      <p className="text-sm text-muted-foreground">Service animals always allowed</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("pets", -1)}
                        disabled={guests.pets <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-4 text-center">{guests.pets}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateGuests("pets", 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What activities are you interested in?</label>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedActivities.length > 0 ? (
                      selectedActivities.map((activity) => (
                        <Badge key={activity.id} variant="secondary" className="gap-1 py-1.5">
                          <span>{activity.icon}</span> {activity.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0"
                            onClick={() => toggleActivity(activity)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Select activities you're interested in</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                          selectedActivities.some((a) => a.id === activity.id) ? "bg-primary/10 border-primary" : ""
                        }`}
                        onClick={() => toggleActivity(activity)}
                      >
                        <Checkbox
                          checked={selectedActivities.some((a) => a.id === activity.id)}
                          onCheckedChange={() => toggleActivity(activity)}
                        />
                        <span>{activity.icon}</span>
                        <span>{activity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>

          <div className="flex items-center justify-between p-4 border-t">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
