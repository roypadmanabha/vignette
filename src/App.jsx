// Vignette Production Deployment Trigger
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
  TriangleAlert,
  Play,
  Pause,
  Phone,
  Mail,
  MapPin,
  Maximize2
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

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
    viewBox="0 0 192 192"
    fill="currentColor"
    {...props}
  >
    <path d="M141.5 99.5c-.3 11-3.6 20.2-10 27.5-6.3 7.3-15 10.9-26 10.9-10.3 0-18.7-3.7-25-11-6.4-7.3-9.5-17-9.5-29.3v-10.4c0-12.4 3.1-22 9.5-29.3 6.3-7.3 14.7-11 25-11 11 0 19.7 3.6 26 10.9 6.4 7.3 9.7 16.5 10 27.5h-15.6c-.3-7.3-2.1-13-5.6-17.1-3.5-4-8.3-6-14.8-6-6.6 0-11.7 2.2-15.3 6.6-3.6 4.4-5.4 11-5.4 19.9v10.4c0 8.9 1.8 15.5 5.4 19.9 3.6 4.4 8.7 6.6 15.3 6.6 6.5 0 11.3-2 14.8-6 3.5-4.1 5.3-9.8 5.6-17.1H141.5zm27.4-1.2c-.3 17.1-4.8 31.4-13.6 43-8.8 11.6-21 17.4-36.8 17.4-17.7 0-31.5-6-41.5-18-10-12-15-28.7-15-50.1V80.2c0-21.4 5-38 15-50.1 10-12 23.8-18 41.5-18 15.8 0 28 5.8 36.8 17.4 8.8 11.6 13.3 25.9 13.6 43H189c-.3-21.7-6.5-39.7-18.7-54-12.2-14.3-29.5-21.5-52-21.5-23.7 0-42.6 8.3-56.7 24.8C47.4 48.3 40.4 71.3 40.4 100.8v10.4c0 29.5 7 52.5 21.2 69 14.1 16.5 33 24.8 56.7 24.8 22.5 0 39.8-7.2 52-21.5 12.2-14.3 18.4-32.3 18.7-54H168.9z" />
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
    media_url: 'avgeek.mp4',
    thumbnail_url: 'avgeek.mp4#t=11'
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
          style={before === after ? { filter: 'saturate(0.3) brightness(1.08) contrast(0.75)' } : {}}
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
const CustomVideoPlayer = ({ src, poster, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      setAspectRatio(16 / 9);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center transition-all duration-300"
        style={{
          aspectRatio: aspectRatio,
          maxHeight: '82vh',
          maxWidth: '90vw',
          width: aspectRatio > 1 ? 'min(896px, 90vw)' : 'calc(82vh * ' + aspectRatio + ')',
          height: aspectRatio > 1 ? 'calc(min(896px, 90vw) / ' + aspectRatio + ')' : '82vh'
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={resetControlsTimeout}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover cursor-pointer"
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
  const heroBgVideoRef = useRef(null);

  useEffect(() => {
    const bgVideo = heroBgVideoRef.current;
    if (bgVideo) {
      bgVideo.muted = true;
      const playPromise = bgVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Hero background video autoplay blocked:", err);
        });
      }
    }
  }, []);

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
            if (video.category === 'Avgeek') {
              return {
                ...video,
                media_url: 'avgeek.mp4',
                thumbnail_url: 'avgeek.mp4#t=11'
              };
            }
            return video;
          });
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
        className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-[#990000] text-white font-brand font-extrabold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 transform pointer-events-none select-none ${
          toast.show 
            ? 'top-20 opacity-100 translate-y-0 scale-100' 
            : 'top-20 opacity-0 -translate-y-4 scale-95'
        }`}
      >
        <TriangleAlert className="w-4.5 h-4.5 text-white flex-shrink-0 animate-bounce" />
        <span className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap uppercase tracking-wider">
          Not allowed! Content Protection enabled
        </span>
      </div>

      {/* 2.3. STICKY NAVBAR HEADER */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
        ? 'glassmorphism shadow-sm'
        : 'bg-transparent border-b border-transparent shadow-none'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 lg:h-16 flex items-center justify-between">

          {/* Logo Brand Name (Two-tone wordmark + icon) */}
          <div
            className={`flex items-center gap-2 lg:gap-2.5 cursor-pointer z-50 select-none transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'
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
              { label: 'Services', url: '/' },
              { label: 'Highlights', id: 'videos' },
              { label: 'Our Works', id: 'editing' },
              { label: 'Royography', url: '/' },
              { label: 'About', id: 'vision' },
              { label: 'Contact', id: 'hire' }
            ].map(link => {
              if (link.url) {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    className="relative py-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors group"
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
              { label: 'Services', url: '/', icon: Sliders },
              { label: 'Highlights', id: 'videos', icon: Play },
              { label: 'Our Works', id: 'editing', icon: Video },
              { label: 'Royography', url: '/', icon: Camera },
              { label: 'About', id: 'vision', icon: Sparkles },
              { label: 'Contact', id: 'hire', icon: Send }
            ].map((link) => {
              const Icon = link.icon;
              const linkClasses = "flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-brand font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group";
              
              if (link.url) {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClasses}
                  >
                    <Icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-lightOrange dark:group-hover:text-brand-darkGold transition-colors" />
                    <span>{link.label}</span>
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
              Vignette © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN LAYOUT CONTAINER (Content above z-10)
          ========================================== */}
      <main className="relative z-10 w-full overflow-x-hidden">

        {/* 2.5. HERO SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">          <section
            id="home"
            className="hero-section min-h-[85vh] flex flex-col justify-center items-center py-16 lg:py-20 relative select-none overflow-hidden rounded-[32px] border border-black/5 dark:border-white/5 shadow-sm bg-[#f5f5dd] dark:bg-transparent"
          >
            {/* Looping Muted Local Video Background */}
            <video
              ref={heroBgVideoRef}
              className="hero-bg-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={heroBgUrl || undefined}
            >
              <source src="hero_video.MOV" type="video/quicktime" />
            </video>

            {/* Overlay Wash Tint */}
            <div className="hero-overlay" />

            {/* Hero Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full max-w-6xl px-4 sm:px-8 py-4">
              
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Eyebrow */}
                <div className="reveal flex items-center gap-1.5 sm:gap-2 mb-6 font-brand font-extrabold text-[9px] min-[375px]:text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.25em] text-zinc-955 dark:text-white uppercase select-none">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-lightOrange dark:text-brand-darkGold animate-pulse flex-shrink-0" />
                  <span className="whitespace-nowrap">Digital Creator · Storyteller · Avgeek</span>
                </div>

                {/* H1 Heading with looping shimmer */}
                <h1 className="reveal font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.1] select-none">
                  <span className="text-gradient inline-block animate-shimmer bg-[length:200%_auto]">
                    Frames that tell a story.
                  </span>
                </h1>

                {/* Short Bio Paragraph */}
                <p className="reveal font-body text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mt-6 leading-relaxed transition-colors">
                  Welcome to <strong className="brand-text-gradient select-none">Vignette</strong>,
                  the creative sandbox of Padmanabha Roy. Merging dynamic reels, custom video color edits,
                  and high-altitude aviation storytelling into cinematic digital capsules.
                </p>

                {/* CTA Buttons */}
                <div className="reveal flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center lg:justify-start">
                  <button
                    onClick={() => scrollToSection('gallery')}
                    className="px-8 py-3.5 rounded-full font-brand font-extrabold text-sm text-white bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow dark:text-black shadow-lg hover:shadow-brand-lightOrange/30 dark:hover:shadow-brand-darkGold/20 hover:-translate-y-[3px] hover:scale-[1.03] active:scale-95 transition-all duration-300"
                  >
                    View My Work →
                  </button>
                  <button
                    onClick={() => setIsHireModalOpen(true)}
                    className="px-8 py-3.5 rounded-full font-brand font-extrabold text-sm border-2 border-zinc-400 hover:border-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-300 hover:bg-zinc-800/5 dark:hover:bg-white/5 hover:-translate-y-[3px] hover:scale-[1.03] active:scale-95 transition-all duration-300 dark:text-white"
                  >
                    Hire Me
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Portrait with Floating Badge Stats */}
              <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
                
                {/* Visual Graphic Backdrop (Aesthetic concentric circles representing lenses/apertures) */}
                <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-brand-lightOrange/20 dark:border-brand-darkGold/15 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] rounded-full border border-dashed border-zinc-300/40 dark:border-zinc-800/30 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full bg-gradient-to-tr from-brand-lightRed/5 to-brand-lightOrange/10 dark:from-brand-darkGold/5 dark:to-brand-darkYellow/10 blur-xl" />

                {/* Main Portrait Frame */}
                <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl z-10 bg-white dark:bg-zinc-950 flex items-center justify-center">
                  <img
                    src="logo-icon.png"
                    alt="Vignette Brand Logo"
                    className="w-full h-full object-contain p-4 sm:p-6 select-none pointer-events-none"
                    draggable="false"
                  />
                </div>

                {/* Floating Badge 1: 5+ Years Experience */}
                <div className="absolute -left-2 sm:-left-6 top-[15%] px-3.5 py-2 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-300">
                  <span className="font-brand font-black text-sm sm:text-base text-brand-lightRed dark:text-brand-darkGold">
                    <CountUp end={5} suffix="+" />
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="font-brand font-extrabold text-[9px] sm:text-[10px] text-zinc-950 dark:text-white uppercase tracking-wider">Years</span>
                    <span className="font-body text-[7px] sm:text-[8px] text-zinc-500 uppercase tracking-widest mt-0.5">Experience</span>
                  </div>
                </div>

                {/* Floating Badge 2: 200+ Videos */}
                <div className="absolute -right-2 sm:-right-6 top-[35%] px-3.5 py-2 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-300">
                  <span className="font-brand font-black text-sm sm:text-base text-brand-lightRed dark:text-brand-darkGold">
                    <CountUp end={200} suffix="+" />
                  </span>
                  <span className="font-brand font-extrabold text-[9px] sm:text-[10px] text-zinc-950 dark:text-white uppercase tracking-wider leading-none">Videos</span>
                </div>

                {/* Floating Badge 3: 2.1K Followers */}
                <div className="absolute left-[10%] bottom-[5%] px-3.5 py-2 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg flex items-center gap-2 z-20 hover:scale-105 transition-transform duration-300">
                  <span className="font-brand font-black text-sm sm:text-base text-brand-lightRed dark:text-brand-darkGold">
                    <CountUp end={2.1} suffix="K+" />
                  </span>
                  <span className="font-brand font-extrabold text-[9px] sm:text-[10px] text-zinc-950 dark:text-white uppercase tracking-wider leading-none">Followers</span>
                </div>

                {/* Curved Ribbon Tag Line at Bottom */}
                <div className="absolute bottom-[-14px] sm:bottom-[-16px] left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-brand-lightRed to-brand-lightOrange dark:from-brand-darkGold dark:to-brand-darkYellow rounded-full shadow-xl text-[9px] sm:text-[10px] font-brand font-extrabold uppercase tracking-widest text-white dark:text-black whitespace-nowrap z-20 select-none">
                  Telling Stories One Frame At A Time
                </div>

              </div>
            </div>
          </section>
        </div>

        {/* 2.6. GALLERY SECTION */}
        <section id="gallery" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
                At a Glance
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

            {/* Gallery Cards Masonry/Grid */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 px-2 sm:px-4">
              {filteredGallery.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(idx)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 select-none"
                >
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                    draggable="false"
                    loading="lazy"
                  />
                  {/* Frosted Metadata Strip bottom */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 dark:bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
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
                  <div className="mt-5 text-center px-4">
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

        {/* 2.7. VIDEOS / REELS SECTION */}
        <section id="videos" className="bg-[#f5f5dd] dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient">
                Our Highlights
              </h2>
            <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed px-4 transition-colors">
              Short, snappy snippets with premium edit pacing. Hover on desktops to preview, click to open full cinematic player.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="reveal grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 px-2 sm:px-4">
            {videos.map((vid, idx) => (
              <div
                key={vid.id}
                onClick={() => {
                  setVideoModalUrl(vid.media_url);
                  setVideoModalPoster(vid.thumbnail_url);
                }}
                onMouseEnter={() => handleVideoHoverStart(idx, vid.media_url)}
                onMouseLeave={() => handleVideoHoverEnd(idx)}
                className="relative flex flex-col bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-lg group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 select-none"
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
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl scale-95 group-hover:scale-110 transition-transform duration-300">
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
                    <Video className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Open Reels Preview
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
          </div>
        </section>

        {/* 2.8. EDITING SHOWCASE SECTION */}
        <section id="editing" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {/* 2.9. VISION & MANIFESTO SECTION */}
        <section id="vision" className="bg-[#f5f5dd] dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    From dynamic Instagram edits to dedicated aviation deep-dives and cinematic project consultancies, this portfolio serves as the flight deck for all my creative runs. We are heading towards richer visuals, deeper storytelling, and a strictly premium visual standard.
                  </p>
                </div>
              </div>

              {/* Right Pull-quote Graphic Column */}
              <div className="reveal lg:col-span-5 flex flex-col justify-center">
                <div className="relative p-8 md:p-12 rounded-2xl bg-white dark:bg-zinc-900/40 backdrop-blur-sm border border-brand-lightRed/20 dark:border-brand-darkGold/20 shadow-xl">
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
                        className="w-full h-full object-contain p-1 select-none pointer-events-none"
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
          </div>
        </section>

        {/* 2.9.5. HERO VIDEO SHOWCASE */}
        <section className="py-10 sm:py-14 flex flex-col items-center justify-center select-none">
          <div className="max-w-4xl w-full px-4">
            <div
              className="relative rounded-[20px] overflow-hidden shadow-xl bg-black cursor-pointer"
              onClick={toggleHeroPlay}
            >
              <video
                ref={heroVideoRef}
                src="hero.mp4"
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
        <section id="hire" className="bg-white dark:bg-transparent py-24 sm:py-32 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4">

            {/* Context Left Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="reveal font-heading font-extrabold text-xs tracking-widest text-[#c0392b] dark:text-[#FFD700] uppercase mb-3">
                Let's Collaborate
              </span>
              <h2 className="reveal font-heading font-black text-4xl sm:text-5xl text-gradient leading-tight">
                Hire for your work
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
              <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#f5f5dd] dark:bg-zinc-900/60 backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-2xl">

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
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Select</option>
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
                          disabled={formSubmitting}
                          required
                          minLength={2}
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
                          disabled={formSubmitting}
                          required
                          minLength={2}
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
                        minLength={30}
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

      </main>

      {/* 2.11. FOOTER SECTION */}
      <footer className="border-t-[0.5px] border-black/50 py-16 select-none bg-[#f5f5dd] dark:bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          
          {/* Main Footer columns row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Logo Name & Brand Info (Col span 3) */}
            <div className="md:col-span-3 flex flex-col gap-4">
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
                  Vignette
                </span>
              </div>
              <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed text-justify">
                Cinematic visual storytelling. Capturing terminals, summits, and streetscapes with bespoke pacing and premium color grading.
              </p>
            </div>

            {/* Legal Links (Col span 3) */}
            <div className="md:col-span-3 flex flex-col gap-4 md:border-l border-zinc-200 dark:border-zinc-850 md:pl-8">
              <h4 className="font-heading font-black text-sm text-[#c0392b] dark:text-[#FFD700] uppercase tracking-wider">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 font-body text-xs text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="/terms" className="hover:text-[#c0392b] dark:hover:text-[#FFD700] transition-colors">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-[#c0392b] dark:hover:text-[#FFD700] transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details (Col span 3) */}
            <div className="md:col-span-3 flex flex-col gap-4 md:border-l border-zinc-200 dark:border-zinc-850 md:pl-8">
              <h4 className="font-heading font-black text-sm text-[#c0392b] dark:text-[#FFD700] uppercase tracking-wider">
                Contact Details
              </h4>
              <ul className="flex flex-col gap-3.5 font-body text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c0392b] dark:text-[#FFD700] flex-shrink-0" />
                  <a href="tel:+918258814126" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    +91 8258814126
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c0392b] dark:text-[#FFD700] flex-shrink-0" />
                  <a href="mailto:vignetteworks.official@gmail.com" className="hover:text-zinc-950 dark:hover:text-white transition-colors break-all">
                    vignetteworks.official@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Address (Col span 3) */}
            <div className="md:col-span-3 flex flex-col gap-4 md:border-l border-zinc-200 dark:border-zinc-850 md:pl-8">
              <h4 className="font-heading font-black text-sm text-[#c0392b] dark:text-[#FFD700] uppercase tracking-wider">
                Address
              </h4>
              <p className="flex items-start gap-3 font-body text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                <MapPin className="w-4 h-4 text-[#c0392b] dark:text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span>Ramnagar, Agartala, West Tripura District, Tripura - 799002</span>
              </p>
            </div>

          </div>

          {/* Social Media & Divider Line */}
          <div className="flex flex-col items-center gap-6 mt-4">
            
            {/* Social Icons Row */}
            <div className="flex gap-5 items-center justify-center">
              
              {/* Instagram: Real Pink-to-Purple brand gradient */}
              <a
                href="https://www.instagram.com/proy____"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
                aria-label="Visit proy___ on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* Threads: Real brand logo black/white */}
              <a
                href="https://www.threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-md border border-zinc-200 dark:border-zinc-800"
                aria-label="Visit Threads"
              >
                <ThreadsIcon className="w-5 h-5" />
              </a>

              {/* Facebook: Real brand blue */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
                aria-label="Visit Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>

            </div>

            {/* Bottom mini divider */}
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800 my-2" />

            {/* Copyright Metadata */}
            <div className="text-center font-body text-xs text-zinc-500 dark:text-zinc-500">
              <p>© {new Date().getFullYear()} Vignette. All rights reserved | Made by Vignette</p>
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
                        required
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lightOrange/30 dark:focus:ring-brand-darkGold/30 focus:border-brand-lightOrange dark:focus:border-brand-darkGold transition-all font-body appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select</option>
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

    </div>
  );
}
