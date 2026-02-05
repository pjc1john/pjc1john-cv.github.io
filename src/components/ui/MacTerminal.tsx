"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "success" | "info";
  text: string;
  delay?: number;
}

interface MacTerminalProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
}

export const MacTerminal = ({ title = "Terminal", lines, className = "" }: MacTerminalProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const timer = setTimeout(() => setIsTyping(false), 0);
      return () => clearTimeout(timer);
    }

    const currentLine = lines[visibleLines];
    const delay = currentLine.delay || (currentLine.type === "command" ? 50 : 20);

    if (currentText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.text.slice(0, currentText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCurrentText("");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, currentText, lines]);

  const getLineStyle = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-green-400";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-slate-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-2xl mx-auto ${className}`}
    >
      {/* Terminal Window */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
        {/* Title Bar */}
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-slate-400 text-sm font-medium">{title}</span>
          </div>
          <div className="w-14" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Content */}
        <div className="bg-slate-900 p-4 sm:p-6 font-mono text-sm sm:text-base min-h-[150px]">
          {lines.slice(0, visibleLines).map((line, index) => (
            <div key={index} className={`mb-2 ${getLineStyle(line.type)}`}>
              {line.text}
            </div>
          ))}

          {/* Currently typing line */}
          {visibleLines < lines.length && (
            <div className={`mb-2 ${getLineStyle(lines[visibleLines].type)}`}>
              {currentText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-slate-300 ml-1 align-middle"
              />
            </div>
          )}

          {/* Blinking cursor when done */}
          {!isTyping && (
            <div className="text-green-400">
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-green-400 align-middle"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
