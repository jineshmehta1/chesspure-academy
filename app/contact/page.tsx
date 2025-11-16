"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const white = "#FFFFFF";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

function GlowingOrb({
  color = "blue",
  size = 200,
  position = { x: 50, y: 50 },
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30"
      style={{
        width: size,
        height: size,
        left: `${position.x}%`,
        top: `${position.y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

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

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: "What time are the classes?",
      a: "We run classes on weekdays 4 PM – 8 PM and weekends 9 AM – 6 PM. Morning, afternoon and evening batches are available. New batches start every month.",
    },
    {
      q: "Are there any pre-requisites?",
      a: "No prior chess knowledge is required. Our beginner program starts from the fundamentals and builds a strong foundation.",
    },
    {
      q: "Can I get a discount?",
      a: "Yes! Quarterly plans give 10% off, family packages and school-partnership discounts are also available.",
    },
    {
      q: "Who will take my classes?",
      a: "All sessions are conducted by FIDE-rated coaches (2000+ ELO) with an average of 8+ years teaching experience.",
    },
    {
      q: "Is there a weekend-only batch?",
      a: "Absolutely – we have dedicated Saturday & Sunday batches (9 AM – 6 PM). You can pick the slot that fits your schedule.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <GlowingOrb color="#FFC727" size={600} position={{ x: 10, y: 20 }} />
      <GlowingOrb color="#FF8C42" size={500} position={{ x: 90, y: 80 }} />

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left – Title + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Have <span className="block">Questions?</span>
            <span style={{ color: primaryColor }}>We’re here to answer them.</span>
          </h2>

          <Button
            className="bg-gradient-to-r from-[#FFC727] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFC727] text-[#5C1F1C] font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300 group"
          >
            <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Book a Free Trial
          </Button>
        </motion.div>

        {/* Right – Gradient Accordion */}
        <div className="space-y-5">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ThreeDCard className="rounded-2xl overflow-hidden shadow-xl border-0">
                <div
                  className="bg-gradient-to-br from-[#5C1F1C] via-[#8B4513] to-[#A0522D] p-1 rounded-2xl"
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[#5C1F1C]"
                        >
                          <ChevronDown className="w-6 h-6" />
                        </motion.div>
                        <p className="text-lg font-semibold text-gray-800">{item.q}</p>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openFAQ === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    "General Information",
    "Course Enrollment",
    "Private Coaching",
    "Tournament Registration",
    "Workshop Booking",
    "Partnership Inquiry",
    "Media & Press",
    "Other",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xldwygeq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
        });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily }}>
      {/* Hero Section */}
      <section
        className="relative py-40 text-white overflow-hidden"
        style={{
          backgroundImage: 'url("/conbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 " />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 text-lg" style={{ backgroundColor: accentColor, color: primaryColor }}>
            Get In Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Ready to start your chess journey? We're here to help every step of the way.
          </p>
        </div>
      </section>

  {/* Contact Form - 2 Column Layout (Image Left + Form Right) */}
<section className="py-16 px-4">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* LEFT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <img
        src="/conknight.png"  // <-- change to your image
        alt="Contact Illustration"
        className="rounded-3xl w-full object-cover h-[650px]"
      />
    </motion.div>

    {/* RIGHT FORM */}
    <ThreeDCard className="rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-br from-[#5C1F1C] via-[#8B4513] to-[#A0522D] p-1.5 rounded-3xl">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center" style={{ color: primaryColor }}>
            Send a Message
          </h2>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="mx-auto w-20 h-20 mb-6" style={{ color: "#10B981" }} />
              <h3 className="text-3xl font-bold mb-3" style={{ color: "#10B981" }}>
                Message Sent!
              </h3>
              <p className="text-gray-600 text-lg">
                Thank you! We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="font-semibold text-gray-800">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-2 h-12 bg-white/80 border-gray-300 focus:border-[#5C1F1C]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold text-gray-800">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-2 h-12 bg-white/80 border-gray-300 focus:border-[#5C1F1C]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="font-semibold text-gray-800">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2 h-12 bg-white/80 border-gray-300"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <Label className="font-semibold text-gray-800">Inquiry Type *</Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => handleInputChange("inquiryType", value)}
                  >
                    <SelectTrigger className="mt-2 h-12 bg-white/80 border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="font-semibold text-gray-800">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                  className="mt-2 h-12 bg-white/80 border-gray-300"
                  placeholder="Course inquiry"
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-semibold text-gray-800">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  required
                  className="mt-2 bg-white/80 border-gray-300"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button
                type="submit"
                className="w-full py-7 text-lg font-bold rounded-2xl bg-gradient-to-r from-[#FFC727] to-[#FFD700] text-[#5C1F1C] hover:shadow-xl hover:shadow-yellow-500/40 transform hover:scale-105 transition-all duration-300"
              >
                Send Message <Send className="ml-3 w-6 h-6" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </ThreeDCard>

  </div>
</section>


      {/* How to Reach Us - Gradient Cards */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16" style={{ color: primaryColor }}>
            How to Reach Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                details: [
                  "Plot No 401, Green Valley, Behind 36inn, SBI Street, Yendada-530045",
                ],
              },
              {
                icon: Phone,
                title: "Call Us",
                details: ["Office: +91-7981240311", "WhatsApp: +91-7981240311"],
              },
              {
                icon: Mail,
                title: "Email",
                details: ["Chesspureacademy@gmail.com"],
              },
              {
                icon: Clock,
                title: "Hours",
                details: ["Mon-Sun: 10 AM to 8 PM"],
              },
            ].map(({ icon: Icon, title, details }, idx) => (
              <ThreeDCard key={idx} className="rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-[#5C1F1C] via-[#8B4513] to-[#A0522D] p-1 rounded-2xl h-full">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 h-full text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
                      {title}
                    </h3>
                    {details.map((d, i) => (
                      <p key={i} className="text-gray-700 text-sm leading-relaxed">
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              title="Chesspure Academy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.3160668424007!2d83.35651567463543!3d17.77683669147027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395becebe46b37%3A0xebf2ea02cafa2720!2sChesspure%20Chess%20Academy!5e0!3m2!1sen!2sin!4v1763215846078!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}