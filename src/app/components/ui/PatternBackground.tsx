import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PatternBackgroundProps {
  children?: ReactNode;
  pattern?: "circles" | "geometric" | "waves";
  className?: string;
}

export default function PatternBackground({
  children,
  pattern = "circles",
  className = "",
}: PatternBackgroundProps) {
  const renderPattern = () => {
    switch (pattern) {
      case "circles":
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="100"
              cy="100"
              r="50"
              fill="#072147"
              fillOpacity="0.05"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="300"
              cy="150"
              r="30"
              fill="#FF304E"
              fillOpacity="0.08"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.circle
              cx="200"
              cy="300"
              r="40"
              fill="#0AB7D9"
              fillOpacity="0.06"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.06, 0.12, 0.06],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </svg>
        );

      case "geometric":
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.polygon
              points="50,50 100,20 150,50 150,100 100,130 50,100"
              fill="#FECC4F"
              fillOpacity="0.1"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.rect
              x="250"
              y="100"
              width="60"
              height="60"
              fill="#072147"
              fillOpacity="0.08"
              animate={{
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {renderPattern()}
      {children}
    </div>
  );
}
