import React from 'react'

interface CardProps { 
    icons: React.ReactNode;
    title: string;
    description: string;
}

function Card({ icons, title, description }: CardProps) {
  return (
    <div>
        <div className="flex flex-col items-center justify-center w-full h-full p-4 py-6 bg-[#efe7f9] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  ease-in-out transform hover:scale-105">
            <div className="text-4xl mb-4 text-[#b188e3]">{icons}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    </div>
  )
}

export default Card