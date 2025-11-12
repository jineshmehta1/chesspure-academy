import { HeroSection } from "@/components/hero-section"
import { EventsPreview } from "@/components/events-preview"
import { CTASection } from "@/components/demo-booking-cta"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { WhyChessForKids } from "@/components/why"
import { CoursesSection } from "@/components/courses-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <CoursesSection/>
        
        <StatsSection />
        <WhyChessForKids/>
        <TestimonialsSection />
        <CTASection />
         
      </main>
    </div>
  )
}
