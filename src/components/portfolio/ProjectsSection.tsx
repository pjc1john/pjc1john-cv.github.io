'use client';

import { ResumeData, ProjectsVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { PROJECTS_VARIANTS } from '@/utils/constants';
import { CometCard, CometCardHeader, CometCardContent, CometCardFooter } from '@/components/ui/CometCard';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { MovingBorder } from '@/components/ui/MovingBorder';
import { motion } from 'framer-motion';

interface ProjectsProps {
  data: ResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

// Responsive grid wrapper for consistent layout across all variants
const ProjectsGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
    {children}
  </div>
);

// Grid Projects - Modern Dark Mode Cards
const GridProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-800 ${theme.primary} mb-4`}>
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            A curated collection of my recent work and passion projects
          </p>
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <div className="group h-full bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/60 shadow-sm hover:shadow-xl hover:shadow-slate-900/40 transition-all duration-500 overflow-hidden">
                {/* Project Image/Gradient Area */}
                <div className={`relative h-44 bg-gradient-to-br ${theme.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">🚀</span>
                  {/* Floating tag */}
                  <span className="absolute top-4 right-4 px-3 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-200 shadow-sm">
                    Project #{index + 1}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className={`px-2.5 py-1 bg-slate-800 ${theme.primary} text-xs font-medium rounded-md`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-700">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" 
                         className={`flex-1 text-center px-4 py-2.5 ${theme.button} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}>
                        View Live
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 text-center px-4 py-2.5 bg-slate-800 text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </section>
  );
};

// Carousel Projects - Dark Theme with Comet Cards
const CarouselProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 ${theme.primary} mb-4`}>
            My Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Explore my latest creations and experiments
          </p>
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <CometCard 
                meteorCount={12} 
                glowColor={`rgba(${theme.name === 'purple' ? '168, 85, 247' : theme.name === 'blue' ? '59, 130, 246' : '34, 197, 94'}, 0.3)`}
                className="h-full"
              >
                <CometCardHeader gradient={theme.gradient}>
                  <div className="flex items-center justify-center h-28 sm:h-32">
                    <span className="text-5xl sm:text-6xl drop-shadow-lg">💻</span>
                  </div>
                </CometCardHeader>
                <CometCardContent className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/10 text-slate-300 text-xs rounded-md border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CometCardContent>
                <CometCardFooter className="flex gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                       className={`flex-1 text-center px-4 py-2.5 bg-gradient-to-r ${theme.gradient} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}>
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" 
                       className="flex-1 text-center px-4 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/10">
                      Source
                    </a>
                  )}
                </CometCardFooter>
              </CometCard>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </section>
  );
};

