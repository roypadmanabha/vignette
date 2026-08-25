import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Search,
  Grid,
  Heart,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Phone,
  Mail,
  MapPin,
  Home,
  TriangleAlert
} from 'lucide-react';
import { supabase } from './supabase';

// ==========================================
// 1. MOCK DATASETS (VIGNETTE DESIGN STYLE)
// ==========================================

const MOCK_EXPLORE_HERO = [
  {
    id: 'hero-1',
    title: 'Wandering in Greenery',
    category: 'Travel',
    likes: 74,
    isNew: false,
    media_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hero-2',
    title: 'Shadows of Architecture',
    category: 'Storytelling',
    likes: 91,
    isNew: false,
    media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hero-3',
    title: 'Morning Bliss at Munnar Hills',
    category: 'Peaks',
    likes: 128,
    isNew: true,
    media_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hero-4',
    title: 'City Lights, Slow Nights',
    category: 'Lifestyle',
    likes: 96,
    isNew: false,
    media_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hero-5',
    title: 'Streets of Pondicherry',
    category: 'Travel',
    likes: 58,
    isNew: false,
    media_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  }
];

const MOCK_EXPLORE_GRID = [
  {
    id: 'grid-1',
    title: 'Golden Hours on Southern Rails',
    category: 'Travel',
    likes: 82,
    media_url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-2',
    title: 'Rain Drops & City Hops',
    category: 'Lifestyle',
    likes: 64,
    media_url: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-3',
    title: 'Wings Over Cloud Nine',
    category: 'Avgeek',
    likes: 173,
    media_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-4',
    title: 'Streets of Pondicherry',
    category: 'Travel',
    likes: 58,
    media_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-5',
    title: 'Shadows & Contrast Lines',
    category: 'Storytelling',
    likes: 91,
    media_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-6',
    title: 'City Peaks & Skyline Steaks',
    category: 'Peaks',
    likes: 114,
    media_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-7',
    title: 'Mist in the Hills of Munnar',
    category: 'Travel',
    likes: 139,
    media_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'grid-8',
    title: 'Cabin View over Blue Waters',
    category: 'Lifestyle',
    likes: 95,
    media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  }
];

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ThreadsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67" />
    <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67 1.3-.07 2.32-.57 3.03-1.47.54-.69.88-1.58 1.03-2.7.62.37 1.08.86 1.33 1.45.43 1 .46 2.65-.89 4-1.18 1.18-2.6 1.69-4.74 1.7-2.38-.02-4.17-.78-5.34-2.26-1.09-1.39-1.66-3.4-1.68-5.97.02-2.57.59-4.58 1.68-5.97 1.17-1.49 2.97-2.25 5.34-2.26 2.39.02 4.22.78 5.43 2.28.59.73 1.04 1.65 1.34 2.73l1.68-.45c-.36-1.32-.92-2.46-1.69-3.4-1.56-1.91-3.83-2.89-6.76-2.91h-.01c-2.92.02-5.17 1-6.68 2.92C3.71 6.64 3.01 9.02 2.99 12c.02 3 .72 5.37 2.06 7.08C6.56 21 8.81 21.98 11.73 22h.01c2.6-.02 4.43-.7 5.94-2.21 1.98-1.97 1.92-4.45 1.26-5.97-.47-1.09-1.36-1.97-2.58-2.56Zm-4.49 4.22c-1.09.06-2.22-.43-2.27-1.47-.04-.78.55-1.64 2.34-1.74.2-.01.41-.02.6-.02.65 0 1.26.06 1.81.18-.21 2.57-1.41 2.99-2.48 3.05" />
  </svg>
);

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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = Math.floor((width * height) / 9000);
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

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
        state: 'fadeIn',
      };
    };

    let cometTimer = setInterval(() => {
      if (!comet && isDark) spawnComet();
    }, Math.random() * 8000 + 4000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isDark) return;

      for (const star of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (!prefersReducedMotionRef.current) {
          star.alpha += star.twinkleSpeed * star.twinkleDir;
          if (star.alpha >= 0.95 || star.alpha <= 0.15) {
            star.twinkleDir *= -1;
          }
        }
      }

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
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

