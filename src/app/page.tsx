"use client";

import { getWebsiteContent } from "@/lib/content";
import Navigation from "./components/sections/Navigation";
import HeroSection from "./components/sections/HeroSection";
import ProblemSection from "./components/sections/ProblemSection";
import SolutionSection from "./components/sections/SolutionSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import TrustSection from "./components/sections/TrustSection";
import PackagesSection from "./components/sections/PackagesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import FAQSection from "./components/sections/FAQSection";
import FinalCTASection from "./components/sections/FinalCTASection";
import Footer from "./components/sections/Footer";

export default function HomePage() {
  const content = getWebsiteContent();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection content={content.hero} />
        <ProblemSection content={content.problem} />
        <SolutionSection content={content.solution} />
        <section id="how-it-works">
          <HowItWorksSection content={content.howItWorks} />
        </section>
        <TrustSection content={content.trust} />
        <section id="packages">
          <PackagesSection content={content.packages} />
        </section>
        <TestimonialsSection content={content.testimonials} />
        <section id="faq">
          <FAQSection content={content.faq} />
        </section>
        <FinalCTASection content={content.finalCta} />
        <Footer content={content.footer} />
      </main>
    </div>
  );
}

