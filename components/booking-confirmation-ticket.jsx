"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { CheckCircle, Calendar, MapPin, Users, Download, Share, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function BookingConfirmationTicket({ property, dateRange, guests, totalNights, totalPrice }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isAnimating, setIsAnimating] = useState(true)
  const bookingId = `RWW-${Math.floor(100000 + Math.random() * 900000)}`

  useEffect(() => {
    setCurrentTime(new Date())

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const totalGuests = guests.adults + guests.children

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to home
        </Link>

        <div
          className={cn(
            "flex flex-col items-center justify-center text-center mb-8 transition-all duration-1000",
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0 h-0 mb-0 overflow-hidden",
          )}
        >
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your retreat has been successfully booked.</p>
        </div>

        <Card
          className={cn(
            "overflow-hidden border-2 transition-all duration-1000 shadow-lg",
            isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100",
          )}
        >
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl">Retreat</span>
                <span className="font-medium">World Wide</span>
              </div>
              <Badge className="bg-white text-red-800 hover:bg-white/90">Confirmed</Badge>
            </div>
            <h1 className="text-2xl font-bold mt-4">{property.title}</h1>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <CardHeader className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Booking ID</div>
                <div className="font-mono font-medium">{bookingId}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Booking Date</div>
                <div>{format(currentTime, "MMMM d, yyyy")}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Booking Time</div>
                <div>{format(currentTime, "h:mm a")}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-red-600" />
                    Stay Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Check-in</div>
                      <div className="font-medium">
                        {dateRange.from ? format(dateRange.from, "EEE, MMM d, yyyy") : "N/A"}
                      </div>
                      <div className="text-sm">After 3:00 PM</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Check-out</div>
                      <div className="font-medium">
                        {dateRange.to ? format(dateRange.to, "EEE, MMM d, yyyy") : "N/A"}
                      </div>
                      <div className="text-sm">Before 11:00 AM</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold flex items-center mb-2">
                    <Users className="h-4 w-4 mr-2 text-red-600" />
                    Guest Information
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="mb-2">
                      <div className="text-sm text-muted-foreground">Total Guests</div>
                      <div className="font-medium">
                        {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Adults:</span> {guests.adults}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Children:</span> {guests.children}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pets:</span> {guests.pets}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                  <div className="text-sm">
                    <p>
                      Free cancellation until 7 days before check-in. Cancel within 7 days of check-in for a 50% refund.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        ${property.price} x {totalNights} nights
                      </span>
                      <span>${property.price * totalNights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$289</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total paid</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Host Contact</h3>
                  <div className="text-sm">
                    <p>If you need any assistance during your stay, please contact your host:</p>
                    <p className="font-medium mt-1">Maria Garcia</p>
                    <p>+1 (555) 123-4567</p>
                    <p>maria@retreathosting.com</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between bg-muted/30">
            <div className="text-sm text-muted-foreground">
              Thank you for choosing Retreat World Wide for your upcoming retreat!
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className={cn("mt-8 text-center transition-all duration-1000", isAnimating ? "opacity-0" : "opacity-100")}>
          <p className="text-muted-foreground mb-4">A confirmation email has been sent to your email address.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
