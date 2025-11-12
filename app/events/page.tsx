"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
      location: "Hyderabad International Convention Centre",
      participants: "300+",
      prize: "₹1,00,000",
      description: "FIDE-rated classical tournament. 7 rounds, 90+30 time control. Open to all.",
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹800",
      color: "from-[#5C1F1C] to-[#8B4513]",
    },
    {
      id: 2,
      title: "GM Strategy Masterclass",
      category: "workshop",
      date: "2025-11-28",
      time: "02:00 PM",
      location: "Chesspure Academy, Hyderabad",
      participants: "60",
      prize: "Certificate + Opening PDF",
      description: "3-hour deep dive into Ruy Lopez with GM Rajesh Kumar. Live analysis + Q&A.",
      image: "https://images.unsplash.com/photo-1511193311914-991f00ad8b66?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹1,200",
      color: "from-[#8B4513] to-[#A0522D]",
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
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹400",
      color: "from-[#A0522D] to-[#D2691E]",
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
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d5d0?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹900",
      color: "from-[#D2691E] to-[#CD853F]",
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
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹500",
      color: "from-[#CD853F] to-[#DAA520]",
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
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      status: "upcoming",
      registrationFee: "₹600",
      color: "from-[#FFC727] to-[#FFA500]",
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/galbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge className="mb-6 text-lg" style={{ backgroundColor: "#FFC727", color: "#5C1F1C" }}>
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
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10" style={{ color: "#5C1F1C" }}>
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
              <TabsList className="bg-white border border-[#5C1F1C]/20">
                <TabsTrigger value="grid" className="data-[state=active]:bg-[#5C1F1C] data-[state=active]:text-white">
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-[#5C1F1C] data-[state=active]:text-white">
                  Calendar View
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 text-gray-600 mt-4 md:mt-0">
                <Filter className="w-5 h-5" />
                <span className="text-sm">
                  Showing {filteredEvents.length} of {events.length} events
                </span>
              </div>
            </div>

            {/* Grid View */}
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                      <div className={`h-2 bg-gradient-to-r ${event.color}`} />
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            className={`bg-gradient-to-r ${event.color} text-white font-semibold`}
                          >
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-2" style={{ color: "#5C1F1C" }}>
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-3 text-sm mb-6">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-[#FFC727]" />
                            <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#FFC727]" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[#FFC727]" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-[#FFC727]" />
                            <span>{event.participants} expected</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center bg-gradient-to-br from-[#5C1F1C]/5 to-[#8B4513]/5 rounded-lg p-3 border border-[#5C1F1C]/20">
                            <Trophy className="w-6 h-6 mx-auto mb-1 text-[#5C1F1C]" />
                            <p className="text-xs font-medium text-gray-600">Prize Pool</p>
                            <p className="font-bold text-[#5C1F1C]">{event.prize}</p>
                          </div>
                          <div className="text-center bg-gradient-to-br from-[#8B4513]/5 to-[#A0522D]/5 rounded-lg p-3 border border-[#5C1F1C]/20">
                            <CalendarIcon className="w-6 h-6 mx-auto mb-1 text-[#5C1F1C]" />
                            <p className="text-xs font-medium text-gray-600">Entry Fee</p>
                            <p className="font-bold text-[#5C1F1C]">{event.registrationFee}</p>
                          </div>
                        </div>

                        <Link href="/contact" className="w-full">
                          <Button
                            className={`w-full bg-gradient-to-r ${event.color} text-white font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                          >
                            Register Now <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Calendar View */}
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card className="shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4" style={{ color: "#5C1F1C" }}>
                        Pick a Date
                      </h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-xl border border-[#5C1F1C]/20"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="shadow-xl rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-6" style={{ color: "#5C1F1C" }}>
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
                              className="flex items-center gap-4 p-4 border border-[#5C1F1C]/20 rounded-xl hover:border-[#5C1F1C]/40 transition-all"
                            >
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${event.color}`} />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg" style={{ color: "#5C1F1C" }}>
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
                                className="border-[#5C1F1C] text-[#5C1F1C] hover:bg-[#5C1F1C] hover:text-white"
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
                          <p className="text-center text-gray-500 py-8">
                            No events on this date.
                          </p>
                        )}
                      </div>
                    </CardContent>
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