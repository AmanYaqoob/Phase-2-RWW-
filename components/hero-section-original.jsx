import { Button } from "@/components/ui/button"
import RectangularSearchBar from "./rectangular-search-bar"

export default function HeroSectionOriginal() {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div
        className="h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Find Your Perfect Retreat Destination</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover unique properties for workshops, retreats, and transformative experiences around the world.
          </p>

          {/* Search Bar */}
          <div className="mt-8">
            <RectangularSearchBar />
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Yoga Retreats
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Meditation Centers
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Wellness Escapes
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Creative Workshops
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
