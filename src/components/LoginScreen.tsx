import React, { useState } from 'react';

import { DEMO_LOGINS } from '../data/platform';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => string | null;
  onNavigate: (view: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = onLogin(email, password);
    if (err) setError(err);
  };

  const fillDemo = (k: keyof typeof DEMO_LOGINS) => {
    setEmail(DEMO_LOGINS[k].email);
    setPassword(DEMO_LOGINS[k].password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#f7faf6] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full bg-[#f7faf6]/80 backdrop-blur-xl border-b border-[#becabc]/20 shadow-[0_1px_8px_rgba(26,30,28,0.03)]">
        <div className="h-16 max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <img
              alt="KindredHub Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XGfpdixE9CW-cHo85PmZhRkNU9NN2FAXIl3GaA-qIyRT5nsyid6OgetvcilFrRGtDrCKUv646ASzPNaC25EXMUDJTXAJ-veu9YpwAzFb5JWjdDG1YtTR0PYCRFxJK_-nJ9whMMaxvIRCilUydSX-YOAYSTnFkpXsRGI4Dc4w_mn9uoqeljyLSFqNn9qnx0zAYY5uhn3DlfFQAf3srxgWi3MNP8s4tSXlnl9BJJ1wXCB-zgMJeftDqgQUo"
            />
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#181c1a] tracking-tight">
              Kindred<span className="text-[#00652c]">Hub</span>
            </span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[#006443] bg-[#f1f4f1] px-3 py-1 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>256-Bit Encrypted</span>
            </div>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-1.5 text-[#3f493f] hover:text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Authentication Window */}
      <main className="w-full flex-1 flex flex-col justify-center py-8">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 flex items-center justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl overflow-hidden min-h-[680px] border border-[#becabc]/30">
            {/* Left Column: Visual Storytelling & Social Proof */}
            <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-hidden min-h-[340px] lg:min-h-[680px]">
              {/* High-Impact Humanitarian Background Image */}
              <img
                alt="Inspiring teacher smiling with children"
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFERbcHAzCe_V6wFyl2R7ktI4cDEOPb-w2JKLYBeVQZVWLKqjjarbiFvG5l6Lm3qx8lj4uzML_amkEKSg6E_hkwzYSK8yoA_o_6yJAl4Rv0hJmyNvMr9Htvq1VNvo1paGdlXCZLcKoMtiY7pGVxSpuUnzcJmq8BHv0dUjHLdUkdgiieg4fc4ysARJno8rhz010me8l0pmvaM7c__xR1vgk2za2-80IpkkbL64Xn67yHV-laclQ5CPp"
              />
              {/* Multi-layer Scrim for pristine typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181c1a]/95 via-[#181c1a]/55 to-[#181c1a]/30 z-10"></div>
              <div className="absolute inset-0 bg-[#00652c]/20 mix-blend-multiply z-10"></div>

              {/* Top Badges */}
              <div className="relative z-20 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#181c1a] shadow-sm font-['Plus_Jakarta_Sans'] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[#00652c] text-[16px] fill-1">verified</span>
                  <span>100% Auditable Impact</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white font-['Plus_Jakarta_Sans'] text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Zero-Fee Dispatch</span>
                </div>
              </div>

              {/* Bottom Impact Quote & Counter */}
              <div className="relative z-20 flex flex-col gap-4 mt-auto pt-10">
                {/* Quote Card */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 text-[#181c1a] shadow-md border border-white/40">
                  <div className="flex items-center gap-1.5 text-[#00652c] mb-1">
                    <span className="material-symbols-outlined text-[18px]">format_quote</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase font-bold tracking-wider text-[#3f493f]">
                      Core Commitment
                    </span>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg font-bold leading-snug tracking-tight text-[#181c1a]">
                    “Trust starts with knowing where your impact goes.”
                  </p>
                </div>

                {/* Micro Stat Counter Pill */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#181c1a]/80 backdrop-blur-md text-white border border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold tracking-tight text-[#95f8a7]">
                      14,850+ lives touched
                    </span>
                    <span className="text-[11px] text-white/80 truncate">
                      Through verified grassroots actions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Login Portal */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:px-12 bg-white">
              <div className="max-w-[440px] w-full mx-auto flex flex-col justify-center flex-1">
                {/* Brand & Header */}
                <div className="flex flex-col items-start mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      alt="KindredHub"
                      className="h-8 w-auto object-contain"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1XGfpdixE9CW-cHo85PmZhRkNU9NN2FAXIl3GaA-qIyRT5nsyid6OgetvcilFrRGtDrCKUv646ASzPNaC25EXMUDJTXAJ-veu9YpwAzFb5JWjdDG1YtTR0PYCRFxJK_-nJ9whMMaxvIRCilUydSX-YOAYSTnFkpXsRGI4Dc4w_mn9uoqeljyLSFqNn9qnx0zAYY5uhn3DlfFQAf3srxgWi3MNP8s4tSXlnl9BJJ1wXCB-zgMJeftDqgQUo"
                    />
                  </div>
                  <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#181c1a] tracking-tight">
                    Welcome back
                  </h1>
                  <p className="text-xs sm:text-sm text-[#3f493f] mt-1">
                    Log in to follow your impact, discover verified NGOs, or check verified certificates.
                  </p>
                </div>

                {/* Quick SSO / Passkey Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  <button
                    onClick={() => onLogin(DEMO_LOGINS.donor.email, DEMO_LOGINS.donor.password)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f1f4f1] hover:bg-[#ecefeb] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer border border-[#becabc]/20"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <button
                    onClick={() => onLogin(DEMO_LOGINS.donor.email, DEMO_LOGINS.donor.password)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f1f4f1] hover:bg-[#ecefeb] text-[#181c1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer border border-[#becabc]/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#006443]">key</span>
                    <span>Passkey Login</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-3">
                  <div className="w-full h-px bg-[#e6e9e5]"></div>
                  <span className="absolute px-3 bg-white font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                    or continue with email
                  </span>
                </div>

                {/* Credentials Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] flex items-center justify-between">
                      <span>Email Address</span>
                      <span className="text-[#006443] text-[10px] font-bold">Grassroots & Donor ID</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#6f7a6e] pointer-events-none">
                        mail
                      </span>
                      <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[#f1f4f1] text-[#181c1a] rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] transition-all"
                        placeholder="name@example.com"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#6f7a6e] pointer-events-none">
                        lock
                      </span>
                      <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-2.5 bg-[#f1f4f1] text-[#181c1a] rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] transition-all"
                        placeholder="••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-[#6f7a6e] hover:text-[#181c1a] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot Password */}
                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-[#00652c] focus:ring-[#00652c] accent-[#15803d] cursor-pointer"
                        type="checkbox"
                      />
                      <span className="text-[#3f493f]">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset verification link sent to your registered email.')}
                      className="font-['Plus_Jakarta_Sans'] text-[#00652c] hover:underline font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#ba1a1a]">{error}</p>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold hover:bg-[#15803d] active:scale-[0.99] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Log In to KindredHub</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>

                {/* Demo accounts */}
                <div className="mt-4 p-3 rounded-2xl border border-dashed border-[#becabc] bg-[#f7faf6]">
                  <p className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider font-bold text-[#6f7a6e] mb-2">Demo accounts — click to fill</p>
                  <div className="grid grid-cols-3 gap-2">
                    {([['donor', 'Donor', 'volunteer_activism'], ['ngo', 'NGO', 'corporate_fare'], ['admin', 'Admin', 'admin_panel_settings']] as const).map(([k, label, icon]) => (
                      <button key={k} type="button" onClick={() => fillDemo(k)} className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white border border-[#becabc]/40 hover:border-[#00652c] text-xs font-semibold cursor-pointer">
                        <span className="material-symbols-outlined text-[16px] text-[#00652c]">{icon}</span>{label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* NGO Partner Portal Banner */}
                <div
                  onClick={() => onNavigate('register')}
                  className="mt-5 p-3.5 rounded-2xl bg-[#f1f4f1] hover:bg-[#e6e9e5] border border-[#becabc]/30 flex items-center justify-between gap-3 group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffdbd0] text-[#390c00] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#181c1a]">
                        Are you an NGO partner?
                      </span>
                      <span className="text-[11px] text-[#3f493f]">
                        Access field audits, token disbursements, and dispatch logs
                      </span>
                    </div>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] font-bold group-hover:translate-x-1 transition-transform shrink-0 flex items-center">
                    Portal →
                  </span>
                </div>

                {/* Register Link */}
                <div className="text-center mt-4 text-xs text-[#3f493f]">
                  <span>Don't have an account?</span>
                  <button
                    onClick={() => onNavigate('register')}
                    className="ml-1 text-[#00652c] font-semibold hover:underline cursor-pointer"
                  >
                    Create an account
                  </button>
                </div>
              </div>

              {/* Compliance & Security Footer */}
              <div className="pt-4 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[#6f7a6e] font-['Plus_Jakarta_Sans'] text-[10px] border-t border-[#becabc]/20">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#006443]">enhanced_encryption</span>
                  <span>256-Bit Financial Grade</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#006443]">gavel</span>
                  <span>GDPR Compliant</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#00652c]">verified</span>
                  <span>Zero Trackers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f1f4f1] py-4 border-t border-[#becabc]/20">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6f7a6e]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#006443]">shield</span>
            <span>Verified NGO Partner Security & Data Confidentiality</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#181c1a] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#181c1a] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#181c1a] cursor-pointer">Security</span>
            <span>•</span>
            <span>© 2026 KindredHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