const formatVignette = (text) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(Vignette)/g);
  return parts.map((part, i) =>
    part === 'Vignette' ? <span key={i} className="brand-text-gradient font-brand">{part}</span> : part
  );
};

export default function ExplorePage({ isOpen, onClose }) {
  const isDark = true;
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Legal Modal states
  const [legalModal, setLegalModal] = useState(null);
  const [activeLegalTab, setActiveLegalTab] = useState('terms');

  // Gallery items states
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox index
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Content Protection Toast State
  const [toast, setToast] = useState({ show: false, message: '' });

  // Mobile Pagination State
  const [mobilePage, setMobilePage] = useState(1);

  // Reset pagination on filter changes
  useEffect(() => {
    setMobilePage(1);
  }, [activeTab, searchQuery, sortBy]);

  // Track if screen is Desktop (>= 1024px) to conditionally apply pagination
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress listener for progress bar
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Custom Toast show function
  const showToast = (message) => {
    setToast({ show: true, message });
    if (window.exploreToastTimeout) {
      clearTimeout(window.exploreToastTimeout);
    }
    window.exploreToastTimeout = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Content Protection Event Listeners
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

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Scroll to section simulation
  const handleLogoOrNavClick = (sectionId) => {
    onClose();
    if (sectionId && typeof window !== 'undefined') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  };

  // Google Fonts & Page configuration
  useEffect(() => {
    if (!isOpen) return;
    document.title = "Explore Page | Vignette";
    window.scrollTo(0, 0);
  }, [isOpen]);

  // Fetch items from database (explore_gallery or fallback to gallery_items + mocks)
  useEffect(() => {
    async function fetchExploreGallery() {
      setLoading(true);
      const mergedList = [...MOCK_EXPLORE_GRID];

      if (!supabase) {
        setItems(mergedList);
        setLoading(false);
        return;
      }

      try {
        // Try fetching explore_items or explore_gallery
        let { data, error } = await supabase
          .from('explore_gallery')
          .select('*');

        if (error) {
          // Try alternative table
          const fallbackQuery = await supabase.from('gallery_items').select('*');
          if (fallbackQuery.error) throw fallbackQuery.error;
          data = fallbackQuery.data;
        }

        if (data && data.length > 0) {
          // Merge database items at the front
          const dbItems = data.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category,
            likes: item.likes || Math.floor(Math.random() * 80) + 20,
            media_url: item.media_url
          }));
          setItems([...dbItems, ...mergedList]);
        } else {
          setItems(mergedList);
        }
      } catch (err) {
        console.warn('[ExplorePage] Supabase fetch failed, using fallback mocks:', err.message);
        setItems(mergedList);
      } finally {
        setLoading(false);
      }
    }

    fetchExploreGallery();
  }, []);

  // Filtering and sorting logic
  const getFilteredItems = useCallback(() => {
    let list = [...items];

    // Filter by Tab
    if (activeTab !== 'All') {
      list = list.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );
    }

    // Sort items
    if (sortBy === 'Most Liked') {
      list.sort((a, b) => b.likes - a.likes);
    } else {
      // Latest (by ID / index order)
      list.sort((a, b) => {
        const idA = String(a.id);
        const idB = String(b.id);
        if (idA.startsWith('grid-') && idB.startsWith('grid-')) {
          return idA.localeCompare(idB);
        }
        return String(b.id).localeCompare(String(a.id));
      });
    }

    return list;
  }, [items, activeTab, searchQuery, sortBy]);

  const filteredItems = getFilteredItems();

  // Pagination Calculations (for mobile & tablet views)
  const itemsPerPage = 10;
  const isPaginationActive = !isDesktop;
  const totalPages = isPaginationActive ? Math.ceil(filteredItems.length / itemsPerPage) : 1;
  const startIndex = isPaginationActive ? (mobilePage - 1) * itemsPerPage : 0;
  const pagedItems = isPaginationActive ? filteredItems.slice(startIndex, startIndex + itemsPerPage) : filteredItems;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (mobilePage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, mobilePage - 1);
      const end = Math.min(totalPages - 1, mobilePage + 1);

      let adjustedStart = start;
      let adjustedEnd = end;
      if (mobilePage <= 3) {
        adjustedEnd = 4;
      } else if (mobilePage >= totalPages - 2) {
        adjustedStart = totalPages - 3;
      }

      for (let i = adjustedStart; i <= adjustedEnd; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (mobilePage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const categories = ['All', 'Travel', 'Lifestyle', 'Avgeek', 'Storytelling'];

  return (
    <div className="dark min-h-screen w-full max-w-full text-zinc-100 relative bg-dark-theme font-brand">
      
      {/* 0. NOSCRIPT FALLBACK CONTENT PROTECTION */}
      <noscript>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0a0908',
          color: '#ffffff',
          zIndex: 9999999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#ff2400' }}>
            JavaScript is Required
          </h1>
          <p style={{ fontSize: '14px', color: '#a1a1aa', maxWidth: '360px', lineHeight: '1.6' }}>
            Vignette uses content protection features that require JavaScript. Please enable JavaScript in your browser settings to access the Explore Page.
          </p>
        </div>
      </noscript>

      {/* 0.1. PROTECTED TOAST NOTIFICATION BANNER */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-[10000] bg-[#990000] text-white font-brand font-extrabold px-5 py-2.5 shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform pointer-events-none select-none ${toast.show
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

      {/* 0.2. LIVE ANIMATED STARFIELD BACKDROP */}
      <Starfield isDark={isDark} />

      {/* 1. PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-lightRed via-brand-lightOrange to-brand-darkGold dark:from-brand-darkGold dark:via-brand-darkYellow dark:to-brand-lightOrange z-[9999] transition-all duration-75 origin-left" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* 2. RESPONSIVE HEADER WITH MOBILE/TABLET ADAPTATIONS */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-[#0A0908]/45 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left Brand Area */}
          <div className="flex items-center gap-3 select-none">
            {/* Logo and Brand Text */}
            <div 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" 
              onClick={() => handleLogoOrNavClick('home')}
              title="Go to Homepage"
            >
              <img
                src="logo-icon.png"
                alt="Vignette"
                className="w-8.5 h-8.5 sm:w-10 sm:h-10 object-contain shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] font-heading font-black text-xl sm:text-2xl tracking-tight">
                  Vignette
                </span>
                <span className="font-brand font-extrabold text-[9px] sm:text-xs tracking-wide -mt-0.5 sm:-mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] inline-block">
                  Explore our works
                </span>
              </div>
            </div>
          </div>

          {/* Right Theme Control / Profile */}
          <div className="flex items-center gap-3">
            {/* Home Button */}
            <button
              onClick={onClose}
              aria-label="Go to Home"
              className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center focus:outline-none"
              title="Go to Home"
            >
              <Home className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO EXPLORE GALLERY SECTION (Adapt side-by-side starting at md tablet screens) */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden flex flex-col items-center">
        
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-4 sm:gap-6 text-center md:text-left relative z-20 w-full">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#d10000] dark:text-[#ffec4e] select-none">
              Explore Gallery
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-zinc-950 dark:text-white leading-[1.08] tracking-tight">
              MOMENTS.<br />
              STORIES.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] font-heading font-black">Vignette.</span>
            </h1>
            <p className="font-body text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed text-center md:text-left max-w-[280px] sm:max-w-[320px] md:max-w-sm mx-auto md:mx-0">
              A visual diary of places, people and stories captured one vignette at a time.
            </p>
            
            {/* Connect Button */}
            <a
              href="https://instagram.com/proy____"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-black font-heading font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md select-none cursor-pointer inline-flex items-center justify-center"
            >
              Connect
            </a>
          </div>

          {/* Right Column: Dynamic Fanned Polaroid Cards Stack & Red Brushstroke Backdrop - HIDDEN on Mobile */}
          <div className="hidden md:flex md:col-span-7 items-center justify-center relative w-full h-[280px] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[540px] select-none overflow-visible px-4 md:px-0">
            
            {/* SVG Displacement Paint Brush stroke Circle Backdrop */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] xl:w-[560px] xl:h-[560px] opacity-90 pointer-events-none select-none z-0">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#c8102e] dark:text-[#c8102e]/85">
                <defs>
                  <filter id="paint-brush-displace" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                {/* Outermost ring */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="39" 
                  stroke="currentColor" 
                  strokeWidth="11" 
                  filter="url(#paint-brush-displace)" 
                  strokeDasharray="220 20" 
                  strokeDashoffset="15"
                  strokeLinecap="round" 
                />
                {/* Secondary inner dry brush overlay */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="37.5" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  filter="url(#paint-brush-displace)" 
                  strokeDasharray="170 60" 
                  strokeDashoffset="90"
                  strokeLinecap="round" 
                  className="opacity-75"
                />
                {/* Small Splatters */}
                <circle cx="28" cy="18" r="1.2" fill="currentColor" />
                <circle cx="76" cy="20" r="1.8" fill="currentColor" />
                <circle cx="83" cy="54" r="0.9" fill="currentColor" />
                <circle cx="22" cy="73" r="1.1" fill="currentColor" />
              </svg>
            </div>

            {/* Interactive Fanned Polaroid Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              {MOCK_EXPLORE_HERO.map((card, idx) => {
                const cardStyles = [
                  // Far Left
                  'rotate-[-12deg] -translate-x-[75px] sm:-translate-x-[110px] md:-translate-x-[120px] lg:-translate-x-[200px] xl:-translate-x-[250px] scale-[0.76] opacity-60 z-10',
                  // Mid Left
                  'rotate-[-6deg] -translate-x-[38px] sm:-translate-x-[55px] md:-translate-x-[60px] lg:-translate-x-[100px] xl:-translate-x-[125px] scale-[0.88] opacity-85 z-20',
                  // Center
                  'rotate-0 scale-100 z-30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]',
                  // Mid Right
                  'rotate-[6deg] translate-x-[38px] sm:translate-x-[55px] md:translate-x-[60px] lg:translate-x-[100px] xl:translate-x-[125px] scale-[0.88] opacity-85 z-20',
                  // Far Right
                  'rotate-[12deg] translate-x-[75px] sm:translate-x-[110px] md:translate-x-[120px] lg:translate-x-[200px] xl:translate-x-[250px] scale-[0.76] opacity-60 z-10'
                ];

                const customRotation = cardStyles[idx];

                return (
                  <div
                    key={card.id}
                    className={`absolute w-[100px] sm:w-[135px] md:w-[145px] lg:w-[200px] xl:w-[245px] aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border-[4px] sm:border-[5px] md:border-[6px] lg:border-[7px] border-white shadow-xl select-none pointer-events-none ${customRotation}`}
                  >
                    <img
                      src={card.media_url}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                      draggable="false"
                    />

                    {/* Gradient Overlay and Polaroid Labels */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2.5 sm:p-4">
                      {card.isNew && (
                        <span className="absolute top-2.5 left-2.5 bg-white text-black text-[7px] sm:text-[9px] font-black tracking-widest px-2 py-0.5 sm:py-1 rounded shadow-sm select-none uppercase">
                          New
                        </span>
                      )}
                      
                      <span className="text-[7.5px] sm:text-[9.5px] font-black text-brand-darkGold dark:text-[#ffec4e] uppercase tracking-wider">
                        {card.category}
                      </span>
                      
                      <div className="flex items-center justify-between gap-1 mt-0.5 select-none">
                        <h3 className="text-[8.5px] sm:text-[11.5px] font-black text-white leading-tight truncate">
                          {card.title}
                        </h3>
                        <span className="flex items-center gap-0.5 text-zinc-300 text-[8px] sm:text-[10px] font-bold shrink-0">
                          <Heart className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                          {card.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEARCH, FILTERS & GRID CONTROLS */}
      <section className="py-6 sm:py-8 bg-transparent border-y border-zinc-200 dark:border-white/5 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
          
          {/* Top Line: Search (Left) & Mobile Toggle (Right) */}
          <div className="flex items-center gap-3 w-full">
            {/* Search Box */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search vignettes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-xs font-bold transition-all focus:outline-none focus:border-brand-lightRed/50 focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filters Toggle Button - Hidden on tablet/desktop */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 md:hidden ${
                showMobileFilters 
                  ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white' 
                  : 'bg-white border-zinc-300 dark:bg-zinc-950 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350'
              }`}
              aria-label="Toggle filter categories"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown & Layout density Toggler */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] sm:text-xs text-zinc-400 font-bold uppercase tracking-wider">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-2.5 py-1 text-[10px] sm:text-xs font-bold focus:outline-none focus:border-brand-lightRed/50 focus:ring-0 cursor-pointer"
              >
                <option value="Latest">Latest</option>
                <option value="Most Liked">Most Liked</option>
              </select>
            </div>

            {/* Layout Toggler - Hidden on mobile, visible on tablet/desktop */}
            <button
              onClick={() => setIsGridLayout(!isGridLayout)}
              className={`p-2 rounded-xl border border-zinc-300 dark:border-zinc-800 transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center ${
                isGridLayout 
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-sm' 
                  : 'bg-white text-zinc-700 hover:text-zinc-950 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-white border-zinc-300 dark:border-zinc-800 shadow-sm'
              }`}
              title={isGridLayout ? "Layout: Large Card View" : "Layout: Standard Grid"}
              aria-label="Toggle layout style"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          {/* Centered Category Pills (Collapsible on mobile, always visible on md+) */}
          <div className={`transition-all duration-300 border-t border-zinc-200/50 dark:border-white/5 pt-4 ${
            showMobileFilters ? 'block' : 'hidden md:block'
          }`}>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-full">
              {categories.map((category) => {
                const isActive = activeTab.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-3 py-1.5 rounded-full font-brand font-black text-[9px] sm:text-[10.5px] tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-zinc-950 text-white dark:bg-[#ffec4e] dark:text-black shadow-md'
                        : 'bg-white hover:bg-zinc-50 border border-zinc-200 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 5. VIGNETTES DISPLAY (Responsive layout: list rows on mobile, photo grid on tablet/desktop) */}
      <section className="py-12 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-4 select-none">
              <span className="text-4xl">📸</span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-zinc-400 uppercase tracking-wider">Not Found</h3>
              <p className="text-zinc-500 text-xs sm:text-sm">Try broadening your search query or choosing another category.</p>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW LAYOUT: Horizontal row list cards */}
              <div className="md:hidden flex flex-col gap-4">
                {pagedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(filteredItems.indexOf(item))}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#fdfbf7] dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 items-center cursor-pointer shadow-sm hover:shadow-md transition-all select-none active:scale-[0.98]"
                  >
                    {/* Left Thumbnail (Increased size) */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                      <img 
                        src={item.media_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                        draggable="false"
                      />
                    </div>
                    {/* Right Details (Decreased and adjusted text size) */}
                    <div className="flex flex-col gap-1 items-start text-left flex-1 min-w-0">
                      <span className="text-[7.5px] font-black uppercase tracking-widest text-[#D10000] dark:text-[#ffec4e]">
                        {item.category}
                      </span>
                      <h4 className="font-heading font-black text-xs text-zinc-900 dark:text-white leading-snug line-clamp-2 w-full">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-[10px] mt-1">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        <span className="font-extrabold text-[9.5px] text-zinc-700 dark:text-zinc-300">{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TABLET (iPad) VIEW LAYOUT: Masonry Cards photo grid (Paginated) */}
              <div className={`hidden md:max-lg:grid gap-4 sm:gap-6 transition-all duration-300 ${
                isGridLayout 
                  ? 'grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {pagedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(filteredItems.indexOf(item))}
                    className={`group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out select-none animate-scaleUp`}
                  >
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out"
                      draggable="false"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity duration-300">
                      <span className="font-brand font-extrabold text-[8px] sm:text-[9.5px] uppercase tracking-wider text-brand-darkGold dark:text-[#ffec4e] mb-1">
                        {item.category}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading font-black text-[10.5px] sm:text-xs text-white leading-tight truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          <span className="flex items-center gap-0.5 text-zinc-300 text-[8.5px] sm:text-[10px] font-bold">
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                            {item.likes}
                          </span>
                          <Maximize2 className="w-3 h-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-350 shrink-0 hidden sm:inline" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination control for mobile & tablet (iPad) views */}
              {totalPages > 1 && (
                <div className="lg:hidden flex items-center justify-center gap-2 mt-8 select-none">
                  {/* Previous button */}
                  <button
                    onClick={() => setMobilePage(prev => Math.max(1, prev - 1))}
                    disabled={mobilePage === 1}
                    className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-zinc-700 dark:text-zinc-350 font-heading font-black text-[10px] uppercase tracking-wider"
                  >
                    Prev
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1.5">
                    {getPageNumbers().map((p, idx) => {
                      if (p === '...') {
                        return (
                          <span key={`dots-${idx}`} className="px-1 text-zinc-450 dark:text-zinc-550 font-brand font-black text-xs">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={`page-${p}`}
                          onClick={() => setMobilePage(p)}
                          className={`w-8 h-8 rounded-xl font-heading font-black text-xs transition-all flex items-center justify-center cursor-pointer ${
                            mobilePage === p
                              ? 'bg-zinc-950 text-white dark:bg-white dark:text-black shadow-md scale-105'
                              : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-350'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => setMobilePage(prev => Math.min(totalPages, prev + 1))}
                    disabled={mobilePage === totalPages}
                    className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-zinc-700 dark:text-zinc-350 font-heading font-black text-[10px] uppercase tracking-wider"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* DESKTOP VIEW LAYOUT: Masonry Cards photo grid (Unpaginated) */}
              <div className={`hidden lg:grid gap-4 sm:gap-6 transition-all duration-300 ${
                isGridLayout 
                  ? 'lg:grid-cols-4 xl:grid-cols-5' 
                  : 'lg:grid-cols-2 xl:grid-cols-3'
              }`}>
                {filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out select-none animate-scaleUp`}
                  >
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out"
                      draggable="false"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity duration-300">
                      <span className="font-brand font-extrabold text-[8px] sm:text-[9.5px] uppercase tracking-wider text-brand-darkGold dark:text-[#ffec4e] mb-1">
                        {item.category}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading font-black text-[10.5px] sm:text-xs text-white leading-tight truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          <span className="flex items-center gap-0.5 text-zinc-300 text-[8.5px] sm:text-[10px] font-bold">
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 shrink-0" />
                            {item.likes}
                          </span>
                          <Maximize2 className="w-3 h-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-350 shrink-0 hidden sm:inline" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 6. LIGHTBOX VIEW CONTROLS */}
      {lightboxIndex !== null && (() => {
        const activeItem = filteredItems[lightboxIndex];
        if (!activeItem) return null;

        const handlePrev = (e) => {
          e.stopPropagation();
          setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
        };

        const handleNext = (e) => {
          e.stopPropagation();
          setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
        };

        return (
          <div 
            className="fixed inset-0 z-[1500] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-6 select-none font-brand animate-fadeIn"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 inset-x-0 px-4 sm:px-6 flex items-center justify-between text-white z-55">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 border border-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Zoom view"
              >
                <X className="w-4 h-4 sm:w-5 h-5" />
              </button>
            </div>

            {/* Content Wrapper */}
            <div className="relative max-w-5xl w-full max-h-[70vh] sm:max-h-[80vh] flex items-center justify-center group" onClick={e => e.stopPropagation()}>
              
              {/* Media Element */}
              <img
                src={activeItem.media_url}
                alt={activeItem.title}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl animate-scaleUp"
              />

              {/* Navigation Chevrons */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 text-white hover:scale-110 active:scale-95 transition-all z-20 border border-white/5 cursor-pointer"
                aria-label="Previous vignette image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 text-white hover:scale-110 active:scale-95 transition-all z-20 border border-white/5 cursor-pointer"
                aria-label="Next vignette image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Deck */}
            <div className="mt-6 text-center max-w-xl px-4 flex flex-col items-center gap-1.5" onClick={e => e.stopPropagation()}>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-darkGold dark:text-[#ffec4e]">
                {activeItem.category}
              </span>
              <h2 className="font-heading font-black text-base sm:text-xl md:text-2xl tracking-tight text-white leading-tight uppercase">
                {activeItem.title}
              </h2>
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs mt-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                <span className="font-bold text-zinc-300">{activeItem.likes} likes</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 7. FOOTER */}
      <footer className="border-t-[0.5px] border-white/10 py-16 select-none bg-transparent text-zinc-300 transition-colors overflow-x-hidden relative z-10 font-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

          {/* Main Footer columns row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">

            {/* Logo Name & Brand Info */}
            <div className="flex flex-col gap-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleLogoOrNavClick('home')}
              >
                <img
                  src="logo-icon.png"
                  alt="Vignette"
                  className="w-10 h-10 object-contain select-none pointer-events-none"
                  draggable="false"
                />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] font-heading font-black text-2xl tracking-tight select-none">
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
                    onClick={() => { setLegalModal('terms'); setActiveLegalTab('terms'); }}
                    className="hover:text-[#D10000] dark:hover:text-[#FFD700] transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setLegalModal('privacy'); setActiveLegalTab('privacy'); }}
                    className="hover:text-[#D10000] dark:hover:text-[#FFD700] transition-colors cursor-pointer text-left focus:outline-none"
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
                <span>Ramnagar, Agartala, Tripura(W) - 799002</span>
              </p>
            </div>

          </div>

          {/* Social Media & Divider Line */}
          <div className="flex flex-col items-center gap-6 mt-4">
            
            {/* Social Icons Row */}
            <div className="flex gap-6 items-center justify-center">
              
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
              <p>{formatVignette('© ' + currentYear + ' Vignette. All rights reserved | Made by Vignette')}</p>
            </div>

          </div>

        </div>
      </footer>

      {/* 8. LEGAL RESPONSIVE MODAL POPUP */}
      <div
        className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          legalModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setLegalModal(null)}
      >
        <div
          className={`relative w-full max-w-2xl max-h-[85vh] bg-[#f5f5dd] dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col my-8 select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            legalModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#f5f5dd] dark:bg-zinc-950 px-6 sm:px-8 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="font-heading font-extrabold text-xs tracking-widest text-[#D10000] dark:text-[#FFD700] uppercase block mb-1">
                Legal
              </span>
              <h2 className="font-heading font-black text-lg sm:text-xl text-zinc-900 dark:text-white">
                {activeLegalTab === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}
              </h2>
            </div>
            <button
              onClick={() => setLegalModal(null)}
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 font-body text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-5">
            {activeLegalTab === 'terms' ? (
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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D10000] to-[#e67e22] dark:from-[#FFD700] dark:to-[#e67e22] text-white dark:text-black font-heading font-bold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
