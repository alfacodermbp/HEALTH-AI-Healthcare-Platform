const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Generator helpers
const indiaLocations = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Manipur": ["Imphal", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Chandigarh"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Tripura": ["Agartala", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Noida", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Puducherry": ["Puducherry", "Karaikal"]
};

const states = Object.keys(indiaLocations);
const maleNames = ['Rajesh','Amit','Suresh','Vikram','Mohan','Arun','Deepak','Sanjay','Ramesh','Alok','Nitin','Rohit','Manoj','Vinay','Gaurav','Harsh','Kiran','Naveen','Prashant','Ravi','Siddharth','Karthik','Arjun','Dev','Ishaan'];
const femaleNames = ['Priya','Sunita','Kavya','Deepa','Meera','Anita','Smita','Ritu','Nisha','Pooja','Shalini','Anjali','Swati','Archana','Neha','Divya','Pallavi','Rashmi','Manisha','Shweta','Aarti','Sneha','Tara','Aditi','Roshni'];
const lastNames = ['Sharma','Gupta','Mehta','Reddy','Nair','Patil','Joshi','Kumar','Singh','Agarwal','Verma','Rao','Pillai','Menon','Kapoor','Trivedi','Saxena','Bhatia','Das','Choudhary','Khan','Iyer','Mukherjee','Banerjee','Chatterjee','Kaur','Yadav','Mishra','Natarajan','Desai'];

