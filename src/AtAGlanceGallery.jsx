import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from './supabase';

const SUPABASE_STORAGE_BASE = 'https://xcadpkytilyqanpatfls.supabase.co/storage/v1/object/public/gallery';

function getCanonicalImageUrl(item) {
  if (!item) return '/at-glance-img/travel-1.jpg';
  if (item.fallback_url) return item.fallback_url;
  const name = `${item.title || ''} ${item.media_url || ''}`.toLowerCase();
  if (name.includes('avgeek1') || name.includes('avgeek-1')) return '/at-glance-img/avgeek-1.jpg';
  if (name.includes('avgeek2') || name.includes('avgeek-2')) return '/at-glance-img/avgeek-2.jpg';
  if (name.includes('avgeek3') || name.includes('avgeek-3')) return '/at-glance-img/avgeek-3.jpg';
  if (name.includes('avgeek4') || name.includes('avgeek-4')) return '/at-glance-img/avgeek-4.jpg';
  if (name.includes('festival') || name.includes('festival-1') || name.includes('festival1')) return '/at-glance-img/festival-1.jpg';
  if (name.includes('lifestyle1') || name.includes('lifestyle-1')) return '/at-glance-img/lifestyle-1.jpg';
  if (name.includes('lifestyle2') || name.includes('lifestyle-2')) return '/at-glance-img/lifestyle-2.jpg';
  if (name.includes('lifestyle3') || name.includes('lifestyle-3')) return '/at-glance-img/lifestyle-3.jpg';
  if (name.includes('lifestyle4') || name.includes('lifestyle-4')) return '/at-glance-img/lifestyle-4.jpg';
  if (name.includes('storytelling2') || name.includes('storytelling-2')) return '/at-glance-img/storytelling-2.jpg';
  if (name.includes('storytelling') || name.includes('storytelling1') || name.includes('storytelling-1') || name.includes('storytelling3')) return '/at-glance-img/storytelling-1.jpg';
  if (name.includes('travel1') || name.includes('travel-1')) return '/at-glance-img/travel-1.jpg';
  return '/at-glance-img/travel-1.jpg';
}

function getLocalFallbackUrl(item) {
  return getCanonicalImageUrl(item);
}

const IMPRESSION_ORDER = [
  '/at-glance-img/avgeek-2.jpg',
  '/at-glance-img/lifestyle-1.jpg',
  '/at-glance-img/lifestyle-4.jpg',
  '/at-glance-img/festival-1.jpg',
  '/at-glance-img/avgeek-1.jpg',
  '/at-glance-img/avgeek-3.jpg',
  '/at-glance-img/avgeek-4.jpg',
  '/at-glance-img/lifestyle-2.jpg',
  '/at-glance-img/lifestyle-3.jpg',
  '/at-glance-img/storytelling-1.jpg',
  '/at-glance-img/storytelling-2.jpg',
  '/at-glance-img/travel-1.jpg',
];

function getFirstImpressionPriorityIndex(item) {
  if (!item) return 999;
  const canonical = getCanonicalImageUrl(item);
  const idx = IMPRESSION_ORDER.indexOf(canonical);
  return idx !== -1 ? idx : 999;
}

function sortForFirstImpression(list) {
  if (!list || list.length === 0) return list;
  return [...list].sort((a, b) => {
    const pA = getFirstImpressionPriorityIndex(a);
    const pB = getFirstImpressionPriorityIndex(b);
    return pA - pB;
  });
}

