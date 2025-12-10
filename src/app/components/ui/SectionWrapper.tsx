import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "light" | "dark";
  paddingY?: "sm" | "md" | "lg" | "xl";
}

export default function SectionWrapper({
  children,
  className,
  id,
  background = "white",
  paddingY = "lg",
}: SectionWrapperProps) {
  const backgroundClasses = {
    white: "bg-white",
    light: "bg-gray-50",
    dark: "bg-primary-900",
  };

  const paddingClasses = {
    sm: "py-12 lg:py-16",
    md: "py-16 lg:py-20",
    lg: "py-20 lg:py-24",
    xl: "py-24 lg:py-32",
  };

  return (
    <section
      id={id}
      className={cn(
        backgroundClasses[background],
        paddingClasses[paddingY],
        "relative overflow-hidden",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
