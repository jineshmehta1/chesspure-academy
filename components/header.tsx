"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

export function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
    },
    { name: "Courses", href: "/courses" },
    { name: "Our Coaches", href: "/coaches" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const primaryColor = "#ffffff"; // Dark brown from the logo background
  const accentColor = "#FFD700"; // Gold/yellow from the logo text

  return (
    <header className={`bg-[#ffffff] shadow-md fixed w-full z-40`}>
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-10 py-4">
        {/* Left Section: Logo + Academy Title */}
        <div className="flex items-center w-full lg:w-auto">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/logo.webp" // Assuming '/logo.webp' is the path to your logo
                alt="Chesspure Academy Logo"
                width={55}
                height={55}
              />
            </div>
            <span className={`text-base md:text-xl font-semibold tracking-tight text-[${accentColor}] whitespace-nowrap`}>
              Chesspure Academy
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden ml-auto flex items-center">
            <button
              className={`p-1 text-[${accentColor}] hover:text-[#5C1F1C]`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section: Contact Info + Navbar Menu (Desktop) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 mt-4 lg:mt-0 w-full lg:w-auto">
          

          {/* Desktop Navbar Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      className={`flex items-center space-x-1 text-[${accentColor}] hover:text-white font-medium py-1 px-1.5 text-md whitespace-nowrap`}
                      aria-expanded={isAboutOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {isAboutOpen && (
                      <div className={`absolute top-full left-0 mt-1 w-40 bg-[${primaryColor}] text-white rounded shadow-lg border border-[${accentColor}] z-10`}>
                        {item.dropdownItems?.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className={`block px-3 py-1.5 text-md hover:bg-[${accentColor}] hover:text-[#5C1F1C] whitespace-nowrap`}
                            onClick={() => setIsAboutOpen(false)}
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.name === "Online Coaching" ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[${accentColor}] hover:text-[#5C1F1C] font-medium py-1 px-1.5 text-md rounded whitespace-nowrap`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-[${accentColor}] hover:text-[#5C1F1C] font-medium py-1 px-1.5 text-md rounded whitespace-nowrap`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden bg-[${primaryColor}] text-white py-3 px-4 space-y-2`}>
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className={`flex items-center justify-between w-full hover:text-[${accentColor}] py-2 text-base`}
                    aria-expanded={isAboutOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isAboutOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className={`block text-white hover:bg-[${accentColor}] hover:text-[${primaryColor}] py-2 text-sm px-3`}
                          onClick={() => {
                            setIsAboutOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.name === "Online Coaching" ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-[${accentColor}] py-2 text-base block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`hover:text-[${accentColor}] py-2 text-base block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}