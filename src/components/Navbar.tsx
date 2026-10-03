import React from 'react';
import { Account } from '../data/platform';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenDonate: () => void;
  isLoggedIn: boolean;
  onToggleAuth: () => void;
  account?: Account | null;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDonate,
  isLoggedIn,
  onToggleAuth,
  account,
  onOpenDashboard
}) => {
  const isStaff = account?.role === 'ngo' || account?.role === 'admin';
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7faf6]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,30,28,0.04)] border-b border-[#becabc]/20">
      <div className="h-20 max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
          >
            <img
              alt="KindredHub Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XGfpdixE9CW-cHo85PmZhRkNU9NN2FAXIl3GaA-qIyRT5nsyid6OgetvcilFrRGtDrCKUv646ASzPNaC25EXMUDJTXAJ-veu9YpwAzFb5JWjdDG1YtTR0PYCRFxJK_-nJ9whMMaxvIRCilUydSX-YOAYSTnFkpXsRGI4Dc4w_mn9uoqeljyLSFqNn9qnx0zAYY5uhn3DlfFQAf3srxgWi3MNP8s4tSXlnl9BJJ1wXCB-zgMJeftDqgQUo"
            />
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl md:text-2xl text-[#181c1a] tracking-tight">
              Kindred<span className="text-[#00652c]">Hub</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'explore'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Explore NGOs
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'feed'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              <span>Impact Feed</span>
              <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse"></span>
            </button>
            <button
              onClick={() => onNavigate('map')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'map'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => onNavigate('certificates')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'certificates'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'tracker'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Impact Tracker
            </button>
            <button
              onClick={() => onNavigate('volunteer')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                currentView === 'volunteer'
                  ? 'bg-[#e6e9e5] text-[#181c1a] font-semibold'
                  : 'text-[#3f493f] hover:text-[#181c1a] hover:bg-[#ecefeb]'
              }`}
            >
              Volunteer
            </button>
          </nav>
        </div>

        {/* Right Action Stack */}
        <div className="flex items-center gap-3">
          {/* Security Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[#006443] bg-[#f1f4f1] px-3 py-1 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>256-Bit Encrypted</span>
          </div>

          {/* Primary Action Button */}
          {isStaff ? (
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#15803d] hover:bg-[#00652c] text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span className="whitespace-nowrap">{account?.role === 'admin' ? 'Admin Dashboard' : 'NGO Dashboard'}</span>
            </button>
          ) : (
          <button
            onClick={onOpenDonate}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#15803d] hover:bg-[#00652c] text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            <span className="whitespace-nowrap">Give Support</span>
          </button>
          )}

          {/* User Account / Auth Toggle */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-1 border-l border-[#becabc]/40">
              <button
                onClick={() => (isStaff ? onOpenDashboard?.() : onNavigate('feed'))}
                title={account?.name || 'Account'}
                className="w-9 h-9 rounded-full ring-2 ring-[#79db8d] hover:ring-[#00652c] transition-all bg-[#95f8a7] text-[#00652c] font-bold flex items-center justify-center cursor-pointer"
              >
                {(account?.name || 'U').charAt(0).toUpperCase()}
              </button>
              <button
                onClick={onToggleAuth}
                className="hidden sm:inline-flex text-xs text-[#3f493f] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                title="Log Out"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-1.5 text-sm font-medium text-[#3f493f] hover:text-[#181c1a] rounded-lg transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="hidden md:inline-flex px-3.5 py-1.5 text-sm font-medium text-[#00652c] bg-[#e6e9e5] hover:bg-[#d8dbd7] rounded-lg transition-colors cursor-pointer"
              >
                Join Free
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-t border-[#becabc]/20 overflow-x-auto scrollbar-none bg-[#f1f4f1]/80 text-xs font-medium">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'landing' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('explore')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'explore' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Explore NGOs
        </button>
        <button
          onClick={() => onNavigate('feed')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'feed' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Impact Feed
        </button>
        <button
          onClick={() => onNavigate('map')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'map' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Map
        </button>
        <button
          onClick={() => onNavigate('certificates')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'certificates' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Certificates
        </button>
        <button
          onClick={() => onNavigate('tracker')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'tracker' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Tracker
        </button>
        <button
          onClick={() => onNavigate('volunteer')}
          className={`px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${currentView === 'volunteer' ? 'bg-white font-bold text-[#00652c] shadow-xs' : 'text-[#3f493f]'}`}
        >
          Volunteer
        </button>
      </div>
    </header>
  );
};
