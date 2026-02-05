'use client';

import { ResumeData, ExperienceVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { EXPERIENCE_VARIANTS } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { GlowingStarsBackground, GlowingStarsCard } from '@/components/ui/GlowingStars';
import { SparklesCore } from '@/components/ui/SparklesCore';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { MovingBorderCard } from '@/components/ui/MovingBorder';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { CometCard, CometCardHeader, CometCardContent, Meteors } from '@/components/ui/CometCard';

interface ExperienceProps {
  data: ResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

// Custom hook for scroll-based animations
const useScrollAnimation = (threshold = 0.2) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) => new Set([...prev, index]));
              }
            });
          },
          { threshold, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [threshold]);

  return { visibleItems, itemRefs };
};

const TimelineExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.15);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;
        
        const scrollProgress = Math.max(0, Math.min(1, 
          (windowHeight - timelineTop) / (windowHeight + timelineHeight)
        ));
        
        setLineHeight(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get sparkle color from theme
  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <GlowingStarsBackground className="opacity-30" starCount={80} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/80" />
      </div>
      
      {/* Sparkles accent */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          particleColor={getSparkleColor()}
          particleDensity={30}
          speed={0.5}
          minSize={0.5}
          maxSize={1.5}
        />
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Classy Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className={`inline-block text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-3`}>
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="Professional Experience" className="inline" textClassName="text-white" duration={0.3} />
          </h2>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full`} />
        </div>
        
        <div className="relative" ref={timelineRef}>
          {/* Elegant timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent" />
          
          {/* Animated progress line with glow */}
          <div 
            className={`absolute left-4 sm:left-8 top-0 w-px transition-all duration-500 ease-out`}
            style={{ 
              height: `${lineHeight}%`,
              background: `linear-gradient(to bottom, ${getSparkleColor()}, ${getSparkleColor()}80)`,
              boxShadow: `0 0 20px ${getSparkleColor()}60, 0 0 40px ${getSparkleColor()}30`
            }}
          />
          
          {experience.map((exp, index) => (
            <div 
              key={index} 
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`relative pl-12 sm:pl-20 pb-10 sm:pb-14 last:pb-0 transition-all duration-700 ease-out ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-[-40px]'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Elegant timeline dot */}
              <div className="absolute left-2 sm:left-6 z-10">
                <div className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-500 ${
                  visibleItems.has(index) ? 'scale-100' : 'scale-0'
                }`}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${theme.gradient}`} />
                  <div className="absolute inset-1 rounded-full bg-slate-900" />
                  <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${theme.gradient}`} />
                  {visibleItems.has(index) && (
                    <div 
                      className="absolute -inset-2 rounded-full animate-ping opacity-30"
                      style={{ background: getSparkleColor() }}
                    />
                  )}
                </div>
              </div>
              
              {/* Year badge - desktop */}
              <div className={`absolute left-[-80px] top-0 hidden sm:flex items-center transition-all duration-500 ${
                visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`} style={{ transitionDelay: `${index * 150 + 100}ms` }}>
                <span className={`text-xs font-bold tracking-wider px-3 py-1.5 rounded-full border ${theme.border} ${theme.primary} bg-slate-900/80 backdrop-blur-sm`}>
                  {exp.dates.split(' - ')[0]}
                </span>
              </div>

              {/* Experience Card with Moving Border */}
              <div className="flex justify-center">
                <MovingBorderCard 
                  borderRadius="1.25rem"
                  duration={4000}
                  containerClassName={`w-full max-w-lg transition-all duration-500 ${visibleItems.has(index) ? 'opacity-100' : 'opacity-0'}`}
                  borderClassName={`bg-[radial-gradient(${getSparkleColor()}_40%,transparent_60%)]`}
                  className="p-5 sm:p-7 bg-slate-900/90 backdrop-blur-xl"
              >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className={`${theme.primary} font-semibold text-sm sm:text-base flex items-center gap-2`}>
                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${theme.primary} font-medium px-3 py-1.5 bg-white/5 border ${theme.border} rounded-full backdrop-blur-sm`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.dates}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4">{exp.description}</p>
                  
                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">Key Achievements</p>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li 
                            key={i} 
                            className={`text-slate-300 flex items-start gap-3 text-sm transition-all duration-500 ${
                              visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-10px]'
                            }`}
                            style={{ transitionDelay: `${(index * 150) + (i * 80) + 300}ms` }}
                          >
                            <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </MovingBorderCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Chain Experience - Blocks connected by animated chains with premium styling
const ChainExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.1);
  const [chainProgress, setChainProgress] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChainProgress(new Array(experience.length).fill(0));
  }, [experience.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const newProgress = [...chainProgress];
      itemRefs.current.forEach((ref, index) => {
        if (ref && index < experience.length - 1) {
          const rect = ref.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          const progress = Math.max(0, Math.min(1,
            (windowHeight - rect.bottom + 100) / 150
          ));
          newProgress[index] = progress;
        }
      });
      setChainProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chainProgress, experience.length, itemRefs]);

  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  return (
    <section id="experience" ref={sectionRef} className="relative py-16 sm:py-24 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0">
        <GlowingStarsBackground className="opacity-40" starCount={100} />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20`} style={{ background: getSparkleColor() }} />
      </div>

      {/* Sparkles at top */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          particleColor={getSparkleColor()}
          particleDensity={40}
          speed={0.3}
          minSize={0.4}
          maxSize={1.2}
        />
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Classy Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-4 py-2 rounded-full border ${theme.border} bg-white/5 backdrop-blur-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Connected Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="Experience Chain" className="inline" textClassName="text-white" duration={0.3} />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Each role builds upon the last, creating a chain of growth and achievement
          </p>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-6`} />
        </div>
        
        <div className="relative">
          {experience.map((exp, index) => (
            <div key={index} className="relative">
              {/* Experience Block */}
              <div
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`relative transition-all duration-700 ease-out ${
                  visibleItems.has(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-16 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Chain Link Icon */}
                <div className={`flex justify-center mb-4 sm:mb-6 transition-all duration-600 ${
                  visibleItems.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}>
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-2xl transform rotate-45`}>
                      <div className="transform -rotate-45">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-2xl blur-xl opacity-50 transform rotate-45 transition-opacity duration-500 ${visibleItems.has(index) ? 'opacity-50' : 'opacity-0'}`}
                      style={{ background: `linear-gradient(135deg, ${getSparkleColor()}, transparent)` }}
                    />
                  </div>
                </div>

                {/* Main Card with Moving Border */}
                <div className="flex justify-center">
                  <MovingBorderCard 
                    borderRadius="1.5rem"
                    duration={3500}
                    containerClassName="w-full max-w-lg transition-all duration-500"
                    borderClassName={`bg-[radial-gradient(${getSparkleColor()}_40%,transparent_60%)]`}
                    className="p-5 sm:p-8 bg-black/80 backdrop-blur-xl relative"
                >
                    {/* Step Number */}
                    <div className={`absolute -top-3 -right-3 sm:-top-4 sm:-right-4 transition-all duration-500 z-20 ${
                      visibleItems.has(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`} style={{ transitionDelay: `${index * 200 + 250}ms` }}>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-4">
                      {/* Title & Company */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <p className={`${theme.primary} font-semibold text-sm sm:text-base flex items-center gap-2`}>
                            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {exp.company}
                          </p>
                          <span className={`inline-flex items-center gap-1.5 text-xs ${theme.primary} font-medium px-3 py-1.5 bg-white/5 border ${theme.border} rounded-full w-fit`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {exp.dates}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{exp.description}</p>
                      
                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className={`pt-4 border-t border-white/10 transition-all duration-500 ${
                          visibleItems.has(index) ? 'opacity-100' : 'opacity-0'
                        }`} style={{ transitionDelay: `${index * 200 + 400}ms` }}>
                          <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            Key Achievements
                          </p>
                          <ul className="grid grid-cols-1 gap-2.5">
                            {exp.highlights.map((highlight, i) => (
                              <li 
                                key={i} 
                                className={`text-slate-300 flex items-start gap-3 text-sm transition-all duration-500 ${
                                  visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-15px]'
                                }`}
                                style={{ transitionDelay: `${(index * 200) + (i * 100) + 500}ms` }}
                              >
                                <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                                <span className="break-words">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </MovingBorderCard>
                </div>
              </div>

              {/* Elegant Chain Connector */}
              {index < experience.length - 1 && (
                <div className="flex justify-center py-6 sm:py-8">
                  <div className="relative flex flex-col items-center">
                    {/* Vertical line behind */}
                    <div className="absolute inset-0 w-px bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 left-1/2 -translate-x-1/2" />
                    
                    {/* Animated chain links */}
                    {[0, 1, 2, 3].map((linkIndex) => (
                      <div
                        key={linkIndex}
                        className={`relative w-4 h-6 sm:w-5 sm:h-7 my-0.5 transition-all duration-400`}
                        style={{ transitionDelay: `${linkIndex * 80}ms` }}
                      >
                        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
                          chainProgress[index] > (linkIndex + 1) / 5
                            ? `${theme.border} shadow-lg`
                            : 'border-slate-700'
                        }`}
                        style={{
                          boxShadow: chainProgress[index] > (linkIndex + 1) / 5 
                            ? `0 0 15px ${getSparkleColor()}40, 0 0 30px ${getSparkleColor()}20` 
                            : 'none'
                        }}
                        />
                        {/* Inner glow */}
                        {chainProgress[index] > (linkIndex + 1) / 5 && (
                          <div 
                            className="absolute inset-1 rounded-full opacity-60"
                            style={{ background: `radial-gradient(circle, ${getSparkleColor()}40, transparent)` }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Floating Cards Experience - Premium interactive cards with depth
const CardsExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.1);

  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowingStarsBackground className="opacity-30" starCount={60} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50" />
        {/* Colored glow orbs */}
        <div 
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-[100px] opacity-30"
          style={{ background: getSparkleColor() }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20"
          style={{ background: getSparkleColor() }}
        />
      </div>

      {/* Sparkles */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          particleColor={getSparkleColor()}
          particleDensity={25}
          speed={0.4}
          minSize={0.4}
          maxSize={1.2}
        />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-4 py-2 rounded-full border ${theme.border} bg-white/5 backdrop-blur-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Experience Cards
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="Professional Experience" className="inline" textClassName="text-white" duration={0.3} />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            A visual showcase of my career journey and professional milestones.
          </p>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-6`} />
        </div>

        {/* Cards - Single column centered */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`w-full max-w-lg transition-all duration-700 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContainer className="inter-var w-full h-full" containerClassName="py-2 w-full">
                <CardBody className={`relative group/card w-full h-full min-h-[320px] rounded-xl sm:rounded-2xl p-4 sm:p-6 border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-white/10 transition-colors duration-300`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Floating Step Number */}
                  <CardItem
                    translateZ={80}
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-2xl`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </CardItem>

                  {/* Content */}
                  <CardItem translateZ={50} className="w-full">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-2">{exp.title}</h3>
                        <p className={`${theme.primary} font-semibold text-xs sm:text-sm flex items-center gap-1.5`}>
                          <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="truncate">{exp.company}</span>
                        </p>
                      </div>
                    </div>
                  </CardItem>

                  {/* Date Badge - Floating */}
                  <CardItem translateZ={60} translateY={-5} className="mb-3">
                    <span className={`inline-flex items-center gap-1 text-xs ${theme.primary} font-medium px-2.5 py-1 bg-white/5 border ${theme.border} rounded-full backdrop-blur-sm`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.dates}
                    </span>
                  </CardItem>

                  {/* Description */}
                  <CardItem translateZ={40} className="w-full mb-3">
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">{exp.description}</p>
                  </CardItem>

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <CardItem translateZ={30} className="w-full">
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          Highlights
                        </p>
                        <ul className="space-y-1.5">
                          {exp.highlights.slice(0, 2).map((highlight, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-1.5 text-xs">
                              <span className={`flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="line-clamp-2">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardItem>
                  )}

                  {/* Bottom Glow Line */}
                  <CardItem translateZ={20} className="w-full mt-3">
                    <div className={`h-0.5 w-full bg-gradient-to-r from-transparent ${theme.gradient.includes('from-') ? theme.gradient.replace('from-', 'via-').split(' ')[0] : 'via-white/20'} to-transparent opacity-50`} />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ListExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.1);

  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${getSparkleColor()}15 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute top-20 right-10 w-72 h-72 rounded-full blur-[100px] opacity-20"
        style={{ background: getSparkleColor() }}
      />
      <div 
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-[120px] opacity-15"
        style={{ background: getSparkleColor() }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Premium Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-4 py-2 rounded-full border ${theme.border} bg-white/80 backdrop-blur-sm shadow-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Clean List View
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4">
            <TextGenerateEffect words="Experience" className="inline" textClassName="text-slate-900" duration={0.3} />
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            A streamlined view of my professional journey
          </p>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-6`} />
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          {experience.map((exp, index) => (
            <div 
              key={index} 
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`relative transition-all duration-700 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card with glass effect */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient}`} />
                
                {/* Step number */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="p-6 sm:p-8 pt-8 sm:pt-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                      <p className={`${theme.primary} font-semibold text-sm sm:text-base flex items-center gap-2`}>
                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm ${theme.primary} font-medium px-3 py-1.5 bg-slate-100 border ${theme.border} rounded-full`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.dates}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">{exp.description}</p>
                  
                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Key Achievements
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li 
                            key={i} 
                            className={`text-slate-600 flex items-start gap-3 text-sm transition-all duration-500 ${
                              visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-10px]'
                            }`}
                            style={{ transitionDelay: `${(index * 150) + (i * 80) + 200}ms` }}
                          >
                            <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Bottom gradient accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${theme.gradient.includes('from-') ? theme.gradient.replace('from-', 'via-').split(' ')[0] : 'via-slate-300'} to-transparent opacity-50`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Detailed Comet Experience - Premium meteor effect cards with 3D tilt
const DetailedExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.1);

  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  const getGlowColor = () => {
    const colorMap: Record<string, string> = {
      blue: 'rgba(59, 130, 246, 0.3)', purple: 'rgba(168, 85, 247, 0.3)', 
      emerald: 'rgba(16, 185, 129, 0.3)', rose: 'rgba(244, 63, 94, 0.3)',
      amber: 'rgba(245, 158, 11, 0.3)', slate: 'rgba(100, 116, 139, 0.3)', 
      cyan: 'rgba(6, 182, 212, 0.3)', indigo: 'rgba(99, 102, 241, 0.3)',
      orange: 'rgba(249, 115, 22, 0.3)', teal: 'rgba(20, 184, 166, 0.3)'
    };
    return colorMap[theme.name] || 'rgba(59, 130, 246, 0.3)';
  };

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black" />
        {/* Stars */}
        <GlowingStarsBackground className="opacity-50" starCount={100} />
        {/* Large glow orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ background: `radial-gradient(circle, ${getSparkleColor()}, transparent)` }}
        />
      </div>

      {/* Global meteors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors number={30} className="opacity-40" />
      </div>

      {/* Sparkles accent */}
      <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          particleColor={getSparkleColor()}
          particleDensity={35}
          speed={0.3}
          minSize={0.5}
          maxSize={1.5}
        />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Premium Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-5 py-2.5 rounded-full border ${theme.border} bg-white/5 backdrop-blur-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Detailed View
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            <TextGenerateEffect words="Professional Journey" className="inline" textClassName="text-white" duration={0.3} />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A comprehensive look at my professional journey and career milestones.
          </p>
          <div className={`w-24 sm:w-32 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-8`} />
        </div>

        {/* Comet Cards - Centered with normal width */}
        <div className="flex flex-col items-center space-y-8 sm:space-y-12">
          {experience.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`w-full max-w-lg transition-all duration-700 ${
                visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CometCard
                rotateDepth={12}
                translateDepth={12}
                meteorCount={12}
                glowColor={getGlowColor()}
                className="w-full"
              >
                {/* Card Header with Gradient */}
                <CometCardHeader gradient={theme.gradient}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Step indicator */}
                      <div className={`inline-flex items-center gap-2 text-white/80 text-xs font-semibold tracking-wider uppercase mb-3`}>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <span>Position</span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-white/90 font-semibold text-base sm:text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {exp.company}
                      </p>
                    </div>
                    
                    {/* Date Badge */}
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span className="inline-flex items-center gap-2 text-sm text-white font-medium px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.dates}
                      </span>
                    </div>
                  </div>
                </CometCardHeader>

                {/* Card Content */}
                <CometCardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Overview
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-4 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exp.highlights.map((highlight, i) => (
                          <div 
                            key={i} 
                            className={`flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors duration-300`}
                          >
                            <span className={`flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-slate-300 text-sm leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CometCardContent>

              </CometCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionExperience = ({ data, theme }: ExperienceProps) => {
  const { experience } = data;
  const { visibleItems, itemRefs } = useScrollAnimation(0.1);

  const getSparkleColor = () => {
    const colorMap: Record<string, string> = {
      blue: '#3b82f6', purple: '#a855f7', emerald: '#10b981', rose: '#f43f5e',
      amber: '#f59e0b', slate: '#64748b', cyan: '#06b6d4', indigo: '#6366f1',
      orange: '#f97316', teal: '#14b8a6'
    };
    return colorMap[theme.name] || '#3b82f6';
  };

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowingStarsBackground className="opacity-20" starCount={60} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80" />
      </div>

      {/* Decorative glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: getSparkleColor() }}
      />

      {/* Sparkles */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          particleColor={getSparkleColor()}
          particleDensity={25}
          speed={0.3}
          minSize={0.4}
          maxSize={1}
        />
      </div>

      <div className="relative max-w-3xl mx-auto z-10">
        {/* Premium Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${theme.primary} tracking-widest uppercase mb-4 px-4 py-2 rounded-full border ${theme.border} bg-white/5 backdrop-blur-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Expandable View
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            <TextGenerateEffect words="My Experience" className="inline" textClassName="text-white" duration={0.3} />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Click to expand each role and discover more details
          </p>
          <div className={`w-20 sm:w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full mt-6`} />
        </div>
        
        <div className="space-y-4 sm:space-y-5">
          {experience.map((exp, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`transition-all duration-700 ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <details className="group" open={index === 0}>
                <summary className="relative cursor-pointer list-none">
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${theme.gradient} rounded-l-2xl`} />
                    
                    {/* Step number */}
                    <div className={`absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 pl-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">{exp.title}</h3>
                        <p className={`${theme.primary} text-sm sm:text-base flex items-center gap-2`}>
                          <svg className="w-4 h-4 opacity-70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="truncate">{exp.company}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`hidden sm:inline-flex items-center gap-1.5 text-xs ${theme.primary} font-medium px-3 py-1.5 bg-white/5 border ${theme.border} rounded-full`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exp.dates}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-white/5 border ${theme.border} flex items-center justify-center group-open:rotate-180 transition-transform duration-300`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                
                {/* Expanded Content */}
                <div className="mt-1 ml-4 sm:ml-6 pl-4 sm:pl-6 border-l-2 border-white/10">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                    {/* Mobile date */}
                    <span className={`sm:hidden inline-flex items-center gap-1.5 text-xs ${theme.primary} font-medium px-3 py-1.5 bg-white/5 border ${theme.border} rounded-full mb-4`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.dates}
                    </span>
                    
                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{exp.description}</p>
                    
                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          Key Achievements
                        </p>
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="text-slate-300 flex items-start gap-3 text-sm">
                              <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center mt-0.5`}>
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ExperienceSectionProps {
  data: ResumeData;
  variant: ExperienceVariant;
  palette: ColorPalette;
}

export default function ExperienceSection({ data, variant, palette }: ExperienceSectionProps) {
  const theme = getThemeColors(palette);

  switch (variant) {
    case EXPERIENCE_VARIANTS.TIMELINE:
      return <TimelineExperience data={data} theme={theme} />;
    case EXPERIENCE_VARIANTS.CHAIN:
      return <ChainExperience data={data} theme={theme} />;
    case EXPERIENCE_VARIANTS.CARDS:
      return <CardsExperience data={data} theme={theme} />;
    case EXPERIENCE_VARIANTS.LIST:
      return <ListExperience data={data} theme={theme} />;
    case EXPERIENCE_VARIANTS.DETAILED:
      return <DetailedExperience data={data} theme={theme} />;
    case EXPERIENCE_VARIANTS.ACCORDION:
      return <AccordionExperience data={data} theme={theme} />;
    default:
      return <TimelineExperience data={data} theme={theme} />;
  }
}
