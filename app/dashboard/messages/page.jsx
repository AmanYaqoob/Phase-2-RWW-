import { Search, MoreHorizontal, Send, Paperclip, Smile, Phone, Video, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Hi, I'm interested in booking your Oceanfront Villa Retreat for a yoga retreat next month.",
      time: "10:30 AM",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Brown",
      lastMessage: "Thank you for the information. I'll check the dates and get back to you.",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      lastMessage: "Is the property available from July 10-17? We're a group of 15 people.",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "David Wilson",
      lastMessage: "I've just made the payment for the booking. Please confirm when you receive it.",
      time: "Monday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Jennifer Lee",
      lastMessage: "Do you have any special rates for longer stays? We're looking at a 2-week retreat.",
      time: "Sunday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi, I'm interested in booking your Oceanfront Villa Retreat for a yoga retreat next month.",
      time: "10:30 AM",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      sender: "Me",
      content:
        "Hello Sarah! Thank you for your interest. I'd be happy to provide more information. When exactly are you planning to visit and how many people will be in your group?",
      time: "10:35 AM",
      isMe: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "We're looking at dates from June 15-22, and we'll have about 12 participants plus 2 instructors.",
      time: "10:40 AM",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      sender: "Me",
      content:
        "That sounds great! The villa can comfortably accommodate up to 20 guests, so your group size works perfectly. The property has a dedicated yoga pavilion overlooking the ocean which would be perfect for your retreat.",
      time: "10:45 AM",
      isMe: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content:
        "That sounds perfect! Could you tell me more about the yoga pavilion? What's the size and what kind of equipment is available?",
      time: "10:50 AM",
      isMe: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with your guests and property owners</p>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-lg border">
        {/* Conversation List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search conversations..." className="pl-8" />
            </div>
          </div>
          <div className="overflow-auto h-[calc(100vh-13rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${conversation.id === 1 ? "bg-muted" : ""}`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-red-600" />}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Sarah Johnson</h3>
                <p className="text-xs text-muted-foreground">Interested in Oceanfront Villa Retreat</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <Info className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                  <div className="px-3 py-2 bg-background border-b border-border/50">
                    <DropdownMenuLabel className="text-sm font-semibold">Options</DropdownMenuLabel>
                  </div>
                  <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-muted/80 transition-colors">View Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-muted/80 transition-colors">View Booking</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-muted/80 transition-colors">Mark as Unread</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer py-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-600 focus:bg-red-50 transition-colors">
                    Block Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.isMe ? "flex-row-reverse" : ""}`}>
                  {!message.isMe && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
