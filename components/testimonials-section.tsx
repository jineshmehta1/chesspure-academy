"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Users, Trophy, Target } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const white = "#FFFFFF";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Parent & Student",
      rating: 5,
      content:
        "My son started at 6 years old and now plays in national tournaments. The coaches are patient, fun, and truly care about each child.",
      image: "/demo-priya.jpg",
    },
    {
      id: 2,
      name: "Rohan Mehta",
      role: "Adult Beginner",
      rating: 5,
      content:
        "I never thought I'd enjoy chess, but the structured lessons and live practice games made it addictive. Up 400 ELO in 4 months!",
      image: "/demo-rohan.jpg",
    },
    {
      id: 3,
      name: "Ananya Desai",
      role: "Intermediate Player",
      rating: 5,
      content:
        "The tactical puzzles and endgame drills are gold. My coach gives personalized feedback — I just won my first rated tournament!",
      image: "/demo-ananya.jpg",
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Tournament Player",
      rating: 5,
      content:
        "Best decision for serious improvement. Weekly analysis sessions + opening prep helped me break 1800 rating.",
      image: "/demo-vikram.jpg",
    },
    {
      id: 5,
      name: "Little Aryan",
      role: "Age 8, Chess Prodigy",
      rating: 5,
      content:
        "I love the fun puzzles and story-based lessons! My teacher says I’m getting really good at checkmates!",
      image: "/demo-aryan.jpg",
    },
    {
      id: 6,
      name: "Neha Kapoor",
      role: "Working Professional",
      rating: 5,
      content:
        "Flexible online classes fit my schedule. The community tournaments are exciting — I even beat a 1500-rated player!",
      image: "/demo-neha.jpg",
    },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = [
    ...testimonials.slice(currentIndex),
    ...testimonials.slice(0, currentIndex),
  ].slice(0, 3);

  return (
    <>
      {/* Embedded Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(255, 199, 39, 0.3); }
          50% { box-shadow: 0 0 30px rgba(255, 199, 39, 0.6); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.6s ease-out forwards; }
        .animate-pulseGlow { animation: pulseGlow 2s infinite ease-in-out; }
      `}</style>

      <section
        className="py-20 bg-white overflow-hidden"
        style={{ fontFamily }}
      >
        <div className="container mx-auto px-4">
          {/* Gradient Heading */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 bg-[#5C1F1C] bg-clip-text text-transparent"
              
            >
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real students, real progress. See how ChessPure Academy transforms beginners into champions.
            </p>
          </div>

          {/* Auto-Rotating Carousel */}
          <div className="relative max-w-6xl mx-auto mb-16" ref={testimonialsRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleTestimonials.map((testimonial, idx) => (
                <Card
                  key={`${testimonial.id}-${currentIndex}`}
                  className={`
                    bg-gradient-to-b from-[#5C1F1C] to-[#4A1815] 
                    text-white border border-amber-300/30 
                    p-6 transition-all duration-700 
                    hover:scale-105 hover:shadow-2xl 
                    hover:shadow-amber-500/30 
                    animate-slideIn
                  `}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <CardContent className="p-0">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-5">
                      <Quote className="absolute -top-3 -left-2 w-8 h-8 text-amber-400/30" />
                      <p className="text-amber-50 italic pl-6 leading-relaxed text-sm">
                        "{testimonial.content}"
                      </p>
                    </div>

                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulseGlow">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-amber-200 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(Math.ceil(testimonials.length / 3))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i * 3)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 3) === i
                      ? "bg-amber-500 w-8"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>


        </div>
      </section>
    </>
  );
}