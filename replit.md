# Chesspure Academy

## Overview

Chesspure Academy is a professional chess training platform built with Next.js 14, featuring a modern, responsive website for a chess academy. The application showcases courses, coaches, events, and provides information about chess training programs. It uses a chess-themed design system with deep green (#769656), beige (#eeeed2), and gold (#baca44) colors throughout the interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 14 with App Router**: Server-side rendering and client-side routing using the modern app directory structure
- **React Server Components (RSC)**: Enabled by default for improved performance
- **TypeScript**: Strict type checking throughout the application

### UI Component Library
- **shadcn/ui (New York variant)**: Pre-built, accessible UI components based on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Framer Motion**: Animation library for smooth transitions and interactions

### Styling Approach
- **CSS Variables**: Custom properties defined in `globals.css` for theming
- **Dark Mode Support**: Theme switching capability with next-themes
- **Chess Theme Colors**: Brand-specific color palette (primary: #5C1F1C, accent: #FFC727)
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop

### Page Structure
The application follows a multi-page architecture:
- **Homepage** (`/`): Hero section, courses preview, stats, testimonials, and CTA
- **About** (`/about`): Academy information and mission
- **Courses** (`/courses`): Course listings with filtering and calendar
- **Coaches** (`/coaches`): Team member profiles with 3D card effects
- **Events** (`/events`): Tournament and workshop listings
- **Gallery** (`/gallery`): Photo gallery with category filtering
- **Blogs** (`/blogs`): Article listings with search and categories
- **Contact** (`/contact`): Contact form and location information

### Component Architecture
- **Modular Components**: Reusable UI components in `/components` directory
- **UI Components**: Base components in `/components/ui` (buttons, cards, forms, etc.)
- **Feature Components**: Page-specific components (hero-section, courses-section, etc.)
- **Layout Components**: Header and Footer shared across pages
- **Client Components**: Components using interactivity marked with "use client"

### State Management
- **React Hooks**: useState, useEffect, useRef for local component state
- **Custom Hooks**: useIsMobile, useToast for reusable logic
- **Context API**: Used in form components and UI primitives

### Animation Strategy
- **Framer Motion**: For page transitions, card hover effects, and scroll animations
- **CSS Animations**: Custom keyframes for floating elements and fade-ins
- **3D Card Effects**: Mouse-tracking rotation effects on coach and blog cards
- **Intersection Observer**: Trigger animations when elements enter viewport

### Form Handling
- **React Hook Form**: Form state management with validation
- **Zod Resolvers**: Schema validation for form inputs (via @hookform/resolvers)
- **Controlled Components**: Input, textarea, select components with validation

### Routing and Navigation
- **File-based Routing**: Next.js app directory structure
- **Link Components**: Next.js Link for client-side navigation
- **Dynamic Navigation**: Dropdown menus and mobile hamburger menu
- **Scroll Behavior**: Smooth scrolling to sections

### Image Handling
- **Next.js Image**: Optimized image component for performance
- **Static Images**: Images served from public directory
- **Placeholder Images**: Temporary images for development

## External Dependencies

### Core Frameworks
- **Next.js**: ^14.x (React framework with SSR/SSG)
- **React**: Latest (UI library)
- **TypeScript**: Type safety and developer experience

### UI Component Libraries
- **@radix-ui/***: Headless UI primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- **shadcn/ui**: Component collection built on Radix UI
- **lucide-react**: Icon library

### Styling and Animations
- **tailwindcss**: ^10.4.20 (Utility-first CSS)
- **autoprefixer**: ^10.4.20 (CSS vendor prefixes)
- **framer-motion**: Latest (Animation library)
- **class-variance-authority**: ^0.7.1 (CVA for component variants)
- **clsx**: ^2.1.1 (Conditional className utility)
- **tailwind-merge**: Merge Tailwind classes intelligently

### Form Management
- **react-hook-form**: Form state management
- **@hookform/resolvers**: ^3.10.0 (Form validation resolvers)

### UI Utilities
- **cmdk**: 1.0.4 (Command palette component)
- **embla-carousel-react**: 8.5.1 (Carousel component)
- **date-fns**: Latest (Date formatting and manipulation)
- **react-countup**: Number animation for statistics
- **react-intersection-observer**: Viewport detection
- **react-markdown**: Markdown rendering for blog posts
- **remark-gfm**: GitHub Flavored Markdown support

### Analytics and Monitoring
- **@vercel/analytics**: Latest (Vercel Analytics integration)

### Font System
- **geist**: Latest (Geist Sans and Geist Mono fonts)

### Additional Dependencies
- **@emotion/is-prop-valid**: Latest (Emotion prop filtering)
- **vaul**: Drawer component library
- **sonner**: Toast notification library
- **input-otp**: OTP input component
- **react-resizable-panels**: Resizable panel layouts
- **react-day-picker**: Calendar/date picker component

### Development Configuration
- **Port**: Development server runs on port 5000
- **Host**: Accessible on all network interfaces (0.0.0.0)
- **Build Output**: Static and server-rendered pages

### Path Aliases
- `@/*`: Maps to project root
- `@/components`: UI components directory
- `@/lib`: Utility functions
- `@/hooks`: Custom React hooks