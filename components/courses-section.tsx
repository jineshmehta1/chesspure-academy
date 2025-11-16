"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight,  Crown, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const orangeBg = "#FF6B35";
const white = "#FFFFFF";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

// Background image
const bgImage = "/bgchess.png";

const doodleIcons = [ Crown, Trophy, Zap];

export function CoursesSection() {
  const courses = [
    {
      icon: "/youth-chess.jpg",
      title: "Beginner Bootcamp",
      desc: "Master the basics: rules, piece movement, and first 10 opening traps.",
    },
    {
      icon: "/senior-man.jpg",
      title: "Tactics Mastery",
      desc: "Solve 500+ puzzles. Learn forks, pins, skewers, and discovered attacks.",
    },
    {
      icon: "/women-chess.jpg",
      title: "Endgame Pro",
      desc: "King + pawn, rook endings, and opposition. Win drawn positions.",
    },
    {
      icon: "/women-chess.jpg",
      title: "Grandmaster Openings",
      desc: "Sicilian, Ruy Lopez, Queen’s Gambit. Build a pro-level repertoire.",
    },
  ];

  return (
    <>
      <style jsx>{`
        .wave {
          fill: ${orangeBg};
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>

      <section
        className="relative overflow-hidden "
        style={{ fontFamily }}
      >
        {/* Orange Wave with Background Image */}
        <div
          className="relative h-56 sm:h-64 md:h-80 lg:h-96"
        >
          {/* Orange Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(255, 107, 53, 0.75)" }}
          />

          {/* Floating Doodles */}
          {doodleIcons.map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: i * 0.3 }}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </motion.div>
          ))}

          {/* Wave SVG */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            style={{ height: "120px", width: "100%" }}
          >
            <path
              className="wave"
              d="M0,60 C320,140 1120,20 1440,80 L1440,180 L0,180 Z"
            />
          </svg>

          {/* Hero Text */}
          <div className="relative z-20 text-center pt-10 sm:pt-12 md:pt-16 lg:pt-20 px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm md:text-base font-medium tracking-widest text-white/90"
            >
              Our Courses
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 leading-tight text-white"
            >
              Explore our courses and
              <span className="block text-yellow-300">experience the Magic</span>
            </motion.h2>
          </div>
        </div>

        {/* Course Cards – Overlap Wave */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 relative z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group"
              >
                <div
                  className="rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden border-4 border-yellow-100 shadow-md">
                    <img
                      src={course.icon}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 px-2">
                    {course.desc}
                  </p>

                  {/* CTA */}
                  <Button
                    variant="link"
                    className="mt-2 sm:mt-4 text-xs sm:text-sm font-medium text-yellow-300 hover:text-yellow-200 p-0 h-auto"
                  >
                    Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}