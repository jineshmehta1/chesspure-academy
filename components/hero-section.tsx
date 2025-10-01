"use client";

import { Button } from "@/components/ui/button";
import { Play, Users, Trophy, Star, Sparkles, Award, VideoIcon, BellIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
      className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden bg-background sm:pt-20 md:pt-24 lg:pt-28"
      style={{ background: "linear-gradient(135deg, #F5F7FA 0%, #E2E8F0 60%, #2B6CB0 90%, #9F7AEA 10%)" }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        {chessPieces.map((piece, index) => {
          const colors = ["#2B6CB0", "#9F7AEA"];
          const color = colors[index % colors.length];
          return (
            <div
              key={index}
              className="absolute text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-chess-float cursor-default"
              style={{
                left: `${5 + index * 10}%`,
                top: `${10 + (index % 3) * 20}%`,
                animationDelay: `${index * 0.5}s`,
                color: color,
                transform: `translateZ(${hoveredPiece === index ? "20px" : "0"})`,
                transition: "transform 0.3s ease, color 0.5s ease",
              }}
              onMouseEnter={() => setHoveredPiece(index)}
              onMouseLeave={() => setHoveredPiece(null)}
            >
              {piece}
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 xs:top-8 sm:top-12 md:top-16 right-4 xs:right-6 sm:right-8 w-12 xs:w-16 sm:w-20 md:w-24 h-12 xs:h-16 sm:h-20 md:h-24 bg-[#2B6CB0] rounded-full opacity-20 animate-pulse-slow z-0"></div>
      <div className="absolute top-8 xs:top-12 sm:top-16 md:top-24 left-4 xs:left-6 sm:left-8 md:left-12 w-10 xs:w-12 sm:w-16 md:w-20 h-10 xs:h-12 sm:h-16 md:h-20 bg-[#2B6CB0] rounded-full opacity-15 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-4 xs:bottom-8 sm:bottom-12 md:bottom-16 right-4 xs:right-6 sm:right-8 md:right-12 w-12 xs:w-16 sm:w-20 md:w-28 h-12 xs:h-16 sm:h-20 md:h-28 bg-[#2B6CB0] rounded-full opacity-15 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-8 xs:bottom-12 sm:bottom-16 md:bottom-24 left-4 xs:left-6 sm:left-8 md:left-8 w-10 xs:w-12 sm:w-14 md:w-16 h-10 xs:h-12 sm:h-14 md:h-16 bg-[#FF69B4] rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>

      <div className="container max-w-[90%] xs:max-w-[85%] sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-[#E2E8F0] text-[#2B6CB0] px-3 xs:px-4 sm:px-5 md:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-full text-xs xs:text-sm sm:text-base font-bold mb-4 xs:mb-6 sm:mb-8 shadow-md border border-[#E2E8F0]">
              <Star className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-[#9F7AEA]" />
              <span>Certified FIDE Coaches</span>
              <Sparkles className="w-2.5 xs:w-3 sm:w-4 h-2.5 xs:h-3 sm:h-4 text-[#2B6CB0]" />
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 xs:mb-4 sm:mb-6 md:mb-8 text-balance leading-tight">
              <span className="text-[#2D3748]">
                <Link href="https://coaching.telanganachessacademy.com/login" target="_blank" className="cursor-pointer">
                  <Button
                    size="lg"
                    className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90 text-white font-bold px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-4 rounded-full shadow-lg animate-pulse-slow text-sm xs:text-base sm:text-lg md:text-xl"
                  >
                    <Users className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 mr-1 xs:mr-2 sm:mr-3" /> Join Our Online Coaching
                  </Button>
                </Link>
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-10 justify-center lg:justify-start mb-4 xs:mb-6 sm:mb-8 md:mb-12">
              <Link href="https://meet.google.com/vjj-cfpx-dav?pli=1" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#2B6CB0] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <VideoIcon className="w-4 h-4 mr-2" /> G-Meet
                </Button>
              </Link>

              <Link href="https://meet.jit.si/TelanganaChessAcademy" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#2B6CB0] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <Play className="w-4 h-4 mr-2" /> Start Call
                </Button>
              </Link>

              <Link href="https://meet.google.com/wuk-nfie-mgx" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#2B6CB0] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <Play className="w-4 h-4 mr-2" /> Call Naresh
                </Button>
              </Link>

              <Link href="https://meet.google.com/atu-ziid-ojg" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#06402B] text-[#06402B] hover:bg-[#06402B] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" /> TCS Meeting
                </Button>
              </Link>

              <Link href="https://meet.google.com/uux-vyxa-pgq" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#06402B] text-[#06402B] hover:bg-[#06402B] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <BellIcon className="w-4 h-4 mr-2" /> BCA Meeting
                </Button>
              </Link>

              <Link href="https://meet.google.com/mxj-uwyj-vzp" target="_blank" className="cursor-pointer w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-[#06402B] text-[#06402B] hover:bg-[#06402B] hover:text-white font-bold px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-md text-xs xs:text-sm sm:text-base md:text-base transition-all duration-300 w-full"
                >
                  <BellIcon className="w-4 h-4 mr-2" /> Call Rohith
                </Button>
              </Link>
            </div>

            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#4A5568] mb-4 xs:mb-6 sm:mb-8 md:mb-10 max-w-xl xs:max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0">
              Bharat chess academy empowers you with world-class training from FIDE-rated coaches. Build unshakeable skills, dominate the board, and rise to the top of the chess world.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 xs:space-x-3 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg border border-[#E2E8F0]">
                <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 bg-[#2B6CB0] rounded-full flex items-center justify-center">
                  <Trophy className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#2D3749] text-sm xs:text-base sm:text-lg">120+</div>
                  <div className="text-xs xs:text-sm text-[#4A5568]">Tournaments</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 xs:space-x-3 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg border border-[#E2E8F0]">
                <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 bg-[#2B6CB0] rounded-full flex items-center justify-center">
                  <Users className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#2D3749] text-sm xs:text-base sm:text-lg">600+</div>
                  <div className="text-xs xs:text-sm text-[#4A5568]">Students</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 xs:space-x-3 bg-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg border border-[#E2E8F0]">
                <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 bg-[#9F7AEA] rounded-full flex items-center justify-center">
                  <Award className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#2D3749] text-sm xs:text-base sm:text-lg">60+</div>
                  <div className="text-xs xs:text-sm text-[#4A5568]">Champions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative z-10">
              <div className="w-[16rem] xs:w-[18rem] sm:w-[20rem] md:w-[24rem] lg:w-[26rem] xl:w-[28rem] h-[16rem] xs:h-[18rem] sm:h-[20rem] md:h-[24rem] lg:h-[26rem] xl:h-[28rem] bg-white rounded-2xl shadow-xl p-3 xs:p-4 sm:p-5 md:p-6 border-4 border-[#E2E8F0] hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-8 gap-px h-full rounded-xl overflow-hidden">
                  {initialChessBoard.flat().map((piece, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    return (
                      <div
                        key={i}
                        className="aspect-square flex items-center justify-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-all duration-200 hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: isLight ? "#f0d9b5" : "#b58863",
                          color: isLight ? "#000000" : "#FFFFFF",
                        }}
                      >
                        <span>{piece}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
