import { ChevronRight } from "lucide-react";
import Header from "@/app/components/ParentDashboard/Header";
import HeroSection from "@/app/components/ParentDashboard/HeroSection";
import SchoolCategoryCard from "@/app/components/ParentDashboard/SchoolCategoryCard";
import SchoolCard from "@/app/components/ParentDashboard/SchoolCard";
import SchoolGrid from "@/app/components/ParentDashboard/SchoolGrid";
import Link from "next/link";

export default function ParentDashboard() {
  // School category data
  const schoolCategories = [
    {
      title: "Primary schools",
      icon: "/primary-school.png",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-700",
    },
    {
      title: "Middle schools",
      icon: "/middle-school.png",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "High schools",
      icon: "/high-school.png",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-700",
    },
    {
      title: "University and colleges",
      icon: "/university.png",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700",
    },
  ];

  // School data
  const schools = [
    {
      id: "1",
      name: "John Kennedy School",
      location: "Washington Ave, Manchester",
      type: "Public",
      students: 1800,
      rating: 4.9,
      reviewCount: 512,
      description:
        "Graduate John F. Kennedy School offered an exceptional education with dedicated teachers who inspired me to excel. The diverse programs and strong community support helped me build lasting friendships and prepare for future challenges.",
    },
    {
      id: "2",
      name: "John Kennedy School",
      location: "Washington Ave, Manchester",
      type: "Public",
      students: 1800,
      rating: 4.9,
      reviewCount: 512,
      description:
        "Graduate John F. Kennedy School offered an exceptional education with dedicated teachers who inspired me to excel. The diverse programs and strong community support helped me build lasting friendships and prepare for future challenges.",
    },
  ];

  // Subcity data
  const subcities = [
    {
      name: "Bole",
      schoolCount: 20,
      schools: [
        {
          id: "3",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "4",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "5",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "6",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
      ],
    },
    {
      name: "Kirkos",
      schoolCount: 15,
      schools: [
        {
          id: "7",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "8",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "9",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
        {
          id: "10",
          name: "John Kennedy School",
          location: "Washington Ave, Manchester",
          type: "Public",
          students: 1800,
          rating: 4.9,
          imageUrl: "/dandiboru.jpg",
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-auto">

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero section */}
          <HeroSection />

          {/* School categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {schoolCategories.map((category, index) => (
              <SchoolCategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                bgColor={category.bgColor}
                iconColor={category.iconColor}
              />
            ))}
          </div>

          {/* Schools near you */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Schools near you</h2>

            <div className="flex flex-col gap-3">
              {schools.map((school, index) => (
                <SchoolCard
                  key={index}
                  id={school.id}
                  name={school.name}
                  location={school.location}
                  type={school.type}
                  students={school.students}
                  rating={school.rating}
                  reviewCount={school.reviewCount}
                  description={school.description}
                />
              ))}
            </div>
          </div>

          {/* Schools by Subcity */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schools by Subcity</h2>
              <Link
                href="/dashboard/schools"
                className="text-sm text-purple-700 hover:text-purple-800 flex items-center"
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {subcities.map((subcity, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center mb-3">
                  <Link
                    href={`/dashboard/schools?subcity=${subcity.name}`}
                    className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-2 mr-2 cursor-pointer"
                  >
                    <span className="text-sm font-medium">{subcity.name}</span>
                  </Link>
                  <div className="text-sm text-gray-500">
                    {subcity.schoolCount} schools
                  </div>
                </div>

                <SchoolGrid schools={subcity.schools} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
