import React, { useState, useMemo } from 'react';
import { NGO } from '../data/mockData';

interface ExploreNGOsProps {
  ngos: NGO[];
  onSelectNGO: (ngoId: string) => void;
  onOpenDonate: (ngoId?: string) => void;
  onNavigate: (view: string) => void;
}

export const ExploreNGOs: React.FC<ExploreNGOsProps> = ({
  ngos,
  onSelectNGO,
  onOpenDonate,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCause, setSelectedCause] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('impactful');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // QA Developer View States
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [forceEmpty, setForceEmpty] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const causeOptions = [
    { key: 'all', label: 'All Causes', count: 38 },
    { key: 'education', label: 'Education', count: 12 },
    { key: 'animal welfare', label: 'Animal Welfare', count: 8 },
    { key: 'environment', label: 'Environment', count: 9 },
    { key: 'hunger relief', label: 'Hunger Relief', count: 7 },
    { key: 'healthcare', label: 'Healthcare', count: 5 },
    { key: 'community development', label: 'Community Development', count: 6 },
  ];

  const filteredNGOs = useMemo(() => {
    if (forceEmpty) return [];

    return ngos.filter(ngo => {
      const matchCause = selectedCause === 'all' || ngo.cause === selectedCause;
      const matchCity = selectedCity === 'all' || ngo.city === selectedCity;
      const matchVerified = !verifiedOnly || ngo.verified;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        ngo.name.toLowerCase().includes(q) ||
        ngo.causeLabel.toLowerCase().includes(q) ||
        ngo.location.toLowerCase().includes(q) ||
        ngo.cityLabel.toLowerCase().includes(q);

      return matchCause && matchCity && matchVerified && matchSearch;
    });
  }, [ngos, selectedCause, selectedCity, verifiedOnly, searchQuery, forceEmpty]);

  const handleResetFilters = () => {
    setSelectedCause('all');
    setSelectedCity('all');
    setSearchQuery('');
    setVerifiedOnly(true);
    setForceEmpty(false);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setAllLoaded(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ================= HERO & DISCOVER BAR ================= */}
      <section className="relative w-full overflow-hidden bg-[#f1f4f1] pt-6 pb-10 border-b border-[#becabc]/20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#95f8a7]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#6ffbbe]/25 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumb & Live Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs">
              <button onClick={() => onNavigate('landing')} className="hover:underline cursor-pointer">
                Humanitarian Ledger
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#00652c] font-semibold">Directory of Audited NGOs</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecefeb] rounded-full text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00652c] animate-pulse"></span>
              <span>142 Active Verified Field Teams Today</span>
            </div>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mb-6">
            <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase text-[#006443] font-bold mb-1 block">
              Vetted Grassroots Impact
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#181c1a] tracking-tight leading-tight">
              Discover organizations making a measurable difference.
            </h1>
            <p className="text-sm sm:text-base text-[#3f493f] mt-2">
              Explore transparent grassroots initiatives with blockchain-audited ledger records, field verification certificates, and real-time community receipts.
            </p>
          </div>

          {/* Global Search Command Bar */}
          <div className="relative bg-white p-2 rounded-2xl shadow-lg max-w-4xl border border-[#becabc]/30 transition-all focus-within:shadow-xl focus-within:border-[#15803d]">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              <div className="flex items-center flex-1 px-3 py-1 gap-2.5">
                <span className="material-symbols-outlined text-[#6f7a6e] text-[24px]">search</span>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-[#181c1a] placeholder:text-[#6f7a6e] focus:outline-none"
                  placeholder="Search NGOs by name, cause (e.g. Education, Environment), or city..."
                  type="text"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#6f7a6e] hover:text-[#181c1a] p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-end px-2 md:px-0">
                <button
                  onClick={() => document.getElementById('ngo-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                  <span>Find NGOs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cause Filter Chips */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {causeOptions.map(option => (
                <button
                  key={option.key}
                  onClick={() => setSelectedCause(option.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer ${
                    selectedCause === option.key
                      ? 'bg-[#15803d] text-white shadow-sm'
                      : 'bg-[#ecefeb] hover:bg-[#e6e9e5] text-[#181c1a]'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>

            {/* Sub-Filters Bar: Location, Sort, Verified Toggle, Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                {/* Location Filter */}
                <div className="relative inline-flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6f7a6e] absolute left-3 pointer-events-none">
                    location_on
                  </span>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="appearance-none bg-white text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold pl-9 pr-8 py-2 rounded-xl shadow-xs border border-[#becabc]/30 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="delhi">Delhi</option>
                    <option value="bengaluru">Bengaluru</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-[#6f7a6e] absolute right-2.5 pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Sort Selector */}
                <div className="relative inline-flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6f7a6e] absolute left-3 pointer-events-none">
                    swap_vert
                  </span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-white text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold pl-9 pr-8 py-2 rounded-xl shadow-xs border border-[#becabc]/30 focus:outline-none cursor-pointer"
                  >
                    <option value="impactful">Most Impactful</option>
                    <option value="active">Recently Active</option>
                    <option value="nearby">Nearby</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-[#6f7a6e] absolute right-2.5 pointer-events-none">
                    expand_more
                  </span>
                </div>

                {/* Verified Only Toggle */}
                <label className="inline-flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl shadow-xs border border-[#becabc]/30 select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={e => setVerifiedOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-[#e0e3e0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00652c] relative"></div>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#00652c] fill-1">verified</span>
                    Verified Only
                  </span>
                </label>
              </div>

              {/* View Mode & Count */}
              <div className="flex items-center gap-3 ml-auto">
                <span id="ngo-results" className="text-xs font-medium text-[#3f493f] scroll-mt-28">
                  Showing {filteredNGOs.length} {verifiedOnly ? 'verified ' : ''}NGOs
                </span>
                <div className="hidden sm:inline-flex bg-[#ecefeb] p-0.5 rounded-lg border border-[#becabc]/30">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-white text-[#00652c] shadow-xs' : 'text-[#6f7a6e]'}`}
                    title="Grid View"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded cursor-pointer ${viewMode === 'list' ? 'bg-white text-[#00652c] shadow-xs' : 'text-[#6f7a6e]'}`}
                    title="List View"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT SHOWCASE ================= */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-8 w-full">
        {/* Active Constraints Summary Banner */}
        <div className="flex items-center justify-between mb-6 bg-[#f1f4f1] px-4 py-2.5 rounded-xl border border-[#becabc]/30">
          <div className="flex items-center gap-2 flex-wrap text-xs text-[#3f493f]">
            <span className="uppercase tracking-wider font-semibold text-[#6f7a6e]">Active Constraints:</span>
            <span className="bg-white text-[#00652c] font-semibold px-2.5 py-0.5 rounded-md shadow-xs border border-[#becabc]/30">
              Cause: <strong className="capitalize">{selectedCause}</strong>
            </span>
            <span className="bg-white text-[#181c1a] font-semibold px-2.5 py-0.5 rounded-md shadow-xs border border-[#becabc]/30">
              City: <strong className="capitalize">{selectedCity}</strong>
            </span>
            {verifiedOnly && (
              <span className="bg-[#95f8a7] text-[#005323] px-2.5 py-0.5 rounded-md font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span> Strict Proof Verified
              </span>
            )}
          </div>
          <button
            onClick={handleResetFilters}
            className="text-[#006443] hover:text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span> Reset All
          </button>
        </div>

        {/* Skeleton Loader Mode Preview */}
        {showSkeleton ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-[#becabc]/30 shadow-xs">
                <div className="h-44 bg-[#e6e9e5] rounded-xl mb-4"></div>
                <div className="h-6 w-3/4 bg-[#ecefeb] rounded mb-3"></div>
                <div className="h-4 w-full bg-[#f1f4f1] rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-[#f1f4f1] rounded mb-4"></div>
                <div className="h-16 bg-[#ecefeb] rounded-xl mb-4"></div>
                <div className="h-10 bg-[#e6e9e5] rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : filteredNGOs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-[#f1f4f1] rounded-3xl border border-[#becabc]/30 my-4">
            <div className="w-16 h-16 rounded-full bg-[#e0e3e0] flex items-center justify-center text-[#6f7a6e] mb-4">
              <span className="material-symbols-outlined text-[32px]">manage_search</span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#181c1a] mb-1">
              No Verified NGOs Matched
            </h3>
            <p className="text-sm text-[#3f493f] max-w-md mb-6 leading-relaxed">
              We couldn't find an organization matching all criteria in our current verified register. Try selecting "All Causes" or clearing your location filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl hover:bg-[#15803d] shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Clear Search Filters</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of NGO Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNGOs.map(ngo => (
              <article
                key={ngo.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#becabc]/30"
              >
                {/* Visual Header */}
                <div className="relative h-48 w-full overflow-hidden bg-[#e6e9e5]">
                  <img
                    alt={ngo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={ngo.heroImage}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Cause Badge Top-Left */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs backdrop-blur-md ${
                        ngo.cause === 'education'
                          ? 'bg-[#95f8a7] text-[#005323]'
                          : ngo.cause === 'animal welfare'
                          ? 'bg-[#ffdbd0] text-[#390c00]'
                          : ngo.cause === 'environment'
                          ? 'bg-[#6ffbbe] text-[#002113]'
                          : ngo.cause === 'hunger relief'
                          ? 'bg-[#ffdbd0] text-[#ac3400]'
                          : ngo.cause === 'healthcare'
                          ? 'bg-[#6ffbbe] text-[#005236]'
                          : 'bg-[#e6e9e5] text-[#181c1a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {ngo.cause === 'education'
                          ? 'school'
                          : ngo.cause === 'animal welfare'
                          ? 'pets'
                          : ngo.cause === 'environment'
                          ? 'eco'
                          : ngo.cause === 'hunger relief'
                          ? 'soup_kitchen'
                          : ngo.cause === 'healthcare'
                          ? 'medical_services'
                          : 'handshake'}
                      </span>
                      <span>{ngo.causeLabel}</span>
                    </span>
                  </div>

                  {/* Location Badge Top-Right */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-xs bg-white/90 text-[#181c1a] backdrop-blur-md shadow-xs">
                      <span className="material-symbols-outlined text-[13px] text-[#00652c]">pin_drop</span>
                      <span>{ngo.cityLabel}</span>
                    </span>
                  </div>

                  {/* Live Activity Indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white font-['Plus_Jakarta_Sans'] text-xs drop-shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#79db8d] animate-pulse"></span>
                    <span>{ngo.liveActivity}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a] group-hover:text-[#00652c] transition-colors">
                      {ngo.name}
                    </h2>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95f8a7] text-[#005323] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex-shrink-0"
                      title="Kindred Verified Organization"
                    >
                      <span className="material-symbols-outlined text-[14px] fill-1">verified</span>
                      <span>Verified</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#3f493f] mb-4 line-clamp-2 leading-relaxed">
                    {ngo.description}
                  </p>

                  {/* Impact Metrics Bento */}
                  <div className="mt-auto pt-3 bg-[#f1f4f1] rounded-xl p-3 mb-4 border border-[#becabc]/20">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00652c] block">
                          {ngo.impactMetrics.primaryNumber}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider block">
                          {ngo.impactMetrics.primaryLabel}
                        </span>
                      </div>
                      <div className="border-x border-[#becabc]/40 px-1">
                        <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#181c1a] block">
                          {ngo.impactMetrics.storiesCount}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider block">
                          Stories
                        </span>
                      </div>
                      <div>
                        <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#181c1a] block">
                          {ngo.impactMetrics.extraNumber}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider block">
                          {ngo.impactMetrics.extraLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectNGO(ngo.id)}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 bg-[#00652c] hover:bg-[#15803d] text-white rounded-xl font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all active:scale-[0.98] shadow-xs cursor-pointer"
                    >
                      <span>View Profile</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    <button
                      onClick={() => onOpenDonate(ngo.id)}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#00652c] rounded-xl font-['Plus_Jakarta_Sans'] text-xs font-semibold border border-[#becabc]/30 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">volunteer_activism</span>
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-4">
            {filteredNGOs.map(ngo => (
              <div
                key={ngo.id}
                className="bg-white rounded-2xl p-5 border border-[#becabc]/30 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    alt={ngo.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    src={ngo.avatar}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a]">
                        {ngo.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#95f8a7] text-[#005323] text-[10px] font-bold">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-[#3f493f] mt-0.5 line-clamp-1">{ngo.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[#6f7a6e]">
                      <span>{ngo.causeLabel}</span>
                      <span>•</span>
                      <span>{ngo.location}</span>
                      <span>•</span>
                      <span className="text-[#00652c] font-semibold">{ngo.liveActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                  <div className="hidden lg:flex items-center gap-4 text-center mr-2">
                    <div>
                      <span className="font-bold text-sm text-[#00652c] block">{ngo.impactMetrics.primaryNumber}</span>
                      <span className="text-[10px] text-[#6f7a6e]">{ngo.impactMetrics.primaryLabel}</span>
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#181c1a] block">{ngo.impactMetrics.storiesCount}</span>
                      <span className="text-[10px] text-[#6f7a6e]">Stories</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectNGO(ngo.id)}
                    className="px-4 py-2 bg-[#00652c] text-white rounded-xl font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#15803d] cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => onOpenDonate(ngo.id)}
                    className="px-4 py-2 bg-[#15803d] text-white rounded-xl font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#00652c] cursor-pointer"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Pagination / Load More */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleLoadMore}
            disabled={allLoaded || isLoadingMore}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-[#f1f4f1] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-2xl shadow-sm border border-[#becabc]/30 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {isLoadingMore ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Auditing Ledger Records...</span>
              </>
            ) : allLoaded ? (
              <span>All 38 Current Verified NGOs Loaded</span>
            ) : (
              <>
                <span>Load More Verified NGOs</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </>
            )}
          </button>

          {/* Developer QA View State Toggles */}
          <div className="flex items-center gap-3 mt-1 text-xs text-[#6f7a6e]">
            <span className="text-[#6f7a6e]">Developer View State:</span>
            <button
              onClick={() => setShowSkeleton(!showSkeleton)}
              className="underline hover:text-[#00652c] cursor-pointer"
            >
              {showSkeleton ? 'Hide Skeleton' : 'Preview Skeleton Loader'}
            </button>
            <span>•</span>
            <button
              onClick={() => setForceEmpty(!forceEmpty)}
              className="underline hover:text-[#00652c] cursor-pointer"
            >
              {forceEmpty ? 'Restore NGOs' : 'Preview Empty State'}
            </button>
          </div>
        </div>
      </section>

      {/* ================= KINDRED TRIPLE-AUDIT CALLOUT ================= */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 pb-14 w-full">
        <div className="bg-[#e6e9e5]/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-[#becabc]/30">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold">
              <span className="material-symbols-outlined text-[18px] fill-1">shield</span>
              <span>Kindred Triple-Audit Protocol</span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#181c1a]">
              Are you a registered NGO or non-profit?
            </h3>
            <p className="text-xs sm:text-sm text-[#3f493f] leading-relaxed">
              Undergo zero-knowledge financial audits and on-ground satellite geolocation tracking to be cataloged on our global transparent donor ledger.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl shadow-xs border border-[#becabc]/30 hover:bg-[#ecefeb] transition-all cursor-pointer"
            >
              Learn Verification Steps
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#15803d] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl shadow-md hover:bg-[#00652c] transition-all cursor-pointer"
            >
              Apply for Verification
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
