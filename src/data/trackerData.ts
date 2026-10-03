import { Certificate, NGO } from './mockData';

/* ---------- Donation Impact Tracker ---------- */
// Demo speed: a new donation advances one stage every 8 seconds (in real life: days).
export const STEP_MS = 8000;
const DAY_MS = 86400000;

export interface TrackedDonation {
  id: string;
  certId: string;
  ngoId: string;
  ngoName: string;
  cause: string;
  amount: number;
  item: string;
  createdAt: number;
  stepMs: number;
  units: number;
  unitLabel: string;
  people: number;
  gps: string;
  officer: string;
  vendor: string;
  invoice: string;
  hash: string;
}

const UNITS: Record<NGO['cause'], { label: string; cost: number; people: number; vendor: string }> = {
  'education': { label: 'learning kits', cost: 1200, people: 1, vendor: 'EduSupply Mumbai' },
  'animal welfare': { label: 'vaccinations', cost: 400, people: 1, vendor: 'VetCare Pharma' },
  'environment': { label: 'saplings', cost: 180, people: 0.2, vendor: 'City Nursery Co-op' },
  'hunger relief': { label: 'meals', cost: 50, people: 1, vendor: 'Local Kitchen Partners' },
  'healthcare': { label: 'health check-ups', cost: 300, people: 1, vendor: 'MediLab Services' },
  'community development': { label: 'skill-training seats', cost: 1500, people: 1, vendor: 'SkillWorks Trainers' }
};

export const parseAmount = (s: string) => Number(s.replace(/[^0-9]/g, '')) || 0;

export function donationFromCert(c: Certificate, ngos: NGO[], createdAt: number, stepMs = STEP_MS): TrackedDonation {
  const n = ngos.find(x => x.name === c.ngoName) || ngos[0];
  const u = UNITS[n.cause];
  const amount = parseAmount(c.amount);
  const units = Math.max(1, Math.floor(amount / u.cost));
  return {
    id: `don-${c.id}`,
    certId: c.id,
    ngoId: n.id,
    ngoName: n.name,
    cause: n.causeLabel,
    amount,
    item: c.itemDescription,
    createdAt,
    stepMs,
    units,
    unitLabel: u.label,
    people: Math.max(1, Math.round(units * u.people)),
    gps: n.gps,
    officer: c.auditorName.split(' (')[0].split(' & ')[0],
    vendor: u.vendor,
    invoice: `INV-${c.hash.replace('0x', '').slice(0, 6).toUpperCase()}`,
    hash: c.hash
  };
}

export const stageOf = (d: TrackedDonation, now: number) =>
  Math.min(4, Math.max(0, Math.floor((now - d.createdAt) / d.stepMs)));

export function seedDonations(ngos: NGO[], certs: Certificate[]): TrackedDonation[] {
  const old = certs.map(c => {
    const t = Date.parse(c.timestamp.replace(' IST', '').replace(' ', 'T') + '+05:30');
    return donationFromCert(c, ngos, Number.isNaN(t) ? Date.now() - 30 * DAY_MS : t, DAY_MS);
  });
  const live: Certificate = {
    id: 'cert-live-demo',
    hash: '0x5ad3e7c19b02f4a6',
    ngoName: 'Annapurna Hunger Relief',
    donorName: 'Aditya Kharat',
    cause: 'Hunger Relief',
    itemDescription: '50 hot nutritious meals for daily-wage families',
    amount: '₹2,500',
    timestamp: '',
    gpsCoordinates: '',
    status: 'Verified on Public Ledger',
    auditorName: 'Sunita R. (Field Officer ID #3175)',
    blockNumber: '#8950-A'
  };
  return [donationFromCert(live, ngos, Date.now() - 3000), ...old];
}

/* ---------- Volunteer Certificate System ---------- */
export interface Activity {
  id: string;
  ngoName: string;
  title: string;
  when: string;
  place: string;
  hours: number;
  skills: string[];
  spots: number;
  code: string;
  signatory: string;
  role: string;
}

