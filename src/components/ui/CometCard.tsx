"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Meteors component for the comet effect
export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: Math.floor(Math.random() * 100) + "%",
            left: Math.floor(Math.random() * 100) + "%",
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
          }}
        />
      ))}
    </>
  );
};

// Main Comet Card Component
export const CometCard = ({
  children,
  className,
  containerClassName,
  rotateDepth = 15,
  translateDepth = 15,
  meteorCount = 15,
  showMeteors = true,
  glowColor = "rgba(120, 119, 198, 0.3)",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotateDepth?: number;
  translateDepth?: number;
  meteorCount?: number;
  showMeteors?: boolean;
  glowColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * rotateDepth : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -rotateDepth : 0;
  const translateX = isHovered ? (mousePosition.x - 0.5) * translateDepth : 0;
  const translateY = isHovered ? (mousePosition.y - 0.5) * translateDepth : 0;

  return (
    <div
      className={cn("relative group w-full max-w-full", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl transition-all duration-300 ease-out",
          className
        )}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect on hover */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor}, transparent 40%)`,
            }}
          />
        )}

        {/* Meteors effect */}
        {showMeteors && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={meteorCount} />
          </div>
        )}

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Bottom shine effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
};

// Comet Card Header
export const CometCardHeader = ({
  children,
  className,
  gradient,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden p-4 sm:p-6 md:p-8",
        className
      )}
    >
      {/* Background gradient */}
      {gradient && (
        <div
          className={cn(
            "absolute inset-0 opacity-80",
            `bg-gradient-to-br ${gradient}`
          )}
        />
      )}
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Comet Card Content
export const CometCardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-4 sm:p-6 md:p-8", className)}>
      {children}
    </div>
  );
};

// Comet Card Footer
export const CometCardFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border-t border-white/10 p-4 sm:p-6 bg-black/20",
        className
      )}
    >
      {children}
    </div>
  );
};
