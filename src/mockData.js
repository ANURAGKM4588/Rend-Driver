// src/mockData.js

export const MOCK_DRIVERS = [
  {
    id: 'drv_1',
    name: 'Alexander Mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    tripsCount: 1420,
    experience: '8 Years',
    status: 'online', // 'online', 'offline', 'busy'
    lat: 9.9312, // Base location in Kochi, Kerala
    lng: 76.2673,
    phone: '+91 98765 43210',
    licenseNumber: 'DL-98439284',
    kycStatus: 'Verified', // Verified, Pending, Action Required
    vehicleExpertise: ['Sedan', 'SUV', 'Luxury', 'Electric'],
    hourlyRate: 299,
    weeklyEarnings: 12500,
    dailyEarnings: 2500,
    walletBalance: 4500,
    reviews: [
      { id: 'r1', user: 'Sarah K.', rating: 5, comment: 'Extremely professional and smooth ride. Car was handled with care.' },
      { id: 'r2', user: 'James L.', rating: 5, comment: 'Punctual, polite, and clean driving. Highly recommended!' }
    ]
  },
  {
    id: 'drv_2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    tripsCount: 980,
    experience: '5 Years',
    status: 'online',
    lat: 9.9600,
    lng: 76.2800,
    phone: '+91 98765 09921',
    licenseNumber: 'DL-28491823',
    kycStatus: 'Verified',
    vehicleExpertise: ['Hatchback', 'Sedan', 'SUV', 'Manual Transmission'],
    hourlyRate: 249,
    weeklyEarnings: 9500,
    dailyEarnings: 1800,
    walletBalance: 3200,
    reviews: [
      { id: 'r3', user: 'Michael S.', rating: 4.8, comment: 'Very careful driver, especially in high traffic. Good navigator.' }
    ]
  },
  {
    id: 'drv_3',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4.95,
    tripsCount: 2150,
    experience: '12 Years',
    status: 'online',
    lat: 10.0230,
    lng: 76.3070,
    phone: '+91 98765 88330',
    licenseNumber: 'DL-19283745',
    kycStatus: 'Verified',
    vehicleExpertise: ['Supercars', 'Luxury', 'SUV', 'EVs'],
    hourlyRate: 399,
    weeklyEarnings: 18000,
    dailyEarnings: 3600,
    walletBalance: 6400,
    reviews: [
      { id: 'r4', user: 'David G.', rating: 5, comment: 'Chauffeur quality driving. Handled my Mercedes perfectly.' }
    ]
  },
  {
    id: 'drv_4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    tripsCount: 512,
    experience: '3 Years',
    status: 'offline',
    lat: 9.9670,
    lng: 76.3180,
    phone: '+91 98765 44550',
    licenseNumber: 'DL-73628461',
    kycStatus: 'Verified',
    vehicleExpertise: ['Hatchback', 'Sedan', 'EVs'],
    hourlyRate: 199,
    weeklyEarnings: 6000,
    dailyEarnings: 0,
    walletBalance: 1500,
    reviews: [
      { id: 'r5', user: 'Chloe B.', rating: 4.5, comment: 'Friendly and on time.' }
    ]
  },
  {
    id: 'drv_5',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    tripsCount: 1100,
    experience: '6 Years',
    status: 'online',
    lat: 9.9940,
    lng: 76.2890,
    phone: '+91 98765 73910',
    licenseNumber: 'DL-62849173',
    kycStatus: 'Pending',
    vehicleExpertise: ['Sedan', 'SUV', 'Luxury'],
    hourlyRate: 279,
    weeklyEarnings: 14000,
    dailyEarnings: 2800,
    walletBalance: 3800,
    reviews: [
      { id: 'r6', user: 'Robert D.', rating: 5, comment: 'Excellent navigation skills and extremely polite.' }
    ]
  }
];

