'use client';

import Image from "next/image";
import React, { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "SchoolNet helped me find the perfect school for my daughter! The AI recommendations were spot on.",
      author: "Abeba T.",
      avatar: "/images/profilepic.jpg",
    },
    {
      id: 2,
      quote: "The verified school profiles made it easy to choose the best option for my son.",
      author: "Kebede M.",
      avatar: "/images/profilepic.jpg",
    },
    {
      id: 3,
      quote: "I loved the user-friendly interface and the detailed reviews from other parents.",
      author: "Sara L.",
      avatar: "/images/profilepic.jpg",
    },
    {
      id: 4,
      quote: "SchoolNet is a game-changer for parents looking for the best schools in Ethiopia.",
      author: "Mulugeta G.",
      avatar: "/images/profilepic.jpg",
    },
    {
      id: 5,
      quote: "The AI-powered recommendations saved me so much time. Highly recommend it!",
      author: "Hana B.",
      avatar: "/images/profilepic.jpg",
    },
  ];

  const [visibleCards, setVisibleCards] = useState(3); // Default to 3 cards for large screens

  // Adjust the number of visible cards based on screen size
  React.useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3); // Large screens (lg)
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2); // Medium screens (md)
      } else {
        setVisibleCards(1); // Small screens (sm)
      }
    };

    updateVisibleCards(); // Set initial value
    window.addEventListener("resize", updateVisibleCards); // Listen for screen size changes

    return () => window.removeEventListener("resize", updateVisibleCards); // Cleanup
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-xl md:text-4xl font-bold">What Our Users Say</h2>

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, visibleCards).map((testimonial) => (
            <div
              key={testimonial.id}
              className="border-l-4 border-[#795C9E] shadow-md rounded-lg p-6 relative transition-transform transform hover:scale-105"
            >
              <div className="text-purple-500 text-4xl absolute top-4 left-4">"</div>
              <p className="pt-6 pb-4">{testimonial.quote}</p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <span className="font-medium">{testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}