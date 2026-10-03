import React, { useMemo, useRef, useState } from 'react';
import { INITIAL_POSTS, NGO } from '../../data/mockData';
import {
  CAUSES, CITIES, Platform, REQUIRED_DOCS, docSummary, fileToDataUrl, fmtDate, fmtSize, imageToDataUrl, timeAgo,
} from '../../data/platform';
import { TrackedDonation } from '../../data/trackerData';
import {
  Card, ConfirmDialog, DashboardShell, DocBadge, DocPreview, Modal, NavItem, PageHeader, StatCard, VerifiedBadge,
  ghostBtn, inputCls, labelCls, primaryBtn,
} from './shared';

type Tab = 'overview' | 'documents' | 'profile' | 'stories' | 'create';

interface Props {
  platform: Platform;
  donations: TrackedDonation[];
  onHome: () => void;
  onLogout: () => void;
  onPreviewProfile: (ngo: NGO) => void;
}

const MAX_DOC_BYTES = 400 * 1024; // keep stored file previews small for localStorage

export const NgoDashboard: React.FC<Props> = ({ platform, donations, onHome, onLogout, onPreviewProfile }) => {
  const ngo = platform.myNgo;
  const [tab, setTab] = useState<Tab>('overview');

  if (!ngo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="font-bold text-lg">This NGO account is no longer active.</p>
          <button className={`${primaryBtn} mt-4`} onClick={onLogout}>Back to login</button>
        </div>
      </div>
    );
  }

  const sum = docSummary(platform.docs, ngo.id);
  const myStories = platform.stories.filter(s => s.ngoId === ngo.id);
  const seededPosts = INITIAL_POSTS.filter(p => p.ngoId === ngo.id);

  const items: NavItem[] = [
    { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
    { id: 'documents', label: 'Document Verification', icon: 'fact_check', badge: sum.missing + sum.rejected || undefined },
    { id: 'profile', label: 'Public Profile', icon: 'storefront' },
    { id: 'stories', label: 'Impact Stories', icon: 'auto_stories' },
    { id: 'create', label: 'Create Story', icon: 'edit_square' },
  ];

  return (
    <DashboardShell
      roleLabel="NGO Portal"
      userName={ngo.name}
      items={items}
      active={tab}
      onSelect={id => setTab(id as Tab)}
      onHome={onHome}
      onLogout={onLogout}
    >
      {platform.storageWarning && (
        <div className="mb-4 p-3 rounded-xl bg-[#ffe9a8] text-[#6b4e00] text-xs font-medium">
          Browser storage is full — recent changes are kept for this session only. Try smaller images / documents.
        </div>
      )}
      {tab === 'overview' && (
        <Overview ngo={ngo} platform={platform} donations={donations} sum={sum} storyCount={myStories.length + seededPosts.length} go={setTab} />
      )}
      {tab === 'documents' && <Documents ngo={ngo} platform={platform} />}
      {tab === 'profile' && <Profile ngo={ngo} platform={platform} onPreview={() => onPreviewProfile(ngo)} />}
      {tab === 'stories' && <Stories ngo={ngo} platform={platform} seeded={seededPosts} go={setTab} />}
      {tab === 'create' && <CreateStory ngo={ngo} platform={platform} done={() => setTab('stories')} />}
    </DashboardShell>
  );
};

