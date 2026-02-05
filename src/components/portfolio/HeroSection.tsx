'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getThemeColors } from '@/utils/theme';
import { HERO_VARIANTS } from '@/utils/constants';
import { IHeroProps, IHeroSectionProps } from '@/types/IHeroSection';

// Elegant floating shape component
interface ElegantShapeProps {
	className?: string;
	delay?: number;
	rotate?: number;
	gradient?: string;
	size?: string;
}

const ElegantShape = ({
	className,
	delay = 0,
	rotate = 0,
	gradient = 'from-white/[0.08]',
	size,
}: ElegantShapeProps) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: -150,
				rotate: rotate - 15,
			}}
			animate={{
				opacity: 1,
				y: 0,
				rotate: rotate,
			}}
			transition={{
				duration: 2.4,
				delay,
				ease: [0.23, 0.86, 0.39, 0.96],
				opacity: { duration: 1.2 },
			}}
			className={cn('absolute', className)}
		>
			<motion.div
				animate={{
					y: [0, 65, 0],
				}}
				transition={{
					duration: 9,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="relative"
			>
				<div
					className={cn(
						'h-24 w-[300px]',
						'absolute inset-0 rounded-full',
						size,
						'bg-gradient-to-r to-transparent',
						gradient,
						'backdrop-blur-[2px] border-2 border-white/[0.15]',
						'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
						"after:absolute after:inset-0 after:rounded-full",
						"after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
					)}
				/>
			</motion.div>
		</motion.div>
	);
};

// Background boxes component for interactive grid effect
interface BackgroundBoxesProps {
	width?: number;
	height?: number;
	gapX?: number;
	gapY?: number;
	grid?: [number, number];
	className?: string;
	rectClassName?: string;
	borderRadius?: number;
	hoverColor?: string;
}

const BackgroundBoxes = ({
	width = 80,
	height = 140,
	gapX = 10,
	gapY = 10,
	grid = [42, 5],
	className,
	borderRadius = 8,
}: BackgroundBoxesProps) => {
	const [columns, rows] = grid;
	const [hoveredRect, setHoveredRect] = useState<number | null>(null);

	const totalWidth = columns * (width + gapX);
	const totalHeight = rows * (height + gapY);

	return (
		<svg
			width={totalWidth}
			height={totalHeight}
			className={cn(
				'absolute inset-0 h-full w-full',
				className
			)}
		>
			{Array.from({ length: columns * rows }).map((_, index) => {
				const col = index % columns;
				const row = Math.floor(index / columns);
				const x = col * (width + gapX);
				const y = row * (height + gapY);

				return (
					<g
						key={index}
						transform={`translate(${x}, ${y}) skewX(-15)`}
						onMouseEnter={() => setHoveredRect(index)}
						onMouseLeave={() => setHoveredRect(null)}
						style={{ cursor: 'pointer' }}
					>
						<rect
							x={0}
							y={0}
							width={width}
							height={height}
							rx={borderRadius}
							ry={borderRadius}
							style={{
								fill: hoveredRect === index ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
								stroke: 'rgba(255, 255, 255, 0.2)',
								transition: hoveredRect === index ? 'fill 0.15s ease-out' : 'fill 0.8s ease-out',
							}}
						/>
					</g>
				);
			})}
		</svg>
	);
};

// Snowflake type for falling snow effect
interface Snowflake {
	id: number;
	x: number;
	size: number;
	opacity: number;
	color: string;
	drift: number;
	duration: number;
}

// Falling snow component for animated snowflakes
interface FallingSnowProps {
	duration?: number;
	theme: ReturnType<typeof getThemeColors>;
}

