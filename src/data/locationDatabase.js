// ============================================================
// KERALA MASTER LOCATION DATABASE
// Production-ready for Driver-on-Demand Platform
// ============================================================

// ─── Helpers ───────────────────────────────────────────────

const $ = (obj) => Object.freeze(obj);

export const DISTRICTS = {
  kozhikode: $({ id: 'kl-04', name: 'Kozhikode', malayalam: 'കോഴിക്കോട്', shortName: 'Calicut', oldName: 'Calicut' }),
  thiruvananthapuram: $({ id: 'kl-01', name: 'Thiruvananthapuram', malayalam: 'തിരുവനന്തപുരം', shortName: 'Trivandrum', oldName: 'Trivandrum' }),
  kollam: $({ id: 'kl-02', name: 'Kollam', malayalam: 'കൊല്ലം', shortName: 'Quilon', oldName: 'Quilon' }),
  pathanamthitta: $({ id: 'kl-03', name: 'Pathanamthitta', malayalam: 'പത്തനംതിട്ട', shortName: 'Pathanamthitta' }),
  alappuzha: $({ id: 'kl-05', name: 'Alappuzha', malayalam: 'ആലപ്പുഴ', shortName: 'Alleppey', oldName: 'Alleppey' }),
  kottayam: $({ id: 'kl-06', name: 'Kottayam', malayalam: 'കോട്ടയം', shortName: 'Kottayam' }),
  idukki: $({ id: 'kl-07', name: 'Idukki', malayalam: 'ഇടുക്കി', shortName: 'Idukki' }),
  ernakulam: $({ id: 'kl-08', name: 'Ernakulam', malayalam: 'എറണാകുളം', shortName: 'Kochi', oldName: 'Cochin' }),
  thrissur: $({ id: 'kl-09', name: 'Thrissur', malayalam: 'തൃശൂർ', shortName: 'Trichur', oldName: 'Trichur' }),
  palakkad: $({ id: 'kl-10', name: 'Palakkad', malayalam: 'പാലക്കാട്', shortName: 'Palghat', oldName: 'Palghat' }),
  malappuram: $({ id: 'kl-11', name: 'Malappuram', malayalam: 'മലപ്പുറം', shortName: 'Malappuram' }),
  wayanad: $({ id: 'kl-12', name: 'Wayanad', malayalam: 'വയനാട്', shortName: 'Wayanad' }),
  kannur: $({ id: 'kl-13', name: 'Kannur', malayalam: 'കണ്ണൂർ', shortName: 'Cannanore', oldName: 'Cannanore' }),
  kasargod: $({ id: 'kl-14', name: 'Kasaragod', malayalam: 'കാസർഗോഡ്', shortName: 'Kasaragod' }),
};

// ─── KOZHIKODE DISTRICT ─────────────────────────────────

const KOZHIKODE_TALUKS = [
  { id: 'kozhikode-t1', name: 'Kozhikode', malayalam: 'കോഴിക്കോട്', district: 'Kozhikode' },
  { id: 'kozhikode-t2', name: 'Vadakara', malayalam: 'വടകര', district: 'Kozhikode' },
  { id: 'kozhikode-t3', name: 'Koyilandy', malayalam: 'കൊയിലാണ്ടി', district: 'Kozhikode' },
  { id: 'kozhikode-t4', name: 'Thamarassery', malayalam: 'താമരശ്ശേരി', district: 'Kozhikode' },
  { id: 'kozhikode-t5', name: 'Kunnamangalam', malayalam: 'കുന്നമംഗലം', district: 'Kozhikode' },
];

// ─── CATEGORY TAXONOMY ─────────────────────────────────

export const CATEGORIES = {
  hospital: { id: 'cat-hos', name: 'Hospital', icon: '🏥' },
  clinic: { id: 'cat-cln', name: 'Clinic', icon: '🩺' },
  medicalCollege: { id: 'cat-mc', name: 'Medical College', icon: '🏛️' },
  primaryHealthCentre: { id: 'cat-phc', name: 'Primary Health Centre', icon: '🏥' },
  restaurant: { id: 'cat-rest', name: 'Restaurant', icon: '🍽️' },
  cafe: { id: 'cat-cafe', name: 'Cafe', icon: '☕' },
  bakery: { id: 'cat-bak', name: 'Bakery', icon: '🥐' },
  hotel: { id: 'cat-hot', name: 'Hotel', icon: '🏨' },
  resort: { id: 'cat-res', name: 'Resort', icon: '🏖️' },
  shoppingMall: { id: 'cat-mall', name: 'Shopping Mall', icon: '🛍️' },
  supermarket: { id: 'cat-sup', name: 'Supermarket', icon: '🛒' },
  textile: { id: 'cat-txt', name: 'Textile', icon: '👗' },
  jewellery: { id: 'cat-jwl', name: 'Jewellery', icon: '💍' },
  bank: { id: 'cat-bank', name: 'Bank', icon: '🏦' },
  atm: { id: 'cat-atm', name: 'ATM', icon: '🏧' },
  petrolPump: { id: 'cat-pp', name: 'Petrol Pump', icon: '⛽' },
  evCharging: { id: 'cat-ev', name: 'EV Charging Station', icon: '🔌' },
  busStand: { id: 'cat-bus', name: 'Bus Stand', icon: '🚌' },
  busStop: { id: 'cat-bstop', name: 'Bus Stop', icon: '🚏' },
  railwayStation: { id: 'cat-rail', name: 'Railway Station', icon: '🚂' },
  airport: { id: 'cat-air', name: 'Airport', icon: '✈️' },
  autoStand: { id: 'cat-auto', name: 'Auto Stand', icon: '🛺' },
  taxiStand: { id: 'cat-taxi', name: 'Taxi Stand', icon: '🚕' },
  school: { id: 'cat-sch', name: 'School', icon: '🏫' },
  college: { id: 'cat-col', name: 'College', icon: '🎓' },
  university: { id: 'cat-uni', name: 'University', icon: '🏛️' },
  tuitionCentre: { id: 'cat-tuition', name: 'Tuition Centre', icon: '📚' },
  govtOffice: { id: 'cat-govt', name: 'Government Office', icon: '🏢' },
  panchayatOffice: { id: 'cat-panch', name: 'Panchayat Office', icon: '🏘️' },
  policeStation: { id: 'cat-police', name: 'Police Station', icon: '🚔' },
  fireStation: { id: 'cat-fire', name: 'Fire Station', icon: '🚒' },
  court: { id: 'cat-court', name: 'Court', icon: '⚖️' },
  temple: { id: 'cat-temple', name: 'Temple', icon: '🛕' },
  mosque: { id: 'cat-mosque', name: 'Mosque', icon: '🕌' },
  church: { id: 'cat-church', name: 'Church', icon: '⛪' },
  auditorium: { id: 'cat-aud', name: 'Auditorium', icon: '🎭' },
  weddingHall: { id: 'cat-wed', name: 'Wedding Hall', icon: '💒' },
  conventionCentre: { id: 'cat-conv', name: 'Convention Centre', icon: '🏟️' },
  cinema: { id: 'cat-cinema', name: 'Cinema Theatre', icon: '🎬' },
  gym: { id: 'cat-gym', name: 'Gym', icon: '💪' },
  park: { id: 'cat-park', name: 'Park', icon: '🌳' },
  beach: { id: 'cat-beach', name: 'Beach', icon: '🏖️' },
  touristAttraction: { id: 'cat-tourist', name: 'Tourist Attraction', icon: '📍' },
  apartment: { id: 'cat-apt', name: 'Apartment', icon: '🏢' },
  residentialArea: { id: 'cat-resarea', name: 'Residential Area', icon: '🏘️' },
  itPark: { id: 'cat-it', name: 'IT Park', icon: '💻' },
  industrialArea: { id: 'cat-ind', name: 'Industrial Area', icon: '🏭' },
  harbour: { id: 'cat-harbour', name: 'Harbour', icon: '⚓' },
  port: { id: 'cat-port', name: 'Port', icon: '🚢' },
  market: { id: 'cat-market', name: 'Market', icon: '🏪' },
  bridge: { id: 'cat-bridge', name: 'Bridge', icon: '🌉' },
  junction: { id: 'cat-junction', name: 'Junction', icon: '🚦' },
  roundabout: { id: 'cat-round', name: 'Roundabout', icon: '🔄' },
  stadium: { id: 'cat-stadium', name: 'Stadium', icon: '🏟️' },
  sportsComplex: { id: 'cat-sports', name: 'Sports Complex', icon: '🏋️' },
  village: { id: 'cat-village', name: 'Village', icon: '🏘️' },
  town: { id: 'cat-town', name: 'Town', icon: '🏙️' },
  city: { id: 'cat-city', name: 'City', icon: '🌆' },
};

