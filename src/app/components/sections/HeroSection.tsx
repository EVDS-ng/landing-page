import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import AnimatedText from "../ui/AnimatedText";
import PatternBackground from "../ui/PatternBackground";

interface HeroSectionProps {
  content: {
    headline: string;
    subheadline: string;
    ctaButton: string;
    supportingText: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 to-white overflow-hidden pt-16">
      <PatternBackground pattern="circles" className="absolute inset-0" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <AnimatedText
              as="h1"
              className="text-hero-mobile lg:text-hero-desktop font-bold text-primary leading-tight"
            >
              {content.headline}
            </AnimatedText>

            <AnimatedText
              delay={0.2}
              as="p"
              className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
            >
              {content.subheadline}
            </AnimatedText>

            <div className="space-y-4">
              <AnimatedText delay={0.4}>
                <Button size="xl" className="w-full sm:w-auto">
                  {content.ctaButton}
                </Button>
              </AnimatedText>

              <AnimatedText delay={0.6}>
                <p className="text-primary-600 font-medium">
                  {content.supportingText}
                </p>
              </AnimatedText>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-4xl overflow-hidden">
              {/* Hero celebration image */}
              <Image
                src="/images/celebration.jpg"
                alt="Birthday celebration with cake and balloons"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary-blue/20" />

              {/* Floating elements */}
              <div
                className="absolute top-1/4 right-1/4 w-16 h-16 bg-secondary-red/80 rounded-full animate-float backdrop-blur-sm"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-secondary-yellow/80 rounded-full animate-float backdrop-blur-sm"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/2 left-1/2 w-20 h-20 bg-secondary-blue/40 rounded-full animate-float backdrop-blur-sm"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </section>
  );
}
