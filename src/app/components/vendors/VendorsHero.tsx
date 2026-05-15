import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function VendorsHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col md:flex-row items-center gap-12">
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col items-start gap-6 z-10">
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-100">
          <span>🎉 For Vendors</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Grow Your Business With Nigeria's Premier <span className="text-red-500">Birthday Celebration Platform 🎉</span>
        </h1>
        
        <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
          Partner with us and run your gig like a pro with tools that win consistently. Get verified, track bookings, and get paid seamlessly on Every Day Surprises.
        </p>
        
        <div className="mt-4">
          <Link 
            href="/vendor/register" 
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-sm"
          >
            Become a vendor
          </Link>
        </div>
      </div>
      
      {/* Right Image */}
      <div className="md:w-1/2 relative w-full aspect-square md:aspect-[4/3] flex justify-center items-center">
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden drop-shadow-2xl">
           <Image
             src="/images/vendors/hero.png"
             alt="Smiling female baker holding a birthday cake"
             fill
             className="object-cover object-top"
             priority
           />
        </div>

        {/* Floating Rating Pill - Bottom Left corner to overlap the image slightly */}
        <div className="absolute -left-4 bottom-12 md:left-4 md:-bottom-2 bg-white rounded-full p-2 pr-6 shadow-xl flex items-center gap-3 border border-gray-100">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-100 shrink-0">
             {/* Use generic user face from default placeholder, or fallback to an icon. I will use the cake image from home-page as a placeholder if no avatar exists, wait, just use the hero itself zoomed in as a hack or a solid color. */}
             <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">M</div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">Mutiyat Bake & Love</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
               <span className="flex items-center text-yellow-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="ml-1 text-gray-700 font-semibold">5.0</span>
               </span>
               <span className="mx-1">•</span>
               <span>Wedding & Birthday Cakes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