const FallingSnow = ({ duration = 150, theme }: FallingSnowProps) => {
	const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
	
	// Theme-based colors
	const getColors = () => {
		if (theme.gradient.includes('blue')) {
			return ['#E0F4FF', '#B8E6FF', '#C9E9FF', '#93C5FD', '#FFFFFF', '#BFDBFE'];
		} else if (theme.gradient.includes('purple')) {
			return ['#F3E8FF', '#E9D5FF', '#D8B4FE', '#C4B5FD', '#FFFFFF', '#DDD6FE'];
		} else if (theme.gradient.includes('emerald') || theme.gradient.includes('teal')) {
			return ['#D1FAE5', '#A7F3D0', '#6EE7B7', '#99F6E4', '#FFFFFF', '#CCFBF1'];
		} else if (theme.gradient.includes('rose') || theme.gradient.includes('pink')) {
			return ['#FFE4E6', '#FECDD3', '#FDA4AF', '#FB7185', '#FFFFFF', '#FFF1F2'];
		} else if (theme.gradient.includes('amber') || theme.gradient.includes('orange')) {
			return ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#FFFFFF', '#FFFBEB'];
		} else if (theme.gradient.includes('cyan')) {
			return ['#CFFAFE', '#A5F3FC', '#67E8F9', '#22D3EE', '#FFFFFF', '#ECFEFF'];
		} else if (theme.gradient.includes('indigo')) {
			return ['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#FFFFFF', '#EEF2FF'];
		} else if (theme.gradient.includes('slate')) {
			return ['#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', '#FFFFFF', '#F8FAFC'];
		} else {
			return ['#E0F4FF', '#B8E6FF', '#C9E9FF', '#93C5FD', '#FFFFFF', '#BFDBFE'];
		}
	};

	const colors = getColors();

	useEffect(() => {
		const sizes = [12, 16, 20, 24];
		const opacities = [0.6, 0.7, 0.8, 0.9, 1];

		const addSnowflake = () => {
			const newSnowflake: Snowflake = {
				id: Date.now() + Math.random(),
				x: Math.random() * 100,
				size: sizes[Math.floor(Math.random() * sizes.length)],
				opacity: opacities[Math.floor(Math.random() * opacities.length)],
				color: colors[Math.floor(Math.random() * colors.length)],
				drift: (Math.random() - 0.5) * 50,
				duration: 8 + Math.random() * 4,
			};
			setSnowflakes((prev) => [...prev, newSnowflake]);
		};

		const interval = setInterval(addSnowflake, duration);
		return () => clearInterval(interval);
	}, [duration, colors]);

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{snowflakes.map((flake) => (
				<motion.svg
					key={flake.id}
					xmlns="http://www.w3.org/2000/svg"
					className="absolute"
					width={flake.size}
					height={flake.size}
					viewBox="0 0 24 24"
					fill="none"
					stroke={flake.color}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ filter: 'blur(1px)' }}
					initial={{
						top: '-5%',
						left: `${flake.x}%`,
						opacity: flake.opacity,
						rotate: 0,
					}}
					animate={{
						top: '105%',
						left: `${flake.x + flake.drift}%`,
						rotate: 360,
						opacity: [flake.opacity, flake.opacity, flake.opacity * 0.7, 0],
					}}
					transition={{
						duration: flake.duration,
						ease: 'linear',
						rotate: {
							duration: flake.duration * 0.5,
							repeat: Infinity,
							ease: 'linear',
						},
					}}
					onAnimationComplete={() => {
						setSnowflakes((prev) => prev.filter((s) => s.id !== flake.id));
					}}
				>
					<path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6" />
				</motion.svg>
			))}
		</div>
	);
};