const MOCK_GALLERY_ITEMS = [
  { id: 2, title: 'avgeek2', category: 'Avgeek', media_url: `${SUPABASE_STORAGE_BASE}/avgeek-2.jpg`, fallback_url: '/at-glance-img/avgeek-2.jpg' },
  { id: 5, title: 'lifestyle1', category: 'Lifestyle', media_url: `${SUPABASE_STORAGE_BASE}/lifestyle-1.jpg`, fallback_url: '/at-glance-img/lifestyle-1.jpg' },
  { id: 8, title: 'lifestyle4', category: 'Lifestyle', media_url: `${SUPABASE_STORAGE_BASE}/lifestyle-4.jpg`, fallback_url: '/at-glance-img/lifestyle-4.jpg' },
  { id: 11, title: 'festival1', category: 'Festivals', media_url: `${SUPABASE_STORAGE_BASE}/festival-1.jpg`, fallback_url: '/at-glance-img/festival-1.jpg' },
  { id: 1, title: 'avgeek1', category: 'Avgeek', media_url: `${SUPABASE_STORAGE_BASE}/avgeek-1.jpg`, fallback_url: '/at-glance-img/avgeek-1.jpg' },
  { id: 3, title: 'avgeek3', category: 'Avgeek', media_url: `${SUPABASE_STORAGE_BASE}/avgeek-3.jpg`, fallback_url: '/at-glance-img/avgeek-3.jpg' },
  { id: 4, title: 'avgeek4', category: 'Avgeek', media_url: `${SUPABASE_STORAGE_BASE}/avgeek-4.jpg`, fallback_url: '/at-glance-img/avgeek-4.jpg' },
  { id: 6, title: 'lifestyle2', category: 'Lifestyle', media_url: `${SUPABASE_STORAGE_BASE}/lifestyle-2.jpg`, fallback_url: '/at-glance-img/lifestyle-2.jpg' },
  { id: 7, title: 'lifestyle3', category: 'Lifestyle', media_url: `${SUPABASE_STORAGE_BASE}/lifestyle-3.jpg`, fallback_url: '/at-glance-img/lifestyle-3.jpg' },
  { id: 9, title: 'storytelling1', category: 'Storytelling', media_url: `${SUPABASE_STORAGE_BASE}/storytelling-1.jpg`, fallback_url: '/at-glance-img/storytelling-1.jpg' },
  { id: 10, title: 'storytelling2', category: 'Storytelling', media_url: `${SUPABASE_STORAGE_BASE}/storytelling-2.jpg`, fallback_url: '/at-glance-img/storytelling-2.jpg' },
  { id: 12, title: 'travel1', category: 'Travel', media_url: `${SUPABASE_STORAGE_BASE}/travel-1.jpg`, fallback_url: '/at-glance-img/travel-1.jpg' },
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
          const mapped = data.map(item => ({
            ...item,
            fallback_url: getCanonicalImageUrl(item)
          }));
          const uniqueItems = [];
          const seen = new Set();
          for (const item of mapped) {
            const key = getCanonicalImageUrl(item);
            if (!seen.has(key)) {
              seen.add(key);
              uniqueItems.push(item);
            }
          }
          // Ensure all 12 distinct images (or category items) exist if missing from database query
          const targetMocks = activeTab === 'All'
            ? MOCK_GALLERY_ITEMS
            : MOCK_GALLERY_ITEMS.filter(m => m.category.toLowerCase() === activeTab.toLowerCase());

          for (const mockItem of targetMocks) {
            const key = getCanonicalImageUrl(mockItem);
            if (!seen.has(key)) {
              seen.add(key);
              uniqueItems.push(mockItem);
            }
          }
          const finalItems = activeTab === 'All' ? sortForFirstImpression(uniqueItems) : uniqueItems;
          setItems(finalItems);
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
      const uniqueItems = [];
      const seen = new Set();
      for (const item of filtered) {
        const key = getCanonicalImageUrl(item);
        if (!seen.has(key)) {
          seen.add(key);
          uniqueItems.push(item);
        }
      }
      const finalItems = activeTab === 'All' ? sortForFirstImpression(uniqueItems) : uniqueItems;
      setItems(finalItems);
      setLoading(false);
    }

    fetchGallery();
  }, [activeTab]);

  const categories = ['All', 'Travel', 'Lifestyle', 'Avgeek', 'Storytelling', 'Festivals'];
  const firstRowItems = activeTab === 'All'
    ? items.slice(0, isDesktop ? 4 : 2)
    : items;

  const remainingItems = activeTab === 'All'
    ? items.slice(isDesktop ? 4 : 2)
    : [];

  return (
    <section id="gallery" className="bg-[#f5f5dd] dark:bg-transparent py-10 sm:py-24 md:py-32 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="reveal reveal-blur font-heading font-bold text-4xl sm:text-5xl text-gradient">
            At a Glance
          </h2>
          <p className="reveal font-body text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed transition-colors">
            Freezing time across terminals, peaks, and street corners. Discover visual stories filtered by category.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="reveal reveal-left hidden sm:flex flex-wrap justify-center gap-2.5 mb-12 select-none">
          {categories.map((category) => {
            const isActive = activeTab.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2.5 rounded-full font-['Mulish',sans-serif] font-normal text-xs transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'pill-gradient-black-red text-white dark:!bg-[#ffec4e] dark:!text-black shadow-md'
                    : 'bg-white hover:bg-zinc-50 border border-zinc-200 dark:bg-[#353935] dark:hover:bg-[#404440] dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200'
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
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400 font-body text-sm sm:text-base border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
            No gallery items found.
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
                    onError={(e) => {
                      const fallback = getLocalFallbackUrl(item);
                      if (fallback && !e.currentTarget.src.endsWith(fallback)) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-all duration-500 ease-out"
                    draggable="false"
                    loading="lazy"
                  />
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
                        onError={(e) => {
                          const fallback = getLocalFallbackUrl(item);
                          if (fallback && !e.currentTarget.src.endsWith(fallback)) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                        className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-all duration-500 ease-out"
                        draggable="false"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Expand Button (Only for "All" tab and if there are more items than fits on screen) */}
        {activeTab === 'All' && items.length > (isDesktop ? 4 : 2) && (
          <div className="flex justify-center mt-6 sm:mt-12">
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
