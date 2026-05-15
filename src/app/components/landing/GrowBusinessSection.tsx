import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function GrowBusinessSection() {
  const points = [
    "Manage your services in one app",
    "Access hundreds of clients",
    "Secure payments",
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="bg-[#072147] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 relative min-h-[400px]">
          <Image
            src="/images/home-page/grow-business-image.png"
            alt="Grow your business as a vendor"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Right Side (Content) */}
        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white/5 backdrop-blur-md">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Grow Your Business
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-md">
            Join the everyday surprises vendors to bring joy to users and manage your orders effectively.
          </p>
          
          <ul className="space-y-4 mb-10">
            {points.map((point, index) => (
              <li key={index} className="flex items-center gap-3 text-white text-lg">
                <CheckCircle2 className="text-green-400" size={24} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          
          <div>
            <Link href="/vendor/register" className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform inline-block">
              Become a vendor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
