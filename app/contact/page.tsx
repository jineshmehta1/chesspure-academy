"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea }  from "@/components/ui/textarea";
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
      className="absolute rounded-full blur-xl opacity-20"
      style={{
        width: size,
        height: size,
        left: `${position.x}%`,
        top: `${position.y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{
        duration: 4,
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
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
    <section className="py-20 bg-white relative overflow-hidden">
      <GlowingOrb color="#FFC727" size={600} position={{ x: 15, y: 25 }} />
      <GlowingOrb color="#FF6B35" size={500} position={{ x: 85, y: 75 }} />

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left – Title + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Have <span className="block">Questions?</span>
            <span style={{ color: primaryColor }}>We’re here to answer them.</span>
          </h2>

          <Button
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Book a Free Trial
          </Button>
        </motion.div>

        {/* Right – Accordion */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ThreeDCard className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: openFAQ === idx ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-orange-500"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                    <p className="text-lg font-medium text-gray-800">{item.q}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {openFAQ === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-gray-200">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
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
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      alert("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      {/* Hero Section - Brown with Chess Image */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/conbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4" style={{ backgroundColor: accentColor, color: primaryColor }}>
            Get In Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Ready to start your chess journey? We're here to help every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form - Clean Layout */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
                Send a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto w-16 h-16 mb-4" style={{ color: "#10B981" }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "#10B981" }}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">Thank you! We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="font-semibold text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-2"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-semibold text-gray-700">
                        Email *
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-2"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Inquiry Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="font-semibold text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-2"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <Label className="font-semibold text-gray-700">Inquiry Type *</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="font-semibold text-gray-700">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="mt-2"
                      placeholder="Course inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="font-semibold text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      required
                      className="mt-2"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg font-semibold rounded-xl"
                    style={{
                      backgroundColor: primaryColor,
                      color: white,
                    }}
                  >
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How to Reach Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: primaryColor }}>
            How to Reach Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                details: [
                  "11-13-75 Road No 2, Alkapuri, Kothapet, Hyderabad-500035",
                  "Above Pragathi Model School",
                ],
              },
              {
                icon: Phone,
                title: "Call Us",
                details: ["Office: +91-9864646481", "WhatsApp: +91-9864646481"],
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
              <Card key={idx} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                    {title}
                  </h3>
                  {details.map((d, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {d}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Chesspure Academy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8902674607427!2d78.50310917499912!3d17.322055904365462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9992786f1711%3A0xc2a03126f2eff5c4!2s11-13-75%20Road%20No%202%2C%20Alkapuri%2C%20Kothapet%2C%20Hyderabad%2C%20Telangana%20500035!5e0!3m2!1sen!2sin!4v1694871600000!5m2!1sen!2sin"
              width="100%"
              height="100%"
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