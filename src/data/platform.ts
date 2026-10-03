import { useCallback, useEffect, useState } from 'react';
import { INITIAL_NGOS, INITIAL_POSTS, ImpactPost, NGO } from './mockData';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type Role = 'donor' | 'ngo' | 'admin';

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string; // demo only – a real backend must store a salted hash
  role: Role;
  createdAt: number;
  ngoId?: string; // set for role === 'ngo'
}

export type DocStatus = 'pending' | 'verified' | 'rejected';

export interface NgoDoc {
  id: string;
  ngoId: string;
  type: string; // one of REQUIRED_DOCS
  fileName: string;
  fileSize: number;
  dataUrl?: string; // only kept for small files (localStorage quota)
  status: DocStatus;
  uploadedAt: number;
  reviewedAt?: number;
  reviewNote?: string;
}

export interface Story {
  id: string;
  ngoId: string;
  title: string;
  content: string;
  image: string;
  location: string;
  cause: string;
  tags: string[];
  peopleHelped: number;
  createdAt: number;
}

export interface PlatformState {
  accounts: Account[];
  ngos: NGO[];
  docs: NgoDoc[];
  stories: Story[];
}

export const REQUIRED_DOCS = [
  { type: 'Registration Certificate', hint: 'Trust deed / Society / Section 8 company registration' },
  { type: '12A / 80G Certificate', hint: 'Income-tax exemption & donor tax-benefit approval' },
  { type: 'PAN Card of NGO', hint: 'Permanent Account Number issued to the organisation' },
  { type: 'FCRA Certificate', hint: 'Only if you receive foreign contributions' },
  { type: 'Address Proof', hint: 'Utility bill or rent agreement of the registered office' },
] as const;

export const CAUSES: { value: NGO['cause']; label: string }[] = [
  { value: 'education', label: 'Education' },
  { value: 'animal welfare', label: 'Animal Welfare' },
  { value: 'environment', label: 'Environment' },
  { value: 'hunger relief', label: 'Hunger Relief' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'community development', label: 'Community Development' },
];

export const CITIES: { value: NGO['city']; label: string }[] = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'pune', label: 'Pune' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bengaluru', label: 'Bengaluru' },
];

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */
const DAY = 86400000;
const now = Date.now();

export const DEMO_LOGINS = {
  admin: { email: 'admin@kindredhub.org', password: 'Admin@123' },
  ngo: { email: 'ngo@helpinghands.org', password: 'Ngo@12345' },
  donor: { email: 'aditya@example.com', password: 'Donor@123' },
};

const PENDING_NGO: NGO = {
  id: 'sahyog-trust',
  name: 'Sahyog Community Trust',
  cause: 'community development',
  causeLabel: 'Community Development',
  location: 'Kothrud, Pune',
  city: 'pune',
  cityLabel: 'Pune',
  verified: false,
  avatar: INITIAL_NGOS[0].avatar,
  heroImage: INITIAL_NGOS[0].heroImage,
  liveActivity: 'Awaiting verification',
  description: 'Women-led self-help groups and micro-enterprise training for slum communities in Pune.',
  impactMetrics: { primaryNumber: '0', primaryLabel: 'Impacted', storiesCount: 0, extraNumber: '1', extraLabel: 'Centers' },
  gps: '18.5074° N, 73.8077° E',
  officerSigned: false,
  weeklyMilestone: '',
  fcraNumber: '',
  section80G: false,
  foundedYear: 2022,
  disbursedAmount: '₹0',
  activeVolunteers: 0,
};

function seedNgos(): NGO[] {
  return [...INITIAL_NGOS, PENDING_NGO];
}

