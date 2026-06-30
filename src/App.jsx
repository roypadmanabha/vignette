import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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
  Play,
  Pause
} from 'lucide-react';
import { supabase } from './supabase';

// Local SVG declarations for social icons (removed in Lucide v0.400+)
const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);


// ==========================================
// 0. MOCK DATA FALLBACKS
// ==========================================

const MOCK_GALLERY = [
  { id: 1, type: 'image', title: 'Swiss Alps Horizon', category: 'Travel', media_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80', display_order: 1 },
  { id: 2, type: 'image', title: 'Kyoto Golden Sunset', category: 'Travel', media_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80', display_order: 2 },
  { id: 3, type: 'image', title: 'Editing Workflow Setup', category: 'Lifestyle', media_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop&q=80', display_order: 3 },
  { id: 4, type: 'image', title: 'In-Flight wing view Boeing 777', category: 'Avgeek', media_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1000&auto=format&fit=crop&q=80', display_order: 4 },
  { id: 5, type: 'image', title: 'Cozy Creative Nook', category: 'Lifestyle', media_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1000&auto=format&fit=crop&q=80', display_order: 5 },
  { id: 6, type: 'image', title: 'Runway Approach Landing', category: 'Avgeek', media_url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=1000&auto=format&fit=crop&q=80', display_order: 6 },
  { id: 7, type: 'image', title: 'Golden Hour Silhouette', category: 'Storytelling', media_url: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?w=1000&auto=format&fit=crop&q=80', display_order: 7 },
  { id: 8, type: 'image', title: 'Neon Urban Cyberpunk', category: 'Storytelling', media_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&auto=format&fit=crop&q=80', display_order: 8 }
];

const MOCK_VIDEOS = [
  {
    id: 9,
    type: 'video',
    title: 'Wings Over Clouds',
    category: 'Avgeek',
    media_url: 'https://assets.mixkit.co/videos/preview/mixkit-passenger-airplane-flying-across-the-sky-34261-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    type: 'video',
    title: 'Chasing Alpine Bridges',
    category: 'Travel',
    media_url: 'https://assets.mixkit.co/videos/preview/mixkit-person-walking-on-a-wooden-bridge-in-nature-41584-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 11,
    type: 'video',
    title: 'Vintage Camera Focus',
    category: 'Lifestyle',
    media_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-vintage-camera-42289-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
  }
];

const MOCK_EDITS = [
  {
    id: 12,
    type: 'edit',
    title: 'Cinematic Teal & Orange',
    description: 'Raw Flat Log Profile color-graded to a warm, high-contrast golden hour style, drawing focus to the mountain range.',
    before_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80&sat=-50&con=-20',
    after_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 13,
    type: 'edit',
    title: 'Moody Window Overcast',
    description: 'Sky brightness recovery, wing highlights adjustment, and modern cool-shadow toning applied to a flat cabin view.',
    before_url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop&q=80&sat=-70',
    after_url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&auto=format&fit=crop&q=80'
  }
];

// ==========================================
// 1. HELPERS & CHILD COMPONENTS
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
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'
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
    handleMove(e.clientX);
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative overflow-hidden aspect-[4/3] rounded-2xl shadow-xl select-none cursor-ew-resize border border-black/10 dark:border-white/10 group bg-zinc-200 dark:bg-zinc-800"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Before Image (underneath) */}
        <img
          src={before}
          alt="Before Edit"
          className="absolute inset-0 w-full h-full object-cover select-none"
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
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
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
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-zinc-900 border-2 border-brand-lightRed dark:border-brand-darkGold rounded-full shadow-2xl flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
            <svg className="w-5 h-5 text-brand-lightRed dark:text-brand-darkGold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
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
const CustomVideoPlayer = ({ src, poster, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  }, [src]);

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

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full aspect-video bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimeout}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          playsInline
          loop
          disablePictureInPicture
          controlsList="nodownload nofullscreen"
          draggable="false"
        />

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-colors z-30"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Custom Controls Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Progress Seek Scrubber */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleScrub}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-lightRed dark:accent-brand-darkGold hover:h-2 transition-all"
          />

          <div className="flex items-center justify-between mt-1 text-white">
            <div className="flex items-center gap-4">
              {/* Play / Pause Toggle button */}
              <button
                onClick={togglePlay}
                className="p-1 hover:text-brand-lightOrange dark:hover:text-brand-darkGold transition-colors focus:outline-none"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>

              {/* Timing info */}
              <span className="font-body text-xs md:text-sm text-zinc-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Volume controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1 hover:text-brand-lightOrange dark:hover:text-brand-darkGold transition-colors focus:outline-none"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 4.5V4.5z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-lightRed dark:accent-brand-darkGold"
              />
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

  // Gallery items and filters
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [galleryItems, setGalleryItems] = useState(MOCK_GALLERY);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null); // index of filtered list

  // Videos / Reels
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [videoModalPoster, setVideoModalPoster] = useState(null);

  // Draggable before/after edits
  const [edits, setEdits] = useState(MOCK_EDITS);

  // Form states
  const [formState, setFormState] = useState({
    salutation: 'Mr',
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

  // Lock background scroll when modal is active
  useEffect(() => {
    if (isHireModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isHireModalOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsHireModalOpen(false);
      }
    };
    if (isHireModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHireModalOpen]);

  // Hero section random background image url state
  const [heroBgUrl, setHeroBgUrl] = useState('');

  useEffect(() => {
    const randomSeed = Math.floor(Math.random() * 10000);
    setHeroBgUrl(`https://picsum.photos/1920/1080?random=${randomSeed}`);
  }, []);

  // Scroll state for sticky header glassmorphism behavior
  const [isScrolled, setIsScrolled] = useState(false);

  // Hero Showcase Video states
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const heroVideoRef = useRef(null);

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



  // --- Theme Initializer ---
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
    }, 2000);
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
          const loadedVideos = data.filter(item => item.type === 'video');
          const loadedEdits = data.filter(item => item.type === 'edit');

          if (loadedImages.length > 0) setGalleryItems(loadedImages);
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

  // --- Video Hover Autoplay Preview (Desktop only) ---
  const handleVideoHoverStart = (idx, url) => {
    const video = document.getElementById(`preview-video-${idx}`);
    if (video) {
      video.muted = true;
      video.play().catch(() => { });
    }
  };

  const handleVideoHoverEnd = (idx) => {
    const video = document.getElementById(`preview-video-${idx}`);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

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
        salutation: 'Mr',
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
    <div className={`min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative ${isDark ? 'bg-dark-theme' : 'bg-light-theme'}`}>

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
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-brand-lightRed text-white font-brand font-extrabold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all">
          <span>⚠ Not allowed! Content Protection enabled</span>
        </div>
      )}

      {/* 2.3. STICKY NAVBAR HEADER */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
        ? 'glassmorphism shadow-sm'
        : 'bg-transparent border-b border-transparent shadow-none'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">

          {/* Logo Brand Name (Two-tone wordmark + icon) */}
          <div
            className="flex items-center gap-2.5 cursor-pointer z-50 select-none"
            onClick={() => scrollToSection('home')}
          >
            <img
              src="logo-icon.png"
              alt="V"
              className="w-7 h-7 object-contain select-none pointer-events-none"
              draggable="false"
            />
            <span className="brand-text-gradient text-2xl tracking-tight select-none">
              Vignette
            </span>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8 font-brand font-bold text-sm">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Videos', id: 'videos' },
              { label: 'Editing', id: 'editing' },
              { label: 'Vision', id: 'vision' },
              { label: 'Hire Me', id: 'hire' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => link.id === 'hire' ? setIsHireModalOpen(true) : scrollToSection(link.id)}
                className="relative py-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle Pill Switch (Desktop) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="hidden md:flex relative w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center px-1 transition-colors border border-black/10 dark:border-white/10"
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
              className="flex md:hidden p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-colors"
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
              className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2.4. MOBILE SIDEBAR DRAWER MENU */}
      {/* Backdrop shadow overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-35 bg-black/40 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-40 w-[55vw] sm:w-[45vw] bg-[#f5f5dd]/95 dark:bg-[#050508]/95 backdrop-blur-md border-l border-black/5 dark:border-white/5 shadow-2xl transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button Inside Drawer */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Inner links container */}
        <div className="flex flex-col h-full pt-20 px-6 justify-between pb-8">
          <nav className="flex flex-col gap-6">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Videos', id: 'videos' },
              { label: 'Editing', id: 'editing' },
              { label: 'Vision', id: 'vision' },
              { label: 'Hire Me', id: 'hire' }
            ].map((link, index) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.id === 'hire') {
                    setIsHireModalOpen(true);
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className="font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider text-left text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors py-1.5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Small brand footer in drawer */}
          <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-body uppercase tracking-wider select-none">
            Vignette © {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN LAYOUT CONTAINER (Content above z-10)
          ========================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2.5. HERO SECTION */}
        <section
          id="home"
          className="min-h-[85vh] flex flex-col justify-center items-center py-20 text-center relative select-none overflow-hidden rounded-[32px] border border-black/5 dark:border-white/5 mt-6 shadow-sm"
        >
          {/* Responsive random Lorem Picsum background with contrast overlays */}
          {heroBgUrl && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src={heroBgUrl}
                alt=""
                className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f5dd]/80 to-[#f5f5dd] dark:via-[#050508]/85 dark:to-[#050508]" />
            </div>
          )}

          {/* Hero Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            {/* Eyebrow */}
            <div className="reveal flex items-center gap-2 mb-6 font-brand font-extrabold text-xs md:text-sm tracking-[0.25em] text-zinc-950 dark:text-white uppercase">
              <Sparkles className="w-4 h-4 text-brand-lightOrange dark:text-brand-darkGold animate-pulse" />
              <span>Digital Creator · Storyteller · Avgeek</span>
            </div>

            {/* H1 Heading with looping shimmer */}
            <h1 className="reveal font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-4xl select-none">
              <span className="text-gradient inline-block animate-shimmer bg-[length:200%_auto]">
                Frames that tell a story.
              </span>
            </h1>

            {/* Short Bio Paragraph */}
            <p className="reveal font-body text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mt-8 leading-relaxed px-4 transition-colors">
              Welcome to <strong className="brand-text-gradient select-none">Vignette</strong>,
              the creative sandbox of Padmanabha Roy. Merging dynamic reels, custom video color edits,
              and high-altitude aviation storytelling into cinematic digital capsules.
            </p>

            {/* CTA Buttons */}
            <div className="reveal flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center px-6">
              <button
                onClick={() => scrollToSection('gallery')}
                className="px-8 py-4 rounded-full font-brand font-extrabold text-sm text-white bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow dark:text-black shadow-lg hover:shadow-brand-lightOrange/30 dark:hover:shadow-brand-darkGold/20 hover:-translate-y-[3px] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                View My Work →
              </button>
              <button
                onClick={() => setIsHireModalOpen(true)}
                className="px-8 py-4 rounded-full font-brand font-extrabold text-sm border-2 border-zinc-400 hover:border-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-white/5 hover:-translate-y-[3px] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                Hire Me
              </button>
            </div>

            {/* Statistics Count-Up Row */}
            <div className="reveal grid grid-cols-3 gap-6 sm:gap-12 mt-20 max-w-xl w-full border-t border-black/10 dark:border-white/10 pt-10 px-4">
              <div className="flex flex-col">
                <span className="font-brand font-black text-3xl sm:text-4xl text-zinc-950 dark:text-white transition-colors">
                  <CountUp end={227} suffix="+" />
                </span>
                <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 mt-1.5">Posts</span>
              </div>
              <div className="flex flex-col">
                <span className="font-brand font-black text-3xl sm:text-4xl text-zinc-950 dark:text-white transition-colors">
                  <CountUp end={2.1} suffix="K+" />
                </span>
                <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 mt-1.5">Followers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-brand font-black text-3xl sm:text-4xl text-zinc-950 dark:text-white transition-colors">
                  <CountUp end={100} suffix="+" />
                </span>
                <span className="font-body text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 mt-1.5">Reels Crafted</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2.6. GALLERY SECTION */}
        <section id="gallery" className="py-24 sm:py-32 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
              Captured Moments
            </h2>
            <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed px-4 transition-colors">
              Freezing time across terminals, peaks, and street corners. Discover visual stories filtered by category.
            </p>
          </div>

          {/* Filter Pill List Row */}
          <div className="reveal flex flex-wrap justify-center gap-2.5 mb-12 px-4 select-none">
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

          {/* Responsive CSS Column Masonry Grid */}
          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse px-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-zinc-300 dark:bg-zinc-800 aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 px-4">
              {filteredGallery.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="reveal break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500 bg-zinc-200 dark:bg-zinc-800 border border-black/5 dark:border-white/5"
                >
                  {/* Photo Thumbnail */}
                  <img
                    src={item.media_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-105"
                    draggable="false"
                  />
                  {/* Hover Cap overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="font-heading font-extrabold text-[10px] tracking-wider text-brand-darkGold uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-black text-xl text-white mt-1 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lightbox Screen overlay */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                onClick={() => setLightboxIndex(null)}
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

              {/* Central Picture Container */}
              <div
                className="relative max-w-4xl max-h-[80vh] w-full p-4 flex flex-col items-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredGallery[lightboxIndex].media_url}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10 select-none"
                  draggable="false"
                />
                <div className="text-center mt-4">
                  <span className="font-heading font-extrabold text-xs tracking-widest text-[#FFD700] uppercase">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                  <h3 className="font-heading font-black text-2xl text-white mt-1">
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
        </section>

        {/* 2.7. VIDEOS / REELS SECTION */}
        <section id="videos" className="py-24 sm:py-32 border-t border-black/5 dark:border-white/5 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
              Reels in Motion
            </h2>
            <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed px-4 transition-colors">
              Short, snappy snippets with premium edit pacing. Hover on desktops to preview, click to open full cinematic player.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {videos.map((vid, idx) => (
              <div
                key={vid.id}
                onClick={() => {
                  setVideoModalUrl(vid.media_url);
                  setVideoModalPoster(vid.thumbnail_url);
                }}
                onMouseEnter={() => handleVideoHoverStart(idx, vid.media_url)}
                onMouseLeave={() => handleVideoHoverEnd(idx)}
                className="relative flex flex-col bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 select-none"
              >
                {/* Visual Preview Container */}
                <div className="relative aspect-[9/16] w-full bg-zinc-950 overflow-hidden">

                  {/* Poster Image */}
                  <img
                    src={vid.thumbnail_url}
                    alt={vid.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 select-none"
                    draggable="false"
                  />

                  {/* Looping Muted Hover Video */}
                  <video
                    id={`preview-video-${idx}`}
                    src={vid.media_url}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    muted
                    loop
                    playsInline
                    draggable="false"
                  />

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl scale-95 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Category label top-left */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-heading font-extrabold tracking-wider text-brand-darkGold uppercase z-10 pointer-events-none">
                    {vid.category}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="p-5 flex flex-col justify-between border-t border-black/5 dark:border-white/5">
                  <h3 className="font-heading font-black text-lg text-zinc-950 dark:text-white transition-colors leading-tight">
                    {vid.title}
                  </h3>
                  <span className="font-body text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Open Reels Preview
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fullscreen Video Player */}
          {videoModalUrl && (
            <CustomVideoPlayer
              src={videoModalUrl}
              poster={videoModalPoster}
              onClose={() => {
                setVideoModalUrl(null);
                setVideoModalPoster(null);
              }}
            />
          )}
        </section>

        {/* 2.8. EDITING SHOWCASE SECTION */}
        <section id="editing" className="py-24 sm:py-32 border-t border-black/5 dark:border-white/5 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
              Before / After Showcase
            </h2>
            <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed px-4 transition-colors">
              Highlighting the impact of custom Lightroom presets and Premiere color correction. Grab and drag the split dividers.
            </p>
          </div>

          {/* Slider Grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            {edits.map(edit => (
              <BeforeAfterSlider
                key={edit.id}
                before={edit.before_url}
                after={edit.after_url}
                title={edit.title}
                description={edit.description}
              />
            ))}
          </div>
        </section>

        {/* 2.9. VISION & MANIFESTO SECTION */}
        <section id="vision" className="pt-24 pb-12 sm:pt-32 sm:pb-16 border-t border-black/5 dark:border-white/5 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4">

            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="reveal font-heading font-extrabold text-xs tracking-widest text-[#c0392b] dark:text-[#FFD700] uppercase mb-3">
                Creative Manifesto
              </span>
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient leading-tight">
                Where This Is Headed
              </h2>

              <div className="reveal font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mt-6 space-y-6 leading-relaxed transition-colors text-justify">
                <p>
                  As a digital storyteller, avgeek, and travel editor, I believe that every frame should make the audience feel like they're boarding the flight alongside me. The brand <strong className="brand-text-gradient">Vignette</strong> isn't just about cropping edges—it's about adding depth and lighting the subject exactly where it matters.
                </p>
                <p>
                  My goal is simple: transition from high-end travel editing into a full-time content influencer collaborating with boutique airlines, global tourism boards, and lifestyle brands. I bring a highly meticulous editing tone, deep aviation insights, and raw travel pacing to campaigns.
                </p>
                <p>
                  Let's break the mould of standard content loops. I am currently open to creative collaborations, sponsored travel vlogs, color-grading projects, and commercial business opportunities.
                </p>
              </div>
            </div>

            {/* Right Pull-quote Graphic Column */}
            <div className="reveal lg:col-span-5 flex flex-col justify-center">
              <div className="relative p-8 md:p-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-sm border border-brand-lightRed/20 dark:border-brand-darkGold/20 shadow-xl">
                {/* Thick styling border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow rounded-l-2xl" />

                {/* Quote details */}
                <span className="font-brand text-6xl text-brand-lightRed/20 dark:text-brand-darkGold/25 absolute top-4 left-6 select-none pointer-events-none">
                  “
                </span>
                <blockquote className="font-brand font-extrabold italic text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 mt-2 leading-relaxed transition-colors select-none">
                  Content isn't just about what you see. It is about how long the feeling lingers after you've scrolled past the frame.
                </blockquote>

                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-zinc-200">
                    <img
                      src="logo-icon.png"
                      alt="P"
                      className="w-full h-full object-contain p-1 select-none"
                      draggable="false"
                    />
                  </div>
                  <div className="flex flex-col">
                    <cite className="font-brand font-black text-sm text-zinc-950 dark:text-white not-italic transition-colors">
                      Padmanabha Roy
                    </cite>
                    <span className="font-body text-[10px] text-zinc-500 uppercase tracking-wider">
                      Vignette Founder
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2.9.5. HERO VIDEO SHOWCASE */}
        <section className="py-10 sm:py-14 border-t border-black/5 dark:border-white/5 flex flex-col items-center justify-center select-none">
          <div className="max-w-4xl w-full px-4">
            <div
              className="relative rounded-[20px] overflow-hidden shadow-xl bg-black cursor-pointer"
              onClick={toggleHeroPlay}
            >
              <video
                ref={heroVideoRef}
                src="hero_video.MOV"
                playsInline
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
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#e31c25] fill-[#e31c25] translate-x-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2.10. HIRE ME SECTION */}
        <section id="hire" className="pt-12 pb-24 sm:pt-16 sm:pb-32 border-t border-black/5 dark:border-white/5 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4">

            {/* Context Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="reveal font-heading font-extrabold text-xs tracking-widest text-[#c0392b] dark:text-[#FFD700] uppercase mb-3">
                Let's Collaborate
              </span>
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient leading-tight">
                Let's Create Together
              </h2>
              <p className="reveal font-body text-zinc-600 dark:text-zinc-300 mt-6 leading-relaxed transition-colors text-justify">
                Ready to take your brand narrative to the sky? Get in touch for content consulting, sponsored edits, photography campaigns, or direct avgeek story writeups.
              </p>

              <div className="reveal mt-8 space-y-4 font-body text-sm text-zinc-500 dark:text-zinc-400">
                <p className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-brand-lightRed dark:text-brand-darkGold" />
                  <span>@proy___ (Instagram DM preferred)</span>
                </p>
                <p className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-brand-lightOrange dark:text-brand-darkGold" />
                  <span>Based in India · Traveling Worldwide</span>
                </p>
              </div>
            </div>

            {/* Inquiries Form Column */}
            <div className="reveal lg:col-span-7">
              <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-2xl">

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
                      <label htmlFor="form-purpose" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                        Purpose
                      </label>
                      <div className="relative">
                        <select
                          id="form-purpose"
                          value={formState.purpose}
                          disabled={formSubmitting}
                          onChange={(e) => setFormState(prev => ({ ...prev, purpose: e.target.value }))}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select</option>
                          <option value="Hire for Video Editing (PAID)">Hire for Video Editing (PAID)</option>
                          <option value="Hire for Podcast/YT Video Editing (PAID)">Hire for Podcast/YT Video Editing (PAID)</option>
                          <option value="Hire for Photoshoot (PAID)">Hire for Photoshoot (PAID)</option>
                          <option value="Ask for Collaboration">Ask for Collaboration</option>
                          <option value="Let's Work Together">Let's Work Together</option>
                          <option value="Avgeek - Let's Connect">Avgeek - Let's Connect</option>
                          <option value="Planespotting">Planespotting</option>
                          <option value="Want to join the 'Vignette' team">Want to join the 'Vignette' team</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                          <Compass className="w-4 h-4 transform rotate-180" />
                        </div>
                      </div>
                    </div>

                    {/* Salutation + Names Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Salutation Dropdown */}
                      <div className="flex flex-col gap-2 sm:col-span-3">
                        <label htmlFor="form-salutation" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                          Title
                        </label>
                        <div className="relative">
                          <select
                            id="form-salutation"
                            value={formState.salutation}
                            disabled={formSubmitting}
                            onChange={(e) => setFormState(prev => ({ ...prev, salutation: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                          >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                            <Compass className="w-4 h-4 transform rotate-180" />
                          </div>
                        </div>
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
                          placeholder="John"
                          disabled={formSubmitting}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
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
                          placeholder="Doe"
                          disabled={formSubmitting}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
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
                        <div className="flex rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-brand-lightOrange/30 dark:focus-within:ring-brand-darkGold/30 focus-within:border-brand-lightOrange dark:focus-within:border-brand-darkGold overflow-hidden transition-all">
                          <span className="flex items-center px-3.5 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-700 font-body font-bold text-sm text-zinc-500 dark:text-zinc-400 select-none">
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
                          placeholder="john@example.com"
                          disabled={formSubmitting}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body"
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
                        maxLength={5000}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body resize-y"
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
                  </form>
                )}

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 2.11. FOOTER SECTION */}
      <footer className="border-t border-black/5 dark:border-white/5 py-12 md:py-16 mt-16 select-none bg-black/[0.01] dark:bg-black/[0.15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">

          {/* Logo Name */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <img
              src="logo-icon.png"
              alt="V"
              className="w-5 h-5 object-contain select-none pointer-events-none"
              draggable="false"
            />
            <span className="brand-text-gradient text-lg tracking-tight select-none">
              Vignette
            </span>
          </div>

          {/* Icon Row Handles */}
          <div className="flex gap-6 items-center">
            <a
              href="https://www.instagram.com/proy____"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:border-brand-lightRed hover:text-brand-lightRed dark:hover:border-brand-darkGold dark:hover:text-brand-darkGold transition-all hover:-translate-y-1"
              aria-label="Visit proy___ on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:border-brand-lightRed hover:text-brand-lightRed dark:hover:border-brand-darkGold dark:hover:text-brand-darkGold transition-all hover:-translate-y-1"
              aria-label="Visit Youtube channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Quick Repeat Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-brand font-bold text-xs text-zinc-500 dark:text-zinc-400">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Videos', id: 'videos' },
              { label: 'Editing', id: 'editing' },
              { label: 'Vision', id: 'vision' },
              { label: 'Hire Me', id: 'hire' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => link.id === 'hire' ? setIsHireModalOpen(true) : scrollToSection(link.id)}
                className="hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright Metadata */}
          <div className="text-center font-body text-xs text-zinc-400 dark:text-zinc-500">
            <p>© {new Date().getFullYear()} Vignette. All rights reserved.</p>
            <p className="mt-1 text-[10px]">Built by Padmanabha Roy / Vignette</p>
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
            className="relative w-full max-w-2xl bg-zinc-50 dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 p-5 sm:p-8 md:p-10 flex flex-col my-8 select-none"
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
              <span className="font-heading font-extrabold text-xs tracking-widest text-[#c0392b] dark:text-[#FFD700] uppercase block mb-1">
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
                    <label htmlFor="modal-salutation" className="font-body font-bold text-xs uppercase tracking-wider text-zinc-500">
                      Title
                    </label>
                    <div className="relative">
                      <select
                        id="modal-salutation"
                        value={formState.salutation}
                        disabled={formSubmitting}
                        onChange={(e) => setFormState(prev => ({ ...prev, salutation: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <Compass className="w-4 h-4 transform rotate-180" />
                      </div>
                    </div>
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
                      placeholder="John"
                      disabled={formSubmitting}
                      required
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
                      placeholder="Doe"
                      disabled={formSubmitting}
                      required
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
                      <span className="flex items-center px-3.5 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-300 dark:border-zinc-700 font-body font-bold text-sm text-zinc-500 dark:text-zinc-400 select-none">
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
                      placeholder="john@example.com"
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
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
