import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Yoga Instructor",
      content:
        "Retreat World Wide helped me find the perfect venue for my yoga retreat. The booking process was seamless, and my students loved the property!",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Trainer",
      content:
        "I've used Retreat World Wide for multiple corporate workshops. The variety of properties and the detailed information made it easy to find exactly what we needed.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Property Owner",
      content:
        "As a property owner, I've been able to reach the perfect audience for my retreat center. The platform is intuitive and the support team is always helpful.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Hear from instructors, vendors, and property owners who have used Retreat World Wide
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-red-600 text-red-600" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground flex-1">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
