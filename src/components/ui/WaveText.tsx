"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const WaveText = ({
  text,
  className,
  delay = 0,
  duration = 0.5,
}: WaveTextProps) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface WavyTextLoopProps {
  text: string;
  className?: string;
  characterClassName?: string;
}

export const WavyTextLoop = ({
  text,
  className,
  characterClassName,
}: WavyTextLoopProps) => {
  const letters = text.split("");

  return (
    <span className={cn("inline-flex flex-wrap justify-center", className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={cn("inline-block", characterClassName)}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.05,
            ease: "easeInOut",
          }}
          style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface WavyParagraphProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const WavyParagraph = ({
  text,
  className,
  wordClassName,
}: WavyParagraphProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.p
      className={cn("flex flex-wrap justify-center gap-x-2", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          className={cn("inline-block", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};
