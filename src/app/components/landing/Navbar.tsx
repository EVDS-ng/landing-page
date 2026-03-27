"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How it works", href: "/how-it-works" },
    { name: "For vendors", href: "/vendors" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white z-50 py-4 px-6 fixed top-0 left-0 right-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Everyday Surprises Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-red-500 font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/waitlist"
              className="bg-[#072147] hover:bg-[#0a2d5e] text-white font-semibold px-6 py-2 rounded-full transition-colors text-sm shadow-sm"
            >
              Join waitlist
            </Link>
            <Link
              href="/vendors"
              className="bg-red-50 text-red-500 font-semibold px-6 py-2 rounded-full transition-colors text-sm"
            >
              Vendor registration
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-red-500 font-medium py-2 border-b border-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/waitlist"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#072147] hover:bg-[#0a2d5e] text-white font-semibold py-3 rounded-full transition-colors"
            >
              Join waitlist
            </Link>
            <Link
              href="/vendors"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-red-500 font-semibold py-3 border border-red-500 rounded-full transition-colors"
            >
              Vendor registration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
