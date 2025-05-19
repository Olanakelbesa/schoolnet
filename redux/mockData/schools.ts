import { School } from '../slices/schoolSlice';

export const mockSchools: School[] = [
  {
    _id: "1",
    name: "International Community School of Addis Ababa",
    email: "info@icsaddis.org",
    address: [
      {
        city: "Addis Ababa",
        subCity: "Yeka",
        _id: "1"
      }
    ],
    phoneNumber: "+251 11 371 1544",
    schoolWebsite: "https://www.icsaddis.org",
    schoolType: "International",
    division: ["Elementary", "Middle", "High"],
    studentCount: 800,
    yearEstablished: 1964,
    schoolFacilites: [
      {
        name: "Science Lab",
        img_path: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800"],
        _id: "1"
      }
    ],
    description: "ICS Addis is a leading non-profit international school serving families with children from age 3 to Grade 12. Founded in 1964, ICS is an IB World School known for its inclusive community representing more than 80 nationalities.",
    schoolTags: ["IB World School", "International", "Diverse"],
    socialMedia: [],
    budgetMin: 50000,
    budgetMax: 150000,
    gender: "co-ed",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    _id: "2",
    name: "Sandford International School",
    email: "info@sandford.edu.et",
    address: [
      {
        city: "Addis Ababa",
        subCity: "Bole",
        _id: "2"
      }
    ],
    phoneNumber: "+251 11 662 3636",
    schoolWebsite: "https://www.sandford.edu.et",
    schoolType: "International",
    division: ["Elementary", "Middle", "High"],
    studentCount: 600,
    yearEstablished: 1950,
    schoolFacilites: [
      {
        name: "Library",
        img_path: ["https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"],
        _id: "2"
      }
    ],
    description: "Sandford International School is one of the oldest international schools in Ethiopia, offering a British curriculum and preparing students for IGCSE and A-Level examinations.",
    schoolTags: ["British Curriculum", "IGCSE", "A-Level"],
    socialMedia: [],
    budgetMin: 45000,
    budgetMax: 120000,
    gender: "co-ed",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    _id: "3",
    name: "Bole Secondary School",
    email: "info@bolesecondary.edu.et",
    address: [
      {
        city: "Addis Ababa",
        subCity: "Bole",
        _id: "3"
      }
    ],
    phoneNumber: "+251 11 661 1111",
    schoolWebsite: "https://www.bolesecondary.edu.et",
    schoolType: "Public",
    division: ["Middle", "High"],
    studentCount: 1200,
    yearEstablished: 1975,
    schoolFacilites: [
      {
        name: "Sports Complex",
        img_path: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"],
        _id: "3"
      }
    ],
    description: "Bole Secondary School is a public school known for its academic excellence and strong sports programs. The school offers both regular and advanced placement courses.",
    schoolTags: ["Public", "Sports", "Academic Excellence"],
    socialMedia: [],
    budgetMin: 10000,
    budgetMax: 30000,
    gender: "co-ed",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    _id: "4",
    name: "Unity University",
    email: "info@unity.edu.et",
    address: [
      {
        city: "Addis Ababa",
        subCity: "Sarbet",
        _id: "4"
      }
    ],
    phoneNumber: "+251 11 123 4567",
    schoolWebsite: "https://www.unity.edu.et",
    schoolType: "Private",
    division: ["University"],
    studentCount: 5000,
    yearEstablished: 1990,
    schoolFacilites: [
      {
        name: "Computer Lab",
        img_path: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"],
        _id: "4"
      }
    ],
    description: "Unity University is a private higher education institution offering undergraduate and graduate programs in various fields including business, engineering, and social sciences.",
    schoolTags: ["University", "Private", "Higher Education"],
    socialMedia: [],
    budgetMin: 30000,
    budgetMax: 80000,
    gender: "co-ed",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  },
  {
    _id: "5",
    name: "Ethiopian International School",
    email: "info@eis.edu.et",
    address: [
      {
        city: "Addis Ababa",
        subCity: "Sarbet",
        _id: "5"
      }
    ],
    phoneNumber: "+251 11 234 5678",
    schoolWebsite: "https://www.eis.edu.et",
    schoolType: "Private",
    division: ["Elementary", "Middle", "High"],
    studentCount: 400,
    yearEstablished: 2000,
    schoolFacilites: [
      {
        name: "Art Studio",
        img_path: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"],
        _id: "5"
      }
    ],
    description: "Ethiopian International School offers a unique blend of Ethiopian and international curricula, focusing on cultural diversity and global citizenship.",
    schoolTags: ["Private", "International", "Cultural Diversity"],
    socialMedia: [],
    budgetMin: 35000,
    budgetMax: 90000,
    gender: "co-ed",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
]; 