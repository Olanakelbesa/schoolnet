import { Book, Building, Globe, GraduationCap } from "lucide-react"

export default function SchoolCategories() {
  const categories = [
    {
      icon: <Book className="h-10 w-10 text-[#b188e3]" />,
      title: "Primary Schools",
      count: 120,
    },
    {
      icon: <Building className="h-10 w-10 text-[#b188e3]" />,
      title: "Secondary Schools",
      count: 80,
    },
    {
      icon: <Globe className="h-10 w-10 text-[#b188e3]" />,
      title: "International Schools",
      count: 42,
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-[#b188e3]" />,
      title: "Special Education",
      count: 28,
    },
  ]

  return (
    <div className="container mx-auto px-4 md:px-20 py-12">
      <h1 className="mb-10 text-center text-xl md:text-4xl font-bold">Find Schools By Category</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-[#efe7f9] p-8 shadow-md text-center transition-transform hover:scale-105 hover:cursor-pointer"
          >
            <div className="mb-4">{category.icon}</div>
            <h2 className="mb-2 text-xl font-semibold">{category.title}</h2>
            <p className="text-gray-600">{category.count} schools</p>
          </div>
        ))}
      </div>
    </div>
  )
}
