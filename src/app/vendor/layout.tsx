import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white font-poppins text-primary">
      {/* Left side image area */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/vendor-registration.png"
          alt="Vendor background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay if needed to match design */}
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Logo at top left */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Everyday Surprises Logo"
              width={180}
              height={60}
              className="h-10 w-auto object-contain bg-white/80 p-2 rounded"
            />
          </Link>
        </div>
      </div>

      {/* Right side content area */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto min-h-screen">
        {/* Top left logo — visible only when left panel is hidden (mobile/tablet) */}
        <div className="absolute top-6 left-6 z-10 lg:hidden">
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Everyday Surprises Logo"
              width={160}
              height={54}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Top right button */}
        <div className="absolute top-8 right-8 z-10 sm:block">
          <Link
            href="/how-it-works"
            className="bg-secondary-red hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition-colors text-sm shadow-sm"
          >
            Download app
          </Link>
        </div>

        {/* Dynamic step content */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16 w-full max-w-2xl mx-auto pt-24 sm:pt-24 shrink-0">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
