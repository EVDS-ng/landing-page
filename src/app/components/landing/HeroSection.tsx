import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-2">
            ✨ #New Platform
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Plan the Birthday🎉. Friends{" "}
            <span className="text-red-500">Contribute</span> with You😊. Vendors{" "}
            <span className="text-red-500">Deliver</span> the Surprise🎁.
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Stop wishing and save for that dream birthday! Vendors handles the
            surprise perfectly for you. Join 100+ Nigerians planning
            unforgettable birthdays in Lagos.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 bg-[#FF304E] hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-red-500/25 text-base"
            >
              🎁 Join the waitlist
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 border-2 border-[#072147] text-[#072147] hover:bg-[#072147] hover:text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end mt-10 md:mt-0">
          <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square animate-float">
            <Image
              src="/images/home-page/hero.png"
              alt="Everyday Surprises App Mockup"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