export const MOCK_LOCATIONS = [
  // === AIRPORTS (All Kerala) ===
  { name: 'Trivandrum International Airport (TRV)', lat: 8.4822, lng: 76.9200, cat: 'airport' },
  { name: 'Kochi International Airport (CIAL / COK)', lat: 10.1556, lng: 76.3914, cat: 'airport' },
  { name: 'Calicut International Airport (CCJ)', lat: 11.1368, lng: 75.9553, cat: 'airport' },
  { name: 'Kannur International Airport (CNN)', lat: 11.9185, lng: 75.5443, cat: 'airport' },

  // === RAILWAY STATIONS ===
  { name: 'Trivandrum Central Railway Station', lat: 8.4875, lng: 76.9523, cat: 'transit' },
  { name: 'Ernakulam Junction Railway Station', lat: 9.9709, lng: 76.2890, cat: 'transit' },
  { name: 'Ernakulam Town Railway Station', lat: 9.9910, lng: 76.2810, cat: 'transit' },
  { name: 'Kozhikode Railway Station', lat: 11.2570, lng: 75.7800, cat: 'transit' },
  { name: 'Kollam Junction Railway Station', lat: 8.8850, lng: 76.6000, cat: 'transit' },
  { name: 'Thrissur Railway Station', lat: 10.5250, lng: 76.2150, cat: 'transit' },
  { name: 'Alappuzha Railway Station', lat: 9.4960, lng: 76.3400, cat: 'transit' },
  { name: 'Kottayam Railway Station', lat: 9.5920, lng: 76.5200, cat: 'transit' },
  { name: 'Palakkad Junction Railway Station', lat: 10.7800, lng: 76.6550, cat: 'transit' },
  { name: 'Kannur Railway Station', lat: 11.8680, lng: 75.3650, cat: 'transit' },

  // === DISTRICTS & CITIES ===
  { name: 'Thiruvananthapuram City', lat: 8.5241, lng: 76.9366, cat: 'city' },
  { name: 'Kochi (Ernakulam)', lat: 9.9312, lng: 76.2673, cat: 'city' },
  { name: 'Kozhikode (Calicut)', lat: 11.2588, lng: 75.7804, cat: 'city' },
  { name: 'Alappuzha (Alleppey)', lat: 9.4981, lng: 76.3388, cat: 'city' },
  { name: 'Kollam (Quilon)', lat: 8.8932, lng: 76.6141, cat: 'city' },
  { name: 'Thrissur (Trichur)', lat: 10.5276, lng: 76.2144, cat: 'city' },
  { name: 'Palakkad (Palghat)', lat: 10.7867, lng: 76.6548, cat: 'city' },
  { name: 'Kannur (Cannanore)', lat: 11.8745, lng: 75.3704, cat: 'city' },
  { name: 'Kottayam', lat: 9.5916, lng: 76.5222, cat: 'city' },
  { name: 'Kasaragod', lat: 12.4924, lng: 74.9900, cat: 'city' },
  { name: 'Pathanamthitta', lat: 9.2648, lng: 76.7870, cat: 'city' },
  { name: 'Malappuram', lat: 11.0510, lng: 76.0711, cat: 'city' },
  { name: 'Idukki', lat: 9.8500, lng: 76.9667, cat: 'city' },
  { name: 'Wayanad (Kalpetta)', lat: 11.6854, lng: 76.1320, cat: 'city' },

  // === LOCAL AREAS — TRIVANDRUM ===
  { name: 'Kowdiar, Trivandrum', lat: 8.5080, lng: 76.9640, cat: 'area' },
  { name: 'Vazhuthacaud, Trivandrum', lat: 8.4960, lng: 76.9570, cat: 'area' },
  { name: 'Pattom, Trivandrum', lat: 8.5080, lng: 76.9470, cat: 'area' },
  { name: 'Sasthamangalam, Trivandrum', lat: 8.5130, lng: 76.9670, cat: 'area' },
  { name: 'Thampanoor, Trivandrum', lat: 8.4870, lng: 76.9510, cat: 'area' },
  { name: 'Palayam, Trivandrum', lat: 8.5010, lng: 76.9530, cat: 'area' },
  { name: 'Kazhakootam, Trivandrum', lat: 8.5700, lng: 76.8780, cat: 'area' },
  { name: 'Technopark, Trivandrum', lat: 8.5620, lng: 76.8800, cat: 'area' },
  { name: 'Nemom, Trivandrum', lat: 8.4400, lng: 76.9900, cat: 'area' },
  { name: 'Balaramapuram, Trivandrum', lat: 8.4250, lng: 77.0000, cat: 'area' },
  { name: 'Neyyattinkara, Trivandrum', lat: 8.4000, lng: 77.0870, cat: 'area' },

  // === LOCAL AREAS — KOCHI ===
  { name: 'MG Road, Kochi', lat: 9.9710, lng: 76.2830, cat: 'area' },
  { name: 'Marine Drive, Kochi', lat: 9.9820, lng: 76.2770, cat: 'area' },
  { name: 'Panampilly Nagar, Kochi', lat: 9.9600, lng: 76.2700, cat: 'area' },
  { name: 'Kakkanad, Kochi', lat: 10.0090, lng: 76.3400, cat: 'area' },
  { name: 'Edappally, Kochi', lat: 10.0230, lng: 76.3070, cat: 'area' },
  { name: 'Vyttila, Kochi', lat: 9.9670, lng: 76.3180, cat: 'area' },
  { name: 'Fort Kochi', lat: 9.9660, lng: 76.2420, cat: 'area' },
  { name: 'Mattancherry, Kochi', lat: 9.9580, lng: 76.2580, cat: 'area' },
  { name: 'Aluva, Kochi', lat: 10.1060, lng: 76.3500, cat: 'area' },
  { name: 'Tripunithura, Kochi', lat: 9.9430, lng: 76.3380, cat: 'area' },
  { name: 'Kaloor, Kochi', lat: 9.9940, lng: 76.2890, cat: 'area' },
  { name: 'Palarivattom, Kochi', lat: 9.9860, lng: 76.3050, cat: 'area' },

  // === LOCAL AREAS — KOZHIKODE ===
  { name: 'Kozhikode Beach Area', lat: 11.2540, lng: 75.7720, cat: 'area' },
  { name: 'Kozhikode Medical College', lat: 11.3080, lng: 75.9000, cat: 'area' },
  { name: 'Kunnamangalam, Kozhikode', lat: 11.3040, lng: 75.8780, cat: 'area' },
  { name: 'Mavoor Road, Kozhikode', lat: 11.2650, lng: 75.7900, cat: 'area' },
  { name: 'Nadakkavu, Kozhikode', lat: 11.2780, lng: 75.7840, cat: 'area' },
  { name: 'Ramanattukara, Kozhikode', lat: 11.1820, lng: 75.8400, cat: 'area' },
  { name: 'Feroke, Kozhikode', lat: 11.1850, lng: 75.8500, cat: 'area' },
  { name: 'Beypore, Kozhikode', lat: 11.1830, lng: 75.8040, cat: 'area' },
  { name: 'Kallai, Kozhikode', lat: 11.2430, lng: 75.7820, cat: 'area' },
  { name: 'Puthiyara, Kozhikode', lat: 11.2680, lng: 75.7780, cat: 'area' },
  { name: 'Kottooli, Kozhikode', lat: 11.2750, lng: 75.7950, cat: 'area' },
  { name: 'Chevayur, Kozhikode', lat: 11.2900, lng: 75.8000, cat: 'area' },
  { name: 'West Hill, Kozhikode', lat: 11.2850, lng: 75.7620, cat: 'area' },
  { name: 'Eranhipalam, Kozhikode', lat: 11.2720, lng: 75.8100, cat: 'area' },
  { name: 'Panniyankara, Kozhikode', lat: 11.2500, lng: 75.7900, cat: 'area' },
  { name: 'Vellimadukunnu, Kozhikode', lat: 11.2950, lng: 75.8200, cat: 'area' },
  { name: 'Pantheerankavu, Kozhikode', lat: 11.2800, lng: 75.8400, cat: 'area' },
  { name: 'Vengeri, Kozhikode', lat: 11.3100, lng: 75.8800, cat: 'area' },
  { name: 'Kakkodi, Kozhikode', lat: 11.3200, lng: 75.8600, cat: 'area' },
  { name: 'Peruvayal, Kozhikode', lat: 11.3300, lng: 75.8800, cat: 'area' },
  { name: 'Malaparamba, Kozhikode', lat: 11.2870, lng: 75.7700, cat: 'area' },
  { name: 'Poothampara, Kozhikode', lat: 11.2930, lng: 75.8450, cat: 'area' },
  { name: 'Koyilandy, Kozhikode', lat: 11.4380, lng: 75.6950, cat: 'area' },
  { name: 'Vadakara, Kozhikode', lat: 11.5950, lng: 75.5800, cat: 'area' },
  { name: 'Balussery, Kozhikode', lat: 11.4100, lng: 75.8300, cat: 'area' },
  { name: 'Thamarassery, Kozhikode', lat: 11.4050, lng: 75.9400, cat: 'area' },
  { name: 'Mukkam, Kozhikode', lat: 11.3200, lng: 75.9600, cat: 'area' },
  { name: 'Koduvally, Kozhikode', lat: 11.3600, lng: 75.9200, cat: 'area' },
  { name: 'Perambra, Kozhikode', lat: 11.4200, lng: 75.7400, cat: 'area' },
  { name: 'Olavanna, Kozhikode', lat: 11.2300, lng: 75.8300, cat: 'area' },
  { name: 'Perumanna, Kozhikode', lat: 11.2500, lng: 75.8600, cat: 'area' },
  { name: 'Nanmanda, Kozhikode', lat: 11.3500, lng: 75.8300, cat: 'area' },
  { name: 'Thalakulathur, Kozhikode', lat: 11.3600, lng: 75.7800, cat: 'area' },
  { name: 'Kuttikkattoor, Kozhikode', lat: 11.3100, lng: 75.8700, cat: 'area' },
  { name: 'Thazhecode, Kozhikode', lat: 11.3800, lng: 75.8500, cat: 'area' },
  { name: 'Raroth, Kozhikode', lat: 11.3400, lng: 75.8900, cat: 'area' },
  { name: 'Kizhakkoth, Kozhikode', lat: 11.3800, lng: 75.9200, cat: 'area' },
  { name: 'Kodenchery, Kozhikode', lat: 11.4000, lng: 75.9600, cat: 'area' },
  { name: 'Thiruvambadi, Kozhikode', lat: 11.3500, lng: 75.9900, cat: 'area' },
  { name: 'Narikkuni, Kozhikode', lat: 11.2900, lng: 75.9200, cat: 'area' },
  { name: 'Puthuppadi, Kozhikode', lat: 11.3200, lng: 76.0100, cat: 'area' },
  { name: 'Koodaranji, Kozhikode', lat: 11.2800, lng: 75.9700, cat: 'area' },
  { name: 'Chathamangalam, Kozhikode', lat: 11.2900, lng: 75.8600, cat: 'area' },
  { name: 'Poolakkode, Kozhikode', lat: 11.2700, lng: 75.8800, cat: 'area' },
  { name: 'Kuruvattur, Kozhikode', lat: 11.3000, lng: 75.8900, cat: 'area' },
  { name: 'Madavoor, Kozhikode', lat: 11.2900, lng: 75.9200, cat: 'area' },
  { name: 'Padanilam, Kozhikode', lat: 11.2800, lng: 75.7600, cat: 'area' },
  { name: 'Puthiyangadi, Kozhikode', lat: 11.2350, lng: 75.8100, cat: 'area' },
  { name: 'Valayanad, Kozhikode', lat: 11.2450, lng: 75.8200, cat: 'area' },
  { name: 'Meenchantha, Kozhikode', lat: 11.2600, lng: 75.7900, cat: 'area' },
  { name: 'Chalappuram, Kozhikode', lat: 11.2440, lng: 75.7880, cat: 'area' },
  { name: 'Palayam, Kozhikode', lat: 11.2580, lng: 75.7950, cat: 'area' },
  { name: 'Thiruthiyad, Kozhikode', lat: 11.2770, lng: 75.8030, cat: 'area' },
  { name: 'Mankavu, Kozhikode', lat: 11.2660, lng: 75.8100, cat: 'area' },
  { name: 'Chevarambalam, Kozhikode', lat: 11.3020, lng: 75.8300, cat: 'area' },
  { name: 'Kuthiravattam, Kozhikode', lat: 11.2950, lng: 75.7850, cat: 'area' },
  { name: 'Edakkad, Kozhikode', lat: 11.3050, lng: 75.7600, cat: 'area' },
  { name: 'Vellayil, Kozhikode', lat: 11.2640, lng: 75.7680, cat: 'area' },
  { name: 'Nallalam, Kozhikode', lat: 11.2280, lng: 75.8300, cat: 'area' },
  { name: 'Puthur, Kozhikode', lat: 11.2150, lng: 75.8100, cat: 'area' },
  { name: 'Eranhikkal, Kozhikode', lat: 11.2420, lng: 75.8040, cat: 'area' },
  { name: 'Onchiyam, Vadakara', lat: 11.6000, lng: 75.6200, cat: 'area' },
  { name: 'Nadapuram, Vadakara', lat: 11.5500, lng: 75.6800, cat: 'area' },
  { name: 'Kuttiady, Vadakara', lat: 11.6500, lng: 75.7500, cat: 'area' },
  { name: 'Purameri, Vadakara', lat: 11.5800, lng: 75.6500, cat: 'area' },
  { name: 'Villiappally, Vadakara', lat: 11.6200, lng: 75.5900, cat: 'area' },
  { name: 'Arikkulam, Villiappally', lat: 11.6300, lng: 75.5800, cat: 'area' },

  // === TOURIST & HILL STATIONS ===
  { name: 'Munnar Town', lat: 10.0889, lng: 77.0595, cat: 'tourist' },
  { name: 'Thekkady (Periyar)', lat: 9.5300, lng: 77.1600, cat: 'tourist' },
  { name: 'Kumarakom, Kottayam', lat: 9.6170, lng: 76.4320, cat: 'tourist' },
  { name: 'Vagamon, Idukki', lat: 9.6850, lng: 76.9050, cat: 'tourist' },
  { name: 'Ponmudi, Trivandrum', lat: 8.6750, lng: 77.1170, cat: 'tourist' },
  { name: 'Athirappilly Waterfalls', lat: 10.2850, lng: 76.5670, cat: 'tourist' },
  { name: 'Gavi, Pathanamthitta', lat: 9.3500, lng: 77.1700, cat: 'tourist' },
  { name: 'Wayanad (Kalpetta)', lat: 11.6854, lng: 76.1320, cat: 'tourist' },
  { name: 'Sulthan Bathery, Wayanad', lat: 11.6680, lng: 76.2720, cat: 'tourist' },
  { name: 'Vythiri, Wayanad', lat: 11.4300, lng: 75.8200, cat: 'tourist' },

  // === BEACHES ===
  { name: 'Varkala Beach', lat: 8.7379, lng: 76.7170, cat: 'beach' },
  { name: 'Kovalam Beach, Trivandrum', lat: 8.3950, lng: 76.9770, cat: 'beach' },
  { name: 'Shankhumugham Beach, Trivandrum', lat: 8.4800, lng: 76.9100, cat: 'beach' },
  { name: 'Cherai Beach, Kochi', lat: 10.1430, lng: 76.1780, cat: 'beach' },
  { name: 'Marari Beach, Alappuzha', lat: 9.5960, lng: 76.3000, cat: 'beach' },
  { name: 'Beypore Beach, Kozhikode', lat: 11.1830, lng: 75.8040, cat: 'beach' },
  { name: 'Kappad Beach, Kozhikode', lat: 11.3820, lng: 75.7300, cat: 'beach' },
  { name: 'Fort Kochi Beach', lat: 9.9650, lng: 76.2400, cat: 'beach' },
  { name: 'Muzhappilangad Drive-in Beach, Kannur', lat: 11.7950, lng: 75.4530, cat: 'beach' },

  // === HOSPITALS ===
  { name: 'Trivandrum Medical College', lat: 8.5200, lng: 76.9320, cat: 'hospital' },
  { name: 'KIMS Hospital, Trivandrum', lat: 8.5250, lng: 76.9560, cat: 'hospital' },
  { name: 'Ananthapuri Hospital, Trivandrum', lat: 8.5080, lng: 76.9680, cat: 'hospital' },
  { name: 'PRS Hospital, Trivandrum', lat: 8.4970, lng: 76.9380, cat: 'hospital' },
  { name: 'Aster Medcity, Kochi', lat: 10.0120, lng: 76.3380, cat: 'hospital' },
  { name: 'Amrita Hospital, Kochi', lat: 10.1050, lng: 76.3500, cat: 'hospital' },
  { name: 'Lisie Hospital, Kochi', lat: 9.9670, lng: 76.2830, cat: 'hospital' },
  { name: 'Medical Trust Hospital, Kochi', lat: 9.9920, lng: 76.2900, cat: 'hospital' },
  { name: 'Baby Memorial Hospital, Kozhikode', lat: 11.2600, lng: 75.7780, cat: 'hospital' },
  { name: 'Kozhikode Medical College', lat: 11.3100, lng: 75.8950, cat: 'hospital' },
  { name: 'Kollam District Hospital', lat: 8.8870, lng: 76.6000, cat: 'hospital' },
  { name: 'Alappuzha Medical College', lat: 9.5030, lng: 76.3350, cat: 'hospital' },
  { name: 'Thrissur Medical College', lat: 10.5200, lng: 76.2100, cat: 'hospital' },
  { name: 'Jubilee Hospital, Thrissur', lat: 10.5150, lng: 76.2200, cat: 'hospital' },
  { name: 'Kottayam Medical College', lat: 9.6000, lng: 76.5150, cat: 'hospital' },
  { name: 'Caritas Hospital, Kottayam', lat: 9.5680, lng: 76.5270, cat: 'hospital' },

  // === LANDMARKS & TEMPLES ===
  { name: 'Sree Padmanabhaswamy Temple, Trivandrum', lat: 8.4830, lng: 76.9430, cat: 'landmark' },
  { name: 'Guruvayur Temple, Thrissur', lat: 10.5940, lng: 76.0390, cat: 'landmark' },
  { name: 'Sabarimala Temple, Pathanamthitta', lat: 9.4360, lng: 77.0830, cat: 'landmark' },
  { name: 'St. Francis Church, Fort Kochi', lat: 9.9650, lng: 76.2390, cat: 'landmark' },
  { name: 'Santa Cruz Basilica, Fort Kochi', lat: 9.9640, lng: 76.2410, cat: 'landmark' },
  { name: 'Mattancherry Palace, Kochi', lat: 9.9580, lng: 76.2590, cat: 'landmark' },
  { name: 'Hill Palace Museum, Tripunithura', lat: 9.9420, lng: 76.3420, cat: 'landmark' },
  { name: 'Bekal Fort, Kasaragod', lat: 12.3950, lng: 75.0350, cat: 'landmark' },
  { name: 'Edakkal Caves, Wayanad', lat: 11.6320, lng: 76.2350, cat: 'landmark' },

  // === BUS STANDS & TRANSIT ===
  { name: 'Thampanoor Bus Stand (KSRTC), Trivandrum', lat: 8.4870, lng: 76.9500, cat: 'transit' },
  { name: 'Kazhakootam Bus Terminal, Trivandrum', lat: 8.5700, lng: 76.8800, cat: 'transit' },
  { name: 'Kakkanad Bus Terminal, Kochi', lat: 10.0080, lng: 76.3410, cat: 'transit' },
  { name: 'Vyttila Mobility Hub, Kochi', lat: 9.9670, lng: 76.3180, cat: 'transit' },
  { name: 'Alappuzha Bus Station', lat: 9.4940, lng: 76.3400, cat: 'transit' },
  { name: 'Kozhikode Bus Stand (Palayam)', lat: 11.2580, lng: 75.7820, cat: 'transit' },
  { name: 'Thrissur Sakthan Thampuran Bus Stand', lat: 10.5280, lng: 76.2130, cat: 'transit' },
  { name: 'Kollam KSRTC Bus Station', lat: 8.8840, lng: 76.5980, cat: 'transit' },
  { name: 'Kottayam KSRTC Bus Station', lat: 9.5910, lng: 76.5240, cat: 'transit' },

  // === SHOPPING & COMMERCIAL ===
  { name: 'Lulu Mall, Kochi', lat: 10.0230, lng: 76.3260, cat: 'shopping' },
  { name: 'Oberon Mall, Kozhikode', lat: 11.2590, lng: 75.7840, cat: 'shopping' },
  { name: 'Forum Mall, Trivandrum', lat: 8.5110, lng: 76.9120, cat: 'shopping' },
  { name: 'RP Mall, Kozhikode', lat: 11.2550, lng: 75.7840, cat: 'shopping' },
  { name: 'LuLu Mall, Trivandrum', lat: 8.5180, lng: 76.9240, cat: 'shopping' },
];

