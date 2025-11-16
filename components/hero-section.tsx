"use client";

import { Button } from "@/components/ui/button";
import { Users, Trophy, Star, Sparkles, Award } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Brand theme colors
const primaryColor = "#5C1F1C"; // Deep brown (logo bg)
const accentColor = "#FFC727"; // Gold/yellow (logo text/accent)
const white = "#FFFFFF";
const boardWhite = "#f0d9b5";
const boardBrown = "#b58863";
const textDark = "#74292F"; // Slightly lighter than primary for readability
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export function HeroSection() {
  const [hoveredPiece, setHoveredPiece] = useState<number | null>(null);

  const chessPieces = ["♔", "♕", "♖", "♗", "♘", "♙"];

  const initialChessBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];


  return (
    <section
      id="home"
      className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden"
      style={{
        background: white,
        fontFamily,
      }}
    >
      {/* Floating decorative chess pieces */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        {chessPieces.map((piece, index) => (
          <div
            key={index}
            className="absolute text-3xl sm:text-6xl lg:text-8xl animate-chess-float"
            style={{
              left: `${6 + index * 12}%`,
              top: `${10 + (index % 3) * 20}%`,
              color: index % 2 === 0 ? primaryColor : accentColor,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.09))",
              zIndex: 1,
              transition: "transform 0.3s, color 0.5s",
              transform: hoveredPiece === index ? "scale(1.15)" : undefined,
              animationDelay: `${index * 0.5}s`,
              cursor: "default",
            }}
            onMouseEnter={() => setHoveredPiece(index)}
            onMouseLeave={() => setHoveredPiece(null)}
          >
            {piece}
          </div>
        ))}
      </div>

      {/* Light brand-motif highlights */}
      <div className="absolute top-8 left-8 w-14 h-14 bg-[#FFC727] opacity-10 rounded-full z-0" />
      <div className="absolute top-3 right-10 w-12 h-12 bg-[#5C1F1C] opacity-10 rounded-full z-0" />
      <div className="absolute bottom-14 left-14 w-20 h-20 bg-[#5C1F1C] opacity-10 rounded-full z-0" />
      <div className="absolute bottom-3 right-8 w-16 h-16 bg-[#FFC727] opacity-10 rounded-full z-0" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero Left: Headings and details */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Decorative arc and knight motif */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginBottom: "1rem",
                gap: 8,
              }}
            >
              <div className="inline-flex items-center space-x-2 bg-white text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md border border-gray-200">
                <Star className="w-4 h-4" style={{ color: accentColor }} />
                <span>Certified FIDE Coaches</span>
                <Sparkles className="w-3 h-3" style={{ color: primaryColor }} />
              </div>
            </div>
            <div className="flex justify-center lg:justify-start mt-2 mb-4">
              <span
                style={{
                  fontWeight: 600,
                  color: primaryColor,
                  background: accentColor,
                  borderRadius: "999px",
                  fontSize: "1rem",
                  padding: "0.2rem 1rem",
                  marginRight: 8,
                  letterSpacing: 1,
                  fontFamily,
                  boxShadow: "0 2px 6px #FFC72744",
                }}
              >
                Academy
              </span>
            </div>
            <h2
              className="mt-2 mb-4 text-3xl leading-tight font-bold"
              style={{
                color: primaryColor,
                fontFamily,
              }}
            >
              Master the Game, Conquer the Board
            </h2>
            <p className="mb-6 text-lg" style={{ color: textDark }}>
              Chesspure academy empowers you with world-class training from FIDE-rated coaches. Build unshakeable skills, dominate the board, and rise to the top of the chess world.
            </p>
            <div className="flex justify-center lg:justify-start mb-6">
              <Link href="" target="_blank">
                <Button
                  size="lg"
                  style={{
                    background: primaryColor,
                    color: white,
                    fontWeight: 800,
                    fontFamily,
                    fontSize: "1.1rem",
                    padding: "0.7rem 2rem",
                    borderRadius: "999px",
                    boxShadow: "0 2px 16px 0 rgba(92,31,28,0.10)",
                  }}
                >
                  <Users className="inline align-middle mr-2" /> Join Our Online Coaching
                </Button>
              </Link>
            </div>

            {/* Improved Stats */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <StatCard
                bg={white}
                icon={<Trophy size={24} />}
                label="Tournaments"
                value="120+"
                textColor={primaryColor}
                iconBg={accentColor}
                border={`2px solid ${accentColor}`}
              />
              <StatCard
                bg={accentColor}
                icon={<Users size={24} />}
                label="Students"
                value="600+"
                textColor={primaryColor}
                iconBg={primaryColor}
              />
            </div>
          </div>

          {/* Hero Right: Interactive Chessboard */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up perspective-1000">
            <div
              className="relative transition-all duration-500 ease-out"
              style={{
                width: "26rem",
                height: "26rem",
                background: white,
                borderRadius: "2rem",
                boxShadow: `0 12px 36px 0 #5C1F1C20`,
                border: `5px solid ${primaryColor}`,
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1.05) rotateX(5deg) rotateY(-5deg)";
                card.style.boxShadow = "0 20px 50px 0 #5C1F1C30";
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 10;
                const rotateX = ((centerY - y) / centerY) * 10;

                card.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1) rotateX(0) rotateY(0)";
                card.style.boxShadow = `0 12px 36px 0 #5C1F1C20`;
              }}
              // Mobile fallback
              onTouchStart={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #FFC72740, transparent 70%)",
                  zIndex: 1,
                }}
              />

              {/* Chessboard */}
              <div className="grid grid-cols-8 gap-px h-full w-full rounded-xl overflow-hidden board-inner">
                {initialChessBoard.flat().map((piece, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isLight = (row + col) % 2 === 0;
                  return (
                    <div
                      key={i}
                      className="aspect-square flex items-center justify-center font-bold text-2xl chess-piece select-none"
                      style={{
                        background: isLight ? boardWhite : boardBrown,
                        color: isLight ? "#000" : "#FFF",
                        transition: "transform 0.2s ease",
                        borderRadius: "6px",
                      }}
                    >
                      {piece}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes chess-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-chess-float {
          animation: chess-float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1200ms ease-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1000ms ease-out forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(70px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .board-inner:hover .chess-piece:not(:empty) {
          animation: jiggle 0.7s ease-in-out;
        }

        @keyframes jiggle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-3deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
          75% { transform: translateY(-3px) rotate(-1deg); }
        }

        .chess-piece {
          user-select: none;
        }
      `}</style>
    </section>
  );
}

// Updated StatCard with better color logic
function StatCard({ icon, label, value, bg, textColor, iconBg, border }) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105"
      style={{
        background: bg,
        minWidth: "180px",
        color: textColor,
        fontFamily,
        border: border || "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full p-1"
        style={{
          background: iconBg,
          width: 40,
          height: 40,
        }}
      >
        <div style={{ color: textColor === white ? primaryColor : white }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontWeight: 500, fontSize: "0.95rem", opacity: 0.9 }}>
          {label}
        </div>
      </div>
    </div>
  );
}