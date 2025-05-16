export interface StaffMember {
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
}

export interface FeeStructure {
  level: string;
  fee: string;
  spots: number;
}

export interface Review {
  name: string;
  imageUrl: string;
  rating: number;
  text: string;
  role: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  type: string;
  students: number;
  rating: number;
  reviews: number;
  gradeLevel: string;
  description: string;
  imageUrl: string;
  coverImageUrl: string;
  contactDetails: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  academics: string;
  averageMarks: number;
  extraCurriculum: string[];
  admissionsCriteria: string[];
  fees: FeeStructure[];
  staff: StaffMember[];
  reviewsList: Review[];
  similarSchools: {
    id: string;
    name: string;
    location: string;
    type: string;
    gradeLevel: string;
    imageUrl: string;
    rating: number;
  }[];
}

export const schools: School[] = [
  {
    id: "1",
    name: "John F. Kennedy School",
    location: "Washington Ave, Manchester, Kentucky 39495",
    type: "Mixed",
    students: 912,
    rating: 4.9,
    reviews: 180,
    gradeLevel: "K-12",
    description: "A leading educational institution with a focus on excellence",
    imageUrl: "/placeholder.svg?height=60&width=60",
    coverImageUrl: "/school.png",
    contactDetails: {
      address: "Washington Ave, Manchester, Kentucky 39495",
      phone: "(684) 555-0102",
      email: "johnkennedy@example.com",
      website: "johnkennedy.com",
    },
    academics: "Davidson School is dedicated to providing high-quality education through the British Curriculum. Our approach focuses on developing critical thinking skills, creativity, and a global perspective.",
    averageMarks: 92,
    extraCurriculum: ["Tennis", "Soccer", "Basketball", "Handball"],
    admissionsCriteria: [
      "Complete the Application Form: Download from our website or request a physical copy.",
      "Submit Required Documents: Recent passport-sized photographs, Previous academic records, Recommendation letter (if applicable)",
      "Register for Entrance Assessment: Include this in your application.",
      "Attend the Interview: Schedule with our admissions team.",
      "Receive Admission Notification: You'll be informed of your child's status after the assessment and interview.",
    ],
    fees: [
      { level: "Early Learning Center", fee: "$5,000", spots: 20 },
      { level: "Grade 1-Grade 4", fee: "$5,000", spots: 20 },
      { level: "Grade 4-Grade 8", fee: "$8,000", spots: 40 },
      { level: "Grade 8-Grade 12", fee: "$8,000", spots: 40 },
      { level: "University", fee: "$14,000", spots: 40 },
    ],
    staff: [
      {
        name: "Jane Cooper",
        role: "Leading psychologist in cognitive function",
        imageUrl: "/staff.jpg",
        rating: 4.9,
      },
      {
        name: "Jane Cooper",
        role: "Leading psychologist in cognitive function",
        imageUrl: "/staff.jpg",
        rating: 4.9,
      },
      {
        name: "Jane Cooper",
        role: "Leading psychologist in cognitive function",
        imageUrl: "/staff.jpg",
        rating: 4.9,
      },
    ],
    reviewsList: [
      {
        name: "John Smith",
        imageUrl: "/parent.jpg",
        rating: 5,
        text: "Lorem ipsum dolor sit amet consectetur. Hac amet tincidunt interdum ut suspendisse cursus. Erat tincidunt dolor quam varius tristique neque diam.",
        role: "Parent",
      },
      {
        name: "John Smith",
        imageUrl: "/parent.jpg",
        rating: 5,
        text: "Lorem ipsum dolor sit amet consectetur. Hac amet tincidunt interdum ut suspendisse cursus. Erat tincidunt dolor quam varius tristique neque diam.",
        role: "Parent",
      },
    ],
    similarSchools: [
      {
        id: "2",
        name: "Stuyvesant High School",
        location: "345 Chambers St, New York",
        type: "Private",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.7,
      },
      {
        id: "3",
        name: "Boston College School",
        location: "478 Boylston, Boston",
        type: "Public",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.8,
      },
      {
        id: "4",
        name: "Boston College School",
        location: "478 Boylston, Boston",
        type: "Public",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.8,
      },
      {
        id: "5",
        name: "Boston College School",
        location: "478 Boylston, Boston",
        type: "Public",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.8,
      },
      {
        id: "6",
        name: "Boston College School",
        location: "478 Boylston, Boston",
        type: "Public",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.8,
      },
    ],
  },
  {
    id: "2",
    name: "Stuyvesant High School",
    location: "345 Chambers St, New York",
    type: "Public",
    students: 850,
    rating: 4.7,
    reviews: 150,
    gradeLevel: "9-12",
    description: "A prestigious public high school known for its rigorous academic program and strong focus on STEM education.",
    imageUrl: "/placeholder.svg?height=60&width=60",
    coverImageUrl: "/school.png",
    contactDetails: {
      address: "345 Chambers St, New York, NY 10282",
      phone: "(212) 312-4800",
      email: "info@stuy.edu",
      website: "stuy.edu",
    },
    academics: "Stuyvesant High School offers a comprehensive curriculum with a strong emphasis on mathematics, science, and technology. The school is known for its advanced placement courses and competitive academic environment.",
    averageMarks: 95,
    extraCurriculum: ["Robotics", "Debate", "Science Olympiad", "Math Team"],
    admissionsCriteria: [
      "Take the Specialized High Schools Admissions Test (SHSAT)",
      "Submit application through the NYC Department of Education",
      "Meet minimum score requirements",
      "Complete registration process upon acceptance",
    ],
    fees: [
      { level: "Grade 9-12", fee: "Free (Public School)", spots: 100 },
    ],
    staff: [
      {
        name: "Dr. Sarah Johnson",
        role: "Principal",
        imageUrl: "/staff.jpg",
        rating: 4.8,
      },
      {
        name: "Prof. Michael Chen",
        role: "Head of Science Department",
        imageUrl: "/staff.jpg",
        rating: 4.9,
      },
    ],
    reviewsList: [
      {
        name: "Emily Chen",
        imageUrl: "/parent.jpg",
        rating: 5,
        text: "Excellent academic environment with dedicated teachers and challenging curriculum.",
        role: "Parent",
      },
    ],
    similarSchools: [
      {
        id: "1",
        name: "John F. Kennedy School",
        location: "Washington Ave, Manchester",
        type: "Mixed",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.9,
      },
    ],
  },
  {
    id: "3",
    name: "Boston College School",
    location: "478 Boylston, Boston",
    type: "Private",
    students: 1200,
    rating: 4.8,
    reviews: 200,
    gradeLevel: "K-12",
    description: "A prestigious private school offering a comprehensive education from kindergarten through high school.",
    imageUrl: "/placeholder.svg?height=60&width=60",
    coverImageUrl: "/school.png",
    contactDetails: {
      address: "478 Boylston St, Boston, MA 02116",
      phone: "(617) 552-8000",
      email: "admissions@bc.edu",
      website: "bc.edu",
    },
    academics: "Boston College School provides a well-rounded education with a focus on academic excellence, character development, and community service.",
    averageMarks: 94,
    extraCurriculum: ["Music", "Drama", "Sports", "Community Service"],
    admissionsCriteria: [
      "Submit application form",
      "Provide academic records",
      "Take entrance examination",
      "Complete interview process",
      "Submit letters of recommendation",
    ],
    fees: [
      { level: "Elementary", fee: "$25,000", spots: 30 },
      { level: "Middle School", fee: "$28,000", spots: 25 },
      { level: "High School", fee: "$32,000", spots: 20 },
    ],
    staff: [
      {
        name: "Dr. Robert Williams",
        role: "Headmaster",
        imageUrl: "/staff.jpg",
        rating: 4.9,
      },
      {
        name: "Dr. Maria Garcia",
        role: "Director of Admissions",
        imageUrl: "/staff.jpg",
        rating: 4.8,
      },
    ],
    reviewsList: [
      {
        name: "David Thompson",
        imageUrl: "/parent.jpg",
        rating: 5,
        text: "Outstanding school with excellent facilities and dedicated staff.",
        role: "Parent",
      },
    ],
    similarSchools: [
      {
        id: "1",
        name: "John F. Kennedy School",
        location: "Washington Ave, Manchester",
        type: "Mixed",
        gradeLevel: "K-12",
        imageUrl: "/similar-school.png",
        rating: 4.9,
      },
    ],
  },
]; 