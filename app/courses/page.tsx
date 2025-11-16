"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Target,
  Trophy,
  Crown,
  Clock,
  Users,
  Star,
  Filter,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
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

export default function CoursesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const courses = [
    {
      id: 1,
      title: "Beginner Level 1",
      level: "Beginner",
      duration: "3 Months",
      price: "₹15,000",
      students: "120+",
      rating: "4.9",
      icon: BookOpen,
      image: "/demo/course-1.jpg",
      description: "Perfect for kids & adults starting from zero. Learn rules, piece movement, and basic checkmates.",
      schedule: "2 classes/week (1.5 hrs each)",
      ageGroup: "6+ years",
      classSize: "8–10 students",
      date: "2025-12-01",
    },
    {
      id: 2,
      title: "Beginner Level 2",
      level: "Beginner",
      duration: "3 Months",
      price: "₹15,000",
      students: "95+",
      rating: "4.8",
      icon: BookOpen,
      image: "/demo/course-2.jpg",
      description: "Master elementary checkmates and simple tactics. Play your first real games with confidence.",
      schedule: "2 classes/week (1.5 hrs each)",
      ageGroup: "6+ years",
      classSize: "8–10 students",
      date: "2025-12-05",
    },
    {
      id: 3,
      title: "Intermediate Level 1",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "80+",
      rating: "4.8",
      icon: Target,
      image: "/demo/course-3.jpg",
      description: "Build tactical vision. Solve 2–3 move combinations and avoid blunders.",
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
      date: "2025-12-10",
    },
    {
      id: 4,
      title: "Intermediate Level 2",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "75+",
      rating: "4.8",
      icon: Target,
      image: "/demo/course-4.jpg",
      description: "Learn opening strategy, pawn play, and positional concepts.",
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
      date: "2025-12-15",
    },
    {
      id: 5,
      title: "Intermediate Level 3",
      level: "Intermediate",
      duration: "4 Months",
      price: "₹20,000",
      students: "60+",
      rating: "4.9",
      icon: Target,
      image: "/demo/course-5.jpg",
      description: "Master complex tactics and start building your own opening repertoire.",
      schedule: "3 classes/week (2 hrs each)",
      ageGroup: "8+ years",
      classSize: "6–8 students",
      date: "2025-12-20",
    },
    {
      id: 6,
      title: "Advanced Level 1",
      level: "Advanced",
      duration: "6 Months",
      price: "₹30,000",
      students: "40+",
      rating: "4.9",
      icon: Trophy,
      image: "/demo/course-6.jpg",
      description: "Tournament-ready training. Deep opening prep, endgame mastery, and psychological edge.",
      schedule: "4 classes/week (2.5 hrs each)",
      ageGroup: "12+ years",
      classSize: "4–6 students",
      date: "2026-01-05",
    },
    {
      id: 7,
      title: "Advanced Level 2",
      level: "Expert",
      duration: "6 Months",
      price: "₹35,000",
      students: "25+",
      rating: "5.0",
      icon: Crown,
      image: "/demo/course-7.jpg",
      description: "Elite path to 2000+ ELO. GM-level concepts, blindfold training, and tournament simulation.",
      schedule: "4 classes/week (2.5 hrs each)",
      ageGroup: "14+ years",
      classSize: "3–4 students",
      date: "2026-01-10",
    },
    {
      id: 8,
      title: "Masterclass Series",
      level: "Master",
      duration: "3 Months",
      price: "₹50,000",
      students: "15+",
      rating: "5.0",
      icon: Crown,
      image: "/demo/course-8.jpg",
      description: "Exclusive 1-on-1 with IM/GM. For rated 1800+ players aiming for titles.",
      schedule: "Flexible (2–3 hrs/week)",
      ageGroup: "16+ years",
      classSize: "1 student",
      date: "2026-01-15",
    },
  ];

  const filters = [
    { id: "all", name: "All Courses", icon: BookOpen },
    { id: "beginner", name: "Beginner", icon: BookOpen },
    { id: "intermediate", name: "Intermediate", icon: Target },
    { id: "advanced", name: "Advanced", icon: Trophy },
    { id: "master", name: "Master", icon: Crown },
  ];

  const filteredCourses =
    selectedFilter === "all"
      ? courses
      : courses.filter((c) => c.level.toLowerCase() === selectedFilter);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `white`,
      }}
    >
      {/* Hero Section */}
      <section
        className="relative py-40 text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/coursesbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80 " />
        <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: accentColor, color: primaryColor }}>
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
                className="bg-white text-[#5C1F1C] hover:bg-[#FFC727] hover:text-[#5C1F1C] px-8 py-6 rounded-full font-bold shadow-lg transition-all"
              >
                Book Free Trial
              </Button>
            </Link>
            <Link href="#courses">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-full backdrop-blur-sm"
              >
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Filter className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-2xl font-extrabold" style={{ color: primaryColor }}>
              Filter by Level
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className={`h-16 flex flex-col items-center justify-center gap-2 rounded-xl transition-all backdrop-blur-md ${
                  selectedFilter === filter.id
                    ? "bg-white/90 text-[#5C1F1C] border border-[#5C1F1C]/30 hover:bg-white"
                    : "bg-white/70 text-[#5C1F1C] border border-[#5C1F1C]/20 hover:bg-white/80"
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <filter.icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{filter.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - TABS */}
      <section id="courses" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <TabsList className="bg-white/80 backdrop-blur-md border border-[#5C1F1C]/20">
                <TabsTrigger value="grid" className="data-[state=active]:bg-[#5C1F1C] data-[state=active]:text-white">
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-[#5C1F1C] data-[state=active]:text-white">
                  Calendar View
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 text-gray-700 mt-4 md:mt-0">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Showing {filteredCourses.length} of {courses.length} courses
                </span>
              </div>
            </div>

            {/* GRID VIEW */}
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
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
                          <div className="relative h-56">
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-xs">
                                {course.level}
                              </Badge>
                            </div>
                          </div>

                          <div className="p-6 text-gray-800">
                            <h3 className="text-2xl font-extrabold mb-3 text-[#5C1F1C] drop-shadow">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                              {course.description}
                            </p>

                            <div className="space-y-3 text-sm mb-6">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-[#FFC727]" />
                                <span className="font-medium">{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-[#FFC727]" />
                                <span>{course.students} enrolled</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Star className="w-5 h-5 fill-[#FFC727] text-[#FFC727]" />
                                <span>{course.rating}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="text-center bg-gradient-to-br from-[#5C1F1C]/10 to-[#8B4513]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                                <BookOpen className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                                <p className="text-xs font-medium text-gray-600">Schedule</p>
                                <p className="font-bold text-[#5C1F1C] text-xs">{course.schedule}</p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                                <Target className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                                <p className="text-xs font-medium text-gray-600">Class Size</p>
                                <p className="font-bold text-[#5C1F1C] text-sm">{course.classSize}</p>
                              </div>
                            </div>

                            <Link href="/contact" className="block">
                              <Button
                                className="w-full bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
                              >
                                Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ThreeDCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* CALENDAR VIEW */}
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
                    <div className="bg-gradient-to-br from-[#5C1F1C] to-[#8B4513] p-1.5 rounded-3xl">
                      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6">
                        <h3 className="text-xl font-extrabold mb-4" style={{ color: primaryColor }}>
                          Pick a Start Date
                        </h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-xl border border-[#5C1F1C]/20"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="shadow-2xl rounded-3xl border-0">
                    <div className="bg-gradient-to-br from-[#5C1F1C] to-[#8B4513] p-1.5 rounded-3xl">
                      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6">
                        <h3 className="text-xl font-extrabold mb-6" style={{ color: primaryColor }}>
                          Courses Starting on{" "}
                          {selectedDate
                            ? format(selectedDate, "MMMM dd, yyyy")
                            : "Selected Date"}
                        </h3>
                        <div className="space-y-4">
                          {filteredCourses
                            .filter((c) =>
                              selectedDate
                                ? c.date === format(selectedDate, "yyyy-MM-dd")
                                : true
                            )
                            .map((course) => (
                              <div
                                key={course.id}
                                className="flex items-center gap-4 p-5 border border-[#5C1F1C]/20 rounded-2xl hover:border-[#5C1F1C]/40 transition-all bg-white/70 backdrop-blur-md"
                              >
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFC727] to-[#FFD700]" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg" style={{ color: primaryColor }}>
                                    {course.title}
                                  </h4>
                                  <div className="flex gap-4 text-sm text-gray-700 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {course.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Target className="w-4 h-4" />
                                      {course.level}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  className="border-[#5C1F1C] text-[#5C1F1C] hover:bg-[#5C1F1C] hover:text-white font-medium"
                                >
                                  View
                                </Button>
                              </div>
                            ))}
                          {filteredCourses.filter((c) =>
                            selectedDate
                              ? c.date === format(selectedDate, "yyyy-MM-dd")
                              : true
                          ).length === 0 && (
                            <p className="text-center text-gray-600 py-12 text-lg">
                              No courses starting on this date.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.85) 0%, 
              rgba(255, 255, 255, 0.75) 100%)`,
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 40px rgba(92, 31, 28, 0.15)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: primaryColor }}>
            Start Your Chess Journey Today
          </h2>
          <p className="text-xl text-gray-700 mb-10">
            Join 1,000+ students. First class is <strong className="text-[#5C1F1C]">free</strong>.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] px-14 py-8 text-xl font-bold rounded-full shadow-2xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
            >
              Claim Free Trial Class
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}