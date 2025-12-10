import Image from "next/image";
import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import Card from "../ui/Card";
import { motion } from "framer-motion";

interface SolutionSectionProps {
  content: {
    headline: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function SolutionSection({ content }: SolutionSectionProps) {
  const stepImages = [
    "/images/cupcakes-ballons.jpg",
    "/images/festive-celebration.jpg",
    "/images/celebration.jpg",
  ];

  return (
    <SectionWrapper background="white" paddingY="xl">
      <Container>
        <div className="text-center space-y-16">
          <AnimatedText
            as="h2"
            className="text-section-title-mobile lg:text-section-title font-bold text-primary"
          >
            {content.headline}
          </AnimatedText>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {content.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full" variant="elevated">
                  {/* Step Image */}
                  <div className="mb-6">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={stepImages[index]}
                        alt={`Step ${index + 1}: ${step.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                      <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <AnimatedText delay={0.8}>
            <p className="text-xl font-medium text-primary-600">
              From first deposit to final delivery, we've got you.
            </p>
          </AnimatedText>
        </div>
      </Container>
    </SectionWrapper>
  );
}
