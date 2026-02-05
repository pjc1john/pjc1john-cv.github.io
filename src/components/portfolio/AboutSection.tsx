'use client';

import { getThemeColors } from '@/utils/theme';
import { ABOUT_VARIANTS } from '@/utils/constants';
import { AboutProps, AboutSectionProps } from '@/types/IAboutSection';
import { DottedGlowBackground } from '@/components/ui/DottedGlowBackground';
import { MaskContainer } from '@/components/ui/SvgMaskEffect';
import { MacTerminal } from '@/components/ui/MacTerminal';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { WaveText, WavyTextLoop, WavyParagraph } from '@/components/ui/WaveText';
import { motion } from 'framer-motion';

const SimpleAbout = ({ data, theme }: AboutProps) => {
  const { personalInfo } = data;

  return (
    <section id="about" className={`py-8 sm:py-12 px-4 sm:px-6 ${theme.bgLight}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-8">About Me</h2>
        <TextGenerateEffect
          words={personalInfo.summary}
          className="text-center"
          textClassName="text-slate-600 text-base sm:text-lg"
          duration={0.5}
          filter={true}
        />
      </div>
    </section>
  );
};

const SplitAbout = ({ data, theme }: AboutProps) => {
  const { personalInfo } = data;
  
  // Terminal lines with just description text, fast typing
  const terminalLines = [
    { type: "output" as const, text: personalInfo.summary, delay: 5 },
  ];

  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">About Me</h2>
        </div>
        <MacTerminal 
          title={personalInfo.name}
          lines={terminalLines}
        />
      </div>
    </section>
  );
};

const ModernAbout = ({ data, theme }: AboutProps) => {
  const { personalInfo } = data;
  
  // Get theme-based colors for the dots
  const getGlowColors = () => {
    const colorMap: Record<string, { dot: string; glow: string }> = {
      blue: { dot: 'rgba(59, 130, 246, 0.7)', glow: 'rgba(59, 130, 246, 0.85)' },
      purple: { dot: 'rgba(147, 51, 234, 0.7)', glow: 'rgba(147, 51, 234, 0.85)' },
      emerald: { dot: 'rgba(16, 185, 129, 0.7)', glow: 'rgba(16, 185, 129, 0.85)' },
      rose: { dot: 'rgba(244, 63, 94, 0.7)', glow: 'rgba(244, 63, 94, 0.85)' },
      amber: { dot: 'rgba(245, 158, 11, 0.7)', glow: 'rgba(245, 158, 11, 0.85)' },
      slate: { dot: 'rgba(100, 116, 139, 0.7)', glow: 'rgba(100, 116, 139, 0.85)' },
      cyan: { dot: 'rgba(6, 182, 212, 0.7)', glow: 'rgba(6, 182, 212, 0.85)' },
      indigo: { dot: 'rgba(99, 102, 241, 0.7)', glow: 'rgba(99, 102, 241, 0.85)' },
      orange: { dot: 'rgba(249, 115, 22, 0.7)', glow: 'rgba(249, 115, 22, 0.85)' },
      teal: { dot: 'rgba(20, 184, 166, 0.7)', glow: 'rgba(20, 184, 166, 0.85)' },
    };
    // Extract palette from theme.primary class (e.g., "text-blue-500" -> "blue")
    const paletteMatch = theme.primary.match(/text-(\w+)-/);
    const palette = paletteMatch ? paletteMatch[1] : 'blue';
    return colorMap[palette] || colorMap.blue;
  };

  const glowColors = getGlowColors();

  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8">About Me</h2>
        {/* Card with glowing dots inside */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800">
          <DottedGlowBackground
            className="pointer-events-none"
            opacity={0.8}
            gap={12}
            radius={1.5}
            color={glowColors.dot}
            glowColor={glowColors.glow}
            darkColor={glowColors.dot}
            darkGlowColor={glowColors.glow}
            backgroundOpacity={0}
            speedMin={0.3}
            speedMax={1.2}
            speedScale={1}
          />
          <div className="relative z-10 p-8 sm:p-12 bg-slate-900/70">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardsAbout = ({ data, theme }: AboutProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="about" className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main content card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-slate-700/50 shadow-2xl">
          {/* Summary with wavy paragraph effect */}
          <WavyParagraph
            text={personalInfo.summary}
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8"
            wordClassName="text-slate-300"
          />
          
          {/* Info row */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t border-slate-700/50">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className={`px-4 py-2 rounded-full ${theme.bgLight} ${theme.primary} text-sm font-medium`}
            >
              📍 {personalInfo.location || 'Remote'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className={`px-4 py-2 rounded-full ${theme.bgLight} ${theme.primary} text-sm font-medium`}
            >
              💼 {personalInfo.title}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className={`px-4 py-2 rounded-full ${theme.bgLight} ${theme.primary} text-sm font-medium`}
            >
              ✉️ {personalInfo.email}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AboutSection({ data, variant, palette }: AboutSectionProps) {
  const theme = getThemeColors(palette);

  switch (variant) {
    case ABOUT_VARIANTS.SIMPLE:
      return <SimpleAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.SPLIT:
      return <SplitAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.MODERN:
      return <ModernAbout data={data} theme={theme} />;
    case ABOUT_VARIANTS.CARDS:
      return <CardsAbout data={data} theme={theme} />;
    default:
      return <SimpleAbout data={data} theme={theme} />;
  }
}
