import { Star } from "lucide-react";
import Link from "next/link";

export default function VendorsTestimonials() {
  const testimonials = [
    {
      name: "Matthew Adebayo",
      role: "Photographer",
      text: "Everyday Surprises is the best channel I've found to connect to party lovers. Have easily sold out packages.",
      rating: 5,
      avatarInitials: "M",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-600"
    },
    {
      name: "Anna Okoro",
      role: "Baker",
      text: "Everyday Surprises brings me highly targeted results, consistent revenue stream without extra hassle.",
      rating: 5,
      avatarInitials: "A",
      avatarBg: "bg-red-100",
      avatarText: "text-red-600"
    },
    {
      name: "Ahmed Musa",
      role: "Event Planner",
      text: "Our reach has more than tripled since joining this impressive platform. I'm taking on projects consistently.",
      rating: 5,
      avatarInitials: "A",
      avatarBg: "bg-cyan-100",
      avatarText: "text-cyan-600"
    }
  ];

  return (
    <section className="w-full bg-gray-50/30 py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="bg-yellow-50 text-yellow-600 border border-yellow-100 px-4 py-1.5 rounded-full text-sm font-semibold">
            ⭐ Success stories
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl">
            Hear from business owners growing with Everyday Surprises
          </h2>
          
          <Link 
            href="/vendor/register" 
            className="inline-block mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm"
          >
            Become a vendor
          </Link>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {testimonials.map((testi, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${testi.avatarBg} ${testi.avatarText}`}>
                  {testi.avatarInitials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testi.name}</h4>
                  <p className="text-sm font-medium text-red-500 bg-red-50 border border-red-100 inline-block px-3 py-1 mt-1 rounded-full">{testi.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed font-medium">
                "{testi.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
