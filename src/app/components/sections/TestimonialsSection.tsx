import Container from "../ui/Container";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedText from "../ui/AnimatedText";
import Card from "../ui/Card";
import { motion } from "framer-motion";

interface TestimonialsSectionProps {
  content: {
    headline: string;
    placeholder: string;
  };
}

export default function TestimonialsSection({
  content,
}: TestimonialsSectionProps) {
  // Placeholder testimonials for demo
  const testimonials = [
    {
      name: "Adunni Okafor",
      role: "Lagos, Nigeria",
      testimonial:
        "Everyday Surprises made my husband's 30th birthday absolutely perfect! I saved for 3 months, friends contributed easily, and the vendors delivered everything flawlessly.",
      rating: 5,
      avatar: "👩🏾",
    },
    {
      name: "Tunde Adebayo",
      role: "Lagos, Nigeria",
      testimonial:
        "I finally got the birthday celebration I deserved! My friends loved how easy it was to contribute, and I didn't have to stress about planning anything.",
      rating: 5,
      avatar: "👨🏿",
    },
    {
      name: "Kemi Johnson",
      role: "Lagos, Nigeria",
      testimonial:
        "The vendors were amazing and the whole process was so smooth. My daughter's 16th birthday was magical thanks to Everyday Surprises!",
      rating: 5,
      avatar: "👩🏽",
    },
  ];

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

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full" variant="elevated" hover>
                  <div className="space-y-6">
                    {/* Rating */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ⭐
                        </span>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <p className="text-gray-700 leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Note for placeholder */}
          <AnimatedText delay={0.8}>
            <p className="text-center text-gray-500 text-sm italic">
              * These are example testimonials. Real user testimonials will be
              added after launch.
            </p>
          </AnimatedText>
        </div>
      </Container>
    </SectionWrapper>
  );
}