function pick(arr) { if(!arr || arr.length===0) return null; return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

const specialties = [
  { key: 'eye', name: 'Ophthalmologist' },
  { key: 'heart', name: 'Cardiologist' },
  { key: 'skin', name: 'Dermatologist' },
  { key: 'neuro', name: 'Neurologist' },
  { key: 'ortho', name: 'Orthopedist' },
  { key: 'gastro', name: 'Gastroenterologist' },
  { key: 'diabetes', name: 'Endocrinologist' },
  { key: 'child', name: 'Pediatrician' },
  { key: 'gynec', name: 'Gynecologist' },
  { key: 'general', name: 'General Physician' },
  { key: 'ent', name: 'ENT Specialist' },
  { key: 'dental', name: 'Dentist' },
  { key: 'kidney', name: 'Nephrologist' },
  { key: 'lung', name: 'Pulmonologist' },
  { key: 'mental', name: 'Psychiatrist' },
  { key: 'cancer', name: 'Oncologist' }
];

const tags = {
  govt: [['Top Rated','Govt Hospital'],['Experienced','Govt Hospital'],['Budget Friendly','Govt Hospital'],['Disease Specialist','Govt Hospital'],['Govt Hospital','Ayushman Bharat']],
  private: [['Top Rated','Private'],['Experienced','Private'],['Budget Friendly (Private)'],['Disease Specialist','Private'],['Nearby','Private'],['LASIK Expert'],['Minimally Invasive'],['Sports Injury']]
};

const reviewTexts = [
  'Excellent doctor. Very thorough examination and clear explanation.',
  'Highly recommended. The doctor took time to listen to all my concerns.',
  'Very professional and knowledgeable. Treatment was effective.',
  'Good experience overall. Staff was helpful and doctor was experienced.',
  'Best doctor I have visited. Accurate diagnosis and proper treatment plan.',
  'Caring and patient doctor. Explains everything in simple language.',
  'Treatment worked perfectly. Very grateful for the care received.',
  'World-class treatment at affordable cost. Highly recommend this doctor.',
  'Wait time was a bit long, but the consultation was worth it.',
  'Clean clinic and friendly staff. The doctor was very reassuring.'
];

// Stores
const hospitals = [];
const doctors = [];
const reviews = [];

let hospId = 1;
let docId = 1;
let revId = 1;

// 1. Generate Hospitals dynamically for every city
// We want 2 govt hospitals and 3 private hospitals per city
const cityHospitals = {}; // Map: city -> { govt: [], private: [] }

for (const state of states) {
  for (const city of indiaLocations[state]) {
    cityHospitals[city] = { govt: [], private: [] };
    
    // Generate Govt Hospitals
    for (let i = 1; i <= 2; i++) {
      const hname = i === 1 ? `Government Medical College ${city}` : `District Civil Hospital ${city}`;
      const hid = `hosp_${String(hospId++).padStart(4,'0')}`;
      hospitals.push({
        id: hid,
        name: hname,
        shortName: hname.split(' ').slice(0,3).join(' '),
        type: 'govt',
        city, state,
        rating: +(3.8 + Math.random()*0.9).toFixed(1),
        totalReviews: randInt(200, 3000),
        specialties: specialties.map(s => s.name),
        beds: randInt(500, 2000),
        established: randInt(1940, 2000),
        avgWaitTime: pick(['1–3 days','3–7 days','5–10 days']),
        costCategory: 'Free / Very Low',
        ayushman: true,
        facilities: ['ICU','OPD','IPD','Blood Bank','Diagnostic Lab','Emergency','X-Ray'],
        description: `Premier government hospital serving ${city} and surrounding areas with low-cost treatment.`,
        image: '/hospitals/govt.jpg',
        mapLink: `https://maps.google.com/?q=${encodeURIComponent(hname + ' ' + city)}`,
        accreditation: pick(['NABH Accredited','Government Certified']),
        emergencyServices: true
      });
      cityHospitals[city].govt.push({ id: hid, name: hname });
    }

    // Generate Private Hospitals
    const privPrefixes = ['Apollo Clinic', 'Fortis Hospital', 'Max Super Speciality', 'Manipal Hospital', 'Sunrise Hospital', 'City Care Hospital', 'LifeLine Hospital'];
    for (let i = 1; i <= 3; i++) {
      const hname = `${pick(privPrefixes)} ${city}`;
      const hid = `hosp_${String(hospId++).padStart(4,'0')}`;
      hospitals.push({
        id: hid,
        name: hname,
        shortName: hname.split(' ').slice(0,2).join(' '),
        type: 'private',
        city, state,
        rating: +(4.1 + Math.random()*0.8).toFixed(1),
        totalReviews: randInt(100, 1500),
        specialties: specialties.map(s => s.name),
        beds: randInt(100, 600),
        established: randInt(1995, 2020),
        avgWaitTime: pick(['Same day','1–2 days','Same day']),
        costCategory: pick(['₹₹ Medium','₹₹₹ High']),
        ayushman: Math.random()>0.7,
        facilities: ['ICU','OPD','Pharmacy','Diagnostic Lab','Emergency','MRI','CT Scan','Cafeteria'],
        description: `Leading private hospital in ${city} with modern amenities and fast service.`,
        image: '/hospitals/private.jpg',
        mapLink: `https://maps.google.com/?q=${encodeURIComponent(hname + ' ' + city)}`,
        accreditation: pick(['NABH','JCI + NABH','ISO']),
        emergencyServices: true
      });
      cityHospitals[city].private.push({ id: hid, name: hname });
    }
  }
}

// 2. Generate Doctors across every state, city, and specialty
// 3 govt + 4 private doctors per specialty per city
for (const state of states) {
  for (const city of indiaLocations[state]) {
    for (const spec of specialties) {
      
      // Govt Doctors
      for (let i = 0; i < 2; i++) {
        const isFemale = Math.random() > 0.45;
        const firstName = isFemale ? pick(femaleNames) : pick(maleNames);
        const lastName = pick(lastNames);
        const hosp = pick(cityHospitals[city].govt);
        const exp = randInt(8, 30);
        const fee = randInt(20, 150);
        const docIdStr = `doc_${String(docId++).padStart(4,'0')}`;
        
        doctors.push({
          id: docIdStr,
          name: `Dr. ${firstName} ${lastName}`,
          photo: `/avatars/doc_${isFemale?'f':'m'}${randInt(1,12)}.png`,
          specialization: spec.name, specialtyKey: spec.key,
          experience: exp, hospital: hosp.name, hospitalId: hosp.id,
          type: 'govt', city, state, rating: +(4.0 + Math.random()*0.9).toFixed(1),
          totalReviews: randInt(50, 400), consultFee: fee,
          surgeryEstimate: fee < 100 ? '₹5,000–₹40,000 (subsidized)' : '₹10,000–₹80,000',
          bio: `Senior ${spec.name} at ${hosp.name}. ${exp} years of clinical experience serving the community.`,
          education: `MBBS, MD/MS – Government Medical College`,
          availability: pick(['Mon–Fri 9AM–2PM','Mon–Sat 8AM–1PM','Tue–Sat 9AM–1PM']),
          tags: pick(tags.govt), insurance: true, ayushman: true,
          mapLink: `https://maps.google.com/?q=${encodeURIComponent(hosp.name + ' ' + city)}`,
          verified: true
        });

        // Add 1-2 reviews for some govt docs
        if (Math.random() > 0.5) {
          for(let r=0; r<randInt(1,2); r++){
            reviews.push({
              _id: `rev_${String(revId++).padStart(5,'0')}`, doctorId: docIdStr,
              userId: `user_${randInt(1,100)}`, userName: `${pick([...maleNames,...femaleNames])} ${pick(lastNames).charAt(0)}.`,
              rating: randInt(4, 5), comment: pick(reviewTexts),
              date: `2024-${String(randInt(1,12)).padStart(2,'0')}-${String(randInt(1,28)).padStart(2,'0')}`,
              verified: Math.random() > 0.3
            });
          }
        }
      }

      // Private Doctors
      for (let i = 0; i < 3; i++) {
        const isFemale = Math.random() > 0.45;
        const firstName = isFemale ? pick(femaleNames) : pick(maleNames);
        const lastName = pick(lastNames);
        const hosp = pick(cityHospitals[city].private);
        const exp = randInt(5, 25);
        const fee = randInt(400, 1500);
        const docIdStr = `doc_${String(docId++).padStart(4,'0')}`;
        
        doctors.push({
          id: docIdStr,
          name: `Dr. ${firstName} ${lastName}`,
          photo: `/avatars/doc_${isFemale?'f':'m'}${randInt(1,12)}.png`,
          specialization: spec.name, specialtyKey: spec.key,
          experience: exp, hospital: hosp.name, hospitalId: hosp.id,
          type: 'private', city, state, rating: +(4.2 + Math.random()*0.8).toFixed(1),
          totalReviews: randInt(20, 200), consultFee: fee,
          surgeryEstimate: `₹${randInt(30,80)},000–₹${randInt(1,4)},00,000`,
          bio: `Eminent ${spec.name} expert at ${hosp.name}, ${city}. Focused on advanced treatments & quick recovery.`,
          education: `MBBS, MD/MS – Top Tier Institute${Math.random()>0.7?', Fellowship (UK/USA)':''}`,
          availability: pick(['Mon–Sat 10AM–6PM','Mon–Sat 9AM–5PM','Tue–Sun 10AM–4PM']),
          tags: pick(tags.private), insurance: Math.random() > 0.3, ayushman: false,
          mapLink: `https://maps.google.com/?q=${encodeURIComponent(hosp.name + ' ' + city)}`,
          verified: true
        });

        // Add 1-2 reviews for most private docs
        if (Math.random() > 0.2) {
          for(let r=0; r<randInt(1,3); r++){
            reviews.push({
              _id: `rev_${String(revId++).padStart(5,'0')}`, doctorId: docIdStr,
              userId: `user_${randInt(1,100)}`, userName: `${pick([...maleNames,...femaleNames])} ${pick(lastNames).charAt(0)}.`,
              rating: randInt(4, 5), comment: pick(reviewTexts),
              date: `2024-${String(randInt(1,12)).padStart(2,'0')}-${String(randInt(1,28)).padStart(2,'0')}`,
              verified: Math.random() > 0.3
            });
          }
        }
      }

    }
  }
}

const collections = { doctors, hospitals, reviews, complaints: [], users: [], vaultReports: [] };
for (const [name, data] of Object.entries(collections)) {
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2));
  console.log(`✅ Seeded ${data.length} records → ${name}.json`);
}
console.log(`\n🌱 Massive Scale Seed complete! ${doctors.length} doctors, ${hospitals.length} hospitals, ${reviews.length} reviews.`);
