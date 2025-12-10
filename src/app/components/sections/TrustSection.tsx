import Image from "next/image";
import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import Card from "../ui/Card";
import { motion } from "framer-motion";

interface TrustSectionProps {
  content: {
    headline: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function TrustSection({ content }: TrustSectionProps) {
  const trustIcons = ["🔒", "✅", "👀", "💯"]; // Placeholder icons

  return (
    <SectionWrapper background="white" paddingY="xl">
      <Container>
        <div className="space-y-16">
          <AnimatedText
            as="h2"
            className="text-section-title-mobile lg:text-section-title font-bold text-primary text-center"
          >
            {content.headline}
          </AnimatedText>

          {/* Background trust image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[5/2] rounded-3xl overflow-hidden mb-16"
          >
            <Image
              src="/images/festive-celebration.jpg"
              alt="Trusted celebration planning"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/20 to-secondary-blue/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl lg:text-4xl font-bold text-center">
                Trusted by 100+ Nigerian Families
              </h3>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full" hover>
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center text-3xl">
                      {trustIcons[index]}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
