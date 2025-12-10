import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered" | "glass";
  padding?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
}

export default function Card({
  children,
  className,
  variant = "default",
  padding = "lg",
  hover = true,
}: CardProps) {
  const variantClasses = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-lg",
    bordered: "bg-white border-2 border-primary-200",
    glass: "bg-white/80 backdrop-blur-md border border-white/20",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <motion.div
      className={cn(
        "rounded-3xl transition-all duration-300",
        variantClasses[variant],
        paddingClasses[padding],
        hover && "hover:shadow-2xl hover:-translate-y-1",
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
