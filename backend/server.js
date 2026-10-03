import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = Number(process.env.PORT || 5000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "platform.json");

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const defaultData = {
  accounts: [
    {
      id: "acc-admin",
      name: "KindredHub Admin",
      email: "admin@kindredhub.org",
      password: "Admin@123",
      role: "admin",
      createdAt: Date.now() - 120 * 86400000,
    },
    {
      id: "acc-ngo-hh",
      name: "Helping Hands Foundation",
      email: "ngo@helpinghands.org",
      password: "Ngo@12345",
      role: "ngo",
      ngoId: "helping-hands",
      createdAt: Date.now() - 90 * 86400000,
    },
    {
      id: "acc-d1",
      name: "Aditya Kharat",
      email: "aditya@example.com",
      password: "Donor@123",
      role: "donor",
      createdAt: Date.now() - 45 * 86400000,
    },
  ],
  ngos: [
    {
      id: "helping-hands",
      name: "Helping Hands Foundation",
      cause: "education",
      causeLabel: "Education",
      location: "Dharavi, Mumbai",
      city: "mumbai",
      cityLabel: "Mumbai",
      verified: true,
      avatar:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80",
      heroImage:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      liveActivity: "Active Field Session in Dharavi",
      description:
        "Empowering underserved children through digital literacy, learning kits, and mentor-led study groups.",
      impactMetrics: {
        primaryNumber: "1.2K+",
        primaryLabel: "Impacted",
        storiesCount: 24,
        extraNumber: "8",
        extraLabel: "Centers",
      },
      gps: "19.0402° N, 72.8567° E",
      officerSigned: true,
      weeklyMilestone:
        "120 students impacted this week in the local learning center.",
      distanceKm: 4,
      fcraNumber: "FCRA-083720198",
      section80G: true,
      foundedYear: 2018,
      disbursedAmount: "₹6,40,000",
      activeVolunteers: 64,
    },
    {
      id: "paws-and-care",
      name: "Paws & Care",
      cause: "animal welfare",
      causeLabel: "Animal Welfare",
      location: "Baner & Wakad, Pune",
      city: "pune",
      cityLabel: "Pune",
      verified: true,
      avatar:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
      heroImage:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
      liveActivity: "Mobile Ambulance on Duty",
      description:
        "Operating mobile veterinary clinics and providing 24/7 rescue and rehabilitation for stray animals.",
      impactMetrics: {
        primaryNumber: "850+",
        primaryLabel: "Rescued",
        storiesCount: 18,
        extraNumber: "4",
        extraLabel: "Shelters",
      },
      gps: "18.5204° N, 73.8567° E",
      officerSigned: true,
      weeklyMilestone:
        "85 rescued strays received clinical care, deworming, and bedding.",
      distanceKm: 148,
      fcraNumber: "FCRA-092471822",
      section80G: true,
      foundedYear: 2019,
      disbursedAmount: "₹4,12,000",
      activeVolunteers: 42,
    },
    {
      id: "sahyog-trust",
      name: "Sahyog Community Trust",
      cause: "community development",
      causeLabel: "Community Development",
      location: "Kothrud, Pune",
      city: "pune",
      cityLabel: "Pune",
      verified: false,
      avatar:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
      heroImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      liveActivity: "Awaiting verification",
      description:
        "Women-led self-help groups and micro-enterprise training for slum communities in Pune.",
      impactMetrics: {
        primaryNumber: "0",
        primaryLabel: "Impacted",
        storiesCount: 0,
        extraNumber: "1",
        extraLabel: "Centers",
      },
      gps: "18.5074° N, 73.8077° E",
      officerSigned: false,
      weeklyMilestone: "",
      fcraNumber: "",
      section80G: false,
      foundedYear: 2022,
      disbursedAmount: "₹0",
      activeVolunteers: 0,
    },
  ],
  posts: [
    {
      id: "story-seed-hh",
      ngoId: "helping-hands",
      ngoName: "Helping Hands Foundation",
      ngoAvatar:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80",
      cause: "Education",
      location: "Dharavi, Mumbai",
      timeAgo: "6 days ago",
      headline: "Evening study circles reopen in Dharavi",
      subheadline:
        "After a two-month break for monsoon repairs, our evening study circles are back.",
      badgeText: "Verified",
      badgeType: "auditor",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      gpsBadge: "19.0402° N, 72.8567° E",
      content:
        "40 children joined on day one, using the new solar lamps donated last quarter.",
      hashtags: ["#StudyCircles", "#Dharavi"],
      proofHash: "0x8d4f7a1c",
      likes: 168,
      commentsCount: 12,
      comments: [{ author: "Priya", text: "Amazing work!", timeAgo: "2h ago" }],
    },
  ],
  certificates: [
    {
      id: "cert-001",
      hash: "0x8e41f9bd",
      ngoName: "Helping Hands Foundation",
      donorName: "Aditya Kharat",
      cause: "Education",
      itemDescription: "Digital learning kits for 40 students",
      amount: "₹4,500",
      timestamp: new Date().toISOString(),
      gpsCoordinates: "19.0402° N, 72.8567° E",
      status: "Verified on Public Ledger",
      auditorName: "Ananya Kulkarni",
      blockNumber: "#238901",
    },
  ],
  donations: [
    {
      id: "don-001",
      ngoId: "helping-hands",
      ngoName: "Helping Hands Foundation",
      donorName: "Aditya Kharat",
      amount: 4500,
      currency: "INR",
      note: "Digital learning kits",
      cause: "Education",
      status: "Verified on Public Ledger",
      createdAt: Date.now() - 2 * 86400000,
    },
  ],
  docs: [
    {
      id: "doc-helping-hands-registration-certificate",
      ngoId: "helping-hands",
      type: "Registration Certificate",
      fileName: "registration_certificate.pdf",
      fileSize: 180000,
      status: "verified",
      uploadedAt: Date.now() - 30 * 86400000,
      reviewedAt: Date.now() - 20 * 86400000,
      reviewNote: "Approved",
    },
    {
      id: "doc-sahyog-trust-registration-certificate",
      ngoId: "sahyog-trust",
      type: "Registration Certificate",
      fileName: "registration_certificate.pdf",
      fileSize: 170000,
      status: "pending",
      uploadedAt: Date.now() - 3 * 86400000,
    },
  ],
};

