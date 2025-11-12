"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Award, GraduationCap, Gamepad2 } from "lucide-react";

// ──────────────────────────────────────────────────────────────
// Brand palette
const bgBeige = "#FAF6E9";
const accentGold = "#FFC727";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

// ──────────────────────────────────────────────────────────────
interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  iconGrad: string;
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      value: "1000",
      label: "Happy Students",
      suffix: "+",
      icon: <Users className="w-10 h-10" />,
      iconGrad: "from-amber-500 to-yellow-400",
    },
    {
      value: "50",
      label: "National Champions",
      suffix: "+",
      icon: <Award className="w-10 h-10" />,
      iconGrad: "from-yellow-500 to-amber-400",
    },
    {
      value: "15",
      label: "FIDE Rated Coaches",
      suffix: "+",
      icon: <GraduationCap className="w-10 h-10" />,
      iconGrad: "from-amber-600 to-yellow-500",
    },
    {
      value: "2000",
      label: "Training Games",
      suffix: "+",
      icon: <Gamepad2 className="w-10 h-10" />,
      iconGrad: "from-yellow-400 to-amber-500",
    },
  ];

  return (
    <>
      {/* ────────────────────── Embedded Animations ────────────────────── */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-scale {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 15px rgba(255,199,39,.4); }
          50%     { box-shadow: 0 0 30px rgba(255,199,39,.7); }
        }
        .animate-fade-in-up { animation: fade-in-up .8s ease-out forwards; }
        .animate-fade-scale { animation: fade-scale .6s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite ease-in-out; }
      `}</style>

      {/* ────────────────────── Section ────────────────────── */}
      <section
        id="stats-section"
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: bgBeige, fontFamily }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gold Glow Blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute top-16 left-16 w-96 h-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${accentGold}, transparent)` }}
          />
          <div
            className="absolute bottom-16 right-16 w-96 h-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${accentGold}, transparent)` }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* ───── Header ───── */}
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-widest mb-2">
              Achievements
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5C1F1C] mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Join thousands of students who've transformed their game with our world-class coaching,
              strategic training, and unwavering commitment to chess mastery.
            </p>
          </div>

          {/* ───── Layout: 2×2 Grid Left | Image Right ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start ">
            {/* LEFT: 2×2 Grid of Small Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`
                    bg-[#5C1F1C] backdrop-blur-sm rounded-2xl p-6 text-center
                    border border-amber-200/30
                    transition-all duration-500
                    hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20
                    ${isVisible ? "opacity-100 animate-fade-scale" : "opacity-0"}
                    
                  `}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Icon Circle */}
                  <div
                    className={`
                      w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${stat.iconGrad}
                      shadow-md ring-4 ring-amber-400/40 animate-pulse-glow
                    `}
                  >
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {stat.prefix && (
                      <span className="text-3xl md:text-4xl text-amber-600 mr-1">
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-3xl md:text-4xl text-amber-600 ml-1">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="mt-2 text-sm md:text-base font-medium text-white">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-3xl overflow-hidden shadow-2xl max-w-md w-full">
                <img
                  src="/online-chess-class-interface.jpg"
                  alt="Team working at desk"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}