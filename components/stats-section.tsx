"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Award, GraduationCap, Gamepad2 } from "lucide-react";
import Image from "next/image";

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
      icon: <Users className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      iconGrad: "from-amber-500 to-yellow-400",
    },
    {
      value: "50",
      label: "National Champions",
      suffix: "+",
      icon: <Award className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      iconGrad: "from-yellow-500 to-amber-400",
    },
    {
      value: "15",
      label: "FIDE Rated Coaches",
      suffix: "+",
      icon: <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      iconGrad: "from-amber-600 to-yellow-500",
    },
    {
      value: "2000",
      label: "Training Games",
      suffix: "+",
      icon: <Gamepad2 className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
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
          0%, 100% { box-shadow: 0 0 15px rgba(255,199,39,.4); }
          50%     { box-shadow: 0 0 30px rgba(255,199,39,.7); }
        }
        .animate-fade-in-up { animation: fade-in-up .8s ease-out forwards; }
        .animate-fade-scale { animation: fade-scale .6s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s infinite ease-in-out; }
      `}</style>

      {/* ────────────────────── Section ────────────────────── */}
      <section
        id="stats-section"
        className="py-12 sm:py-16 lg:py-24 relative overflow-hidden"
        style={{ backgroundColor: bgBeige, fontFamily }}
      >
        {/* Background Image - Responsive */}
        <div
          className="absolute inset-0 opacity-20 sm:opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gold Glow Blobs - Responsive */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute top-10 left-6 sm:top-16 sm:left-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${accentGold}, transparent)` }}
          />
          <div
            className="absolute bottom-10 right-6 sm:bottom-16 sm:right-16 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${accentGold}, transparent)` }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ───── Header ───── */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in-up">
            <p className="text-xs sm:text-sm font-medium text-amber-700 uppercase tracking-widest mb-1 sm:mb-2">
              Achievements
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C1F1C] mb-3 sm:mb-4">
              Our Achievements
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Join thousands of students who've transformed their game with our world-class coaching,
              strategic training, and unwavering commitment to chess mastery.
            </p>
          </div>

          {/* ───── Layout: Mobile Stack → Desktop 2×2 + Image ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            {/* LEFT: 2×2 Grid of Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`
                    bg-[#5C1F1C] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center
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
                      w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${stat.iconGrad}
                      shadow-md ring-4 ring-amber-400/40 animate-pulse-glow
                    `}
                  >
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    {stat.prefix && (
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-600 mr-0.5 sm:mr-1">
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-600 ml-0.5 sm:ml-1">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base font-medium text-white">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT: Image - Responsive */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
                <Image
                  src="/statbg.png"
                  alt="Chess students and coaches celebrating achievements"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
                {/* Optional overlay glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(255,199,39,0.3), transparent 70%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}