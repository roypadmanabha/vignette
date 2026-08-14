import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import { X, LogOut, Upload, Image, Video, User, Calendar, Plane, Globe, AlertCircle, CheckCircle, ShieldCheck, Download, Trash2, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

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

  // Instagram grid interactions
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [commentsMap, setCommentsMap] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_comments') || '{}');
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_liked_posts') || '[]');
  });
  const [likesMap, setLikesMap] = useState(() => {
    return JSON.parse(localStorage.getItem('avgeek_likes_map') || '{}');
  });

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [selectedPost]);

  // Auto-dismiss status message after 3 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);



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

  // 3. Load Posts (Supabase or Local Storage fallback)
  useEffect(() => {
    if (!isOpen) return;
    fetchPosts();
  }, [isOpen, session]);

  const fetchPosts = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('community_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
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
      // If Supabase not connected, show dynamic simulation form
      setShowDemoLogin(true);
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

  const handleLikePost = (postId) => {
    let isLikedNow = false;
    let updated;
    if (likedPosts.includes(postId)) {
      updated = likedPosts.filter(id => id !== postId);
    } else {
      updated = [...likedPosts, postId];
      isLikedNow = true;
    }
    setLikedPosts(updated);
    localStorage.setItem('avgeek_liked_posts', JSON.stringify(updated));

    // Update likesMap count
    const currentCount = likesMap[postId] || 0;
    const newCount = isLikedNow ? currentCount + 1 : Math.max(0, currentCount - 1);
    const updatedMap = {
      ...likesMap,
      [postId]: newCount
    };
    setLikesMap(updatedMap);
    localStorage.setItem('avgeek_likes_map', JSON.stringify(updatedMap));
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const postComments = commentsMap[postId] || [];
    const newComment = {
      id: `comment-${Date.now()}`,
      username: username || 'anonymous',
      text: newCommentText.trim(),
      created_at: new Date().toISOString()
    };

    const updated = {
      ...commentsMap,
      [postId]: [...postComments, newComment]
    };
    setCommentsMap(updated);
    localStorage.setItem('avgeek_comments', JSON.stringify(updated));
    setNewCommentText('');
  };

  const getMockComments = (postId) => {
    // Return empty by default as requested: no demo comments
    return [];
  };

  const getMockStats = (postId) => {
    const isLiked = likedPosts.includes(postId);
    const likes = likesMap[postId] || 0;

    // Count user's custom comments for this post
    const localComments = commentsMap[postId] || [];
    const commentsCount = localComments.length;

    return { likes, commentsCount, isLiked };
  };
  const handleDeletePost = async (postId) => {
    const isSure = window.confirm("Are you sure you want to delete this aviation broadcast?");
    if (!isSure) return;

    const isMock = String(postId).startsWith('mock-');
    if (supabase && !isMock) {
      try {
        // 1. Delete associated media files from storage bucket
        const targetPost = posts.find(p => p.id === postId);
        if (targetPost) {
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
        }

        // 2. Delete database post record
        const { error } = await supabase
          .from('community_posts')
          .delete()
          .eq('id', postId);
        if (error) throw error;

        // 3. Update local state directly
        setPosts(prev => prev.filter(post => post.id !== postId));
      } catch (err) {
        console.warn('[aVgeek Connect] Supabase delete failed, falling back to Local Storage:', err.message);
      }
    } else {
      // Mock / Local storage deletion
      const saved = JSON.parse(localStorage.getItem('avgeek_posts') || '[]');
      const updated = saved.filter(post => post.id !== postId);
      localStorage.setItem('avgeek_posts', JSON.stringify(updated));
      setPosts(updated);
    }

    setSelectedPost(null);
    setStatusMessage({ type: 'success', text: 'Broadcast deleted successfully.' });
  };

  const handleDeleteComment = (postId, commentId) => {
    const isSure = window.confirm("Are you sure you want to delete this comment?");
    if (!isSure) return;

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
    }
    
    // Trigger re-render of modal by creating a new reference
    setSelectedPost(prev => ({ ...prev }));
    setStatusMessage({ type: 'success', text: 'Comment deleted successfully.' });
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
  const handleSignOut = async () => {
    const isSure = window.confirm("Are you sure you want to sign out from aVgeek Connect?");
    if (!isSure) return;

    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('avgeek_mock_user');
    setSession(null);
    setStatusMessage({ type: 'success', text: 'Signed out successfully.' });
    onClose();
  };

  const handleClosePortal = async () => {
    if (session) {
      const isSure = window.confirm("Are you sure you want to sign out and exit?");
      if (!isSure) return;

      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('avgeek_mock_user');
      setSession(null);
    }
    onClose();
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
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

    // 1. If there are totally invalid files (like text, pdf, mp3), alert and reject them completely!
    if (invalidFiles.length > 0) {
      alert(`Invalid file format detected: ${invalidFiles.join(', ')}.\nOnly image and video files (.jpg, .jpeg, .png, .mp4, etc.) are allowed. Document, audio, and text files are strictly restricted.`);
      e.target.value = '';
      return;
    }

    // 2. If warning files (.heic, .mov) are selected, present warning confirmation
    if (warningFiles.length > 0) {
      const proceed = window.confirm(
        `Media files with extensions .HEIC and .MOV may not be visible on some devices due to browser restrictions. Are you sure you want to proceed? .JPG, .JPEG, or .mp4 files are preferred.`
      );
      if (!proceed) {
        e.target.value = '';
        return;
      }
    }

    if (validFiles.length === 0) return;

    // Add valid files to state
    const newFiles = [...uploadFiles, ...validFiles];
    setUploadFiles(newFiles);

    const newPreviews = validFiles.map(file => {
      const isVid = file.type.startsWith('video/') || file.name.toLowerCase().endsWith('.mp4') || file.name.toLowerCase().endsWith('.mov') || file.name.toLowerCase().endsWith('.webm');
      return {
        url: URL.createObjectURL(file),
        type: isVid ? 'video' : 'image',
        name: file.name
      };
    });
    setFilePreviews([...filePreviews, ...newPreviews]);

    // Reset input element value to allow same-file selection triggers
    e.target.value = '';
  };

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
      setStatusMessage({ type: 'error', text: 'Please select at least one photo or video to upload.' });
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
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
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
      <header className="relative z-10 bg-[#1c0709]/60 backdrop-blur-md border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        <div className="select-none">
          <h1 className="font-brand font-semibold text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#e31c25] to-[#ffc72c]">
            aVgeek Connect
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>@{username || session.user.email.split('@')[0]}</span>
            </div>
          )}

          {session && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          )}

          <button
            onClick={handleClosePortal}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
            title="Back to Portfolio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 3. Main Dashboard Wrapper */}
      <main className="relative z-10 flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full min-h-[calc(100vh-120px)] flex flex-col py-6">

          {/* Status Toast Banner */}
          {statusMessage && (
            <div className={`max-w-md mx-auto mb-6 px-4 py-3 rounded-xl border flex items-center gap-3 animate-slideUp text-xs font-semibold ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/65 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/65 border-rose-500/30 text-rose-300'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMessage.text}</span>
              <button onClick={() => setStatusMessage(null)} className="ml-auto hover:text-white cursor-pointer"><X className="w-3.5 h-3.5" /></button>
            </div>
          )}

          {!session ? (
            /* =======================================
               A. UNAUTHENTICATED: SLEEK LOGIN CARD
               ======================================= */
            <div className="flex-1 flex items-center justify-center py-4 sm:py-12 px-2 sm:px-4">
              <div className="bg-zinc-950/95 border border-white/10 p-5 sm:p-10 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full text-center flex flex-col gap-4 sm:gap-6 select-none animate-slideUp mx-auto">
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto flex items-center justify-center bg-white/5 border border-white/15 rounded-full shadow-inner">
                  <Plane className="w-7 h-7 sm:w-10 sm:h-10 text-[#ffec4e] rotate-45 transform hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h2 className="font-heading font-black text-xl sm:text-2xl tracking-wide">Welcome to the Hangar</h2>
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
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.76 5.76 0 0 1 8.2 12.8a5.76 5.76 0 0 1 5.79-5.8c1.47 0 2.8.536 3.834 1.417L20.94 5.3A9.9 9.9 0 0 0 13.99 2.2a9.9 9.9 0 0 0-9.9 9.9 9.9 9.9 0 0 0 9.9 9.9 9.9 9.9 0 0 0 9.9-9.9c0-.62-.055-1.226-.16-1.815H12.24Z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>

                  {!supabase && (
                    <div className="mt-1 text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 select-none">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Sandbox Mode Enabled</span>
                    </div>
                  )}

                  {/* Sandbox Demo Login Toggle */}
                  {!showDemoLogin ? (
                    <button
                      onClick={() => setShowDemoLogin(true)}
                      className="text-xs text-[#ffec4e] hover:text-[#ffea2e] font-semibold underline underline-offset-4 cursor-pointer mt-1 sm:mt-2 hover:scale-[1.01] transition-transform"
                    >
                      Use email address
                    </button>
                  ) : (
                    <form onSubmit={handleDemoLoginSubmit} className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2.5 sm:gap-3 animate-slideUp">
                      <label className="text-left text-xs font-bold text-zinc-300">Enter Demo Email:</label>
                      <input
                        type="email"
                        required
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="pilot.delta@gmail.com"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-zinc-900 border border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:border-[#ffec4e]"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-lg bg-[#d10000] hover:bg-[#b00000] text-xs font-extrabold uppercase tracking-wide transition-colors cursor-pointer"
                        >
                          Confirm Login
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDemoLogin(false)}
                          className="px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-4 pb-12">
              
              {/* Left Column: Create Post Form */}
              <div className="md:col-span-5 bg-zinc-950/90 border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl flex flex-col gap-4 sm:gap-6 animate-slideUp">
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
                      className="group relative border-2 border-dashed border-white/15 hover:border-[#ffec4e]/40 rounded-xl py-4 sm:py-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white/2 hover:bg-white/5 select-none"
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
                          <div key={index} className="aspect-square bg-zinc-900 border border-white/10 rounded-lg overflow-hidden relative group/preview select-none animate-scaleUp">
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
                      className="w-full text-xs font-body leading-relaxed bg-zinc-900/65 border border-white/10 rounded-xl p-3 text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffec4e] focus:bg-zinc-900 transition-colors resize-none"
                    />
                  </div>

                  {/* Post Submit Button */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-[#d10000] hover:bg-[#b00000] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-brand font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-99 cursor-pointer shadow-md"
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
              </div>

              {/* Right Column: Feed posts */}
              <div className="md:col-span-7 flex flex-col gap-6 min-h-[500px]">
                <div className="flex items-center justify-between select-none">
                  <h3 className="font-heading font-black text-sm sm:text-base md:text-lg tracking-wide uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#ffec4e]" />
                    Global Radar Feed
                  </h3>
                  <button
                    onClick={fetchPosts}
                    disabled={loading}
                    className="text-xs text-[#ffec4e] hover:text-[#ffea2e] font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    Refresh Radar
                  </button>
                </div>

                {/* Community Feed Filter Tabs */}
                <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10 select-none">
                  {[
                    { id: 'all', label: 'All Feeds' },
                    { id: 'community', label: 'Spotters Feed' },
                    { id: 'official', label: 'Vignette Highlights' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFeedTab(tab.id)}
                      className={`flex-1 py-2 px-1 sm:px-3 rounded-lg text-[8.5px] sm:text-[10px] font-brand font-black uppercase tracking-wider transition-all cursor-pointer ${
                        feedTab === tab.id
                          ? 'bg-gradient-to-r from-[#e31c25] to-[#ff7a00] text-white shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

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

                  return (
                    /* Render Posts Grid (Instagram style) */
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-1.5 sm:gap-3 md:max-h-[800px] md:overflow-y-auto pr-1 custom-scrollbar">
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
                            className="group aspect-square bg-zinc-900 border border-white/5 rounded-lg overflow-hidden relative cursor-pointer hover:scale-[1.01] hover:shadow-xl transition-all duration-300 select-none animate-scaleUp"
                          >
                            {/* Render Thumbnail Media */}
                            {isVideo ? (
                              <div className="w-full h-full bg-black relative flex items-center justify-center">
                                <video
                                  src={firstMedia}
                                  className="w-full h-full object-cover pointer-events-none"
                                  preload="none"
                                  muted
                                  playsInline
                                />
                                <span className="absolute top-2 right-2 bg-black/60 p-1.5 rounded text-white text-[9px] font-brand uppercase font-extrabold flex items-center gap-0.5 shadow-md">
                                  <Video className="w-3.5 h-3.5 text-[#ffec4e]" />
                                </span>
                              </div>
                            ) : (
                              <img
                                src={firstMedia}
                                alt={post.caption || 'Aviation image'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                loading="lazy"
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
                  );
                })()}
              </div>

            </div>
          )}

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
            <div className="relative z-10 bg-zinc-950 border border-white/10 rounded-2xl max-w-4xl w-full h-[90vh] md:h-[80vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl animate-scaleUp">
              {/* Close Button Mobile */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-zinc-400 hover:text-white md:hidden border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* A. Left Side: Media Viewport */}
              <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative select-none border-b md:border-b-0 md:border-r border-white/10 aspect-square md:h-full group/modalmedia">
                {isCurrentVideo ? (
                  <video
                    key={currentMedia}
                    src={currentMedia}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    preload="metadata"
                    className="w-full h-full object-contain animate-fadeIn"
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    key={currentMedia}
                    src={currentMedia}
                    alt={post.caption || 'Aviation highlight'}
                    className="w-full h-full object-contain animate-fadeIn"
                  />
                )}

                {/* Left/Right Carousel Controls */}
                {mediaList.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveSlideIndex(prev => prev > 0 ? prev - 1 : mediaList.length - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-105 transition-all z-20 cursor-pointer border border-white/5 opacity-0 group-hover/modalmedia:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setActiveSlideIndex(prev => prev < mediaList.length - 1 ? prev + 1 : 0)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/85 hover:scale-105 transition-all z-20 cursor-pointer border border-white/5 opacity-0 group-hover/modalmedia:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
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
              <div className="w-full md:w-2/5 flex flex-col h-auto md:h-full bg-zinc-950 text-white font-body relative">
                {/* 1. Header Control Panel */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-brand font-black text-xs sm:text-sm text-zinc-200 block">
                        @{post.username || post.email.split('@')[0]}
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
                      return (
                        <button
                          onClick={() => {
                            if (canDelete) handleDeletePost(post.id);
                          }}
                          disabled={!canDelete}
                          className={`p-1.5 rounded-full transition-all border mr-1 ${
                            canDelete
                              ? 'hover:bg-rose-500/10 text-rose-400 hover:text-rose-500 border-transparent hover:border-rose-500/20 cursor-pointer'
                              : 'text-zinc-600 bg-transparent border-transparent cursor-not-allowed opacity-50'
                          }`}
                          title={canDelete ? "Delete Broadcast" : "Only the post creator or Vignette Admin can delete this post"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      );
                    })()}

                    <div className={`px-2 py-0.5 rounded text-[9px] font-brand font-extrabold uppercase tracking-wider ${
                      post.email === 'vignetteworks.official@gmail.com'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-[#ffec4e]/10 text-[#ffec4e] border border-[#ffec4e]/20'
                    }`}>
                      {post.email === 'vignetteworks.official@gmail.com' ? 'ADMIN' : 'SPOTTER'}
                    </div>

                    <button
                      onClick={() => setSelectedPost(null)}
                      className="hidden md:block p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 2. Scrollable Comments / Captions list */}
                <div className="max-h-[280px] md:max-h-none md:flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar text-xs">
                  {/* User original caption */}
                  {post.caption && (
                    <div className="flex gap-2.5 pb-3 border-b border-white/5">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="leading-relaxed">
                          <span className="font-brand font-black text-zinc-200 mr-1.5">
                            @{post.username || post.email.split('@')[0]}
                          </span>
                          {post.caption}
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
                        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 flex flex-col gap-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <p className="leading-relaxed text-zinc-300">
                              <span className="font-brand font-black text-zinc-200 mr-1.5">
                                @{comm.username}
                              </span>
                              {comm.text}
                            </p>

                            {/* Delete comment button */}
                            {(comm.username === username || (session && (post.user_id === session.user?.id || post.email === session.user?.email || session.user?.email === 'vignetteworks.official@gmail.com'))) && (
                              <button
                                onClick={() => handleDeleteComment(post.id, comm.id)}
                                className="opacity-0 group-hover/comment:opacity-100 p-1 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer rounded hover:bg-white/5"
                                title="Delete Comment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
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
                <div className="p-4 border-t border-white/5 bg-zinc-950/40 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="group flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer"
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
                        <span className="text-xs font-bold text-zinc-300">{likes} likes</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadMedia(currentMedia, post.id, isCurrentVideo)}
                        className="text-xs text-[#ffec4e] hover:text-[#ffea2e] font-semibold underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Interactive comments submission form */}
                <form
                  onSubmit={(e) => handleAddComment(e, post.id)}
                  className="p-3 border-t border-white/5 flex gap-2 items-center bg-zinc-950"
                >
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-white/10 rounded-xl text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffec4e]"
                  />
                  <button
                    type="submit"
                    className="text-xs font-brand font-black uppercase text-[#ffec4e] hover:text-[#ffea2e] transition-colors cursor-pointer px-2"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
