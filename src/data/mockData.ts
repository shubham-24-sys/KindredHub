export interface NGO {
  id: string;
  name: string;
  cause: 'education' | 'animal welfare' | 'environment' | 'hunger relief' | 'healthcare' | 'community development';
  causeLabel: string;
  location: string;
  city: 'mumbai' | 'pune' | 'delhi' | 'bengaluru';
  cityLabel: string;
  verified: boolean;
  avatar: string;
  heroImage: string;
  liveActivity: string;
  description: string;
  impactMetrics: {
    primaryNumber: string;
    primaryLabel: string;
    storiesCount: number;
    extraNumber: string;
    extraLabel: string;
  };
  gps: string;
  officerSigned: boolean;
  weeklyMilestone: string;
  distanceKm?: number;
  fcraNumber: string;
  section80G: boolean;
  foundedYear: number;
  disbursedAmount: string;
  activeVolunteers: number;
}

export interface ImpactPost {
  id: string;
  ngoId: string;
  ngoName: string;
  ngoAvatar: string;
  cause: string;
  location: string;
  timeAgo: string;
  headline: string;
  subheadline: string;
  badgeText: string;
  badgeType: 'auditor' | 'clinical' | 'geotag';
  image: string;
  gpsBadge: string;
  content: string;
  hashtags: string[];
  unitCostInfo?: {
    cost: string;
    receiptId: string;
  };
  proofHash: string;
  likes: number;
  commentsCount: number;
  liked?: boolean;
  comments: {
    author: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface Certificate {
  id: string;
  hash: string;
  ngoName: string;
  donorName: string;
  cause: string;
  itemDescription: string;
  amount: string;
  timestamp: string;
  gpsCoordinates: string;
  status: 'Verified on Public Ledger' | 'Audited Field Signoff';
  auditorName: string;
  blockNumber: string;
}

export const INITIAL_NGOS: NGO[] = [
  {
    id: 'helping-hands',
    name: 'Helping Hands Foundation',
    cause: 'education',
    causeLabel: 'Education',
    location: 'Dharavi, Mumbai',
    city: 'mumbai',
    cityLabel: 'Mumbai',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArvBL9SlT5V1PViTTkeziRmaO8oUPACXNQfpe-VlCyESPoVrGMgS8hSW_H2THyU5uwSM_sMenm7EpsgkOS1aPvxk06coelAOcxW6EVsyJRwo4-plKIGF6EFZEiTrZlcYBxVw6HkiRVYy1yhBbcw8k1wXzNZou4bD7xOVZUdeuvVSOk0os-754siH6rkk3-xeIjrKtBpb3I388aST73PQJgeIyKHXp-bODSIfpNmG0PVyVJrSrv_bku',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoPuykFH9ZEAwdN3hKdkzMCpOlfD19-9CBa8xKM3C5FoNg6_-EUVhVERHV1v0RCwADPkX8boncGDGKEtevRW29WVFcyhpPfkekLELgzAMjPRQa4ZExWNx2nkVnn9qrOWhbkIw2EciMWOCY0xbkcK17qlZNxWLngI4Y-6slNo2hE0eOE3Nl-fTo8VuXWFP-2m-6lPF_MqRv-JvwU_AEj7KHfQNuVRw3Mq-S_u46lZmJi33kC_-a12fJ',
    liveActivity: 'Active Field Session in Dharavi',
    description: 'Empowering underserved children through digital literacy, learning kits, and mentor-led study groups.',
    impactMetrics: {
      primaryNumber: '1.2K+',
      primaryLabel: 'Impacted',
      storiesCount: 24,
      extraNumber: '8',
      extraLabel: 'Centers'
    },
    gps: '19.0402° N, 72.8567° E',
    officerSigned: true,
    weeklyMilestone: '"120 students impacted this week in local learning center with digital tablets & STEM toolkits."',
    distanceKm: 4,
    fcraNumber: 'FCRA-083720198',
    section80G: true,
    foundedYear: 2018,
    disbursedAmount: '₹6,40,000',
    activeVolunteers: 64
  },
  {
    id: 'paws-and-care',
    name: 'Paws & Care',
    cause: 'animal welfare',
    causeLabel: 'Animal Welfare',
    location: 'Baner & Wakad, Pune',
    city: 'pune',
    cityLabel: 'Pune',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvUZlfzgCWoHlmwjMEMtPjgwoXmmrg4lXjBvmJ3-9DhXBBwiX_gysmUq1d9CoEzca2DHyH7CadkIznvyMYf3ARUGl0pB7k4Q8eOODjQUyI92zaLyDa8clCKJg9Au8aGYjzOSmSTJS4nUBN6sCUXBQjJi4d64SpNW6xiTzDJZM_z5NbhfkMcnZ0ptTWkFKuIPQBdN6_bCvBLbXNvsSnm-e1zbj21hHzopxRNKgvZ3ul1cyxX6yEEfQa',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMvz-gt1zjgmWa5uVGumjxLjwzC-2tDliz9UjepuwdCZ2Gi_rwnYs7IeLM3VUc8dp2-mRquxaWubXUZX20Iw01EgIZcCOjYzVIwjcugPHhkKp6H8Lkowd42-IRI0cny6ih1oUgnRYNIHypW3_RbmLuIMaCs1jbj3DD6LgPj7qMqgkB1QtaqmMg-83C_Mu0VOtwXpNhLH3bR7y_D7iAVfSds9GaSUQOeLT8f5wSXBUtQ2XwPSwnyt_3',
    liveActivity: 'Mobile Ambulance on Duty',
    description: 'Operating mobile veterinary clinics and providing 24/7 rescue and rehabilitation for stray animals.',
    impactMetrics: {
      primaryNumber: '850+',
      primaryLabel: 'Rescued',
      storiesCount: 18,
      extraNumber: '4',
      extraLabel: 'Shelters'
    },
    gps: '18.5204° N, 73.8567° E',
    officerSigned: true,
    weeklyMilestone: '"85 rescued strays received clinical care, deworming, and winter bedding across Pune cantonment."',
    distanceKm: 148,
    fcraNumber: 'FCRA-092471822',
    section80G: true,
    foundedYear: 2019,
    disbursedAmount: '₹4,12,000',
    activeVolunteers: 42
  },
  {
    id: 'green-roots',
    name: 'Green Roots Initiative',
    cause: 'environment',
    causeLabel: 'Environment & Climate',
    location: 'Mithi River Corridor, Mumbai',
    city: 'mumbai',
    cityLabel: 'Mumbai',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcX2Avp-KE8qVr-VG8vMpmLKKpC9HxXPjDz4GubpP00oYJpipesfjt8fe95y7GxsKlvbRPNFWxJSdd83862nA82vSAecNE_PMFl42fw7QnTH8Xc9fzFZ-qk80lU3oACbVo4v_hAmuMEYL13KJRqGPheGQddOV5s07vGRQ2CMxTspuo9H5zRgwP1H3GQTe5gohJXhlLijvt9ok_61mSMZOmDBQ0-ucL7fkubxOMd5nWzGhtaDnncNQS',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7glxwt_qPsqIU3NjPj9EZpo5nNFUp-qenhU-6JVXr5aVyGr857-GAATnYmAsiYd2i4yIw-yQnuPr-mfNWLH2U0LyblQ8MAHKq5HaVFj3xGp3fTD8p867efaX1dOtL2TLiaFLCFP9drxKZvyAA9jlf-fDFaka02_pPA1rSanZu6iUsA9jOEhZrk63rVO5cbKYQSU0xEI9huFc6LVWgM8D27qlnKjnZixU_DIhjhOm1M15QrYF0kv_s',
    liveActivity: 'Miyawaki Forest Drive #12',
    description: 'Restoring urban biodiversity through community tree-planting, rainwater harvesting, and waste reduction.',
    impactMetrics: {
      primaryNumber: '3.4K+',
      primaryLabel: 'Trees',
      storiesCount: 14,
      extraNumber: '6',
      extraLabel: 'Parks'
    },
    gps: '19.0600° N, 72.8360° E',
    officerSigned: true,
    weeklyMilestone: '"230 native saplings planted along Mithi Riverbank with drip irrigation collars and organic mulching."',
    distanceKm: 14,
    fcraNumber: 'FCRA-048192731',
    section80G: true,
    foundedYear: 2020,
    disbursedAmount: '₹3,85,000',
    activeVolunteers: 110
  },
  {
    id: 'annapurna-hunger-relief',
    name: 'Annapurna Hunger Relief',
    cause: 'hunger relief',
    causeLabel: 'Hunger Relief',
    location: 'Kurla & Chembur, Mumbai',
    city: 'mumbai',
    cityLabel: 'Mumbai',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG3M7TNpXIqUI8Rz_FRVr5ELAyCiR9byCBHxnKe3ITBBMiGYmQlGgmRlk-SHOnIJNla-uKSxKWQOSpgV_Ldro85q_Xp0a6Tp8Vf4tULh7B6VMU5bj4y3LAb1y-intC9hIaZXKLfiC-UPFexvIljUAX7c15KRG3PVYbTNdfje9jG2Yo0z2LOaj4qszaLljrq7t6u5tzx_wxs1RckApDxKkwDH3I8B9Sq11rbvP6FPxQtmbgRZomHTtI',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeXh2OE1MN9-D8jntMBPZm7ZUKvMEr2_lr-ksAPE8z8oRcWZZt5M4TPM4RxV4sN5EtxewdPiPF14PmZq8nnmdT81130WeTOb9Alr1zouzrhzINnHHITnsw9pOY67cfibLZGT82JBQRnAbt7YgwuNiHfH0WD1fp1tFKq4hwnFSdFZ4jfW_NDbowIdEtmGxE_-trldjs6ugsloC-FHMgGTv_aYsMD6asBeGHOzJkYGDN9y3RAKLg1CQr',
    liveActivity: 'Evening Meal Dispatch Active',
    description: 'Connecting surplus food from restaurants and weddings to daily-wage communities and child care centers.',
    impactMetrics: {
      primaryNumber: '12.5K+',
      primaryLabel: 'Meals Served',
      storiesCount: 32,
      extraNumber: '14',
      extraLabel: 'Kitchens'
    },
    gps: '19.0688° N, 72.8856° E',
    officerSigned: true,
    weeklyMilestone: '"1,450 warm wholesome meals delivered to migrant families with verified merchant receipts."',
    distanceKm: 8,
    fcraNumber: 'FCRA-058291039',
    section80G: true,
    foundedYear: 2017,
    disbursedAmount: '₹5,20,000',
    activeVolunteers: 78
  },
  {
    id: 'swasthya-care',
    name: 'Swasthya Care Collective',
    cause: 'healthcare',
    causeLabel: 'Healthcare & Maternal',
    location: 'Shirwal & Haveli, Pune',
    city: 'pune',
    cityLabel: 'Pune',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqbrAZWZzFjvYAgkiqVKFznR78e0qOhqT-qFIHUd26lfCm5ZPSjjSJR3lcHuDL0ToT2CekLG3oWA0kB5gQ391r-pjWy7xwA4iDeKnYyCrTIGOWLCvFUD4uqVssakTqCMECf3JDBTu8RROdVKCpphP4k_1265UpaPoze9vrp9CsrHL320QwayL9MeY4P0w0axZBe8lAdkZzNJOX8sJrE2E7TjZ5zZpEzYGMGTVmVNgYaqMwm8TlHEY2',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKyWrAS8AwAhWmmXjzcQnKwiDfcXi3P51_t7w4Wfge4kySYGV_KrfJyC0ARYHgwfDx7orumYD_u9qDOp25J5RZl86ZYGA16MKI_bmIxCWgrRxnQtyVGKm7Byb7b_ASP_Y8ryu7aTZiblhuVIEUJqKaAO2Q6FKexHu0kAZOo3Kf6AER--VOzSVzfUQkc9woSP4p6p_a5n5hQLj3_8nvYGWNX--_K6YZZoBxtqq7_6ee5aGyvLQSnL5a',
    liveActivity: 'Maternal Health Clinic Open',
    description: 'Preventative healthcare camps and maternal health checkups for rural and semi-urban families.',
    impactMetrics: {
      primaryNumber: '2.1K+',
      primaryLabel: 'Patients Checked',
      storiesCount: 19,
      extraNumber: '7',
      extraLabel: 'Mobile Vans'
    },
    gps: '18.4500° N, 73.8100° E',
    officerSigned: true,
    weeklyMilestone: '"240 antenatal checkups completed with essential iron supplements and nutrition consultations."',
    distanceKm: 152,
    fcraNumber: 'FCRA-071829304',
    section80G: true,
    foundedYear: 2019,
    disbursedAmount: '₹3,40,000',
    activeVolunteers: 35
  },
  {
    id: 'umeed-skill-academy',
    name: 'Umeed Skill Academy',
    cause: 'community development',
    causeLabel: 'Community Livelihood',
    location: 'Okhla & Seelampur, Delhi',
    city: 'delhi',
    cityLabel: 'Delhi',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6epPKTLq5UHMcwIWRYfz4ytkKM1lp4wM92I4PXyYQ14Bb5VCwhGxf1lJhVcYFVNUbP7coJEfj0Cyw2TxF-V0nDHCRPHZZeSA_zsk_aduli27_UdR1cKr0h8VLkuPFSwYgI5lwv4O2D0sMQWdQx7qSg90ihjp1sGrDr8-rxyVFnravNEDrXpxIfNUMoK-HnsvoX2TjnEQUTjGWtm8FLmL2JjkxVQ-ahLEijs9ibcP43ly7ikKjBZsf',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf_qzBF-jDEG5-j0YV-l_mk_MksPlVReC4VafUt7wVYxvTbeuko7sO8bn-p0YVYvBBzn8e_J20wnOYcDVRsKC6uy2eX1lYD2mwVqLP-in7dLqCq5XLV_S6dCu-UwyoTF4xh42kaGEsLytD6-Pcb7R6i72xJilieURVoMLkdc-I5fN_4aHg3vyntddz2PB56qrW6K1NhiL_2Qk1XLpSGLfXr7sTAx0P43lORD1MIJP0-n4_w66AdOY5',
    liveActivity: 'Batch #14 Entrepreneurship Demo',
    description: 'Vocational tailoring and technology training programs enabling sustainable women entrepreneurship.',
    impactMetrics: {
      primaryNumber: '640+',
      primaryLabel: 'Women Trained',
      storiesCount: 11,
      extraNumber: '5',
      extraLabel: 'Workshops'
    },
    gps: '28.5355° N, 77.2610° E',
    officerSigned: true,
    weeklyMilestone: '"Graduation of 45 artisan micro-entrepreneurs equipped with commercial sewing units."',
    distanceKm: 1420,
    fcraNumber: 'FCRA-019283746',
    section80G: true,
    foundedYear: 2021,
    disbursedAmount: '₹2,90,000',
    activeVolunteers: 28
  }
];

export const INITIAL_POSTS: ImpactPost[] = [
  {
    id: 'post-1',
    ngoId: 'helping-hands',
    ngoName: 'Helping Hands Foundation',
    ngoAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArvBL9SlT5V1PViTTkeziRmaO8oUPACXNQfpe-VlCyESPoVrGMgS8hSW_H2THyU5uwSM_sMenm7EpsgkOS1aPvxk06coelAOcxW6EVsyJRwo4-plKIGF6EFZEiTrZlcYBxVw6HkiRVYy1yhBbcw8k1wXzNZou4bD7xOVZUdeuvVSOk0os-754siH6rkk3-xeIjrKtBpb3I388aST73PQJgeIyKHXp-bODSIfpNmG0PVyVJrSrv_bku',
    cause: 'Education',
    location: 'Mumbai',
    timeAgo: '2 hours ago',
    headline: '120 Students Received Learning Kits',
    subheadline: 'Cause: Primary Education • Dharavi, Mumbai',
    badgeText: 'Auditor Signed',
    badgeType: 'auditor',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjLNVDxFjmGZ5As47z-WUxe4xrNViHV21EPHPaW4qmlszepU1_X-d98AoAVStV5AypkcsaptsDoKAyqbXuArA0RVgpelEo-6RGMMLxeXvvm0iOFwfVk2FiPA41UCtEDVifkSJtWb0ISPdylCRS-RhymFiirs4MuLuKo3wcIstcW3OpcqghihhE-qg75M-x11sIVh-1NbKHXxfD50FdVnEQGf4I-Wc_xcA_jRnCzE4Yn10iFGaMgLWi',
    gpsBadge: 'GPS: 19.0434° N, 72.8567° E • On-site timestamped',
    content: 'We completed our latest education drive in Mumbai, providing school supplies and learning materials to students from local communities. Huge gratitude to our volunteer network and 42 micro-donors who funded this shipment within 36 hours!',
    hashtags: ['#BackToSchool2024', '#VerifiedImpact', '#MumbaiYouth'],
    unitCostInfo: {
      cost: '₹950 / kit',
      receiptId: 'Audited Receipt #4092'
    },
    proofHash: '#0x82f...d49a',
    likes: 482,
    commentsCount: 38,
    liked: false,
    comments: [
      {
        author: 'Ramesh G.',
        text: 'Verified attendance and unboxed bundles on-site today as independent community observer.',
        timeAgo: '1h ago'
      },
      {
        author: 'Sunita M.',
        text: 'So heartwarming to see our neighborhood children receive quality books and solar study lamps!',
        timeAgo: '45m ago'
      }
    ]
  },
  {
    id: 'post-2',
    ngoId: 'paws-and-care',
    ngoName: 'Paws & Care',
    ngoAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvUZlfzgCWoHlmwjMEMtPjgwoXmmrg4lXjBvmJ3-9DhXBBwiX_gysmUq1d9CoEzca2DHyH7CadkIznvyMYf3ARUGl0pB7k4Q8eOODjQUyI92zaLyDa8clCKJg9Au8aGYjzOSmSTJS4nUBN6sCUXBQjJi4d64SpNW6xiTzDJZM_z5NbhfkMcnZ0ptTWkFKuIPQBdN6_bCvBLbXNvsSnm-e1zbj21hHzopxRNKgvZ3ul1cyxX6yEEfQa',
    cause: 'Animal Welfare',
    location: 'Pune',
    timeAgo: '5 hours ago',
    headline: '85 Rescued Animals Received Medical Care & Nutrition',
    subheadline: 'Cause: Emergency Animal Rescue • Baner & Wakad, Pune',
    badgeText: 'Vaccination Complete',
    badgeType: 'clinical',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53AYasnh_NI02la1HDaLxe-PnLv3m3UteLv27i5Gany5i7IOsJuqpJikZE-tMDide58XzSXbtLwrP8e1QGCTLg3qmFmfaPQ6ugxIVBHSMe-_CSMhSG3E_Hl3uzNFjv21E_b5nFRvaZfFY6N1YyBEIZeMzvKc2MG_xR31DRK6eQlZK56QSB3R2SQlgGg-KWnGOFvit7zqzvRs3H-lZQKqcjQcCUUtbEhw8c69WngIwb5VBrYhV0p1B',
    gpsBadge: 'Shelter Ward 04 • In-clinic medical chart verified',
    content: 'Our emergency mobile clinic wrapped up winter checkups across 4 suburban Pune shelters. In total, 85 strays received deworming, antirabies boosters, and a two-week high-calorie nourishment regimen. Special nod to Dr. Mehra and volunteers!',
    hashtags: ['#AnimalCare', '#IndieRescue', '#PuneAnimals'],
    unitCostInfo: {
      cost: '₹420 / animal',
      receiptId: 'Vaccine Batch #P-99'
    },
    proofHash: '#0x51c...8bb2',
    likes: 319,
    commentsCount: 24,
    liked: false,
    comments: [
      {
        author: 'Rohit K.',
        text: 'Incredible work team! Visited the Baner shelter last weekend, the transformation is real.',
        timeAgo: '3h ago'
      }
    ]
  },
  {
    id: 'post-3',
    ngoId: 'green-roots',
    ngoName: 'Green Roots Initiative',
    ngoAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcX2Avp-KE8qVr-VG8vMpmLKKpC9HxXPjDz4GubpP00oYJpipesfjt8fe95y7GxsKlvbRPNFWxJSdd83862nA82vSAecNE_PMFl42fw7QnTH8Xc9fzFZ-qk80lU3oACbVo4v_hAmuMEYL13KJRqGPheGQddOV5s07vGRQ2CMxTspuo9H5zRgwP1H3GQTe5gohJXhlLijvt9ok_61mSMZOmDBQ0-ucL7fkubxOMd5nWzGhtaDnncNQS',
    cause: 'Environment',
    location: 'Mumbai',
    timeAgo: 'Yesterday',
    headline: '230 Trees Planted Across Urban Riverbank',
    subheadline: 'Cause: Riverbank Reforestation • Mithi River Corridor, Mumbai',
    badgeText: 'Geo-Tagged Saplings',
    badgeType: 'geotag',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2hVKf3Qy32HPfctAE5AEHLE_3AM3FQp1XH8uoHRDJnYq2NqXCFIDSstp7h3lbJSqI_Z5UB6gNgbXsPSYD6cpMH5pCL0CS3oyN8_X6mDNFZiN-SbBEu4HAvH97Gwi5rSLtIJ3W1zd8Y_mhkHvIs4VM-P-669XGNK7Uwr1stvFGnihIlcQA3TPz3aTz7Nlq3nPrcZeTFFV1lni_sCNxL6AeOpTZFyjJ___KxBPKusndjH8XzgmyKmnA',
    gpsBadge: 'Plot: Zone 4B • 94% Survival Target Projected',
    content: 'Phase 1 of the Mithi Riverbank Restoration is officially in the ground! Over 60 local residents woke up at 6 AM to plant 230 native saplings engineered to prevent monsoon soil erosion. Each plant is mapped to a donor on KindredHub.',
    hashtags: ['#MithiCorridor', '#GreenMumbai', '#ZeroCarbon'],
    unitCostInfo: {
      cost: '₹180 / sapling + mulch',
      receiptId: 'Drone Geo-Verified #9912'
    },
    proofHash: '#0x99e...a71c',
    likes: 614,
    commentsCount: 52,
    liked: false,
    comments: [
      {
        author: 'Anita Deshmukh',
        text: 'The drone mapping view is spectacular. Let us know when the next watering roster starts!',
        timeAgo: '18h ago'
      }
    ]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    hash: '0x82f4c91a0bb38f2190ee41893c5d6e',
    ngoName: 'Helping Hands Foundation',
    donorName: 'Aditya Kharat',
    cause: 'Primary Education & STEM Literacy',
    itemDescription: 'Complete STEM Educational Kit + Solar Study Lamp for Primary Grade Student',
    amount: '₹1,200',
    timestamp: '2024-11-14 14:22:04 IST',
    gpsCoordinates: '19.0402° N, 72.8567° E (Govandi Hub)',
    status: 'Verified on Public Ledger',
    auditorName: 'Ramesh G. (Field Officer ID #4092)',
    blockNumber: '#8942-D'
  },
  {
    id: 'cert-2',
    hash: '0x99e5210c431abff492a83109a1288c',
    ngoName: 'Green Roots Initiative',
    donorName: 'Aditya Kharat',
    cause: 'Mithi Riverbank Reforestation',
    itemDescription: '5 Native Banyan & Neem Saplings with Organic Mulching & Drip Lines',
    amount: '₹900',
    timestamp: '2024-11-10 09:15:32 IST',
    gpsCoordinates: '19.0600° N, 72.8360° E (Zone 4B)',
    status: 'Audited Field Signoff',
    auditorName: 'Dr. Mehra & Drone Satellite Log #9912',
    blockNumber: '#8931-C'
  }
];

export const STORIES_DATA = [
  {
    id: 'story-1',
    ngoId: 'helping-hands',
    ngoName: 'Helping Hands',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByfSpUDYne_Cx6BmTZrKj7xovo-bAWndIVHaQiWb9G1cRL6fiuRbvNzuH1V4TKZ0WMXD-aIjNA1FJ8Gr1a98sprN4LZBSMxQuXI7dCRsxYiKtPqV21DNPXlwQxsbZvKL0UsDZQCgN_O00TQ-grO4niDv57xbw0CWSzZIA7dFvdgtLjnO59SgNJK39KgcCcyuoLi0bjGnve8_q4_uWlO_uzcfHX465V6cMnggVzRrCh3rna4YI9Puvs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoPuykFH9ZEAwdN3hKdkzMCpOlfD19-9CBa8xKM3C5FoNg6_-EUVhVERHV1v0RCwADPkX8boncGDGKEtevRW29WVFcyhpPfkekLELgzAMjPRQa4ZExWNx2nkVnn9qrOWhbkIw2EciMWOCY0xbkcK17qlZNxWLngI4Y-6slNo2hE0eOE3Nl-fTo8VuXWFP-2m-6lPF_MqRv-JvwU_AEj7KHfQNuVRw3Mq-S_u46lZmJi33kC_-a12fJ',
    headline: '120 STEM Bundles Distributed in Mumbai',
    location: 'Govandi, Mumbai'
  },
  {
    id: 'story-2',
    ngoId: 'paws-and-care',
    ngoName: 'Paws & Care',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZwQUKuQPSdfn-0AT8MP6BdKVx-SzKe5IIjEJDJmRy4w7OaoJzxOeY45K1B6cXrMMQA8C0UQsGb65pqhKbTslo9C84XlzKJrcKe4Jtk3b98G2xEgIfVLoUjvaLeZeO-aW4_n2UbV131QN3Ontdfd9BMkWF-fkYdHt8mKpSHjj73OdvZU6E4I0saoIbBrR8dhx4NZMyDRCfTubO5-Fid4x1SIHAy5Ig5izOHUaJ4hDQq_F518SuK3sp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMvz-gt1zjgmWa5uVGumjxLjwzC-2tDliz9UjepuwdCZ2Gi_rwnYs7IeLM3VUc8dp2-mRquxaWubXUZX20Iw01EgIZcCOjYzVIwjcugPHhkKp6H8Lkowd42-IRI0cny6ih1oUgnRYNIHypW3_RbmLuIMaCs1jbj3DD6LgPj7qMqgkB1QtaqmMg-83C_Mu0VOtwXpNhLH3bR7y_D7iAVfSds9GaSUQOeLT8f5wSXBUtQ2XwPSwnyt_3',
    headline: '85 Stray Rescues Sheltered for Winter',
    location: 'Baner, Pune'
  },
  {
    id: 'story-3',
    ngoId: 'green-roots',
    ngoName: 'Green Roots',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc9wVEVdTUNDnSwJTOqcliRtekML1YV93U9BGRxTkI2c9p_o77-mDJ2fMKXKgkDmBiOrFndLehYpLZQ0PJEOObZi0fnd-fddhWcIjnj6K6cYx4-5UeWGSd_E62e8Ejk5VbXwJnFnxWov4o68rjSkiQCG9Uq79xvlGnaeXza43cCTb2aL-pP-9bRHFrizHXVvPgihVDXXr2-dTpiuV408Wt2dWPfoJRzU4Zz4-YOuBTD2jysIlgfxWO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7glxwt_qPsqIU3NjPj9EZpo5nNFUp-qenhU-6JVXr5aVyGr857-GAATnYmAsiYd2i4yIw-yQnuPr-mfNWLH2U0LyblQ8MAHKq5HaVFj3xGp3fTD8p867efaX1dOtL2TLiaFLCFP9drxKZvyAA9jlf-fDFaka02_pPA1rSanZu6iUsA9jOEhZrk63rVO5cbKYQSU0xEI9huFc6LVWgM8D27qlnKjnZixU_DIhjhOm1M15QrYF0kv_s',
    headline: '230 Native Saplings Planted at Mithi River',
    location: 'Bandra Corridor, Mumbai'
  },
  {
    id: 'story-4',
    ngoId: 'annapurna-hunger-relief',
    ngoName: 'CareMeals',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG3M7TNpXIqUI8Rz_FRVr5ELAyCiR9byCBHxnKe3ITBBMiGYmQlGgmRlk-SHOnIJNla-uKSxKWQOSpgV_Ldro85q_Xp0a6Tp8Vf4tULh7B6VMU5bj4y3LAb1y-intC9hIaZXKLfiC-UPFexvIljUAX7c15KRG3PVYbTNdfje9jG2Yo0z2LOaj4qszaLljrq7t6u5tzx_wxs1RckApDxKkwDH3I8B9Sq11rbvP6FPxQtmbgRZomHTtI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeXh2OE1MN9-D8jntMBPZm7ZUKvMEr2_lr-ksAPE8z8oRcWZZt5M4TPM4RxV4sN5EtxewdPiPF14PmZq8nnmdT81130WeTOb9Alr1zouzrhzINnHHITnsw9pOY67cfibLZGT82JBQRnAbt7YgwuNiHfH0WD1fp1tFKq4hwnFSdFZ4jfW_NDbowIdEtmGxE_-trldjs6ugsloC-FHMgGTv_aYsMD6asBeGHOzJkYGDN9y3RAKLg1CQr',
    headline: 'Night Meal Dispatches across Kurla & Chembur',
    location: 'Mumbai'
  },
  {
    id: 'story-5',
    ngoId: 'swasthya-care',
    ngoName: 'SmileCraft',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqbrAZWZzFjvYAgkiqVKFznR78e0qOhqT-qFIHUd26lfCm5ZPSjjSJR3lcHuDL0ToT2CekLG3oWA0kB5gQ391r-pjWy7xwA4iDeKnYyCrTIGOWLCvFUD4uqVssakTqCMECf3JDBTu8RROdVKCpphP4k_1265UpaPoze9vrp9CsrHL320QwayL9MeY4P0w0axZBe8lAdkZzNJOX8sJrE2E7TjZ5zZpEzYGMGTVmVNgYaqMwm8TlHEY2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKyWrAS8AwAhWmmXjzcQnKwiDfcXi3P51_t7w4Wfge4kySYGV_KrfJyC0ARYHgwfDx7orumYD_u9qDOp25J5RZl86ZYGA16MKI_bmIxCWgrRxnQtyVGKm7Byb7b_ASP_Y8ryu7aTZiblhuVIEUJqKaAO2Q6FKexHu0kAZOo3Kf6AER--VOzSVzfUQkc9woSP4p6p_a5n5hQLj3_8nvYGWNX--_K6YZZoBxtqq7_6ee5aGyvLQSnL5a',
    headline: 'Preventative Health Camp in Rural Maharashtra',
    location: 'Haveli, Pune'
  }
];
