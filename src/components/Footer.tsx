import React from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonate }) => {
  return (
    <footer className="w-full bg-[#f1f4f1] border-t border-[#becabc]/30 pt-12 pb-8 mt-16">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#becabc]/30">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-3 pr-4">
            <div className="flex items-center gap-2">
              <img
                alt="KindredHub Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XGfpdixE9CW-cHo85PmZhRkNU9NN2FAXIl3GaA-qIyRT5nsyid6OgetvcilFrRGtDrCKUv646ASzPNaC25EXMUDJTXAJ-veu9YpwAzFb5JWjdDG1YtTR0PYCRFxJK_-nJ9whMMaxvIRCilUydSX-YOAYSTnFkpXsRGI4Dc4w_mn9uoqeljyLSFqNn9qnx0zAYY5uhn3DlfFQAf3srxgWi3MNP8s4tSXlnl9BJJ1wXCB-zgMJeftDqgQUo"
              />
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#181c1a] tracking-tight">
                Kindred<span className="text-[#00652c]">Hub</span>
              </span>
            </div>
            <p className="text-sm text-[#3f493f] max-w-sm leading-relaxed">
              Human-centered humanitarian platform building transparent, verifiable bridges between verified grassroots initiatives and global donors.
            </p>
            <div className="mt-2 flex items-center gap-2 text-[#006443]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#181c1a]">
                Verified Public Benefit Platform
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-3">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#181c1a]">
              Platform
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#3f493f]">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  Explore NGOs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('feed')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  Impact Feed
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  Interactive Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('certificates')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  Proof-of-Deed Ledger
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency Links */}
          <div className="flex flex-col gap-3">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#181c1a]">
              Transparency
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#3f493f]">
              <li>
                <button
                  onClick={() => onNavigate('certificates')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  Public Ledger Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  4-Step Trust Engine
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDonate}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left text-[#15803d] font-semibold"
                >
                  Zero-Fee Dispatch Flow
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  className="hover:text-[#00652c] transition-colors cursor-pointer text-left"
                >
                  NGO Partner Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Legal */}
          <div className="flex flex-col gap-3">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#181c1a]">
              Security & Legal
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#3f493f]">
              <li className="flex items-center gap-1.5 text-xs text-[#006443]">
                <span className="material-symbols-outlined text-[15px]">lock</span>
                <span>256-Bit Encrypted</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-[#006443]">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>ISO 27001 Certified</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-[#006443]">
                <span className="material-symbols-outlined text-[15px]">gavel</span>
                <span>GDPR Data Compliant</span>
              </li>
              <li>
                <span className="text-xs text-[#6f7a6e]">Zero Third-Party Trackers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6f7a6e]">
          <p>© 2026 KindredHub Foundation. Radical transparency for verified grassroots philanthropy.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#181c1a] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#181c1a] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#181c1a] cursor-pointer">Audit Methodology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
