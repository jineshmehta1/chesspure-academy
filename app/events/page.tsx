"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Trophy,
  BookOpen,
  Star,
  ArrowRight,
  Filter,
  Crown,
  Zap,
} from "lucide-react";
import { format } from "date-fns";

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

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Chesspure State Open 2025",
      category: "tournament",
      date: "2025-12-20",
      time: "09:00 AM",
      location: "Visakhapatnam International Convention Centre",
      participants: "300+",
      prize: "₹1,00,000",
      description: "FIDE-rated classical tournament. 7 rounds, 90+30 time control. Open to all.",
      image: "/blog-1.jpeg",
      status: "upcoming",
      registrationFee: "₹800",
    },
    {
      id: 2,
      title: "GM Strategy Masterclass",
      category: "workshop",
      date: "2025-11-28",
      time: "02:00 PM",
      location: "Chesspure Academy, Visakhapatnam",
      participants: "60",
      prize: "Certificate + Opening PDF",
      description: "3-hour deep dive into Ruy Lopez with GM Rajesh Kumar. Live analysis + Q&A.",
      image: "/blog-2.jpg",
      status: "upcoming",
      registrationFee: "₹1,200",
    },
    {
      id: 3,
      title: "Under-14 Rapid Championship",
      category: "tournament",
      date: "2026-01-11",
      time: "10:00 AM",
      location: "Online (Lichess Team)",
      participants: "200+",
      prize: "₹25,000",
      description: "15+10 rapid. Free entry for Chesspure students. Titled prizes.",
      image: "/blog-3.webp",
      status: "upcoming",
      registrationFee: "₹400",
    },
    {
      id: 4,
      title: "Chess Psychology & Focus",
      category: "seminar",
      date: "2025-12-06",
      time: "11:00 AM",
      location: "Academy Conference Hall",
      participants: "40",
      prize: "Mindset Workbook",
      description: "Learn breathing, visualization, and handling time pressure from sports psychologist.",
      image: "/blog-4.png",
      status: "upcoming",
      registrationFee: "₹900",
    },
    {
      id: 5,
      title: "Simul with IM Aruna",
      category: "exhibition",
      date: "2025-11-22",
      time: "04:00 PM",
      location: "City Chess Arena",
      participants: "30",
      prize: "Photo + Signed Board",
      description: "Play against IM Tejavath Aruna in a 30-board simul. First come, first served.",
      image: "/blog-5.jpg",
      status: "upcoming",
      registrationFee: "₹500",
    },
    {
      id: 6,
      title: "Women's Chess Festival 2026",
      category: "special",
      date: "2026-03-08",
      time: "09:00 AM",
      location: "Chesspure Academy",
      participants: "150+",
      prize: "₹50,000 + Trophies",
      description: "Full-day event: Blitz tournament, GM lecture, networking lunch. All women welcome.",
      image: "/blog-5.jpg",
      status: "upcoming",
      registrationFee: "₹600",
    },
  ];

  const categories = [
    { id: "all", name: "All Events", icon: CalendarIcon },
    { id: "tournament", name: "Tournaments", icon: Trophy },
    { id: "workshop", name: "Workshops", icon: BookOpen },
    { id: "seminar", name: "Seminars", icon: Zap },
    { id: "exhibition", name: "Simul", icon: Crown },
    { id: "special", name: "Special", icon: Star },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-40 text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/galbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: accentColor, color: primaryColor }}>
            Events & Tournaments
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Chess Events Calendar
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-10 opacity-90">
            Compete, learn, and grow with India’s top chess events.
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-12 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: primaryColor }}>
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`h-20 flex flex-col items-center justify-center gap-2 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#5C1F1C] text-white hover:bg-[#8B4513]"
                    : "border-[#5C1F1C]/30 text-[#5C1F1C] hover:bg-[#5C1F1C]/5"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-[#5C1F1C]/20">
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
                  Showing {filteredEvents.length} of {events.length} events
                </span>
              </div>
            </div>

            {/* Grid View - #5C1F1C GLASS CARDS */}
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
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
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-xs">
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="p-6 text-gray-800">
                            <h3 className="text-2xl font-extrabold mb-3 text-[#5C1F1C] drop-shadow">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                              {event.description}
                            </p>

                            <div className="space-y-3 text-sm mb-6">
                              <div className="flex items-center gap-3">
                                <CalendarIcon className="w-5 h-5 text-[#FFC727]" />
                                <span className="font-medium">{format(new Date(event.date), "MMMM dd, yyyy")}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-[#FFC727]" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-[#FFC727]" />
                                <span className="text-xs">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-[#FFC727]" />
                                <span>{event.participants} expected</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="text-center bg-gradient-to-br from-[#5C1F1C]/10 to-[#8B4513]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                                <Trophy className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                                <p className="text-xs font-medium text-gray-600">Prize Pool</p>
                                <p className="font-bold text-[#5C1F1C] text-lg">{event.prize}</p>
                              </div>
                              <div className="text-center bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 rounded-xl p-4 border border-[#5C1F1C]/20">
                                <CalendarIcon className="w-7 h-7 mx-auto mb-2 text-[#5C1F1C]" />
                                <p className="text-xs font-medium text-gray-600">Entry Fee</p>
                                <p className="font-bold text-[#5C1F1C] text-lg">{event.registrationFee}</p>
                              </div>
                            </div>

                            <Link href="/contact" className="block">
                              <Button
                                className="w-full bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
                              >
                                Register Now <ArrowRight className="ml-2 w-5 h-5" />
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

            {/* Calendar View */}
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
                    <div className="bg-gradient-to-br from-[#5C1F1C] to-[#8B4513] p-1.5 rounded-3xl">
                      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6">
                        <h3 className="text-xl font-extrabold mb-4" style={{ color: primaryColor }}>
                          Pick a Date
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
                          Events on{" "}
                          {selectedDate
                            ? format(selectedDate, "MMMM dd, yyyy")
                            : "Selected Date"}
                        </h3>
                        <div className="space-y-4">
                          {filteredEvents
                            .filter((e) =>
                              selectedDate
                                ? e.date === format(selectedDate, "yyyy-MM-dd")
                                : true
                            )
                            .map((event) => (
                              <div
                                key={event.id}
                                className="flex items-center gap-4 p-5 border border-[#5C1F1C]/20 rounded-2xl hover:border-[#5C1F1C]/40 transition-all bg-white/50 backdrop-blur-sm"
                              >
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFC727] to-[#FFD700]" />
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg" style={{ color: primaryColor }}>
                                    {event.title}
                                  </h4>
                                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {event.time}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {event.location}
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
                          {filteredEvents.filter((e) =>
                            selectedDate
                              ? e.date === format(selectedDate, "yyyy-MM-dd")
                              : true
                          ).length === 0 && (
                            <p className="text-center text-gray-500 py-12 text-lg">
                              No events on this date.
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
    </div>
  );
}