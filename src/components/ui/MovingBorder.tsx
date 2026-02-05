"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  borderRadius = "1.5rem",
  containerClassName,
  borderClassName,
  className,
  as: Component = "div",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "relative p-[2px] overflow-hidden bg-transparent",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: borderRadius }}
      >
        <MovingBorderGradient duration={duration} rx={rx} ry={ry}>
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--border-color)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorderGradient>
      </div>

      <div
        className={cn(
          "relative bg-slate-900/80 backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function MovingBorderGradient({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

// Button variant with moving border
export function MovingBorderButton({
  children,
  borderRadius = "1.75rem",
  containerClassName,
  borderClassName,
  duration = 2500,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <MovingBorder
      as="button"
      borderRadius={borderRadius}
      containerClassName={containerClassName}
      borderClassName={borderClassName}
      duration={duration}
      className={cn(
        "px-6 py-3 font-semibold text-white",
        className
      )}
      {...otherProps}
    >
      {children}
    </MovingBorder>
  );
}

// Card variant with moving border
export function MovingBorderCard({
  children,
  borderRadius = "1.5rem",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <MovingBorder
      borderRadius={borderRadius}
      containerClassName={cn("w-full", containerClassName)}
      borderClassName={borderClassName}
      duration={duration}
      className={cn("p-6", className)}
      {...otherProps}
    >
      {children}
    </MovingBorder>
  );
}
