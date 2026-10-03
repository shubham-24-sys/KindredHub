import React, { useMemo, useState } from 'react';
import { NGO } from '../../data/mockData';
import { Account, NgoDoc, Platform, REQUIRED_DOCS, docSummary, fmtDate } from '../../data/platform';
import {
  Card, ConfirmDialog, DashboardShell, DocBadge, DocPreview, Modal, NavItem, PageHeader, StatCard, VerifiedBadge,
  ghostBtn, inputCls, labelCls, primaryBtn,
} from './shared';

type Tab = 'overview' | 'users' | 'ngos' | 'documents';

interface Props {
  platform: Platform;
  onHome: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ platform, onHome, onLogout }) => {
  const [tab, setTab] = useState<Tab>('overview');
  const [focusNgo, setFocusNgo] = useState<string | null>(null);

  const donors = platform.accounts.filter(a => a.role === 'donor');
  const pendingDocs = platform.docs.filter(d => d.status === 'pending').length;

  const items: NavItem[] = [
    { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Users', icon: 'group', badge: undefined },
    { id: 'ngos', label: 'NGOs', icon: 'corporate_fare' },
    { id: 'documents', label: 'Document Verification', icon: 'fact_check', badge: pendingDocs || undefined },
  ];

  const openDocsFor = (ngoId: string) => { setFocusNgo(ngoId); setTab('documents'); };

  return (
    <DashboardShell
      roleLabel="Admin"
      userName={platform.account?.name || 'Admin'}
      items={items}
      active={tab}
      onSelect={id => { setFocusNgo(null); setTab(id as Tab); }}
      onHome={onHome}
      onLogout={onLogout}
    >
      {tab === 'overview' && <Overview platform={platform} donors={donors} go={setTab} />}
      {tab === 'users' && <Users platform={platform} donors={donors} />}
      {tab === 'ngos' && <Ngos platform={platform} onReview={openDocsFor} />}
      {tab === 'documents' && <Documents platform={platform} focusNgo={focusNgo} clearFocus={() => setFocusNgo(null)} />}
    </DashboardShell>
  );
};

/* ------------------------------------------------------------------ */
const Overview: React.FC<{ platform: Platform; donors: Account[]; go: (t: Tab) => void }> = ({ platform, donors, go }) => {
  const verified = platform.ngos.filter(n => n.verified).length;
  const unverified = platform.ngos.length - verified;
  const pendingDocs = platform.docs.filter(d => d.status === 'pending');
  const recent = [...platform.accounts].filter(a => a.role !== 'admin').sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);
  const ngoName = (id: string) => platform.ngos.find(n => n.id === id)?.name || id;

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Platform health, community size and the verification queue." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon="group" label="Registered users" value={donors.length} hint="Donors & supporters" />
        <StatCard icon="corporate_fare" label="Registered NGOs" value={platform.ngos.length} tone="blue" hint={`${verified} verified · ${unverified} not verified`} />
        <StatCard icon="pending_actions" label="Documents to review" value={pendingDocs.length} tone="orange" />
        <StatCard icon="auto_stories" label="Impact stories" value={platform.stories.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Awaiting your review" action={<button className="text-xs font-semibold text-[#00652c] hover:underline cursor-pointer" onClick={() => go('documents')}>Open queue</button>}>
          {pendingDocs.length === 0 ? (
            <p className="text-sm text-[#3f493f] py-4">Nothing pending — all documents have been reviewed.</p>
          ) : (
            <ul className="divide-y divide-[#e6e9e5]">
              {pendingDocs.slice(0, 5).map(d => (
                <li key={d.id} className="py-2.5 text-sm flex items-center justify-between gap-3">
                  <span className="min-w-0"><b className="block truncate">{ngoName(d.ngoId)}</b><span className="text-xs text-[#6f7a6e]">{d.type}</span></span>
                  <span className="text-xs text-[#6f7a6e] whitespace-nowrap">{fmtDate(d.uploadedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Recent sign-ups">
          <ul className="divide-y divide-[#e6e9e5]">
            {recent.map(a => (
              <li key={a.id} className="py-2.5 text-sm flex items-center justify-between gap-3">
                <span className="min-w-0"><b className="block truncate">{a.name}</b><span className="text-xs text-[#6f7a6e] truncate block">{a.email}</span></span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${a.role === 'ngo' ? 'bg-[#cfe6f2] text-[#0b4a66]' : 'bg-[#e6e9e5] text-[#3f493f]'}`}>{a.role}</span>
                  <span className="text-xs text-[#6f7a6e]">{fmtDate(a.createdAt)}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
const Users: React.FC<{ platform: Platform; donors: Account[] }> = ({ platform, donors }) => {
  const [q, setQ] = useState('');
  const [toRemove, setToRemove] = useState<Account | null>(null);
  const list = donors
    .filter(a => `${a.name} ${a.email}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <>
      <PageHeader title="Users" subtitle={`${donors.length} registered supporter account(s).`} />
      <input className={`${inputCls} max-w-sm mb-4`} placeholder="Search by name or email…" value={q} onChange={e => setQ(e.target.value)} />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="bg-[#f1f4f1] text-left text-xs uppercase tracking-wider text-[#3f493f]">
              <tr><th className="px-5 py-3">User</th><th className="px-3 py-3">Email</th><th className="px-3 py-3">Joined</th><th className="px-5 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-[#e6e9e5]">
              {list.map(a => (
                <tr key={a.id}>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#95f8a7]/60 text-[#00652c] font-bold flex items-center justify-center text-xs">{a.name.charAt(0).toUpperCase()}</span>
                      <b>{a.name}</b>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[#3f493f]">{a.email}</td>
                  <td className="px-3 py-3 text-[#3f493f] whitespace-nowrap">{fmtDate(a.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setToRemove(a)} className="text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/60 px-3 py-1.5 rounded-lg cursor-pointer">Remove</button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-[#6f7a6e]">No users match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
      {toRemove && (
        <ConfirmDialog
          title="Remove user?"
          message={<>This permanently deletes <b>{toRemove.name}</b> ({toRemove.email}). They will be logged out and will no longer be able to sign in.</>}
          confirmLabel="Remove user"
          onCancel={() => setToRemove(null)}
          onConfirm={() => { platform.removeDonor(toRemove.id); setToRemove(null); }}
        />
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
const Ngos: React.FC<{ platform: Platform; onReview: (ngoId: string) => void }> = ({ platform, onReview }) => {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [detail, setDetail] = useState<string | null>(null);
  const [toRemove, setToRemove] = useState<NGO | null>(null);
  const [err, setErr] = useState('');

  const accountOf = (n: NGO) => platform.accounts.find(a => a.ngoId === n.id);
  const list = platform.ngos.filter(n =>
    (filter === 'all' || (filter === 'verified') === n.verified) &&
    `${n.name} ${n.cityLabel} ${n.causeLabel}`.toLowerCase().includes(q.toLowerCase()),
  );
  const d = platform.ngos.find(n => n.id === detail);

  return (
    <>
      <PageHeader title="NGOs" subtitle={`${platform.ngos.length} registered organisation(s).`} />
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input className={`${inputCls} sm:max-w-sm`} placeholder="Search NGOs…" value={q} onChange={e => setQ(e.target.value)} />
        <div className="flex gap-1 p-1 bg-[#f1f4f1] rounded-xl self-start">
          {(['all', 'verified', 'unverified'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${filter === f ? 'bg-white text-[#00652c] shadow-sm' : 'text-[#3f493f]'}`}>{f}</button>
          ))}
        </div>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-[#f1f4f1] text-left text-xs uppercase tracking-wider text-[#3f493f]">
              <tr><th className="px-5 py-3">NGO</th><th className="px-3 py-3">Cause</th><th className="px-3 py-3">City</th><th className="px-3 py-3">Registered</th><th className="px-3 py-3">Docs</th><th className="px-3 py-3">Status</th><th className="px-5 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-[#e6e9e5]">
              {list.map(n => {
                const s = docSummary(platform.docs, n.id);
                return (
                  <tr key={n.id} className="hover:bg-[#f7faf6]">
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-3 min-w-0">
                        <img src={n.avatar} alt="" className="w-8 h-8 rounded-lg object-cover bg-[#e6e9e5]" />
                        <span className="min-w-0"><b className="block truncate">{n.name}</b><span className="text-xs text-[#6f7a6e] block truncate">{accountOf(n)?.email}</span></span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#3f493f]">{n.causeLabel}</td>
                    <td className="px-3 py-3 text-[#3f493f]">{n.cityLabel}</td>
                    <td className="px-3 py-3 text-[#3f493f] whitespace-nowrap">{accountOf(n) ? fmtDate(accountOf(n)!.createdAt) : '—'}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{s.verified}/{s.total}{s.pending > 0 && <span className="ml-1 text-[#6b4e00] text-xs font-bold">({s.pending} pending)</span>}</td>
                    <td className="px-3 py-3"><VerifiedBadge verified={n.verified} small /></td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => { setErr(''); setDetail(n.id); }} className="text-xs font-semibold text-[#00652c] hover:bg-[#95f8a7]/40 px-3 py-1.5 rounded-lg cursor-pointer">Details</button>
                      <button onClick={() => setToRemove(n)} className="text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/60 px-3 py-1.5 rounded-lg cursor-pointer">Remove</button>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && <tr><td colSpan={7} className="px-5 py-10 text-center text-[#6f7a6e]">No NGOs match.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>

      {d && (
        <Modal title={d.name} onClose={() => setDetail(null)} wide>
          <div className="flex items-start gap-4">
            <img src={d.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover bg-[#e6e9e5]" />
            <div className="flex-1 min-w-0">
              <VerifiedBadge verified={d.verified} />
              <p className="text-sm text-[#3f493f] mt-2">{d.description}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 text-sm">
            {[
              ['Contact email', accountOf(d)?.email || '—'],
              ['Cause', d.causeLabel],
              ['Location', `${d.location}`],
              ['Founded', String(d.foundedYear)],
              ['FCRA no.', d.fcraNumber || '—'],
              ['80G eligible', d.section80G ? 'Yes' : 'No'],
              ['Registered on platform', accountOf(d) ? fmtDate(accountOf(d)!.createdAt) : '—'],
              ['Stories', String(platform.stories.filter(s => s.ngoId === d.id).length)],
              ['Volunteers', String(d.activeVolunteers)],
            ].map(([k, v]) => (
              <div key={k}><dt className="text-[11px] uppercase tracking-wider text-[#6f7a6e]">{k}</dt><dd className="font-semibold break-words">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-5">
            <p className={labelCls}>Documents</p>
            <ul className="divide-y divide-[#e6e9e5] border border-[#e6e9e5] rounded-xl">
              {REQUIRED_DOCS.map(r => {
                const doc = docSummary(platform.docs, d.id).byType(r.type);
                return <li key={r.type} className="px-4 py-2.5 flex items-center justify-between text-sm"><span>{r.type}</span><DocBadge status={doc?.status ?? 'missing'} /></li>;
              })}
            </ul>
          </div>
          {err && <p role="alert" className="mt-3 text-sm text-[#ba1a1a] font-medium">{err}</p>}
          <div className="flex flex-wrap justify-end gap-2 mt-6">
            <button className={ghostBtn} onClick={() => { setDetail(null); onReview(d.id); }}>Review documents</button>
            {d.verified ? (
              <button className={ghostBtn} onClick={() => platform.setNgoVerified(d.id, false)}>Revoke verification</button>
            ) : (
              <button
                className={primaryBtn}
                onClick={() => { const r = platform.setNgoVerified(d.id, true); if (!r.ok) setErr(r.error); }}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>Mark as verified
              </button>
            )}
          </div>
        </Modal>
      )}

      {toRemove && (
        <ConfirmDialog
          title="Remove NGO?"
          message={<>This permanently deletes <b>{toRemove.name}</b>, its login, uploaded documents and all its stories. It will disappear from the public directory, map and feed.</>}
          confirmLabel="Remove NGO"
          onCancel={() => setToRemove(null)}
          onConfirm={() => { platform.removeNgo(toRemove.id); if (detail === toRemove.id) setDetail(null); setToRemove(null); }}
        />
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
const Documents: React.FC<{ platform: Platform; focusNgo: string | null; clearFocus: () => void }> = ({ platform, focusNgo, clearFocus }) => {
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const [view, setView] = useState<NgoDoc | null>(null);
  const [rejecting, setRejecting] = useState<NgoDoc | null>(null);
  const [note, setNote] = useState('');
  const [errs, setErrs] = useState<Record<string, string>>({});

  const groups = useMemo(() => {
    return platform.ngos
      .filter(n => !focusNgo || n.id === focusNgo)
      .map(n => {
        const docs = platform.docs.filter(d => d.ngoId === n.id);
        const sum = docSummary(platform.docs, n.id);
        return { ngo: n, docs, sum };
      })
      .filter(g => g.docs.length > 0 && (focusNgo || filter === 'all' || g.sum.pending > 0))
      .sort((a, b) => b.sum.pending - a.sum.pending);
  }, [platform.ngos, platform.docs, filter, focusNgo]);

  const reject = () => {
    if (!rejecting) return;
    platform.reviewDoc(rejecting.id, 'rejected', note.trim() || undefined);
    setRejecting(null);
    setNote('');
  };

  return (
    <>
      <PageHeader
        title="Document Verification"
        subtitle="Review each NGO's documents, approve or reject them, then mark the NGO as verified."
        action={
          focusNgo ? (
            <button className={ghostBtn} onClick={clearFocus}>Show all NGOs</button>
          ) : (
            <div className="flex gap-1 p-1 bg-[#f1f4f1] rounded-xl">
              {(['pending', 'all'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${filter === f ? 'bg-white text-[#00652c] shadow-sm' : 'text-[#3f493f]'}`}>
                  {f === 'pending' ? 'Needs review' : 'All NGOs'}
                </button>
              ))}
            </div>
          )
        }
      />

      {groups.length === 0 && (
        <Card><p className="text-center py-10 text-sm text-[#3f493f]">🎉 Nothing waiting for review.</p></Card>
      )}

      <div className="space-y-4">
        {groups.map(({ ngo, docs, sum }) => (
          <Card key={ngo.id}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={ngo.avatar} alt="" className="w-10 h-10 rounded-xl object-cover bg-[#e6e9e5]" />
                <div className="min-w-0">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold truncate">{ngo.name}</h3>
                  <p className="text-xs text-[#6f7a6e]">{sum.verified}/{sum.total} verified · {sum.pending} pending · {sum.missing} not uploaded</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <VerifiedBadge verified={ngo.verified} small />
                {ngo.verified ? (
                  <button className={ghostBtn} onClick={() => platform.setNgoVerified(ngo.id, false)}>Revoke</button>
                ) : (
                  <button
                    className={primaryBtn}
                    disabled={sum.verified < sum.total}
                    title={sum.verified < sum.total ? 'Verify all required documents first' : ''}
                    onClick={() => {
                      const r = platform.setNgoVerified(ngo.id, true);
                      setErrs(e => ({ ...e, [ngo.id]: r.ok ? '' : r.error }));
                    }}
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>Mark NGO verified
                  </button>
                )}
              </div>
            </div>
            {errs[ngo.id] && <p className="text-xs text-[#ba1a1a] mb-2">{errs[ngo.id]}</p>}

            <ul className="divide-y divide-[#e6e9e5] border border-[#e6e9e5] rounded-xl">
              {REQUIRED_DOCS.map(r => {
                const doc = docs.find(d => d.type === r.type);
                return (
                  <li key={r.type} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{r.type}</p>
                      <p className="text-xs text-[#6f7a6e] truncate">
                        {doc ? `${doc.fileName} · uploaded ${fmtDate(doc.uploadedAt)}` : 'Not uploaded by the NGO yet'}
                      </p>
                      {doc?.status === 'rejected' && doc.reviewNote && <p className="text-xs text-[#93000a] mt-0.5">Note sent: {doc.reviewNote}</p>}
                    </div>
                    <DocBadge status={doc?.status ?? 'missing'} />
                    {doc && (
                      <div className="flex gap-1.5">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f1f4f1] hover:bg-[#e6e9e5] cursor-pointer" onClick={() => setView(doc)}>View</button>
                        {doc.status !== 'verified' && (
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00652c] text-white hover:bg-[#15803d] cursor-pointer" onClick={() => platform.reviewDoc(doc.id, 'verified')}>Verify</button>
                        )}
                        {doc.status !== 'rejected' && (
                          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ffdad6] text-[#93000a] hover:bg-[#ffc4be] cursor-pointer" onClick={() => { setNote(''); setRejecting(doc); }}>Reject</button>
                        )}
                        {doc.status !== 'pending' && (
                          <button className="px-2 py-1.5 rounded-lg text-xs text-[#6f7a6e] hover:bg-[#ecefeb] cursor-pointer" title="Reset to pending" onClick={() => platform.reviewDoc(doc.id, 'pending')}>
                            <span className="material-symbols-outlined text-[16px]">undo</span>
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>

      {view && (
        <Modal title={view.type} onClose={() => setView(null)} wide>
          <DocPreview doc={view} />
        </Modal>
      )}

      {rejecting && (
        <Modal title="Reject document" onClose={() => setRejecting(null)}>
          <label className={labelCls}>Reason (shown to the NGO)</label>
          <textarea rows={3} className={inputCls} value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Scan is blurry, please upload a clearer copy." />
          <div className="flex justify-end gap-2 mt-5">
            <button className={ghostBtn} onClick={() => setRejecting(null)}>Cancel</button>
            <button className="px-4 py-2.5 rounded-xl bg-[#ba1a1a] text-white text-sm font-semibold hover:bg-[#93000a] cursor-pointer" onClick={reject}>Reject document</button>
          </div>
        </Modal>
      )}
    </>
  );
};