export const PRICING_PLANS = [
  {
    id: 'hourly',
    title: 'Hourly Booking',
    price: '₹249',
    unit: 'hour',
    description: 'Perfect for shopping trips, meetings, or multiple stops.',
    features: ['Minimum 3 hours', 'Flexible extension', 'Free cancellation up to 1 hr', 'Overtime charged pro-rata']
  },
  {
    id: 'airport',
    title: 'Airport Transfer',
    price: '₹1,499',
    unit: 'fixed',
    description: 'Stress-free drops and pickups from local airports.',
    features: ['Flight tracking included', '60 mins complimentary waiting', 'Help with luggage', 'Meet & Greet service']
  },
  {
    id: 'outstation',
    title: 'Outstation Travel',
    price: '₹2,999',
    unit: 'day + fuel',
    description: 'Weekend getaways or long-distance highway travel.',
    features: ['12-hour shifts', 'Experienced highway chauffeurs', 'Driver food & lodging covered', 'One-way options available']
  },
  {
    id: 'night',
    title: 'Night Chauffeur',
    price: '₹399',
    unit: 'hour',
    description: 'Late night events, parties, and safe returns home.',
    features: ['Available 10 PM - 6 AM', 'Absolute discretion', 'SOS active support', 'Safe parking assistance']
  }
];

