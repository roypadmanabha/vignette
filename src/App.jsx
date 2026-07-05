// Vignette Production Deployment Trigger
import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Send,
  Loader2,
  Sparkles,
  Camera,
  Video,
  Sliders,
  Compass,
  Eye,
  CheckCircle,
  AlertCircle,
  TriangleAlert,
  Play,
  Pause,
  Phone,
  Mail,
  MapPin,
  Plus,
  Minus,
  Maximize2,
  Mic,
  Megaphone,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';
import { supabase } from './supabase';

// Local SVG declarations for social icons (Boxicons v3.0.8)
const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248m0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008m4.807-8.875a1.078 1.078 0 1 0 0 2.156 1.078 1.078 0 1 0 0-2.156" />
    <path d="M20.533 6.111A4.6 4.6 0 0 0 17.9 3.479a6.6 6.6 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.6 6.6 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.6 6.6 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71s0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.6 6.6 0 0 0 2.186-.419 4.6 4.6 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.6 6.6 0 0 0-.421-2.217m-1.218 9.532a5 5 0 0 1-.311 1.688 3 3 0 0 1-1.712 1.711 5 5 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a5 5 0 0 1-1.669-.311 3 3 0 0 1-1.719-1.711 5.1 5.1 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654s0-2.686.053-3.655a5 5 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5 5 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a5 5 0 0 1 1.67.311 3 3 0 0 1 1.712 1.712 5.1 5.1 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s0 2.698-.043 3.654z" />
  </svg>
);

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2.06c-5.5 0-10 4.5-10 10 0 4.94 3.61 9.06 8.33 9.89l.06-.05h-.06v-7.06h-2.5v-2.78h2.5V9.84c0-2.5 1.61-3.89 3.89-3.89.72 0 1.5.11 2.22.22v2.56h-1.28c-1.22 0-1.5.61-1.5 1.39v1.94h2.67l-.44 2.78h-2.22v7.06h-.06l.06.05c4.72-.83 8.33-4.94 8.33-9.89 0-5.5-4.5-10-10-10" />
  </svg>
);

const Menu2 = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="6" y1="8" x2="18" y2="8" />
    <line x1="11" y1="16" x2="18" y2="16" />
  </svg>
);


const ThreadsIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67 1.3-.07 2.32-.57 3.03-1.47.54-.69.88-1.58 1.03-2.7.62.37 1.08.86 1.33 1.45.43 1 .46 2.65-.89 4-1.18 1.18-2.6 1.69-4.74 1.7-2.38-.02-4.17-.78-5.34-2.26-1.09-1.39-1.66-3.4-1.68-5.97.02-2.57.59-4.58 1.68-5.97 1.17-1.49 2.97-2.25 5.34-2.26 2.39.02 4.22.78 5.43 2.28.59.73 1.04 1.65 1.34 2.73l1.68-.45c-.36-1.32-.92-2.46-1.69-3.4-1.56-1.91-3.83-2.89-6.76-2.91h-.01c-2.92.02-5.17 1-6.68 2.92C3.71 6.64 3.01 9.02 2.99 12c.02 3 .72 5.37 2.06 7.08C6.56 21 8.81 21.98 11.73 22h.01c2.6-.02 4.43-.7 5.94-2.21 1.98-1.97 1.92-4.45 1.26-5.97-.47-1.09-1.36-1.97-2.58-2.56Zm-4.49 4.22c-1.09.06-2.22-.43-2.27-1.47-.04-.78.55-1.64 2.34-1.74.2-.01.41-.02.6-.02.65 0 1.26.06 1.81.18-.21 2.57-1.41 2.99-2.48 3.05" />
  </svg>
);


// ==========================================
// 0. MOCK DATA FALLBACKS
// ==========================================

const MOCK_GALLERY = [];

const MOCK_VIDEOS = [
  {
    id: 9,
    type: 'video',
    title: 'Wings Over Clouds',
    category: 'Avgeek',
    media_url: 'avgeek.mp4',
    thumbnail_url: 'avgeek.mp4#t=11'
  },
  {
    id: 10,
    type: 'video',
    title: 'The Homecoming',
    category: 'Festival',
    media_url: 'durgapuja.mp4',
    thumbnail_url: 'durgapuja.mp4#t=1'
  },
  {
    id: 11,
    type: 'video',
    title: 'The Delulu',
    category: 'Lifestyle',
    media_url: 'lifestyle.mp4',
    thumbnail_url: 'lifestyle.mp4#t=1'
  },
  {
    id: 115,
    type: 'video',
    title: 'Random Moments',
    category: 'Random',
    media_url: 'random.mp4',
    thumbnail_url: 'random.mp4#t=1'
  }
];

const MOCK_EDITS = [
  {
    id: 12,
    type: 'edit',
    title: 'Cinematic Teal & Orange',
    description: 'Raw Flat Log Profile color-graded to a warm, high-contrast golden hour style, drawing focus to the mountain range.',
    before_url: 'nature.jpg',
    after_url: 'nature.jpg'
  },
  {
    id: 13,
    type: 'edit',
    title: 'Moody Window Overcast',
    description: 'Sky brightness recovery, wing highlights adjustment, and modern cool-shadow toning applied to a flat cabin view.',
    before_url: 'flight.jpg',
    after_url: 'flight.jpg'
  }
];

const FAQS_DATA = [
  { question: "Why Vignette?", answer: "Vignette is a creative studio that transforms ordinary moments into cinematic visual stories. We focus on bespoke pacing and premium color grading." },
  { question: "Who can 'contact' Vignette?", answer: "Anyone seeking professional video editing, photography, or content creation, from brands to individual creators." },
  { question: "How Vignette works?", answer: "We collaborate closely with you to understand your vision, then apply our specialized production and post-production techniques to bring it to life." },
  { question: "What are the services provided?", answer: "Our services include professional video editing, podcast enhancement, promotional content creation, and tailored photoshoots." },
  { question: "How are the services accomplished?", answer: "Through meticulous pre-production planning, high-quality execution, and industry-standard post-production editing and grading." },
  { question: "Who can 'connect' with Vignette?", answer: "Brands, creators, and individuals looking to elevate their visual presence across all digital platforms." }
];

const CLIENT_REVIEWS = [
  {
    name: 'Astrofied',
    image: 'client-astrofied.png',
    url: 'https://astrofied.netlify.app',
    review: 'Working with Vignette has been one of the best decisions for Astrofied. From developing our website to managing our social media presence, every detail has been handled with remarkable creativity, professionalism, and precision. Their understanding of aesthetics, branding, and user experience helped us create a modern and trustworthy identity that truly represents our vision. Every design, post, and website element feels thoughtfully crafted rather than generic. They are highly responsive, committed to quality, and always open to feedback while delivering beyond expectations. We genuinely appreciate their dedication and would confidently recommend Vignette to anyone looking for premium digital branding and creative solutions.',
  },
  {
    name: 'Hinest Interiors',
    image: 'client-hinest.jpg',
    url: 'https://hinestinteriors.netlify.app',
    review: 'Vignette has completely transformed the way our brand is presented online. They designed a clean, elegant website and continue to manage our social media with exceptional attention to detail and consistency. Every post reflects our brand identity beautifully, helping us build credibility and attract more engagement from potential clients. Their creative approach, aesthetic sense, and professionalism are evident in every project they deliver. What impressed us most was their ability to understand our requirements and convert them into visually appealing, high-quality content. Vignette is reliable, innovative, and passionate about their work, making them an excellent creative partner for any business.',
  },
  {
    name: 'Beauty of Agartala',
    image: 'client-boa.jpg',
    url: 'https://www.instagram.com/beauty_of_agartala/',
    review: 'Vignette has been behind the journey of Beauty of Agartala right from the very beginning, and their contribution has been invaluable. From building our social media presence from day one to consistently creating engaging and visually stunning content, they have always maintained exceptional quality and originality. Their creativity, eye for detail, and understanding of audience engagement have helped our page grow while maintaining a unique identity. Every post is thoughtfully designed and professionally executed, making our content stand out naturally. We truly appreciate their dedication, timely delivery, and passion for visual storytelling, and we highly recommend Vignette for creative digital content and social media management.',
  }
];

// ==========================================
// 1. HELPERS & CHILD COMPONENTS
// ==========================================

