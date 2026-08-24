import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabase';
import { X, LogOut, Upload, Image, Video, User, Calendar, Plane, Globe, AlertCircle, CheckCircle, ShieldCheck, Download, Trash2, ChevronLeft, ChevronRight, Layers, Volume2, VolumeX, Smile, MoreHorizontal, Megaphone, Send, TriangleAlert, MapPin, Phone, Mail, Radar, Edit, AlertTriangle, HelpCircle } from 'lucide-react';

const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

const Facebook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const EMOJI_CATEGORIES = {
  smileys: {
    icon: '😃',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
      '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
      '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
      '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️'
    ]
  },
  animals: {
    icon: '🐻',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦅',
      '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌',
      '🐞', '🐜', '🕷️', '🐢', '🐍', '🐙', '🐠', '🐬', '🐳', '🦖'
    ]
  },
  food: {
    icon: '🍔',
    emojis: [
      '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒',
      '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🌽',
      '🥕', '🥔', '🥐', '🍞', '🍕', '🍟', '🍔', '🌭', '🥪', '🌮',
      '🍿', '🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '☕', '🍺'
    ]
  },
  travel: {
    icon: '✈️',
    emojis: [
      '✈️', '🛫', '🛬', '🚀', '🚁', '⛵', '🚢', '🛸', '🚗', '🚕',
      '🚙', '🚌', '🏎️', '🚓', '🚒', '🚚', '🚲', '🛴', '🏍️', '🚨',
      '🚇', '🗺️', '🧭', '🏔️', '🌋', '⛺', '🏖️', '🏝️', '🏙️', '🌇',
      '🌅', '🌃', '🌉', '🎆', '🎈', '🎉', '🎊', '🎀', '🎁', '🏰'
    ]
  },
  activities: {
    icon: '⚽',
    emojis: [
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🎱', '🏓',
      '🏸', '🏒', '🎯', '⛳', '🎿', '🏂', '🏄', '🏊', '🏋️', '🚴',
      '🤸', '🤼', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🎸',
      '🎮', '🕹️', '👾', '🎰', '🎲', '🎳', '🧗', '🛹', '🛶', '🏆'
    ]
  },
  objects: {
    icon: '💡',
    emojis: [
      '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '💾', '💿', '📀',
      '📸', '📷', '📹', '🎥', '📽️', '📺', '📻', '🎙️', '🎚️', '🎛️',
      '🔍', '🔎', '💡', '🔦', '🏮', '📔', '📕', '📖', '📚', '✉️',
      '📮', '✏️', '✒️', '✂️', '🔑', '🗝️', '🔨', '🪓', '🛡️', '💣'
    ]
  },
  symbols: {
    icon: '🔣',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
      '✝️', '☪️', '🕉️', '☸️', '✡️', '🕎', '☯️', '⛎', '♈', '♉',
      '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'
    ]
  }
};