// ─── ALL LOCATIONS ─────────────────────────────────────

// Each location:
// {
//   id, name, malayalam, cat, subcat,
//   district, taluk, municipality, panchayat, village,
//   address, pincode, lat, lng,
//   landmark, keywords: [], status
// }

const LOCATIONS = [];

let locId = 0;
const uid = () => { locId++; return `loc-${String(locId).padStart(5, '0')}`; };

const add = (entry) => {
  LOCATIONS.push($({ id: uid(), status: 'active', ...entry }));
};

// ═══════════════════════════════════════════════════════════
// KOZHIKODE DISTRICT — COMPREHENSIVE DATA
// ═══════════════════════════════════════════════════════════

// ─── CITIES & TOWNS ───

add({ name: 'Kozhikode', malayalam: 'കോഴിക്കോട്', cat: 'city', subcat: 'Corporation City', district: 'Kozhikode', taluk: 'Kozhikode', lat: 11.2588, lng: 75.7804, pincode: '673001', keywords: ['calicut', 'kozhikod', 'calicut city'] });
add({ name: 'Vadakara', malayalam: 'വടകര', cat: 'town', subcat: 'Municipality', district: 'Kozhikode', taluk: 'Vadakara', lat: 11.5950, lng: 75.5800, pincode: '673101', keywords: ['vatakara', 'badagara', 'vadakara town'] });
add({ name: 'Koyilandy', malayalam: 'കൊയിലാണ്ടി', cat: 'town', subcat: 'Municipality', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.4380, lng: 75.6950, pincode: '673305', keywords: ['quiland', 'koyilandi', 'koilandy'] });
add({ name: 'Nadapuram', malayalam: 'നാദാപുരം', cat: 'town', subcat: 'Census Town', district: 'Kozhikode', taluk: 'Vadakara', lat: 11.5500, lng: 75.6800, pincode: '673504', keywords: ['nadapuram town'] });
add({ name: 'Kallachi', malayalam: 'കല്ലാച്ചി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Vadakara', lat: 11.5600, lng: 75.6600, pincode: '673506', keywords: ['kallachi town'] });
add({ name: 'Kuttiady', malayalam: 'കുറ്റ്യാടി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Vadakara', lat: 11.6500, lng: 75.7500, pincode: '673508', keywords: ['kuttiyadi', 'kutyadi'] });
add({ name: 'Perambra', malayalam: 'പേരാമ്പ്ര', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.4200, lng: 75.7400, pincode: '673525', keywords: ['perambra town'] });
add({ name: 'Balussery', malayalam: 'ബാലുശ്ശേരി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.4100, lng: 75.8300, pincode: '673612', keywords: ['balussery town', 'ballussery'] });
add({ name: 'Payyoli', malayalam: 'പയ്യോളി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.5200, lng: 75.6300, pincode: '673522', keywords: ['payyoli town'] });
add({ name: 'Thamarassery', malayalam: 'താമരശ്ശേരി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Thamarassery', lat: 11.4050, lng: 75.9400, pincode: '673573', keywords: ['thamarassery town'] });
add({ name: 'Ramanattukara', malayalam: 'രാമനാട്ടുകര', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Kozhikode', lat: 11.1820, lng: 75.8400, pincode: '673633', keywords: ['ramanattukara town'] });
add({ name: 'Feroke', malayalam: 'ഫറോക്ക്', cat: 'town', subcat: 'Municipality', district: 'Kozhikode', taluk: 'Kozhikode', lat: 11.1850, lng: 75.8500, pincode: '673631', keywords: ['farook', 'feroke town'] });
add({ name: 'Beypore', malayalam: 'ബേപ്പൂർ', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Kozhikode', lat: 11.1830, lng: 75.8040, pincode: '673015', keywords: ['beypore town', 'beypur'] });
add({ name: 'Mukkam', malayalam: 'മുക്കം', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Thamarassery', lat: 11.3200, lng: 75.9600, pincode: '673602', keywords: ['mukkam town'] });
add({ name: 'Atholi', malayalam: 'അത്തോളി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.4000, lng: 75.7000, pincode: '673315', keywords: ['atholi town'] });
add({ name: 'Meppayur', malayalam: 'മേപ്പയൂർ', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.5300, lng: 75.7200, pincode: '673517', keywords: ['meppayur town'] });
add({ name: 'Orkattery', malayalam: 'ഓർക്കാട്ടേരി', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Koyilandy', lat: 11.4500, lng: 75.7600, pincode: '673501', keywords: ['orkatteri town'] });
add({ name: 'Chombala', malayalam: 'ചോമ്പാല', cat: 'town', subcat: 'Town', district: 'Kozhikode', taluk: 'Vadakara', lat: 11.6100, lng: 75.5900, pincode: '673122', keywords: ['chombala town'] });

// ─── VADAKARA TALUK — VILLAGES & LOCALITIES ───

const vadakaraVillages = [
  ['Ayancheri', 'അയഞ്ചേരി', 11.5800, 75.6400, '673541'],
  ['Azhiyur', 'അഴിയൂർ', 11.6100, 75.5700, '673309'],
  ['Chekkiad', 'ചെക്യാട്', 11.5500, 75.6000, '673531'],
  ['Chorode', 'ചോറോട്', 11.6100, 75.5500, '673106'],
  ['Edacheri', 'എടച്ചേരി', 11.5700, 75.6100, '673502'],
  ['Eramala', 'എരമാല', 11.5400, 75.5600, '673103'],
  ['Kavilumpara', 'കാവിലുംപാറ', 11.5300, 75.7200, '673513'],
  ['Kayakkodi', 'കായക്കൊടി', 11.5000, 75.7000, '673511'],
  ['Kottappally', 'കോട്ടപ്പള്ളി', 11.6300, 75.6200, '673528'],
  ['Kunnummal', 'കുന്നുമ്മൽ', 11.5000, 75.6600, '673508'],
  ['Maniyur', 'മണിയൂർ', 11.6500, 75.6800, '673523'],
  ['Maruthonkara', 'മരുതോൻകര', 11.4800, 75.7300, '673513'],
  ['Narippatta', 'നരിപ്പറ്റ', 11.5200, 75.7400, '673507'],
  ['Onchiyam', 'ഓഞ്ചിയം', 11.6000, 75.6200, '673541'],
  ['Palayad', 'പാലയാട്', 11.6400, 75.6500, '673523'],
  ['Purameri', 'പുറമേരി', 11.5800, 75.6500, '673503'],
  ['Thinoor', 'തിനൂർ', 11.4700, 75.7700, '673507'],
  ['Thiruvallur', 'തിരുവള്ളൂർ', 11.6200, 75.6800, '673541'],
  ['Thuneri', 'തുനേരി', 11.4800, 75.6200, '673505'],
  ['Valayam', 'വളയം', 11.6600, 75.7000, '673517'],
  ['Vanimel', 'വാണിമേൽ', 11.4400, 75.6600, '673506'],
  ['Velom', 'വേളം', 11.5200, 75.7600, '673508'],
  ['Vilangad', 'വിലങ്ങാട്', 11.4300, 75.7000, '673506'],
  ['Villiappally', 'വില്ല്യാപ്പള്ളി', 11.6200, 75.5900, '673542'],
];
vadakaraVillages.forEach(([name, mal, lat, lng, pin]) => {
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: 'village', subcat: 'Village', district: 'Kozhikode', taluk: 'Vadakara', village: name, lat, lng, pincode: pin, keywords: [name.toLowerCase()] });
});

// Vadakara Town — Localities & Wards
const vadakaraLocalities = [
  ['Edodi', 'എടോടി', 11.5930, 75.5850, '673101'],
  ['Nut Street', 'നട്ട് സ്ട്രീറ്റ്', 11.5960, 75.5820, '673101'],
  ['Peringadi Vayalil', 'പെരിങ്ങാടി വയലിൽ', 11.6000, 75.5750, '673103'],
  ['Thazheyangadi', 'താഴെയങ്ങാടി', 11.5980, 75.5780, '673101'],
  ['Iringal', 'ഇരിങ്ങൽ', 11.6300, 75.5700, '673103'],
  ['Kalleri', 'കല്ലേരി', 11.6500, 75.6000, '673542'],
  ['Mokavoor', 'മോകവൂർ', 11.5970, 75.5700, '673105'],
  ['Eranhikkal', 'എരണിക്കൽ', 11.6000, 75.5650, '673105'],
  ['Kappakkal', 'കാപ്പക്കൽ', 11.5950, 75.5750, '673103'],
  ['Puthiyangadi', 'പുതിയങ്ങാടി', 11.5900, 75.5900, '673101'],
];
vadakaraLocalities.forEach(([name, mal, lat, lng, pin]) => {
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: 'residentialArea', subcat: 'Locality', district: 'Kozhikode', taluk: 'Vadakara', village: 'Vadakara', lat, lng, pincode: pin, keywords: [name.toLowerCase()] });
});

// ─── VADAKARA — HOSPITALS & MEDICAL ───

const vadakaraHospitals = [
  ['Baby Memorial Hospital (BMH)', 'ബേബി മെമ്മോറിയൽ ആശുപത്രി', 'Hospital', 'Chorode', 11.6080, 75.5520, '673106', ['bmh vadakara', 'baby memorial vadakara', 'bmh']],
  ['Vadakara Co-operative Hospital', 'വടകര കോ-ഓപ്പറേറ്റീവ് ആശുപത്രി', 'Hospital', 'Vadakara', 11.5950, 75.5780, '673101', ['co operative hospital', 'sahakarana hospital']],
  ['Ceeyam Hospital', 'സിയാം ആശുപത്രി', 'Hospital', 'Edodi', 11.5920, 75.5870, '673101', ['ceeyam']],
  ['Asha Hospital', 'ആശ ആശുപത്രി', 'Hospital', 'Nut Street', 11.5970, 75.5800, '673101', ['asha hospital']],
  ['Govt Taluk Hospital Vadakara', 'ഗവ. താലൂക്ക് ആശുപത്രി', 'Hospital', 'Vadakara', 11.5940, 75.5800, '673101', ['taluk hospital', 'government hospital vadakara']],
  ['Vadakara Ayurveda Hospital', 'വടകര ആയുർവേദ ആശുപത്രി', 'Hospital', 'Vadakara', 11.5960, 75.5760, '673101', ['ayurvedic']],
  ['Dentart Multispeciality Dental Clinic', 'ഡെന്റാർട്ട് ദന്തൽ ക്ലിനിക്', 'Clinic', 'Edodi', 11.5930, 75.5840, '673101', ['dentist vadakara', 'dental clinic']],
  ['Santhi Nursing Home', 'ശാന്തി നഴ്സിംഗ് ഹോം', 'Clinic', 'Vadakara', 11.5900, 75.5820, '673101', ['santhi nursing']],
  ['PHC Chorode', 'പി.എച്ച്.സി. ചോറോട്', 'Primary Health Centre', 'Chorode', 11.6120, 75.5480, '673106', ['primary health centre chorode']],
  ['PHC Azhiyur', 'പി.എച്ച്.സി. അഴിയൂർ', 'Primary Health Centre', 'Azhiyur', 11.6150, 75.5650, '673309', ['primary health centre azhiyur']],
];
vadakaraHospitals.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: cat === 'Clinic' ? 'clinic' : cat === 'Primary Health Centre' ? 'primaryHealthCentre' : 'hospital', subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw.concat([name.toLowerCase().split('(')[0].trim().toLowerCase()]) });
});

// ─── VADAKARA — THEATRES & CINEMAS ───

const vadakaraTheatres = [
  ['Kirthi Mudra 4K RGB Laser Dolby Atmos', 'കീർത്തി മുദ്ര', 'Cinema Theatre', 'Edodi', 11.5927, 75.5903, '673101', ['keerthi mudra', 'kirthi mudra theatre', 'cinema vadakara']],
  ['Kerala Coir Theatre', 'കേരള കോയർ തിയേറ്റർ', 'Cinema Theatre', 'Market Rd', 11.5940, 75.5790, '673101', ['kerala coir', 'coir theatre']],
  ['Jayabharath Theatre', 'ജയഭാരത് തിയേറ്റർ', 'Cinema Theatre', 'Main Rd', 11.5950, 75.5770, '673101', ['jayabharath']],
  ['Ashok Theatre (CNC Film House)', 'അശോക് തിയേറ്റർ', 'Cinema Theatre', 'Puthiyappu', 11.5930, 75.5810, '673101', ['cnc film house', 'ashok theatre']],
];
vadakaraTheatres.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: 'cinema', subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — BEACHES & TOURIST ───

const vadakaraBeaches = [
  ['Vadakara Sand Banks Beach', 'വടകര സാൻഡ് ബാങ്ക് ബീച്ച്', 'Beach', 'Peringadi Vayalil', 11.6000, 75.5730, '673103', ['sand banks vadakara', 'vadakara beach', 'sandbank']],
  ['Vadakara Beach and Park', 'വടകര ബീച്ച് ആൻഡ് പാർക്ക്', 'Beach', 'Thazheyangadi', 11.5990, 75.5760, '673101', ['vadakara beach park']],
  ['Chombal Harbour', 'ചോമ്പാൽ ഹാർബർ', 'Harbour', 'Chombala', 11.6150, 75.5850, '673122', ['chombala harbour', 'chombal']],
  ['Kalleri Canal & Viewpoint', 'കല്ലേരി കനാൽ', 'Tourist Attraction', 'Kalleri', 11.6520, 75.6020, '673542', ['kalleri', 'kalleri canal']],
];
vadakaraBeaches.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Beach' ? 'beach' : cat === 'Harbour' ? 'harbour' : 'touristAttraction';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — WEDDING HALLS & AUDITORIUMS ───

const vadakaraWeddingHalls = [
  ['Athafy Auditorium', 'അത്താഫി ഓഡിറ്റോറിയം', 'Wedding Hall', 'Vadakara', 11.5910, 75.5830, '673101', ['athafy']],
  ['Peruma Auditorium', 'പെരുമ ഓഡിറ്റോറിയം', 'Wedding Hall', 'IPC Road, Payyoli', 11.5200, 75.6300, '673522', ['peruma']],
  ['Kalleri Auditorium', 'കല്ലേരി ഓഡിറ്റോറിയം', 'Wedding Hall', 'Kalleri', 11.6500, 75.5980, '673542', ['kalleri auditorium']],
  ['Shadhi Mahal Auditorium', 'ശാദി മഹൽ ഓഡിറ്റോറിയം', 'Wedding Hall', 'Vadakara', 11.5920, 75.5800, '673101', ['shadhi mahal', 'shadi mahal']],
  ['Puzhayoram Auditorium', 'പുഴയോരം ഓഡിറ്റോറിയം', 'Wedding Hall', 'Thiruvallur', 11.6200, 75.6820, '673541', ['puzhayoram']],
  ['Family Wedding Centre', 'ഫാമിലി വെഡ്ഡിംഗ് സെന്റർ', 'Wedding Hall', 'Vadakara', 11.5970, 75.5790, '673101', ['family wedding']],
  ['Dazzle Banquet Hall', 'ഡാസിൽ ബാങ്ക്വറ്റ് ഹാൾ', 'Wedding Hall', 'Vadakara', 11.5940, 75.5830, '673101', ['dazzle banquet']],
  ['Lakshmi Hall', 'ലക്ഷ്മി ഹാൾ', 'Wedding Hall', 'Vadakara', 11.5960, 75.5770, '673101', ['lakshmi hall']],
  ['Krishnakripa Kalyanamandapam', 'കൃഷ്ണകൃപ കല്യാണമണ്ഡപം', 'Wedding Hall', 'Vadakara', 11.5950, 75.5810, '673101', ['krishnakripa']],
  ['Sree Narayana Hall', 'ശ്രീ നാരായണ ഹാൾ', 'Wedding Hall', 'Vadakara', 11.5930, 75.5780, '673101', ['sree narayana hall']],
  ['Thejas Mini Convention Hall', 'തേജസ് മിനി കൺവെൻഷൻ ഹാൾ', 'Convention Centre', 'Vadakara', 11.5945, 75.5795, '673101', ['thejas convention']],
  ['Bello Bee Events & Convention Centre', 'ബെല്ലോ ബീ ഇവന്റ്സ്', 'Convention Centre', 'Vadakara', 11.5915, 75.5840, '673101', ['bello bee']],
];
vadakaraWeddingHalls.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Convention Centre' ? 'conventionCentre' : 'weddingHall';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — EDUCATIONAL INSTITUTIONS ───

const vadakaraSchools = [
  ['Govt Higher Secondary School, Nadakkuthazhe', 'ഗവ. ഹയർ സെക്കൻഡറി സ്കൂൾ', 'School', 'Nadakkuthazhe', 11.6050, 75.5750, '673101', ['ghss nadakkuthazhe']],
  ['St. Mary\'s Higher Secondary School', 'സെന്റ് മേരീസ് എച്ച്.എസ്.എസ്', 'School', 'Edodi', 11.5900, 75.5870, '673101', ['st marys vadakara']],
  ['Govt Vocational Higher Secondary School', 'ഗവ. വൊക്കേഷണൽ എച്ച്.എസ്.എസ്', 'School', 'Vadakara', 11.5920, 75.5760, '673101', ['gvhss vadakara']],
  ['Maniyur Higher Secondary School', 'മണിയൂർ എച്ച്.എസ്.എസ്', 'School', 'Maniyur', 11.6480, 75.6760, '673523', ['maniyur school']],
  ['Azhiyur Higher Secondary School', 'അഴിയൂർ എച്ച്.എസ്.എസ്', 'School', 'Azhiyur', 11.6140, 75.5680, '673309', ['azhiyur school']],
  ['Chorode Higher Secondary School', 'ചോറോട് എച്ച്.എസ്.എസ്', 'School', 'Chorode', 11.6100, 75.5500, '673106', ['chorode school']],
  ['Vadakara Govt College', 'വടകര ഗവ. കോളേജ്', 'College', 'Vadakara', 11.5880, 75.5750, '673101', ['vadakara college']],
];
vadakaraSchools.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'College' ? 'college' : 'school';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — BANKS, ATMs, PETROL PUMPS ───

const vadakaraServices = [
  ['SBI Vadakara Branch', 'എസ്.ബി.ഐ വടകര', 'Bank', 'Edodi', 11.5935, 75.5850, '673101', ['state bank of india', 'sbi vadakara']],
  ['Canara Bank Vadakara', 'കനറാ ബാങ്ക് വടകര', 'Bank', 'Vadakara', 11.5940, 75.5820, '673101', ['canara bank']],
  ['Federal Bank Vadakara', 'ഫെഡറൽ ബാങ്ക് വടകര', 'Bank', 'Vadakara', 11.5950, 75.5800, '673101', ['federal bank']],
  ['South Indian Bank Vadakara', 'സൗത്ത് ഇന്ത്യൻ ബാങ്ക്', 'Bank', 'Vadakara', 11.5960, 75.5790, '673101', ['south indian bank']],
  ['ICICI Bank Vadakara', 'ഐ.സി.ഐ.സി.ഐ ബാങ്ക്', 'Bank', 'Edodi', 11.5930, 75.5890, '673101', ['icici bank']],
  ['Axis Bank Vadakara', 'ആക്സിസ് ബാങ്ക്', 'Bank', 'Vadakara', 11.5940, 75.5810, '673101', ['axis bank']],
  ['SBI ATM Edodi', 'എസ്.ബി.ഐ എ.ടി.എം', 'ATM', 'Edodi', 11.5930, 75.5860, '673101', ['sbi atm']],
  ['Indian Oil Petrol Pump, Edodi', 'ഇന്ത്യൻ ഓയിൽ പെട്രോൾ പമ്പ്', 'Petrol Pump', 'Edodi', 11.5920, 75.5880, '673101', ['petrol pump edodi']],
  ['HP Petrol Pump, Vadakara', 'എച്ച്.പി പെട്രോൾ പമ്പ്', 'Petrol Pump', 'Vadakara', 11.5960, 75.5780, '673101', ['hp petrol vadakara']],
  ['BPCL Petrol Pump, Chorode', 'ബി.പി.സി.എൽ പെട്രോൾ പമ്പ്', 'Petrol Pump', 'Chorode', 11.6060, 75.5550, '673106', ['bpcl chorode']],
];
vadakaraServices.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'ATM' ? 'atm' : cat === 'Petrol Pump' ? 'petrolPump' : 'bank';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — TRANSIT HUBS ───

const vadakaraTransit = [
  ['Vadakara Railway Station', 'വടകര റെയിൽവേ സ്റ്റേഷൻ', 'Railway Station', 'Vadakara', 11.5870, 75.5900, '673101', ['vadakara railway', 'vadakara station']],
  ['Vadakara New Bus Stand', 'വടകര പുതിയ ബസ് സ്റ്റാൻഡ്', 'Bus Stand', 'Vadakara', 11.5950, 75.5790, '673101', ['vadakara bus stand', 'new bus stand']],
  ['Vadakara Old Bus Stand', 'വടകര പഴയ ബസ് സ്റ്റാൻഡ്', 'Bus Stand', 'Vadakara', 11.5930, 75.5770, '673101', ['old bus stand vadakara']],
  ['Edodi Bus Stop', 'എടോടി ബസ് സ്റ്റോപ്പ്', 'Bus Stop', 'Edodi', 11.5935, 75.5860, '673101', ['edodi stop']],
  ['Chorode Bus Stop', 'ചോറോട് ബസ് സ്റ്റോപ്പ്', 'Bus Stop', 'Chorode', 11.6100, 75.5520, '673106', ['chorode stop']],
];
vadakaraTransit.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Railway Station' ? 'railwayStation' : cat === 'Bus Stand' ? 'busStand' : 'busStop';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — TEMPLES & RELIGIOUS ───

const vadakaraReligious = [
  ['Lokanarkavu Temple', 'ലോകനാർകാവ് ക്ഷേത്രം', 'Temple', 'Vadakara', 11.6150, 75.5950, '673103', ['lokanarkavu', 'lokanarkav']],
  ['Thacholi Thiruvambadi Temple', 'തച്ചോളി തിരുവമ്പാടി ക്ഷേത്രം', 'Temple', 'Vadakara', 11.5970, 75.5730, '673101', ['thacholi temple', 'othanan temple']],
  ['Kottakkal Temple', 'കോട്ടക്കൽ ക്ഷേത്രം', 'Temple', 'Vadakara', 11.5980, 75.5710, '673101', ['kottakkal temple']],
  ['Juma Masjid Vadakara', 'വടകര ജുമാ മസ്ജിദ്', 'Mosque', 'Vadakara', 11.5950, 75.5760, '673101', ['vadakara juma masjid']],
  ['St. George Church, Chorode', 'സെന്റ് ജോർജ് പള്ളി, ചോറോട്', 'Church', 'Chorode', 11.6090, 75.5510, '673106', ['st george chorode']],
];
vadakaraReligious.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Mosque' ? 'mosque' : cat === 'Church' ? 'church' : 'temple';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — POLICE, FIRE, GOVT ───

const vadakaraGovt = [
  ['Vadakara Police Station', 'വടകര പോലീസ് സ്റ്റേഷൻ', 'Police Station', 'Vadakara', 11.5940, 75.5760, '673101', ['vadakara police', 'police station vadakara']],
  ['Vadakara Fire Station', 'വടകര ഫയർ സ്റ്റേഷൻ', 'Fire Station', 'Vadakara', 11.5930, 75.5750, '673101', ['vadakara fire']],
  ['Vadakara Municipality Office', 'വടകര മുൻസിപ്പാലിറ്റി ഓഫീസ്', 'Government Office', 'Vadakara', 11.5960, 75.5780, '673101', ['municipality vadakara']],
  ['Vadakara Taluk Office', 'വടകര താലൂക്ക് ഓഫീസ്', 'Government Office', 'Vadakara', 11.5950, 75.5770, '673101', ['taluk office vadakara']],
  ['Chorode Panchayat Office', 'ചോറോട് പഞ്ചായത്ത് ഓഫീസ്', 'Government Office', 'Chorode', 11.6110, 75.5490, '673106', ['chorode panchayat']],
  ['Court Complex Vadakara', 'വടകര കോടതി സമുച്ചയം', 'Court', 'Vadakara', 11.5920, 75.5750, '673101', ['vadakara court', 'munsiff court']],
];
vadakaraGovt.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Police Station' ? 'policeStation' : cat === 'Fire Station' ? 'fireStation' : cat === 'Court' ? 'court' : 'govtOffice';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── VADAKARA — SHOPS & COMMERCIAL ───

const vadakaraShops = [
  ['Vadakara Market', 'വടകര മാർക്കറ്റ്', 'Market', 'Vadakara', 11.5950, 75.5760, '673101', ['vadakara market', 'santhamarket']],
  ['Vadakara Textile Complex', 'വടകര ടെക്സ്റ്റൈൽ കോംപ്ലക്സ്', 'Market', 'Vadakara', 11.5960, 75.5770, '673101', ['textile vadakara']],
  ['Super Market Vadakara', 'സൂപ്പർ മാർക്കറ്റ് വടകര', 'Supermarket', 'Vadakara', 11.5955, 75.5775, '673101', ['supermarket vadakara']],
];
vadakaraShops.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Supermarket' ? 'supermarket' : 'market';
  add({ name: `${name}, Vadakara`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Vadakara', village, lat, lng, pincode: pin, keywords: kw });
});

// ═══════════════════════════════════════════════════════════
// KOZHIKODE TALUK — MAJOR AREAS & POIs
// ═══════════════════════════════════════════════════════════

// ─── KOZHIKODE CITY — LOCALITIES ───

const kkdLocalities = [
  ['Kozhikode Beach Area', 'കോഴിക്കോട് ബീച്ച്', 'Beach', '11.2540', '75.7720', '673001'],
  ['Kozhikode Medical College Area', 'മെഡിക്കൽ കോളേജ്', 'Hospital', '11.3080', '75.9000', '673008'],
  ['Kunnamangalam', 'കുന്നമംഗലം', 'Town', '11.3040', '75.8780', '673571'],
  ['Mavoor Road', 'മാവൂർ റോഡ്', 'Residential Area', '11.2650', '75.7900', '673001'],
  ['Nadakkavu', 'നാടക്കാവ്', 'Residential Area', '11.2780', '75.7840', '673001'],
  ['Kallai', 'കല്ലായി', 'Residential Area', '11.2430', '75.7820', '673003'],
  ['Puthiyara', 'പുതിയറ', 'Residential Area', '11.2680', '75.7780', '673004'],
  ['Kottooli', 'കൊട്ടൂളി', 'Residential Area', '11.2750', '75.7950', '673004'],
  ['Chevayur', 'ചെവായൂർ', 'Residential Area', '11.2900', '75.8000', '673004'],
  ['West Hill', 'വെസ്റ്റ് ഹിൽ', 'Residential Area', '11.2850', '75.7620', '673005'],
  ['Eranhipalam', 'എരഞ്ഞിപ്പാലം', 'Residential Area', '11.2720', '75.8100', '673006'],
  ['Panniyankara', 'പാണ്ടിക്കര', 'Residential Area', '11.2500', '75.7900', '673003'],
  ['Vellimadukunnu', 'വെള്ളിമാടുകുന്ന്', 'Residential Area', '11.2950', '75.8200', '673012'],
  ['Pantheerankavu', 'പന്തീരാങ്കാവ്', 'Residential Area', '11.2800', '75.8400', '673019'],
  ['Vengeri', 'വെങ്ങേരി', 'Residential Area', '11.3100', '75.8800', '673008'],
  ['Kakkodi', 'കാക്കോടി', 'Residential Area', '11.3200', '75.8600', '673611'],
  ['Malaparamba', 'മാലാപ്പറമ്പ', 'Residential Area', '11.2870', '75.7700', '673005'],
  ['Poothampara', 'പൂതംപാറ', 'Residential Area', '11.2930', '75.8450', '673004'],
  ['Palayam, Kozhikode', 'പാളയം', 'Residential Area', '11.2580', '75.7950', '673002'],
  ['Chalappuram', 'ചാലപ്പുറം', 'Residential Area', '11.2440', '75.7880', '673002'],
  ['Meenchantha', 'മീഞ്ചന്ത', 'Residential Area', '11.2600', '75.7900', '673001'],
  ['Thiruthiyad', 'തിരുത്തിയാട്', 'Residential Area', '11.2770', '75.8030', '673004'],
  ['Mankavu', 'മാങ്കാവ്', 'Residential Area', '11.2660', '75.8100', '673004'],
  ['Chevarambalam', 'ചേവായമ്പലം', 'Residential Area', '11.3020', '75.8300', '673004'],
  ['Kuthiravattam', 'കുതിരവട്ടം', 'Residential Area', '11.2950', '75.7850', '673005'],
  ['Edakkad', 'എടക്കാട്', 'Residential Area', '11.3050', '75.7600', '673005'],
  ['Vellayil', 'വെള്ളയിൽ', 'Residential Area', '11.2640', '75.7680', '673005'],
  ['Nallalam', 'നല്ലളം', 'Residential Area', '11.2280', '75.8300', '673027'],
  ['Puthur, Kozhikode', 'പുത്തൂർ', 'Residential Area', '11.2150', '75.8100', '673004'],
  ['Eranhikkal', 'എരണിക്കൽ', 'Residential Area', '11.2420', '75.8040', '673003'],
  ['Beypore', 'ബേപ്പൂർ', 'Town', '11.1830', '75.8040', '673015'],
  ['Feroke', 'ഫറോക്ക്', 'Town', '11.1850', '75.8500', '673631'],
  ['Ramanattukara', 'രാമനാട്ടുകര', 'Town', '11.1820', '75.8400', '673633'],
];
kkdLocalities.forEach(([name, mal, cat, lat, lng, pin]) => {
  const catKey = cat === 'Beach' ? 'beach' : cat === 'Hospital' ? 'hospital' : cat === 'Town' ? 'town' : 'residentialArea';
  add({ name: `${name}, Kozhikode`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', lat: parseFloat(lat), lng: parseFloat(lng), pincode: pin, keywords: [name.toLowerCase().split(',')[0].trim()] });
});

// ─── KOZHIKODE CITY — HOSPITALS ───

const kkdHospitals = [
  ['Kozhikode Medical College', 'കോഴിക്കോട് മെഡിക്കൽ കോളേജ്', 'Medical College', 'Medical College Area', 11.3100, 75.8950, '673008', ['medical college hospital', 'mch calicut', 'govt medical college']],
  ['Baby Memorial Hospital', 'ബേബി മെമ്മോറിയൽ ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2600, 75.7780, '673004', ['bmh calicut']],
  ['Aster MIMS Hospital', 'ആസ്റ്റർ മിംസ് ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2710, 75.7820, '673001', ['mims hospital', 'aster mims']],
  ['KIMS Hospital, Kozhikode', 'കിംസ് ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2740, 75.7880, '673001', ['kims calicut']],
  ['PVS Hospital', 'പി.വി.എസ് ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2580, 75.7850, '673001', ['pvs calicut']],
  ['Malabar Institute of Medical Sciences', 'മലബാർ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് മെഡിക്കൽ സയൻസസ്', 'Hospital', 'Kozhikode', 11.2780, 75.7950, '673004', ['mims calicut']],
  ['Lakeshore Hospital', 'ലേക്ഷോർ ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2690, 75.7900, '673001', ['lakeshore calicut']],
  ['Government General Hospital', 'ഗവ. ജനറൽ ആശുപത്രി', 'Hospital', 'Kozhikode', 11.2570, 75.7830, '673001', ['general hospital calicut']],
];
kkdHospitals.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Medical College' ? 'medicalCollege' : 'hospital';
  add({ name: `${name}, Kozhikode`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── KOZHIKODE — TRANSIT ───

const kkdTransit = [
  ['Calicut International Airport (CCJ)', 'കോഴിക്കോട് അന്താരാഷ്ട്ര വിമാനത്താവളം', 'Airport', 'Karipur', 11.1368, 75.9553, '673647', ['ccj', 'karipur airport', 'calicut airport']],
  ['Kozhikode Railway Station', 'കോഴിക്കോട് റെയിൽവേ സ്റ്റേഷൻ', 'Railway Station', 'Kozhikode', 11.2570, 75.7800, '673001', ['calicut railway station']],
  ['Kozhikode Bus Stand (Palayam)', 'കോഴിക്കോട് ബസ് സ്റ്റാൻഡ്', 'Bus Stand', 'Palayam', 11.2580, 75.7820, '673001', ['ksrtc calicut', 'palayam bus stand']],
  ['Vyttila Mobility Hub, Kozhikode', 'വൈറ്റില മൊബിലിറ്റി ഹബ്', 'Bus Stand', 'Kozhikode', 11.2600, 75.7950, '673001', ['mobility hub calicut']],
];
kkdTransit.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Airport' ? 'airport' : cat === 'Railway Station' ? 'railwayStation' : 'busStand';
  add({ name: `${name}`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── KOZHIKODE — EDUCATIONAL ───

const kkdEducation = [
  ['University of Calicut', 'കാലിക്കറ്റ് സർവ്വകലാശാല', 'University', 'Tenhipalam', 11.1330, 75.8900, '673635', ['calicut university', 'uoc']],
  ['National Institute of Technology Calicut', 'നാഷണൽ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ടെക്നോളജി', 'College', 'Kattangal', 11.3200, 75.9300, '673601', ['nit calicut', 'nitc']],
  ['Government College of Engineering, Kozhikode', 'ഗവ. എഞ്ചിനീയറിംഗ് കോളേജ്', 'College', 'West Hill', 11.2820, 75.7650, '673005', ['gcek', 'engineering college west hill']],
  ['IIM Kozhikode', 'ഐ.ഐ.എം കോഴിക്കോട്', 'College', 'Kunnamangalam', 11.3050, 75.8850, '673570', ['iim calicut', 'iimk']],
  ['Farook College', 'ഫറൂക്ക് കോളേജ്', 'College', 'Feroke', 11.1880, 75.8480, '673631', ['farook college']],
  ['Providence College', 'പ്രൊവിഡൻസ് കോളേജ്', 'College', 'Devagiri', 11.2780, 75.8080, '673004', ['providence college calicut']],
  ['Govt Model School, Kozhikode', 'ഗവ. മോഡൽ സ്കൂൾ', 'School', 'Kozhikode', 11.2610, 75.7840, '673001', ['model school calicut']],
];
kkdEducation.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'University' ? 'university' : cat === 'School' ? 'school' : 'college';
  add({ name: `${name}, Kozhikode`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── KOZHIKODE — SHOPPING & COMMERCIAL ───

const kkdShops = [
  ['RP Mall, Kozhikode', 'ആർ.പി മാൾ', 'Shopping Mall', 'Kozhikode', 11.2550, 75.7840, '673001', ['rp mall calicut', 'rp mall']],
  ['Oberon Mall, Kozhikode', 'ഒബറോൺ മാൾ', 'Shopping Mall', 'Kozhikode', 11.2590, 75.7840, '673001', ['oberon mall calicut']],
  ['Hilite Mall, Kozhikode', 'ഹൈലൈറ്റ് മാൾ', 'Shopping Mall', 'Kozhikode', 11.2680, 75.7920, '673001', ['hilite mall calicut']],
  ['Focus Mall, Kozhikode', 'ഫോക്കസ് മാൾ', 'Shopping Mall', 'Kozhikode', 11.2630, 75.7920, '673001', ['focus mall calicut']],
  ['Kozhikode Beach Market', 'കോഴിക്കോട് ബീച്ച് മാർക്കറ്റ്', 'Market', 'Kozhikode', 11.2540, 75.7720, '673001', ['beach market calicut']],
  ['SM Street (S.M. Street)', 'എസ്.എം സ്ട്രീറ്റ്', 'Market', 'Kozhikode', 11.2590, 75.7800, '673001', ['sm street calicut', 'sweet meat street']],
];
kkdShops.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Shopping Mall' ? 'shoppingMall' : 'market';
  add({ name: `${name}`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── KOZHIKODE — TOURIST & BEACHES ───

const kkdTourist = [
  ['Kozhikode Beach', 'കോഴിക്കോട് ബീച്ച്', 'Beach', 'Kozhikode', 11.2540, 75.7720, '673001', ['calicut beach', 'kozhikode beach']],
  ['Kappad Beach', 'കാപ്പാട് ബീച്ച്', 'Beach', 'Kappad', 11.3820, 75.7300, '673304', ['kappad beach calicut']],
  ['Beypore Beach', 'ബേപ്പൂർ ബീച്ച്', 'Beach', 'Beypore', 11.1830, 75.8040, '673015', ['beypore beach calicut']],
  ['Mananchira Square', 'മാനാഞ്ചിറ സ്ക്വയർ', 'Park', 'Kozhikode', 11.2580, 75.7820, '673001', ['mananchira', 'mananchira maidanam']],
  ['Sarovaram Bio Park', 'സരോവരം ബയോ പാർക്ക്', 'Park', 'Kozhikode', 11.2640, 75.8100, '673004', ['sarovaram park']],
  ['Thusharagiri Waterfalls', 'തുഷാരഗിരി വെള്ളച്ചാട്ടം', 'Tourist Attraction', 'Thusharagiri', 11.3320, 76.0500, '673576', ['thusaragiri', 'thusharagiri falls']],
  ['Kadalundi Bird Sanctuary', 'കടലുണ്ടി പക്ഷിസങ്കേതം', 'Tourist Attraction', 'Kadalundi', 11.1310, 75.8300, '673315', ['kadalundi bird sanctuary']],
];
kkdTourist.forEach(([name, mal, cat, village, lat, lng, pin, kw]) => {
  const catKey = cat === 'Beach' ? 'beach' : cat === 'Park' ? 'park' : 'touristAttraction';
  add({ name: `${name}, Kozhikode`, malayalam: mal, cat: catKey, subcat: cat, district: 'Kozhikode', taluk: 'Kozhikode', village, lat, lng, pincode: pin, keywords: kw });
});

// ─── KOZHIKODE — OTHER TALUKS OVERVIEW ───

const otherTaluksTowns = [
  // Koyilandy Taluk
  ['Koyilandy', 'കൊയിലാണ്ടി', 'town', 'Koyilandy', 11.4380, 75.6950, '673305', ['quiland', 'koilandy']],
  ['Payyoli', 'പയ്യോളി', 'town', 'Koyilandy', 11.5200, 75.6300, '673522', ['payyoli']],
  ['Balussery', 'ബാലുശ്ശേരി', 'town', 'Koyilandy', 11.4100, 75.8300, '673612', ['ballussery', 'balussery']],
  ['Atholi', 'അത്തോളി', 'village', 'Koyilandy', 11.4000, 75.7000, '673315', ['atholi']],
  ['Meppayur', 'മേപ്പയൂർ', 'village', 'Koyilandy', 11.5300, 75.7200, '673517', ['meppayur']],

  // Thamarassery Taluk
  ['Thamarassery', 'താമരശ്ശേരി', 'town', 'Thamarassery', 11.4050, 75.9400, '673573', ['thamarassery']],
  ['Mukkam', 'മുക്കം', 'town', 'Thamarassery', 11.3200, 75.9600, '673602', ['mukkam']],
  ['Koduvally', 'കൊടുവള്ളി', 'town', 'Thamarassery', 11.3600, 75.9200, '673572', ['koduvally']],
  ['Kunnamangalam', 'കുന്നമംഗലം', 'town', 'Kunnamangalam', 11.3040, 75.8780, '673571', ['kunnamangalam']],

  // Kunnamangalam Taluk
  ['Chathamangalam', 'ചാത്തമംഗലം', 'village', 'Kunnamangalam', 11.2900, 75.8600, '673571', ['chathamangalam']],
  ['Peruvayal', 'പെരുവയൽ', 'village', 'Kunnamangalam', 11.3300, 75.8800, '673008', ['peruvayal']],
  ['Puthuppadi', 'പുതുപ്പാടി', 'village', 'Kunnamangalam', 11.3200, 76.0100, '673586', ['puthuppadi']],
  ['Koodaranji', 'കൂടരഞ്ഞി', 'village', 'Kunnamangalam', 11.2800, 75.9700, '673604', ['koodaranji']],

  // Perambra area (Koyilandy)
  ['Perambra', 'പേരാമ്പ്ര', 'town', 'Koyilandy', 11.4200, 75.7400, '673525', ['perambra']],
  ['Orkattery', 'ഓർക്കാട്ടേരി', 'village', 'Koyilandy', 11.4500, 75.7600, '673501', ['orkattery', 'orkatteri']],
  ['Chemmarathur', 'ചെമ്മരത്തൂർ', 'village', 'Koyilandy', 11.5300, 75.7500, '673516', ['chemmarathur']],
  ['Meladi', 'മേലാടി', 'village', 'Koyilandy', 11.2000, 75.8200, '673506', ['meladi']],
];
otherTaluksTowns.forEach(([name, mal, cat, taluk, lat, lng, pin, kw]) => {
  add({ name: `${name}, Kozhikode`, malayalam: mal, cat, subcat: cat === 'town' ? 'Town' : 'Village', district: 'Kozhikode', taluk, lat, lng, pincode: pin, keywords: kw });
});

// ═══════════════════════════════════════════════════════════
// OTHER DISTRICTS — MAJOR CITIES & TOWNS OVERVIEW
// ═══════════════════════════════════════════════════════════

const otherDistrictsData = [
  // Thiruvananthapuram
  ['Thiruvananthapuram City', 'തിരുവനന്തപുരം', 'city', 'Thiruvananthapuram', 'N/A', 8.5241, 76.9366, '695001'],
  ['Technopark, Trivandrum', 'ടെക്നോപാർക്', 'itPark', 'Thiruvananthapuram', 'Kazhakootam', 8.5620, 76.8800, '695581'],
  ['Kowdiar, Trivandrum', 'കൗഡിയാർ', 'residentialArea', 'Thiruvananthapuram', 'N/A', 8.5080, 76.9640, '695003'],
  ['Thampanoor, Trivandrum', 'തമ്പാനൂർ', 'residentialArea', 'Thiruvananthapuram', 'N/A', 8.4870, 76.9510, '695001'],
  ['Trivandrum Medical College', 'തിരുവനന്തപുരം മെഡിക്കൽ കോളേജ്', 'medicalCollege', 'Thiruvananthapuram', 'N/A', 8.5200, 76.9320, '695001'],
  ['Kovalam Beach, Trivandrum', 'കോവളം ബീച്ച്', 'beach', 'Thiruvananthapuram', 'Kovalam', 8.3950, 76.9770, '695527'],

  // Ernakulam / Kochi
  ['Kochi (Ernakulam)', 'കൊച്ചി', 'city', 'Ernakulam', 'N/A', 9.9312, 76.2673, '682001'],
  ['MG Road, Kochi', 'എം.ജി റോഡ്', 'residentialArea', 'Ernakulam', 'N/A', 9.9710, 76.2830, '682035'],
  ['Kakkanad, Kochi', 'കാക്കനാട്', 'residentialArea', 'Ernakulam', 'N/A', 10.0090, 76.3400, '682030'],
  ['Edappally, Kochi', 'എടപ്പാൾ', 'residentialArea', 'Ernakulam', 'N/A', 10.0230, 76.3070, '682024'],
  ['Fort Kochi', 'ഫോർട്ട് കൊച്ചി', 'residentialArea', 'Ernakulam', 'N/A', 9.9660, 76.2420, '682001'],
  ['Lulu Mall, Kochi', 'ലുലു മാൾ', 'shoppingMall', 'Ernakulam', 'Edappally', 10.0230, 76.3260, '682024'],
  ['Kochi International Airport (CIAL)', 'കൊച്ചി രാജ്യാന്തര വിമാനത്താവളം', 'airport', 'Ernakulam', 'Nedumbassery', 10.1556, 76.3914, '683111'],
  ['Amrita Hospital, Kochi', 'അമൃത ആശുപത്രി', 'hospital', 'Ernakulam', 'Edappally', 10.1050, 76.3500, '682041'],
  ['Aster Medcity, Kochi', 'ആസ്റ്റർ മെഡ്സിറ്റി', 'hospital', 'Ernakulam', 'Kochi', 10.0120, 76.3380, '682027'],
  ['Infopark, Kochi', 'ഇൻഫോപാർക്', 'itPark', 'Ernakulam', 'Kakkanad', 10.0160, 76.3550, '682042'],
  ['SmartCity, Kochi', 'സ്മാർട്ട് സിറ്റി', 'itPark', 'Ernakulam', 'Kakkanad', 10.0070, 76.3480, '682042'],
  ['Marine Drive, Kochi', 'മറൈൻ ഡ്രൈവ്', 'touristAttraction', 'Ernakulam', 'N/A', 9.9820, 76.2770, '682035'],
  ['Cherai Beach, Kochi', 'ചേരായി ബീച്ച്', 'beach', 'Ernakulam', 'Cherai', 10.1430, 76.1780, '683514'],

  // Alappuzha
  ['Alappuzha (Alleppey)', 'ആലപ്പുഴ', 'city', 'Alappuzha', 'N/A', 9.4981, 76.3388, '688001'],
  ['Alappuzha Beach', 'ആലപ്പുഴ ബീച്ച്', 'beach', 'Alappuzha', 'N/A', 9.4900, 76.3250, '688001'],
  ['Marari Beach', 'മാരാരി ബീച്ച്', 'beach', 'Alappuzha', 'Mararikulam', 9.5960, 76.3000, '688523'],
  ['Alappuzha Medical College', 'ആലപ്പുഴ മെഡിക്കൽ കോളേജ്', 'medicalCollege', 'Alappuzha', 'N/A', 9.5030, 76.3350, '688005'],

  // Kottayam
  ['Kottayam', 'കോട്ടയം', 'city', 'Kottayam', 'N/A', 9.5916, 76.5222, '686001'],
  ['Kumarakom, Kottayam', 'കുമരകം', 'touristAttraction', 'Kottayam', 'N/A', 9.6170, 76.4320, '686563'],
  ['Kottayam Medical College', 'കോട്ടയം മെഡിക്കൽ കോളേജ്', 'medicalCollege', 'Kottayam', 'N/A', 9.6000, 76.5150, '686008'],

  // Thrissur
  ['Thrissur (Trichur)', 'തൃശൂർ', 'city', 'Thrissur', 'N/A', 10.5276, 76.2144, '680001'],
  ['Guruvayur Temple', 'ഗുരുവായൂർ ക്ഷേത്രം', 'temple', 'Thrissur', 'Guruvayur', 10.5940, 76.0390, '680101'],
  ['Thrissur Medical College', 'തൃശൂർ മെഡിക്കൽ കോളേജ്', 'medicalCollege', 'Thrissur', 'N/A', 10.5200, 76.2100, '680001'],
  ['Athirappilly Waterfalls', 'ആതിരപ്പിള്ളി വെള്ളച്ചാട്ടം', 'touristAttraction', 'Thrissur', 'Athirappilly', 10.2850, 76.5670, '680724'],

  // Palakkad
  ['Palakkad (Palghat)', 'പാലക്കാട്', 'city', 'Palakkad', 'N/A', 10.7867, 76.6548, '678001'],
  ['Palakkad Junction Railway Station', 'പാലക്കാട് ജങ്ഷൻ', 'railwayStation', 'Palakkad', 'Olappamanna', 10.7800, 76.6550, '678002'],

  // Malappuram
  ['Malappuram', 'മലപ്പുറം', 'city', 'Malappuram', 'N/A', 11.0510, 76.0711, '676505'],
  ['Kottakkal, Malappuram', 'കോട്ടക്കൽ', 'town', 'Malappuram', 'N/A', 11.0010, 76.0600, '676503'],

  // Kannur
  ['Kannur (Cannanore)', 'കണ്ണൂർ', 'city', 'Kannur', 'N/A', 11.8745, 75.3704, '670001'],
  ['Kannur International Airport (CNN)', 'കണ്ണൂർ വിമാനത്താവളം', 'airport', 'Kannur', 'Mattannur', 11.9185, 75.5443, '670702'],
  ['Muzhappilangad Drive-in Beach', 'മുഴപ്പിലങ്ങാട് ഡ്രൈവ്-ഇൻ ബീച്ച്', 'beach', 'Kannur', 'Muzhappilangad', 11.7950, 75.4530, '670611'],
  ['Kannur Railway Station', 'കണ്ണൂർ റെയിൽവേ സ്റ്റേഷൻ', 'railwayStation', 'Kannur', 'N/A', 11.8680, 75.3650, '670001'],

  // Kasaragod
  ['Kasaragod', 'കാസർഗോഡ്', 'city', 'Kasaragod', 'N/A', 12.4924, 74.9900, '671121'],
  ['Bekal Fort', 'ബേക്കൽ കോട്ട', 'touristAttraction', 'Kasaragod', 'Bekal', 12.3950, 75.0350, '671316'],

  // Wayanad
  ['Wayanad (Kalpetta)', 'വയനാട്', 'city', 'Wayanad', 'N/A', 11.6854, 76.1320, '673122'],
  ['Sulthan Bathery, Wayanad', 'സുൽത്താൻ ബത്തേരി', 'town', 'Wayanad', 'N/A', 11.6680, 76.2720, '673592'],
  ['Vythiri, Wayanad', 'വൈത്തിരി', 'town', 'Wayanad', 'N/A', 11.4300, 75.8200, '673121'],
  ['Edakkal Caves, Wayanad', 'എടക്കൽ ഗുഹകൾ', 'touristAttraction', 'Wayanad', 'N/A', 11.6320, 76.2350, '673595'],

  // Kollam
  ['Kollam (Quilon)', 'കൊല്ലം', 'city', 'Kollam', 'N/A', 8.8932, 76.6141, '691001'],
  ['Kollam Junction Railway Station', 'കൊല്ലം ജങ്ഷൻ', 'railwayStation', 'Kollam', 'N/A', 8.8850, 76.6000, '691001'],
  ['Jatayu Earth\'s Centre', 'ജടായു എർത്ത്സ് സെന്റർ', 'touristAttraction', 'Kollam', 'Chadayamangalam', 8.8620, 76.8650, '691312'],

  // Pathanamthitta / Idukki
  ['Pathanamthitta', 'പത്തനംതിട്ട', 'city', 'Pathanamthitta', 'N/A', 9.2648, 76.7870, '689645'],
  ['Sabarimala Temple', 'ശബരിമല ക്ഷേത്രം', 'temple', 'Pathanamthitta', 'Nilackal', 9.4360, 77.0830, '689662'],
  ['Idukki', 'ഇടുക്കി', 'city', 'Idukki', 'N/A', 9.8500, 76.9667, '685501'],
  ['Munnar Town', 'മൂന്നാർ', 'town', 'Idukki', 'N/A', 10.0889, 77.0595, '685612'],
  ['Thekkady (Periyar)', 'തേക്കടി', 'touristAttraction', 'Idukki', 'Kumily', 9.5300, 77.1600, '685509'],
  ['Vagamon, Idukki', 'വാഗമൺ', 'touristAttraction', 'Idukki', 'N/A', 9.6850, 76.9050, '685503'],
];
otherDistrictsData.forEach(([name, mal, cat, district, village, lat, lng, pin]) => {
  add({ name, malayalam: mal, cat, subcat: cat.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()), district, village: village === 'N/A' ? undefined : village, lat, lng, pincode: pin, keywords: [name.toLowerCase().split(',')[0].trim()] });
});

// ═══════════════════════════════════════════════════════════
// SEARCH ENGINE
// ═══════════════════════════════════════════════════════════

// Build search index
const searchIndex = new Map();
const keywordIndex = new Map();

LOCATIONS.forEach((loc) => {
  const id = loc.id;
  searchIndex.set(id, loc);

  // Index by name parts
  const nameStr = loc.name.toLowerCase();
  const parts = nameStr.split(/[\s,()'.-]+/).filter(Boolean);
  parts.forEach((part) => {
    if (part.length < 2) return;
    for (let i = 1; i <= part.length; i++) {
      const prefix = part.slice(0, i);
      if (!keywordIndex.has(prefix)) keywordIndex.set(prefix, new Set());
      keywordIndex.get(prefix).add(id);
    }
  });

  // Index by keywords
  (loc.keywords || []).forEach((kw) => {
    const kwLower = kw.toLowerCase();
    for (let i = 1; i <= kwLower.length; i++) {
      const prefix = kwLower.slice(0, i);
      if (!keywordIndex.has(prefix)) keywordIndex.set(prefix, new Set());
      keywordIndex.get(prefix).add(id);
    }
  });
});

// ─── PUBLIC SEARCH API ───

export function searchLocations(query, options = {}) {
  const {
    limit = 20,
    district,
    taluk,
    categories,
    excludeId,
    sortBy,
  } = options;

  // Empty query: return all matching categories (for dropdown show-all)
  if (!query || query.length < 1) {
    let results = [...LOCATIONS];
    if (district) results = results.filter((l) => l.district === district);
    if (taluk) results = results.filter((l) => l.taluk === taluk);
    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];
      results = results.filter((l) => cats.includes(l.cat));
    }
    if (excludeId) results = results.filter((l) => l.id !== excludeId);
    results.sort((a, b) => a.name.localeCompare(b.name));
    return results.slice(0, limit);
  }

  const q = query.toLowerCase().trim();

  // Try exact prefix match first
  let ids = keywordIndex.get(q);
  if (!ids || ids.size === 0) {
    // Try fuzzy: split query into parts, intersect results
    const queryParts = q.split(/[\s,]+/).filter(p => p.length >= 2);
    if (queryParts.length === 0) return [];

    const sets = queryParts.map((part) => {
      return keywordIndex.get(part) || new Set();
    }).filter(s => s.size > 0);

    if (sets.length === 0) return [];
    ids = sets.reduce((a, b) => {
      const intersection = new Set();
      a.forEach((id) => { if (b.has(id)) intersection.add(id); });
      return intersection;
    });
  }

  let results = Array.from(ids).map((id) => searchIndex.get(id)).filter(Boolean);

  // Apply filters
  if (district) results = results.filter((l) => l.district === district);
  if (taluk) results = results.filter((l) => l.taluk === taluk);
  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    results = results.filter((l) => cats.includes(l.cat));
  }
  if (excludeId) results = results.filter((l) => l.id !== excludeId);

  // Ensure query string match (post-filter)
  results = results.filter((l) => {
    const nameMatch = l.name.toLowerCase().includes(q);
    const kwMatch = (l.keywords || []).some((kw) => kw.toLowerCase().includes(q));
    return nameMatch || kwMatch;
  });

  // Sort: prioritize exact-start matches, then by name
  results.sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
    const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.name.localeCompare(b.name);
  });

  return results.slice(0, limit);
}

export function autocomplete(query, options = {}) {
  return searchLocations(query, { ...options, limit: options.limit || 10 });
}

export function getLocationById(id) {
  return searchIndex.get(id) || null;
}

export function getLocationsByCategory(cat) {
  return LOCATIONS.filter((l) => l.cat === cat);
}

export function getLocationsByDistrict(district) {
  return LOCATIONS.filter((l) => l.district === district);
}

export function getLocationsByTaluk(taluk) {
  return LOCATIONS.filter((l) => l.taluk === taluk);
}

export function getNearbyLocations(lat, lng, radiusKm = 2, options = {}) {
  const { limit = 20, categories } = options;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;

  const results = LOCATIONS.filter((loc) => {
    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];
      if (!cats.includes(loc.cat)) return false;
    }
    const dLat = toRad(loc.lat - lat);
    const dLng = toRad(loc.lng - lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat)) * Math.cos(toRad(loc.lat)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c <= radiusKm;
  });

  results.sort((a, b) => {
    const distA = haversineKm(lat, lng, a.lat, a.lng);
    const distB = haversineKm(lat, lng, b.lat, b.lng);
    return distA - distB;
  });

  return results.slice(0, limit);
}

export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── LEGACY COMPATIBILITY ───
// Export as flat array matching old MOCK_LOCATIONS shape
export const LEGACY_LOCATIONS = LOCATIONS.map((l) => ({
  name: l.name,
  lat: l.lat,
  lng: l.lng,
  cat: l.cat,
}));

export { LOCATIONS };

export default LOCATIONS;
