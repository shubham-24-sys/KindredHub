import React, { useState } from 'react';
import { NGO } from '../data/mockData';

interface InteractiveMapProps {
  ngos: NGO[];
  selectedNGOId: string;
  onSelectNGO: (ngoId: string) => void;
  onOpenDonate: (ngoId?: string) => void;
  onNavigate: (view: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  ngos,
  selectedNGOId,
  onSelectNGO,
  onOpenDonate,
  onNavigate
}) => {
  const [mapSearch, setMapSearch] = useState('Mumbai, Maharashtra');
  const [selectedCause, setSelectedCause] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const [toastVisible, setToastVisible] = useState(true);

  // Active NGO object
  const activeNGO = ngos.find(n => n.id === selectedNGOId) || ngos[0];

  // Nearby hubs: honour search, cause chips and "verified only"; closest first; skip the NGO already shown above
  const visibleHubs = ngos
    .filter(n => {
      const q = mapSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        n.name.toLowerCase().includes(q) ||
        n.location.toLowerCase().includes(q) ||
        n.cityLabel.toLowerCase().includes(q) ||
        // default text is "Mumbai, Maharashtra": match on the city part too
        q.split(',').some(part => part.trim() && n.cityLabel.toLowerCase().includes(part.trim()));
      const matchCause = selectedCause === 'all' || n.cause.startsWith(selectedCause);
      const matchVerified = !verifiedOnly || n.verified;
      return n.id !== activeNGO.id && matchSearch && matchCause && matchVerified;
    })
    .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity))
    .slice(0, 3);

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 1.4) {
      setZoomLevel(prev => Number((prev + 0.1).toFixed(1)));
    } else if (direction === 'out' && zoomLevel > 0.8) {
      setZoomLevel(prev => Number((prev - 0.1).toFixed(1)));
    }
  };

  const handleResetLocation = () => {
    setMapSearch('Mumbai, Maharashtra');
    setZoomLevel(1);
    onSelectNGO('helping-hands');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ecefeb] rounded-full text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00652c] animate-pulse"></span>
              <span>Live Verified Ledger • Real-time Field Feed</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#181c1a] tracking-tight">
              Explore impact around you.
            </h1>
            <p className="text-sm sm:text-base text-[#3f493f] max-w-2xl">
              See verified NGOs, live drives, and tangible community milestones on the ground in real-time.
            </p>
          </div>

          {/* Quick KPI Counters */}
          <div className="flex items-center gap-5 bg-[#f1f4f1] p-3 md:p-4 rounded-2xl shadow-xs border border-[#becabc]/30">
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00652c]">3,480+</div>
              <div className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-bold">
                Verified Sites
              </div>
            </div>
            <div className="w-px h-8 bg-[#becabc]/40"></div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#006443]">98.4%</div>
              <div className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-bold">
                GPS On-Ground Audit
              </div>
            </div>
          </div>
        </div>

        {/* Main Interactive Split Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-h-[700px]">
          {/* ================= LEFT / CONTROL & LIST PANEL (5 cols) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-5 order-2 lg:order-1">
            {/* Search & Dynamic Filter Hub */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#becabc]/30 space-y-3.5">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={mapSearch}
                  onChange={e => setMapSearch(e.target.value)}
                  placeholder="Search location, city, or NGO name..."
                  className="w-full bg-[#f1f4f1] text-[#181c1a] text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl placeholder:text-[#6f7a6e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#15803d]"
                />
                {mapSearch && (
                  <button
                    onClick={() => setMapSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] hover:text-[#181c1a] p-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                  </button>
                )}
              </div>

              {/* Cause Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
                {['all', 'education', 'animal', 'environment', 'hunger'].map(cause => (
                  <button
                    key={cause}
                    onClick={() => setSelectedCause(cause)}
                    className={`px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer ${
                      selectedCause === cause
                        ? 'bg-[#15803d] text-white shadow-xs'
                        : 'bg-[#f1f4f1] text-[#3f493f] hover:text-[#181c1a] hover:bg-[#e6e9e5]'
                    }`}
                  >
                    {cause === 'all'
                      ? 'All Causes'
                      : cause === 'education'
                      ? 'Education'
                      : cause === 'animal'
                      ? 'Animal Welfare'
                      : cause === 'environment'
                      ? 'Environment'
                      : 'Hunger Relief'}
                  </button>
                ))}
              </div>

              {/* Verified Only Toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-[#becabc]/20">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00652c] text-[18px] fill-1">verified_user</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">Verified NGOs Only</span>
                  <span className="text-[10px] text-[#3f493f] bg-[#ecefeb] px-2 py-0.5 rounded-full font-medium">34 online</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={e => setVerifiedOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#e0e3e0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00652c] relative"></div>
                </label>
              </div>
            </div>

            {/* SELECTED NGO EXPANDED CARD (Pinned Spotlight) */}
            <div className="relative bg-white p-5 rounded-2xl shadow-md border border-[#becabc]/30 overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#15803d] via-[#79db8d] to-[#006443]"></div>

              <div className="flex items-start justify-between gap-3 mb-4 pt-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xs bg-[#e6e9e5] shrink-0 border border-[#becabc]/40">
                    <img
                      alt={activeNGO.name}
                      className="w-full h-full object-cover"
                      src={activeNGO.avatar}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#181c1a]">
                        {activeNGO.name}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#d3ffd5] text-[#00652c] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px] fill-1">check_circle</span>
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#3f493f] mt-0.5">
                      <span className="text-[#00652c] font-semibold">{activeNGO.causeLabel}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px] text-[#6f7a6e]">location_on</span>
                        {activeNGO.location}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  title="Bookmark Initiative"
                  className="p-1.5 rounded-lg text-[#6f7a6e] hover:text-[#181c1a] hover:bg-[#ecefeb] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </button>
              </div>

              {/* Milestone Highlight */}
              <div className="bg-[#f1f4f1] p-3.5 rounded-xl mb-4 space-y-1 border border-[#becabc]/20">
                <div className="flex items-center justify-between text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wide">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    Live Milestone Highlight
                  </span>
                  <span className="text-[#6f7a6e] font-normal lowercase">4 hours ago</span>
                </div>
                <p className="text-xs sm:text-sm text-[#181c1a] font-medium leading-snug">
                  {activeNGO.weeklyMilestone}
                </p>
              </div>

              {/* Metrics Bento */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#f7faf6] p-3 rounded-xl border border-[#becabc]/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e6e9e5] flex items-center justify-center text-[#00652c]">
                    <span className="material-symbols-outlined text-[22px]">group</span>
                  </div>
                  <div>
                    <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">
                      {activeNGO.impactMetrics.primaryNumber}
                    </div>
                    <div className="text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                      Total {activeNGO.impactMetrics.primaryLabel}
                    </div>
                  </div>
                </div>
                <div className="bg-[#f7faf6] p-3 rounded-xl border border-[#becabc]/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e6e9e5] flex items-center justify-center text-[#006443]">
                    <span className="material-symbols-outlined text-[22px]">photo_library</span>
                  </div>
                  <div>
                    <div className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">
                      {activeNGO.impactMetrics.storiesCount}
                    </div>
                    <div className="text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                      Verified Stories
                    </div>
                  </div>
                </div>
              </div>

              {/* On-ground GPS Telemetry */}
              <div className="flex items-center justify-between p-2.5 bg-[#f1f4f1] rounded-xl mb-4 text-xs text-[#3f493f] border border-[#becabc]/20">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-[#00652c] text-[18px]">pin_drop</span>
                  <div className="truncate">
                    <span className="text-[10px] text-[#6f7a6e] uppercase tracking-wider block font-semibold">
                      GPS On-Ground Telemetry
                    </span>
                    <span className="font-mono font-semibold text-[#181c1a]">{activeNGO.gps}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#d3ffd5] text-[#005323] text-[10px] font-bold flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-[13px]">verified</span> Officer Signed
                </span>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => onOpenDonate(activeNGO.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                  <span>Direct Support</span>
                </button>
                <button
                  onClick={() => onNavigate('feed')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold border border-[#becabc]/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#006443]">dynamic_feed</span>
                  <span>View Impact Stories</span>
                </button>
              </div>
            </div>

            {/* NEARBY ACTIVE HUBS LIST */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#181c1a]">
                  Nearby Active Hubs
                </h4>
                <span className="text-xs text-[#6f7a6e]">Sorted by proximity</span>
              </div>

              {visibleHubs.length === 0 && (
                <p className="px-1 py-3 text-xs text-[#6f7a6e]">
                  No other hubs match these filters. Try a different cause or location.
                </p>
              )}

              {visibleHubs.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelectNGO(item.id)}
                  className={`group bg-white hover:bg-[#f1f4f1] p-3.5 rounded-2xl shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 border ${
                    selectedNGOId === item.id ? 'ring-2 ring-[#15803d] border-transparent' : 'border-[#becabc]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      alt={item.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#becabc]/30"
                      src={item.avatar}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h5 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#181c1a] group-hover:text-[#00652c] transition-colors truncate">
                          {item.name}
                        </h5>
                        <span className="material-symbols-outlined text-[#00652c] text-[14px] fill-1">check_circle</span>
                      </div>
                      <p className="text-[11px] text-[#6f7a6e] truncate mt-0.5">
                        <span>{item.cityLabel}</span> •{' '}
                        <span className="text-[#ac3400] font-medium">{item.liveActivity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ecefeb] text-[10px] font-semibold text-[#3f493f]">
                      {item.distanceKm} km
                    </span>
                    <span className="material-symbols-outlined text-[#6f7a6e] group-hover:text-[#00652c] text-[18px]">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT MAP CANVAS (7 cols) ================= */}
          <div className="lg:col-span-7 sticky top-24 order-1 lg:order-2 w-full h-[520px] md:h-[680px] rounded-3xl overflow-hidden shadow-xl bg-[#e0e3e0] relative select-none border border-[#becabc]/40">
            {/* Background Satellite Cartography Layer */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500"
              style={{
                backgroundImage:
                  mapLayer === 'satellite'
                    ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB80sLcb_t5_MXDqK9HpZqWyI5lOZ3FL19i9mW8vpSNyriPtPUUwbtx28ceSU9dT2HHZ2tZMdTv_bGEvRCoWfwdp3D73uOts8JaXlUrWC4QnT4qYD79MvSq2uq4ttFnfz2pcZ2Jg1SzNIHGuwQ3yHyXEP04DxI8oPP09wI8Gp4rNP0HEeMHvFYi8B1Cy1jqthiMmCjC8TloLtQX1p1VEDUMDXcVbLGbbbj5gkRIINeOqHxmRDqtn0tn')"
                    : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzDXXMcwD2YZayALVICR0ilot6cSYBDZlWoJ5xLVU_Hla4rSA73Mxa9NS1WwNWm_el7mG8oy2Roed9iuhVJwMEhFONbxgsPFbRv3P3ni4uAcWqvkfTgSZQX15Q4GH3rpa3nTRuCjeV_Ac3Bg1PmduXkRf98PZ2q9S13Z5xZtXyo_dAN7SqFJuL0bYXRtA-DlM86wKBT2easiOI_w6s2DjrGl9xFCBKSWfrL7MTFoEpVRf36U8glxX_')",
                transform: `scale(${zoomLevel})`
              }}
            >
              <div className="absolute inset-0 bg-[#f7faf6]/35 pointer-events-none"></div>
            </div>

            {/* Custom SVG Vector Topography Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-65 pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 800 680"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="waterGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#becabc" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#95f8a7" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 0,0 L 260,0 C 230,120 280,240 210,340 C 170,390 190,480 140,540 C 110,580 130,680 130,680 L 0,680 Z"
                fill="url(#waterGrad)"
              />
              <path
                d="M 140,540 Q 320,410 420,380 T 780,260"
                fill="none"
                stroke="#becabc"
                strokeDasharray="6,4"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M 210,340 Q 360,330 520,280 T 800,140"
                fill="none"
                stroke="#becabc"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle cx="340" cy="330" fill="#15803d" fillOpacity="0.08" r="48" />
              <circle cx="480" cy="460" fill="#15803d" fillOpacity="0.06" r="62" />
              <circle cx="610" cy="220" fill="#007f57" fillOpacity="0.07" r="54" />
            </svg>

            {/* MAP CONTROLS (Top-Right Floating Stack) */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md p-1 flex flex-col border border-[#becabc]/30">
                <button
                  onClick={() => handleZoom('in')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[#181c1a] hover:bg-[#ecefeb] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
                <div className="w-full h-px bg-[#e6e9e5] my-0.5"></div>
                <button
                  onClick={() => handleZoom('out')}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-[#181c1a] hover:bg-[#ecefeb] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
              </div>

              {/* Center on location */}
              <button
                onClick={handleResetLocation}
                className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl shadow-md flex items-center justify-center text-[#181c1a] hover:text-[#00652c] hover:bg-[#ecefeb] transition-colors border border-[#becabc]/30 cursor-pointer"
                title="Center on Mumbai HQ"
              >
                <span className="material-symbols-outlined text-[20px]">my_location</span>
              </button>

              {/* Layer Toggle */}
              <button
                onClick={() => setMapLayer(prev => (prev === 'standard' ? 'satellite' : 'standard'))}
                className={`w-10 h-10 backdrop-blur-md rounded-xl shadow-md flex items-center justify-center transition-colors border border-[#becabc]/30 cursor-pointer ${
                  mapLayer === 'satellite' ? 'bg-[#00652c] text-white' : 'bg-white/95 text-[#181c1a]'
                }`}
                title="Toggle Satellite Imagery"
              >
                <span className="material-symbols-outlined text-[20px]">layers</span>
              </button>
            </div>

            {/* MAP PIN 1: MUMBAI (Helping Hands) */}
            <div
              onClick={() => onSelectNGO('helping-hands')}
              className="absolute top-[48%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Radar pulse */}
              <div className="absolute -inset-4 rounded-full bg-[#15803d]/25 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full bg-[#00652c]/30"></div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs drop-shadow-md pointer-events-auto">
                <div className="bg-white px-3 py-1.5 rounded-xl flex items-center gap-2 text-[#181c1a] border border-[#becabc]/30">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]"></span>
                  <div>
                    <div className="font-['Plus_Jakarta_Sans'] text-xs leading-tight font-bold">
                      120 Students Impacted
                    </div>
                    <div className="text-[10px] text-[#6f7a6e]">Helping Hands • Dharavi</div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] text-[#00652c] fill-1">verified</span>
                </div>
                <div className="w-2.5 h-2.5 bg-white rotate-45 mx-auto -mt-1 border-r border-b border-[#becabc]/30"></div>
              </div>

              {/* Pin */}
              <div className="relative w-11 h-11 rounded-2xl bg-[#15803d] text-white flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">school</span>
              </div>
            </div>

            {/* MAP PIN 2: PUNE (Paws & Care) */}
            <div
              onClick={() => onSelectNGO('paws-and-care')}
              className="absolute top-[64%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            >
              <div className="absolute -inset-2 rounded-full bg-[#fd6b36]/25 animate-pulse"></div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max drop-shadow-sm opacity-90 group-hover:opacity-100">
                <div className="bg-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[#181c1a] border border-[#becabc]/30">
                  <span className="w-2 h-2 rounded-full bg-[#fd6b36]"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold">85 Rescued Animals</span>
                </div>
                <div className="w-2 h-2 bg-white rotate-45 mx-auto -mt-1"></div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#fd6b36] text-white flex items-center justify-center shadow-md ring-2 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[18px]">pets</span>
              </div>
            </div>

            {/* MAP PIN 3: DELHI (Annapurna / Umeed) */}
            <div
              onClick={() => onSelectNGO('umeed-skill-academy')}
              className="absolute top-[20%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max drop-shadow-sm">
                <div className="bg-white px-2 py-0.5 rounded-lg flex items-center gap-1 border border-[#becabc]/30">
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#181c1a] font-semibold">Delhi Hub</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#006443] font-bold">+520 meals</span>
                </div>
                <div className="w-1.5 h-1.5 bg-white rotate-45 mx-auto -mt-1"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#007f57] text-white flex items-center justify-center shadow-md ring-2 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">soup_kitchen</span>
              </div>
            </div>

            {/* MAP PIN 4: BENGALURU (Green Roots) */}
            <div
              onClick={() => onSelectNGO('green-roots')}
              className="absolute top-[78%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max drop-shadow-sm">
                <div className="bg-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-[#becabc]/30">
                  <span className="w-2 h-2 rounded-full bg-[#00652c]"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">Green Canopy</span>
                </div>
                <div className="w-2 h-2 bg-white rotate-45 mx-auto -mt-1"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00652c] text-white flex items-center justify-center shadow-md ring-2 ring-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[16px]">forest</span>
              </div>
            </div>

            {/* LIVE IMPACT TOAST / BOTTOM STATUS OVERLAY */}
            {toastVisible && (
              <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:max-w-md z-20">
                <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#becabc]/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#d3ffd5] text-[#00652c] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] animate-bounce">satellite_alt</span>
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a]">
                          Live GPS Sync Active
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#00652c]"></span>
                      </div>
                      <div className="text-[11px] text-[#3f493f] truncate">
                        Dharavi Field Audit: Unit #MH-442 locked at 12:44 PM
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('certificates')}
                    className="px-2.5 py-1 rounded-lg bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                  >
                    Ledger
                  </button>
                </div>
              </div>
            )}

            {/* MAP LEGEND (Bottom Right Floating) */}
            <div className="hidden md:flex absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md flex items-center gap-3 text-xs text-[#3f493f] border border-[#becabc]/30">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]"></span>
                <span>Verified NGO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fd6b36]"></span>
                <span>Active Drive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#007f57]"></span>
                <span>Food Relief</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3 FIELD METHODOLOGY CARDS ================= */}
        <div className="mt-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f1f4f1] p-5 md:p-6 rounded-2xl flex items-start gap-4 border border-[#becabc]/20">
              <div className="w-12 h-12 rounded-xl bg-white text-[#00652c] flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">fmd_good</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a]">
                  Zero-Spoof Coordinates
                </h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Every verified milestone requires automated cryptographic device attestation and field officer check-ins within 50 meters of recipient communities.
                </p>
              </div>
            </div>

            <div className="bg-[#f1f4f1] p-5 md:p-6 rounded-2xl flex items-start gap-4 border border-[#becabc]/20">
              <div className="w-12 h-12 rounded-xl bg-white text-[#006443] flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">encrypted</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a]">
                  Transparent Ledger
                </h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Financial allocations to mapped initiatives link directly to public invoices and donor proof-of-impact deeds without intermediary overhead.
                </p>
              </div>
            </div>

            <div className="bg-[#f1f4f1] p-5 md:p-6 rounded-2xl flex items-start gap-4 border border-[#becabc]/20">
              <div className="w-12 h-12 rounded-xl bg-white text-[#ac3400] flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">partner_exchange</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#181c1a]">
                  Field Auditor Network
                </h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Over 450 accredited grassroots observers continuously validate distribution numbers, student attendances, and relief material deliveries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
