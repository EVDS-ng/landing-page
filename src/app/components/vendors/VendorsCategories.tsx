import { CakeSlice, Gift, FlagTriangleRight, UtensilsCrossed, Camera, CalendarHeart } from "lucide-react";
import Link from "next/link";

export default function VendorsCategories() {
  const categories = [
    {
      title: "Cake Vendors",
      description: "Connect and sell your baked creations to users planning birthday parties.",
      icon: CakeSlice,
      bgColor: "bg-yellow-400",
      textColor: "text-yellow-900",
    },
    {
      title: "Gift Vendors",
      description: "Find users ready to purchase your unique gifts tailored for loved ones.",
      icon: Gift,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Decor Vendors",
      description: "Transform empty spaces to beautiful party venues with your aesthetic skills.",
      icon: FlagTriangleRight,
      bgColor: "bg-cyan-400",
      textColor: "text-cyan-900",
    },
    {
      title: "Catering Vendors",
      description: "Serve hot meals, cakes and beverages to users celebrating their big day.",
      icon: UtensilsCrossed,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Photographers",
      description: "Capture moments, faces and beautiful birthday memories.",
      icon: Camera,
      bgColor: "bg-cyan-400",
      textColor: "text-cyan-900",
    },
    {
      title: "Event Planners",
      description: "Run the whole show on site while ensuring the celebrant is relaxed.",
      icon: CalendarHeart,
      bgColor: "bg-yellow-400",
      textColor: "text-yellow-900",
    },
  ];

  return (
    <section className="w-full bg-[#0B214B] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 gap-6">
          <div className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium">
            Categories
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight">
            Bring Your Business to Everyday Surprises
          </h2>
          
          <Link 
            href="/vendor/register" 
            className="inline-block mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm"
          >
            Become a vendor
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-3xl p-8 ${cat.bgColor} ${cat.textColor}`}
            >
              {/* Top Icon */}
              <cat.icon className="w-8 h-8 mb-6 relative z-10" />
              
              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3 relative z-10">
                {cat.title}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed font-medium relative z-10 opacity-90`}>
                {cat.description}
              </p>

              {/* Watermark Icon */}
              <cat.icon 
                className={`absolute -right-6 -bottom-6 w-40 h-40 opacity-20 -rotate-12 pointer-events-none 
                  ${cat.bgColor === 'bg-yellow-400' ? 'text-yellow-900' : 'text-current'}
                `} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
