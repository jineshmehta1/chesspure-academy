import { HeroSection } from "@/components/hero-section"
import { EventsPreview } from "@/components/events-preview"
import { DemoBookingCTA } from "@/components/demo-booking-cta"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <StatsSection />
        <EventsPreview />
        <DemoBookingCTA />
        <TestimonialsSection />
    </div>
  )
}
