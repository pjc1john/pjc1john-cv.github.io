'use client';

import { useMemo } from 'react';
import { ResumeData, SkillsVariant, ColorPalette, SkillsGrouped } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { SKILLS_VARIANTS } from '@/utils/constants';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { SparklesCore } from '@/components/ui/SparklesCore';
import { GlowingStarsBackground, GlowingStarsCard } from '@/components/ui/GlowingStars';

interface SkillsProps {
  data: ResumeData;
  theme: ReturnType<typeof getThemeColors>;
  skillPercentages: number[];
}

// Helper function to normalize skills to grouped format
function normalizeSkills(skills: SkillsGrouped | string[] | undefined): SkillsGrouped {
  if (skills && typeof skills === 'object' && !Array.isArray(skills)) {
    return skills;
  }
  
  if (Array.isArray(skills)) {
    return { 'Skills': skills };
  }
  
  return {};
}

function getAllSkills(skills: SkillsGrouped): string[] {
  return Object.values(skills).flat();
}

function getSkillCategories(skills: SkillsGrouped) {
  return Object.entries(skills)
    .filter(([, skillList]) => skillList && skillList.length > 0)
    .map(([name, skillList]) => ({
      name,
      skills: skillList,
    }));
}

function getSkillPercentage(index: number): number {
  const percentages = [85, 90, 78, 92, 88, 75, 95, 82, 87, 79, 91, 84, 76, 93, 80];
  return percentages[index % percentages.length];
}

