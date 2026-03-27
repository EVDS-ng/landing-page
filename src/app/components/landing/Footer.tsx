import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    COMPANY: [
      { name: "Home", href: "/" },
      { name: "Join Waitlist", href: "/waitlist" },
      { name: "Contact", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Terms and Privacy", href: "/terms-privacy" },
    ],
    PLANNER: [
      { name: "How it works", href: "/how-it-works" },
      { name: "Packages", href: "/how-it-works" },
      { name: "FAQs", href: "/faqs" },
    ],
    VENDOR: [{ name: "Registration", href: "/vendors" }],
  };

  return (
    <footer className="w-full pt-16 bg-white overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
        {/* Brand / Logo Side */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Everyday Surprises"
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-600 leading-relaxed font-medium">
            Plan, contribute & celebrate.
          </p>
          <div className="flex gap-4 items-center text-red-500">
            <Link
              href="#"
              className="p-2 border border-red-100 rounded-full hover:bg-red-50 transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              className="p-2 border border-red-100 rounded-full hover:bg-red-50 transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="#"
              className="p-2 border border-red-100 rounded-full hover:bg-red-50 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="#"
              className="p-2 border border-red-100 rounded-full hover:bg-red-50 transition-colors"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Full width bottom image */}
      <div className="w-full h-48 md:h-[400px] relative mt-auto">
        <Image
          src="/images/home-page/footer-banner-image.png"
          alt="Group of friends celebrating"
          fill
          className="object-cover object-top filter contrast-110"
        />
      </div>
    </footer>
  );
}
