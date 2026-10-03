import React, { useEffect, useState } from 'react';
import { TrackedDonation, stageOf } from '../data/trackerData';

interface Props {
  donations: TrackedDonation[];
  onOpenDonate: () => void;
  onNavigate: (view: string) => void;
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;
const fmt = (t: number) =>
  new Date(t).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

const STAGES = [
  { title: 'Donation received', icon: 'account_balance_wallet', text: (d: TrackedDonation) => `${inr(d.amount)} received in verified escrow with a platform fee of ₹0. Ledger ref ${d.hash.slice(0, 12)}…` },
  { title: 'Allocated to a programme', icon: 'assignment_turned_in', text: (d: TrackedDonation) => `${d.ngoName} assigned your gift to ${d.units} ${d.unitLabel} in its ${d.cause} programme.` },
  { title: 'Purchased from vendor', icon: 'receipt_long', text: (d: TrackedDonation) => `${d.vendor} invoice ${d.invoice}: ${inr(d.amount * 0.88)} spent on ${d.units} ${d.unitLabel}.` },
  { title: 'Delivered and geotagged', icon: 'location_on', text: (d: TrackedDonation) => `Delivered at ${d.gps}. ${d.officer} uploaded a geotagged proof photo.` },
  { title: 'Confirmed by the community', icon: 'groups', text: (d: TrackedDonation) => `${d.people} ${d.people === 1 ? 'person' : 'people'} confirmed receipt. The impact report is now on the public ledger.` }
];

export const DonationTracker: React.FC<Props> = ({ donations, onOpenDonate, onNavigate }) => {
  const [now, setNow] = useState(Date.now());
  const [open, setOpen] = useState<string | null>(donations[0]?.id ?? null);
  const running = donations.some(d => stageOf(d, now) < 4);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [running]);

  const total = donations.reduce((a, d) => a + d.amount, 0);
  const delivered = donations.filter(d => stageOf(d, now) >= 3).reduce((a, d) => a + d.units, 0);
  const people = donations.filter(d => stageOf(d, now) >= 4).reduce((a, d) => a + d.people, 0);
  const ngoCount = new Set(donations.map(d => d.ngoId)).size;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecefeb] rounded-full text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#00652c]">route</span>
            Follow your rupee
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-extrabold tracking-tight">Donation Impact Tracker</h1>
          <p className="text-sm text-[#3f493f] mt-1 max-w-2xl">
            See every donation move from your payment to a delivered, verified result. Demo speed: a new donation advances one step every 8 seconds.
          </p>
        </div>
        <button onClick={onOpenDonate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803d] hover:bg-[#00652c] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl shadow-sm cursor-pointer shrink-0">
          <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
          Make a donation
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ['Total donated', inr(total), 'payments'],
          ['Impact delivered', `${delivered} units`, 'inventory_2'],
          ['People reached', String(people), 'groups'],
          ['NGOs supported', String(ngoCount), 'diversity_3']
        ].map(([label, value, icon]) => (
          <div key={label} className="bg-white rounded-2xl border border-[#becabc]/30 p-4 shadow-xs">
            <span className="material-symbols-outlined text-[#00652c] text-[22px]">{icon}</span>
            <div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold mt-1">{value}</div>
            <div className="text-xs text-[#6f7a6e]">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#becabc]/30 p-5">
        <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base">Where your money goes</h2>
        <div className="flex h-3 rounded-full overflow-hidden my-3" role="img" aria-label="88% items, 9% logistics, 3% field verification, 0% platform fee">
          <div className="bg-[#15803d]" style={{ width: '88%' }} />
          <div className="bg-[#79db8d]" style={{ width: '9%' }} />
          <div className="bg-[#f2b134]" style={{ width: '3%' }} />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#3f493f]">
          <span>Items 88%</span><span>Logistics 9%</span><span>Field verification 3%</span><span className="font-semibold text-[#00652c]">Platform fee 0%</span>
        </div>
        <p className="text-[11px] text-[#6f7a6e] mt-2">Sample split shown for the demo. Real figures come from each invoice.</p>
      </div>

      {donations.length === 0 && (
        <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-[#becabc]">
          <p className="text-sm text-[#3f493f]">No donations yet. Make one to start tracking it.</p>
        </div>
      )}

      <div className="space-y-4">
        {donations.map(d => {
          const cur = stageOf(d, now);
          const done = cur >= 4;
          const isOpen = open === d.id;
          return (
            <div key={d.id} className="bg-white rounded-2xl border border-[#becabc]/30 shadow-xs overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : d.id)} aria-expanded={isOpen} className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="font-['Plus_Jakarta_Sans'] font-bold text-base">{d.ngoName}</div>
                  <div className="text-xs text-[#6f7a6e] truncate">{d.item}</div>
                </div>
                <div className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg">{inr(d.amount)}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${done ? 'bg-[#95f8a7] text-[#00210a]' : 'bg-[#fff1cf] text-[#6a4a00]'}`}>
                  {done ? 'Delivered and confirmed' : `In progress: ${STAGES[cur].title}`}
                </span>
                <span className="material-symbols-outlined text-[#6f7a6e]">{isOpen ? 'expand_less' : 'expand_more'}</span>
              </button>
              <div className="h-1.5 bg-[#ecefeb]"><div className="h-full bg-[#15803d] transition-all duration-700" style={{ width: `${((cur + 1) / 5) * 100}%` }} /></div>
              {isOpen && (
                <ol className="p-5 space-y-5">
                  {STAGES.map((s, i) => {
                    const reached = i <= cur;
                    return (
                      <li key={s.title} className="flex gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${reached ? 'bg-[#15803d] text-white' : i === cur + 1 ? 'border-2 border-dashed border-[#15803d] text-[#15803d] animate-pulse' : 'bg-[#ecefeb] text-[#6f7a6e]'}`}>
                          <span className="material-symbols-outlined text-[20px]">{reached ? s.icon : i === cur + 1 ? 'hourglass_top' : s.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3">
                            <span className={`font-['Plus_Jakarta_Sans'] font-bold text-sm ${reached ? '' : 'text-[#6f7a6e]'}`}>{s.title}</span>
                            <span className="text-[11px] text-[#6f7a6e]">{reached ? fmt(d.createdAt + i * d.stepMs) : 'Pending'}</span>
                          </div>
                          {reached && <p className="text-xs text-[#3f493f] mt-0.5">{s.text(d)}</p>}
                          {reached && i === 3 && (
                            <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f1f4f1] text-xs text-[#3f493f]">
                              <span className="material-symbols-outlined text-[18px] text-[#00652c]">photo_camera</span>
                              Proof photo on file, GPS and time stamped
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  <li>
                    <button onClick={() => onNavigate('certificates')} className="text-xs font-semibold text-[#00652c] hover:underline cursor-pointer">
                      View the certificate for this donation
                    </button>
                  </li>
                </ol>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
