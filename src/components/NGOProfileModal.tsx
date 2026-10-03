import React, { useEffect } from 'react';
import { NGO } from '../data/mockData';

interface NGOProfileModalProps {
  ngo: NGO;
  onClose: () => void;
  onOpenDonate: (ngoId: string) => void;
}

export const NGOProfileModal: React.FC<NGOProfileModalProps> = ({ ngo, onClose, onOpenDonate }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#becabc]/30 overflow-hidden relative my-8">
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-64 w-full bg-[#e6e9e5] overflow-hidden">
          <img
            alt={ngo.name}
            className="w-full h-full object-cover"
            src={ngo.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Floating badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <img
                alt={ngo.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md bg-white shrink-0"
                src={ngo.avatar}
              />
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl md:text-2xl text-white">
                    {ngo.name}
                  </h2>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#d3ffd5] text-[#00652c] font-['Plus_Jakarta_Sans'] text-xs font-bold">
                    <span className="material-symbols-outlined text-[13px] fill-1">verified</span>
                    Audited
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-0.5">
                  {ngo.location} • Est. {ngo.foundedYear}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Mission & Overview */}
          <div className="space-y-2">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm uppercase tracking-wider text-[#6f7a6e]">
              Grassroots Mission
            </h3>
            <p className="text-sm text-[#181c1a] leading-relaxed">
              {ngo.description}
            </p>
          </div>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#f1f4f1] rounded-2xl border border-[#becabc]/20 text-center font-['Plus_Jakarta_Sans']">
            <div>
              <span className="text-xl font-extrabold text-[#00652c] block">
                {ngo.impactMetrics.primaryNumber}
              </span>
              <span className="text-[10px] text-[#6f7a6e] uppercase tracking-wider font-bold">
                Total {ngo.impactMetrics.primaryLabel}
              </span>
            </div>
            <div className="border-x border-[#becabc]/40">
              <span className="text-xl font-extrabold text-[#181c1a] block">
                {ngo.disbursedAmount}
              </span>
              <span className="text-[10px] text-[#6f7a6e] uppercase tracking-wider font-bold">
                Direct Disbursed
              </span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#ac3400] block">
                {ngo.activeVolunteers}
              </span>
              <span className="text-[10px] text-[#6f7a6e] uppercase tracking-wider font-bold">
                Field Volunteers
              </span>
            </div>
          </div>

          {/* Legal Compliance & 4-Tier Audit Badges */}
          <div className="space-y-3">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm uppercase tracking-wider text-[#6f7a6e]">
              Kindred 4-Tier Compliance Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#f7faf6] border border-[#becabc]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px] fill-1">check_circle</span>
                <div>
                  <span className="font-bold text-[#181c1a] block">FCRA Certified</span>
                  <span className="font-mono text-[10px] text-[#6f7a6e]">{ngo.fcraNumber}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f7faf6] border border-[#becabc]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px] fill-1">check_circle</span>
                <div>
                  <span className="font-bold text-[#181c1a] block">Section 80G Tax Exemption</span>
                  <span className="text-[10px] text-[#6f7a6e]">100% Tax Deductible (India)</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f7faf6] border border-[#becabc]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px] fill-1">check_circle</span>
                <div>
                  <span className="font-bold text-[#181c1a] block">Zero-Fee Bank Line</span>
                  <span className="text-[10px] text-[#6f7a6e]">Direct Escrow Verified</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f7faf6] border border-[#becabc]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00652c] text-[20px] fill-1">check_circle</span>
                <div>
                  <span className="font-bold text-[#181c1a] block">Physical Geofencing</span>
                  <span className="font-mono text-[10px] text-[#6f7a6e]">{ngo.gps}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenDonate(ngo.id);
              }}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>Send Direct Zero-Fee Support</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#f1f4f1] hover:bg-[#e6e9e5] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
