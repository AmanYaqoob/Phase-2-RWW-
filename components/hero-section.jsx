import Image from "next/image"
import DynamicSearchBar from "@/components/dynamic-search-bar"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
      <div className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury retreat by the ocean"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-white drop-shadow-md">
            Find Your Perfect <span className="text-white">Retreat</span> Worldwide
          </h1>
          <p className="mx-auto max-w-[700px] text-white text-xl drop-shadow-md">
            Discover unique properties for workshops, events, and getaways
          </p>
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 z-30 px-4">
        <DynamicSearchBar />
      </div>
    </section>
  )
}
