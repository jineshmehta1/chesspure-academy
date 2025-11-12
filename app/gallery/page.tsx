"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Trophy, Users, BookOpen, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const white = "#FFFFFF";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

const galleryCategories = [
  { id: "all", name: "All Photos", icon: Camera },
  { id: "tournaments", name: "Tournaments", icon: Trophy },
  { id: "certificate", name: "Certificates", icon: Users },
  { id: "events", name: "Events", icon: BookOpen },
];

// Dummy Images (No real files needed)
const dummyImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34ce?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=600&fit=crop",
];

const galleryImages = [
  {
    id: 1,
    src: dummyImages[0],
    alt: "National Chess Championship 2025",
    category: "tournaments",
    title: "National Championship",
    description: "Top players compete for the national title",
  },
  {
    id: 2,
    src: dummyImages[1],
    alt: "Beginner Chess Workshop",
    category: "tournaments",
    title: "Beginner Bootcamp",
    description: "Young learners mastering the basics",
  },
  {
    id: 3,
    src: dummyImages[2],
    alt: "Advanced Tactics Class",
    category: "tournaments",
    title: "Tactics Mastery",
    description: "Solving complex puzzles and strategies",
  },
  {
    id: 4,
    src: dummyImages[3],
    alt: "FIDE Arbiter Certificate",
    category: "certificate",
    title: "FIDE Arbiter",
    description: "Certified by International Chess Federation",
  },
  {
    id: 5,
    src: dummyImages[4],
    alt: "National Arbiter Award",
    category: "certificate",
    title: "National Arbiter",
    description: "Recognized by All India Chess Federation",
  },
  {
    id: 6,
    src: dummyImages[5],
    alt: "Arena International Master",
    category: "certificate",
    title: "Arena International Master",
    description: "Top-rated online chess achievement",
  },
  {
    id: 7,
    src: dummyImages[6],
    alt: "Inter-School Chess Event",
    category: "events",
    title: "Inter-School Championship",
    description: "50+ schools participated in the annual event",
  },
  {
    id: 8,
    src: dummyImages[7],
    alt: "Summer Chess Camp",
    category: "events",
    title: "Summer Chess Camp",
    description: "Fun learning with grandmaster coaches",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id));
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily }}>
      {/* Hero Section - Brown with Image Background */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/galbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Chess Gallery</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Capturing moments of learning, competition, and chess excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar - Brown */}
      <section className="py-8 border-b" style={{ backgroundColor: primaryColor, borderColor: "#4A1A17" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {galleryCategories.map((category) => {
                const Icon = category.icon;
                const selected = selectedCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium
                      ${selected
                        ? "bg-white text-[#5C1F1C] shadow-lg scale-105"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                      }`}
                  >
                    <Icon className="w-5 h-5 mr-2" /> {category.name}
                  </Button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 rounded-lg p-1" style={{ backgroundColor: "#4A1A17" }}>
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="px-4 text-white"
                style={{ backgroundColor: viewMode === "grid" ? accentColor : "transparent" }}
              >
                <Grid3X3 className="w-4 h-4 mr-2" /> Grid
              </Button>
              <Button
                onClick={() => setViewMode("masonry")}
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                className="px-4 text-white"
                style={{ backgroundColor: viewMode === "masonry" ? accentColor : "transparent" }}
              >
                <List className="w-4 h-4 mr-2" /> Masonry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - White Background */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            }
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(image)}
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full object-cover transition-transform duration-300 ${
                      viewMode === "grid" ? "h-64" : "h-auto"
                    } group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-semibold">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {galleryCategories.find((cat) => cat.id === image.category)?.name || "Other"}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-2xl p-2">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            <Button
              onClick={closeLightbox}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 border border-white/30 text-white hover:bg-white hover:text-[#5C1F1C]"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              onClick={prevImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border border-white/30 text-white hover:bg-white hover:text-[#5C1F1C]"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border border-white/30 text-white hover:bg-white hover:text-[#5C1F1C]"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-sm p-4">
              <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                {selectedImage.title}
              </h3>
              <p className="text-gray-700">{selectedImage.description}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Live India Time */}
      <p className="text-center py-8 text-xs" style={{ color: primaryColor }}>
        Available in India • {new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
    </div>
  );
}