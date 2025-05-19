import Image from "next/image";
import type { ReactNode } from "react";
import React from "react";

interface SchoolCategoryCardProps {
  title: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export default function SchoolCategoryCard({
  title,
  icon,
  bgColor,
  iconColor,
}: SchoolCategoryCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 flex items-center justify-center gap-4 py-8 ${
        title === "Primary schools" ? "bg-[#5a3b82] text-white" : "bg-white border-[#5a3b82] text-[#5a3b82]"
      }`}
    >
      <div className={`h-10 w-10 ${iconColor}`}>
        <Image src={icon} alt={title} width={60} height={60} />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
}
