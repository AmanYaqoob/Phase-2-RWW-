"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HostCTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Ready to Host Your Retreat?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground"
            >
              Join our community of property owners and start earning by sharing your unique space with retreat
              organizers worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-600 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium">List your property</h3>
                  <p className="text-muted-foreground">
                    Create a detailed listing with photos, amenities, and availability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-600 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Welcome guests</h3>
                  <p className="text-muted-foreground">
                    Host retreat organizers and their participants at your property.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <span className="text-red-600 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Get paid</h3>
                  <p className="text-muted-foreground">
                    Receive secure payments for each booking through our platform.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-lg px-8 py-6 h-auto">
                  Become a Host
                </Button>
              </Link>
              <Link href="/host-info">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury retreat property"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                  <p className="font-medium text-red-600">Property Owner</p>
                  <p className="text-sm mt-1">
                    "Hosting retreats has been an incredible experience. I've met amazing people and created a
                    sustainable income from my property."
                  </p>
                  <p className="text-sm font-medium mt-2">— Maria G., Bali</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
