import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import Card from "../ui/Card";
import { motion } from "framer-motion";

interface HowItWorksProps {
  content: {
    forYourself: {
      title: string;
      steps: string[];
    };
    forOwnBirthday: {
      title: string;
      steps: string[];
    };
  };
}

export default function HowItWorksSection({ content }: HowItWorksProps) {
  const scenarios = [
    {
      title: content.forYourself.title,
      steps: content.forYourself.steps,
      color: "bg-secondary-blue",
      bgColor: "bg-blue-50",
    },
    {
      title: content.forOwnBirthday.title,
      steps: content.forOwnBirthday.steps,
      color: "bg-secondary-red",
      bgColor: "bg-red-50",
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
            How It Works
          </AnimatedText>

          <div className="grid lg:grid-cols-2 gap-12">
            {scenarios.map((scenario, scenarioIndex) => (
              <motion.div
                key={scenarioIndex}
                initial={{ opacity: 0, x: scenarioIndex === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: scenarioIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" className={scenario.bgColor}>
                  <h3 className="text-2xl font-semibold text-primary mb-8">
                    {scenario.title}
                  </h3>

                  <div className="space-y-6">
                    {scenario.steps.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: scenarioIndex * 0.2 + stepIndex * 0.1 + 0.3,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4"
                      >
                        {/* Step indicator */}
                        <div className="flex-shrink-0 mt-1">
                          {stepIndex === scenario.steps.length - 1 ? (
                            <div
                              className={`w-6 h-6 rounded-full ${scenario.color} flex items-center justify-center`}
                            >
                              <span className="text-white text-sm">🎉</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          )}
                        </div>

                        {/* Step content */}
                        <div className="flex-1">
                          <p
                            className={`${
                              stepIndex === 0
                                ? "font-semibold text-primary"
                                : "text-gray-700"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connecting line (except for last step) */}
                  <div className="absolute left-8 top-20 bottom-20 w-px bg-gray-300 hidden lg:block" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
