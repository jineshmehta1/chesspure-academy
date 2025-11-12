"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Calendar, Clock, Eye, Heart, Search } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Brand Colors
const primaryColor = "#5C1F1C";
const accentColor = "#FFC727";
const white = "#FFFFFF";
const fontFamily = "'Poppins', 'Montserrat', 'Nunito', sans-serif";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Art of the Checkmate: 5 Patterns Every Player Must Know",
      excerpt:
        "From Scholar's Mate to Anastasia's Mate — master these 5 checkmate patterns to finish games in style.",
      content: `
# 5 Checkmate Patterns to Master

## 1. **Scholar's Mate** (4 moves)
The fastest checkmate — but deadly if your opponent isn't paying attention.

\`\`\`pgn
1.e4 e5 2.Qh5 Nc6 3.Bc4 Nf6?? 4.Qxf7#
\`\`\`

## 2. **Anastasia's Mate**
Queen + Knight combo on h7.

## 3. **Smothered Mate**
Knight delivers mate while king is trapped by own pieces.

## 4. **Back-Rank Mate**
Rook or Queen on the 8th rank.

## 5. **Arabian Mate**
Rook + Knight in the corner.

> **Pro Tip**: Always look for **queen + knight** or **rook + bishop** batteries near the enemy king.

---

Practice these daily. You'll spot them in your own games!
      `,
      author: "GM Vishal Kumar",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      date: "2025-11-08",
      readTime: "7 min",
      category: "checkmate",
      tags: ["Checkmate", "Tactics", "Patterns"],
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      views: 4800,
      likes: 390,
    },
    {
      id: 2,
      title: "Why Your Child Should Play Chess: 7 Science-Backed Benefits",
      excerpt:
        "Boost IQ, focus, and emotional intelligence. Chess isn't just a game — it's brain training.",
      content: `
# Chess & Child Brain Development

## 1. **Improves Memory**
Harvard study: Chess players recall 30% more information.

## 2. **Boosts IQ**
Average **+8 IQ points** after 12 months of regular play.

## 3. **Enhances Focus**
40% longer attention span in chess-trained kids.

## 4. **Teaches Emotional Control**
Losing teaches resilience. Winning teaches humility.

## 5. **Better Math & Logic**
Top chess kids score **15% higher** in math.

## 6. **Develops Creativity**
Chess creates 10¹²⁰ possible games — more than atoms in the universe.

## 7. **Builds Confidence**
Every win is earned through skill, not luck.

---

> "Chess is mental torture." – Garry Kasparov  
> But it's also **mental training**.

Enroll your child today. The future starts with one move.
      `,
      author: "Dr. Neha Gupta",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
      date: "2025-11-05",
      readTime: "9 min",
      category: "benefits",
      tags: ["Kids", "Science", "Brain"],
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=500&fit=crop",
      views: 6200,
      likes: 510,
    },
    {
      id: 3,
      title: "Ruy Lopez: The Spanish Torture Explained",
      excerpt:
        "The most respected opening in chess history. Learn the main lines and key ideas.",
      content: `
# Ruy Lopez (Spanish Opening)

**1.e4 e5 2.Nf3 Nc6 3.Bb5**

Used by every world champion. The "Spanish Torture" squeezes Black slowly.

## Main Lines

### 1. **Berlin Defense** (3...Nf6)
Carlsen's favorite. Leads to endgame.

### 2. **Morphy Defense** (3...a6)
The classical response.

### 3. **Closed Ruy**
Deep strategy with d3, c3, and kingside attack.

## Key Ideas for White
- Pressure on e5
- Control d4
- Kingside attack with h3, g4, Ng5

> **Pro Tip**: Play **a4** to stop ...b5 and fix the queenside.

---

Master the Ruy Lopez. Dominate the center.
      `,
      author: "IM Aryan Singh",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
      date: "2025-11-01",
      readTime: "10 min",
      category: "openings",
      tags: ["Ruy Lopez", "Openings", "Strategy"],
      image: "https://images.unsplash.com/photo-1511193311914-991f00ad8b66?w=800&h=500&fit=crop",
      views: 3900,
      likes: 280,
    },
    {
      id: 4,
      title: "How to Study Chess Like a Pro (Without Burning Out)",
      excerpt:
        "A step-by-step training plan used by grandmasters. Train smarter, not harder.",
      content: `
# Pro-Level Chess Study Plan

## Daily Routine (2 Hours)

| Time | Activity |
|------|---------|
| 30 min | Tactics (Chess.com / Lichess) |
| 45 min | Game Analysis (your own games) |
| 30 min | Opening Prep (1 line only) |
| 15 min | Endgame Drill |

## Weekly Goals
- Solve **100 tactics**
- Analyze **3 games** deeply
- Watch **1 master class**

## Tools
- **Chess.com** – Puzzles
- **Lichess Study** – Opening prep
- **Stockfish** – Game analysis

> **Golden Rule**: Quality > Quantity

---

Consistency beats talent. Start today.
      `,
      author: "Coach Rohan Mehta",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      date: "2025-10-28",
      readTime: "8 min",
      category: "training",
      tags: ["Study", "Improvement", "Routine"],
      image: "https://images.unsplash.com/photo-1587280501635-09b2b9897e8a?w=800&h=500&fit=crop",
      views: 5500,
      likes: 420,
    },
    {
      id: 5,
      title: "The 7 Biggest Mistakes Beginners Make (And How to Fix Them)",
      excerpt:
        "Stop hanging pieces, blundering, and losing in 10 moves. Fix these now.",
      content: `
# 7 Deadly Beginner Mistakes

## 1. **Moving the Same Piece Twice**
Develop all pieces first.

## 2. **Ignoring Development**
Get king safe, connect rooks.

## 3. **Hanging Pieces**
Always ask: *"What is my opponent threatening?"*

## 4. **Not Controlling the Center**
Occupy d4, d5, e4, e5.

## 5. **Castling Too Late**
Castle by move 10.

## 6. **Pawn Grabbing**
Don't take the b2/g2 pawn early.

## 7. **No Plan**
After opening, ask: *"What is my plan?"*

---

Fix these 7. Jump 300 ELO in 30 days.
      `,
      author: "FM Kavya Reddy",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      date: "2025-10-20",
      readTime: "6 min",
      category: "beginner",
      tags: ["Mistakes", "Beginner", "Tips"],
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d5d0?w=800&h=500&fit=crop",
      views: 7100,
      likes: 580,
    },
  ];

  const categories = [
    { id: "all", name: "All Articles", count: blogPosts.length },
    { id: "checkmate", name: "Checkmate", count: blogPosts.filter(p => p.category === "checkmate").length },
    { id: "benefits", name: "Benefits", count: blogPosts.filter(p => p.category === "benefits").length },
    { id: "openings", name: "Openings", count: blogPosts.filter(p => p.category === "openings").length },
    { id: "training", name: "Training", count: blogPosts.filter(p => p.category === "training").length },
    { id: "beginner", name: "Beginner", count: blogPosts.filter(p => p.category === "beginner").length },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily }}>
      {/* Hero Section */}
      <section
  className="relative py-40 text-white overflow-hidden"
  style={{
    backgroundImage: 'url("/blogbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 text-lg" style={{ backgroundColor: accentColor, color: primaryColor }}>
            Chess Blog
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Learn. Improve. Win.
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
            Master strategies, science, and secrets from India’s top chess minds.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b" style={{ backgroundColor: primaryColor }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/50"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-56 h-12 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col border-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge style={{ backgroundColor: accentColor, color: primaryColor }}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2" style={{ color: primaryColor }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto text-sm">
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {post.likes}
                        </span>
                      </div>
                      <Button
                        onClick={() => setSelectedPost(post)}
                        size="sm"
                        style={{ backgroundColor: primaryColor, color: white }}
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {selectedPost.title}
                </h2>
                <Button size="icon" variant="ghost" onClick={() => setSelectedPost(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedPost.authorImage}
                      alt={selectedPost.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{selectedPost.author}</p>
                      <p className="text-xs">
                        {format(new Date(selectedPost.date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {selectedPost.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {selectedPost.likes}
                    </span>
                  </div>
                </div>

                <article className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedPost.content}
                  </ReactMarkdown>
                </article>

                <div className="flex flex-wrap gap-2 mt-8">
                  {selectedPost.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}