const publicAccount = (account) => ({
  id: account.id,
  name: account.name,
  email: account.email,
  role: account.role,
  createdAt: account.createdAt,
  ngoId: account.ngoId,
});

const readData = () => {
  ensureDataDir();

  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
      return structuredClone(defaultData);
    }

    const raw = fs.readFileSync(dbPath, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && parsed.ngos ? parsed : structuredClone(defaultData);
  } catch (error) {
    return structuredClone(defaultData);
  }
};

let store = readData();

const writeData = () => {
  ensureDataDir();
  fs.writeFileSync(dbPath, JSON.stringify(store, null, 2));
};

app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "KindredHub backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/ngos", (req, res) => {
  res.json(store.ngos);
});

app.get("/api/posts", (req, res) => {
  res.json(store.posts);
});

app.get("/api/certificates", (req, res) => {
  res.json(store.certificates);
});

app.get("/api/donations", (req, res) => {
  res.json(store.donations);
});

app.get("/api/docs", (req, res) => {
  res.json(store.docs);
});

app.post("/api/stories", (req, res) => {
  const { ngoId, title, content, image, location, cause, tags, peopleHelped } =
    req.body || {};

  if (!ngoId || !title || !content) {
    return res
      .status(400)
      .json({ ok: false, error: "ngoId, title, and content are required." });
  }

  const ngo = store.ngos.find((item) => item.id === ngoId);
  const story = {
    id: `story-${Date.now().toString(36)}`,
    ngoId,
    title: String(title),
    content: String(content),
    image: image || ngo?.heroImage || "",
    location: location || ngo?.location || "",
    cause: cause || ngo?.causeLabel || "General",
    tags: Array.isArray(tags) ? tags : [],
    peopleHelped: Number(peopleHelped) || 0,
    createdAt: Date.now(),
  };

  store.stories.unshift(story);
  const post = {
    id: story.id,
    ngoId: story.ngoId,
    ngoName: ngo?.name || "Verified NGO",
    ngoAvatar: ngo?.avatar || "",
    cause: story.cause,
    location: story.location,
    timeAgo: "just now",
    headline: story.title,
    subheadline: story.content,
    badgeText: "Verified NGO Report",
    badgeType: "geotag",
    image: story.image,
    gpsBadge: story.location
      ? `Reported from ${story.location}`
      : "Community impact update",
    content: story.content,
    hashtags: story.tags,
    proofHash: `#0x${story.id.slice(-6)}`,
    likes: 0,
    commentsCount: 0,
    comments: [],
  };
  store.posts.unshift(post);
  writeData();

  return res.status(201).json({ ok: true, story });
});

