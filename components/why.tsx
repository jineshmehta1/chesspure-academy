"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Target, Lightbulb, Zap, BookOpen, Trophy } from "lucide-react";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

const smallBenefits = [
  { icon: Brain, title: "Develops Memory", color: "text-amber-600" },
  { icon: Target, title: "Develops Logical Thinking", color: "text-blue-600" },
  { icon: Zap, title: "Improves Concentration", color: "text-green-600" },
  { icon: Lightbulb, title: "Develops Imagination & Creativity", color: "text-yellow-600" },
  { icon: BookOpen, title: "Improves Schoolwork & Grades", color: "text-purple-600" },
];

const detailedBenefits = [
  {
    icon: Trophy,
    title: "Develops Memory",
    description:
      "Chess develops memory by requiring players to remember past moves, patterns, and strategies while planning future moves.",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Target,
    title: "Develops Logical Thinking",
    description:
      "Chess develops logical thinking by requiring players to analyze positions, anticipate opponent moves, and strategize several steps ahead.",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Improves Concentration",
    description:
      "Chess enhances concentration by requiring players to focus intensely on the game, blocking out distractions and maintaining mental clarity.",
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Lightbulb,
    title: "Develops Imagination & Creativity",
    description:
      "Chess sparks imagination and creativity as players envision strategic possibilities and devise innovative plans within the game's constraints.",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Brain,
    title: "Boosts Problem-Solving Skills",
    description:
      "Every chess game is a new puzzle. Kids learn to evaluate options, make decisions under pressure, and find creative solutions — skills that translate to math, science, and life.",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function WhyChessForKids() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.2 }
    );

    const el = document.getElementById("why-chess-section");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHover = {
    rest: { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    hover: {
      y: -10,
      boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      id="why-chess-section"
      className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden"
      style={{ fontFamily }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5C1F1C] mb-3">
            Why Chess for Kids?
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Small Benefit Icons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-6xl mx-auto"
        >
          {smallBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-3 p-2.5 sm:p-3 bg-white rounded-full shadow-md">
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${b.color}`} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-800 leading-tight">
                  {b.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed Benefit Cards – Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {detailedBenefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                animate={controls}
                className="h-full"
              >
                <Card
                  className={`
                    ${b.bg} ${b.border} border-2 p-5 sm:p-6 lg:p-8 
                    h-full transform-gpu transition-all duration-300
                    cursor-pointer rounded-2xl
                  `}
                >
                  <motion.div
                    variants={cardHover}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 h-full"
                  >
                    <div
                      className={`p-3 sm:p-4 ${b.iconBg} rounded-full shadow-lg flex-shrink-0`}
                    >
                      <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${b.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                        {b.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}