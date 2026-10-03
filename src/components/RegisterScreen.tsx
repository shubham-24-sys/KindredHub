import React, { useState } from 'react';

interface RegisterScreenProps {
  onRegister: (input: { role: 'donor' | 'ngo'; name: string; email: string; password: string }) => string | null;
  onSocial: () => void;
  onNavigate: (view: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onSocial, onNavigate }) => {
  const [role, setRole] = useState<'individual' | 'ngo'>('individual');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [formError, setFormError] = useState('');

  // Dynamic Password Matrix Calculations
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const score = [hasMinLength, hasNumber, hasSpecial, password.length >= 12].filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength) {
      setFormError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    if (!termsAgreed) {
      setFormError('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    if (fullName.trim().length < 3) {
      setFormError(role === 'ngo' ? 'Please enter your organisation name.' : 'Please enter your full name.');
      return;
    }
    const err = onRegister({ role: role === 'ngo' ? 'ngo' : 'donor', name: fullName, email, password });
    setFormError(err || '');
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

      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col justify-center py-8">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left Column: Registration Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#becabc]/30">
                {/* Micro Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1f4f1] text-[#006443] w-fit mb-3">
                  <span className="material-symbols-outlined text-[16px] fill-1">groups</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold">
                    Join 2,410+ Active Donors & Volunteers
                  </span>
                </div>

                {/* Title Block */}
                <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#181c1a] tracking-tight mb-2">
                  Join the impact community.
                </h1>
                <p className="text-xs sm:text-sm text-[#3f493f] mb-6 leading-relaxed">
                  Create your free KindredHub account to witness verified grassroots action, track your contributions on an auditable ledger, and earn verified impact deeds.
                </p>

                {/* Role Selector Switcher */}
                <div className="grid grid-cols-2 p-1.5 rounded-xl bg-[#f1f4f1] gap-1.5 mb-6 border border-[#becabc]/20">
                  <button
                    type="button"
                    onClick={() => setRole('individual')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer ${
                      role === 'individual'
                        ? 'bg-white text-[#00652c] shadow-xs'
                        : 'text-[#3f493f] hover:text-[#181c1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    <span>Individual Supporter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('ngo')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all cursor-pointer ${
                      role === 'ngo'
                        ? 'bg-white text-[#00652c] shadow-xs'
                        : 'text-[#3f493f] hover:text-[#181c1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                    <span>NGO / Non-Profit</span>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">
                        {role === 'individual' ? 'Full Name' : 'NGO / Organization Name'}
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[18px]">
                          {role === 'individual' ? 'badge' : 'domain'}
                        </span>
                        <input
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          className="w-full bg-[#f1f4f1] text-[#181c1a] pl-10 pr-3 py-2.5 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] outline-none transition-all"
                          placeholder={role === 'individual' ? 'Aditya Kharat' : 'e.g. Green Earth Trust'}
                          type="text"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">
                        Official Email
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[18px]">
                          mail
                        </span>
                        <input
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-[#f1f4f1] text-[#181c1a] pl-10 pr-3 py-2.5 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] outline-none transition-all"
                          placeholder="aditya@example.org"
                          type="email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">
                        Create Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[18px]">
                          lock
                        </span>
                        <input
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full bg-[#f1f4f1] text-[#181c1a] pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] outline-none transition-all"
                          type={showPassword ? 'text' : 'password'}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] hover:text-[#181c1a] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a]">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6f7a6e] text-[18px]">
                          lock_reset
                        </span>
                        <input
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className="w-full bg-[#f1f4f1] text-[#181c1a] pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent focus:border-[#15803d] outline-none transition-all"
                          type={showPassword ? 'text' : 'password'}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Password Strength Box */}
                  <div className="p-3 rounded-xl bg-[#f1f4f1] border border-[#becabc]/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#3f493f] font-medium">
                        Security Matrix
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Strong Password
                      </span>
                    </div>

                    {/* 4-bar metric indicator */}
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className={`h-1.5 rounded-full transition-all ${score >= 1 ? 'bg-[#15803d]' : 'bg-[#e0e3e0]'}`}></div>
                      <div className={`h-1.5 rounded-full transition-all ${score >= 2 ? 'bg-[#15803d]' : 'bg-[#e0e3e0]'}`}></div>
                      <div className={`h-1.5 rounded-full transition-all ${score >= 3 ? 'bg-[#15803d]' : 'bg-[#e0e3e0]'}`}></div>
                      <div className={`h-1.5 rounded-full transition-all ${score >= 4 ? 'bg-[#15803d]' : 'bg-[#e0e3e0]'}`}></div>
                    </div>

                    {/* Rule Verification Pills */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5">
                      <div className={`flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs ${hasMinLength ? 'text-[#00652c]' : 'text-[#6f7a6e]'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {hasMinLength ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>8+ Characters</span>
                      </div>
                      <div className={`flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs ${hasNumber ? 'text-[#00652c]' : 'text-[#6f7a6e]'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {hasNumber ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Number included</span>
                      </div>
                      <div className={`flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs ${hasSpecial ? 'text-[#00652c]' : 'text-[#6f7a6e]'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {hasSpecial ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <span>Special symbol</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="terms"
                      checked={termsAgreed}
                      onChange={e => setTermsAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded text-[#00652c] focus:ring-[#00652c] accent-[#15803d] cursor-pointer"
                      type="checkbox"
                    />
                    <label htmlFor="terms" className="text-xs text-[#3f493f] cursor-pointer select-none leading-relaxed">
                      I agree to KindredHub's <span className="text-[#00652c] font-semibold hover:underline">Terms of Service</span> and{' '}
                      <span className="text-[#00652c] font-semibold hover:underline">Privacy Policy</span>, and consent to receiving verified impact updates.
                    </label>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-[#ba1a1a]">
                      {formError}
                    </p>
                  )}

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="w-full bg-[#15803d] hover:bg-[#00652c] text-white py-3 px-6 rounded-xl font-['Plus_Jakarta_Sans'] text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span>{role === 'individual' ? 'Create Free Supporter Account' : 'Register NGO for Verification Audit'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>

                  {/* Social Auth Divider */}
                  <div className="relative py-2 flex items-center justify-center">
                    <div className="w-full h-px bg-[#e6e9e5]"></div>
                    <span className="absolute bg-white px-3 font-['Plus_Jakarta_Sans'] text-[10px] text-[#6f7a6e] uppercase tracking-wider font-semibold">
                      or sign up with
                    </span>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={onSocial}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#f1f4f1] hover:bg-[#ecefeb] font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] border border-[#becabc]/20 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                      <span>Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={onSocial}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#f1f4f1] hover:bg-[#ecefeb] font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] border border-[#becabc]/20 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.03-.5 2.65-1.25z"></path>
                      </svg>
                      <span>Apple</span>
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center pt-2 text-xs text-[#3f493f]">
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('login')}
                      className="text-[#00652c] font-semibold hover:underline ml-1 cursor-pointer"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Visual Narrative & Transparency Accents */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md h-[420px] sm:h-[480px] lg:h-[620px] flex flex-col justify-between p-6 sm:p-8 border border-[#becabc]/30">
                <img
                  alt="Volunteers planting saplings"
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABLa-nlOdd5B9IaT0eib3jKg6zy7qFavvxnm8FZMeZNQAJ1ZdHDYxvbP4KsQnQqlQqYM01uD-JGSTlxNAvFD4pwx5ODE7_XduH82PsAoI5zkZaCFWqdM-3HBKpdkGUMWoRRZBOl35bpX1nfZvcLaJ6zzWCeQFNdSTpnRTttqMeQBqVmWRXDjwcaBplX9_x-z8-cBe9zOUP823u-Gbia24fIqeZ0Kr6Ll686x3n7aHq8eSGZiSG6DkB"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c1a]/90 via-[#181c1a]/30 to-[#181c1a]/40"></div>

                {/* Top Micro Impact Floating Tags */}
                <div className="relative z-10 flex flex-col gap-3 items-start">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md max-w-xs border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f1f4f1] flex items-center justify-center text-[#00652c]">
                        <span className="material-symbols-outlined text-[20px]">forest</span>
                      </div>
                      <div>
                        <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#181c1a] flex items-center gap-1">
                          <span>230 Trees Planted</span>
                          <span className="material-symbols-outlined text-[14px] text-[#006443]">check_circle</span>
                        </div>
                        <div className="text-[11px] text-[#6f7a6e]">Mithi River Corridor, Mumbai</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md max-w-xs border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f1f4f1] flex items-center justify-center text-[#006443]">
                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                      </div>
                      <div>
                        <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#181c1a]">
                          100% Transparent Flow
                        </div>
                        <div className="text-[11px] text-[#6f7a6e]">Zero hidden intermediary fees</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Testimonial Quotation Card */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#006443] text-[22px] mt-0.5">format_quote</span>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs text-[#181c1a] italic leading-relaxed">
                        “KindredHub gives our neighborhood complete visibility into real field work before we ever donate a single rupee.”
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[10px] font-bold">
                          PS
                        </div>
                        <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#181c1a] font-bold">Priya S.</span>
                        <span className="text-[#6f7a6e] text-[10px]">•</span>
                        <span className="text-[11px] text-[#3f493f]">Bangalore Community Lead</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ledger Reassurance Bar */}
              <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-[#becabc]/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#3f493f]">
                  <span className="material-symbols-outlined text-[16px] text-[#006443]">lock_clock</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-medium">
                    Immutable Distributed Audit Logs
                  </span>
                </div>
                <div className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs text-[#00652c] font-bold">
                  <span>ISO 27001 Certified</span>
                  <span className="material-symbols-outlined text-[14px]">shield</span>
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