export const ACTIVITIES: Activity[] = [
  { id: 'act-1', ngoName: 'Helping Hands Foundation', title: 'Weekend STEM mentoring session', when: 'Sat, 18 Oct · 10:00 am', place: 'Govandi Hub, Mumbai', hours: 4, skills: ['Teaching', 'Maths', 'Patience'], spots: 12, code: 'HH-4821', signatory: 'Meera Nair', role: 'Programme Director' },
  { id: 'act-2', ngoName: 'Green Roots Initiative', title: 'Mithi riverbank sapling drive', when: 'Sun, 19 Oct · 7:00 am', place: 'Zone 4B, Mithi River', hours: 5, skills: ['Outdoor work', 'Teamwork'], spots: 30, code: 'GR-1907', signatory: 'Dr. Mehra', role: 'Field Ecologist' },
  { id: 'act-3', ngoName: 'Annapurna Hunger Relief', title: 'Community kitchen meal packing', when: 'Sat, 25 Oct · 6:00 pm', place: 'Kurla Kitchen, Mumbai', hours: 3, skills: ['Cooking', 'Packing'], spots: 20, code: 'AH-3302', signatory: 'Sunita Rao', role: 'Kitchen Coordinator' },
  { id: 'act-4', ngoName: 'Paws & Care', title: 'Street animal vaccination camp', when: 'Sun, 26 Oct · 9:00 am', place: 'Kothrud, Pune', hours: 4, skills: ['Animal handling', 'First aid'], spots: 8, code: 'PC-7750', signatory: 'Dr. Kulkarni', role: 'Lead Veterinarian' },
  { id: 'act-5', ngoName: 'Swasthya Care Collective', title: 'Free health camp registration desk', when: 'Sat, 1 Nov · 8:30 am', place: 'Jamia Nagar, Delhi', hours: 6, skills: ['Data entry', 'Hindi/English'], spots: 10, code: 'SC-2468', signatory: 'Dr. Ansari', role: 'Medical Officer' },
  { id: 'act-6', ngoName: 'Umeed Skill Academy', title: 'Resume and interview coaching', when: 'Sun, 2 Nov · 11:00 am', place: 'Koramangala, Bengaluru', hours: 3, skills: ['HR', 'Communication'], spots: 15, code: 'UA-9013', signatory: 'Kavya Reddy', role: 'Placement Head' }
];

export interface VolRecord { activityId: string; status: 'registered' | 'completed'; at: number; certId?: string }
export interface VolCert {
  id: string; hash: string; volunteer: string; ngoName: string; title: string;
  hours: number; date: string; signatory: string; role: string; place: string;
}

const xml = (s: string) => s.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c] as string));

export function certSvg(c: VolCert): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700" font-family="Georgia, serif">
<rect width="1000" height="700" fill="#f7faf6"/><rect x="24" y="24" width="952" height="652" fill="none" stroke="#15803d" stroke-width="6"/><rect x="40" y="40" width="920" height="620" fill="none" stroke="#95f8a7" stroke-width="2"/>
<text x="500" y="120" text-anchor="middle" font-size="22" fill="#00652c" letter-spacing="6">KINDREDHUB · VERIFIED VOLUNTEER</text>
<text x="500" y="195" text-anchor="middle" font-size="52" font-weight="bold" fill="#181c1a">Certificate of Service</text>
<text x="500" y="260" text-anchor="middle" font-size="22" fill="#3f493f">This certifies that</text>
<text x="500" y="330" text-anchor="middle" font-size="46" font-style="italic" fill="#00652c">${xml(c.volunteer)}</text>
<text x="500" y="385" text-anchor="middle" font-size="22" fill="#3f493f">volunteered ${c.hours} verified hours with ${xml(c.ngoName)}</text>
<text x="500" y="430" text-anchor="middle" font-size="26" font-weight="bold" fill="#181c1a">${xml(c.title)}</text>
<text x="500" y="470" text-anchor="middle" font-size="18" fill="#6f7a6e">${xml(c.place)} · ${xml(c.date)}</text>
<line x1="150" y1="570" x2="400" y2="570" stroke="#181c1a"/><text x="275" y="598" text-anchor="middle" font-size="18" fill="#181c1a">${xml(c.signatory)}</text><text x="275" y="620" text-anchor="middle" font-size="14" fill="#6f7a6e">${xml(c.role)}, ${xml(c.ngoName)}</text>
<circle cx="760" cy="565" r="52" fill="#95f8a7" stroke="#15803d" stroke-width="4"/><text x="760" y="572" text-anchor="middle" font-size="40" fill="#00652c">✓</text>
<text x="500" y="662" text-anchor="middle" font-size="13" fill="#6f7a6e" font-family="monospace">ID ${xml(c.id)} · ${xml(c.hash)}</text></svg>`;
}
