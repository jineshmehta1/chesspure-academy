"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Users,
  Calendar,
  Target,
  Brain,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function CoachesPage() {
  const coaches = [
    {
      name: "Tejavath Naresh",
      title: "Head Coach & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      specialization: ["Opening Theory", "Endgame Mastery", "Tournament Prep"],
      achievements: ["FIDE Arbiter", "FIDE Rated 2350", "15+ Years Coaching"],
      experience: "15+ Years",
      students: "200+",
      bio: "Founder of Chesspure Academy. Trained 3 national champions. Specializes in deep opening preparation and endgame precision. Known for turning average players into titled threats.",
      color: "from-[#5C1F1C] to-[#8B4513]",
    },
    {
      name: "Tejavath Aruna",
      title: "Senior Coach & Women’s Chess Expert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      specialization: ["Tactical Vision", "Youth Development", "Women’s Chess"],
      achievements: ["FIDE Rated 2450", "National Women’s Champion", "12+ Years"],
      experience: "12+ Years",
      students: "150+",
      bio: "Coached 5 girls to national titles. Expert in aggressive openings and tactical combinations. Runs the 'Queen's Gambit' program for female players.",
      color: "from-[#8B4513] to-[#A0522D]",
    },
    {
      name: "Ranghanathan K S",
      title: "Junior Coach & Online Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      specialization: ["Beginner to 1800", "School Programs", "Online Training"],
      achievements: ["FIDE Rated 2400", "Lichess Coach of the Year", "8+ Years"],
      experience: "8+ Years",
      students: "100+",
      bio: "Master of online teaching. Runs 50+ weekly group classes. Uses AI tools like Stockfish and Lichess Studies to accelerate learning.",
      color: "from-[#A0522D] to-[#D2691E]",
    },
    {
      name: "Kethavath Lokesh",
      title: "Assistant Coach & Tactics Guru",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      specialization: ["Puzzle Solving", "Pattern Recognition", "Blitz & Rapid"],
      achievements: ["FIDE Rated 2300", "Rapid Chess Champion", "6+ Years"],
      experience: "6+ Years",
      students: "80+",
      bio: "Known for 100-puzzle daily drills. Students gain 300+ ELO in tactics. Runs weekend 'Blitz Bootcamp' with live analysis.",
      color: "from-[#D2691E] to-[#CD853F]",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/coachbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: "#FFC727", color: "#5C1F1C" }}>
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

      {/* Coaches Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {coaches.map((coach, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${coach.color} border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
              >
                <div className={`h-2 bg-gradient-to-r ${coach.color}`}></div>
                <div className="relative">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{coach.name}</h3>
                    <p className="text-yellow-300 font-medium">{coach.title}</p>
                  </div>
                </div>

                <CardContent className="p-6 text-white">
                  <p className="text-sm leading-relaxed mb-6 opacity-90">{coach.bio}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                      <p className="text-xs font-medium text-gray-200">Experience</p>
                      <p className="text-lg font-bold">{coach.experience}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                      <Users className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                      <p className="text-xs font-medium text-gray-200">Students</p>
                      <p className="text-lg font-bold">{coach.students}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-yellow-300" /> Specializations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialization.map((spec, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-white/20 border-white/30 text-white text-xs hover:bg-white/30"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-300" /> Key Achievements
                    </h4>
                    <div className="space-y-1">
                      {coach.achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <Award className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                          <span className="opacity-90">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16" style={{ color: "#5C1F1C" }}>
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
                className="bg-white border border-[#5C1F1C]/10 hover:border-[#5C1F1C]/30 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-[#5C1F1C]/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8" style={{ color: "#5C1F1C" }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#5C1F1C" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8" style={{ color: "#5C1F1C" }}>
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Book a **free trial session** with any coach. First 30 minutes on us.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#5C1F1C] hover:bg-[#8B4513] text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book Free Trial
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}