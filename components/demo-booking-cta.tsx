"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Brand theme colors
const primaryColor = "#5C1F1C";    // Deep brown (CTA background)
const accentColor = "#FFC727";     // Gold/yellow (accents)
const white = "#FFFFFF";
const boardWhite = "#f0d9b5";
const boardBrown = "#b58863";
const textDark = "#74292F";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export function CTASection() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>

      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: white, fontFamily }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* LEFT: Product Pack */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative animate-float">
                {/* Main Pack */}
                <div className="relative">
                  <div
                    className="rounded-t-3xl p-6 pt-8 shadow-2xl"
                    style={{
                      width: "320px",
                      background: `linear-gradient(to bottom, ${accentColor}, #e5b31e)`,
                    }}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-5xl font-black text-white tracking-tighter">CHESS</h3>
                      <p className="text-xs text-white/90 uppercase tracking-widest mt-1">PURE ACADEMY</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-white text-xs font-bold">
                        <div className="text-center">
                          <div className="text-lg">1000+</div>
                          <div>Students Trained</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg">50+</div>
                          <div>National Titles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg">15+</div>
                          <div>FIDE Coaches</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg">2000+</div>
                          <div>Training Games</div>
                        </div>
                      </div>
                    </div>

                    {/* Packets */}
                    <div className="flex justify-center gap-1 -mb-6 relative z-10">
                      {[primaryColor, accentColor, boardBrown, boardWhite].map((color, i) => (
                        <div
                          key={i}
                          className="w-16 h-24 rounded-t-lg shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                          style={{
                            backgroundColor: color,
                            transform: `rotate(${i % 2 === 0 ? -8 : 8}deg) translateY(${i * 4}px)`,
                            color: color === accentColor || color === boardWhite ? primaryColor : white,
                          }}
                        >
                          <div className="flex items-center justify-center h-full font-bold text-xl">
                            {i === 0 ? "C" : i === 1 ? "P" : i === 2 ? "A" : "star"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Label */}
                  <div
                    className="text-center py-3 rounded-b-3xl -mt-1 shadow-xl"
                    style={{
                      background: `linear-gradient(to right, ${boardBrown}, ${boardWhite})`,
                      color: primaryColor,
                    }}
                  >
                    <p className="text-sm font-bold uppercase tracking-wider">CHESS MASTERY PACK</p>
                    <p className="text-xs opacity-80">Beginner to Grandmaster</p>
                  </div>
                </div>

                {/* Floating Badges */}
                <div
                  className="absolute -top-4 -left-4 text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                  style={{ backgroundColor: primaryColor, color: white }}
                >
                  ZERO EXCUSES
                </div>
                <div className="absolute -bottom-6 -right-6 flex gap-1">
                  {["USA", "FIDE", "100%", "GM"].map((t, i) => (
                    <div
                      key={i}
                      className="text-[10px] font-bold px-2 py-1 rounded shadow"
                      style={{ backgroundColor: primaryColor, color: white }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Hero Text + Image */}
            <div className="text-[#5C1F1C] lg:text-left text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Stay Sharp.
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed" style={{ color: "#5C1F1C" }}>
                A world-class chess training system designed to elevate anyone from beginner to master.
                Perfect for students, professionals, and lifelong learners.
              </p>

              <Button
                size="lg"
                className="font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                style={{ backgroundColor: accentColor, color: primaryColor }}
              >
                Get Yours
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>



              {/* Live India Time */}
              <p className="mt-6 text-xs text-white/60 text-center lg:text-left">
                Available now in India • {new Date().toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}