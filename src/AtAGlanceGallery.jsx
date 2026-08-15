import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Sliders, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from './supabase';

// Robust mock data fallbacks for when Supabase is not connected
const MOCK_GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Wandering Through Tokyo',
    category: 'Travel',
    media_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Alps Sunrise Expedition',
    category: 'Travel',
    media_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Urban Coffee Culture',
    category: 'Lifestyle',
    media_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Golden Hour Rooftop',
    category: 'Lifestyle',
    media_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'B777 Heavy Takeoff',
    category: 'Avgeek',
    media_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Cockpit View Approach',
    category: 'Avgeek',
    media_url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'The Silent Wanderer',
    category: 'Storytelling',
    media_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    title: 'Cinematic Shadows',
    category: 'Storytelling',
    media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  }
];

export default function AtAGlanceGallery({ onImageClick }) {
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const accordionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(min-width: 768px)');
    setIsDesktop(media.matches);
    const listener = (e) => setIsDesktop(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    setIsExpanded(false);
    async function fetchGallery() {
      setLoading(true);

      if (!supabase) {
        applyMockData();
        return;
      }

      try {
        let query = supabase
          .from('gallery_items')
          .select('*');

        if (activeTab !== 'All') {
          query = query.eq('category', activeTab);
        }

        const { data, error } = await query.order('id', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setItems(data);
        } else {
          applyMockData();
        }
      } catch (err) {
        console.warn('[AtAGlanceGallery Debug] Supabase fetch failed:', err.message);
        applyMockData();
      } finally {
        setLoading(false);
      }
    }

    function applyMockData() {
      const filtered = activeTab === 'All'
        ? MOCK_GALLERY_ITEMS
        : MOCK_GALLERY_ITEMS.filter(
            (item) => item.category.toLowerCase() === activeTab.toLowerCase()
          );
      setItems(filtered);
      setLoading(false);
    }

    fetchGallery();
  }, [activeTab]);

  const categories = ['All', 'Travel', 'Lifestyle', 'Avgeek', 'Storytelling'];
  const firstRowItems = activeTab === 'All'
    ? items.slice(0, isDesktop ? 4 : 2)
    : items;

  const remainingItems = activeTab === 'All'
    ? items.slice(isDesktop ? 4 : 2)
    : [];

  return (
    <section id="gallery" className="bg-[#FFFFF5] dark:bg-transparent py-24 sm:py-32 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal reveal-blur font-heading font-black text-4xl sm:text-5xl text-gradient">
            At a Glance
          </h2>
          <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed transition-colors">
            Freezing time across terminals, peaks, and street corners. Discover visual stories filtered by category.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="reveal reveal-left flex flex-wrap justify-center gap-2.5 mb-12 select-none">
          {categories.map((category) => {
            const isActive = activeTab.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2.5 rounded-full font-brand font-extrabold text-xs transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'pill-gradient-black-red text-white dark:!bg-[#ffec4e] dark:!text-black shadow-md'
                    : 'bg-white hover:bg-zinc-50 border border-zinc-200 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* First Row (Always Visible) */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
              {firstRowItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onImageClick && onImageClick(idx, items)}
                  className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out select-none"
                >
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-all duration-500 ease-out"
                    draggable="false"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay & Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity duration-300">
                    <span className="font-brand font-extrabold text-[8px] sm:text-[10px] uppercase tracking-wider text-brand-darkGold dark:text-[#ffec4e] mb-1">
                      {item.category}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-black text-xs sm:text-sm text-white leading-tight">
                        {item.title}
                      </h3>
                      <Maximize2 className="w-3.5 h-3.5 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Wrapper (Exact Height Accordion transition) */}
            {activeTab === 'All' && remainingItems.length > 0 && (
              <div
                ref={accordionRef}
                className="overflow-hidden transition-[height,opacity] duration-500 ease-in-out transform-gpu"
                style={{
                  height: isExpanded ? `${accordionRef.current?.scrollHeight || 500}px` : '0px',
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? '1.5rem' : '0px',
                  pointerEvents: isExpanded ? 'auto' : 'none',
                  willChange: 'height, opacity'
                }}
              >
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 pb-2">
                  {remainingItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => onImageClick && onImageClick(firstRowItems.length + idx, items)}
                      className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out select-none"
                    >
                      <img
                        src={item.media_url}
                        alt={item.title}
                        className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-all duration-500 ease-out"
                        draggable="false"
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay & Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity duration-300">
                        <span className="font-brand font-extrabold text-[8px] sm:text-[10px] uppercase tracking-wider text-brand-darkGold dark:text-[#ffec4e] mb-1">
                          {item.category}
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-heading font-black text-xs sm:text-sm text-white leading-tight">
                            {item.title}
                          </h3>
                          <Maximize2 className="w-3.5 h-3.5 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Expand Button (Only for "All" tab and if there are more items than fits on screen) */}
        {activeTab === 'All' && items.length > (isDesktop ? 4 : 2) && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 hover:border-zinc-800 dark:border-zinc-800 dark:hover:border-zinc-400 bg-white hover:bg-zinc-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 font-brand font-extrabold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
            >
              <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
