"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Users,
  Target,
  Award,
  BookOpen,
  Star,
  ChevronDown,
  Mail,
  UserCheck,
  FileText,
  Brain,
  Lightbulb,
  Scale,
  Gem,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/aboutbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: "#FFC727", color: "#5C1F1C" }}>
            Discover Our Journey
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to <span style={{ color: "#FFC727" }}>Chesspure Academy</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-10 opacity-90">
            Empowering minds through the ancient game of chess, we cultivate strategic thinkers, problem solvers, and future champions.
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="bg-white text-[#5C1F1C] hover:bg-[#FFC727] hover:text-[#5C1F1C] border-2 border-white text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300"
              >
                Explore More <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 bg-white border border-gray-200 shadow-xl rounded-lg mt-2">
              <DropdownMenuItem asChild>
                <Link href="/contact" className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#FFC727]/20 hover:text-[#5C1F1C]">
                  <Mail className="mr-3 h-5 w-5" /> Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/coaches" className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#FFC727]/20 hover:text-[#5C1F1C]">
                  <UserCheck className="mr-3 h-5 w-5" /> Our Coaches
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blogs" className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#FFC727]/20 hover:text-[#5C1F1C]">
                  <FileText className="mr-3 h-5 w-5" /> Blogs & Articles
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="bg-[#5C1F1C] text-white border-0 shadow-xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 group">
              <CardContent className="p-0 flex flex-col items-start">
                <Target className="w-14 h-14 mb-6 text-[#FFC727] group-hover:rotate-12 transition-transform duration-300" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  To deliver world-class chess education that builds strategic thinking, resilience, and a lifelong love for the game — preparing students for success in life.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#8B4513] text-white border-0 shadow-xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 group">
              <CardContent className="p-0 flex flex-col items-start">
                <Star className="w-14 h-14 mb-6 text-[#FFC727] group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed opacity-90">
                  To be India’s leading chess academy, producing grandmasters and innovative thinkers who shape the future of the game and society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 leading-tight" style={{ color: "#5C1F1C" }}>
            Milestones of <span style={{ color: "#8B4513" }}>Excellence</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "1000+", label: "Students Empowered" },
              { icon: Trophy, number: "100+", label: "Championship Titles" },
              { icon: Award, number: "25+", label: "International Mentions" },
              { icon: BookOpen, number: "14+", label: "Years of Dedication" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-8 bg-white border-b-4 border-[#5C1F1C] rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="w-20 h-20 mx-auto mb-5 bg-[#5C1F1C] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#FFC727] transition-colors duration-300">
                    <stat.icon className="w-10 h-10 text-white group-hover:text-[#5C1F1C] transition-colors duration-300" />
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#5C1F1C" }}>
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Academy - Center Image + Orbiting Cards */}
      <section className="py-20 px-4 bg-[#5C1F1C] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
            The Pillars of Our <span style={{ color: "#FFC727" }}>Academy</span>
          </h2>

          <div className="relative w-full h-96 md:h-[600px] flex items-center justify-center">
            {/* Central Chess King Image */}
            <div className="absolute z-20">
              <div className="bg-white p-4 md:p-6 rounded-full shadow-2xl flex items-center justify-center w-40 h-40 md:w-56 md:h-56 border-8 border-[#FFC727] transform hover:scale-110 transition-transform duration-300">
                <img
                  src="/chesscenter.jpg"
                  alt="Chess King"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>

            {/* Orbiting Cards */}
            <div className="absolute inset-0">
              {[
                { icon: Brain, title: "Strategic Thinking", color: "bg-purple-600" },
                { icon: Lightbulb, title: "Problem Solving", color: "bg-green-600" },
                { icon: Scale, title: "Fair Play", color: "bg-red-600" },
                { icon: Gem, title: "Excellence", color: "bg-yellow-600" },
                { icon: Zap, title: "Competitive Spirit", color: "bg-teal-600" },
                { icon: BookOpen, title: "Continuous Learning", color: "bg-orange-600" },
              ].map((item, index) => {
                const angle = (index * 60) - 90;
                const radius = window.innerWidth < 768 ? 140 : 260;
                const x = radius * Math.cos(angle * Math.PI / 180);
                const y = radius * Math.sin(angle * Math.PI / 180);

                return (
                  <div
                    key={index}
                    className="absolute w-32 h-32 md:w-40 md:h-40 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `50%`,
                      top: `50%`,
                      marginLeft: `${x}px`,
                      marginTop: `${y}px`,
                    }}
                  >
                    <Card className="w-full h-full rounded-xl shadow-xl flex flex-col items-center justify-center text-center p-3 md:p-4 bg-white text-gray-800 border-4 border-white hover:scale-110 transition-transform duration-300">
                      <div className={`${item.color} rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center mx-auto mb-2`}>
                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold leading-tight">
                        {item.title}
                      </h4>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline - Rich + Images */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16" style={{ color: "#5C1F1C" }}>
            Our <span style={{ color: "#8B4513" }}>Journey</span> Through Time
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5C1F1C] rounded-full hidden md:block"></div>

            <div className="space-y-20">
              {[
                {
                  year: "2010",
                  title: "Foundation in Visakhapatnam",
                  description:
                    "Chesspure Academy was founded by Grandmaster Rajesh Kumar with just 10 students in a small room. The vision was simple: make chess accessible to every child in India. Early classes were held in community centers, and word spread fast through local tournaments.",
                  image: "/found.png",
                  position: "left",
                  icon: <Star className="w-6 h-6 text-white" />,
                },
                {
                  year: "2014",
                  title: "First National Champion",
                  description:
                    "Our student, 12-year-old Arjun Mehta, won the Under-13 National Championship. This victory put Chesspure on the map. Parents from across Andhra Pradesh started enrolling their children. We expanded to a dedicated 2,000 sq ft training center with 5 boards.",
                  image: "national.png",
                  position: "right",
                  icon: <Trophy className="w-6 h-6 text-white" />,
                },
                {
                  year: "2018",
                  title: "Launch of Online Platform",
                  description:
                    "With growing demand, we launched our online coaching portal. Students from Kerala, Assam, and even Dubai joined live classes. We trained 300+ students remotely in the first year. Interactive puzzles and AI analysis tools were introduced.",
                  image: "online.png",
                  position: "left",
                  icon: <Users className="w-6 h-6 text-white" />,
                },
                {
                  year: "2020",
                  title: "International Breakthrough",
                  description:
                    "Our team won 3 medals at the Asian Youth Chess Championship. Collaboration with FIDE began. We hosted the first 'Chesspure International Open' with 200 participants from 12 countries. Live streaming reached 50,000 viewers.",
                  image: "champion.png",
                  position: "right",
                  icon: <Award className="w-6 h-6 text-white" />,
                },
                {
                  year: "2023",
                  title: "AI & Analytics Revolution",
                  description:
                    "Introduced personalized AI training: Stockfish 16 analysis, Lichess study integration, and custom opening prep. Students improved 200+ ELO on average. We launched the 'Grandmaster Path' program for rated 1800+ players.",
                  image: "ai.png",
                  position: "left",
                  icon: <Brain className="w-6 h-6 text-white" />,
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center relative ${
                    event.position === "right" ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div className="hidden md:block w-1/2">
                    {event.position === "left" && (
                      <div className="flex justify-end pr-10">
                        <Card className="bg-[#5C1F1C] p-6 md:p-8 rounded-xl shadow-lg max-w-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-2xl font-bold mb-3" style={{ color: "#FFFFFF" }}>
                            {event.title}
                          </h3>
                          <p className="text-white leading-relaxed">{event.description}</p>
                        </Card>
                      </div>
                    )}
                  </div>

                  <div className="absolute md:relative w-12 h-12 bg-[#5C1F1C] rounded-full flex items-center justify-center z-10 shadow-xl border-4 border-white">
                    {event.icon}
                  </div>
                  <div className="absolute text-xl font-bold -mt-14 md:hidden" style={{ color: "#5C1F1C" }}>
                    {event.year}
                  </div>

                  <div className="hidden md:block w-1/2">
                    {event.position === "right" && (
                      <div className="flex justify-start pl-10">
                        <Card className="bg-[#5C1F1C] p-6 md:p-8 rounded-xl shadow-lg max-w-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="text-2xl font-bold mb-3" style={{ color: "#ffffff" }}>
                            {event.title}
                          </h3>
                          <p className="text-white leading-relaxed">{event.description}</p>
                        </Card>
                      </div>
                    )}
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden mt-8 w-full px-4">
                    <Card className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-3" style={{ color: "#5C1F1C" }}>
                        {event.title}
                      </h3>
                      <p className="text-gray-700">{event.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16" style={{ color: "#5C1F1C" }}>
            Our <span style={{ color: "#8B4513" }}>Educational Philosophy</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-[#5C1F1C]/5 to-[#8B4513]/5 border border-[#5C1F1C]/20 p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                <h3 className="text-3xl font-bold mb-4" style={{ color: "#5C1F1C" }}>
                  Holistic Development
                </h3>
                <p className="text-lg text-gray-700">
                  Chess builds patience, resilience, and ethical thinking — skills for life.
                </p>
              </Card>
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                <h3 className="text-3xl font-bold mb-4 text-green-800">
                  Personalized Learning
                </h3>
                <p className="text-lg text-gray-700">
                  Every student gets a custom training plan based on their style and goals.
                </p>
              </Card>
              <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all">
                <h3 className="text-3xl font-bold mb-4 text-yellow-800">
                  Engaging Curriculum
                </h3>
                <p className="text-lg text-gray-700">
                  From beginner to grandmaster — fun, challenging, and rewarding.
                </p>
              </Card>
            </div>
            <div className="bg-[#5C1F1C] text-white rounded-2xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-8" style={{ color: "#FFC727" }}>
                Core Teaching Principles
              </h3>
              <ul className="space-y-5 text-lg">
                {[
                  "Master the fundamentals deeply",
                  "Think independently, not memorize",
                  "Learn in a supportive environment",
                  "Use AI and modern tools",
                  "Play fair, win with honor",
                  "Love chess for life",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-[#FFC727] rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-[#5C1F1C]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-white">
            The Values That <span style={{ color: "#FFC727" }}>Guide Us</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Excellence",
                description: "We aim for mastery in every move, every lesson, every student.",
                icon: <Gem className="w-12 h-12 text-[#FFC727]" />,
              },
              {
                title: "Integrity",
                description: "Fair play, honesty, and respect — on and off the board.",
                icon: <Scale className="w-12 h-12 text-[#FFC727]" />,
              },
              {
                title: "Innovation",
                description: "Using AI, analytics, and new methods to stay ahead.",
                icon: <Lightbulb className="w-12 h-12 text-[#FFC727]" />,
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="bg-white text-gray-800 p-10 rounded-2xl shadow-lg hover:bg-[#FFC727]/10 transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: "#5C1F1C" }}>
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}