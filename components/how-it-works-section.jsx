import { Search, Calendar, CreditCard } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-red-600" />,
      title: "Find the Perfect Retreat",
      description:
        "Search through our curated collection of properties perfect for workshops, events, or getaways. Filter by location, amenities, and more.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-red-600" />,
      title: "Book Your Dates",
      description:
        "Check availability and reserve your dates. Communicate directly with property owners to discuss specific requirements.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-red-600" />,
      title: "Secure Payment",
      description:
        "Pay securely through our platform with Stripe. Your booking is confirmed instantly with our secure payment system.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Simple steps to find and book your perfect retreat space
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
