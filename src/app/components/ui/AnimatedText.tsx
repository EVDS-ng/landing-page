import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  delay?: number;
}

export default function AnimatedText({
  children,
  as: Component = "p",
  className,
  delay = 0,
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  );
}
