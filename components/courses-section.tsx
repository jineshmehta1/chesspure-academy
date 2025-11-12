"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const orangeBg = "#FF6B35";
const white = "#FFFFFF";
const textDark = "#5C1F1C";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

// Background image
const bgImage = "/bgchess.png";

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
        .doodle {
          position: absolute;
          opacity: 0.15;
          width: 60px;
          height: 60px;
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{ backgroundColor:  fontFamily }}
      >
        {/* Orange Wave with Background Image */}
        <div
          className="relative h-64 md:h-80"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(255, 107, 53, 0.6)" }} />

          {/* Doodles */}
        

          {/* Wave SVG */}
          <svg
            className="absolute bottom-0 w-full z-10"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <path
              className="wave"
              d="M0,60 C320,140 1120,20 1440,80 L1440,180 L0,180 Z"
            />
          </svg>

          {/* Text */}
          <div className="relative z-20 text-center pt-12 md:pt-20 text-white">
            <p className="text-sm md:text-base font-medium tracking-widest">Our Courses</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
              Explore our courses and experience the Magic
            </h2>
          </div>
        </div>

        {/* Course Cards – Solid Brown Background */}
        <div className="container mx-auto px-4 -mt-24 md:-mt-32 relative z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {courses.map((course, i) => (
              <div
                key={i}
                className="rounded-3xl shadow-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: primaryColor,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both`,
                }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                  <img
                    src={course.icon}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {course.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  {course.desc}
                </p>
                <Button
                  variant="link"
                  className="mt-4 text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* India Time */}
        <p className="text-center mt-16 text-xs text-white/70">
          Available in India • {new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </section>
    </>
  );
}