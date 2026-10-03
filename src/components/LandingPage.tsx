import React from 'react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenDonate: () => void;
  onSelectNGO: (ngoId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenDonate,
  onSelectNGO
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden px-4 md:px-8 py-10 lg:py-20 bg-[#f7faf6]">
        {/* Ambient organic gradient glow behind hero */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-br from-[#95f8a7]/25 via-[#6ffbbe]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-[1240px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Protocol Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6e9e5] w-fit shadow-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00652c] animate-pulse"></span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] uppercase tracking-wider font-semibold">
                  Verified Humanitarian Protocol v2.4
                </span>
                <span className="text-[#6f7a6e] text-xs font-semibold">•</span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#3f493f] font-semibold">
                  Zero Intermediary Fees
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#181c1a] tracking-tight leading-[1.12]">
                Good people. <br />
                Real impact. <br />
                <span className="text-[#15803d]">One trusted place.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#3f493f] max-w-xl leading-relaxed">
                Discover verified grassroots NGOs, follow live proof-of-work dispatches on an auditable ledger, and see every single rupee create quantifiable, timestamped change.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onNavigate('feed')}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#00652c] text-white px-6 py-3.5 rounded-xl shadow-md font-['Plus_Jakarta_Sans'] text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Impact Feed</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#e6e9e5] text-[#181c1a] px-6 py-3.5 rounded-xl shadow-sm border border-[#becabc]/40 font-['Plus_Jakarta_Sans'] text-sm font-semibold transition-all cursor-pointer"
                >
                  <span>View Audited NGOs</span>
                </button>
                <button
                  onClick={onOpenDonate}
                  className="inline-flex items-center gap-1.5 bg-[#fd6b36]/15 hover:bg-[#fd6b36]/25 text-[#ac3400] px-4 py-3 rounded-xl font-['Plus_Jakarta_Sans'] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                  <span>Give Direct Support</span>
                </button>
              </div>

              {/* Tertiary Link */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#3f493f]">
                <span>Are you a registered non-profit?</span>
                <button
                  onClick={() => onNavigate('register')}
                  className="text-[#15803d] hover:underline font-semibold inline-flex items-center gap-0.5 cursor-pointer"
                >
                  Apply for Verification ↗
                </button>
              </div>

              {/* Proof Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 mt-3 bg-[#f1f4f1] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#becabc]/20">
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00652c] tracking-tight">14,850+</span>
                  <span className="text-xs text-[#3f493f]">Lives Impacted</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#181c1a] tracking-tight">42</span>
                  <span className="text-xs text-[#3f493f]">Audited NGOs</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#00652c] tracking-tight">100%</span>
                  <span className="text-xs text-[#3f493f]">Proof Receipts</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#ac3400] tracking-tight">₹0 / $0</span>
                  <span className="text-xs text-[#3f493f]">Platform Cut</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Mosaic */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative w-full max-w-md mx-auto h-[460px] sm:h-[500px]">
                {/* Classroom Image Card */}
                <div className="absolute top-0 right-2 sm:right-4 w-60 sm:w-72 h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg bg-[#e6e9e5] transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    alt="Classroom learning session"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFERbcHAzCe_V6wFyl2R7ktI4cDEOPb-w2JKLYBeVQZVWLKqjjarbiFvG5l6Lm3qx8lj4uzML_amkEKSg6E_hkwzYSK8yoA_o_6yJAl4Rv0hJmyNvMr9Htvq1VNvo1paGdlXCZLcKoMtiY7pGVxSpuUnzcJmq8BHv0dUjHLdUkdgiieg4fc4ysARJno8rhz010me8l0pmvaM7c__xR1vgk2za2-80IpkkbL64Xn67yHV-laclQ5CPp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#15803d]/90 text-white font-['Plus_Jakarta_Sans'] text-[11px] font-semibold mb-1">
                      <span className="material-symbols-outlined text-[13px]">verified</span> Education Unit
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold truncate">Mumbai Primary Hub • 120 Kits</p>
                  </div>
                </div>

                {/* Planting Saplings Image Card (Interlocking) */}
                <div className="absolute bottom-4 left-0 sm:left-2 w-64 sm:w-76 h-64 sm:h-76 rounded-2xl overflow-hidden shadow-xl bg-[#e6e9e5] transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    alt="Volunteers planting saplings"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABLa-nlOdd5B9IaT0eib3jKg6zy7qFavvxnm8FZMeZNQAJ1ZdHDYxvbP4KsQnQqlQqYM01uD-JGSTlxNAvFD4pwx5ODE7_XduH82PsAoI5zkZaCFWqdM-3HBKpdkGUMWoRRZBOl35bpX1nfZvcLaJ6zzWCeQFNdSTpnRTttqMeQBqVmWRXDjwcaBplX9_x-z8-cBe9zOUP823u-Gbia24fIqeZ0Kr6Ll686x3n7aHq8eSGZiSG6DkB"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fd6b36]/90 text-white font-['Plus_Jakarta_Sans'] text-[11px] font-semibold mb-1">
                      <span className="material-symbols-outlined text-[13px]">eco</span> Mithi Corridor
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold truncate">230 Native Saplings Planted</p>
                  </div>
                </div>

                {/* Floating Live Card Top Left */}
                <div className="absolute -top-3 left-0 sm:-left-4 bg-white p-2.5 rounded-xl shadow-md max-w-[210px] animate-bounce [animation-duration:4s]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#95f8a7] flex items-center justify-center text-[#00210a] text-xs font-bold">✓</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-bold truncate">120 Students Aided</span>
                      <span className="text-[11px] text-[#6f7a6e] truncate">Mumbai Hub • 18m ago</span>
                    </div>
                  </div>
                </div>

                {/* Floating GPS Badge Bottom Right */}
                <div className="absolute bottom-0 right-0 sm:-right-4 bg-white p-2.5 rounded-xl shadow-md flex items-center gap-2 border border-[#becabc]/30">
                  <span className="material-symbols-outlined text-[#00652c] text-[20px]">location_on</span>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-semibold">GPS Audited On-Site</span>
                    <span className="text-[10px] text-[#6f7a6e] font-mono">19.0402° N, 72.8567° E</span>
                  </div>
                </div>

                {/* Floating Trust Seal Center Float */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2d312f] text-[#eef1ee] px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 pointer-events-none z-20">
                  <span className="material-symbols-outlined text-[#95f8a7] text-[16px]">lock_reset</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-wide font-medium">Ledger Verified • 100% Traceable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE PROBLEM VS KINDREDHUB ================= */}
      <section className="w-full bg-[#f1f4f1] py-14 md:py-20 px-4 md:px-8 border-y border-[#becabc]/20">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#ac3400] uppercase font-bold tracking-widest">
              Why Trust Matters
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
              The Charity Paradigm Shift
            </h2>
            <p className="text-sm md:text-base text-[#3f493f]">
              Donors are tired of opaque PDFs and vanishing funds. KindredHub replaces institutional obscurity with real-time photographic proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 border border-[#becabc]/30">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">visibility_off</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">The Black Box Trap</h3>
                <p className="text-sm text-[#3f493f] leading-relaxed">
                  Traditional platforms dump funds into general accounts. Donors receive an automated PDF once a year with zero proof their contribution reached actual humans.
                </p>
              </div>
              <div className="bg-[#e6e9e5] rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00652c] text-[20px]">check_circle</span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-semibold">
                  KindredHub: Timestamped micro-updates for every disbursement.
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 border border-[#becabc]/30">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdbd0] text-[#390c00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">money_off</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">Intermediary Creaming</h3>
                <p className="text-sm text-[#3f493f] leading-relaxed">
                  Aggregators skim between 8% to 22% in processing overhead, campaign management, and platform retainers before local field teams ever see a rupee.
                </p>
              </div>
              <div className="bg-[#e6e9e5] rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00652c] text-[20px]">check_circle</span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-semibold">
                  KindredHub: Zero platform cut. 100% directly hits audited NGO bank lines.
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 border border-[#becabc]/30">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6ffbbe] text-[#002113] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">location_disabled</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">Fake Paperwork & Spoofing</h3>
                <p className="text-sm text-[#3f493f] leading-relaxed">
                  Paper receipts and stock photos enable untracked misallocation. Donors are left guessing whether ground activities truly materialized.
                </p>
              </div>
              <div className="bg-[#e6e9e5] rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00652c] text-[20px]">check_circle</span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-semibold">
                  KindredHub: Strict EXIF GPS metadata verification and volunteer sign-offs.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE TRUST ENGINE: 4 STEPS ================= */}
      <section className="w-full bg-[#f7faf6] py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] uppercase font-bold tracking-widest">
                Protocol Architecture
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
                The 4-Step Trust Engine
              </h2>
              <p className="text-sm md:text-base text-[#3f493f]">
                How KindredHub maintains cryptographic transparency from field mission discovery to individual donor credentialing.
              </p>
            </div>
            <button
              onClick={() => onNavigate('certificates')}
              className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-sm text-[#15803d] hover:text-[#00652c] font-semibold cursor-pointer"
            >
              <span>Explore Public Ledger Verification</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#ecefeb] rounded-2xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden group hover:bg-[#e6e9e5] transition-colors border border-[#becabc]/30">
              <div className="flex flex-col gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-black text-[#6f7a6e]/40">01</span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">Discover Grassroots</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Explore hyper-local initiatives solving real ground crises across schooling, stray animal rescue, healthcare, and reforestation.
                </p>
              </div>
              <button
                onClick={() => onNavigate('explore')}
                className="flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Filter by Ward & Cause</span>
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-[#ecefeb] rounded-2xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden group hover:bg-[#e6e9e5] transition-colors border border-[#becabc]/30">
              <div className="flex flex-col gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-black text-[#6f7a6e]/40">02</span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">4-Tier NGO Vetting</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  FCRA filings, 12A/80G cross-matching, on-ground field agent interviews, and 3-year bank audits. Zero paper shell entities.
                </p>
              </div>
              <button
                onClick={() => onNavigate('register')}
                className="flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Rigorous Due Diligence</span>
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-[#ecefeb] rounded-2xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden group hover:bg-[#e6e9e5] transition-colors border border-[#becabc]/30">
              <div className="flex flex-col gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-black text-[#6f7a6e]/40">03</span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">Proof-of-Deed Feeds</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Field agents upload raw micro-updates: geofenced photos, merchant bills, beneficiary roll calls, and timestamped signoffs.
                </p>
              </div>
              <button
                onClick={() => onNavigate('feed')}
                className="flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Zero-Spoof Geotags</span>
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </button>
            </div>

            {/* Step 4 */}
            <div className="bg-[#ecefeb] rounded-2xl p-6 flex flex-col justify-between gap-5 relative overflow-hidden group hover:bg-[#e6e9e5] transition-colors border border-[#becabc]/30">
              <div className="flex flex-col gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-black text-[#6f7a6e]/40">04</span>
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#181c1a]">Impact Certificates</h4>
                <p className="text-xs text-[#3f493f] leading-relaxed">
                  Supporters receive tamper-proof digital certificates linked directly to the public ledger ledger entry for tax and social verification.
                </p>
              </div>
              <button
                onClick={() => onNavigate('certificates')}
                className="flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Cryptographic Proof</span>
                <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE IMPACT FEED PREVIEW ================= */}
      <section className="w-full bg-[#f1f4f1] py-14 md:py-20 px-4 md:px-8 border-y border-[#becabc]/20">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 text-[#00652c]">
                <span className="material-symbols-outlined text-[18px]">stream</span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs uppercase font-bold tracking-wider">
                  Live Proof-of-Deed Wire
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
                Witness Real-Time Dispatches
              </h2>
              <p className="text-sm md:text-base text-[#3f493f] max-w-xl">
                Join 2,410+ conscious supporters witnessing authentic field changes daily. No algorithmic fluff—just auditable work.
              </p>
            </div>
            <button
              onClick={() => onNavigate('feed')}
              className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#00652c] text-white px-5 py-2.5 rounded-xl shadow-sm font-['Plus_Jakarta_Sans'] text-sm font-semibold transition-all cursor-pointer"
            >
              <span>View Full Live Feed ↗</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Feed Card 1 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md border border-[#becabc]/30">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#95f8a7] flex items-center justify-center text-[#00210a] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                    HH
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold truncate">Helping Hands</span>
                      <span className="material-symbols-outlined text-[#00652c] text-[16px]">verified</span>
                    </div>
                    <span className="text-xs text-[#6f7a6e]">Mumbai Hub • 2h ago</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecefeb] text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs">Education</span>
              </div>

              <div className="relative w-full h-52 bg-[#e6e9e5] overflow-hidden">
                <img
                  alt="STEM kit distribution"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoPuykFH9ZEAwdN3hKdkzMCpOlfD19-9CBa8xKM3C5FoNg6_-EUVhVERHV1v0RCwADPkX8boncGDGKEtevRW29WVFcyhpPfkekLELgzAMjPRQa4ZExWNx2nkVnn9qrOWhbkIw2EciMWOCY0xbkcK17qlZNxWLngI4Y-6slNo2hE0eOE3Nl-fTo8VuXWFP-2m-6lPF_MqRv-JvwU_AEj7KHfQNuVRw3Mq-S_u46lZmJi33kC_-a12fJ"
                />
                <div className="absolute bottom-2 left-2 bg-[#2d312f]/85 backdrop-blur text-white px-2 py-1 rounded-md text-[11px] font-mono">
                  GPS: 19.0402° N, 72.8567° E
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold mb-1">
                    120 students received complete STEM learning kits
                  </p>
                  <p className="text-xs text-[#3f493f] leading-relaxed">
                    Semester kits deployed with audited school supplies. Verified on-site by community auditor Ramesh G.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#becabc]/30 flex items-center justify-between text-xs text-[#6f7a6e]">
                  <span className="font-mono">Block #8942-D</span>
                  <span className="text-[#00652c] font-semibold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">receipt_long</span> Itemized Bills Attached
                  </span>
                </div>
              </div>
            </article>

            {/* Live Feed Card 2 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md border border-[#becabc]/30">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#390c00] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                    PC
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold truncate">Paws & Care</span>
                      <span className="material-symbols-outlined text-[#00652c] text-[16px]">verified</span>
                    </div>
                    <span className="text-xs text-[#6f7a6e]">Pune West • 4h ago</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecefeb] text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs">Animal Welfare</span>
              </div>

              <div className="relative w-full h-52 bg-[#e6e9e5] overflow-hidden">
                <img
                  alt="Rescued dog care"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMvz-gt1zjgmWa5uVGumjxLjwzC-2tDliz9UjepuwdCZ2Gi_rwnYs7IeLM3VUc8dp2-mRquxaWubXUZX20Iw01EgIZcCOjYzVIwjcugPHhkKp6H8Lkowd42-IRI0cny6ih1oUgnRYNIHypW3_RbmLuIMaCs1jbj3DD6LgPj7qMqgkB1QtaqmMg-83C_Mu0VOtwXpNhLH3bR7y_D7iAVfSds9GaSUQOeLT8f5wSXBUtQ2XwPSwnyt_3"
                />
                <div className="absolute bottom-2 left-2 bg-[#2d312f]/85 backdrop-blur text-white px-2 py-1 rounded-md text-[11px] font-mono">
                  GPS: 18.5204° N, 73.8567° E
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold mb-1">
                    85 rescued strays received clinical care & winter bedding
                  </p>
                  <p className="text-xs text-[#3f493f] leading-relaxed">
                    Emergency antibiotics, rabies vaccines, and thermal straw insulation delivered across Pune cantonment wards.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#becabc]/30 flex items-center justify-between text-xs text-[#6f7a6e]">
                  <span className="font-mono">Block #8938-A</span>
                  <span className="text-[#00652c] font-semibold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">receipt_long</span> Clinical Logs Synced
                  </span>
                </div>
              </div>
            </article>

            {/* Live Feed Card 3 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md border border-[#becabc]/30">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#002113] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                    GR
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold truncate">Green Roots</span>
                      <span className="material-symbols-outlined text-[#00652c] text-[16px]">verified</span>
                    </div>
                    <span className="text-xs text-[#6f7a6e]">Bandra Corridor • 6h ago</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecefeb] text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs">Environment</span>
              </div>

              <div className="relative w-full h-52 bg-[#e6e9e5] overflow-hidden">
                <img
                  alt="Saplings along riverbank"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7glxwt_qPsqIU3NjPj9EZpo5nNFUp-qenhU-6JVXr5aVyGr857-GAATnYmAsiYd2i4yIw-yQnuPr-mfNWLH2U0LyblQ8MAHKq5HaVFj3xGp3fTD8p867efaX1dOtL2TLiaFLCFP9drxKZvyAA9jlf-fDFaka02_pPA1rSanZu6iUsA9jOEhZrk63rVO5cbKYQSU0xEI9huFc6LVWgM8D27qlnKjnZixU_DIhjhOm1M15QrYF0kv_s"
                />
                <div className="absolute bottom-2 left-2 bg-[#2d312f]/85 backdrop-blur text-white px-2 py-1 rounded-md text-[11px] font-mono">
                  GPS: 19.0600° N, 72.8360° E
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#181c1a] font-semibold mb-1">
                    230 native saplings planted along Mithi Riverbank
                  </p>
                  <p className="text-xs text-[#3f493f] leading-relaxed">
                    Volunteers installed organic mulching and drip lines to prevent post-monsoon soil erosion along the wetland boundary.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#becabc]/30 flex items-center justify-between text-xs text-[#6f7a6e]">
                  <span className="font-mono">Block #8931-C</span>
                  <span className="text-[#00652c] font-semibold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">receipt_long</span> GeoTag Validated
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE VERIFIED CAUSES ================= */}
      <section className="w-full bg-[#f7faf6] py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] uppercase font-bold tracking-widest">
              Focus Sectors
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
              Explore Verified Causes
            </h2>
            <p className="text-sm md:text-base text-[#3f493f]">
              Every NGO listed here is subject to strict monthly financial reporting and in-person audit check-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Cause 1: Education */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#00652c] transition-colors">
                  Education
                </span>
                <span className="text-xs text-[#3f493f] mt-1">12 Verified NGOs • 4,200+ students supported</span>
                <div className="mt-3 flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Cause 2: Animal Welfare */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ac3400] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">pets</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#ac3400] transition-colors">
                  Animal Welfare
                </span>
                <span className="text-xs text-[#3f493f] mt-1">8 Verified NGOs • 1,420+ animals rehabilitated</span>
                <div className="mt-3 flex items-center gap-1 text-[#ac3400] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Cause 3: Environment */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#007f57] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">park</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#006443] transition-colors">
                  Environment & Climate
                </span>
                <span className="text-xs text-[#3f493f] mt-1">9 Verified NGOs • 18k+ trees planted & guarded</span>
                <div className="mt-3 flex items-center gap-1 text-[#006443] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Cause 4: Hunger */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#fd6b36] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#ac3400] transition-colors">
                  Hunger & Nutrition
                </span>
                <span className="text-xs text-[#3f493f] mt-1">7 Verified NGOs • 62k+ warm meals delivered</span>
                <div className="mt-3 flex items-center gap-1 text-[#ac3400] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Cause 5: Healthcare */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00652c] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">medical_services</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#00652c] transition-colors">
                  Healthcare & Maternal
                </span>
                <span className="text-xs text-[#3f493f] mt-1">5 Verified NGOs • 3,800+ patients treated</span>
                <div className="mt-3 flex items-center gap-1 text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Cause 6: Livelihood */}
            <div
              onClick={() => onNavigate('explore')}
              className="group bg-[#f1f4f1] hover:bg-[#e6e9e5] rounded-2xl p-5 transition-all flex items-start gap-4 cursor-pointer border border-[#becabc]/20"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d8dbd7] text-[#181c1a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[24px]">handshake</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#181c1a] group-hover:text-[#00652c] transition-colors">
                  Community Livelihood
                </span>
                <span className="text-xs text-[#3f493f] mt-1">6 Verified NGOs • 850+ artisan vocations</span>
                <div className="mt-3 flex items-center gap-1 text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase">
                  <span>View Projects</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPATIAL DISCOVERY / MAP TEASER ================= */}
      <section className="w-full bg-[#f1f4f1] py-14 md:py-20 px-4 md:px-8 border-y border-[#becabc]/20">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] uppercase font-bold tracking-widest">
                Spatial Discovery
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
                Impact is happening everywhere around you
              </h2>
              <p className="text-sm md:text-base text-[#3f493f]">
                Explore live geo-located NGO operations across Mumbai, Pune, Delhi NCR, and Bengaluru.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('map')}
                className="px-4 py-2 rounded-full bg-white text-[#181c1a] shadow-xs font-['Plus_Jakarta_Sans'] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#ecefeb] transition-colors border border-[#becabc]/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#00652c]">my_location</span>
                <span>Browse Near My Location</span>
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="px-4 py-2 rounded-full bg-[#15803d] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#00652c] transition-colors shadow-sm cursor-pointer"
              >
                <span>Open Full Interactive Map</span>
                <span className="material-symbols-outlined text-[16px]">map</span>
              </button>
            </div>
          </div>

          {/* Map Presentation Teaser Card */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-[#becabc]/30 bg-[#e0e3e0]">
            <img
              alt="Cartographic Satellite Map of India Western Region"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzDXXMcwD2YZayALVICR0ilot6cSYBDZlWoJ5xLVU_Hla4rSA73Mxa9NS1WwNWm_el7mG8oy2Roed9iuhVJwMEhFONbxgsPFbRv3P3ni4uAcWqvkfTgSZQX15Q4GH3rpa3nTRuCjeV_Ac3Bg1PmduXkRf98PZ2q9S13Z5xZtXyo_dAN7SqFJuL0bYXRtA-DlM86wKBT2easiOI_w6s2DjrGl9xFCBKSWfrL7MTFoEpVRf36U8glxX_"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Hotspot Pin 1: Mumbai */}
            <div
              onClick={() => {
                onSelectNGO('helping-hands');
                onNavigate('map');
              }}
              className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-[#00652c] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#95f8a7] animate-ping"></span>
                <span>Mumbai: 18 NGOs</span>
              </div>
              <span className="material-symbols-outlined text-[#00652c] text-[32px] -mt-1 drop-shadow-md">location_on</span>
            </div>

            {/* Hotspot Pin 2: Pune */}
            <div
              onClick={() => {
                onSelectNGO('paws-and-care');
                onNavigate('map');
              }}
              className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-[#ac3400] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#ffdbd0]"></span>
                <span>Pune: 11 NGOs</span>
              </div>
              <span className="material-symbols-outlined text-[#ac3400] text-[32px] -mt-1 drop-shadow-md">location_on</span>
            </div>

            {/* Hotspot Pin 3: Bengaluru */}
            <div
              onClick={() => onNavigate('map')}
              className="absolute bottom-1/4 right-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-[#006443] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#6ffbbe]"></span>
                <span>Bengaluru: 9 NGOs</span>
              </div>
              <span className="material-symbols-outlined text-[#006443] text-[32px] -mt-1 drop-shadow-md">location_on</span>
            </div>

            {/* Map Bottom Ticker */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md border border-[#becabc]/30">
              <div className="flex items-center gap-3 text-xs text-[#181c1a]">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00652c] animate-ping"></span>
                  <span>Live Ground Activity</span>
                </span>
                <span className="text-[#6f7a6e]">|</span>
                <span className="text-[#3f493f]">Last verified update: Dharavi STEM Center (14 mins ago)</span>
              </div>
              <button
                onClick={() => onNavigate('map')}
                className="text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer"
              >
                Explore 42 Pinned Hubs →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VOICES OF TRUST / TESTIMONIALS ================= */}
      <section className="w-full bg-[#f7faf6] py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#ac3400] uppercase font-bold tracking-widest">
              Voices of Trust
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c1a] tracking-tight">
              Built with Community. Proven in the Field.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quote 1 */}
            <div className="bg-[#f1f4f1] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-5 shadow-xs border border-[#becabc]/20">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-[#fd6b36]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px] fill-1">star</span>
                  ))}
                </div>
                <p className="text-base text-[#181c1a] italic leading-relaxed">
                  “KindredHub gives our neighborhood complete visibility into real field work before we ever donate a single rupee. Seeing the verified GPS coordinates and grocery slips feels like night and day compared to generic donation portals.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#becabc]/30">
                <div className="w-11 h-11 rounded-full bg-[#95f8a7] flex items-center justify-center text-[#00210a] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                  PS
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#181c1a]">Priya S.</span>
                  <span className="text-xs text-[#3f493f]">Community Supporter • Mumbai Hub</span>
                </div>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="bg-[#f1f4f1] rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-5 shadow-xs border border-[#becabc]/20">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-[#00652c]">
                  <span className="material-symbols-outlined text-[20px] fill-1">verified</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider text-[#00652c]">
                    Verified Grassroots Partner
                  </span>
                </div>
                <p className="text-base text-[#181c1a] italic leading-relaxed">
                  “Getting verified on KindredHub doubled our local volunteer turnout within two months. Because donors could see photos of our stray clinic's surgeries right on their feed, skeptics became active partners overnight.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#becabc]/30">
                <div className="w-11 h-11 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#390c00] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                  DM
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#181c1a]">Dr. Mehra</span>
                  <span className="text-xs text-[#3f493f]">Chief Field Veterinarian, Paws & Care Shelter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CONVERSION BANNER ================= */}
      <section className="w-full bg-[#f7faf6] pb-16 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-[#15803d] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#00652c]/50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex flex-col gap-3 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-['Plus_Jakarta_Sans'] text-xs uppercase font-bold tracking-wider w-fit">
                  <span className="material-symbols-outlined text-[15px]">lock_open</span> Open Access Humanitarian Ledger
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Ready to turn intention into verifiable impact?
                </h2>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                  Create your free supporter account in 30 seconds to track live dispatches, or register your grassroots NGO to undergo our verification audit.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white hover:bg-[#f7faf6] text-[#181c1a] px-6 py-3 rounded-xl shadow-sm font-['Plus_Jakarta_Sans'] text-sm text-center transition-all font-semibold active:scale-[0.98] cursor-pointer"
                >
                  Create Free Account
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-['Plus_Jakarta_Sans'] text-sm text-center transition-all cursor-pointer"
                >
                  Log In to Existing Account
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="text-white/80 hover:text-white text-center font-['Plus_Jakarta_Sans'] text-xs py-1 transition-colors cursor-pointer"
                >
                  Register as an NGO for Audit ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
