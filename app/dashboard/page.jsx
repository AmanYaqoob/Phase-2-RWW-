"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  DollarSign,
  Star,
  Building,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  ChevronRight,
  Package,
  MessageSquare,
  FolderSyncIcon as Sync,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { BookingsChart } from "@/components/dashboard/charts/bookings-chart"
import { UserRoleBadge } from "@/components/user-role-badge"

export default function DashboardPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Role-specific content
  const getRoleSpecificContent = () => {
    if (!user) return null

    switch (user.role) {
      case "property-owner":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+20.1% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+8 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+2 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+0.2 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <RevenueChart />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Monthly bookings for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BookingsChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Calendar Sync</CardTitle>
                  <CardDescription>Sync your property availability with external calendars</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Sync className="h-4 w-4" />
                  Sync Now
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-muted-foreground">Last synced: 2 hours ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Lodigfy Calender</p>
                        <p className="text-sm text-muted-foreground">Last synced: 1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">VRBO Calendar</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>


          </>
        )

      case "vendor":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28,459.75</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+12.5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+18.3% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+5 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+0.3 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <RevenueChart />
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Order Trends</CardTitle>
                  <CardDescription>Monthly orders for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BookingsChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Your Products</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4].map((product) => (
                    <Card key={product} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Product"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600 hover:bg-green-700">In Stock</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Yoga Mat Premium</CardTitle>
                        <CardDescription>Eco-friendly, non-slip surface</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">$49.99</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-medium flex items-center">
                              4.8 <Star className="h-3 w-3 fill-red-500 text-red-500 ml-1" />
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sold</p>
                            <p className="font-medium">124</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" className="hover:bg-muted">
                          Edit
                        </Button>
                        <Button size="sm" className="hover:bg-primary/90">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" asChild className="hover:bg-muted">
                    <Link href="/dashboard/products">
                      View All Products
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="orders">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>You have 18 orders this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2, 3, 4].map((order) => (
                        <div key={order} className="flex items-center hover:bg-muted p-2 rounded-md transition-colors">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">
                              Yoga Mat Premium (2), Meditation Cushion (1)
                            </p>
                          </div>
                          <div className="ml-auto font-medium">
                            <Badge>Shipped</Badge>
                          </div>
                          <div className="ml-4 font-medium">$129.97</div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="inventory">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                    <CardDescription>Current stock levels for your products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center hover:bg-muted p-2 rounded-md transition-colors">
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <Package className="h-5 w-5" />
                          </div>
                          <div className="ml-4 space-y-1 flex-1">
                            <p className="text-sm font-medium leading-none">Yoga Mat Premium</p>
                            <p className="text-sm text-muted-foreground">SKU: YMP-001</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">In Stock</p>
                              <p className="font-medium">45</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Reorder Point</p>
                              <p className="font-medium">15</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="ml-4">
                            Restock
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )

      case "instructor":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$32,450.89</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+15.3% from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Workshops</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+2 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+24 from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    <span>+0.2 from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Calendar Sync</CardTitle>
                    <CardDescription>Sync your workshop schedule with external calendars</CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Sync className="h-4 w-4" />
                    Sync Now
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Google Calendar</p>
                          <p className="text-sm text-muted-foreground">Last synced: 1 hour ago</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Outlook Calendar</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Property Connections</CardTitle>
                  <CardDescription>Properties where you host workshops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder.svg?height=36&width=36" />
                          <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Sarah Property</p>
                            <UserRoleBadge role="property-owner" className="h-5" />
                          </div>
                          <p className="text-sm text-muted-foreground">Oceanfront Villa Retreat</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder.svg?height=36&width=36" />
                          <AvatarFallback>JP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">James Property</p>
                            <UserRoleBadge role="property-owner" className="h-5" />
                          </div>
                          <p className="text-sm text-muted-foreground">Mountain Retreat Center</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Find More Properties
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="workshops">
              <TabsList>
                <TabsTrigger value="workshops">Your Workshops</TabsTrigger>
                <TabsTrigger value="bookings">Active Bookings</TabsTrigger>
                <TabsTrigger value="pending">Pending Bookings</TabsTrigger>
              </TabsList>
              <TabsContent value="workshops" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((workshop) => (
                    <Card key={workshop} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-video">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Workshop"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-600 hover:bg-red-700">Active</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>Yoga and Meditation Retreat</CardTitle>
                        <CardDescription>Bali, Indonesia • June 15-22, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">$1,299</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Bookings</p>
                            <p className="font-medium">18/20</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-medium flex items-center">
                              4.9 <Star className="h-3 w-3 fill-red-500 text-red-500 ml-1" />
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" className="hover:bg-muted">
                          Edit
                        </Button>
                        <Button size="sm" className="hover:bg-primary/90">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bookings">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>Active Bookings</CardTitle>
                    <CardDescription>Confirmed bookings for your workshops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2, 3, 4].map((booking) => (
                        <div
                          key={booking}
                          className="flex items-center hover:bg-muted p-2 rounded-md transition-colors"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Yoga and Meditation Retreat</p>
                          </div>
                          <div className="ml-auto font-medium">
                            <Badge>June 15 - June 22</Badge>
                          </div>
                          <div className="ml-4 font-medium">$1,299</div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pending">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>Pending Bookings</CardTitle>
                    <CardDescription>Bookings awaiting confirmation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2].map((booking) => (
                        <div
                          key={booking}
                          className="flex items-center hover:bg-muted p-2 rounded-md transition-colors"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg?height=36&width=36" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Michael Brown</p>
                            <p className="text-sm text-muted-foreground">Mindfulness Workshop</p>
                          </div>
                          <div className="ml-auto font-medium">
                            <Badge variant="outline">July 10 - July 15</Badge>
                          </div>
                          <div className="ml-4 font-medium">$899</div>
                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline" className="h-8">
                              Decline
                            </Button>
                            <Button size="sm" className="h-8">
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Please log in to view your dashboard</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            {user?.role && <UserRoleBadge role={user.role} />}
          </div>
          <p className="text-muted-foreground">Welcome back, {user?.name || "User"}</p>
        </div>
        <div className="flex gap-2">
          {user?.role === "property-owner" && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          )}
          {user?.role === "instructor" && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workshop
            </Button>
          )}
          {user?.role === "vendor" && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>
      </div>

      {getRoleSpecificContent()}
    </div>
  )
}
