export default function HeroBanner() {
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gradient-to-r from-[#3F3D56] to-[#B188E3] ">
      {/* Star decorations */}
      <div className="absolute right-4 top-2 text-purple-300 opacity-30">
        <StarIcon size={60} />
      </div>
      <div className="absolute right-40 top-2 text-purple-300 opacity-30">
        <StarIcon size={30} />
      </div>
      <div className="absolute right-20 top-12 text-purple-300 opacity-30">
        <StarIcon size={70} />
      </div>
      <div className="absolute right-8 bottom-0 text-purple-300 opacity-30">
        <StarIcon size={30} />
      </div>
      <div className="absolute right-40 -bottom-5 text-purple-300 opacity-30">
        <StarIcon size={80} />
      </div>

      {/* Text content */}
      <div className="flex items-center h-full px-8 ">
        <h2 className="text-white text-2xl md:text-3xl font-semibold">
          Find the perfect school for you
        </h2>
      </div>
    </div>
  );
}

// Custom star icon component
function StarIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
