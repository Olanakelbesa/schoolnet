import React from "react";
import Card from "./Card";
import { Search, School, VerifiedUser } from "@mui/icons-material";

const mockData = [
  {
    id: 1,
    icon: <Search fontSize="large" />,
    title: "AI-Powered Recommendations",
    description:
      "Get personalized school matches based on your preferences and requirements",
  },
  {
    id: 2,
    icon: <School fontSize="large" />,
    title: "Verified School Profiles",
    description:
      "Access detailed and verified profiles of schools to make informed decisions",
  },
  {
    id: 3,
    icon: <VerifiedUser fontSize="large" />,
    title: "Trusted Reviews",
    description:
      "Read real reviews from parents to understand the experiences of others",
  },
];

function ChooseSection() {
  return (
    <div id="about">
      <h1 className="w-full flex justify-center pt-20 pb-10 text-center text-xl md:text-4xl font-bold">
        Why Choose SchoolNet?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 px-20">
        {mockData.map((item) => (
          <Card
            key={item.id}
            icons={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ChooseSection;