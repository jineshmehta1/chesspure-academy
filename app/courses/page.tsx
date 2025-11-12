"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Users,
  Clock,
  BookOpen,
  Target,
  Zap,
  Crown,
} from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const [expandedCourses, setExpandedCourses] = useState<Record<number, boolean>>({});

  const toggleFeatures = (index: number) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const courses = [
    {
      title: "Beginner Level 1",
      level: "Beginner",
      duration: "3 Months",
      price: "₹15,000",
      students: "120+",
      rating: "4.9",
      icon: BookOpen,
      color: "from-[#5C1F1C] to-[#8B4513]",
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      description: "Perfect for kids & adults starting from zero. Learn rules, piece movement, and basic checkmates.",
      features: [
        "Chess board setup & piece names",
        "How each piece moves",
        "Check, checkmate, stalemate",
        "Special moves: Castling, En Passant, Promotion",
        "Basic tactics: Forks, Pins",
        "Scholar’s Mate & Fool’s Mate",
        "Opening principles: Control center, develop pieces",
        "Daily 10-puzzle routine",
      ],
      schedule: "2 classes/week (1.5 hrs each)",
      ageGroup: "6+ years",
      classSize: "8–10 students",
    },
    {
      title: "Beginner Level 2",
      level: "Beginner",
      duration: "3 Months",
      price: "₹15,000",
      students: "95+",
      rating: "4.8",
      icon: BookOpen,
      color: "from-[#5C1F1C] to-[#8B4513]",
      image: "https://images.unsplash.com/photo-1511193311914-991f00ad8b66?w=800&h=500&fit=crop",
      description: "Master elementary checkmates and simple tactics. Play your first real games with confidence.",
      features: [
        "King + Queen vs King",
        "King + Rook vs King",
        "Back-rank mate",
        "Smothered mate",
        "Checkmate in 1–2 moves",
        "Basic pins & forks",
        "Opening: Italian Game (Giuoco Piano)",
        "Endgame: King + Pawn vs King",
      ],
      schedule: "2 classes/week (1.5 hrs each)",
      ageGroup: "6+ years",
      classSize: "8–10 students",
    },
    {
      title: "Intermediate Level 1",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "80+",
      rating: "4.8",
      icon: Target,
      color: "from-[#8B4513] to-[#A0522D]",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=500&fit=crop",
      description: "Build tactical vision. Solve 2–3 move combinations and avoid blunders.",
      features: [
        "Double attack & discovered check",
        "Pin: Absolute vs Relative",
        "Deflection & decoy",
        "Overloading",
        "Interference",
        "Zugzwang basics",
        "Opening: Ruy Lopez (Morphy Defense)",
        "Pawn structure: Isolated, backward",
      ],
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
    },
    {
      title: "Intermediate Level 2",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "75+",
      rating: "4.8",
      icon: Target,
      color: "from-[#8B4513] to-[#A0522D]",
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d5d0?w=800&h=500&fit=crop",
      description: "Learn opening strategy, pawn play, and positional concepts.",
      features: [
        "Center control & development",
        "Open files, outposts",
        "Good vs bad bishop",
        "Weak squares",
        "Prophylaxis (preventing opponent’s plans)",
        "Opening repertoire: 1.e4 & 1.d4 systems",
        "Endgame: Rook vs Pawn",
        "100 tactical puzzles/week",
      ],
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
    },
    {
      title: "Intermediate Level 3",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "60+",
      rating: "4.9",
      icon: Target,
      color: "from-[#8B4513] to-[#A0522D]",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?w=800&h=500&fit=crop",
      description: "Master complex tactics and start building your own opening repertoire.",
      features: [
        "Greek Gift sacrifice (Bxh7+)",
        "Double check & windmill",
        "X-ray attack",
        "Trapped pieces",
        "Clearance sacrifice",
        "Opening prep with ChessBase/Lichess",
        "Positional exchange sacrifice",
        "Weekly game analysis",
      ],
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
    },
    {
      title: "Advanced Level 1",
      level: "Advanced",
      duration: "6 Months",
      price: "₹30,000",
      students: "40+",
      rating: "4.9",
      icon: Trophy,
      color: "from-[#A0522D] to-[#D2691E]",
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      description: "Tournament-ready training. Deep opening prep, endgame mastery, and psychological edge.",
      features: [
        "Full opening repertoire (1.e4, 1.d4, anti-Sicilian)",
        "Pawn chains & minority attack",
        "Prophylaxis & overprotection",
        "Bishop vs Knight endgames",
        "Rook endgames: Lucena, Philidor",
        "Initiative & compensation",
        "Time management in classical games",
        "AI analysis with Stockfish 16",
      ],
      schedule: "4 classes/week (2.5 hrs each)",
      ageGroup: "12+ years",
      classSize: "4–6 students",
    },
    {
      title: "Advanced Level 2",
      level: "Expert",
      duration: "6 Months",
      price: "₹35,000",
      students: "25+",
      rating: "5.0",
      icon: Crown,
      color: "from-[#D2691E] to-[#CD853F]",
      image: "https://images.unsplash.com/photo-1511193311914-991f00ad8b66?w=800&h=500&fit=crop",
      description: "Elite path to 2000+ ELO. GM-level concepts, blindfold training, and tournament simulation.",
      features: [
        "Dynamic pawn sacrifices",
        "Positional squeeze techniques",
        "Blindfold chess drills",
        "Deep middlegame planning",
        "Anti-computer strategies",
        "Custom opening novelties",
        "Mock tournaments with clocks",
        "Psychological preparation",
      ],
      schedule: "4 classes/week (2.5 hrs each)",
      ageGroup: "14+ years",
      classSize: "3–4 students",
    },
    {
      title: "Masterclass Series",
      level: "Master",
      duration: "3 Months",
      price: "₹50,000",
      students: "15+",
      rating: "5.0",
      icon: Crown,
      color: "from-[#CD853F] to-[#DAA520]",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=500&fit=crop",
      description: "Exclusive 1-on-1 with IM/GM. For rated 1800+ players aiming for titles.",
      features: [
        "Personalized 1-on-1 coaching",
        "Full game analysis with GM notes",
        "Custom opening lab",
        "Mental toughness training",
        "FIDE title preparation",
        "Tournament scheduling & support",
        "Lifetime access to recordings",
      ],
      schedule: "Flexible (2–3 hrs/week)",
      ageGroup: "16+ years",
      classSize: "1 student",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/coursesbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: "#FFC727", color: "#5C1F1C" }}>
            Chess Courses
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Learn Chess at Every Level
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-10 opacity-90">
            From first move to grandmaster — structured, proven, and fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-[#5C1F1C] hover:bg-[#FFC727] hover:text-[#5C1F1C] px-8 py-6 rounded-full font-bold shadow-lg"
              >
                Book Free Trial
              </Button>
            </Link>
            <Link href="#courses">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-full"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Level Badges */}
      <section className="py-12 px-4 -mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { level: "Beginner", desc: "New to chess", icon: BookOpen, color: "bg-[#5C1F1C]" },
            { level: "Intermediate", desc: "Know basics", icon: Target, color: "bg-[#8B4513]" },
            { level: "Advanced", desc: "Tournament-ready", icon: Trophy, color: "bg-[#A0522D]" },
          ].map((lvl, i) => (
            <Card key={i} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`${lvl.color} p-6 text-white flex items-center gap-4`}>
                <div className="p-3 rounded-lg bg-white/20">
                  <lvl.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{lvl.level}</h3>
                  <p className="opacity-90">{lvl.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-70`} />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl">
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                      <Badge className="bg-white/40 text-white text-xs mt-1">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: "#5C1F1C" }}>
                        {course.price}
                      </p>
                      <p className="text-sm text-gray-600">{course.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Enrolled</p>
                      <p className="font-bold">{course.students}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <p className="font-medium text-gray-800">Schedule</p>
                      <p className="text-gray-600">{course.schedule}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Class Size</p>
                      <p className="text-gray-600">{course.classSize}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#FFC727]" /> Key Topics
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {course.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#5C1F1C]" />
                          <span>{f}</span>
                        </div>
                      ))}
                      {course.features.length > 4 && (
                        <>
                          {expandedCourses[index] ? (
                            <>
                              {course.features.slice(4).map((f, i) => (
                                <div key={i + 4} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#5C1F1C]" />
                                  <span>{f}</span>
                                </div>
                              ))}
                              <button
                                onClick={() => toggleFeatures(index)}
                                className="text-sm font  text-[#5C1F1C] font-medium mt-2"
                              >
                                Show less
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => toggleFeatures(index)}
                              className="text-sm text-[#5C1F1C] font-medium mt-2"
                            >
                              +{course.features.length - 4} more
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/contact" className="flex-1">
                      <Button
                        className={`w-full bg-gradient-to-r ${course.color} text-white font-semibold`}
                      >
                        Enroll Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-[#5C1F1C] text-[#5C1F1C]">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Small Batches",
              desc: "Max 10 students — personal feedback every class.",
            },
            {
              icon: Trophy,
              title: "Proven Success",
              desc: "350+ ELO average gain. 12 national champions.",
            },
            {
              icon: BookOpen,
              title: "Structured Path",
              desc: "Clear roadmap from 0 to 2000+ ELO.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#5C1F1C]/10 rounded-full flex items-center justify-center">
                <item.icon className="w-8 h-8 text-[#5C1F1C]" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#5C1F1C" }}>
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: "#5C1F1C" }}>
            Start Your Chess Journey Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 1,000+ students. First class is <strong>free</strong>.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#5C1F1C] hover:bg-[#8B4513] text-white px-12 py-7 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Claim Free Trial Class
            </Button>
          </Link>
        </div>
      </section>


    </div>
  );
}