function seedAccounts(): Account[] {
  const mk = (id: string, name: string, email: string, password: string, role: Role, daysAgo: number, ngoId?: string): Account => ({
    id, name, email, password, role, createdAt: now - daysAgo * DAY, ngoId,
  });
  return [
    mk('acc-admin', 'KindredHub Admin', DEMO_LOGINS.admin.email, DEMO_LOGINS.admin.password, 'admin', 120),
    mk('acc-ngo-hh', 'Helping Hands Foundation', DEMO_LOGINS.ngo.email, DEMO_LOGINS.ngo.password, 'ngo', 90, 'helping-hands'),
    mk('acc-ngo-pc', 'Paws & Care', 'team@pawsandcare.org', 'Paws@12345', 'ngo', 80, 'paws-and-care'),
    mk('acc-ngo-gr', 'Green Roots', 'hello@greenroots.org', 'Green@12345', 'ngo', 70, 'green-roots'),
    mk('acc-ngo-an', 'Annapurna Hunger Relief', 'ops@annapurna.org', 'Anna@12345', 'ngo', 60, 'annapurna-hunger-relief'),
    mk('acc-ngo-sw', 'Swasthya Care', 'care@swasthya.org', 'Swas@12345', 'ngo', 50, 'swasthya-care'),
    mk('acc-ngo-um', 'Umeed Skill Academy', 'info@umeedskills.org', 'Umeed@12345', 'ngo', 40, 'umeed-skill-academy'),
    mk('acc-ngo-sy', 'Sahyog Community Trust', 'contact@sahyogtrust.org', 'Sahyog@12345', 'ngo', 3, 'sahyog-trust'),
    mk('acc-d1', 'Aditya Kharat', DEMO_LOGINS.donor.email, DEMO_LOGINS.donor.password, 'donor', 45),
    mk('acc-d2', 'Priya Nair', 'priya.nair@example.com', 'Donor@123', 'donor', 30),
    mk('acc-d3', 'Rahul Deshmukh', 'rahul.d@example.com', 'Donor@123', 'donor', 18),
    mk('acc-d4', 'Meera Iyer', 'meera.iyer@example.com', 'Donor@123', 'donor', 9),
    mk('acc-d5', 'Sana Sheikh', 'sana.s@example.com', 'Donor@123', 'donor', 2),
  ];
}

function seedDocs(): NgoDoc[] {
  const docs: NgoDoc[] = [];
  const stamp = (ngoId: string, type: string, status: DocStatus, daysAgo: number): NgoDoc => ({
    id: `doc-${ngoId}-${type.replace(/\W+/g, '').toLowerCase()}`,
    ngoId,
    type,
    fileName: `${type.replace(/[^\w]+/g, '_')}.pdf`,
    fileSize: 180000 + Math.floor(Math.random() * 200000),
    status,
    uploadedAt: now - daysAgo * DAY,
    reviewedAt: status === 'pending' ? undefined : now - (daysAgo - 1) * DAY,
  });
  INITIAL_NGOS.forEach((n, i) =>
    REQUIRED_DOCS.forEach(d => docs.push(stamp(n.id, d.type, 'verified', 60 - i * 4))),
  );
  // Sahyog Trust: 3 uploaded and awaiting review, 2 not yet uploaded
  ['Registration Certificate', '12A / 80G Certificate', 'PAN Card of NGO'].forEach(t =>
    docs.push(stamp('sahyog-trust', t, 'pending', 2)),
  );
  return docs;
}

function seedStories(): Story[] {
  return [
    {
      id: 'story-seed-hh',
      ngoId: 'helping-hands',
      title: 'Evening study circles reopen in Dharavi',
      content:
        'After a two-month break for monsoon repairs, our evening study circles are back. 40 children joined on day one, using the new solar lamps donated last quarter.',
      image: INITIAL_NGOS[0].heroImage,
      location: 'Dharavi, Mumbai',
      cause: 'Education',
      tags: ['#StudyCircles', '#Dharavi'],
      peopleHelped: 40,
      createdAt: now - 6 * DAY,
    },
  ];
}

const seed = (): PlatformState => ({
  accounts: seedAccounts(),
  ngos: seedNgos(),
  docs: seedDocs(),
  stories: seedStories(),
});

/* ------------------------------------------------------------------ */
/*  Persistence                                                        */
/* ------------------------------------------------------------------ */
const KEY = 'kh_platform_v1';
const SESSION_KEY = 'kh_session_v1';

function load(): PlatformState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PlatformState;
      if (parsed.accounts && parsed.ngos && parsed.docs && parsed.stories) return parsed;
    }
  } catch { /* fall through */ }
  return seed();
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export const uid = (p: string) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  return `${Math.floor(s / 86400)} days ago`;
}

export const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Reads an image file and shrinks it so it fits comfortably in localStorage. */
export function imageToDataUrl(file: File, maxSide = 900, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Not a valid image'));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error('Could not read file'));
    r.onload = () => resolve(r.result as string);
    r.readAsDataURL(file);
  });
}

