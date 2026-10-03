import React, { useEffect, useState } from 'react';
import { ACTIVITIES, Activity, VolCert, VolRecord, certSvg } from '../data/trackerData';

const load = <T,>(k: string, fallback: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
};
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

const level = (h: number) => (h >= 25 ? ['Tree', 25, 25] : h >= 10 ? ['Sapling', 25, 10] : ['Seed', 10, 0]) as [string, number, number];

export const VolunteerCertificates: React.FC = () => {
  const [tab, setTab] = useState<'find' | 'mine' | 'certs'>('find');
  const [records, setRecords] = useState<VolRecord[]>(() => load('kh_vol_records', []));
  const [certs, setCerts] = useState<VolCert[]>(() => load('kh_vol_certs', []));
  const [name, setName] = useState<string>(() => load('kh_vol_name', 'Aditya Kharat'));
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hint, setHint] = useState<string | null>(null);
  const [lookup, setLookup] = useState('');
  const [found, setFound] = useState<VolCert | null | undefined>(undefined);

  useEffect(() => save('kh_vol_records', records), [records]);
  useEffect(() => save('kh_vol_certs', certs), [certs]);
  useEffect(() => save('kh_vol_name', name), [name]);

  const rec = (id: string) => records.find(r => r.activityId === id);
  const register = (a: Activity) => setRecords(r => [...r, { activityId: a.id, status: 'registered', at: Date.now() }]);
  const cancel = (id: string) => setRecords(r => r.filter(x => x.activityId !== id));

  const checkIn = (a: Activity) => {
    const entered = (codes[a.id] || '').trim().toUpperCase();
    if (entered !== a.code) { setErrors(e => ({ ...e, [a.id]: 'That code does not match. Ask the NGO coordinator for the check-in code.' })); return; }
    const cert: VolCert = {
      id: `VC-${Date.now().toString(36).toUpperCase()}`,
      hash: `0x${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16)}`,
      volunteer: name.trim() || 'Kindred Volunteer',
      ngoName: a.ngoName, title: a.title, hours: a.hours,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      signatory: a.signatory, role: a.role, place: a.place
    };
    setCerts(c => [cert, ...c]);
    setRecords(r => r.map(x => (x.activityId === a.id ? { ...x, status: 'completed', certId: cert.id } : x)));
    setErrors(e => ({ ...e, [a.id]: '' }));
    setTab('certs');
  };

  const download = (c: VolCert) => {
    const url = URL.createObjectURL(new Blob([certSvg(c)], { type: 'image/svg+xml' }));
    const a = document.createElement('a');
    a.href = url; a.download = `kindredhub-volunteer-${c.id}.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookup.trim().toLowerCase();
    setFound(q ? certs.find(c => c.id.toLowerCase() === q || c.hash.toLowerCase().includes(q)) || null : undefined);
  };

  const hours = certs.reduce((a, c) => a + c.hours, 0);
  const [lvl, next, base] = level(hours);
  const mine = records.filter(r => r.status === 'registered');
  const tabBtn = (id: typeof tab, label: string, count?: number) => (
    <button onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer ${tab === id ? 'bg-[#15803d] text-white' : 'bg-white text-[#3f493f] border border-[#becabc]/40'}`}>
      {label}{count ? ` (${count})` : ''}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-7">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecefeb] rounded-full text-[#3f493f] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[16px] text-[#00652c]">workspace_premium</span>
          Volunteer certificates
        </div>
        <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-extrabold tracking-tight">Volunteer, check in, get certified</h1>
        <p className="text-sm text-[#3f493f] mt-1 max-w-2xl">Register for an activity. When you finish, enter the check-in code from the NGO coordinator and your verified certificate is issued.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-[#becabc]/30 p-4"><div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">{hours}</div><div className="text-xs text-[#6f7a6e]">verified hours</div></div>
        <div className="bg-white rounded-2xl border border-[#becabc]/30 p-4"><div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">{certs.length}</div><div className="text-xs text-[#6f7a6e]">certificates</div></div>
        <div className="bg-white rounded-2xl border border-[#becabc]/30 p-4"><div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">{mine.length}</div><div className="text-xs text-[#6f7a6e]">upcoming activities</div></div>
        <div className="bg-white rounded-2xl border border-[#becabc]/30 p-4">
          <div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">{lvl}</div>
          <div className="h-1.5 bg-[#ecefeb] rounded-full my-1.5 overflow-hidden"><div className="h-full bg-[#15803d]" style={{ width: `${Math.min(100, ((hours - base) / (next - base)) * 100)}%` }} /></div>
          <div className="text-xs text-[#6f7a6e]">{hours >= 25 ? 'Top level reached' : `${next - hours} h to next level`}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">{tabBtn('find', 'Find activities')}{tabBtn('mine', 'My activities', mine.length)}{tabBtn('certs', 'My certificates', certs.length)}</div>

      {tab === 'find' && (
        <div className="grid md:grid-cols-2 gap-4">
          {ACTIVITIES.map(a => {
            const r = rec(a.id);
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-[#becabc]/30 p-5 space-y-3">
                <div className="text-xs font-semibold text-[#00652c]">{a.ngoName}</div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base">{a.title}</h3>
                <div className="text-xs text-[#3f493f] space-y-0.5">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">event</span>{a.when}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">location_on</span>{a.place}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">schedule</span>{a.hours} certified hours · {a.spots - (r ? 1 : 0) > 0 ? `${a.spots - (r ? 1 : 0)} spots left` : 'Full'}</div>
                </div>
                <div className="flex flex-wrap gap-1.5">{a.skills.map(s => <span key={s} className="px-2 py-0.5 bg-[#f1f4f1] rounded-full text-[11px] text-[#3f493f]">{s}</span>)}</div>
                {!r && <button onClick={() => register(a)} className="px-4 py-2 bg-[#15803d] hover:bg-[#00652c] text-white text-xs font-semibold rounded-xl cursor-pointer">Register</button>}
                {r?.status === 'registered' && <button onClick={() => setTab('mine')} className="px-4 py-2 bg-[#d3ffd5] text-[#00652c] text-xs font-semibold rounded-xl cursor-pointer">Registered. Go to check-in</button>}
                {r?.status === 'completed' && <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00652c]"><span className="material-symbols-outlined text-[16px]">verified</span>Completed and certified</span>}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'mine' && (
        <div className="space-y-4">
          {mine.length === 0 && <p className="text-sm text-[#3f493f] bg-white rounded-2xl border border-dashed border-[#becabc] p-8 text-center">You have not registered for anything yet. Pick an activity under Find activities.</p>}
          {mine.map(r => {
            const a = ACTIVITIES.find(x => x.id === r.activityId)!;
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-[#becabc]/30 p-5 space-y-3">
                <div className="flex justify-between gap-3 flex-wrap">
                  <div><div className="text-xs font-semibold text-[#00652c]">{a.ngoName}</div><h3 className="font-['Plus_Jakarta_Sans'] font-bold">{a.title}</h3><div className="text-xs text-[#6f7a6e]">{a.when} · {a.place}</div></div>
                  <button onClick={() => cancel(a.id)} className="text-xs text-[#6f7a6e] hover:text-[#181c1a] underline cursor-pointer self-start">Cancel registration</button>
                </div>
                <label className="text-xs font-bold uppercase tracking-wider block" htmlFor={`code-${a.id}`}>Activity completed? Enter the check-in code</label>
                <div className="flex gap-2 flex-wrap">
                  <input id={`code-${a.id}`} value={codes[a.id] || ''} onChange={e => setCodes(c => ({ ...c, [a.id]: e.target.value }))} placeholder="e.g. HH-0000" className="flex-1 min-w-[160px] px-3 py-2.5 bg-[#f1f4f1] rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-[#15803d]" />
                  <button onClick={() => checkIn(a)} className="px-5 py-2.5 bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-semibold rounded-xl cursor-pointer">Verify and get certificate</button>
                </div>
                {errors[a.id] && <p role="alert" className="text-xs text-[#ba1a1a]">{errors[a.id]}</p>}
                <button onClick={() => setHint(hint === a.id ? null : a.id)} className="text-[11px] text-[#6f7a6e] underline cursor-pointer">Demo: show the NGO coordinator's code</button>
                {hint === a.id && <div className="text-xs bg-[#fff1cf] text-[#6a4a00] rounded-lg px-3 py-2">Coordinator {a.signatory} shows code <b className="font-mono">{a.code}</b> at the end of the activity.</div>}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'certs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#becabc]/30 p-5 flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1"><label htmlFor="vname" className="text-xs font-bold uppercase tracking-wider">Name on new certificates</label>
              <input id="vname" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-[#f1f4f1] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#15803d]" /></div>
            <form onSubmit={verify} className="flex-1 flex gap-2 items-end">
              <div className="flex-1"><label htmlFor="vlook" className="text-xs font-bold uppercase tracking-wider">Verify a certificate</label>
                <input id="vlook" value={lookup} onChange={e => setLookup(e.target.value)} placeholder="Certificate ID or hash" className="w-full mt-1 px-3 py-2.5 bg-[#f1f4f1] rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-[#15803d]" /></div>
              <button className="px-4 py-2.5 bg-[#00652c] text-white text-xs font-semibold rounded-xl cursor-pointer">Verify</button>
            </form>
          </div>
          {found && <div className="p-4 rounded-2xl bg-[#95f8a7]/25 border border-[#79db8d]/50 text-sm">Valid. Issued to <b>{found.volunteer}</b> for {found.hours} hours with {found.ngoName} on {found.date}.</div>}
          {found === null && <div role="alert" className="p-4 rounded-2xl bg-[#ffdad6] text-sm text-[#93000a]">No certificate matches that ID or hash.</div>}
          {certs.length === 0 && <p className="text-sm text-[#3f493f] bg-white rounded-2xl border border-dashed border-[#becabc] p-8 text-center">No certificates yet. Complete an activity and check in to earn one.</p>}
          <div className="grid md:grid-cols-2 gap-5">
            {certs.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border-4 border-double border-[#15803d] p-6 text-center space-y-2 shadow-xs">
                <span className="material-symbols-outlined text-[#00652c] text-[34px]">workspace_premium</span>
                <div className="text-[11px] tracking-[0.25em] text-[#00652c] font-semibold">CERTIFICATE OF SERVICE</div>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">{c.volunteer}</div>
                <p className="text-xs text-[#3f493f]">{c.hours} verified hours with <b>{c.ngoName}</b></p>
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="text-[11px] text-[#6f7a6e]">{c.place} · {c.date}</p>
                <p className="text-[11px] text-[#3f493f]">Signed by {c.signatory}, {c.role}</p>
                <p className="text-[10px] font-mono text-[#6f7a6e] break-all">{c.id} · {c.hash}</p>
                <div className="flex justify-center gap-2 pt-1">
                  <button onClick={() => download(c)} className="px-4 py-2 bg-[#15803d] hover:bg-[#00652c] text-white text-xs font-semibold rounded-xl cursor-pointer">Download</button>
                  <button onClick={() => navigator.clipboard?.writeText(c.id)} className="px-4 py-2 bg-[#f1f4f1] text-xs font-semibold rounded-xl cursor-pointer">Copy ID</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
