import React, { useState } from 'react';
import { ImpactPost, STORIES_DATA } from '../data/mockData';

interface ImpactFeedProps {
  posts: ImpactPost[];
  onOpenStory: (storyId: string) => void;
  onOpenDonate: (ngoId?: string) => void;
  onNavigate: (view: string) => void;
  onSelectNGO: (ngoId: string) => void;
}

export const ImpactFeed: React.FC<ImpactFeedProps> = ({
  posts,
  onOpenStory,
  onOpenDonate,
  onNavigate,
  onSelectNGO
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [feedPosts, setFeedPosts] = useState<ImpactPost[]>(posts);
  const [followedNGOs, setFollowedNGOs] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = p.liked;
          return {
            ...p,
            liked: !isLiked,
            likes: isLiked ? p.likes - 1 : p.likes + 1
          };
        }
        return p;
      })
    );
  };

  const handleFollow = (ngoName: string) => {
    setFollowedNGOs(prev => ({
      ...prev,
      [ngoName]: !prev[ngoName]
    }));
  };

  const handleSavePost = (postId: string) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;

    setFeedPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [
              ...p.comments,
              {
                author: 'Aditya Kharat',
                text,
                timeAgo: 'Just now'
              }
            ]
          };
        }
        return p;
      })
    );

    setCommentInput(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  const handleShare = (hash: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://kindredhub.org/verify/${hash}`);
    }
    setShareToast(`Verified link with Proof Hash ${hash} copied!`);
    setTimeout(() => setShareToast(null), 3000);
  };

  const filteredPosts = feedPosts.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'education') return p.cause.toLowerCase().includes('education');
    if (activeFilter === 'animal') return p.cause.toLowerCase().includes('animal');
    if (activeFilter === 'environment') return p.cause.toLowerCase().includes('environment');
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#181c1a] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans'] animate-bounce">
          <span className="material-symbols-outlined text-[#79db8d] text-[18px]">check_circle</span>
          <span>{shareToast}</span>
        </div>
      )}

      <div className="max-w-[1240px] w-full mx-auto px-4 md:px-8 py-6">
        {/* Desktop 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT SIDEBAR (Sticky Navigation & Member Profile) ================= */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-4 sticky top-24">
            {/* User Mini Profile Card */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#becabc]/30 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#95f8a7]/25 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    alt="Aditya Kharat portrait"
                    className="w-14 h-14 rounded-full object-cover border border-[#becabc]/40"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA9P1P9xLJgxxy9TgNblbS6c3hEgZUpbmky3M2BV866kQjeW-HN9TEIthUlnfusYatmMp_xJ4clvu2xH9ytfhT9CK4psyt_3OBiv8vpmSQFiB2zgG8TqrkHuKCRqd9_r5tixXPM1D5-YwAZ2z5JgE_k8yMis-d_XHuQxvLlajrqxeLfn42sfiYdk_xtfpyLyxThSarmuBvDJ9xJaevg_hcUJcJ4orQO9aRyEhVGZypPaQz3OqKleun"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#15803d] rounded-full flex items-center justify-center text-white text-[10px] shadow-sm">
                    <span className="material-symbols-outlined text-[12px] fill-1">verified</span>
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a] truncate">
                    Aditya Kharat
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-['Plus_Jakarta_Sans'] font-semibold bg-[#d3ffd5] text-[#005323] mt-0.5">
                    Impact Member
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2.5 bg-[#f1f4f1] rounded-xl text-center mb-4 border border-[#becabc]/20">
                <div className="p-1">
                  <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00652c]">12</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                    Stories Viewed
                  </p>
                </div>
                <div className="p-1 border-l border-[#becabc]/40">
                  <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#006443]">2</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                    Certificates
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 text-sm font-medium">
                <button
                  onClick={() => onNavigate('feed')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#e6e9e5] text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-semibold cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] fill-1 text-[#00652c]">dynamic_feed</span>
                    <span>Impact Feed</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#15803d]"></span>
                </button>
                <button
                  onClick={() => onNavigate('explore')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#3f493f] hover:bg-[#ecefeb] hover:text-[#181c1a] transition-colors text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                  <span>Explore NGOs</span>
                </button>
                <button
                  onClick={() => onNavigate('map')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#3f493f] hover:bg-[#ecefeb] hover:text-[#181c1a] transition-colors text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  <span>Impact Heatmap</span>
                </button>
                <button
                  onClick={() => onNavigate('certificates')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#3f493f] hover:bg-[#ecefeb] hover:text-[#181c1a] transition-colors text-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>Certificates</span>
                </button>
              </nav>
            </div>

            {/* Filter by Causes Widget */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#becabc]/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#181c1a] uppercase tracking-wider">
                  Filter by Causes
                </h4>
                <span className="text-[10px] font-bold text-[#00652c] bg-[#d3ffd5] px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Education', count: 48, key: 'education' },
                  { label: 'Animal Rescue', count: 32, key: 'animal' },
                  { label: 'Urban Greening', count: 19, key: 'environment' },
                  { label: 'Disaster Relief', count: 14, key: 'all' },
                  { label: 'Clean Water', count: 9, key: 'all' }
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => setActiveFilter(item.key)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans'] transition-all cursor-pointer ${
                      activeFilter === item.key
                        ? 'bg-[#15803d] text-white shadow-xs'
                        : 'bg-[#ecefeb] text-[#3f493f] hover:bg-[#e0e3e0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="px-1.5 py-0.2 bg-white/30 rounded-full text-[10px]">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 100% Cryptographic Deeds Assurance */}
            <div className="bg-[#95f8a7]/20 rounded-2xl p-4 border border-[#79db8d]/30">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[22px] fill-1">shield</span>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00652c]">
                    100% Cryptographic Deeds
                  </p>
                  <p className="text-[11px] text-[#3f493f] mt-1 leading-relaxed">
                    All field impacts on this feed undergo dual verification with geotagged on-site logs and auditor signatures.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= CENTER MAIN COLUMN (Stories, Tabs & Feed Cards) ================= */}
          <main className="col-span-1 lg:col-span-6 flex flex-col gap-5 min-w-0">
            {/* Active Impacts & Highlights Avatar Strip (Instagram-style Stories) */}
            <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#becabc]/30">
              <div className="flex items-center justify-between mb-3">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00652c] text-[18px]">verified</span>
                  Verified Field Highlights
                </span>
                <span className="text-[11px] text-[#6f7a6e]">Tap to view updates</span>
              </div>

              <div className="flex items-center gap-4 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {STORIES_DATA.map(story => (
                  <button
                    key={story.id}
                    onClick={() => onOpenStory(story.id)}
                    className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
                  >
                    <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-[#00652c] to-[#6ffbbe] transition-transform group-hover:scale-105 shadow-xs">
                      <div className="p-0.5 bg-white rounded-full">
                        <img
                          alt={story.ngoName}
                          className="w-14 h-14 rounded-full object-cover"
                          src={story.avatar}
                        />
                      </div>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#181c1a] font-medium max-w-[72px] truncate text-center">
                      {story.ngoName}
                    </span>
                  </button>
                ))}

                {/* Add Impact / Post Proof Placeholder */}
                <button
                  onClick={() => onNavigate('register')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
                >
                  <div className="w-[62px] h-[62px] rounded-full bg-[#ecefeb] border border-dashed border-[#6f7a6e] flex items-center justify-center text-[#6f7a6e] group-hover:bg-[#15803d] group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#6f7a6e] max-w-[72px] truncate text-center">
                    Post Proof
                  </span>
                </button>
              </div>
            </section>

            {/* Feed Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { key: 'all', label: 'All Stories' },
                { key: 'following', label: 'Following NGOs' },
                { key: 'education', label: 'Education' },
                { key: 'animal', label: 'Animal Welfare' },
                { key: 'environment', label: 'Environment' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    activeFilter === tab.key
                      ? 'bg-[#181c1a] text-white shadow-xs'
                      : 'bg-white text-[#3f493f] hover:bg-[#ecefeb] border border-[#becabc]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Feed Cards List */}
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-xs border border-[#becabc]/30 overflow-hidden transition-all hover:shadow-md"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div
                    onClick={() => onSelectNGO(post.ngoId)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      alt={post.ngoName}
                      className="w-11 h-11 rounded-full object-cover border border-[#becabc]/30 group-hover:ring-2 group-hover:ring-[#00652c] transition-all"
                      src={post.ngoAvatar}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#181c1a] group-hover:text-[#00652c] transition-colors">
                          {post.ngoName}
                        </h3>
                        <span className="material-symbols-outlined text-[#00652c] text-[16px] fill-1">verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6f7a6e] text-xs">
                        <span>{post.location}</span>
                        <span>•</span>
                        <span className="text-[#00652c] font-medium">{post.cause}</span>
                        <span>•</span>
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleShare(post.proofHash)}
                    className="p-1 rounded-full text-[#6f7a6e] hover:bg-[#ecefeb] hover:text-[#181c1a] transition-colors cursor-pointer"
                    title="Share Proof Link"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>

                {/* Highlight Metric Banner */}
                <div className="mx-4 mb-3 p-3 bg-[#95f8a7]/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#79db8d]/30">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00652c] text-[22px]">
                      {post.cause === 'Education'
                        ? 'backpack'
                        : post.cause === 'Animal Welfare'
                        ? 'pets'
                        : 'forest'}
                    </span>
                    <div>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a] leading-tight">
                        {post.headline}
                      </p>
                      <p className="text-[11px] text-[#3f493f]">{post.subheadline}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#15803d] text-white shrink-0 self-start sm:self-center">
                    ✓ {post.badgeText}
                  </span>
                </div>

                {/* High-Impact Photography */}
                <div className="relative w-full aspect-[16/10] bg-[#e6e9e5] overflow-hidden">
                  <img
                    alt={post.headline}
                    className="w-full h-full object-cover"
                    src={post.image}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#2d312f]/85 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-mono shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-[#95f8a7]">location_on</span>
                    <span>{post.gpsBadge}</span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-[#181c1a] leading-relaxed">{post.content}</p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {post.hashtags.map(h => (
                      <span
                        key={h}
                        className="text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:underline cursor-pointer"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Social Actions Bar */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#becabc]/20">
                    <div className="flex items-center gap-4">
                      {/* Like Button */}
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans'] font-semibold transition-colors cursor-pointer ${
                          post.liked ? 'text-[#ba1a1a]' : 'text-[#3f493f] hover:text-[#ba1a1a]'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${post.liked ? 'fill-1' : ''}`}>
                          favorite
                        </span>
                        <span>{post.likes}</span>
                      </button>

                      {/* Comment Toggle */}
                      <button
                        onClick={() =>
                          setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))
                        }
                        className="flex items-center gap-1.5 text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#3f493f] hover:text-[#181c1a] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">mode_comment</span>
                        <span>{post.commentsCount}</span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(post.proofHash)}
                        className="flex items-center gap-1 text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#3f493f] hover:text-[#00652c] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px]">send</span>
                        <span className="hidden sm:inline">Share</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSavePost(post.id)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          savedPosts[post.id] ? 'text-[#00652c]' : 'text-[#6f7a6e] hover:text-[#181c1a]'
                        }`}
                        title="Bookmark Story"
                      >
                        <span className={`material-symbols-outlined text-[20px] ${savedPosts[post.id] ? 'fill-1' : ''}`}>
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Thread & Input */}
                  {expandedComments[post.id] && (
                    <div className="pt-2 space-y-2 bg-[#f1f4f1] p-3 rounded-xl border border-[#becabc]/20">
                      {post.comments.map((c, i) => (
                        <div key={i} className="text-xs">
                          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#181c1a] mr-1.5">
                            {c.author}:
                          </span>
                          <span className="text-[#3f493f]">{c.text}</span>
                        </div>
                      ))}

                      {/* New Comment Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInput[post.id] || ''}
                          onChange={e =>
                            setCommentInput(prev => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                          placeholder="Add a verified community note..."
                          className="flex-1 bg-white text-xs px-3 py-1.5 rounded-lg border border-[#becabc]/30 focus:outline-none focus:ring-1 focus:ring-[#15803d]"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-1.5 bg-[#00652c] text-white text-xs font-semibold rounded-lg hover:bg-[#15803d] transition-colors cursor-pointer"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Primary Verification Link */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectNGO(post.ngoId)}
                      className="inline-flex items-center gap-1 text-[#00652c] hover:underline font-['Plus_Jakarta_Sans'] font-semibold cursor-pointer"
                    >
                      <span>View Verified Impact Report</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    <span className="text-[11px] font-mono text-[#6f7a6e]">
                      Proof Hash: {post.proofHash}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </main>

          {/* ================= RIGHT SIDEBAR (Live Sync, Urgent Drives & Nearby) ================= */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-4 sticky top-24">
            {/* Live Ledger Synced Widget */}
            <div className="bg-gradient-to-br from-white to-[#95f8a7]/20 rounded-2xl p-5 shadow-xs border border-[#becabc]/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider text-[#3f493f] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00652c] animate-pulse"></span>
                  Live Ledger Synced
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] font-bold">2m ago</span>
              </div>

              <div className="my-2">
                <div className="text-3xl font-extrabold text-[#181c1a] tracking-tight font-['Plus_Jakarta_Sans']">
                  14,850+
                </div>
                <p className="text-xs text-[#3f493f]">Verified Lives Directly Impacted</p>
              </div>

              <div className="pt-3 border-t border-[#becabc]/30 flex items-center justify-between">
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a]">18</span>
                  <p className="text-[10px] text-[#6f7a6e]">Vetted Field NGOs</p>
                </div>
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#ac3400]">₹18.4L</span>
                  <p className="text-[10px] text-[#6f7a6e]">Zero-Fee Disbursed</p>
                </div>
              </div>
            </div>

            {/* Trending & Urgent Drives Widget */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#becabc]/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#181c1a]">
                  Urgent Drives
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-['Plus_Jakarta_Sans'] font-bold bg-[#ffdad6] text-[#93000a]">
                  High Priority
                </span>
              </div>

              <div className="space-y-4">
                {/* Drive 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] hover:text-[#00652c] cursor-pointer">
                      Winter Warmth Blankets Drive
                    </p>
                    <span className="text-xs font-bold text-[#ac3400] shrink-0">82%</span>
                  </div>
                  <p className="text-[11px] text-[#6f7a6e]">CareMeals Foundation • 3 days left</p>
                  <div className="w-full h-1.5 bg-[#ecefeb] rounded-full overflow-hidden">
                    <div className="bg-[#fd6b36] h-full rounded-full transition-all" style={{ width: '82%' }}></div>
                  </div>
                </div>

                {/* Drive 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] hover:text-[#00652c] cursor-pointer">
                      Clean Drinking RO Unit for School #14
                    </p>
                    <span className="text-xs font-bold text-[#00652c] shrink-0">94%</span>
                  </div>
                  <p className="text-[11px] text-[#6f7a6e]">Helping Hands • ₹14,000 needed</p>
                  <div className="w-full h-1.5 bg-[#ecefeb] rounded-full overflow-hidden">
                    <div className="bg-[#15803d] h-full rounded-full transition-all" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDonate()}
                className="mt-4 w-full py-2 rounded-xl bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold transition-colors cursor-pointer text-center block"
              >
                Support an Urgent Need →
              </button>
            </div>

            {/* Nearby Verified NGOs to Follow */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#becabc]/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#181c1a]">
                  Nearby Verified NGOs
                </h4>
                <button
                  onClick={() => onNavigate('explore')}
                  className="text-xs text-[#00652c] font-semibold hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'SmileCraft',
                    category: 'Healthcare • 4.2 km',
                    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEivcYzx1MC_KNxcAsqoKTREDXBh5iWtE_brxVHGM7okrl3Oh9yfpWn-_J9iU4Bf6agH4V4Eh8hneaFFsAWXhJ6ivqo6Ph_UjZyv53e27iu_GH61r_QA-a7UEuxWLC4oLce8VQlx3GsrX3MfKiseAOweCLibPBAq_j_UIqoxoLph4MgqZPOVCKO6YAciy-j2eBybf7TlUoib8WUlCTlf9Msr7iHvLGIUdKLti6qW7ehP0YDs5W0Yhp'
                  },
                  {
                    name: 'Vidyapeeth Trust',
                    category: 'Education • 7.8 km',
                    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6epPKTLq5UHMcwIWRYfz4ytkKM1lp4wM92I4PXyYQ14Bb5VCwhGxf1lJhVcYFVNUbP7coJEfj0Cyw2TxF-V0nDHCRPHZZeSA_zsk_aduli27_UdR1cKr0h8VLkuPFSwYgI5lwv4O2D0sMQWdQx7qSg90ihjp1sGrDr8-rxyVFnravNEDrXpxIfNUMoK-HnsvoX2TjnEQUTjGWtm8FLmL2JjkxVQ-ahLEijs9ibcP43ly7ikKjBZsf'
                  },
                  {
                    name: 'CareMeals India',
                    category: 'Nutrition • 9.1 km',
                    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXC1D4E4lk5YpNUjMUAjxowX7i0SuLuDDNO_6yVu-e9ObIbJ5xqy9dn7ylFKWJbvY-_TrClKiC1c7OeymwW3y6lgbTBIUlauCQO3GewWcdj_-uaXORgXt3555zCc8fGO2R9_l7E3qNTrXXBpI-wCILxejyfFUc4xweANCPJ2HC29fOz-p5BoLF-ICdyi0Tc92pO9hWEOToYo-bl70QuBkteRj2ze8FApGjAad9TTzwJQZCZZfVC8ZN'
                  }
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        alt={item.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#becabc]/30"
                        src={item.avatar}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] truncate">
                            {item.name}
                          </p>
                          <span className="material-symbols-outlined text-[#00652c] text-[13px] fill-1">verified</span>
                        </div>
                        <p className="text-[10px] text-[#6f7a6e] truncate">{item.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollow(item.name)}
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans'] font-semibold transition-all cursor-pointer ${
                        followedNGOs[item.name]
                          ? 'bg-[#15803d] text-white shadow-xs'
                          : 'bg-[#ecefeb] text-[#181c1a] hover:bg-[#e0e3e0]'
                      }`}
                    >
                      {followedNGOs[item.name] ? 'Following' : '+ Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Footer */}
            <div className="px-1 text-[11px] text-[#6f7a6e] space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={() => onNavigate('certificates')} className="hover:underline cursor-pointer">
                  Audit Ledger
                </button>
                <span>•</span>
                <button onClick={() => onNavigate('landing')} className="hover:underline cursor-pointer">
                  Verification Guidelines
                </button>
                <span>•</span>
                <span className="text-[#6f7a6e]">API v2.4</span>
              </div>
              <p>© 2026 KindredHub Humanitarian Feed</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
