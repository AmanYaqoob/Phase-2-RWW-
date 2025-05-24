"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Tag,
  Filter,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Review new booking requests",
      description: "Check and approve pending booking requests",
      status: "in-progress",
      priority: "high",
      dueDate: "2023-05-22",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "bookings",
      completed: false,
    },
    {
      id: 2,
      title: "Update property descriptions",
      description: "Update the descriptions for all properties with new amenities",
      status: "todo",
      priority: "medium",
      dueDate: "2023-05-25",
      assignedTo: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "properties",
      completed: false,
    },
    {
      id: 3,
      title: "Schedule maintenance for Oceanfront Villa",
      description: "Arrange for AC repair and general maintenance",
      status: "todo",
      priority: "high",
      dueDate: "2023-05-20",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "maintenance",
      completed: false,
    },
    {
      id: 4,
      title: "Respond to guest inquiries",
      description: "Reply to messages from potential guests",
      status: "completed",
      priority: "high",
      dueDate: "2023-05-18",
      assignedTo: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "communication",
      completed: true,
    },
    {
      id: 5,
      title: "Update pricing for summer season",
      description: "Review and adjust pricing for all properties for the summer months",
      status: "in-progress",
      priority: "medium",
      dueDate: "2023-05-30",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "pricing",
      completed: false,
    },
    {
      id: 6,
      title: "Order new linens for Mountain Yoga Sanctuary",
      description: "Purchase new bedding and towels for the property",
      status: "todo",
      priority: "low",
      dueDate: "2023-06-05",
      assignedTo: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "inventory",
      completed: false,
    },
    {
      id: 7,
      title: "Review and approve invoices",
      description: "Check and approve pending vendor invoices",
      status: "completed",
      priority: "medium",
      dueDate: "2023-05-15",
      assignedTo: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      category: "finance",
      completed: true,
    },
  ])

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const completed = !task.completed
          return {
            ...task,
            completed,
            status: completed ? "completed" : task.status === "completed" ? "todo" : task.status,
          }
        }
        return task
      }),
    )
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getCategoryBadge = (category) => {
    const categories = {
      bookings: { bg: "bg-blue-100", text: "text-blue-800", hover: "hover:bg-blue-200" },
      properties: { bg: "bg-purple-100", text: "text-purple-800", hover: "hover:bg-purple-200" },
      maintenance: { bg: "bg-orange-100", text: "text-orange-800", hover: "hover:bg-orange-200" },
      communication: { bg: "bg-green-100", text: "text-green-800", hover: "hover:bg-green-200" },
      pricing: { bg: "bg-yellow-100", text: "text-yellow-800", hover: "hover:bg-yellow-200" },
      inventory: { bg: "bg-indigo-100", text: "text-indigo-800", hover: "hover:bg-indigo-200" },
      finance: { bg: "bg-red-100", text: "text-red-800", hover: "hover:bg-red-200" },
    }

    const style = categories[category] || { bg: "bg-gray-100", text: "text-gray-800", hover: "hover:bg-gray-200" }

    return <Badge className={`${style.bg} ${style.text} ${style.hover}`}>{category}</Badge>
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your property management tasks</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Completion</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter((task) => task.status === "todo").length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter((task) => task.status === "todo" && task.priority === "high").length} high priority
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter((task) => task.status === "in-progress").length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter((task) => task.status === "in-progress" && task.priority === "high").length} high priority
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter((task) => task.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter((task) => task.completed && new Date(task.dueDate) >= new Date()).length} completed on time
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Task List</CardTitle>
              <CardDescription>Manage and track your tasks</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search tasks..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" />
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
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    task.completed ? "bg-muted/50" : "hover:bg-muted/30"
                  } transition-colors`}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3
                        className={`font-medium text-base ${
                          task.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {getPriorityBadge(task.priority)}
                        {getCategoryBadge(task.category)}
                      </div>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {task.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignedTo.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignedTo.name}</span>
                      </div>
                    </div>
                  </div>
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
                        Change Due Date
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Tag className="mr-2 h-4 w-4" />
                        Change Category
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toggleTaskCompletion(task.id)}>
                        {task.completed ? (
                          <>
                            <Circle className="mr-2 h-4 w-4" />
                            Mark as Incomplete
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Complete
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
