import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { motion } from "framer-motion";

interface PackagesSectionProps {
  content: {
    headline: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
    }>;
  };
}

export default function PackagesSection({ content }: PackagesSectionProps) {
  const packageColors = [
    { bg: "bg-amber-50", border: "border-amber-200", accent: "bg-amber-500" },
    { bg: "bg-gray-50", border: "border-gray-300", accent: "bg-gray-500" },
    {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      accent: "bg-yellow-500",
    },
    {
      bg: "bg-purple-50",
      border: "border-purple-300",
      accent: "bg-purple-500",
    },
  ];

  return (
    <SectionWrapper background="light" paddingY="xl">
      <Container>
        <div className="space-y-16">
          <AnimatedText
            as="h2"
            className="text-section-title-mobile lg:text-section-title font-bold text-primary text-center"
          >
            {content.headline}
          </AnimatedText>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {content.plans.map((plan, index) => (
              <PackageCard
                key={index}
                plan={plan}
                index={index}
                colors={packageColors[index]}
                featured={index === 2} // Gold package featured
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="grid gap-6 sm:grid-cols-2">
              {content.plans.map((plan, index) => (
                <PackageCard
                  key={index}
                  plan={plan}
                  index={index}
                  colors={packageColors[index]}
                  featured={index === 2}
                />
              ))}
            </div>
          </div>

          <AnimatedText delay={0.8}>
            <p className="text-center text-gray-600">
              All packages customizable. Pricing varies by location.
            </p>
          </AnimatedText>
        </div>
      </Container>
    </SectionWrapper>
  );
}

interface PackageCardProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
  };
  index: number;
  colors: {
    bg: string;
    border: string;
    accent: string;
  };
  featured?: boolean;
}

function PackageCard({ plan, index, colors, featured }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={featured ? "transform scale-105" : ""}
    >
      <Card
        className={`h-full relative ${colors.bg} ${colors.border} border-2 ${
          featured ? "ring-2 ring-primary" : ""
        }`}
        hover
      >
        {featured && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}

        <div className="space-y-6">
          {/* Package Header */}
          <div className="text-center">
            <div
              className={`w-12 h-12 mx-auto rounded-xl ${colors.accent} mb-4`}
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {plan.name}
            </h3>
            <p className="text-2xl font-bold text-primary mb-2">{plan.price}</p>
            <p className="text-gray-600 text-sm">{plan.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {plan.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            variant={featured ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            Choose Plan
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
