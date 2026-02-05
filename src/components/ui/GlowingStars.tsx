"use client";

import React, { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

export const GlowingStarsBackground = ({
  className,
  starCount = 50,
}: {
  className?: string;
  starCount?: number;
}) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() > 0.5 ? Math.random() * 2 + 1 : null,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ""}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.radius}px`,
            height: `${star.radius}px`,
            opacity: star.opacity,
            animation: star.twinkleSpeed
              ? `twinkle ${star.twinkleSpeed}s ease-in-out infinite`
              : undefined,
            boxShadow: `0 0 ${star.radius * 2}px ${star.radius}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
};

export const GlowingStarsCard = ({
  children,
  className,
  glowColor = "rgba(255,255,255,0.1)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardStars] = useState<Array<{x: number; y: number; size: number; opacity: number; speed: number}>>(() => 
    [...Array(15)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 3 + 2,
    }))
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-black/50 backdrop-blur-sm transition-all duration-300 ${className || ""}`}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
          }}
        />
      )}
      
      {/* Inner stars */}
      <div className="absolute inset-0">
        {cardStars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.speed}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
