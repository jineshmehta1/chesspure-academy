"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Target, Lightbulb, Zap, BookOpen, Trophy } from "lucide-react";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export function WhyChessForKids() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const el = document.getElementById("why-chess-section");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const smallBenefits = [
    { icon: <Brain className="w-6 h-6" />, title: "Develops Memory" },
    { icon: <Target className="w-6 h-6" />, title: "Develops Logical Thinking" },
    { icon: <Zap className="w-6 h-6" />, title: "Improves Concentration" },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Develops Imagination & Creativity" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Improves Schoolwork & Grades" },
  ];

  const detailedBenefits = [
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Develops Memory",
      description:
        "Chess develops memory by requiring players to remember past moves, patterns, and strategies while planning future moves.",
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Develops Logical Thinking",
      description:
        "Chess develops logical thinking by requiring players to analyze positions, anticipate opponent moves, and strategize several steps ahead.",
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Improves Concentration",
      description:
        "Chess enhances concentration by requiring players to focus intensely on the game, blocking out distractions and maintaining mental clarity.",
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Develops Imagination & Creativity",
      description:
        "Chess sparks imagination and creativity as players envision strategic possibilities and devise innovative plans within the game's constraints.",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Boosts Problem-Solving Skills",
      description:
        "Every chess game is a new puzzle. Kids learn to evaluate options, make decisions under pressure, and find creative solutions — skills that translate to math, science, and life.",
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes liftHover {
          0% { transform: translateY(0); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          100% { transform: translateY(-10px); box-shadow: 0 20px 30px rgba(0,0,0,0.15); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .hover-lift { transition: all 0.4s ease; }
        .hover-lift:hover { animation: liftHover 0.4s ease forwards; }
      `}</style>

      <section
        id="why-chess-section"
        className="py-20 bg-white overflow-hidden"
        style={{ fontFamily }}
      >
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5C1F1C] mb-2">
              Why Chess for Kids?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
          </div>

          {/* Small Icons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-5xl mx-auto">
            {smallBenefits.map((b, i) => (
              <div
                key={i}
                className={`
                  flex flex-col items-center text-center p-5 rounded-2xl
                  bg-gradient-to-br from-amber-100 to-yellow-100 text-gray-800
                  opacity-0 hover-lift cursor-default
                  ${isVisible ? "animate-fadeInUp" : ""}
                `}
              >
                <div className="mb-3 p-3 bg-white rounded-full shadow-md">
                  <div className="text-amber-600">{b.icon}</div>
                </div>
                <p className="text-sm font-bold leading-tight">{b.title}</p>
              </div>
            ))}
          </div>

          {/* === 3 Cards in First Row === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8">
            {detailedBenefits.slice(0, 3).map((b, i) => (
              <Card
                key={i}
                className={`
                  ${b.bg} ${b.border} border-2 p-8 
                  hover-lift cursor-pointer
                  transition-shadow duration-300
                  ${isVisible ? "animate-fadeInUp" : ""}
                `}
              >
                <div className="flex items-start gap-5">
                  <div className={`p-4 bg-white rounded-full shadow-lg ${b.iconColor}`}>
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{b.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{b.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* === 2 Cards in Second Row (Centered) === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {detailedBenefits.slice(3, 5).map((b, i) => (
              <Card
                key={i + 3}
                className={`
                  ${b.bg} ${b.border} border-2 p-8 
                  hover-lift cursor-pointer
                  transition-shadow duration-300
                  ${isVisible ? "animate-fadeInUp" : ""}
                `}
                style={{ animationDelay: `${(i + 3) * 0.15}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className={`p-4 bg-white rounded-full shadow-lg ${b.iconColor}`}>
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{b.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{b.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}