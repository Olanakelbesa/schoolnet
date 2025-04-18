import Image from "next/image"

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
      quote: "SchoolNet helped me find the perfect school for my daughter! The AI recommendations were spot on.",
      author: "Abeba T.",
      avatar: "/images/profilepic.jpg",
    },
    {
      id: 3,
      quote: "SchoolNet helped me find the perfect school for my daughter! The AI recommendations were spot on.",
      author: "Abeba T.",
      avatar: "/images/profilepic.jpg",
    },
  ]

  return (
    <section className="py-16 px-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className=" border-l-4 border-[#795C9E] shadow-md rounded-lg p-6 relative transition-transform transform hover:scale-105">
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
  )
}
