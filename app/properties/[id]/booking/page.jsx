"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, CreditCard, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { BookingConfirmationTicket } from "@/components/booking-confirmation-ticket"

export default function BookingPage({ params }) {
  // This would normally be fetched from a database
  const property = {
    id: params.id,
    title: "Oceanfront Villa Retreat",
    location: "Bali, Indonesia",
    price: 299,
    image: "/placeholder.svg?height=400&width=600",
  }

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    pets: 0,
  })

  const [paymentStep, setPaymentStep] = useState("details") // details, payment, confirmation
  const [cardDetails, setCardDetails] = useState({
    number: "1111 1111 1111 1111",
    expiry: "12/25",
    cvc: "123",
    name: "",
    address: "",
    city: "",
    zip: "",
  })

  const totalNights =
    dateRange.from && dateRange.to
      ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24))
      : 7

  const totalGuests = guests.adults + guests.children

  const updateGuests = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, value),
    }))
  }

  const handleCardDetailsChange = (field, value) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePayment = () => {
    // In a real app, this would process the payment
    setPaymentStep("confirmation")
  }

  if (paymentStep === "confirmation") {
    return (
      <BookingConfirmationTicket
        property={property}
        dateRange={dateRange}
        guests={guests}
        totalNights={totalNights}
        totalPrice={property.price * totalNights + 150 + 289}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-primary">Retreat</span> World Wide
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/help" className="text-sm font-medium hover:text-primary">
              Need help?
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href={`/properties/${params.id}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to property
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-6">Complete your booking</h1>

                <div className="bg-muted p-4 rounded-lg mb-8 flex items-center">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-sm">
                    <span className="font-medium">Secure booking process.</span> Your information is encrypted and
                    securely stored.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Your trip</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="check-in">Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-in"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateRange.from && "text-muted-foreground",
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="bg-red-50 p-2 border-b border-red-100">
                              <h4 className="font-medium text-red-700">Select Check-in Date</h4>
                            </div>
                            <CalendarComponent
                              mode="single"
                              selected={dateRange.from}
                              onSelect={(date) =>
                                setDateRange((prev) => ({
                                  ...prev,
                                  from: date,
                                  to: date && prev.to && date > prev.to ? addDays(date, 1) : prev.to,
                                }))
                              }
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="rounded-none border-red-100"
                              classNames={{
                                day_selected:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                                day_today: "bg-red-100 text-red-900",
                                day_range_middle: "bg-red-50 text-red-900",
                                day_range_end:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                                day_range_start:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="check-out">Check-out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-out"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateRange.to && "text-muted-foreground",
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="bg-red-50 p-2 border-b border-red-100">
                              <h4 className="font-medium text-red-700">Select Check-out Date</h4>
                            </div>
                            <CalendarComponent
                              mode="single"
                              selected={dateRange.to}
                              onSelect={(date) =>
                                setDateRange((prev) => ({
                                  ...prev,
                                  to: date,
                                }))
                              }
                              initialFocus
                              disabled={(date) => date <= dateRange.from || date < new Date()}
                              className="rounded-none border-red-100"
                              classNames={{
                                day_selected:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                                day_today: "bg-red-100 text-red-900",
                                day_range_middle: "bg-red-50 text-red-900",
                                day_range_end:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                                day_range_start:
                                  "bg-red-600 text-white hover:bg-red-600 hover:text-white focus:bg-red-600",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <Label>Guests</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Adults</p>
                              <p className="text-xs text-muted-foreground">Ages 13+</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("adults", guests.adults - 1)}
                                disabled={guests.adults <= 1}
                              >
                                -
                              </Button>
                              <span className="w-4 text-center">{guests.adults}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("adults", guests.adults + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Children</p>
                              <p className="text-xs text-muted-foreground">Ages 2-12</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("children", guests.children - 1)}
                                disabled={guests.children <= 0}
                              >
                                -
                              </Button>
                              <span className="w-4 text-center">{guests.children}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("children", guests.children + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Pets</p>
                              <p className="text-xs text-muted-foreground">Service animals welcome</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("pets", guests.pets - 1)}
                                disabled={guests.pets <= 0}
                              >
                                -
                              </Button>
                              <span className="w-4 text-center">{guests.pets}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateGuests("pets", guests.pets + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {paymentStep === "details" && (
                    <>
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Contact information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input id="phone" type="tel" />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button onClick={() => setPaymentStep("payment")}>Continue to Payment</Button>
                        </div>
                      </div>
                    </>
                  )}

                  {paymentStep === "payment" && (
                    <>
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Payment method</h2>
                        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg mb-6 border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5 text-red-600" />
                            <h3 className="font-medium">Stripe Test Mode</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Use card number <span className="font-mono font-medium">1111 1111 1111 1111</span> with any
                            future expiry date and CVC.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card number</Label>
                            <div className="flex items-center border rounded-md pl-3">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="card-number"
                                value={cardDetails.number}
                                onChange={(e) => handleCardDetailsChange("number", e.target.value)}
                                className="border-0"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => handleCardDetailsChange("expiry", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                value={cardDetails.cvc}
                                onChange={(e) => handleCardDetailsChange("cvc", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on card</Label>
                            <Input
                              id="name-on-card"
                              value={cardDetails.name}
                              onChange={(e) => handleCardDetailsChange("name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billing-address">Billing address</Label>
                            <Input
                              id="billing-address"
                              value={cardDetails.address}
                              onChange={(e) => handleCardDetailsChange("address", e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                value={cardDetails.city}
                                onChange={(e) => handleCardDetailsChange("city", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP code</Label>
                              <Input
                                id="zip"
                                value={cardDetails.zip}
                                onChange={(e) => handleCardDetailsChange("zip", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
                    <RadioGroup defaultValue="flexible">
                      <div className="flex items-start space-x-2 mb-4">
                        <RadioGroupItem value="flexible" id="flexible" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="flexible" className="font-medium">
                            Flexible - Full refund 7 days before check-in
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Cancel up to 7 days before check-in and get a full refund. Cancel within 7 days of check-in
                            and get a 50% refund.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="moderate" className="font-medium">
                            Moderate - Full refund 14 days before check-in
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Cancel up to 14 days before check-in and get a full refund. Cancel within 14 days of
                            check-in and get a 50% refund.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription>{property.location}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Price details</h3>
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
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total (USD)</span>
                    <span>${property.price * totalNights + 150 + 289}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  {paymentStep === "payment" ? (
                    <Button className="w-full" size="lg" onClick={handlePayment}>
                      Pay ${property.price * totalNights + 150 + 289}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setPaymentStep("payment")}
                      disabled={paymentStep !== "details"}
                    >
                      Continue to Payment
                    </Button>
                  )}
                  <div className="text-center text-sm text-muted-foreground">
                    By selecting the button above, you agree to our{" "}
                    <Link href="/terms" className="underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
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
