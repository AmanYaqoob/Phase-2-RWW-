"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PropertiesLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