export const FAQS = [
  {
    q: 'How do you verify your drivers?',
    a: 'Every driver undergoes a rigorous background screening, including police verification, triple reference checks, driving tests, and regular random drug testing to ensure absolute safety and professionalism.'
  },
  {
    q: 'Whose car will the driver operate?',
    a: 'The driver will operate your vehicle. You must ensure the vehicle is registered, roadworthy, and has valid comprehensive or third-party insurance.'
  },
  {
    q: 'What is the fuel and toll policy?',
    a: 'All fuel, tolls, parking fees, and road taxes are the responsibility of the vehicle owner. If the driver pays for any toll during the trip, it will be added to your final invoice.'
  },
  {
    q: 'What happens in case of an accident?',
    a: 'Our drivers are fully vetted for safe driving, but in the rare event of an incident, we provide complementary secondary insurance coverage up to ₹50 Lakhs for damages. We also assist with insurance claims.'
  },
  {
    q: 'How does cancellation work?',
    a: 'You can cancel any booking for free up to 1 hour before the scheduled time. Cancellations made within 1 hour are subject to a ₹250 cancellation fee to compensate the driver.'
  }
];

export const SERVICES = [
  { id: 'srv_airport', name: 'Airport Transfers', icon: 'Plane' },
  { id: 'srv_hospital', name: 'Hospital Visits', icon: 'HeartPulse' },
  { id: 'srv_business', name: 'Business Meetings', icon: 'Briefcase' },
  { id: 'srv_shopping', name: 'Shopping Trips', icon: 'ShoppingBag' },
  { id: 'srv_events', name: 'Events & Parties', icon: 'Sparkles' },
  { id: 'srv_wedding', name: 'Wedding Chauffeur', icon: 'CalendarDays' },
  { id: 'srv_night', name: 'Night Safe Ride', icon: 'Moon' },
  { id: 'srv_senior', name: 'Senior Assistance', icon: 'Accessibility' },
  { id: 'srv_long', name: 'Long Distance Travel', icon: 'Compass' },
  { id: 'srv_corporate', name: 'Corporate Driver', icon: 'Building' }
];