// Animated skill bar component
const AnimatedBar = ({ 
  skill, 
  percentage, 
  theme, 
  index 
}: { 
  skill: string; 
  percentage: number; 
  theme: ReturnType<typeof getThemeColors>; 
  index: number;
}) => {
  return (
    <div 
      className="group p-4 sm:p-5 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-white text-sm sm:text-base">{skill}</span>
        <span className={`text-xs sm:text-sm font-semibold ${theme.primary}`}>{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

const BarsSkills = ({ data, theme, skillPercentages }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);
  
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <GlowingStarsBackground className="opacity-30" starCount={40} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>EXPERTISE</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Skills & Proficiency
          </h2>
        </div>
        
        <div className="space-y-10 sm:space-y-12">
          {categories.map((category, catIndex) => (
            <div key={category.name}>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 text-center">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {category.skills.map((skill, index) => (
                  <AnimatedBar 
                    key={index}
                    skill={skill}
                    percentage={skillPercentages[catIndex * 10 + index] || getSkillPercentage(index)}
                    theme={theme}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Floating tag component with hover effect
const FloatingTag = ({ 
  skill, 
  theme, 
  index 
}: { 
  skill: string; 
  theme: ReturnType<typeof getThemeColors>; 
  index: number;
}) => {
  return (
    <span 
      className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-default
        bg-white/10 backdrop-blur-sm border border-white/20 text-white
        hover:bg-gradient-to-r hover:${theme.gradient} hover:border-transparent hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="relative z-10">{skill}</span>
    </span>
  );
};

const TagsSkills = ({ data, theme }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);
  
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="skills-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>TECH STACK</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Skills & Technologies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        <div className="space-y-10 sm:space-y-12">
          {categories.map((category) => (
            <div key={category.name} className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {category.skills.map((skill, index) => (
                  <FloatingTag key={index} skill={skill} theme={theme} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Circular progress component
const CircularProgress = ({ 
  skill, 
  percentage, 
  theme, 
  index 
}: { 
  skill: string; 
  percentage: number; 
  theme: ReturnType<typeof getThemeColors>; 
  index: number;
}) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div 
      className="group flex flex-col items-center p-4 sm:p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="rgba(71, 85, 105, 0.5)"
            strokeWidth="6"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            className={theme.primary.replace('text-', 'stroke-')}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg sm:text-xl font-bold ${theme.primary}`}>{percentage}%</span>
        </div>
      </div>
      <p className="text-white font-medium text-sm sm:text-base text-center">{skill}</p>
    </div>
  );
};

const CircularSkills = ({ data, theme, skillPercentages }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);
  
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <GlowingStarsBackground className="opacity-40" starCount={50} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>PROFICIENCY</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            My Skills
          </h2>
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          {categories.map((category, catIndex) => (
            <div key={category.name}>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 text-center">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                {category.skills.map((skill, index) => (
                  <CircularProgress 
                    key={index}
                    skill={skill}
                    percentage={skillPercentages[catIndex * 10 + index] || getSkillPercentage(index)}
                    theme={theme}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Skill Card Component
const SkillCard3D = ({ 
  skill, 
  theme
}: { 
  skill: string; 
  theme: ReturnType<typeof getThemeColors>; 
}) => {
  return (
    <CardContainer containerClassName="py-2">
      <CardBody className="bg-slate-800/50 relative group/card border border-slate-700/50 w-full rounded-xl p-4 sm:p-5 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-slate-600">
        <CardItem translateZ={40} className="w-full">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 bg-gradient-to-br ${theme.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl group-hover/card:scale-110 transition-transform`}>
            {skill.charAt(0).toUpperCase()}
          </div>
        </CardItem>
        <CardItem translateZ={50} className="w-full">
          <p className="font-medium text-white text-sm sm:text-base text-center">{skill}</p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

const GridSkills = ({ data, theme }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);
  
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-50">
        <SparklesCore
          id="skills-grid-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>TOOLKIT</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Technical Skills
          </h2>
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 text-center">
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard3D key={index} skill={skill} theme={theme} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MinimalSkills = ({ data, theme }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);
  
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Skills
          </h2>
          <div className={`w-20 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full`}></div>
        </div>
        
        <div className="space-y-8 sm:space-y-12">
          {categories.map((category) => (
            <div key={category.name} className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5 sm:mb-6">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <span className={`w-2 h-2 bg-gradient-to-r ${theme.gradient} rounded-full group-hover:scale-125 transition-transform`}></span>
                    <span className="text-slate-700 font-medium text-sm sm:text-base">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Category Card Component
const CategoryCard = ({ 
  category
}: { 
  category: { name: string; skills: string[] }; 
}) => {
  return (
    <GlowingStarsCard
      className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur h-full"
      glowColor="rgba(139, 92, 246, 0.15)"
    >
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white">{category.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <span 
            key={i} 
            className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/80 text-white text-xs sm:text-sm rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors`}
          >
            {skill}
          </span>
        ))}
      </div>
    </GlowingStarsCard>
  );
};

const CategoriesSkills = ({ data, theme }: SkillsProps) => {
  const { skills } = data;
  const categories = getSkillCategories(skills);

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <GlowingStarsBackground className="opacity-30" starCount={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>CAPABILITIES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillsSectionProps {
  data: ResumeData;
  variant: SkillsVariant;
  palette: ColorPalette;
}

export default function SkillsSection({ data, variant, palette }: SkillsSectionProps) {
  const skills = normalizeSkills(data.skills as SkillsGrouped | string[] | undefined);
  const theme = getThemeColors(palette);
  const allSkills = getAllSkills(skills);

  const skillPercentages = useMemo(() => {
    return allSkills.map((_, index) => getSkillPercentage(index));
  }, [allSkills]);

  if (allSkills.length === 0) {
    return null;
  }

  const safeData = { ...data, skills };

  switch (variant) {
    case SKILLS_VARIANTS.BARS:
      return <BarsSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    case SKILLS_VARIANTS.TAGS:
      return <TagsSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    case SKILLS_VARIANTS.CIRCULAR:
      return <CircularSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    case SKILLS_VARIANTS.GRID:
      return <GridSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    case SKILLS_VARIANTS.MINIMAL:
      return <MinimalSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    case SKILLS_VARIANTS.CATEGORIES:
      return <CategoriesSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
    default:
      return <BarsSkills data={safeData} theme={theme} skillPercentages={skillPercentages} />;
  }
}