/* ------------------------------------------------------------------ */
/*  Overview                                                           */
/* ------------------------------------------------------------------ */
const Overview: React.FC<{
  ngo: NGO; platform: Platform; donations: TrackedDonation[]; sum: ReturnType<typeof docSummary>; storyCount: number; go: (t: Tab) => void;
}> = ({ ngo, platform, donations, sum, storyCount, go }) => {
  const received = donations.filter(d => d.ngoId === ngo.id);
  const total = received.reduce((a, d) => a + d.amount, 0);
  const people = platform.stories.filter(s => s.ngoId === ngo.id).reduce((a, s) => a + s.peopleHelped, 0);

  const completeness = useMemo(() => {
    const checks = [
      ngo.description.length > 40,
      !!ngo.location && ngo.location !== 'Add your location',
      !!ngo.avatar,
      !!ngo.heroImage,
      !!ngo.fcraNumber,
      !!ngo.weeklyMilestone,
      ngo.foundedYear > 1900,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [ngo]);

  const banner = ngo.verified
    ? { cls: 'bg-[#95f8a7]/40 border-[#00652c]/20', icon: 'verified', title: 'Your organisation is verified', text: 'Your profile and stories are visible to donors across KindredHub.' }
    : sum.pending > 0 && sum.missing === 0 && sum.rejected === 0
      ? { cls: 'bg-[#ffe9a8]/60 border-[#6b4e00]/20', icon: 'schedule', title: 'Documents under review', text: 'Our admin team is reviewing your documents. You will be verified once all are approved.' }
      : { cls: 'bg-[#ffdbd0]/60 border-[#832600]/20', icon: 'upload_file', title: 'Verification needed', text: `${sum.missing + sum.rejected} document(s) still need your attention. Until verified, your NGO is hidden from the public directory and map.` };

  return (
    <>
      <PageHeader title={`Welcome, ${ngo.name}`} subtitle="Track your verification, supporters and impact at a glance." />

      <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 mb-6 ${banner.cls}`}>
        <span className="material-symbols-outlined text-[28px] fill-1">{banner.icon}</span>
        <div className="flex-1">
          <p className="font-['Plus_Jakarta_Sans'] font-bold">{banner.title}</p>
          <p className="text-sm text-[#3f493f]">{banner.text}</p>
        </div>
        {!ngo.verified && <button className={primaryBtn} onClick={() => go('documents')}>Open documents</button>}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon="payments" label="Donations received" value={`₹${total.toLocaleString('en-IN')}`} hint={`${received.length} donation(s) tracked`} />
        <StatCard icon="fact_check" label="Documents verified" value={`${sum.verified}/${sum.total}`} tone="blue" />
        <StatCard icon="auto_stories" label="Impact stories" value={storyCount} tone="orange" />
        <StatCard icon="groups" label="People helped (stories)" value={people.toLocaleString('en-IN')} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Profile completeness">
          <div className="h-2.5 rounded-full bg-[#e6e9e5] overflow-hidden">
            <div className="h-full bg-[#15803d] transition-all" style={{ width: `${completeness}%` }} />
          </div>
          <p className="text-sm mt-2 text-[#3f493f]"><b>{completeness}%</b> complete. A full profile builds donor trust.</p>
          <button className={`${ghostBtn} mt-3`} onClick={() => go('profile')}>Edit public profile</button>
        </Card>
        <Card title="Quick actions">
          <div className="grid grid-cols-2 gap-2">
            <button className={ghostBtn} onClick={() => go('create')}><span className="material-symbols-outlined text-[18px]">edit_square</span>New story</button>
            <button className={ghostBtn} onClick={() => go('documents')}><span className="material-symbols-outlined text-[18px]">upload_file</span>Upload docs</button>
            <button className={ghostBtn} onClick={() => go('stories')}><span className="material-symbols-outlined text-[18px]">auto_stories</span>My stories</button>
            <button className={ghostBtn} onClick={() => go('profile')}><span className="material-symbols-outlined text-[18px]">storefront</span>Profile</button>
          </div>
        </Card>
      </div>

      {received.length > 0 && (
        <Card title="Recent donations" className="mt-4">
          <ul className="divide-y divide-[#e6e9e5]">
            {received.slice(0, 5).map(d => (
              <li key={d.id} className="py-2.5 flex items-center justify-between text-sm gap-3">
                <span className="truncate">{d.item}</span>
                <span className="font-bold text-[#00652c] whitespace-nowrap">₹{d.amount.toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Document verification                                              */
/* ------------------------------------------------------------------ */
const Documents: React.FC<{ ngo: NGO; platform: Platform }> = ({ ngo, platform }) => {
  const sum = docSummary(platform.docs, ngo.id);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFile = async (type: string, file?: File) => {
    if (!file) return;
    setError('');
    const okType = /^(application\/pdf|image\/(png|jpe?g|webp))$/.test(file.type);
    if (!okType) return setError('Please upload a PDF, PNG, JPG or WEBP file.');
    if (file.size > 8 * 1024 * 1024) return setError('File is too large (max 8 MB).');
    setBusy(type);
    try {
      let dataUrl: string | undefined;
      if (file.type.startsWith('image/')) dataUrl = await imageToDataUrl(file, 1100, 0.7);
      else if (file.size <= MAX_DOC_BYTES) dataUrl = await fileToDataUrl(file);
      platform.uploadDoc(ngo.id, type, file, dataUrl);
    } catch (e: any) {
      setError(e?.message || 'Upload failed');
    } finally {
      setBusy(null);
      const el = refs.current[type];
      if (el) el.value = '';
    }
  };

  const previewDoc = platform.docs.find(d => d.id === preview);

  return (
    <>
      <PageHeader
        title="Document Verification"
        subtitle="Upload the documents below. Our admin team reviews each one; once all are approved your NGO is marked Verified and appears publicly."
        action={<VerifiedBadge verified={ngo.verified} />}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard icon="check_circle" label="Verified" value={sum.verified} />
        <StatCard icon="schedule" label="Under review" value={sum.pending} tone="orange" />
        <StatCard icon="upload_file" label="Needs action" value={sum.missing + sum.rejected} tone="red" />
      </div>
      {error && <p role="alert" className="mb-3 text-sm font-medium text-[#ba1a1a]">{error}</p>}

      <div className="space-y-3">
        {REQUIRED_DOCS.map(r => {
          const doc = sum.byType(r.type);
          const status = doc?.status ?? 'missing';
          return (
            <div key={r.type} className="bg-white rounded-2xl border border-[#becabc]/30 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold">{r.type}</h3>
                    <DocBadge status={status} />
                  </div>
                  <p className="text-xs text-[#6f7a6e] mt-0.5">{r.hint}</p>
                  {doc && (
                    <p className="text-xs text-[#3f493f] mt-1.5">
                      {doc.fileName} · {fmtSize(doc.fileSize)} · uploaded {fmtDate(doc.uploadedAt)}
                    </p>
                  )}
                  {doc?.status === 'rejected' && (
                    <p className="text-xs mt-1.5 p-2 rounded-lg bg-[#ffdad6] text-[#93000a]">
                      <b>Admin note:</b> {doc.reviewNote || 'Document was not accepted. Please upload a clearer / valid copy.'}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {doc && <button className={ghostBtn} onClick={() => setPreview(doc.id)}>View</button>}
                  <input
                    ref={el => { refs.current[r.type] = el; }}
                    type="file"
                    accept="application/pdf,image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={e => handleFile(r.type, e.target.files?.[0])}
                  />
                  {doc?.status !== 'verified' && (
                    <button className={primaryBtn} disabled={busy === r.type} onClick={() => refs.current[r.type]?.click()}>
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      {busy === r.type ? 'Uploading…' : doc ? 'Replace' : 'Upload'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-[#6f7a6e] mt-4">Accepted: PDF, PNG, JPG, WEBP · up to 8 MB. Demo note: files stay in your browser's local storage.</p>

      {previewDoc && (
        <Modal title={previewDoc.type} onClose={() => setPreview(null)} wide>
          <DocPreview doc={previewDoc} />
        </Modal>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Public profile                                                     */
/* ------------------------------------------------------------------ */
const Profile: React.FC<{ ngo: NGO; platform: Platform; onPreview: () => void }> = ({ ngo, platform, onPreview }) => {
  const [form, setForm] = useState({
    name: ngo.name,
    description: ngo.description,
    cause: ngo.cause,
    city: ngo.city,
    location: ngo.location,
    foundedYear: String(ngo.foundedYear),
    fcraNumber: ngo.fcraNumber,
    section80G: ngo.section80G,
    weeklyMilestone: ngo.weeklyMilestone.replace(/^"|"$/g, ''),
    avatar: ngo.avatar,
    heroImage: ngo.heroImage,
    activeVolunteers: String(ngo.activeVolunteers),
  });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof typeof form, v: string | boolean) => { setSaved(false); setForm(f => ({ ...f, [k]: v })); };

  const pickImage = async (k: 'avatar' | 'heroImage', file?: File) => {
    if (!file) return;
    try { set(k, await imageToDataUrl(file, k === 'avatar' ? 256 : 1000, 0.75)); }
    catch (e: any) { setErr(e?.message || 'Could not load image'); }
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 3) return setErr('Organisation name must be at least 3 characters.');
    if (form.description.trim().length < 20) return setErr('Please write a description of at least 20 characters.');
    setErr('');
    platform.updateNgo(ngo.id, {
      name: form.name.trim(),
      description: form.description.trim(),
      cause: form.cause,
      city: form.city,
      location: form.location.trim(),
      foundedYear: Number(form.foundedYear) || ngo.foundedYear,
      fcraNumber: form.fcraNumber.trim(),
      section80G: form.section80G,
      weeklyMilestone: form.weeklyMilestone.trim() ? `"${form.weeklyMilestone.trim()}"` : '',
      avatar: form.avatar,
      heroImage: form.heroImage,
      activeVolunteers: Number(form.activeVolunteers) || 0,
    });
    setSaved(true);
  };

  return (
    <>
      <PageHeader
        title="Public Profile"
        subtitle="This is what donors see on Explore NGOs, the map and your profile page."
        action={<button className={ghostBtn} onClick={onPreview}><span className="material-symbols-outlined text-[18px]">visibility</span>Preview public page</button>}
      />
      {!ngo.verified && (
        <p className="mb-4 text-xs p-3 rounded-xl bg-[#ffe9a8] text-[#6b4e00] font-medium">
          Your profile is saved but stays hidden from the public until the admin verifies your documents.
        </p>
      )}
      <form onSubmit={save} className="grid lg:grid-cols-3 gap-4">
        <Card title="Organisation details" className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Organisation name</label>
              <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>About your work</label>
              <textarea rows={4} className={inputCls} value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Primary cause</label>
              <select className={inputCls} value={form.cause} onChange={e => set('cause', e.target.value)}>
                {CAUSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>City</label>
              <select className={inputCls} value={form.city} onChange={e => set('city', e.target.value)}>
                {CITIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Area / locality</label>
              <input className={inputCls} value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Kothrud, Pune" />
            </div>
            <div>
              <label className={labelCls}>Founded in</label>
              <input className={inputCls} inputMode="numeric" value={form.foundedYear} onChange={e => set('foundedYear', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>FCRA number (optional)</label>
              <input className={inputCls} value={form.fcraNumber} onChange={e => set('fcraNumber', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Active volunteers</label>
              <input className={inputCls} inputMode="numeric" value={form.activeVolunteers} onChange={e => set('activeVolunteers', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>This week's milestone</label>
              <input className={inputCls} value={form.weeklyMilestone} onChange={e => set('weeklyMilestone', e.target.value)} placeholder="e.g. 120 students received learning kits" />
            </div>
            <label className="sm:col-span-2 flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#15803d]" checked={form.section80G} onChange={e => set('section80G', e.target.checked)} />
              Donations are eligible for Section 80G tax benefit
            </label>
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="Logo">
            <img src={form.avatar} alt="Logo" className="w-20 h-20 rounded-2xl object-cover bg-[#e6e9e5]" />
            <label className={`${ghostBtn} mt-3 w-full`}>
              Change logo
              <input type="file" accept="image/*" className="hidden" onChange={e => pickImage('avatar', e.target.files?.[0])} />
            </label>
          </Card>
          <Card title="Cover image">
            <img src={form.heroImage} alt="Cover" className="w-full h-28 rounded-xl object-cover bg-[#e6e9e5]" />
            <label className={`${ghostBtn} mt-3 w-full`}>
              Change cover
              <input type="file" accept="image/*" className="hidden" onChange={e => pickImage('heroImage', e.target.files?.[0])} />
            </label>
          </Card>
        </div>

        <div className="lg:col-span-3 flex flex-wrap items-center gap-3">
          <button type="submit" className={primaryBtn}>Save profile</button>
          {saved && <span className="text-sm font-semibold text-[#00652c] flex items-center gap-1"><span className="material-symbols-outlined text-[18px] fill-1">check_circle</span>Saved</span>}
          {err && <span role="alert" className="text-sm font-medium text-[#ba1a1a]">{err}</span>}
        </div>
      </form>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Impact stories (list)                                              */
/* ------------------------------------------------------------------ */
const Stories: React.FC<{ ngo: NGO; platform: Platform; seeded: typeof INITIAL_POSTS; go: (t: Tab) => void }> = ({ ngo, platform, seeded, go }) => {
  const mine = platform.stories.filter(s => s.ngoId === ngo.id);
  const [toDelete, setToDelete] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Impact Stories"
        subtitle="Stories you publish appear in the public Impact Feed."
        action={<button className={primaryBtn} onClick={() => go('create')}><span className="material-symbols-outlined text-[18px]">add</span>Create story</button>}
      />
      {!ngo.verified && (
        <p className="mb-4 text-xs p-3 rounded-xl bg-[#ffe9a8] text-[#6b4e00] font-medium">
          Stories are saved, but will only show in the public feed after your NGO is verified.
        </p>
      )}
      {mine.length + seeded.length === 0 ? (
        <Card><p className="text-sm text-[#3f493f] text-center py-8">No stories yet. Share your first impact story with supporters.</p></Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {mine.map(s => (
            <article key={s.id} className="bg-white rounded-2xl border border-[#becabc]/30 shadow-sm overflow-hidden flex flex-col">
              <img src={s.image} alt="" className="h-40 w-full object-cover bg-[#e6e9e5]" />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[11px] text-[#6f7a6e]">
                  <span>{s.cause} · {s.location}</span><span>{timeAgo(s.createdAt)}</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold mt-1">{s.title}</h3>
                <p className="text-sm text-[#3f493f] mt-1 line-clamp-3">{s.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#00652c]">{s.peopleHelped ? `${s.peopleHelped} people helped` : ' '}</span>
                  <button onClick={() => setToDelete(s.id)} className="text-xs font-semibold text-[#ba1a1a] hover:underline cursor-pointer">Delete</button>
                </div>
              </div>
            </article>
          ))}
          {seeded.map(p => (
            <article key={p.id} className="bg-white rounded-2xl border border-[#becabc]/30 shadow-sm overflow-hidden flex flex-col opacity-90">
              <img src={p.image} alt="" className="h-40 w-full object-cover bg-[#e6e9e5]" />
              <div className="p-4">
                <div className="flex items-center justify-between text-[11px] text-[#6f7a6e]"><span>{p.cause} · {p.location}</span><span>{p.timeAgo}</span></div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold mt-1">{p.headline}</h3>
                <p className="text-sm text-[#3f493f] mt-1 line-clamp-3">{p.content}</p>
                <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-[#6f7a6e] bg-[#e6e9e5] px-2 py-0.5 rounded-full">Published · audited</span>
              </div>
            </article>
          ))}
        </div>
      )}
      {toDelete && (
        <ConfirmDialog
          title="Delete this story?"
          message="It will be removed from your dashboard and from the public Impact Feed."
          confirmLabel="Delete story"
          onCancel={() => setToDelete(null)}
          onConfirm={() => { platform.deleteStory(toDelete); setToDelete(null); }}
        />
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Create story                                                       */
/* ------------------------------------------------------------------ */
const CreateStory: React.FC<{ ngo: NGO; platform: Platform; done: () => void }> = ({ ngo, platform, done }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState(ngo.location === 'Add your location' ? '' : ngo.location);
  const [people, setPeople] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [err, setErr] = useState('');

  const pick = async (file?: File) => {
    if (!file) return;
    try { setImage(await imageToDataUrl(file, 900, 0.72)); setErr(''); }
    catch (e: any) { setErr(e?.message || 'Could not load image'); }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 8) return setErr('Give your story a headline of at least 8 characters.');
    if (content.trim().length < 40) return setErr('Please write at least 40 characters so supporters understand the impact.');
    if (!location.trim()) return setErr('Add the location where this impact happened.');
    platform.addStory({
      ngoId: ngo.id,
      title: title.trim(),
      content: content.trim(),
      location: location.trim(),
      cause: ngo.causeLabel,
      image: image || ngo.heroImage,
      peopleHelped: Number(people) || 0,
      tags: tags.split(/[,\s]+/).filter(Boolean).map(t => (t.startsWith('#') ? t : `#${t}`)).slice(0, 6),
    });
    done();
  };

  return (
    <>
      <PageHeader title="Create Impact Story" subtitle="Show donors what their support achieved — with a photo, numbers and a short narrative." />
      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Headline</label>
              <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} maxLength={90} placeholder="e.g. 120 learning kits delivered in Govandi" />
            </div>
            <div>
              <label className={labelCls}>Story</label>
              <textarea rows={7} className={inputCls} value={content} onChange={e => setContent(e.target.value)} placeholder="What happened, who was helped, and how donations made it possible…" />
              <p className="text-[11px] text-[#6f7a6e] mt-1">{content.length} characters</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Location</label>
                <input className={inputCls} value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>People helped (optional)</label>
                <input className={inputCls} inputMode="numeric" value={people} onChange={e => setPeople(e.target.value.replace(/\D/g, ''))} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Hashtags (comma separated)</label>
                <input className={inputCls} value={tags} onChange={e => setTags(e.target.value)} placeholder="BackToSchool, Mumbai" />
              </div>
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card title="Cover photo">
            <div className="h-36 rounded-xl bg-[#e6e9e5] overflow-hidden flex items-center justify-center">
              {image ? <img src={image} alt="Story cover" className="w-full h-full object-cover" /> : <span className="text-xs text-[#6f7a6e]">Defaults to your cover image</span>}
            </div>
            <label className={`${ghostBtn} mt-3 w-full`}>
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>Upload photo
              <input type="file" accept="image/*" className="hidden" onChange={e => pick(e.target.files?.[0])} />
            </label>
          </Card>
          <Card>
            <p className="text-xs text-[#3f493f]">
              {ngo.verified
                ? 'Your NGO is verified — this story goes live in the Impact Feed immediately.'
                : 'Your NGO is not verified yet — the story will be saved and published once verification completes.'}
            </p>
          </Card>
        </div>
        <div className="lg:col-span-3 flex flex-wrap items-center gap-3">
          <button type="submit" className={primaryBtn}><span className="material-symbols-outlined text-[18px]">send</span>Publish story</button>
          <button type="button" className={ghostBtn} onClick={done}>Cancel</button>
          {err && <span role="alert" className="text-sm font-medium text-[#ba1a1a]">{err}</span>}
        </div>
      </form>
    </>
  );
};
