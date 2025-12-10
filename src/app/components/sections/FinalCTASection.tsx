import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";
import AnimatedText from "../ui/AnimatedText";
import { motion } from "framer-motion";

interface FinalCTASectionProps {
  content: {
    headline: string;
    subheadline: string;
    ctaButton: string;
    belowButton: string;
    trustBadges: string;
  };
}

export default function FinalCTASection({ content }: FinalCTASectionProps) {
  const trustBadges = content.trustBadges.split(" • ");

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/celebration.jpg"
          alt="Birthday celebration background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-red/90 to-red-600/80" />
      </div>

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 400}
              cy={Math.random() * 400}
              r={Math.random() * 30 + 10}
              fill="white"
              fillOpacity="0.1"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <AnimatedText
            as="h2"
            className="text-4xl lg:text-6xl font-bold text-white leading-tight"
          >
            {content.headline}
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              {content.subheadline}
            </p>
          </AnimatedText>

          <div className="space-y-6">
            <AnimatedText delay={0.4}>
              <Button
                size="xl"
                variant="primary"
                className="bg-white text-secondary-red hover:bg-gray-100 shadow-2xl text-lg px-12 py-4"
              >
                {content.ctaButton}
              </Button>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <p className="text-white/80 text-sm max-w-2xl mx-auto">
                {content.belowButton}
              </p>
            </AnimatedText>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4 pt-8"
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-white/80 text-sm"
              >
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <span>{badge.trim()}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