app.post("/api/docs", (req, res) => {
  const {
    ngoId,
    type,
    fileName,
    fileSize,
    dataUrl,
    status = "pending",
  } = req.body || {};

  if (!ngoId || !type) {
    return res
      .status(400)
      .json({ ok: false, error: "ngoId and type are required." });
  }

  const existing = store.docs.find(
    (doc) => doc.ngoId === ngoId && doc.type === type,
  );
  const doc = {
    id: existing?.id || `doc-${Date.now().toString(36)}`,
    ngoId,
    type: String(type),
    fileName: fileName || `${String(type).replace(/\W+/g, "_")}.pdf`,
    fileSize: Number(fileSize) || 0,
    dataUrl,
    status:
      status === "verified" || status === "rejected" || status === "pending"
        ? status
        : "pending",
    uploadedAt: Date.now(),
  };

  if (existing) {
    Object.assign(existing, doc);
  } else {
    store.docs.push(doc);
  }
  writeData();

  return res.status(201).json({ ok: true, doc });
});

app.put("/api/docs/:docId/status", (req, res) => {
  const { docId } = req.params;
  const { status, note } = req.body || {};
  const doc = store.docs.find((item) => item.id === docId);

  if (!doc) {
    return res.status(404).json({ ok: false, error: "Document not found." });
  }

  if (status && ["verified", "rejected", "pending"].includes(status)) {
    doc.status = status;
  }
  doc.reviewedAt = Date.now();
  doc.reviewNote = note || doc.reviewNote;
  if (doc.status !== "verified") {
    const ngo = store.ngos.find((item) => item.id === doc.ngoId);
    if (ngo) ngo.verified = false;
  }
  writeData();

  return res.json({ ok: true, doc });
});

app.delete("/api/docs/:docId", (req, res) => {
  const { docId } = req.params;
  const before = store.docs.length;
  store.docs = store.docs.filter((doc) => doc.id !== docId);
  writeData();
  return res.json({ ok: true, removed: before !== store.docs.length });
});

app.put("/api/ngos/:ngoId", (req, res) => {
  const ngo = store.ngos.find((item) => item.id === req.params.ngoId);
  if (!ngo) {
    return res.status(404).json({ ok: false, error: "NGO not found." });
  }

  Object.assign(ngo, req.body || {});
  if (req.body?.cause) ngo.causeLabel = req.body.cause;
  if (req.body?.city) ngo.cityLabel = req.body.city;
  writeData();
  return res.json({ ok: true, ngo });
});

app.put("/api/ngos/:ngoId/verify", (req, res) => {
  const { verified = true } = req.body || {};
  const ngo = store.ngos.find((item) => item.id === req.params.ngoId);
  if (!ngo) {
    return res.status(404).json({ ok: false, error: "NGO not found." });
  }

  ngo.verified = Boolean(verified);
  ngo.officerSigned = Boolean(verified);
  writeData();
  return res.json({ ok: true, ngo });
});

app.delete("/api/ngos/:ngoId", (req, res) => {
  const ngoId = req.params.ngoId;
  const before = store.ngos.length;
  store.ngos = store.ngos.filter((ngo) => ngo.id !== ngoId);
  store.accounts = store.accounts.filter((account) => account.ngoId !== ngoId);
  store.docs = store.docs.filter((doc) => doc.ngoId !== ngoId);
  store.stories = store.stories.filter((story) => story.ngoId !== ngoId);
  store.posts = store.posts.filter((post) => post.ngoId !== ngoId);
  writeData();
  return res.json({ ok: true, removed: before !== store.ngos.length });
});

app.delete("/api/stories/:storyId", (req, res) => {
  const before = store.stories.length;
  store.stories = store.stories.filter(
    (story) => story.id !== req.params.storyId,
  );
  store.posts = store.posts.filter((post) => post.id !== req.params.storyId);
  writeData();
  return res.json({ ok: true, removed: before !== store.stories.length });
});

