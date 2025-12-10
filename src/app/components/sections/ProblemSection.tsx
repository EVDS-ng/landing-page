import Image from "next/image";
import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import { motion } from "framer-motion";

interface ProblemSectionProps {
  content: {
    headline: string;
    content: string;
  };
}

export default function ProblemSection({ content }: ProblemSectionProps) {
  const problems = [
    "Your salary is already stretched thin",
    "You're scrambling for last-minute cash",
    "You settle for something underwhelming",
    "You feel guilty for months",
  ];

  const scenarios = [
    {
      title: "For others' birthdays:",
      description:
        "You want to surprise your mom, your partner, your best friend - but coordinating contributions is exhausting. WhatsApp chaos. Awkward money requests. People forgetting. Money mixing with your personal funds.",
    },
    {
      title: "For your own birthday:",
      description:
        "You drop hints. You hope someone remembers. You watch another year pass without the celebration you deserve.",
    },
  ];

  return (
    <SectionWrapper background="light" paddingY="xl">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <AnimatedText
              as="h2"
              className="text-section-title-mobile lg:text-section-title font-bold text-primary"
            >
              {content.headline}
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-lg text-gray-600 leading-relaxed">
                You want to give your loved ones something special. You promise
                yourself "this year will be different." But when the day
                arrives:
              </p>
            </AnimatedText>

            {/* Problem List */}
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-secondary-red rounded-full flex-shrink-0" />
                  <p className="text-gray-700">{problem}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div className="space-y-8">
            {/* Problem illustration image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8"
            >
              <Image
                src="/images/cake-cutting.jpg"
                alt="Person cutting birthday cake, representing celebration dreams"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {scenario.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {scenario.description}
                </p>
              </motion.div>
            ))}

            <AnimatedText delay={0.8}>
              <p className="text-xl font-semibold text-primary text-center">
                Sound familiar?
              </p>
            </AnimatedText>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
