import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

// Brand Colors
const primaryColor = "#5C1F1C";     // Deep brown (footer bg)
const accentColor = "#FFC727";      // Gold/yellow (accents)
const white = "#FFFFFF";
const textLight = "#FFFFFF";        // White text on dark bg
const textMuted = "#D4AF37";        // Muted gold for secondary text
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export function Footer() {
  const currentTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/chessacademy", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/chesspure", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/chesspureacademy", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@chesspureacademy", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Coaches", href: "/coaches" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: primaryColor, fontFamily }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <span className="text-2xl" style={{ color: primaryColor }}>King</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ChessPure Academy</h3>
                <p className="text-xs" style={{ color: textMuted }}>
                  Professional Chess Training
                </p>
              </div>
            </div>
            <p className="text-sm mb-6" style={{ color: textLight }}>
              Dedicated to world-class chess education and building champions from Visakhapatnam to the world.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: accentColor }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: accentColor }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors text-sm hover:underline"
                    style={{ color: textLight }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

                   <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#C9A227] mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-white/80 hover:text-[#C9A227] transition-colors">
                  Beginner Course
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/80 hover:text-[#C9A227] transition-colors">
                  Intermediate
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/80 hover:text-[#C9A227] transition-colors">
                  Advanced Coaching
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/80 hover:text-[#C9A227] transition-colors">
                  Tournament Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6" style={{ color: accentColor }}>
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-0.5" style={{ color: accentColor }} />
                <div>
                  <p className="text-sm" style={{ color: textLight }}>+91 7981240311</p>
                  <p className="text-xs" style={{ color: textMuted }}>Mon - Sun, 10:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-0.5" style={{ color: accentColor }} />
                <div>
                  <p className="text-sm" style={{ color: textLight }}>chesspureacademy@gmail.com</p>
                  <p className="text-xs" style={{ color: textMuted }}>Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: accentColor }} />
                <div>
                  <p className="text-sm" style={{ color: textLight }}>Visakhapatnam, Andhra Pradesh</p>
                  <p className="text-xs" style={{ color: textMuted }}>India</p>
                </div>
              </div>
            </div>
          </div>




        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-6" style={{ borderColor: accentColor + "40" }}>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <p style={{ color: textMuted }}>
              © 2025 ChessPure Academy. All rights reserved.
            </p>
            <p style={{ color: textMuted }} className="mt-2 md:mt-0">
              India • {currentTime}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="hover:underline transition-colors"
                style={{ color: textMuted }}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="hover:underline transition-colors"
                style={{ color: textMuted }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}