app.delete("/api/accounts/:accountId", (req, res) => {
  const before = store.accounts.length;
  store.accounts = store.accounts.filter(
    (account) => account.id !== req.params.accountId,
  );
  writeData();
  return res.json({ ok: true, removed: before !== store.accounts.length });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ ok: false, error: "Email and password are required." });
  }

  const account = store.accounts.find(
    (item) =>
      item.email.toLowerCase() === String(email).toLowerCase() &&
      item.password === String(password),
  );

  if (!account) {
    return res
      .status(401)
      .json({ ok: false, error: "Invalid email or password." });
  }

  return res.json({ ok: true, account: publicAccount(account) });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role = "donor" } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ ok: false, error: "Name, email, and password are required." });
  }

  const exists = store.accounts.some(
    (item) => item.email.toLowerCase() === String(email).toLowerCase(),
  );
  if (exists) {
    return res
      .status(409)
      .json({ ok: false, error: "An account with this email already exists." });
  }

  const account = {
    id: `acc-${Date.now().toString(36)}`,
    name: String(name),
    email: String(email).toLowerCase(),
    password: String(password),
    role: role === "ngo" ? "ngo" : "donor",
    createdAt: Date.now(),
    ngoId: role === "ngo" ? `ngo-${Date.now().toString(36)}` : undefined,
  };

  store.accounts.push(account);
  writeData();

  return res.status(201).json({ ok: true, account: publicAccount(account) });
});

app.get("/api/admin/overview", (req, res) => {
  const totalDonation = store.donations.reduce(
    (sum, donation) => sum + Number(donation.amount || 0),
    0,
  );
  const donorCount = new Set(
    store.donations.map((donation) => donation.donorName),
  ).size;
  const pendingNgoCount = store.ngos.filter((ngo) => !ngo.verified).length;

  res.json({
    ok: true,
    summary: {
      totalDonation,
      donorCount,
      pendingNgoCount,
      activeNgoCount: store.ngos.filter((ngo) => ngo.verified).length,
      totalStories: store.posts.length,
    },
  });
});

app.get("/api/ngo/:ngoId", (req, res) => {
  const ngo = store.ngos.find((item) => item.id === req.params.ngoId);
  if (!ngo) {
    return res.status(404).json({ ok: false, error: "NGO not found." });
  }

  const ngoDonations = store.donations.filter(
    (donation) => donation.ngoId === ngo.id,
  );
  const ngoStats = {
    ngo,
    totalRaised: ngoDonations.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    ),
    donationCount: ngoDonations.length,
    recentDonations: ngoDonations.slice(-5),
  };

  return res.json({ ok: true, data: ngoStats });
});

app.post("/api/donations", (req, res) => {
  const { ngoId, donorName, amount, cause, note } = req.body || {};

  if (!ngoId || !donorName || !amount) {
    return res
      .status(400)
      .json({ ok: false, error: "ngoId, donorName, and amount are required." });
  }

  const ngo = store.ngos.find((item) => item.id === ngoId);
  if (!ngo) {
    return res.status(404).json({ ok: false, error: "NGO not found." });
  }

  const donation = {
    id: `don-${Date.now().toString(36)}`,
    ngoId,
    ngoName: ngo.name,
    donorName: String(donorName),
    amount: Number(amount),
    currency: "INR",
    note: note || "General support",
    cause: cause || ngo.causeLabel,
    status: "Verified on Public Ledger",
    createdAt: Date.now(),
  };

  const certificate = {
    id: `cert-${Date.now().toString(36)}`,
    hash: `0x${Math.random().toString(16).slice(2, 10)}`,
    ngoName: ngo.name,
    donorName: String(donorName),
    cause: cause || ngo.causeLabel,
    itemDescription: note || "General support",
    amount: `₹${Number(amount).toLocaleString("en-IN")}`,
    timestamp: new Date().toISOString(),
    gpsCoordinates: ngo.gps,
    status: "Verified on Public Ledger",
    auditorName: "KindredHub Audit Team",
    blockNumber: `#${Math.floor(Math.random() * 900000 + 100000)}`,
  };

  store.donations.unshift(donation);
  store.certificates.unshift(certificate);
  writeData();

  return res.status(201).json({ ok: true, donation, certificate });
});

app.get("/api/health-check", (req, res) => {
  res.json({ ok: true, status: "alive" });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`KindredHub backend listening on http://localhost:${PORT}`);
});