// Masonry Projects - 3D Tilt Cards with Gradient Borders
const MasonryProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">My Work</h2>
          <div className={`w-20 h-1.5 mx-auto rounded-full bg-gradient-to-r ${theme.gradient}`} />
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <CardContainer containerClassName="py-0" className="w-full">
                <CardBody className="relative group/card h-full rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-slate-600 hover:shadow-2xl transition-all duration-300">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${theme.gradient}`} />
                  
                  <CardItem translateZ={60} className="w-full mb-4">
                    <div className={`aspect-video rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-4xl sm:text-5xl text-white/90 drop-shadow-lg">✨</span>
                    </div>
                  </CardItem>
                  
                  <CardItem translateZ={50} className="w-full">
                    <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-1">{project.name}</h3>
                  </CardItem>
                  
                  <CardItem translateZ={40} className="w-full mt-2">
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  </CardItem>
                  
                  <CardItem translateZ={30} className="w-full mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-md border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardItem>
                  
                  <CardItem translateZ={20} className="w-full mt-5 pt-4 border-t border-slate-700">
                    <div className="flex gap-3">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" 
                           className={`flex-1 text-center px-4 py-2.5 ${theme.button} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}>
                          View Live
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" 
                           className="flex-1 text-center px-4 py-2.5 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors">
                          GitHub
                        </a>
                      )}
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </section>
  );
};

// Minimal Projects - Clean, Typography-focused with subtle animations
const MinimalProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Projects</h2>
          <p className="text-base sm:text-lg text-slate-400">Selected work I&apos;m proud of</p>
        </motion.div>
        
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="py-8 sm:py-10 border-b border-slate-800 hover:bg-slate-900/50 transition-colors duration-300 -mx-4 sm:-mx-6 px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  {/* Number */}
                  <div className={`text-5xl sm:text-6xl font-bold ${theme.primary} opacity-20 group-hover:opacity-40 transition-opacity shrink-0 lg:w-24`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-slate-300 transition-colors mb-2">
                          {project.name}
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Links */}
                      <div className="flex gap-4 shrink-0">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" 
                             className={`${theme.primary} text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-1`}>
                            Live <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" 
                             className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors">
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies?.map((tech, i) => (
                        <span key={i} className="text-xs text-slate-400 font-medium">
                          {tech}{i < project.technologies.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Showcase Projects - Dark Premium with Moving Border
const ShowcaseProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${theme.gradient} opacity-10`} />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Project Showcase</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Hover to explore each project in detail
          </p>
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
              style={{ '--border-color': theme.name === 'purple' ? '#a855f7' : theme.name === 'blue' ? '#3b82f6' : '#22c55e' } as React.CSSProperties}
            >
              <MovingBorder 
                duration={3000}
                borderRadius="1.25rem"
                containerClassName="w-full h-full"
                borderClassName="h-24 w-24"
                className="p-0 bg-slate-900/95"
              >
                <div className="h-full flex flex-col">
                  {/* Image Area */}
                  <div className={`relative h-40 bg-gradient-to-br ${theme.gradient} overflow-hidden rounded-t-[calc(1.25rem-2px)]`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl drop-shadow-lg">🚀</span>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">{project.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{project.description}</p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/5 text-slate-400 text-xs rounded-md border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" 
                           className={`flex-1 text-center px-4 py-2.5 bg-gradient-to-r ${theme.gradient} text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity`}>
                          View Live
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" 
                           className="flex-1 text-center px-4 py-2.5 bg-white/5 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </MovingBorder>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </section>
  );
};

// Featured Projects - Premium Bento-style with spotlight effect
const FeaturedProjects = ({ data, theme }: ProjectsProps) => {
  const { projects } = data;
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-800 ${theme.primary} mb-4`}>
            Featured Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">Handpicked Projects</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Each project represents a unique challenge and creative solution
          </p>
        </motion.div>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm group"
            >
              <div className="relative h-full rounded-2xl bg-slate-900 border border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-slate-900/60 transition-all duration-500 overflow-hidden">
                {/* Spotlight effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20`} />
                </div>
                
                {/* Image area with gradient overlay */}
                <div className="relative">
                  <div className={`aspect-[16/10] bg-gradient-to-br ${theme.gradient} flex items-center justify-center overflow-hidden`}>
                    <span className="text-5xl sm:text-6xl text-white/80 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">🖥️</span>
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm rounded-full shadow-sm">
                      <span className={`${theme.primary} text-xs font-bold tracking-wider`}>FEATURED</span>
                    </div>
                  </div>
                  {/* Gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative p-5 sm:p-6 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-slate-300 transition-colors">{project.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className={`px-3 py-1.5 bg-slate-800 ${theme.primary} text-xs font-medium rounded-full`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" 
                         className={`flex-1 text-center px-4 py-3 bg-gradient-to-r ${theme.gradient} text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-slate-900`}>
                        View Project
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                         className="flex-1 text-center px-4 py-3 bg-slate-800 text-slate-200 text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors">
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </ProjectsGrid>
      </div>
    </section>
  );
};

interface ProjectsSectionProps {
  data: ResumeData;
  variant: ProjectsVariant;
  palette: ColorPalette;
}

export default function ProjectsSection({ data, variant, palette }: ProjectsSectionProps) {
  const theme = getThemeColors(palette);

  switch (variant) {
    case PROJECTS_VARIANTS.GRID:
      return <GridProjects data={data} theme={theme} />;
    case PROJECTS_VARIANTS.CAROUSEL:
      return <CarouselProjects data={data} theme={theme} />;
    case PROJECTS_VARIANTS.MASONRY:
      return <MasonryProjects data={data} theme={theme} />;
    case PROJECTS_VARIANTS.MINIMAL:
      return <MinimalProjects data={data} theme={theme} />;
    case PROJECTS_VARIANTS.SHOWCASE:
      return <ShowcaseProjects data={data} theme={theme} />;
    case PROJECTS_VARIANTS.FEATURED:
      return <FeaturedProjects data={data} theme={theme} />;
    default:
      return <GridProjects data={data} theme={theme} />;
  }
}
