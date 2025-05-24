import {
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Plus,
  PenToolIcon as Tool,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MaintenancePage() {
  const maintenanceRequests = [
    {
      id: "M-1234",
      property: "Oceanfront Villa Retreat",
      issue: "Broken air conditioning in main yoga room",
      priority: "high",
      status: "pending",
      reportedBy: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      reportedDate: "May 20, 2023",
      assignedTo: {
        name: "Mike Technician",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      scheduledDate: "May 22, 2023",
    },
    {
      id: "M-1235",
      property: "Mountain Yoga Sanctuary",
      issue: "Leaking roof in meditation space",
      priority: "high",
      status: "in-progress",
      reportedBy: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      reportedDate: "June 5, 2023",
      assignedTo: {
        name: "John Repair",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      scheduledDate: "June 7, 2023",
    },
    {
      id: "M-1236",
      property: "Desert Wellness Center",
      issue: "Faulty lighting in workshop area",
      priority: "medium",
      status: "completed",
      reportedBy: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      reportedDate: "July 10, 2023",
      assignedTo: {
        name: "Lisa Electrician",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      scheduledDate: "July 12, 2023",
      completedDate: "July 13, 2023",
    },
    {
      id: "M-1237",
      property: "Lakeside Creative Workshop",
      issue: "Plumbing issue in kitchen",
      priority: "low",
      status: "scheduled",
      reportedBy: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      reportedDate: "August 3, 2023",
      assignedTo: {
        name: "Robert Plumber",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      scheduledDate: "August 10, 2023",
    },
    {
      id: "M-1238",
      property: "Oceanfront Villa Retreat",
      issue: "Damaged furniture in lounge area",
      priority: "medium",
      status: "completed",
      reportedBy: {
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      reportedDate: "September 15, 2023",
      assignedTo: {
        name: "Carlos Carpenter",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      scheduledDate: "September 18, 2023",
      completedDate: "September 19, 2023",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
            <Tool className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900">
            <AlertTriangle className="mr-1 h-3 w-3" />
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Low
          </Badge>
        )
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Manage maintenance requests for your properties</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>View and manage maintenance issues</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                />
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
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.property}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={request.issue}>
                          {request.issue}
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.reportedBy.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.reportedBy.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{request.reportedBy.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={request.assignedTo.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.assignedTo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{request.assignedTo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.scheduledDate}</TableCell>
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Request
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
                <span className="font-medium">24</span> results
              </div>
              <Button variant="outline" size="sm" className="hover:bg-muted">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-muted">
                Next
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