export default function AvgeekConnect({ isOpen, onClose }) {
  const fileInputRef = useRef(null);

  // Core States
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedTab, setFeedTab] = useState('all'); // 'all' | 'community' | 'official'

  const [uploadFiles, setUploadFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: string }

  // Demo Login Form (for offline development fallback)
  const [demoEmail, setDemoEmail] = useState('');
  const [showDemoLogin, setShowDemoLogin] = useState(false);

  const [username, setUsername] = useState('');
  const [needUsername, setNeedUsername] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Legal Modal States
  const [legalModal, setLegalModal] = useState(null);
  const [activeLegalTab, setActiveLegalTab] = useState('terms');

  // Instagram grid interactions
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVideoMuted, setIsModalVideoMuted] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editCaptionText, setEditCaptionText] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(null); // Custom modal confirm state
  const [likesModalPostId, setLikesModalPostId] = useState(null); // Active post ID for showing likes modal
  const [commentsMap, setCommentsMap] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_comments') || '{}');
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeEmojiTab, setActiveEmojiTab] = useState('smileys');
  const [activePostMenuId, setActivePostMenuId] = useState(null);
  const [activeCommentMenuId, setActiveCommentMenuId] = useState(null);
  const emojiPickerRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e, mediaList) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (diff > 50) {
      setActiveSlideIndex(prev => prev < mediaList.length - 1 ? prev + 1 : 0);
    } else if (diff < -50) {
      setActiveSlideIndex(prev => prev > 0 ? prev - 1 : mediaList.length - 1);
    }
    touchStartRef.current = null;
  };
  const [likedPosts, setLikedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_liked_posts') || '[]');
  });
  const [likesMap, setLikesMap] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_likes_map') || '{}');
  });
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [activeUploadPreview, setActiveUploadPreview] = useState(null);
  const [showPrintBlocked, setShowPrintBlocked] = useState(false);

  const handleBulkDelete = () => {
    if (selectedPostIds.length === 0) return;
    setConfirmDialog({
      title: "Delete Selected Posts",
      message: `Warning: Are you sure you want to permanently delete all ${selectedPostIds.length} selected posts? This action will permanently delete these items and their media files from the Supabase database and storage.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      isDanger: true,
      onConfirm: async () => {
        try {
          // 1. Gather all file paths from the selected posts to delete from storage
          const selectedPosts = posts.filter(post => selectedPostIds.includes(post.id));
          const filePathsToDelete = [];
          
          selectedPosts.forEach(post => {
            const mediaList = getPostMediaList(post.media_url);
            mediaList.forEach(url => {
              const parts = url.split('/community-media/');
              if (parts.length > 1) {
                filePathsToDelete.push(parts[1]);
              }
            });
          });

          if (supabase) {
            // 2. Delete files from storage
            if (filePathsToDelete.length > 0) {
              try {
                await supabase.storage.from('community-media').remove(filePathsToDelete);
              } catch (storageErr) {
                console.error('Failed to bulk delete files from storage:', storageErr);
              }
            }

            // 3. Delete database records
            const { error } = await supabase
              .from('community_posts')
              .delete()
              .in('id', selectedPostIds);
            if (error) throw error;
          }

          // Delete from LocalStorage fallback
          const localData = JSON.parse(localStorage.getItem('avgeek_local_posts') || '[]');
          const updatedLocal = localData.filter(post => !selectedPostIds.includes(post.id));
          localStorage.setItem('avgeek_local_posts', JSON.stringify(updatedLocal));

          // Clean up local comments and likes maps for each deleted post
          const newComments = { ...commentsMap };
          const newLikes = { ...likesMap };
          selectedPostIds.forEach(id => {
            delete newComments[id];
            delete newLikes[id];
          });
          setCommentsMap(newComments);
          setLikesMap(newLikes);
          localStorage.setItem('avgeek_comments', JSON.stringify(newComments));
          localStorage.setItem('avgeek_likes_map', JSON.stringify(newLikes));

          setPosts(prev => prev.filter(post => !selectedPostIds.includes(post.id)));
          setSelectedPostIds([]);
          setStatusMessage({ type: 'success', text: 'Selected posts and their media files permanently deleted.' });
        } catch (err) {
          console.error('Bulk delete failed:', err);
          setStatusMessage({ type: 'error', text: 'Failed to delete selected posts.' });
        }
      }
    });
  };

  // Live Updates States
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [newUpdateText, setNewUpdateText] = useState('');
  const [updatesLoading, setUpdatesLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Content Protection Toast
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    setActiveSlideIndex(0);
    setIsEditingCaption(false);
    setEditCaptionText('');
  }, [selectedPost]);

  // Handle keyboard ArrowLeft and ArrowRight navigation across posts
  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (e) => {
      if (window.innerWidth < 1024) return;

      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      const filteredPosts = posts.filter(post => {
        if (feedTab === 'community') {
          return post.email !== 'vignetteworks.official@gmail.com';
        }
        if (feedTab === 'official') {
          return post.email === 'vignetteworks.official@gmail.com';
        }
        return true;
      });

      if (filteredPosts.length <= 1) return;

      const currentIndex = filteredPosts.findIndex(p => p.id === selectedPost.id);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < filteredPosts.length - 1) {
          setSelectedPost(filteredPosts[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedPost(filteredPosts[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, posts, feedTab]);

  // Handle blocking of Ctrl+P / Cmd+P print triggers
  useEffect(() => {
    const handlePrintKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setShowPrintBlocked(true);
      }
    };
    window.addEventListener('keydown', handlePrintKey);
    return () => {
      window.removeEventListener('keydown', handlePrintKey);
    };
  }, []);

  // Click outside to close emoji picker, post menu, or comment menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
      if (!e.target.closest('.post-menu-trigger') && !e.target.closest('.post-menu-dropdown')) {
        setActivePostMenuId(null);
      }
      if (!e.target.closest('.comment-menu-trigger') && !e.target.closest('.comment-menu-dropdown')) {
        setActiveCommentMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showEmojiPicker]);

  // Synchronize carousel video playback on slide / post focus change
  useEffect(() => {
    if (carouselRef.current) {
      const videos = carouselRef.current.querySelectorAll('video');
      videos.forEach((video, idx) => {
        if (idx === activeSlideIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }
  }, [activeSlideIndex, selectedPost]);

  // Auto-dismiss status message after 3 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Synchronize uploading state with global window object and warn on unload
  useEffect(() => {
    window.isAvgeekUploading = uploading;
    const handleBeforeUnload = (e) => {
      if (uploading) {
        e.preventDefault();
        e.returnValue = 'A media upload is in progress. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.isAvgeekUploading = false;
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [uploading]);

  // Content Protection & Custom Toast inside portal
  const showProtectionToast = (message) => {
    setToast({ show: true, message });
    if (window.avgeekToastTimeout) {
      clearTimeout(window.avgeekToastTimeout);
    }
    window.avgeekToastTimeout = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      showProtectionToast("Right-click is disabled");
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
        showProtectionToast("Copying content is disabled");
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
        showProtectionToast("Cutting content is disabled");
      }
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
        showProtectionToast("Dragging media is disabled");
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



  // 2. Supabase Auth State / Listener & Mock Fallbacks
  const handleUserSession = (currentSession) => {
    setSession(currentSession);
    if (currentSession) {
      const email = currentSession.user.email;
      const savedMap = JSON.parse(localStorage.getItem('avgeek_usernames') || '{}');
      const metaUsername = currentSession.user.user_metadata?.username;

      if (metaUsername) {
        setUsername(metaUsername);
        setNeedUsername(false);
      } else if (savedMap[email]) {
        setUsername(savedMap[email]);
        setNeedUsername(false);
      } else {
        setNeedUsername(true);
      }
    } else {
      setUsername('');
      setNeedUsername(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    if (supabase) {
      // Check existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        handleUserSession(session);
      });

      // Subscribe to updates
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        handleUserSession(session);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      checkMockSession();
    }
  }, [isOpen]);

  const checkMockSession = () => {
    const saved = localStorage.getItem('avgeek_mock_user');
    if (saved) {
      handleUserSession({
        user: {
          email: saved,
          id: 'mock-uuid-' + saved
        }
      });
    } else {
      handleUserSession(null);
    }
  };

  // Prevent background parent page scroll when AvgeekConnect portal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 3. Load Posts and Live Updates (Supabase or Local Storage fallback)
  useEffect(() => {
    if (!isOpen) return;
    fetchPosts();
    fetchLiveUpdates();
  }, [isOpen, session]);

  const handleRefreshRadar = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      fetchPosts().finally(() => {
        setIsRefreshing(false);
      });
    }, 1000);
  };

  const fetchPosts = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const newLikesMap = {};
        const newCommentsMap = {};
        const newLikedPosts = [];
        const userEmail = session?.user?.email;

        const parsedData = (data || []).map(post => {
          let parsedCaption = { text: post.caption, likes: [], comments: [] };
          if (post.caption && post.caption.startsWith('{')) {
            try {
              const parsed = JSON.parse(post.caption);
              if (parsed && typeof parsed === 'object') {
                parsedCaption = {
                  text: parsed.text || '',
                  likes: Array.isArray(parsed.likes) ? parsed.likes : [],
                  comments: Array.isArray(parsed.comments) ? parsed.comments : []
                };
              }
            } catch (e) {
              // Ignore
            }
          }

          newLikesMap[post.id] = parsedCaption.likes.length;
          newCommentsMap[post.id] = parsedCaption.comments;
          if (userEmail && parsedCaption.likes.includes(userEmail)) {
            newLikedPosts.push(post.id);
          }

          return post;
        });

        setPosts(parsedData);
        setLikesMap(newLikesMap);
        setCommentsMap(newCommentsMap);
        setLikedPosts(newLikedPosts);
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase query failed, falling back to Local Storage:', err.message);
        loadMockPosts();
      } finally {
        setLoading(false);
      }
    } else {
      loadMockPosts();
      setLoading(false);
    }
  };

  const fetchLiveUpdates = async () => {
    setUpdatesLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('live_updates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLiveUpdates(data || []);
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase live updates query failed, using localStorage:', err.message);
        loadMockUpdates();
      } finally {
        setUpdatesLoading(false);
      }
    } else {
      loadMockUpdates();
      setUpdatesLoading(false);
    }
  };

  const loadMockUpdates = () => {
    const saved = localStorage.getItem('avgeek_live_updates');
    if (saved) {
      try {
        setLiveUpdates(JSON.parse(saved));
      } catch {
        setLiveUpdates([]);
      }
    } else {
      const defaultUpdates = [
        {
          id: 'update-1',
          text: 'Vignette has planned to go for a planespotting session at IXA Airport (Agartala) on August 20th at 4:30 PM. Spotters can join near the ATC watchtower!',
          created_at: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 'update-2',
          text: 'Live airport updates: Spotting runway 18 visibility is clear. Lufthansa flight LH756 is expected to land 15 mins early.',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setLiveUpdates(defaultUpdates);
      localStorage.setItem('avgeek_live_updates', JSON.stringify(defaultUpdates));
    }
  };

  const handleAddLiveUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newUpdateText.trim()) return;

    const newUpdateItem = {
      text: newUpdateText.trim(),
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('live_updates')
          .insert([newUpdateItem])
          .select();

        if (error) throw error;
        setLiveUpdates(prev => [data[0], ...prev]);
        setNewUpdateText('');
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase live update insert failed, writing to localStorage fallback:', err.message);
        saveMockUpdate(newUpdateItem);
      }
    } else {
      saveMockUpdate(newUpdateItem);
    }
  };

  const saveMockUpdate = (item) => {
    const updated = [
      { id: 'mock-upd-' + Date.now(), ...item },
      ...liveUpdates
    ];
    setLiveUpdates(updated);
    localStorage.setItem('avgeek_live_updates', JSON.stringify(updated));
    setNewUpdateText('');
  };

  const handleDeleteLiveUpdate = async (id) => {
    if (supabase && typeof id === 'number') {
      try {
        const { error } = await supabase
          .from('live_updates')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setLiveUpdates(prev => prev.filter(upd => upd.id !== id));
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase live update delete failed, removing from local fallback:', err.message);
        deleteMockUpdate(id);
      }
    } else {
      deleteMockUpdate(id);
    }
  };

  const deleteMockUpdate = (id) => {
    const updated = liveUpdates.filter(upd => upd.id !== id);
    setLiveUpdates(updated);
    localStorage.setItem('avgeek_live_updates', JSON.stringify(updated));
  };

  const loadMockPosts = () => {
    const saved = localStorage.getItem('avgeek_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.filter(post => {
          try {
            const list = getPostMediaList(post.media_url);
            return !list.some(url => typeof url === 'string' && url.startsWith('blob:'));
          } catch (e) {
            return typeof post.media_url === 'string' && !post.media_url.startsWith('blob:');
          }
        });
        setPosts(cleaned);
      } catch (e) {
        setPosts([]);
      }
    } else {
      // Default high-quality mockup feeds
      const defaultFeeds = [
        {
          id: 'mock-1',
          email: 'captain.aviation@vignette.com',
          media_url: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80',
          caption: 'Visual lineup on runway 34R. The cockpit view at sunset is simply majestic. Ready for takeoff! ✈️🌅',
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'mock-2',
          email: 'airbus_spotter@avgeek.net',
          media_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
          caption: 'Twin GE90 engines roaring at full throttle! Capturing heavy takeoff coordinates from the fence line. 📸🔋',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      localStorage.setItem('avgeek_posts', JSON.stringify(defaultFeeds));
      setPosts(defaultFeeds);
    }
  };

  // Google OAuth Authentication
  const handleGoogleSignIn = async () => {
    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      } catch (err) {
        console.error('[aVgeek Connect] Auth Login Error:', err.message);
        setStatusMessage({ type: 'error', text: `Login failed: ${err.message}` });
      }
    } else {
      setStatusMessage({ type: 'error', text: 'Google authentication service is offline (Supabase client not initialized).' });
    }
  };

  // Demo Login Flow
  const handleDemoLoginSubmit = (e) => {
    e.preventDefault();
    if (!demoEmail.trim()) return;
    const email = demoEmail.trim();
    localStorage.setItem('avgeek_mock_user', email);
    handleUserSession({
      user: {
        email: email,
        id: 'mock-uuid-' + email
      }
    });
    setShowDemoLogin(false);
    setStatusMessage({ type: 'success', text: `Logged in as demo user: ${email}` });
  };

  // Username Registration Submission
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = regUsername.trim().toLowerCase();
    
    // 1. Minimum Length Validation
    if (cleanUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters.');
      return;
    }
    if (cleanUsername.length > 25) {
      setUsernameError('Username cannot exceed 25 characters.');
      return;
    }

    // 2. Format Validation (Instagram rules: a-z, 0-9, periods, underscores)
    const regex = /^[a-z0-9._]+$/;
    if (!regex.test(cleanUsername)) {
      setUsernameError('Only lowercase letters, numbers, periods, and underscores are allowed.');
      return;
    }

    // 3. Uniqueness Check
    const savedMap = JSON.parse(localStorage.getItem('avgeek_usernames') || '{}');
    const email = session.user.email;
    const isTaken = Object.entries(savedMap).some(([mapEmail, mapUser]) => {
      return mapEmail !== email && mapUser.toLowerCase() === cleanUsername;
    });

    if (isTaken) {
      setUsernameError('Username is already taken. Try another one.');
      return;
    }

    // 4. Save and Synchronize
    savedMap[email] = cleanUsername;
    localStorage.setItem('avgeek_usernames', JSON.stringify(savedMap));

    if (supabase) {
      try {
        await supabase.auth.updateUser({
          data: { username: cleanUsername }
        });
      } catch (err) {
        console.warn('[aVgeek Connect] Failed to update user metadata in Supabase:', err.message);
      }
    }

    setUsername(cleanUsername);
    setNeedUsername(false);
    setUsernameError('');
    setRegUsername('');
    setStatusMessage({ type: 'success', text: `Welcome to the crew, @${cleanUsername}!` });
  };

  const getCaptionText = (captionStr) => {
    if (!captionStr) return '';
    if (captionStr.startsWith('{')) {
      try {
        const parsed = JSON.parse(captionStr);
        if (parsed && typeof parsed === 'object') {
          return parsed.text || '';
        }
      } catch (e) {
        // Fallback
      }
    }
    return captionStr;
  };

  const truncateUsername = (name) => {
    if (!name) return '';
    if (name.length > 10) {
      return name.slice(0, 10) + '..';
    }
    return name;
  };

  const getPostLikesList = (postObj) => {
    if (!postObj) return [];
    let parsedCaption = { text: postObj.caption, likes: [], comments: [] };
    if (postObj.caption && postObj.caption.startsWith('{')) {
      try {
        const parsed = JSON.parse(postObj.caption);
        if (parsed && typeof parsed === 'object') {
          parsedCaption = {
            text: parsed.text || '',
            likes: Array.isArray(parsed.likes) ? parsed.likes : [],
            comments: Array.isArray(parsed.comments) ? parsed.comments : []
          };
        }
      } catch (e) {
        // Ignore
      }
    }
    return parsedCaption.likes;
  };

  const resolveEmailToUsername = useCallback((email) => {
    if (!email) return 'anonymous';
    if (email === 'vignetteworks.official@gmail.com') return 'vignette';
    
    // 1. Check local usernames map in LocalStorage
    const savedUsernames = JSON.parse(localStorage.getItem('avgeek_usernames') || '{}');
    if (savedUsernames[email]) {
      return savedUsernames[email];
    }
    
    // 2. Check comments map across all posts to see if they wrote a comment and have a username
    for (const postId in commentsMap) {
      const commentList = commentsMap[postId] || [];
      const foundComment = commentList.find(c => c.email === email);
      if (foundComment && foundComment.username) {
        return foundComment.username;
      }
    }
    
    // 3. Check existing posts to see if they made a post and have a username
    const foundPost = posts.find(p => p.email === email);
    if (foundPost && foundPost.username) {
      return foundPost.username;
    }
    
    // 4. Fallback to name before the @
    return email.split('@')[0];
  }, [posts, commentsMap]);

  const handleLikePost = (postId) => {
    let isLikedNow = false;
    let updatedLikedPosts;
    if (likedPosts.includes(postId)) {
      updatedLikedPosts = likedPosts.filter(id => id !== postId);
    } else {
      updatedLikedPosts = [...likedPosts, postId];
      isLikedNow = true;
    }
    setLikedPosts(updatedLikedPosts);
    localStorage.setItem('avgeek_liked_posts', JSON.stringify(updatedLikedPosts));

    // Update likesMap count
    const currentCount = likesMap[postId] || 0;
    const newCount = isLikedNow ? currentCount + 1 : Math.max(0, currentCount - 1);
    const updatedLikesMap = {
      ...likesMap,
      [postId]: newCount
    };
    setLikesMap(updatedLikesMap);
    localStorage.setItem('avgeek_likes_map', JSON.stringify(updatedLikesMap));

    // Persist to database
    const post = posts.find(p => p.id == postId);
    if (post && supabase) {
      let parsedCaption = { text: post.caption, likes: [], comments: [] };
      if (post.caption && post.caption.startsWith('{')) {
        try {
          const parsed = JSON.parse(post.caption);
          if (parsed && typeof parsed === 'object') {
            parsedCaption = {
              text: parsed.text || '',
              likes: Array.isArray(parsed.likes) ? parsed.likes : [],
              comments: Array.isArray(parsed.comments) ? parsed.comments : []
            };
          }
        } catch (e) {
          // Ignore
        }
      }

      const userEmail = session?.user?.email;
      if (userEmail) {
        let updatedLikesList = [...parsedCaption.likes];
        if (updatedLikesList.includes(userEmail)) {
          updatedLikesList = updatedLikesList.filter(email => email !== userEmail);
        } else {
          updatedLikesList.push(userEmail);
        }

        const updatedCaptionObj = {
          ...parsedCaption,
          likes: updatedLikesList
        };

        const updatedCaptionStr = JSON.stringify(updatedCaptionObj);

        // Optimistic local state update in posts array
        setPosts(prevPosts => prevPosts.map(p => {
          if (p.id === postId) {
            return { ...p, caption: updatedCaptionStr };
          }
          return p;
        }));

        supabase
          .from('community_posts')
          .update({ caption: updatedCaptionStr })
          .eq('id', postId)
          .then(({ error }) => {
            if (error) {
              console.error('[aVgeek Connect] Failed to update like in database:', error.message);
            }
          });
      }
    }
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (newCommentText.length > 1000) {
      setStatusMessage({ type: 'error', text: 'Comments cannot exceed 1000 characters.' });
      return;
    }

    const postComments = commentsMap[postId] || [];
    const newComment = {
      id: `comment-${Date.now()}`,
      username: username || 'anonymous',
      email: session?.user?.email || '',
      text: newCommentText.trim(),
      created_at: new Date().toISOString()
    };

    const updatedCommentsMap = {
      ...commentsMap,
      [postId]: [...postComments, newComment]
    };
    setCommentsMap(updatedCommentsMap);
    localStorage.setItem('avgeek_comments', JSON.stringify(updatedCommentsMap));

    // Persist to database
    const post = posts.find(p => p.id == postId);
    if (post && supabase) {
      let parsedCaption = { text: post.caption, likes: [], comments: [] };
      if (post.caption && post.caption.startsWith('{')) {
        try {
          const parsed = JSON.parse(post.caption);
          if (parsed && typeof parsed === 'object') {
            parsedCaption = {
              text: parsed.text || '',
              likes: Array.isArray(parsed.likes) ? parsed.likes : [],
              comments: Array.isArray(parsed.comments) ? parsed.comments : []
            };
          }
        } catch (err) {
          // Ignore
        }
      }

      const updatedCaptionObj = {
        ...parsedCaption,
        comments: [...parsedCaption.comments, newComment]
      };

      const updatedCaptionStr = JSON.stringify(updatedCaptionObj);

      // Optimistic local state update in posts array
      setPosts(prevPosts => prevPosts.map(p => {
        if (p.id === postId) {
          return { ...p, caption: updatedCaptionStr };
        }
        return p;
      }));

      supabase
        .from('community_posts')
        .update({ caption: updatedCaptionStr })
        .eq('id', postId)
        .then(({ error }) => {
          if (error) {
            console.error('[aVgeek Connect] Failed to update comment in database:', error.message);
          }
        });
    }

    setNewCommentText('');
  };

  const getMockComments = (postId) => {
    // Return empty by default as requested: no demo comments
    return [];
  };

  const getMockStats = (postId) => {
    if (!postId) return { likes: 0, commentsCount: 0, isLiked: false };
    const idStr = postId.toString();
    const idNum = Number(postId);
    const isLiked = likedPosts.includes(idNum) || likedPosts.includes(idStr);
    const likes = likesMap[idStr] || likesMap[idNum] || 0;

    // Count user's custom comments for this post
    const localComments = commentsMap[idStr] || commentsMap[idNum] || [];
    const commentsCount = localComments.length;

    return { likes, commentsCount, isLiked };
  };

  const renderAvatar = (email, username, sizeClass = "w-6 h-6") => {
    const isAdmin = email === 'vignetteworks.official@gmail.com' || username === 'vignetteworks.official' || username === 'vignette';
    const isLarge = sizeClass.includes("w-8");
    
    if (isAdmin) {
      return (
        <div className={`${sizeClass} rounded-full bg-white/10 border-2 border-[#ffec4e] flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_8px_rgba(255,236,78,0.2)]`}>
          <img src="logo-icon.png" alt="Admin Profile" className="w-full h-full object-cover p-1 bg-zinc-950" />
        </div>
      );
    } else {
      return (
        <div className={`${sizeClass} rounded-full bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shrink-0 shadow-inner`}>
          <img src="logo-icon.png" alt="Profile" className="w-full h-full object-cover p-1 bg-zinc-950" />
        </div>
      );
    }
  };

  const handleDeletePost = (postId) => {
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    // Enforce frontend security check
    const isAdmin = session?.user?.email === 'vignetteworks.official@gmail.com';
    const isCreator = session && (targetPost.user_id === session.user?.id || targetPost.email === session.user?.email);

    if (!isAdmin && !isCreator) {
      setConfirmDialog({
        title: "Permission Denied",
        message: "You can only delete your own posts.",
        confirmText: "OK",
        isAlert: true,
        isDanger: true,
        onConfirm: () => {}
      });
      return;
    }

    setConfirmDialog({
      title: "Delete Aviation Broadcast",
      message: "Are you sure you want to delete this aviation broadcast? This will permanently delete the post and its media files from the database and storage.",
      confirmText: "Delete",
      cancelText: "Cancel",
      isDanger: true,
      onConfirm: async () => {
        const isMock = String(postId).startsWith('mock-');
        if (supabase && !isMock) {
          try {
            // 1. Delete associated media files from storage bucket
            const mediaList = getPostMediaList(targetPost.media_url);
            const filePaths = mediaList
              .map(url => {
                const parts = url.split('/community-media/');
                return parts.length > 1 ? parts[1] : null;
              })
              .filter(Boolean);

            if (filePaths.length > 0) {
              await supabase.storage.from('community-media').remove(filePaths);
            }

            // 2. Delete database post record
            const { error } = await supabase
              .from('community_posts')
              .delete()
              .eq('id', postId);
            if (error) throw error;

            // 3. Update local state directly
            setPosts(prev => prev.filter(post => post.id !== postId));

            // 4. Clean up local comments and likes
            const newComments = { ...commentsMap };
            delete newComments[postId];
            setCommentsMap(newComments);
            localStorage.setItem('avgeek_comments', JSON.stringify(newComments));

            const newLikes = { ...likesMap };
            delete newLikes[postId];
            setLikesMap(newLikes);
            localStorage.setItem('avgeek_likes_map', JSON.stringify(newLikes));
          } catch (err) {
            console.warn('[aVgeek Connect] Supabase delete failed, falling back to Local Storage:', err.message);
          }
        } else {
          // Mock / Local storage deletion
          const saved = JSON.parse(localStorage.getItem('avgeek_posts') || '[]');
          const updated = saved.filter(post => post.id !== postId);
          localStorage.setItem('avgeek_posts', JSON.stringify(updated));
          setPosts(updated);

          const newComments = { ...commentsMap };
          delete newComments[postId];
          setCommentsMap(newComments);
          localStorage.setItem('avgeek_comments', JSON.stringify(newComments));

          const newLikes = { ...likesMap };
          delete newLikes[postId];
          setLikesMap(newLikes);
          localStorage.setItem('avgeek_likes_map', JSON.stringify(newLikes));
        }

        setSelectedPost(null);
        setStatusMessage({ type: 'success', text: 'Broadcast deleted successfully.' });
      }
    });
  };

  const handleSaveCaption = async (postId) => {
    const trimmed = editCaptionText.trim();
    if (!trimmed) {
      setConfirmDialog({
        title: "Validation Error",
        message: "Caption cannot be empty.",
        confirmText: "OK",
        isAlert: true,
        isDanger: true,
        onConfirm: () => {}
      });
      return;
    }

    try {
      const targetPost = posts.find(p => p.id === postId);
      if (!targetPost) return;

      let updatedCaptionStr = trimmed;
      if (targetPost.caption && targetPost.caption.startsWith('{')) {
        try {
          const parsed = JSON.parse(targetPost.caption);
          updatedCaptionStr = JSON.stringify({
            ...parsed,
            text: trimmed
          });
        } catch (_) {
          // fallback
        }
      } else {
        updatedCaptionStr = JSON.stringify({
          text: trimmed,
          likes: [],
          comments: []
        });
      }

      const isMock = String(postId).startsWith('mock-');
      if (supabase && !isMock) {
        const { error } = await supabase
          .from('community_posts')
          .update({ caption: updatedCaptionStr })
          .eq('id', postId);
        if (error) throw error;
      } else {
        const saved = JSON.parse(localStorage.getItem('avgeek_posts') || '[]');
        const updated = saved.map(p => p.id === postId ? { ...p, caption: updatedCaptionStr } : p);
        localStorage.setItem('avgeek_posts', JSON.stringify(updated));
      }

      setPosts(prev => prev.map(p => p.id === postId ? { ...p, caption: updatedCaptionStr } : p));
      setSelectedPost(prev => prev ? { ...prev, caption: updatedCaptionStr } : null);
      setIsEditingCaption(false);
      setStatusMessage({ type: 'success', text: 'Caption updated successfully.' });
    } catch (err) {
      console.error('Failed to save caption:', err);
      setStatusMessage({ type: 'error', text: 'Failed to update caption.' });
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    setConfirmDialog({
      title: "Delete Comment",
      message: "Are you sure you want to delete this comment?",
      confirmText: "Delete",
      cancelText: "Cancel",
      isDanger: true,
      onConfirm: () => {
        if (commentId.startsWith('mock-comm')) {
          const deletedMockIds = JSON.parse(localStorage.getItem('avgeek_deleted_comments') || '[]');
          deletedMockIds.push(commentId);
          localStorage.setItem('avgeek_deleted_comments', JSON.stringify(deletedMockIds));
        } else {
          const postComments = commentsMap[postId] || [];
          const updatedList = postComments.filter(c => c.id !== commentId);
          const updatedMap = {
            ...commentsMap,
            [postId]: updatedList
          };
          setCommentsMap(updatedMap);
          localStorage.setItem('avgeek_comments', JSON.stringify(updatedMap));

          // Persist to database
          const post = posts.find(p => p.id == postId);
          if (post && supabase) {
            let parsedCaption = { text: post.caption, likes: [], comments: [] };
            if (post.caption && post.caption.startsWith('{')) {
              try {
                const parsed = JSON.parse(post.caption);
                if (parsed && typeof parsed === 'object') {
                  parsedCaption = {
                    text: parsed.text || '',
                    likes: Array.isArray(parsed.likes) ? parsed.likes : [],
                    comments: Array.isArray(parsed.comments) ? parsed.comments : []
                  };
                }
              } catch (e) {
                // Ignore
              }
            }

            const updatedCaptionObj = {
              ...parsedCaption,
              comments: updatedList
            };

            const updatedCaptionStr = JSON.stringify(updatedCaptionObj);

            // Optimistic local state update in posts array
            setPosts(prevPosts => prevPosts.map(p => {
              if (p.id === postId) {
                return { ...p, caption: updatedCaptionStr };
              }
              return p;
            }));

            supabase
              .from('community_posts')
              .update({ caption: updatedCaptionStr })
              .eq('id', postId)
              .then(({ error }) => {
                if (error) {
                  console.error('[aVgeek Connect] Failed to delete comment from database:', error.message);
                }
              });
          }
        }
        
        // Trigger re-render of modal by creating a new reference
        setSelectedPost(prev => prev ? { ...prev } : null);
        setStatusMessage({ type: 'success', text: 'Comment deleted successfully.' });
      }
    });
  };

  const handleDownloadMedia = async (url, postId, isVideo) => {
    let ext = isVideo ? 'mp4' : 'jpg';
    try {
      const pathname = new URL(url).pathname;
      const parts = pathname.split('.');
      if (parts.length > 1) {
        const parsedExt = parts.pop().toLowerCase();
        if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm', 'ogg'].includes(parsedExt)) {
          ext = parsedExt;
        }
      }
    } catch (e) {}

    const numbers = String(postId).replace(/\D/g, '') || Date.now();
    const filename = `vignette-avgeek-image${numbers}.${ext}`;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  // Sign Out Flow
  const handleSignOut = () => {
    setConfirmDialog({
      title: "Sign Out",
      message: "Are you sure you want to sign out from aVgeek Connect?",
      confirmText: "Sign Out",
      cancelText: "Cancel",
      isDanger: false,
      onConfirm: async () => {
        if (supabase) {
          await supabase.auth.signOut();
        }
        localStorage.removeItem('avgeek_mock_user');
        setSession(null);
        setStatusMessage({ type: 'success', text: 'Signed out successfully.' });
        onClose();
        window.location.reload();
      }
    });
  };

  const handleClosePortal = () => {
    if (session) {
      setConfirmDialog({
        title: "Sign Out & Exit",
        message: "Are you sure you want to sign out and exit?",
        confirmText: "Sign Out & Exit",
        cancelText: "Cancel",
        isDanger: false,
        onConfirm: async () => {
          if (supabase) {
            await supabase.auth.signOut();
          }
          localStorage.removeItem('avgeek_mock_user');
          setSession(null);
          onClose();
          window.location.reload();
        }
      });
    } else {
      onClose();
    }
  };

  const processFiles = useCallback((filesList) => {
    const selected = Array.from(filesList || []);
    if (selected.length === 0) return;

    // Allowed extensions list (strictly media extensions)
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.mp4', '.mov', '.webm', '.avi', '.quicktime'];
    const invalidFiles = [];
    const warningFiles = [];
    const validFiles = [];

    selected.forEach(file => {
      const fileNameLower = file.name.toLowerCase();
      const hasAllowedExtension = allowedExtensions.some(ext => fileNameLower.endsWith(ext));
      
      const mime = file.type.toLowerCase();
      const isMediaMime = mime.startsWith('image/') || mime.startsWith('video/');
      const isExcludedMime = mime.includes('pdf') || mime.includes('text') || mime.includes('audio') || mime.includes('mp3');

      if (!hasAllowedExtension || !isMediaMime || isExcludedMime) {
        invalidFiles.push(file.name);
      } else {
        const isWarningExt = fileNameLower.endsWith('.heic') || fileNameLower.endsWith('.mov');
        if (isWarningExt) {
          warningFiles.push(file.name);
        }
        validFiles.push(file);
      }
    });

    // Helper to proceed with state updates
    const proceedWithValidFiles = (files) => {
      if (files.length === 0) return;
      setUploadFiles(prev => [...prev, ...files]);

      const newPreviews = files.map(file => {
        const isVid = file.type.startsWith('video/') || file.name.toLowerCase().endsWith('.mp4') || file.name.toLowerCase().endsWith('.mov') || file.name.toLowerCase().endsWith('.webm');
        return {
          url: URL.createObjectURL(file),
          type: isVid ? 'video' : 'image',
          name: file.name
        };
      });
      setFilePreviews(prev => [...prev, ...newPreviews]);
    };

    // 1. If there are totally invalid files (like text, pdf, mp3), alert and reject them completely!
    if (invalidFiles.length > 0) {
      setConfirmDialog({
        title: "Invalid File Format",
        message: `Invalid file format detected: ${invalidFiles.join(', ')}. Only image and video files (.jpg, .jpeg, .png, .mp4, etc.) are allowed. Document, audio, and text files are strictly restricted.`,
        confirmText: "OK",
        isAlert: true,
        isDanger: true,
        onConfirm: () => {}
      });
      return;
    }

    // 2. If warning files (.heic, .mov) are selected, present warning confirmation
    if (warningFiles.length > 0) {
      setConfirmDialog({
        title: "Compatibility Warning",
        message: "Media files with extensions .HEIC and .MOV may not be visible on some devices due to browser restrictions. Are you sure you want to proceed? .JPG, .JPEG, or .mp4 files are preferred.",
        confirmText: "Proceed",
        cancelText: "Cancel",
        isDanger: false,
        onConfirm: () => {
          proceedWithValidFiles(validFiles);
        }
      });
    } else {
      proceedWithValidFiles(validFiles);
    }
  }, []);

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  // Handle clipboard paste (Ctrl+V / Cmd+V) to capture image and video files
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalPaste = (event) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      const items = event.clipboardData?.items;
      if (!items) return;

      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        // Prevent default browser file insertion behavior
        event.preventDefault();
        processFiles(files);
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, [isOpen, processFiles]);

  const handleRemoveFile = (index) => {
    const updatedFiles = uploadFiles.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);

    // Revoke object URL to avoid leaks
    URL.revokeObjectURL(filePreviews[index].url);

    setUploadFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Submit Post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (uploadFiles.length === 0) {
      setStatusMessage({ type: 'error', text: 'Please add a media file (photo or video) before posting.' });
      return;
    }

    setUploading(true);
    setStatusMessage(null);

    if (supabase) {
      try {
        const publicUrls = [];
        for (const file of uploadFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `posts/${fileName}`;

          // Upload media to storage
          const { error: uploadError } = await supabase.storage
            .from('community-media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          // Retrieve public URL
          const { data: { publicUrl } } = supabase.storage
            .from('community-media')
            .getPublicUrl(filePath);

          publicUrls.push(publicUrl);
        }

        // Insert database row
        const { error: insertError } = await supabase
          .from('community_posts')
          .insert({
            user_id: session.user.id,
            email: session.user.email,
            username: username,
            media_url: JSON.stringify(publicUrls),
            caption: caption
          });

        if (insertError) throw insertError;

        setStatusMessage({ type: 'success', text: 'Aviation post published to the community feed!' });
        setCaption('');
        setUploadFiles([]);
        setFilePreviews([]);
        fetchPosts(); // Refresh feed
        setUploading(false);
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase upload failed, falling back to Local Storage mock:', err.message);
        try {
          const base64Urls = await Promise.all(uploadFiles.map(file => fileToBase64(file)));
          saveMockPost(base64Urls, err.message);
        } catch (convErr) {
          saveMockPost([], err.message);
        } finally {
          setUploading(false);
        }
      }
    } else {
      try {
        const base64Urls = await Promise.all(uploadFiles.map(file => fileToBase64(file)));
        saveMockPost(base64Urls);
      } catch (convErr) {
        saveMockPost([]);
      } finally {
        setUploading(false);
      }
    }
  };

  const saveMockPost = (mediaUrls = [], errMsg = '') => {
    const finalUrls = mediaUrls.length > 0 ? mediaUrls : filePreviews.map(p => p.url);
    const newPost = {
      id: `mock-${Date.now()}`,
      email: session.user.email,
      username: username,
      media_url: JSON.stringify(finalUrls),
      caption: caption,
      created_at: new Date().toISOString()
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('avgeek_posts', JSON.stringify(updated));

    setStatusMessage({
      type: 'success',
      text: errMsg 
        ? `Post saved locally (Supabase Upload Failed: ${errMsg})`
        : 'Post published locally in Dev Sandbox Mode!'
    });

    setCaption('');
    setUploadFiles([]);
    setFilePreviews([]);
  };

  // Render file picker view
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Date Formatter Helper
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      const day = date.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric'
      });
      const month = date.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'short'
      });
      const time = date.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return `${day} ${month}, ${time.toUpperCase()}`;
    } catch {
      return isoString;
    }
  };

  // Helper to determine image vs video rendering from URL strings
  const isVideoUrl = (url) => {
    if (!url) return false;
    if (url.startsWith('data:video/')) return true;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.mov') || cleanUrl.includes('/video');
  };

  const getPostMediaList = (mediaUrl) => {
    if (!mediaUrl) return [];
    try {
      if (mediaUrl.startsWith('[')) {
        return JSON.parse(mediaUrl);
      }
    } catch (e) {}
    return [mediaUrl];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-gradient-to-b from-[#1c0709] via-zinc-950 to-[#040914] text-white font-brand">

      {/* 2. Header Control Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/45 backdrop-blur-xl border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="select-none flex items-center gap-2 cursor-pointer" onClick={handleClosePortal}>
          <img
            src="logo-icon.png"
            alt="V"
            className="w-6 h-6 lg:w-7 lg:h-7 object-contain select-none pointer-events-none"
            draggable="false"
          />
          <span className="font-brand font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] text-xl lg:text-2xl tracking-tight select-none">
            Vignette
          </span>
        </div>

        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-sabon" title={`@${username || session.user.email.split('@')[0]}`}>@{truncateUsername(username || session.user.email.split('@')[0])}</span>
            </div>
          )}

          {session && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Log out</span>
            </button>
          )}

          {!session && (
            <button
              onClick={handleClosePortal}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
              title="Back to Portfolio"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* 3. Main Dashboard Wrapper */}
      <main className="relative z-10 flex-1 overflow-y-auto pt-16 sm:pt-20 pb-3 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hidden-mobile main-custom-scrollbar">
        <div className="max-w-7xl mx-auto w-full min-h-[calc(100vh-120px)] flex flex-col py-2 sm:py-4 lg:py-6">

          {/* Status Toast Banner */}
          {statusMessage && (
            <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[92%] sm:w-full mx-auto px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border flex items-center gap-2 sm:gap-3 animate-slideUp text-[10.5px] sm:text-xs font-semibold shadow-2xl ${
              statusMessage.type === 'success'
                ? 'bg-white border-emerald-500/30 text-emerald-600'
                : 'bg-white border-red-500/30 text-[#d10000]'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-[#d10000]" />
              )}
              <span className="flex-1 break-words">{statusMessage.text}</span>
              <button 
                onClick={() => setStatusMessage(null)} 
                className={`ml-auto p-1 rounded-lg transition-colors cursor-pointer ${
                  statusMessage.type === 'success'
                    ? 'text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50'
                    : 'text-zinc-500 hover:text-[#d10000] hover:bg-red-50'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {!session ? (
            /* =======================================
               A. UNAUTHENTICATED: SLEEK LOGIN CARD
               ======================================= */
            <div className="flex-1 flex items-center justify-center py-4 sm:py-12 px-2 sm:px-4">
              <div className="bg-zinc-950/95 border border-white/10 p-5 sm:p-10 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full text-center flex flex-col gap-4 sm:gap-6 select-none animate-slideUp mx-auto">
                <div className="mx-auto flex items-center justify-center select-none pointer-events-none -mb-6 sm:-mb-8">
                  <img
                    src="vignette-b777.png"
                    alt="Vignette B777"
                    className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] transform -rotate-6 hover:scale-105 transition-transform duration-300"
                    draggable="false"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h2 
                    className="font-brand text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] text-xl sm:text-2xl tracking-wide select-none inline-flex items-start justify-center gap-0.5 animate-slideUp"
                    style={{ fontWeight: 650 }}
                  >
                    <span>aVgeek Connect</span>
                  </h2>
                  <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Access the interactive flight crew board. Share high-altitude views and connect with avgeeks worldwide.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-3 mt-1 sm:mt-2">
                  {/* Google OAuth Login Button */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 sm:py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-brand font-extrabold text-xs sm:text-sm hover:scale-[1.01] active:scale-99 transition-all cursor-pointer shadow-md"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>

                  {/* Only Google authenticated users can enter */}
                </div>
              </div>
            </div>
          ) : needUsername ? (
            /* =======================================
               B. USERNAME REGISTRATION CARD
               ======================================= */
            <div className="flex-1 flex items-center justify-center py-4 sm:py-12 px-2 sm:px-4">
              <div className="bg-zinc-950/95 border border-white/10 p-5 sm:p-10 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full text-center flex flex-col gap-4 sm:gap-6 select-none animate-slideUp mx-auto">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center bg-white/5 border border-white/15 rounded-full shadow-inner">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffec4e]" />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h2 className="font-heading font-black text-xl sm:text-2xl tracking-wide">Choose Username</h2>
                  <p className="font-body text-zinc-400 text-[11px] sm:text-xs leading-relaxed">
                    Create a unique username for aVgeek Connect. Lowercase only, no spaces, letters, numbers, underscores, or periods.
                  </p>
                </div>

                <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-brand font-black text-xl select-none">
                      @
                    </span>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase().replace(/\s+/g, '');
                        setRegUsername(val);
                        setUsernameError('');
                      }}
                      placeholder="sky_spotter"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-zinc-900 border border-white/10 rounded-xl text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffec4e]"
                    />
                  </div>

                  {usernameError && (
                    <p className="text-rose-400 text-[10px] sm:text-[11px] font-semibold text-left flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {usernameError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#e31c25] to-[#ff7a00] text-white font-brand font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-99 cursor-pointer shadow-md"
                  >
                    Secure Username
                  </button>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-[10px] sm:text-xs text-zinc-500 hover:text-zinc-300 font-semibold underline underline-offset-4 cursor-pointer mt-1"
                  >
                    Cancel & Sign Out
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* =======================================
               C. AUTHENTICATED: COMMUNITY DASHBOARD
               ======================================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-2 sm:my-4 pb-12">
              
              {/* Sleek, Responsive Glassmorphic Hero Section */}
              <div className="col-span-1 lg:col-span-12 relative overflow-visible rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-8 lg:p-10 select-none shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center animate-slideUp">
                
                {/* Decorative radial gradients for lighting glow effects */}
                <div className="absolute w-72 h-72 bg-[#e31c25]/15 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
                <div className="absolute w-60 h-60 bg-[#ffec4e]/5 rounded-full blur-3xl -bottom-10 right-20 pointer-events-none" />

                {/* Left Text Block */}
                <div className="col-span-1 md:col-span-6 flex flex-col items-start text-left relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-xs text-[#ffec4e] uppercase font-brand font-black tracking-wider mb-4">
                    <Plane className="w-3.5 h-3.5 rotate-45 text-[#ffec4e]" />
                    <span>ENTHUSIASTS PLATFORM</span>
                  </div>
                  
                  <h2 
                    className="font-brand text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 select-none"
                    style={{ fontWeight: 650 }}
                  >
                    aVgeek Connect
                  </h2>
                  
                  <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify mb-6 max-w-none md:max-w-[82%] lg:max-w-[78%] block md:hidden lg:block">
                    Vignette aVgeek Connect is a dedicated virtual hangar where flight crew, plane spotters, and aviation visual artists converge. Designed with bespoke media grading and content locks, this board serves as a canvas to share breathtaking flight approaches, runway views, and deck captures. Create your unique callsign, interact with global pilots, and stay tuned to live updates directly from our flight desk.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full items-start">
                    <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Upload className="w-4 h-4 text-[#ffec4e]" />
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <h5 className="font-brand font-bold text-[11px] sm:text-xs text-white">Share Captures</h5>
                        <p className="text-[9px] sm:text-[10px] text-zinc-400">Post high-altitude flight views</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#ffec4e]" />
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <h5 className="font-brand font-bold text-[11px] sm:text-xs text-white">Unique Callsigns</h5>
                        <p className="text-[9px] sm:text-[10px] text-zinc-400 leading-normal">
                          Secure your unique <br className="hidden md:inline" /> username
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Megaphone className="w-4 h-4 text-[#ffec4e]" />
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <h5 className="font-brand font-bold text-[11px] sm:text-xs text-white">Live Broadcasts</h5>
                        <p className="text-[9px] sm:text-[10px] text-zinc-400">Real-time announcements</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Radar className="w-4 h-4 text-[#ffec4e]" />
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <h5 className="font-brand font-bold text-[11px] sm:text-xs text-white">Plane Connect</h5>
                        <p className="text-[9px] sm:text-[10px] text-zinc-400">Link up with spotters</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Visual Image */}
                <div className="col-span-1 md:col-span-6 relative w-full flex items-center justify-center z-20 overflow-visible">
                  <div className="absolute w-48 h-48 bg-[#e31c25]/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  <img
                    src="b777-vignette.png"
                    alt="Boeing 777"
                    className="w-full max-w-sm md:max-w-none h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] select-none pointer-events-none md:scale-100 lg:scale-125 md:translate-x-0 lg:-translate-x-12 transition-all duration-300"
                    draggable="false"
                  />
                </div>

              </div>
              
              {/* Left Column: Create Post Form */}
              <div className="lg:col-span-5 bg-zinc-950/90 border border-white/10 p-3.5 sm:p-5 md:p-6 rounded-xl shadow-xl flex flex-col gap-3.5 sm:gap-5 animate-slideUp">
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base md:text-lg tracking-wide uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#ffec4e]" />
                    Share Your Horizon
                  </h3>
                  <p className="font-body text-zinc-400 text-[10.5px] sm:text-xs mt-1">
                    Upload aviation images or video approach clips directly to the community feed.
                  </p>
                </div>

                <form onSubmit={handlePostSubmit} className="flex flex-col gap-5">
                  {/* File Pick Area */}
                  <div className="flex flex-col gap-3">
                    <div
                      onClick={triggerFileSelect}
                      className="group relative border-2 border-dashed border-white/15 hover:border-[#ffec4e]/40 rounded-xl py-2.5 sm:py-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white/2 hover:bg-white/5 select-none"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.gif,.webp,.heic,.mp4,.mov,.webm,.avi"
                        multiple
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-1 sm:gap-2">
                        <Upload className="w-4.5 h-4.5 text-zinc-400 group-hover:text-[#ffec4e] transition-colors" />
                        <span className="text-xs font-bold text-white">Add photos or video files</span>
                        <span className="text-[9px] text-zinc-500">Supports selecting multiple JPG, PNG, MP4 files at once</span>
                      </div>
                    </div>

                    {/* Previews grid */}
                    {filePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                        {filePreviews.map((preview, index) => (
                          <div 
                            key={index} 
                            onClick={() => setActiveUploadPreview(preview)}
                            className="aspect-square bg-zinc-900 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden relative group/preview select-none cursor-pointer transition-colors animate-scaleUp"
                          >
                            {preview.type === 'video' ? (
                              <div className="w-full h-full relative">
                                <video
                                  src={preview.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                />
                                <span className="absolute bottom-1 right-1 bg-black/60 p-0.5 rounded text-white text-[8px] uppercase font-extrabold">
                                  video
                                </span>
                              </div>
                            ) : (
                              <img
                                src={preview.url}
                                alt={`Selected file ${index}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {/* Remove individual file button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(index);
                              }}
                              className="absolute top-1 right-1 p-1 bg-black/75 hover:bg-black text-zinc-400 hover:text-rose-400 rounded-full border border-white/5 transition-colors cursor-pointer"
                              title="Remove file"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Caption Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-400">Add Caption</label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Type your caption here"
                      rows="2"
                      className="w-full text-xs font-body leading-relaxed bg-white border border-zinc-300 rounded-xl p-2.5 px-3 text-black placeholder-zinc-400 focus:outline-none focus:border-[#ffec4e] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Post Submit Button */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#d10000] hover:bg-[#b00000] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-brand font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-99 cursor-pointer shadow-md"
                  >
                    {uploading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        <span>Uploading Media...</span>
                      </>
                    ) : (
                      <>
                        <Plane className="w-3.5 h-3.5 rotate-45" />
                        <span>POST TO FEED</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="border-t border-white/10 my-1"></div>

                {/* Live Updates Section */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-brand font-extrabold tracking-wider flex items-center gap-1.5 select-none text-white">
                      <Megaphone className="w-3.5 h-3.5 shrink-0 animate-pulse text-[#ffec4e]" />
                      <span>WHAT'S NEW | </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e]" style={{ fontWeight: 650 }}>aVgeek Connect</span>
                    </h4>
                    {updatesLoading && (
                      <span className="w-3 h-3 rounded-full border border-white/20 border-t-white animate-spin shrink-0" />
                    )}
                  </div>

                  {/* Admin Broadcast Input Form */}
                  {session?.user?.email === 'vignetteworks.official@gmail.com' && (
                    <div className="flex gap-2 items-end bg-white border border-zinc-300 rounded-xl p-1.5 focus-within:border-zinc-400 transition-colors w-full">
                      <textarea
                        value={newUpdateText}
                        onChange={(e) => setNewUpdateText(e.target.value)}
                        maxLength={300}
                        rows={2}
                        className="flex-1 bg-transparent border-none text-[11px] focus:outline-none text-black font-body px-1.5 resize-none py-1 min-h-[40px] leading-normal"
                      />
                      <button
                        onClick={() => handleAddLiveUpdate()}
                        disabled={!newUpdateText.trim()}
                        className="p-2 bg-[#d10000] hover:bg-[#b00000] disabled:bg-zinc-800 disabled:text-zinc-500 rounded-lg text-white cursor-pointer transition-colors flex items-center justify-center shrink-0 mb-0.5"
                        title="Broadcast update"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Updates Scrollable List */}
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {liveUpdates.length === 0 ? (
                      <p className="text-[10px] text-zinc-500 italic select-none">No announcements posted yet.</p>
                    ) : (
                      liveUpdates.map((upd) => (
                        <div
                          key={upd.id}
                          className="group/upd bg-white/2 border border-white/5 rounded-xl p-3 flex flex-col gap-1 transition-all hover:bg-white/5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[11.5px] leading-relaxed text-zinc-300 font-body whitespace-pre-wrap">
                              {upd.text}
                            </p>
                            {session?.user?.email === 'vignetteworks.official@gmail.com' && (
                              <button
                                onClick={() => handleDeleteLiveUpdate(upd.id)}
                                className="shrink-0 p-1 text-zinc-500 hover:text-rose-500 rounded hover:bg-white/5 opacity-0 group-hover/upd:opacity-100 transition-all cursor-pointer"
                                title="Delete announcement"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <span className="text-[8.5px] text-zinc-500 font-medium font-body select-none">
                            {formatDate(upd.created_at)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Feed posts */}
              <div className="lg:col-span-7 flex flex-col gap-6 min-h-0 lg:min-h-[500px]">
                <div className="flex items-center justify-between select-none">
                  <h3 className="font-heading font-black text-sm sm:text-base md:text-lg tracking-wide uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#ffec4e]" />
                    Global Radar Feed
                  </h3>
                  <button
                    onClick={handleRefreshRadar}
                    disabled={loading || isRefreshing}
                    className="text-[10px] sm:text-xs text-[#ffec4e] hover:text-[#ffea2e] font-semibold underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
                  >
                    {isRefreshing && (
                      <svg className="animate-spin h-3.5 w-3.5 text-[#ffec4e] shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {isRefreshing ? 'Refreshing...' : 'Refresh Radar'}
                  </button>
                </div>

                {/* Community Feed Filter Tabs */}
                {(() => {
                  const tabsList = [
                    { id: 'all', label: 'All Feeds' },
                    { id: 'community', label: 'Spotters Feed' },
                    { id: 'official', label: 'Vignette' }
                  ];
                  const activeIndex = tabsList.findIndex(t => t.id === feedTab);
                  return (
                    <div className="relative flex p-1 rounded-xl bg-white/5 border border-white/10 select-none overflow-hidden">
                      {/* Sliding Apple-style background highlight */}
                      <div 
                        className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-[#e31c25] to-[#ff7a00] transition-all duration-300 shadow-md"
                        style={{
                          left: `calc(${activeIndex * (100 / 3)}% + 4px)`,
                          width: `calc(${100 / 3}% - 8px)`,
                          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                      />
                      {tabsList.map(tab => {
                        const isOfficial = tab.id === 'official';
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setFeedTab(tab.id)}
                            className={`relative z-10 flex-1 py-2 px-1 sm:px-3 rounded-lg text-[8.5px] sm:text-[10px] font-brand tracking-wider transition-colors duration-300 cursor-pointer ${
                              isOfficial
                                ? 'text-white font-normal'
                                : feedTab === tab.id
                                ? 'text-white font-extrabold uppercase font-black'
                                : 'text-zinc-400 hover:text-white uppercase font-black'
                            }`}
                            style={isOfficial ? { fontFamily: "'Nunito', sans-serif", fontWeight: 650, color: 'white' } : undefined}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}

                {loading ? (
                  /* Loading Skeletons */
                  <div className="flex flex-col gap-6">
                    {[...Array(2)].map((_, idx) => (
                      <div key={idx} className="backdrop-blur-md bg-zinc-950/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-800" />
                          <div className="flex-1 flex flex-col gap-1.5">
                            <div className="h-3 w-1/3 bg-zinc-800 rounded" />
                            <div className="h-2.5 w-1/4 bg-zinc-800 rounded" />
                          </div>
                        </div>
                        <div className="aspect-video w-full bg-zinc-800 rounded-xl" />
                        <div className="h-3.5 w-3/4 bg-zinc-800 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (() => {
                  const filteredPosts = posts.filter(post => {
                    if (feedTab === 'community') {
                      return post.email !== 'vignetteworks.official@gmail.com';
                    }
                    if (feedTab === 'official') {
                      return post.email === 'vignetteworks.official@gmail.com';
                    }
                    return true;
                  });

                  if (filteredPosts.length === 0) {
                    return (
                      /* Empty Feed State */
                      <div className="backdrop-blur-md bg-zinc-950/40 border border-white/5 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4 text-zinc-400 select-none animate-slideUp">
                        <Plane className="w-12 h-12 text-zinc-600 rotate-45" />
                        <div>
                          <p className="font-bold text-sm text-white">No posts found in this feed</p>
                          <p className="text-xs text-zinc-500 mt-1">Be the first to share aviation updates here!</p>
                        </div>
                      </div>
                    );
                  }

                  const allSelected = filteredPosts.length > 0 && selectedPostIds.length === filteredPosts.length;
                  const toggleSelectAll = () => {
                    if (allSelected) {
                      setSelectedPostIds([]);
                    } else {
                      setSelectedPostIds(filteredPosts.map(p => p.id));
                    }
                  };

                  return (
                    <>
                      {session?.user?.email === 'vignetteworks.official@gmail.com' && (
                        <div className="flex items-center gap-4 bg-zinc-950/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold select-none mb-3">
                          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white">
                            <input 
                              type="checkbox" 
                              checked={allSelected} 
                              onChange={toggleSelectAll} 
                              className="rounded border-0 text-[#d10000] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer bg-zinc-800"
                            />
                            <span>Select All</span>
                          </label>
                          {selectedPostIds.length > 0 && (
                            <button
                              onClick={handleBulkDelete}
                              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#d10000] hover:bg-[#b00000] active:scale-95 transition-all text-white rounded-lg cursor-pointer font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete ({selectedPostIds.length})</span>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Render Posts Grid (Instagram style) */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 max-h-[360px] md:max-h-[630px] lg:max-h-[630px] xl:max-h-[800px] overflow-y-auto pr-1 custom-scrollbar scrollbar-hidden-mobile">
                      {filteredPosts.map((post) => {
                        const { likes, commentsCount } = getMockStats(post.id);
                        const mediaList = getPostMediaList(post.media_url);
                        const firstMedia = mediaList[0] || '';
                        const isVideo = isVideoUrl(firstMedia);
                        const isMultiple = mediaList.length > 1;

                        return (
                          <div
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            onMouseEnter={(e) => {
                              const video = e.currentTarget.querySelector('video');
                              if (video) {
                                video.play().catch(() => {});
                              }
                            }}
                            onMouseLeave={(e) => {
                              const video = e.currentTarget.querySelector('video');
                              if (video) {
                                video.pause();
                                video.currentTime = 0.001;
                              }
                            }}
                            className="group aspect-square bg-zinc-900 border border-white/5 rounded-lg overflow-hidden relative cursor-pointer hover:opacity-70 transition-opacity duration-300 select-none animate-scaleUp"
                          >
                            {/* Admin Select Checkbox */}
                            {session?.user?.email === 'vignetteworks.official@gmail.com' && (
                              <input 
                                type="checkbox"
                                checked={selectedPostIds.includes(post.id)}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setSelectedPostIds(prev => 
                                    checked 
                                      ? [...prev, post.id]
                                      : prev.filter(id => id !== post.id)
                                  );
                                }}
                                className="absolute top-2 left-2 z-30 rounded border-0 text-[#d10000] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer bg-zinc-800"
                              />
                            )}

                            {/* Render Thumbnail Media */}
                            {isVideo ? (
                              <div className="w-full h-full bg-black relative flex items-center justify-center">
                                <video
                                  src={firstMedia ? (firstMedia.includes('#') ? firstMedia : `${firstMedia}#t=0.001`) : ''}
                                  className="w-full h-full object-cover pointer-events-none"
                                  preload="metadata"
                                  muted
                                  playsInline
                                  loop
                                />
                                <span className="absolute top-2 right-2 bg-black/60 p-1.5 rounded text-white text-[9px] font-brand uppercase font-extrabold flex items-center gap-0.5 shadow-md">
                                  <Video className="w-3.5 h-3.5 text-[#ffec4e]" />
                                </span>
                              </div>
                            ) : (
                              <img
                                src={firstMedia}
                                alt={getCaptionText(post.caption) || 'Aviation image'}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'b777-vignette.png';
                                }}
                              />
                            )}

                            {/* Instagram multiple files indicator */}
                            {isMultiple && !isVideo && (
                              <span className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white shadow-md z-10">
                                <Layers className="w-3.5 h-3.5 text-[#ffec4e]" />
                              </span>
                            )}

                            {/* Instagram hover stats overlay */}
                            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 sm:gap-4 text-white text-xs font-bold">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                {likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                                {commentsCount}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
                })()}
              </div>

            </div>
          )}

          {/* Footer Component inside AvgeekConnect */}
          <footer className="w-full border-t border-white/10 mt-16 py-12 select-none text-zinc-100 bg-transparent">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

              {/* Main Footer columns row — 1-col mobile, 2-col iPad, 4-col desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">

                {/* Logo Name & Brand Info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="logo-icon.png"
                      alt="Vignette"
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain select-none pointer-events-none"
                      draggable="false"
                    />
                    <span className="font-brand font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] text-lg sm:text-xl md:text-2xl tracking-tight select-none">
                      Vignette
                    </span>
                  </div>
                  <p className="font-body text-[10px] sm:text-xs text-zinc-400 leading-relaxed text-justify">
                    Cinematic visual storytelling. Capturing terminals, summits, and streetscapes with bespoke pacing and premium color grading.
                  </p>
                </div>

                {/* Legal Links */}
                <div className="flex flex-col gap-4 lg:border-l border-white/10 lg:pl-8">
                  <h4 className="font-heading font-black text-[11px] sm:text-sm text-[#ffec4e] uppercase tracking-wider">
                    Legal
                  </h4>
                  <ul className="flex flex-col gap-2.5 sm:gap-3 font-body text-[10px] sm:text-xs text-zinc-400">
                    <li>
                      <button
                        onClick={() => { setLegalModal('terms'); setActiveLegalTab('terms'); }}
                        className="hover:text-[#ffec4e] transition-colors cursor-pointer text-left"
                      >
                        Terms and Conditions
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { setLegalModal('privacy'); setActiveLegalTab('privacy'); }}
                        className="hover:text-[#ffec4e] transition-colors cursor-pointer text-left"
                      >
                        Privacy Policy
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div className="flex flex-col gap-4 lg:border-l border-white/10 lg:pl-8">
                  <h4 className="font-heading font-black text-[11px] sm:text-sm text-[#ffec4e] uppercase tracking-wider">
                    Support
                  </h4>
                  <ul className="flex flex-col gap-2.5 sm:gap-3.5 font-body text-[10px] sm:text-xs text-zinc-400">
                    <li className="flex items-center gap-2.5 sm:gap-3">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffec4e] flex-shrink-0" />
                      <a href="tel:+919342385565" className="hover:text-white transition-colors">
                        +91 9342385565
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5 sm:gap-3">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffec4e] flex-shrink-0" />
                      <a href="mailto:vignetteworks.official@gmail.com" className="hover:text-white transition-colors break-all">
                        vignetteworks.official@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-4 lg:border-l border-white/10 lg:pl-8">
                  <h4 className="font-heading font-black text-[11px] sm:text-sm text-[#ffec4e] uppercase tracking-wider">
                    Address
                  </h4>
                  <p className="flex items-start gap-2.5 sm:gap-3 font-body text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffec4e] mt-0.5 flex-shrink-0" />
                    <span>Ramnagar, Agartala, Tripura(W) - 799002</span>
                  </p>
                </div>

              </div>

              {/* Social Media & Divider Line */}
              <div className="flex flex-col items-center gap-6 mt-4">

                {/* Social Icons Row */}
                <div className="flex gap-6 items-center justify-center">

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/proy____"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 active:scale-95 transition-all duration-300"
                    aria-label="Visit proy____ on Instagram"
                  >
                    <Instagram className="w-5.5 h-5.5 sm:w-7 sm:h-7" fill="#ff7f50" />
                  </a>

                  {/* Threads */}
                  <a
                    href="https://www.threads.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 active:scale-95 transition-all duration-300"
                    aria-label="Visit Threads"
                  >
                    <ThreadsIcon className="w-5.5 h-5.5 sm:w-7 sm:h-7" fill="#ff7f50" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 active:scale-95 transition-all duration-300"
                    aria-label="Visit Facebook page"
                  >
                    <Facebook className="w-5.5 h-5.5 sm:w-7 sm:h-7" fill="#ff7f50" />
                  </a>

                </div>

                {/* Bottom mini divider */}
                <div className="w-full border-t border-white/10 my-2" />

                {/* Copyright Metadata */}
                <div className="font-body text-[9px] sm:text-xs text-zinc-500 flex flex-col md:flex-row items-center gap-2">
                  <p>© {new Date().getFullYear()} <span className="font-brand font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] inline-block">Vignette</span>. All rights reserved | Made by <span className="font-brand font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffec4e] inline-block">Vignette</span></p>
                </div>

              </div>

            </div>
          </footer>

        </div>
      </main>

      {/* 4. Detailed focus modal (Instagram style) */}
      {selectedPost && (() => {
        const post = selectedPost;
        const { likes, commentsCount, isLiked } = getMockStats(post.id);
        const mediaList = getPostMediaList(post.media_url);
        const currentMedia = mediaList[activeSlideIndex] || '';
        const isCurrentVideo = isVideoUrl(currentMedia);

        // Fetch user comments list
        const localComments = commentsMap[post.id] || [];
        const mockComments = getMockComments(post.id);
        const deletedMockIds = JSON.parse(localStorage.getItem('avgeek_deleted_comments') || '[]');
        const filteredMockComments = mockComments.filter(comm => !deletedMockIds.includes(comm.id));
        const allComments = [...filteredMockComments, ...localComments];

        return (
          <div className="fixed inset-0 z-50 bg-black/93 flex items-center justify-center p-2 sm:p-4 md:p-8 animate-fadeIn">
            {/* Click backdrop to close */}
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setSelectedPost(null)} />

            {/* Modal Body Container */}
            <div 
              className="relative z-10 rounded-2xl max-w-4xl w-full h-[90vh] md:h-[80vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl animate-scaleUp"
              style={{ backgroundColor: '#17202A', border: '0.5px solid white' }}
            >
              {/* Close Button Mobile */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-zinc-400 hover:text-white md:hidden border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* A. Left Side: Media Viewport */}
              <div className="w-full md:w-3/5 bg-black relative select-none border-b md:border-b-0 md:border-r border-white/10 aspect-square md:h-full group/modalmedia overflow-hidden">
                {/* Sliding Carousel Track */}
                <div 
                  ref={carouselRef}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, mediaList)}
                  className="flex w-full h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
                >
                  {mediaList.map((mediaUrl, idx) => {
                    const isVideo = isVideoUrl(mediaUrl);
                    return (
                      <div key={idx} className="w-full h-full shrink-0 flex items-center justify-center bg-black relative select-none">
                        {isVideo ? (
                          <div className="w-full h-full relative flex items-center justify-center">
                            <video
                              src={mediaUrl}
                              loop
                              preload="metadata"
                              className="w-full h-full object-contain cursor-pointer"
                              playsInline
                              autoPlay={idx === activeSlideIndex}
                              muted={isModalVideoMuted}
                              onClick={(e) => {
                                if (e.target.paused) {
                                  e.target.play().catch(() => {});
                                } else {
                                  e.target.pause();
                                }
                              }}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            
                            {/* Subtle Premium Mute Toggle Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalVideoMuted(!isModalVideoMuted);
                              }}
                              className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                              title={isModalVideoMuted ? "Unmute Video" : "Mute Video"}
                            >
                              {isModalVideoMuted ? (
                                <VolumeX className="w-4 h-4 text-zinc-300" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[#ffec4e]" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={getCaptionText(post.caption) || 'Aviation highlight'}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'b777-vignette.png';
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Left/Right Carousel Controls */}
                {mediaList.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveSlideIndex(prev => prev > 0 ? prev - 1 : mediaList.length - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-105 transition-all z-20 cursor-pointer border border-white/5 opacity-100 xl:opacity-0 xl:group-hover/modalmedia:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setActiveSlideIndex(prev => prev < mediaList.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-105 transition-all z-20 cursor-pointer border border-white/5 opacity-100 xl:opacity-0 xl:group-hover/modalmedia:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 h-5" />
                    </button>

                    {/* Navigation Dots Indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                      {mediaList.map((_, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            idx === activeSlideIndex ? 'bg-[#ffec4e] scale-125' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* B. Right Side: Metadata, Comments & Actions */}
              <div className="w-full md:w-2/5 flex flex-col h-auto md:h-full bg-transparent text-white font-body relative">
                {/* 1. Header Control Panel */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {renderAvatar(post.email, post.username, "w-8 h-8")}
                    <div>
                      <span className="font-sabon font-semibold text-xs sm:text-sm text-zinc-200 block" title={`@${post.username || post.email.split('@')[0]}`}>
                        @{truncateUsername(post.username || post.email.split('@')[0])}
                      </span>
                      <span className="text-[9px] text-zinc-500 block font-medium">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {(() => {
                      const canDelete = session && (
                        post.user_id === session.user?.id ||
                        post.email === session.user?.email ||
                        session.user?.email === 'vignetteworks.official@gmail.com'
                      );

                      const isMenuOpen = activePostMenuId === post.id;

                      return (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePostMenuId(isMenuOpen ? null : post.id);
                            }}
                            className="post-menu-trigger p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Options"
                          >
                            <MoreHorizontal className="w-4.5 h-4.5" />
                          </button>

                          {/* Post Dropdown Menu */}
                          {isMenuOpen && (
                            <div className="post-menu-dropdown absolute right-0 mt-1 z-50 bg-[#17202A] border border-white/20 rounded-xl shadow-2xl py-1 w-32 animate-scaleUp select-none flex flex-col">
                              {/* Edit Option */}
                              {canDelete && (
                                <button
                                  onClick={() => {
                                    setActivePostMenuId(null);
                                    setIsEditingCaption(true);
                                    setEditCaptionText(getCaptionText(post.caption) || '');
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/5 transition-colors flex items-center gap-2 border-t border-white/5 first:border-t-0 cursor-pointer"
                                >
                                  <Edit className="w-3.5 h-3.5 text-zinc-300" />
                                  Edit
                                </button>
                              )}

                              {/* Download Option */}
                              <button
                                onClick={() => {
                                  setActivePostMenuId(null);
                                  handleDownloadMedia(currentMedia, post.id, isCurrentVideo);
                                }}
                                className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#ffec4e] hover:bg-white/5 transition-colors flex items-center gap-2 border-t border-white/5 first:border-t-0 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-[#ffec4e]" />
                                Download
                              </button>

                              {/* Delete Option */}
                              {canDelete && (
                                <button
                                  onClick={() => {
                                    setActivePostMenuId(null);
                                    handleDeletePost(post.id);
                                  }}
                                  className="w-full text-left px-3.5 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2 border-t border-white/5 first:border-t-0 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {post.email === 'vignetteworks.official@gmail.com' && (
                      <div className="px-2 py-0.5 rounded text-[9px] font-brand font-extrabold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                        ADMIN
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedPost(null)}
                      className="hidden md:block p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 2. Scrollable Comments / Captions list */}
                <div className="max-h-[280px] md:max-h-none md:flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar scrollbar-hidden-mobile text-xs">
                  {/* Inline Edit Caption Container */}
                  {isEditingCaption && (
                    <div className="flex gap-2.5 pb-4 border-b border-white/5 animate-slideDown">
                      {renderAvatar(post.email, post.username, "w-6 h-6")}
                      <div className="flex-1 flex flex-col gap-2">
                        <textarea
                          value={editCaptionText}
                          onChange={(e) => setEditCaptionText(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/20 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 outline-none resize-none h-20"
                          placeholder="Write a caption... (Copy, Cut, Paste supported. Image pasting blocked)"
                          maxLength={2200}
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingCaption(false);
                              setEditCaptionText('');
                            }}
                            className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-all text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveCaption(post.id)}
                            disabled={!editCaptionText.trim()}
                            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all ${
                              editCaptionText.trim()
                                ? 'bg-gradient-to-r from-[#e31c25] to-[#ff7a00] hover:scale-105 active:scale-95 text-white cursor-pointer shadow-md'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User original caption */}
                  {getCaptionText(post.caption) && !isEditingCaption && (
                    <div className="flex gap-2.5 pb-3 border-b border-white/5">
                      {renderAvatar(post.email, post.username, "w-6 h-6")}
                      <div className="flex flex-col gap-0.5">
                        <p className="leading-relaxed text-justify">
                          <span className="font-sabon font-semibold text-zinc-200 mr-1.5" title={`@${post.username || post.email.split('@')[0]}`}>
                            @{truncateUsername(post.username || post.email.split('@')[0])}
                          </span>
                          {getCaptionText(post.caption)}
                        </p>
                        <span className="text-[9px] text-zinc-500 font-medium">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* List of comments */}
                  <div className="flex flex-col gap-3.5">
                    {allComments.map((comm) => (
                      <div key={comm.id} className="flex gap-2.5 items-start group/comment">
                        {renderAvatar(comm.email, comm.username, "w-6 h-6")}
                        <div className="flex-1 flex flex-col gap-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="leading-relaxed text-zinc-300">
                              <span className="font-sabon font-semibold text-zinc-200 mr-1.5" title={`@${comm.username}`}>
                                @{truncateUsername(comm.username)}
                              </span>
                              {comm.text}
                            </p>

                            {/* Delete comment button -> 3-dot dropdown */}
                            {(comm.username === username || (session && (post.user_id === session.user?.id || post.email === session.user?.email || session.user?.email === 'vignetteworks.official@gmail.com'))) && (() => {
                              const isCommentMenuOpen = activeCommentMenuId === comm.id;
                              return (
                                <div className="relative shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveCommentMenuId(isCommentMenuOpen ? null : comm.id);
                                    }}
                                    className={`comment-menu-trigger p-1 text-zinc-400 hover:text-white transition-all cursor-pointer rounded hover:bg-white/5 ${
                                      isCommentMenuOpen ? 'opacity-100' : 'opacity-60 md:opacity-0 md:group-hover/comment:opacity-100'
                                    }`}
                                    title="Options"
                                  >
                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Comment Action Dropdown */}
                                  {isCommentMenuOpen && (
                                    <div className="comment-menu-dropdown absolute right-0 mt-1 z-50 bg-[#17202A] border border-white/20 rounded-xl shadow-2xl py-1 w-24 animate-scaleUp select-none">
                                      <button
                                        onClick={() => {
                                          setActiveCommentMenuId(null);
                                          handleDeleteComment(post.id, comm.id);
                                        }}
                                        className="w-full text-left px-3 py-1.5 text-[10px] font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                          <span className="text-[9px] text-zinc-500 font-medium">
                            {formatDate(comm.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Action Deck (Likes, Share confirmation) */}
                <div className="p-4 border-t border-white/5 bg-transparent flex flex-col gap-2.5">
                  <div className="flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="group flex items-center justify-center hover:text-rose-500 transition-colors cursor-pointer"
                        title={isLiked ? "Unlike post" : "Like post"}
                      >
                        <svg
                          className={`w-5 h-5 transition-transform group-active:scale-125 duration-100 ${
                            isLiked ? 'text-rose-500 fill-rose-500 animate-heartBeat' : 'text-zinc-400 hover:text-white'
                          }`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLikesModalPostId(post.id)}
                        className="text-xs font-bold text-zinc-300 hover:text-white hover:underline transition-all cursor-pointer bg-transparent border-0 p-0"
                        title="View likes"
                      >
                        {likes} likes
                      </button>
                    </div>

                  </div>
                </div>

                {/* 4. Interactive comments submission form */}
                <form
                  onSubmit={(e) => handleAddComment(e, post.id)}
                  className="p-3 border-t border-white/5 flex gap-2 items-center bg-transparent"
                >
                  <div className="flex-1 flex items-center bg-[#10171e] border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-white/20 transition-colors w-full relative" ref={emojiPickerRef}>
                    {/* Smile Icon Button */}
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-zinc-400 hover:text-white transition-colors mr-2.5 shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
                      title="Emojis"
                    >
                      <Smile className="w-4 h-4" />
                    </button>

                    {/* Popover Categorized Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="absolute bottom-full left-0 mb-2 z-50 bg-[#17202A] border border-white/20 rounded-2xl p-3 shadow-2xl w-[280px] animate-scaleUp select-none flex flex-col gap-2">
                        {/* Categories Tab Selector */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/5 overflow-x-auto gap-1.5 scrollbar-none">
                          {Object.keys(EMOJI_CATEGORIES).map((key) => {
                            const cat = EMOJI_CATEGORIES[key];
                            const isActive = activeEmojiTab === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setActiveEmojiTab(key)}
                                className={`text-base p-1.5 rounded-lg transition-all hover:bg-white/5 cursor-pointer ${
                                  isActive ? 'bg-white/10 scale-110' : 'opacity-60 hover:opacity-100'
                                }`}
                                title={key}
                              >
                                {cat.icon}
                              </button>
                            );
                          })}
                        </div>

                        {/* Emojis Grid */}
                        <div className="grid grid-cols-6 gap-2.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar text-base">
                          {EMOJI_CATEGORIES[activeEmojiTab].emojis.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                setNewCommentText((prev) => {
                                  const newVal = prev + emoji;
                                  return newVal.slice(0, 1000);
                                });
                              }}
                              className="hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer text-center active:scale-120"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Input Field */}
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      maxLength={1000}
                      className="flex-1 min-w-0 bg-transparent !bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 py-1"
                    />

                    {/* Post Button inside the input bar */}
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className={`text-xs font-semibold font-brand uppercase tracking-wider ml-2 shrink-0 transition-colors ${
                        newCommentText.trim() 
                          ? 'text-[#ffec4e] hover:text-[#ffea2e] cursor-pointer' 
                          : 'text-zinc-600 cursor-not-allowed'
                      }`}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Content Protection Toast Banner */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-[100] bg-[#990000] text-white font-brand font-extrabold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-2xl flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 transform pointer-events-none select-none ${toast.show
          ? 'top-20 opacity-100 translate-y-0 scale-100'
          : 'top-20 opacity-0 -translate-y-4 scale-95'
        }`}
      >
        <TriangleAlert className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white flex-shrink-0 animate-bounce" />
        <span className="text-[8.5px] sm:text-[10px] md:text-xs whitespace-nowrap uppercase tracking-wider">
          Not allowed! Content Protection enabled
        </span>
      </div>

      {/* LEGAL MODAL — Terms & Conditions / Privacy Policy */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${legalModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setLegalModal(null)}
      >
        <div
          className={`relative w-full max-w-2xl max-h-[85vh] bg-[#17202A] rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col my-8 select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${legalModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#17202A] px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="font-heading font-extrabold text-xs tracking-widest text-[#ffec4e] uppercase block mb-1">
                Legal
              </span>
              <h2 className="font-heading font-black text-lg sm:text-xl text-white">
                {activeLegalTab === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}
              </h2>
            </div>
            <button
              onClick={() => setLegalModal(null)}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 font-body text-sm text-zinc-300 leading-relaxed space-y-5">
            {activeLegalTab === 'terms' ? (
              <>
                <p className="text-zinc-500 text-xs">Last updated: July 2026</p>

                <h3 className="font-heading font-bold text-base text-white">1. Acceptance of Terms</h3>
                <p className="text-justify">By accessing and using the Vignette website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.</p>

                <h3 className="font-heading font-bold text-base text-white">2. Services Offered</h3>
                <p className="text-justify">Vignette provides professional video editing, promotional content creation, podcast editing, and visual storytelling services. All deliverables, timelines, and project scopes are agreed upon individually with each client prior to commencement of work.</p>

                <h3 className="font-heading font-bold text-base text-white">3. Intellectual Property</h3>
                <p className="text-justify">All original content, designs, video edits, graphics, and creative assets produced by Vignette remain the intellectual property of Vignette until full payment has been received. Upon completion and full payment, ownership of the final deliverables transfers to the client unless otherwise stated in writing.</p>

                <h3 className="font-heading font-bold text-base text-white">4. Client Responsibilities</h3>
                <p className="text-justify">The client agrees to provide all necessary materials, brand assets, and feedback in a timely manner. Delays in client feedback or asset delivery may result in adjusted project timelines and additional fees.</p>

                <h3 className="font-heading font-bold text-base text-white">5. Payment Terms</h3>
                <p className="text-justify">Payments are to be made according to the schedule outlined in your specific proposal or invoice. A non-refundable deposit is often required to commence work. Late payments may incur additional charges.</p>

                <h3 className="font-heading font-bold text-base text-white">6. Revisions Policy</h3>
                <p className="text-justify">Each project includes a predefined number of revision rounds. Any additional revisions beyond this scope will be billed at our standard hourly or per-project rate.</p>

                <h3 className="font-heading font-bold text-base text-white">7. Limitation of Liability</h3>
                <p className="text-justify">Vignette shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific project in question.</p>

                <h3 className="font-heading font-bold text-base text-white">8. Termination</h3>
                <p className="text-justify">Either party may terminate a project agreement with written notice. In the event of termination, the client shall be responsible for payment of all work completed up to the date of termination.</p>

                <h3 className="font-heading font-bold text-base text-white">9. Contact</h3>
                <p className="text-justify">For questions regarding these Terms and Conditions, please contact us at <a href="mailto:vignetteworks.official@gmail.com" className="text-[#ffec4e] underline">vignetteworks.official@gmail.com</a>.</p>
              </>
            ) : (
              <>
                <p className="text-zinc-500 text-xs">Last updated: July 2026</p>

                <h3 className="font-heading font-bold text-base text-white">1. Information We Collect</h3>
                <p className="text-justify">When you use our website or contact us through our inquiry form, we may collect personal information including your name, email address, phone number, and any message content you provide. We also collect non-personal data such as browser type, device information, and usage analytics.</p>

                <h3 className="font-heading font-bold text-base text-white">2. How We Use Your Information</h3>
                <p className="text-justify">Your personal information is used solely for responding to inquiries, delivering our services, communicating project updates, and improving user experience on our platform. We do not sell, rent, or trade your personal information to third parties.</p>

                <h3 className="font-heading font-bold text-base text-white">3. Data Storage &amp; Security</h3>
                <p className="text-justify">We employ industry-standard security measures to protect your personal data. Information submitted through our forms is transmitted securely and stored using trusted third-party services (such as Supabase) with encryption at rest and in transit.</p>

                <h3 className="font-heading font-bold text-base text-white">4. Cookies &amp; Analytics</h3>
                <p className="text-justify">Our website may use cookies and similar technologies to enhance your browsing experience and gather anonymous usage statistics. You may disable cookies in your browser settings, though some features of the site may not function as intended.</p>

                <h3 className="font-heading font-bold text-base text-white">5. Third-Party Services</h3>
                <p className="text-justify">We may utilise third-party services for analytics, hosting, and form processing. These services have their own privacy policies and we encourage you to review them. We are not responsible for the privacy practices of third-party providers.</p>

                <h3 className="font-heading font-bold text-base text-white">6. Your Rights</h3>
                <p className="text-justify">You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.</p>

                <h3 className="font-heading font-bold text-base text-white">7. Children&apos;s Privacy</h3>
                <p className="text-justify">Our services are not directed at individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.</p>

                <h3 className="font-heading font-bold text-base text-white">8. Changes to This Policy</h3>
                <p className="text-justify">We reserve the right to update this Privacy Policy at any time. Changes will be reflected on this page with an updated revision date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>

                <h3 className="font-heading font-bold text-base text-white">9. Contact</h3>
                <p className="text-justify">If you have any questions or concerns about this Privacy Policy, please reach out to us at <a href="mailto:vignetteworks.official@gmail.com" className="text-[#ffec4e] underline">vignetteworks.official@gmail.com</a>.</p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-[#17202A] px-6 sm:px-8 py-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setLegalModal(null)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e31c25] to-[#ff7a00] text-white font-heading font-bold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* Upload Preview Lightbox Modal */}
      {activeUploadPreview && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop close */}
          <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setActiveUploadPreview(null)} />
          
          <div className="relative z-10 max-w-4xl w-full max-h-[85vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-zinc-950 animate-scaleUp">
            {/* Close button */}
            <button
              onClick={() => setActiveUploadPreview(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <X className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
            
            <div className="w-full h-full flex items-center justify-center p-2">
              {activeUploadPreview.type === 'video' ? (
                <video
                  src={activeUploadPreview.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : (
                <img
                  src={activeUploadPreview.url}
                  alt="Upload Preview"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Print Blocked Fullscreen Demo Page */}
      {showPrintBlocked && (
        <div className="fixed inset-0 z-[200] bg-[#0A0908] text-white flex flex-col items-center justify-center p-6 select-none font-body">
          {/* Direct style injection to handle @media print block and prevent bypassing via browser menu */}
          <style>{`
            @media print {
              body {
                display: none !important;
              }
              html::before {
                content: "This page cannot be printed";
                display: flex;
                position: fixed;
                inset: 0;
                background: #0A0908;
                color: #ffffff;
                font-size: 24px;
                font-family: system-ui, -apple-system, sans-serif;
                font-weight: 800;
                text-transform: uppercase;
                align-items: center;
                justify-content: center;
                text-align: center;
                z-index: 9999999;
              }
            }
          `}</style>

          <div className="text-center max-w-md flex flex-col items-center gap-6 animate-scaleUp">
            <TriangleAlert className="w-16 h-16 text-[#e31c25] animate-pulse" />
            <h2 className="font-heading font-black text-2xl uppercase tracking-wider text-white">This page cannot be printed</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Content protection is active on Vignette. Printing, exporting to PDF, or hard-copy duplication of this portal is restricted.
            </p>
            <button
              onClick={() => setShowPrintBlocked(false)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e31c25] to-[#ff7a00] hover:scale-105 active:scale-95 text-white font-heading font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg"
            >
              Return to Feed
            </button>
          </div>
        </div>
      )}
      {/* Custom Vignette Confirmation & Alert Modal */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn select-none font-body">
          <div 
            className="w-[92%] sm:w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-[480px] bg-[#17202A] border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5 lg:gap-6 animate-scaleUp"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className={`p-2 sm:p-2.5 rounded-full shrink-0 ${confirmDialog.isDanger ? 'bg-rose-500/10 text-rose-500' : 'bg-[#ffec4e]/10 text-[#ffec4e]'}`}>
                {confirmDialog.isDanger ? (
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1 sm:gap-1.5">
                <h4 className="font-heading font-black text-xs sm:text-sm md:text-base lg:text-lg tracking-wide uppercase text-white">
                  {confirmDialog.title || "Confirm Action"}
                </h4>
                <p className="font-body text-zinc-400 text-[10.5px] sm:text-xs md:text-[13px] leading-relaxed break-words">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3 pt-3.5 border-t border-white/5">
              {!confirmDialog.isAlert && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirmDialog.onCancel) confirmDialog.onCancel();
                    setConfirmDialog(null);
                  }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 hover:text-white transition-all text-[10.5px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {confirmDialog.cancelText || "Cancel"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(null);
                }}
                className={`px-3.5 py-1.5 sm:px-4.5 sm:py-2 md:px-5 md:py-2.5 rounded-xl text-white transition-all text-[10.5px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 ${
                  confirmDialog.isDanger
                    ? 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/20'
                    : 'bg-gradient-to-r from-[#e31c25] to-[#ff7a00] hover:shadow-lg hover:shadow-[#e31c25]/20'
                }`}
              >
                {confirmDialog.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liked Users List Modal (Instagram style) */}
      {likesModalPostId && (() => {
        const post = posts.find(p => p.id === likesModalPostId);
        const likedEmails = getPostLikesList(post);
        return (
          <div className="fixed inset-0 z-[260] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn select-none font-body">
            <div className="w-[92%] sm:w-full max-w-[280px] sm:max-w-xs md:max-w-sm bg-[#17202A] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
              {/* Header */}
              <div className="px-4 py-3 sm:py-3.5 border-b border-white/10 flex items-center justify-between">
                <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-white">Likes</span>
                <button
                  type="button"
                  onClick={() => setLikesModalPostId(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Likes List */}
              <div className="flex-1 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-1 custom-scrollbar p-3 flex flex-col gap-2">
                {likedEmails.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500 font-medium">
                    No likes yet.
                  </div>
                ) : (
                  likedEmails.map((email) => {
                    const mappedUsername = resolveEmailToUsername(email);
                    return (
                      <div key={email} className="flex items-center gap-3 p-1.5 sm:p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                        {renderAvatar(email, mappedUsername, "w-8 h-8 sm:w-9 sm:h-9")}
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          @{mappedUsername}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