const SVG_PATTERN =
	"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const CenteredHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	return (
		<section
			className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.gradient} text-white px-4 sm:px-6 relative overflow-hidden`}>
			{/* Interactive background boxes */}
			<div className="absolute inset-0 overflow-hidden">
				<BackgroundBoxes
					grid={[30, 8]}
					width={70}
					height={120}
					gapX={8}
					gapY={8}
					borderRadius={6}
					hoverColor="fill-white/40"
					className="opacity-60"
				/>
			</div>
			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/10"></div>
			
			<div className="text-center max-w-4xl relative z-10">
				<motion.h1 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4"
				>
					{personalInfo.name}
				</motion.h1>
				<motion.p 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-lg sm:text-2xl md:text-3xl text-white/90 mb-4 sm:mb-6"
				>
					{personalInfo.title}
				</motion.p>
				<motion.p 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
				>
					{personalInfo.summary}
				</motion.p>
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="flex gap-3 sm:gap-4 justify-center flex-wrap"
				>
					<a
						href={`mailto:${personalInfo.email}`}
						className={`px-4 sm:px-6 py-2 sm:py-3 bg-white ${theme.primary} rounded-full font-semibold text-sm sm:text-base hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300`}>
						Contact Me
					</a>
					{personalInfo.github && (
						<a
							href={personalInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
							GitHub
						</a>
					)}
				</motion.div>
			</div>
		</section>
	);
};

const SplitHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	const [mousePosition, setMousePosition] = useState({ x: 400, y: 300 });
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setMousePosition({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('mousemove', handleMouseMove);
		}

		return () => {
			if (container) {
				container.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}, []);

	// Get spotlight color based on theme
	const getSpotlightColor = () => {
		if (theme.gradient.includes('blue')) return { r: 59, g: 130, b: 246 };
		if (theme.gradient.includes('purple')) return { r: 147, g: 51, b: 234 };
		if (theme.gradient.includes('emerald')) return { r: 16, g: 185, b: 129 };
		if (theme.gradient.includes('rose')) return { r: 244, g: 63, b: 94 };
		if (theme.gradient.includes('amber')) return { r: 245, g: 158, b: 11 };
		if (theme.gradient.includes('cyan')) return { r: 6, g: 182, b: 212 };
		if (theme.gradient.includes('indigo')) return { r: 99, g: 102, b: 241 };
		if (theme.gradient.includes('orange')) return { r: 249, g: 115, b: 22 };
		if (theme.gradient.includes('teal')) return { r: 20, g: 184, b: 166 };
		if (theme.gradient.includes('slate')) return { r: 100, g: 116, b: 139 };
		return { r: 59, g: 130, b: 246 };
	};

	const spotColor = getSpotlightColor();

	return (
		<section 
			ref={containerRef}
			className={`min-h-screen flex flex-col md:flex-row bg-slate-950 cursor-none relative overflow-hidden`}
		>
			{/* Theme gradient background */}
			<div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`}></div>
			
			{/* Spotlight effect layer */}
			<div 
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `
						radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.15) 0%, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.05) 200px, transparent 350px),
						radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.08) 0%, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.02) 150px, transparent 280px)
					`,
					backgroundSize: '100% 100%, 100% 100%',
				}}
			></div>
			
			{/* Dot pattern */}
			<div 
				className="absolute inset-0 pointer-events-none opacity-30"
				style={{
					backgroundImage: `radial-gradient(circle, rgba(${spotColor.r}, ${spotColor.g}, ${spotColor.b}, 0.3) 1px, transparent 1px)`,
					backgroundSize: '24px 24px',
				}}
			></div>

			<div className="w-full min-h-screen text-white flex items-center justify-center p-6 sm:p-12 relative z-10">
				<div className="max-w-lg">
					<motion.p 
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className={`font-mono mb-2 text-sm sm:text-base bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}
					>
						Hello, I&apos;m
					</motion.p>
					<motion.h1 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4"
					>
						{personalInfo.name}
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="text-lg sm:text-2xl text-slate-300 mb-4 sm:mb-6"
					>
						{personalInfo.title}
					</motion.p>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
						className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-md"
					>
						{personalInfo.summary}
					</motion.p>
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1 }}
						className="flex gap-3 sm:gap-4 flex-wrap"
					>
						<a
							href={`mailto:${personalInfo.email}`}
							className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-lg font-semibold text-sm sm:text-base hover:-translate-y-0.5 transition-all duration-300`}>
							Get in Touch
						</a>
						<a
							href="#projects"
							className="px-4 sm:px-6 py-2 sm:py-3 border border-slate-600 rounded-lg font-semibold text-sm sm:text-base hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300">
							View Work
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const MinimalHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	return (
		<section className="min-h-screen flex items-center bg-white px-4 sm:px-6">
			<div className="max-w-4xl mx-auto py-12">
				<motion.p 
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-slate-500 font-mono text-xs sm:text-sm mb-3 sm:mb-4"
				>
					Hi there, my name is
				</motion.p>
				<motion.h1 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-900 mb-3 sm:mb-4"
				>
					{personalInfo.name}
				</motion.h1>
				{/* Shiny animated title */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<motion.h2
						className="text-2xl sm:text-4xl md:text-5xl font-bold inline-block text-slate-400/50 bg-gradient-to-r bg-clip-text from-45% via-50% to-60% from-transparent via-slate-800 to-transparent mb-6 sm:mb-8"
						animate={{ backgroundPosition: ['100%', '-100%'] }}
						transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
						style={{
							backgroundSize: '200% 100%',
						}}
					>
						{personalInfo.title}
					</motion.h2>
				</motion.div>
				<motion.p 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="text-base sm:text-xl text-slate-600 max-w-2xl mb-8 sm:mb-10"
				>
					{personalInfo.summary}
				</motion.p>
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1 }}
					className="flex gap-4 sm:gap-6 flex-wrap"
				>
					<a
						href={`mailto:${personalInfo.email}`}
						className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:underline flex items-center gap-2 text-sm sm:text-base`}>
						<span className={`${theme.primary}`}>→</span> Email me
					</a>
					{personalInfo.linkedin && (
						<a
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:underline flex items-center gap-2 text-sm sm:text-base`}>
							<span className={`${theme.primary}`}>→</span> LinkedIn
						</a>
					)}
					{personalInfo.github && (
						<a
							href={personalInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-semibold hover:underline flex items-center gap-2 text-sm sm:text-base`}>
							<span className={`${theme.primary}`}>→</span> GitHub
						</a>
					)}
				</motion.div>
			</div>
		</section>
	);
};

const GradientTextHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	const nameWords = personalInfo.name.split(' ');
	
	// Get the via color based on theme gradient
	const getViaColor = () => {
		if (theme.gradient.includes('blue')) return 'via-blue-500';
		if (theme.gradient.includes('purple')) return 'via-purple-500';
		if (theme.gradient.includes('emerald')) return 'via-emerald-500';
		if (theme.gradient.includes('rose')) return 'via-rose-500';
		if (theme.gradient.includes('amber')) return 'via-amber-500';
		if (theme.gradient.includes('slate')) return 'via-slate-500';
		if (theme.gradient.includes('cyan')) return 'via-cyan-500';
		if (theme.gradient.includes('indigo')) return 'via-indigo-500';
		if (theme.gradient.includes('orange')) return 'via-orange-500';
		if (theme.gradient.includes('teal')) return 'via-teal-500';
		return 'via-blue-500';
	};
	
	const viaColor = getViaColor();
	
	return (
		<section className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 relative overflow-hidden">
			{/* Decorative border lines */}
			<div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80">
				<motion.div 
					initial={{ height: 0 }}
					animate={{ height: '10rem' }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className={`absolute top-0 w-px bg-gradient-to-b from-transparent ${viaColor} to-transparent`} 
				/>
			</div>
			<div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80">
				<motion.div 
					initial={{ height: 0 }}
					animate={{ height: '10rem' }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className={`absolute w-px bg-gradient-to-b from-transparent ${viaColor} to-transparent`} 
				/>
			</div>
			<div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80">
				<motion.div 
					initial={{ width: 0 }}
					animate={{ width: '10rem' }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className={`absolute mx-auto left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent ${viaColor} to-transparent`} 
				/>
			</div>

			<div className="text-center max-w-5xl py-12">
				<motion.p 
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="text-slate-500 font-mono text-xs sm:text-sm mb-4 sm:mb-6 tracking-wider uppercase"
				>
					Welcome to my portfolio
				</motion.p>
				<h1
					className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 leading-tight">
					{nameWords.map((word, index) => (
						<motion.span
							key={index}
							initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
							animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
							transition={{
								duration: 0.3,
								delay: 0.4 + index * 0.15,
								ease: 'easeInOut',
							}}
							className={`mr-4 inline-block bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}
						>
							{word}
						</motion.span>
					))}
				</h1>
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className={`h-1 w-20 sm:w-32 mx-auto bg-gradient-to-r ${theme.gradient} rounded-full mb-6 sm:mb-8 origin-center`}></motion.div>
				<motion.p 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 1 }}
					className="text-xl sm:text-2xl md:text-3xl text-slate-700 mb-3 sm:mb-4 font-light"
				>
					{personalInfo.title}
				</motion.p>
				<motion.p 
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 1.2 }}
					className="text-sm sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
				>
					{personalInfo.summary}
				</motion.p>
				<motion.div 
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 1.4 }}
					className="flex gap-3 sm:gap-4 justify-center flex-wrap"
				>
					<a
						href={`mailto:${personalInfo.email}`}
						className={`px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300`}>
						Get in Touch
					</a>
					{personalInfo.github && (
						<a
							href={personalInfo.github}
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-full font-semibold text-sm sm:text-base hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300">
							View GitHub
						</a>
					)}
				</motion.div>
			</div>
		</section>
	);
};

const VideoBgHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	return (
		<section className="min-h-screen relative overflow-hidden bg-slate-950">
			{/* Base gradient */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-40`}></div>
			
			{/* Falling snow animation */}
			<FallingSnow theme={theme} duration={120} />
			
			{/* Overlay for depth */}
			<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
			
			{/* SVG pattern overlay */}
			<div className="absolute inset-0">
				<div
					className="absolute top-0 left-0 w-full h-full opacity-20"
					style={{ backgroundImage: `url("${SVG_PATTERN}")` }}></div>
			</div>
			
			<div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
				<div className="text-center text-white">
					<motion.h1 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 drop-shadow-lg"
					>
						{personalInfo.name}
					</motion.h1>
					<motion.p 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 sm:mb-6 font-light"
					>
						{personalInfo.title}
					</motion.p>
					<motion.p 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.7 }}
						className="text-sm sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
					>
						{personalInfo.summary}
					</motion.p>
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.9 }}
						className="flex gap-3 sm:gap-4 justify-center flex-wrap"
					>
						<a
							href={`mailto:${personalInfo.email}`}
							className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 rounded-full font-semibold text-sm sm:text-base hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
							Contact Me
						</a>
						<a
							href="#about"
							className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/50 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
							Learn More
						</a>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const CreativeHero = ({ data, theme }: IHeroProps) => {
	const { personalInfo } = data;
	const nameWords = personalInfo.name.split(' ');
	
	// Determine gradient colors based on theme
	const getShapeGradient = (index: number) => {
		const gradients = [
			'from-indigo-500/[0.15]',
			'from-cyan-500/[0.15]',
			'from-rose-500/[0.15]',
			'from-violet-500/[0.15]',
		];
		return gradients[index % gradients.length];
	};

	return (
		<section className="min-h-screen bg-black text-white relative overflow-hidden px-4 sm:px-6">
			{/* Floating elegant shapes */}
			<ElegantShape
				delay={0.3}
				rotate={12}
				gradient={getShapeGradient(0)}
				className="left-[5%] md:left-[10%] top-[15%] md:top-[20%]"
				size="w-[300px] h-[100px] sm:w-[400px] sm:h-[125px]"
			/>
			<ElegantShape
				delay={0.5}
				rotate={-15}
				gradient={getShapeGradient(1)}
				className="right-[5%] md:right-[15%] top-[10%] md:top-[15%]"
				size="w-[250px] h-[80px] sm:w-[350px] sm:h-[110px]"
			/>
			<ElegantShape
				delay={0.7}
				rotate={-8}
				gradient={getShapeGradient(2)}
				className="left-[10%] md:left-[20%] bottom-[10%] md:bottom-[15%]"
				size="w-[280px] h-[90px] sm:w-[380px] sm:h-[120px]"
			/>
			<ElegantShape
				delay={0.9}
				rotate={20}
				gradient={getShapeGradient(3)}
				className="right-[5%] md:right-[10%] bottom-[20%] md:bottom-[25%]"
				size="w-[220px] h-[70px] sm:w-[320px] sm:h-[100px]"
			/>

			{/* Background blur effects */}
			<div className="absolute inset-0 opacity-20 pointer-events-none">
				<div
					className={`absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 ${theme.bg} rounded-full blur-3xl`}></div>
				<div
					className={`absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 ${theme.bg} rounded-full blur-3xl opacity-50`}></div>
			</div>

			{/* Main content */}
			<div className="relative z-10 min-h-screen flex items-center justify-center py-12">
				<div className="text-center max-w-4xl">
					<h1
						className="text-4xl sm:text-6xl md:text-9xl font-black mb-4 sm:mb-6">
						{nameWords.map((word, index) => (
							<motion.span
								key={index}
								initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
								animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.8 + index * 0.2,
									ease: 'easeOut',
								}}
								className={`mr-4 inline-block bg-gradient-to-r ${theme.gradient} bg-clip-text `}
							>
								{word}
							</motion.span>
						))}
					</h1>
					<motion.p 
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1.4 }}
						className="text-lg sm:text-2xl md:text-3xl text-white/60 mb-3 sm:mb-4"
					>
						{personalInfo.title}
					</motion.p>
					<motion.p 
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1.6 }}
						className="text-sm sm:text-lg text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 px-2"
					>
						{personalInfo.summary}
					</motion.p>
					<motion.a
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 1.8 }}
						href={`mailto:${personalInfo.email}`}
						className={`inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.gradient} rounded-full font-bold text-base sm:text-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300`}>
						Let&apos;s Work Together
					</motion.a>
				</div>
			</div>
		</section>
	);
};

export default function HeroSection({
	data,
	variant,
	palette,
}: IHeroSectionProps) {
	const theme = getThemeColors(palette);

	switch (variant) {
		case HERO_VARIANTS.CENTERED:
			return (
				<CenteredHero
					data={data}
					theme={theme}
				/>
			);
		case HERO_VARIANTS.SPLIT:
			return (
				<SplitHero
					data={data}
					theme={theme}
				/>
			);
		case HERO_VARIANTS.MINIMAL:
			return (
				<MinimalHero
					data={data}
					theme={theme}
				/>
			);
		case HERO_VARIANTS.GRADIENT_TEXT:
			return (
				<GradientTextHero
					data={data}
					theme={theme}
				/>
			);
		case HERO_VARIANTS.VIDEO_BG:
			return (
				<VideoBgHero
					data={data}
					theme={theme}
				/>
			);
		case HERO_VARIANTS.CREATIVE:
			return (
				<CreativeHero
					data={data}
					theme={theme}
				/>
			);
		default:
			return (
				<CenteredHero
					data={data}
					theme={theme}
				/>
			);
	}
}
