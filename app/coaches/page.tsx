"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  Star,
  Users,
  Calendar,
  Target,
  Brain,
  Award,
  Filter,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";

function ThreeDCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu transition-all duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

export default function CoachesPage() {
  const coaches = [
    {
      id: 1,
      name: "Arjun Malhotra",
      title: "Head Coach & Grandmaster",
      image: "/demo/coach-1.jpg",
      specialization: ["Middlegame Strategy", "Endgame Precision", "Opening Repertoire"],
      achievements: ["FIDE Grandmaster", "ELO 2580", "20+ Years Coaching"],
      experience: "20+ Years",
      students: "320+",
      bio: "Former national champion with 5 gold medals. Trains India’s top U-18 talents. Known for deep positional understanding and custom opening labs.",
      level: "Advanced",
      date: "2025-11-20",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Senior Coach & Women’s Chess Director",
      image: "/demo/coach-2.jpg",
      specialization: ["Tactical Combinations", "Psychological Prep", "Women’s Chess"],
      achievements: ["International Master", "ELO 2420", "National Women’s Champion 2022"],
      experience: "14+ Years",
      students: "210+",
      bio: "Runs the 'Rising Queens' program. Coached 8 girls to WIM/WFM titles. Expert in dynamic Sicilian and French Defense systems.",
      level: "Intermediate",
      date: "2025-11-22",
    },
    {
      id: 3,
      name: "Vikram Desai",
      title: "Junior Coach & Online Chess Expert",
      image: "/demo/coach-3.jpg",
      specialization: ["Beginner to 2000", "AI Training Tools", "Lichess/Chess.com Mastery"],
      achievements: ["FIDE Master", "ELO 2380", "Lichess Coach of the Year 2024"],
      experience: "10+ Years",
      students: "180+",
      bio: "Pioneer in AI-assisted coaching. Uses Stockfish, Leela, and Lichess Studies. Runs 60+ weekly online group sessions.",
      level: "Beginner",
      date: "2025-11-25",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      title: "Assistant Coach & Tactics Specialist",
      image: "/demo/coach-4.jpg",
      specialization: ["Pattern Recognition", "Puzzle Drills", "Blitz & Bullet"],
      achievements: ["FIDE Rated 2290", "Asian Rapid Champion 2023", "7+ Years"],
      experience: "7+ Years",
      students: "140+",
      bio: "Students solve 120 puzzles/day. Average ELO gain: 380 in 6 months. Runs weekend 'Tactics Marathon' with live commentary.",
      level: "Intermediate",
      date: "2025-11-28",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-40 text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/coachbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 " />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: accentColor, color: primaryColor }}>
            Meet Our Team
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Our Expert Coaches
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-10 opacity-90">
            Learn from titled players and proven mentors who’ve trained national champions.
          </p>
        </div>
      </section>

      {/* Coaches Grid - #5C1F1C GLASS CARDS (Same as Events) */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            {coaches.map((coach, i) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ThreeDCard className="h-full rounded-3xl overflow-hidden shadow-2xl">
                  <div
                    className="bg-[#5C1F1C] p-1.5 rounded-3xl h-full"
                    style={{
                      background: `linear-gradient(135deg, #5C1F1C 0%, #8B4513 100%)`,
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl h-full overflow-hidden">
                      {/* Image */}
                      <div className="relative h-72">
                        <Image
                          src={coach.image}
                          alt={coach.name}
                          fill
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-xs">
                            {coach.title.split(" ")[0]}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 text-gray-800">
                        <h3 className="text-2xl md:text-3xl font-extrabold mb-1 text-[#5C1F1C] drop-shadow">
                          {coach.name}
                        </h3>
                        <p className="text-[#FFC727] font-semibold text-lg mb-4">
                          {coach.title}
                        </p>

                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                          {coach.bio}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center bg-gradient-to-br from-[#5C1F1C]/10 to-[#8B4513]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                            <Calendar className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                            <p className="text-xs font-medium text-gray-600">Experience</p>
                            <p className="font-bold text-[#5C1F1C] text-lg">{coach.experience}</p>
                          </div>
                          <div className="text-center bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                            <Users className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                            <p className="text-xs font-medium text-gray-600">Students</p>
                            <p className="font-bold text-[#5C1F1C] text-lg">{coach.students}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#FFC727]">
                            <Target className="w-5 h-5" /> Specializations
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {coach.specialization.map((spec, idx) => (
                              <Badge
                                key={idx}
                                className="bg-[#5C1F1C]/10 text-[#5C1F1C] border-[#5C1F1C]/20 text-xs"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#FFC727]">
                            <Trophy className="w-5 h-5" /> Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {coach.achievements.map((ach, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                                <Award className="w-4 h-4 text-[#5C1F1C]" />
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Link href="/contact" className="block mt-6">
                          <Button
                            className="w-full bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
                          >
                            Book Trial <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16" style={{ color: primaryColor }}>
            Why Choose Our Coaches?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Proven Track Record",
                description: "Coached 3 national champions and 50+ titled players. Average student ELO gain: 350+.",
              },
              {
                icon: Brain,
                title: "Personalized Training",
                description: "Custom lesson plans, AI analysis, and weekly progress reports for every student.",
              },
              {
                icon: Trophy,
                title: "Tournament Ready",
                description: "Mock tournaments, psychological prep, and opening books tailored to your opponents.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-md border border-[#5C1F1C]/10 hover:border-[#5C1F1C]/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-[#5C1F1C]/10 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-9 h-9" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8" style={{ color: primaryColor }}>
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Book a <strong className="text-[#5C1F1C]">free trial session</strong> with any coach. First 30 minutes on us.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] px-12 py-8 text-xl font-bold rounded-full shadow-2xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
            >
              Book Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}