export function storyToPost(s: Story, ngo: NGO): ImpactPost {
  return {
    id: s.id,
    ngoId: ngo.id,
    ngoName: ngo.name,
    ngoAvatar: ngo.avatar,
    cause: s.cause,
    location: s.location,
    timeAgo: timeAgo(s.createdAt),
    headline: s.title,
    subheadline: `Cause: ${s.cause} • ${s.location}`,
    badgeText: 'Verified NGO Report',
    badgeType: 'geotag',
    image: s.image,
    gpsBadge: `Reported from ${s.location} • ${fmtDate(s.createdAt)}`,
    content: s.content,
    hashtags: s.tags,
    proofHash: `#0x${s.id.replace(/\W/g, '').slice(-6)}...${ngo.id.length}a`,
    likes: 0,
    commentsCount: 0,
    liked: false,
    comments: [],
  };
}

/** Document completeness for an NGO. */
export function docSummary(docs: NgoDoc[], ngoId: string) {
  const mine = docs.filter(d => d.ngoId === ngoId);
  const byType = (t: string) => mine.find(d => d.type === t);
  const total = REQUIRED_DOCS.length;
  const verified = REQUIRED_DOCS.filter(r => byType(r.type)?.status === 'verified').length;
  const pending = REQUIRED_DOCS.filter(r => byType(r.type)?.status === 'pending').length;
  const rejected = REQUIRED_DOCS.filter(r => byType(r.type)?.status === 'rejected').length;
  const missing = total - verified - pending - rejected;
  return { total, verified, pending, rejected, missing, byType };
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export type ActionResult = { ok: true } | { ok: false; error: string };
const fail = (error: string): ActionResult => ({ ok: false, error });

export function usePlatform() {
  const [state, setState] = useState<PlatformState>(load);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    try { return localStorage.getItem(SESSION_KEY); } catch { return null; }
  });
  const [storageWarning, setStorageWarning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true); // quota exceeded – app keeps working in memory
    }
  }, [state]);

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem(SESSION_KEY, sessionId);
      else localStorage.removeItem(SESSION_KEY);
    } catch { /* ignore */ }
  }, [sessionId]);

  const account = state.accounts.find(a => a.id === sessionId) || null;
  const myNgo = account?.ngoId ? state.ngos.find(n => n.id === account.ngoId) || null : null;

  /* ---- auth ---- */
  const login = useCallback((email: string, password: string): ActionResult & { account?: Account } => {
    const acc = state.accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!acc || acc.password !== password) return fail('Incorrect email or password.');
    setSessionId(acc.id);
    return { ok: true, account: acc };
  }, [state.accounts]);

  const logout = useCallback(() => setSessionId(null), []);

  const register = useCallback(
    (input: { role: 'donor' | 'ngo'; name: string; email: string; password: string }): ActionResult & { account?: Account } => {
      const email = input.email.trim().toLowerCase();
      if (state.accounts.some(a => a.email.toLowerCase() === email)) return fail('An account with this email already exists.');
      const id = uid('acc');
      let ngoId: string | undefined;
      let newNgo: NGO | null = null;
      if (input.role === 'ngo') {
        let slug = slugify(input.name) || 'ngo';
        if (state.ngos.some(n => n.id === slug)) slug = `${slug}-${Math.random().toString(36).slice(2, 5)}`;
        ngoId = slug;
        newNgo = {
          ...PENDING_NGO,
          id: slug,
          name: input.name.trim(),
          location: 'Add your location',
          description: 'Tell supporters what your organisation does.',
          liveActivity: 'Awaiting verification',
          foundedYear: new Date().getFullYear(),
        };
      }
      const acc: Account = { id, name: input.name.trim(), email, password: input.password, role: input.role, createdAt: Date.now(), ngoId };
      setState(s => ({ ...s, accounts: [...s.accounts, acc], ngos: newNgo ? [...s.ngos, newNgo] : s.ngos }));
      setSessionId(id);
      return { ok: true, account: acc };
    },
    [state.accounts, state.ngos],
  );

  /* ---- NGO actions ---- */
  const updateNgo = useCallback((ngoId: string, patch: Partial<NGO>) => {
    setState(s => ({
      ...s,
      ngos: s.ngos.map(n => {
        if (n.id !== ngoId) return n;
        const merged = { ...n, ...patch };
        if (patch.cause) merged.causeLabel = CAUSES.find(c => c.value === patch.cause)?.label || merged.causeLabel;
        if (patch.city) merged.cityLabel = CITIES.find(c => c.value === patch.city)?.label || merged.cityLabel;
        return merged;
      }),
    }));
  }, []);

  const uploadDoc = useCallback((ngoId: string, type: string, file: File, dataUrl?: string) => {
    const doc: NgoDoc = {
      id: uid('doc'),
      ngoId,
      type,
      fileName: file.name,
      fileSize: file.size,
      dataUrl,
      status: 'pending',
      uploadedAt: Date.now(),
    };
    // re-uploading replaces the previous file for that type and resets review
    setState(s => ({ ...s, docs: [...s.docs.filter(d => !(d.ngoId === ngoId && d.type === type)), doc] }));
  }, []);

  const removeDoc = useCallback((docId: string) => {
    setState(s => ({ ...s, docs: s.docs.filter(d => d.id !== docId) }));
  }, []);

  const addStory = useCallback((story: Omit<Story, 'id' | 'createdAt'>) => {
    setState(s => ({ ...s, stories: [{ ...story, id: uid('story'), createdAt: Date.now() }, ...s.stories] }));
  }, []);

  const deleteStory = useCallback((id: string) => {
    setState(s => ({ ...s, stories: s.stories.filter(x => x.id !== id) }));
  }, []);

  /* ---- admin actions ---- */
  const reviewDoc = useCallback((docId: string, status: 'verified' | 'rejected' | 'pending', note?: string) => {
    setState(s => {
      const docs = s.docs.map(d =>
        d.id === docId ? { ...d, status, reviewedAt: status === 'pending' ? undefined : Date.now(), reviewNote: note } : d,
      );
      // A rejected / reset document revokes an NGO's verified badge automatically.
      const target = s.docs.find(d => d.id === docId);
      const ngos = target && status !== 'verified'
        ? s.ngos.map(n => (n.id === target.ngoId ? { ...n, verified: false } : n))
        : s.ngos;
      return { ...s, docs, ngos };
    });
  }, []);

  const setNgoVerified = useCallback((ngoId: string, verified: boolean): ActionResult => {
    if (verified) {
      const sum = docSummary(state.docs, ngoId);
      if (sum.verified < sum.total) return fail('Verify all required documents before marking the NGO as verified.');
    }
    setState(s => ({
      ...s,
      ngos: s.ngos.map(n => (n.id === ngoId ? { ...n, verified, officerSigned: verified } : n)),
    }));
    return { ok: true };
  }, [state.docs]);

  const removeDonor = useCallback((accountId: string) => {
    setState(s => ({ ...s, accounts: s.accounts.filter(a => !(a.id === accountId && a.role === 'donor')) }));
  }, []);

  const removeNgo = useCallback((ngoId: string) => {
    setState(s => ({
      ...s,
      ngos: s.ngos.filter(n => n.id !== ngoId),
      accounts: s.accounts.filter(a => a.ngoId !== ngoId),
      docs: s.docs.filter(d => d.ngoId !== ngoId),
      stories: s.stories.filter(x => x.ngoId !== ngoId),
    }));
  }, []);

  /* ---- derived public data ---- */
  const publicNgos = state.ngos.filter(n => n.verified);
  const publicPosts: ImpactPost[] = [
    ...state.stories
      .map(s => {
        const ngo = publicNgos.find(n => n.id === s.ngoId);
        return ngo ? storyToPost(s, ngo) : null;
      })
      .filter((p): p is ImpactPost => !!p),
    ...INITIAL_POSTS.filter(p => publicNgos.some(n => n.id === p.ngoId)),
  ];

  return {
    ...state,
    account,
    myNgo,
    publicNgos,
    publicPosts,
    storageWarning,
    login,
    logout,
    register,
    updateNgo,
    uploadDoc,
    removeDoc,
    addStory,
    deleteStory,
    reviewDoc,
    setNgoVerified,
    removeDonor,
    removeNgo,
  };
}

export type Platform = ReturnType<typeof usePlatform>;
