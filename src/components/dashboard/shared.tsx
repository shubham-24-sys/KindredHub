import React, { useEffect } from 'react';
import { DocStatus, NgoDoc, fmtDate, fmtSize } from '../../data/platform';

const LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1XGfpdixE9CW-cHo85PmZhRkNU9NN2FAXIl3GaA-qIyRT5nsyid6OgetvcilFrRGtDrCKUv646ASzPNaC25EXMUDJTXAJ-veu9YpwAzFb5JWjdDG1YtTR0PYCRFxJK_-nJ9whMMaxvIRCilUydSX-YOAYSTnFkpXsRGI4Dc4w_mn9uoqeljyLSFqNn9qnx0zAYY5uhn3DlfFQAf3srxgWi3MNP8s4tSXlnl9BJJ1wXCB-zgMJeftDqgQUo';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface ShellProps {
  roleLabel: string;
  userName: string;
  items: NavItem[];
  active: string;
  onSelect: (id: string) => void;
  onHome: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const DashboardShell: React.FC<ShellProps> = ({
  roleLabel, userName, items, active, onSelect, onHome, onLogout, children,
}) => (
  <div className="min-h-screen bg-[#f7faf6] text-[#181c1a] flex flex-col lg:flex-row">
    {/* Sidebar (desktop) */}
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col bg-white border-r border-[#becabc]/30 sticky top-0 h-screen">
      <div className="h-16 px-5 flex items-center gap-2 border-b border-[#becabc]/20">
        <img alt="KindredHub" src={LOGO} className="h-7 w-auto" />
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight">
          Kindred<span className="text-[#00652c]">Hub</span>
        </span>
      </div>
      <div className="px-5 py-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6e9e5] text-[#00652c] text-[10px] font-bold uppercase tracking-wider">
          {roleLabel}
        </span>
        <p className="mt-2 text-sm font-semibold truncate">{userName}</p>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {items.map(i => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              active === i.id ? 'bg-[#00652c] text-white shadow-sm' : 'text-[#3f493f] hover:bg-[#ecefeb]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{i.icon}</span>
            <span className="flex-1 text-left">{i.label}</span>
            {!!i.badge && (
              <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                active === i.id ? 'bg-white text-[#00652c]' : 'bg-[#ac3400] text-white'
              }`}>{i.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-[#becabc]/20 space-y-1">
        <button onClick={onHome} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#3f493f] hover:bg-[#ecefeb] cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">public</span> View public site
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/50 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">logout</span> Log out
        </button>
      </div>
    </aside>

    {/* Mobile top bar */}
    <header className="lg:hidden bg-white border-b border-[#becabc]/30 sticky top-0 z-30">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img alt="KindredHub" src={LOGO} className="h-6 w-auto" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00652c] bg-[#e6e9e5] px-2 py-0.5 rounded-full">{roleLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onHome} title="Public site" className="p-2 rounded-lg hover:bg-[#ecefeb] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">public</span>
          </button>
          <button onClick={onLogout} title="Log out" className="p-2 rounded-lg hover:bg-[#ffdad6]/50 text-[#ba1a1a] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
      <div className="flex gap-1 px-3 pb-2 overflow-x-auto scrollbar-none">
        {items.map(i => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              active === i.id ? 'bg-[#00652c] text-white' : 'bg-[#f1f4f1] text-[#3f493f]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{i.icon}</span>
            {i.label}
            {!!i.badge && <span className="ml-0.5 px-1.5 rounded-full bg-[#ac3400] text-white text-[10px]">{i.badge}</span>}
          </button>
        ))}
      </div>
    </header>

    <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-[1100px] w-full mx-auto">{children}</main>
  </div>
);

export const PageHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
    <div>
      <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-[#3f493f] mt-1 max-w-2xl">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const StatCard: React.FC<{ icon: string; label: string; value: React.ReactNode; hint?: string; tone?: 'green' | 'orange' | 'blue' | 'red' }> = ({
  icon, label, value, hint, tone = 'green',
}) => {
  const tones = {
    green: 'bg-[#95f8a7]/50 text-[#00652c]',
    orange: 'bg-[#ffdbd0] text-[#832600]',
    blue: 'bg-[#cfe6f2] text-[#0b4a66]',
    red: 'bg-[#ffdad6] text-[#93000a]',
  };
  return (
    <div className="bg-white rounded-2xl border border-[#becabc]/30 p-4 sm:p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <p className="mt-3 font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-[#3f493f] mt-0.5">{label}</p>
      {hint && <p className="text-[11px] text-[#6f7a6e] mt-1">{hint}</p>}
    </div>
  );
};

export const Card: React.FC<{ title?: string; action?: React.ReactNode; className?: string; children: React.ReactNode }> = ({ title, action, className = '', children }) => (
  <section className={`bg-white rounded-2xl border border-[#becabc]/30 shadow-sm ${className}`}>
    {(title || action) && (
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        {title && <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold">{title}</h2>}
        {action}
      </div>
    )}
    <div className={title || action ? 'px-5 pb-5' : 'p-5'}>{children}</div>
  </section>
);

export const VerifiedBadge: React.FC<{ verified: boolean; small?: boolean }> = ({ verified, small }) => (
  <span className={`inline-flex items-center gap-1 rounded-full font-bold ${small ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'} ${
    verified ? 'bg-[#95f8a7]/60 text-[#00652c]' : 'bg-[#ffdbd0] text-[#832600]'
  }`}>
    <span className="material-symbols-outlined text-[14px] fill-1">{verified ? 'verified' : 'hourglass_top'}</span>
    {verified ? 'Verified' : 'Not verified'}
  </span>
);

const DOC_STYLES: Record<DocStatus | 'missing', { cls: string; label: string; icon: string }> = {
  verified: { cls: 'bg-[#95f8a7]/60 text-[#00652c]', label: 'Verified', icon: 'check_circle' },
  pending: { cls: 'bg-[#ffe9a8] text-[#6b4e00]', label: 'Under review', icon: 'schedule' },
  rejected: { cls: 'bg-[#ffdad6] text-[#93000a]', label: 'Rejected', icon: 'cancel' },
  missing: { cls: 'bg-[#e6e9e5] text-[#3f493f]', label: 'Not uploaded', icon: 'upload_file' },
};

export const DocBadge: React.FC<{ status: DocStatus | 'missing' }> = ({ status }) => {
  const s = DOC_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${s.cls}`}>
      <span className="material-symbols-outlined text-[14px] fill-1">{s.icon}</span>
      {s.label}
    </span>
  );
};

export const Modal: React.FC<{ title: string; onClose: () => void; wide?: boolean; children: React.ReactNode }> = ({ title, onClose, wide, children }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className={`bg-white rounded-3xl w-full ${wide ? 'max-w-3xl' : 'max-w-md'} shadow-2xl my-8`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#becabc]/20">
          <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#ecefeb] cursor-pointer" aria-label="Close">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const ConfirmDialog: React.FC<{
  title: string; message: React.ReactNode; confirmLabel: string; onConfirm: () => void; onCancel: () => void;
}> = ({ title, message, confirmLabel, onConfirm, onCancel }) => (
  <Modal title={title} onClose={onCancel}>
    <div className="text-sm text-[#3f493f] leading-relaxed">{message}</div>
    <div className="flex justify-end gap-2 mt-6">
      <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#f1f4f1] hover:bg-[#e6e9e5] cursor-pointer">Cancel</button>
      <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#ba1a1a] text-white hover:bg-[#93000a] cursor-pointer">{confirmLabel}</button>
    </div>
  </Modal>
);

/** Inline preview of an uploaded document (image / pdf) inside a modal. */
export const DocPreview: React.FC<{ doc: NgoDoc }> = ({ doc }) => {
  const isImg = doc.dataUrl?.startsWith('data:image');
  const isPdf = doc.dataUrl?.startsWith('data:application/pdf');
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#3f493f] mb-3">
        <span className="font-semibold">{doc.fileName}</span>
        <span>{fmtSize(doc.fileSize)}</span>
        <span>Uploaded {fmtDate(doc.uploadedAt)}</span>
      </div>
      <div className="rounded-2xl bg-[#f1f4f1] border border-[#becabc]/30 overflow-hidden min-h-[200px] flex items-center justify-center">
        {isImg && <img src={doc.dataUrl} alt={doc.fileName} className="max-h-[60vh] w-auto object-contain" />}
        {isPdf && <iframe title={doc.fileName} src={doc.dataUrl} className="w-full h-[60vh]" />}
        {!doc.dataUrl && (
          <div className="text-center p-8 text-sm text-[#3f493f]">
            <span className="material-symbols-outlined text-[40px] text-[#6f7a6e]">description</span>
            <p className="mt-2 font-semibold">Preview not available</p>
            <p className="text-xs mt-1 text-[#6f7a6e] max-w-xs">
              This is a seeded sample record, or the file was larger than the demo's browser-storage limit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const inputCls =
  'w-full px-3.5 py-2.5 bg-[#f1f4f1] text-[#181c1a] rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#15803d] border border-transparent transition-all';
export const labelCls = "block font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#181c1a] mb-1.5";
export const primaryBtn =
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00652c] text-white text-sm font-semibold hover:bg-[#15803d] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer font-['Plus_Jakarta_Sans']";
export const ghostBtn =
  "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f1f4f1] text-[#181c1a] text-sm font-semibold hover:bg-[#e6e9e5] transition-all cursor-pointer font-['Plus_Jakarta_Sans']";