const CustomDropdown = ({ id, value, onChange, options, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-all font-body flex justify-between items-center cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-lightOrange/50 dark:hover:border-brand-darkGold/50 hover:shadow-lg'} ${isOpen ? 'ring-2 ring-brand-lightOrange/30 dark:ring-brand-darkGold/30 border-brand-lightOrange dark:border-brand-darkGold' : ''}`}
      >
        <span className={value ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}>
          {value ? options.find(opt => opt.value === value)?.label || value : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <div
        className={`absolute z-50 w-full mt-2 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-brand-lightOrange/10 dark:shadow-brand-darkGold/10 max-h-60 overflow-y-auto transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className={`px-4 py-3 cursor-pointer flex items-center justify-between font-body text-sm transition-colors ${value === option.value ? 'bg-[#f5f5dd] dark:bg-brand-darkGold/10 text-[#D10000] dark:text-[#FFD700] font-bold' : `text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${option.isBold ? 'font-bold' : ''}`}`}
          >
            {option.label}
            {value === option.value && <CheckCircle className="w-4 h-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const formatVignette = (text) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(Vignette)/g);
  return parts.map((part, i) =>
    part === 'Vignette' ? <span key={i} className="brand-text-gradient font-brand">Vignette</span> : part
  );
};

const TestimonialCard = ({ review, idx, isCarousel = false }) => (
  <div
    className={`reveal reveal-scale relative rounded-3xl bg-[#f5f5dd] dark:bg-[#17202A] border-[#e31c25] dark:border-[#FFD700] p-5 sm:p-8 flex flex-col gap-4 sm:gap-6 shadow-xl group h-full ${!isCarousel ? 'hover:shadow-2xl hover:-translate-y-2 transition-premium' : ''}`}
    style={{ transitionDelay: isCarousel ? '0ms' : `${idx * 150}ms`, borderWidth: '0.5px', borderStyle: 'solid' }}
  >
    <div className="flex items-center gap-4 sm:gap-5">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-brand-lightOrange/30 dark:border-brand-darkGold/30 shrink-0">
        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
            {review.name}
          </h3>
          <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-[#e31c25] dark:text-[#FFD700] hover:scale-110 hover:-translate-y-0.5 transition-all duration-300" onClick={(e) => e.stopPropagation()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div className="flex text-[#e31c25] dark:text-[#FFD700] text-[11px] sm:text-sm mt-0.5 sm:mt-1">
          ★★★★★
        </div>
      </div>
    </div>
    <div className="font-body text-[13px] sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed sm:leading-loose text-justify mt-1 relative z-10 flex-grow">
      {formatVignette(review.review)}
    </div>
  </div>
);

const TestimonialCarousel = ({ reviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setActiveIndex((prev) => Math.min(reviews.length - 1, prev + 1));

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  return (
    <>
      <div className="hidden xl:grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <TestimonialCard key={idx} review={review} idx={idx} />
        ))}
      </div>

      <div
        className="xl:hidden relative w-full h-[560px] sm:h-[540px] flex items-center justify-center overflow-visible mt-4 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {reviews.map((review, idx) => {
          let position = 'hidden';
          if (idx === activeIndex) position = 'active';
          else if (idx === activeIndex - 1) position = 'prev';
          else if (idx === activeIndex + 1) position = 'next';
          else if (idx < activeIndex - 1) position = 'prev-hidden';
          else if (idx > activeIndex + 1) position = 'next-hidden';

          let classes = 'absolute transition-all duration-500 ease-in-out w-[85%] sm:w-[70%] cursor-pointer ';

          if (position === 'active') {
            classes += ' z-20 scale-100 opacity-100 translate-x-0';
          } else if (position === 'prev') {
            classes += ' z-10 scale-90 opacity-60 -translate-x-12 sm:-translate-x-32 blur-[1px] hover:opacity-100';
          } else if (position === 'next') {
            classes += ' z-10 scale-90 opacity-60 translate-x-12 sm:translate-x-32 blur-[1px] hover:opacity-100';
          } else if (position === 'prev-hidden') {
            classes += ' z-0 scale-75 opacity-0 -translate-x-24 sm:-translate-x-48 blur-[2px] pointer-events-none';
          } else if (position === 'next-hidden') {
            classes += ' z-0 scale-75 opacity-0 translate-x-24 sm:translate-x-48 blur-[2px] pointer-events-none';
          }

          return (
            <div key={idx} className={classes} onClick={() => setActiveIndex(idx)}>
              <TestimonialCard review={review} idx={idx} isCarousel />
            </div>
          );
        })}
      </div>

      <div className="xl:hidden flex justify-center items-center gap-6 mt-6 sm:mt-8 relative z-30">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full border border-black/5 dark:border-white/10 shadow-lg transition-all duration-300 ${activeIndex === 0 ? 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:-translate-y-1 hover:scale-110'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-3">
          {reviews.map((_, idx) => (
            <div key={idx} onClick={() => changeSlide(idx)} className={`cursor-pointer rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-[#e31c25] dark:bg-[#FFD700] w-6 h-2' : 'bg-zinc-300 dark:bg-zinc-700 w-2 h-2 hover:bg-zinc-400 dark:hover:bg-zinc-500'}`} />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={activeIndex === reviews.length - 1}
          className={`p-2 rounded-full border border-black/5 dark:border-white/10 shadow-lg transition-all duration-300 ${activeIndex === reviews.length - 1 ? 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:-translate-y-1 hover:scale-110'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </>
  );
};
// ==========================================

// Custom CountUp Component triggered on Scroll viewport entry
const CountUp = ({ end, suffix = "", duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const endVal = parseFloat(end);
          if (isNaN(endVal)) {
            setCount(end);
            return;
          }

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * endVal);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endVal);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

// Canvas Live Starfield Component
const Starfield = ({ isDark }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize stars
    const numStars = Math.floor((width * height) / 9000);
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Comet tracking
    let comet = null;

    const spawnComet = () => {
      if (prefersReducedMotionRef.current) return;
      const startX = Math.random() * (width * 0.6);
      comet = {
        x: startX,
        y: -10,
        targetX: startX + Math.random() * 200 + 150,
        targetY: Math.random() * (height * 0.4) + 150,
        dx: Math.random() * 3 + 2,
        dy: Math.random() * 3 + 2,
        length: Math.random() * 60 + 40,
        opacity: 0,
        state: 'fadeIn', // fadeIn, fadeOut
      };
    };

    // Schedule comets at randomized intervals
    let cometTimer = setInterval(() => {
      if (!comet && isDark) spawnComet();
    }, Math.random() * 8000 + 4000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isDark) return;

      // Draw Stars
      for (const star of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle update
        if (!prefersReducedMotionRef.current) {
          star.alpha += star.twinkleSpeed * star.twinkleDir;
          if (star.alpha >= 0.95 || star.alpha <= 0.15) {
            star.twinkleDir *= -1;
          }
        }
      }

      // Draw Comet
      if (comet && !prefersReducedMotionRef.current) {
        ctx.save();
        const grad = ctx.createLinearGradient(
          comet.x - comet.length,
          comet.y - comet.length,
          comet.x,
          comet.y
        );
        grad.addColorStop(0, 'rgba(255, 215, 0, 0)');
        grad.addColorStop(1, `rgba(255, 241, 168, ${comet.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(comet.x - comet.length, comet.y - comet.length);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();
        ctx.restore();

        // Update comet positioning
        comet.x += comet.dx;
        comet.y += comet.dy;

        if (comet.state === 'fadeIn') {
          comet.opacity += 0.04;
          if (comet.opacity >= 0.8) {
            comet.state = 'fadeOut';
          }
        } else {
          comet.opacity -= 0.02;
        }

        // Clean up when done
        if (comet.opacity <= 0 || comet.x > width || comet.y > height) {
          comet = null;
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(cometTimer);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'
        }`}
    />
  );
};

// Draggable Before/After Image Comparison Slider
const BeforeAfterSlider = ({ before, after, description, title }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative overflow-hidden aspect-[4/3] rounded-2xl shadow-xl select-none border border-black/10 dark:border-white/10 group bg-zinc-200 dark:bg-zinc-800"
      >
        {/* Before Image (underneath) */}
        <img
          src={before}
          alt="Before Edit"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={before === after ? { filter: 'saturate(0.4)' } : {}}
          draggable="false"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-heading font-extrabold px-2.5 py-1 rounded-md z-10 pointer-events-none uppercase tracking-wider">
          Before
        </div>

        {/* After Image (clipped overlay) */}
        <img
          src={after}
          alt="After Edit"
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-brand-lightRed dark:bg-brand-darkGold text-white dark:text-black text-xs font-heading font-extrabold px-2.5 py-1 rounded-md z-10 pointer-events-none uppercase tracking-wider">
          After
        </div>

        {/* Divider Handle */}
        <div
          className="absolute inset-y-0 w-[2px] bg-white z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: 'none' }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-zinc-900 border-2 border-brand-lightRed dark:border-brand-darkGold rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform hover:scale-110 pointer-events-auto active:scale-95"
          >
            <svg className="w-5 h-5 text-brand-lightRed dark:text-brand-darkGold select-none pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
            </svg>
          </div>
        </div>
      </div>

      {/* Captions */}
      <div className="px-1">
        <h4 className="font-heading font-extrabold text-lg text-zinc-950 dark:text-white transition-colors">{title}</h4>
        <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed transition-colors text-justify">{description}</p>
      </div>
    </div>
  );
};

// Protected Custom Video Player Modal
const CustomVideoPlayer = ({ src, poster, isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      setAspectRatio(16 / 9);
      setIsBuffering(true);
      videoRef.current.play()
        .then(() => { setIsPlaying(true); })
        .catch(() => { });
    }
    if (!isOpen) {
      setIsBuffering(false);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen, src]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    onClose();
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleWaiting = () => setIsBuffering(true);
  const handleCanPlay = () => setIsBuffering(false);
  const handlePlaying = () => setIsBuffering(false);

  const handleEnded = () => {
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    if (width && height) {
      setAspectRatio(width / height);
    }
  };

  const handleScrub = (e) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const muted = !isMuted;
    videoRef.current.muted = muted;
    setIsMuted(muted);
    resetControlsTimeout();
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
      setIsMuted(vol === 0);
    }
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-4 py-3 transition-premium duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
        }`}
      onClick={handleClose}
    >
      {/* Video Container — fluid portrait/landscape sizing, never overflows screen */}
      <div
        className={`relative bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center flex-shrink-0 transition-premium duration-500 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        style={{
          aspectRatio: `${aspectRatio}`,
          maxHeight: 'calc(100svh - 100px)',
          maxWidth: '92vw',
          width: aspectRatio > 1
            ? 'min(896px, 92vw)'
            : `min(92vw, calc((100svh - 100px) * ${aspectRatio}))`,
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimeout}
      >
        {/* Close Button — sits inside the video frame, top right corner */}
        <button
          className={`absolute top-4 right-4 z-50 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white transition-opacity duration-300 backdrop-blur-md border border-white/20 shadow-lg ${showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose}
          aria-label="Close video"
        >
          <X className="w-4 h-4" />
        </button>
        <video
          ref={videoRef}
          src={src || undefined}
          poster={poster || undefined}
          className="custom-video-player-el w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen"
          draggable="false"
        />

        {/* Buffering / Loading Spinner — responsive size */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-[3px] border-white/20 border-t-white animate-spin" />
              <div className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/10 backdrop-blur-sm" />
            </div>
          </div>
        )}

        {/* Custom Controls Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 sm:gap-3 transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Progress Seek Scrubber */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleScrub}
            className="video-seek-slider w-full cursor-pointer accent-white"
          />

          <div className="flex items-center mt-1 text-white">
            <div className="flex items-center gap-4">
              {/* Play / Pause Toggle button */}
              <button
                onClick={togglePlay}
                className="p-1 hover:text-brand-lightOrange dark:hover:text-brand-darkGold transition-colors focus:outline-none"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>

              {/* Timing info */}
              <span className="font-body text-xs text-zinc-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  // --- States ---
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Scrollytelling
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Gallery items and filters
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [galleryItems, setGalleryItems] = useState(MOCK_GALLERY);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null); // index of filtered list

  // Videos / Reels
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [videoPlayCounts, setVideoPlayCounts] = useState({});
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [videoModalPoster, setVideoModalPoster] = useState(null);

  // Draggable before/after edits
  const [edits, setEdits] = useState(MOCK_EDITS);

  // Form states
  const [formState, setFormState] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    purpose: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);

  // Hire Modal Open State
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  // FAQ Open State
  const [openFaq, setOpenFaq] = useState(null);

  // Legal Modal State — 'terms' | 'privacy' | null
  const [legalModal, setLegalModal] = useState(null);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isHireModalOpen || legalModal || videoModalUrl !== null || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isHireModalOpen, legalModal, videoModalUrl, lightboxIndex]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsHireModalOpen(false);
        setLegalModal(null);
      }
    };
    if (isHireModalOpen || legalModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHireModalOpen, legalModal]);

  // Hero section background image url state (static only, no video)
  const heroBgUrl = 'virat.png';

  // Scroll state for sticky header glassmorphism behavior
  const [isScrolled, setIsScrolled] = useState(false);

  // Hero Showcase Video states
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const heroVideoRef = useRef(null);
  const heroBgVideoRef = useRef(null); // kept for potential future use

  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (isHeroPlaying) {
        heroVideoRef.current.pause();
        setIsHeroPlaying(false);
      } else {
        heroVideoRef.current.play().catch(() => { });
        setIsHeroPlaying(true);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form sanitization helpers
  const handleNameChange = (field, value) => {
    // Only letters allowed
    let cleaned = value.replace(/[^a-zA-Z]/g, '');
    // Capitalize first character by default
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
    setFormState(prev => ({ ...prev, [field]: cleaned }));
  };

  const handleMobileChange = (value) => {
    // Only numbers allowed
    let cleaned = value.replace(/[^0-9]/g, '');
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }
    setFormState(prev => ({ ...prev, mobile: cleaned }));
  };



  // --- Theme Initializer & Gesture Zoom Prevention ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('vignette-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkState = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(initialDarkState);
    if (initialDarkState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Disable pinch-to-zoom for iOS Safari and mobile devices
    const preventPinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e) => {
      e.preventDefault();
    };

    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('gesturestart', preventGestureZoom, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGestureZoom);
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vignette-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vignette-theme', 'light');
    }
  };

  // --- Content Protection & Custom Toast ---
  const showToast = (message) => {
    setToast({ show: true, message });
    if (window.toastTimeout) {
      clearTimeout(window.toastTimeout);
    }
    window.toastTimeout = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast("Right-click is disabled");
    };

    const handleCopy = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.getAttribute('contenteditable') === 'true'
      );
      if (!isInput) {
        e.preventDefault();
        showToast("Copying content is disabled");
      }
    };

    const handleCut = (e) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.getAttribute('contenteditable') === 'true'
      );
      if (!isInput) {
        e.preventDefault();
        showToast("Cutting content is disabled");
      }
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
        showToast("Dragging media is disabled");
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // --- Intersection Observer for Scroll Reveals ---
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [galleryItems, videos, edits]);

  // --- Scrollytelling Progress & Active Section Stepper ---
  useEffect(() => {
    const sections = ['home', 'gallery', 'services', 'videos', 'editing', 'vision', 'hire'];

    const handleScroll = () => {
      // 1. Calculate general scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Track which section is active
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Supabase Data Fetching ---
  useEffect(() => {
    async function fetchData() {
      if (!supabase) {
        // Safe mock fallback
        setGalleryLoading(false);
        return;
      }
      try {
        setGalleryLoading(true);
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          // Parse loaded items into categories
          const loadedImages = data.filter(item => item.type === 'image');
          const loadedVideos = data.filter(item => item.type === 'video').map(video => {
            let updated = { ...video };
            if (video.category === 'Avgeek') {
              updated = {
                ...updated,
                media_url: 'avgeek.mp4',
                thumbnail_url: 'avgeek.mp4#t=11'
              };
            }
            if (video.title.includes('Alpine') || video.id === 10) {
              updated = {
                ...updated,
                title: 'The Durga Puja Times',
                category: 'Festival',
                media_url: 'durgapuja.mp4',
                thumbnail_url: 'durgapuja.mp4#t=1'
              };
            }
            if (video.title.includes('Camera') || video.id === 11) {
              updated = {
                ...updated,
                title: 'The Delulu',
                media_url: 'lifestyle.mp4',
                thumbnail_url: 'lifestyle.mp4#t=1'
              };
            }
            if (video.title.includes('Random') || video.id === 115) {
              updated = {
                ...updated,
                media_url: 'random.mp4',
                thumbnail_url: 'random.mp4#t=1'
              };
            }
            return updated;
          });

          if (!loadedVideos.some(v => v.category === 'Random' || v.id === 115)) {
            loadedVideos.push({
              id: 115,
              type: 'video',
              title: 'Random Moments',
              category: 'Random',
              media_url: 'random.mp4',
              thumbnail_url: 'random.mp4#t=1',
              display_order: 4
            });
          }
          const loadedEdits = data.filter(item => item.type === 'edit').map(edit => {
            if (edit.title.includes('Teal') || edit.title.includes('Orange') || edit.id === 12) {
              return {
                ...edit,
                before_url: 'nature.jpg',
                after_url: 'nature.jpg'
              };
            }
            if (edit.title.includes('Window') || edit.title.includes('Overcast') || edit.id === 13) {
              return {
                ...edit,
                before_url: 'flight.jpg',
                after_url: 'flight.jpg'
              };
            }
            return edit;
          });

          // if (loadedImages.length > 0) setGalleryItems(loadedImages);
          if (loadedVideos.length > 0) setVideos(loadedVideos);
          if (loadedEdits.length > 0) setEdits(loadedEdits);
        }
      } catch (err) {
        console.warn('Supabase fetch failed, utilizing pre-seeded assets:', err.message);
      } finally {
        setGalleryLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Global Video Play Counts (Supabase-persisted, Realtime live) ---
  useEffect(() => {
    if (!supabase) return;

    // 1. Fetch initial counts
    async function fetchCounts() {
      const { data, error } = await supabase
        .from('video_plays')
        .select('video_id');
      if (error) { console.warn('Could not fetch play counts:', error.message); return; }
      const counts = {};
      (data || []).forEach(row => {
        counts[row.video_id] = (counts[row.video_id] || 0) + 1;
      });
      setVideoPlayCounts(counts);
    }
    fetchCounts();

    // 2. Subscribe to realtime INSERT events so all browsers update live
    const channel = supabase
      .channel('video_plays_live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'video_plays' },
        (payload) => {
          const vid = payload.new?.video_id;
          if (vid) {
            setVideoPlayCounts(prev => ({ ...prev, [vid]: (prev[vid] || 0) + 1 }));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // --- Filtered Gallery logic ---
  const filteredGallery = galleryItems.filter(item =>
    galleryFilter === 'All' || item.category.toLowerCase() === galleryFilter.toLowerCase()
  );

  // Lightbox Navigation helpers
  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevLightbox(e);
      if (e.key === 'ArrowRight') handleNextLightbox(e);
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery]);

  // --- Contact Form Submission ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const { salutation, firstName, lastName, purpose, mobile, email, message } = formState;

    // Validate purpose dropdown selection
    if (!purpose) {
      setFormError('Please select a Purpose for your inquiry.');
      setFormSubmitting(false);
      return;
    }

    // Validate name inputs
    if (!firstName.trim() || !lastName.trim()) {
      setFormError('Please enter both First Name and Last Name.');
      setFormSubmitting(false);
      return;
    }
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setFormError('First Name and Last Name must be at least 2 characters long.');
      setFormSubmitting(false);
      return;
    }

    // Validate mobile number
    if (mobile.length !== 10) {
      setFormError('Please enter a valid 10-digit WhatsApp Mobile Number.');
      setFormSubmitting(false);
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid, legitimate Email ID.');
      setFormSubmitting(false);
      return;
    }

    // Validate message
    if (!message.trim()) {
      setFormError('Please enter a message.');
      setFormSubmitting(false);
      return;
    }
    if (message.trim().length < 30) {
      setFormError('Message must be at least 30 characters long.');
      setFormSubmitting(false);
      return;
    }
    if (message.length > 5000) {
      setFormError('Message cannot exceed 5000 characters.');
      setFormSubmitting(false);
      return;
    }

    const fullName = `${salutation} ${firstName} ${lastName}`.trim();
    const messageWithDetails = `Purpose: ${purpose}\nMobile: +91 ${mobile} (WhatsApp)\n\n${message}`;

    try {
      if (supabase) {
        const { error } = await supabase
          .from('hire_inquiries')
          .insert([{ name: fullName, email, message: messageWithDetails, status: 'pending' }]);
        if (error) throw error;
      } else {
        // Simulated local dev delay
        await new Promise(resolve => setTimeout(resolve, 1200));
      }
      setFormSuccess(true);
      setFormState({
        salutation: '',
        firstName: '',
        lastName: '',
        purpose: '',
        mobile: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setFormError(err.message || 'An error occurred during submission.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-full text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative ${isDark ? 'bg-dark-theme' : 'bg-light-theme'}`}>

      {/* 2.0. LIVE ANIMATED STARFIELD BACKDROP */}
      <Starfield isDark={isDark} />

      {/* 2.1. FLOATING AMBIENT BLOBS (LIGHT MODE ONLY) */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-brand-lightOrange/10 blur-[90px]" />
          <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-lightRed/10 blur-[110px]" />
          <div className="absolute bottom-[20%] left-[15%] w-[380px] h-[380px] rounded-full bg-brand-lightOrange/10 blur-[100px]" />
        </div>
      )}

      {/* 2.2. PROTECTED TOAST NOTIFICATION BANNER */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-[#990000] text-white font-brand font-extrabold px-5 py-2.5 shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform pointer-events-none select-none ${toast.show
          ? 'top-20 opacity-100 translate-y-0 scale-100'
          : 'top-20 opacity-0 -translate-y-4 scale-95'
          }`}
        style={{ borderRadius: '20px' }}
      >
        <TriangleAlert className="w-4.5 h-4.5 text-white flex-shrink-0 animate-bounce" />
        <span className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap uppercase tracking-wider">
          Not allowed! Content Protection enabled
        </span>
      </div>

      {/* 2.3. STICKY NAVBAR HEADER */}
      {/* Glowing Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lightRed via-brand-lightOrange to-brand-darkGold dark:from-brand-darkGold dark:via-brand-darkYellow dark:to-brand-lightOrange z-[9999] transition-all duration-75 origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      <header className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? (isDark ? 'bg-[#0A0908]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5' : 'bg-[#F8F5EA]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-black/5')
          : 'bg-transparent border-transparent shadow-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 lg:h-16 flex items-center justify-between">

          {/* Logo Brand Name (Two-tone wordmark + icon) */}
          <div
            className={`flex items-center gap-2 lg:gap-2.5 cursor-pointer z-50 select-none transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'
              }`}
            onClick={() => scrollToSection('home')}
          >
            <img
              src="logo-icon.png"
              alt="V"
              className="w-6 h-6 lg:w-7 lg:h-7 object-contain select-none pointer-events-none"
              draggable="false"
            />
            <span className="brand-text-gradient text-xl lg:text-2xl tracking-tight select-none">
              Vignette
            </span>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-brand font-bold text-sm">
            {[
              { label: 'At Glance', id: 'gallery' },
              { label: 'Services', id: 'services' },
              { label: 'Highlights', id: 'videos' },
              { label: 'Our Clients', id: 'testimonials' },
              { label: 'Explore', url: '/explore' },
              { label: 'About', id: 'vision' },
              { label: 'Contact', id: 'hire' }
            ].map(link => {
              const isExplore = link.label === 'Explore';
              const textClasses = isExplore
                ? "relative py-2 bg-gradient-to-r from-black to-[#FF0000] dark:from-[#FF0000] dark:to-[#FFA500] bg-clip-text text-transparent hover:opacity-80 transition-opacity group font-extrabold"
                : "relative py-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors group";

              if (link.url) {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    className={textClasses}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow group-hover:w-full transition-all duration-300" />
                  </a>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative py-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow group-hover:w-full transition-all duration-300" />
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle Pill Switch (Desktop) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="hidden lg:flex relative w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center px-1 transition-colors border border-black/10 dark:border-white/10"
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center shadow-md transition-all duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'
                  }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-brand-darkGold" fill="currentColor" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-brand-lightOrange" fill="currentColor" />
                )}
              </div>
            </button>

            {/* Theme Toggle Icon-only Button (Mobile - Small sun/moon icon) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="flex lg:hidden p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-brand-darkGold" fill="currentColor" />
              ) : (
                <Sun className="w-4 h-4 text-brand-lightOrange" fill="currentColor" />
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2.4. MOBILE SIDEBAR DRAWER MENU */}
      {/* Backdrop shadow overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-35 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-40 w-[65vw] sm:w-[45vw] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-l border-black/5 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Brand Logo & Name Header in Drawer */}
        <div className="absolute top-5 left-6 flex items-center gap-2">
          <img
            src="logo-icon.png"
            alt="V"
            className="w-5 h-5 object-contain select-none pointer-events-none"
            draggable="false"
          />
          <span className="brand-text-gradient font-heading font-black text-sm tracking-tight select-none">
            Vignette
          </span>
        </div>

        {/* Close Button Inside Drawer */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Inner links container */}
        <div className="flex flex-col h-full pt-20 px-4 justify-between pb-8">
          <nav className="flex flex-col gap-2">
            {[
              { label: 'At Glance', id: 'gallery', icon: Compass },
              { label: 'Services', id: 'services', icon: Sliders },
              { label: 'Highlights', id: 'videos', icon: Play },
              { label: 'Our Clients', id: 'testimonials', icon: Video },
              { label: 'Explore', url: '/explore', icon: Camera },
              { label: 'About', id: 'vision', icon: Sparkles },
              { label: 'Contact', id: 'hire', icon: Send }
            ].map((link) => {
              const Icon = link.icon;
              const isExplore = link.label === 'Explore';
              const textClasses = isExplore
                ? "bg-gradient-to-r from-black to-[#FF0000] dark:from-[#FF0000] dark:to-[#FFA500] bg-clip-text text-transparent font-extrabold"
                : "";
              const linkClasses = `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-brand font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group`;

              if (link.url) {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClasses}
                  >
                    <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-lightOrange dark:group-hover:text-brand-darkGold transition-colors" />
                    <span className={textClasses}>{link.label}</span>
                  </a>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection(link.id);
                  }}
                  className={linkClasses}
                >
                  <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-lightOrange dark:group-hover:text-brand-darkGold transition-colors" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social icons + copyright in drawer */}
          <div className="flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-4 px-4">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-brand-lightOrange dark:text-zinc-400 dark:hover:text-brand-darkGold hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-brand-lightOrange dark:text-zinc-400 dark:hover:text-brand-darkGold hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-body uppercase tracking-wider select-none">
              {formatVignette('Vignette © ' + new Date().getFullYear())}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN LAYOUT CONTAINER (Content above z-10)
          ========================================== */}
      <main className="relative z-10 w-full overflow-x-hidden">

        {/* 2.5. HERO SECTION */}
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1440px] mx-auto">
          <section
            id="home"
            className="hero-section min-h-[85vh] flex flex-col justify-center items-center relative select-none rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-sm border border-black/5 dark:border-white/5"
          >
          {/* Static Background Image */}
          <img
            src="hero-section-background-image.png"
            alt="Hero Background"
            className="hero-bg-image pointer-events-none select-none"
            draggable="false"
          />

          <div className="hero-overlay" />

          {/* Vertical Dot Navigation Capsule */}
          <div className="dot-nav-container hidden lg:flex">
            <div className="dot-nav-item active" />
            <div className="dot-nav-item" />
            <div className="dot-nav-item" />
            <div className="dot-nav-item" />
            <div className="dot-nav-item" />
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full max-w-7xl px-8 py-16 lg:px-16 lg:py-20 flex-grow">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Eyebrow */}
              <div className="reveal flex items-center justify-center lg:justify-start gap-2 mb-6 font-brand font-extrabold text-[10px] sm:text-xs tracking-[0.25em] text-zinc-950 dark:text-white uppercase select-none w-full">
                <Sparkles className="w-4 h-4 text-[#d10000] animate-pulse flex-shrink-0" />
                <span className="whitespace-nowrap">DIGITAL CREATOR • STORYTELLER • AVGEEK</span>
              </div>

              {/* H1 Heading */}
              <h1 className="reveal font-heading font-black text-hero-fluid tracking-tight leading-[1.1] select-none text-[#d10000] mb-6">
                Frames that tell a story.
              </h1>

              {/* Short Bio Paragraph */}
              <p className="reveal font-body text-base sm:text-lg text-[#333333] dark:text-zinc-300 max-w-[520px] leading-relaxed transition-colors mb-10">
                Welcome to <strong className="font-bold select-none text-black dark:text-white">Vignette</strong>,
                the creative sandbox of Padmanabha Roy. Merging dynamic reels, custom video color edits,
                and high-altitude aviation storytelling into cinematic digital capsules.
              </p>

              {/* CTA Buttons */}
              <div className="reveal flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-brand font-extrabold text-sm text-white pill-gradient-black-red shadow-[0_8px_20px_rgba(209,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(209,0,0,0.25)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  View our works
                </button>
                <button
                  onClick={() => setIsHireModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-brand font-extrabold text-sm text-white bg-gradient-to-r from-[#d10000] to-[#111111] dark:from-[#ffec4e] dark:to-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Hire Us
                </button>
              </div>
            </div>

            {/* Right Column: Visual Portrait with Floating Badge Stats */}
            <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0 w-full h-full min-h-[300px] sm:min-h-[380px]">

              {/* Visual Graphic Backdrop (Concentric circles behind logo) */}
              <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-red-500/5 dark:bg-red-500/10 blur-xl" />
              <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full border border-red-500/10 dark:border-red-400/15" />
              <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-red-500/20 dark:border-red-400/25" />

              {/* Main Logo Frame */}
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden border-[1.5px] border-white/80 dark:border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.8)] dark:shadow-[0_0_40px_rgba(209,0,0,0.2)] z-10 bg-transparent flex items-center justify-center backdrop-blur-sm">
                <img
                  src="logo-icon.png"
                  alt="Vignette Brand Logo"
                  className="w-full h-full object-contain p-6 select-none pointer-events-none drop-shadow-[0_0_15px_rgba(209,0,0,0.4)]"
                  draggable="false"
                />
              </div>

              {/* Floating Badge 1: 5+ Years Experience */}
              <div className="absolute left-[0%] sm:left-[-5%] top-[10%] px-4 py-2.5 bg-[#FAF8F2] dark:bg-[#1A1A1A] rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center gap-2.5 z-20 hover:scale-105 transition-transform duration-300 opacity-40 lg:opacity-100">
                <span className="font-brand font-black text-base text-[#d10000] dark:text-[#ffec4e]">
                  5+
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-brand font-extrabold text-[10px] text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Years of</span>
                  <span className="font-body text-[8px] text-zinc-500 uppercase tracking-widest">Experience</span>
                </div>
              </div>

              {/* Floating Badge 2: 200+ Posts */}
              <div className="absolute right-[0%] sm:right-[5%] top-[45%] px-4 py-2.5 bg-[#FAF8F2] dark:bg-[#1A1A1A] rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-300 opacity-40 lg:opacity-100">
                <span className="font-brand font-black text-base text-[#d10000] dark:text-[#ffec4e]">
                  200+
                </span>
                <span className="font-brand font-extrabold text-[10px] text-zinc-800 dark:text-zinc-200 uppercase tracking-wider leading-none">Posts</span>
              </div>

              {/* Floating Badge 3: 2.1K Followers */}
              <div className="absolute left-[10%] bottom-[15%] px-4 py-2.5 bg-[#FAF8F2] dark:bg-[#1A1A1A] rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-300 opacity-40 lg:opacity-100">
                <span className="font-brand font-black text-base text-[#d10000] dark:text-[#ffec4e]">
                  2.1K
                </span>
                <span className="font-brand font-extrabold text-[10px] text-zinc-800 dark:text-zinc-200 uppercase tracking-wider leading-none">Followers</span>
              </div>

              {/* Curved Ribbon Tag Line at Bottom */}
              <div className="absolute bottom-[-15px] sm:bottom-[-20px] left-1/2 -translate-x-1/2 px-6 py-2.5 pill-gradient-black-red rounded-full shadow-xl text-[10px] font-brand font-extrabold uppercase tracking-[0.2em] text-white whitespace-nowrap z-20 select-none border border-white/10">
                Telling Stories One Frame At A Time
              </div>
            </div>
          </div>
            </div>
          </section>
        </div>

        {/* 2.6. GALLERY SECTION */}
        <section id="gallery" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal reveal-blur font-heading font-black text-4xl sm:text-5xl text-gradient">
                At a Glance
              </h2>
              <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed transition-colors">
                Freezing time across terminals, peaks, and street corners. Discover visual stories filtered by category.
              </p>
            </div>

            {/* Filter Pill List Row */}
            <div className="reveal reveal-left flex flex-wrap justify-center gap-2.5 mb-12 select-none">
              {['All', 'Travel', 'Lifestyle', 'Avgeek', 'Storytelling'].map((category) => {
                const isActive = galleryFilter.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setGalleryFilter(category)}
                    className={`px-6 py-2.5 rounded-full font-brand font-extrabold text-xs transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow text-white dark:text-black shadow-md'
                      : 'border border-zinc-300 dark:border-zinc-700 hover:border-zinc-800 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/20'
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Gallery Cards Masonry/Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
              {filteredGallery.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(idx)}
                  className="reveal reveal-scale group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-premium select-none"
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                >
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-premium"
                    draggable="false"
                    loading="lazy"
                  />
                  {/* Frosted Metadata Strip bottom */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 dark:bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-premium z-10">
                    <div className="flex flex-col">
                      <span className="font-brand font-extrabold text-[8px] sm:text-xs uppercase tracking-wider text-brand-darkGold select-none">
                        {item.category}
                      </span>
                      <h3 className="font-heading font-black text-[10px] sm:text-sm mt-0.5 sm:mt-1 leading-tight select-none">
                        {item.title}
                      </h3>
                    </div>
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 group-hover:text-white flex-shrink-0 ml-1.5" />
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Lightbox Modal */}
            {lightboxIndex !== null && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
                onClick={handleCloseLightbox}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  onClick={handleCloseLightbox}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Prev Button */}
                <button
                  className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                  onClick={handlePrevLightbox}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Active Image container */}
                <div
                  className="max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredGallery[lightboxIndex].media_url}
                    alt={filteredGallery[lightboxIndex].title}
                    className="max-w-full max-h-[72vh] rounded-xl object-contain shadow-2xl border border-white/10 select-none pointer-events-none"
                    draggable="false"
                  />
                  {/* Floating caption below image */}
                  <div className="mt-5 text-center">
                    <span className="font-brand font-extrabold text-xs uppercase tracking-widest text-[#FFD700]">
                      {filteredGallery[lightboxIndex].category}
                    </span>
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white mt-1.5 leading-tight">
                      {filteredGallery[lightboxIndex].title}
                    </h3>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                  onClick={handleNextLightbox}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 2.6.5. SERVICES SECTION */}
        <section id="services" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="reveal font-brand font-black text-xs uppercase tracking-widest text-brand-lightOrange dark:text-brand-darkGold mb-3 block">
                What We Do
              </span>
              <h2 className="reveal reveal-blur font-heading font-black text-4xl sm:text-5xl text-gradient mb-6">
                Services
              </h2>
              <p className="reveal font-body text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors text-base sm:text-lg text-justify">
                Our services include video editing, seamless podcast enhancement, engaging promotional content, and tailored shoots - crafted to elevate brand visibility, storytelling, and impact across marketing and social platforms.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
              {[
                {
                  title: 'Video Editing',
                  description: 'High-end cinematic pacing, precise cuts, color grading, sound design, and motion graphics to turn raw footage into compelling stories.',
                  icon: Video,
                  imageUrl: 'service-video-editing.jpg',
                  badgeStyle: 'bg-yellow-100 text-yellow-950 border-yellow-200/50',
                  accentBar: 'bg-gradient-to-r from-brand-darkGold to-brand-darkYellow',
                  badgeText: 'EXCLUSIVE',
                },
                {
                  title: 'Podcast Editing',
                  description: 'Crystal-clear audio cleanup, seamless pacing, noise reduction, and integration of intro/outro music for a professional listening experience.',
                  icon: Mic,
                  imageUrl: 'service-podcast-editing.jpg',
                  badgeStyle: 'bg-sky-100 text-sky-950 border-sky-200/50',
                  accentBar: 'bg-gradient-to-r from-sky-400 to-sky-200',
                  badgeText: 'FEATURED',
                },
                {
                  title: 'Promotions',
                  description: 'Conversion-focused video campaigns, social ads, and hook-heavy promotional teasers tailored to maximize engagement and engagement metrics.',
                  icon: Megaphone,
                  imageUrl: 'service-promotions.jpg',
                  badgeStyle: 'bg-purple-100 text-purple-950 border-purple-200/50',
                  accentBar: 'bg-gradient-to-r from-purple-500 to-purple-300',
                  badgeText: 'SIGNATURE',
                },
                {
                  title: 'Promo Shoot',
                  description: "Tailored on-location or studio shoots using top-tier gear, lighting setups, and creative direction to capture your brand's unique identity.",
                  icon: Camera,
                  imageUrl: 'service-promo-shoot.jpg',
                  badgeStyle: 'bg-orange-100 text-orange-950 border-orange-200/50',
                  accentBar: 'bg-gradient-to-r from-brand-lightOrange to-orange-400',
                  badgeText: 'LOCATION BASED',
                }
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="reveal reveal-scale group relative overflow-hidden rounded-3xl aspect-[4/5] bg-zinc-950 border border-black/5 dark:border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-premium cursor-pointer"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Background Image */}
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-premium duration-700 pointer-events-none select-none"
                      draggable="false"
                      loading="lazy"
                    />

                    {/* Dark/Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/50 transition-premium duration-500" />

                    {/* Floating Service Badge (Top-Left) */}
                    <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                      <span className={`px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full font-brand font-extrabold text-[7px] min-[375px]:text-[8px] sm:text-[10px] uppercase tracking-widest border shadow-md ${service.badgeStyle}`}>
                        {service.badgeText}
                      </span>
                    </div>

                    {/* Center Icon Overlay (Revealed on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/35 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-premium duration-500">
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* Content Section at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 flex flex-col justify-end text-white z-10">
                      <h3 className="font-heading font-black text-[11px] min-[375px]:text-xs sm:text-xl text-white mb-1 sm:mb-1.5 select-none">
                        {service.title}
                      </h3>
                      <p className="font-body text-[8px] min-[375px]:text-[9px] sm:text-xs text-zinc-300 leading-normal sm:leading-relaxed select-none text-justify">
                        {service.description}
                      </p>
                    </div>

                    {/* Decorative Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[4px] ${service.accentBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2.7. VIDEOS / REELS SECTION */}
        <section id="videos" className="bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal reveal-blur font-heading font-black text-4xl sm:text-5xl text-gradient">
                Our Highlights
              </h2>
              <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed transition-colors">
                Short, snappy snippets with premium edit pacing. Click to open full cinematic player.
              </p>
            </div>

            {/* Cards Grid — 2 cols on mobile & iPad mini/air, 4 cols on large screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
              {videos.map((vid, idx) => (
                <div
                  key={vid.id}
                  onClick={async () => {
                    setVideoModalUrl(vid.media_url);
                    setVideoModalPoster(vid.thumbnail_url);
                    // Record play globally in Supabase (no auth needed)
                    if (supabase) {
                      // Optimistic local update for instant feedback
                      setVideoPlayCounts(prev => ({ ...prev, [vid.id]: (prev[vid.id] || 0) + 1 }));
                      const { error } = await supabase
                        .from('video_plays')
                        .insert({ video_id: vid.id });
                      if (error) console.warn('Play count insert failed:', error.message);
                    } else {
                      // Offline fallback: just update local
                      setVideoPlayCounts(prev => ({ ...prev, [vid.id]: (prev[vid.id] || 0) + 1 }));
                    }
                    // Trigger synchronous video load & play
                    const videoEl = document.querySelector('.custom-video-player-el');
                    if (videoEl) {
                      videoEl.src = vid.media_url;
                      videoEl.load();
                      videoEl.play().catch(err => {
                        console.warn("Synchronous play call failed/blocked:", err);
                      });
                    }
                  }}
                  className="reveal reveal-scale relative flex flex-col bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-lg group hover:shadow-2xl hover:-translate-y-2 transition-premium select-none"
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                >
                  {/* Visual Preview Container */}
                  <div className="relative aspect-[9/16] w-full bg-zinc-950 overflow-hidden">

                    {/* Poster Image or Video Frame */}
                    {vid.thumbnail_url && (vid.thumbnail_url.endsWith('.mp4') || vid.thumbnail_url.includes('.mp4')) ? (
                      <video
                        src={vid.thumbnail_url}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 select-none pointer-events-none"
                        muted
                        playsInline
                        preload="metadata"
                        draggable="false"
                      />
                    ) : (
                      <img
                        src={vid.thumbnail_url}
                        alt={vid.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 select-none"
                        draggable="false"
                      />
                    )}

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-premium">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl scale-95 group-hover:scale-110 transition-premium">
                        <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Category label top-left */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/60 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-heading font-extrabold tracking-wider text-brand-darkGold uppercase z-10 pointer-events-none">
                      {vid.category}
                    </div>
                  </div>

                  {/* Footer Metadata */}
                  <div className="p-3 sm:p-5 flex flex-col justify-between border-t border-black/5 dark:border-white/5">
                    <h3 className="font-heading font-black text-xs sm:text-lg text-zinc-950 dark:text-white transition-colors leading-tight">
                      {vid.title}
                    </h3>
                    <span className="font-body text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1 sm:gap-1.5">
                      <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0" />
                      <span>{videoPlayCounts[vid.id] ? `${videoPlayCounts[vid.id]} ${videoPlayCounts[vid.id] === 1 ? 'person' : 'people'} played` : '0 people played'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fullscreen Video Player */}
            <CustomVideoPlayer
              src={videoModalUrl}
              poster={videoModalPoster}
              isOpen={!!videoModalUrl}
              onClose={() => {
                setVideoModalUrl(null);
                setVideoModalPoster(null);
              }}
            />
          </div>
        </section>

        {/* 2.8. EDITING SHOWCASE SECTION */}
        <section id="editing" className="bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal reveal-blur font-heading font-black text-4xl sm:text-5xl text-gradient">
                The Art of Editing
              </h2>
              <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed transition-colors">
                Highlighting the impact of custom Lightroom presets and Premiere color correction. Grab and drag the split dividers.
              </p>
            </div>

            {/* Slider Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {edits.map((edit, idx) => (
                <div
                  key={edit.id}
                  className="reveal reveal-scale"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <BeforeAfterSlider
                    before={edit.before_url}
                    after={edit.after_url}
                    title={edit.title}
                    description={edit.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.8.5. TESTIMONIALS SECTION */}
        <section id="testimonials" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-lightOrange/10 dark:bg-brand-darkGold/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#e31c25]/10 dark:bg-[#e31c25]/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
                What Our Clients Say
              </h2>
            </div>

            <TestimonialCarousel reviews={CLIENT_REVIEWS} />
          </div>
        </section>

        {/* 2.9. VISION & MANIFESTO SECTION */}
        <section id="vision" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Narrative Column */}
              <div className="reveal reveal-left lg:col-span-7 flex flex-col">
                <span className="font-heading font-extrabold text-xs tracking-widest text-[#D10000] dark:text-[#FFD700] uppercase mb-3">
                  {formatVignette('About Vignette')}
                </span>
                <h2 className="font-heading font-black text-4xl sm:text-5xl leading-tight">
                  <span className="text-zinc-950 dark:text-white">The Journey of </span>
                  <span className="brand-text-gradient">Vignette</span>
                </h2>

                <div className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mt-6 space-y-4 leading-relaxed transition-colors text-justify">
                  <p>
                    I have been passionately pursuing my journey in capturing, editing and showcasing visual content for many years, gaining substantial professional experience by working extensively on promotions, personal projects, and original content that has reached millions.
                  </p>
                  <p>
                    Feel confident to trust me, and together, let&apos;s create something exceptional.
                  </p>
                </div>

                {/* Brand accent rule */}
                <div className="mt-8 w-16 h-1 rounded-full bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow" />
              </div>

              {/* Right Photo Column */}
              <div className="reveal reveal-right lg:col-span-5 flex flex-col justify-center items-center">
                <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">

                  {/* Glow aura */}
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-lightRed/20 via-brand-lightOrange/10 to-transparent dark:from-brand-darkGold/20 dark:via-brand-darkYellow/10 dark:to-transparent blur-3xl pointer-events-none" />

                  {/* Corner frame accents */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 rounded-tl-2xl border-t-[3px] border-l-[3px] border-brand-lightRed dark:border-brand-darkGold pointer-events-none z-10" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-16 sm:h-16 rounded-br-2xl border-b-[3px] border-r-[3px] border-brand-lightOrange dark:border-brand-darkYellow pointer-events-none z-10" />

                  {/* Photo card */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
                    <img
                      src="avatar-proy.jpg"
                      alt="Padmanabha Roy – Founder of Vignette"
                      className="w-full h-auto object-cover object-top select-none pointer-events-none"
                      draggable="false"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                    {/* Name badge */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                      <div className="flex flex-col">
                        <h3 className="font-heading font-bold text-base text-white leading-tight">Padmanabha Roy</h3>
                        <p className="font-body text-[10px] text-zinc-300 uppercase tracking-widest mt-0.5">
                          Founder &middot; <span className="font-bold bg-gradient-to-r from-[#FF0000] to-[#FFA500] bg-clip-text text-transparent">Vignette</span>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>



        {/* 2.10. HIRE ME SECTION */}
        <section id="hire" className="bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Context Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="reveal font-heading font-extrabold text-xs tracking-widest text-[#D10000] dark:text-[#FFD700] uppercase mb-3">
                  Let's Collaborate
                </span>
                <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient leading-tight">
                  Hire for your work
                </h2>
                <p className="reveal font-body text-zinc-600 dark:text-zinc-300 mt-6 leading-relaxed transition-colors text-justify">
                  Ready to take your brand narrative to the sky? Get in touch for content consulting, sponsored edits, photography campaigns, or direct avgeek story writeups.
                </p>

                <div className="reveal mt-8 space-y-4 font-body text-sm">
                  <p className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                    <BadgeCheck className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold">100% Professional</span>
                  </p>
                  <p className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold">100% Authentic</span>
                  </p>
                </div>
              </div>

              {/* Inquiries Form Column */}
              <div className="reveal lg:col-span-7">
                <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-2xl">

                  {formSuccess ? (
                    /* Success State checkmark container animation */
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <CheckCircle className="w-16 h-16 text-emerald-500" />
                      <h3 className="font-brand font-black text-2xl text-zinc-950 dark:text-white mt-6 transition-colors">
                        Message Sent!
                      </h3>
                      <p className="font-body text-zinc-600 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed transition-colors">
                        Thank you for reaching out. I'll review your details and get back to you soon!
                      </p>
                      <button
                        onClick={() => setFormSuccess(false)}
                        className="mt-8 px-6 py-2.5 rounded-full font-brand font-extrabold text-xs border border-zinc-400 hover:border-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-300 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    /* Form Elements */
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                      {formError && (
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-body">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      {/* Purpose Dropdown */}
                      <div className="flex flex-col gap-2">
                        <label className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                          Purpose
                        </label>
                        <CustomDropdown
                          id="form-purpose"
                          value={formState.purpose}
                          onChange={(val) => setFormState(prev => ({ ...prev, purpose: val }))}
                          disabled={formSubmitting}
                          placeholder="Select"
                          options={[
                            { value: 'Hire for Video Editing (PAID)', label: 'Hire for Video Editing (PAID)', isBold: true },
                            { value: 'Hire for Podcast/YT Video Editing (PAID)', label: 'Hire for Podcast/YT Video Editing (PAID)', isBold: true },
                            { value: 'Hire for Photoshoot (PAID)', label: 'Hire for Photoshoot (PAID)', isBold: true },
                            { value: 'Ask for Collaboration', label: 'Ask for Collaboration' },
                            { value: 'Let\'s Work Together', label: 'Let\'s Work Together' },
                            { value: 'Avgeek - Let\'s Connect', label: 'Avgeek - Let\'s Connect' },
                            { value: 'Planespotting', label: 'Planespotting' },
                            { value: 'Want to join the \'Vignette\' team', label: 'Want to join the \'Vignette\' team' }
                          ]}
                        />
                      </div>

                      {/* Salutation + Names Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* Salutation Dropdown */}
                        <div className="flex flex-col gap-2 sm:col-span-3">
                          <label className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            Title
                          </label>
                          <CustomDropdown
                            id="form-salutation"
                            value={formState.salutation}
                            onChange={(val) => setFormState(prev => ({ ...prev, salutation: val }))}
                            disabled={formSubmitting}
                            placeholder="Select"
                            options={[
                              { value: 'Mr', label: 'Mr' },
                              { value: 'Mrs', label: 'Mrs' },
                              { value: 'Ms', label: 'Ms' }
                            ]}
                          />
                        </div>

                        {/* First Name Input */}
                        <div className="flex flex-col gap-2 sm:col-span-4">
                          <label htmlFor="form-first-name" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="form-first-name"
                            value={formState.firstName}
                            onChange={(e) => handleNameChange('firstName', e.target.value)}
                            disabled={formSubmitting}
                            required
                            minLength={2}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-[#fffff0] dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                          />
                        </div>

                        {/* Last Name Input */}
                        <div className="flex flex-col gap-2 sm:col-span-5">
                          <label htmlFor="form-last-name" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="form-last-name"
                            value={formState.lastName}
                            onChange={(e) => handleNameChange('lastName', e.target.value)}
                            disabled={formSubmitting}
                            required
                            minLength={2}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-[#fffff0] dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                          />
                        </div>
                      </div>

                      {/* Mobile + Email Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Mobile Number */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="form-mobile" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            Mobile Number (WhatsApp Number)
                          </label>
                          <div className="flex rounded-xl border border-zinc-300 dark:border-zinc-700 bg-[#fffff0] dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-brand-lightOrange/30 dark:focus-within:ring-brand-darkGold/30 focus-within:border-brand-lightOrange dark:focus-within:border-brand-darkGold overflow-hidden transition-all">
                            <span className="flex items-center px-3.5 bg-white dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-700 font-body font-bold text-sm text-zinc-500 dark:text-zinc-400 select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              id="form-mobile"
                              value={formState.mobile}
                              onChange={(e) => handleMobileChange(e.target.value)}
                              placeholder="10-digit number"
                              disabled={formSubmitting}
                              required
                              className="w-full px-4 py-3 bg-transparent text-zinc-900 dark:text-white focus:outline-none font-body"
                            />
                          </div>
                        </div>

                        {/* Email ID */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="form-email" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            Email ID
                          </label>
                          <input
                            type="email"
                            id="form-email"
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="abcdef@xyz.com"
                            disabled={formSubmitting}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-[#fffff0] dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                          />
                        </div>
                      </div>

                      {/* Message textarea with counter */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="form-message" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                            Message
                          </label>
                          <span className={`text-[10px] font-mono transition-colors ${formState.message.length > 4900 ? 'text-red-500 font-bold animate-pulse' : 'text-zinc-400 dark:text-zinc-500'
                            }`}>
                            {formState.message.length} / 5000 chars
                          </span>
                        </div>
                        <textarea
                          id="form-message"
                          rows="5"
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value.slice(0, 5000) }))}
                          placeholder="Write details about your project or collaboration opportunity..."
                          disabled={formSubmitting}
                          required
                          minLength={30}
                          maxLength={5000}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-[#fffff0] dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="mt-2 w-full py-4 rounded-xl font-brand font-extrabold text-sm text-white bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow dark:text-black flex items-center justify-center gap-2 hover:-translate-y-[2px] active:scale-98 shadow-md transition-all duration-300 disabled:opacity-50"
                      >
                        {formSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Inquiries...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit</span>
                          </>
                        )}
                      </button>

                      {/* Reset Button */}
                      <div className="flex justify-center mt-3">
                        <button
                          type="button"
                          onClick={() => setFormState({
                            salutation: '',
                            firstName: '',
                            lastName: '',
                            purpose: '',
                            mobile: '',
                            email: '',
                            message: ''
                          })}
                          className="font-brand font-extrabold text-[10px] tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors uppercase cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2.9.5. HERO VIDEO SHOWCASE */}
        <section className="py-10 sm:py-14 flex flex-col items-center justify-center select-none">
          <div className="max-w-4xl w-full px-4">
            <div
              className="relative rounded-[20px] overflow-hidden shadow-xl bg-black cursor-pointer border border-brand-lightOrange dark:border-[#FFD700]"
              onClick={toggleHeroPlay}
            >
              <video
                ref={heroVideoRef}
                src="featured.mp4"
                playsInline
                preload="metadata"
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-auto rounded-[20px] object-contain opacity-100 block"
                onEnded={() => setIsHeroPlaying(false)}
                onPlay={() => setIsHeroPlaying(true)}
                onPause={() => setIsHeroPlaying(false)}
              />

              {/* Custom Play Button Overlay (shown when paused) */}
              {!isHeroPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-black/85 flex items-center justify-center shadow-lg transform active:scale-95 transition-transform duration-200">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-brand-lightOrange fill-brand-lightOrange dark:text-[#e31c25] dark:fill-[#e31c25] translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* 2.10.5. FAQS SECTION */}
      <section id="faqs" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-center mb-12 text-[#D10000] dark:text-brand-darkGold transition-colors duration-300">
            <span className="sm:hidden">FAQs</span>
            <span className="hidden sm:inline">Frequently Asked Questions</span>
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border-2 transition-colors duration-300 cursor-pointer ${isOpen
                    ? 'border-[#e31c25] bg-[#fffff0] dark:bg-transparent dark:border-brand-darkGold'
                    : 'border-brand-lightRed/20 dark:border-zinc-800 bg-white dark:bg-transparent hover:border-[#e31c25]/50 dark:hover:border-brand-darkGold/50'
                    }`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between p-5 sm:p-6">
                    <h3 className={`font-body font-bold text-[15px] sm:text-lg transition-colors duration-300 ${isOpen ? 'text-[#e31c25] dark:text-brand-darkGold' : 'text-zinc-900 dark:text-zinc-200'
                      }`}>
                      {formatVignette(faq.question)}
                    </h3>
                    <div className={`flex-shrink-0 transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#e31c25] dark:text-brand-darkGold" />
                      ) : (
                        <Plus className="w-5 h-5 text-zinc-900 dark:text-zinc-200" />
                      )}
                    </div>
                  </div>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-zinc-800 dark:text-zinc-400 font-body text-[13px] sm:text-base leading-relaxed text-justify">
                        {formatVignette(faq.answer)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2.11. FOOTER SECTION */}
      <footer className="border-t-[0.5px] border-black/50 py-16 select-none bg-[#f5f5dd] dark:bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

          {/* Main Footer columns row — 1-col mobile, 2-col iPad, 4-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">

            {/* Logo Name & Brand Info */}
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <img
                  src="logo-icon.png"
                  alt="Vignette"
                  className="w-10 h-10 object-contain select-none pointer-events-none"
                  draggable="false"
                />
                <span className="brand-text-gradient font-heading font-black text-2xl tracking-tight select-none">
                  {formatVignette('Vignette')}
                </span>
              </div>
              <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">
                Cinematic visual storytelling. Capturing terminals, summits, and streetscapes with bespoke pacing and premium color grading.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-4 lg:border-l border-zinc-200 dark:border-zinc-800 lg:pl-8">
              <h4 className="font-heading font-black text-sm text-[#D10000] dark:text-[#FFD700] uppercase tracking-wider">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 font-body text-xs text-zinc-600 dark:text-zinc-400">
                <li>
                  <button
                    onClick={() => setLegalModal('terms')}
                    className="hover:text-[#D10000] dark:hover:text-[#FFD700] transition-colors cursor-pointer text-left"
                  >
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal('privacy')}
                    className="hover:text-[#D10000] dark:hover:text-[#FFD700] transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-4 lg:border-l border-zinc-200 dark:border-zinc-800 lg:pl-8">
              <h4 className="font-heading font-black text-sm text-[#D10000] dark:text-[#FFD700] uppercase tracking-wider">
                Support
              </h4>
              <ul className="flex flex-col gap-3.5 font-body text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D10000] dark:text-[#FFD700] flex-shrink-0" />
                  <a href="tel:+919342385565" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    +91 9342385565
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D10000] dark:text-[#FFD700] flex-shrink-0" />
                  <a href="mailto:vignetteworks.official@gmail.com" className="hover:text-zinc-950 dark:hover:text-white transition-colors break-all">
                    vignetteworks.official@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-4 lg:border-l border-zinc-200 dark:border-zinc-800 lg:pl-8">
              <h4 className="font-heading font-black text-sm text-[#D10000] dark:text-[#FFD700] uppercase tracking-wider">
                Address
              </h4>
              <p className="flex items-start gap-3 font-body text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#D10000] dark:text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span>Ramnagar, Agartala, West Tripura District, Tripura - 799002</span>
              </p>
            </div>

          </div>

          {/* Social Media & Divider Line */}
          <div className="flex flex-col items-center gap-6 mt-4">

            {/* Social Icons Row */}
            <div className="flex gap-6 items-center justify-center">

              {/* Hidden SVG gradient definition */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="social-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDark ? '#D10000' : '#000000'} />
                    <stop offset="100%" stopColor={isDark ? '#e67e22' : '#D10000'} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/proy____"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 active:scale-95 transition-all duration-300"
                aria-label="Visit proy____ on Instagram"
              >
                <Instagram className="w-7 h-7" fill="url(#social-icon-gradient)" />
              </a>

              {/* Threads */}
              <a
                href="https://www.threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 active:scale-95 transition-all duration-300"
                aria-label="Visit Threads"
              >
                <ThreadsIcon className="w-7 h-7" fill="url(#social-icon-gradient)" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 active:scale-95 transition-all duration-300"
                aria-label="Visit Facebook page"
              >
                <Facebook className="w-7 h-7" fill="url(#social-icon-gradient)" />
              </a>

            </div>

            {/* Bottom mini divider */}
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800 my-2" />

            {/* Copyright Metadata */}
            <div className="font-body text-xs text-zinc-500 dark:text-zinc-400 flex flex-col md:flex-row items-center gap-2">
              <p>{formatVignette('© ' + new Date().getFullYear() + ' Vignette. All rights reserved | Made by Vignette')}</p>
            </div>

          </div>

        </div>
      </footer>

      {/* 2.12. HIRE ME RESPONSIVE MODAL FORM */}
      {isHireModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setIsHireModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#f5f5dd] dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 p-5 sm:p-8 md:p-10 flex flex-col my-8 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsHireModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="mb-6">
              <span className="font-heading font-extrabold text-xs tracking-widest text-[#D10000] dark:text-[#FFD700] uppercase block mb-1">
                Let's Collaborate
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-gradient">
                Let's Create Together
              </h3>
              <p className="font-body text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed text-justify">
                Ready to take your brand narrative to the sky? Get in touch for content consulting, sponsored edits, photography campaigns, or direct avgeek story writeups.
              </p>
            </div>

            {/* Form body */}
            {formSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="font-brand font-black text-2xl text-zinc-950 dark:text-white mt-6 transition-colors">
                  Message Sent!
                </h3>
                <p className="font-body text-zinc-600 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed transition-colors">
                  Thank you for reaching out. I'll review your details and get back to you soon!
                </p>
                <button
                  onClick={() => {
                    setFormSuccess(false);
                    setIsHireModalOpen(false);
                  }}
                  className="mt-8 px-6 py-2.5 rounded-full font-brand font-extrabold text-xs border border-zinc-400 hover:border-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-300 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 overflow-y-auto max-h-[60vh] pr-1">
                {formError && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-body">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Purpose Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="modal-purpose" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                    Purpose
                  </label>
                  <div className="relative">
                    <select
                      id="modal-purpose"
                      value={formState.purpose}
                      disabled={formSubmitting}
                      onChange={(e) => setFormState(prev => ({ ...prev, purpose: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select</option>
                      <option value="Hire for Video Editing (PAID)">Hire for Video Editing (PAID)</option>
                      <option value="Hire for Podcast/YT Video Editing (PAID)">Hire for Podcast/YT Video Editing (PAID)</option>
                      <option value="Hire for Photoshoot (PAID)">Hire for Photoshoot (PAID)</option>
                      <option value="Ask for Collaboration">Ask for Collaboration</option>
                      <option value="Let's Work Together">Let's Work Together</option>
                      <option value="Avgeek - Let's Connect">Avgeek - Let's Connect</option>
                      <option value="Planespotting">Planespotting</option>
                      <option value="Want to join the 'Vignette' team">Want to join the 'Vignette' Team</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <Compass className="w-4 h-4 transform rotate-180" />
                    </div>
                  </div>
                </div>

                {/* Title + Names Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Title Dropdown */}
                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <label className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Title
                    </label>
                    <CustomDropdown
                      id="modal-salutation"
                      value={formState.salutation}
                      onChange={(val) => setFormState(prev => ({ ...prev, salutation: val }))}
                      disabled={formSubmitting}
                      placeholder="Select"
                      options={[
                        { value: 'Mr', label: 'Mr' },
                        { value: 'Mrs', label: 'Mrs' },
                        { value: 'Ms', label: 'Ms' }
                      ]}
                    />
                  </div>

                  {/* First Name Input */}
                  <div className="flex flex-col gap-2 sm:col-span-4">
                    <label htmlFor="modal-first-name" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="modal-first-name"
                      value={formState.firstName}
                      onChange={(e) => handleNameChange('firstName', e.target.value)}
                      disabled={formSubmitting}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="flex flex-col gap-2 sm:col-span-5">
                    <label htmlFor="modal-last-name" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="modal-last-name"
                      value={formState.lastName}
                      onChange={(e) => handleNameChange('lastName', e.target.value)}
                      disabled={formSubmitting}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                    />
                  </div>
                </div>

                {/* Mobile + Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile Number */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="modal-mobile" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Mobile Number (WhatsApp Number)
                    </label>
                    <div className="flex rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus-within:ring-2 focus-within:ring-brand-lightOrange/30 dark:focus-within:ring-brand-darkGold/30 focus-within:border-brand-lightOrange dark:focus-within:border-brand-darkGold overflow-hidden transition-all">
                      <span className="flex items-center px-3.5 bg-white dark:bg-zinc-800 border-r border-zinc-300 dark:border-zinc-700 font-body font-bold text-sm text-zinc-500 dark:text-zinc-400 select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="modal-mobile"
                        value={formState.mobile}
                        onChange={(e) => handleMobileChange(e.target.value)}
                        placeholder="10-digit number"
                        disabled={formSubmitting}
                        required
                        className="w-full px-4 py-3 bg-transparent text-zinc-900 dark:text-white focus:outline-none font-body"
                      />
                    </div>
                  </div>

                  {/* Email ID */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="modal-email" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Email ID
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="abcdef@xyz.com"
                      disabled={formSubmitting}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
                    />
                  </div>
                </div>

                {/* Message textarea with counter */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="modal-message" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Message
                    </label>
                    <span className={`text-[10px] font-mono transition-colors ${formState.message.length > 4900 ? 'text-red-500 font-bold animate-pulse' : 'text-zinc-400 dark:text-zinc-500'
                      }`}>
                      {formState.message.length} / 5000 chars
                    </span>
                  </div>
                  <textarea
                    id="modal-message"
                    rows="4"
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value.slice(0, 5000) }))}
                    placeholder="Write details about your project or collaboration opportunity..."
                    disabled={formSubmitting}
                    required
                    minLength={30}
                    maxLength={5000}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="mt-2 w-full py-4 rounded-xl font-brand font-extrabold text-sm text-white bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow dark:text-black flex items-center justify-center gap-2 hover:-translate-y-[2px] active:scale-98 shadow-md transition-all duration-300 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiries...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>

                {/* Reset Button */}
                <div className="flex justify-center mt-3">
                  <button
                    type="button"
                    onClick={() => setFormState({
                      salutation: '',
                      firstName: '',
                      lastName: '',
                      purpose: '',
                      mobile: '',
                      email: '',
                      message: ''
                    })}
                    className="font-brand font-extrabold text-[10px] tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors uppercase cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Floating Stepper Navigation (Desktop only) */}
      {videoModalUrl === null && lightboxIndex === null && (
        <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-40 bg-white/20 dark:bg-black/25 backdrop-blur-md p-3.5 rounded-full border border-black/5 dark:border-white/10 shadow-lg select-none">
          {[
            { id: 'home', label: 'Home' },
            { id: 'gallery', label: 'At Glance' },
            { id: 'services', label: 'Services' },
            { id: 'videos', label: 'Highlights' },
            { id: 'testimonials', label: 'Our Clients' },
            { id: 'vision', label: 'About' },
            { id: 'hire', label: 'Contact' }
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center cursor-pointer"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Active/Inactive Dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSection === sec.id
                  ? 'bg-brand-lightOrange dark:bg-brand-darkGold scale-125 ring-4 ring-brand-lightOrange/20 dark:ring-brand-darkGold/20'
                  : 'bg-zinc-400 hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-400 hover:scale-110'
                  }`}
              />
              {/* Tooltip Label */}
              <span className="absolute right-8 px-2.5 py-1 rounded bg-zinc-950 dark:bg-zinc-900 text-white dark:text-zinc-100 text-[10px] font-brand font-extrabold uppercase tracking-wider opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-md border border-white/5">
                {sec.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Floating Back to Top Button with SVG radial scroll progress */}
      {videoModalUrl === null && lightboxIndex === null && (
        <button
          onClick={() => scrollToSection('home')}
          className={`fixed bottom-6 right-6 lg:right-8 z-40 w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-brand-lightOrange dark:hover:text-brand-darkGold hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${scrollProgress > 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          aria-label="Scroll back to top"
        >
          <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none select-none">
            <circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-zinc-200 dark:stroke-zinc-800 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="19"
              className="stroke-[#d10000] dark:stroke-[#ffec4e] fill-none"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 19}
              strokeDashoffset={2 * Math.PI * 19 * (1 - scrollProgress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}

      {/* LEGAL MODAL — Terms & Conditions / Privacy Policy */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#f5f5dd] dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col my-8 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#f5f5dd] dark:bg-zinc-950 px-6 sm:px-8 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <span className="font-heading font-extrabold text-xs tracking-widest text-[#D10000] dark:text-[#FFD700] uppercase block mb-1">
                  Legal
                </span>
                <h2 className="font-heading font-black text-lg sm:text-xl text-zinc-900 dark:text-white">
                  {legalModal === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}
                </h2>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 font-body text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-5">
              {legalModal === 'terms' ? (
                <>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Last updated: July 2026</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">1. Acceptance of Terms</h3>
                  <p className="text-justify">{formatVignette('By accessing and using the Vignette website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.')}</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">2. Services Offered</h3>
                  <p className="text-justify">{formatVignette('Vignette provides professional video editing, promotional content creation, podcast editing, and visual storytelling services. All deliverables, timelines, and project scopes are agreed upon individually with each client prior to commencement of work.')}</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">3. Intellectual Property</h3>
                  <p className="text-justify">{formatVignette('All original content, designs, video edits, graphics, and creative assets produced by Vignette remain the intellectual property of Vignette until full payment has been received. Upon completion and full payment, ownership of the final deliverables transfers to the client unless otherwise stated in writing.')}</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">4. Client Responsibilities</h3>
                  <p className="text-justify">The client agrees to provide all necessary materials, brand assets, and feedback in a timely manner. Delays in client feedback or asset delivery may result in adjusted project timelines and additional fees.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">5. Payment Terms</h3>
                  <p className="text-justify">Payments are to be made according to the schedule outlined in your specific proposal or invoice. A non-refundable deposit is often required to commence work. Late payments may incur additional charges.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">6. Revisions Policy</h3>
                  <p className="text-justify">Each project includes a predefined number of revision rounds. Any additional revisions beyond this scope will be billed at our standard hourly or per-project rate.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">7. Limitation of Liability</h3>
                  <p className="text-justify">{formatVignette('Vignette shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific project in question.')}</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">8. Termination</h3>
                  <p className="text-justify">Either party may terminate a project agreement with written notice. In the event of termination, the client shall be responsible for payment of all work completed up to the date of termination.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">9. Contact</h3>
                  <p className="text-justify">For questions regarding these Terms and Conditions, please contact us at <a href="mailto:vignetteworks.official@gmail.com" className="text-[#D10000] dark:text-[#FFD700] underline">vignetteworks.official@gmail.com</a>.</p>
                </>
              ) : (
                <>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Last updated: July 2026</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">1. Information We Collect</h3>
                  <p className="text-justify">When you use our website or contact us through our inquiry form, we may collect personal information including your name, email address, phone number, and any message content you provide. We also collect non-personal data such as browser type, device information, and usage analytics.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">2. How We Use Your Information</h3>
                  <p className="text-justify">Your personal information is used solely for responding to inquiries, delivering our services, communicating project updates, and improving user experience on our platform. We do not sell, rent, or trade your personal information to third parties.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">3. Data Storage &amp; Security</h3>
                  <p className="text-justify">We employ industry-standard security measures to protect your personal data. Information submitted through our forms is transmitted securely and stored using trusted third-party services (such as Supabase) with encryption at rest and in transit.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">4. Cookies &amp; Analytics</h3>
                  <p className="text-justify">Our website may use cookies and similar technologies to enhance your browsing experience and gather anonymous usage statistics. You may disable cookies in your browser settings, though some features of the site may not function as intended.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">5. Third-Party Services</h3>
                  <p className="text-justify">We may utilise third-party services for analytics, hosting, and form processing. These services have their own privacy policies and we encourage you to review them. We are not responsible for the privacy practices of third-party providers.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">6. Your Rights</h3>
                  <p className="text-justify">You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">7. Children&apos;s Privacy</h3>
                  <p className="text-justify">Our services are not directed at individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">8. Changes to This Policy</h3>
                  <p className="text-justify">We reserve the right to update this Privacy Policy at any time. Changes will be reflected on this page with an updated revision date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>

                  <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-white">9. Contact</h3>
                  <p className="text-justify">If you have any questions or concerns about this Privacy Policy, please reach out to us at <a href="mailto:vignetteworks.official@gmail.com" className="text-[#D10000] dark:text-[#FFD700] underline">vignetteworks.official@gmail.com</a>.</p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#f5f5dd] dark:bg-zinc-950 px-6 sm:px-8 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D10000] to-[#e67e22] dark:from-[#FFD700] dark:to-[#e67e22] text-white dark:text-black font-heading font-bold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
