'use client';

import { ResumeData, ContactVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';
import { CONTACT_VARIANTS } from '@/utils/constants';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { SparklesCore } from '@/components/ui/SparklesCore';
import { CometCard } from '@/components/ui/CometCard';
import { GlowingStarsBackground, GlowingStarsCard } from '@/components/ui/GlowingStars';

interface ContactProps {
  data: ResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

// Contact Card Component with 3D effect
const ContactCard3D = ({ 
  icon, 
  title, 
  value, 
  href, 
  theme 
}: { 
  icon: string; 
  title: string; 
  value: string; 
  href?: string;
  theme: ReturnType<typeof getThemeColors>;
}) => {
  const content = (
    <CardContainer containerClassName="py-2">
      <CardBody className="bg-slate-900/50 relative group/card border border-white/[0.1] w-full rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/[0.1] transition-all duration-300">
        <CardItem translateZ={50} className="text-2xl sm:text-3xl mb-2 sm:mb-3">
          {icon}
        </CardItem>
        <CardItem translateZ={60} className="text-xs sm:text-sm text-slate-400 mb-1">
          {title}
        </CardItem>
        <CardItem translateZ={70} className={`font-medium text-sm sm:text-base ${theme.primary} truncate max-w-full`}>
          {value}
        </CardItem>
      </CardBody>
    </CardContainer>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
        {content}
      </a>
    );
  }
  return content;
};

const SimpleContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="contact-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        
        {/* Contact Cards Grid - centered when less than 3 items */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
          {personalInfo.email && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <ContactCard3D 
                icon="✉️" 
                title="Email" 
                value={personalInfo.email} 
                href={`mailto:${personalInfo.email}`}
                theme={theme}
              />
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <ContactCard3D 
                icon="💼" 
                title="LinkedIn" 
                value="Connect with me" 
                href={personalInfo.linkedin}
                theme={theme}
              />
            </div>
          )}
          {personalInfo.github && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <ContactCard3D 
                icon="💻" 
                title="GitHub" 
                value="View my work" 
                href={personalInfo.github}
                theme={theme}
              />
            </div>
          )}
          {personalInfo.phone && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <ContactCard3D 
                icon="📱" 
                title="Phone" 
                value={personalInfo.phone} 
                href={`tel:${personalInfo.phone}`}
                theme={theme}
              />
            </div>
          )}
          {personalInfo.location && (
            <div className="w-full sm:w-auto sm:min-w-[280px]">
              <ContactCard3D 
                icon="📍" 
                title="Location" 
                value={personalInfo.location}
                theme={theme}
              />
            </div>
          )}
        </div>
        
        <a 
          href={`mailto:${personalInfo.email}`}
          className={`inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r ${theme.gradient} text-white rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5`}
        >
          <span>Say Hello</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
};

const SplitContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side - Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-2`}>CONTACT</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Let&apos;s work together
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all duration-300 bg-slate-900`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${theme.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className="text-xl sm:text-2xl">✉️</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-slate-500">Email</p>
                    <p className="text-white font-medium text-sm sm:text-base truncate">{personalInfo.email}</p>
                  </div>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all duration-300 bg-slate-900`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${theme.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className="text-xl sm:text-2xl">📱</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-slate-500">Phone</p>
                    <p className="text-white font-medium text-sm sm:text-base">{personalInfo.phone}</p>
                  </div>
                </a>
              )}
              {personalInfo.location && (
                <div className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-slate-700 bg-slate-900`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${theme.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    <span className="text-xl sm:text-2xl">📍</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-slate-500">Location</p>
                    <p className="text-white font-medium text-sm sm:text-base">{personalInfo.location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} text-sm sm:text-base text-white placeholder-slate-500 transition-all duration-200`}
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} text-sm sm:text-base text-white placeholder-slate-500 transition-all duration-200`}
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} text-sm sm:text-base text-white placeholder-slate-500 transition-all duration-200`}
              />
              <textarea 
                placeholder="Your Message" 
                rows={5}
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} resize-none text-sm sm:text-base text-white placeholder-slate-500 transition-all duration-200`}
              ></textarea>
              <button 
                type="submit"
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 ${theme.button} text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5`}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className={`py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br ${theme.gradient} rounded-full mix-blend-multiply filter blur-xl animate-blob`}></div>
        <div className={`absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br ${theme.gradient} rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br ${theme.gradient} rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000`}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <CometCard 
          className="p-0" 
          containerClassName="w-full"
          showMeteors={false}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-slate-800">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Let&apos;s Connect
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-8 sm:mb-12 max-w-xl mx-auto">
              I&apos;m always interested in hearing about new projects and opportunities.
            </p>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className={`group p-5 sm:p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-700`}
                >
                  <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-110 transition-transform">✉️</span>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">Email</p>
                  <p className="text-white font-medium text-xs sm:text-sm truncate">{personalInfo.email}</p>
                </a>
              )}
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group p-5 sm:p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-700`}
                >
                  <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-110 transition-transform">💼</span>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">LinkedIn</p>
                  <p className="text-white font-medium text-xs sm:text-sm">Connect</p>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group p-5 sm:p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:col-span-2 lg:col-span-1 border border-slate-700`}
                >
                  <span className="text-3xl sm:text-4xl block mb-3 group-hover:scale-110 transition-transform">💻</span>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">GitHub</p>
                  <p className="text-white font-medium text-xs sm:text-sm">View Profile</p>
                </a>
              )}
            </div>
            
            <a 
              href={`mailto:${personalInfo.email}`}
              className={`inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <span>Start a Conversation</span>
              <span>→</span>
            </a>
          </div>
        </CometCard>
      </div>
    </section>
  );
};

const MinimalContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12">Contact</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`} 
              className={`group flex items-center gap-4 p-5 sm:p-6 border border-slate-700 rounded-2xl hover:border-slate-500 hover:shadow-md transition-all duration-300 bg-slate-900`}
            >
              <span className={`text-2xl ${theme.primary} group-hover:scale-110 transition-transform`}>→</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className={`${theme.primary} font-medium text-sm sm:text-base truncate`}>{personalInfo.email}</p>
              </div>
            </a>
          )}
          {personalInfo.phone && (
            <a 
              href={`tel:${personalInfo.phone}`} 
              className={`group flex items-center gap-4 p-5 sm:p-6 border border-slate-700 rounded-2xl hover:border-slate-500 hover:shadow-md transition-all duration-300 bg-slate-900`}
            >
              <span className={`text-2xl text-slate-400 group-hover:${theme.primary} group-hover:scale-110 transition-all`}>→</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="text-slate-300 font-medium text-sm sm:text-base">{personalInfo.phone}</p>
              </div>
            </a>
          )}
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group flex items-center gap-4 p-5 sm:p-6 border border-slate-700 rounded-2xl hover:border-slate-500 hover:shadow-md transition-all duration-300 bg-slate-900`}
            >
              <span className={`text-2xl ${theme.primary} group-hover:scale-110 transition-transform`}>→</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">LinkedIn</p>
                <p className={`${theme.primary} font-medium text-sm sm:text-base`}>View Profile</p>
              </div>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`group flex items-center gap-4 p-5 sm:p-6 border border-slate-700 rounded-2xl hover:border-slate-500 hover:shadow-md transition-all duration-300 bg-slate-900`}
            >
              <span className={`text-2xl ${theme.primary} group-hover:scale-110 transition-transform`}>→</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">GitHub</p>
                <p className={`${theme.primary} font-medium text-sm sm:text-base`}>View Code</p>
              </div>
            </a>
          )}
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm mt-12 sm:mt-16">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
};

const ModernContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white relative overflow-hidden">
      <GlowingStarsBackground className="opacity-50" starCount={30} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <div>
            <p className={`${theme.primary} font-mono text-xs sm:text-sm mb-3`}>GET IN TOUCH</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Let&apos;s Build Something{' '}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
                Great
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mb-8">
              I&apos;m always excited to work on new projects and collaborate with amazing people.
            </p>
            
            <a 
              href={`mailto:${personalInfo.email}`}
              className={`inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${theme.gradient} text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5`}
            >
              <span>Send Email</span>
              <span className="text-lg">→</span>
            </a>
          </div>
          
          {/* Right Side - Contact Cards */}
          <div className="space-y-4 sm:space-y-5">
            <GlowingStarsCard className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
              <p className="text-slate-400 text-xs sm:text-sm mb-2">Email</p>
              <p className="text-white font-medium text-sm sm:text-base break-all">{personalInfo.email}</p>
            </GlowingStarsCard>
            
            {personalInfo.phone && (
              <GlowingStarsCard className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <p className="text-slate-400 text-xs sm:text-sm mb-2">Phone</p>
                <p className="text-white font-medium text-sm sm:text-base">{personalInfo.phone}</p>
              </GlowingStarsCard>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.linkedin && (
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group p-5 sm:p-6 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 text-center hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300`}
                >
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">💼</span>
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </a>
              )}
              {personalInfo.github && (
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group p-5 sm:p-6 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 text-center hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300`}
                >
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">💻</span>
                  <span className="text-sm sm:text-base">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm mt-16 sm:mt-20 text-center">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
};

const FloatingContact = ({ data, theme }: ContactProps) => {
  const { personalInfo } = data;
  
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
        <div className={`absolute bottom-5 sm:bottom-10 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-15 animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-10 animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Say Hello!
          </h2>
          <p className="text-base sm:text-xl text-slate-400">I&apos;d love to hear from you</p>
        </div>
        
        {/* Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-7 bg-slate-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-800"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">✉️</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="font-medium text-slate-200 text-sm sm:text-base truncate">{personalInfo.email}</p>
              </div>
            </a>
          )}
          {personalInfo.phone && (
            <a 
              href={`tel:${personalInfo.phone}`}
              className="group flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-7 bg-slate-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-800"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">📱</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="font-medium text-slate-200 text-sm sm:text-base">{personalInfo.phone}</p>
              </div>
            </a>
          )}
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-7 bg-slate-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-800"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">💼</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">LinkedIn</p>
                <p className="font-medium text-slate-200 text-sm sm:text-base">Connect with me</p>
              </div>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-7 bg-slate-900 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-800"
            >
              <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">💻</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500 mb-1">GitHub</p>
                <p className="font-medium text-slate-200 text-sm sm:text-base">View my projects</p>
              </div>
            </a>
          )}
        </div>
        
        <div className="text-center mt-10 sm:mt-16">
          <p className="text-slate-600 text-xs sm:text-sm">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

interface ContactSectionProps {
  data: ResumeData;
  variant: ContactVariant;
  palette: ColorPalette;
}

export default function ContactSection({ data, variant, palette }: ContactSectionProps) {
  const theme = getThemeColors(palette);

  switch (variant) {
    case CONTACT_VARIANTS.SIMPLE:
      return <SimpleContact data={data} theme={theme} />;
    case CONTACT_VARIANTS.SPLIT:
      return <SplitContact data={data} theme={theme} />;
    case CONTACT_VARIANTS.CARD:
      return <CardContact data={data} theme={theme} />;
    case CONTACT_VARIANTS.MINIMAL:
      return <MinimalContact data={data} theme={theme} />;
    case CONTACT_VARIANTS.MODERN:
      return <ModernContact data={data} theme={theme} />;
    case CONTACT_VARIANTS.FLOATING:
      return <FloatingContact data={data} theme={theme} />;
    default:
      return <SimpleContact data={data} theme={theme} />;
  }
}
