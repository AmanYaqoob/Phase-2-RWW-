import {
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  MessageSquare,
  Ban,
  Star,
  ArrowUpRight,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function GuestsPage() {
  const guests = [
    {
      id: "G-1234",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      bookings: 5,
      lastBooking: "May 20, 2023",
      totalSpent: "$10,465",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.9,
    },
    {
      id: "G-1235",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      bookings: 3,
      lastBooking: "June 5, 2023",
      totalSpent: "$5,975",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.7,
    },
    {
      id: "G-1236",
      name: "Emma Rodriguez",
      email: "emma.r@example.com",
      phone: "+1 (555) 345-6789",
      location: "London, UK",
      bookings: 7,
      lastBooking: "July 10, 2023",
      totalSpent: "$12,218",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 5.0,
    },
    {
      id: "G-1237",
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "+1 (555) 456-7890",
      location: "Sydney, Australia",
      bookings: 2,
      lastBooking: "August 3, 2023",
      totalSpent: "$3,906",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.5,
    },
    {
      id: "G-1238",
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
      phone: "+1 (555) 567-8901",
      location: "Toronto, Canada",
      bookings: 4,
      lastBooking: "September 15, 2023",
      totalSpent: "$8,372",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.8,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
          <p className="text-muted-foreground">Manage your guest information and bookings</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>All Guests</CardTitle>
              <CardDescription>View and manage guest information</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search guests..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" />
              </div>
              <Button variant="outline" className="hover:bg-muted">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={guest.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{guest.name}</div>
                          <div className="text-xs text-muted-foreground">{guest.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{guest.location}</TableCell>
                    <TableCell>{guest.bookings}</TableCell>
                    <TableCell>{guest.lastBooking}</TableCell>
                    <TableCell>{guest.totalSpent}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 fill-red-500 text-red-500 mr-1" />
                        <span>{guest.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message Guest
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
                            Block Guest
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
              <span className="font-medium">20</span> results
            </div>
            <Button variant="outline" size="sm" className="hover:bg-muted">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-muted">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
